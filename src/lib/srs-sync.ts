import { recordGrade, type SrsGrade } from "@/lib/srs";
import { questionIdKey } from "@/lib/storage";

function starsToGrade(stars: number): SrsGrade | null {
  if (stars <= 2) return "again";
  if (stars === 3) return "good";
  if (stars >= 4) return "easy";
  return null;
}

/** Sync star rating (1–5) to SRS card for a question. */
export function syncRatingToSrs(qid: string | number, stars: number): void {
  const grade = starsToGrade(stars);
  if (!grade) return;
  recordGrade(`q-${questionIdKey(qid)}`, grade);
}

/** Sync concept rating via SRS id prefix c- */
export function syncConceptRatingToSrs(cid: string | number, stars: number): void {
  const grade = starsToGrade(stars);
  if (!grade) return;
  recordGrade(`c-${questionIdKey(cid)}`, grade);
}

export function addQuestionToSrs(qid: string | number, grade: SrsGrade = "again"): void {
  recordGrade(`q-${questionIdKey(qid)}`, grade);
}
