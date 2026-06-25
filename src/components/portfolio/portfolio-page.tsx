import { useCallback, useEffect, useMemo, useState } from "react";

import {
  navigationItems,
  portfolioSections,
  siteContent,
  type InteractivePresentationContent,
  type InteractivePresentationStep,
} from "@/content";
import { usePortfolioNavigation } from "@/hooks/use-portfolio-navigation";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { getRepositoryAnchorId } from "@/lib/github";

import { InteractivePresentationBar } from "./interactive-presentation-bar";
import { PortfolioFooter } from "./portfolio-footer";
import { PortfolioHeader } from "./portfolio-header";
import { PortfolioHero } from "./portfolio-hero";
import { PortfolioSectionView } from "./section-layout";

type PortfolioPageProps = {
  presentation?: InteractivePresentationContent | null;
};

export function PortfolioPage({ presentation }: PortfolioPageProps) {
  const navigation = usePortfolioNavigation(navigationItems);
  const firstSectionId = navigationItems[0]?.id;
  const sourceRepositoryId = getRepositoryAnchorId(siteContent.footer.sourceLink.repository);
  const [highlightedRepositoryId, setHighlightedRepositoryId] = useState<string | null>(null);
  const [openTimelineItemKey, setOpenTimelineItemKey] = useState<string | null>(null);
  const [isAutomaticScroll, setIsAutomaticScroll] = useState(false);
  const [completedPresentationSlug, setCompletedPresentationSlug] = useState<string | null>(null);
  const activePresentation =
    presentation && completedPresentationSlug !== presentation.slug ? presentation : null;

  useScrollLock(!!activePresentation);

  useEffect(() => {
    setCompletedPresentationSlug(null);
  }, [presentation?.slug]);

  const heroIdentity = useMemo(
    () => ({
      ...siteContent.identity,
      ...presentation?.hero.identity,
    }),
    [presentation],
  );

  const heroContent = useMemo(
    () => ({
      ...siteContent.hero,
      summary: presentation?.hero.summary ?? siteContent.hero.summary,
    }),
    [presentation],
  );

  useEffect(() => {
    if (!isAutomaticScroll) return;

    const finishAutomaticScroll = () => setIsAutomaticScroll(false);
    const fallback = window.setTimeout(finishAutomaticScroll, 1_000);

    window.addEventListener("scrollend", finishAutomaticScroll, { once: true });

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("scrollend", finishAutomaticScroll);
    };
  }, [isAutomaticScroll]);

  useEffect(() => {
    if (!highlightedRepositoryId) return;

    const clearHighlight = () => setHighlightedRepositoryId(null);
    const clearHighlightAfterScroll = () => {
      if (!isAutomaticScroll) clearHighlight();
    };

    window.addEventListener("scroll", clearHighlightAfterScroll, { passive: true });
    window.addEventListener("touchmove", clearHighlight, { passive: true });
    window.addEventListener("wheel", clearHighlight, { passive: true });

    return () => {
      window.removeEventListener("scroll", clearHighlightAfterScroll);
      window.removeEventListener("touchmove", clearHighlight);
      window.removeEventListener("wheel", clearHighlight);
    };
  }, [highlightedRepositoryId, isAutomaticScroll]);

  const highlightSourceRepository = () => {
    setIsAutomaticScroll(true);
    setHighlightedRepositoryId(sourceRepositoryId);
    document.getElementById(sourceRepositoryId)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const focusPresentationStep = useCallback((step: InteractivePresentationStep) => {
    const target = document.getElementById(step.targetId);
    if (!target) return;

    setIsAutomaticScroll(true);
    target.scrollIntoView({
      behavior: "smooth",
      block: step.block ?? "center",
    });
  }, []);

  const completePresentation = useCallback(() => {
    if (!activePresentation) return;

    setCompletedPresentationSlug(activePresentation.slug);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [activePresentation]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PortfolioHeader
        fullName={siteContent.identity.fullName}
        items={navigationItems}
        navigation={navigation}
        navigationLocked={!!activePresentation}
      />
      <PortfolioHero
        identity={heroIdentity}
        content={heroContent}
        scrollDisabled={!!activePresentation}
        onScroll={() => {
          if (firstSectionId) navigation.scrollTo(firstSectionId);
        }}
      />
      <main className="relative">
        {portfolioSections.map((section) => (
          <PortfolioSectionView
            key={
              section.type === "split"
                ? section.columns.map((column) => column.id).join("-")
                : section.id
            }
            section={section}
            highlightedRepositoryId={highlightedRepositoryId}
            onRepositoryHighlightClear={() => setHighlightedRepositoryId(null)}
            openTimelineItemKey={openTimelineItemKey}
            onOpenTimelineItemKeyChange={setOpenTimelineItemKey}
          />
        ))}
        <PortfolioFooter
          content={siteContent.footer}
          fullName={siteContent.identity.fullName}
          onSourceClick={highlightSourceRepository}
        />
      </main>
      {activePresentation && (
        <InteractivePresentationBar
          presentation={activePresentation}
          onFocusStep={focusPresentationStep}
          onComplete={completePresentation}
        />
      )}
    </div>
  );
}
