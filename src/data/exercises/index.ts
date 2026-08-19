import type { Exercise, ExerciseTheme } from "@/data/exercise-types";
import type { AppLocale } from "@/lib/i18n/types";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";
import { exercisesFr } from "@/data/exercises/fr";
import { exercisesEn } from "@/data/exercises/en";

export type { Exercise, ExerciseTheme } from "@/data/exercise-types";
export {
  EXERCISE_THEMES,
  EXERCISE_THEME_LABELS,
  getExerciseThemeLabel,
} from "@/data/exercise-types";

/** French corpus — locale-agnostic id/stats lookups. */
export const exercises: Exercise[] = exercisesFr;

export function getExercises(locale: AppLocale = DEFAULT_LOCALE): Exercise[] {
  return locale === "en" ? exercisesEn : exercisesFr;
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
