import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { acronymSections } from '@/data/acronyms';

export const Route = createFileRoute('/glossaire')({
  head: () => ({
    meta: [
      { title: 'Glossaire des acronymes — FinancePrep' },
      {
        name: 'description',
        content:
          "Tous les acronymes indispensables en TS, IB et PE, avec leur traduction française.",
      },
      { property: 'og:title', content: 'Glossaire des acronymes — FinancePrep' },
      {
        property: 'og:description',
        content:
          "Tous les acronymes indispensables en TS, IB et PE, avec leur traduction française.",
      },
    ],
  }),
  component: GlossairePage,
});

function GlossairePage() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const filtered = acronymSections
    .map((s) => ({
      ...s,
      items: q
        ? s.items.filter((a) =>
            [a.abbr, a.english ?? '', a.french].some((v) =>
              v.toLowerCase().includes(q),
            ),
          )
        : s.items,
    }))
    .filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour
        </Link>

        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-medium text-blue-950 tracking-tight">
            Glossaire des acronymes
          </h1>
          <p className="text-sm text-slate-600">
            Tous les acronymes indispensables en TS / IB / PE.
          </p>
        </header>

        <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-5 sm:p-6 space-y-5">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un acronyme ou une traduction…"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-blue-100 bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Aucun résultat.</p>
          ) : (
            filtered.map((section) => (
              <div key={section.title} className="space-y-2">
                <h2 className="text-xs uppercase tracking-[0.18em] text-blue-700 font-medium">
                  {section.title}
                </h2>
                <ul className="divide-y divide-blue-50">
                  {section.items.map((a) => (
                    <li
                      key={a.abbr}
                      className="py-3 grid grid-cols-[minmax(90px,auto)_1fr] gap-x-4 gap-y-1 sm:grid-cols-[180px_1fr_1.2fr] sm:gap-x-6 items-baseline"
                    >
                      <span className="font-semibold text-blue-900 text-sm sm:text-base">
                        {a.abbr}
                      </span>
                      {a.english ? (
                        <>
                          <span className="text-slate-700 text-sm sm:text-base col-start-2">
                            {a.english}
                          </span>
                          <span className="text-slate-600 text-sm sm:text-base col-span-2 sm:col-span-1 sm:col-start-3">
                            {a.french}
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-600 text-sm sm:text-base col-start-2 sm:col-start-2 sm:col-span-2">
                          {a.french}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
