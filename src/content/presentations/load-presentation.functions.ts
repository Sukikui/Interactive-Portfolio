import { createServerFn } from "@tanstack/react-start";

import { getLocalPresentation } from "./local";
import { getRemotePresentation } from "./remote";
import { parseInteractivePresentation, presentationSlugSchema } from "./schema";

type LoadPresentationInput = {
  slug: string;
};

function validateLoadPresentationInput(data: unknown): LoadPresentationInput {
  if (data == null || typeof data !== "object" || !("slug" in data)) {
    throw new Error("Presentation slug is required.");
  }

  const { slug } = data as { slug: unknown };
  return { slug: presentationSlugSchema.parse(slug) };
}

export const loadPresentation = createServerFn({ method: "GET" })
  .inputValidator(validateLoadPresentationInput)
  .handler(async ({ data }) => {
    const localPresentation = getLocalPresentation(data.slug);

    if (localPresentation) {
      return parseInteractivePresentation(localPresentation);
    }

    return getRemotePresentation(data.slug);
  });
