import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import { guideDiagnosticEn } from "./diagnostic.en";
import { guideDiagnosticFr } from "./diagnostic.fr";
import type { GuideDiagnosticContent } from "./diagnostic.types";

export type {
  DiagnosticTechnicalStatus,
  GuideDiagnosticChecklistItem,
  GuideDiagnosticContent,
  GuideDiagnosticStarItem,
  GuideDiagnosticTechnicalSection,
  GuideDiagnosticTemplate,
} from "./diagnostic.types";

/** French corpus for locale-agnostic counts. */
export const guideDiagnostic: GuideDiagnosticContent = guideDiagnosticFr;

export function getGuideDiagnostic(locale: AppLocale = DEFAULT_LOCALE): GuideDiagnosticContent {
  return locale === "en" ? guideDiagnosticEn : guideDiagnosticFr;
}

/** All technical item ids (stable across locales). */
export function getDiagnosticTechnicalItemIds(
  content: GuideDiagnosticContent = guideDiagnostic,
): string[] {
  return content.technicalSections.flatMap((s) => s.items.map((i) => i.id));
}
