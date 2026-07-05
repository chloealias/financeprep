import { useEffect, useRef, useState, type ReactNode } from "react";
import type { AppTab, HubNavTab } from "@/lib/app-tabs";
import { HUB_NAV_TABS, isHubNavTab } from "@/lib/app-tabs";

type HubTabPanelsProps = {
  activePage: AppTab;
  panels: Record<HubNavTab, ReactNode>;
};

function tabIndex(tab: HubNavTab): number {
  return HUB_NAV_TABS.indexOf(tab);
}

export function HubTabPanels({ activePage, panels }: HubTabPanelsProps) {
  const [visited, setVisited] = useState<Set<HubNavTab>>(() => {
    const initial = isHubNavTab(activePage) ? activePage : "guide";
    return new Set<HubNavTab>([initial]);
  });
  const prevTab = useRef<HubNavTab | null>(null);
  const [slideFrom, setSlideFrom] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    if (!isHubNavTab(activePage)) return;
    setVisited((prev) => new Set(prev).add(activePage));
    if (prevTab.current && prevTab.current !== activePage) {
      const delta = tabIndex(activePage) - tabIndex(prevTab.current);
      setSlideFrom(delta > 0 ? "right" : "left");
      const t = window.setTimeout(() => setSlideFrom(null), 160);
      prevTab.current = activePage;
      return () => window.clearTimeout(t);
    }
    prevTab.current = activePage;
  }, [activePage]);

  if (!isHubNavTab(activePage)) return null;

  return (
    <div className="min-h-[50vh] bg-gradient-to-br from-background via-muted/20 to-background">
      {HUB_NAV_TABS.map((tab) => {
        const isActive = activePage === tab;
        const hasVisited = visited.has(tab);
        if (!hasVisited) return null;

        return (
          <div
            key={tab}
            id={`hub-panel-${tab}`}
            role="tabpanel"
            aria-hidden={!isActive}
            inert={!isActive ? true : undefined}
            className={`transition-opacity duration-150 ${
              isActive ? "opacity-100" : "opacity-0 hidden pointer-events-none absolute w-0 h-0 overflow-hidden"
            } ${
              isActive && slideFrom === "right"
                ? "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-2 motion-safe:duration-150"
                : ""
            } ${
              isActive && slideFrom === "left"
                ? "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-2 motion-safe:duration-150"
                : ""
            }`}
          >
            {panels[tab]}
          </div>
        );
      })}
    </div>
  );
}
