import { questions } from "@/data/questions";
import { concepts } from "@/data/concepts";
import { countBuckets, loadSrsStore } from "@/lib/srs";
import {
  getInterviewPlanMessage,
  getTodayHighlightKeys,
  type TodayHighlightKey,
} from "@/lib/profile-personalization";
import { pickDealForPack } from "@/lib/interview-pack";
import {
  CV_CHECKLIST_TOTAL,
  daysUntilInterview,
  getTargetBankNames,
  loadProfile,
  type UserProfile,
} from "@/lib/profile-storage";
import { getTargetBankIds } from "@/lib/target-banks-storage";
import {
  loadCvChecklist,
  loadInterviewSessions,
  loadRatings,
  loadReviewList,
  questionIdKey,
} from "@/lib/storage";

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export type ProfileDashboard = {
  profile: UserProfile;
  daysUntil: number | null;
  srsDue: number;
  weakCount: number;
  unratedCount: number;
  reviewCount: number;
  masteredCount: number;
  totalQuestions: number;
  masteredPct: number;
  cvChecked: number;
  cvTotal: number;
  recentSimAvg: number | null;
  lastSessionLabel: string | null;
  suggestSimulation: boolean;
  interviewPlan: string | null;
  todayHighlights: Set<TodayHighlightKey>;
  targetBankCount: number;
  /** Deal M&A suggéré selon banques cibles (pour deep link profil). */
  suggestedDealId: string | null;
  suggestedDealTitle: string | null;
};

export function getProfileDashboard(): ProfileDashboard {
  const profile = loadProfile();
  const ratings = loadRatings();
  const totalQuestions = (questions as { id: string | number }[]).length;
  const ratedKeys = Object.keys(ratings).filter((k) => ratings[k]! > 0);
  const masteredCount = ratedKeys.filter((k) => ratings[k]! >= 4).length;
  const weakCount = Object.values(ratings).filter((v) => v > 0 && v <= 2).length;
  const unratedCount = totalQuestions - ratedKeys.length;
  const masteredPct = totalQuestions > 0 ? Math.round((masteredCount / totalQuestions) * 100) : 0;

  const srsStore = loadSrsStore();
  const srsCards = [
    ...(questions as { id: string | number }[]).map((q) => ({ id: `q-${questionIdKey(q.id)}` })),
    ...(concepts as { id: string | number }[]).map((c) => ({ id: `c-${questionIdKey(c.id)}` })),
  ];
  const { due: srsDue } = countBuckets(srsCards, srsStore);

  const cv = loadCvChecklist();
  const cvChecked = Object.values(cv).filter(Boolean).length;

  const sessions = loadInterviewSessions();
  const recent = sessions.slice(0, 5);
  const recentSimAvg =
    recent.length > 0 ? recent.reduce((s, x) => s + x.avgStars, 0) / recent.length : null;

  const last = sessions[0];
  const lastSessionLabel = last
    ? `${last.mode === "full" ? "Simulation" : "Mini-entretien"} · ${new Date(last.startedAt).toLocaleDateString("fr-FR")} · ${last.avgStars.toFixed(1)}★`
    : null;

  const suggestSimulation =
    sessions.length === 0 || Date.now() - (last?.startedAt ?? 0) > THREE_DAYS_MS;

  const daysUntil = daysUntilInterview(profile.interviewDate);

  const suggestedDeal = pickDealForPack(getTargetBankNames());

  return {
    profile,
    daysUntil,
    srsDue,
    weakCount,
    unratedCount,
    reviewCount: loadReviewList().length,
    masteredCount,
    totalQuestions,
    masteredPct,
    cvChecked,
    cvTotal: CV_CHECKLIST_TOTAL,
    recentSimAvg,
    lastSessionLabel,
    suggestSimulation,
    interviewPlan: getInterviewPlanMessage(daysUntil, { srsDue, weakCount, suggestSimulation }),
    todayHighlights: getTodayHighlightKeys(profile),
    targetBankCount: getTargetBankIds().length,
    suggestedDealId: suggestedDeal?.id ?? null,
    suggestedDealTitle: suggestedDeal?.title ?? null,
  };
}

/** Badges pour le menu avatar. */
export function getProfileMenuBadges(): {
  srsDue: number;
  countdown: string | null;
  targetBankCount: number;
} {
  const profile = loadProfile();
  const dashboard = getProfileDashboard();
  return {
    srsDue: dashboard.srsDue,
    targetBankCount: dashboard.targetBankCount,
    countdown:
      daysUntilInterview(profile.interviewDate) !== null
        ? (() => {
            const d = daysUntilInterview(profile.interviewDate)!;
            if (d < 0) return null;
            if (d === 0) return "J";
            if (d <= 14) return String(d);
            return null;
          })()
        : null,
  };
}
