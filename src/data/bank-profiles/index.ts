import type { BankCategoryId } from "@/lib/bank-categories";
import { BANK_CATEGORY_IDS } from "@/lib/bank-categories";
import { getMaDeals, type MaDeal } from "@/data/ma-deals";
import { collectDealBankLabels, normalizeBankLabel } from "@/lib/bank-name-resolve";
import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import type { BankProfile } from "./types";
import { BANK_LIST as bankListFr } from "./fr";
import { BANK_LIST as bankListEn } from "./en";

export type { BankProfile } from "./types";

/** French corpus — locale-agnostic id/stats lookups. */
export const BANK_LIST: BankProfile[] = bankListFr;

export function getBankProfiles(locale: AppLocale = DEFAULT_LOCALE): BankProfile[] {
  return locale === "en" ? bankListEn : bankListFr;
}

export const BANK_PROFILES: Record<string, BankProfile> = Object.fromEntries(
  BANK_LIST.map((b) => [b.id, b]),
);

export const BANKS_BY_CATEGORY: Record<BankCategoryId, BankProfile[]> = Object.fromEntries(
  BANK_CATEGORY_IDS.map((id) => [id, BANK_LIST.filter((b) => b.categoryId === id)]),
) as Record<BankCategoryId, BankProfile[]>;

export function getBankById(
  id: string,
  locale: AppLocale = DEFAULT_LOCALE,
): BankProfile | undefined {
  return getBankProfiles(locale).find((b) => b.id === id);
}

export function isValidBankId(id: string): boolean {
  return id in BANK_PROFILES;
}

export function getBanksByCategory(
  id: BankCategoryId,
  locale: AppLocale = DEFAULT_LOCALE,
): BankProfile[] {
  return getBankProfiles(locale).filter((b) => b.categoryId === id);
}

export function dealInvolvesBankProfile(deal: MaDeal, bankId: string): boolean {
  return collectDealBankLabels(deal).some((label) => getBankIdByName(label) === bankId);
}

export function getDealsForBank(name: string, locale: AppLocale = DEFAULT_LOCALE): MaDeal[] {
  const bankId = getBankIdByName(name);
  if (!bankId) return [];
  return getMaDeals(locale).filter((d) => dealInvolvesBankProfile(d, bankId));
}

const BANK_NAME_TO_ID: Record<string, string> = Object.fromEntries(
  BANK_LIST.map((b) => [b.name, b.id]),
);

export function getBankIdByName(name: string): string | undefined {
  const normalized = normalizeBankLabel(name);
  return BANK_NAME_TO_ID[normalized];
}

export function dealMatchesBank(deal: MaDeal, bankFilter: string): boolean {
  const bankId = getBankIdByName(bankFilter);
  if (bankId) return dealInvolvesBankProfile(deal, bankId);
  return deal.banks.includes(bankFilter);
}
