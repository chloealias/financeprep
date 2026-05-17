import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ExternalLink } from "lucide-react";
import {
  GuideChipButton,
  GuideSelect,
  guideAlertClass,
  guideCardClass,
} from "@/components/guide/guide-ui";
import { BankDealChip, SectorDealChip, AdvisorBankName } from "@/components/deals/DealEntityChips";
import { getBankById } from "@/data/bank-profiles";
import { getSectorLabel } from "@/lib/sector-deals";
import { DealRefText } from "@/lib/linkify-deal-refs";
import type { SectorId } from "@/lib/sectors";
import {
  dealDateBadge,
  dealMatchesBank,
  dealMatchesSector,
  dealMatchesType,
  MA_DEAL_BANKS,
  MA_DEAL_SECTOR_IDS,
  MA_DEAL_TYPES,
  getDealById,
  MA_DEALS,
  type MaDeal,
} from "@/data/ma-deals";
import { Route } from "@/routes/actualite";

const typeColors: Record<string, string> = {
  "M&A": "bg-blue-100 text-blue-700",
  LBO: "bg-indigo-100 text-indigo-700",
  "Carve-out": "bg-violet-100 text-violet-700",
  Restructuring: "bg-orange-100 text-orange-700",
  OPA: "bg-rose-100 text-rose-700",
  Cessions: "bg-amber-100 text-amber-700",
  Tendance: "bg-slate-200 text-slate-700",
};

const MAX_BANK_CHIPS = 4;

function DealSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-xs text-blue-400 uppercase tracking-wider font-medium mb-2">{title}</div>
      {children}
    </div>
  );
}

function AdvisorBlock({ deal }: { deal: MaDeal }) {
  const { advisors } = deal;
  const hasAdvisors =
    (advisors.sellSide?.length ?? 0) > 0 ||
    (advisors.buySide?.length ?? 0) > 0 ||
    (advisors.other?.length ?? 0) > 0;

  if (!hasAdvisors) {
    return (
      <p className="text-blue-500 text-sm font-light italic">
        Advisors non confirmés publiquement.
      </p>
    );
  }

  return (
    <div className="space-y-3 text-sm">
      {advisors.sellSide && advisors.sellSide.length > 0 && (
        <div>
          <span className="text-blue-500 text-xs uppercase tracking-wider">Vendeur / débiteur</span>
          <ul className="mt-1 space-y-0.5 text-blue-800 font-light">
            {advisors.sellSide.map((a, i) => (
              <li key={i}>
                · <AdvisorBankName name={a} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {advisors.buySide && advisors.buySide.length > 0 && (
        <div>
          <span className="text-blue-500 text-xs uppercase tracking-wider">Acquéreur</span>
          <ul className="mt-1 space-y-0.5 text-blue-800 font-light">
            {advisors.buySide.map((a, i) => (
              <li key={i}>
                · <AdvisorBankName name={a} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {advisors.other?.map((group, i) => (
        <div key={i}>
          <span className="text-blue-500 text-xs uppercase tracking-wider">{group.label}</span>
          <ul className="mt-1 space-y-0.5 text-blue-800 font-light">
            {group.banks.map((b, j) => (
              <li key={j}>
                · <AdvisorBankName name={b} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function DealDetail({ deal }: { deal: MaDeal }) {
  const isTrend = deal.kind === "trend";

  return (
    <div className="mt-4 space-y-5">
      <p className="text-blue-600 text-xs font-light">{deal.dates}</p>

      {!isTrend && deal.valorisation && deal.valorisation.length > 0 && (
        <DealSection title="Valorisation">
          <div className="space-y-1.5">
            {deal.valorisation.map((v, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-blue-500 w-36 flex-shrink-0 font-light">{v.label}</span>
                <span className="text-blue-900 font-medium">{v.value}</span>
              </div>
            ))}
          </div>
          {deal.financing && (
            <p className="mt-3 text-blue-700 text-sm font-light leading-relaxed border-l-2 border-blue-200 pl-3">
              {deal.financing}
            </p>
          )}
        </DealSection>
      )}

      <DealSection title={isTrend ? "Panorama" : "Parties"}>
        <div className="space-y-3">
          {deal.parties.map((p, i) => (
            <div key={i}>
              <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
                {p.label}
              </span>
              <p className="text-blue-800 text-sm font-light mt-0.5 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </DealSection>

      {!isTrend && (
        <DealSection title="Advisors">
          <AdvisorBlock deal={deal} />
        </DealSection>
      )}

      <DealSection title="Intérêts des parties">
        <div className="grid md:grid-cols-2 gap-3">
          {deal.interests.map((item, i) => (
            <div key={i} className="bg-blue-50/80 rounded-lg px-3 py-2.5">
              <div className="text-blue-600 text-xs font-semibold mb-1">{item.side}</div>
              <p className="text-blue-800 text-sm font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </DealSection>

      {deal.contexte && (
        <DealSection title="Contexte">
          <p className="text-blue-700 text-sm font-light leading-relaxed">
            <DealRefText text={deal.contexte} />
          </p>
        </DealSection>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">
          Point clé pour l&apos;entretien
        </div>
        <p className="text-amber-900 text-sm font-light leading-relaxed">
          <DealRefText text={deal.pointEntretien} />
        </p>
      </div>

      {deal.ftUrl && (
        <a
          href={deal.ftUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-600 text-xs hover:text-blue-900 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Lire dans le Financial Times
        </a>
      )}
    </div>
  );
}

function dealPassesFilters(
  deal: MaDeal,
  filterBanque: string,
  filterType: string,
  filterSector: string,
): boolean {
  return (
    (filterBanque === "all" || dealMatchesBank(deal, filterBanque)) &&
    (filterType === "all" || dealMatchesType(deal, filterType)) &&
    (filterSector === "all" || (deal.sectorId && dealMatchesSector(deal, filterSector as SectorId)))
  );
}

export function BlocActualite() {
  const { deal: dealFromUrl, bank: bankFromUrl, sector: sectorFromUrl } = Route.useSearch();
  const navigate = Route.useNavigate();
  const bankFromUrlProfile = bankFromUrl ? getBankById(bankFromUrl) : undefined;
  const [filterBanque, setFilterBanque] = useState(() => bankFromUrlProfile?.name ?? "all");
  const [filterType, setFilterType] = useState("all");
  const [filterSector, setFilterSector] = useState(() => sectorFromUrl ?? "all");
  const openDeal = dealFromUrl ?? null;

  useEffect(() => {
    if (bankFromUrlProfile) {
      setFilterBanque(bankFromUrlProfile.name);
    }
  }, [bankFromUrl, bankFromUrlProfile?.name]);

  useEffect(() => {
    if (sectorFromUrl) {
      setFilterSector(sectorFromUrl);
    }
  }, [sectorFromUrl]);

  useEffect(() => {
    if (!dealFromUrl) return;
    if (getDealById(dealFromUrl)) {
      setFilterType("all");
      if (!bankFromUrl) setFilterBanque("all");
      if (!sectorFromUrl) setFilterSector("all");
    }
  }, [dealFromUrl, bankFromUrl, sectorFromUrl]);

  const setBankFilter = (bankName: string) => {
    const bankId = bankName === "all" ? undefined : getBankIdByName(bankName);
    setFilterBanque(bankName);
    navigate({
      search: (prev) => ({
        deal: prev.deal,
        bank: bankId,
        sector: prev.sector,
      }),
    });
  };

  const setSectorFilter = (sectorId: string) => {
    setFilterSector(sectorId);
    navigate({
      search: (prev) => ({
        deal: prev.deal,
        bank: prev.bank,
        sector: sectorId === "all" ? undefined : (sectorId as SectorId),
      }),
    });
  };

  const filtered = useMemo(
    () => MA_DEALS.filter((d) => dealPassesFilters(d, filterBanque, filterType, filterSector)),
    [filterBanque, filterType, filterSector],
  );

  useEffect(() => {
    if (!openDeal || !filtered.some((d) => d.id === openDeal)) return;
    const timer = window.setTimeout(() => {
      const el = document.getElementById(`deal-card-${openDeal}`);
      if (!el) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [openDeal, filtered]);

  const toggleDeal = (id: string) => {
    if (openDeal === id) {
      navigate({ search: (prev) => ({ deal: undefined, bank: prev.bank, sector: prev.sector }) });
    } else {
      navigate({ search: (prev) => ({ deal: id, bank: prev.bank, sector: prev.sector }) });
    }
  };

  return (
    <>
      <div className={`${guideAlertClass} mb-6`}>
        <p>
          Dernière mise à jour : 2025-2026. Citer un deal récent avec la banque cible est un signal
          fort d&apos;intérêt réel. Sources : Financial Times, Bloomberg, Mergermarket.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <GuideSelect
            id="actualite-filter-bank"
            label="Banque conseil"
            value={filterBanque}
            onChange={setBankFilter}
            options={MA_DEAL_BANKS.map((b) => ({
              value: b,
              label: b === "all" ? "Toutes les banques" : b,
            }))}
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-medium mb-2">
              Type de deal
            </p>
            <div className="flex flex-wrap gap-1.5">
              {MA_DEAL_TYPES.map((t) => (
                <GuideChipButton
                  key={t}
                  active={filterType === t}
                  onClick={() => setFilterType(t)}
                  size="sm"
                >
                  {t === "all" ? "Tous" : t}
                </GuideChipButton>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-medium mb-2">
            Secteur
          </p>
          <div className="flex flex-wrap gap-1.5">
            {MA_DEAL_SECTOR_IDS.map((s) => (
              <GuideChipButton
                key={s}
                active={filterSector === s}
                onClick={() => setSectorFilter(s)}
                size="sm"
              >
                {s === "all" ? "Tous" : getSectorLabel(s)}
              </GuideChipButton>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((deal) => {
          const isOpen = openDeal === deal.id;
          const isDeepLinked = dealFromUrl === deal.id;
          const visibleBanks = deal.banks.slice(0, MAX_BANK_CHIPS);
          const extraBanks = deal.banks.length - MAX_BANK_CHIPS;

          return (
            <div
              key={deal.id}
              id={`deal-card-${deal.id}`}
              className={`${guideCardClass} overflow-hidden scroll-mt-24 ${
                isOpen && isDeepLinked ? "border-blue-400 ring-2 ring-blue-200" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggleDeal(deal.id)}
                aria-expanded={isOpen}
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">
                      {dealDateBadge(deal.dates)}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${typeColors[deal.type] || "bg-slate-100 text-slate-600"}`}
                    >
                      {deal.type}
                    </span>
                    <SectorDealChip secteur={deal.secteur} />
                  </div>
                  <div className="font-serif text-blue-950 text-base">{deal.title}</div>
                  <div className="text-blue-400 text-xs mt-1 flex flex-wrap items-center gap-1">
                    <span>{deal.headlineEv}</span>
                    {visibleBanks.length > 0 && (
                      <>
                        <span>·</span>
                        {visibleBanks.map((b) => (
                          <BankDealChip key={b} name={b} />
                        ))}
                        {extraBanks > 0 && (
                          <span className="text-blue-400 text-xs">+{extraBanks}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-blue-300 flex-shrink-0 mt-1 transition-transform ${isOpen ? "rotate-90" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-blue-50">
                  <DealDetail deal={deal} />
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-blue-300 italic text-sm">
            Aucun deal pour ces filtres.
          </div>
        )}
      </div>
    </>
  );
}
