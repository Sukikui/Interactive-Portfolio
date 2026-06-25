import { ChevronDown } from "lucide-react";

type CourseListProps = {
  courses: readonly string[];
  variant: "desktopDetails" | "mobileBullet";
};

export function CourseList({ courses, variant }: CourseListProps) {
  if (variant === "mobileBullet") {
    return (
      <li className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:top-[0.55em] before:left-0 before:size-1 before:rounded-full before:bg-brand/60 before:content-['']">
        <span>Relevant coursework</span>
        <ul className="mt-2 space-y-1.5">
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
      </li>
    );
  }

  return (
    <details className="group mt-3 hidden md:block">
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
