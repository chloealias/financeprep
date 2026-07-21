import {
  BookOpen,
  TrendingUp,
  Calculator,
  Briefcase,
  Target,
  Brain,
  type LucideIcon,
} from "lucide-react";
import type { TranslateFn } from "@/lib/i18n/t";
import { createTranslator } from "@/lib/i18n/t";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";

export type CategoryId =
  | "all"
  | "valuation"
  | "accounting"
  | "ma"
  | "ts"
  | "lbo"
  | "dcf"
  | "brainteaser";

export type CategoryOption = {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
};

const CATEGORY_DEFS: { id: CategoryId; labelKey: string; icon: LucideIcon }[] = [
  { id: "all", labelKey: "categories.all", icon: BookOpen },
  { id: "valuation", labelKey: "categories.valuation", icon: TrendingUp },
  { id: "accounting", labelKey: "categories.accounting", icon: Calculator },
  { id: "ma", labelKey: "categories.ma", icon: Briefcase },
  { id: "ts", labelKey: "categories.ts", icon: Target },
  { id: "lbo", labelKey: "categories.lbo", icon: TrendingUp },
  { id: "dcf", labelKey: "categories.dcf", icon: Calculator },
  { id: "brainteaser", labelKey: "categories.brainteaser", icon: Brain },
];

const DIFFICULTY_DEFS = [
  { id: "all" as const, labelKey: "categories.difficulty.all" },
  { id: "basique" as const, labelKey: "categories.difficulty.basic" },
  { id: "intermédiaire" as const, labelKey: "categories.difficulty.intermediate" },
  { id: "avancé" as const, labelKey: "categories.difficulty.advanced" },
];

const RATING_DEFS = [
  { id: "all" as const, labelKey: "categories.rating.all" },
  { id: "unrated" as const, labelKey: "categories.rating.unrated" },
  { id: "weak" as const, labelKey: "categories.rating.weak" },
  { id: "mastered" as const, labelKey: "categories.rating.mastered" },
];

const defaultT = createTranslator(DEFAULT_LOCALE);

export function getQuestionCategories(translate: TranslateFn = defaultT): CategoryOption[] {
  return CATEGORY_DEFS.map((c) => ({
    id: c.id,
    label: translate(c.labelKey),
    icon: c.icon,
  }));
}

export function getDifficultyOptions(translate: TranslateFn = defaultT) {
  return DIFFICULTY_DEFS.map((d) => ({
    id: d.id,
    label: translate(d.labelKey),
  }));
}

export function getRatingFilterOptions(translate: TranslateFn = defaultT) {
  return RATING_DEFS.map((r) => ({
    id: r.id,
    label: translate(r.labelKey),
  }));
}

export function getCategoryLabel(catId: string, translate: TranslateFn = defaultT): string {
  const cat = CATEGORY_DEFS.find((c) => c.id === catId);
  return cat ? translate(cat.labelKey) : catId;
}

/** @deprecated Prefer getQuestionCategories(t) for localized labels. */
export const QUESTION_CATEGORIES: CategoryOption[] = getQuestionCategories(defaultT);

/** @deprecated Prefer getDifficultyOptions(t). */
export const DIFFICULTY_OPTIONS = getDifficultyOptions(defaultT);

/** @deprecated Prefer getRatingFilterOptions(t). */
export const RATING_FILTER_OPTIONS = getRatingFilterOptions(defaultT);
