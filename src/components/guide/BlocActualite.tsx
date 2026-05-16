import { useState, type ReactNode } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { GuideChipButton, guideAlertClass, guideCardClass } from '@/components/guide/guide-ui';
import {
  dealDateBadge,
  dealMatchesBank,
  dealMatchesType,
  MA_DEAL_BANKS,
  MA_DEAL_TYPES,
  MA_DEALS,
  type MaDeal,
} from '@/data/ma-deals';

const typeColors: Record<string, string> = {
  'M&A': 'bg-blue-100 text-blue-700',
  LBO: 'bg-indigo-100 text-indigo-700',
  'Carve-out': 'bg-violet-100 text-violet-700',
  Restructuring: 'bg-orange-100 text-orange-700',
  OPA: 'bg-rose-100 text-rose-700',
  Cessions: 'bg-amber-100 text-amber-700',
  Tendance: 'bg-slate-200 text-slate-700',
};

const MAX_BANK_CHIPS = 4;

function DealSection ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="text-xs text-blue-400 uppercase tracking-wider font-medium mb-2">{title}</div>
      {children}
    </div>
  );
}

function AdvisorBlock ({ deal }: { deal: MaDeal }) {
  const { advisors } = deal;
  const hasAdvisors =
    (advisors.sellSide?.length ?? 0) > 0 ||
    (advisors.buySide?.length ?? 0) > 0 ||
    (advisors.other?.length ?? 0) > 0;

  if (!hasAdvisors) {
    return (
      <p className="text-blue-500 text-sm font-light italic">Advisors non confirmés publiquement.</p>
    );
  }

  return (
    <div className="space-y-3 text-sm">
      {advisors.sellSide && advisors.sellSide.length > 0 && (
        <div>
          <span className="text-blue-500 text-xs uppercase tracking-wider">Vendeur / débiteur</span>
          <ul className="mt-1 space-y-0.5 text-blue-800 font-light">
            {advisors.sellSide.map((a, i) => (
              <li key={i}>· {a}</li>
            ))}
          </ul>
        </div>
      )}
      {advisors.buySide && advisors.buySide.length > 0 && (
        <div>
          <span className="text-blue-500 text-xs uppercase tracking-wider">Acquéreur</span>
          <ul className="mt-1 space-y-0.5 text-blue-800 font-light">
            {advisors.buySide.map((a, i) => (
              <li key={i}>· {a}</li>
            ))}
          </ul>
        </div>
      )}
      {advisors.other?.map((group, i) => (
        <div key={i}>
          <span className="text-blue-500 text-xs uppercase tracking-wider">{group.label}</span>
          <ul className="mt-1 space-y-0.5 text-blue-800 font-light">
            {group.banks.map((b, j) => (
              <li key={j}>· {b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function DealDetail ({ deal }: { deal: MaDeal }) {
  const isTrend = deal.kind === 'trend';

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

      <DealSection title={isTrend ? 'Panorama' : 'Parties'}>
        <div className="space-y-3">
          {deal.parties.map((p, i) => (
            <div key={i}>
              <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">{p.label}</span>
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
          <p className="text-blue-700 text-sm font-light leading-relaxed">{deal.contexte}</p>
        </DealSection>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">
          Point clé pour l&apos;entretien
        </div>
        <p className="text-amber-900 text-sm font-light leading-relaxed">{deal.pointEntretien}</p>
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

export function BlocActualite () {
  const [filterBanque, setFilterBanque] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [openDeal, setOpenDeal] = useState<string | null>(null);

  const filtered = MA_DEALS.filter(
    d =>
      (filterBanque === 'all' || dealMatchesBank(d, filterBanque)) &&
      (filterType === 'all' || dealMatchesType(d, filterType)),
  );

  return (
    <>
      <div className={`${guideAlertClass} mb-6 space-y-3`}>
        <p>
          Dernière mise à jour : 2025-2026. Citer un deal récent avec la banque cible est un signal fort
          d&apos;intérêt réel. Sources : Financial Times, Bloomberg, Mergermarket.
        </p>
        <div className="text-sm text-blue-800 font-light border-t border-blue-200/60 pt-3">
          <p className="font-medium text-blue-900 mb-1">Rothschild & Co vs Edmond de Rothschild</p>
          <p>
            <strong>Rothschild & Co</strong> = advisory M&A et restructuring (Paris/Londres).{' '}
            <strong>Edmond de Rothschild</strong> = banque privée et asset management (Genève). Deux entités
            totalement séparées — en contexte M&A, « Rothschild » = toujours Rothschild & Co.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-medium mb-2">Banque conseil</p>
          <div className="flex flex-wrap gap-1.5">
            {MA_DEAL_BANKS.map(b => (
              <GuideChipButton key={b} active={filterBanque === b} onClick={() => setFilterBanque(b)} size="sm">
                {b === 'all' ? 'Toutes' : b}
              </GuideChipButton>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-medium mb-2">Type de deal</p>
          <div className="flex flex-wrap gap-1.5">
            {MA_DEAL_TYPES.map(t => (
              <GuideChipButton key={t} active={filterType === t} onClick={() => setFilterType(t)} size="sm">
                {t === 'all' ? 'Tous' : t}
              </GuideChipButton>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(deal => {
          const isOpen = openDeal === deal.id;
          const visibleBanks = deal.banks.slice(0, MAX_BANK_CHIPS);
          const extraBanks = deal.banks.length - MAX_BANK_CHIPS;

          return (
            <div key={deal.id} className={`${guideCardClass} overflow-hidden`}>
              <button
                type="button"
                onClick={() => setOpenDeal(isOpen ? null : deal.id)}
                aria-expanded={isOpen}
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">
                      {dealDateBadge(deal.dates)}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${typeColors[deal.type] || 'bg-slate-100 text-slate-600'}`}
                    >
                      {deal.type}
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">{deal.secteur}</span>
                  </div>
                  <div className="font-serif text-blue-950 text-base">{deal.title}</div>
                  <div className="text-blue-400 text-xs mt-1 flex flex-wrap items-center gap-1">
                    <span>{deal.headlineEv}</span>
                    {visibleBanks.length > 0 && (
                      <>
                        <span>·</span>
                        {visibleBanks.map(b => (
                          <span
                            key={b}
                            className="inline-block bg-blue-50 border border-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded"
                          >
                            {b}
                          </span>
                        ))}
                        {extraBanks > 0 && (
                          <span className="text-blue-400 text-xs">+{extraBanks}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-blue-300 flex-shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-90' : ''}`}
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
          <div className="text-center py-8 text-blue-300 italic text-sm">Aucun deal pour ces filtres.</div>
        )}
      </div>
    </>
  );
}
