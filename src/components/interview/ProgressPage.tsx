import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Mic, RotateCcw, Sparkles, Star } from "lucide-react";
import { questions } from "@/data/questions";
import { concepts } from "@/data/concepts";
import { countBuckets, loadSrsStore } from "@/lib/srs";
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
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header + barre globale */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-medium text-blue-950 tracking-tight">
          Progression
        </h2>
        <p className="mt-2 text-sm text-blue-600 font-light">
          Vos étoiles, filtres et liste à réviser sont enregistrés sur cet appareil (navigateur).
          Elles ne se synchronisent pas entre téléphone et ordinateur.
        </p>
        {!storageOk && (
          <p className="mt-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            Le stockage local est bloqué (navigation privée ou réglages du navigateur). Vos notes ne
            pourront pas être conservées après fermeture de l’onglet.
          </p>
        )}

        <div className="mt-6 bg-white rounded-2xl border border-blue-100 p-5 sm:p-6 shadow-card">
          <div className="flex items-baseline justify-between gap-3 mb-3">
            <span className="text-blue-700 text-sm font-light">Questions maîtrisées (≥ 4★)</span>
            <span className="text-blue-950 font-serif text-lg">
              <span className="text-2xl">{masteredCount}</span>
              <span className="text-blue-400">/{totalQuestions}</span>
              <span className="ml-2 text-blue-700 text-sm">· {masteredPct}%</span>
            </span>
          </div>
          <div
            className="h-2.5 bg-blue-50 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={masteredPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${masteredPct} pour cent maîtrisé`}
          >
            <div
              className="h-full bg-blue-800 transition-all"
              style={{ width: `${masteredPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bloc Reprendre */}
      <section aria-label="Reprendre votre travail" className="mb-10">
        <h3 className="text-blue-950 font-serif text-xl mb-4">Reprendre où vous en êtes</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => goToFilter("weak")}
            disabled={weakCount === 0}
            aria-label={`Reprendre les ${weakCount} questions à retravailler`}
            className="group text-left bg-blue-900 hover:bg-blue-950 disabled:bg-blue-200 disabled:cursor-not-allowed text-white rounded-2xl p-5 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-blue-200 font-light mb-2">
              À retravailler
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-serif text-2xl">
                  {weakCount}{" "}
                  <span className="text-base font-light text-blue-200">
                    question{weakCount > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="text-sm text-blue-100 font-light mt-1">Notées 1 ou 2 étoiles</div>
              </div>
              <ChevronRight className="w-6 h-6 text-blue-200 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => goToFilter("unrated")}
            disabled={unratedCount === 0}
            aria-label={`Découvrir les ${unratedCount} questions non notées`}
            className="group text-left bg-white hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed text-blue-950 rounded-2xl p-5 border border-blue-200 transition-colors shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-blue-600 font-light mb-2">
              À découvrir
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-serif text-2xl">
                  {unratedCount}{" "}
                  <span className="text-base font-light text-blue-500">
                    question{unratedCount > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="text-sm text-blue-600 font-light mt-1">Pas encore notées</div>
              </div>
              <ChevronRight className="w-6 h-6 text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </button>
        </div>
      </section>

      <section
        aria-label="Entraînement actif"
        className="mb-10 bg-white rounded-2xl border border-blue-100 p-5 sm:p-6 shadow-card"
      >
        <h3 className="text-blue-950 font-serif text-xl mb-4">Entraînement actif</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4">
            <div className="text-2xl font-serif text-indigo-950 tabular-nums">{srsBuckets.due}</div>
            <div className="text-xs uppercase tracking-wider text-indigo-700 mt-1">
              Cartes SRS dues
            </div>
          </div>
          <div className="rounded-xl bg-violet-50 border border-violet-100 p-4">
            <div className="text-2xl font-serif text-violet-950 tabular-nums">
              {recentAvg !== null ? recentAvg.toFixed(1) : "—"}
            </div>
            <div className="text-xs uppercase tracking-wider text-violet-700 mt-1">
              Moy. 5 dernières simulations
            </div>
          </div>
          <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
            <div className="text-sm font-medium text-blue-950 truncate">
              {lastSession
                ? new Date(lastSession.startedAt).toLocaleDateString("fr-FR")
                : "Aucune session"}
            </div>
            <div className="text-xs uppercase tracking-wider text-blue-700 mt-1">
              Dernière simulation
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/flashcards"
            className="touch-target-bar gap-2 px-4 rounded-xl bg-blue-900 text-white text-sm font-medium hover:bg-blue-950"
          >
            <Clock className="w-4 h-4" />
            Mini-entretien
          </Link>
          <Link
            to="/interview"
            className="touch-target-bar gap-2 px-4 rounded-xl bg-violet-800 text-white text-sm font-medium hover:bg-violet-900"
          >
            <Mic className="w-4 h-4" />
            Simulation 30 min
          </Link>
          <Link
            to="/flashcards"
            className="touch-target-bar gap-2 px-4 rounded-xl border border-blue-200 text-blue-900 text-sm font-medium hover:bg-blue-50"
          >
            <Sparkles className="w-4 h-4" />
            Flashcards SRS
          </Link>
        </div>
        {sessions.length > 0 && (
          <ul className="mt-5 space-y-2 border-t border-blue-100 pt-4">
            {sessions.slice(0, 3).map((s) => (
              <li key={s.id} className="text-sm text-blue-800 flex justify-between gap-2">
                <span>
                  {s.mode === "full" ? "Simulation" : "Mini-entretien"} · {s.packSize} questions
                </span>
                <span className="tabular-nums text-blue-600">{s.avgStars.toFixed(1)}★</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Vue d'ensemble compacte */}
      <section
        aria-label="Vue d'ensemble"
        className="mb-10 bg-white rounded-2xl border border-blue-100 p-5 sm:p-6 shadow-card"
      >
        <h3 className="text-blue-950 font-serif text-xl mb-5">Vue d'ensemble</h3>
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-blue-950">{ratedCount}</div>
            <div className="text-xs uppercase tracking-wider text-blue-600 font-light mt-1">
              Notées
            </div>
          </div>
          <div className="border-l border-blue-100 pl-4 sm:pl-6">
            <div className="text-2xl sm:text-3xl font-serif text-blue-950">{masteredCount}</div>
            <div className="text-xs uppercase tracking-wider text-blue-600 font-light mt-1">
              Maîtrisées
            </div>
          </div>
          <div className="border-l border-blue-100 pl-4 sm:pl-6">
            <div className="text-2xl sm:text-3xl font-serif text-blue-950 flex items-baseline gap-1">
              {avgRating}
              {avgRating !== "—" && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
            </div>
            <div className="text-xs uppercase tracking-wider text-blue-600 font-light mt-1">
              Moyenne
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-xs uppercase tracking-wider text-blue-600 font-light mb-2">
            Répartition des notes
          </div>
          {[5, 4, 3, 2, 1].map((r) => {
            const d = ratingDist.find((x) => x.rating === r);
            const pct = ((d?.count ?? 0) / distMax) * 100;
            const intensity = r >= 4 ? "bg-blue-800" : r === 3 ? "bg-blue-500" : "bg-blue-300";
            return (
              <div key={r} className="flex items-center gap-3">
                <div className="flex items-center gap-0.5 w-20 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${s <= r ? "fill-amber-400 text-amber-400" : "text-blue-100"}`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <div className="flex-1 h-2 bg-blue-50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${intensity} transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="w-8 text-right text-blue-700 font-medium text-xs tabular-nums">
                  {d?.count ?? 0}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Par catégorie */}
      <section
        aria-label="Progression par catégorie"
        className="mb-10 bg-white rounded-2xl border border-blue-100 shadow-card overflow-hidden"
      >
        <h3 className="text-blue-950 font-serif text-xl px-5 sm:px-6 pt-5 sm:pt-6 mb-3">
          Par catégorie
        </h3>
        <ul className="divide-y divide-blue-100">
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
                  aria-label={`Voir les questions de ${c.label}, ${c.mastered} sur ${c.total} maîtrisées`}
                  className="w-full text-left px-5 sm:px-6 py-4 hover:bg-blue-50/60 transition-colors flex items-center gap-4 focus:outline-none focus-visible:bg-blue-50"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-blue-800" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <span className="font-medium text-blue-950 truncate">{c.label}</span>
                      <span className="text-sm text-blue-700 font-light tabular-nums flex-shrink-0">
                        <span className="text-blue-950 font-medium">{c.mastered}</span>
                        <span className="text-blue-400">/{c.total}</span>
                      </span>
                    </div>
                    <div
                      className="h-1.5 bg-blue-50 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={Math.round(pct)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full bg-blue-700 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0" />
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
          className="touch-target-bar gap-2 text-blue-600 hover:text-blue-900 text-sm font-light underline underline-offset-4"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Réinitialiser toutes mes notes
        </button>
      </div>
    </div>
  );
}
// =====================================================
