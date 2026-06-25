import type { SkillsSection } from "@/content";

import { SectionShell } from "./section-shell";

export function SkillsSectionView({ section }: { section: SkillsSection }) {
  return (
    <SectionShell heading={section}>
      <div className="divide-y divide-border">
        {section.groups.map((group) => (
          <div
            key={group.title}
            className="grid gap-3 py-5 first:pt-0 last:pb-0 md:grid-cols-[210px_1fr] md:gap-8"
          >
            <h3 className="font-mono-tight pt-1 text-xs tracking-[0.2em] text-brand uppercase">
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="size-1.5 rounded-full bg-brand/70" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
