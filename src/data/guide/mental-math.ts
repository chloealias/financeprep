import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import { guideMentalMathEn } from "./mental-math.en";
import { guideMentalMathFr } from "./mental-math.fr";
import type { GuideMentalMathContent } from "./mental-math.types";

export type {
  GuideMentalMathContent,
  GuideMentalMathDrill,
  GuideMentalMathPctTip,
} from "./mental-math.types";

/** French corpus for locale-agnostic counts. */
export const guideMentalMath: GuideMentalMathContent = guideMentalMathFr;

export function getGuideMentalMath(
  locale: AppLocale = DEFAULT_LOCALE,
): GuideMentalMathContent {
  return locale === "en" ? guideMentalMathEn : guideMentalMathFr;
}
