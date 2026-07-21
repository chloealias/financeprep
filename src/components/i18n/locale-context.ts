import { createContext } from "react";
import type { TranslateFn } from "@/lib/i18n/t";
import type { AppLocale } from "@/lib/i18n/types";

export type LocaleContextValue = {
  locale: AppLocale;
  t: TranslateFn;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);
