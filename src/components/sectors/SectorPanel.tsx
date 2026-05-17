import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronRight, X } from 'lucide-react';
import type { SectorId } from '@/lib/sectors';
import { SECTOR_DATA } from '@/data/sector-data';

type SectorPanelProps = {
  sectorId: SectorId;
  onClose: () => void;
  highlighted?: boolean;
};

export function SectorPanel ({ sectorId, onClose, highlighted = false }: SectorPanelProps) {
  const [showReponse, setShowReponse] = useState(false);
  const data = SECTOR_DATA[sectorId];

  useEffect(() => {
    setShowReponse(false);
  }, [sectorId]);

  if (!data) return null;

  const { Icon } = data;

  return (
    <div
      key={sectorId}
      className={`mt-6 bg-white rounded-2xl border-2 shadow-xl p-4 sm:p-8 relative animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        highlighted ? 'border-blue-400 ring-2 ring-blue-200' : 'border-blue-300'
      }`}
      role="region"
      aria-label={`Fiche sectorielle ${data.name}`}
      aria-live="polite"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 rounded-full border border-blue-200 text-blue-400 hover:text-blue-700 hover:bg-blue-50 flex items-center justify-center transition-all"
        aria-label="Fermer la fiche"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-4 mb-8 pr-10">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-1">{data.tag}</div>
          <h3 className="text-3xl font-serif text-blue-950">{data.name}</h3>
        </div>
      </div>

      <section
        aria-label="Panorama du secteur"
        className="mb-8 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/80 p-5 sm:p-6"
      >
        <div className="text-xs uppercase tracking-wider text-blue-600 font-medium mb-4 flex items-center gap-2">
          <div className="h-px w-4 bg-blue-500" />
          Panorama — à connaître par cœur
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-white/80 rounded-xl border border-blue-100 p-4">
            <div className="text-[11px] uppercase tracking-wider text-blue-500 font-medium mb-1">Taille du marché</div>
            <p className="text-blue-950 text-sm font-light leading-relaxed">{data.panorama.tailleMarche}</p>
          </div>
          <div className="bg-white/80 rounded-xl border border-blue-100 p-4">
            <div className="text-[11px] uppercase tracking-wider text-blue-500 font-medium mb-1">Volume M&A</div>
            <p className="text-blue-950 text-sm font-light leading-relaxed">{data.panorama.volumeMa}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-[11px] uppercase tracking-wider text-blue-500 font-medium mb-2">Acteurs majeurs</div>
          <div className="flex flex-wrap gap-2">
            {data.panorama.acteursMajeurs.map((acteur, i) => (
              <span
                key={i}
                className="text-xs text-blue-900 bg-white border border-blue-200 rounded-full px-3 py-1.5 font-light"
              >
                {acteur}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-blue-500 font-medium mb-2">Segments clés</div>
          <div className="flex flex-wrap gap-2">
            {data.panorama.segmentsCles.map((seg, i) => (
              <span
                key={i}
                className="text-xs text-indigo-900 bg-indigo-50 border border-indigo-200 rounded-md px-2.5 py-1 font-medium"
              >
                {seg}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-4 bg-blue-400" />
              KPIs clés
            </div>
            <div className="space-y-1.5">
              {data.kpis.map((kpi, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-blue-800 text-sm">{kpi}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-4 bg-blue-400" />
              Multiples typiques
            </div>
            <div className="space-y-2">
              {data.multiples.map((m, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <span className="text-blue-700 text-xs font-light">{m.label}</span>
                  <span className="text-blue-950 text-xs font-semibold font-mono bg-blue-50 px-2 py-0.5 rounded flex-shrink-0">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3 flex items-center gap-2">
            <div className="h-px w-4 bg-blue-400" />
            Dynamiques actuelles
          </div>
          <div className="space-y-2.5">
            {data.tendances.map((t, i) => (
              <div key={i} className="flex gap-3 bg-blue-50 rounded-lg px-3 py-2.5">
                <div className="text-blue-400 text-xs font-mono mt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <span className="text-blue-800 text-sm font-light">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-4 bg-blue-400" />
              Deal emblématique
            </div>
            {data.emblematicDealId ? (
              <Link
                to="/actualite"
                search={{ deal: data.emblematicDealId }}
                className="block bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl p-4 text-white hover:brightness-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                aria-label={`Voir le deal ${data.deal.titre} dans Actualité M&A`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-sm mb-2">{data.deal.titre}</div>
                    <p className="text-blue-200 text-xs font-light leading-relaxed">{data.deal.texte}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" aria-hidden />
                </div>
              </Link>
            ) : (
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl p-4 text-white">
                <div className="font-serif text-sm mb-2">{data.deal.titre}</div>
                <p className="text-blue-200 text-xs font-light leading-relaxed">{data.deal.texte}</p>
              </div>
            )}
            <Link
              to="/actualite"
              search={{ sector: sectorId }}
              className="inline-block mt-3 text-blue-600 text-xs hover:text-blue-900 underline underline-offset-2"
            >
              Voir tous les deals {data.name} dans Actualité M&A
            </Link>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-4 bg-blue-400" />
              Question piège
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-2">
              <p className="text-amber-900 text-sm font-light italic">&ldquo;{data.question}&rdquo;</p>
            </div>
            {!showReponse ? (
              <button
                type="button"
                onClick={() => setShowReponse(true)}
                className="w-full text-center text-blue-600 text-xs underline underline-offset-2 hover:text-blue-900 transition-colors py-1"
              >
                Voir la réponse attendue
              </button>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">Réponse</div>
                <p className="text-emerald-900 text-sm font-light">{data.reponse}</p>
                <button
                  type="button"
                  onClick={() => setShowReponse(false)}
                  className="text-emerald-500 text-xs underline mt-2"
                >
                  Masquer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
