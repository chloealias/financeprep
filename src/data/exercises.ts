import type { Exercise, ExerciseTheme } from "@/data/exercise-types";
import { exercisesTheme2 } from "@/data/exercises-accretion";
import { exercisesTheme4 } from "@/data/exercises-dcf";
import { exercisesTheme5 } from "@/data/exercises-football-field";
import { exercisesTheme1 } from "@/data/exercises-leverage";
import { exercisesTheme6 } from "@/data/exercises-merger";
import { exercisesTheme3 } from "@/data/exercises-paper-lbo";
import {
  EXERCISE_CHEATSHEET,
  exercisesTheme7,
} from "@/data/exercises-working-capital";

export type { Exercise, ExerciseTheme } from "@/data/exercise-types";
export {
  EXERCISE_THEMES,
  EXERCISE_THEME_LABELS,
} from "@/data/exercise-types";
export { EXERCISE_CHEATSHEET };

export const exercises: Exercise[] = [
  ...exercisesTheme1,
  ...exercisesTheme2,
  ...exercisesTheme3,
  ...exercisesTheme4,
  ...exercisesTheme5,
  ...exercisesTheme6,
  ...exercisesTheme7,
];

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((e) => e.id === id);
}

export function getExercisesByTheme(theme: ExerciseTheme | "all"): Exercise[] {
  if (theme === "all") return exercises;
  return exercises.filter((e) => e.theme === theme);
}
