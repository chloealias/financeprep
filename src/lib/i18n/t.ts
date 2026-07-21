import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import { en } from "@/lib/i18n/messages/en";
import { fr } from "@/lib/i18n/messages/fr";

export type MessageKey = keyof typeof fr;

const catalogs: Record<AppLocale, Record<MessageKey, string>> = { fr, en };

export type TParams = Record<string, string | number | boolean | null | undefined>;

/**
 * Resolve a message key for the given locale.
 * Missing EN keys fall back to FR; unknown keys return the key string.
 */
export function t(locale: AppLocale, key: MessageKey | string, params?: TParams): string {
  const catalog = catalogs[locale] ?? catalogs[DEFAULT_LOCALE];
  const fallback = catalogs[DEFAULT_LOCALE];
  const template =
    (catalog as Record<string, string>)[key] ?? (fallback as Record<string, string>)[key] ?? key;

  if (!params) return template;

  return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) => {
    const value = params[name];
    if (value === null || value === undefined) return "";
    return String(value);
  });
}

export type TranslateFn = (key: MessageKey | string, params?: TParams) => string;

export function createTranslator(locale: AppLocale): TranslateFn {
  return (key, params) => t(locale, key, params);
}

/** Simple plural helper for templates using {{s}} / {{plural}}. */
export function pluralSuffix(count: number, locale: AppLocale = DEFAULT_LOCALE): string {
  if (locale === "en") return count === 1 ? "" : "s";
  return count > 1 ? "s" : "";
}
