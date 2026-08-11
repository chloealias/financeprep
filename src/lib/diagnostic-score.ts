export type DiagnosticTier = "none" | "ready" | "priority" | "coaching";

export type DiagnosticTechnicalMap = Record<string, "mastered" | "review">;

/**
 * Compte les items techniques évalués et ceux marqués « à revoir ».
 * Les ids absents de la map sont non évalués et n'entrent pas dans le score.
 */
export function countTechnicalReview(
  technical: DiagnosticTechnicalMap,
  itemIds: readonly string[],
): { reviewCount: number; evaluatedCount: number; masteredCount: number } {
  let reviewCount = 0;
  let evaluatedCount = 0;
  let masteredCount = 0;
  for (const id of itemIds) {
    const status = technical[id];
    if (status === "review") {
      reviewCount += 1;
      evaluatedCount += 1;
    } else if (status === "mastered") {
      masteredCount += 1;
      evaluatedCount += 1;
    }
  }
  return { reviewCount, evaluatedCount, masteredCount };
}

/**
 * Seuils du cahier : 0–4 prêt, 5–15 prioritaire, 15+ coaching.
 * Aucune évaluation → none.
 */
export function diagnosticTier(reviewCount: number, evaluatedCount: number): DiagnosticTier {
  if (evaluatedCount === 0) return "none";
  if (reviewCount >= 15) return "coaching";
  if (reviewCount >= 5) return "priority";
  return "ready";
}
