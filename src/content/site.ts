import heroBackground from "@/assets/hero-bg.jpeg";
import profileImage from "@/assets/profile.png";

import type { SiteContent } from "./types";
import { projectRepositories } from "./projects";

export const siteContent = {
  language: "en",
  identity: {
    fullName: "Tristan Habémont",
    jobTitle: "Machine Learning & Computer Vision Engineer",
  },
  seo: {
    title: "Tristan Habémont's Website",
    description:
      "Portfolio of Tristan Habémont, Machine Learning & Computer Vision Engineer focused on research-driven vision models and real-world applications.",
    openGraphDescription:
      "Machine Learning, Computer Vision, research experience and engineering projects by Tristan Habémont.",
    author: "Tristan Habémont",
  },
  hero: {
    backgroundImage: heroBackground,
    profileImage,
    profileAlt: "Tristan Habémont portrait",
    summary: [
      {
        segments: [
          { text: "Passionate about " },
          { text: "Machine Learning", emphasis: true },
          { text: ", with a background in " },
          { text: "Electrical Engineering", emphasis: true },
          { text: " and a strong focus on " },
          { text: "Computer Vision", emphasis: true },
          { text: "." },
        ],
      },
      {
        spacing: "compact",
        segments: [
          { text: "I am looking for opportunities to build on my " },
          { text: "research experience", emphasis: true },
          { text: " and develop models for real-world applications, from " },
          { text: "medical and satellite imaging", emphasis: true },
          { text: " to " },
          { text: "embedded and autonomous systems", emphasis: true },
          { text: "." },
        ],
      },
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
    photoCredit:
      "I took this photo at Entsū-in Temple (円通院) in Matsushima during the momiji season :)",
  },
  footer: {
    contentLabel: "Content & assets",
    contentRights: "All rights reserved",
    reusePrompt: "Like it?",
    licenseLabel: "MIT License",
    sourceLink: {
      label: "Fork the source and make it yours",
      repository: projectRepositories.interactivePortfolio,
    },
    stackLabel: "Built with",
    technologies: [
      { id: "tanstack", label: "TanStack Start", href: "https://tanstack.com/start/latest" },
      { id: "react", label: "React", href: "https://react.dev" },
      { id: "typescript", label: "TypeScript", href: "https://www.typescriptlang.org" },
      { id: "vite", label: "Vite", href: "https://vite.dev" },
      { id: "tailwind", label: "Tailwind CSS", href: "https://tailwindcss.com" },
      { id: "bun", label: "Bun", href: "https://bun.sh" },
      { id: "vercel", label: "Vercel", href: "https://vercel.com" },
    ],
  },
} satisfies SiteContent;
