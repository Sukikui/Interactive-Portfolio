import type { SkillsSection } from "@/content";

import { SectionShell } from "./section-shell";

export function SkillsSectionView({ section }: { section: SkillsSection }) {
  return (
    <SectionShell heading={section} compact>
      <div className="divide-y divide-border">
        {section.groups.map((group) => (
          <div
            key={group.title}
            className="grid gap-2 py-3 first:pt-0 last:pb-0 md:grid-cols-[210px_1fr] md:gap-6"
          >
            <h3 className="font-mono-tight pt-1 text-xs tracking-[0.2em] text-brand uppercase">
              {group.title}
            </h3>
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {group.skills.map((skill, index) => (
                <li
                  key={skill}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span>{skill}</span>
                  {index < group.skills.length - 1 && (
                    <span aria-hidden="true" className="text-[10px] text-brand/40">
                      •
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
