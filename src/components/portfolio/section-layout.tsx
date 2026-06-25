import { Download } from "lucide-react";

import type { DownloadSection, PortfolioSection, SplitSection } from "@/content/types";

import { RepositoriesSectionView } from "./repositories-section";
import { SectionHeading, SectionShell } from "./section-shell";
import { SkillsSectionView } from "./skills-section";
import { SnapshotSectionView } from "./snapshot-section";
import { TimelineSectionView } from "./timeline-section";

type PortfolioSectionViewProps = {
  section: PortfolioSection;
  highlightedRepositoryId: string | null;
  onRepositoryHighlightClear: () => void;
};

export function PortfolioSectionView({
  section,
  highlightedRepositoryId,
  onRepositoryHighlightClear,
}: PortfolioSectionViewProps) {
  switch (section.type) {
    case "split":
      return <SplitSectionView section={section} />;
    case "timeline":
      return <TimelineSectionView section={section} />;
    case "repositories":
      return (
        <RepositoriesSectionView
          section={section}
          highlightedRepositoryId={highlightedRepositoryId}
          onHighlightClear={onRepositoryHighlightClear}
        />
      );
    case "skills":
      return <SkillsSectionView section={section} />;
    case "snapshot":
      return <SnapshotSectionView section={section} />;
    case "download":
      return <DownloadSectionView section={section} />;
  }
}

function SplitSectionView({ section }: { section: SplitSection }) {
  return (
    <section className="scroll-mt-20 border-b border-border py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {section.columns.map((column, index) => (
            <div
              key={column.id}
              id={column.id}
              className={`scroll-mt-20 ${index > 0 ? "lg:border-l lg:border-border lg:pl-16" : ""}`}
            >
              <SectionHeading heading={column} />
              {column.contentType === "prose" ? (
                column.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraph}
                    className={`${paragraphIndex > 0 ? "mt-4" : ""} text-xs leading-relaxed text-muted-foreground md:text-sm`}
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <ul className="space-y-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
                  {column.items.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                      <span className="space-y-1">
                        <span className="block font-medium text-foreground">{item.title}</span>
                        <span className="block">{item.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadSectionView({ section }: { section: DownloadSection }) {
  return (
    <SectionShell heading={section}>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10">
        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-semibold text-card-foreground">{section.cardTitle}</h3>
            <p className="mt-2 max-w-lg text-muted-foreground">{section.description}</p>
            <p className="font-mono-tight mt-3 text-xs text-muted-foreground">{section.meta}</p>
          </div>
          <a
            href={section.href}
            download
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 font-medium text-white shadow-lg shadow-brand/25 transition-opacity hover:opacity-90"
          >
            <Download className="size-4" />
            {section.buttonLabel}
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
