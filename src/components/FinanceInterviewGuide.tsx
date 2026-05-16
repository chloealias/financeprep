import React, { useState, useMemo, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Search, ChevronRight, BookOpen, Filter, X, Star, CheckCircle2, Bookmark, BookmarkCheck } from 'lucide-react';
import {
  DIFFICULTY_OPTIONS,
  QUESTION_CATEGORIES,
  RATING_FILTER_OPTIONS,
  getCategoryLabel,
} from '@/lib/categories';
import { questions } from '@/data/questions';
import { concepts } from '@/data/concepts';
import type { AppTab, HubNavTab } from '@/lib/app-tabs';
import { normalizeHubTab } from '@/lib/app-tabs';
import {
  clearRatings,
  loadRatings,
  loadRatingsWithLegacyMigration,
  loadReviewList,
  loadSavedFilters,
  questionIdKey,
  saveRatings,
  saveReviewList,
  saveSavedFilters,
  type QuestionRatings,
  type SavedFilters,
} from '@/lib/storage';
import { guideModules } from '@/data/guide-modules';
import { Visual } from '@/components/interview/Visual';
import { StarRating } from '@/components/interview/StarRating';
import { ConceptCard } from '@/components/interview/ConceptCard';
import { ProgressPage } from '@/components/interview/ProgressPage';
import { FilterRadioGroup } from '@/components/interview/FilterRadioGroup';
import { AppHubLayout } from '@/components/hub/AppHubLayout';
import { GuideModuleLink } from '@/components/guide/guide-ui';

// =====================================================
//  COMPOSANT PRINCIPAL
// =====================================================
type FinanceInterviewGuideProps = {
  activePage: AppTab;
  onPageChange: (page: AppTab) => void;
};

const FinanceInterviewGuide = ({ activePage, onPageChange }: FinanceInterviewGuideProps) => {
  const hubTab = normalizeHubTab(activePage);
  const setHubTab = (page: HubNavTab) => onPageChange(page);

  const ALLOWED_CATEGORIES = ['all', 'valuation', 'accounting', 'ma', 'ts', 'lbo', 'dcf', 'brainteaser'];
  const ALLOWED_DIFFICULTIES = ['all', 'basique', 'intermédiaire', 'avancé'];
  const ALLOWED_RATING_FILTERS = ['all', 'unrated', 'weak', 'mastered'];

  const defaultFilters: SavedFilters = {
    activeCategory: 'all',
    activeDifficulty: 'all',
    searchQuery: '',
    ratingFilter: 'all',
    conceptCategory: 'all',
  };

  const sanitizeFilters = (raw: unknown): SavedFilters => {
    const o = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
    return {
      activeCategory: ALLOWED_CATEGORIES.includes(o.activeCategory as string) ? (o.activeCategory as string) : 'all',
      activeDifficulty: ALLOWED_DIFFICULTIES.includes(o.activeDifficulty as string) ? (o.activeDifficulty as string) : 'all',
      searchQuery: typeof o.searchQuery === 'string' ? o.searchQuery : '',
      ratingFilter: ALLOWED_RATING_FILTERS.includes(o.ratingFilter as string) ? (o.ratingFilter as string) : 'all',
      conceptCategory: ALLOWED_CATEGORIES.includes(o.conceptCategory as string) ? (o.conceptCategory as string) : 'all',
    };
  };

  const initialFilters =
    typeof window !== 'undefined' ? loadSavedFilters(sanitizeFilters, defaultFilters) : defaultFilters;

  const [activeCategory, setActiveCategory] = useState(initialFilters.activeCategory);
  const [activeDifficulty, setActiveDifficulty] = useState(initialFilters.activeDifficulty);
  const [searchQuery, setSearchQuery] = useState(initialFilters.searchQuery);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [expandedConcept, setExpandedConcept] = useState(null);
  const [ratings, setRatings] = useState<QuestionRatings>(() =>
    typeof window !== 'undefined' ? loadRatings() : {},
  );
  const [ratingFilter, setRatingFilter] = useState(initialFilters.ratingFilter);
  const [conceptCategory, setConceptCategory] = useState(initialFilters.conceptCategory);
  const [selectedSector, setSelectedSector] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [reviewList, setReviewList] = useState<string[]>(() =>
    typeof window !== 'undefined' ? loadReviewList() : [],
  );
  // Volontairement NON persisté : le mode "à réviser" doit toujours être désactivé au chargement.
  const [showReviewOnly, setShowReviewOnly] = useState<boolean>(false);
  const [filtersHydrated, setFiltersHydrated] = useState(typeof window !== 'undefined');

  useEffect(() => {
    setFiltersHydrated(true);
  }, []);

  const toggleReview = (qid: string | number) => {
    const key = questionIdKey(qid);
    setReviewList((prev) => {
      const next = prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key];
      saveReviewList(next);
      return next;
    });
  };

  // Persister les filtres et la recherche (showReviewOnly volontairement exclu)
  useEffect(() => {
    if (!filtersHydrated) return;
    saveSavedFilters({
      activeCategory,
      activeDifficulty,
      searchQuery,
      ratingFilter,
      conceptCategory,
    });
  }, [filtersHydrated, activeCategory, activeDifficulty, searchQuery, ratingFilter, conceptCategory]);

  useEffect(() => {
    void loadRatingsWithLegacyMigration().then((migrated) => {
      if (Object.keys(migrated).length > 0) setRatings(migrated);
    });
  }, []);

  const updateRating = (qid: string | number, value: number) => {
    const key = questionIdKey(qid);
    const next = { ...ratings, [key]: value };
    if (value === 0) delete next[key];
    setRatings(next);
    saveRatings(next);
  };

  const resetRatings = () => {
    setRatings({});
    clearRatings();
  };


  const categories = QUESTION_CATEGORIES;
  const difficulties = DIFFICULTY_OPTIONS;
  const ratingFilters = RATING_FILTER_OPTIONS;


  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchCategory = activeCategory === 'all' || q.category === activeCategory;
      const matchDifficulty = activeDifficulty === 'all' || q.difficulty === activeDifficulty;
      const matchSearch = searchQuery === '' || q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      const qKey = questionIdKey(q.id);
      const rating = ratings[qKey] || 0;
      const matchRating = ratingFilter === 'all' || (ratingFilter === 'unrated' && rating === 0) || (ratingFilter === 'weak' && rating > 0 && rating <= 2) || (ratingFilter === 'mastered' && rating >= 4);
      const matchReview = !showReviewOnly || reviewList.length === 0 || reviewList.includes(qKey);
      return matchCategory && matchDifficulty && matchSearch && matchRating && matchReview;
    });
  }, [activeCategory, activeDifficulty, searchQuery, ratings, ratingFilter, showReviewOnly, reviewList]);


  const filteredConcepts = useMemo(() => {
    return concepts.filter((c) => conceptCategory === 'all' || c.category === conceptCategory);
  }, [conceptCategory]);


  const stats = useMemo(() => ({
    total: questions.length,
    filtered: filteredQuestions.length,
    basique: questions.filter((q) => q.difficulty === 'basique').length,
    intermédiaire: questions.filter((q) => q.difficulty === 'intermédiaire').length,
    avancé: questions.filter((q) => q.difficulty === 'avancé').length,
    brainteasers: questions.filter((q) => q.category === 'brainteaser').length,
    concepts: concepts.length,
  }), [filteredQuestions]);


  const getDifficultyColor = (diff) => {
    if (diff === 'basique') return 'bg-sky-100 text-sky-800 border-sky-300';
    if (diff === 'intermédiaire') return 'bg-blue-100 text-blue-800 border-blue-400';
    return 'bg-indigo-100 text-indigo-900 border-indigo-500';
  };


  const getCategoryColor = (catId) => catId === 'brainteaser' ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-blue-50 text-blue-700 border-blue-200';



  return (
    <AppHubLayout activePage={hubTab} onPageChange={setHubTab}>
      {/* PAGE: QUESTIONS */}
      {hubTab === 'questions' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-medium text-blue-950 tracking-tight mb-6 sm:mb-8">Questions</h2>
          {/* Filtres */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="hidden sm:flex items-center gap-2 mb-5">
              <Filter className="w-4 h-4 text-blue-700" />
              <h2 className="text-blue-950 font-serif text-lg">Filtres & recherche</h2>
            </div>


            <div className="flex items-center gap-2 mb-5 sm:mb-5">
              <div className="relative flex-1">
                <label htmlFor="finance-search" className="sr-only">Rechercher une question ou un concept</label>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" aria-hidden="true" />
                <input
                  id="finance-search"
                  type="search"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Escape' && searchQuery) { e.preventDefault(); setSearchQuery(''); } }}
                  className="w-full pl-12 pr-12 py-3 bg-blue-50/50 border border-blue-200 rounded-lg text-base text-blue-950 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} aria-label="Effacer la recherche" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowMobileFilters((v) => !v)}
                onKeyDown={(e) => { if (e.key === 'Escape' && showMobileFilters) { e.preventDefault(); setShowMobileFilters(false); } }}
                aria-label={showMobileFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
                aria-expanded={showMobileFilters}
                aria-controls="mobile-filters-panel"
                className={`sm:hidden relative flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${showMobileFilters ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-blue-700 border-blue-200'}`}
              >
                <Filter className="w-5 h-5" aria-hidden="true" />
                {(activeCategory !== 'all' || activeDifficulty !== 'all' || ratingFilter !== 'all') && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" aria-hidden="true" />
                )}
              </button>
            </div>


            <div
              id="mobile-filters-panel"
              role="region"
              aria-label="Filtres"
              onKeyDown={(e) => { if (e.key === 'Escape' && showMobileFilters) { setShowMobileFilters(false); } }}
              className={`${showMobileFilters ? 'block' : 'hidden'} sm:block`}
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
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 ${
                    showReviewOnly
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                      : 'bg-white text-rose-700 border-rose-200 hover:border-rose-400 hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {showReviewOnly ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  {showReviewOnly ? 'Afficher tout' : 'Voir uniquement à réviser'}
                  <span className={`ml-1 px-1.5 py-0.5 rounded text-xs font-bold ${showReviewOnly ? 'bg-white/20' : 'bg-rose-100 text-rose-800'}`}>{reviewList.length}</span>
                </button>
              </div>
            </div>


            <div className="mt-5 pt-5 border-t border-blue-100 flex items-center justify-between text-sm flex-wrap gap-2">
              <span className="text-blue-700"><span className="font-semibold text-blue-950">{stats.filtered}</span> question{stats.filtered > 1 ? 's' : ''} affichée{stats.filtered > 1 ? 's' : ''}</span>
              {(activeCategory !== 'all' || activeDifficulty !== 'all' || searchQuery || ratingFilter !== 'all' || showReviewOnly) && (
                <button onClick={() => { setActiveCategory('all'); setActiveDifficulty('all'); setSearchQuery(''); setRatingFilter('all'); setShowReviewOnly(false); }} className="text-blue-700 hover:text-blue-900 underline underline-offset-2">Réinitialiser</button>
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
                    : 'Aucune question ne correspond à vos critères.'}
                </p>
                <button
                  onClick={() => { setActiveCategory('all'); setActiveDifficulty('all'); setSearchQuery(''); setRatingFilter('all'); setShowReviewOnly(false); }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
                  <div key={q.id} className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 overflow-hidden ${isExpanded ? 'border-blue-500 shadow-xl shadow-blue-100' : inReview ? 'border-rose-300 hover:border-rose-400' : userRating >= 4 ? 'border-emerald-300 hover:border-emerald-400' : userRating > 0 && userRating <= 2 ? 'border-red-200 hover:border-red-300' : 'border-blue-100 hover:border-blue-300 hover:shadow-md'}`}>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleReview(q.id); }}
                      aria-label={inReview ? 'Retirer de la liste à réviser' : 'Marquer comme à réviser'}
                      aria-pressed={inReview}
                      className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${inReview ? 'bg-rose-600 text-white border-rose-600 shadow-md' : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-400'}`}
                    >
                      {inReview ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                    <div className="w-full p-4 sm:p-6 pr-14 sm:pr-16 flex items-start gap-3 sm:gap-4">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setExpandedQuestion(isExpanded ? null : q.id);
                          }
                        }}
                        className="flex flex-1 min-w-0 items-start gap-3 sm:gap-4 text-left cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-serif text-base sm:text-lg transition-all ${isExpanded ? 'bg-blue-700 text-white' : userRating >= 4 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                            {userRating >= 4 ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : String(index + 1).padStart(2, '0')}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            {(() => {
                              const cat = categories.find((c) => c.id === q.category);
                              const CatIcon = cat?.icon ?? BookOpen;
                              const isBrain = q.category === 'brainteaser';
                              const catLabel = cat?.label ?? q.category;
                              return (
                                <>
                                  <span
                                    title={catLabel}
                                    aria-label={`Catégorie : ${catLabel}`}
                                    className={`sm:hidden inline-flex items-center justify-center w-6 h-6 rounded-full ${isBrain ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}
                                  >
                                    <CatIcon className="w-3.5 h-3.5" />
                                  </span>
                                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded border bg-blue-50 text-blue-800 border-blue-100">
                                    <CatIcon className="w-3.5 h-3.5" />
                                    {catLabel}
                                  </span>
                                </>
                              );
                            })()}
                            {(() => {
                              const filled = q.difficulty === 'basique' ? 1 : q.difficulty === 'intermédiaire' ? 2 : 3;
                              const label = `Difficulté : ${q.difficulty}`;
                              return (
                                <>
                                  <span className="sm:hidden inline-flex items-center gap-0.5" aria-label={label} title={label}>
                                    {[0, 1, 2].map((i) => (
                                      <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < filled ? 'bg-blue-700' : 'bg-blue-200'}`} />
                                    ))}
                                  </span>
                                  <span className="hidden sm:inline-flex items-center text-xs font-medium px-2.5 py-1 rounded border bg-blue-50 text-blue-800 border-blue-100 capitalize">
                                    {q.difficulty}
                                  </span>
                                </>
                              );
                            })()}
                          </div>
                          <h3 className="text-blue-950 font-serif text-base sm:text-xl leading-snug">{q.question}</h3>
                        </div>
                        <div className={`flex-shrink-0 self-center transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="flex-shrink-0 self-start pt-1">
                        <StarRating value={userRating} onChange={(v) => updateRating(q.id, v)} size="sm" />
                      </div>
                    </div>


                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-blue-100 bg-gradient-to-b from-blue-50/30 to-white">
                        <div className="ml-0 sm:ml-16 mt-6 space-y-6">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="h-px w-6 bg-blue-700" />
                              <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">Explication</h4>
                            </div>
                            <p className="text-blue-900 leading-relaxed font-light">{q.explanation}</p>
                          </div>


                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="h-px w-6 bg-blue-700" />
                              <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">Étapes de réponse</h4>
                            </div>
                            <ol className="space-y-3">
                              {q.steps.map((step, i) => (
                                <li key={i} className="flex gap-4 bg-white rounded-lg p-4 border border-blue-100">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-700 text-white font-serif text-sm flex items-center justify-center">{i + 1}</div>
                                  <p className="text-blue-900 leading-relaxed flex-1 pt-0.5">{step}</p>
                                </li>
                              ))}
                            </ol>
                          </div>


                          {q.visual && (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <div className="h-px w-6 bg-blue-700" />
                                <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">Visualisation</h4>
                              </div>
                              <Visual type={q.visual} />
                            </div>
                          )}


                          {q.tip && (
                            <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-xl p-5 text-white relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
                              <div className="relative">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-blue-200 text-xs uppercase tracking-[0.2em] font-medium">💡 Conseil de pro</span>
                                </div>
                                <p className="text-white font-light leading-relaxed">{q.tip}</p>
                              </div>
                            </div>
                          )}


                          {/* Notation grand format en fin de carte */}
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
                            <div className="flex items-center justify-between flex-wrap gap-3">
                              <div>
                                <div className="text-amber-900 text-xs uppercase tracking-[0.2em] font-bold mb-1">Mon niveau sur cette question</div>
                                <div className="text-amber-700 text-sm">1 = à revoir | 3 = correct | 5 = je maîtrise totalement</div>
                              </div>
                              <StarRating value={userRating} onChange={(v) => updateRating(q.id, v)} size="lg" />
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
      )}


      {/* PAGE: CONCEPTS */}
      {hubTab === 'concepts' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-medium text-blue-950 tracking-tight">
              Concepts essentiels
            </h2>
            <p className="text-blue-700 mt-2 font-light text-sm sm:text-base hidden sm:block">
              {concepts.length} fiches pédagogiques.
            </p>
          </div>


          {/* Filtre concepts — barre horizontale sticky */}
          <div className="sticky top-16 z-20 -mx-4 sm:mx-0 mb-6 sm:mb-8 bg-blue-50/95 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-0 border-b border-blue-100 sm:border-0">
            <div className="sm:bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-blue-100 sm:p-4">
              <div className="hidden sm:block text-xs uppercase tracking-wider text-blue-700 font-medium mb-3">Filtrer par thématique</div>
              <div
                role="tablist"
                aria-label="Filtrer les concepts par thématique"
                className="flex gap-2 overflow-x-auto px-4 sm:px-0 py-3 sm:py-0 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none' }}
              >
                {categories.filter((c) => c.id !== 'brainteaser').map((cat) => {
                  const Icon = cat.icon;
                  const isActive = conceptCategory === cat.id;
                  const count = cat.id === 'all' ? concepts.length : concepts.filter((c) => c.category === cat.id).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setConceptCategory(cat.id)}
                      className={`flex-shrink-0 snap-start flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${isActive ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50'}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="whitespace-nowrap">{cat.label}</span>
                      <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-blue-50'}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mini-bar de navigation : visible quand un concept est ouvert */}
          {(() => {
            const activeIdx = filteredConcepts.findIndex((c) => c.id === expandedConcept);
            if (activeIdx === -1) return null;
            const active = filteredConcepts[activeIdx];
            const goTo = (idx) => {
              if (idx < 0 || idx >= filteredConcepts.length) return;
              setExpandedConcept(filteredConcepts[idx].id);
            };
            return (
              <div className="sticky top-32 z-10 mb-4 bg-blue-900 text-white rounded-xl shadow-md px-3 py-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(activeIdx - 1)}
                  disabled={activeIdx === 0}
                  aria-label="Concept précédent"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedConcept(null)}
                  className="flex-1 min-w-0 text-left flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  aria-label="Replier le concept ouvert"
                  title="Replier"
                >
                  <span className="tabular-nums text-blue-300 text-xs flex-shrink-0">{activeIdx + 1}/{filteredConcepts.length}</span>
                  <span className="font-serif text-sm truncate">{active.title}</span>
                </button>
                <button
                  type="button"
                  onClick={() => goTo(activeIdx + 1)}
                  disabled={activeIdx === filteredConcepts.length - 1}
                  aria-label="Concept suivant"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })()}

          <div className="space-y-3 sm:space-y-4">
            {filteredConcepts.map((c, i) => (
              <ConceptCard
                key={c.id}
                concept={c}
                index={i}
                total={filteredConcepts.length}
                isExpanded={expandedConcept === c.id}
                onToggle={() => setExpandedConcept(expandedConcept === c.id ? null : c.id)}
                onPrev={() => i > 0 && setExpandedConcept(filteredConcepts[i - 1].id)}
                onNext={() => i < filteredConcepts.length - 1 && setExpandedConcept(filteredConcepts[i + 1].id)}
                getCategoryLabel={getCategoryLabel}
              />
            ))}
          </div>
        </div>
      )}


      {/* PAGE: GUIDE */}
      {hubTab === 'guide' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-blue-700" />
              <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">Méthodologie</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
              Le <span className="italic font-light text-blue-700">guide complet</span>
            </h2>
            <p className="text-blue-700 mt-3 font-light max-w-3xl">
              6 guides interactifs. Cliquez sur un module pour l&apos;ouvrir en pleine page.
            </p>
          </div>
          <div className="space-y-6">
            {guideModules.map((module) => (
              <GuideModuleLink
                key={module.href}
                to={module.href}
                tag={module.tag}
                title={module.title}
                icon={module.icon}
              />
            ))}
          </div>
        </div>
      )}

      {/* PAGE: SECTEURS */}
      {activePage === 'secteurs' && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-blue-700" />
              <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">Couverture sectorielle</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
              Fiches <span className="italic font-light text-blue-700">sectorielles</span>
            </h2>
            <p className="text-blue-700 mt-3 font-light">
              7 secteurs couvrant ~80% des deals. Cliquez sur un secteur pour ouvrir sa fiche.
            </p>
          </div>
          <div className="bg-white/80 rounded-2xl border border-blue-100 border-dashed p-10 text-center space-y-2">
            <p className="text-blue-950 font-medium">Bientôt disponible</p>
            <p className="text-blue-600 text-sm font-light max-w-md mx-auto">
              Les fiches sectorielles (tech, santé, industrie…) arrivent prochainement. En attendant, explorez les questions et notions par thème.
            </p>
            <button
              type="button"
              onClick={() => onPageChange('questions')}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-5 py-2.5 transition-colors"
            >
              Voir les questions
            </button>
          </div>
        </div>
      )}


      {/* PAGE: PROGRESS */}
      {hubTab === 'progress' && (
        <ProgressPage questions={questions} ratings={ratings} categories={categories} getCategoryLabel={getCategoryLabel} onReset={resetRatings} onPageChange={setHubTab} setActiveCategory={setActiveCategory} setRatingFilter={setRatingFilter} />
      )}

    </AppHubLayout>
  );
};


export default FinanceInterviewGuide;