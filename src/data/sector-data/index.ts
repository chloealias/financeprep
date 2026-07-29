import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import type { SectorId } from "@/lib/sectors";
import type { SectorSheetData } from "./types";
import { SECTOR_DATA as dataFr } from "./fr";
import { SECTOR_DATA as dataEn } from "./en";

export type { SectorPanorama, SectorSheetData } from "./types";

/** French corpus — default for backwards-compatible imports. */
export const SECTOR_DATA: Record<SectorId, SectorSheetData> = dataFr;

export function getSectorData(
  locale: AppLocale = DEFAULT_LOCALE,
): Record<SectorId, SectorSheetData> {
  return locale === "en" ? dataEn : dataFr;
}

export function getSectorById(
  id: SectorId,
  locale: AppLocale = DEFAULT_LOCALE,
): SectorSheetData {
  return getSectorData(locale)[id];
}
