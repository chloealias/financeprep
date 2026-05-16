const RATINGS_KEY = 'finance-ratings-v1';
const LEGACY_RATINGS_KEY = 'finance-ratings';
const FILTERS_KEY = 'finance-filters-v1';
const REVIEW_KEY = 'finance-review-v1';
const CV_CHECKLIST_KEY = 'finance-cv-checklist-v1';
const GUIDE_OPEN_BLOC_KEY = 'finance-guide-open-bloc-v1';

export type QuestionRatings = Record<string, number>;
export type CvChecklist = Record<string, boolean>;

export type SavedFilters = {
  activeCategory: string;
  activeDifficulty: string;
  searchQuery: string;
  ratingFilter: string;
  conceptCategory: string;
};

export function questionIdKey(id: string | number): string {
  return String(id);
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / navigation privée */
  }
}

export function normalizeRatings(raw: unknown): QuestionRatings {
  if (!raw || typeof raw !== 'object') return {};
  const out: QuestionRatings = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    const n = typeof v === 'number' ? v : Number(v);
    if (Number.isFinite(n) && n >= 1 && n <= 5) {
      out[questionIdKey(k)] = n;
    }
  }
  return out;
}

export function loadRatings(): QuestionRatings {
  return normalizeRatings(readJson<unknown>(RATINGS_KEY, {}));
}

export function saveRatings(ratings: QuestionRatings): void {
  writeJson(RATINGS_KEY, normalizeRatings(ratings));
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
        const parsed = normalizeRatings(JSON.parse(r.value));
        saveRatings(parsed);
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }

  return {};
}

export function loadReviewList(): string[] {
  const list = readJson<unknown>(REVIEW_KEY, []);
  if (!Array.isArray(list)) return [];
  return list.map((x) => questionIdKey(x as string | number));
}

export function saveReviewList(list: string[]): void {
  writeJson(REVIEW_KEY, list.map(questionIdKey));
}

export function loadSavedFilters(
  sanitize: (raw: unknown) => SavedFilters,
  defaults: SavedFilters,
): SavedFilters {
  return sanitize(readJson(FILTERS_KEY, defaults));
}

export function saveSavedFilters(filters: SavedFilters): void {
  writeJson(FILTERS_KEY, filters);
}

export function loadCvChecklist(): CvChecklist {
  const raw = readJson<unknown>(CV_CHECKLIST_KEY, {});
  if (!raw || typeof raw !== 'object') return {};
  const out: CvChecklist = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (v === true) out[k] = true;
  }
  return out;
}

export function saveCvChecklist(checked: CvChecklist): void {
  writeJson(CV_CHECKLIST_KEY, checked);
}

export function loadGuideOpenBloc(): string | null {
  const raw = readJson<unknown>(GUIDE_OPEN_BLOC_KEY, null);
  return typeof raw === 'string' && raw.length > 0 ? raw : null;
}

export function saveGuideOpenBloc(bloc: string | null): void {
  if (bloc) {
    writeJson(GUIDE_OPEN_BLOC_KEY, bloc);
  } else if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(GUIDE_OPEN_BLOC_KEY);
    } catch {
      /* ignore */
    }
  }
}

export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const probe = '__finance_storage_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}
