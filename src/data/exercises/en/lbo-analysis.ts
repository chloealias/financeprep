import type { Exercise } from "@/data/exercise-types";

const S = {
  VALUECO: "ValueCo — Full LBO Waterfall",
  SU: "Sources & Uses",
  EXIT: "Exit Valuation & Returns",
  PAPER: "Paper LBO — Sources & Uses",
  IRR_CR: "IRR & Cash Return",
  CREDIT: "Credit Ratios — Leverage & Coverage",
  GOODWILL: "Goodwill & Balance Sheet",
  REVOLVER: "Revolver & Commitment Fee",
  SECURED: "Secured vs Unsecured",
  VALUE_CREATION: "Value Creation Levers",
  SUBORDINATION: "Contractual & Structural Subordination",
  FUNCTIONS: "LBO Functions & Mechanics",
  PROCESS: "Process, Sensitivity & Projections",
};

const CREDIT_TABLE = `| ($ million) | 2019 | 2020 | 2021 | 2022 | 2023 |
|---|---|---|---|---|---|
| Total Debt | $4,000.0 | $3,500.0 | $3,000.0 | $2,500.0 | $2,000.0 |
| Interest Expense | 600.0 | 465.0 | 400.0 | 330.0 | 240.0 |
| EBITDA | 730.0 | 775.0 | 805.0 | 850.0 | 900.0 |`;

export const lboAnalysisExercises: Exercise[] = [
  // --- ValueCo waterfall ---
  {
    id: "5.1a",
    theme: "lbo-analysis",
    section: S.VALUECO,
    title: "ValueCo — enterprise value",
    variants: [
      {
        kind: "numeric",
        prompt: `LTM EBITDA: $700.0m. Entry Multiple: 8.0x.\n\nCalculate enterprise value.`,
        unitHint: "Million dollars",
        check: { mode: "exact", accept: [5600] },
        method: "EV = 8.0x × $700.0 = $5,600.0 million.",
        answerLabel: "$5,600.0 million",
      },
    ],
  },
  {
    id: "5.1b",
    theme: "lbo-analysis",
    section: S.VALUECO,
    title: "ValueCo — equity purchase price",
    variants: [
      {
        kind: "numeric",
        prompt: `Enterprise Value: $5,600.0m. Total Debt: $1,500.0m. Cash: $250.0m.\n\nCalculate equity purchase price.`,
        unitHint: "Million dollars",
        check: { mode: "exact", accept: [4350] },
        method: "Equity = EV − Debt + Cash = 5,600 − 1,500 + 250 = $4,350.0 million.",
        answerLabel: "$4,350.0 million",
      },
    ],
  },
  // --- Sources & Uses ---
  {
    id: "5.2a",
    theme: "lbo-analysis",
    section: S.SU,
    title: "ValueCo — pro forma revolver balance",
    variants: [
      {
        kind: "choice",
        prompt: "If no draw on the revolver is planned at close, what is the opening balance?",
        options: ["Zero", "$125.0 million", "$250.0 million", "Cannot be determined"],
        correctIndex: 0,
        method:
          "No draw at close → zero balance. An annual commitment fee is still due on the undrawn portion.",
      },
    ],
  },
  {
    id: "5.2b",
    theme: "lbo-analysis",
    section: S.SU,
    title: "ValueCo — term loan B principal",
    variants: [
      {
        kind: "numeric",
        prompt: `LTM EBITDA: $700.0m. Senior Secured Leverage: 4.0x.\n\nCalculate the term loan B principal amount.`,
        unitHint: "Million dollars",
        check: { mode: "exact", accept: [2800] },
        method: "TLB = $700.0 × 4.0x = $2,800.0 million.",
        answerLabel: "$2,800.0 million",
      },
    ],
  },
  {
    id: "5.2c",
    theme: "lbo-analysis",
    section: S.SU,
    title: "ValueCo — senior notes principal",
    variants: [
      {
        kind: "numeric",
        prompt: `LTM EBITDA: $700.0m. Total Leverage: 5.2x. Senior Secured Leverage: 4.0x.\n\nCalculate the senior notes principal amount.`,
        unitHint: "Million dollars",
        check: { mode: "exact", accept: [840] },
        method: "Senior Notes = $700.0 × (5.2x − 4.0x) = $700.0 × 1.2x = $840.0 million.",
        answerLabel: "$840.0 million",
      },
    ],
  },
  {
    id: "5.2d",
    theme: "lbo-analysis",
    section: S.SU,
    title: "ValueCo — total uses of funds",
    variants: [
      {
        kind: "numeric",
        prompt: `Equity Purchase Price: $4,350.0m. Repay Existing Debt: $1,500.0m. Tender/Call Premiums: $20.0m. Financing Fees: $100.0m. Other Fees: $30.0m.\n\nCalculate total uses of funds.`,
        unitHint: "Million dollars",
        check: { mode: "exact", accept: [6000] },
        method: "Total Uses = 4,350 + 1,500 + 20 + 100 + 30 = $6,000.0 million.",
        answerLabel: "$6,000.0 million",
      },
    ],
  },
  {
    id: "5.2e",
    theme: "lbo-analysis",
    section: S.SU,
    title: "ValueCo — sponsor equity contribution",
    variants: [
      {
        kind: "numeric",
        prompt: `Total Sources = Total Uses = $6,000.0m. TLB: $2,800.0m. Senior Notes: $850.0m. Cash on Hand: $250.0m.\n\nCalculate the sponsor's equity contribution.`,
        unitHint: "Million dollars",
        check: { mode: "exact", accept: [2100] },
        method: "Equity = 6,000 − 2,800 − 850 − 250 = $2,100.0 million.",
        answerLabel: "$2,100.0 million",
      },
    ],
  },
  // --- Exit ---
  {
    id: "5.3a",
    theme: "lbo-analysis",
    section: S.EXIT,
    title: "ValueCo — exit multiple convention",
    variants: [
      {
        kind: "open",
        prompt: "In an LBO, what exit multiple should typically be used, and why?",
        method:
          "Use an exit multiple equal to (or below) the entry multiple — a standard conservative assumption unless sector-specific factors justify otherwise.",
        answerLabel: "Entry multiple (conservative assumption)",
      },
    ],
  },
  {
    id: "5.3b",
    theme: "lbo-analysis",
    section: S.EXIT,
    title: "ValueCo — enterprise value at exit",
    variants: [
      {
        kind: "numeric",
        prompt: `2024E EBITDA: $929.2m. Exit Multiple: 8.0x.\n\nCalculate enterprise value at exit.`,
        unitHint: "Million dollars",
        check: { mode: "tolerance", value: 7433.6, pct: 1 },
        method: "EV = $929.2 × 8.0 = $7,433.6 million.",
        answerLabel: "$7,433.6 million",
      },
    ],
  },
  {
    id: "5.3c",
    theme: "lbo-analysis",
    section: S.EXIT,
    title: "ValueCo — net debt at exit",
    variants: [
      {
        kind: "numeric",
        prompt: `Remaining TLB: $1,050.8m. Senior Notes: $850.0m. Cash: $0.\n\nCalculate net debt at exit.`,
        unitHint: "Million dollars",
        check: { mode: "exact", accept: [1900.8] },
        method: "Net Debt = (1,050.8 + 850.0) − 0 = $1,900.8 million.",
        answerLabel: "$1,900.8 million",
      },
    ],
  },
  {
    id: "5.3d",
    theme: "lbo-analysis",
    section: S.EXIT,
    title: "ValueCo — equity value at exit",
    variants: [
      {
        kind: "numeric",
        prompt: `EV at Exit: $7,433.7m. Net Debt: $1,900.8m.\n\nCalculate equity value at exit.`,
        unitHint: "Million dollars",
        check: { mode: "tolerance", value: 5532.9, pct: 1 },
        method: "Equity = 7,433.7 − 1,900.8 = $5,532.9 million.",
        answerLabel: "$5,532.9 million",
      },
    ],
  },
  {
    id: "5.3e",
    theme: "lbo-analysis",
    section: S.EXIT,
    title: "ValueCo — cash return",
    variants: [
      {
        kind: "numeric",
        prompt: `Initial Equity: $2,100.0m. Equity at Exit: $5,532.8m.\n\nCalculate the cash return (MOIC).`,
        unitHint: "Multiple (e.g. 1.5x)",
        check: { mode: "tolerance", value: 2.6, pct: 5 },
        method: "Cash Return = $5,532.8 / $2,100.0 = 2.6x.",
        answerLabel: "2.6x",
      },
    ],
  },
  // --- Paper LBO ---
  {
    id: "5.4",
    theme: "lbo-analysis",
    section: S.PAPER,
    title: "Reconstruct Sources & Uses — find the missing tranche",
    variants: [
      {
        kind: "choice",
        prompt: `| Sources | | Uses | |
|---|---|---|---|
| Term Loan B | ? | Purchase Equity | $825.0 |
| Sr. Sub. Notes | $300.0 | Repay Debt | $300.0 |
| Equity | $385.0 | Financing Fees | $20.0 |
| Cash on Hand | $25.0 | Other Fees | $15.0 |

Term Loan B and Total Sources/Uses?`,
        options: [
          "$300.0m; $1,000.0m",
          "$320.0m; $1,425.0m",
          "$450.0m; $1,160.0m",
          "Cannot be determined",
        ],
        correctIndex: 2,
        method:
          "Total Uses = 825 + 300 + 20 + 15 = $1,160. TLB = 1,160 − 300 − 385 − 25 = $450.0 million.",
      },
    ],
  },
  // --- IRR & Cash Return ---
  {
    id: "5.5",
    theme: "lbo-analysis",
    section: S.IRR_CR,
    title: "IRR from equity investment and exit",
    variants: [
      {
        kind: "choice",
        prompt: "A PE firm invests $400m equity and exits after 5 years at $1,000m. IRR?",
        options: ["19.5%", "20.1%", "25.7%", "26.7%"],
        correctIndex: 1,
        method: "IRR = (1,000/400)^(1/5) − 1 = 2.5^0.2 − 1 = 20.1%.",
      },
    ],
  },
  {
    id: "5.6",
    theme: "lbo-analysis",
    section: S.IRR_CR,
    title: "Cash return from equity investment and exit",
    variants: [
      {
        kind: "choice",
        prompt: "A PE firm invests $225m equity and exits after 5 years at $820m. Cash return?",
        options: ["2.5x", "3.5x", "3.6x", "4.0x"],
        correctIndex: 2,
        method: "Cash Return = $820 / $225 = 3.6x.",
      },
    ],
  },
  // --- Credit Ratios ---
  {
    id: "5.7",
    theme: "lbo-analysis",
    section: S.CREDIT,
    title: "2023 interest coverage ratio",
    variants: [
      {
        kind: "choice",
        prompt: `${CREDIT_TABLE}\n\nCalculate the 2023 interest coverage ratio. What does this indicate?`,
        options: [
          "3.4x, stronger credit profile than 2019",
          "3.4x, weaker credit profile than 2019",
          "3.8x, stronger credit profile than 2019",
          "8.3x, weaker credit profile than 2019",
        ],
        correctIndex: 2,
        method:
          "ICR = $900 / $240 = 3.8x (vs 2019: $730/$600 = 1.2x). Higher coverage = stronger credit profile.",
      },
    ],
  },
  {
    id: "5.8",
    theme: "lbo-analysis",
    section: S.CREDIT,
    title: "Total leverage trend 2019–2023",
    variants: [
      {
        kind: "choice",
        prompt: `${CREDIT_TABLE}\n\nBetween 2019 and 2023, total leverage:`,
        options: ["Decreases", "Increases", "Remains constant", "Cannot be determined"],
        correctIndex: 0,
        method: "Debt halves while EBITDA rises. Total leverage (Debt/EBITDA) decreases.",
      },
    ],
  },
  {
    id: "5.9",
    theme: "lbo-analysis",
    section: S.CREDIT,
    title: "Credit profile trend 2019–2023",
    variants: [
      {
        kind: "choice",
        prompt: `${CREDIT_TABLE}\n\nBetween 2019 and 2023, the credit profile:`,
        options: ["Weakens", "Strengthens", "Remains constant", "Cannot be determined"],
        correctIndex: 1,
        method: "Leverage falls and interest coverage rises — both signal a stronger credit profile.",
      },
    ],
  },
  {
    id: "5.10",
    theme: "lbo-analysis",
    section: S.CREDIT,
    title: "Reasonable total leverage for an LBO",
    variants: [
      {
        kind: "choice",
        prompt: "Which is a reasonable total leverage ratio for an LBO under normal market conditions?",
        options: ["3.0x EBITDA", "6.0x EBITDA", "5.0x net income", "1.0x sales"],
        correctIndex: 1,
        method: "Average LBO credit stats have fluctuated between ~4x and ~6x EBITDA over the last decade.",
      },
    ],
  },
  // --- Goodwill ---
  {
    id: "5.11",
    theme: "lbo-analysis",
    section: S.GOODWILL,
    title: "How is goodwill created?",
    variants: [
      {
        kind: "choice",
        prompt: "How is goodwill created?",
        options: [
          "Per share premium paid",
          "Synergies created in an M&A transaction",
          "Excess amount paid over net identifiable assets",
          "Write-down on a company's balance sheet",
        ],
        correctIndex: 2,
        method: "Goodwill = purchase price minus net identifiable assets.",
      },
    ],
  },
  {
    id: "5.12",
    theme: "lbo-analysis",
    section: S.GOODWILL,
    title: "Calculate goodwill",
    variants: [
      {
        kind: "choice",
        prompt: "Net identifiable assets: $700m. Purchase price: $825m. Goodwill?",
        options: ["$125.0 million", "$700.0 million", "$1,525.0 million", "Cannot be determined"],
        correctIndex: 0,
        method: "Goodwill = $825 − $700 = $125.0 million.",
      },
    ],
  },
  {
    id: "5.13",
    theme: "lbo-analysis",
    section: S.GOODWILL,
    title: "Typical LBO opening balance sheet adjustments",
    variants: [
      {
        kind: "choice",
        prompt: `Which are typical adjustments to the opening balance sheet in an LBO?

I. Subtraction of new LBO debt
II. Subtraction of existing shareholders' equity
III. Addition of deferred financing fees
IV. Addition of goodwill created`,
        options: ["I and II", "II and III", "I, II, and IV", "II, III, and IV"],
        correctIndex: 3,
        method:
          "New LBO debt is added (not subtracted) — it funds the acquisition. II, III, and IV are correct.",
      },
    ],
  },
  // --- Revolver ---
  {
    id: "5.14",
    theme: "lbo-analysis",
    section: S.REVOLVER,
    title: "Revolver opening balance when undrawn",
    variants: [
      {
        kind: "choice",
        prompt: "If no draw on the revolver is planned in the LBO financing, what is the opening balance?",
        options: ["Zero", "$1.25 million", "$125.0 million", "$250.0 million"],
        correctIndex: 0,
        method: "Zero if undrawn. An annual commitment fee is still owed on the undrawn capacity.",
      },
    ],
  },
  // --- Secured vs Unsecured ---
  {
    id: "5.15",
    theme: "lbo-analysis",
    section: S.SECURED,
    title: "Classify LBO financing instruments",
    variants: [
      {
        kind: "open",
        prompt: "Classify each as secured or unsecured: high yield bonds, revolver, term loan, mezzanine debt, equity, ABL facility.",
        method:
          "Secured: revolver, term loan, ABL facility. Unsecured: high yield bonds, mezzanine debt, equity. Bank debt is collateralized against company assets; HY and mezz are not, hence their higher cost.",
        answerLabel: "Secured: revolver, TL, ABL. Unsecured: HY, mezz, equity",
      },
    ],
  },
  // --- Value creation levers ---
  {
    id: "5.16",
    theme: "lbo-analysis",
    section: S.VALUE_CREATION,
    title: "EBITDA growth vs debt repayment",
    variants: [
      {
        kind: "open",
        prompt: "Why is a dollar of sustainable EBITDA growth generally more favorable than a dollar of debt reduction?",
        method:
          "Debt repayment creates value dollar-for-dollar. EBITDA, however, is capitalized at a multiple upon exit — so a dollar of sustainable EBITDA growth generates a multiplier effect on value, whereas deleveraging remains linear.",
        answerLabel: "EBITDA is capitalized at a multiple; debt reduction is 1:1",
      },
    ],
  },
  {
    id: "5.17",
    theme: "lbo-analysis",
    section: S.VALUE_CREATION,
    title: "Sale vs IPO — advantages of a sale",
    variants: [
      {
        kind: "open",
        prompt: "What are the potential advantages of a sale vs an IPO for a PE exit?",
        method:
          "A sale provides a full exit and immediate cash. The seller avoids the risk that market conditions affect a complete exit via future secondary offerings or subsequent sale.",
        answerLabel: "Full exit, immediate cash, no follow-on risk",
      },
    ],
  },
  {
    id: "5.18",
    theme: "lbo-analysis",
    section: S.VALUE_CREATION,
    title: "Strategies for multiple expansion",
    variants: [
      {
        kind: "open",
        prompt: "Describe some strategies used to drive multiple expansion in an LBO.",
        method:
          "Increase the target's size and scale, deliver significant operational improvements, reposition toward higher-valued industry segments, accelerate organic growth and/or profitability, or time the exit to a market cycle peak.",
        answerLabel: "Scale, operational improvements, repositioning, growth acceleration, cycle timing",
      },
    ],
  },
  // --- Subordination ---
  {
    id: "5.19",
    theme: "lbo-analysis",
    section: S.SUBORDINATION,
    title: "Contractual subordination",
    variants: [
      {
        kind: "open",
        prompt: "Explain contractual subordination.",
        method:
          "Contractual subordination is the priority ranking of debt instruments within the same legal entity. At the OpCo level, senior secured and senior unsecured debt are contractually senior to senior subordinated debt — i.e. they have priority in liquidation within the same entity.",
        answerLabel: "Same entity, priority determined by credit agreement terms",
      },
    ],
  },
  {
    id: "5.20",
    theme: "lbo-analysis",
    section: S.SUBORDINATION,
    title: "Structural subordination",
    variants: [
      {
        kind: "open",
        prompt: "Explain structural subordination.",
        method:
          "Structural subordination is the priority ranking of debt at different legal entities. In a HoldCo/OpCo structure, if all assets and collateral sit at the OpCo, OpCo debt is structurally senior to HoldCo debt (mezz, discount notes, preferred equity) — provided the OpCo has not guaranteed HoldCo debt.",
        answerLabel: "Different entities, priority determined by asset/collateral location",
      },
    ],
  },
  // --- Functions & Mechanics ---
  {
    id: "5.21",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Primary functions of LBO analysis",
    variants: [
      {
        kind: "open",
        prompt: "What are the primary functions of LBO analysis?",
        method:
          "LBO analysis serves as a core analytical tool for evaluating financing structure, investment returns, and valuation in leveraged buyout scenarios.",
        answerLabel: "Evaluate financing structure, returns, and valuation",
      },
    ],
  },
  {
    id: "5.22",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "LBO analysis for financing structure",
    variants: [
      {
        kind: "open",
        prompt: "How is LBO analysis used to analyze and craft financing structure?",
        method:
          "It allows the banker to analyze a given financing structure based on cash flow generation, debt repayment, credit statistics, and investment returns over a projection period, under multiple operating scenarios.",
        answerLabel: "Cash flow, debt repayment, credit stats, returns under multiple scenarios",
      },
    ],
  },
  {
    id: "5.23",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "LBO analysis for valuation",
    variants: [
      {
        kind: "open",
        prompt: "How is LBO analysis used to determine valuation?",
        method:
          "It determines an implied valuation range for a target in a potential LBO sale, based on achieving acceptable returns. The output rests on financial projection assumptions, purchase/exit pricing, and financing structure.",
        answerLabel: "Implied valuation range based on acceptable return thresholds",
      },
    ],
  },
  {
    id: "5.24",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Why is historical interest expense irrelevant in an LBO?",
    variants: [
      {
        kind: "open",
        prompt: "Why is historical interest expense considered not meaningful when building an LBO model?",
        method:
          "The target's historical interest expense and net income are irrelevant because the target will be recapitalized with a new capital structure and new debt terms through the LBO.",
        answerLabel: "Target will be recapitalized with entirely new debt",
      },
    ],
  },
  {
    id: "5.25",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Cash available for optional debt repayment",
    variants: [
      {
        kind: "open",
        prompt: "How is cash available for optional debt repayment calculated?",
        method:
          "Sum of projected operating and investing cash flows. For each year, this first covers mandatory amortization on term loans. Remaining cash flow then funds optional repayment (cash flow sweep).",
        answerLabel: "Operating + investing CF, after mandatory amortization",
      },
    ],
  },
  {
    id: "5.26",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Common mistakes that unbalance the balance sheet",
    variants: [
      {
        kind: "open",
        prompt: "What are common mistakes that would cause the balance sheet not to balance in an LBO model?",
        method:
          "D&A or capex not properly linked to PP&E, and/or changes in balance sheet items not correctly reflected in the cash flow statement.",
        answerLabel: "D&A/capex not linked to PP&E; BS changes not in CF statement",
      },
    ],
  },
  {
    id: "5.27",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Purchase price — public vs private target",
    variants: [
      {
        kind: "open",
        prompt: "How is purchase price determined for a public target? For a private target?",
        method:
          "Public: offer price × fully diluted shares = equity purchase price; add net debt for implied EV. Private: LTM EBITDA × purchase multiple = enterprise value directly.",
        answerLabel: "Public: offer price × diluted shares. Private: EBITDA × multiple",
      },
    ],
  },
  {
    id: "5.28",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "How are deferred financing fees created?",
    variants: [
      {
        kind: "open",
        prompt: "How are deferred financing fees created?",
        method:
          "Fees for each debt tranche are multiplied by the committed amount. Annual deferred financing fees for each tranche are then determined by dividing total fees by the tranche's maturity (in years).",
        answerLabel: "Fees × committed amount, amortized over maturity",
      },
    ],
  },
  {
    id: "5.29",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Why does LBO analysis frame the low end of the valuation range?",
    variants: [
      {
        kind: "open",
        prompt: "Why does LBO analysis typically frame the lower end of the valuation range?",
        method:
          "LBO is constrained by minimum required returns (IRR hurdle) rather than maximizing price. A strategic buyer or classic M&A transaction can justify a higher price via synergies or a control premium.",
        answerLabel: "Constrained by return hurdles, not price maximization",
      },
    ],
  },
  // --- Process QCMs ---
  {
    id: "5.30",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Projection period for a debt provider",
    variants: [
      {
        kind: "choice",
        prompt: "The projection period of an LBO model for a potential debt provider is typically how many years?",
        options: ["1–2 years", "3–4 years", "7–10 years", "15+ years"],
        correctIndex: 2,
        method: "7–10 years to match the maturity of the longest debt instrument in the capital structure.",
      },
    ],
  },
  {
    id: "5.31",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Historical IRR threshold for sponsors",
    variants: [
      {
        kind: "choice",
        prompt: "What IRR threshold has historically served as the standard for sponsors considering an LBO?",
        options: ["5%", "10%", "20%", "40%"],
        correctIndex: 2,
        method: "20%+ has been the widely used rule of thumb, though it varies with market conditions and risk.",
      },
    ],
  },
  {
    id: "5.32",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Key variables for LBO sensitivity analysis",
    variants: [
      {
        kind: "choice",
        prompt: `Which are key variables for sensitivity analysis in LBO analysis?

I. Purchase price  II. Financing structure  III. Historical dividends  IV. Exit multiple`,
        options: ["I and II", "II and III", "I, II, and IV", "I, II, III, and IV"],
        correctIndex: 2,
        method: "Purchase price, financing structure, and exit multiple. Historical dividends are irrelevant.",
      },
    ],
  },
  {
    id: "5.33",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Primary source for Management Case projections",
    variants: [
      {
        kind: "choice",
        prompt: "In an organized M&A sale process, what is typically the primary source for Management Case projections used in the LBO model?",
        options: [
          "Comparable companies analysis",
          "Research estimates",
          "Third party news providers",
          "CIM",
        ],
        correctIndex: 3,
        method:
          "The sell-side advisor provides projections via the CIM, supplemented by management presentation and data room.",
      },
    ],
  },
  {
    id: "5.34",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Least relevant historical financial data for LBO",
    variants: [
      {
        kind: "choice",
        prompt: "Which historical financial data is the least relevant for LBO analysis?",
        options: ["Sales growth", "EBITDA and EBIT margins", "Capex", "Interest expense"],
        correctIndex: 3,
        method: "Historical interest expense is irrelevant — the target will be recapitalized through the LBO.",
      },
    ],
  },
  {
    id: "5.35",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "NOT a typical operating case in LBO",
    variants: [
      {
        kind: "choice",
        prompt: "Which is NOT a typical operating case used in LBO analysis?",
        options: ["SEC case", "Base case", "Downside case", "Sponsor case"],
        correctIndex: 0,
        method: "'SEC case' does not exist. Base case typically builds on management assumptions adjusted for due diligence.",
      },
    ],
  },
  {
    id: "5.36",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "NOT a standard section of a cash flow statement",
    variants: [
      {
        kind: "choice",
        prompt: "Which is NOT a standard section of a cash flow statement?",
        options: ["Operating activities", "Financing activities", "Investing activities", "Acquisition activities"],
        correctIndex: 3,
        method: "'Acquisition activities' is not a standard cash flow statement section.",
      },
    ],
  },
];
