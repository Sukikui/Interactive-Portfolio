import type { InteractivePresentationContent } from "./types";

export const frenchDemoPresentation = {
  slug: "demo-fr",
  language: "fr",
  companyName: "Entreprise Démo",
  hero: {
    identity: {
      jobTitle: "Ingénieur Machine Learning & Computer Vision",
    },
    summary: [
      {
        segments: [
          { text: "Un parcours court et personnalisé pour " },
          { text: "Entreprise Démo", emphasis: true },
          { text: ", centré sur le ML appliqué, la vision par ordinateur et l’ingénierie fiable." },
        ],
      },
    ],
  },
  steps: [
    {
      id: "hero",
      targetId: "hero",
      text: "On commence par une introduction adaptée au destinataire du lien, sans dupliquer le portfolio principal.",
      block: "center",
    },
    {
      id: "profile",
      targetId: "presentation",
      text: "Cette section résume mon profil : ingénieur récemment diplômé, orienté ML/CV, avec une approche très pratique de l’implémentation.",
    },
    {
      id: "experience",
      targetId: "experience",
      text: "On passe ensuite aux expériences les plus pertinentes, notamment en imagerie médicale, recherche appliquée et adaptation de modèles récents.",
    },
    {
      id: "projects",
      targetId: "projects",
      text: "Enfin, les projets GitHub montrent la partie concrète : code inspectable, documentation et habitudes d’ingénierie propres.",
    },
  ],
} satisfies InteractivePresentationContent;
