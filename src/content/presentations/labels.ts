import type { PresentationLanguage } from "./types";

type PresentationLabels = {
  ariaLabel: string;
  eyebrow: string;
  introBeforeCompany: string;
  start: string;
  previous: string;
  next: string;
  finish: string;
};

export const presentationLabels = {
  en: {
    ariaLabel: "Interactive presentation for",
    eyebrow: "Interactive path",
    introBeforeCompany: "A short guided tour tailored for",
    start: "Start interactive presentation",
    previous: "Previous",
    next: "Next",
    finish: "Finish",
  },
  fr: {
    ariaLabel: "Présentation interactive pour",
    eyebrow: "Parcours interactif",
    introBeforeCompany: "Une courte visite guidée pensée pour",
    start: "Démarrer la présentation",
    previous: "Précédent",
    next: "Suivant",
    finish: "Terminer",
  },
} satisfies Record<PresentationLanguage, PresentationLabels>;

export function getPresentationLabels(language: PresentationLanguage) {
  return presentationLabels[language];
}
