import { getBankById } from "@/data/bank-profiles";
import { getSectorData } from "@/data/sector-data";
import { getTargetBankNames } from "@/lib/profile-storage";
import type { SectorId } from "@/lib/sectors";
import type { UserProfile } from "@/lib/profile-storage";
import type { TranslateFn } from "@/lib/i18n/t";
import { createTranslator } from "@/lib/i18n/t";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/types";

const defaultT = createTranslator(DEFAULT_LOCALE);

/** Banques fréquentes pour sélection rapide sur le profil. */
export const POPULAR_TARGET_BANK_IDS = [
  "lazard",
  "rothschild-co",
  "goldman-sachs",
  "morgan-stanley",
  "jpmorgan",
  "bnp-paribas",
  "societe-generale",
  "evercore",
  "ubs",
  "credit-suisse",
  "barclays",
  "bank-of-america",
] as const;

export type PackPersonalizationSummary = {
  packSize: 5 | 7;
  bankNames: string[];
  sectorNames: string[];
  hasBanks: boolean;
  hasSectors: boolean;
};

export function describePackPersonalization(
  profile: UserProfile,
  locale: AppLocale = DEFAULT_LOCALE,
): PackPersonalizationSummary {
  const packSize = profile.defaultPackSize ?? 5;
  const bankNames = getTargetBankNames();
  const sectorNames = (profile.sectorIds ?? []).map(
    (id) => getSectorData(locale)[id as SectorId]?.name ?? id,
  );
  return {
    packSize,
    bankNames,
    sectorNames,
    hasBanks: bankNames.length > 0,
    hasSectors: sectorNames.length > 0,
  };
}

export function formatPackPersonalizationShort(
  summary: PackPersonalizationSummary,
  translate: TranslateFn = defaultT,
): string {
  const bits = [translate("todayPlan.training.stat.pack", { packSize: summary.packSize })];
  if (summary.hasBanks) bits.push(summary.bankNames.slice(0, 2).join(", "));
  if (summary.hasSectors) bits.push(summary.sectorNames.join(", "));
  return bits.join(" · ");
}

export function formatPackPersonalizationText(
  summary: PackPersonalizationSummary,
  translate: TranslateFn = defaultT,
): string {
  const parts: string[] = [
    translate("personalization.packText", {
      count: summary.packSize,
      fitSuffix: summary.packSize === 7 ? translate("personalization.packText.fitSuffix") : "",
    }),
  ];
  if (summary.hasBanks) {
    parts.push(translate("personalization.dealsForBanks", { banks: summary.bankNames.join(", ") }));
  }
  if (summary.hasSectors) {
    parts.push(
      translate("personalization.sectorPart", { sectors: summary.sectorNames.join(", ") }),
    );
  }
  return parts.join(" · ");
}

export type TodayHighlightKey =
  | "srs"
  | "training"
  | "quiz"
  | "simulation"
  | "cv"
  | "weak"
  | "review";

export function getTodayHighlightKeys(profile: UserProfile): Set<TodayHighlightKey> {
  const keys = new Set<TodayHighlightKey>();
  if (profile.experienceLevel === "reconversion") {
    keys.add("cv");
    keys.add("srs");
  } else if (profile.experienceLevel === "junior" || profile.experienceLevel === "stagiaire") {
    keys.add("training");
    keys.add("weak");
  }
  if (profile.processType === "full-time") {
    keys.add("training");
  }
  if (profile.processType === "stage") {
    keys.add("srs");
    keys.add("training");
  }
  return keys;
}

export function getInterviewPlanMessage(
  daysUntil: number | null,
  ctx: { srsDue: number; weakCount: number; suggestSimulation: boolean },
  translate: TranslateFn = defaultT,
): string | null {
  if (daysUntil === null || daysUntil < 0) return null;
  if (daysUntil === 0) {
    return translate("personalization.plan.today", { srsDue: ctx.srsDue });
  }
  if (daysUntil <= 3) {
    return translate("personalization.plan.d3", {
      days: daysUntil,
      weakCount: ctx.weakCount,
      srsDue: ctx.srsDue,
    });
  }
  if (daysUntil <= 7) {
    return translate("personalization.plan.d7", {
      days: daysUntil,
      srsDue: ctx.srsDue,
      simulationSuffix: ctx.suggestSimulation
        ? translate("personalization.plan.d7.simulationSuffix")
        : "",
    });
  }
  if (daysUntil <= 14) {
    return translate("personalization.plan.d14", { days: daysUntil });
  }
  return null;
}

export type AdaptivePlanAction = {
  label: string;
  href: string;
  search?: { mode?: "flashcards" | "training" | "quiz"; tab?: string };
  priority: number;
  doneToday?: boolean;
};

/** Ordered actions based on days until interview. */
export function getAdaptivePlanActions(
  daysUntil: number | null,
  ctx: { srsDue: number; weakCount: number; suggestSimulation: boolean },
  translate: TranslateFn = defaultT,
): AdaptivePlanAction[] {
  const actions: AdaptivePlanAction[] = [];
  const trainingAction = (priority: number): AdaptivePlanAction => ({
    label: translate("personalization.action.training"),
    href: "/flashcards",
    search: { mode: "training" },
    priority,
  });
  const cvAction = (priority: number): AdaptivePlanAction => ({
    label: translate("personalization.action.cv"),
    href: "/cv",
    priority,
  });

  if (ctx.srsDue > 0) {
    actions.push({
      label: translate("personalization.action.srs", { count: ctx.srsDue }),
      href: "/flashcards",
      search: { mode: "flashcards" },
      priority: 100,
    });
  }

  if (daysUntil !== null && daysUntil >= 0 && daysUntil <= 3) {
    if (ctx.suggestSimulation) {
      actions.push(trainingAction(95));
    }
    if (ctx.weakCount > 0) {
      actions.push({
        label: translate("personalization.action.weak", { count: ctx.weakCount }),
        href: "/",
        search: { tab: "questions" },
        priority: 90,
      });
    }
    actions.push(cvAction(80));
  } else if (daysUntil !== null && daysUntil <= 7) {
    actions.push(trainingAction(85));
    actions.push({
      label: translate("personalization.action.actualite"),
      href: "/actualite",
      priority: 70,
    });
  } else if (daysUntil !== null && daysUntil <= 14) {
    actions.push(cvAction(75));
    actions.push(trainingAction(70));
  } else {
    actions.push({
      label: translate("personalization.action.dailyFlashcards"),
      href: "/flashcards",
      search: { mode: "flashcards" },
      priority: 60,
    });
    actions.push({
      label: translate("personalization.action.concepts"),
      href: "/",
      search: { tab: "concepts" },
      priority: 55,
    });
  }

  return actions.sort((a, b) => b.priority - a.priority);
}

/** Suggestion pack par défaut selon le type de process. */
export function suggestedDefaultPackSize(processType: UserProfile["processType"]): 5 | 7 | null {
  if (processType === "full-time") return 7;
  if (processType === "stage" || processType === "off-cycle") return 5;
  return null;
}

export function validateTargetBankIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  return ids
    .filter((id): id is string => typeof id === "string" && !!getBankById(id))
    .map((id) => id);
}
