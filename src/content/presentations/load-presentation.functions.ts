import { createServerFn } from "@tanstack/react-start";

import { getLocalPresentationConfig } from "./local-presentation-config";
import { getRemotePresentation } from "./remote";
import { presentationSlugSchema } from "./schema";

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
    const localConfigPresentation = await getLocalPresentationConfig(data.slug);

    if (localConfigPresentation) {
      return localConfigPresentation;
    }

    return getRemotePresentation(data.slug);
  });
