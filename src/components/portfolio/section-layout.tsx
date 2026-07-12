import { ArrowUpRight } from "lucide-react";

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
  openTimelineItemKey: string | null;
  onOpenTimelineItemKeyChange: (itemKey: string | null) => void;
};

export function PortfolioSectionView({
  section,
  highlightedRepositoryId,
  onRepositoryHighlightClear,
  openTimelineItemKey,
  onOpenTimelineItemKeyChange,
}: PortfolioSectionViewProps) {
  switch (section.type) {
    case "split":
      return <SplitSectionView section={section} />;
    case "timeline":
      return (
        <TimelineSectionView
          section={section}
          openItemKey={openTimelineItemKey}
          onOpenItemKeyChange={onOpenTimelineItemKeyChange}
        />
      );
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
    <section className="scroll-mt-20 border-b border-border py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {section.columns.map((column, index) => (
            <div
              key={column.id}
              id={column.id}
              className={`scroll-mt-20 ${index > 0 ? "lg:border-l lg:border-border lg:pl-16" : ""}`}
            >
              <SectionHeading heading={column} compact />
              {column.contentType === "prose" ? (
                column.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraph}
                    className={`${paragraphIndex > 0 ? "mt-3" : ""} text-xs leading-relaxed text-muted-foreground md:text-sm`}
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <ul className="space-y-2.5 text-xs leading-relaxed text-muted-foreground md:text-sm">
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
    <SectionShell heading={section} compact>
      <div
        className="rounded-2xl border border-border bg-card p-5 md:p-6"
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 50%, color-mix(in oklab, var(--brand) 15%, transparent), transparent 45%)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-xl font-semibold text-card-foreground">{section.cardTitle}</h3>
              <p className="font-mono-tight text-xs text-muted-foreground">{section.meta}</p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
          </div>
          <a
            href={section.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand/25 transition-opacity hover:opacity-90"
          >
            {section.buttonLabel}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
