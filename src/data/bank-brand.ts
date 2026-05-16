/** Identité visuelle par banque (usage pédagogique). */
export type BankBrand = {
  initials: string;
  color: string;
  /** Logo blanc/clair : afficher sur fond de la couleur de marque. */
  logoOnDark?: boolean;
};

export const BANK_BRAND: Record<string, BankBrand> = {
  'rothschild-co': { initials: 'R&', color: '#7D2248' },
  lazard: { initials: 'LA', color: '#00205B', logoOnDark: true },
  'goldman-sachs': { initials: 'GS', color: '#6B96C3' },
  'morgan-stanley': { initials: 'MS', color: '#002F6C' },
  jpmorgan: { initials: 'JPM', color: '#117ACA' },
  'bank-of-america': { initials: 'BoA', color: '#E31837' },
  citi: { initials: 'C', color: '#003B70' },
  barclays: { initials: 'BARC', color: '#00AEEF' },
  'bnp-paribas': { initials: 'BNP', color: '#00965E' },
  'societe-generale': { initials: 'SG', color: '#E60028' },
  hsbc: { initials: 'HSBC', color: '#DB0011' },
  ubs: { initials: 'UBS', color: '#E60000' },
  'deutsche-bank': { initials: 'DB', color: '#0018A8' },
};

export const BANK_LOGO_PATH = (bankId: string) => `/logos/banks/${bankId}.svg`;

export function getBankBrand (bankId: string): BankBrand {
  return BANK_BRAND[bankId] ?? { initials: '?', color: '#64748b' };
}
