import { useEffect, type MouseEvent } from "react";
import { X } from "lucide-react";
import { ClientOnly } from "@/components/hub/ClientOnly";

type ImageLightboxProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  subtitle?: string;
};

export function ImageLightbox({ open, onClose, src, alt, subtitle }: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <ClientOnly>
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-6 md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        onClick={handleBackdropClick}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 touch-target rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{
            top: "max(1rem, env(safe-area-inset-top))",
            right: "max(1rem, env(safe-area-inset-right))",
          }}
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <div className="w-full aspect-square max-h-[min(70vh,400px)] flex items-center justify-center rounded-2xl bg-white p-8 shadow-2xl">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full w-full h-full object-contain"
            />
          </div>
          {subtitle && (
            <p className="text-white/90 text-center text-sm font-light px-4">{subtitle}</p>
          )}
        </div>
      </div>
    </ClientOnly>
  );
}
