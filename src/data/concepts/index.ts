import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import { conceptsEn } from "@/data/concepts/en";
import { conceptsFr } from "@/data/concepts/fr";
import type { Concept } from "@/data/concepts/types";

export type { Concept, ConceptExample } from "@/data/concepts/types";

/** French corpus for locale-agnostic counts. */
export const concepts: Concept[] = conceptsFr;

export function getConcepts(locale: AppLocale = DEFAULT_LOCALE): Concept[] {
  return locale === "en" ? conceptsEn : conceptsFr;
}

export function getConceptById(
  id: string,
  locale: AppLocale = DEFAULT_LOCALE,
): Concept | undefined {
  return getConcepts(locale).find((c) => c.id === id);
}
