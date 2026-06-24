import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { NavigationItem } from "@/content";

export function usePortfolioNavigation(items: readonly NavigationItem[]) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mobileNavRef = useRef<HTMLElement>(null);

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
    const onScroll = () => {
      const probe = window.scrollY + 96;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top + window.scrollY <= probe) {
          current = item.id;
        }
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = items.at(-1)?.id ?? current;
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
  }, [items]);

  useLayoutEffect(() => {
    const alignActiveItem = () => {
      const item = itemRefs.current[activeId];
      const container = mobileNavRef.current;
      if (!item || !container) return;

      const endGutter = -64;
      const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
      const target = Math.min(
        item.offsetLeft,
        container.scrollWidth - container.clientWidth - endGutter,
      );
      container.scrollTo({
        left: Math.max(0, Math.min(target, maxScroll)),
        behavior: "smooth",
      });
    };

    alignActiveItem();
    window.addEventListener("resize", alignActiveItem);
    return () => window.removeEventListener("resize", alignActiveItem);
  }, [activeId, scrolled]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { activeId, itemRefs, mobileNavRef, scrolled, scrollTo };
}
