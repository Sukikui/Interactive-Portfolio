import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Moon,
  Sun,
  Download,
  Mail,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  FileText,
  Scale,
  Tag,
  ArrowUpRight,
  FlaskConical,
  Info,
  Check,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import profileAsset from "@/assets/profile.png.asset.json";
import heroBgAsset from "@/assets/hero-bg.jpeg.asset.json";
const profile = profileAsset.url;
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tristan Habémont — AI Research Engineer" },
      {
        name: "description",
        content:
          "Academic portfolio of Tristan Habémont, AI research engineer. Research interests, education, experience, open-source projects and CV.",
      },
      { property: "og:title", content: "Tristan Habémont — AI Research Engineer" },
      {
        property: "og:description",
        content: "Research interests, projects and CV of Tristan Habémont, AI research engineer.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "presentation", label: "Presentation" },
  { id: "research", label: "Interests" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Side Projects" },
  { id: "cv", label: "CV" },
  
];

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [showCredit, setShowCredit] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const EMAIL = "tristan.habemont@gmail.com";
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1800);
  };
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowCredit(true), 10000);
    return () => window.clearTimeout(timer);
  }, []);

  // Track current active section based on scroll position
  const [activeId, setActiveId] = useState<string>(NAV[0].id);
  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + 96; // just below header
      let current = NAV[0].id;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) {
          current = n.id;
        }
      }
      // If we've reached the bottom of the page, force focus on the last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = NAV[NAV.length - 1].id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navTrackRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const apply = () => {
      const el = itemRefs.current[activeId];
      const container = navContainerRef.current;
      if (!el || !container) return;
      const END_GUTTER = -64; // negative pushes the last item further left
      const maxNatural = Math.max(0, container.scrollWidth - container.clientWidth);
      const target = Math.min(
        el.offsetLeft,
        container.scrollWidth - container.clientWidth - END_GUTTER,
      );
      const clamped = Math.max(0, Math.min(target, maxNatural));
      container.scrollTo({ left: clamped, behavior: "smooth" });
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [activeId, scrolled]);


  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header — rendered twice: a static one over the hero (always visible there),
          and a fixed one that slides in once the hero is out of view. */}
      {([
        {
          key: "hero",
          wrapperClass:
            "absolute inset-x-0 top-0 z-50 bg-transparent border-b border-transparent",
          onDark: true,
        },
        {
          key: "fixed",
          wrapperClass: `fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-background/50 border-b border-border/40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
            scrolled
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`,
          onDark: false,
        },
      ] as const).map(({ key, wrapperClass, onDark }) => (
        <header key={key} className={wrapperClass} aria-hidden={key === "fixed" && !scrolled}>
          <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`hidden md:block font-display font-semibold text-base tracking-tight transition-colors ${
                onDark ? "text-white" : "text-foreground"
              }`}
            >
              Tristan Habémont
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    onDark
                      ? "text-white/75 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </nav>

            {/* Compact mobile nav — auto-slides to active section, user can also swipe */}
            <nav
              ref={key === "fixed" ? navContainerRef : undefined}
              className="md:hidden flex-1 min-w-0 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, black 0, black calc(100% - 2.5rem), transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, black 0, black calc(100% - 2.5rem), transparent 100%)",
              }}
            >
              <div
                ref={key === "fixed" ? navTrackRef : undefined}
                className="relative flex items-center gap-1 w-max pr-20"
              >
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    ref={
                      key === "fixed"
                        ? (el) => {
                            itemRefs.current[n.id] = el;
                          }
                        : undefined
                    }
                    onClick={() => scrollTo(n.id)}
                    className={`shrink-0 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      onDark
                        ? n.id === activeId
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                        : n.id === activeId
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </nav>

            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className={`shrink-0 p-2 rounded-md transition-colors ${
                onDark ? "text-white hover:bg-white/10" : "text-foreground hover:bg-accent"
              }`}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </header>
      ))}

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-[#0b1020]">
        <img
          src={heroBgAsset.url}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />


        <div className="relative h-full mx-auto max-w-6xl px-6 flex items-center">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-20 items-center w-full">
            {/* Left — profile */}
            <div className="flex justify-center md:justify-start animate-fade-up">
              <div className="relative size-[10.5rem] md:size-[13.5rem] rounded-full overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/40">
                <img
                  src={profile}
                  alt="Tristan Habémont portrait"
                  width={320}
                  height={320}
                  className="absolute inset-0 h-full w-full object-cover scale-[1.2] translate-y-[5%]"
                />
              </div>
            </div>

            {/* Right — text */}
            <div className="text-white animate-fade-up [animation-delay:120ms]">
              <p className="text-brand-soft text-xs font-medium tracking-[0.25em] uppercase mb-5">
                AI Research Engineer
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
                Tristan Habémont
              </h1>
              <div className="mt-6 h-px w-16 bg-white/25" />

              <p className="mt-7 max-w-xl text-lg md:text-xl font-light leading-relaxed text-white/75">
                Building <span className="font-medium text-white">intelligent systems</span> at the intersection of{" "}
                <span className="font-medium text-white">deep learning</span> and{" "}
                <span className="font-medium text-white">applied mathematics</span>.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={emailCopied ? "Email copied" : "Copy email address"}
                  className="group relative inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <span className="relative inline-flex size-5 items-center justify-center">
                    <Mail
                      className={`absolute size-5 transition-all duration-300 ${
                        emailCopied ? "opacity-0 scale-75 -rotate-12" : "opacity-100 scale-100 rotate-0"
                      }`}
                    />
                    <Check
                      className={`absolute size-5 text-emerald-300 transition-all duration-300 ${
                        emailCopied ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-12"
                      }`}
                    />
                  </span>
                  <span className="text-sm font-light">{EMAIL}</span>
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-0 top-full mt-1 whitespace-nowrap text-[10px] font-mono-tight uppercase tracking-[0.2em] transition-all duration-300 ${
                      emailCopied
                        ? "opacity-100 translate-y-0 text-emerald-300"
                        : "text-white/60 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0"
                    }`}
                  >
                    {emailCopied ? "Copied!" : "Click to copy"}
                  </span>
                </button>
                <span className="h-4 w-px bg-white/20" />
                <a
                  href="https://linkedin.com/in/tristan-habemont"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaLinkedin className="size-5" />
                </a>
                <a
                  href="https://github.com/sukikui"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaGithub className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          onClick={() => scrollTo("presentation")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/65 hover:text-white flex flex-col items-center gap-2 text-[10px] font-mono-tight uppercase tracking-[0.3em]"
        >
          <span>Scroll</span>
          <ChevronDown className="size-5 animate-scroll-hint" />
        </button>


        {/* Photo credit */}
        <div
          className={`absolute bottom-6 left-6 group flex items-center gap-2 transition-opacity duration-700 ${
            showCredit ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Info className="size-3.5 text-white/40 group-hover:text-white/80 transition-colors" />
          <span className="text-[11px] text-white/70 font-light opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            I took this photo at Entsū-in Temple (円通院) in Matsushima :)
          </span>
        </div>
      </section>

      {/* Sections */}
      <main className="relative">
        <section className="scroll-mt-20 py-16 md:py-20 border-b border-border">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div id="presentation" className="scroll-mt-20">
                <div className="mb-8 flex items-center gap-2">
                  <span className="font-mono-tight text-xs text-brand">01</span>
                  <div className="h-px flex-1 max-w-6 bg-border" />
                  <User className="size-4 text-brand" />
                  <h2 className="section-heading text-foreground ml-2">Presentation</h2>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  A recently graduated engineer passionate about ML and Computer Vision, I am looking to work on
                  state-of-the-art AI models driving concrete applications in the real world.
                </p>
                <p className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Having always wanted to understand intelligent systems, I began and pursued my studies for 5 years
                  in the field of Electrical Engineering. I quickly became passionate about and self-taught in
                  Computer Vision, which allowed me to start a drone project embedding a real-time AI model on my
                  personal time, and which I then continued as part of my curriculum at INSA Lyon.
                </p>
                <p className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Eager to discover varied architectures and applications of Machine Learning in demanding
                  environments, with the opportunity to contribute to publications, I decided to multiply my
                  experiences in laboratories, notably in the medical and biomedical fields. This allowed me to learn
                  to understand, adapt and implement quickly and rigorously recent models from specialized AI
                  conferences and journals.
                </p>
                <p className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  In parallel, I code a lot in my free time: embedded software in C/C++, Python tools, Java projects
                  around Minecraft including network communications, APIs and server tools. I also enjoy doing some
                  web development from time to time, as you can see with this very website. I invite you to consult
                  my GitHub, which reflects my attachment to clean, documented projects integrating good CI/CD
                  practices.
                </p>
              </div>
              <div id="research" className="scroll-mt-20 lg:border-l lg:border-border lg:pl-16">
                <div className="mb-8 flex items-center gap-2">
                  <span className="font-mono-tight text-xs text-brand">02</span>
                  <div className="h-px flex-1 max-w-6 bg-border" />
                  <FlaskConical className="size-4 text-brand" />
                  <h2 className="section-heading text-foreground ml-2">Interests</h2>
                </div>
                <ul className="space-y-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>
                      <span className="text-foreground font-medium">Computer Vision</span> — detection, segmentation,
                      tracking and 3D understanding.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>
                      <span className="text-foreground font-medium">Medical &amp; biomedical imaging</span> — adapting
                      state-of-the-art models to clinical data and constraints.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>
                      <span className="text-foreground font-medium">Real-time &amp; embedded AI</span> — efficient
                      inference on edge devices, drones and robotics.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>
                      <span className="text-foreground font-medium">Foundation &amp; multimodal models</span> —
                      leveraging large pretrained vision and vision-language models for downstream tasks.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>
                      <span className="text-foreground font-medium">Reliable ML engineering</span> — reproducible
                      pipelines, rigorous evaluation and clean MLOps practices.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Section id="education" index="03" Icon={GraduationCap} title="Education">
          <div className="space-y-6">
            {EDUCATION.map((e) => (
              <TimelineItem
                key={e.school}
                period={e.period}
                title={e.degree}
                frTitle={e.frDegree}
                subtitle={e.school}
                location={e.location}
                concurrent={e.concurrent}
                highlights={e.highlights}
                courses={e.courses}
              />
            ))}
          </div>
        </Section>

        <Section id="experience" index="04" Icon={Briefcase} title="Experience">
          <div className="space-y-6">
            {EXPERIENCE.map((e) => (
              <TimelineItem
                key={`${e.company}-${e.period}`}
                period={e.period}
                duration={e.duration}
                title={e.role}
                subtitle={e.company}
                location={e.location}
                kind={e.kind}
                supervisor={e.supervisor}
                highlights={e.highlights}
                publications={e.publications}
                repos={e.repos}
              />
            ))}
          </div>
        </Section>

        <Section id="projects" index="05" Icon={FolderGit2} title="Side Projects">
          <div className="space-y-10">
            {PROJECT_GROUPS.map((group) => (
              <div key={group.title}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="font-mono-tight text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {group.title}
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {group.repos.map((p) => (
                    <RepoCard key={`${p.owner}/${p.name}`} repo={p} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://github.com/Sukikui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:opacity-80 transition-opacity"
            >
              <FaGithub className="size-4" />
              See all repositories on GitHub
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Section>

        <Section id="cv" index="06" Icon={FileText} title="Curriculum Vitae">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="absolute -top-20 -right-20 size-64 rounded-full bg-brand/15 blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-semibold text-card-foreground">Full Curriculum Vitae</h3>
                <p className="mt-2 text-muted-foreground max-w-lg">
                  Complete academic record, publications, talks and technical proficiencies in a single PDF.
                </p>
                <p className="mt-3 font-mono-tight text-xs text-muted-foreground">v.2026.06 · PDF · ~180 KB</p>
              </div>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-brand text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-brand/25"
              >
                <Download className="size-4" />
                Download CV
              </a>
            </div>
          </div>
        </Section>

        <footer className="border-t border-border py-8">
          <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono-tight text-muted-foreground">
            <p>© {new Date().getFullYear()} Tristan Habémont · All rights reserved</p>
            <p>Built with TanStack Start · Designed in the open</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Section({
  id,
  index,
  Icon,
  title,
  children,
}: {
  id: string;
  index: string;
  Icon: typeof Mail;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-16 md:py-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-center gap-2">
          <span className="font-mono-tight text-xs text-brand">{index}</span>
          <div className="h-px flex-1 max-w-6 bg-border" />
          <Icon className="size-4 text-brand" />
          <h2 className="section-heading text-foreground ml-2">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function TimelineItem({
  period,
  duration,
  title,
  frTitle,
  subtitle,
  location,
  concurrent,
  kind,
  supervisor,
  description,
  highlights,
  courses,
  publications,
  repos,
}: {
  period: string;
  duration?: string;
  title: string;
  frTitle?: string;
  subtitle: string;
  location?: string;
  concurrent?: string;
  kind?: string;
  supervisor?: string;
  description?: string;
  highlights?: string[];
  courses?: string[];
  publications?: { venue: string; year: string; type?: string; status?: string; url?: string }[];
  repos?: { url: string }[];
}) {
  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-8 pb-6 border-b border-border/60 last:border-0 last:pb-0">
      <div className="pt-1.5">
        <div className="font-mono-tight text-xs text-muted-foreground tracking-wider">{period}</div>
        {duration && (
          <div className="font-mono-tight text-[10px] text-muted-foreground/60 mt-0.5 tracking-wider">{duration}</div>
        )}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-sm text-brand font-medium">{subtitle}</p>
          {location && (
            <span className="font-mono-tight text-[11px] tracking-wide text-muted-foreground">{location}</span>
          )}
          {concurrent && (
            <span className="text-[10px] font-mono-tight uppercase tracking-wider px-1.5 py-0.5 rounded border border-brand/40 text-brand/90">
              {concurrent}
            </span>
          )}
        </div>
        {kind && (
          <div className="mt-2 font-mono-tight text-[10px] uppercase tracking-[0.18em] text-brand/80">{kind}</div>
        )}
        <h3 className="font-display text-xl font-semibold text-foreground mt-1">{title}</h3>
        {frTitle && <p className="text-sm text-muted-foreground mt-0.5 italic">{frTitle}</p>}
        {supervisor && <p className="text-xs text-muted-foreground/80 mt-1.5 italic">{supervisor}</p>}
        {description && <p className="mt-2 text-muted-foreground leading-relaxed">{description}</p>}
        {highlights && highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {highlights.map((h, i) => (
              <li
                key={i}
                className="relative pl-4 text-sm text-muted-foreground leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:size-1 before:rounded-full before:bg-brand/60"
              >
                {renderWithGpa(h)}
              </li>
            ))}
          </ul>
        )}
        {((publications && publications.length > 0) || (repos && repos.length > 0)) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {publications?.map((p, i) => {
              const Tag = p.url ? "a" : "div";
              return (
                <Tag
                  key={`pub-${i}`}
                  {...(p.url ? { href: p.url, target: "_blank", rel: "noreferrer" } : {})}
                  className={`inline-flex items-stretch rounded-md border border-border bg-card overflow-hidden font-mono-tight text-[11px] ${
                    p.url ? "hover:border-brand/60 hover:bg-accent/40 transition-colors" : ""
                  }`}
                >
                  <span className="flex items-center gap-1.5 px-2 py-1 text-muted-foreground tracking-wide">
                    <FileText className="size-3" />
                    {p.type ?? "Publication"}
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-1 text-foreground/90 group">
                    <span className="font-semibold text-brand">
                      {p.venue}
                      {p.year && <span className="ml-1">{p.year}</span>}
                    </span>
                    {p.status && <span className="opacity-60 italic normal-case">· {p.status}</span>}
                    {p.url && <ArrowUpRight className="size-3 ml-0.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />}
                  </span>

                </Tag>
              );
            })}
            {repos?.map((r, i) => {
              const url = r.url.replace(/\/$/, "");
              const path = url.replace(/^https?:\/\/(www\.)?github\.com\//, "");
              return (
                <a
                  key={`repo-${i}`}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-card font-mono-tight text-[11px] hover:border-brand/60 hover:bg-accent/40 transition-colors"
                >
                  <FaGithub className="size-3.5 text-muted-foreground group-hover:text-brand transition-colors" />
                  <span className="opacity-60">{path.split("/")[0]}/</span>
                  <span className="font-semibold text-brand">{path.split("/")[1]}</span>
                  <ArrowUpRight className="size-3 ml-0.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              );
            })}
          </div>
        )}
        {courses && courses.length > 0 && (
          <details className="group mt-3">
            <summary className="cursor-pointer list-none inline-flex items-center gap-1.5 font-mono-tight text-[11px] tracking-wider text-muted-foreground hover:text-brand transition-colors">
              <ChevronDown className="size-3 transition-transform group-open:rotate-180" />
              Relevant coursework
              <span className="opacity-60">({courses.length})</span>
            </summary>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {courses.map((c) => (
                <li key={c} className="flex items-baseline gap-2 text-sm text-muted-foreground/90 leading-snug">
                  <span className="font-mono-tight text-brand/70 text-xs">›</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
}

function renderWithGpa(text: string) {
  const re = /(?:—\s*)?(overall\s+)?GPA[:\s]*([0-9]\.[0-9]{1,2})\s*\/\s*([0-9]\.[0-9]{1,2})/i;
  const m = text.match(re);
  if (!m) return text;
  const before = text.slice(0, m.index).replace(/[\s—–\-,;:]+$/, "");
  const [, overall, value, scale] = m;
  const majorMatch = before.match(/^(Major in\s+)(.+)$/i);
  return (
    <>
      {majorMatch ? (
        <>
          {majorMatch[1]}
          <span className="font-semibold text-foreground">{majorMatch[2]}</span>
        </>
      ) : (
        before
      )}
      <span className="ml-2 inline-flex items-center gap-1 rounded border border-border/70 bg-muted/30 px-1.5 py-0.5 font-mono-tight text-[10px] tracking-wider text-muted-foreground/90 align-middle">
        <span className="opacity-60">{overall ? "Overall GPA" : "GPA"}</span>
        <span className="text-foreground/90">{value}</span>
        <span className="opacity-50">/{scale}</span>
      </span>
    </>
  );
}

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

type RepoRef = { owner: string; name: string };

type RepoData = {
  description: string | null;
  languages: { name: string; pct: number }[];
  license: string | null;
  releases: number;
};

const REPO_CACHE_TTL = 6 * 60 * 60 * 1000; // 6h

function readRepoCache(key: string): { data: RepoData; ts: number } | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as { data: RepoData; ts: number }) : null;
  } catch {
    return null;
  }
}

function RepoCard({ repo }: { repo: RepoRef }) {
  const cacheKey = `repo-cache:${repo.owner}/${repo.name}`;
  const [data, setData] = useState<RepoData | null>(() => {
    if (typeof window === "undefined") return null;
    return readRepoCache(cacheKey)?.data ?? null;
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cached = readRepoCache(cacheKey);
    if (cached && Date.now() - cached.ts < REPO_CACHE_TTL) {
      setData(cached.data);
      return;
    }

    const base = `https://api.github.com/repos/${repo.owner}/${repo.name}`;
    Promise.all([
      fetch(base).then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status))))),
      fetch(`${base}/languages`).then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status))))),
      fetch(`${base}/releases?per_page=1`).then((r) =>
        r.ok
          ? r.json().then((arr: unknown[]) => {
              const link = r.headers.get("Link") ?? "";
              const m = link.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);
              return m ? parseInt(m[1], 10) : arr.length;
            })
          : Promise.reject(new Error(String(r.status))),
      ),
    ])
      .then(
        ([info, langs, releases]: [
          { description: string | null; license: { spdx_id?: string; name?: string } | null },
          Record<string, number>,
          number,
        ]) => {
          if (cancelled) return;
          const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
          const sorted = Object.entries(langs)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([name, bytes]) => ({ name, pct: (bytes / total) * 100 }));
          const lic = info.license;
          const license =
            lic && lic.spdx_id && lic.spdx_id !== "NOASSERTION"
              ? lic.spdx_id
              : (lic?.name ?? null);
          const next: RepoData = { description: info.description, languages: sorted, license, releases };
          setData(next);
          try {
            localStorage.setItem(cacheKey, JSON.stringify({ data: next, ts: Date.now() }));
          } catch {
            /* ignore quota errors */
          }
        },
      )
      .catch(() => {
        if (cancelled) return;
        // Fall back to stale cache rather than showing an error.
        if (cached) {
          setData(cached.data);
        } else {
          setError(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [repo.owner, repo.name, cacheKey]);

  const hasFooter = !!(data && (data.languages.length > 0 || data.license || data.releases > 0));

  return (
    <a
      href={`https://github.com/${repo.owner}/${repo.name}`}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col p-4 rounded-xl border border-border bg-card hover:border-brand/60 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start gap-3">
        <FaGithub className="size-5 mt-0.5 text-muted-foreground group-hover:text-brand transition-colors" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-muted-foreground truncate">{repo.owner}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-brand truncate">{repo.name}</span>
          </div>
        </div>
        <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[2.5rem]">
        {error ? "Repository information unavailable." : (data?.description ?? "Loading…")}
      </p>

      {hasFooter && (
        <div className="mt-4 pt-4 border-t border-border/70 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          {data!.languages.map((l) => (
            <span key={l.name} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: LANGUAGE_COLORS[l.name] ?? "#888" }}
              />
              {l.name}
            </span>
          ))}
          {data!.license && (
            <span className="flex items-center gap-1.5">
              <Scale className="size-3.5" />
              {data!.license}
            </span>
          )}
          {data!.releases > 0 && (
            <span className="flex items-center gap-1.5 font-mono-tight">
              <Tag className="size-3.5" />
              {data!.releases} {data!.releases === 1 ? "release" : "releases"}
            </span>
          )}
        </div>
      )}
    </a>
  );
}


const EDUCATION: {
  period: string;
  school: string;
  location?: string;
  degree: string;
  frDegree?: string;
  concurrent?: string;
  highlights: string[];
  courses?: string[];
}[] = [
  {
    period: "Feb 2025 — Mar 2026",
    school: "Centrale Lyon · Université Lyon 1",
    location: "Lyon, France",
    degree: "MSc in Machine Learning & Medical Imaging",
    frDegree: "Master 2",
    highlights: ["Ranked 2nd in cohort — GPA 3.90 / 4.00", "Completed alongside my final year at INSA Lyon"],
    courses: [
      "Machine Learning",
      "Inverse Problems",
      "Image Segmentation",
      "Filtering and Registration",
      "Magnetic Resonance Imaging",
      "Bibliography",
    ],
  },
  {
    period: "Sep 2022 — Mar 2026",
    school: "INSA Lyon",
    location: "Lyon, France",
    degree: "MSc in Electrical Engineering",
    frDegree: "Diplôme d'Ingénieur",
    highlights: [
      "Major in Deep Learning, Image & Signal Processing — GPA 4.00 / 4.00",
      "Ranked in the top 10% of cohort — overall GPA 3.76 / 4.00",
    ],
    courses: [
      "Image Processing and Analysis",
      "Image Deep Learning",
      "Image Reconstruction",
      "Estimation, Learning and Decision",
      "Operations Research and Optimization",
      "Signal Analysis and Modeling",
      "Digital Processors: CPU and GPU",
      "2D/3D Optical Acquisition",
      "Real-Time Computer Engineering",
      "Advanced Control",
    ],
  },
  {
    period: "Sep 2024 — Dec 2024",
    school: "Tōhoku University",
    location: "Sendai, Japon",
    degree: "Exchange Semester",
    highlights: [
      "Completed the Intensive Japanese Language Program",
      "Mentored bachelor students on Computer Vision projects",
    ],
  },
  {
    period: "Sep 2020 — Jul 2022",
    school: "Université de Lorraine",
    location: "Nancy, France",
    degree: "University Diploma of Technology in Electrical Engineering",
    frDegree: "Diplôme Universitaire de Technologie",
    highlights: [
      "Major in Multitasking & Object-Oriented Programming — GPA 4.00 / 4.00",
      "Ranked 1st in cohort, with Highest Honors — overall GPA 3.89 / 4.00",
    ],
  },
];

const EXPERIENCE: {
  period: string;
  duration?: string;
  role: string;
  kind?: string;
  company: string;
  location?: string;
  supervisor?: string;
  highlights: string[];
  publications?: { venue: string; year: string; type?: string; status?: string; url?: string }[];
  repos?: { url: string }[];
}[] = [
  {
    period: "Oct 2025 — Jan 2026",
    duration: "4 months",
    kind: "Research Project",
    role: "Generative Deep Learning for Dental Prediction",
    company: "BovoPredict",
    location: "Lyon, France",
    supervisor: "Supervised by Dr. Thomas Grenier and Dr. Chantal Muller",
    highlights: [
      "Built a VAE + Latent Diffusion pipeline for dentate-to-edentulous CBCT slice generation",
      "Used self-supervised latent learning and diffusion denoising to guide anatomical reconstruction",
      "Designed Transformer-based multimodal conditioning for morphology metrics injection",
      "Developed t-SNE / UMAP latent space analysis and morphology-based evaluation tools",
    ],
    repos: [{ url: "https://github.com/Sukikui/PTI-LDM-VAE" }],
  },
  {
    period: "Feb 2025 — Jul 2025",
    duration: "6 months",
    kind: "Research Intern",
    role: "Graph ML & 3D Medical Image Analysis",
    company: "CREATIS",
    location: "Lyon, France",
    supervisor: "Supervised by Dr. Odyssée Merveille, Dr. Nathan Painchaud and Prof. Olivier Bernard",
    highlights: [
      "Researched and trained GNN architectures for pulmonary embolism risk stratification",
      "Built PyTorch Geometric vascular graph datasets from segmentation-derived 3D anatomy",
      "Trained and compared nnU-Net 3D segmentation models for cardiac ventricle analysis",
      "Presented a poster and published a lab blog post on the project",
    ],
    publications: [
      { venue: "MICCAI", year: "2026", type: "Conference", status: "submission" },
      {
        venue: "Introduction to Graph Neural Networks",
        year: "",
        type: "Blog Post",
        url: "https://creatis-myriad.github.io/tutorials/2025-03-28-tutorial-graph-neural-networks.html",
      },
    ],
    repos: [{ url: "https://github.com/creatis-myriad/GENESIS" }],
  },
  {
    period: "Feb 2024 — Jul 2024",
    duration: "6 months",
    kind: "Research Intern",
    role: "Real-Time Deep Learning for Noisy Time-Series",
    company: "Institut des Nanotechnologies de Lyon",
    location: "Lyon, France",
    supervisor: "Supervised by Dr. Bertrand Massot",
    highlights: [
      "Researched robust real-time ECG / EDA peak detection methods for physiological VR monitoring",
      "Implemented ECG localization pipelines combining U-Net, LSTM and wavelet-based models",
      "Developed modular Python packages for BLE sensor acquisition and signal analytics",
    ],
    publications: [
      {
        venue: "IEEE VRW",
        year: "2025",
        type: "Workshop",
        url: "https://ieeexplore.ieee.org/document/10972783",
      },
    ],
    repos: [{ url: "https://github.com/sensors-inl/Nervous-Toolkit" }],
  },
  {
    period: "Oct 2023 — Jan 2024",
    duration: "4 months",
    kind: "Technical Project",
    role: "Embedded Computer Vision for Autonomous Drone Control",
    company: "INSA Lyon",
    location: "Lyon, France",
    supervisor: "Supervised by Dr. Jean-François Mogniotte",
    highlights: [
      "Designed a dual-ESP32 drone architecture with onboard CNN gesture recognition",
      "Developed real-time C / C++ firmware for sensor acquisition and SPI / I2C communication",
      "Implemented Kalman filtering for altitude estimation using ToF, barometer and IMU sensors",
      "Designed a custom drone PCB and monitoring dashboard for hardware debugging",
    ],
  },
  {
    period: "Apr 2022 — Jul 2022",
    duration: "4 months",
    kind: "R&D Intern",
    role: "Embedded Systems",
    company: "Institut Jean Lamour",
    location: "Nancy, France",
    highlights: [
      "Developed STM32 serial communication modules in C / C++",
      "Controlled an acoustic levitation device with configurable PWM",
      "Built a Python API for device monitoring and wrote the documentation",
    ],
  },
  {
    period: "Sep 2021 — Apr 2022",
    duration: "8 months",
    kind: "Academic Tutor",
    role: "Mathematics & Applied Physics",
    company: "Université de Lorraine",
    location: "Nancy, France",
    highlights: [
      "Teaching and support for first-year students",
      "Courses: complex analysis, electrostatics and electromagnetism",
    ],
  },
];

const PROJECT_GROUPS: { title: string; repos: RepoRef[] }[] = [
  {
    title: "Featured above",
    repos: [
      { owner: "creatis-myriad", name: "GENESIS" },
      { owner: "sensors-inl", name: "Nervous-Toolkit" },
      { owner: "Sukikui", name: "PTI-LDM-VAE" },
    ],
  },
  {
    title: "Minecraft",
    repos: [
      { owner: "Sukikui", name: "MineVerify" },
      { owner: "Sukikui", name: "BiomeMap" },
      { owner: "Sukikui", name: "PlayerCoordsAPI" },
    ],
  },
  {
    title: "Embedded Software",
    repos: [
      { owner: "Sukikui", name: "Vision-Hub" },
      { owner: "Sukikui", name: "ESP32-Vision-Node" },
      { owner: "Sukikui", name: "ESP32-CAM-Sign-Recognition" },
    ],
  },
  {
    title: "Web & Others",
    repos: [
      { owner: "Sukikui", name: "PMC-Plan" },
      { owner: "Sukikui", name: "GPA-Calculator" },
    ],
  },
];
