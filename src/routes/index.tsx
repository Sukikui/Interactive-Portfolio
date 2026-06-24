import { createFileRoute } from "@tanstack/react-router";

import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { siteContent } from "@/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteContent.seo.title },
      { name: "description", content: siteContent.seo.description },
      { property: "og:title", content: siteContent.seo.title },
      { property: "og:description", content: siteContent.seo.openGraphDescription },
    ],
    links: [{ rel: "preload", as: "image", href: siteContent.hero.profileImage }],
  }),
  component: PortfolioPage,
});
