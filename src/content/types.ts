export type SocialPlatform = "github" | "linkedin";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export type HeroTextSegment = {
  text: string;
  emphasis?: boolean;
};

export type HeroTextParagraph = {
  segments: readonly HeroTextSegment[];
  spacing?: "compact" | "normal";
};

export type FooterTechnology =
  | "bun"
  | "react"
  | "tailwind"
  | "tanstack"
  | "typescript"
  | "vercel"
  | "vite";

export type SiteContent = {
  language: string;
  identity: {
    fullName: string;
    jobTitle: string;
  };
  seo: {
    title: string;
    description: string;
    openGraphDescription: string;
    author: string;
  };
  hero: {
    backgroundImage: string;
    profileImage: string;
    profileAlt: string;
    summary: readonly HeroTextParagraph[];
    email: string;
    socials: readonly SocialLink[];
    photoCredit: string;
  };
  footer: {
    contentLabel: string;
    contentRights: string;
    reusePrompt: string;
    licenseLabel: string;
    sourceLink: {
      label: string;
      repository: RepositoryReference;
    };
    stackLabel: string;
    technologies: readonly {
      id: FooterTechnology;
      label: string;
      href: string;
    }[];
  };
};

export type SectionIcon =
  | "document"
  | "education"
  | "experience"
  | "overview"
  | "repositories"
  | "research"
  | "skills"
  | "user";

export type SectionHeadingContent = {
  id: string;
  navLabel: string;
  index: string;
  title: string;
  icon: SectionIcon;
};

export type ProseColumn = SectionHeadingContent & {
  contentType: "prose";
  paragraphs: readonly string[];
};

export type BulletColumn = SectionHeadingContent & {
  contentType: "bullets";
  items: readonly {
    title: string;
    description: string;
  }[];
};

export type SplitSection = {
  type: "split";
  columns: readonly (ProseColumn | BulletColumn)[];
};

export type Publication = {
  venue: string;
  year?: string;
  type?: string;
  status?: string;
  url?: string;
  hideVenue?: boolean;
};

export type RepositoryLink = {
  url: string;
};

export type TimelineItemContent = {
  anchorId?: string;
  period: string;
  duration?: string;
  title: string;
  alternateTitle?: string;
  subtitle: string;
  location?: string;
  concurrent?: string;
  kind?: string;
  supervisor?: string;
  description?: string;
  highlights?: readonly string[];
  courses?: readonly string[];
  publications?: readonly Publication[];
  repositories?: readonly RepositoryLink[];
};

export type TimelineSection = SectionHeadingContent & {
  type: "timeline";
  items: readonly TimelineItemContent[];
};

export type RepositoryReference = {
  owner: string;
  name: string;
  description?: string;
};

export type RepositoryGroup = {
  title: string;
  repositories: readonly RepositoryReference[];
};

export type RepositoriesSection = SectionHeadingContent & {
  type: "repositories";
  groups: readonly RepositoryGroup[];
  footerLink?: {
    label: string;
    href: string;
  };
};

export type DownloadSection = SectionHeadingContent & {
  type: "download";
  cardTitle: string;
  description: string;
  meta: string;
  href: string;
  buttonLabel: string;
};

export type SkillGroup = {
  title: string;
  skills: readonly string[];
};

export type SkillsSection = SectionHeadingContent & {
  type: "skills";
  groups: readonly SkillGroup[];
};

export type SnapshotItem = {
  label: string;
  text: string;
};

export type SnapshotSection = SectionHeadingContent & {
  type: "snapshot";
  items: readonly SnapshotItem[];
};

export type PortfolioSection =
  | DownloadSection
  | RepositoriesSection
  | SkillsSection
  | SnapshotSection
  | SplitSection
  | TimelineSection;

export type NavigationItem = {
  id: string;
  label: string;
};
