import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { SectorId } from "@/lib/sectors";
import { SECTOR_DATA } from "@/data/sector-data";
import { getDealById } from "@/data/ma-deals";
import { BankDealChip } from "@/components/deals/DealEntityChips";

type SectorPanelContentProps = {
  sectorId: SectorId;
  highlightFlash?: boolean;
  /** Dans une modale : pas de bordure/ombre dupliquée, titre masqué si fourni par le shell. */
  embedded?: boolean;
};

export function SectorPanelContent({
  sectorId,
  highlightFlash = false,
  embedded = false,
}: SectorPanelContentProps) {
  const [showReponse, setShowReponse] = useState(false);
  const data = SECTOR_DATA[sectorId];
  const emblematicDeal = data.emblematicDealId ? getDealById(data.emblematicDealId) : undefined;
  const emblematicBanks = emblematicDeal?.banks.slice(0, 6) ?? [];

  useEffect(() => {
    setShowReponse(false);
  }, [sectorId]);

  if (!data) return null;

  const { Icon } = data;

  return (
    <div
      key={sectorId}
      className={`relative ${
        embedded
          ? `${highlightFlash ? "sector-focus-flash rounded-xl" : ""}`
          : `bg-card rounded-2xl border-2 border-primary/30 shadow-card-elevated p-4 sm:p-8 ${
              highlightFlash ? "sector-focus-flash" : ""
            }`
      }`}
      role="region"
      aria-label={`Fiche sectorielle ${data.name}`}
    >
      {!embedded && (
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <Icon className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
              {data.tag}
            </div>
            <h2 className="text-3xl font-serif text-foreground">{data.name}</h2>
          </div>
        </div>
      )}

      <section
        aria-label="Panorama du secteur"
        className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-muted to-muted/70 p-5 sm:p-6"
      >
        <div className="text-xs uppercase tracking-wider text-primary font-medium mb-4 flex items-center gap-2">
          <div className="h-px w-4 bg-primary" />
          Panorama — à connaître par cœur
        </div>
        <p className="text-xs text-muted-foreground font-light mb-4 -mt-2">
          Ordres de grandeur indicatifs (Dealogic, rapports sectoriels) — à citer en entretien, pas
          comme données temps réel.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-card/80 rounded-xl border border-border p-4">
            <div className="type-label text-primary mb-1">
              Taille du marché
            </div>
            <p className="text-foreground text-sm font-light leading-relaxed">
              {data.panorama.tailleMarche}
            </p>
          </div>
          <div className="bg-card/80 rounded-xl border border-border p-4">
            <div className="type-label text-primary mb-1">
              Volume M&A
            </div>
            <p className="text-foreground text-sm font-light leading-relaxed">
              {data.panorama.volumeMa}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <div className="type-label text-primary mb-2">
            Acteurs majeurs
          </div>
          <div className="flex flex-wrap gap-2">
            {data.panorama.acteursMajeurs.map((acteur, i) => (
              <span
                key={i}
                className="text-xs text-foreground bg-card border border-border rounded-full px-3 py-1.5 font-light"
              >
                {acteur}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="type-label text-primary mb-2">
            Segments clés
          </div>
          <div className="flex flex-wrap gap-2">
            {data.panorama.segmentsCles.map((seg, i) => (
              <span
                key={i}
                className="text-xs text-foreground bg-primary/10 border border-primary/20 rounded-md px-2.5 py-1 font-medium"
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
            <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-4 bg-primary/70" />
              KPIs clés
            </div>
            <div className="space-y-1.5">
              {data.kpis.map((kpi, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                  <span className="text-foreground text-sm">{kpi}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-4 bg-primary/70" />
              Multiples typiques
            </div>
            <div className="space-y-2">
              {data.multiples.map((m, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground text-xs font-light">{m.label}</span>
                  <span className="text-foreground text-xs font-semibold font-mono bg-muted px-2 py-0.5 rounded flex-shrink-0">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3 flex items-center gap-2">
            <div className="h-px w-4 bg-primary/70" />
            Dynamiques actuelles
          </div>
          <div className="space-y-2.5">
            {data.tendances.map((t, i) => (
              <div key={i} className="flex gap-3 bg-muted rounded-lg px-3 py-2.5">
                <div className="text-primary text-xs font-mono mt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span className="text-foreground text-sm font-light">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-4 bg-primary/70" />
              Deal emblématique
            </div>
            {data.emblematicDealId ? (
              <Link
                to="/actualite"
                search={{ deal: data.emblematicDealId }}
                className="block bg-primary rounded-xl p-4 text-primary-foreground hover:brightness-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Voir le deal ${data.deal.titre} dans Actualité M&A`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-sm mb-2">{data.deal.titre}</div>
                    <p className="text-primary-foreground/80 text-xs font-light leading-relaxed">
                      {data.deal.texte}
                    </p>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 text-primary-foreground/80 flex-shrink-0 mt-0.5"
                    aria-hidden
                  />
                </div>
              </Link>
            ) : (
              <div className="bg-primary rounded-xl p-4 text-primary-foreground">
                <div className="font-serif text-sm mb-2">{data.deal.titre}</div>
                <p className="text-primary-foreground/80 text-xs font-light leading-relaxed">
                  {data.deal.texte}
                </p>
              </div>
            )}
            <Link
              to="/actualite"
              search={{ sector: sectorId }}
              className="inline-block mt-3 text-primary text-xs hover:text-primary/80 underline underline-offset-2"
            >
              Voir tous les deals {data.name} dans Actualité M&A
            </Link>
            {emblematicBanks.length > 0 && (
              <div className="mt-3">
                <div className="text-xs uppercase tracking-wider text-primary font-medium mb-2">
                  Banques sur ce deal
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {emblematicBanks.map((b) => (
                    <BankDealChip key={b} name={b} />
                  ))}
                </div>
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
                &ldquo;{data.question}&rdquo;
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
                <p className="text-foreground text-sm font-light">{data.reponse}</p>
                <button
                  type="button"
                  onClick={() => setShowReponse(false)}
                  className="text-primary/80 text-xs underline mt-2"
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
