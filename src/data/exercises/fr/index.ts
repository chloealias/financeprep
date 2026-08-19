import type { Exercise } from "@/data/exercise-types";
import { comparableCompaniesExercises } from "@/data/exercises/fr/comparable-companies";
import { precedentTransactionsExercises } from "@/data/exercises/fr/precedent-transactions";
import { dcfExercises } from "@/data/exercises/fr/dcf";
import { leveragedBuyoutsExercises } from "@/data/exercises/fr/leveraged-buyouts";
import { lboAnalysisExercises } from "@/data/exercises/fr/lbo-analysis";

export const exercisesFr: Exercise[] = [
  ...comparableCompaniesExercises,
  ...precedentTransactionsExercises,
  ...dcfExercises,
  ...leveragedBuyoutsExercises,
  ...lboAnalysisExercises,
];
