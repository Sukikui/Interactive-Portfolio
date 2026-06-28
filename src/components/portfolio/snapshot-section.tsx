import type { SnapshotSection } from "@/content";

import { SectionShell } from "./section-shell";

export function SnapshotSectionView({ section }: { section: SnapshotSection }) {
  return (
    <SectionShell heading={section}>
      <ul className="space-y-5">
        {section.items.map((item) => (
          <li
            key={item.label}
            className="grid gap-2 border-b border-border/70 pb-5 last:border-b-0 last:pb-0 md:grid-cols-[minmax(16rem,19rem)_minmax(0,1fr)] md:items-baseline md:gap-5"
          >
            <p className="text-sm font-semibold tracking-tight text-brand">{item.label}</p>
            <p className="text-sm leading-relaxed text-foreground/80">{item.text}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
