import type { LucideIcon } from "lucide-react";
import { Building, Factory, Heart, Landmark, Monitor, ShoppingCart, Zap } from "lucide-react";
import type { SectorId } from "@/lib/sectors";

export type SectorPanorama = {
  /** Taille du marché adressable (ordre de grandeur global ou Europe) */
  tailleMarche: string;
  /** Volume M&A annuel typique (deals > seuil, zone géographique) */
  volumeMa: string;
  /** Principaux acteurs cotés / stratégiques à citer en entretien */
  acteursMajeurs: string[];
  /** Segments ou sous-secteurs structurants */
  segmentsCles: string[];
};

export type SectorSheetData = {
  name: string;
  tag: string;
  Icon: LucideIcon;
  panorama: SectorPanorama;
  kpis: string[];
  multiples: { label: string; value: string }[];
  tendances: string[];
  deal: { titre: string; texte: string };
  emblematicDealId?: string;
  question: string;
  reponse: string;
};

export const SECTOR_DATA: Record<SectorId, SectorSheetData> = {
  tmt: {
    name: "TMT",
    tag: "Tech, Media & Telecom",
    Icon: Monitor,
    panorama: {
      tailleMarche: "~6 000 Md$ de CA global TMT (2025) — software ~35%, telecom ~40%, média ~25%",
      volumeMa: "~2 800 deals M&A/an mondiaux >50 M$ ; Europe ~650 deals/an >50 M$ (Dealogic)",
      acteursMajeurs: [
        "Microsoft, Alphabet, Meta, Amazon (cloud & software)",
        "Apple (hardware + services)",
        "SAP, Oracle, Salesforce (enterprise software Europe)",
        "Orange, Deutsche Telekom, Vodafone, Swisscom (telecom EU)",
        "Netflix, Disney, Warner (streaming)",
        "NVIDIA, ASML (semi / infra IA)",
      ],
      segmentsCles: [
        "SaaS B2B",
        "Telecom convergent",
        "Semi & cloud infra",
        "Streaming & gaming",
        "Cybersécurité",
      ],
    },
    kpis: [
      "ARR / MRR (SaaS)",
      "Churn rate",
      "LTV / CAC ratio",
      "EBITDA margin",
      "Free Cash Flow yield",
    ],
    multiples: [
      { label: "EV/Revenue (SaaS forte croissance)", value: "8-15x" },
      { label: "EV/EBITDA (Telecom matures)", value: "6-10x" },
      { label: "EV/EBITDA (Software profitable)", value: "12-20x" },
      { label: "P/E (Tech large cap)", value: "25-40x" },
    ],
    tendances: [
      "Consolidation IA : acquisitions de startups par les GAFAM",
      "Pression réglementaire : DMA en Europe, antitrust US",
      "Streaming wars : débundling / rebundling dans les médias",
      "Infrastructure : fibre, 5G, data centers en forte demande",
    ],
    deal: {
      titre: "Swisscom / Vodafone Italia → Fastweb",
      texte:
        "Consolidation telecom européenne (~8 Md€ EV, ~6x EBITDA). Swisscom crée un challenger convergent en Italie face à TIM et Iliad. Enjeux antitrust majeurs.",
    },
    emblematicDealId: "d07",
    question:
      "Pourquoi un SaaS peut-il se valoriser à 15x revenue alors qu'une industrie profitable vaut 8x EBITDA ?",
    reponse:
      "La croissance et la récurrence. Un SaaS à 30% de croissance et 90% de rétention génèrera beaucoup plus de FCF futur. La valorisation est forward-looking, pas backward-looking.",
  },
  sante: {
    name: "Santé",
    tag: "Healthcare & Pharma",
    Icon: Heart,
    panorama: {
      tailleMarche: "~1 700 Md$ pharma + medtech global ; Europe ~450 Md$ (EFPIA)",
      volumeMa:
        "~1 200 deals M&A santé/an mondiaux ; Europe ~280 deals/an >25 M$ (bolt-on biotech dominant)",
      acteursMajeurs: [
        "Roche, Novartis, AstraZeneca, Sanofi, Bayer (Europe)",
        "Pfizer, J&J, Merck, AbbVie, Eli Lilly (US)",
        "Novo Nordisk (obésité / diabète — leader valorisation)",
        "Medtronic, Siemens Healthineers, Philips (medtech)",
        "IQVIA, Fresenius (services / équipement)",
      ],
      segmentsCles: [
        "Big Pharma",
        "Biotech pré-revenus",
        "Medtech",
        "Consumer health / OTC",
        "Services & CRO",
      ],
    },
    kpis: [
      "Pipeline R&D (phase I/II/III)",
      "Revenus par indication",
      "Pricing power",
      "EBITDA ajusté R&D",
      "Time to market",
    ],
    multiples: [
      { label: "EV/EBITDA (Pharma établie)", value: "12-18x" },
      { label: "EV/Revenue (Biotech pré-profit)", value: "5-20x (selon pipeline)" },
      { label: "EV/EBITDA (Medtech)", value: "15-25x" },
      { label: "P/E (Big Pharma)", value: "15-22x" },
    ],
    tendances: [
      "GLP-1 / obésité : course entre Novo Nordisk, Eli Lilly et challengers",
      "Big Pharma rachète des pipelines biotech pour renouveler leurs portefeuilles",
      "Pression prix aux US : Inflation Reduction Act",
      "Essor des thérapies géniques et de la médecine de précision",
    ],
    deal: {
      titre: "Sanofi / Opella — cession à CD&R (2025)",
      texte:
        "~16 Md€ EV pour la division consumer healthcare (Doliprane, Fervex). Sanofi se recentre sur biotech. Multiple ~14x EBITDA. Controversé politiquement.",
    },
    emblematicDealId: "d01",
    question: "Comment valorise-t-on une biotech sans revenus ni EBITDA ?",
    reponse:
      "Sum-of-the-parts sur le pipeline : probabilité de succès par phase × valeur actualisée des revenus si approuvé × part de marché. Méthode rNPV (risk-adjusted NPV).",
  },
  energie: {
    name: "Énergie",
    tag: "Oil & Gas, Utilities, Renouvelables",
    Icon: Zap,
    panorama: {
      tailleMarche: "~6 000 Md$ marché énergie global ; utilities + renouvelables ~2 500 Md$",
      volumeMa:
        "~450 deals O&G/an mondiaux >100 M$ ; renouvelables ~180 deals/an >50 M$ (consolidation accélérée)",
      acteursMajeurs: [
        "ExxonMobil, Chevron, Shell, BP, TotalEnergies (majors)",
        "Equinor, Eni, Repsol (Europa mixte)",
        "Ørsted, RWE, Iberdrola, Enel (utilities / renouvelables)",
        "EDF, Engie (France)",
        "NextEra, Brookfield (infra renouvelable US)",
      ],
      segmentsCles: [
        "Upstream O&G",
        "Midstream",
        "Utilities régulées",
        "Éolien / solaire",
        "Nucléaire & grids",
      ],
    },
    kpis: [
      "EBITDA / bbl (oil & gas)",
      "Réserves prouvées (P1/P2)",
      "Capacité installée (GW)",
      "LCOE (coût production renouvelables)",
      "CapEx / FCF ratio",
    ],
    multiples: [
      { label: "EV/EBITDA (Oil majors)", value: "5-7x" },
      { label: "EV/EBITDA (Utilities)", value: "8-12x" },
      { label: "EV/EBITDA (Renouvelables)", value: "10-15x" },
      { label: "P/E (Oil intégrées)", value: "10-14x" },
    ],
    tendances: [
      "Transition énergétique : pression ESG sur O&G, investissements massifs dans le renouvelable",
      "Volatilité prix commodités post-Ukraine",
      "Consolidation dans l'éolien offshore (Ørsted, RWE, BP)",
      "Renaissance du nucléaire en Europe (France, Pologne, UK)",
    ],
    deal: {
      titre: "ExxonMobil / Pioneer Natural Resources (2024)",
      texte:
        "60 Md$ — plus grande acquisition énergie depuis 20 ans. Pioneer leader du bassin Permian (shale US). Exxon consolide ses réserves malgré les pressions ESG.",
    },
    emblematicDealId: "d12",
    question:
      "Pourquoi les majors pétrolières font des acquisitions massives alors que le monde veut décarboner ?",
    reponse:
      "Les actifs O&G ont une durée de vie de 10-30 ans. La demande reste élevée à court terme. Les majors rachètent des réserves à prix cassé et génèrent du cash pour financer la transition. Logique rationnelle à horizon 2035.",
  },
  retail: {
    name: "Retail / FMCG",
    tag: "Consumer Goods & Distribution",
    Icon: ShoppingCart,
    panorama: {
      tailleMarche: "~5 500 Md$ FMCG + distribution global ; luxe ~400 Md$ (Bain)",
      volumeMa:
        "~900 deals consumer & retail/an mondiaux >50 M$ ; Europe ~220 deals/an (luxe & beauté très actifs)",
      acteursMajeurs: [
        "L'Oréal, Nestlé, Unilever, P&G, Danone (FMCG)",
        "LVMH, Kering, Hermès, Richemont (luxe)",
        "Carrefour, Tesco, Ahold, Schwarz Group (distribution EU)",
        "Amazon, Walmart (retail / e-commerce)",
        "Coty, Estée Lauder (beauté)",
      ],
      segmentsCles: [
        "FMCG marques",
        "Luxe & beauté",
        "Grande distribution",
        "E-commerce",
        "Food service",
      ],
    },
    kpis: [
      "LFL (Like-for-Like growth)",
      "EBITDA margin",
      "Inventaire / Ventes",
      "CapEx maintenance vs expansion",
      "Net Promoter Score",
    ],
    multiples: [
      { label: "EV/EBITDA (Distribution alimentaire)", value: "6-10x" },
      { label: "EV/EBITDA (FMCG marques)", value: "12-18x" },
      { label: "EV/EBITDA (E-commerce)", value: "15-25x" },
      { label: "P/E (Luxe)", value: "25-40x" },
    ],
    tendances: [
      "DTC (Direct-to-Consumer) : les marques court-circuitent la grande distribution",
      "Montée des MDD (marque de distributeur) sous pression de l'inflation",
      "M&A dans le bio / wellness / premium (segment résilient)",
      "Pression marges : pouvoir de négociation distributeurs vs fournisseurs",
    ],
    deal: {
      titre: "Kering Beauté / Creed → L'Oréal",
      texte:
        "4 Md€ cash — plus grande acquisition de l'histoire de L'Oréal. Licences Gucci/Balenciaga/Bottega sur 50 ans. Multiple ~12x revenue.",
    },
    emblematicDealId: "d06",
    question:
      "Pourquoi une marque FMCG vaut-elle plus cher qu'un distributeur avec le même EBITDA ?",
    reponse:
      "Pricing power, récurrence, protection IP, fidélité client. Le distributeur est price-taker (marges sous pression). La marque est price-maker. Qualité des bénéfices supérieure → premium de multiple justifié.",
  },
  industrie: {
    name: "Industrie",
    tag: "Industrials & Manufacturing",
    Icon: Factory,
    panorama: {
      tailleMarche: "~12 000 Md$ CA industriels mondiaux (machines, aéro, chimie, BTP)",
      volumeMa:
        "~1 500 deals industriels/an mondiaux >50 M$ ; Europe ~400 deals/an (défense en forte hausse post-2022)",
      acteursMajeurs: [
        "Siemens, Schneider Electric, ABB (automation EU)",
        "Airbus, Safran, Leonardo, Rheinmetall (aéro / défense)",
        "Vinci, Bouygues, ACS (construction / infra)",
        "Honeywell, GE Aerospace, Caterpillar (US diversifiés)",
        "Thales, BAE Systems (défense UK/FR)",
      ],
      segmentsCles: [
        "Aéro & défense",
        "Machines & automation",
        "Chimie",
        "Construction & EPC",
        "Services industriels",
      ],
    },
    kpis: [
      "EBITDA margin",
      "CapEx / Revenue",
      "Book-to-Bill ratio (carnet)",
      "ROCE (Return on Capital Employed)",
      "Working Capital days",
    ],
    multiples: [
      { label: "EV/EBITDA (Industriels diversifiés)", value: "8-12x" },
      { label: "EV/EBITDA (Aéro/Défense)", value: "12-18x" },
      { label: "EV/EBITDA (Construction)", value: "6-9x" },
      { label: "EV/EBIT (Engineering)", value: "12-16x" },
    ],
    tendances: [
      "Reshoring / nearshoring : rapatriement de chaînes de production",
      "Défense : hausse des budgets en Europe post-Ukraine (>2% PIB OTAN)",
      "Automatisation et robotique : deal-driver dans la fabrication",
      "Boom des commandes liées à la transition énergétique",
    ],
    deal: {
      titre: "Goldman Sachs Alternatives / Mace Consult",
      texte:
        "Carve-out consulting infra (~$1 Md rev.). GS Alternatives acquiert 75% — UBS sell-side. Illustre la prime des pure-play consulting vs contracting.",
    },
    emblematicDealId: "d03",
    question:
      "Comment modélisez-vous un groupe industriel avec des contrats long-terme à marge variable ?",
    reponse:
      "On analyse le carnet de commandes (backlog) et sa visibilité. Modélisation séparée par segment selon le type de contrat (fixed-price vs cost-plus). Stress test sur le taux de gain de nouveaux contrats et les cost overruns.",
  },
  immo: {
    name: "Immobilier",
    tag: "Real Estate & REITs",
    Icon: Building,
    panorama: {
      tailleMarche:
        "~340 000 Md$ d'actifs immobiliers mondiaux ; marché transactionnel ~1 200 Md$/an (cycle-dépendant)",
      volumeMa:
        "~350 deals immo/an mondiaux >100 M$ (2024-25 en reprise après correction taux) ; logistique & data centers les plus actifs",
      acteursMajeurs: [
        "Blackstone, Brookfield, Prologis (logistique / PE immo)",
        "Unibail-Rodamco, Gecina, Klepierre (retail / bureaux EU)",
        "Vonovia, LEG (résidentiel Allemagne)",
        "Lineage, Americold (cold storage REITs)",
        "Digital Realty, Equinix (data centers)",
      ],
      segmentsCles: [
        "Bureaux",
        "Logistique",
        "Résidentiel",
        "Retail immo",
        "Data centers & infra spécialisée",
      ],
    },
    kpis: [
      "NAV (Net Asset Value)",
      "FFO (Funds From Operations)",
      "Taux d'occupation",
      "Rendement locatif net",
      "LTV (Loan-to-Value)",
    ],
    multiples: [
      { label: "Prime / décote à la NAV (REITs)", value: "+10% / -20% selon cycle" },
      { label: "EV/EBITDA (Promoteurs)", value: "8-14x" },
      { label: "Cap Rate (bureaux prime Paris)", value: "4-5%" },
      { label: "Cap Rate (logistique)", value: "4-5.5%" },
    ],
    tendances: [
      "Hausse des taux : correction des valorisations et difficultés de refinancement",
      "Bureaux : crise post-COVID (télétravail), vacance en hausse dans les secondaires",
      "Logistique : forte demande (e-commerce), rendements comprimés",
      "Data centers : asset class en forte croissance, valorisations élevées",
    ],
    deal: {
      titre: "Lineage Logistics — IPO (2024)",
      texte:
        "18 Md$ de valorisation. REIT spécialisé dans l'entreposage frigorifique. Plus grande IPO mondiale 2024. Bookrunners : Morgan Stanley, Goldman Sachs, JPMorgan.",
    },
    emblematicDealId: "d13",
    question: "Pourquoi utilise-t-on le FFO plutôt que le net income pour valoriser un REIT ?",
    reponse:
      "Les REITs amortissent massivement leurs actifs, déprimant le net income comptable. Mais l'immobilier peut s'apprécier. Le FFO (= Net Income + D&A − gains sur cessions) mesure le cash réellement disponible pour les dividendes.",
  },
  fi: {
    name: "FIG",
    tag: "Financial Institutions",
    Icon: Landmark,
    panorama: {
      tailleMarche:
        "~35 000 Md€ d'actifs bancaires zone euro ; assurance mondiale ~6 000 Md$ primes",
      volumeMa:
        "~120 deals FIG/an en Europe >100 M$ (banques, asset managers, assurance) ; consolidation bancaire accélérée (UniCredit/CBK)",
      acteursMajeurs: [
        "BNP Paribas, Société Générale, Crédit Agricole, Natixis (France)",
        "HSBC, Barclays, Lloyds (UK)",
        "Deutsche Bank, Commerzbank, UniCredit (Allemagne / Italie)",
        "Santander, BBVA, ING (Sud / Nord Europe)",
        "Amundi, DWS, UBS AM (asset management)",
        "Allianz, AXA, Generali (assurance)",
      ],
      segmentsCles: [
        "Banques universelles",
        "Banques d'investissement",
        "Assurance",
        "Asset management",
        "Fintech / payments",
      ],
    },
    kpis: [
      "ROE (Return on Equity)",
      "CET1 ratio (capital réglementaire)",
      "NIM (Net Interest Margin)",
      "Cost-to-Income ratio",
      "NPL ratio",
    ],
    multiples: [
      { label: "P/Book (Banques européennes)", value: "0.5-1.2x" },
      { label: "P/E (Banques)", value: "8-12x" },
      { label: "P/Book (Assureurs)", value: "1.0-2.0x" },
      { label: "P/AUM (Asset managers)", value: "2-4%" },
    ],
    tendances: [
      "Hausse des taux : amélioration des NIM (mais risque crédit en hausse)",
      "Consolidation bancaire en Europe (UniCredit / Commerzbank)",
      "Pression réglementaire : Bâle IV, exigences en capital",
      "Asset management : consolidation (Amundi, DWS, Natixis)",
    ],
    deal: {
      titre: "UniCredit / Commerzbank (2024-2026)",
      texte:
        "Document d'offre publié le 5 mai 2026 (échange 0,485 action UC/action CBK, ~31 €/action). Stake ~28-30 %, acceptation jusqu'au 16 juin 2026. À citer aussi : fusion UBS/Credit Suisse 2023 (régulation, AT1).",
    },
    emblematicDealId: "d04",
    question: "Pourquoi ne peut-on pas utiliser l'EV/EBITDA pour valoriser une banque ?",
    reponse:
      "La dette est une matière première pour une banque, pas un financement. Impossible de séparer actifs d'exploitation et dette. On utilise des métriques equity : P/Book, P/E, ou sum-of-the-parts. L'EV n'a pas de sens conceptuel pour un établissement bancaire.",
  },
};
