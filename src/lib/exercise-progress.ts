import type { Exercise } from "@/data/exercise-types";

export type ChapterProgress = {
  total: number;
  solved: number;
  percent: number | null;
};

export function getChapterProgress(
  chapterExercises: Exercise[],
  solvedIds: Set<string>,
): ChapterProgress {
  const total = chapterExercises.length;
  const solved = chapterExercises.filter((exercise) => solvedIds.has(exercise.id)).length;
  return {
    total,
    solved,
    percent: total === 0 ? null : Math.round((solved / total) * 100),
  };
}
