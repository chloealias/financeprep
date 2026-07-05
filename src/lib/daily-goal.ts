export type DailyActivityType = "srs" | "quiz" | "sim" | "lecture" | "cv" | "guide";

export type DailyLogEntry = {
  date: string;
  minutes: number;
  types: DailyActivityType[];
};

const DAILY_LOG_KEY = "fp_daily_log";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function readLog(): DailyLogEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DAILY_LOG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as DailyLogEntry[]) : [];
  } catch {
    return [];
  }
}

function writeLog(entries: DailyLogEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DAILY_LOG_KEY, JSON.stringify(entries.slice(-120)));
  } catch {
    /* quota */
  }
}

/** Record activity for today (merges types, adds minutes). */
export function logDailyActivity(type: DailyActivityType, minutes = 10): void {
  const wasMet = isDailyGoalMet();
  const date = todayKey();
  const entries = readLog();
  const idx = entries.findIndex((e) => e.date === date);
  if (idx >= 0) {
    const existing = entries[idx]!;
    const types = existing.types.includes(type) ? existing.types : [...existing.types, type];
    entries[idx] = { date, minutes: existing.minutes + minutes, types };
  } else {
    entries.push({ date, minutes, types: [type] });
  }
  writeLog(entries);

  if (!wasMet && isDailyGoalMet() && typeof window !== "undefined") {
    void import("sonner").then(({ toast }) => {
      toast.success("Objectif du jour atteint !");
    });
  }
}

export function getDailyLog(): DailyLogEntry[] {
  return readLog();
}

export function getTodayLog(): DailyLogEntry | null {
  const date = todayKey();
  return readLog().find((e) => e.date === date) ?? null;
}

export function isDailyGoalMet(): boolean {
  const today = getTodayLog();
  if (!today) return false;
  return today.types.some((t) => t === "srs" || t === "quiz" || t === "sim");
}

/** Consecutive days with at least one meaningful session. */
export function getStreak(): number {
  const entries = readLog();
  if (entries.length === 0) return 0;

  const activeDates = new Set(
    entries
      .filter((e) => e.types.some((t) => t === "srs" || t === "quiz" || t === "sim"))
      .map((e) => e.date),
  );

  let streak = 0;
  const d = new Date();
  for (;;) {
    const key = d.toISOString().slice(0, 10);
    if (activeDates.has(key)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else if (streak === 0) {
      d.setDate(d.getDate() - 1);
      const yesterday = d.toISOString().slice(0, 10);
      if (activeDates.has(yesterday)) {
        streak++;
        d.setDate(d.getDate() - 1);
        continue;
      }
      break;
    } else {
      break;
    }
  }
  return streak;
}

/** Activity counts per day for heatmap (last N weeks). */
export function getActivityHeatmap(weeks = 12): { date: string; count: number }[] {
  const entries = readLog();
  const byDate = new Map(entries.map((e) => [e.date, e.minutes]));

  const result: { date: string; count: number }[] = [];
  const days = weeks * 7;
  const d = new Date();
  d.setDate(d.getDate() - days + 1);

  for (let i = 0; i < days; i++) {
    const key = d.toISOString().slice(0, 10);
    result.push({ date: key, count: byDate.get(key) ?? 0 });
    d.setDate(d.getDate() + 1);
  }
  return result;
}

export function isStreakAtRisk(): boolean {
  if (getStreak() === 0) return false;
  const today = getTodayLog();
  if (today?.types.some((t) => t === "srs" || t === "quiz" || t === "sim")) return false;
  const hour = new Date().getHours();
  return hour >= 18;
}
