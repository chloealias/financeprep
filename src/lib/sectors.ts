export const SECTOR_IDS = ['tmt', 'sante', 'energie', 'retail', 'industrie', 'immo', 'fi'] as const;

export type SectorId = (typeof SECTOR_IDS)[number];
