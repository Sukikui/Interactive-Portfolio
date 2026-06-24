import { educationItems } from "./education";
import { experienceItems } from "./experience";
import { overviewSection } from "./overview";
import { projectGroups } from "./projects";
import type { NavigationItem, PortfolioSection } from "./types";

export const portfolioSections = [
  overviewSection,
  {
    type: "timeline",
    id: "experience",
    navLabel: "Experience",
    index: "03",
    title: "Experience",
    icon: "experience",
    items: experienceItems,
  },
  {
    type: "timeline",
    id: "education",
    navLabel: "Education",
    index: "04",
    title: "Education",
    icon: "education",
    items: educationItems,
  },
  {
    type: "repositories",
    id: "projects",
    navLabel: "Side Projects",
    index: "05",
    title: "Side Projects",
    icon: "repositories",
    groups: projectGroups,
    footerLink: {
      label: "See all repositories on GitHub",
      href: "https://github.com/Sukikui",
    },
  },
  {
    type: "download",
    id: "cv",
    navLabel: "CV",
    index: "06",
    title: "Curriculum Vitae",
    icon: "document",
    cardTitle: "Full Curriculum Vitae",
    description:
      "Complete academic record, publications, talks and technical proficiencies in a single PDF.",
    meta: "PDF · ~180 KB",
    href: "/cv.pdf",
    buttonLabel: "Download CV",
  },
] satisfies readonly PortfolioSection[];

export const navigationItems: readonly NavigationItem[] = portfolioSections.flatMap((section) =>
  section.type === "split"
    ? section.columns.map(({ id, navLabel }) => ({ id, label: navLabel }))
    : [{ id: section.id, label: section.navLabel }],
);
