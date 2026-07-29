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
import { createTranslator, type TranslateFn } from "@/lib/i18n/t";
import { formatDate } from "@/lib/i18n/format";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/types";

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

export function getProfileDashboard(locale: AppLocale = DEFAULT_LOCALE): ProfileDashboard {
  const translate = createTranslator(locale);
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
    ? translate("profileDashboard.lastSession", {
        mode: translate(
          last.mode === "full" ? "profileDashboard.mode.full" : "profileDashboard.mode.mini",
        ),
        date: formatDate(last.startedAt, locale),
        stars: last.avgStars.toFixed(1),
      })
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
    interviewPlan: getInterviewPlanMessage(
      daysUntil,
      { srsDue, weakCount, suggestSimulation },
      translate,
    ),
    todayHighlights: getTodayHighlightKeys(profile),
    targetBankCount: getTargetBankIds().length,
    suggestedDealId: suggestedDeal?.id ?? null,
    suggestedDealTitle: suggestedDeal?.title ?? null,
  };
}

/** Compact countdown shown on the avatar badge — null when it is not worth showing. */
function countdownBadge(daysUntil: number | null, translate: TranslateFn): string | null {
  if (daysUntil === null || daysUntil < 0) return null;
  if (daysUntil === 0) return translate("profileDashboard.countdownBadge.today");
  return daysUntil <= 14 ? String(daysUntil) : null;
}

/** Badges pour le menu avatar. */
export function getProfileMenuBadges(locale: AppLocale = DEFAULT_LOCALE): {
  srsDue: number;
  countdown: string | null;
  targetBankCount: number;
} {
  const profile = loadProfile();
  const dashboard = getProfileDashboard(locale);
  return {
    srsDue: dashboard.srsDue,
    targetBankCount: dashboard.targetBankCount,
    countdown: countdownBadge(daysUntilInterview(profile.interviewDate), createTranslator(locale)),
  };
}
