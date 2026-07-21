import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { SECTOR_DATA } from "@/data/sector-data";
import type { SectorId } from "@/lib/sectors";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DetailSheet } from "@/components/hub/DetailSheet";
import { ClientOnly } from "@/components/hub/ClientOnly";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectorPanelContent } from "@/components/sectors/SectorPanel";
import { useT } from "@/hooks/useT";

type SectorDetailDialogProps = {
  sectorId: SectorId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
};

function SectorDetailCloseButton({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  return (
    <button
      type="button"
      onClick={onClose}
      className="absolute top-0 right-0 z-10 touch-target rounded-full border border-border bg-card text-muted-foreground hover:text-primary hover:bg-muted transition-all shadow-sm"
      aria-label={t("hub.common.closeSheet")}
    >
      <X className="w-4 h-4" />
    </button>
  );
}

function SectorDetailHeader({
  tag,
  name,
  onClose,
}: {
  tag: string;
  name: string;
  onClose: () => void;
}) {
  return (
    <header className="relative pr-12 mb-6 pb-5 border-b border-border">
      <SectorDetailCloseButton onClose={onClose} />
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-1.5">
        {tag}
      </p>
      <h2
        id="sector-detail-title"
        className="text-2xl sm:text-3xl font-serif text-foreground leading-tight"
      >
        {name}
      </h2>
    </header>
  );
}

export function SectorDetailDialog({
  sectorId,
  open,
  onOpenChange,
  returnFocusRef,
}: SectorDetailDialogProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const data = SECTOR_DATA[sectorId];
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || isMobile) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, isMobile, onOpenChange]);

  if (!data || !open) return null;

  const handleClose = () => onOpenChange(false);

  const header = <SectorDetailHeader tag={data.tag} name={data.name} onClose={handleClose} />;

  const body = <SectorPanelContent sectorId={sectorId} highlightFlash embedded />;

  if (isMobile) {
    return (
      <DetailSheet
        open={open}
        onOpenChange={onOpenChange}
        title={data.name}
        returnFocusRef={returnFocusRef}
        contentClassName="px-5 sm:px-6 pb-8 pt-4"
      >
        {header}
        {body}
      </DetailSheet>
    );
  }

  return (
    <ClientOnly>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-5xl w-[calc(100%-1.5rem)] max-h-[min(92vh,920px)] overflow-hidden flex flex-col gap-0 p-0 border-border sm:rounded-2xl [&>button.absolute]:hidden"
          aria-labelledby="sector-detail-title"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            contentRef.current?.focus();
          }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{data.name}</DialogTitle>
            <DialogDescription>Fiche sectorielle — {data.tag}</DialogDescription>
          </DialogHeader>
          <div className="shrink-0 px-5 sm:px-8 pt-5 sm:pt-6 bg-card rounded-t-2xl">{header}</div>
          <div
            ref={contentRef}
            tabIndex={-1}
            className="overflow-y-auto overscroll-contain flex-1 min-h-0 outline-none px-5 sm:px-8 py-5 sm:py-6"
          >
            {body}
          </div>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
}
