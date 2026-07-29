import { createTranslator, type TranslateFn } from "@/lib/i18n/t";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/types";
import { loadProfile } from "@/lib/profile-storage";

/**
 * Locale for code running outside React, i.e. route `head()` builders.
 * Requests are rendered server-side without a persisted profile, so documents
 * ship in the default locale and pick up the user's locale on the client, once
 * the router re-evaluates `head()` for the next matched route.
 */
export function documentLocale(): AppLocale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  return loadProfile().locale ?? DEFAULT_LOCALE;
}

export function documentTranslator(): TranslateFn {
  return createTranslator(documentLocale());
}

/** `title` + `description` meta pair for a route head, resolved for the current locale. */
export function routeMeta(titleKey: string, descriptionKey: string) {
  const translate = documentTranslator();
  return [
    { title: translate(titleKey) },
    { name: "description", content: translate(descriptionKey) },
  ];
}
