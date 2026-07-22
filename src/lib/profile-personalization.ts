import { getBankById } from "@/data/bank-profiles";
import { SECTOR_DATA } from "@/data/sector-data";
import { getTargetBankNames } from "@/lib/profile-storage";
import type { SectorId } from "@/lib/sectors";
import type { UserProfile } from "@/lib/profile-storage";

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

export function describePackPersonalization(profile: UserProfile): PackPersonalizationSummary {
  const packSize = profile.defaultPackSize ?? 5;
  const bankNames = getTargetBankNames();
  const sectorNames = (profile.sectorIds ?? []).map(
    (id) => SECTOR_DATA[id as SectorId]?.name ?? id,
  );
  return {
    packSize,
    bankNames,
    sectorNames,
    hasBanks: bankNames.length > 0,
    hasSectors: sectorNames.length > 0,
  };
}

export function formatPackPersonalizationShort(summary: PackPersonalizationSummary): string {
  const bits = [`Pack ${summary.packSize}`];
  if (summary.hasBanks) bits.push(summary.bankNames.slice(0, 2).join(", "));
  if (summary.hasSectors) bits.push(summary.sectorNames.join(", "));
  return bits.join(" · ");
}

export function formatPackPersonalizationText(summary: PackPersonalizationSummary): string {
  const parts: string[] = [
    `pack ${summary.packSize} questions (ouverture CV, technique, actualité M&A, sectoriel${summary.packSize === 7 ? ", + fit" : ""})`,
  ];
  if (summary.hasBanks) {
    parts.push(`deals M&A liés à ${summary.bankNames.join(", ")}`);
  }
  if (summary.hasSectors) {
    parts.push(`sectoriel ${summary.sectorNames.join(", ")}`);
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
): string | null {
  if (daysUntil === null || daysUntil < 0) return null;
  if (daysUntil === 0) {
    return `Jour J : entraînement chronométré si pas fait récemment, ${ctx.srsDue} cartes SRS dues, revoyez vos faiblesses.`;
  }
  if (daysUntil <= 3) {
    return `J-${daysUntil} : priorité entraînement chronométré (30 min), ${ctx.weakCount} question(s) faible(s), ${ctx.srsDue} cartes SRS.`;
  }
  if (daysUntil <= 7) {
    return `J-${daysUntil} : entraînement chronométré + flashcards SRS (${ctx.srsDue} dues)${ctx.suggestSimulation ? " · session 30 min recommandée" : ""}.`;
  }
  if (daysUntil <= 14) {
    return `J-${daysUntil} : checklist CV, puis entraînement chronométré selon votre rythme.`;
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
): AdaptivePlanAction[] {
  const actions: AdaptivePlanAction[] = [];

  if (ctx.srsDue > 0) {
    actions.push({
      label: `Flashcards SRS (${ctx.srsDue} dues)`,
      href: "/flashcards",
      search: { mode: "flashcards" },
      priority: 100,
    });
  }

  if (daysUntil !== null && daysUntil >= 0 && daysUntil <= 3) {
    if (ctx.suggestSimulation) {
      actions.push({
        label: "Entraînement chronométré",
        href: "/flashcards",
        search: { mode: "training" },
        priority: 95,
      });
    }
    if (ctx.weakCount > 0) {
      actions.push({
        label: `Questions faibles (${ctx.weakCount})`,
        href: "/",
        search: { tab: "questions" },
        priority: 90,
      });
    }
    actions.push({ label: "Checklist CV", href: "/cv", priority: 80 });
  } else if (daysUntil !== null && daysUntil <= 7) {
    actions.push({
      label: "Entraînement chronométré",
      href: "/flashcards",
      search: { mode: "training" },
      priority: 85,
    });
    actions.push({ label: "Actualité M&A", href: "/actualite", priority: 70 });
  } else if (daysUntil !== null && daysUntil <= 14) {
    actions.push({ label: "Checklist CV", href: "/cv", priority: 75 });
    actions.push({
      label: "Entraînement chronométré",
      href: "/flashcards",
      search: { mode: "training" },
      priority: 70,
    });
  } else {
    actions.push({
      label: "Flashcards quotidiennes",
      href: "/flashcards",
      search: { mode: "flashcards" },
      priority: 60,
    });
    actions.push({ label: "Notions clés", href: "/", search: { tab: "concepts" }, priority: 55 });
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
