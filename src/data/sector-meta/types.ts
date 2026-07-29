import type { SectorId } from "@/lib/sectors";

export type SectorMeta = {
  label: string;
  shortLabel: string;
  tagline: string;
  /** Centre du bâtiment sur la carte compacte */
  mapSlot: { x: number; y: number };
  labelOffset: { x: number; y: number };
};
