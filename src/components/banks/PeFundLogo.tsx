import { useState, type MouseEvent } from "react";
import { PE_LOGO_PATH, getPeFundBrand } from "@/data/pe-brand";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const SIZE_CLASS = {
  sm: "w-10 h-10 rounded-lg",
  md: "w-14 h-14 rounded-xl",
  lg: "w-16 h-16 rounded-xl",
} as const;

const PAD_CLASS = {
  sm: "p-1.5",
  md: "p-2",
  lg: "p-2.5",
} as const;

type PeFundLogoProps = {
  fundId: string;
  fundName?: string;
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  expandable?: boolean;
};

export function PeFundLogo({
  fundId,
  fundName,
  size = "md",
  className = "",
  expandable = false,
}: PeFundLogoProps) {
  const [failed, setFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { initials, color, logoScale = 1 } = getPeFundBrand(fundId);
  const padClass = logoScale > 1 ? { sm: "p-0.5", md: "p-1", lg: "p-1" }[size] : PAD_CLASS[size];
  const label = fundName ?? "Logo fonds PE";
  const canExpand = expandable && isMobile && !failed;

  const containerClass = `flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm border border-slate-200/80 bg-white ${SIZE_CLASS[size]} ${padClass} ${canExpand ? "" : className}`;

  if (!failed) {
    const logoContent = (
      <div className={containerClass}>
        <img
          src={PE_LOGO_PATH(fundId)}
          alt=""
          className="max-w-full max-h-full w-full h-full object-contain pointer-events-none"
          style={logoScale !== 1 ? { transform: `scale(${logoScale})` } : undefined}
          onError={() => setFailed(true)}
        />
      </div>
    );

    if (canExpand) {
      return (
        <>
          <button
            type="button"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            className={`touch-target rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${className}`}
            aria-label={`Agrandir le logo ${label}`}
          >
            {logoContent}
          </button>
          <ImageLightbox
            open={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            src={PE_LOGO_PATH(fundId)}
            alt={label}
            subtitle={fundName}
          />
        </>
      );
    }

    return logoContent;
  }

  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 font-semibold text-white tracking-tight shadow-sm ${SIZE_CLASS[size]} ${className}`}
      style={{ backgroundColor: color }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
