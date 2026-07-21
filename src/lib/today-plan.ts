import type { ProfileDashboard } from "@/lib/profile-dashboard";
import type { UserProfile } from "@/lib/profile-storage";
import type { TranslateFn } from "@/lib/i18n/t";
import { createTranslator } from "@/lib/i18n/t";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";

export type TodayActionId = "srs" | "quiz" | "simulation" | "weak" | "cv" | "review" | "deal";

export type TodayAction = {
  id: TodayActionId;
  title: string;
  stat: string;
  desc: string;
  href?: string;
  search?: { mode?: "flashcards" | "quiz"; deal?: string };
  onClickKey?: "weak" | "review";
  highlight: boolean;
  disabled?: boolean;
  priority: number;
};

function buildAllActions(
  dashboard: ProfileDashboard,
  profile: UserProfile,
  translate: TranslateFn = createTranslator(DEFAULT_LOCALE),
): TodayAction[] {
  const { todayHighlights } = dashboard;
  const packSize = profile.defaultPackSize ?? 5;

  return [
    {
      id: "srs",
      title: translate("todayPlan.srs.title"),
      stat: translate("todayPlan.srs.stat", { count: dashboard.srsDue }),
      desc: translate("todayPlan.srs.desc"),
      href: "/flashcards",
      search: dashboard.srsDue > 0 ? { mode: "flashcards" } : undefined,
      highlight: dashboard.srsDue > 0 || todayHighlights.has("srs"),
      priority: dashboard.srsDue > 0 ? 100 : 40,
    },
    {
      id: "simulation",
      title: translate("todayPlan.simulation.title"),
      stat: dashboard.suggestSimulation
        ? translate("todayPlan.simulation.stat.recommended")
        : translate("todayPlan.simulation.stat.upToDate"),
      desc: translate("todayPlan.simulation.desc"),
      href: "/interview",
      highlight: dashboard.suggestSimulation || todayHighlights.has("simulation"),
      priority: dashboard.suggestSimulation ? 90 : 30,
    },
    {
      id: "weak",
      title: translate("todayPlan.weak.title"),
      stat: `${dashboard.weakCount}`,
      desc: translate("todayPlan.weak.desc"),
      onClickKey: "weak",
      highlight: todayHighlights.has("weak"),
      disabled: dashboard.weakCount === 0,
      priority: dashboard.weakCount > 0 ? 85 : 20,
    },
    {
      id: "quiz",
      title: translate("todayPlan.quiz.title"),
      stat:
        dashboard.weakCount > 0
          ? translate("todayPlan.quiz.stat.weaknesses", { count: dashboard.weakCount })
          : translate("todayPlan.quiz.stat.pack"),
      desc: translate("todayPlan.quiz.desc", { packSize }),
      href: "/flashcards",
      search: { mode: "quiz" },
      highlight: todayHighlights.has("quiz"),
      priority: 70,
    },
    {
      id: "deal",
      title: translate("todayPlan.deal.title"),
      stat: dashboard.suggestedDealTitle
        ? translate("todayPlan.deal.stat.suggested")
        : translate("todayPlan.deal.stat.default"),
      desc: dashboard.suggestedDealTitle
        ? dashboard.suggestedDealTitle.slice(0, 42) +
          (dashboard.suggestedDealTitle.length > 42 ? "…" : "")
        : translate("todayPlan.deal.desc.default"),
      href: "/actualite",
      search: dashboard.suggestedDealId ? { deal: dashboard.suggestedDealId } : undefined,
      highlight: Boolean(dashboard.suggestedDealId),
      priority: dashboard.suggestedDealId ? 55 : 25,
    },
    {
      id: "cv",
      title: translate("todayPlan.cv.title"),
      stat: translate("todayPlan.cv.stat", {
        checked: dashboard.cvChecked,
        total: dashboard.cvTotal,
      }),
      desc: translate("todayPlan.cv.desc"),
      href: "/cv",
      highlight: todayHighlights.has("cv"),
      priority: todayHighlights.has("cv") ? 60 : 35,
    },
    {
      id: "review",
      title: translate("todayPlan.review.title"),
      stat: `${dashboard.reviewCount}`,
      desc: translate("todayPlan.review.desc"),
      onClickKey: "review",
      highlight: todayHighlights.has("review"),
      disabled: dashboard.reviewCount === 0,
      priority: dashboard.reviewCount > 0 ? 50 : 15,
    },
  ];
}

/** Top N actions for compact widget (hub). */
export function getPrioritizedTodayActions(
  dashboard: ProfileDashboard,
  profile: UserProfile,
  limit = 3,
  translate?: TranslateFn,
): TodayAction[] {
  return buildAllActions(dashboard, profile, translate)
    .filter((a) => !a.disabled)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

/** Full grid for profile page. */
export function getAllTodayActions(
  dashboard: ProfileDashboard,
  profile: UserProfile,
  translate?: TranslateFn,
): TodayAction[] {
  const order: TodayActionId[] = ["srs", "quiz", "deal", "simulation", "weak", "cv", "review"];
  const byId = new Map(buildAllActions(dashboard, profile, translate).map((a) => [a.id, a]));
  return order.map((id) => byId.get(id)!).filter(Boolean);
}
