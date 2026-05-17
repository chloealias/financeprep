import { DEFAULT_APP_TAB, isAppTab, type AppTab } from "@/lib/app-tabs";
import { isValidBankId } from "@/data/bank-profiles";
import { isValidDealId } from "@/data/ma-deals";
import { isValidSectorId, type SectorId } from "@/lib/sectors";

export type HomeSearch = {
  tab: AppTab;
  bank?: string;
  sector?: SectorId;
};

export function validateHomeSearch(search: Record<string, unknown>): HomeSearch {
  const tab = typeof search.tab === "string" ? search.tab : undefined;
  const resolved: AppTab = isAppTab(tab) ? tab : DEFAULT_APP_TAB;

  const bankRaw = typeof search.bank === "string" ? search.bank : undefined;
  const bank = bankRaw && isValidBankId(bankRaw) ? bankRaw : undefined;

  const sectorRaw = typeof search.sector === "string" ? search.sector : undefined;
  const sector = sectorRaw && isValidSectorId(sectorRaw) ? sectorRaw : undefined;

  return { tab: resolved, bank, sector };
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
