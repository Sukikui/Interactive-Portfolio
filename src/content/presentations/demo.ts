import type { InteractivePresentationContent } from "./types";

export const demoPresentation = {
  slug: "demo",
  language: "en",
  companyName: "Demo Company",
  hero: {
    identity: {
      jobTitle: "Machine Learning & Computer Vision Engineer",
    },
    summary: [
      {
        segments: [
          { text: "A short, tailored path through my portfolio for " },
          { text: "Demo Company", emphasis: true },
          { text: ", focused on applied ML, computer vision and reliable engineering." },
        ],
      },
    ],
  },
  steps: [
    {
      id: "hero",
      targetId: "hero",
      text: "First, a quick tailored intro: same portfolio, but framed around the company receiving the link.",
      block: "center",
    },
    {
      id: "profile",
      targetId: "presentation",
      text: "This section gives the high-level profile: recently graduated engineer, ML/CV focus, and hands-on implementation habits.",
    },
    {
      id: "experience",
      targetId: "experience",
      text: "Then we move to the most relevant research and engineering experiences, especially medical imaging and applied AI.",
    },
    {
      id: "projects",
      targetId: "projects",
      text: "Finally, the project tiles show the practical side: clean repos, documented work, and code that can be inspected directly.",
    },
  ],
} satisfies InteractivePresentationContent;
