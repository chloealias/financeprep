import type { BankCategoryId } from '@/lib/bank-categories';
import { BANK_CATEGORY_IDS } from '@/lib/bank-categories';
import { dealMatchesBank, MA_DEALS, type MaDeal } from '@/data/ma-deals';

export type BankProfile = {
  id: string;
  categoryId: BankCategoryId;
  name: string;
  category: string;
  hq: string;
  tagline: string;
  divisions: string[];
  particularites: string[];
  recrutement?: string;
  pointEntretien: string;
  dealEmblematique: { titre: string; texte: string };
  emblematicDealId: string;
  questionPiège: string;
  reponsePiège: string;
  piegeAEviter?: string;
};

export const BANK_LIST: BankProfile[] = [
  {
    id: 'rothschild-co',
    categoryId: 'elite-boutique',
    name: 'Rothschild & Co',
    category: 'Elite boutique (advisory)',
    hq: 'Paris / Londres',
    tagline: 'Conseil M&A et restructuring indépendant, référence en Europe',
    divisions: ['M&A', 'Restructuring', 'Debt advisory', 'Equity advisory', 'Wealth management'],
    particularites: [
      'Structure partnership — culture long terme, pas de trading propriétaire',
      'Forte présence mid-cap et situations complexes (carve-outs, OPA, restructurations)',
      'Excellence sell-side France : Opella, créanciers Altice',
      'Process souvent plus qualitatif que les bulge brackets (moins de modèles massifs)',
    ],
    recrutement: 'Entretiens techniques + fit culturel. Cas M&A / restructuring. Stages très sélectifs, souvent via réseau et parcours top schools.',
    pointEntretien:
      'Toujours dire « Rothschild & Co ». Montrer l\'intérêt pour le conseil pur (pas de balance sheet) et citer un deal récent où ils sont lead (Sanofi/Opella sell-side, Altice créanciers).',
    dealEmblematique: {
      titre: 'Sanofi / Opella → CD&R',
      texte: 'Sell-side M&A lead pour Sanofi sur le carve-out Opella (~16 Md€ EV). Deal emblématique du modèle conseil pur : pas de financement intégré, mais mandat stratégique sous pression politique (Doliprane).',
    },
    emblematicDealId: 'd01',
    questionPiège:
      'Pourquoi Rothschild plutôt que BNP sur Opella, alors que BNP peut aussi conseiller et financer ?',
    reponsePiège:
      'Rothschild = indépendance totale, pas de conflit avec une balance sheet. Sur un carve-out sensible, Sanofi veut un advisor qui maximise le prix sans pousser un financement maison. BNP intervient plutôt en coordinateur dette, pas en sell-side lead.',
    piegeAEviter: 'Ne jamais confondre Rothschild & Co (Paris/Londres, advisory) avec Edmond de Rothschild (banque privée, Genève).',
  },
  {
    id: 'lazard',
    categoryId: 'elite-boutique',
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
    dealEmblematique: {
      titre: 'Altice France — Restructuration €24 Md',
      texte: 'Advisor restructuring côté débiteur (Altice / Drahi). Cooperation agreement entre ~200 créanciers secured, debt-for-equity, distinction secured vs holdco — cas d\'école restructuring européen.',
    },
    emblematicDealId: 'd02',
    questionPiège:
      'Sur Altice, Lazard conseille qui exactement — et en quoi est-ce différent de Rothschild ?',
    reponsePiège:
      'Lazard = mandat débiteur. Rothschild & Co = créanciers secured (~19 Md€). Houlihan Lokey = créanciers holdco (~4,4 Md€). Trois camps, trois advisors — ne pas les fusionner en un seul « mandat Altice ».',
  },
  {
    id: 'goldman-sachs',
    categoryId: 'bulge-bracket',
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
    dealEmblematique: {
      titre: 'Goldman Sachs Alternatives / Mace Consult',
      texte: 'GS Alternatives acquiert 75% de Mace Consult (carve-out consulting infra, ~$1 Md rev.). Illustre le bras PE du groupe, distinct de l\'Investment Banking classique.',
    },
    emblematicDealId: 'd03',
    questionPiège:
      'GS est-elle une banque d\'affaires ou un fonds de private equity ?',
    reponsePiège:
      'Les deux, via des entités distinctes : Investment Banking (conseil/financement) et Goldman Sachs Alternatives (PE, >$625 Md AUM). Mace montre la stratégie bolt-on infra — en entretien IB, citer le deal prouve la veille groupe.',
  },
  {
    id: 'morgan-stanley',
    categoryId: 'bulge-bracket',
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
    dealEmblematique: {
      titre: 'Sanofi / Opella → CD&R',
      texte: 'Sell-side M&A advisor + coordinateur dette sur le LBO Opella (~16 Md€). MS illustre le modèle bulge : conseil et financement sur le même mandat européen flagship.',
    },
    emblematicDealId: 'd01',
    questionPiège: 'Pourquoi Morgan Stanley plutôt que Goldman Sachs ?',
    reponsePiège:
      'Réponse personnalisée mais structurée : MS souvent citée plus forte en ECM et culture perçue comme plus collaborative ; GS plus intense et PE (Alternatives). Citer un deal où MS a un rôle identifiable (Opella) plutôt qu\'une généralité.',
  },
  {
    id: 'jpmorgan',
    categoryId: 'bulge-bracket',
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
    dealEmblematique: {
      titre: 'Swisscom / Vodafone Italia → Fastweb',
      texte: 'Buy-side M&A advisor avec Evercore et Deutsche Bank sur l\'acquisition Vodafone Italia (~8 Md€ EV). Consolidation telecom européenne, enjeux antitrust.',
    },
    emblematicDealId: 'd07',
    questionPiège:
      'JPMorgan peut-elle conseiller et prêter sur le même deal sans conflit ?',
    reponsePiège:
      'Oui, avec Chinese walls et disclosure — c\'est le cœur du modèle universal bank. L\'avantage : offre intégrée financing + advisory. Le risque : perception de conflit si le client veut un conseil 100% indépendant → d\'où l\'existence des elite boutiques.',
  },
  {
    id: 'bank-of-america',
    categoryId: 'bulge-bracket',
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
    dealEmblematique: {
      titre: 'Kering Beauté / Creed → L\'Oréal',
      texte: 'Buy-side advisor pour L\'Oréal (4 Md€ cash, plus grande acquisition de l\'histoire du groupe). Sell-side = Evercore + Centerview — BofA côté acquéreur.',
    },
    emblematicDealId: 'd06',
    questionPiège: 'Bank of America et Merrill Lynch, c\'est la même chose ?',
    reponsePiège:
      'Merrill Lynch a été intégrée à BofA en 2009. La marque Merrill subsiste sur la wealth management ; l\'investment banking opère sous Bank of America Securities. En entretien, dire « BofA » sauf si on parle explicitement du legacy Merrill.',
  },
  {
    id: 'citi',
    categoryId: 'bulge-bracket',
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
    dealEmblematique: {
      titre: 'Sanofi / Opella → CD&R',
      texte: 'Buy-side M&A (avec Lazard) + coordinateur dette sur le LBO Opella. Citi illustre le double rôle bulge : conseil acquéreur CD&R et structuration du package dette €8,65 Md.',
    },
    emblematicDealId: 'd01',
    questionPiège:
      'Sur Opella, pourquoi autant de banques en coordinateurs dette ?',
    reponsePiège:
      'Syndication : partager le risque, élargir la distribution (club deal), relations avec différents investisseurs dette. Citi, GS, Barclays, BNP, MS, SocGen, HSBC = coordination, pas 7 duplicatas du même travail.',
  },
  {
    id: 'barclays',
    categoryId: 'bulge-bracket',
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
    dealEmblematique: {
      titre: 'Sanofi / Opella → CD&R',
      texte: 'Coordinateur dette sur le LBO Opella (~16 Md€ EV). Barclays = référence Lev Fin Europe, rôle financing plutôt que sell-side conseil pur.',
    },
    emblematicDealId: 'd01',
    questionPiège: 'Barclays est-elle surtout une banque de financement ou de conseil M&A ?',
    reponsePiège:
      'Les deux, mais réputation particulièrement forte en leveraged finance et loan syndication en Europe. Sur Opella, rôle coordinateur dette — en entretien Lev Fin, c\'est un meilleur angle que de présenter Barclays comme une elite boutique M&A.',
  },
  {
    id: 'bnp-paribas',
    categoryId: 'universal-bank',
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
    dealEmblematique: {
      titre: 'Sanofi / Opella → CD&R',
      texte: 'Sell-side advisor + coordinateur dette sur Opella. BNP = banque de référence sur les grands mandats français, conseil et financement intégrés.',
    },
    emblematicDealId: 'd01',
    questionPiège: 'BNP ou Rothschild sur Opella — qui est le vrai leader ?',
    reponsePiège:
      'Rothschild = sell-side M&A lead (conseil stratégique pur). BNP = sell-side advisor ET coordinateur dette — rôle plus large mais pas « meilleur » en conseil : complémentaire. Ne pas dévaloriser Rothschild en disant que BNP « fait tout ».',
  },
  {
    id: 'societe-generale',
    categoryId: 'universal-bank',
    name: 'Société Générale',
    category: 'Banque française (universal)',
    hq: 'Paris',
    tagline: 'Acteur intégré CIB — equity derivatives et financement',
    divisions: ['Global Banking & Investor Solutions', 'Retail'],
    particularites: [
      'Réputation forte en equity derivatives et structured products',
      'Coordinateur dette Opella',
      'M&A conseil présent mais moins iconique que BNP/Lazard',
      'Culture entrepreneuriale historique, restructuration post-incidents',
    ],
    recrutement: 'Concours et entretiens type grande banque FR. Bien préparer motivation groupe + division CIB.',
    pointEntretien: 'Montrer connaissance du GBIS. Éviter de ne parler que de M&A si candidature markets/IB mixte.',
    dealEmblematique: {
      titre: 'Sanofi / Opella → CD&R',
      texte: 'Coordinateur dette sur le LBO Opella. SocGen illustre la force financing du groupe, en complément des desks derivatives.',
    },
    emblematicDealId: 'd01',
    questionPiège:
      'Pourquoi postuler en M&A chez SocGen plutôt qu\'en derivatives ?',
    reponsePiège:
      'Réponse honnête alignée sur le poste visé. Si M&A : reconnaître que SocGen est moins iconique que BNP/Lazard en conseil pur, mais présente sur les grands deals FR en financing et M&A mid-cap. Ne pas prétendre que SocGen = leader M&A mondial.',
  },
  {
    id: 'hsbc',
    categoryId: 'universal-bank',
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
    dealEmblematique: {
      titre: 'Sanofi / Opella → CD&R',
      texte: 'Coordinateur dette sur Opella. HSBC apporte son réseau global de distribution dette, même si le deal est centré France/Europe.',
    },
    emblematicDealId: 'd01',
    questionPiège: 'HSBC est-elle une banque française ou britannique ?',
    reponsePiège:
      'Siège historique Londres, forte présence Hong Kong et Asie. En France, équipes CIB actives mais le groupe reste UK/Asia-centric. Ne pas la présenter comme concurrent direct de BNP sur le retail FR.',
  },
  {
    id: 'ubs',
    categoryId: 'universal-bank',
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
    dealEmblematique: {
      titre: 'Goldman Sachs Alternatives / Mace Consult',
      texte: 'Sell-side M&A advisor pour Mace Group (carve-out consulting infra). UBS conseille le vendeur pendant que GS Alternatives rachète 75% via le bras PE de Goldman.',
    },
    emblematicDealId: 'd03',
    questionPiège:
      'UBS a racheté Credit Suisse — quel impact sur le recrutement M&A ?',
    reponsePiège:
      'Consolidation : synergies, intégration des équipes, possible rationalisation à court terme, mais UBS renforce sa position en wealth et IB suisse. Montrer qu\'on suit l\'intégration CS/UBS (2023) sans dramatiser — le pipeline M&A cross-border continue (Mace, Swisscom).',
  },
  {
    id: 'deutsche-bank',
    categoryId: 'universal-bank',
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
    dealEmblematique: {
      titre: 'Swisscom / Vodafone Italia → Fastweb',
      texte: 'Buy-side M&A advisor avec Evercore et JPM sur Vodafone Italia (~8 Md€ EV). DB = relais naturel sur les mandats telecom et cross-border Europe.',
    },
    emblematicDealId: 'd07',
    questionPiège: 'Deutsche Bank est-elle encore en difficulté ?',
    reponsePiège:
      'Turnaround depuis 2019 (Christian Sewing) : recentrage sur l\'IB, réduction des activités risquées, retour à la rentabilité. Ne pas ressasser la crise 2008 — montrer la stratégie actuelle et un deal récent (Swisscom) comme preuve de reprise.',
  },
];

export const BANK_PROFILES: Record<string, BankProfile> = Object.fromEntries(
  BANK_LIST.map(b => [b.id, b]),
);

export const BANKS_BY_CATEGORY: Record<BankCategoryId, BankProfile[]> = Object.fromEntries(
  BANK_CATEGORY_IDS.map(id => [id, BANK_LIST.filter(b => b.categoryId === id)]),
) as Record<BankCategoryId, BankProfile[]>;

export function getBankById (id: string): BankProfile | undefined {
  return BANK_PROFILES[id];
}

export function isValidBankId (id: string): boolean {
  return id in BANK_PROFILES;
}

export function getBanksByCategory (id: BankCategoryId): BankProfile[] {
  return BANKS_BY_CATEGORY[id];
}

export function getDealsForBank (name: string): MaDeal[] {
  return MA_DEALS.filter(d => dealMatchesBank(d, name));
}

const BANK_NAME_TO_ID: Record<string, string> = Object.fromEntries(
  BANK_LIST.map(b => [b.name, b.id]),
);

export function getBankIdByName (name: string): string | undefined {
  return BANK_NAME_TO_ID[name];
}
