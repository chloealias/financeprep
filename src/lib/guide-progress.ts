import {
  getGuideDiagnostic,
  getDiagnosticTechnicalItemIds,
  type GuideDiagnosticContent,
} from "@/data/guide/diagnostic";
import { getGuideCv } from "@/data/guide/cv";
import { countTechnicalReview } from "@/lib/diagnostic-score";
import { getProfileMenuBadges } from "@/lib/profile-dashboard";
import type { TranslateFn } from "@/lib/i18n/t";
import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import {
  loadCvChecklist,
  loadDiagnosticState,
  type DiagnosticState,
} from "@/lib/storage";

export type DiagnosticBloc = "technical" | "fit" | "networking";

export type GuideProgressKey = "cv" | "pyramid" | "diagnostic" | "networking" | "flashcards";

export type GuideModuleProgress = {
  checked: number;
  total: number;
  label: string;
};

export type GuideModuleSortable = {
  progressKey?: GuideProgressKey | null;
  defaultOrder: number;
};

const BLOC_TIEBREAK_ORDER: DiagnosticBloc[] = ["technical", "fit", "networking"];

function countBoolMap(map: Record<string, boolean>, ids: readonly string[]): number {
  let checked = 0;
  for (const id of ids) {
    if (map[id]) checked += 1;
  }
  return checked;
}

export function getDiagnosticFitItemIds(content: GuideDiagnosticContent): string[] {
  return [
    ...content.fitPresentation.map((item) => item.id),
    ...content.fitStar.map((item) => item.id),
  ];
}

export function getDiagnosticFitStarIds(content: GuideDiagnosticContent): string[] {
  return content.fitStar.map((item) => item.id);
}

export function getDiagnosticNetworkingPrepIds(content: GuideDiagnosticContent): string[] {
  return content.networkingPrep.map((item) => item.id);
}

export function getBlocCompletionRates(
  state: DiagnosticState,
  content: GuideDiagnosticContent = getGuideDiagnostic(DEFAULT_LOCALE),
): Record<DiagnosticBloc, number> {
  const technicalIds = getDiagnosticTechnicalItemIds(content);
  const { masteredCount } = countTechnicalReview(state.technical, technicalIds);
  const fitIds = getDiagnosticFitItemIds(content);
  const networkingIds = getDiagnosticNetworkingPrepIds(content);

  const technicalTotal = technicalIds.length;
  const fitTotal = fitIds.length;
  const networkingTotal = networkingIds.length;

  return {
    technical: technicalTotal > 0 ? masteredCount / technicalTotal : 0,
    fit: fitTotal > 0 ? countBoolMap(state.fit, fitIds) / fitTotal : 0,
    networking:
      networkingTotal > 0 ? countBoolMap(state.networking, networkingIds) / networkingTotal : 0,
  };
}

export function getWeakestDiagnosticBloc(
  rates: Record<DiagnosticBloc, number>,
): DiagnosticBloc {
  let weakest: DiagnosticBloc = "technical";
  let lowestRate = rates.technical;

  for (const bloc of BLOC_TIEBREAK_ORDER.slice(1)) {
    const rate = rates[bloc];
    if (rate < lowestRate) {
      lowestRate = rate;
      weakest = bloc;
    }
  }

  return weakest;
}

export function getCompletionRate(
  progressKey: GuideProgressKey | null | undefined,
  locale: AppLocale = DEFAULT_LOCALE,
): number | null {
  if (!progressKey) return null;

  const diagnosticState = loadDiagnosticState();
  const content = getGuideDiagnostic(locale);

  switch (progressKey) {
    case "cv": {
      const cv = loadCvChecklist();
      const total = getGuideCv(locale).checklist.length;
      if (total === 0) return null;
      return Object.values(cv).filter(Boolean).length / total;
    }
    case "pyramid": {
      const starIds = getDiagnosticFitStarIds(content);
      if (starIds.length === 0) return null;
      return countBoolMap(diagnosticState.fit, starIds) / starIds.length;
    }
    case "diagnostic": {
      const ids = getDiagnosticTechnicalItemIds(content);
      if (ids.length === 0) return null;
      const { masteredCount } = countTechnicalReview(diagnosticState.technical, ids);
      return masteredCount / ids.length;
    }
    case "networking": {
      const ids = getDiagnosticNetworkingPrepIds(content);
      if (ids.length === 0) return null;
      return countBoolMap(diagnosticState.networking, ids) / ids.length;
    }
    case "flashcards": {
      const { srsDue } = getProfileMenuBadges(locale);
      return srsDue > 0 ? 0 : 1;
    }
    default:
      return null;
  }
}

export function getGuideModuleProgress(
  progressKey: GuideProgressKey,
  translate: TranslateFn,
  locale: AppLocale = DEFAULT_LOCALE,
): GuideModuleProgress | null {
  const diagnosticState = loadDiagnosticState();
  const content = getGuideDiagnostic(locale);

  switch (progressKey) {
    case "cv": {
      const cv = loadCvChecklist();
      const total = getGuideCv(locale).checklist.length;
      const checked = Object.values(cv).filter(Boolean).length;
      return {
        checked,
        total,
        label: translate("guide.progress.ratio", { checked, total }),
      };
    }
    case "pyramid": {
      const starIds = getDiagnosticFitStarIds(content);
      const checked = countBoolMap(diagnosticState.fit, starIds);
      return {
        checked,
        total: starIds.length,
        label: translate("guide.progress.mastered", { checked, total: starIds.length }),
      };
    }
    case "diagnostic": {
      const ids = getDiagnosticTechnicalItemIds(content);
      const { masteredCount } = countTechnicalReview(diagnosticState.technical, ids);
      return {
        checked: masteredCount,
        total: ids.length,
        label: translate("guide.progress.mastered", { checked: masteredCount, total: ids.length }),
      };
    }
    case "networking": {
      const ids = getDiagnosticNetworkingPrepIds(content);
      const checked = countBoolMap(diagnosticState.networking, ids);
      return {
        checked,
        total: ids.length,
        label: translate("guide.progress.ratio", { checked, total: ids.length }),
      };
    }
    case "flashcards": {
      const { srsDue } = getProfileMenuBadges(locale);
      if (srsDue <= 0) return null;
      return {
        checked: srsDue,
        total: srsDue,
        label: translate("hub.guide.flashcards.srsBadge", { count: srsDue }),
      };
    }
    default:
      return null;
  }
}

export function sortGuideModulesByUrgency<T extends GuideModuleSortable>(
  modules: T[],
  locale: AppLocale = DEFAULT_LOCALE,
): T[] {
  const sorted = [...modules].sort((a, b) => {
    const rateA = getCompletionRate(a.progressKey, locale) ?? 1;
    const rateB = getCompletionRate(b.progressKey, locale) ?? 1;
    if (rateA !== rateB) return rateA - rateB;
    return a.defaultOrder - b.defaultOrder;
  });

  return sorted;
}
