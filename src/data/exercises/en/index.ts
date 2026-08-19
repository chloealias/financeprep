import type { Exercise } from "@/data/exercise-types";
import { comparableCompaniesExercises } from "@/data/exercises/en/comparable-companies";
import { precedentTransactionsExercises } from "@/data/exercises/en/precedent-transactions";
import { dcfExercises } from "@/data/exercises/en/dcf";
import { leveragedBuyoutsExercises } from "@/data/exercises/en/leveraged-buyouts";
import { lboAnalysisExercises } from "@/data/exercises/en/lbo-analysis";

export const exercisesEn: Exercise[] = [
  ...comparableCompaniesExercises,
  ...precedentTransactionsExercises,
  ...dcfExercises,
  ...leveragedBuyoutsExercises,
  ...lboAnalysisExercises,
];
