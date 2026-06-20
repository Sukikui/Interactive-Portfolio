import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Moon,
  Sun,
  Download,
  Mail,
  GraduationCap,
  Briefcase,
  FolderGit2,
  FileText,
  Star,
  GitFork,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import profile from "@/assets/profile.jpg";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex Martin — AI Research Engineer" },
      {
        name: "description",
        content:
          "Academic portfolio of Alex Martin, AI research engineer. Research interests, education, experience, open-source projects and CV.",
      },
      { property: "og:title", content: "Alex Martin — AI Research Engineer" },
      {
        property: "og:description",
        content: "Research interests, projects and CV of Alex Martin, AI research engineer.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" },
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
            ? "backdrop-blur-xl bg-background/70 border-b border-border/60"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`font-display font-semibold text-base tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            Alex Martin
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-accent"
                    : "text-white/75 hover:text-white hover:bg-white/10"
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
      <section className="relative h-screen w-full overflow-hidden bg-[#0b1020]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020] via-[#0b1020] to-[#0a0e1c]" />
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />
        <div className="absolute -top-32 -left-32 size-[480px] rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 size-[420px] rounded-full bg-cyan/5 blur-[140px]" />

        <div className="relative h-full mx-auto max-w-6xl px-6 flex items-center">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-20 items-center w-full">
            {/* Left — profile */}
            <div className="flex justify-center md:justify-start animate-fade-up">
              <div className="relative">
                <img
                  src={profile}
                  alt="Alex Martin portrait"
                  width={320}
                  height={320}
                  className="size-56 md:size-72 rounded-full object-cover ring-1 ring-white/15 shadow-2xl shadow-black/40"
                />
              </div>
            </div>

            {/* Right — text */}
            <div className="text-white animate-fade-up [animation-delay:120ms]">
              <p className="text-brand-soft text-xs font-medium tracking-[0.25em] uppercase mb-5">
                AI Research Engineer
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
                Alex Martin
              </h1>
              <div className="mt-6 h-px w-16 bg-white/25" />

              <p className="mt-7 max-w-xl text-lg md:text-xl font-light leading-relaxed text-white/75">
                Building <span className="font-medium text-white">intelligent systems</span> at the
                intersection of <span className="font-medium text-white">deep learning</span> and{" "}
                <span className="font-medium text-white">applied mathematics</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          onClick={() => scrollTo("education")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/65 hover:text-white flex flex-col items-center gap-2 text-[10px] font-mono-tight uppercase tracking-[0.3em]"
        >
          <span>Scroll</span>
          <ChevronDown className="size-5 animate-scroll-hint" />
        </button>
      </section>

      {/* Sections */}
      <main className="relative">
        <Section id="education" index="01" Icon={GraduationCap} title="Education">
          <div className="space-y-8">
            {EDUCATION.map((e) => (
              <TimelineItem
                key={e.school}
                period={e.period}
                title={e.degree}
                frTitle={e.frDegree}
                subtitle={e.school}
                description={e.details}
              />
            ))}
          </div>
        </Section>

        <Section id="experience" index="02" Icon={Briefcase} title="Experience">
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

        <Section id="projects" index="03" Icon={FolderGit2} title="Open-Source Projects">
          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((p) => (
              <RepoCard key={p.name} repo={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://github.com/alexmartin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-cyan transition-colors"
            >
              <FaGithub className="size-4" />
              See all repositories on GitHub
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Section>

        <Section id="cv" index="04" Icon={FileText} title="Curriculum Vitae">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="absolute -top-20 -right-20 size-64 rounded-full bg-brand/15 blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-semibold text-card-foreground">
                  Full Curriculum Vitae
                </h3>
                <p className="mt-2 text-muted-foreground max-w-lg">
                  Complete academic record, publications, talks and technical proficiencies
                  in a single PDF.
                </p>
                <p className="mt-3 font-mono-tight text-xs text-muted-foreground">
                  v.2026.06 · PDF · ~180 KB
                </p>
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

        <Section id="contact" index="05" Icon={Mail} title="Get in Touch">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Open to{" "}
              <span className="text-brand font-medium">PhD opportunities</span>,
              research collaborations and engineering positions. I usually reply within a couple of days.
            </p>
            <div className="space-y-3">
              <ContactLink href="mailto:alex.martin@example.com" Icon={Mail} label="alex.martin@example.com" />
              <ContactLink href="https://github.com/alexmartin" Icon={FaGithub} label="github.com/alexmartin" />
              <ContactLink href="https://linkedin.com/in/alexmartin" Icon={FaLinkedin} label="linkedin.com/in/alexmartin" />
              <ContactLink href="https://x.com/alexmartin" Icon={FaXTwitter} label="@alexmartin" />
            </div>
          </div>
        </Section>

        <footer className="border-t border-border py-8">
          <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono-tight text-muted-foreground">
            <p>© {new Date().getFullYear()} Alex Martin · All rights reserved</p>
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
    <section id={id} className="scroll-mt-20 py-24 md:py-32 border-b border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono-tight text-xs text-brand">{index}</span>
          <div className="h-px flex-1 max-w-12 bg-border" />
          <Icon className="size-4 text-brand" />
          <h2 className="section-heading text-foreground">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function TimelineItem({
  period,
  title,
  frTitle,
  subtitle,
  description,
}: {
  period: string;
  title: string;
  frTitle?: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-8 pb-8 border-b border-border/60 last:border-0">
      <div className="font-mono-tight text-xs text-muted-foreground pt-1.5 tracking-wider">
        {period}
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
        {frTitle && (
          <p className="text-sm text-muted-foreground mt-1 italic">{frTitle}</p>
        )}
        <p className="text-sm text-brand mt-1 font-medium">{subtitle}</p>
        <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

type Repo = {
  name: string;
  owner: string;
  description: string;
  language: string;
  langColor: string;
  stars: number;
  forks: number;
  url: string;
};

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col p-5 rounded-xl border border-border bg-card hover:border-brand/60 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start gap-3">
        <FaGithub className="size-5 mt-0.5 text-muted-foreground group-hover:text-brand transition-colors" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-muted-foreground truncate">{repo.owner}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-brand truncate">{repo.name}</span>
          </div>
          <span className="inline-block mt-1.5 text-[10px] font-mono-tight px-1.5 py-0.5 rounded border border-border text-muted-foreground">
            Public
          </span>
        </div>
        <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {repo.description}
      </p>

      <div className="mt-4 pt-4 border-t border-border/70 flex items-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
          {repo.language}
        </span>
        <span className="flex items-center gap-1.5 font-mono-tight">
          <Star className="size-3.5" />
          {repo.stars.toLocaleString()}
        </span>
        <span className="flex items-center gap-1.5 font-mono-tight">
          <GitFork className="size-3.5" />
          {repo.forks.toLocaleString()}
        </span>
      </div>
    </a>
  );
}

function ContactLink({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 p-4 rounded-lg border border-border hover:border-brand/60 hover:bg-accent/40 transition-all"
    >
      <Icon className="size-5 text-muted-foreground group-hover:text-brand transition-colors" />
      <span className="text-foreground">{label}</span>
      <ArrowUpRight className="size-4 ml-auto text-muted-foreground group-hover:text-brand transition-colors" />
    </a>
  );
}

const EDUCATION = [
  {
    period: "2023 — 2026",
    degree: "M.Eng. in Applied Mathematics & Computer Science",
    frDegree: "Diplôme d'Ingénieur",
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

const PROJECTS: Repo[] = [
  {
    name: "neural-pde",
    owner: "alexmartin",
    description:
      "Fourier neural operators for parametric PDEs. Reproducible benchmarks across 8 physical systems with PyTorch Lightning.",
    language: "Python",
    langColor: "#3572A5",
    stars: 412,
    forks: 38,
    url: "https://github.com/alexmartin/neural-pde",
  },
  {
    name: "causal-toolkit",
    owner: "alexmartin",
    description:
      "End-to-end pipeline for estimating treatment effects from observational data. Used in two published economics studies.",
    language: "Python",
    langColor: "#3572A5",
    stars: 189,
    forks: 21,
    url: "https://github.com/alexmartin/causal-toolkit",
  },
  {
    name: "astro-pipeline",
    owner: "alexmartin",
    description:
      "GPU-accelerated astrophotography processing — stacking, calibration and ML-based artifact removal.",
    language: "CUDA",
    langColor: "#3A4E3A",
    stars: 96,
    forks: 12,
    url: "https://github.com/alexmartin/astro-pipeline",
  },
  {
    name: "convex-notes",
    owner: "alexmartin",
    description:
      "Typeset companion to a graduate convex optimization course, with interactive Python notebooks per chapter.",
    language: "TeX",
    langColor: "#3D6117",
    stars: 73,
    forks: 9,
    url: "https://github.com/alexmartin/convex-notes",
  },
];
