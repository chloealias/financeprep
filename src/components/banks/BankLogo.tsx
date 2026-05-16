import { useState } from 'react';
import { BANK_LOGO_PATH, getBankBrand } from '@/data/bank-brand';

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
  size?: keyof typeof SIZE_CLASS;
  className?: string;
};

export function BankLogo ({ bankId, size = 'md', className = '' }: BankLogoProps) {
  const [failed, setFailed] = useState(false);
  const { initials, color, logoOnDark } = getBankBrand(bankId);

  if (!failed) {
    return (
      <div
        className={`flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm border border-slate-200/80 ${SIZE_CLASS[size]} ${PAD_CLASS[size]} ${logoOnDark ? '' : 'bg-white'} ${className}`}
        style={logoOnDark ? { backgroundColor: color } : undefined}
      >
        <img
          src={BANK_LOGO_PATH(bankId)}
          alt=""
          className="max-w-full max-h-full w-full h-full object-contain"
          onError={() => setFailed(true)}
        />
      </div>
    );
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
