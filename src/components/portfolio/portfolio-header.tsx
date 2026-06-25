import { Moon, Sun } from "lucide-react";

import type { NavigationItem } from "@/content";
import type { usePortfolioNavigation } from "@/hooks/use-portfolio-navigation";
import { useTheme } from "@/lib/theme";

type NavigationState = ReturnType<typeof usePortfolioNavigation>;

type PortfolioHeaderProps = {
  fullName: string;
  items: readonly NavigationItem[];
  navigation: NavigationState;
  navigationLocked?: boolean;
};

export function PortfolioHeader({
  fullName,
  items,
  navigation,
  navigationLocked = false,
}: PortfolioHeaderProps) {
  const { theme, toggle } = useTheme();
  const { activeId, itemRefs, mobileNavRef, scrolled, scrollTo } = navigation;

  return (
    <>
      {(
        [
          {
            key: "hero",
            wrapperClass:
              "absolute inset-x-0 top-0 z-50 border-b border-transparent bg-transparent",
            onDark: true,
          },
          {
            key: "fixed",
            wrapperClass: `fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/50 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
              scrolled
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-full opacity-0"
            }`,
            onDark: false,
          },
        ] as const
      ).map(({ key, wrapperClass, onDark }) => (
        <header key={key} className={wrapperClass} aria-hidden={key === "fixed" && !scrolled}>
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6">
            <button
              disabled={navigationLocked}
              onClick={() => {
                if (!navigationLocked) window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`hidden text-base font-semibold tracking-tight transition-colors md:block ${
                onDark ? "text-white" : "text-foreground"
              } ${key === "hero" ? "pointer-events-none invisible" : ""}`}
              tabIndex={key === "hero" ? -1 : undefined}
              aria-hidden={key === "hero"}
            >
              {fullName}
            </button>

            <nav className="hidden items-center gap-1 md:flex">
              {items.map((item) => (
                <NavigationButton
                  key={item.id}
                  item={item}
                  onDark={onDark}
                  disabled={navigationLocked}
                  onClick={() => {
                    if (!navigationLocked) scrollTo(item.id);
                  }}
                />
              ))}
            </nav>

            <nav
              ref={key === "fixed" ? mobileNavRef : undefined}
              className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] md:hidden [&::-webkit-scrollbar]:hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, black 0, black calc(100% - 2.5rem), transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, black 0, black calc(100% - 2.5rem), transparent 100%)",
              }}
            >
              <div className="relative flex w-max items-center gap-1 pr-20">
                {items.map((item) => (
                  <NavigationButton
                    key={item.id}
                    item={item}
                    onDark={onDark}
                    active={item.id === activeId}
                    refCallback={
                      key === "fixed"
                        ? (element) => {
                            itemRefs.current[item.id] = element;
                          }
                        : undefined
                    }
                    disabled={navigationLocked}
                    onClick={() => {
                      if (!navigationLocked) scrollTo(item.id);
                    }}
                  />
                ))}
              </div>
            </nav>

            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className={`shrink-0 rounded-md p-2 transition-colors ${
                onDark ? "text-white hover:bg-white/10" : "text-foreground hover:bg-accent"
              }`}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </header>
      ))}
    </>
  );
}

type NavigationButtonProps = {
  item: NavigationItem;
  onDark: boolean;
  active?: boolean;
  disabled?: boolean;
  refCallback?: (element: HTMLButtonElement | null) => void;
  onClick: () => void;
};

function NavigationButton({
  item,
  onDark,
  active,
  disabled,
  refCallback,
  onClick,
}: NavigationButtonProps) {
  const color = onDark
    ? active
      ? "text-white"
      : "text-white/75 hover:text-white hover:bg-white/10"
    : active
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground hover:bg-accent";

  return (
    <button
      ref={refCallback}
      disabled={disabled}
      onClick={onClick}
      className={`shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-40 ${color}`}
    >
      {item.label}
    </button>
  );
}
