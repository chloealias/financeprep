import { useContext } from "react";
import { LocaleContext, type LocaleContextValue } from "@/components/i18n/locale-context";
import { createTranslator } from "@/lib/i18n/t";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";

/** Shortcut: returns `{ locale, t }` from LocaleProvider. */
export function useT(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      t: createTranslator(DEFAULT_LOCALE),
    };
  }
  return ctx;
}

/** Alias kept for call sites that import `useLocale`. */
export const useLocale = useT;
