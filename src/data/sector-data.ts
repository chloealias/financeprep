import type { LucideIcon } from 'lucide-react';
import {
  Building,
  Factory,
  Heart,
  Landmark,
  Monitor,
  ShoppingCart,
  Zap,
} from 'lucide-react';
import type { SectorId } from '@/lib/sectors';

export type SectorSheetData = {
  name: string;
  tag: string;
  Icon: LucideIcon;
  kpis: string[];
  multiples: { label: string; value: string }[];
  tendances: string[];
  deal: { titre: string; texte: string };
  question: string;
  reponse: string;
};

export const SECTOR_DATA: Record<SectorId, SectorSheetData> = {
  tmt: {
    name: 'TMT',
    tag: 'Tech, Media & Telecom',
    Icon: Monitor,
    kpis: ['ARR / MRR (SaaS)', 'Churn rate', 'LTV / CAC ratio', 'EBITDA margin', 'Free Cash Flow yield'],
    multiples: [
      { label: 'EV/Revenue (SaaS forte croissance)', value: '8-15x' },
      { label: 'EV/EBITDA (Telecom matures)', value: '6-10x' },
      { label: 'EV/EBITDA (Software profitable)', value: '12-20x' },
      { label: 'P/E (Tech large cap)', value: '25-40x' },
    ],
    tendances: [
      'Consolidation IA : acquisitions de startups par les GAFAM',
      'Pression réglementaire : DMA en Europe, antitrust US',
      'Streaming wars : débundling / rebundling dans les médias',
      'Infrastructure : fibre, 5G, data centers en forte demande',
    ],
    deal: {
      titre: 'Microsoft / Activision Blizzard (2023)',
      texte: "68,7 Md$ — plus grand deal gaming de l'histoire. Approuvé après 2 ans de bataille réglementaire. Multiple ~10x Revenue. Logique : gaming + metaverse.",
    },
    question: "Pourquoi un SaaS peut-il se valoriser à 15x revenue alors qu'une industrie profitable vaut 8x EBITDA ?",
    reponse:
      'La croissance et la récurrence. Un SaaS à 30% de croissance et 90% de rétention génèrera beaucoup plus de FCF futur. La valorisation est forward-looking, pas backward-looking.',
  },
  sante: {
    name: 'Santé',
    tag: 'Healthcare & Pharma',
    Icon: Heart,
    kpis: ['Pipeline R&D (phase I/II/III)', 'Revenus par indication', 'Pricing power', 'EBITDA ajusté R&D', 'Time to market'],
    multiples: [
      { label: 'EV/EBITDA (Pharma établie)', value: '12-18x' },
      { label: 'EV/Revenue (Biotech pré-profit)', value: '5-20x (selon pipeline)' },
      { label: 'EV/EBITDA (Medtech)', value: '15-25x' },
      { label: 'P/E (Big Pharma)', value: '15-22x' },
    ],
    tendances: [
      'GLP-1 / obésité : course entre Novo Nordisk, Eli Lilly et challengers',
      'Big Pharma rachète des pipelines biotech pour renouveler leurs portefeuilles',
      'Pression prix aux US : Inflation Reduction Act',
      'Essor des thérapies géniques et de la médecine de précision',
    ],
    deal: {
      titre: 'Sanofi / Opella — cession à CD&R (2025)',
      texte: '15,6 Md€ pour la division consumer healthcare (Doliprane, Fervex). Sanofi se recentre sur biotech. Multiple ~14x EBITDA. Controversé politiquement.',
    },
    question: 'Comment valorise-t-on une biotech sans revenus ni EBITDA ?',
    reponse:
      'Sum-of-the-parts sur le pipeline : probabilité de succès par phase × valeur actualisée des revenus si approuvé × part de marché. Méthode rNPV (risk-adjusted NPV).',
  },
  energie: {
    name: 'Énergie',
    tag: 'Oil & Gas, Utilities, Renouvelables',
    Icon: Zap,
    kpis: ['EBITDA / bbl (oil & gas)', 'Réserves prouvées (P1/P2)', 'Capacité installée (GW)', 'LCOE (coût production renouvelables)', 'CapEx / FCF ratio'],
    multiples: [
      { label: 'EV/EBITDA (Oil majors)', value: '5-7x' },
      { label: 'EV/EBITDA (Utilities)', value: '8-12x' },
      { label: 'EV/EBITDA (Renouvelables)', value: '10-15x' },
      { label: 'P/E (Oil intégrées)', value: '10-14x' },
    ],
    tendances: [
      'Transition énergétique : pression ESG sur O&G, investissements massifs dans le renouvelable',
      'Volatilité prix commodités post-Ukraine',
      "Consolidation dans l'éolien offshore (Ørsted, RWE, BP)",
      'Renaissance du nucléaire en Europe (France, Pologne, UK)',
    ],
    deal: {
      titre: 'ExxonMobil / Pioneer Natural Resources (2024)',
      texte: '60 Md$ — plus grande acquisition énergie depuis 20 ans. Pioneer leader du bassin Permian (shale US). Exxon consolide ses réserves malgré les pressions ESG.',
    },
    question: 'Pourquoi les majors pétrolières font des acquisitions massives alors que le monde veut décarboner ?',
    reponse:
      'Les actifs O&G ont une durée de vie de 10-30 ans. La demande reste élevée à court terme. Les majors rachètent des réserves à prix cassé et génèrent du cash pour financer la transition. Logique rationnelle à horizon 2035.',
  },
  retail: {
    name: 'Retail / FMCG',
    tag: 'Consumer Goods & Distribution',
    Icon: ShoppingCart,
    kpis: ['LFL (Like-for-Like growth)', 'EBITDA margin', 'Inventaire / Ventes', 'CapEx maintenance vs expansion', 'Net Promoter Score'],
    multiples: [
      { label: 'EV/EBITDA (Distribution alimentaire)', value: '6-10x' },
      { label: 'EV/EBITDA (FMCG marques)', value: '12-18x' },
      { label: 'EV/EBITDA (E-commerce)', value: '15-25x' },
      { label: 'P/E (Luxe)', value: '25-40x' },
    ],
    tendances: [
      'DTC (Direct-to-Consumer) : les marques court-circuitent la grande distribution',
      "Montée des MDD (marque de distributeur) sous pression de l'inflation",
      'M&A dans le bio / wellness / premium (segment résilient)',
      'Pression marges : pouvoir de négociation distributeurs vs fournisseurs',
    ],
    deal: {
      titre: 'Mars / Hotel Chocolat (2023)',
      texte: '534 M£ pour la marque chocolat premium britannique. Mars diversifie dans le DTC premium. Multiple ~20x EBITDA justifié par la force de la marque.',
    },
    question: "Pourquoi une marque FMCG vaut-elle plus cher qu'un distributeur avec le même EBITDA ?",
    reponse:
      'Pricing power, récurrence, protection IP, fidélité client. Le distributeur est price-taker (marges sous pression). La marque est price-maker. Qualité des bénéfices supérieure → premium de multiple justifié.',
  },
  industrie: {
    name: 'Industrie',
    tag: 'Industrials & Manufacturing',
    Icon: Factory,
    kpis: ['EBITDA margin', 'CapEx / Revenue', 'Book-to-Bill ratio (carnet)', 'ROCE (Return on Capital Employed)', 'Working Capital days'],
    multiples: [
      { label: 'EV/EBITDA (Industriels diversifiés)', value: '8-12x' },
      { label: 'EV/EBITDA (Aéro/Défense)', value: '12-18x' },
      { label: 'EV/EBITDA (Construction)', value: '6-9x' },
      { label: 'EV/EBIT (Engineering)', value: '12-16x' },
    ],
    tendances: [
      'Reshoring / nearshoring : rapatriement de chaînes de production',
      'Défense : hausse des budgets en Europe post-Ukraine (>2% PIB OTAN)',
      'Automatisation et robotique : deal-driver dans la fabrication',
      'Boom des commandes liées à la transition énergétique',
    ],
    deal: {
      titre: 'Vinci / Mace (2025)',
      texte: '~1,2 Md£ pour le groupe de construction UK. Vinci renforce sa présence UK sur les grands projets complexes (infrastructure, data centers). Multiple ~9x EBITDA.',
    },
    question: 'Comment modélisez-vous un groupe industriel avec des contrats long-terme à marge variable ?',
    reponse:
      'On analyse le carnet de commandes (backlog) et sa visibilité. Modélisation séparée par segment selon le type de contrat (fixed-price vs cost-plus). Stress test sur le taux de gain de nouveaux contrats et les cost overruns.',
  },
  immo: {
    name: 'Immobilier',
    tag: 'Real Estate & REITs',
    Icon: Building,
    kpis: ['NAV (Net Asset Value)', 'FFO (Funds From Operations)', "Taux d'occupation", 'Rendement locatif net', 'LTV (Loan-to-Value)'],
    multiples: [
      { label: 'Prime / décote à la NAV (REITs)', value: '+10% / -20% selon cycle' },
      { label: 'EV/EBITDA (Promoteurs)', value: '8-14x' },
      { label: 'Cap Rate (bureaux prime Paris)', value: '4-5%' },
      { label: 'Cap Rate (logistique)', value: '4-5.5%' },
    ],
    tendances: [
      'Hausse des taux : correction des valorisations et difficultés de refinancement',
      'Bureaux : crise post-COVID (télétravail), vacance en hausse dans les secondaires',
      'Logistique : forte demande (e-commerce), rendements comprimés',
      'Data centers : asset class en forte croissance, valorisations élevées',
    ],
    deal: {
      titre: 'Lineage Logistics IPO (2024)',
      texte: "18 Md$ de valorisation. REIT spécialisé dans l'entreposage frigorifique. Plus grande IPO mondiale 2024. Bookrunners : Morgan Stanley, Goldman Sachs, JPMorgan.",
    },
    question: 'Pourquoi utilise-t-on le FFO plutôt que le net income pour valoriser un REIT ?',
    reponse:
      "Les REITs amortissent massivement leurs actifs, déprimant le net income comptable. Mais l'immobilier peut s'apprécier. Le FFO (= Net Income + D&A − gains sur cessions) mesure le cash réellement disponible pour les dividendes.",
  },
  fi: {
    name: 'FIG',
    tag: 'Financial Institutions',
    Icon: Landmark,
    kpis: ['ROE (Return on Equity)', 'CET1 ratio (capital réglementaire)', 'NIM (Net Interest Margin)', 'Cost-to-Income ratio', 'NPL ratio'],
    multiples: [
      { label: 'P/Book (Banques européennes)', value: '0.5-1.2x' },
      { label: 'P/E (Banques)', value: '8-12x' },
      { label: 'P/Book (Assureurs)', value: '1.0-2.0x' },
      { label: 'P/AUM (Asset managers)', value: '2-4%' },
    ],
    tendances: [
      'Hausse des taux : amélioration des NIM (mais risque crédit en hausse)',
      'Consolidation bancaire en Europe (UniCredit / Commerzbank)',
      'Pression réglementaire : Bâle IV, exigences en capital',
      'Asset management : consolidation (Amundi, DWS, Natixis)',
    ],
    deal: {
      titre: 'UniCredit / Commerzbank (2024-2025)',
      texte: 'UniCredit monte à ~29% du capital de Commerzbank, menaçant une OPA hostile. Résistance politique allemande forte. Emblématique des défis de la consolidation bancaire européenne.',
    },
    question: "Pourquoi ne peut-on pas utiliser l'EV/EBITDA pour valoriser une banque ?",
    reponse:
      "La dette est une matière première pour une banque, pas un financement. Impossible de séparer actifs d'exploitation et dette. On utilise des métriques equity : P/Book, P/E, ou sum-of-the-parts. L'EV n'a pas de sens conceptuel pour un établissement bancaire.",
  },
};
