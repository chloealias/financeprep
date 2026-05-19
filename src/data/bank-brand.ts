/** Identité visuelle par banque (usage pédagogique). */
export type BankBrand = {
  initials: string;
  color: string;
  /** Logo blanc/clair : afficher sur fond de la couleur de marque. */
  logoOnDark?: boolean;
  /** Zoom du logo dans la zone fixe (défaut 1). */
  logoScale?: number;
};

export const BANK_BRAND: Record<string, BankBrand> = {
  "rothschild-co": { initials: "R&", color: "#7D2248" },
  lazard: { initials: "LA", color: "#00205B", logoOnDark: true },
  "goldman-sachs": { initials: "GS", color: "#6B96C3" },
  "morgan-stanley": { initials: "MS", color: "#002F6C" },
  jpmorgan: { initials: "JPM", color: "#117ACA" },
  "bank-of-america": { initials: "BoA", color: "#E31837", logoScale: 1.45 },
  citi: { initials: "C", color: "#003B70" },
  barclays: { initials: "BARC", color: "#00AEEF" },
  "bnp-paribas": { initials: "BNP", color: "#00965E" },
  "societe-generale": { initials: "SG", color: "#E60028" },
  hsbc: { initials: "HSBC", color: "#DB0011" },
  ubs: { initials: "UBS", color: "#E60000" },
  "deutsche-bank": { initials: "DB", color: "#0018A8" },
  evercore: { initials: "EVR", color: "#1A3A5C" },
  centerview: { initials: "CV", color: "#0F2B46", logoScale: 1.5 },
  "houlihan-lokey": { initials: "HL", color: "#003366", logoScale: 1.5 },
  "credit-suisse": { initials: "CS", color: "#003087", logoOnDark: true, logoScale: 1.15 },
  mediobanca: { initials: "MB", color: "#1B365D", logoScale: 1.5 },
  natixis: { initials: "NAT", color: "#002d62", logoScale: 1.35 },
  "credit-agricole-cib": { initials: "CACIB", color: "#006F4C", logoScale: 1.35 },
  jefferies: { initials: "JEF", color: "#003DA5", logoScale: 1.5 },
  macquarie: { initials: "MQG", color: "#000000" },
  "oddo-bhf": { initials: "OB", color: "#C41230", logoScale: 1.5 },
  moelis: { initials: "MC", color: "#1B365D", logoScale: 1.35 },
  "pjt-partners": { initials: "PJT", color: "#002855", logoOnDark: true, logoScale: 1.25 },
  "perella-weinberg": { initials: "PWP", color: "#0F2B46", logoScale: 1.3 },
};

export const BANK_LOGO_PATH = (bankId: string) => `/logos/banks/${bankId}.svg`;

export function getBankBrand(bankId: string): BankBrand {
  return BANK_BRAND[bankId] ?? { initials: "?", color: "#64748b" };
}
