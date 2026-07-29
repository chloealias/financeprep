import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import { questions as questionsEn } from "@/data/questions/en";
import { questions as questionsFr } from "@/data/questions/fr";
import type { Question } from "@/data/questions/types";

export type { Question, QuestionDifficulty } from "@/data/questions/types";

/** French corpus — kept for stats/id lookups that are locale-agnostic. */
export const questions: Question[] = questionsFr as Question[];

/** Localized interview questions (same ids across locales). */
export function getQuestions(locale: AppLocale = DEFAULT_LOCALE): Question[] {
  return (locale === "en" ? questionsEn : questionsFr) as Question[];
}

export function getQuestionById(
  id: number,
  locale: AppLocale = DEFAULT_LOCALE,
): Question | undefined {
  return getQuestions(locale).find((q) => q.id === id);
}
