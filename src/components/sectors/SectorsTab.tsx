import { lazy, Suspense, useEffect, useRef } from "react";
import { Route } from "@/routes/index";
import { getSectorData } from "@/data/sector-data";
import type { SectorId } from "@/lib/sectors";
import { SectorDetailDialog } from "@/components/sectors/SectorDetailDialog";
import { usePreserveScrollOnDetailClose } from "@/hooks/usePreserveScrollOnDetailClose";
import { PageHeader } from "@/components/ui/page-header";
import { useT } from "@/hooks/useT";

const IsometricMap = lazy(() =>
  import("@/components/sectors/IsometricMap").then((m) => ({ default: m.IsometricMap })),
);

export function SectorsTab() {
  const { t, locale } = useT();
  const { sector: sectorFromUrl } = Route.useSearch() as { sector?: SectorId };
  const navigate = Route.useNavigate();
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const sectorData = getSectorData(locale);

  const selectedSectorId = sectorFromUrl && sectorData[sectorFromUrl] ? sectorFromUrl : null;

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
      search: (prev: import("@/lib/route-search").HomeSearch) => ({
        ...prev,
        tab: "secteurs",
        sector: id,
      }),
    });
  };

  const handleClose = () => {
    navigate({
      search: (prev: import("@/lib/route-search").HomeSearch) => ({
        ...prev,
        tab: prev.tab ?? "secteurs",
        sector: undefined,
      }),
    });
  };

  useEffect(() => {
    if (sectorFromUrl && !sectorData[sectorFromUrl]) {
      navigate({
        search: (prev: import("@/lib/route-search").HomeSearch) => ({ ...prev, sector: undefined }),
      });
    }
  }, [sectorFromUrl, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <PageHeader
        eyebrow={t("hub.sectors.eyebrow")}
        title={
          <>
            {t("hub.sectors.titlePrefix")}{" "}
            <span className="type-accent">{t("hub.sectors.titleAccent")}</span>
          </>
        }
        description={t("hub.sectors.description")}
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
