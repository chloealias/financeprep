import { dealMatchesBank, MA_DEALS, type MaDeal } from '@/data/ma-deals';

export type BankProfile = {
  id: string;
  name: string;
  category: string;
  hq: string;
  tagline: string;
  divisions: string[];
  particularites: string[];
  recrutement?: string;
  pointEntretien: string;
};

export const BANK_LIST: BankProfile[] = [
  {
    id: 'rothschild-co',
    name: 'Rothschild & Co',
    category: 'Elite boutique (advisory)',
    hq: 'Paris / Londres',
    tagline: 'Conseil M&A et restructuring indépendant, référence en Europe',
    divisions: ['M&A', 'Restructuring', 'Debt advisory', 'Equity advisory', 'Wealth management'],
    particularites: [
      'Structure partnership — culture long terme, pas de trading propriétaire',
      'Forte présence mid-cap et situations complexes (carve-outs, OPA, restructurations)',
      'Rothschild & Co ≠ Edmond de Rothschild (banque privée / AM, Genève)',
      'Excellence sell-side France : Opella, créanciers Altice',
      'Process souvent plus qualitatif que les bulge brackets (moins de modèles massifs)',
    ],
    recrutement: 'Entretiens techniques + fit culturel. Cas M&A / restructuring. Stages très sélectifs, souvent via réseau et parcours top schools.',
    pointEntretien:
      'Toujours dire « Rothschild & Co ». Montrer l\'intérêt pour le conseil pur (pas de balance sheet) et citer un deal récent où ils sont lead (Sanofi/Opella sell-side, Altice créanciers).',
  },
  {
    id: 'lazard',
    name: 'Lazard',
    category: 'Elite boutique',
    hq: 'New York / Paris',
    tagline: 'La référence historique du conseil indépendant mondial',
    divisions: ['M&A', 'Restructuring', 'Capital markets advisory', 'Asset management'],
    particularites: [
      'Modèle 100% advisory — pas de prêt, pas de trading',
      'Leader restructuring mondial (Altice débiteur, GS/Mace buy-side)',
      'Culture intellectuelle, équipes relativement petites vs bulge',
      'Fort en cross-border et situations politiquement sensibles',
      'Paris = hub européen majeur pour M&A mid/large cap',
    ],
    recrutement: 'Plusieurs rounds, cas financiers et fit. Restructuring recrute des profils juridiques/finance dette en plus des généralistes.',
    pointEntretien:
      'Expliquer pourquoi Lazard vs GS : indépendance, absence de conflit avec lending. Distinguer rôle débiteur (Altice) vs buy-side selon le deal cité.',
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    category: 'Bulge bracket',
    hq: 'New York',
    tagline: 'La « firme la plus prestigieuse » — M&A, markets, PE',
    divisions: ['Investment Banking', 'Global Markets', 'Asset Management', 'Goldman Sachs Alternatives (PE)'],
    particularites: [
      'Full service : conseil + financement + trading + PE (Mace Consult via GS Alternatives)',
      'Culture intense, heures longues, excellence analytique attendue',
      'Fort pipeline IPO et M&A mega-cap US ; présence Paris solide',
      'GS Alternatives = acteur PE majeur (infra, carve-outs) — pas que M&A classique',
      'Réseau alumni très actif en finance',
    ],
    recrutement: 'Superday, entretiens comportementaux + techniques. Préparer DCF, comps, accretion/dilution. Stages analyst summer très compétitifs.',
    pointEntretien:
      'Montrer que GS n\'est pas qu\'un job M&A : connaître GS Alternatives / Mace. Être prêt sur un deal récent et sur « Why Goldman » avec exemple concret.',
  },
  {
    id: 'morgan-stanley',
    name: 'Morgan Stanley',
    category: 'Bulge bracket',
    hq: 'New York',
    tagline: 'Banque d\'investissement globale, force en ECM et M&A tech',
    divisions: ['IBD (M&A, ECM, DCM)', 'Wealth Management', 'Investment Management'],
    particularites: [
      'Reconnue pour ECM et tech M&A (côté conseil et exécution)',
      'Coordination dette fréquente sur LBOs européens (Opella)',
      'Culture légèrement plus collaborative que GS selon les équipes',
      'Paris : équipes M&A, Lev Fin, ECM actives sur mid/large cap',
    ],
    recrutement: 'Process similaire aux autres bulge : fit + technical. Questions brainteasers possibles.',
    pointEntretien: 'Citer un deal où MS est bookrunner ou advisor. Comparer MS vs GS sur culture et secteurs forts (ECM, tech).',
  },
  {
    id: 'jpmorgan',
    name: 'JPMorgan',
    category: 'Bulge bracket',
    hq: 'New York',
    tagline: 'Plus grande banque US — universal banking + IB de premier plan',
    divisions: ['Corporate & Investment Bank', 'Commercial Banking', 'Asset Management'],
    particularites: [
      'Balance sheet massive → peut financer et conseiller sur les mêmes deals',
      'Leader DCM et loan syndication ; fort en Lev Fin',
      'Swisscom/Vodafone Italia : conseil buy-side avec Evercore, DB',
      'Culture plus institutionnelle, processus structurés',
    ],
    recrutement: 'HireVue + superday. Tests techniques standards (valuation, accounting).',
    pointEntretien: 'Comprendre le modèle universal bank : avantages (financement intégré) vs conflits potentiels. Deal récent en Europe.',
  },
  {
    id: 'bank-of-america',
    name: 'Bank of America',
    category: 'Bulge bracket',
    hq: 'Charlotte / New York',
    tagline: 'Universal bank US — conseil et financement à grande échelle',
    divisions: ['Global Banking (IB)', 'Markets', 'Wealth Management'],
    particularites: [
      'Présent sur Opella (sell-side) et Kering/L\'Oréal (buy-side)',
      'Fort en leveraged finance et loan origination',
      'Moins « glamour » que GS/MS en perception mais volumes énormes',
      'Paris : équipe IB en croissance sur cross-border US-Europe',
    ],
    recrutement: 'Process standard bulge bracket. Attention aux questions comptables (BofA historiquement forte accounting).',
    pointEntretien: 'Ne pas confondre avec Merrill Lynch (intégré). Citer deal luxe ou healthcare récent.',
  },
  {
    id: 'citi',
    name: 'Citigroup',
    category: 'Bulge bracket',
    hq: 'New York',
    tagline: 'Banque globale — réseau international le plus étendu',
    divisions: ['Banking (M&A, DCM, Lev Fin)', 'Markets', 'Services'],
    particularites: [
      'Réseau emerging markets inégalé',
      'Coordinateur dette Opella (avec GS, Barclays, BNP, MS, SocGen, HSBC)',
      'Peut conseiller et financer — modèle integrated',
      'Culture diverse, équipes très internationales',
    ],
    recrutement: 'Entretiens techniques + comportementaux. Accent sur global mindset.',
    pointEntretien: 'Mettre en avant l\'angle international si profil multilingue. Deal avec rôle financing + advisory.',
  },
  {
    id: 'barclays',
    name: 'Barclays',
    category: 'Bulge bracket (UK/Europe)',
    hq: 'Londres',
    tagline: 'Banque britannique majeure — force Lev Fin et European M&A',
    divisions: ['Corporate & Investment Bank', 'UK consumer bank'],
    particularites: [
      'Historiquement très forte en leveraged finance Europe',
      'Coordinateur dette sur grands LBOs (Opella)',
      'Post-Brexit : positionnement hub Londres + relais Europe',
      'Culture plus britannique, moins parisienne que BNP/SocGen',
    ],
    recrutement: 'Assessment centre Londres ou Paris selon desk. Technical + fit.',
    pointEntretien: 'Si entretien Paris : expliquer le lien Barclays-Londres. Connaître un deal Lev Fin ou UK-centric.',
  },
  {
    id: 'bnp-paribas',
    name: 'BNP Paribas',
    category: 'Banque française (universal)',
    hq: 'Paris',
    tagline: '1re banque eurozone — leader M&A et financement en France',
    divisions: ['Corporate & Institutional Banking', 'Retail', 'AM'],
    particularites: [
      'Référence naturelle pour deals français (Opella sell-side)',
      'Peut aligner conseil + crédit + markets sur mid/large cap',
      'Culture plus corporate que les elite boutiques',
      'Forte en export finance et European corporates',
    ],
    recrutement: 'Process FR : entretiens RH + techniques, parfois test logique. Stages CIB très demandés.',
    pointEntretien: 'Argument « banque de référence en France ». Deal Opella ou autre flagship FR. Comparer avec Rothschild (conseil pur).',
  },
  {
    id: 'societe-generale',
    name: 'Société Générale',
    category: 'Banque française (universal)',
    hq: 'Paris',
    tagline: 'Acteur intégré CIB — équity derivatives et financement',
    divisions: ['Global Banking & Investor Solutions', 'Retail'],
    particularites: [
      'Réputation forte en equity derivatives et structured products',
      'Coordinateur dette Opella',
      'M&A conseil présent mais moins iconique que BNP/Lazard',
      'Culture entrepreneuriale historique, restructuration post-incidents',
    ],
    recrutement: 'Concours et entretiens type grande banque FR. Bien préparer motivation groupe + division CIB.',
    pointEntretien: 'Montrer connaissance du GBIS. Éviter de ne parler que de M&A si candidature markets/IB mixte.',
  },
  {
    id: 'hsbc',
    name: 'HSBC',
    category: 'Banque globale (UK/Asia)',
    hq: 'Londres / Hong Kong',
    tagline: 'Pivot Europe-Asie — trade finance et cross-border',
    divisions: ['Global Banking & Markets', 'Wealth', 'Retail'],
    particularites: [
      'Expertise Asie-Pacifique et trade corridors',
      'Coordinateur dette Opella',
      'Moins dominant en M&A conseil pur France vs BNP/Lazard',
      'Culture conservative, processus groupe importants',
    ],
    recrutement: 'Entretiens structurés, fit et motivation géographique (HK, UK, FR).',
    pointEntretien: 'Si profil international : mettre en avant lien Europe-Asie. Sinon citer rôle financing sur deal européen.',
  },
  {
    id: 'ubs',
    name: 'UBS',
    category: 'Banque suisse globale',
    hq: 'Zurich',
    tagline: 'Wealth + IB — force M&A suisse et cross-border',
    divisions: ['Global Banking', 'Global Wealth Management', 'Asset Management'],
    particularites: [
      'Sell-side Mace (UBS) ; buy-side Swisscom/Vodafone (avec Evercore, DB, JPM)',
      'Historique Credit Suisse fusionné — consolidation suisse',
      'Fort en advisory Suisse et média/luxe',
      'Culture suisse : rigueur, discrétion',
    ],
    recrutement: 'Entretiens techniques exigeants. Questions valuation et accounting.',
    pointEntretien: 'Post-merger CS/UBS : montrer veille sectorielle. Deal cross-border récent.',
  },
  {
    id: 'deutsche-bank',
    name: 'Deutsche Bank',
    category: 'Banque allemande (universal)',
    hq: 'Francfort',
    tagline: 'Leader allemand — restructuring et European corporates',
    divisions: ['Corporate Bank', 'Investment Bank', 'Private Bank'],
    particularites: [
      'Buy-side Swisscom/Vodafone avec Evercore, JPM',
      'Historiquement forte restructuring Europe',
      'Turnaround groupe depuis 2019 — focus rentabilité',
      'Paris hub pour corporates françaises allemandes',
    ],
    recrutement: 'Process européen standard. Attention culture post-restructuration interne.',
    pointEntretien: 'Connaître la stratégie « return to profitability ». Deal telecom ou German Mittelstand angle.',
  },
  {
    id: 'evercore',
    name: 'Evercore',
    category: 'Elite boutique (US)',
    hq: 'New York',
    tagline: 'Independent advisory — M&A et restructuring premium',
    divisions: ['Advisory (M&A, restructuring)', 'Equities', 'Technology'],
    particularites: [
      'Sell-side Kering Beauté ; buy-side Swisscom/Vodafone',
      'Modèle pure play advisory US, présence Paris croissante',
      'Deals souvent haut de gamme et situationnellement complexes',
      'Culture analytique, équipes lean',
    ],
    recrutement: 'Très sélectif, entretiens techniques poussés. Moins de places que bulge mais prestige élevé.',
    pointEntretien: '« Why Evercore over bulge » : indépendance, qualité des mandates. Citer Kering/L\'Oréal ou Swisscom.',
  },
  {
    id: 'centerview',
    name: 'Centerview Partners',
    category: 'Elite boutique (US)',
    hq: 'New York',
    tagline: 'Boutique M&A de référence — sell-side premium',
    divisions: ['M&A advisory'],
    particularites: [
      'Sell-side Kering Beauté avec Evercore',
      'Pas de restructuring massif — focus M&A stratégique',
      'Réputation « trusted advisor » C-suite US',
      'Bureaux limités en Europe vs Evercore/Lazard',
    ],
    recrutement: 'Extrêmement sélectif. Fit et judgment aussi importants que le technique.',
    pointEntretien: 'Montrer compréhension sell-side stratégique (Kering cède beauté sous pression dette). Qualité > quantité de deals cités.',
  },
  {
    id: 'jefferies',
    name: 'Jefferies',
    category: 'Independent investment bank',
    hq: 'New York',
    tagline: 'Mid-cap et growth — conseil et trading intégré',
    divisions: ['Investment Banking', 'Equities', 'Fixed income'],
    particularites: [
      'Sole advisor Worldline MeTS ; buy-side Mace avec Lazard',
      'Culture entrepreneuriale, moins hiérarchique que bulge',
      'Fort sur mid-cap, healthcare, tech growth',
      'Présence Paris active sur mandates français',
    ],
    recrutement: 'Process plus direct, entretiens avec seniors. Bon pour profils entrepreneurs.',
    pointEntretien: 'Citer Worldline ou Mace. Expliquer pourquoi Jefferies vs bulge : responsabilité early, mid-cap focus.',
  },
  {
    id: 'houlihan-lokey',
    name: 'Houlihan Lokey',
    category: 'Elite boutique (restructuring / valuation)',
    hq: 'Los Angeles',
    tagline: 'N°1 mondial restructuring et fairness opinions',
    divisions: ['Financial Restructuring', 'Corporate finance (M&A)', 'Financial Advisory Services'],
    particularites: [
      'Créanciers holdco Altice (~4,4 Md€)',
      'Spécialisation restructuring > M&A classique',
      'Fairness opinions et valuation = compétences distinctives',
      'Culture technique restructuring (crédit, intercreditor, DIP)',
    ],
    recrutement: 'Recrute des profils qui comprennent la dette et les process judiciaires. Cas restructuring fréquents.',
    pointEntretien: 'Distinguer HL (holdco Altice) vs Rothschild (secured). Montrer intérêt pour restructuring, pas seulement M&A.',
  },
];

export const BANK_PROFILES: Record<string, BankProfile> = Object.fromEntries(
  BANK_LIST.map(b => [b.id, b]),
);

export function getBankById (id: string): BankProfile | undefined {
  return BANK_PROFILES[id];
}

export function getDealsForBank (name: string): MaDeal[] {
  return MA_DEALS.filter(d => dealMatchesBank(d, name));
}
