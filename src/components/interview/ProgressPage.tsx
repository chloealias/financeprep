import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, RotateCcw, Sparkles, Star } from "lucide-react";
import { questions } from "@/data/questions";
import { concepts } from "@/data/concepts";
import { countBuckets, loadSrsStore } from "@/lib/srs";
import { getActivityHeatmap, getStreak } from "@/lib/daily-goal";
import { loadInterviewSessions } from "@/lib/storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { AppTab } from "@/lib/app-tabs";
import {
  isStorageAvailable,
  loadSavedFilters,
  questionIdKey,
  saveSavedFilters,
  type SavedFilters,
} from "@/lib/storage";
import { PageHeader } from "@/components/ui/page-header";
import { useT } from "@/hooks/useT";

type ProgressCategory = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type CategoryProgress = ProgressCategory & {
  total: number;
  rated: number;
  mastered: number;
  avg: number;
};

type ProgressPageProps = {
  questions: { id: string | number; category: string }[];
  ratings: Record<string, number>;
  categories: ProgressCategory[];
  getCategoryLabel: (id: string) => string;
  onReset: () => void;
  onPageChange: (page: AppTab) => void;
  onQuestionsFiltersChange?: () => void;
};

const defaultFilters: SavedFilters = {
  activeCategory: "all",
  activeDifficulty: "all",
  searchQuery: "",
  ratingFilter: "all",
  conceptCategory: "all",
};

export function ProgressPage({
  questions,
  ratings,
  categories,
  getCategoryLabel,
  onReset,
  onPageChange,
  onQuestionsFiltersChange,
}: ProgressPageProps) {
  const { t, locale } = useT();
  const storageOk = typeof window !== "undefined" ? isStorageAvailable() : true;
  const totalQuestions = questions.length;
  const ratedCount = Object.keys(ratings).filter((k) => ratings[k] > 0).length;
  const masteredCount = Object.keys(ratings).filter((k) => ratings[k] >= 4).length;
  const weakCount = (Object.values(ratings) as number[]).filter((v) => v > 0 && v <= 2).length;
  const unratedCount = totalQuestions - ratedCount;
  const avgRating =
    ratedCount > 0
      ? ((Object.values(ratings) as number[]).reduce((a, b) => a + b, 0) / ratedCount).toFixed(1)
      : "—";
  const masteredPct = totalQuestions > 0 ? Math.round((masteredCount / totalQuestions) * 100) : 0;

  const ratingDist = [1, 2, 3, 4, 5].map((r) => ({
    rating: r,
    count: (Object.values(ratings) as number[]).filter((v) => v === r).length,
  }));
  const distMax = Math.max(...ratingDist.map((x) => x.count), 1);

  const byCategory: CategoryProgress[] = categories
    .filter((c) => c.id !== "all")
    .map((cat) => {
      const catQuestions = questions.filter((q) => q.category === cat.id);
      const catRatings = catQuestions.map((q) => ratings[questionIdKey(q.id)] || 0);
      const rated = catRatings.filter((r) => r > 0).length;
      const mastered = catRatings.filter((r) => r >= 4).length;
      const avg = rated > 0 ? catRatings.reduce((a, b) => a + b, 0) / rated : 0;
      return { ...cat, total: catQuestions.length, rated, mastered, avg };
    })
    .sort((a, b) => {
      const pa = a.total > 0 ? a.mastered / a.total : 0;
      const pb = b.total > 0 ? b.mastered / b.total : 0;
      return pb - pa;
    });

  const applyQuestionFilters = (patch: Partial<SavedFilters>) => {
    const current =
      typeof window !== "undefined"
        ? loadSavedFilters(
            (raw) => ({ ...defaultFilters, ...(raw as SavedFilters) }),
            defaultFilters,
          )
        : defaultFilters;
    saveSavedFilters({ ...current, ...patch });
    onQuestionsFiltersChange?.();
    onPageChange("questions");
  };

  const goToFilter = (filter: string) => {
    applyQuestionFilters({ activeCategory: "all", ratingFilter: filter });
  };

  const srsStore = typeof window !== "undefined" ? loadSrsStore() : {};
  const srsCards = [
    ...(questions as { id: string | number }[]).map((q) => ({ id: `q-${questionIdKey(q.id)}` })),
    ...(concepts as { id: string | number }[]).map((c) => ({ id: `c-${questionIdKey(c.id)}` })),
  ];
  const srsBuckets =
    typeof window !== "undefined"
      ? countBuckets(srsCards, srsStore)
      : { due: 0, fresh: 0, later: 0, mastered: 0 };
  const sessions = typeof window !== "undefined" ? loadInterviewSessions() : [];
  const lastSession = sessions[0];
  const recentAvg =
    sessions.length > 0
      ? sessions.slice(0, 5).reduce((s, x) => s + x.avgStars, 0) / Math.min(5, sessions.length)
      : null;
  const heatmap = typeof window !== "undefined" ? getActivityHeatmap(12) : [];
  const streak = typeof window !== "undefined" ? getStreak() : 0;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header + barre globale */}
      <PageHeader
        eyebrow={t("interview.progressPage.eyebrow")}
        title={t("interview.progressPage.title")}
        description={t("interview.progressPage.description")}
        className="mb-8 sm:mb-10"
      />
      {!storageOk && (
        <p className="-mt-6 mb-8 text-sm text-foreground bg-muted border border-border rounded-lg px-3 py-2">
          {t("interview.progressPage.storageBlocked")}
        </p>
      )}

      <div className="mb-8 sm:mb-10 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card">
          <div className="flex items-baseline justify-between gap-3 mb-3">
            <span className="text-muted-foreground text-sm font-light">
              {t("interview.progressPage.masteredLabel")}
            </span>
            <span className="text-foreground font-serif text-lg">
              <span className="text-2xl">{masteredCount}</span>
              <span className="text-muted-foreground">/{totalQuestions}</span>
              <span className="ml-2 text-muted-foreground text-sm">· {masteredPct}%</span>
            </span>
          </div>
          <div
            className="h-2.5 bg-muted rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={masteredPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t("interview.progressPage.masteredPctAria", { pct: masteredPct })}
          >
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${masteredPct}%` }}
            />
          </div>
        </div>

      {/* Bloc Reprendre */}
      <section aria-label={t("interview.progressPage.resumeSectionAria")} className="mb-10">
        <h3 className="type-section-title mb-4">{t("interview.progressPage.resumeTitle")}</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => goToFilter("weak")}
            disabled={weakCount === 0}
            aria-label={t("interview.progressPage.weakAria", { count: weakCount })}
            className="group text-left bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground rounded-2xl p-5 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/80 font-light mb-2">
              {t("interview.progressPage.weakTitle")}
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-serif text-2xl">
                  {weakCount}{" "}
                  <span className="text-base font-light text-primary-foreground/80">
                    {weakCount === 1
                      ? t("interview.progressPage.questionSingular")
                      : t("interview.progressPage.questionPlural")}
                  </span>
                </div>
                <div className="text-sm text-primary-foreground/85 font-light mt-1">
                  {t("interview.progressPage.weakSubtitle")}
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-primary-foreground/80 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => goToFilter("unrated")}
            disabled={unratedCount === 0}
            aria-label={t("interview.progressPage.unratedAria", { count: unratedCount })}
            className="group text-left bg-card hover:bg-muted disabled:opacity-60 disabled:cursor-not-allowed text-foreground rounded-2xl p-5 border border-border transition-colors shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-light mb-2">
              {t("interview.progressPage.unratedTitle")}
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-serif text-2xl">
                  {unratedCount}{" "}
                  <span className="text-base font-light text-muted-foreground">
                    {unratedCount === 1
                      ? t("interview.progressPage.questionSingular")
                      : t("interview.progressPage.questionPlural")}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground font-light mt-1">
                  {t("interview.progressPage.unratedSubtitle")}
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </button>
        </div>
      </section>

      <section
        aria-label={t("interview.progressPage.activeTrainingAria")}
        className="mb-10 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card"
      >
        <h3 className="text-foreground font-serif text-xl mb-4">
          {t("interview.progressPage.activeTrainingTitle")}
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div className="rounded-xl bg-muted border border-border p-4">
            <div className="text-2xl font-serif text-foreground tabular-nums">{srsBuckets.due}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
              {t("interview.progressPage.srsDue")}
            </div>
          </div>
          <div className="rounded-xl bg-primary/10 border border-primary/20 p-4">
            <div className="text-2xl font-serif text-foreground tabular-nums">
              {recentAvg !== null ? recentAvg.toFixed(1) : "—"}
            </div>
            <div className="text-xs uppercase tracking-wider text-primary mt-1">
              {t("interview.progressPage.avgLastSims")}
            </div>
          </div>
          <div className="rounded-xl bg-muted border border-border p-4">
            <div className="text-sm font-medium text-foreground truncate">
              {lastSession
                ? new Date(lastSession.startedAt).toLocaleDateString(locale)
                : t("interview.progressPage.noSession")}
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
              {t("interview.progressPage.lastSim")}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/flashcards"
            search={{ mode: "training" }}
            className="touch-target-bar gap-2 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          >
            <Clock className="w-4 h-4" />
            {t("interview.progressPage.training")}
          </Link>
          <Link
            to="/flashcards"
            search={{ mode: "flashcards" }}
            className="touch-target-bar gap-2 px-4 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted"
          >
            <Sparkles className="w-4 h-4" />
            {t("interview.progressPage.flashcardsSrs")}
          </Link>
        </div>
        {sessions.length > 0 && (
          <ul className="mt-5 space-y-2 border-t border-border pt-4">
            {sessions.slice(0, 3).map((s) => (
              <li key={s.id} className="text-sm text-foreground flex justify-between gap-2">
                <span>
                  {t("interview.progressPage.sessionLine", {
                    mode:
                      s.mode === "full"
                        ? t("interview.progressPage.modeFull")
                        : t("interview.progressPage.modeMini"),
                    packSize: s.packSize,
                  })}
                </span>
                <span className="tabular-nums text-muted-foreground">{s.avgStars.toFixed(1)}★</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        aria-label={t("interview.progressPage.activityAria")}
        className="mb-10 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-serif text-xl">
            {t("interview.progressPage.activityTitle")}
          </h3>
          {streak > 0 && (
            <span className="text-sm text-primary font-medium">
              {streak === 1
                ? t("interview.progressPage.streak", { streak })
                : t("interview.progressPage.streakPlural", { streak })}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {heatmap.map((cell) => {
            const level =
              cell.count === 0 ? 0 : cell.count < 10 ? 1 : cell.count < 20 ? 2 : cell.count < 30 ? 3 : 4;
            const colors = [
              "bg-muted",
              "bg-primary/20",
              "bg-primary/40",
              "bg-primary/60",
              "bg-primary",
            ];
            return (
              <div
                key={cell.date}
                title={t("interview.progressPage.heatmapTitle", { date: cell.date, count: cell.count })}
                className={`w-2.5 h-2.5 rounded-sm ${colors[level]}`}
              />
            );
          })}
        </div>
      </section>

      {/* Vue d'ensemble compacte */}
      <section
        aria-label={t("interview.progressPage.overviewAria")}
        className="mb-10 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card"
      >
        <h3 className="text-foreground font-serif text-xl mb-5">
          {t("interview.progressPage.overviewTitle")}
        </h3>
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-foreground">{ratedCount}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-light mt-1">
              {t("interview.progressPage.rated")}
            </div>
          </div>
          <div className="border-l border-border pl-4 sm:pl-6">
            <div className="text-2xl sm:text-3xl font-serif text-foreground">{masteredCount}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-light mt-1">
              {t("interview.progressPage.mastered")}
            </div>
          </div>
          <div className="border-l border-border pl-4 sm:pl-6">
            <div className="text-2xl sm:text-3xl font-serif text-foreground flex items-baseline gap-1">
              {avgRating}
              {avgRating !== "—" && <Star className="w-4 h-4 fill-primary text-primary" />}
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-light mt-1">
              {t("interview.progressPage.average")}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-light mb-2">
            {t("interview.progressPage.ratingDist")}
          </div>
          {[5, 4, 3, 2, 1].map((r) => {
            const d = ratingDist.find((x) => x.rating === r);
            const pct = ((d?.count ?? 0) / distMax) * 100;
            const intensity = r >= 4 ? "bg-primary" : r === 3 ? "bg-primary/70" : "bg-primary/40";
            return (
              <div key={r} className="flex items-center gap-3">
                <div className="flex items-center gap-0.5 w-20 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${s <= r ? "fill-primary text-primary" : "text-muted"}`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${intensity} transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="w-8 text-right text-muted-foreground font-medium text-xs tabular-nums">
                  {d?.count ?? 0}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Par catégorie */}
      <section
        aria-label={t("interview.progressPage.byCategoryAria")}
        className="mb-10 bg-card rounded-2xl border border-border shadow-card overflow-hidden"
      >
        <h3 className="text-foreground font-serif text-xl px-5 sm:px-6 pt-5 sm:pt-6 mb-3">
          {t("interview.progressPage.byCategoryTitle")}
        </h3>
        <ul className="divide-y divide-border">
          {byCategory.map((c) => {
            const Icon = c.icon;
            const pct = c.total > 0 ? (c.mastered / c.total) * 100 : 0;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() =>
                    applyQuestionFilters({ activeCategory: c.id, ratingFilter: "all" })
                  }
                  aria-label={t("interview.progressPage.categoryAria", {
                    label: c.label,
                    mastered: c.mastered,
                    total: c.total,
                  })}
                  className="w-full text-left px-5 sm:px-6 py-4 hover:bg-muted transition-colors flex items-center gap-4 focus:outline-none focus-visible:bg-muted"
                >
                  <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <span className="font-medium text-foreground truncate">{c.label}</span>
                      <span className="text-sm text-muted-foreground font-light tabular-nums flex-shrink-0">
                        <span className="text-foreground font-medium">{c.mastered}</span>
                        <span className="text-muted-foreground">/{c.total}</span>
                      </span>
                    </div>
                    <div
                      className="h-1.5 bg-muted rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={Math.round(pct)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="touch-target-bar gap-2 text-primary hover:text-primary/80 text-sm font-light underline underline-offset-4"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t("interview.progressPage.reset")}
        </button>
      </div>
    </div>
  );
}
// =====================================================
