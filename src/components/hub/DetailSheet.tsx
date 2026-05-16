import { useEffect, useRef, type ReactNode } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ClientOnly } from '@/components/hub/ClientOnly';

type DetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
};

export function DetailSheet ({
  open,
  onOpenChange,
  title,
  children,
  returnFocusRef,
}: DetailSheetProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      const closeBtn = contentRef.current?.querySelector<HTMLElement>(
        'button[aria-label="Fermer la fiche"]',
      );
      closeBtn?.focus();
    }, 100);
    return () => window.clearTimeout(timer);
  }, [open]);

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
            Fiche détaillée — faites glisser vers le bas ou appuyez sur Échap pour fermer.
          </DrawerDescription>
          <div
            ref={contentRef}
            className="overflow-y-auto overscroll-contain px-1 pb-6 pt-2 max-h-[calc(90vh-2rem)]"
          >
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    </ClientOnly>
  );
}
