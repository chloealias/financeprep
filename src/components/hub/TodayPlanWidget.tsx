import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Bookmark,
  Calendar,
  ChevronRight,
  Clock,
  Flame,
  Mic,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getProfileDashboard } from "@/lib/profile-dashboard";
import { loadProfile } from "@/lib/profile-storage";
import { getPrioritizedTodayActions, type TodayAction, type TodayActionId } from "@/lib/today-plan";
import { getStreak } from "@/lib/daily-goal";
import { saveSavedFilters } from "@/lib/storage";
import { useT } from "@/hooks/useT";

const defaultFilters = {
  activeCategory: "all",
  activeDifficulty: "all",
  searchQuery: "",
  ratingFilter: "all",
  conceptCategory: "all",
};

const ICONS: Record<TodayActionId, React.ReactNode> = {
  srs: <Sparkles className="w-5 h-5" />,
  quiz: <Clock className="w-5 h-5" />,
  simulation: <Mic className="w-5 h-5" />,
  weak: <BarChart3 className="w-5 h-5" />,
  cv: <Calendar className="w-5 h-5" />,
  review: <Bookmark className="w-5 h-5" />,
  deal: <Newspaper className="w-5 h-5" />,
};

type TodayPlanWidgetProps = {
  compact?: boolean;
  maxCards?: number;
  showStreak?: boolean;
  className?: string;
};

export function TodayPlanWidget({
  compact = false,
  maxCards = 3,
  showStreak = true,
  className = "",
}: TodayPlanWidgetProps) {
  const { t } = useT();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { actions, interviewPlan, streak, masteredPct } = useMemo(() => {
    if (!mounted) {
      return { actions: [] as TodayAction[], interviewPlan: null, streak: 0, masteredPct: 0 };
    }
    const dashboard = getProfileDashboard();
    const profile = loadProfile();
    return {
      actions: getPrioritizedTodayActions(dashboard, profile, maxCards, t),
      interviewPlan: dashboard.interviewPlan,
      streak: getStreak(),
      masteredPct: dashboard.masteredPct,
    };
  }, [mounted, maxCards, t]);

  const handleAction = (action: TodayAction) => {
    if (action.onClickKey === "weak") {
      saveSavedFilters({ ...defaultFilters, ratingFilter: "weak" });
      navigate({ to: "/", search: { tab: "questions" } });
      return;
    }
    if (action.onClickKey === "review") {
      saveSavedFilters({ ...defaultFilters, ratingFilter: "all" });
      navigate({ to: "/", search: { tab: "questions" } });
    }
  };

  if (!mounted) {
    return (
      <div className={`rounded-2xl border border-border bg-card p-5 animate-pulse ${className}`}>
        <div className="h-6 w-40 bg-muted rounded mb-4" />
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="h-24 bg-muted/60 rounded-xl" />
          <div className="h-24 bg-muted/60 rounded-xl" />
          <div className="h-24 bg-muted/60 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <section className={className}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="type-section-title">{t("hub.today.title")}</h2>
          {interviewPlan && (
            <p className="text-sm text-muted-foreground font-light mt-1 max-w-xl">{interviewPlan}</p>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          {showStreak && streak > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
              <Flame className="w-4 h-4" aria-hidden="true" />
              {t("hub.today.streakDays", { count: streak, s: streak === 1 ? "" : "s" })}
            </span>
          )}
          {!compact && (
            <span className="text-muted-foreground tabular-nums">
              {t("hub.today.masteredPct", { pct: masteredPct })}
            </span>
          )}
          <Link
            to="/profil"
            className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 text-sm"
          >
            {t("hub.today.profileLink")}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div
        className={`grid gap-3 ${compact ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}
      >
        {actions.map((action) => (
          <TodayActionCard
            key={action.id}
            action={action}
            icon={ICONS[action.id]}
            onAction={handleAction}
          />
        ))}
      </div>
    </section>
  );
}

export function TodayActionCard({
  action,
  icon,
  onAction,
}: {
  action: TodayAction;
  icon: React.ReactNode;
  onAction: (action: TodayAction) => void;
}) {
  const className = `text-left rounded-2xl p-5 border-2 transition-all w-full ${
    action.disabled
      ? "opacity-50 cursor-not-allowed border-border bg-card"
      : action.highlight
        ? "border-primary/40 bg-primary/10 hover:border-primary/60 shadow-card"
        : "border-border bg-card hover:border-primary/40 shadow-card"
  }`;

  const inner = (
    <>
      <div className="flex items-center gap-2 text-primary mb-2">{icon}</div>
      <div className="font-serif text-lg text-foreground">{action.title}</div>
      <div className="text-sm font-semibold text-primary mt-1">{action.stat}</div>
      <p className="text-xs text-muted-foreground font-light mt-1">{action.desc}</p>
    </>
  );

  if (action.href && !action.disabled) {
    return (
      <Link to={action.href} search={action.search} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => onAction(action)}
      disabled={action.disabled}
    >
      {inner}
    </button>
  );
}
