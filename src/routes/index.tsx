import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  { id: "presentation", label: "Presentation" },
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
            ? "backdrop-blur-md bg-background/50 border-b border-border/40"
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
          onClick={() => scrollTo("presentation")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/65 hover:text-white flex flex-col items-center gap-2 text-[10px] font-mono-tight uppercase tracking-[0.3em]"
        >
          <span>Scroll</span>
          <ChevronDown className="size-5 animate-scroll-hint" />
        </button>
      </section>

      {/* Sections */}
      <main className="relative">
        <Section id="presentation" index="01" Icon={User} title="Presentation">
          <div className="max-w-3xl">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              I am an AI research engineer with a strong foundation in applied mathematics and deep learning. My work focuses on building robust, interpretable machine learning systems — from neural operators for physical simulation to causal inference pipelines for real-world decision-making.
            </p>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
              I believe in open science and reproducible research. Most of my projects are publicly available, and I actively contribute to the open-source ecosystem around PyTorch and scientific machine learning.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Currently exploring PhD opportunities at the intersection of numerical analysis and generative modeling.
            </p>
          </div>
        </Section>

        <Section id="education" index="02" Icon={GraduationCap} title="Education">
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
              />
            ))}
          </div>
        </Section>

        <Section id="experience" index="03" Icon={Briefcase} title="Experience">
          <div className="space-y-6">
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

        <Section id="projects" index="04" Icon={FolderGit2} title="Projects">
          <div className="grid md:grid-cols-2 gap-4">
            {PROJECTS.map((p) => (
              <RepoCard key={p.name} repo={p} />
            ))}
          </div>
          <div className="mt-6 text-center">
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

        <Section id="cv" index="05" Icon={FileText} title="Curriculum Vitae">
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

        <Section id="contact" index="06" Icon={Mail} title="Contact">
          <div className="grid md:grid-cols-2 gap-6 items-start">
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
    <section id={id} className="scroll-mt-20 py-16 md:py-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-center gap-4">
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
  location,
  concurrent,
  description,
  highlights,
}: {
  period: string;
  title: string;
  frTitle?: string;
  subtitle: string;
  location?: string;
  concurrent?: string;
  description?: string;
  highlights?: string[];
}) {
  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-8 pb-6 border-b border-border/60 last:border-0 last:pb-0">
      <div className="font-mono-tight text-xs text-muted-foreground pt-1.5 tracking-wider">
        {period}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-sm text-brand font-medium">{subtitle}</p>
          {location && (
            <span className="font-mono-tight text-[10px] uppercase tracking-wider text-muted-foreground">
              {location}
            </span>
          )}
          {concurrent && (
            <span className="text-[10px] font-mono-tight uppercase tracking-wider px-1.5 py-0.5 rounded border border-brand/40 text-brand/90">
              {concurrent}
            </span>
          )}
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mt-1">{title}</h3>
        {frTitle && (
          <p className="text-sm text-muted-foreground mt-0.5 italic">{frTitle}</p>
        )}
        {description && (
          <p className="mt-2 text-muted-foreground leading-relaxed">{description}</p>
        )}
        {highlights && highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {highlights.map((h, i) => (
              <li
                key={i}
                className="relative pl-4 text-sm text-muted-foreground leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:size-1 before:rounded-full before:bg-brand/60"
              >
                {h}
              </li>
            ))}
          </ul>
        )}
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

const EDUCATION: {
  period: string;
  school: string;
  location?: string;
  degree: string;
  frDegree?: string;
  concurrent?: string;
  highlights: string[];
}[] = [
  {
    period: "Feb 2025 — Mar 2026",
    school: "Centrale Lyon",
    location: "Lyon, FR",
    degree: "MSc in Machine Learning & Medical Imaging",
    frDegree: "Master 2 Recherche",
    concurrent: "Double degree · INSA Lyon",
    highlights: [
      "Ranked 2nd in cohort — GPA 3.90 / 4.00",
      "Completed alongside the final year of the INSA Lyon engineering degree",
    ],
  },
  {
    period: "Sep 2022 — Mar 2026",
    school: "INSA Lyon",
    location: "Lyon, FR",
    degree: "MSc in Electrical Engineering",
    frDegree: "Diplôme d'Ingénieur — Institut National des Sciences Appliquées",
    highlights: [
      "Major in Deep Learning, Image & Signal Processing — GPA 4.00 / 4.00",
      "Ranked in the top 10% of cohort — overall GPA 3.76 / 4.00",
    ],
  },
  {
    period: "Sep 2024 — Dec 2024",
    school: "Tōhoku University",
    location: "Sendai, JP",
    degree: "Exchange Semester — Computer Science & Computer Vision",
    concurrent: "Exchange during INSA Lyon",
    highlights: [
      "Completed the Intensive Japanese Language Program",
      "Mentored bachelor students on Computer Vision projects",
    ],
  },
  {
    period: "Sep 2020 — Jul 2022",
    school: "Université de Lorraine",
    location: "Nancy, FR",
    degree: "University Diploma of Technology in Electrical Engineering",
    frDegree: "DUT Génie Électrique et Informatique Industrielle",
    highlights: [
      "Major in Multitasking & Object-Oriented Programming — GPA 4.00 / 4.00",
      "Ranked 1st in cohort with Highest Honors — overall GPA 3.89 / 4.00",
    ],
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
