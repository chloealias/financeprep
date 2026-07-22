import React, { useMemo, useState, useEffect, useRef, useTransition } from "react";
import {
  Search,
  ChevronRight,
  Filter,
  X,
  Star,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Mic,
  BookMarked,
} from "lucide-react";
import {
  getDifficultyOptions,
  getQuestionCategories,
  getRatingFilterOptions,
} from "@/lib/categories";
import { questions } from "@/data/questions";
import {
  loadSavedFilters,
  saveSavedFilters,
  questionIdKey,
  loadStudyMode,
  saveStudyMode,
  type QuestionRatings,
  type SavedFilters,
  type StudyMode,
} from "@/lib/storage";
import { Visual } from "@/components/interview/Visual";
import { ClientOnly } from "@/components/hub/ClientOnly";
import { QuestionDetailSkeleton } from "@/components/hub/QuestionDetailSkeleton";
import { QuestionEnrichedPanel } from "@/components/hub/QuestionEnrichedPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { syncRatingToSrs } from "@/lib/srs-sync";
import { logDailyActivity } from "@/lib/daily-goal";
import { StarRating } from "@/components/interview/StarRating";
import { FilterRadioGroup } from "@/components/interview/FilterRadioGroup";
import { hubBadgeClass, hubBadgeGroupClass } from "@/components/guide/guide-ui";
import { PageHeader } from "@/components/ui/page-header";
import { smoothScrollIntoViewAfterLayout } from "@/lib/scroll";
import { usePreserveScrollOnDetailClose } from "@/hooks/usePreserveScrollOnDetailClose";
import { useT } from "@/hooks/useT";

const ALLOWED_CATEGORIES = [
  "all",
  "valuation",
  "accounting",
  "ma",
  "ts",
  "lbo",
  "dcf",
  "brainteaser",
];
const ALLOWED_DIFFICULTIES = ["all", "basique", "intermédiaire", "avancé"];
const ALLOWED_RATING_FILTERS = ["all", "unrated", "weak", "mastered"];

const DEFAULT_QUESTION_FILTERS: SavedFilters = {
  activeCategory: "all",
  activeDifficulty: "all",
  searchQuery: "",
  ratingFilter: "all",
  conceptCategory: "all",
};

function sanitizeQuestionFilters(raw: unknown): SavedFilters {
  const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    activeCategory: ALLOWED_CATEGORIES.includes(o.activeCategory as string)
      ? (o.activeCategory as string)
      : "all",
    activeDifficulty: ALLOWED_DIFFICULTIES.includes(o.activeDifficulty as string)
      ? (o.activeDifficulty as string)
      : "all",
    searchQuery: typeof o.searchQuery === "string" ? o.searchQuery : "",
    ratingFilter: ALLOWED_RATING_FILTERS.includes(o.ratingFilter as string)
      ? (o.ratingFilter as string)
      : "all",
    conceptCategory: "all",
  };
}

type QuestionsTabProps = {
  ratings: QuestionRatings;
  onUpdateRating: (qid: string | number, value: number) => void;
  reviewList: string[];
  onToggleReview: (qid: string | number) => void;
  filtersKey?: number;
};

export function QuestionsTab({
  ratings,
  onUpdateRating,
  reviewList,
  onToggleReview,
  filtersKey = 0,
}: QuestionsTabProps) {
  const { t } = useT();
  const [activeCategory, setActiveCategory] = useState(DEFAULT_QUESTION_FILTERS.activeCategory);
  const [activeDifficulty, setActiveDifficulty] = useState(
    DEFAULT_QUESTION_FILTERS.activeDifficulty,
  );
  const [searchQuery, setSearchQuery] = useState(DEFAULT_QUESTION_FILTERS.searchQuery);
  const [expandedQuestion, setExpandedQuestion] = useState<string | number | null>(null);
  const wasExpandedQuestion = useRef<string | number | null>(null);
  const captureScroll = usePreserveScrollOnDetailClose(expandedQuestion !== null);
  const [ratingFilter, setRatingFilter] = useState(DEFAULT_QUESTION_FILTERS.ratingFilter);
  const [showFilters, setShowFilters] = useState(false);
  const [showReviewOnly, setShowReviewOnly] = useState(false);
  const [filtersHydrated, setFiltersHydrated] = useState(false);
  const [studyMode, setStudyMode] = useState<StudyMode>("lecture");
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
  const [answerTimers, setAnswerTimers] = useState<Record<string, number>>({});
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setStudyMode(loadStudyMode());
  }, []);

  useEffect(() => {
    const saved = loadSavedFilters(sanitizeQuestionFilters, DEFAULT_QUESTION_FILTERS);
    setActiveCategory(saved.activeCategory);
    setActiveDifficulty(saved.activeDifficulty);
    setSearchQuery(saved.searchQuery);
    setRatingFilter(saved.ratingFilter);
    setFiltersHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = loadSavedFilters(sanitizeQuestionFilters, DEFAULT_QUESTION_FILTERS);
    setActiveCategory(saved.activeCategory);
    setActiveDifficulty(saved.activeDifficulty);
    setSearchQuery(saved.searchQuery);
    setRatingFilter(saved.ratingFilter);
  }, [filtersKey]);

  useEffect(() => {
    if (expandedQuestion !== null && expandedQuestion !== wasExpandedQuestion.current) {
      const el = document.getElementById(`question-card-${expandedQuestion}`);
      const cleanup = smoothScrollIntoViewAfterLayout(el, { block: "start" });
      wasExpandedQuestion.current = expandedQuestion;
      return cleanup;
    }
    if (expandedQuestion === null) {
      wasExpandedQuestion.current = null;
    }
  }, [expandedQuestion]);

  useEffect(() => {
    if (!filtersHydrated) return;
    saveSavedFilters({
      activeCategory,
      activeDifficulty,
      searchQuery,
      ratingFilter,
      conceptCategory: "all",
    });
  }, [filtersHydrated, activeCategory, activeDifficulty, searchQuery, ratingFilter]);

  useEffect(() => {
    if (expandedQuestion === null) return;
    if (studyMode !== "entretien") return;
    const key = questionIdKey(expandedQuestion);
    if (revealedKeys.has(key)) return;

    setAnswerTimers((prev) => ({ ...prev, [key]: 75 }));
    const interval = window.setInterval(() => {
      setAnswerTimers((prev) => {
        const t = prev[key];
        if (t === undefined || t <= 0) return prev;
        return { ...prev, [key]: t - 1 };
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [expandedQuestion, studyMode, revealedKeys]);

  const handleRating = (qid: string | number, value: number) => {
    onUpdateRating(qid, value);
    if (value > 0) {
      syncRatingToSrs(qid, value);
      logDailyActivity("lecture", 2);
    }
  };

  const toggleStudyMode = (mode: StudyMode) => {
    setStudyMode(mode);
    saveStudyMode(mode);
    setRevealedKeys(new Set());
  };

  const revealAnswer = (qid: string | number) => {
    const key = questionIdKey(qid);
    setRevealedKeys((prev) => new Set(prev).add(key));
  };

  const categories = getQuestionCategories(t);
  const difficulties = getDifficultyOptions(t);
  const ratingFilters = getRatingFilterOptions(t);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchCategory = activeCategory === "all" || q.category === activeCategory;
      const matchDifficulty = activeDifficulty === "all" || q.difficulty === activeDifficulty;
      const matchSearch =
        searchQuery === "" ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      const qKey = questionIdKey(q.id);
      const rating = ratings[qKey] || 0;
      const matchRating =
        ratingFilter === "all" ||
        (ratingFilter === "unrated" && rating === 0) ||
        (ratingFilter === "weak" && rating > 0 && rating <= 2) ||
        (ratingFilter === "mastered" && rating >= 4);
      const matchReview = !showReviewOnly || reviewList.length === 0 || reviewList.includes(qKey);
      return matchCategory && matchDifficulty && matchSearch && matchRating && matchReview;
    });
  }, [
    activeCategory,
    activeDifficulty,
    searchQuery,
    ratings,
    ratingFilter,
    showReviewOnly,
    reviewList,
  ]);

  const stats = useMemo(
    () => ({
      total: questions.length,
      filtered: filteredQuestions.length,
      basique: questions.filter((q) => q.difficulty === "basique").length,
      intermédiaire: questions.filter((q) => q.difficulty === "intermédiaire").length,
      avancé: questions.filter((q) => q.difficulty === "avancé").length,
      brainteasers: questions.filter((q) => q.category === "brainteaser").length,
    }),
    [filteredQuestions],
  );

  const getDifficultyColor = (diff: string) => {
    if (diff === "basique") return "bg-muted text-foreground border-border";
    if (diff === "intermédiaire") return "bg-primary/10 text-primary border-primary/40";
    return "bg-primary/20 text-foreground border-primary/50";
  };

  const getCategoryColor = (catId: string) =>
    catId === "brainteaser"
      ? "bg-primary/10 text-foreground border-primary/40"
      : "bg-muted text-foreground border-border";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-12">
      <PageHeader
        eyebrow="Entraînement"
        title="Questions"
        description={`${questions.length} questions d'entretien avec réponses modèles, filtres et auto-évaluation.`}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => toggleStudyMode("lecture")}
          className={`touch-target-bar gap-2 px-4 rounded-xl border-2 text-sm font-medium transition-colors ${
            studyMode === "lecture"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-card text-foreground hover:border-primary/40"
          }`}
        >
          <BookMarked className="w-4 h-4" />
          Lecture
        </button>
        <button
          type="button"
          onClick={() => toggleStudyMode("entretien")}
          className={`touch-target-bar gap-2 px-4 rounded-xl border-2 text-sm font-medium transition-colors ${
            studyMode === "entretien"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-card text-foreground hover:border-primary/40"
          }`}
        >
          <Mic className="w-4 h-4" />
          Répondre d&apos;abord
        </button>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && showFilters) {
              e.preventDefault();
              setShowFilters(false);
            }
          }}
          aria-label={showFilters ? "Masquer les filtres" : "Afficher les filtres et recherche"}
          aria-expanded={showFilters}
          aria-controls="questions-filters-panel"
          className={`touch-target-bar relative gap-2 px-4 rounded-xl border-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
            showFilters
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-card text-foreground hover:border-primary/40"
          }`}
        >
          <Filter className="w-4 h-4" />
          Filtres
          {(activeCategory !== "all" ||
            activeDifficulty !== "all" ||
            ratingFilter !== "all" ||
            searchQuery ||
            showReviewOnly) && (
            <span
              className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${showFilters ? "bg-primary-foreground" : "bg-primary"}`}
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {/* Filtres */}
      {showFilters && (
        <div
          id="questions-filters-panel"
          role="region"
          aria-label="Filtres et recherche"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setShowFilters(false);
            }
          }}
          className="bg-card rounded-2xl shadow-card border border-border p-4 sm:p-6 mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <Filter className="w-4 h-4 text-primary" />
            <h2 className="type-section-title">Filtres & recherche</h2>
          </div>

          <div className="relative mb-5">
            <label htmlFor="finance-search" className="sr-only">
              Rechercher une question ou un concept
            </label>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="finance-search"
              type="text"
              role="searchbox"
              inputMode="search"
              enterKeyHint="search"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && searchQuery) {
                  e.preventDefault();
                  setSearchQuery("");
                }
              }}
              className="w-full pl-12 pr-12 py-3 bg-muted/50 border border-border rounded-lg text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Effacer la recherche"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>

          <FilterRadioGroup
            label="Catégorie"
            value={activeCategory}
            onChange={setActiveCategory}
            options={categories.map((c) => ({ id: c.id, label: c.label, icon: c.icon }))}
            activeClass="bg-primary text-primary-foreground border-primary shadow-md"
            inactiveClass="bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <FilterRadioGroup
              label="Difficulté"
              value={activeDifficulty}
              onChange={setActiveDifficulty}
              options={difficulties.map((d) => ({ id: d.id, label: d.label }))}
              activeClass="bg-primary text-primary-foreground border-primary shadow-md"
              inactiveClass="bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted"
            />
            <FilterRadioGroup
              label="Filtre par notation"
              value={ratingFilter}
              onChange={setRatingFilter}
              options={ratingFilters.map((r) => ({ id: r.id, label: r.label }))}
              activeClass="bg-primary text-primary-foreground border-primary shadow-md"
              inactiveClass="bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted"
              labelIcon={Star}
            />
          </div>

          <div className="mt-5 pt-5 border-t border-border">
            <div className="text-foreground text-xs uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" /> À réviser
            </div>
            <button
              type="button"
              onClick={() => setShowReviewOnly((v) => !v)}
              disabled={reviewList.length === 0 && !showReviewOnly}
              className={`touch-target-bar px-3 rounded-lg border text-sm font-medium transition-all gap-2 ${
                showReviewOnly
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {showReviewOnly ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              {showReviewOnly ? "Afficher tout" : "Voir uniquement à réviser"}
              <span
                className={`ml-1 px-1.5 py-0.5 rounded text-xs font-bold ${showReviewOnly ? "bg-white/20" : "bg-muted text-foreground"}`}
              >
                {reviewList.length}
              </span>
            </button>
          </div>

          <div className="mt-5 pt-5 border-t border-border flex items-center justify-between text-sm flex-wrap gap-2">
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">{stats.filtered}</span> question
              {stats.filtered > 1 ? "s" : ""} affichée{stats.filtered > 1 ? "s" : ""}
            </span>
            {(activeCategory !== "all" ||
              activeDifficulty !== "all" ||
              searchQuery ||
              ratingFilter !== "all" ||
              showReviewOnly) && (
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setActiveDifficulty("all");
                  setSearchQuery("");
                  setRatingFilter("all");
                  setShowReviewOnly(false);
                }}
                className="touch-target-bar text-primary hover:text-primary/80 underline underline-offset-2"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">
              {showReviewOnly && reviewList.length === 0
                ? "Vous n'avez encore marqué aucune question à réviser."
                : "Aucune question ne correspond à vos critères."}
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveDifficulty("all");
                setSearchQuery("");
                setRatingFilter("all");
                setShowReviewOnly(false);
              }}
              className="touch-target-bar px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, index) => {
            const qKey = questionIdKey(q.id);
            const isExpanded = expandedQuestion === q.id;
            const userRating = ratings[qKey] || 0;
            const inReview = reviewList.includes(qKey);
            return (
              <div
                key={q.id}
                id={`question-card-${q.id}`}
                className={`relative bg-card rounded-2xl shadow-card border-2 transition-all duration-300 overflow-hidden scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] sm:scroll-mt-24 ${isExpanded ? "border-primary shadow-card-elevated" : inReview ? "border-primary/40 hover:border-primary/60" : userRating >= 4 ? "border-primary/35 hover:border-primary/55" : userRating > 0 && userRating <= 2 ? "border-primary/25 hover:border-primary/45" : "border-border hover:border-primary/40 hover:shadow-card-hover"}`}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleReview(q.id);
                  }}
                  aria-label={
                    inReview ? "Retirer de la liste à réviser" : "Marquer comme à réviser"
                  }
                  aria-pressed={inReview}
                  className={`absolute top-3 right-3 z-10 touch-target rounded-full border transition-all ${inReview ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card text-primary border-border hover:bg-muted hover:border-primary/40"}`}
                >
                  {inReview ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <div className="w-full p-4 sm:p-6 pr-14 sm:pr-16">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-serif text-base sm:text-lg transition-all ${isExpanded ? "bg-primary text-primary-foreground" : userRating >= 4 ? "bg-primary/10 text-primary" : "bg-muted text-foreground"}`}
                      >
                        {userRating >= 4 ? (
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          String(index + 1).padStart(2, "0")
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`${hubBadgeGroupClass} mb-2 sm:mb-3`}>
                        {(() => {
                          const cat = categories.find((c) => c.id === q.category);
                          const CatIcon = cat?.icon ?? BookOpen;
                          const isBrain = q.category === "brainteaser";
                          const catLabel = cat?.label ?? q.category;
                          return (
                            <span
                              title={catLabel}
                              aria-label={`Catégorie : ${catLabel}`}
                              className={`inline-flex max-w-full ${hubBadgeClass} ${isBrain ? "bg-primary/10 text-primary border-primary/40" : ""}`}
                            >
                              <CatIcon className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{catLabel}</span>
                            </span>
                          );
                        })()}
                        {(() => {
                          const filled =
                            q.difficulty === "basique"
                              ? 1
                              : q.difficulty === "intermédiaire"
                                ? 2
                                : 3;
                          const label = `Difficulté : ${q.difficulty}`;
                          return (
                            <>
                              <span
                                className="sm:hidden inline-flex items-center gap-0.5"
                                aria-label={label}
                                title={label}
                              >
                                {[0, 1, 2].map((i) => (
                                  <span
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${i < filled ? "bg-primary" : "bg-muted-foreground/40"}`}
                                  />
                                ))}
                              </span>
                              <span className={`hidden sm:inline-flex capitalize ${hubBadgeClass}`}>
                                {q.difficulty}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isExpanded) captureScroll();
                          startTransition(() => {
                            setExpandedQuestion(isExpanded ? null : q.id);
                          });
                        }}
                        className="w-full flex items-start gap-2 min-h-11 text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-expanded={isExpanded}
                      >
                        <h3 className="flex-1 min-w-0 text-foreground font-serif text-base sm:text-xl leading-snug">
                          {q.question}
                        </h3>
                        <div
                          className={`flex-shrink-0 mt-0.5 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                        >
                          <ChevronRight
                            className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    </div>
                    <div className="hidden sm:flex flex-shrink-0 self-start pt-1">
                      <StarRating
                        value={userRating}
                        onChange={(v) => handleRating(q.id, v)}
                        size="sm"
                      />
                    </div>
                  </div>
                  <div className="sm:hidden mt-2 pl-[3.25rem]">
                    <StarRating
                      value={userRating}
                      onChange={(v) => handleRating(q.id, v)}
                      size="sm"
                      compact
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-border bg-gradient-to-b from-muted/40 to-card">
                    {isPending ? (
                      <QuestionDetailSkeleton />
                    ) : studyMode === "entretien" && !revealedKeys.has(qKey) ? (
                      <div className="ml-0 sm:ml-16 mt-6 space-y-4 text-center py-8">
                        <p className="text-muted-foreground text-sm">
                          Répondez à voix haute avant de révéler la solution.
                        </p>
                        {answerTimers[qKey] !== undefined && answerTimers[qKey] > 0 && (
                          <div className="text-4xl font-serif text-primary tabular-nums">
                            {answerTimers[qKey]}s
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => revealAnswer(q.id)}
                          className="touch-target-bar mx-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90"
                        >
                          J&apos;ai répondu (à voix haute)
                        </button>
                      </div>
                    ) : (
                      <div className="ml-0 sm:ml-16 mt-6 space-y-6">
                        <QuestionEnrichedPanel
                          questionId={q.id}
                          explanation={q.explanation}
                          steps={q.steps}
                          tip={q.tip}
                        />

                        {q.visual && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="h-px w-6 bg-primary" />
                              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider">
                                Visualisation
                              </h4>
                            </div>
                            <ClientOnly fallback={<Skeleton className="h-48 w-full rounded-xl" />}>
                              <Visual type={q.visual} />
                            </ClientOnly>
                          </div>
                        )}

                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div>
                              <div className="text-amber-900 text-xs uppercase tracking-[0.2em] font-bold mb-1">
                                Mon niveau sur cette question
                              </div>
                              <div className="text-amber-700 text-sm">
                                1 = à revoir | 3 = correct | 5 = je maîtrise totalement
                              </div>
                            </div>
                            <StarRating
                              value={userRating}
                              onChange={(v) => handleRating(q.id, v)}
                              size="lg"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
