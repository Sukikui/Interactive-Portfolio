import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Info, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import type { SiteContent, SocialPlatform } from "@/content/types";

const SOCIAL_ICONS: Record<SocialPlatform, typeof FaGithub> = {
  github: FaGithub,
  linkedin: FaLinkedin,
};

type PortfolioHeroProps = {
  identity: SiteContent["identity"];
  content: SiteContent["hero"];
  scrollDisabled?: boolean;
  onScroll: () => void;
};

export function PortfolioHero({
  identity,
  content,
  scrollDisabled = false,
  onScroll,
}: PortfolioHeroProps) {
  const [showCredit, setShowCredit] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [profileReady, setProfileReady] = useState(false);
  const profileImageRef = useRef<HTMLImageElement>(null);

  const revealProfile = (image: HTMLImageElement) => {
    void image
      .decode()
      .catch(() => undefined)
      .then(() => setProfileReady(true));
  };

  useEffect(() => {
    const image = profileImageRef.current;
    if (image?.complete) revealProfile(image);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowCredit(true), 10000);
    return () => window.clearTimeout(timer);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(content.email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = content.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1800);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[120svh] w-full overflow-hidden bg-[#0b1020] md:h-screen"
    >
      <img
        src={content.backgroundImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/[0.42]" />

      <div className="relative mx-auto flex min-h-[120svh] max-w-6xl items-center px-6 pt-24 pb-24 md:h-full md:min-h-0 md:pt-0 md:pb-0">
        <div className="mx-auto grid w-full max-w-4xl items-center gap-6 md:grid-cols-[auto_1fr] md:gap-20">
          <div
            className={`flex justify-center transition-all duration-700 ease-out md:justify-start ${
              profileReady ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="relative size-[8.75rem] overflow-hidden rounded-full shadow-2xl shadow-black/40 ring-1 ring-white/15 sm:size-[10.5rem] md:size-[13.5rem]">
              <img
                ref={profileImageRef}
                src={content.profileImage}
                alt={content.profileAlt}
                width={320}
                height={320}
                loading="eager"
                fetchPriority="high"
                onLoad={(event) => revealProfile(event.currentTarget)}
                className="absolute inset-0 h-full w-full translate-y-[5%] scale-[1.2] object-cover"
              />
            </div>
          </div>

          <div className="animate-fade-up text-center text-white [animation-delay:120ms] md:text-left">
            <h1 className="text-[clamp(2rem,9.5vw,3rem)] leading-[1.02] font-semibold tracking-tight whitespace-nowrap md:text-7xl">
              {identity.fullName}
            </h1>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[clamp(0.8rem,3vw,0.95rem)] font-medium tracking-[0.035em] whitespace-nowrap text-hero-accent md:mt-3 md:justify-start md:gap-2 md:text-base md:tracking-[0.08em]">
              <span
                aria-hidden
                className="font-mono-tight text-base font-light opacity-70 md:text-lg"
              >
                &gt;
              </span>
              <span>{identity.jobTitle}</span>
            </p>
            <div className="mx-auto mt-5 h-px w-16 bg-white/25 md:mx-0 md:mt-6" />

            <div className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed font-light text-white/75 sm:text-base md:mx-0 md:mt-7 md:text-lg">
              {content.summary.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className={
                    paragraphIndex === 0 ? "" : paragraph.spacing === "compact" ? "mt-2" : "mt-4"
                  }
                >
                  {paragraph.segments.map((segment, segmentIndex) =>
                    segment.emphasis ? (
                      <span key={segmentIndex} className="font-medium text-white">
                        {segment.text}
                      </span>
                    ) : (
                      segment.text
                    ),
                  )}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mt-8 md:justify-start">
              <EmailButton email={content.email} copied={emailCopied} onCopy={copyEmail} />
              <span className="h-4 w-px bg-white/20" />
              {content.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {!scrollDisabled && (
        <button
          onClick={onScroll}
          className="font-mono-tight absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-white/65 uppercase hover:text-white"
        >
          <span>Scroll</span>
          <ChevronDown className="animate-scroll-hint size-5" />
        </button>
      )}

      <div
        className={`group absolute bottom-6 left-6 hidden items-center gap-2 transition-opacity duration-700 md:flex ${
          showCredit ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Info className="size-3.5 text-white/40 transition-colors group-hover:text-white/80" />
        <span className="pointer-events-none -translate-x-1 text-[11px] font-normal whitespace-nowrap text-white/95 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          {content.photoCredit}
        </span>
      </div>
    </section>
  );
}

function EmailButton({
  email,
  copied,
  onCopy,
}: {
  email: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="group relative inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
    >
      <span className="relative inline-flex size-5 items-center justify-center">
        <Mail
          className={`absolute size-5 transition-all duration-300 ${
            copied ? "-rotate-12 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Check
          className={`absolute size-5 text-emerald-300 transition-all duration-300 ${
            copied ? "rotate-0 scale-100 opacity-100" : "scale-75 rotate-12 opacity-0"
          }`}
        />
      </span>
      <span className="text-sm font-light">{email}</span>
      <span
        aria-hidden
        className={`font-mono-tight pointer-events-none absolute top-full left-0 mt-1 -translate-y-0.5 text-[10px] tracking-[0.2em] whitespace-nowrap uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
          copied ? "translate-y-0 text-emerald-300 opacity-100" : "text-white/60"
        }`}
      >
        {copied ? "Copied!" : "Click to copy"}
      </span>
    </button>
  );
}
