import { useEffect, useRef } from "react";

import { ArrowUpRight, Scale, Tag } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import type { RepositoriesSection, RepositoryReference } from "@/content";
import { useRepositoryData } from "@/hooks/use-repository-data";
import { getGitHubRepositoryUrl, getRepositoryAnchorId } from "@/lib/github";
import { cn } from "@/lib/utils";

import { SectionShell } from "./section-shell";

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051",
  "C++": "#f34b7d",
  C: "#555555",
  TeX: "#3D6117",
  CUDA: "#3A4E3A",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Rust: "#dea584",
  Go: "#00ADD8",
  Dockerfile: "#384d54",
  Makefile: "#427819",
  Lua: "#000080",
  Julia: "#a270ba",
  R: "#198CE7",
  Java: "#b07219",
};

type RepositoriesSectionViewProps = {
  section: RepositoriesSection;
  highlightedRepositoryId: string | null;
  onHighlightClear: () => void;
};

export function RepositoriesSectionView({
  section,
  highlightedRepositoryId,
  onHighlightClear,
}: RepositoriesSectionViewProps) {
  return (
    <SectionShell heading={section}>
      <div className="space-y-10">
        {section.groups.map((group) => (
          <div key={group.title}>
            <div className="mb-4 flex items-center gap-3">
              <h3 className="font-mono-tight text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {group.title}
              </h3>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {group.repositories.map((repository) => (
                <RepositoryCard
                  key={`${repository.owner}/${repository.name}`}
                  repository={repository}
                  highlightedRepositoryId={highlightedRepositoryId}
                  onHighlightClear={onHighlightClear}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {section.footerLink && (
        <div className="mt-8 text-center">
          <a
            href={section.footerLink.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-opacity hover:opacity-80"
          >
            <FaGithub className="size-4" />
            {section.footerLink.label}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      )}
    </SectionShell>
  );
}

type RepositoryCardProps = {
  repository: RepositoryReference;
  highlightedRepositoryId: string | null;
  onHighlightClear: () => void;
};

function RepositoryCard({
  repository,
  highlightedRepositoryId,
  onHighlightClear,
}: RepositoryCardProps) {
  const { data, error } = useRepositoryData(repository);
  const hasFooter = !!(data && (data.languages.length > 0 || data.license || data.releases > 0));
  const description = repository.description ?? data?.description;
  const anchorId = getRepositoryAnchorId(repository);
  const isHighlighted = highlightedRepositoryId === anchorId;
  const hasInteractedWithHighlight = useRef(false);

  useEffect(() => {
    if (isHighlighted) hasInteractedWithHighlight.current = false;
  }, [isHighlighted]);

  return (
    <a
      id={anchorId}
      href={getGitHubRepositoryUrl(repository)}
      target="_blank"
      rel="noreferrer"
      onMouseMove={() => {
        if (!highlightedRepositoryId) return;

        if (isHighlighted) {
          hasInteractedWithHighlight.current = true;
        } else {
          onHighlightClear();
        }
      }}
      onMouseLeave={() => {
        if (isHighlighted && hasInteractedWithHighlight.current) onHighlightClear();
      }}
      className={cn(
        "group relative flex scroll-mt-24 flex-col rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-xl hover:shadow-brand/5",
        isHighlighted &&
          "-translate-y-0.5 border-brand/60 shadow-[inset_0_0_48px_-24px_var(--color-brand)]",
      )}
    >
      <div className="flex items-start gap-3">
        <FaGithub
          className={cn(
            "mt-0.5 size-5 text-muted-foreground transition-colors group-hover:text-brand",
            isHighlighted && "text-brand",
          )}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="truncate text-muted-foreground">{repository.owner}</span>
            <span className="text-muted-foreground">/</span>
            <span className="truncate text-brand">{repository.name}</span>
          </div>
        </div>
        <ArrowUpRight
          className={cn(
            "size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand",
            isHighlighted && "translate-x-0.5 -translate-y-0.5 text-brand",
          )}
        />
      </div>

      <p className="mt-3 min-h-[2.5rem] line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {error ? "Repository information unavailable." : (description ?? "Loading…")}
      </p>

      {hasFooter && data && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          {data.languages.map((language) => (
            <span key={language.name} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: LANGUAGE_COLORS[language.name] ?? "#888" }}
              />
              {language.name}
            </span>
          ))}
          {data.license && (
            <span className="flex items-center gap-1.5">
              <Scale className="size-3.5" />
              {data.license}
            </span>
          )}
          {data.releases > 0 && (
            <span className="font-mono-tight flex items-center gap-1.5">
              <Tag className="size-3.5" />
              {data.releases} {data.releases === 1 ? "release" : "releases"}
            </span>
          )}
        </div>
      )}
    </a>
  );
}
