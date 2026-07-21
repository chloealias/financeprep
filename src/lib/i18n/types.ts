export type AppLocale = "fr" | "en";

export const APP_LOCALES: readonly AppLocale[] = ["fr", "en"] as const;

export const DEFAULT_LOCALE: AppLocale = "fr";

export function isAppLocale(value: unknown): value is AppLocale {
  return value === "fr" || value === "en";
}

export function normalizeLocale(value: unknown): AppLocale {
  return isAppLocale(value) ? value : DEFAULT_LOCALE;
}
