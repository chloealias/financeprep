import { useEffect, useMemo, useState, type ReactNode } from "react";
import { LocaleContext } from "@/components/i18n/locale-context";
import { PROFILE_UPDATED_EVENT } from "@/lib/profile-events";
import { createTranslator } from "@/lib/i18n/t";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/types";
import { loadProfile } from "@/lib/profile-storage";

function readLocale(): AppLocale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  return loadProfile().locale ?? DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocale(readLocale());
    const onUpdate = () => setLocale(readLocale());
    window.addEventListener(PROFILE_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(PROFILE_UPDATED_EVENT, onUpdate);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useMemo(() => createTranslator(locale), [locale]);

  const value = useMemo(() => ({ locale, t }), [locale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
