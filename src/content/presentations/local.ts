import { demoPresentation } from "./demo";
import { frenchDemoPresentation } from "./demo-fr";
import type { InteractivePresentationContent } from "./types";

export const localPresentations = [
  demoPresentation,
  frenchDemoPresentation,
] satisfies readonly InteractivePresentationContent[];

export function getLocalPresentation(slug: string) {
  return localPresentations.find((presentation) => presentation.slug === slug) ?? null;
}
