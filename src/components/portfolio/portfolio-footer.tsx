import type { IconType } from "react-icons";
import { SiBun, SiReact, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";

import type { FooterTechnology, SiteContent } from "@/content/types";

const TECHNOLOGY_ICONS = {
  bun: SiBun,
  react: SiReact,
  tailwind: SiTailwindcss,
  typescript: SiTypescript,
  vercel: SiVercel,
} satisfies Record<Exclude<FooterTechnology, "tanstack" | "vite">, IconType>;

const TECHNOLOGY_ICON_CLASSES = {
  bun: "text-foreground",
  react: "text-[#087ea4] dark:text-[#61dafb]",
  tailwind: "text-[#06b6d4]",
  typescript: "text-[#3178c6]",
  vercel: "text-foreground",
} satisfies Record<Exclude<FooterTechnology, "tanstack" | "vite">, string>;

type PortfolioFooterProps = {
  content: SiteContent["footer"];
  fullName: string;
  onSourceClick: () => void;
};

export function PortfolioFooter({ content, fullName, onSourceClick }: PortfolioFooterProps) {
  return (
    <footer className="border-t border-border py-10">
      <div className="font-mono-tight mx-auto grid max-w-6xl gap-8 px-6 text-xs leading-4 text-muted-foreground md:grid-cols-2">
        <div className="space-y-2 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} {fullName}
          </p>
          <p className="flex flex-wrap justify-center gap-x-2 gap-y-1 md:justify-start">
            <span>{content.contentLabel}</span>
            <span aria-hidden="true">•</span>
            <span>{content.contentRights}</span>
          </p>
          <p className="flex flex-wrap justify-center gap-x-2 gap-y-1 md:justify-start">
            <span>{content.codeLabel}</span>
            <span aria-hidden="true">•</span>
            <span>{content.codeLicense}</span>
            <span aria-hidden="true">•</span>
            <button
              type="button"
              onClick={onSourceClick}
              className="cursor-pointer transition-colors hover:text-foreground"
            >
              {content.sourceLink.label}
            </button>
          </p>
        </div>

        <div className="grid gap-y-2 text-center md:text-right">
          <p className="tracking-[0.16em] uppercase">{content.stackLabel}</p>
          <ul className="grid grid-cols-2 justify-center gap-x-4 gap-y-2 text-left sm:grid-cols-[repeat(4,max-content)] md:justify-end">
            {content.technologies.map((technology) => (
              <li key={technology.id}>
                <a
                  href={technology.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <TechnologyIcon technology={technology.id} />
                  <span>{technology.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function TechnologyIcon({ technology }: { technology: FooterTechnology }) {
  if (technology === "tanstack") {
    return (
      <span
        aria-hidden="true"
        className="flex size-4 items-center justify-center text-sm leading-none"
      >
        🌴
      </span>
    );
  }

  if (technology === "vite") {
    return (
      <svg
        viewBox="0 0 48 46"
        aria-hidden="true"
        className="size-4 text-[#863bff]"
        fill="currentColor"
      >
        <path d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.262 2.262 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.041-.92-1.789L10.013.474A1.13 1.13 0 0 1 10.933 0h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.087.889 1.83L25.946 44.938Z" />
      </svg>
    );
  }

  const Icon = TECHNOLOGY_ICONS[technology];
  return <Icon aria-hidden="true" className={`size-4 ${TECHNOLOGY_ICON_CLASSES[technology]}`} />;
}
