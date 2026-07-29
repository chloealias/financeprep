import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import { guidePyramidEn } from "./pyramid.en";
import { guidePyramidFr } from "./pyramid.fr";
import type { GuidePyramidContent } from "./pyramid.types";

export type {
  GuidePyramidContent,
  GuidePyramidStarCard,
  GuidePyramidMatrixRow,
  GuidePyramidSvgLabels,
  GuidePyramidWithExample,
} from "./pyramid.types";

/** French corpus for locale-agnostic counts. */
export const guidePyramid: GuidePyramidContent = guidePyramidFr;

export function getGuidePyramid(locale: AppLocale = DEFAULT_LOCALE): GuidePyramidContent {
  return locale === "en" ? guidePyramidEn : guidePyramidFr;
}
