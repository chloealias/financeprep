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
  /** Absent si le deal emblématique n'est pas dans l'actualité M&A (ex. fusion CS/UBS) */
  emblematicDealId?: string;
  /** deal = lien vers ?deal= ; bank = liste filtrée ?bank= (coordinateurs dette) */
  emblematicLinkType?: 'deal' | 'bank';
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
      titre: 'Lineage Logistics — IPO (2024)',
      texte: 'Bookrunner sur la plus grande IPO mondiale 2024 (~18 Md$). MS illustre la force ECM / equity capital markets en plus des grands M&A.',
    },
    emblematicDealId: 'd13',
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
      texte: 'LBO ~16 Md€ : Citi buy-side M&A lead + coordinateur dette (club avec GS, Barclays, BNP, MS, SocGen, HSBC). Modèle integrated advisory + financing.',
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
      texte: 'LBO ~16 Md€ : Barclays coordinateur dette (Term Loan B, bridge HY). Angle Lev Fin européen sur un carve-out flagship.',
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
    emblematicLinkType: 'bank',
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
    emblematicLinkType: 'bank',
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
      titre: 'Swisscom / Vodafone Italia → Fastweb',
      texte: 'Sell-side M&A advisor sur l\'acquisition Vodafone Italia (~8 Md€ EV). UBS illustre le conseil cross-border telecom Europe.',
    },
    emblematicDealId: 'd07',
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
  {
    id: 'evercore',
    categoryId: 'elite-boutique',
    name: 'Evercore',
    category: 'Elite boutique (US / Europe)',
    hq: 'New York / Londres / Paris',
    tagline: 'Conseil M&A indépendant — référence sell-side luxe et cross-border Europe',
    divisions: ['M&A advisory', 'Restructuring', 'Equities advisory', 'Private capital advisory'],
    particularites: [
      'Modèle 100% advisory — pas de balance sheet, pas de conflit de financement',
      'Sell-side lead sur Kering Beauté / Creed (avec Centerview)',
      'Buy-side Swisscom / Vodafone Italia avec DB et JPM',
      'Paris : hub européen actif sur luxe, consumer et telecom',
      'Culture analytique, équipes relativement petites vs bulge',
    ],
    recrutement: 'Entretiens techniques (DCF, comps) + fit. Stages très sélectifs à Paris et Londres.',
    pointEntretien:
      'Citer un mandat sell-side ET buy-side récent. Expliquer pourquoi Evercore vs bulge : indépendance, focus conseil, réputation sell-side sur les assets premium.',
    dealEmblematique: {
      titre: 'Kering Beauté / Creed → L\'Oréal',
      texte: 'Sell-side advisor avec Centerview (~4 Md€ cash). Deal emblématique du positionnement Evercore sur le luxe et les cessions stratégiques sous pression bilancielle.',
    },
    emblematicDealId: 'd06',
    questionPiège:
      'Evercore peut-elle financer un LBO comme BNP sur Opella ?',
    reponsePiège:
      'Non — Evercore est pure advisory. Sur Opella, elle n\'apparaît pas car le mandat est sell-side pharma/consumer chez Rothschild & BNP. Sur Kering/L\'Oréal, Evercore maximise le prix sans pousser un financement maison — c\'est l\'argument clé de l\'elite boutique.',
  },
  {
    id: 'centerview',
    categoryId: 'elite-boutique',
    name: 'Centerview Partners',
    category: 'Elite boutique (US / Europe)',
    hq: 'New York / Londres',
    tagline: 'Boutique premium — sell-side stratégique sur les plus grands mandats consumer',
    divisions: ['M&A advisory', 'Restructuring'],
    particularites: [
      'Réputation « top of the league » sur sell-side stratégique US et Europe',
      'Co-lead sell-side Kering Beauté avec Evercore',
      'Pas de trading, pas de lending — conseil pur',
      'Équipes très senior-led, peu de juniors par deal',
      'Forte présence Londres sur consumer & healthcare',
    ],
    recrutement: 'Process très sélectif, fit culturel et cas M&A approfondis. Réseau alumni prestigieux.',
    pointEntretien:
      'Montrer la connaissance du deal Kering/L\'Oréal et expliquer pourquoi Centerview est mandatée sell-side (confidentialité, crédibilité auprès des acheteurs stratégiques).',
    dealEmblematique: {
      titre: 'Kering Beauté / Creed → L\'Oréal',
      texte: 'Sell-side avec Evercore sur la plus grande acquisition de l\'histoire de L\'Oréal. Illustre le positionnement Centerview sur les sell-side « trophy ».',
    },
    emblematicDealId: 'd06',
    questionPiège:
      'Centerview et Evercore — pourquoi deux boutiques sur le même sell-side ?',
    reponsePiège:
      'Pratique courante sur les mega-deals : partage de la charge, expertise complémentaire (juridictions, process), crédibilité renforcée auprès du board. Ce n\'est pas une duplication — chaque boutique a un rôle défini dans le process.',
  },
  {
    id: 'houlihan-lokey',
    categoryId: 'elite-boutique',
    name: 'Houlihan Lokey',
    category: 'Elite boutique (restructuring)',
    hq: 'Los Angeles / Londres / Paris',
    tagline: 'N°1 mondial du restructuring — référence créanciers holdco et situations spéciales',
    divisions: ['Financial restructuring', 'M&A', 'Financial advisory', 'Corporate finance'],
    particularites: [
      'Leader mondial du restructuring (classements Refinitiv)',
      'Mandat créanciers holdco Altice (~4,4 Md€) vs Lazard débiteur / Rothschild secured',
      'Paris : équipe restructuring et M&A mid-cap active',
      'Modèle advisory pur, forte culture technique dette',
    ],
    recrutement: 'Entretiens techniques dette + comptabilité. Profils appréciés : juridique, finance structurée, M&A.',
    pointEntretien:
      'Distinguer mandat débiteur vs créanciers sur Altice. Citer Houlihan Lokey uniquement pour le holdco — erreur fréquente en entretien.',
    dealEmblematique: {
      titre: 'Altice France — Restructuration €24 Md',
      texte: 'Advisor restructuring côté créanciers holdco (~4,4 Md€). Complémentaire de Lazard (débiteur) et Rothschild (secured) — cas d\'école des mandats multi-advisors.',
    },
    emblematicDealId: 'd02',
    questionPiège:
      'Houlihan Lokey conseille-t-elle Patrick Drahi ou les créanciers ?',
    reponsePiège:
      'Les créanciers holdco, pas Drahi. Lazard = débiteur. Rothschild = secured (~19 Md€). Houlihan Lokey = holdco (~4,4 Md€). Confondre les camps = erreur éliminatoire en entretien restructuring.',
  },
  {
    id: 'credit-suisse',
    categoryId: 'universal-bank',
    name: 'Credit Suisse',
    category: 'Banque suisse (intégrée à UBS)',
    hq: 'Zurich (legacy)',
    tagline: 'Legacy Credit Suisse — intégrée à UBS (mars 2023) — toujours testée en entretien',
    divisions: ['Investment Banking (legacy)', 'Wealth Management (legacy)', 'Asset Management'],
    particularites: [
      'Rachat d\'urgence par UBS à la demande de la FINMA (mars 2023) après crise de confiance',
      'Avant fusion : force en equity derivatives, wealth management, advisory suisse',
      'Archegos (2021) et crédit AT1 (2023) = cas d\'école risque et régulation',
      'En entretien 2026 : parler au passé (« CS était… ») et lier à la stratégie UBS actuelle',
      'Ne plus postuler chez « Credit Suisse » — recrutement via UBS',
    ],
    recrutement: 'Recrutement désormais via UBS. Connaître l\'historique CS reste indispensable pour les entretiens IB suisses.',
    pointEntretien:
      'Expliquer la fusion CS/UBS (FINMA, sauvetage systémique, ~3 Md$ de pertes AT1). Distinguer Credit Suisse (IB/wealth) d\'UBS (leader consolidé). Citer UBS sur les deals récents (Mace, Swisscom).',
    dealEmblematique: {
      titre: 'Fusion UBS / Credit Suisse (mars 2023)',
      texte: 'Sauvetage systémique orchestré par la FINMA. Création du 1er groupe bancaire suisse (~1 500 Md$ d\'actifs). Cas incontournable risque, régulation et consolidation bancaire européenne.',
    },
    questionPiège:
      'Peut-on encore postuler chez Credit Suisse à Paris ?',
    reponsePiège:
      'Non — l\'entité juridique Credit Suisse a été absorbée par UBS. En entretien, montrer qu\'on suit l\'intégration (synergies, rationalisation) et qu\'on postule chez UBS si l\'objectif est la Suisse / l\'IB européenne.',
    piegeAEviter: 'Ne pas confondre Credit Suisse avec Crédit Agricole (France) ni avec UBS post-merger.',
  },
  {
    id: 'mediobanca',
    categoryId: 'universal-bank',
    name: 'Mediobanca',
    category: 'Banque d\'investissement italienne',
    hq: 'Milan',
    tagline: 'Champion italien du conseil M&A et du corporate banking',
    divisions: ['CIB (M&A, ECM, DCM)', 'Wealth management', 'Consumer credit (via Compass)'],
    particularites: [
      'Référence M&A Italie : Generali, telecom, luxe, mid-cap familiales',
      'Modèle « merchant bank » historique — participations stratégiques (Generalí, RCS)',
      'Acteur clé sur consolidation bancaire italienne (contexte UniCredit / Commerzbank indirect)',
      'Paris : présence plus limitée qu\'à Milan — profil souvent Italy-focused',
    ],
    recrutement: 'Process italien + entretiens en anglais. Cas M&A et motivation Italie/Europe sud.',
    pointEntretien:
      'Citer UniCredit / Commerzbank comme contexte macro FIG Europe. Montrer l\'intérêt pour le mid-cap italien et les dynasties familiales.',
    dealEmblematique: {
      titre: 'UniCredit / Commerzbank (2024-2026)',
      texte: 'Contexte consolidation bancaire européenne — Mediobanca suit de près les OPA transfrontalières comme advisor historique du secteur FIG italien.',
    },
    emblematicDealId: 'd04',
    questionPiège:
      'Mediobanca est-elle une boutique ou une banque universelle ?',
    reponsePiège:
      'Banque d\'investissement intégrée italienne (CIB + wealth + crédit), pas une elite boutique indépendante. Elle a des participations stratégiques long terme — modèle hybride unique en Europe.',
  },
  {
    id: 'natixis',
    categoryId: 'universal-bank',
    name: 'Natixis',
    category: 'Banque française (Groupe BPCE)',
    hq: 'Paris',
    tagline: 'CIB du Groupe BPCE — M&A, financement et asset management',
    divisions: ['Global Banking (M&A, DCM, Lev Fin)', 'Global Financial Services', 'Mirova (AM ESG)'],
    particularites: [
      'Filiale CIB de BPCE (2e réseau bancaire français)',
      'Force en financement structuré, export finance, FIG',
      'M&A conseil sur mid/large cap France — moins iconique que BNP/Lazard',
      'Mirova = leader asset management durable (différenciation groupe)',
    ],
    recrutement: 'Concours et entretiens type grande banque FR. Motivation BPCE + Natixis CIB.',
    pointEntretien:
      'Expliquer le lien BPCE / Natixis / réseau Banque Populaire et Caisse d\'Épargne. Citer un deal FIG ou consumer récent en France.',
    dealEmblematique: {
      titre: 'UniCredit / Commerzbank (2024-2026)',
      texte: 'Natixis CIB suit la consolidation FIG européenne — référence pour les entretiens banque France sur les OPA transfrontalières et la souveraineté bancaire allemande.',
    },
    emblematicDealId: 'd04',
    questionPiège:
      'Natixis et BPCE, quelle différence ?',
    reponsePiège:
      'BPCE = holding (Banque Populaire + Caisse d\'Épargne). Natixis = bras CIB et asset management du groupe. En entretien CIB, postuler chez « Natixis » (marque marchés) tout en connaissant le actionnaire BPCE.',
  },
  {
    id: 'credit-agricole-cib',
    categoryId: 'universal-bank',
    name: 'Crédit Agricole CIB',
    category: 'Banque française (universal)',
    hq: 'Paris / Montrouge',
    tagline: 'Bras CIB du Crédit Agricole — financement et conseil corporate Europe',
    divisions: ['Investment Banking', 'Global Markets', 'Securities services'],
    particularites: [
      'Intégré au 1er réseau bancaire français (Crédit Agricole SA)',
      'Fort en DCM, loan origination, export finance — moins visible en sell-side M&A pur que BNP',
      'Présence solide Europe, Amériques et Asie sur corporates',
      'Culture plus corporate que Rothschild/Lazard',
    ],
    recrutement: 'Process FR standard. Tests logique + entretiens techniques. Stages CIB Paris très demandés.',
    pointEntretien:
      'Comparer avec BNP : CA-CIB plus orienté financement, BNP plus équilibré M&A + Lev Fin. Connaître la structure mutualiste du groupe.',
    dealEmblematique: {
      titre: 'Sanofi / Opella → CD&R',
      texte: 'Présent sur l\'écosystème des grands deals français en financing — à distinguer du rôle sell-side lead de Rothschild sur Opella.',
    },
    emblematicDealId: 'd01',
    emblematicLinkType: 'bank',
    questionPiège:
      'Crédit Agricole CIB et Crédit Agricole retail, c\'est la même entité ?',
    reponsePiège:
      'Même groupe, entités distinctes : CA-CIB = banque d\'investissement (Montrouge), réseau retail = caisses régionales. En entretien IB, préciser « CIB » pour montrer qu\'on connaît la structure.',
  },
  {
    id: 'jefferies',
    categoryId: 'bulge-bracket',
    name: 'Jefferies',
    category: 'Investment bank (mid-market / growth)',
    hq: 'New York / Londres',
    tagline: 'Banque d\'investissement indépendante — mid-cap, growth et special situations',
    divisions: ['Investment Banking', 'Equities', 'Fixed income', 'Jefferies Financial Services'],
    particularites: [
      'Positionnement entre elite boutique et bulge : conseil + trading, pas de retail',
      'Buy-side Mace / GS Alternatives — présent sur carve-outs et mid-cap',
      'Culture entrepreneuriale, équipes plus petites que GS/JPM',
      'Europe : Londres hub principal, deals cross-border actifs',
    ],
    recrutement: 'Entretiens techniques + fit entrepreneurial. Moins de « prestige branding » que GS — compensé par responsabilités rapides.',
    pointEntretien:
      'Citer Mace (buy-side avec Lazard) ou Worldline (sell-side Jefferies sole advisor). Montrer l\'intérêt pour mid-cap et situations complexes.',
    dealEmblematique: {
      titre: 'Goldman Sachs Alternatives / Mace Consult',
      texte: 'Buy-side M&A advisor avec Lazard sur le carve-out Mace (~$1 Md rev.). Illustre le positionnement Jefferies sur les deals mid-cap et PE-sponsored.',
    },
    emblematicDealId: 'd03',
    questionPiège:
      'Jefferies est-elle une bulge bracket ?',
    reponsePiège:
      'Non — « middle market investment bank » indépendante. Plus petite que les bulge, mais plus large qu\'une elite boutique pure. En entretien, ne pas la classer avec GS/JPM ; la comparer à Evercore/Moelis sur certains mandats mid-cap.',
  },
  {
    id: 'macquarie',
    categoryId: 'bulge-bracket',
    name: 'Macquarie',
    category: 'Banque australienne (infra & alternatives)',
    hq: 'Sydney / Londres',
    tagline: 'Leader mondial infrastructure et asset management — forte présence Europe',
    divisions: ['Macquarie Asset Management', 'Banking & Financial Services', 'Commodities & Global Markets'],
    particularites: [
      'Plus grand gestionnaire d\'infra au monde (rotation build → hold → sell)',
      'Sell-side Vinci / Safeway Concessions Inde (~1,6 Md$)',
      'Modèle unique : banque + asset manager intégré',
      'Londres : hub européen infra, renewables, transport',
    ],
    recrutement: 'Entretiens fit + cas infra/PE. Profils appréciés : ingénierie, infra, finance structurée.',
    pointEntretien:
      'Citer Vinci/Safeway et expliquer le modèle Macquarie (acquérir, stabiliser, céder). Multiples infra élevés = visibilité cash flows long terme.',
    dealEmblematique: {
      titre: 'Vinci / Safeway Concessions (autoroutes Inde)',
      texte: 'Vendeur (Macquarie AM) sur le carve-out autoroutier indien (~1,6 Md$). Cas d\'école rotation de portefeuille infra.',
    },
    emblematicDealId: 'd10',
    questionPiège:
      'Macquarie est-elle une banque d\'investissement classique ?',
    reponsePiège:
      'Hybride : CIB classique + asset management infra dominant. En entretien infra/PE, Macquarie est souvent plus pertinente que GS. Ne pas la présenter comme une bulge M&A généraliste.',
  },
  {
    id: 'oddo-bhf',
    categoryId: 'elite-boutique',
    name: 'Oddo BHF',
    category: 'Groupe financier indépendant (France / Allemagne)',
    hq: 'Paris / Francfort',
    tagline: 'Banque franco-allemande indépendante — M&A mid-cap et corporate brokerage',
    divisions: ['Corporate & Investment Banking', 'Private banking', 'Asset management'],
    particularites: [
      'Indépendance actionnariale (famille Oddo) — pas de conglomérat bancaire',
      'Force mid-cap France et DACH : M&A, ECM, research',
      'Fusion Oddo + BHF (2017) = plateforme franco-allemande unique',
      'Moins présente sur les mega-deals que Lazard/Rothschild',
    ],
    recrutement: 'Entretiens FR/DE selon desk. Motivation mid-cap européen et indépendance.',
    pointEntretien:
      'Expliquer le modèle indépendant vs BNP/SocGen. Citer un angle mid-cap France ou cross-border Franco-Allemand.',
    dealEmblematique: {
      titre: 'Positionnement mid-cap Europe',
      texte: 'Oddo BHF conseille les ETI et mid-cap familiales franco-allemandes — segment peu couvert par les bulge, complémentaire aux mega-deals de l\'actualité M&A.',
    },
    questionPiège:
      'Oddo BHF est-elle une boutique ou une banque universelle ?',
    reponsePiège:
      'Groupe indépendant diversifié (CIB + banque privée + AM), mais pas universal bank au sens BNP (pas de retail massif). Positionnement « independent financial group » — terme à utiliser en entretien.',
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
