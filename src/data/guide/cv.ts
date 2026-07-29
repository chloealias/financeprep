import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import { guideCvEn } from "./cv.en";
import { guideCvFr } from "./cv.fr";
import type { GuideCvContent } from "./cv.types";

export type { GuideCvContent, GuideCvChecklistItem, GuideCvAct, GuideCvDealStep } from "./cv.types";

/** French corpus for locale-agnostic counts. */
export const guideCv: GuideCvContent = guideCvFr;

export function getGuideCv(locale: AppLocale = DEFAULT_LOCALE): GuideCvContent {
  return locale === "en" ? guideCvEn : guideCvFr;
}
