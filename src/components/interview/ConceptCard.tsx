import React from 'react';
import { ChevronRight, Library } from 'lucide-react';
import { Visual } from '@/components/interview/Visual';

export function ConceptCard ({ concept, isExpanded, onToggle, getCategoryLabel, index, total, onPrev, onNext }: any) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const wasExpanded = React.useRef(isExpanded);

  React.useEffect(() => {
    if (isExpanded && !wasExpanded.current && cardRef.current) {
      // Scroll the card to the top of the viewport, just under the sticky filter bar
      const stickyBar = document.getElementById('concepts-sticky-bar');
      const offset = (stickyBar?.offsetHeight ?? 96) + 12;
      const top = cardRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    wasExpanded.current = isExpanded;
  }, [isExpanded]);

  return (
    <div
      ref={cardRef}
      className={`relative z-0 bg-white rounded-2xl shadow-sm border transition-colors duration-200 overflow-hidden scroll-mt-48 ${
        isExpanded ? 'border-blue-500 shadow-md' : 'border-blue-100 hover:border-blue-300'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full text-left p-4 sm:p-5 flex items-start gap-3 sm:gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-2xl"
      >
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors ${
            isExpanded ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-700'
          }`}>
            <Library className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-blue-500 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {getCategoryLabel(concept.category)}
            </span>
          </div>
          <h3 className="text-blue-950 font-serif text-lg sm:text-xl leading-snug">{concept.title}</h3>
          {!isExpanded && (
            <p className="text-blue-700 mt-1.5 text-sm leading-relaxed line-clamp-2 font-light">
              {concept.simple}
            </p>
          )}
        </div>
        <div className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
        </div>
      </button>


      {isExpanded && (
        <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-blue-100 bg-blue-50/20">
          <div className="ml-0 sm:ml-16 mt-5 space-y-5">
            {/* Simple */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-6 bg-blue-700" />
                <h4 className="text-blue-950 font-semibold text-xs uppercase tracking-wider">L&apos;essentiel</h4>
              </div>
              <p className="text-blue-900 leading-relaxed font-light">{concept.simple}</p>
            </div>


            {/* Formule */}
            {concept.formula && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-xs uppercase tracking-wider">Formule clé</h4>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <code className="block text-blue-900 font-mono text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{concept.formula}</code>
                </div>
              </div>
            )}


            {/* Deep dive */}
            {concept.deepDive && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-xs uppercase tracking-wider">Pour bien comprendre</h4>
                </div>
                <p className="text-blue-900 leading-relaxed font-light whitespace-pre-line">{concept.deepDive}</p>
              </div>
            )}


            {/* Table */}
            {concept.table && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-xs uppercase tracking-wider">Tableau de référence</h4>
                </div>
                <div className="bg-white border border-blue-200 rounded-lg overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-sm min-w-[480px]">
                    <thead className="bg-blue-900 text-white">
                      <tr>
                        {concept.table.headers.map((h: any, i: number) => (
                          <th key={i} className="px-3 py-2.5 text-left text-xs uppercase tracking-wider font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {concept.table.rows.map((row: any[], ri: number) => (
                        <tr key={ri} className={ri % 2 === 0 ? 'bg-blue-50/40' : 'bg-white'}>
                          {row.map((cell: any, ci: number) => (
                            <td key={ci} className={`px-3 py-2.5 ${ci === 0 ? 'font-semibold text-blue-950' : 'text-blue-800'}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


            {/* Visual */}
            {concept.visual && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-xs uppercase tracking-wider">Schéma</h4>
                </div>
                <Visual type={concept.visual} />
              </div>
            )}


            {/* Pitfalls */}
            {concept.pitfalls && concept.pitfalls.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-900 text-xs uppercase tracking-[0.2em] font-bold">Pièges à éviter</span>
                </div>
                <ul className="space-y-1.5">
                  {concept.pitfalls.map((p: string, i: number) => (
                    <li key={i} className="flex gap-2 text-blue-900 text-sm leading-relaxed font-light">
                      <span className="text-blue-500 flex-shrink-0">•</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer navigation : précédent · compteur/replier · suivant */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={onPrev}
                disabled={index === 0}
                aria-label="Concept précédent"
                className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 disabled:text-blue-300 disabled:cursor-not-allowed text-sm font-light px-3 py-2 rounded-lg border border-blue-200 hover:border-blue-400 disabled:border-blue-100 bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span className="hidden sm:inline">Précédent</span>
              </button>
              <button
                type="button"
                onClick={onToggle}
                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-light px-4 py-2 rounded-lg border border-blue-200 hover:border-blue-400 bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span className="tabular-nums text-blue-500 text-xs">{index + 1}/{total}</span>
                <span>Replier</span>
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={index === total - 1}
                aria-label="Concept suivant"
                className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 disabled:text-blue-300 disabled:cursor-not-allowed text-sm font-light px-3 py-2 rounded-lg border border-blue-200 hover:border-blue-400 disabled:border-blue-100 bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// =====================================================
