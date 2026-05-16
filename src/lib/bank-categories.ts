export const BANK_CATEGORY_IDS = [
  'elite-boutique',
  'bulge-bracket',
  'universal-bank',
] as const;

export type BankCategoryId = (typeof BANK_CATEGORY_IDS)[number];

export const BANK_CATEGORY_META: Record<
  BankCategoryId,
  { label: string; description: string }
> = {
  'elite-boutique': {
    label: 'Conseil européen',
    description: 'Advisory indépendant — références M&A et restructuring en Europe.',
  },
  'bulge-bracket': {
    label: 'Banques internationales',
    description: 'Bulge brackets globales — forte présence Europe et cross-border.',
  },
  'universal-bank': {
    label: 'Banques européennes',
    description: 'Groupes bancaires intégrés — CIB et financement corporate en zone euro.',
  },
};

export type BankCategoryFilter = 'all' | BankCategoryId;

export const BANK_CATEGORY_FILTERS: { id: BankCategoryFilter; label: string }[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'elite-boutique', label: 'Conseil européen' },
  { id: 'bulge-bracket', label: 'Internationales' },
  { id: 'universal-bank', label: 'Européennes' },
];

export function isBankCategoryId (value: string): value is BankCategoryId {
  return (BANK_CATEGORY_IDS as readonly string[]).includes(value);
}
