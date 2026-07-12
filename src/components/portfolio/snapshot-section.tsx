import type { SnapshotSection } from "@/content";

import { SectionShell } from "./section-shell";

export function SnapshotSectionView({ section }: { section: SnapshotSection }) {
  return (
    <SectionShell heading={section} compact>
      <ul className="space-y-3 md:space-y-4">
        {section.items.map((item) => (
          <li
            key={item.label}
            className="grid gap-1.5 border-b border-border/70 pb-3 last:border-b-0 last:pb-0 md:grid-cols-[minmax(16rem,19rem)_minmax(0,1fr)] md:items-baseline md:gap-5 md:pb-4"
          >
            <p className="text-sm font-semibold tracking-tight text-brand">{item.label}</p>
            <p className="text-sm leading-snug text-foreground/80">{item.text}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
