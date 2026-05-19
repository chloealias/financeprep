export const SECTOR_IDS = [
  "tmt",
  "sante",
  "energie",
  "retail",
  "industrie",
  "auto",
  "immo",
  "fi",
] as const;

export type SectorId = (typeof SECTOR_IDS)[number];

export function isValidSectorId(value: string): value is SectorId {
  return (SECTOR_IDS as readonly string[]).includes(value);
}
