import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, X } from "lucide-react";
import { BankLogo } from "@/components/banks/BankLogo";
import type { BankProfile } from "@/data/bank-profiles";
import { getDealsForBank } from "@/data/bank-profiles";
import { getDealById } from "@/data/ma-deals";
import { BankDealChip, SectorHubChip } from "@/components/deals/DealEntityChips";

type BankPanelProps = {
  bank: BankProfile;
  onClose: () => void;
};

export function BankPanel({ bank, onClose }: BankPanelProps) {
  const [showReponse, setShowReponse] = useState(false);

  const emblematicDealSearch =
    bank.emblematicLinkType === "bank"
      ? ({ bank: bank.id } as const)
      : bank.emblematicDealId
        ? ({ deal: bank.emblematicDealId } as const)
        : null;

  const deals = getDealsForBank(bank.name);
  const emblematicDeal =
    bank.emblematicDealId && bank.emblematicLinkType !== "bank"
      ? getDealById(bank.emblematicDealId)
      : undefined;

  useEffect(() => {
    setShowReponse(false);
  }, [bank.id]);

  return (
    <div
      key={bank.id}
      className="mt-3 bg-card rounded-2xl border-2 border-primary/30 shadow-card-elevated p-4 sm:p-8 relative animate-in fade-in slide-in-from-bottom-2 duration-300"
      role="region"
      aria-label={`Fiche ${bank.name}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 touch-target rounded-full border border-border text-muted-foreground hover:text-primary hover:bg-muted transition-all"
        aria-label="Fermer la fiche"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-4 mb-8 pr-10">
        <BankLogo bankId={bank.id} bankName={bank.name} size="lg" expandable />
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
            {bank.category}
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-foreground">{bank.name}</h3>
          <p className="text-muted-foreground text-sm font-light mt-1">{bank.hq}</p>
          <p className="text-foreground text-sm mt-1">{bank.tagline}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-4 bg-primary/70" />
              Divisions clés
            </div>
            <div className="space-y-1.5">
              {bank.divisions.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                  <span className="text-foreground text-sm">{d}</span>
                </div>
              ))}
            </div>
          </div>
          {bank.piegeAEviter && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
              <div className="text-destructive text-xs font-semibold uppercase tracking-wider mb-1">
                Piège à éviter
              </div>
              <p className="text-foreground text-sm font-light leading-relaxed">
                {bank.piegeAEviter}
              </p>
            </div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3 flex items-center gap-2">
            <div className="h-px w-4 bg-primary/70" />
            Particularités
          </div>
          <div className="space-y-2.5 mb-5">
            {bank.particularites.map((p, i) => (
              <div key={i} className="flex gap-3 bg-muted rounded-lg px-3 py-2.5">
                <div className="text-primary text-xs font-mono mt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span className="text-foreground text-sm font-light leading-relaxed">{p}</span>
              </div>
            ))}
          </div>
          {bank.recrutement && (
            <div>
              <div className="text-xs uppercase tracking-wider text-primary font-medium mb-2">
                Recrutement
              </div>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                {bank.recrutement}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-4 bg-primary/70" />
              Deal emblématique
            </div>
            {emblematicDealSearch ? (
              <Link
                to="/actualite"
                search={emblematicDealSearch}
                className="block bg-primary rounded-xl p-4 text-primary-foreground hover:brightness-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={
                  bank.emblematicLinkType === "bank"
                    ? `Voir tous les deals de ${bank.name} dans Actualité M&A`
                    : `Voir le deal ${bank.dealEmblematique.titre} dans Actualité M&A`
                }
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-sm mb-2">{bank.dealEmblematique.titre}</div>
                    <p className="text-primary-foreground/80 text-xs font-light leading-relaxed">
                      {bank.dealEmblematique.texte}
                    </p>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 text-primary-foreground/80 flex-shrink-0 mt-0.5"
                    aria-hidden
                  />
                </div>
              </Link>
            ) : (
              <div className="block bg-primary rounded-xl p-4 text-primary-foreground">
                <div className="font-serif text-sm mb-2">{bank.dealEmblematique.titre}</div>
                <p className="text-primary-foreground/80 text-xs font-light leading-relaxed">
                  {bank.dealEmblematique.texte}
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
            <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-4 bg-primary/70" />
              Question piège
            </div>
            <div className="bg-muted border border-border rounded-xl p-4 mb-2">
              <p className="text-foreground text-sm font-light italic">
                &ldquo;{bank.questionPiège}&rdquo;
              </p>
            </div>
            {!showReponse ? (
              <button
                type="button"
                onClick={() => setShowReponse(true)}
                className="w-full text-center text-primary text-xs underline underline-offset-2 hover:text-primary/80 transition-colors py-1"
              >
                Voir la réponse attendue
              </button>
            ) : (
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <div className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                  Réponse
                </div>
                <p className="text-foreground text-sm font-light leading-relaxed">
                  {bank.reponsePiège}
                </p>
                <button
                  type="button"
                  onClick={() => setShowReponse(false)}
                  className="text-primary text-xs underline mt-2"
                >
                  Masquer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-xs uppercase tracking-wider text-primary font-medium mb-3">
          Deals récents (Actualité M&A)
        </h4>
        {deals.length > 0 ? (
          <>
            <ul className="space-y-3">
              {deals.map((d) => (
                <li key={d.id} className="bg-muted rounded-lg px-3 py-3 text-sm">
                  <Link
                    to="/actualite"
                    search={{ deal: d.id }}
                    className="block hover:text-foreground transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="text-foreground font-medium">{d.title}</span>
                      <span className="text-primary text-xs">
                        {d.type} · {d.headlineEv}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs font-light leading-relaxed line-clamp-2">
                      {d.pointEntretien}
                    </p>
                  </Link>
                  {d.sectorId && (
                    <div className="mt-2">
                      <SectorHubChip sectorId={d.sectorId} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <Link
              to="/actualite"
              search={{ bank: bank.id }}
              className="inline-block mt-3 text-primary text-xs hover:text-primary/80 underline underline-offset-2"
            >
              Voir tous les deals de {bank.name} dans Actualité M&A
            </Link>
          </>
        ) : (
          <p className="text-muted-foreground text-sm font-light italic">
            Aucun deal récent référencé pour cette banque dans l&apos;actualité M&A — privilégier le
            deal emblématique ci-dessus.
          </p>
        )}
      </div>

      <div className="bg-muted border border-border rounded-xl p-4">
        <div className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
          Point clé pour l&apos;entretien
        </div>
        <p className="text-foreground text-sm font-light leading-relaxed">{bank.pointEntretien}</p>
      </div>
    </div>
  );
}
