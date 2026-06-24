import heroBackground from "@/assets/hero-bg.jpeg";
import profileImage from "@/assets/profile.png";

import type { SiteContent } from "./types";

export const siteContent = {
  language: "en",
  identity: {
    fullName: "Tristan Habémont",
    jobTitle: "Machine Learning & Computer Vision Engineer",
  },
  seo: {
    title: "Tristan Habémont — Machine Learning & Computer Vision Engineer",
    description:
      "Academic portfolio of Tristan Habémont, Machine Learning & Computer Vision Engineer. Research interests, education, experience, open-source projects and CV.",
    openGraphDescription:
      "Research interests, projects and CV of Tristan Habémont, Machine Learning & Computer Vision Engineer.",
    author: "Tristan Habémont",
  },
  hero: {
    backgroundImage: heroBackground,
    profileImage,
    profileAlt: "Tristan Habémont portrait",
    summary: [
      { text: "Building " },
      { text: "intelligent systems", emphasis: true },
      { text: " at the intersection of " },
      { text: "deep learning", emphasis: true },
      { text: " and " },
      { text: "applied mathematics", emphasis: true },
      { text: "." },
    ],
    email: "tristan.habemont@gmail.com",
    socials: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        href: "https://linkedin.com/in/tristan-habemont",
      },
      {
        platform: "github",
        label: "GitHub",
        href: "https://github.com/sukikui",
      },
    ],
    scrollLabel: "Scroll",
    photoCredit: "I took this photo at Entsū-in Temple (円通院) in Matsushima :)",
  },
  footer: {
    copyright: "All rights reserved",
    tagline: "Built with TanStack Start · Designed in the open",
  },
} satisfies SiteContent;
