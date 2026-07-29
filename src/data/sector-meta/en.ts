import type { SectorId } from "@/lib/sectors";
import type { SectorMeta } from "./types";

export const SECTOR_META: Record<SectorId, SectorMeta> = {
  tmt: {
    label: "TMT",
    shortLabel: "TMT",
    tagline: "Tech, media, telecom",
    mapSlot: { x: 95, y: 172 },
    labelOffset: { x: 0, y: 42 },
  },
  sante: {
    label: "Healthcare",
    shortLabel: "Health",
    tagline: "Pharma, medtech, healthcare services",
    mapSlot: { x: 235, y: 172 },
    labelOffset: { x: 0, y: 42 },
  },
  energie: {
    label: "Energy",
    shortLabel: "Energy",
    tagline: "Oil & gas, utilities, renewables",
    mapSlot: { x: 360, y: 178 },
    labelOffset: { x: 0, y: 38 },
  },
  retail: {
    label: "Retail / FMCG",
    shortLabel: "Retail",
    tagline: "Distribution, consumer, e-commerce",
    mapSlot: { x: 515, y: 175 },
    labelOffset: { x: 0, y: 40 },
  },
  industrie: {
    label: "Industrials",
    shortLabel: "Industrials",
    tagline: "Manufacturing, B2B, infrastructure",
    mapSlot: { x: 235, y: 305 },
    labelOffset: { x: 0, y: 38 },
  },
  auto: {
    label: "Automotive",
    shortLabel: "Auto",
    tagline: "OEMs, EV, suppliers",
    mapSlot: { x: 95, y: 305 },
    labelOffset: { x: 0, y: 40 },
  },
  immo: {
    label: "Real Estate",
    shortLabel: "RE",
    tagline: "Offices, logistics, residential",
    mapSlot: { x: 360, y: 305 },
    labelOffset: { x: 0, y: 48 },
  },
  fi: {
    label: "FIG",
    shortLabel: "FIG",
    tagline: "Banks, insurance, asset management",
    mapSlot: { x: 515, y: 305 },
    labelOffset: { x: 0, y: 40 },
  },
};
