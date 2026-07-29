import type { Exercise, ExerciseTheme } from "@/data/exercise-types";
import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import {
  EXERCISE_CHEATSHEET as cheatsheetFr,
  exercisesFr,
} from "@/data/exercises/fr";
import {
  EXERCISE_CHEATSHEET as cheatsheetEn,
  exercisesEn,
} from "@/data/exercises/en";

export type { Exercise, ExerciseTheme } from "@/data/exercise-types";
export {
  EXERCISE_THEMES,
  EXERCISE_THEME_LABELS,
  getExerciseThemeLabel,
} from "@/data/exercise-types";

/** French corpus — locale-agnostic id/stats lookups. */
export const exercises: Exercise[] = exercisesFr;

/** @deprecated Prefer getExerciseCheatsheet(locale). */
export const EXERCISE_CHEATSHEET = cheatsheetFr;

export function getExercises(locale: AppLocale = DEFAULT_LOCALE): Exercise[] {
  return locale === "en" ? exercisesEn : exercisesFr;
}

export function getExerciseCheatsheet(locale: AppLocale = DEFAULT_LOCALE): string[] {
  return locale === "en" ? cheatsheetEn : cheatsheetFr;
}

export function getExerciseById(
  id: string,
  locale: AppLocale = DEFAULT_LOCALE,
): Exercise | undefined {
  return getExercises(locale).find((e) => e.id === id);
}

export function getExercisesByTheme(
  theme: ExerciseTheme | "all",
  locale: AppLocale = DEFAULT_LOCALE,
): Exercise[] {
  const list = getExercises(locale);
  if (theme === "all") return list;
  return list.filter((e) => e.theme === theme);
}
