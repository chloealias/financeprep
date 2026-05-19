import type { MaDeal } from "@/data/ma-deals";

/** Variantes de libellés deal → nom canonique dans bank-profiles. */
const BANK_LABEL_ALIASES: Record<string, string> = {
  Citi: "Citigroup",
};

/** Retire préfixe liste et rôle entre parenthèses (« Lazard (M&A) » → « Lazard »). */
export function normalizeBankLabel(raw: string): string {
  let s = raw.replace(/^[·\s]+/, "").trim();
  const withoutRole = s.match(/^(.+?)\s*\([^)]*\)\s*$/);
  if (withoutRole) s = withoutRole[1]!.trim();
  return BANK_LABEL_ALIASES[s] ?? s;
}

export function collectDealBankLabels(deal: MaDeal): string[] {
  const labels = [...deal.banks];
  const advisors = deal.advisors;
  if (!advisors) return labels;
  advisors.sellSide?.forEach((a) => labels.push(a));
  advisors.buySide?.forEach((a) => labels.push(a));
  advisors.other?.forEach((g) => labels.push(...g.banks));
  return labels;
}
