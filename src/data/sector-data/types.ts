import type { LucideIcon } from "lucide-react";

export type SectorPanorama = {
  /** Taille du marché adressable (ordre de grandeur global ou Europe) */
  tailleMarche: string;
  /** Volume M&A annuel typique (deals > seuil, zone géographique) */
  volumeMa: string;
  /** Principaux acteurs cotés / stratégiques à citer en entretien */
  acteursMajeurs: string[];
  /** Segments ou sous-secteurs structurants */
  segmentsCles: string[];
};

export type SectorSheetData = {
  name: string;
  tag: string;
  Icon: LucideIcon;
  panorama: SectorPanorama;
  kpis: string[];
  multiples: { label: string; value: string }[];
  tendances: string[];
  deal: { titre: string; texte: string };
  emblematicDealId?: string;
  question: string;
  reponse: string;
};
