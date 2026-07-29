import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import type { MacroSnapshot } from "./types";
import { MACRO_SNAPSHOT as snapshotFr } from "./fr";
import { MACRO_SNAPSHOT as snapshotEn } from "./en";

export type { MacroIndicator, MacroSnapshot } from "./types";
export { MACRO_SNAPSHOT_REVIEW_INTERVAL_DAYS } from "./types";

/** French corpus — default for backwards-compatible imports. */
export const MACRO_SNAPSHOT: MacroSnapshot = snapshotFr;

export function getMacroSnapshot(locale: AppLocale = DEFAULT_LOCALE): MacroSnapshot {
  return locale === "en" ? snapshotEn : snapshotFr;
}
