import { ArrowUpRight, ChevronDown, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import type { TimelineItemContent, TimelineSection } from "@/content";

import { SectionShell } from "./section-shell";
import { CourseList } from "./timeline-course-list";

const PUBLICATION_TITLE_LIMIT = 50;

export function TimelineSectionView({
  section,
  openItemKey,
  onOpenItemKeyChange,
}: {
  section: TimelineSection;
  openItemKey: string | null;
  onOpenItemKeyChange: (itemKey: string | null) => void;
}) {
  return (
    <SectionShell heading={section}>
      <div className="space-y-6">
        {section.items.map((item) => {
          const itemKey = getTimelineItemKey(section.id, item);
          return (
            <TimelineItem
              key={itemKey}
              item={item}
              itemKey={itemKey}
              isOpen={openItemKey === itemKey}
              onToggle={() => onOpenItemKeyChange(openItemKey === itemKey ? null : itemKey)}
            />
          );
        })}
      </div>
    </SectionShell>
  );
}

function TimelineItem({
  item,
  itemKey,
  isOpen,
  onToggle,
}: {
  item: TimelineItemContent;
  itemKey: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const detailsId = `timeline-details-${toDomId(itemKey)}`;

  return (
    <div className="grid gap-2 border-b border-border/60 pb-6 last:border-0 last:pb-0 md:grid-cols-[180px_1fr] md:gap-8">
      <div className="hidden pt-1.5 md:block">
        <div className="font-mono-tight text-xs tracking-wider text-muted-foreground">
          {item.period}
        </div>
        {item.duration && (
          <div className="font-mono-tight text-[10px] tracking-wider text-muted-foreground/60 md:mt-0.5">
            {item.duration}
          </div>
        )}
      </div>
      <div>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={detailsId}
          onClick={onToggle}
          className="group w-full touch-manipulation text-left md:hidden"
        >
          <TimelineItemMobileSummary item={item} isOpen={isOpen} />
        </button>

        <div className="hidden md:block">
          <TimelineItemDesktopSummary item={item} />
        </div>

        <div id={detailsId} className={`${isOpen ? "block" : "hidden"} mt-4 md:mt-0 md:block`}>
          <TimelineItemDetails item={item} />
        </div>
      </div>
    </div>
  );
}

function TimelineItemMobileSummary({
  item,
  isOpen,
}: {
  item: TimelineItemContent;
  isOpen: boolean;
}) {
  return (
    <>
      <div className="mb-2 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-brand">{item.subtitle}</p>
          {item.location && (
            <p className="font-mono-tight mt-0.5 truncate text-[11px] tracking-wide text-muted-foreground">
              {item.location}
            </p>
          )}
        </div>
        <div className="flex items-start gap-2 text-right">
          <div>
            <p className="font-mono-tight text-xs tracking-wider whitespace-nowrap text-muted-foreground">
              {item.period}
            </p>
            {item.duration && (
              <p className="font-mono-tight mt-0.5 text-[10px] tracking-wider whitespace-nowrap text-muted-foreground/60">
                {item.duration}
              </p>
            )}
          </div>
          <ChevronDown
            className={`mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:text-brand ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      {item.concurrent && (
        <div className="mt-2">
          <span className="font-mono-tight rounded border border-brand/40 px-1.5 py-0.5 text-[10px] tracking-wider text-brand/90 uppercase">
            {item.concurrent}
          </span>
        </div>
      )}
      <TimelineItemTitle item={item} />
    </>
  );
}

function TimelineItemDesktopSummary({ item }: { item: TimelineItemContent }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="text-sm font-medium text-brand">{item.subtitle}</p>
        {item.location && (
          <span className="font-mono-tight text-[11px] tracking-wide text-muted-foreground">
            {item.location}
          </span>
        )}
        {item.concurrent && (
          <span className="font-mono-tight rounded border border-brand/40 px-1.5 py-0.5 text-[10px] tracking-wider text-brand/90 uppercase">
            {item.concurrent}
          </span>
        )}
      </div>
      <TimelineItemTitle item={item} />
    </>
  );
}

function TimelineItemTitle({ item }: { item: TimelineItemContent }) {
  return (
    <>
      <h3 className="mt-1 text-lg font-semibold text-foreground md:mt-2 md:flex md:flex-wrap md:items-baseline md:gap-x-2 md:text-xl">
        {item.kind && (
          <span className="font-normal text-foreground">
            {item.kind}
            <span className="ml-2 text-foreground">—</span>
          </span>
        )}
        <span className={item.kind ? "ml-2 md:ml-0" : ""}>{item.title}</span>
      </h3>
      {item.alternateTitle && (
        <p className="mt-0.5 text-sm text-muted-foreground italic">{item.alternateTitle}</p>
      )}
    </>
  );
}

function TimelineItemDetails({ item }: { item: TimelineItemContent }) {
  const hasHighlights = !!item.highlights?.length;
  const hasCourses = !!item.courses?.length;

  return (
    <>
      {item.supervisor && (
        <p className="mt-1.5 text-xs text-muted-foreground/80 italic">{item.supervisor}</p>
      )}
      {item.description && (
        <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
      )}
      {hasHighlights && (
        <ul className="mt-3 space-y-1.5">
          {item.highlights?.map((highlight) => (
            <li
              key={highlight}
              className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:top-[0.55em] before:left-0 before:size-1 before:rounded-full before:bg-brand/60 before:content-['']"
            >
              <HighlightText text={highlight} />
            </li>
          ))}
        </ul>
      )}
      {hasCourses && (
        <ul className={`${hasHighlights ? "mt-1.5" : "mt-3"} space-y-1.5 md:hidden`}>
          <CourseList courses={item.courses ?? []} variant="mobileBullet" />
        </ul>
      )}
      <TimelineLinks item={item} />
      {hasCourses && <CourseList courses={item.courses ?? []} variant="desktopDetails" />}
    </>
  );
}

function TimelineLinks({ item }: { item: TimelineItemContent }) {
  if (!item.publications?.length && !item.repositories?.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {item.publications?.map((publication) => {
        const Tag = publication.url ? "a" : "div";
        return (
          <Tag
            key={`${publication.type}-${publication.venue}-${publication.year}`}
            {...(publication.url
              ? { href: publication.url, target: "_blank", rel: "noreferrer" }
              : {})}
            className={`font-mono-tight inline-flex items-stretch overflow-hidden rounded-md border border-border bg-card text-[11px] ${
              publication.url ? "transition-colors hover:border-brand/60 hover:bg-accent/40" : ""
            }`}
          >
            <span className="flex items-center gap-1.5 px-2 py-1 tracking-wide text-muted-foreground">
              <FileText className="size-3" />
              {publication.type ?? "Publication"}
            </span>
            <span className="group flex min-w-0 items-center gap-1.5 px-2 py-1 text-foreground/90">
              {!publication.hideVenue && (
                <span className="font-semibold text-brand">
                  <PublicationTitle title={publication.venue} />
                  {publication.year && <span className="ml-1">{publication.year}</span>}
                </span>
              )}
              {publication.status && (
                <span className="opacity-60 italic">· {publication.status}</span>
              )}
              {publication.url && (
                <ArrowUpRight className="ml-0.5 size-3 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              )}
            </span>
          </Tag>
        );
      })}
      {item.repositories?.map((repository) => {
        const url = repository.url.replace(/\/$/, "");
        const path = url.replace(/^https?:\/\/(www\.)?github\.com\//, "");
        const [owner, name] = path.split("/");
        return (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="font-mono-tight group inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-[11px] transition-colors hover:border-brand/60 hover:bg-accent/40"
          >
            <FaGithub className="size-3.5 text-muted-foreground transition-colors group-hover:text-brand" />
            <span className="opacity-60">{owner}/</span>
            <span className="font-semibold text-brand">{name}</span>
            <ArrowUpRight className="ml-0.5 size-3 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </a>
        );
      })}
    </div>
  );
}

function PublicationTitle({ title }: { title: string }) {
  const characters = Array.from(title);
  const truncated = characters.length > PUBLICATION_TITLE_LIMIT;

  return (
    <span
      aria-label={truncated ? title : undefined}
      title={truncated ? title : undefined}
      className="inline-block max-w-[12rem] align-bottom whitespace-nowrap sm:max-w-none"
      style={
        truncated
          ? {
              maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, black 70%, transparent 100%)",
            }
          : undefined
      }
    >
      {truncated ? characters.slice(0, PUBLICATION_TITLE_LIMIT).join("") : title}
    </span>
  );
}

function HighlightText({ text }: { text: string }) {
  const match = text.match(
    /(?:—\s*)?(overall\s+)?GPA[:\s]*([0-9]\.[0-9]{1,2})\s*\/\s*([0-9]\.[0-9]{1,2})/i,
  );
  if (!match) return text;

  const before = text.slice(0, match.index).replace(/[\s—–\-,;:]+$/, "");
  const [, overall, value, scale] = match;
  const major = before.match(/^(Major in\s+)(.+)$/i);
  return (
    <>
      {major ? (
        <>
          {major[1]}
          <span className="font-semibold text-foreground">{major[2]}</span>
        </>
      ) : (
        before
      )}
      <span className="ml-1.5 inline-flex items-baseline align-baseline text-xs text-muted-foreground">
        <span>({overall ? "Overall GPA" : "GPA"}&nbsp;</span>
        <span className="font-medium text-foreground/80">
          {value}/{scale}
        </span>
        <span>)</span>
      </span>
    </>
  );
}

function getTimelineItemKey(sectionId: string, item: TimelineItemContent) {
  return `${sectionId}-${item.period}-${item.subtitle}-${item.title}`;
}

function toDomId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
