import type { SectorId } from "@/lib/sectors";

export type MaDealType =
  | "M&A"
  | "IPO"
  | "LBO"
  | "Carve-out"
  | "Restructuring"
  | "OPA"
  | "Cessions"
  | "Tendance";

export type MaDeal = {
  id: string;
  title: string;
  dates: string;
  type: MaDealType;
  secteur: string;
  sectorId?: SectorId;
  headlineEv: string;
  banks: string[];
  parties: { label: string; text: string }[];
  valorisation?: { label: string; value: string }[];
  financing?: string;
  advisors: {
    sellSide?: string[];
    buySide?: string[];
    other?: { label: string; banks: string[] }[];
  };
  interests: { side: string; text: string }[];
  contexte?: string;
  pointEntretien: string;
  /** Angles pour structurer un pitch en entretien */
  interviewAngles?: string[];
  ftUrl?: string;
  kind: "deal" | "trend";
};
