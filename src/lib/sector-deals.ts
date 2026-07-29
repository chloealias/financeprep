import type { SectorId } from "@/lib/sectors";
import { getSectorData } from "@/data/sector-data";
import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";

/** Map secteur libre (MaDeal) → fiche sectorielle */
const SECTEUR_TO_SECTOR: Record<string, SectorId> = {
  "Santé / Consumer Healthcare": "sante",
  "Healthcare / Consumer Healthcare": "sante",
  "Santé / Biopharma": "sante",
  "Healthcare / Biopharma": "sante",
  "TMT / Telecom": "tmt",
  "TMT / Fintech / Payments": "tmt",
  "TMT / Intelligence Artificielle": "tmt",
  "TMT / Artificial Intelligence": "tmt",
  "TMT / Infrastructure IA & Cloud": "tmt",
  "TMT / AI Infrastructure & Cloud": "tmt",
  "TMT / Aérospatiale & Espace": "tmt",
  "TMT / Aerospace & Space": "tmt",
  "Énergie / Oil & Gas": "energie",
  "Energy / Oil & Gas": "energie",
  "Retail / Luxe / FMCG": "retail",
  "Retail / Luxury / FMCG": "retail",
  "Industrie / Construction & Infrastructure": "industrie",
  "Industrials / Construction & Infrastructure": "industrie",
  "Industrie / Infrastructure": "industrie",
  "Industrials / Infrastructure": "industrie",
  "Industrie / Défense": "industrie",
  "Industrials / Defense": "industrie",
  "FIG — Banques": "fi",
  "FIG — Banks": "fi",
  "Immobilier / REIT logistique": "immo",
  "Real Estate / Logistics REIT": "immo",
  "TMT / Gaming": "tmt",
  "Industrie / Distribution chimique": "industrie",
  "Automobile / OEM": "auto",
  "Automobile / Mobilité & EV": "auto",
  "Automotive / Mobility & EV": "auto",
  "Automobile / Équipementiers": "auto",
};

export function getSectorIdForSecteur(secteur: string): SectorId | undefined {
  return SECTEUR_TO_SECTOR[secteur];
}

export function getSectorLabel(
  sectorId: SectorId,
  locale: AppLocale = DEFAULT_LOCALE,
): string {
  return getSectorData(locale)[sectorId].name;
}
