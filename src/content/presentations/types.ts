import type { HeroTextParagraph, SiteContent } from "../types";

export type PresentationLanguage = "en" | "fr";

export type PresentationStepTargetBlock = "center" | "end" | "nearest" | "start";

export type InteractivePresentationStep = {
  id: string;
  targetId: string;
  text: string;
  block?: PresentationStepTargetBlock;
};

export type InteractivePresentationContent = {
  slug: string;
  language: PresentationLanguage;
  companyName: string;
  hero: {
    identity?: Partial<SiteContent["identity"]>;
    summary: readonly HeroTextParagraph[];
  };
  controls?: {
    start?: string;
    previous?: string;
    next?: string;
    finish?: string;
  };
  steps: readonly InteractivePresentationStep[];
};
