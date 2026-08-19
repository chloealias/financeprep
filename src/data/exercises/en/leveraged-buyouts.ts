import type { Exercise } from "@/data/exercise-types";

const S = {
  ACTORS: "LBO Financing Actors",
  DOCS: "Documentation & Management",
  TAKE_PRIVATE: "Take-Private Rationale",
  LEVERAGE: "Leverage & Asset Base",
  EXIT: "Exit Strategies & Value Creation",
  SENIORITY: "Capital Structure Seniority",
  REVOLVER: "Revolver — Usage & Cost",
  INSTRUMENTS: "ABL, HY Bonds, Bridge & Alternatives",
  COVENANTS: "Covenants — Classification & Mechanics",
  BOND_PRICING: "Bond Pricing & Yield",
  GP_LP: "GP/LP Economics",
  VALUATION: "LBO Valuation Drivers",
};

export const leveragedBuyoutsExercises: Exercise[] = [
  // --- Actors ---
  {
    id: "4.1",
    theme: "leveraged-buyouts",
    section: S.ACTORS,
    title: "NOT a typical financial sponsor",
    variants: [
      {
        kind: "choice",
        prompt: `All of the following are typical "financial sponsors" EXCEPT:`,
        options: ["Private equity firm", "Commercial bank", "Hedge fund", "Venture capital firm"],
        correctIndex: 1,
        method: "Commercial banks are lenders, not sponsors. Sponsors include PE firms, merchant banking divisions, hedge funds, VC firms, and SPACs.",
      },
    ],
  },
  {
    id: "4.2",
    theme: "leveraged-buyouts",
    section: S.ACTORS,
    title: "Limited partners providing capital",
    variants: [
      {
        kind: "choice",
        prompt: `Which are limited partners that provide sponsors with investment capital?

I. Pension funds  II. Insurance companies  III. University endowments  IV. Wealthy families`,
        options: ["I and II", "I and III", "I, III, and IV", "I, II, III, and IV"],
        correctIndex: 3,
        method: "All four are traditional LPs. Sovereign wealth funds also qualify.",
      },
    ],
  },
  {
    id: "4.3",
    theme: "leveraged-buyouts",
    section: S.ACTORS,
    title: "NOT a bank lender",
    variants: [
      {
        kind: "choice",
        prompt: "Bank lenders consist of all of the following EXCEPT:",
        options: ["Commercial banks", "Loan mutual funds", "Equity asset managers", "Credit hedge funds"],
        correctIndex: 2,
        method: "Equity asset managers are not bank lenders. The institutional lending base includes hedge funds, pension funds, prime funds, insurers, and structured vehicles.",
      },
    ],
  },
  {
    id: "4.4",
    theme: "leveraged-buyouts",
    section: S.ACTORS,
    title: "NOT a bond investor",
    variants: [
      {
        kind: "choice",
        prompt: "Bond investors consist of all of the following EXCEPT:",
        options: ["Hedge funds", "Insurance companies", "Distressed debt funds", "REITs"],
        correctIndex: 3,
        method: "HY bond investors include mutual funds, hedge funds, pension funds, insurers, and distressed funds. REITs are not typical bond investors.",
      },
    ],
  },
  {
    id: "4.5",
    theme: "leveraged-buyouts",
    section: S.ACTORS,
    title: "Most likely term loan A lender",
    variants: [
      {
        kind: "choice",
        prompt: "Which is the most likely term loan A lender?",
        options: ["Company executive", "Commercial bank", "Mezzanine fund", "Equity asset manager"],
        correctIndex: 1,
        method: "Commercial banks are the primary TLA lenders.",
      },
    ],
  },
  // --- Documentation ---
  {
    id: "4.6",
    theme: "leveraged-buyouts",
    section: S.DOCS,
    title: "NOT part of financing commitment",
    variants: [
      {
        kind: "choice",
        prompt: "Which is NOT part of an investment bank's financing commitment?",
        options: ["Commitment letter", "Institutional letter", "Engagement letter", "Fee letter"],
        correctIndex: 1,
        method: "'Institutional letter' does not exist. The commitment includes: commitment letter, engagement letter, and fee letter.",
      },
    ],
  },
  {
    id: "4.7",
    theme: "leveraged-buyouts",
    section: S.DOCS,
    title: "CIM for a credit facility — what it does NOT contain",
    variants: [
      {
        kind: "choice",
        prompt: "A CIM for a credit facility contains all of the following EXCEPT:",
        options: ["Investment highlights", "Projected financials", "Description of Notes", "Industry overview"],
        correctIndex: 2,
        method: "'Description of Notes' belongs in a bond indenture, not a CIM.",
      },
    ],
  },
  {
    id: "4.8",
    theme: "leveraged-buyouts",
    section: S.DOCS,
    title: "How management provides tangible value in an LBO",
    variants: [
      {
        kind: "choice",
        prompt: "How does target company management provide tangible value in an LBO?",
        options: [
          "Helping to achieve favorable financing terms",
          "Ability to draft a quality 10-K",
          "Knowledge of IPO process",
          "Management only provides intangible benefits",
        ],
        correctIndex: 0,
        method: "A strong management team can achieve favorable financing terms via a compelling credit investor presentation.",
      },
    ],
  },
  {
    id: "4.9",
    theme: "leveraged-buyouts",
    section: S.DOCS,
    title: "Legal documents governing bank debt and bonds",
    variants: [
      {
        kind: "choice",
        prompt: "What are the legal documents governing bank debt and bonds, respectively?",
        options: [
          "Credit agreement; definitive agreement",
          "Indenture; credit agreement",
          "Credit agreement; indenture",
          "Indenture; definitive agreement",
        ],
        correctIndex: 2,
        method: "Bank debt → credit agreement. Bonds → indenture.",
      },
    ],
  },
  // --- Take-private ---
  {
    id: "4.10",
    theme: "leveraged-buyouts",
    section: S.TAKE_PRIVATE,
    title: "NOT a reason for a take-private LBO",
    variants: [
      {
        kind: "choice",
        prompt: "All of the following are reasons for a take-private LBO EXCEPT:",
        options: [
          "Onerous Sarbanes-Oxley requirements",
          "Access to equity capital markets",
          "Belief that the market undervalues the company",
          "Belief that public ownership is too onerous",
        ],
        correctIndex: 1,
        method: "Access to equity capital markets is an advantage of being public — not a reason to go private.",
      },
    ],
  },
  {
    id: "4.11",
    theme: "leveraged-buyouts",
    section: S.TAKE_PRIVATE,
    title: "Potential LBO candidates",
    variants: [
      {
        kind: "choice",
        prompt: `Which would be potential LBO candidates?

I. Troubled companies  II. Companies in fragmented markets  III. Solid performing companies  IV. Non-core subsidiaries`,
        options: ["III and IV", "I, II, and III", "II, III, and IV", "I, II, III, and IV"],
        correctIndex: 3,
        method: "All four can be LBO candidates: turnarounds, roll-ups, strong performers, and non-core carve-outs.",
      },
    ],
  },
  {
    id: "4.12",
    theme: "leveraged-buyouts",
    section: S.TAKE_PRIVATE,
    title: "Desirable characteristics for LBO candidates",
    variants: [
      {
        kind: "choice",
        prompt: `Which are desirable characteristics for traditional LBO candidates?

I. Strong market positions  II. High cyclicality  III. Large asset base  IV. Speculative business model`,
        options: ["I and II", "I and III", "II and III", "III and IV"],
        correctIndex: 1,
        method: "Strong market positions and large asset base. High cyclicality and speculative models increase risk.",
      },
    ],
  },
  // --- Leverage & assets ---
  {
    id: "4.13",
    theme: "leveraged-buyouts",
    section: S.LEVERAGE,
    title: "Maximizing leverage — key characteristic",
    variants: [
      {
        kind: "choice",
        prompt: "The ability to maximize leverage in an LBO is facilitated for a company with which characteristic?",
        options: [
          "Track record for bolt-on acquisitions",
          "Tight covenant package",
          "Strong asset base",
          "Large debt balance",
        ],
        correctIndex: 2,
        method: "A strong asset base pledged as collateral increases lender willingness to provide debt.",
      },
    ],
  },
  {
    id: "4.14",
    theme: "leveraged-buyouts",
    section: S.LEVERAGE,
    title: "Management characteristics valued by sponsors",
    variants: [
      {
        kind: "choice",
        prompt: `What do sponsors look for in an LBO candidate's management?

I. Track record of accretive acquisitions  II. Experience with leveraged capital structures  III. Substantial prior compensation  IV. History of implementing poison pills`,
        options: ["I and II", "I and III", "II, III, and IV", "I, II, III, and IV"],
        correctIndex: 0,
        method: "Acquisition track record and experience operating under leverage are most valued.",
      },
    ],
  },
  // --- Exit strategies ---
  {
    id: "4.15",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "Common exit strategies",
    variants: [
      {
        kind: "choice",
        prompt: `Which are common exit strategies for sponsors?

I. Refinancing  II. IPO  III. Sale to a strategic buyer  IV. Sale to another sponsor`,
        options: ["II and IV", "I, II, and III", "I, III, and IV", "II, III, and IV"],
        correctIndex: 3,
        method: "Refinancing is monetization but not a true exit — the sponsor retains ownership.",
      },
    ],
  },
  {
    id: "4.16",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "NOT a means of multiple expansion",
    variants: [
      {
        kind: "choice",
        prompt: "Which is NOT a typical means for a sponsor to achieve multiple expansion upon exit?",
        options: [
          "Acquiring similar businesses below market multiples",
          "Entering new high growth segments",
          "Efficiency enhancements",
          "Adding overhead",
        ],
        correctIndex: 3,
        method: "Adding overhead increases costs and does not drive multiple expansion.",
      },
    ],
  },
  {
    id: "4.17",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "Equity ownership after a dividend recap",
    variants: [
      {
        kind: "choice",
        prompt: "What percent of a sponsor's existing equity ownership is kept following a dividend recap?",
        options: ["50%", "80%", "90%", "100%"],
        correctIndex: 3,
        method: "A dividend recap lets the sponsor keep 100% ownership while extracting cash via incremental debt.",
      },
    ],
  },
  {
    id: "4.18",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "Weakness of a dividend recapitalization",
    variants: [
      {
        kind: "choice",
        prompt: "Which is a weakness of a dividend recapitalization?",
        options: ["Less sponsor equity", "Adds additional leverage", "Cash return", "Sponsor retains existing equity"],
        correctIndex: 1,
        method: "Incremental debt weakens credit strength and increases risk profile.",
      },
    ],
  },
  {
    id: "4.19",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "Incentive to IPO an LBO company",
    variants: [
      {
        kind: "choice",
        prompt: "What is the incentive to take an LBO company public if it does not provide a full exit?",
        options: [
          "Partial monetization while preserving future upside",
          "Current M&A markets offer high premiums",
          "Forced under LP agreements",
          "Forced under GP agreements",
        ],
        correctIndex: 0,
        method: "An IPO provides a liquid market for the residual stake while preserving upside optionality.",
      },
    ],
  },
  {
    id: "4.20",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "NOT an advantage of taking an LBO target public",
    variants: [
      {
        kind: "choice",
        prompt: "All of the following are advantages of taking an LBO target public EXCEPT:",
        options: [
          "Future upside through residual equity ownership",
          "Flexibility to sell at a premium later",
          "Ease and certainty of execution",
          "Potential valuation premium to an M&A sale",
        ],
        correctIndex: 2,
        method: "An IPO depends on uncertain factors (market conditions, investor sentiment, roadshow reception) — the opposite of ease and certainty.",
      },
    ],
  },
  // --- Seniority ---
  {
    id: "4.21",
    theme: "leveraged-buyouts",
    section: S.SENIORITY,
    title: "Order of seniority — basic",
    variants: [
      {
        kind: "choice",
        prompt: `Correct order from most senior to least senior?

I. Equity  II. Senior subordinated debt  III. First lien secured debt  IV. Senior unsecured debt`,
        options: [
          "II, I, IV, and III",
          "III, IV, II, and I",
          "III, IV, I, and II",
          "IV, III, II, and I",
        ],
        correctIndex: 1,
        method: "First lien secured → Senior unsecured → Senior subordinated → Equity.",
      },
    ],
  },
  {
    id: "4.22",
    theme: "leveraged-buyouts",
    section: S.SENIORITY,
    title: "Order of seniority — HoldCo/OpCo",
    variants: [
      {
        kind: "choice",
        prompt: `Correct order from most senior to least senior? (100% of assets at OpCo)

I. Senior unsecured notes at OpCo  II. Senior discount notes at HoldCo  III. First lien secured at OpCo  IV. Second lien secured at OpCo`,
        options: [
          "II, I, III, and IV",
          "II, III, IV, and I",
          "III, IV, I, and II",
          "IV, III, I, and II",
        ],
        correctIndex: 2,
        method: "First lien → Second lien → Senior unsecured (OpCo) → Discount notes (HoldCo). HoldCo debt is structurally subordinated to all OpCo debt.",
      },
    ],
  },
  {
    id: "4.23",
    theme: "leveraged-buyouts",
    section: S.SENIORITY,
    title: "Ascending order of maturity",
    variants: [
      {
        kind: "choice",
        prompt: `Rank in ascending order of maturity:

I. Revolver  II. Senior subordinated notes  III. Senior notes  IV. Term loan B`,
        options: [
          "I, IV, III, and II",
          "I, III, II, and IV",
          "IV, III, I, and II",
          "IV, III, II, and I",
        ],
        correctIndex: 0,
        method: "Revolver (5–6y) → TLB (7y) → Senior Notes (7–10y) → Senior Sub Notes (longest).",
      },
    ],
  },
  // --- Revolver ---
  {
    id: "4.24",
    theme: "leveraged-buyouts",
    section: S.REVOLVER,
    title: "NOT a common use of a revolver",
    variants: [
      {
        kind: "choice",
        prompt: "Which is NOT a common use of a revolving credit facility?",
        options: ["Maintenance capex", "Funding a portion of the LBO purchase price", "Working capital", "Long-term capital investment"],
        correctIndex: 3,
        method: "Long-term projects are funded by more permanent instruments. Revolvers cover seasonal WC, capex, and LCs.",
      },
    ],
  },
  {
    id: "4.25",
    theme: "leveraged-buyouts",
    section: S.REVOLVER,
    title: "Typical commitment fee on a revolver",
    variants: [
      {
        kind: "choice",
        prompt: "Under normal market conditions, the commitment fee on a revolver is typically:",
        options: ["5 bps", "50 bps", "200 bps", "500 bps"],
        correctIndex: 1,
        method: "~50 bps is the standard commitment fee on undrawn revolver capacity.",
      },
    ],
  },
  {
    id: "4.26",
    theme: "leveraged-buyouts",
    section: S.REVOLVER,
    title: "Revolver coupon vs other debt instruments",
    variants: [
      {
        kind: "choice",
        prompt: "If a funded revolver is used as LBO financing, how does its coupon compare to other debt instruments?",
        options: ["Most expensive", "Least expensive", "Pari passu with senior notes", "Cannot be used"],
        correctIndex: 1,
        method: "The revolver is secured and lowest-risk, hence least expensive — but also least flexible in availability.",
      },
    ],
  },
  {
    id: "4.27",
    theme: "leveraged-buyouts",
    section: S.REVOLVER,
    title: "NOT an advantage of using a revolver",
    variants: [
      {
        kind: "choice",
        prompt: "Which is NOT an advantage of using a revolver?",
        options: [
          "Shorter maturity compared to other institutional debt",
          "Can be drawn, paid down, and redrawn freely",
          "Low interest rate",
          "Issued by relationship-oriented commercial banks",
        ],
        correctIndex: 0,
        method: "Shorter maturity is a disadvantage: the company must pay fees to extend or replace the facility.",
      },
    ],
  },
  // --- Instruments ---
  {
    id: "4.28",
    theme: "leveraged-buyouts",
    section: S.INSTRUMENTS,
    title: "ABL facility collateral",
    variants: [
      {
        kind: "choice",
        prompt: "ABL facilities are generally secured by:",
        options: ["Current assets", "Current liabilities", "Long-term debt", "Pension assets"],
        correctIndex: 0,
        method: "Typically accounts receivable and inventory — hence 'Asset-Based Lending'.",
      },
    ],
  },
  {
    id: "4.29",
    theme: "leveraged-buyouts",
    section: S.INSTRUMENTS,
    title: "Weakness of high yield bonds for the sponsor",
    variants: [
      {
        kind: "choice",
        prompt: "From a sponsor's perspective, which is a weakness of using high yield bonds?",
        options: ["Call protection", "Light covenants", "Longer tenor", "Bullet amortization"],
        correctIndex: 0,
        method: "Call protection limits the sponsor's ability to refinance early — an advantage for bondholders but a constraint for sponsors.",
      },
    ],
  },
  {
    id: "4.30",
    theme: "leveraged-buyouts",
    section: S.INSTRUMENTS,
    title: "Bridge loan tenor",
    variants: [
      {
        kind: "choice",
        prompt: "The tenor of a bridge loan is typically:",
        options: ["1 year", "3 years", "5 years", "10 years"],
        correctIndex: 0,
        method: "~1 year. If it remains outstanding beyond that, a conversion fee typically applies.",
      },
    ],
  },
  {
    id: "4.31",
    theme: "leveraged-buyouts",
    section: S.INSTRUMENTS,
    title: "Sponsor equity contribution as % of LBO financing",
    variants: [
      {
        kind: "choice",
        prompt: "On average, what percentage of an LBO financing is the sponsor's equity contribution?",
        options: ["10%", "35%", "70%", "90%"],
        correctIndex: 1,
        method: "Typically 30%–40%, varying with debt market conditions, company type, and purchase multiple.",
      },
    ],
  },
  {
    id: "4.32",
    theme: "leveraged-buyouts",
    section: S.INSTRUMENTS,
    title: "NOT considered collateral by lenders",
    variants: [
      {
        kind: "choice",
        prompt: "Which is NOT considered collateral by lenders?",
        options: ["Accounts payable", "Accounts receivable", "Stock", "PP&E"],
        correctIndex: 0,
        method: "Accounts payable is a liability. Collateral must be assets: A/R, inventory, PP&E, IP, or equity stakes.",
      },
    ],
  },
  // --- Covenants ---
  {
    id: "4.33",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "Call protection mitigates which risk?",
    variants: [
      {
        kind: "choice",
        prompt: "Call protection mitigates which risk for debt investors when interest rates decline?",
        options: ["Credit risk", "Operational risk", "Reinvestment risk", "Extension risk"],
        correctIndex: 2,
        method: "Call premiums protect against refinancing attractive-yield debt early, mitigating reinvestment risk.",
      },
    ],
  },
  {
    id: "4.34",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "NOT a covenant classification",
    variants: [
      {
        kind: "choice",
        prompt: "Which is NOT a covenant classification?",
        options: ["Financial", "Limitation", "Negative", "Affirmative"],
        correctIndex: 1,
        method: "'Limitation' is not a category. The three primary classifications are: affirmative, negative, and financial.",
      },
    ],
  },
  {
    id: "4.35",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "Maintenance vs incurrence covenants",
    variants: [
      {
        kind: "choice",
        prompt: "Financial maintenance covenants are typical for __________, while __________ typically have incurrence covenants.",
        options: [
          "Public companies; private companies",
          "Private companies; public companies",
          "High yield bonds; bank debt",
          "Bank debt; high yield bonds",
        ],
        correctIndex: 3,
        method: "Bank debt has maintenance covenants (regular testing). HY bonds have incurrence covenants (triggered only by certain actions).",
      },
    ],
  },
  {
    id: "4.36",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "NOT a financial maintenance covenant",
    variants: [
      {
        kind: "choice",
        prompt: "Which is NOT a financial maintenance covenant?",
        options: ["Maximum total leverage", "Maximum senior secured leverage", "Minimum dividend payments", "Minimum interest coverage"],
        correctIndex: 2,
        method: "Minimum dividend payments are not a protective covenant. Maintenance covenants test credit ratios quarterly.",
      },
    ],
  },
  {
    id: "4.37",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "Covenant trends over loan life",
    variants: [
      {
        kind: "choice",
        prompt: "With maintenance covenants, leverage ratios typically __________ while coverage ratios typically __________",
        options: [
          "Stay constant; increase",
          "Stay constant; decrease",
          "Decrease; increase",
          "Increase; decrease",
        ],
        correctIndex: 2,
        method: "Max leverage steps down; min coverage steps up — requiring the borrower to improve its credit profile over time.",
      },
    ],
  },
  {
    id: "4.38",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "NOT a qualified institutional buyer (QIB)",
    variants: [
      {
        kind: "choice",
        prompt: "Which would NOT be classified as a QIB?",
        options: [
          "Retail investor with under $25m net worth",
          "Equity asset manager with $200m AUM",
          "Insurance company with $500m in investments",
          "Mutual fund with $10,000m AUM",
        ],
        correctIndex: 0,
        method: "QIBs must own/invest at least $100m in securities on a discretionary basis — beyond a retail individual.",
      },
    ],
  },
  // --- Bond pricing ---
  {
    id: "4.39",
    theme: "leveraged-buyouts",
    section: S.BOND_PRICING,
    title: "Current yield of a bond trading at par",
    variants: [
      {
        kind: "choice",
        prompt: "Current yield of a $1,000 bond with a 6.0% coupon trading at par?",
        options: ["3.0%", "6.0%", "6.3%", "6.5%"],
        correctIndex: 1,
        method: "At par, current yield equals the coupon rate: 6.0%.",
      },
    ],
  },
  {
    id: "4.40",
    theme: "leveraged-buyouts",
    section: S.BOND_PRICING,
    title: "Current yield of a bond trading below par",
    variants: [
      {
        kind: "choice",
        prompt: "Current yield on a bond trading at $95 (issued at par) with a 7.0% coupon?",
        options: ["7.0%", "7.2%", "7.4%", "7.7%"],
        correctIndex: 2,
        method: "Current Yield = $70 / $950 = 7.37% ≈ 7.4%. Below par → yield > coupon.",
      },
    ],
  },
  {
    id: "4.41",
    theme: "leveraged-buyouts",
    section: S.BOND_PRICING,
    title: "Corporate bond interest payment frequency",
    variants: [
      {
        kind: "choice",
        prompt: "Bonds issued by corporations typically pay interest:",
        options: ["Monthly", "Quarterly", "Semiannually", "Yearly"],
        correctIndex: 2,
        method: "Corporate bonds typically pay interest semiannually.",
      },
    ],
  },
  // --- GP/LP ---
  {
    id: "4.42",
    theme: "leveraged-buyouts",
    section: S.GP_LP,
    title: "Management fee paid by LPs",
    variants: [
      {
        kind: "choice",
        prompt: "What percent of committed funds do LPs typically pay GPs as a management fee?",
        options: ["2%", "5%", "15%", "20%"],
        correctIndex: 0,
        method: "1%–2% annually. After full return of capital plus hurdle rate, the sponsor earns ~20% carried interest on profits.",
      },
    ],
  },
  // --- Valuation drivers ---
  {
    id: "4.43",
    theme: "leveraged-buyouts",
    section: S.VALUATION,
    title: "Largest impact on LBO valuation",
    variants: [
      {
        kind: "choice",
        prompt: "Which has the largest impact on LBO valuation?",
        options: ["Entry and exit multiple", "Tax rate", "Interest rate of debt", "Bond non-call period"],
        correctIndex: 0,
        method: "Entry/exit assumptions have the largest impact on LBO valuation and IRR, followed by leverage amount, then revenue growth.",
      },
    ],
  },
];
