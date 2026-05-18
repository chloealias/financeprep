import React, { useMemo, useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import {
  DIFFICULTY_OPTIONS,
  QUESTION_CATEGORIES,
  RATING_FILTER_OPTIONS,
  getCategoryLabel,
} from "@/lib/categories";
import { questions } from "@/data/questions";
import {
  loadSavedFilters,
  saveSavedFilters,
  questionIdKey,
  type QuestionRatings,
  type SavedFilters,
} from "@/lib/storage";
import { Visual } from "@/components/interview/Visual";
import { StarRating } from "@/components/interview/StarRating";
import { FilterRadioGroup } from "@/components/interview/FilterRadioGroup";
import { hubBadgeClass, hubBadgeGroupClass } from "@/components/guide/guide-ui";
import { smoothScrollIntoViewAfterLayout } from "@/lib/scroll";
import { usePreserveScrollOnDetailClose } from "@/hooks/usePreserveScrollOnDetailClose";

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
  const [activeCategory, setActiveCategory] = useState(DEFAULT_QUESTION_FILTERS.activeCategory);
  const [activeDifficulty, setActiveDifficulty] = useState(
    DEFAULT_QUESTION_FILTERS.activeDifficulty,
  );
  const [searchQuery, setSearchQuery] = useState(DEFAULT_QUESTION_FILTERS.searchQuery);
  const [expandedQuestion, setExpandedQuestion] = useState<string | number | null>(null);
  const wasExpandedQuestion = useRef<string | number | null>(null);
  const captureScroll = usePreserveScrollOnDetailClose(expandedQuestion !== null);
  const [ratingFilter, setRatingFilter] = useState(DEFAULT_QUESTION_FILTERS.ratingFilter);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showReviewOnly, setShowReviewOnly] = useState(false);
  const [filtersHydrated, setFiltersHydrated] = useState(false);

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

  const categories = QUESTION_CATEGORIES;
  const difficulties = DIFFICULTY_OPTIONS;
  const ratingFilters = RATING_FILTER_OPTIONS;

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
    if (diff === "basique") return "bg-sky-100 text-sky-800 border-sky-300";
    if (diff === "intermédiaire") return "bg-blue-100 text-blue-800 border-blue-400";
    return "bg-indigo-100 text-indigo-900 border-indigo-500";
  };

  const getCategoryColor = (catId: string) =>
    catId === "brainteaser"
      ? "bg-amber-50 text-amber-900 border-amber-300"
      : "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-medium text-blue-950 tracking-tight mb-6 sm:mb-8">
        Questions
      </h2>
      {/* Filtres */}
      <div className="bg-white rounded-2xl shadow-card border border-blue-100 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="hidden sm:flex items-center gap-2 mb-5">
          <Filter className="w-4 h-4 text-blue-700" />
          <h2 className="text-blue-950 font-serif text-lg">Filtres & recherche</h2>
        </div>

        <div className="flex items-center gap-2 mb-5 sm:mb-5">
          <div className="relative flex-1">
            <label htmlFor="finance-search" className="sr-only">
              Rechercher une question ou un concept
            </label>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400"
              aria-hidden="true"
            />
            <input
              id="finance-search"
              type="search"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && searchQuery) {
                  e.preventDefault();
                  setSearchQuery("");
                }
              }}
              className="w-full pl-12 pr-12 py-3 bg-blue-50/50 border border-blue-200 rounded-lg text-base text-blue-950 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Effacer la recherche"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowMobileFilters((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === "Escape" && showMobileFilters) {
                e.preventDefault();
                setShowMobileFilters(false);
              }
            }}
            aria-label={showMobileFilters ? "Masquer les filtres" : "Afficher les filtres"}
            aria-expanded={showMobileFilters}
            aria-controls="mobile-filters-panel"
            className={`sm:hidden relative flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${showMobileFilters ? "bg-blue-900 text-white border-blue-900" : "bg-white text-blue-700 border-blue-200"}`}
          >
            <Filter className="w-5 h-5" aria-hidden="true" />
            {(activeCategory !== "all" || activeDifficulty !== "all" || ratingFilter !== "all") && (
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400"
                aria-hidden="true"
              />
            )}
          </button>
        </div>

        <div
          id="mobile-filters-panel"
          role="region"
          aria-label="Filtres"
          onKeyDown={(e) => {
            if (e.key === "Escape" && showMobileFilters) {
              setShowMobileFilters(false);
            }
          }}
          className={`${showMobileFilters ? "block" : "hidden"} sm:block`}
        >
          <FilterRadioGroup
            label="Catégorie"
            value={activeCategory}
            onChange={setActiveCategory}
            options={categories.map((c) => ({ id: c.id, label: c.label, icon: c.icon }))}
            activeClass="bg-blue-900 text-white border-blue-900 shadow-md"
            inactiveClass="bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <FilterRadioGroup
              label="Difficulté"
              value={activeDifficulty}
              onChange={setActiveDifficulty}
              options={difficulties.map((d) => ({ id: d.id, label: d.label }))}
              activeClass="bg-indigo-900 text-white border-indigo-900 shadow-md"
              inactiveClass="bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
            />
            <FilterRadioGroup
              label="Filtre par notation"
              value={ratingFilter}
              onChange={setRatingFilter}
              options={ratingFilters.map((r) => ({ id: r.id, label: r.label }))}
              activeClass="bg-amber-600 text-white border-amber-600 shadow-md"
              inactiveClass="bg-white text-amber-700 border-amber-200 hover:border-amber-400 hover:bg-amber-50"
              labelIcon={Star}
            />
          </div>

          <div className="mt-5 pt-5 border-t border-blue-100">
            <div className="text-blue-950 text-xs uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" /> À réviser
            </div>
            <button
              type="button"
              onClick={() => setShowReviewOnly((v) => !v)}
              disabled={reviewList.length === 0 && !showReviewOnly}
              className={`touch-target-bar px-3 rounded-lg border text-sm font-medium transition-all gap-2 ${
                showReviewOnly
                  ? "bg-rose-600 text-white border-rose-600 shadow-md"
                  : "bg-white text-rose-700 border-rose-200 hover:border-rose-400 hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {showReviewOnly ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              {showReviewOnly ? "Afficher tout" : "Voir uniquement à réviser"}
              <span
                className={`ml-1 px-1.5 py-0.5 rounded text-xs font-bold ${showReviewOnly ? "bg-white/20" : "bg-rose-100 text-rose-800"}`}
              >
                {reviewList.length}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-blue-100 flex items-center justify-between text-sm flex-wrap gap-2">
          <span className="text-blue-700">
            <span className="font-semibold text-blue-950">{stats.filtered}</span> question
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
              className="touch-target-bar text-blue-700 hover:text-blue-900 underline underline-offset-2"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-blue-100 p-12 text-center">
            <Search className="w-12 h-12 text-blue-300 mx-auto mb-4" />
            <p className="text-blue-700 text-lg mb-4">
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
              className="touch-target-bar px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
                className={`relative bg-white rounded-2xl shadow-card border-2 transition-all duration-300 overflow-hidden scroll-mt-24 ${isExpanded ? "border-blue-500 shadow-card-elevated" : inReview ? "border-rose-300 hover:border-rose-400" : userRating >= 4 ? "border-emerald-300 hover:border-emerald-400" : userRating > 0 && userRating <= 2 ? "border-red-200 hover:border-red-300" : "border-blue-100 hover:border-blue-300 hover:shadow-card-hover"}`}
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
                  className={`absolute top-3 right-3 z-10 touch-target rounded-full border transition-all ${inReview ? "bg-rose-600 text-white border-rose-600 shadow-md" : "bg-white text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-400"}`}
                >
                  {inReview ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <div className="w-full p-4 sm:p-6 pr-14 sm:pr-16 flex items-stretch gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isExpanded) captureScroll();
                      setExpandedQuestion(isExpanded ? null : q.id);
                    }}
                    className="flex flex-1 min-w-0 min-h-11 items-start gap-3 sm:gap-4 text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-serif text-base sm:text-lg transition-all ${isExpanded ? "bg-blue-700 text-white" : userRating >= 4 ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}
                      >
                        {userRating >= 4 ? (
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          String(index + 1).padStart(2, "0")
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`${hubBadgeGroupClass} mb-3`}>
                        {(() => {
                          const cat = categories.find((c) => c.id === q.category);
                          const CatIcon = cat?.icon ?? BookOpen;
                          const isBrain = q.category === "brainteaser";
                          const catLabel = cat?.label ?? q.category;
                          return (
                            <>
                              <span
                                title={catLabel}
                                aria-label={`Catégorie : ${catLabel}`}
                                className={`sm:hidden inline-flex items-center justify-center w-6 h-6 rounded-full ${isBrain ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}
                              >
                                <CatIcon className="w-3.5 h-3.5" />
                              </span>
                              <span className={`hidden sm:inline-flex ${hubBadgeClass}`}>
                                <CatIcon className="w-3.5 h-3.5 shrink-0" />
                                {catLabel}
                              </span>
                            </>
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
                                    className={`w-1.5 h-1.5 rounded-full ${i < filled ? "bg-blue-700" : "bg-blue-200"}`}
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
                      <h3 className="text-blue-950 font-serif text-base sm:text-xl leading-snug">
                        {q.question}
                      </h3>
                    </div>
                    <div
                      className={`flex-shrink-0 self-center transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                    >
                      <ChevronRight
                        className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                  <div className="flex-shrink-0 self-start pt-1">
                    <StarRating
                      value={userRating}
                      onChange={(v) => onUpdateRating(q.id, v)}
                      size="sm"
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-blue-100 bg-gradient-to-b from-blue-50/30 to-white">
                    <div className="ml-0 sm:ml-16 mt-6 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-px w-6 bg-blue-700" />
                          <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">
                            Explication
                          </h4>
                        </div>
                        <p className="text-blue-900 leading-relaxed font-light">{q.explanation}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="h-px w-6 bg-blue-700" />
                          <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">
                            Étapes de réponse
                          </h4>
                        </div>
                        <ol className="space-y-3">
                          {q.steps.map((step, i) => (
                            <li
                              key={i}
                              className="flex gap-4 bg-white rounded-lg p-4 border border-blue-100"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-700 text-white font-serif text-sm flex items-center justify-center">
                                {i + 1}
                              </div>
                              <p className="text-blue-900 leading-relaxed flex-1 pt-0.5">{step}</p>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {q.visual && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="h-px w-6 bg-blue-700" />
                            <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">
                              Visualisation
                            </h4>
                          </div>
                          <Visual type={q.visual} />
                        </div>
                      )}

                      {q.tip && (
                        <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-xl p-5 text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
                          <div className="relative">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-blue-200 text-xs uppercase tracking-[0.2em] font-medium">
                                💡 Conseil de pro
                              </span>
                            </div>
                            <p className="text-white font-light leading-relaxed">{q.tip}</p>
                          </div>
                        </div>
                      )}

                      {/* Notation grand format en fin de carte */}
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
                            onChange={(v) => onUpdateRating(q.id, v)}
                            size="lg"
                          />
                        </div>
                      </div>
                    </div>
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
