import { SECTOR_IDS, type SectorId } from "@/lib/sectors";
import { getSectorIdForSecteur } from "@/lib/sector-deals";
import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import type { MaDeal, MaDealType } from "./types";
import { MA_DEALS_RAW as rawFr } from "./fr";
import { MA_DEALS_RAW as rawEn } from "./en";

export type { MaDeal, MaDealType } from "./types";

function withSectorAndAngles(deals: Omit<MaDeal, "sectorId">[]): MaDeal[] {
  return deals.map((d) => ({
    ...d,
    sectorId: getSectorIdForSecteur(d.secteur),
    interviewAngles:
      "interviewAngles" in d && Array.isArray((d as MaDeal).interviewAngles)
        ? (d as MaDeal).interviewAngles
        : d.pointEntretien
            .split(/(?<=[.!?])\s+/)
            .map((s) => s.trim())
            .filter((s) => s.length > 20)
            .slice(0, 5),
  }));
}

const dealsFr = withSectorAndAngles(rawFr);
const dealsEn = withSectorAndAngles(rawEn);

/** French corpus — default for backwards-compatible imports. */
export const MA_DEALS: MaDeal[] = dealsFr;

export function getMaDeals(locale: AppLocale = DEFAULT_LOCALE): MaDeal[] {
  return locale === "en" ? dealsEn : dealsFr;
}

export function getDealInterviewAngles(deal: MaDeal): string[] {
  return deal.interviewAngles?.length ? deal.interviewAngles : [deal.pointEntretien];
}

const uniqueBanks = [...new Set(MA_DEALS.flatMap((d) => d.banks))].sort((a, b) =>
  a.localeCompare(b, "fr"),
);

export const MA_DEAL_BANKS = ["all", ...uniqueBanks] as const;

export const MA_DEAL_SECTOR_IDS = [
  "all",
  ...SECTOR_IDS.filter((id) => MA_DEALS.some((d) => d.sectorId === id)),
] as const;

const TYPE_ORDER: MaDealType[] = [
  "M&A",
  "IPO",
  "LBO",
  "Carve-out",
  "Restructuring",
  "OPA",
  "Cessions",
  "Tendance",
];

export const MA_DEAL_TYPES = [
  "all",
  ...TYPE_ORDER.filter((t) => MA_DEALS.some((d) => d.type === t)),
] as const;

export function isValidDealId(id: string): boolean {
  return MA_DEALS.some((d) => d.id === id);
}

export function getDealById(
  id: string,
  locale: AppLocale = DEFAULT_LOCALE,
): MaDeal | undefined {
  return getMaDeals(locale).find((d) => d.id === id);
}

export function getDealsForSector(
  sectorId: SectorId,
  locale: AppLocale = DEFAULT_LOCALE,
): MaDeal[] {
  return getMaDeals(locale).filter((d) => d.sectorId === sectorId);
}

export function dealMatchesType(deal: MaDeal, type: string): boolean {
  return deal.type === type;
}

export function dealMatchesSector(deal: MaDeal, sectorId: SectorId): boolean {
  return deal.sectorId === sectorId;
}

/** Badge date court pour l'en-tête de carte */
export function dealDateBadge(dates: string): string {
  const first = dates.split("—")[0]?.trim() ?? dates;
  return first.length > 28 ? `${first.slice(0, 25)}…` : first;
}
