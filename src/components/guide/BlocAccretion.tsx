import { useState } from 'react';
import { GuideSectionTitle } from '@/components/guide/guide-ui';

export function BlocAccretion () {
  const [peAcq, setPeAcq] = useState(20);
  const [peTgt, setPeTgt] = useState(15);

  const verdict = peAcq > peTgt ? 'accretif' : peAcq < peTgt ? 'dilutif' : 'neutre';

  const regles = [
    { label: 'Paiement 100% cash', texte: 'Toujours accretif si le rendement des bénéfices de la cible (1/P/E cible) dépasse le coût après impôt de la dette.' },
    { label: "Échange d'actions pur", texte: "Accretif ssi P/E acquéreur > P/E cible. La règle la plus testée en entretien M&A." },
    { label: 'Mix cash + actions', texte: 'Analyser la contribution marginale de chaque tranche. Le cash est moins dilutif que les actions si le coût de dette est bas.' },
    { label: 'Goodwill & PPA', texte: "L'amortissement des intangibles (Purchase Price Allocation) pèse sur l'EPS comptable mais pas sur le cash. Préciser la différence GAAP vs cash EPS." },
    { label: 'Synergies', texte: 'Un deal dilutif peut devenir accretif si les synergies sont suffisantes. Toujours demander : "accretif avec ou sans synergies ?"' },
  ];

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-700 rounded-r-xl p-5">
          <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded inline-block mb-3">ACCRETIF</div>
          <p className="text-blue-900 text-sm mb-2">Le deal augmente l&apos;EPS de l&apos;acquéreur post-acquisition.</p>
          <p className="text-blue-700 text-sm font-mono">EPS pro forma &gt; EPS actuel</p>
          <p className="text-blue-500 text-xs mt-2">Condition (échange d&apos;actions) : P/E acquéreur &gt; P/E cible</p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-5">
          <div className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded inline-block mb-3">DILUTIF</div>
          <p className="text-red-900 text-sm mb-2">Le deal diminue l&apos;EPS de l&apos;acquéreur post-acquisition.</p>
          <p className="text-red-700 text-sm font-mono">EPS pro forma &lt; EPS actuel</p>
          <p className="text-red-400 text-xs mt-2">Condition (échange d&apos;actions) : P/E acquéreur &lt; P/E cible</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <div className="text-blue-400 text-xs uppercase tracking-[0.2em] mb-4">Formule complète</div>
        <div className="font-mono text-sm leading-loose">
          <div className="text-white">EPS pro forma =</div>
          <div className="text-blue-300 pl-4">(Net Income acquéreur + Net Income cible + Synergies après impôt − Coût financement)</div>
          <div className="text-white pl-4">÷</div>
          <div className="text-blue-300 pl-4">(Shares outstanding acquéreur + Nouvelles actions émises)</div>
          <div className="mt-3 text-emerald-400">Accretif si : EPS pro forma &gt; EPS pré-deal acquéreur</div>
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle className="mb-1">Simulateur — échange d&apos;actions pur</GuideSectionTitle>
        <p className="text-blue-400 text-xs italic mb-5">Bougez les curseurs pour voir l&apos;impact immédiat</p>

        <div className="space-y-4 mb-6">
          {[
            { label: 'P/E Acquéreur', val: peAcq, set: setPeAcq },
            { label: 'P/E Cible', val: peTgt, set: setPeTgt },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="text-blue-700 text-sm w-36 flex-shrink-0">{s.label}</span>
              <input
                type="range"
                min="8"
                max="40"
                step="1"
                value={s.val}
                onChange={e => s.set(+e.target.value)}
                className="flex-1 accent-blue-700"
              />
              <span className="text-blue-950 font-semibold text-sm w-10 text-right">{s.val}x</span>
            </div>
          ))}
        </div>

        <div
          className={`rounded-xl p-4 border-2 flex items-center justify-between gap-4 transition-all ${
            verdict === 'accretif'
              ? 'bg-blue-50 border-blue-300'
              : verdict === 'dilutif'
                ? 'bg-red-50 border-red-300'
                : 'bg-slate-50 border-slate-200'
          }`}
        >
          <span className="text-sm text-slate-600">Verdict</span>
          <div className="flex items-center gap-3">
            <span
              className={`text-xl font-serif font-medium ${
                verdict === 'accretif' ? 'text-blue-800' : verdict === 'dilutif' ? 'text-red-700' : 'text-slate-600'
              }`}
            >
              {verdict === 'accretif' ? '✅ Accretif' : verdict === 'dilutif' ? '❌ Dilutif' : '➖ Neutre'}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                verdict === 'accretif'
                  ? 'bg-blue-100 text-blue-700'
                  : verdict === 'dilutif'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-slate-100 text-slate-500'
              }`}
            >
              {verdict === 'accretif'
                ? 'P/E acq > P/E cible'
                : verdict === 'dilutif'
                  ? 'P/E acq < P/E cible'
                  : 'P/E acq = P/E cible'}
            </span>
          </div>
        </div>
      </div>

      <div>
        <GuideSectionTitle>À sortir en entretien</GuideSectionTitle>
        <div className="space-y-2">
          {regles.map(r => (
            <div key={r.label} className="flex gap-3">
              <span className="bg-blue-100 text-blue-700 text-xs font-mono px-2 py-0.5 rounded flex-shrink-0 mt-0.5 h-fit">→</span>
              <div>
                <span className="text-blue-950 text-sm font-medium">{r.label} : </span>
                <span className="text-blue-700 text-sm font-light">{r.texte}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
