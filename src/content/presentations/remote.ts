import { get } from "@vercel/blob";

import { parseInteractivePresentation } from "./schema";
import type { InteractivePresentationContent } from "./types";

const PRESENTATION_CONFIGS_STORE_ID_ENV = "PRES_CONFIGS_BLOB_STORE_ID";
const PRESENTATION_BLOB_FOLDER = "presentations";

function shouldLogRemoteWarning() {
  return process.env.NODE_ENV !== "production";
}

function logRemoteWarning(message: string, error?: unknown) {
  if (!shouldLogRemoteWarning()) return;
  console.warn(`[presentations] ${message}`, error ?? "");
}

function getRemotePresentationPath(slug: string) {
  return `${PRESENTATION_BLOB_FOLDER}/${slug}.json`;
}

async function readPresentationBlob(stream: ReadableStream<Uint8Array>) {
  return JSON.parse(await new Response(stream).text()) as unknown;
}

export async function getRemotePresentation(
  slug: string,
): Promise<InteractivePresentationContent | null> {
  const storeId = process.env[PRESENTATION_CONFIGS_STORE_ID_ENV];

  if (!storeId) return null;

  try {
    const result = await get(getRemotePresentationPath(slug), {
      access: "private",
      storeId,
    });

    if (result === null || result.stream === null) return null;

    const presentation = await readPresentationBlob(result.stream);
    const parsedPresentation = parseInteractivePresentation(presentation);

    if (parsedPresentation.slug !== slug) {
      logRemoteWarning(`Presentation slug mismatch for "${slug}".`);
      return null;
    }

    return parsedPresentation;
  } catch (error) {
    logRemoteWarning(`Could not load remote presentation "${slug}".`, error);
    return null;
  }
}
