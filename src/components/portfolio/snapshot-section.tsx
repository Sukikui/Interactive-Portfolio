import type { SnapshotSection } from "@/content";

import { SectionShell } from "./section-shell";

const SNAPSHOT_LABEL_COLORS = [
  "var(--brand)",
  "oklch(0.64 0.18 275)",
  "oklch(0.63 0.18 295)",
  "oklch(0.61 0.18 320)",
  "oklch(0.59 0.17 340)",
] as const;

const SNAPSHOT_ACCENT_GRADIENT =
  "linear-gradient(180deg, var(--brand) 0%, oklch(0.64 0.18 275) 28%, oklch(0.63 0.18 295) 50%, oklch(0.61 0.18 320) 74%, oklch(0.59 0.17 340) 100%)";

export function SnapshotSectionView({ section }: { section: SnapshotSection }) {
  return (
    <SectionShell heading={section}>
      <div className="relative pl-4">
        <span
          aria-hidden
          className="absolute top-0 left-0 h-full w-px opacity-75"
          style={{ background: SNAPSHOT_ACCENT_GRADIENT }}
        />
        <ul className="space-y-4">
          {section.items.map((item, index) => (
            <li
              key={item.label}
              className="grid gap-1.5 md:grid-cols-[minmax(13rem,15rem)_1fr] md:gap-4"
            >
              <p
                className="font-mono-tight whitespace-nowrap text-sm font-semibold tracking-[0.1em] uppercase"
                style={{
                  color: SNAPSHOT_LABEL_COLORS[index % SNAPSHOT_LABEL_COLORS.length],
                }}
              >
                {item.label}
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
