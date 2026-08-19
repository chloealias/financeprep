import { DEFAULT_APP_TAB, isAppTab, type AppTab } from "@/lib/app-tabs";
import { isValidBankId } from "@/data/bank-profiles";
import { isValidDealId } from "@/data/ma-deals";
import { isValidSectorId, type SectorId } from "@/lib/sectors";

export const PRACTICE_VIEWS = ["hub", "questions", "exercices"] as const;
export type PracticeView = (typeof PRACTICE_VIEWS)[number];

export function isPracticeView(value: unknown): value is PracticeView {
  return typeof value === "string" && (PRACTICE_VIEWS as readonly string[]).includes(value);
}

export type HomeSearch = {
  tab: AppTab;
  bank?: string;
  sector?: SectorId;
  /** Sous-vue de l'onglet Pratique (`questions`). Absent = hub. */
  view?: PracticeView;
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

  const sectorRaw = typeof search.sector === "string" ? search.sector : undefined;
  const sector = sectorRaw && isValidSectorId(sectorRaw) ? sectorRaw : undefined;

  let resolved: AppTab = tabResolved;
  if (sector && tabResolved !== "secteurs") resolved = "secteurs";
  else if (bank && tabResolved !== "banques") resolved = "banques";

  const viewRaw = typeof search.view === "string" ? search.view : undefined;
  const view =
    resolved === "questions" && isPracticeView(viewRaw) && viewRaw !== "hub"
      ? viewRaw
      : undefined;

  const result: HomeSearch = { tab: resolved };
  if (bank) result.bank = bank;
  if (sector) result.sector = sector;
  if (view) result.view = view;
  return result;
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
  /** `quiz` kept for backwards-compatible deep links → training. */
  mode?: "flashcards" | "training" | "quiz";
};

export function validateFlashcardsSearch(search: Record<string, unknown>): FlashcardsSearch {
  const mode = typeof search.mode === "string" ? search.mode : undefined;
  if (mode === "flashcards" || mode === "training" || mode === "quiz") return { mode };
  return {};
}
