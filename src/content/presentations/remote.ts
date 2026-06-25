import { get } from "@vercel/edge-config";

import { parseInteractivePresentation } from "./schema";
import type { InteractivePresentationContent } from "./types";

const REMOTE_PRESENTATION_KEY_PREFIX = "presentation_";

function shouldLogRemoteWarning() {
  return process.env.NODE_ENV !== "production";
}

function logRemoteWarning(message: string, error?: unknown) {
  if (!shouldLogRemoteWarning()) return;
  console.warn(`[presentations] ${message}`, error ?? "");
}

export function getRemotePresentationKey(slug: string) {
  return `${REMOTE_PRESENTATION_KEY_PREFIX}${slug}`;
}

export async function getRemotePresentation(
  slug: string,
): Promise<InteractivePresentationContent | null> {
  if (!process.env.EDGE_CONFIG) {
    return null;
  }

  try {
    const presentation = await get(getRemotePresentationKey(slug));

    if (presentation == null) {
      return null;
    }

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
