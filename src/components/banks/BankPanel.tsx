import { Link } from '@tanstack/react-router';
import { X } from 'lucide-react';
import type { BankProfile } from '@/data/bank-profiles';
import { getDealsForBank } from '@/data/bank-profiles';

type BankPanelProps = {
  bank: BankProfile;
  onClose: () => void;
};

export function BankPanel ({ bank, onClose }: BankPanelProps) {
  const deals = getDealsForBank(bank.name);

  return (
    <div
      className="mt-6 bg-white rounded-2xl border-2 border-blue-300 shadow-xl p-4 sm:p-8 relative animate-in fade-in slide-in-from-bottom-2 duration-300"
      role="region"
      aria-label={`Fiche ${bank.name}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 rounded-full border border-blue-200 text-blue-400 hover:text-blue-700 hover:bg-blue-50 flex items-center justify-center transition-all"
        aria-label="Fermer la fiche"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="mb-6 pr-10">
        <span className="text-xs uppercase tracking-[0.2em] text-blue-400">{bank.category}</span>
        <h3 className="text-2xl sm:text-3xl font-serif text-blue-950 mt-1">{bank.name}</h3>
        <p className="text-blue-600 text-sm font-light mt-1">{bank.hq}</p>
        <p className="text-blue-800 text-sm mt-2">{bank.tagline}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3">Divisions clés</h4>
          <ul className="space-y-1.5">
            {bank.divisions.map((d, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-blue-800">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3">Particularités</h4>
          <ul className="space-y-2">
            {bank.particularites.map((p, i) => (
              <li key={i} className="text-sm text-blue-800 font-light leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {bank.recrutement && (
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-2">Recrutement</h4>
          <p className="text-blue-700 text-sm font-light leading-relaxed">{bank.recrutement}</p>
        </div>
      )}

      {deals.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3">
            Deals récents (Actualité M&A)
          </h4>
          <ul className="space-y-2">
            {deals.map(d => (
              <li
                key={d.id}
                className="flex flex-wrap items-center justify-between gap-2 bg-blue-50 rounded-lg px-3 py-2.5 text-sm"
              >
                <span className="text-blue-900 font-medium">{d.title}</span>
                <span className="text-blue-500 text-xs">
                  {d.type} · {d.headlineEv}
                </span>
              </li>
            ))}
          </ul>
          <Link
            to="/actualite"
            className="inline-block mt-3 text-blue-600 text-xs hover:text-blue-900 underline underline-offset-2"
          >
            Voir tous les deals dans Actualité M&A
          </Link>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">
          Point clé pour l&apos;entretien
        </div>
        <p className="text-amber-900 text-sm font-light leading-relaxed">{bank.pointEntretien}</p>
      </div>
    </div>
  );
}
