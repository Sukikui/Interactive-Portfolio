import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Moon,
  Sun,
  Download,
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  FolderGit2,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import profile from "@/assets/profile.jpg";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex Martin — Research Engineer Portfolio" },
      {
        name: "description",
        content:
          "Academic portfolio of Alex Martin, recently graduated engineer. Research interests, education, experience, projects and CV.",
      },
      { property: "og:title", content: "Alex Martin — Research Engineer Portfolio" },
      {
        property: "og:description",
        content: "Research interests, education, projects and CV of Alex Martin.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "projects", label: "Projects", Icon: FolderGit2 },
  { id: "cv", label: "CV", Icon: FileText },
  { id: "contact", label: "Contact", Icon: Mail },
];

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/70 border-b border-border/60 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`font-display text-lg tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            A<span className="text-gold">.</span>M
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-accent"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className={`p-2 rounded-md transition-colors ${
              scrolled
                ? "text-foreground hover:bg-accent"
                : "text-white hover:bg-white/10"
            }`}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/80" />

        <div className="relative h-full mx-auto max-w-6xl px-6 flex items-center">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full">
            {/* Left — profile */}
            <div className="flex justify-center md:justify-start animate-fade-up">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-gold/40 to-transparent blur-xl" />
                <img
                  src={profile}
                  alt="Alex Martin portrait"
                  width={320}
                  height={320}
                  className="relative size-56 md:size-72 rounded-full object-cover ring-1 ring-white/20 shadow-2xl"
                />
              </div>
            </div>

            {/* Right — text */}
            <div className="text-white animate-fade-up [animation-delay:120ms]">
              <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Research Engineer
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight">
                Alex<br />Martin
              </h1>
              <div className="mt-6 h-px w-16 bg-gold" />
              <p className="mt-6 max-w-md text-lg md:text-xl text-white/80 font-light leading-relaxed">
                Recently graduated engineer exploring the intersection of
                <span className="italic text-white"> machine learning</span>,
                <span className="italic text-white"> applied mathematics</span> and
                <span className="italic text-white"> human-centered systems</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          onClick={() => scrollTo("education")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em]"
        >
          <span>Scroll</span>
          <ChevronDown className="size-5 animate-scroll-hint" />
        </button>
      </section>

      {/* Sections */}
      <main className="relative">
        <Section id="education" label="01 — Education" title="Education">
          <div className="space-y-8">
            {EDUCATION.map((e) => (
              <TimelineItem
                key={e.school}
                period={e.period}
                title={e.degree}
                subtitle={e.school}
                description={e.details}
              />
            ))}
          </div>
        </Section>

        <Section id="experience" label="02 — Experience" title="Experience">
          <div className="space-y-8">
            {EXPERIENCE.map((e) => (
              <TimelineItem
                key={e.company}
                period={e.period}
                title={e.role}
                subtitle={e.company}
                description={e.details}
              />
            ))}
          </div>
        </Section>

        <Section id="projects" label="03 — Selected Work" title="Projects">
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <article
                key={p.title}
                className="group p-6 rounded-xl border border-border bg-card hover:border-gold/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl text-card-foreground">{p.title}</h3>
                  <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="cv" label="04 — Curriculum Vitae" title="CV">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl text-card-foreground">Full Curriculum Vitae</h3>
              <p className="mt-2 text-muted-foreground max-w-lg">
                Complete academic record, publications, talks, and technical proficiencies in a single PDF document.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Last updated June 2026 · PDF, ~180 KB</p>
            </div>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="size-4" />
              Download CV
            </a>
          </div>
        </Section>

        <Section id="contact" label="05 — Get in Touch" title="Contact">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Open to PhD opportunities, research collaborations and engineering positions.
              Feel free to reach out — I usually reply within a couple of days.
            </p>
            <div className="space-y-3">
              <ContactLink href="mailto:alex.martin@example.com" Icon={Mail} label="alex.martin@example.com" />
              <ContactLink href="https://github.com" Icon={Github} label="github.com/alexmartin" />
              <ContactLink href="https://linkedin.com" Icon={Linkedin} label="linkedin.com/in/alexmartin" />
            </div>
          </div>
        </Section>

        <footer className="border-t border-border py-10">
          <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Alex Martin. All rights reserved.</p>
            <p className="font-display italic">Built with care.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-24 md:py-32 border-b border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3">{label}</p>
            <h2 className="section-heading text-foreground">{title}</h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function TimelineItem({
  period,
  title,
  subtitle,
  description,
}: {
  period: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-8 pb-8 border-b border-border/60 last:border-0">
      <div className="text-sm text-muted-foreground font-medium pt-1">{period}</div>
      <div>
        <h3 className="font-display text-xl text-foreground">{title}</h3>
        <p className="text-sm text-gold mt-1">{subtitle}</p>
        <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ContactLink({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: typeof Mail;
  label: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 p-4 rounded-lg border border-border hover:border-gold/60 hover:bg-accent/40 transition-all"
    >
      <Icon className="size-5 text-muted-foreground group-hover:text-gold transition-colors" />
      <span className="text-foreground">{label}</span>
      <ArrowUpRight className="size-4 ml-auto text-muted-foreground group-hover:text-gold transition-colors" />
    </a>
  );
}

const EDUCATION = [
  {
    period: "2023 — 2026",
    degree: "M.Eng. in Applied Mathematics & Computer Science",
    school: "École Polytechnique",
    details:
      "Specialization in statistical learning and optimization. Graduated with highest honors. Thesis on physics-informed neural networks for inverse problems.",
  },
  {
    period: "2021 — 2023",
    degree: "Preparatory Classes — MP* (Math/Physics)",
    school: "Lycée Louis-le-Grand, Paris",
    details:
      "Intensive two-year program in advanced mathematics, physics and theoretical computer science.",
  },
];

const EXPERIENCE = [
  {
    period: "2025 — 2026",
    role: "Research Intern",
    company: "INRIA — MLIA Team",
    details:
      "Designed and benchmarked neural operators for high-dimensional PDEs. Co-authored a paper currently under review at NeurIPS.",
  },
  {
    period: "Summer 2024",
    role: "Machine Learning Engineer Intern",
    company: "Hugging Face",
    details:
      "Built data pipelines and evaluation harnesses for open multilingual language models. Contributed to several open-source repositories.",
  },
];

const PROJECTS = [
  {
    title: "Neural PDE Solver",
    description:
      "An open-source library implementing Fourier neural operators for parametric PDEs, with reproducible benchmarks across 8 physical systems.",
    tags: ["PyTorch", "Research", "Open Source"],
  },
  {
    title: "Causal Inference Toolkit",
    description:
      "End-to-end pipeline for estimating treatment effects from observational data, used in two published economics studies.",
    tags: ["Python", "Statistics", "Econometrics"],
  },
  {
    title: "Astro Image Pipeline",
    description:
      "GPU-accelerated processing for amateur astrophotography — stacking, calibration and ML-based artifact removal.",
    tags: ["CUDA", "Computer Vision"],
  },
  {
    title: "Course Notes — Optimization",
    description:
      "A typeset companion to a graduate convex optimization course, with interactive Python notebooks for each chapter.",
    tags: ["LaTeX", "Teaching"],
  },
];
