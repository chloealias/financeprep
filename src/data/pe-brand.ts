/** Identité visuelle par fonds PE (usage pédagogique). */
export type PeFundBrand = {
  initials: string;
  color: string;
  logoOnDark?: boolean;
  logoScale?: number;
};

export const PE_BRAND: Record<string, PeFundBrand> = {
  ardian: { initials: "AR", color: "#003366", logoOnDark: true },
  eqt: { initials: "EQT", color: "#E4002B", logoOnDark: true },
  kkr: { initials: "KKR", color: "#4D0A3D", logoOnDark: true },
  eurazeo: { initials: "EU", color: "#00A0DF" },
  "pai-partners": { initials: "PAI", color: "#1B365D", logoOnDark: true },
  wendel: { initials: "WE", color: "#C41230", logoOnDark: true },
  apax: { initials: "AP", color: "#002855", logoOnDark: true },
  astorg: { initials: "AS", color: "#0F2B46", logoOnDark: true },
  cdr: { initials: "CDR", color: "#003087", logoOnDark: true },
  cvc: { initials: "CVC", color: "#1A1A1A", logoOnDark: true },
};

export const PE_LOGO_PATH = (fundId: string) => `/logos/pe/${fundId}.svg`;

export function getPeFundBrand(fundId: string): PeFundBrand {
  return PE_BRAND[fundId] ?? { initials: "?", color: "#64748b" };
}
