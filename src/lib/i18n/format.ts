import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";

const INTL_LOCALES: Record<AppLocale, string> = {
  fr: "fr-FR",
  en: "en-GB",
};

/** BCP 47 tag to pass to `Intl` / `toLocale*String` for an app locale. */
export function intlLocale(locale: AppLocale = DEFAULT_LOCALE): string {
  return INTL_LOCALES[locale] ?? INTL_LOCALES[DEFAULT_LOCALE];
}

/**
 * Locale-aware date formatting that never throws on invalid input:
 * unparseable values are returned untouched so callers can render raw data.
 */
export function formatDate(
  value: string | number | Date,
  locale: AppLocale = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(intlLocale(locale), options);
}

export function formatDateTime(
  value: string | number | Date,
  locale: AppLocale = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString(intlLocale(locale), options);
}
