import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { concepts } from '@/data/concepts';
import { QUESTION_CATEGORIES, getCategoryLabel } from '@/lib/categories';
import { ConceptCard } from '@/components/interview/ConceptCard';
import {
  loadSavedFilters,
  saveSavedFilters,
  type SavedFilters,
} from '@/lib/storage';

const ALLOWED_CATEGORIES = ['all', 'valuation', 'accounting', 'ma', 'ts', 'lbo', 'dcf', 'brainteaser'];

export function ConceptsTab () {
  const [conceptCategory, setConceptCategory] = useState(() => {
    if (typeof window === 'undefined') return 'all';
    const saved = loadSavedFilters(
      raw => {
        const o = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
        return {
          activeCategory: 'all',
          activeDifficulty: 'all',
          searchQuery: '',
          ratingFilter: 'all',
          conceptCategory: ALLOWED_CATEGORIES.includes(o.conceptCategory as string)
            ? (o.conceptCategory as string)
            : 'all',
        } satisfies SavedFilters;
      },
      {
        activeCategory: 'all',
        activeDifficulty: 'all',
        searchQuery: '',
        ratingFilter: 'all',
        conceptCategory: 'all',
      },
    );
    return saved.conceptCategory;
  });
  const [expandedConcept, setExpandedConcept] = useState<string | number | null>(null);

  const categories = QUESTION_CATEGORIES;

  const filteredConcepts = useMemo(
    () => concepts.filter(c => conceptCategory === 'all' || c.category === conceptCategory),
    [conceptCategory],
  );

  const persistCategory = (cat: string) => {
    setConceptCategory(cat);
    if (typeof window === 'undefined') return;
    const current = loadSavedFilters(
      raw => raw as SavedFilters,
      {
        activeCategory: 'all',
        activeDifficulty: 'all',
        searchQuery: '',
        ratingFilter: 'all',
        conceptCategory: 'all',
      },
    );
    saveSavedFilters({ ...current, conceptCategory: cat });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-medium text-blue-950 tracking-tight">
              Concepts essentiels
            </h2>
            <p className="text-blue-700 mt-2 font-light text-sm sm:text-base hidden sm:block">
              {concepts.length} fiches pédagogiques.
            </p>
          </div>


          {/* Filtres + mini-nav : un seul bloc sticky top-0 (fond blanc opaque) */}
          <div
            id="concepts-sticky-bar"
            className="sticky top-0 z-40 -mx-4 sm:-mx-6 lg:-mx-8 mb-6 sm:mb-8 bg-white border-b border-blue-200 shadow-[0_4px_12px_-2px_rgba(30,58,138,0.12)] isolate"
          >
            <div className="px-4 sm:px-6 lg:px-8 pt-3 pb-3 sm:pt-4 sm:pb-4">
              <div className="hidden sm:block text-xs uppercase tracking-wider text-blue-700 font-medium mb-3">Filtrer par thématique</div>
              <div
                role="tablist"
                aria-label="Filtrer les concepts par thématique"
                className="flex gap-2 overflow-x-auto px-0 py-0 snap-x snap-mandatory scrollbar-hide"
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
                      onClick={() => persistCategory(cat.id)}
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
            {(() => {
              const activeIdx = filteredConcepts.findIndex((c) => c.id === expandedConcept);
              if (activeIdx === -1) return null;
              const active = filteredConcepts[activeIdx];
              const goTo = (idx: number) => {
                if (idx < 0 || idx >= filteredConcepts.length) return;
                setExpandedConcept(filteredConcepts[idx].id);
              };
              return (
                <div className="px-4 sm:px-6 lg:px-8 pb-3">
                  <div className="bg-blue-900 text-white rounded-xl shadow-md px-3 py-2 flex items-center gap-2">
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
                </div>
              );
            })()}
          </div>

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
  );
}
