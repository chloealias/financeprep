const SOLVED_KEY = "finance-exercises-solved-v1";

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SOLVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

function writeIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SOLVED_KEY, JSON.stringify(ids));
  } catch {
    /* quota / private mode */
  }
}

export function loadSolvedExerciseIds(): Set<string> {
  return new Set(readIds());
}

export function markExerciseSolved(id: string): Set<string> {
  const next = loadSolvedExerciseIds();
  next.add(id);
  writeIds([...next]);
  return next;
}

export function isExerciseSolved(id: string, solved?: Set<string>): boolean {
  const set = solved ?? loadSolvedExerciseIds();
  return set.has(id);
}
