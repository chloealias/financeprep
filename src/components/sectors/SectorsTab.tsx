import { lazy, Suspense, useEffect, useRef } from "react";
import { Route } from "@/routes/index";
import { SECTOR_DATA } from "@/data/sector-data";
import type { SectorId } from "@/lib/sectors";
import { SectorDetailDialog } from "@/components/sectors/SectorDetailDialog";
import { usePreserveScrollOnDetailClose } from "@/hooks/usePreserveScrollOnDetailClose";
import { PageHeader } from "@/components/ui/page-header";

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
      <PageHeader
        eyebrow="Couverture sectorielle"
        title={
          <>
            Fiches <span className="type-accent">sectorielles</span>
          </>
        }
        description="8 secteurs couvrant ~80% des deals. Cliquez sur un bâtiment ou utilisez les boutons sous la carte pour ouvrir une fiche."
      />

      <Suspense
        fallback={
          <div
            className="h-64 rounded-2xl border border-border bg-muted/50 animate-pulse"
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
