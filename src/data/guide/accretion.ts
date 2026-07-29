import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import { guideAccretionEn } from "./accretion.en";
import { guideAccretionFr } from "./accretion.fr";
import type { GuideAccretionContent } from "./accretion.types";

export type {
  GuideAccretionContent,
  GuideAccretionCard,
  GuideAccretionFormula,
  GuideAccretionPeCompare,
  GuideAccretionRule,
} from "./accretion.types";

/** French corpus for locale-agnostic counts. */
export const guideAccretion: GuideAccretionContent = guideAccretionFr;

export function getGuideAccretion(
  locale: AppLocale = DEFAULT_LOCALE,
): GuideAccretionContent {
  return locale === "en" ? guideAccretionEn : guideAccretionFr;
}
