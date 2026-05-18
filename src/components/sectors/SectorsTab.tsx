import { lazy, Suspense, useEffect, useRef } from "react";
import { Route } from "@/routes/index";
import { SECTOR_DATA } from "@/data/sector-data";
import type { SectorId } from "@/lib/sectors";
import { SectorDetailDialog } from "@/components/sectors/SectorDetailDialog";
import { usePreserveScrollOnDetailClose } from "@/hooks/usePreserveScrollOnDetailClose";

const IsometricMap = lazy(() =>
  import("@/components/sectors/IsometricMap").then((m) => ({ default: m.IsometricMap })),
);

export function SectorsTab() {
  const { sector: sectorFromUrl } = Route.useSearch();
  const navigate = Route.useNavigate();
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const selectedSectorId = sectorFromUrl && SECTOR_DATA[sectorFromUrl] ? sectorFromUrl : null;

  const captureScroll = usePreserveScrollOnDetailClose(selectedSectorId !== null);

  const handleSectorSelect = (id: SectorId) => {
    if (selectedSectorId === id) {
      handleClose();
      return;
    }
    if (!selectedSectorId) {
      captureScroll();
    }
    navigate({
      search: (prev) => ({
        ...prev,
        tab: "secteurs",
        sector: id,
      }),
    });
  };

  const handleClose = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        tab: prev.tab ?? "secteurs",
        sector: undefined,
      }),
    });
  };

  useEffect(() => {
    if (sectorFromUrl && !SECTOR_DATA[sectorFromUrl]) {
      navigate({
        search: (prev) => ({ ...prev, sector: undefined }),
      });
    }
  }, [sectorFromUrl, navigate]);

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
        <IsometricMap onSectorSelect={handleSectorSelect} selectedSectorId={selectedSectorId} />
      </Suspense>

      {selectedSectorId && (
        <SectorDetailDialog
          sectorId={selectedSectorId}
          open
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
          returnFocusRef={lastTriggerRef}
        />
      )}
    </div>
  );
}
