import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { parseInteractivePresentation } from "./schema";
import type { InteractivePresentationContent } from "./types";

const LOCAL_PRESENTATION_CONFIG_FOLDER = "local-presentation-configs/presentations";

function shouldLogLocalPresentationConfigWarning() {
  return process.env.NODE_ENV !== "production";
}

function logLocalPresentationConfigWarning(message: string, error?: unknown) {
  if (!shouldLogLocalPresentationConfigWarning()) return;
  console.warn(`[presentations] ${message}`, error ?? "");
}

function isMissingFileError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

function getLocalPresentationConfigPath(slug: string) {
  return join(LOCAL_PRESENTATION_CONFIG_FOLDER, `${slug}.json`);
}

export async function getLocalPresentationConfig(
  slug: string,
): Promise<InteractivePresentationContent | null> {
  const presentationPath = getLocalPresentationConfigPath(slug);

  try {
    const fileContent = await readFile(join(process.cwd(), presentationPath), "utf8");
    const presentation = JSON.parse(fileContent) as unknown;
    const parsedPresentation = parseInteractivePresentation(presentation);

    if (parsedPresentation.slug !== slug) {
      logLocalPresentationConfigWarning(`Presentation slug mismatch for "${slug}".`);
      return null;
    }

    return parsedPresentation;
  } catch (error) {
    if (isMissingFileError(error)) return null;

    logLocalPresentationConfigWarning(`Invalid local presentation "${slug}".`, error);
    return null;
  }
}
