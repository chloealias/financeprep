import { getBankById } from "@/data/bank-profiles";
import {
  normalizeAvatarId,
  normalizeAvatarKind,
  normalizeBannerId,
  normalizePatternSeed,
  randomPatternSeed,
} from "@/lib/profile-cosmetics";
import { notifyProfileUpdated } from "@/lib/profile-events";
import { validateTargetBankIds } from "@/lib/profile-personalization";
import { isValidSectorId, SECTOR_IDS, type SectorId } from "@/lib/sectors";
import { loadSrsStore, resetSrs, type SrsStore } from "@/lib/srs";
import {
  clearRatings,
  loadCvChecklist,
  loadInterviewSessions,
  loadRatings,
  loadReviewList,
  loadSavedFilters,
  saveCvChecklist,
  saveRatings,
  saveReviewList,
  saveSavedFilters,
  type CvChecklist,
  type InterviewSessionRecord,
  type QuestionRatings,
  type SavedFilters,
} from "@/lib/storage";
import { getTargetBankIds } from "@/lib/target-banks-storage";

const PROFILE_KEY = "finance-profile-v1";
const TARGET_BANKS_KEY = "financeprep-target-banks";
const SRS_KEY = "finance-srs-v1";
const RATINGS_KEY = "finance-ratings-v1";
const REVIEW_KEY = "finance-review-v1";
const CV_CHECKLIST_KEY = "finance-cv-checklist-v1";
const FILTERS_KEY = "finance-filters-v1";
const INTERVIEW_SESSIONS_KEY = "finance-interview-sessions-v1";

export type ExperienceLevel = "stagiaire" | "junior" | "reconversion" | "";
export type ProcessType = "stage" | "off-cycle" | "full-time" | "";

export type UserProfile = {
  firstName?: string;
  targetRole?: string;
  /** ISO date YYYY-MM-DD */
  interviewDate?: string;
  experienceLevel?: ExperienceLevel;
  processType?: ProcessType;
  sectorIds?: SectorId[];
  defaultPackSize?: 5 | 7;
  avatarKind?: "icon" | "pattern";
  avatarId?: string;
  avatarPatternSeed?: number;
  bannerId?: string;
};

export const DEFAULT_PROFILE: UserProfile = {
  firstName: "",
  targetRole: "",
  interviewDate: "",
  experienceLevel: "",
  processType: "",
  sectorIds: [],
  defaultPackSize: 5,
  avatarKind: "icon",
  avatarId: "landmark",
  avatarPatternSeed: 42,
  bannerId: "midnight",
};

export const CV_CHECKLIST_TOTAL = 6;

export const EXPERIENCE_LEVEL_OPTIONS: { id: ExperienceLevel; label: string }[] = [
  { id: "", label: "Non précisé" },
  { id: "stagiaire", label: "Stagiaire" },
  { id: "junior", label: "Junior / analyst" },
  { id: "reconversion", label: "Reconversion" },
];

export const PROCESS_TYPE_OPTIONS: { id: ProcessType; label: string }[] = [
  { id: "", label: "Non précisé" },
  { id: "stage", label: "Stage été" },
  { id: "off-cycle", label: "Off-cycle" },
  { id: "full-time", label: "Full-time" },
];

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota */
  }
}

function normalizeSectorIds(raw: unknown): SectorId[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((id): id is SectorId => typeof id === "string" && isValidSectorId(id))
    .slice(0, 3);
}

export function normalizeProfile(raw: unknown): UserProfile {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_PROFILE };
  const o = raw as Record<string, unknown>;
  const pack = o.defaultPackSize;
  return {
    firstName: typeof o.firstName === "string" ? o.firstName.trim() : "",
    targetRole: typeof o.targetRole === "string" ? o.targetRole.trim() : "",
    interviewDate: typeof o.interviewDate === "string" ? o.interviewDate : "",
    experienceLevel: EXPERIENCE_LEVEL_OPTIONS.some((x) => x.id === o.experienceLevel)
      ? (o.experienceLevel as ExperienceLevel)
      : "",
    processType: PROCESS_TYPE_OPTIONS.some((x) => x.id === o.processType)
      ? (o.processType as ProcessType)
      : "",
    sectorIds: normalizeSectorIds(o.sectorIds),
    defaultPackSize: pack === 7 ? 7 : 5,
    avatarKind: normalizeAvatarKind(o.avatarKind),
    avatarId: normalizeAvatarId(o.avatarId),
    avatarPatternSeed: normalizePatternSeed(o.avatarPatternSeed ?? randomPatternSeed()),
    bannerId: normalizeBannerId(o.bannerId),
  };
}

export function loadProfile(): UserProfile {
  return normalizeProfile(readJson(PROFILE_KEY, DEFAULT_PROFILE));
}

export function saveProfile(profile: UserProfile): void {
  writeJson(PROFILE_KEY, normalizeProfile(profile));
  notifyProfileUpdated();
}

export function toggleProfileSector(current: SectorId[], sectorId: SectorId): SectorId[] {
  if (current.includes(sectorId)) return current.filter((id) => id !== sectorId);
  if (current.length >= 3) return current;
  return [...current, sectorId];
}

/** Jours restants avant la date d'entretien (0 = aujourd'hui, négatif = passé). */
export function daysUntilInterview(isoDate: string | undefined, now = new Date()): number | null {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return null;
  const target = new Date(`${isoDate}T12:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (24 * 60 * 60 * 1000));
}

export function formatInterviewCountdown(days: number | null): string | null {
  if (days === null) return null;
  if (days < 0) return `J+${Math.abs(days)}`;
  if (days === 0) return "Jour J";
  return `J-${days}`;
}

export type FinancePrepBackup = {
  version: 1;
  exportedAt: string;
  profile: UserProfile;
  ratings: QuestionRatings;
  srs: SrsStore;
  reviewList: string[];
  cvChecklist: CvChecklist;
  targetBankIds: string[];
  interviewSessions: InterviewSessionRecord[];
  filters: SavedFilters | null;
};

const defaultFilters: SavedFilters = {
  activeCategory: "all",
  activeDifficulty: "all",
  searchQuery: "",
  ratingFilter: "all",
  conceptCategory: "all",
};

export function buildBackup(): FinancePrepBackup {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    profile: loadProfile(),
    ratings: loadRatings(),
    srs: loadSrsStore(),
    reviewList: loadReviewList(),
    cvChecklist: loadCvChecklist(),
    targetBankIds: getTargetBankIds(),
    interviewSessions: loadInterviewSessions(),
    filters: readJson(FILTERS_KEY, null),
  };
}

export function downloadBackup(): void {
  const backup = buildBackup();
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `financeprep-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export type ImportResult = { ok: true } | { ok: false; error: string };

export type BackupPreview = {
  exportedAt: string;
  profileLabel: string;
  ratingsCount: number;
  sessionsCount: number;
  targetBanksCount: number;
  srsCardsCount: number;
};

export function parseBackupPreview(
  json: string,
): { ok: true; preview: BackupPreview } | { ok: false; error: string } {
  try {
    const raw = JSON.parse(json) as FinancePrepBackup;
    if (raw.version !== 1) return { ok: false, error: "Version de sauvegarde non supportée." };
    const profile = normalizeProfile(raw.profile);
    const label = profile.firstName?.trim() || profile.targetRole?.trim() || "Profil sans nom";
    return {
      ok: true,
      preview: {
        exportedAt: raw.exportedAt ?? "—",
        profileLabel: label,
        ratingsCount: raw.ratings
          ? Object.values(raw.ratings).filter((v) => typeof v === "number" && v > 0).length
          : 0,
        sessionsCount: Array.isArray(raw.interviewSessions) ? raw.interviewSessions.length : 0,
        targetBanksCount: validateTargetBankIds(raw.targetBankIds).length,
        srsCardsCount: raw.srs && typeof raw.srs === "object" ? Object.keys(raw.srs).length : 0,
      },
    };
  } catch {
    return { ok: false, error: "Fichier JSON invalide." };
  }
}

export function importBackup(json: string): ImportResult {
  try {
    const raw = JSON.parse(json) as FinancePrepBackup;
    if (raw.version !== 1) return { ok: false, error: "Version de sauvegarde non supportée." };

    saveProfile(normalizeProfile(raw.profile));
    if (raw.ratings) saveRatings(raw.ratings);
    if (raw.srs) writeJson(SRS_KEY, raw.srs);
    if (Array.isArray(raw.reviewList)) saveReviewList(raw.reviewList);
    if (raw.cvChecklist) saveCvChecklist(raw.cvChecklist);
    if (Array.isArray(raw.targetBankIds)) {
      writeJson(TARGET_BANKS_KEY, validateTargetBankIds(raw.targetBankIds));
    }
    if (Array.isArray(raw.interviewSessions)) {
      writeJson(INTERVIEW_SESSIONS_KEY, raw.interviewSessions);
    }
    if (raw.filters) saveSavedFilters({ ...defaultFilters, ...raw.filters });

    return { ok: true };
  } catch {
    return { ok: false, error: "Fichier JSON invalide." };
  }
}

export type ResetScope = "ratings" | "srs" | "sessions" | "profile" | "all";

export function resetData(scope: ResetScope): void {
  if (scope === "ratings" || scope === "all") clearRatings();
  if (scope === "srs" || scope === "all") resetSrs();
  if (scope === "sessions" || scope === "all") {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(INTERVIEW_SESSIONS_KEY);
      } catch {
        /* ignore */
      }
    }
  }
  if (scope === "profile" || scope === "all") {
    saveProfile(DEFAULT_PROFILE);
    if (scope === "all") {
      saveReviewList([]);
      saveCvChecklist({});
      writeJson(TARGET_BANKS_KEY, []);
    }
  }
}

/** Noms des banques cibles pour filtrage deals. */
export function getTargetBankNames(): string[] {
  return getTargetBankIds()
    .map((id) => getBankById(id)?.name)
    .filter((n): n is string => !!n);
}

export { SECTOR_IDS };
