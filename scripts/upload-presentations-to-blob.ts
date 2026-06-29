import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { put } from "@vercel/blob";

import { parseInteractivePresentation } from "../src/content/presentations/schema";

const LOCAL_PRESENTATION_CONFIG_FOLDER = "local-presentation-configs/presentations";
const ENV_FILES = [
  { path: ".env.local", override: true },
  { path: ".env.vercel.production.local", override: false },
  { path: ".env.vercel.local", override: false },
] as const;
const PRESENTATION_BLOB_FOLDER = "presentations";
const PRESENTATION_CONFIGS_STORE_ID_ENV = "PRES_CONFIGS_BLOB_STORE_ID";
const isDryRun = process.argv.includes("--dry-run");

async function loadEnvFile(path: string, { override }: { override: boolean }) {
  let content = "";

  try {
    content = await readFile(path, "utf8");
  } catch {
    return;
  }

  for (const line of content.split("\n")) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (!key || (!override && process.env[key] != null)) continue;

    process.env[key] = rawValue?.replace(/^(['"])(.*)\1$/, "$2") ?? "";
  }
}

async function loadLocalEnvFiles() {
  for (const envFile of ENV_FILES) {
    await loadEnvFile(envFile.path, { override: envFile.override });
  }
}

function getPresentationPath(slug: string) {
  return `${PRESENTATION_BLOB_FOLDER}/${slug}.json`;
}

async function getLocalPresentationFiles() {
  const entries = await readdir(LOCAL_PRESENTATION_CONFIG_FOLDER, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => join(LOCAL_PRESENTATION_CONFIG_FOLDER, entry.name))
    .sort();
}

async function readLocalPresentation(path: string) {
  const content = await readFile(path, "utf8");
  const presentation = parseInteractivePresentation(JSON.parse(content) as unknown);
  const expectedFileName = `${presentation.slug}.json`;

  if (basename(path) !== expectedFileName) {
    throw new Error(`${path} must be named ${expectedFileName} to match its slug.`);
  }

  return { path, presentation };
}

function getPresentationConfigsStoreId() {
  const storeId = process.env[PRESENTATION_CONFIGS_STORE_ID_ENV];

  if (!storeId) {
    throw new Error(`${PRESENTATION_CONFIGS_STORE_ID_ENV} is required.`);
  }

  return storeId;
}

async function uploadPresentations() {
  await loadLocalEnvFiles();

  const presentationFiles = await getLocalPresentationFiles();
  const presentations = await Promise.all(presentationFiles.map(readLocalPresentation));

  if (presentations.length === 0) {
    throw new Error(`No presentation JSON files found in ${LOCAL_PRESENTATION_CONFIG_FOLDER}.`);
  }

  const storeId = isDryRun ? null : getPresentationConfigsStoreId();

  for (const { path, presentation } of presentations) {
    const pathname = getPresentationPath(presentation.slug);
    const body = `${JSON.stringify(presentation, null, 2)}\n`;

    if (isDryRun) {
      console.log(`${path} -> ${pathname}`);
      continue;
    }

    if (!storeId) {
      throw new Error(`${PRESENTATION_CONFIGS_STORE_ID_ENV} is required.`);
    }

    await put(pathname, body, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json; charset=utf-8",
      storeId,
    });

    console.log(`${path} -> ${pathname}`);
  }

  if (isDryRun) {
    console.log(`\nValidated ${presentations.length} presentation(s).`);
    return;
  }

  console.log(`\nUploaded ${presentations.length} private presentation(s).`);
}

await uploadPresentations();
