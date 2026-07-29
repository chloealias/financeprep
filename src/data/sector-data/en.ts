import { Building, Car, Factory, Heart, Landmark, Monitor, ShoppingCart, Zap } from "lucide-react";
import type { SectorId } from "@/lib/sectors";
import type { SectorSheetData } from "./types";

export const SECTOR_DATA: Record<SectorId, SectorSheetData> = {
  tmt: {
    name: "TMT",
    tag: "Tech, Media & Telecom",
    Icon: Monitor,
    panorama: {
      tailleMarche: "~$6,000bn global TMT revenue (2025) — software ~35%, telecom ~40%, media ~25%",
      volumeMa: "~2,800 global M&A deals/year >$50m; Europe ~650 deals/year >$50m (Dealogic)",
      acteursMajeurs: [
        "Microsoft, Alphabet, Meta, Amazon (cloud & software)",
        "Apple (hardware + services)",
        "SAP, Oracle, Salesforce (enterprise software Europe)",
        "Orange, Deutsche Telekom, Vodafone, Swisscom (telecom EU)",
        "Netflix, Disney, Warner (streaming)",
        "NVIDIA, ASML (semi / AI infra)",
      ],
      segmentsCles: [
        "B2B SaaS",
        "Convergent telecom",
        "Semi & cloud infra",
        "Streaming & gaming",
        "Cybersecurity",
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
      { label: "EV/Revenue (high-growth SaaS)", value: "8-15x" },
      { label: "EV/EBITDA (mature telecom)", value: "6-10x" },
      { label: "EV/EBITDA (profitable software)", value: "12-20x" },
      { label: "P/E (tech large cap)", value: "25-40x" },
    ],
    tendances: [
      "AI consolidation: GAFAM acquiring startups",
      "Regulatory pressure: DMA in Europe, US antitrust",
      "Streaming wars: media debundling / rebundling",
      "Infrastructure: fibre, 5G, data centers in strong demand",
    ],
    deal: {
      titre: "Swisscom / Vodafone Italia → Fastweb",
      texte:
        "European telecom consolidation (~€8bn EV, ~6x EBITDA). Swisscom builds a convergent challenger in Italy vs TIM and Iliad. Major antitrust issues.",
    },
    emblematicDealId: "d07",
    question:
      "Why can a SaaS company trade at 15x revenue while a profitable industrial trades at 8x EBITDA?",
    reponse:
      "Growth and recurrence. A SaaS company growing 30% with 90% retention will generate far more future FCF. Valuation is forward-looking, not backward-looking.",
  },
  sante: {
    name: "Healthcare",
    tag: "Healthcare & Pharma",
    Icon: Heart,
    panorama: {
      tailleMarche: "~$1,700bn global pharma + medtech; Europe ~$450bn (EFPIA)",
      volumeMa:
        "~1,200 global healthcare M&A deals/year; Europe ~280 deals/year >$25m (biotech bolt-ons dominant)",
      acteursMajeurs: [
        "Roche, Novartis, AstraZeneca, Sanofi, Bayer (Europe)",
        "Pfizer, J&J, Merck, AbbVie, Eli Lilly (US)",
        "Novo Nordisk (obesity / diabetes — valuation leader)",
        "Medtronic, Siemens Healthineers, Philips (medtech)",
        "IQVIA, Fresenius (services / equipment)",
      ],
      segmentsCles: [
        "Big Pharma",
        "Pre-revenue biotech",
        "Medtech",
        "Consumer health / OTC",
        "Services & CRO",
      ],
    },
    kpis: [
      "R&D pipeline (phase I/II/III)",
      "Revenue by indication",
      "Pricing power",
      "R&D-adjusted EBITDA",
      "Time to market",
    ],
    multiples: [
      { label: "EV/EBITDA (established pharma)", value: "12-18x" },
      { label: "EV/Revenue (pre-profit biotech)", value: "5-20x (pipeline-dependent)" },
      { label: "EV/EBITDA (medtech)", value: "15-25x" },
      { label: "P/E (Big Pharma)", value: "15-22x" },
    ],
    tendances: [
      "GLP-1 / obesity: race between Novo Nordisk, Eli Lilly and challengers",
      "Big Pharma buying biotech pipelines to refresh portfolios",
      "US pricing pressure: Inflation Reduction Act",
      "Rise of gene therapies and precision medicine",
    ],
    deal: {
      titre: "Sanofi / Opella — sale to CD&R (2025)",
      texte:
        "~€16bn EV for the consumer healthcare division (Doliprane, Fervex). Sanofi refocuses on biotech. Multiple ~14x EBITDA. Politically controversial.",
    },
    emblematicDealId: "d01",
    question: "How do you value a biotech with no revenue and no EBITDA?",
    reponse:
      "Sum-of-the-parts on the pipeline: probability of success by phase × discounted revenue if approved × market share. rNPV (risk-adjusted NPV) method.",
  },
  energie: {
    name: "Energy",
    tag: "Oil & Gas, Utilities, Renewables",
    Icon: Zap,
    panorama: {
      tailleMarche: "~$6,000bn global energy market; utilities + renewables ~$2,500bn",
      volumeMa:
        "~450 global O&G deals/year >$100m; renewables ~180 deals/year >$50m (accelerating consolidation)",
      acteursMajeurs: [
        "ExxonMobil, Chevron, Shell, BP, TotalEnergies (majors)",
        "Equinor, Eni, Repsol (mixed Europe)",
        "Ørsted, RWE, Iberdrola, Enel (utilities / renewables)",
        "EDF, Engie (France)",
        "NextEra, Brookfield (US renewable infra)",
      ],
      segmentsCles: [
        "Upstream O&G",
        "Midstream",
        "Regulated utilities",
        "Wind / solar",
        "Nuclear & grids",
      ],
    },
    kpis: [
      "EBITDA / bbl (oil & gas)",
      "Proved reserves (P1/P2)",
      "Installed capacity (GW)",
      "LCOE (renewables production cost)",
      "CapEx / FCF ratio",
    ],
    multiples: [
      { label: "EV/EBITDA (oil majors)", value: "5-7x" },
      { label: "EV/EBITDA (utilities)", value: "8-12x" },
      { label: "EV/EBITDA (renewables)", value: "10-15x" },
      { label: "P/E (integrated oil)", value: "10-14x" },
    ],
    tendances: [
      "Energy transition: ESG pressure on O&G, massive renewables investment",
      "Commodity price volatility post-Ukraine",
      "Offshore wind consolidation (Ørsted, RWE, BP)",
      "Nuclear renaissance in Europe (France, Poland, UK)",
    ],
    deal: {
      titre: "ExxonMobil / Pioneer Natural Resources (2024)",
      texte:
        "$60bn — largest energy acquisition in 20 years. Pioneer leads the Permian basin (US shale). Exxon consolidates reserves despite ESG pressure.",
    },
    emblematicDealId: "d12",
    question:
      "Why are oil majors making large acquisitions while the world wants to decarbonize?",
    reponse:
      "O&G assets have a 10–30 year life. Near-term demand remains high. Majors buy reserves at discounted prices and generate cash to fund the transition. Rational logic on a 2035 horizon.",
  },
  retail: {
    name: "Retail / FMCG",
    tag: "Consumer Goods & Distribution",
    Icon: ShoppingCart,
    panorama: {
      tailleMarche: "~$5,500bn global FMCG + retail; luxury ~$400bn (Bain)",
      volumeMa:
        "~900 global consumer & retail deals/year >$50m; Europe ~220 deals/year (luxury & beauty very active)",
      acteursMajeurs: [
        "L'Oréal, Nestlé, Unilever, P&G, Danone (FMCG)",
        "LVMH, Kering, Hermès, Richemont (luxury)",
        "Carrefour, Tesco, Ahold, Schwarz Group (EU retail)",
        "Amazon, Walmart (retail / e-commerce)",
        "Coty, Estée Lauder (beauty)",
      ],
      segmentsCles: [
        "Branded FMCG",
        "Luxury & beauty",
        "Grocery retail",
        "E-commerce",
        "Food service",
      ],
    },
    kpis: [
      "LFL (like-for-like growth)",
      "EBITDA margin",
      "Inventory / sales",
      "Maintenance vs expansion CapEx",
      "Net Promoter Score",
    ],
    multiples: [
      { label: "EV/EBITDA (food retail)", value: "6-10x" },
      { label: "EV/EBITDA (branded FMCG)", value: "12-18x" },
      { label: "EV/EBITDA (e-commerce)", value: "15-25x" },
      { label: "P/E (luxury)", value: "25-40x" },
    ],
    tendances: [
      "DTC (direct-to-consumer): brands bypassing traditional retail",
      "Rise of private label under inflation pressure",
      "M&A in organic / wellness / premium (resilient segment)",
      "Margin pressure: retailer vs supplier bargaining power",
    ],
    deal: {
      titre: "Kering Beauté / Creed → L'Oréal",
      texte:
        "€4bn cash — largest acquisition in L'Oréal's history. Gucci/Balenciaga/Bottega licenses for 50 years. Multiple ~12x revenue.",
    },
    emblematicDealId: "d06",
    question:
      "Why is an FMCG brand worth more than a retailer with the same EBITDA?",
    reponse:
      "Pricing power, recurrence, IP protection, customer loyalty. The retailer is a price-taker (margins under pressure). The brand is a price-maker. Higher earnings quality → justified multiple premium.",
  },
  industrie: {
    name: "Industrials",
    tag: "Industrials & Manufacturing",
    Icon: Factory,
    panorama: {
      tailleMarche: "~$12,000bn global industrial revenue (machinery, aero, chemicals, construction)",
      volumeMa:
        "~1,500 global industrial deals/year >$50m; Europe ~400 deals/year (defense up sharply post-2022)",
      acteursMajeurs: [
        "Siemens, Schneider Electric, ABB (EU automation)",
        "Airbus, Safran, Leonardo, Rheinmetall (aero / defense)",
        "Vinci, Bouygues, ACS (construction / infra)",
        "Honeywell, GE Aerospace, Caterpillar (US diversified)",
        "Thales, BAE Systems (UK/FR defense)",
      ],
      segmentsCles: [
        "Aero & defense",
        "Machinery & automation",
        "Chemicals",
        "Construction & EPC",
        "Industrial services",
      ],
    },
    kpis: [
      "EBITDA margin",
      "CapEx / Revenue",
      "Book-to-bill ratio (backlog)",
      "ROCE (Return on Capital Employed)",
      "Working capital days",
    ],
    multiples: [
      { label: "EV/EBITDA (diversified industrials)", value: "8-12x" },
      { label: "EV/EBITDA (aero/defense)", value: "12-18x" },
      { label: "EV/EBITDA (construction)", value: "6-9x" },
      { label: "EV/EBIT (engineering)", value: "12-16x" },
    ],
    tendances: [
      "Reshoring / nearshoring: bringing production chains closer",
      "Defense: rising European budgets post-Ukraine (>2% NATO GDP)",
      "Automation and robotics: deal driver in manufacturing",
      "Order boom linked to the energy transition",
    ],
    deal: {
      titre: "Goldman Sachs Alternatives / Mace Consult",
      texte:
        "Infra consulting carve-out (~$1bn rev.). GS Alternatives acquires 75% — UBS sell-side. Illustrates the pure-play consulting premium vs contracting.",
    },
    emblematicDealId: "d03",
    question:
      "How do you model an industrial group with long-term contracts at variable margins?",
    reponse:
      "Analyze the order book (backlog) and its visibility. Model separately by segment by contract type (fixed-price vs cost-plus). Stress-test win rates on new contracts and cost overruns.",
  },
  auto: {
    name: "Automotive",
    tag: "Automotive & mobility",
    Icon: Car,
    panorama: {
      tailleMarche: "~$3,000bn global auto revenue (new vehicles + suppliers)",
      volumeMa:
        "~200 global auto deals/year >$100m; OEM and EV consolidation (2024-26); China = 1/3 of the market",
      acteursMajeurs: [
        "Stellantis (Peugeot, Fiat, Jeep, RAM)",
        "Renault Group (Renault, Dacia, Alpine)",
        "Volkswagen Group (VW, Audi, Porsche, Škoda)",
        "BMW Group, Mercedes-Benz",
        "Tesla, BYD (BEV leaders)",
        "Forvia, Valeo, Continental (suppliers)",
      ],
      segmentsCles: [
        "Volume OEMs (mass market)",
        "Premium / luxury",
        "BEV & hybrids",
        "Tier-1 suppliers",
        "Mobility / services",
      ],
    },
    kpis: [
      "Volumes (units sold)",
      "ASP (average selling price)",
      "BEV / PHEV / ICE mix",
      "Vehicle margin (auto ops)",
      "Platform & battery CapEx",
      "Order book / delivery times",
    ],
    multiples: [
      { label: "EV/EBIT (profitable OEMs)", value: "4-8x (cyclical)" },
      { label: "P/E (listed)", value: "5-12x depending on cycle" },
      { label: "EV/Sales (EV pure-play)", value: "1-4x" },
      { label: "EV/EBIT (suppliers)", value: "6-10x" },
    ],
    tendances: [
      "Electrification: margin pressure, battery costs, EV price war",
      "Consolidation: shared platforms, China-Europe JVs",
      "Destocking and return of incentives (US IRA, EU)",
      "Software-defined vehicle: OTA, subscriptions, tech partnerships",
    ],
    deal: {
      titre: "Automotive — EV consolidation and price pressure",
      texte:
        "2025-26 M&A theme: BEV transition, price pressure, Chinese OEM entry. Stellantis, Renault, VW at the core of sector interviews.",
    },
    emblematicDealId: "d17",
    question:
      "Why can an OEM show positive EBITDA but still trade at a low valuation?",
    reponse:
      "Cyclicality (peak margin = late cycle), heavy CapEx (EV, new platforms), uncertainty on BEV mix and volumes. The market anticipates a margin turn. Compare EV/EBIT on a normalized cycle, not the peak.",
  },
  immo: {
    name: "Real Estate",
    tag: "Real Estate & REITs",
    Icon: Building,
    panorama: {
      tailleMarche:
        "~$340,000bn global real estate assets; transaction market ~$1,200bn/year (cycle-dependent)",
      volumeMa:
        "~350 global RE deals/year >$100m (2024-25 recovery after rate correction); logistics & data centers most active",
      acteursMajeurs: [
        "Blackstone, Brookfield, Prologis (logistics / RE PE)",
        "Unibail-Rodamco, Gecina, Klepierre (EU retail / offices)",
        "Vonovia, LEG (German residential)",
        "Lineage, Americold (cold storage REITs)",
        "Digital Realty, Equinix (data centers)",
      ],
      segmentsCles: [
        "Offices",
        "Logistics",
        "Residential",
        "Retail RE",
        "Data centers & specialized infra",
      ],
    },
    kpis: [
      "NAV (Net Asset Value)",
      "FFO (Funds From Operations)",
      "Occupancy rate",
      "Net rental yield",
      "LTV (Loan-to-Value)",
    ],
    multiples: [
      { label: "Premium / discount to NAV (REITs)", value: "+10% / -20% by cycle" },
      { label: "EV/EBITDA (developers)", value: "8-14x" },
      { label: "Cap rate (prime Paris offices)", value: "4-5%" },
      { label: "Cap rate (logistics)", value: "4-5.5%" },
    ],
    tendances: [
      "Higher rates: valuation correction and refinancing stress",
      "Offices: post-COVID crisis (remote work), rising vacancy in secondary assets",
      "Logistics: strong demand (e-commerce), compressed yields",
      "Data centers: high-growth asset class, elevated valuations",
    ],
    deal: {
      titre: "Lineage Logistics — IPO (2024)",
      texte:
        "$18bn valuation. REIT focused on cold storage. Largest global IPO in 2024. Bookrunners: Morgan Stanley, Goldman Sachs, JPMorgan.",
    },
    emblematicDealId: "d13",
    question: "Why use FFO rather than net income to value a REIT?",
    reponse:
      "REITs heavily depreciate assets, depressing accounting net income. But real estate can appreciate. FFO (= Net Income + D&A − gains on disposals) measures cash actually available for dividends.",
  },
  fi: {
    name: "FIG",
    tag: "Financial Institutions",
    Icon: Landmark,
    panorama: {
      tailleMarche:
        "~€35,000bn euro-area bank assets; global insurance ~$6,000bn premiums",
      volumeMa:
        "~120 European FIG deals/year >$100m (banks, asset managers, insurance); accelerating bank consolidation (UniCredit/CBK)",
      acteursMajeurs: [
        "BNP Paribas, Société Générale, Crédit Agricole, Natixis (France)",
        "HSBC, Barclays, Lloyds (UK)",
        "Deutsche Bank, Commerzbank, UniCredit (Germany / Italy)",
        "Santander, BBVA, ING (Southern / Northern Europe)",
        "Amundi, DWS, UBS AM (asset management)",
        "Allianz, AXA, Generali (insurance)",
      ],
      segmentsCles: [
        "Universal banks",
        "Investment banks",
        "Insurance",
        "Asset management",
        "Fintech / payments",
      ],
    },
    kpis: [
      "ROE (Return on Equity)",
      "CET1 ratio (regulatory capital)",
      "NIM (Net Interest Margin)",
      "Cost-to-income ratio",
      "NPL ratio",
    ],
    multiples: [
      { label: "P/Book (European banks)", value: "0.5-1.2x" },
      { label: "P/E (banks)", value: "8-12x" },
      { label: "P/Book (insurers)", value: "1.0-2.0x" },
      { label: "P/AUM (asset managers)", value: "2-4%" },
    ],
    tendances: [
      "Higher rates: NIM improvement (but rising credit risk)",
      "European bank consolidation (UniCredit / Commerzbank)",
      "Regulatory pressure: Basel IV, capital requirements",
      "Asset management: consolidation (Amundi, DWS, Natixis)",
    ],
    deal: {
      titre: "UniCredit / Commerzbank (2024-2026)",
      texte:
        "Offer document published 5 May 2026 (exchange 0.485 UC share / CBK share, ~€31/share). Stake ~28-30%, acceptance until 16 June 2026. Also cite: UBS/Credit Suisse merger 2023 (regulation, AT1).",
    },
    emblematicDealId: "d04",
    question: "Why can't you use EV/EBITDA to value a bank?",
    reponse:
      "Debt is a raw material for a bank, not financing. You cannot separate operating assets from debt. Use equity metrics: P/Book, P/E, or sum-of-the-parts. EV has no conceptual meaning for a bank.",
  },
};
