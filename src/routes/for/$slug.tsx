import { createFileRoute } from "@tanstack/react-router";

import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { siteContent } from "@/content";
import { loadPresentation } from "@/content/presentations/load-presentation.functions";

export const Route = createFileRoute("/for/$slug")({
  loader: ({ params }) => loadPresentation({ data: { slug: params.slug } }),
  head: () => ({
    meta: [
      { title: siteContent.seo.title },
      { name: "description", content: siteContent.seo.description },
      { property: "og:title", content: siteContent.seo.title },
      { property: "og:description", content: siteContent.seo.openGraphDescription },
    ],
    links: [{ rel: "preload", as: "image", href: siteContent.hero.profileImage }],
  }),
  component: PresentationRoute,
});

function PresentationRoute() {
  const presentation = Route.useLoaderData();

  return <PortfolioPage presentation={presentation} />;
}
