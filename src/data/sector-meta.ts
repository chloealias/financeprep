import type { SectorId } from '@/lib/sectors';

export type SectorMeta = {
  label: string;
  shortLabel: string;
  tagline: string;
  /** Centre du bâtiment sur la carte compacte */
  mapSlot: { x: number; y: number };
  labelOffset: { x: number; y: number };
};

export const SECTOR_META: Record<SectorId, SectorMeta> = {
  tmt: {
    label: 'TMT',
    shortLabel: 'TMT',
    tagline: 'Tech, média, télécoms',
    mapSlot: { x: 95, y: 175 },
    labelOffset: { x: 0, y: 42 },
  },
  sante: {
    label: 'Santé',
    shortLabel: 'Santé',
    tagline: 'Pharma, medtech, services de santé',
    mapSlot: { x: 235, y: 172 },
    labelOffset: { x: 0, y: 42 },
  },
  energie: {
    label: 'Énergie',
    shortLabel: 'Énergie',
    tagline: 'Oil & gas, utilities, renouvelables',
    mapSlot: { x: 375, y: 178 },
    labelOffset: { x: 0, y: 38 },
  },
  retail: {
    label: 'Retail / FMCG',
    shortLabel: 'Retail',
    tagline: 'Distribution, consommation, e-commerce',
    mapSlot: { x: 515, y: 175 },
    labelOffset: { x: 0, y: 40 },
  },
  industrie: {
    label: 'Industrie',
    shortLabel: 'Industrie',
    tagline: 'Manufacturing, B2B, infrastructure',
    mapSlot: { x: 165, y: 310 },
    labelOffset: { x: 0, y: 38 },
  },
  immo: {
    label: 'Immobilier',
    shortLabel: 'Immo',
    tagline: 'Bureaux, logistique, résidentiel',
    mapSlot: { x: 360, y: 305 },
    labelOffset: { x: 0, y: 48 },
  },
  fi: {
    label: 'FIG',
    shortLabel: 'FIG',
    tagline: 'Banques, assurance, asset management',
    mapSlot: { x: 555, y: 308 },
    labelOffset: { x: 0, y: 40 },
  },
};

export const SECTOR_LIST = Object.keys(SECTOR_META) as SectorId[];
