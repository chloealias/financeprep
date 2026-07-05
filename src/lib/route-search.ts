import { DEFAULT_APP_TAB, isAppTab, type AppTab } from "@/lib/app-tabs";
import { isValidBankId } from "@/data/bank-profiles";
import { isValidPeFundId } from "@/data/pe-fund-profiles";
import { isValidDealId } from "@/data/ma-deals";
import { isValidSectorId, type SectorId } from "@/lib/sectors";

export type HomeSearch = {
  tab: AppTab;
  bank?: string;
  pe?: string;
  sector?: SectorId;
};

/** Search par défaut pour les liens vers `/` (tab requis par le routeur). */
export function defaultHomeSearch(overrides?: Partial<HomeSearch>): HomeSearch {
  return { tab: DEFAULT_APP_TAB, ...overrides };
}

export function validateHomeSearch(search: Record<string, unknown>): HomeSearch {
  const tab = typeof search.tab === "string" ? search.tab : undefined;
  const tabResolved: AppTab = isAppTab(tab) ? tab : DEFAULT_APP_TAB;

  const bankRaw = typeof search.bank === "string" ? search.bank : undefined;
  const bank = bankRaw && isValidBankId(bankRaw) ? bankRaw : undefined;

  const peRaw = typeof search.pe === "string" ? search.pe : undefined;
  const pe = peRaw && isValidPeFundId(peRaw) ? peRaw : undefined;

  const sectorRaw = typeof search.sector === "string" ? search.sector : undefined;
  const sector = sectorRaw && isValidSectorId(sectorRaw) ? sectorRaw : undefined;

  let resolved: AppTab = tabResolved;
  if (sector && tabResolved !== "secteurs") resolved = "secteurs";
  else if ((bank || pe) && tabResolved !== "banques") resolved = "banques";

  return { tab: resolved, bank: pe ? undefined : bank, pe, sector };
}

export type ActualiteSearch = {
  deal?: string;
  bank?: string;
  sector?: SectorId;
};

export function validateActualiteSearch(search: Record<string, unknown>): ActualiteSearch {
  const dealRaw = typeof search.deal === "string" ? search.deal : undefined;
  const deal = dealRaw && isValidDealId(dealRaw) ? dealRaw : undefined;

  const bankRaw = typeof search.bank === "string" ? search.bank : undefined;
  const bank = bankRaw && isValidBankId(bankRaw) ? bankRaw : undefined;

  const sectorRaw = typeof search.sector === "string" ? search.sector : undefined;
  const sector = sectorRaw && isValidSectorId(sectorRaw) ? sectorRaw : undefined;

  return { deal, bank, sector };
}

export type FlashcardsSearch = {
  mode?: "flashcards" | "quiz";
};

export function validateFlashcardsSearch(search: Record<string, unknown>): FlashcardsSearch {
  const mode = typeof search.mode === "string" ? search.mode : undefined;
  if (mode === "flashcards" || mode === "quiz") return { mode };
  return {};
}
