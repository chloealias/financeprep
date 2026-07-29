import type { TranslateFn } from "@/lib/i18n/t";
import { createTranslator } from "@/lib/i18n/t";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";

export const BANK_CATEGORY_IDS = ["elite-boutique", "bulge-bracket", "universal-bank"] as const;

export type BankCategoryId = (typeof BANK_CATEGORY_IDS)[number];

export type BankCategoryFilter = "all" | BankCategoryId;

export type BankCategoryMeta = { label: string; description: string };

const defaultT = createTranslator(DEFAULT_LOCALE);

function categoryKey(id: BankCategoryId, field: "label" | "description" | "filter"): string {
  return `banks.category.${id}.${field}`;
}

export function getBankCategoryMeta(
  id: BankCategoryId,
  translate: TranslateFn = defaultT,
): BankCategoryMeta {
  return {
    label: translate(categoryKey(id, "label")),
    description: translate(categoryKey(id, "description")),
  };
}

/** Chip filters for the bank hub, in display order. */
export function getBankCategoryFilters(
  translate: TranslateFn = defaultT,
): { id: BankCategoryFilter; label: string }[] {
  return [
    { id: "all", label: translate("banks.category.filter.all") },
    ...BANK_CATEGORY_IDS.map((id) => ({ id, label: translate(categoryKey(id, "filter")) })),
  ];
}

export function isBankCategoryId(value: string): value is BankCategoryId {
  return (BANK_CATEGORY_IDS as readonly string[]).includes(value);
}
