import { ArrowUpRight, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import type { TimelineItemContent } from "@/content";

const PUBLICATION_TITLE_LIMIT = 50;

export function TimelineLinks({ item }: { item: TimelineItemContent }) {
  if (!item.publications?.length && !item.repositories?.length) return null;

  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
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
