import { ArrowUpRight, ChevronDown, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import type { TimelineItemContent, TimelineSection } from "@/content";

import { SectionShell } from "./section-shell";

const PUBLICATION_TITLE_LIMIT = 50;

export function TimelineSectionView({ section }: { section: TimelineSection }) {
  return (
    <SectionShell heading={section}>
      <div className="space-y-6">
        {section.items.map((item) => (
          <TimelineItem key={`${item.period}-${item.subtitle}-${item.title}`} item={item} />
        ))}
      </div>
    </SectionShell>
  );
}

function TimelineItem({ item }: { item: TimelineItemContent }) {
  return (
    <div className="grid gap-2 border-b border-border/60 pb-6 last:border-0 last:pb-0 md:grid-cols-[180px_1fr] md:gap-8">
      <div className="pt-1.5">
        <div className="font-mono-tight text-xs tracking-wider text-muted-foreground">
          {item.period}
        </div>
        {item.duration && (
          <div className="font-mono-tight mt-0.5 text-[10px] tracking-wider text-muted-foreground/60">
            {item.duration}
          </div>
        )}
      </div>
      <div>
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
        {item.kind && (
          <div className="font-mono-tight mt-2 text-[10px] tracking-[0.18em] text-brand/80 uppercase">
            {item.kind}
          </div>
        )}
        <h3 className="mt-1 text-xl font-semibold text-foreground">{item.title}</h3>
        {item.alternateTitle && (
          <p className="mt-0.5 text-sm text-muted-foreground italic">{item.alternateTitle}</p>
        )}
        {item.supervisor && (
          <p className="mt-1.5 text-xs text-muted-foreground/80 italic">{item.supervisor}</p>
        )}
        {item.description && (
          <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
        )}
        {item.highlights && item.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:top-[0.55em] before:left-0 before:size-1 before:rounded-full before:bg-brand/60 before:content-['']"
              >
                <HighlightText text={highlight} />
              </li>
            ))}
          </ul>
        )}
        <TimelineLinks item={item} />
        {item.courses && item.courses.length > 0 && <CourseList courses={item.courses} />}
      </div>
    </div>
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
            <span className="group flex items-center gap-1.5 px-2 py-1 text-foreground/90">
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
      className="inline-block align-bottom whitespace-nowrap"
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

function CourseList({ courses }: { courses: readonly string[] }) {
  return (
    <details className="group mt-3">
      <summary className="font-mono-tight inline-flex cursor-pointer list-none items-center gap-1.5 text-[11px] tracking-wider text-muted-foreground transition-colors hover:text-brand">
        <ChevronDown className="size-3 transition-transform group-open:rotate-180" />
        Relevant coursework
        <span className="opacity-60">({courses.length})</span>
      </summary>
      <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
        {courses.map((course) => (
          <li
            key={course}
            className="flex items-baseline gap-2 text-sm leading-snug text-muted-foreground/90"
          >
            <span className="font-mono-tight text-xs text-brand/70">›</span>
            <span>{course}</span>
          </li>
        ))}
      </ul>
    </details>
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
      <span className="font-mono-tight ml-2 inline-flex items-center gap-1 rounded border border-border/70 bg-muted/30 px-1.5 py-0.5 align-middle text-[10px] tracking-wider text-muted-foreground/90">
        <span className="opacity-60">{overall ? "Overall GPA" : "GPA"}</span>
        <span className="text-foreground/90">{value}</span>
        <span className="opacity-50">/{scale}</span>
      </span>
    </>
  );
}
