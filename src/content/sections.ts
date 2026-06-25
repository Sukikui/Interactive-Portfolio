import { documents } from "./documents";
import { educationItems } from "./education";
import { experienceItems } from "./experience";
import { overviewSection } from "./overview";
import { projectGroups } from "./projects";
import { skillGroups } from "./skills";
import { snapshotItems } from "./snapshot";
import type { NavigationItem, PortfolioSection } from "./types";

export const portfolioSections = [
  {
    type: "snapshot",
    id: "snapshot",
    navLabel: "At a Glance",
    index: "01",
    title: "At a Glance",
    icon: "overview",
    items: snapshotItems,
  },
  overviewSection,
  {
    type: "timeline",
    id: "experience",
    navLabel: "Experience",
    index: "04",
    title: "Experience",
    icon: "experience",
    items: experienceItems,
  },
  {
    type: "timeline",
    id: "education",
    navLabel: "Education",
    index: "05",
    title: "Education",
    icon: "education",
    items: educationItems,
  },
  {
    type: "repositories",
    id: "projects",
    navLabel: "Projects",
    index: "06",
    title: "Academic & Side Projects",
    icon: "repositories",
    groups: projectGroups,
    footerLink: {
      label: "See all repositories on GitHub",
      href: "https://github.com/Sukikui",
    },
  },
  {
    type: "skills",
    id: "skills",
    navLabel: "Skills",
    index: "07",
    title: "Technical Skills",
    icon: "skills",
    groups: skillGroups,
  },
  {
    type: "download",
    id: "cv",
    navLabel: "CV",
    index: "08",
    title: "Curriculum Vitae",
    icon: "document",
    cardTitle: "Résumé PDF",
    description:
      "A concise PDF version of my profile, so you can keep the essentials at hand after browsing this website.",
    meta: "PDF · ~2 MB",
    href: documents.cv,
    buttonLabel: "Open CV",
  },
] satisfies readonly PortfolioSection[];

export const navigationItems: readonly NavigationItem[] = portfolioSections.flatMap((section) =>
  section.type === "split"
    ? section.columns.map(({ id, navLabel }) => ({ id, label: navLabel }))
    : [{ id: section.id, label: section.navLabel }],
);
