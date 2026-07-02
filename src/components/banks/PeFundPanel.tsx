import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, X } from "lucide-react";
import { PeFundLogo } from "@/components/banks/PeFundLogo";
import type { PeFundProfile } from "@/data/pe-fund-profiles";
import { getDealById } from "@/data/ma-deals";
import { SectorHubChip } from "@/components/deals/DealEntityChips";

type PeFundPanelProps = {
  fund: PeFundProfile;
  onClose: () => void;
};

export function PeFundPanel({ fund, onClose }: PeFundPanelProps) {
  const [showReponse, setShowReponse] = useState(false);
  const emblematicDeal = fund.emblematicDealId ? getDealById(fund.emblematicDealId) : undefined;

  useEffect(() => {
    setShowReponse(false);
  }, [fund.id]);

  return (
    <div
      key={fund.id}
      className="mt-3 bg-white rounded-2xl border-2 border-blue-300 shadow-card-elevated p-4 sm:p-8 relative animate-in fade-in slide-in-from-bottom-2 duration-300"
      role="region"
      aria-label={`Fiche ${fund.name}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 touch-target rounded-full border border-blue-200 text-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-all"
        aria-label="Fermer la fiche"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-4 mb-8 pr-10">
        <PeFundLogo fundId={fund.id} fundName={fund.name} size="lg" expandable />
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-1">Fonds PE</div>
          <h3 className="text-2xl sm:text-3xl font-serif text-blue-950">{fund.name}</h3>
          <p className="text-blue-600 text-sm font-light mt-1">{fund.hq}</p>
          <p className="text-blue-800 text-sm mt-1">
            AUM {fund.aum} · Ticket {fund.ticketTypique}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3 flex items-center gap-2">
            <div className="h-px w-4 bg-blue-400" />
            Stratégies
          </div>
          <div className="space-y-1.5">
            {fund.strategies.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="text-blue-800 text-sm">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3 flex items-center gap-2">
            <div className="h-px w-4 bg-blue-400" />
            Particularités
          </div>
          <div className="space-y-2.5 mb-5">
            {fund.particularites.map((p, i) => (
              <div key={i} className="flex gap-3 bg-blue-50 rounded-lg px-3 py-2.5">
                <div className="text-blue-400 text-xs font-mono mt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span className="text-blue-800 text-sm font-light leading-relaxed">{p}</span>
              </div>
            ))}
          </div>
          {fund.recrutement && (
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-2">
                Recrutement
              </div>
              <p className="text-blue-700 text-sm font-light leading-relaxed">{fund.recrutement}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3 flex items-center gap-2">
            <div className="h-px w-4 bg-blue-400" />
            Deal emblématique
          </div>
          {fund.emblematicDealId ? (
            <Link
              to="/actualite"
              search={{ deal: fund.emblematicDealId }}
              className="block bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl p-4 text-white hover:brightness-110 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-sm mb-2">{fund.dealEmblematique.titre}</div>
                  <p className="text-blue-200 text-xs font-light leading-relaxed">
                    {fund.dealEmblematique.texte}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-300 flex-shrink-0" aria-hidden />
              </div>
            </Link>
          ) : (
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl p-4 text-white">
              <div className="font-serif text-sm mb-2">{fund.dealEmblematique.titre}</div>
              <p className="text-blue-200 text-xs font-light leading-relaxed">
                {fund.dealEmblematique.texte}
              </p>
            </div>
          )}
          {emblematicDeal?.sectorId && (
            <div className="mt-2">
              <SectorHubChip sectorId={emblematicDeal.sectorId} />
            </div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-blue-500 font-medium mb-3 flex items-center gap-2">
            <div className="h-px w-4 bg-blue-400" />
            Question piège
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-2">
            <p className="text-amber-900 text-sm font-light italic">
              &ldquo;{fund.questionPiège}&rdquo;
            </p>
          </div>
          {!showReponse ? (
            <button
              type="button"
              onClick={() => setShowReponse(true)}
              className="w-full text-center text-blue-600 text-xs underline underline-offset-2 hover:text-blue-900 py-1"
            >
              Voir la réponse attendue
            </button>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-emerald-900 text-sm font-light leading-relaxed">
                {fund.reponsePiège}
              </p>
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

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">
          Point clé pour l&apos;entretien
        </div>
        <p className="text-amber-900 text-sm font-light leading-relaxed">{fund.pointEntretien}</p>
      </div>
    </div>
  );
}
