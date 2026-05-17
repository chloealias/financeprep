/**
 * Spaced Repetition System — SM-2 simplifié.
 *
 * Trois niveaux de rappel : 'again' (raté), 'good' (correct), 'easy' (maîtrisé).
 * Calcule l'intervalle (en jours) et la prochaine date de révision.
 * Persiste l'état dans localStorage par carte.
 */

const SRS_KEY = "finance-srs-v1";

export type SrsGrade = "again" | "good" | "easy";

export type SrsCardState = {
  /** Facteur d'aisance (1.3 = difficile, 2.5 = standard, +) */
  ease: number;
  /** Intervalle actuel en jours */
  interval: number;
  /** Nombre de répétitions consécutives réussies */
  reps: number;
  /** Timestamp ms de la prochaine échéance */
  due: number;
  /** Timestamp ms de la dernière révision */
  lastReviewed: number;
};

export type SrsStore = Record<string, SrsCardState>;

const DAY_MS = 24 * 60 * 60 * 1000;

export function createInitialState(): SrsCardState {
  return { ease: 2.5, interval: 0, reps: 0, due: Date.now(), lastReviewed: 0 };
}

/** Applique une note SM-2 simplifiée et retourne le nouvel état. */
export function grade(
  state: SrsCardState | undefined,
  grade: SrsGrade,
  now = Date.now(),
): SrsCardState {
  const s: SrsCardState = state ? { ...state } : createInitialState();

  if (grade === "again") {
    s.reps = 0;
    s.interval = 0;
    s.ease = Math.max(1.3, s.ease - 0.2);
    // Revoir dans 10 minutes
    s.due = now + 10 * 60 * 1000;
  } else {
    s.reps += 1;
    if (s.reps === 1) s.interval = 1;
    else if (s.reps === 2) s.interval = grade === "easy" ? 4 : 3;
    else s.interval = Math.round(s.interval * s.ease * (grade === "easy" ? 1.3 : 1));

    if (grade === "easy") s.ease = Math.min(3.0, s.ease + 0.15);
    // 'good' ne bouge pas l'ease

    s.due = now + s.interval * DAY_MS;
  }
  s.lastReviewed = now;
  return s;
}

// ----- Persistance ----------------------------------------------------------

function readStore(): SrsStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(SRS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as SrsStore) : {};
  } catch {
    return {};
  }
}

function writeStore(store: SrsStore): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SRS_KEY, JSON.stringify(store));
  } catch {
    /* quota / navigation privée */
  }
}

export function loadSrsStore(): SrsStore {
  return readStore();
}

export function recordGrade(cardId: string, g: SrsGrade): SrsCardState {
  const store = readStore();
  const next = grade(store[cardId], g);
  store[cardId] = next;
  writeStore(store);
  return next;
}

export function resetSrs(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SRS_KEY);
  } catch {
    /* ignore */
  }
}

// ----- Sélection des cartes -------------------------------------------------

export type SrsBucket = "due" | "new" | "later";

export function bucketOf(state: SrsCardState | undefined, now = Date.now()): SrsBucket {
  if (!state || state.reps === 0) return "new";
  if (state.due <= now) return "due";
  return "later";
}

/**
 * Mélange à plat un tableau (Fisher-Yates).
 */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Compose une file de révision : d'abord les cartes en retard, puis quelques
 * nouvelles cartes, le tout mélangé.
 */
export function buildQueue<T extends { id: string }>(
  cards: readonly T[],
  store: SrsStore,
  options: { maxNew?: number; maxTotal?: number; now?: number } = {},
): T[] {
  const { maxNew = 10, maxTotal = 20, now = Date.now() } = options;

  const due: T[] = [];
  const fresh: T[] = [];
  for (const c of cards) {
    const b = bucketOf(store[c.id], now);
    if (b === "due") due.push(c);
    else if (b === "new") fresh.push(c);
  }

  const queue = [...shuffle(due), ...shuffle(fresh).slice(0, maxNew)];
  return queue.slice(0, maxTotal);
}

export function countBuckets<T extends { id: string }>(
  cards: readonly T[],
  store: SrsStore,
  now = Date.now(),
): { due: number; fresh: number; later: number; mastered: number } {
  let due = 0,
    fresh = 0,
    later = 0,
    mastered = 0;
  for (const c of cards) {
    const s = store[c.id];
    if (!s || s.reps === 0) fresh++;
    else if (s.due <= now) due++;
    else if (s.interval >= 21) mastered++;
    else later++;
  }
  return { due, fresh, later, mastered };
}
