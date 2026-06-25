import type { ReactNode } from "react";
import {
  Briefcase,
  FileText,
  FlaskConical,
  FolderGit2,
  GraduationCap,
  Sparkles,
  Wrench,
  User,
  type LucideIcon,
} from "lucide-react";

import type { SectionHeadingContent, SectionIcon } from "@/content/types";

const SECTION_ICONS: Record<SectionIcon, LucideIcon> = {
  document: FileText,
  education: GraduationCap,
  experience: Briefcase,
  overview: Sparkles,
  repositories: FolderGit2,
  research: FlaskConical,
  skills: Wrench,
  user: User,
};

export function SectionShell({
  heading,
  children,
}: {
  heading: SectionHeadingContent;
  children: ReactNode;
}) {
  return (
    <section id={heading.id} className="scroll-mt-20 border-b border-border py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading heading={heading} />
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({ heading }: { heading: SectionHeadingContent }) {
  const Icon = SECTION_ICONS[heading.icon];
  return (
    <div className="mb-8 flex items-center gap-2">
      <span className="font-mono-tight text-xs text-brand">{heading.index}</span>
      <div className="h-px max-w-6 flex-1 bg-border" />
      <Icon className="size-4 text-brand" />
      <h2 className="section-heading ml-2 text-foreground">{heading.title}</h2>
    </div>
  );
}
