import type { ProfileDashboard } from "@/lib/profile-dashboard";
import type { UserProfile } from "@/lib/profile-storage";

export type TodayActionId =
  | "srs"
  | "quiz"
  | "simulation"
  | "weak"
  | "cv"
  | "review"
  | "deal";

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
): TodayAction[] {
  const { todayHighlights } = dashboard;
  const packSize = profile.defaultPackSize ?? 5;

  return [
    {
      id: "srs",
      title: "Flashcards SRS",
      stat: `${dashboard.srsDue} due`,
      desc: "Révision SRS",
      href: "/flashcards",
      search: dashboard.srsDue > 0 ? { mode: "flashcards" } : undefined,
      highlight: dashboard.srsDue > 0 || todayHighlights.has("srs"),
      priority: dashboard.srsDue > 0 ? 100 : 40,
    },
    {
      id: "simulation",
      title: "Simulation 30 min",
      stat: dashboard.suggestSimulation ? "Recommandé" : "À jour",
      desc: "Timer 30 min",
      href: "/interview",
      highlight: dashboard.suggestSimulation || todayHighlights.has("simulation"),
      priority: dashboard.suggestSimulation ? 90 : 30,
    },
    {
      id: "weak",
      title: "Questions faibles",
      stat: `${dashboard.weakCount}`,
      desc: "Notes 1–2★",
      onClickKey: "weak",
      highlight: todayHighlights.has("weak"),
      disabled: dashboard.weakCount === 0,
      priority: dashboard.weakCount > 0 ? 85 : 20,
    },
    {
      id: "quiz",
      title: "Mini-entretien",
      stat: dashboard.weakCount > 0 ? `${dashboard.weakCount} faiblesses` : "Pack structuré",
      desc: `${packSize} questions`,
      href: "/flashcards",
      search: { mode: "quiz" },
      highlight: todayHighlights.has("quiz"),
      priority: 70,
    },
    {
      id: "deal",
      title: "Actualité M&A",
      stat: dashboard.suggestedDealTitle ? "Deal suggéré" : "Fiches deals",
      desc: dashboard.suggestedDealTitle
        ? dashboard.suggestedDealTitle.slice(0, 42) +
          (dashboard.suggestedDealTitle.length > 42 ? "…" : "")
        : "Derniers deals et tendances",
      href: "/actualite",
      search: dashboard.suggestedDealId ? { deal: dashboard.suggestedDealId } : undefined,
      highlight: Boolean(dashboard.suggestedDealId),
      priority: dashboard.suggestedDealId ? 55 : 25,
    },
    {
      id: "cv",
      title: "Checklist CV",
      stat: `${dashboard.cvChecked}/${dashboard.cvTotal}`,
      desc: "Walk me through CV",
      href: "/cv",
      highlight: todayHighlights.has("cv"),
      priority: todayHighlights.has("cv") ? 60 : 35,
    },
    {
      id: "review",
      title: "À réviser",
      stat: `${dashboard.reviewCount}`,
      desc: "Signets",
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
): TodayAction[] {
  return buildAllActions(dashboard, profile)
    .filter((a) => !a.disabled)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

/** Full grid for profile page. */
export function getAllTodayActions(
  dashboard: ProfileDashboard,
  profile: UserProfile,
): TodayAction[] {
  const order: TodayActionId[] = [
    "srs",
    "quiz",
    "deal",
    "simulation",
    "weak",
    "cv",
    "review",
  ];
  const byId = new Map(buildAllActions(dashboard, profile).map((a) => [a.id, a]));
  return order.map((id) => byId.get(id)!).filter(Boolean);
}
