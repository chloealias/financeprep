import { useState, type MouseEvent } from 'react';
import { BANK_LOGO_PATH, getBankBrand } from '@/data/bank-brand';
import { ImageLightbox } from '@/components/ui/image-lightbox';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const SIZE_CLASS = {
  sm: 'w-10 h-10 rounded-lg',
  md: 'w-14 h-14 rounded-xl',
  lg: 'w-16 h-16 rounded-xl',
} as const;

const PAD_CLASS = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-2.5',
} as const;

type BankLogoProps = {
  bankId: string;
  bankName?: string;
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  /** Sur mobile, ouvre le logo en plein écran au tap */
  expandable?: boolean;
};

export function BankLogo ({
  bankId,
  bankName,
  size = 'md',
  className = '',
  expandable = false,
}: BankLogoProps) {
  const [failed, setFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { initials, color, logoOnDark, logoScale = 1 } = getBankBrand(bankId);
  const padClass = logoScale > 1
    ? { sm: 'p-0.5', md: 'p-1', lg: 'p-1' }[size]
    : PAD_CLASS[size];
  const label = bankName ?? 'Logo banque';
  const canExpand = expandable && isMobile && !failed;

  const containerClass = `flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm border border-slate-200/80 ${SIZE_CLASS[size]} ${padClass} ${logoOnDark ? '' : 'bg-white'} ${canExpand ? '' : className}`;

  if (!failed) {
    const logoContent = (
      <div
        className={containerClass}
        style={logoOnDark ? { backgroundColor: color } : undefined}
      >
        <img
          src={BANK_LOGO_PATH(bankId)}
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
            className={`rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${className}`}
            aria-label={`Agrandir le logo ${label}`}
          >
            {logoContent}
          </button>
          <ImageLightbox
            open={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            src={BANK_LOGO_PATH(bankId)}
            alt={label}
            subtitle={bankName}
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
