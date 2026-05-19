import type { SectorId } from "@/lib/sectors";
import { SECTOR_DATA } from "@/data/sector-data";

/** Map secteur libre (MaDeal) → fiche sectorielle */
const SECTEUR_TO_SECTOR: Record<string, SectorId> = {
  "Santé / Consumer Healthcare": "sante",
  "Santé / Biopharma": "sante",
  "TMT / Telecom": "tmt",
  "TMT / Fintech / Payments": "tmt",
  "Énergie / Oil & Gas": "energie",
  "Retail / Luxe / FMCG": "retail",
  "Industrie / Construction & Infrastructure": "industrie",
  "Industrie / Infrastructure": "industrie",
  "Industrie / Défense": "industrie",
  "FIG — Banques": "fi",
  "Immobilier / REIT logistique": "immo",
  "TMT / Gaming": "tmt",
  "Industrie / Distribution chimique": "industrie",
  "Automobile / OEM": "auto",
  "Automobile / Mobilité & EV": "auto",
  "Automobile / Équipementiers": "auto",
};

export function getSectorIdForSecteur(secteur: string): SectorId | undefined {
  return SECTEUR_TO_SECTOR[secteur];
}

export function getSectorLabel(sectorId: SectorId): string {
  return SECTOR_DATA[sectorId].name;
}
