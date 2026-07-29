import type { Exercise } from "@/data/exercise-types";
import { exercisesTheme2 } from "@/data/exercises/fr/accretion";
import { exercisesTheme4 } from "@/data/exercises/fr/dcf";
import { exercisesTheme5 } from "@/data/exercises/fr/football-field";
import { exercisesTheme1 } from "@/data/exercises/fr/leverage";
import { exercisesTheme6 } from "@/data/exercises/fr/merger";
import { exercisesTheme3 } from "@/data/exercises/fr/paper-lbo";
import {
  EXERCISE_CHEATSHEET,
  exercisesTheme7,
} from "@/data/exercises/fr/working-capital";

export { EXERCISE_CHEATSHEET };

export const exercisesFr: Exercise[] = [
  ...exercisesTheme1,
  ...exercisesTheme2,
  ...exercisesTheme3,
  ...exercisesTheme4,
  ...exercisesTheme5,
  ...exercisesTheme6,
  ...exercisesTheme7,
];
