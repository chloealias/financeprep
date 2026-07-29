import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import type { QuestionEnrichment } from "./types";
import { QUESTION_ENRICHMENTS as enrichmentsFr } from "./fr";
import { QUESTION_ENRICHMENTS as enrichmentsEn } from "./en";

export type { QuestionEnrichment } from "./types";

/** French corpus — default for backwards-compatible imports. */
export const QUESTION_ENRICHMENTS: Record<number, QuestionEnrichment> = enrichmentsFr;

export function getQuestionEnrichments(
  locale: AppLocale = DEFAULT_LOCALE,
): Record<number, QuestionEnrichment> {
  return locale === "en" ? enrichmentsEn : enrichmentsFr;
}

export function getQuestionEnrichment(
  id: string | number,
  locale: AppLocale = DEFAULT_LOCALE,
): QuestionEnrichment | undefined {
  const n = typeof id === "number" ? id : Number(id);
  return Number.isFinite(n) ? getQuestionEnrichments(locale)[n] : undefined;
}
