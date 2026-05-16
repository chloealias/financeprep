import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { GuideChipButton, GuideSectionTitle, guideAlertClass, guideCardClass } from '@/components/guide/guide-ui';

type DealType = 'M&A' | 'ECM' | 'DCM' | 'LBO' | 'Restructuring';

type Deal = {
  id: string;
  date: string;
  cible: string;
  acquéreur: string;
  ev: string;
  vendeur: string[];
  acheteur: string[];
  type: DealType;
  secteur: string;
  multiple: string;
  logique: string;
  tip: string;
};

export function BlocActualite () {
  const [filterBanque, setFilterBanque] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [openDeal, setOpenDeal] = useState<string | null>(null);

  const deals: Deal[] = [
    { id: 'd1', date: 'Jan 2025', cible: 'Sanofi — cession Opella (Doliprane)', acquéreur: 'CD&R', ev: '15,6 Md€', vendeur: ['Morgan Stanley', 'Goldman Sachs'], acheteur: ['BNP Paribas'], type: 'M&A', secteur: 'Santé', multiple: '~14x EBITDA', logique: 'Recentrage de Sanofi sur les produits à forte valeur ajoutée (biotech). Cession de la division consumer healthcare avec marques iconiques (Doliprane, Fervex).', tip: 'Deal très médiatisé en France — enjeu souveraineté sanitaire. Montrer que vous comprenez pourquoi Sanofi cède malgré les critiques politiques.' },
    { id: 'd2', date: 'Fév 2025', cible: 'Altice France (restructuration dette)', acquéreur: '—', ev: '24 Md€ de dette', vendeur: ['Lazard'], acheteur: ['Rothschild'], type: 'Restructuring', secteur: 'TMT', multiple: 'N/A', logique: 'Altice France sous pression de créanciers suite à surendettement post-acquisitions. Lazard côté débiteur, Rothschild côté créanciers seniors.', tip: "Cas d'école LBO qui tourne mal. Comprendre la structure de capital (tranches de dette) et le rôle distinct des conseils débiteur vs créanciers." },
    { id: 'd3', date: 'T1 2025', cible: 'Mace (construction UK)', acquéreur: 'Vinci', ev: '~1,2 Md£', vendeur: ['Goldman Sachs'], acheteur: ['JPMorgan'], type: 'M&A', secteur: 'Industrie', multiple: '~9x EBITDA', logique: 'Expansion de Vinci au Royaume-Uni dans la construction et la gestion de projets complexes. Synergies géographiques et de compétences.', tip: 'Montrer votre connaissance du secteur construction en Europe et de la stratégie de croissance externe de Vinci.' },
    { id: 'd4', date: 'T2 2025', cible: 'Lineage Logistics (IPO NYSE)', acquéreur: '— IPO', ev: '18 Md$', vendeur: ['Morgan Stanley', 'Goldman Sachs', 'JPMorgan'], acheteur: [], type: 'ECM', secteur: 'Immobilier', multiple: 'N/A', logique: "Plus grande IPO mondiale de l'année. REIT spécialisé dans l'entreposage frigorifique. Forte demande logistique chaîne du froid.", tip: 'Connaître le process IPO, le rôle des bookrunners, et les spécificités de valorisation des REITs (FFO vs EBITDA).' },
    { id: 'd5', date: 'T3 2025', cible: 'Worldline (cession actifs)', acquéreur: 'Divers', ev: '~2,5 Md€', vendeur: ['Rothschild', 'Société Générale'], acheteur: ['BNP Paribas'], type: 'M&A', secteur: 'TMT', multiple: '~8x EBITDA', logique: "Worldline sous pression suite à profit warnings répétés. Cession d'actifs non-core pour désendetter et recentrer.", tip: 'Cas typique de refocusing stratégique sous pression marché. Comprendre le lien entre cours de bourse et décisions M&A défensives.' },
  ];

  const banques = ['all', 'Goldman Sachs', 'Morgan Stanley', 'JPMorgan', 'Lazard', 'Rothschild', 'BNP Paribas', 'Société Générale'];
  const types = ['all', 'M&A', 'ECM', 'DCM', 'LBO', 'Restructuring'];

  const typeColors: Record<string, string> = {
    'M&A': 'bg-blue-100 text-blue-700',
    ECM: 'bg-purple-100 text-purple-700',
    DCM: 'bg-emerald-100 text-emerald-700',
    LBO: 'bg-indigo-100 text-indigo-700',
    Restructuring: 'bg-orange-100 text-orange-700',
  };

  const filtered = deals.filter(d => {
    const allBanques = [...d.vendeur, ...d.acheteur];
    return (filterBanque === 'all' || allBanques.includes(filterBanque)) && (filterType === 'all' || d.type === filterType);
  });

  return (
    <>
      <div className={`${guideAlertClass} mb-6`}>
        <p>⚠️ Mettre à jour manuellement. Citer un deal récent avec la banque cible est un signal fort d&apos;intérêt réel. Sources : Financial Times, Bloomberg, Mergermarket.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-medium mb-2">Banque conseil</p>
          <div className="flex flex-wrap gap-1.5">
            {banques.map(b => (
              <GuideChipButton key={b} active={filterBanque === b} onClick={() => setFilterBanque(b)} size="sm">
                {b === 'all' ? 'Toutes' : b}
              </GuideChipButton>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-medium mb-2">Type de deal</p>
          <div className="flex flex-wrap gap-1.5">
            {types.map(t => (
              <GuideChipButton key={t} active={filterType === t} onClick={() => setFilterType(t)} size="sm">
                {t === 'all' ? 'Tous' : t}
              </GuideChipButton>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(deal => (
          <div key={deal.id} className={`${guideCardClass} overflow-hidden`}>
            <button
              type="button"
              onClick={() => setOpenDeal(openDeal === deal.id ? null : deal.id)}
              className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">{deal.date}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${typeColors[deal.type] || 'bg-slate-100 text-slate-600'}`}>{deal.type}</span>
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">{deal.secteur}</span>
                </div>
                <div className="font-serif text-blue-950 text-base">
                  {deal.cible} <span className="text-blue-400 font-light">→ {deal.acquéreur}</span>
                </div>
                <div className="text-blue-400 text-xs mt-1">
                  {deal.ev} ·{' '}
                  {[...deal.vendeur, ...deal.acheteur].map(b => (
                    <span key={b} className="inline-block bg-blue-50 border border-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded mr-1">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-blue-300 flex-shrink-0 mt-1 transition-transform ${openDeal === deal.id ? 'rotate-90' : ''}`} />
            </button>
            {openDeal === deal.id && (
              <div className="px-5 pb-5 border-t border-blue-50">
                <div className="mt-4 space-y-3">
                  <div className="flex gap-2">
                    <span className="text-xs text-blue-400 uppercase tracking-wider w-24 flex-shrink-0 pt-0.5">Multiple</span>
                    <span className="text-blue-900 text-sm">{deal.multiple}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-blue-400 uppercase tracking-wider w-24 flex-shrink-0 pt-0.5">Logique</span>
                    <span className="text-blue-700 text-sm font-light">{deal.logique}</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">💡 Point clé pour l&apos;entretien</div>
                    <p className="text-amber-900 text-sm font-light">{deal.tip}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-blue-300 italic text-sm">Aucun deal pour ces filtres.</div>
        )}
      </div>
    </>
  );
}
