import type { Exercise } from "@/data/exercise-types";
import { exercisesTheme2 } from "@/data/exercises/en/accretion";
import { exercisesTheme4 } from "@/data/exercises/en/dcf";
import { exercisesTheme5 } from "@/data/exercises/en/football-field";
import { exercisesTheme1 } from "@/data/exercises/en/leverage";
import { exercisesTheme6 } from "@/data/exercises/en/merger";
import { exercisesTheme3 } from "@/data/exercises/en/paper-lbo";
import { EXERCISE_CHEATSHEET, exercisesTheme7 } from "@/data/exercises/en/working-capital";

export { EXERCISE_CHEATSHEET };

export const exercisesEn: Exercise[] = [
  ...exercisesTheme1,
  ...exercisesTheme2,
  ...exercisesTheme3,
  ...exercisesTheme4,
  ...exercisesTheme5,
  ...exercisesTheme6,
  ...exercisesTheme7,
];
