import type { CategoryId } from "@/lib/categories";

export interface Acronym {
  abbr: string;
  english?: string;
  french: string;
}

export interface AcronymSection {
  title: string;
  /** Lien vers l'onglet Concepts avec ce filtre */
  hubCategory?: CategoryId;
  items: Acronym[];
}

export const acronymSections: AcronymSection[] = [
  {
    title: "Valeur & valorisation",
    hubCategory: "valuation",
    items: [
      { abbr: "EV", english: "Enterprise Value", french: "Valeur d'entreprise (tous financeurs)" },
      { abbr: "EqV", english: "Equity Value", french: "Valeur des fonds propres (actionnaires)" },
      { abbr: "DCF", english: "Discounted Cash Flow", french: "Valorisation par flux actualisés" },
      { abbr: "TV", english: "Terminal Value", french: "Valeur terminale" },
      {
        abbr: "APV",
        english: "Adjusted Present Value",
        french: "DCF alternatif (FCFF + tax shield séparé)",
      },
      { abbr: "DDM", english: "Dividend Discount Model", french: "Valorisation par dividendes" },
      { abbr: "GW", english: "Goodwill", french: "Écart d'acquisition" },
    ],
  },
  {
    title: "Multiples",
    hubCategory: "valuation",
    items: [
      { abbr: "EV/EBITDA", french: "Multiple universel de valorisation" },
      { abbr: "P/E", english: "Price/Earnings", french: "PER, multiple grand public" },
      { abbr: "EV/Sales", french: "Multiple pour entreprises non-rentables" },
      {
        abbr: "LTM",
        english: "Last Twelve Months",
        french: "12 derniers mois (multiples trailing)",
      },
      {
        abbr: "NTM",
        english: "Next Twelve Months",
        french: "12 prochains mois (multiples forward)",
      },
    ],
  },
  {
    title: "Coût du capital & rendement",
    hubCategory: "valuation",
    items: [
      {
        abbr: "WACC",
        english: "Weighted Average Cost of Capital",
        french: "Coût moyen pondéré du capital",
      },
      {
        abbr: "CAPM",
        english: "Capital Asset Pricing Model",
        french: "Modèle pour calculer le Ke",
      },
      { abbr: "Ke", english: "Cost of Equity", french: "Coût des fonds propres" },
      { abbr: "Kd", english: "Cost of Debt", french: "Coût de la dette" },
      { abbr: "β / Beta", english: "Beta", french: "Sensibilité au marché" },
      { abbr: "Rf", english: "Risk-Free Rate", french: "Taux sans risque" },
      {
        abbr: "ERP / MRP",
        english: "Equity / Market Risk Premium",
        french: "Prime de risque action",
      },
      { abbr: "ROE", english: "Return on Equity", french: "Rentabilité des fonds propres" },
      {
        abbr: "ROIC",
        english: "Return on Invested Capital",
        french: "Rentabilité du capital investi",
      },
      {
        abbr: "ROCE",
        english: "Return on Capital Employed",
        french: "Rentabilité capitaux employés",
      },
      {
        abbr: "TRI / IRR",
        english: "Internal Rate of Return",
        french: "Taux de rendement interne",
      },
      {
        abbr: "MOIC",
        english: "Multiple On Invested Capital",
        french: "Multiple sur capital investi",
      },
      {
        abbr: "CAGR",
        english: "Compound Annual Growth Rate",
        french: "Taux de croissance annuel composé",
      },
    ],
  },
  {
    title: "États financiers & agrégats",
    hubCategory: "accounting",
    items: [
      { abbr: "P&L", english: "Profit & Loss", french: "Compte de résultat" },
      { abbr: "BS", english: "Balance Sheet", french: "Bilan" },
      { abbr: "CF / CFS", english: "Cash Flow Statement", french: "Tableau des flux" },
      {
        abbr: "EBITDA",
        english: "Earnings Before Interest, Taxes, D&A",
        french: "Résultat opérationnel avant amort. et dépr. (≠ EBE français)",
      },
      {
        abbr: "EBIT",
        english: "Earnings Before Interest & Taxes",
        french: "Résultat opérationnel",
      },
      { abbr: "D&A", english: "Depreciation & Amortization", french: "Amortissements" },
      { abbr: "NI", english: "Net Income", french: "Résultat net" },
      { abbr: "EPS", english: "Earnings Per Share", french: "Bénéfice par action" },
      { abbr: "COGS", english: "Cost of Goods Sold", french: "Coût des marchandises vendues" },
      {
        abbr: "SG&A",
        english: "Selling, General & Administrative Expenses",
        french: "Frais commerciaux et admin",
      },
      { abbr: "SBC", english: "Stock-Based Compensation", french: "Rémunération en actions" },
      { abbr: "AR", english: "Accounts Receivable", french: "Créances clients" },
      { abbr: "AP", english: "Accounts Payable", french: "Dettes fournisseurs" },
      { abbr: "DTA", english: "Deferred Tax Asset", french: "Impôt différé actif" },
      { abbr: "DTL", english: "Deferred Tax Liability", french: "Impôt différé passif" },
    ],
  },
  {
    title: "Cash flow & BFR",
    hubCategory: "accounting",
    items: [
      {
        abbr: "FCFF",
        english: "Free Cash Flow to Firm",
        french: "FCF pour tous les financeurs (utilisé en DCF)",
      },
      {
        abbr: "FCFE",
        english: "Free Cash Flow to Equity",
        french: "FCF pour actionnaires uniquement",
      },
      {
        abbr: "OCF / CFO",
        english: "Operating Cash Flow",
        french: "Flux de trésorerie opérationnel",
      },
      { abbr: "CAPEX", english: "Capital Expenditures", french: "Investissements" },
      { abbr: "NWC / WC", english: "(Net) Working Capital", french: "BFR" },
      { abbr: "DSO", english: "Days Sales Outstanding", french: "Délai d'encaissement clients" },
      { abbr: "DPO", english: "Days Payable Outstanding", french: "Délai paiement fournisseurs" },
      { abbr: "DIO", english: "Days Inventory Outstanding", french: "Durée de stockage" },
    ],
  },
  {
    title: "M&A — Process & documents",
    hubCategory: "ma",
    items: [
      { abbr: "M&A", english: "Mergers & Acquisitions", french: "Fusions-acquisitions" },
      { abbr: "IPO", english: "Initial Public Offering", french: "Introduction en bourse" },
      { abbr: "NDA", english: "Non-Disclosure Agreement", french: "Accord de confidentialité" },
      { abbr: "LOI", english: "Letter of Intent", french: "Lettre d'intention" },
      {
        abbr: "IM / CIM",
        english: "(Confidential) Information Memorandum",
        french: "« Bible » du deal",
      },
      { abbr: "NBO", english: "Non-Binding Offer", french: "Offre indicative (1er tour)" },
      { abbr: "BBO", english: "Binding Bid Offer", french: "Offre ferme (2e tour)" },
      { abbr: "DD", english: "Due Diligence", french: "Audit d'acquisition" },
      { abbr: "VDD", english: "Vendor Due Diligence", french: "DD faite par le vendeur" },
      { abbr: "QoE", english: "Quality of Earnings", french: "Analyse qualité de l'EBITDA" },
      { abbr: "SPA", english: "Share Purchase Agreement", french: "Contrat de cession d'actions" },
      {
        abbr: "PPA",
        english: "Purchase Price Allocation",
        french: "Allocation du prix d'acquisition",
      },
      {
        abbr: "MAC",
        english: "Material Adverse Change",
        french: "Clause d'évènement adverse majeur",
      },
      { abbr: "CFDF", english: "Cash-Free Debt-Free", french: "Base de calcul du prix en M&A" },
      { abbr: "R&W", english: "Representations & Warranties", french: "Garanties du vendeur" },
      { abbr: "CP", english: "Conditions Precedent", french: "Conditions suspensives au closing" },
      { abbr: "W&I", english: "Warranty & Indemnity Insurance", french: "Assurance garanties" },
      {
        abbr: "TSA",
        english: "Transition Services Agreement",
        french: "Services transitoires post-deal",
      },
      { abbr: "Locked Box", french: "Mécanisme de prix fixe à date passée" },
      { abbr: "Earn-Out", french: "Complément de prix sur performance future" },
      { abbr: "Vendor Loan", french: "Crédit-vendeur" },
      { abbr: "OPA / OPE", french: "Offre Publique d'Achat / d'Échange — mécaniques de bourse" },
    ],
  },
  {
    title: "Private Equity & LBO",
    hubCategory: "lbo",
    items: [
      { abbr: "PE", english: "Private Equity", french: "Capital-investissement" },
      { abbr: "LBO", english: "Leveraged Buy-Out", french: "Acquisition à effet de levier" },
      { abbr: "MBO", english: "Management Buy-Out", french: "LBO par l'équipe en place" },
      { abbr: "SBO", english: "Secondary Buy-Out", french: "PE vend à un autre PE" },
      { abbr: "LBU", english: "Leveraged Build-Up", french: "Croissance externe en LBO" },
      { abbr: "P2P", english: "Public-to-Private", french: "Retrait de cote par un PE" },
      { abbr: "MEP", english: "Management Equity Plan", french: "Plan d'intéressement dirigeants" },
      { abbr: "GP", english: "General Partner", french: "Société de gestion (le fonds PE)" },
      { abbr: "LP", english: "Limited Partner", french: "Investisseur dans un fonds PE" },
      { abbr: "DPI", english: "Distributions to Paid-In", french: "Cash rendu aux LPs" },
      { abbr: "TVPI", english: "Total Value to Paid-In", french: "DPI + valeur résiduelle" },
      { abbr: "Carry / Carried Interest", french: "Intérêt sur performance (typiquement 20%)" },
      { abbr: "Hurdle Rate", french: "Seuil de rendement avant carry (souvent 8%)" },
      { abbr: "Dry Powder", french: "Capital levé non encore investi" },
    ],
  },
  {
    title: "Dette & financement",
    hubCategory: "lbo",
    items: [
      { abbr: "PIK", english: "Payment In Kind", french: "Intérêts payés en dette (pas en cash)" },
      { abbr: "TLA / TLB", english: "Term Loan A / B", french: "Tranches de dette senior LBO" },
      { abbr: "RCF", english: "Revolving Credit Facility", french: "Crédit revolving pour BFR" },
      { abbr: "HY", english: "High Yield", french: "Obligations à haut rendement" },
      { abbr: "ICR", english: "Interest Coverage Ratio", french: "EBITDA / Intérêts" },
      { abbr: "DSCR", english: "Debt Service Coverage Ratio", french: "CFO / service de la dette" },
      { abbr: "D/E", english: "Debt-to-Equity", french: "Ratio dette / fonds propres" },
      { abbr: "Net Debt / EBITDA", french: "Ratio de levier (le KPI #1 en LBO)" },
    ],
  },
  {
    title: "Normes & régulateurs",
    items: [
      { abbr: "IFRS", english: "International Financial Reporting Standards", french: "Normes comptables internationales (IASB), adoptées en UE" },
      { abbr: "US GAAP", english: "Generally Accepted Accounting Principles", french: "Normes US" },
      { abbr: "AMF", english: "Autorité des Marchés Financiers", french: "Régulateur français" },
      { abbr: "DG COMP", french: "Direction concurrence, Commission européenne (antitrust UE)" },
    ],
  },
  {
    title: "SaaS & ESG",
    items: [
      {
        abbr: "ARR / MRR",
        english: "Annual / Monthly Recurring Revenue",
        french: "Métriques SaaS",
      },
      { abbr: "LTV / CAC", french: "Lifetime Value / Customer Acquisition Cost (SaaS)" },
      { abbr: "NRR", english: "Net Revenue Retention", french: "Rétention nette (SaaS)" },
      {
        abbr: "ESG",
        english: "Environmental, Social, Governance",
        french: "Critères extra-financiers",
      },
    ],
  },
];

// Backwards compatibility: flat list
export const acronyms: Acronym[] = acronymSections.flatMap((s) => s.items);
