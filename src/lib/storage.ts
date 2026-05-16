const RATINGS_KEY = 'finance-ratings-v1';
const LEGACY_RATINGS_KEY = 'finance-ratings';

export type QuestionRatings = Record<string, number>;

export function loadRatings(): QuestionRatings {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(RATINGS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as QuestionRatings;
  } catch {
    return {};
  }
}

export function saveRatings(ratings: QuestionRatings): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearRatings(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(RATINGS_KEY);
  } catch {
    /* ignore */
  }
}

/** Migre les notes depuis l’API Lovable (`window.storage`) si besoin. */
export async function loadRatingsWithLegacyMigration(): Promise<QuestionRatings> {
  const local = loadRatings();
  if (Object.keys(local).length > 0) return local;

  try {
    const storage = (window as Window & { storage?: { get: (k: string) => Promise<{ value?: string }> } })
      .storage;
    if (storage) {
      const r = await storage.get(LEGACY_RATINGS_KEY);
      if (r?.value) {
        const parsed = JSON.parse(r.value) as QuestionRatings;
        saveRatings(parsed);
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }

  return {};
}
