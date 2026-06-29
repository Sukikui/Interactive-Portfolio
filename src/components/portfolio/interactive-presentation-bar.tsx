import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import {
  getPresentationLabels,
  type InteractivePresentationContent,
  type InteractivePresentationStep,
} from "@/content";
import { cn } from "@/lib/utils";

type InteractivePresentationBarProps = {
  presentation: InteractivePresentationContent;
  onFocusStep: (step: InteractivePresentationStep) => void;
  onComplete: () => void;
};

const PRESENTATION_BAR_BLUR_MASK = [
  "linear-gradient(to right, transparent 0, rgba(0,0,0,0.06) 1.5rem, rgba(0,0,0,0.28) 2.8rem, rgba(0,0,0,0.62) 4rem, black 5rem, black calc(100% - 5rem), rgba(0,0,0,0.62) calc(100% - 4rem), rgba(0,0,0,0.28) calc(100% - 2.8rem), rgba(0,0,0,0.06) calc(100% - 1.5rem), transparent 100%)",
  "linear-gradient(to bottom, transparent 0, rgba(0,0,0,0.06) 1.15rem, rgba(0,0,0,0.3) 2rem, rgba(0,0,0,0.68) 2.8rem, black 3.5rem, black calc(100% - 3.5rem), rgba(0,0,0,0.68) calc(100% - 2.8rem), rgba(0,0,0,0.3) calc(100% - 2rem), rgba(0,0,0,0.06) calc(100% - 1.15rem), transparent 100%)",
].join(", ");

export function InteractivePresentationBar({
  presentation,
  onFocusStep,
  onComplete,
}: InteractivePresentationBarProps) {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const labels = getPresentationLabels(presentation.language);
  const controls = { ...labels, ...presentation.controls };
  const currentStep = presentation.steps[stepIndex];
  const isLastStep = stepIndex === presentation.steps.length - 1;

  const focusStep = (index: number) => {
    const nextStep = presentation.steps[index];
    if (!nextStep) return;

    setStepIndex(index);
    onFocusStep(nextStep);
  };

  const start = () => {
    setStarted(true);
    focusStep(0);
  };

  const previous = () => {
    if (stepIndex > 0) focusStep(stepIndex - 1);
  };

  const next = () => {
    if (isLastStep) {
      onComplete();
      return;
    }
    focusStep(stepIndex + 1);
  };

  return (
    <div
      data-interactive-presentation-bar
      className="fixed inset-x-4 bottom-5 z-[70] mx-auto max-w-3xl md:bottom-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-16 -inset-y-12 rounded-[4rem] bg-background/[0.01] backdrop-blur-[1096px]"
        style={{
          maskComposite: "intersect",
          maskImage: PRESENTATION_BAR_BLUR_MASK,
          WebkitMaskComposite: "source-in",
          WebkitMaskImage: PRESENTATION_BAR_BLUR_MASK,
        }}
      />
      <aside
        aria-label={`${labels.ariaLabel} ${presentation.companyName}`}
        className="relative overflow-hidden rounded-[2rem] border border-brand/25 bg-card/95 p-4 text-foreground shadow-[0_24px_80px_-28px_rgba(15,23,42,0.55)] ring-1 ring-background/80 backdrop-blur-xl dark:border-white/15 dark:bg-background/92 dark:shadow-black/35 dark:ring-white/10 md:p-5"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
        {!started ? (
          <StartPresentationPrompt
            companyName={presentation.companyName}
            eyebrow={labels.eyebrow}
            introBeforeCompany={labels.introBeforeCompany}
            introAfterCompany={labels.introAfterCompany}
            startLabel={controls.start}
            onStart={start}
          />
        ) : (
          <div className="space-y-4">
            <p className="px-1 text-sm leading-relaxed text-foreground/80 md:px-4 md:text-center">
              {currentStep?.text}
            </p>
            <div className="flex items-center justify-between gap-3">
              <PresentationButton
                label={controls.previous}
                icon="previous"
                disabled={stepIndex === 0}
                onClick={previous}
              />
              <StepPebbles currentIndex={stepIndex} steps={presentation.steps} />
              <PresentationButton
                label={isLastStep ? controls.finish : controls.next}
                icon="next"
                onClick={next}
              />
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function StartPresentationPrompt({
  companyName,
  eyebrow,
  introBeforeCompany,
  introAfterCompany,
  startLabel,
  onStart,
}: {
  companyName: string;
  eyebrow: string;
  introBeforeCompany: string;
  introAfterCompany: string;
  startLabel: string;
  onStart: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-mono-tight flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-brand uppercase">
          <Sparkles className="size-3" />
          {eyebrow}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {introBeforeCompany} <span className="font-medium text-foreground">{companyName}</span>
          {introAfterCompany}
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="font-mono-tight inline-flex shrink-0 items-center justify-center rounded-2xl bg-brand px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:shadow-brand/35"
      >
        {startLabel}
      </button>
    </div>
  );
}

function PresentationButton({
  label,
  icon,
  disabled,
  onClick,
}: {
  label: string;
  icon: "next" | "previous";
  disabled?: boolean;
  onClick: () => void;
}) {
  const Icon = icon === "previous" ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex min-w-24 items-center justify-center gap-1.5 rounded-2xl border border-border/80 bg-background/80 px-3 py-2.5 text-xs font-medium shadow-sm transition-colors hover:border-brand/60 hover:text-brand disabled:pointer-events-none disabled:opacity-35 dark:bg-card"
    >
      {icon === "previous" && <Icon className="size-3.5" />}
      {label}
      {icon === "next" && <Icon className="size-3.5" />}
    </button>
  );
}

function StepPebbles({
  currentIndex,
  steps,
}: {
  currentIndex: number;
  steps: readonly InteractivePresentationStep[];
}) {
  return (
    <div className="flex items-center justify-center gap-1.5" aria-label="Presentation progress">
      {steps.map((step, index) => (
        <span
          key={step.id}
          aria-current={index === currentIndex ? "step" : undefined}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            index === currentIndex
              ? "w-7 bg-brand shadow-sm shadow-brand/40"
              : "w-2 bg-muted-foreground/25",
          )}
        />
      ))}
    </div>
  );
}
