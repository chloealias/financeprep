import { useEffect, useRef, type ReactNode } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { ClientOnly } from "@/components/hub/ClientOnly";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/useT";

type DetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  contentClassName?: string;
};

export function DetailSheet({
  open,
  onOpenChange,
  title,
  children,
  returnFocusRef,
  contentClassName,
}: DetailSheetProps) {
  const { t } = useT();
  const contentRef = useRef<HTMLDivElement>(null);
  const closeLabel = t("hub.common.closeSheet");

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      const closeBtn = contentRef.current?.querySelector<HTMLElement>(
        `button[aria-label="${CSS.escape(closeLabel)}"]`,
      );
      closeBtn?.focus();
    }, 100);
    return () => window.clearTimeout(timer);
  }, [open, closeLabel]);

  useEffect(() => {
    if (open) return;
    returnFocusRef?.current?.focus();
  }, [open, returnFocusRef]);

  return (
    <ClientOnly>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="md:hidden">
          <DrawerTitle className="sr-only">{title}</DrawerTitle>
          <DrawerDescription className="sr-only">
            {t("hub.detailSheet.description")}
          </DrawerDescription>
          <div
            ref={contentRef}
            className={cn(
              "overflow-y-auto overscroll-contain max-h-[calc(90vh-2rem)]",
              contentClassName ?? "px-1 pb-6 pt-2",
            )}
          >
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    </ClientOnly>
  );
}
