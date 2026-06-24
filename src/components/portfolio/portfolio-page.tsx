import { navigationItems, portfolioSections, siteContent } from "@/content";
import { usePortfolioNavigation } from "@/hooks/use-portfolio-navigation";

import { PortfolioHeader } from "./portfolio-header";
import { PortfolioHero } from "./portfolio-hero";
import { PortfolioSectionView } from "./section-layout";

export function PortfolioPage() {
  const navigation = usePortfolioNavigation(navigationItems);
  const firstSectionId = navigationItems[0]?.id;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PortfolioHeader
        fullName={siteContent.identity.fullName}
        items={navigationItems}
        navigation={navigation}
      />
      <PortfolioHero
        identity={siteContent.identity}
        content={siteContent.hero}
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
          />
        ))}
        <footer className="border-t border-border py-8">
          <div className="font-mono-tight mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted-foreground md:flex-row">
            <p>
              © {new Date().getFullYear()} {siteContent.identity.fullName} ·{" "}
              {siteContent.footer.copyright}
            </p>
            <p>{siteContent.footer.tagline}</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
