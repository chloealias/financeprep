import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import type { SectorId } from "@/lib/sectors";
import type { SectorMeta } from "./types";
import { SECTOR_META as metaFr } from "./fr";
import { SECTOR_META as metaEn } from "./en";

export type { SectorMeta } from "./types";

/** French corpus — default for backwards-compatible imports. */
export const SECTOR_META: Record<SectorId, SectorMeta> = metaFr;

export const SECTOR_LIST = Object.keys(SECTOR_META) as SectorId[];

export function getSectorMeta(
  locale: AppLocale = DEFAULT_LOCALE,
): Record<SectorId, SectorMeta> {
  return locale === "en" ? metaEn : metaFr;
}

export function getSectorMetaById(
  id: SectorId,
  locale: AppLocale = DEFAULT_LOCALE,
): SectorMeta {
  return getSectorMeta(locale)[id];
}
