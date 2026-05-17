import { lazy, Suspense, useEffect, useRef } from "react";
import { Route } from "@/routes/index";
import { SectorPanel } from "@/components/sectors/SectorPanel";
import { DetailSheet } from "@/components/hub/DetailSheet";
import { SECTOR_DATA } from "@/data/sector-data";
import { isValidSectorId, type SectorId } from "@/lib/sectors";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const IsometricMap = lazy(() =>
  import("@/components/sectors/IsometricMap").then((m) => ({ default: m.IsometricMap })),
);

export function SectorsTab() {
  const { sector: sectorFromUrl } = Route.useSearch();
  const navigate = Route.useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastSectorTriggerRef = useRef<HTMLElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const selectedSector = sectorFromUrl && isValidSectorId(sectorFromUrl) ? sectorFromUrl : null;

  const handleSectorSelect = (id: SectorId | null) => {
    if (id !== null && document.activeElement instanceof HTMLElement) {
      lastSectorTriggerRef.current = document.activeElement;
    }
    navigate({
      search: (prev) => ({
        tab: "secteurs",
        bank: undefined,
        sector: id ?? undefined,
      }),
    });
  };

  const handleClose = () => {
    navigate({
      search: (prev) => ({
        tab: prev.tab ?? "secteurs",
        sector: undefined,
      }),
    });
  };

  useEffect(() => {
    if (!selectedSector) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedSector]);

  useEffect(() => {
    if (!selectedSector || isMobile || !panelRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      panelRef.current?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [selectedSector, isMobile]);

  const isDeepLinked = Boolean(sectorFromUrl && selectedSector === sectorFromUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-blue-700" />
          <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">
            Couverture sectorielle
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
          Fiches <span className="italic font-light text-blue-700">sectorielles</span>
        </h2>
        <p className="text-blue-700 mt-3 font-light">
          7 secteurs couvrant ~80% des deals. Cliquez sur un bâtiment ou utilisez les boutons sous
          la carte pour ouvrir une fiche.
        </p>
      </div>

      <Suspense
        fallback={
          <div
            className="h-64 rounded-2xl border border-blue-100 bg-blue-50/50 animate-pulse"
            aria-hidden
          />
        }
      >
        <IsometricMap onSectorSelect={handleSectorSelect} selectedSector={selectedSector} />
      </Suspense>

      {selectedSector && !isMobile && (
        <div ref={panelRef} className="scroll-mt-24">
          <SectorPanel sectorId={selectedSector} onClose={handleClose} highlighted={isDeepLinked} />
        </div>
      )}

      {isMobile && selectedSector && SECTOR_DATA[selectedSector] && (
        <DetailSheet
          open
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
          title={`Fiche ${SECTOR_DATA[selectedSector].name}`}
          returnFocusRef={lastSectorTriggerRef}
        >
          <SectorPanel sectorId={selectedSector} onClose={handleClose} highlighted={isDeepLinked} />
        </DetailSheet>
      )}
    </div>
  );
}
