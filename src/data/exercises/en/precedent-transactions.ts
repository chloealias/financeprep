import type { Exercise } from "@/data/exercise-types";

const S = {
  ROSENBAUM: "Rosenbaum Industries — Multi-Step Case",
  EXCHANGE: "Exchange Ratio — Fixed vs Floating",
  PREMIUM: "Premiums Paid Analysis",
  SYNERGIES: "Synergies",
  FRAMEWORK: "Framework & Weaknesses",
  BENEFITS: "Benefits & Considerations",
  MINI_CASE: "Mini-Case — TSM in a Transaction",
  SCREENING: "Screening & Sourcing",
};

const ROSENBAUM_TSM = `Rosenbaum Industries (target). Pearl Corp. (acquirer).

| Assumptions | |
|---|---|
| Offer Price Per Share | $20.00 |
| Basic Shares Outstanding | 123.00m |

| Options/Warrants | Shares | Exercise Price |
|---|---|---|
| Tranche 1 | 1.500m | $5.00 |
| Tranche 2 | 1.250m | $10.00 |
| Tranche 3 | 1.000m | $15.00 |`;

const ROSENBAUM_LTM = `Rosenbaum Industries — reported P&L extract ($ million):

| | 2018A | Stub 9/30/2018 | Stub 9/30/2019 | LTM 9/30/2019 |
|---|---|---|---|---|
| Gross Profit | $725.0 | $543.8 | $587.3 | $768.5 |
| EBIT | $275.0 | $206.3 | $222.8 | $291.5 |
| D&A | 100.0 | 75.0 | 82.0 | 107.0 |
| Net Income | $131.3 | $98.4 | $110.8 | $143.6 |
| Marginal Tax Rate | 25.0% |

Non-recurring: $25.0m litigation settlement (pre-tax), booked in Q4 2018.`;

const MINI_CASE_DATA = `| Assumptions | |
|---|---|
| Offer Price Per Share | $15.00 |
| Acquirer Share Price | $30.00 |
| Unaffected Target Share Price | $12.50 |
| Target Basic Shares Outstanding | 250.0m |
| Outstanding Options | 10.0m |
| Exercise Price | $10.00 |
| Target LTM Revenue | $4,500.0m |
| Target LTM EBITDA | $650.0m |
| Target Net Debt | $1,000.0m |`;

export const precedentTransactionsExercises: Exercise[] = [
  // --- Rosenbaum multi-step case ---
  {
    id: "2.1a",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — in-the-money options",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_TSM}\n\nCalculate Rosenbaum Industries' in-the-money options/warrants.`,
        unitHint: "Million shares",
        check: { mode: "exact", accept: [3.75] },
        method:
          "All three tranches have an exercise price below the $20.00 offer price, so all are in-the-money.\n1.500 + 1.250 + 1.000 = 3.75 million.",
        answerLabel: "3.75 million",
      },
    ],
  },
  {
    id: "2.1b",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — option proceeds",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_TSM}\n\nCalculate total proceeds from in-the-money options/warrants.`,
        unitHint: "Million dollars (e.g. 50)",
        check: { mode: "exact", accept: [35] },
        method:
          "(1.500 × $5) + (1.250 × $10) + (1.000 × $15) = 7.5 + 12.5 + 15.0 = $35.0 million.",
        answerLabel: "$35.0 million",
      },
    ],
  },
  {
    id: "2.1c",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — TSM net new shares",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_TSM}\n\nITM options = 3.75m. Proceeds = $35.0m.\n\nCalculate net new shares under the treasury stock method.`,
        unitHint: "Million shares",
        check: { mode: "exact", accept: [2] },
        method:
          "Shares repurchased = $35.0m / $20.00 = 1.750m.\nNet new shares = 3.750 − 1.750 = 2.00 million.",
        answerLabel: "2.00 million",
      },
    ],
  },
  {
    id: "2.1d",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — fully diluted shares",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_TSM}\n\nNet new shares = 2.00m.\n\nCalculate fully diluted shares outstanding.`,
        unitHint: "Million shares",
        check: { mode: "exact", accept: [125] },
        method: "123.0 + 2.00 = 125.0 million.",
        answerLabel: "125.0 million",
      },
    ],
  },
  {
    id: "2.2a",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — equity value",
    variants: [
      {
        kind: "numeric",
        prompt: `Rosenbaum Industries. Offer Price $20.00. Fully Diluted Shares = 125.0m. Total Debt $1,375.0m. Cash $50.0m.\n\nCalculate equity value.`,
        unitHint: "Million dollars (e.g. 1000)",
        check: { mode: "exact", accept: [2500] },
        method:
          "Equity value = Fully Diluted Shares × Offer Price = 125.0 × $20.00 = $2,500.0 million.\nKey difference vs. trading comps: use the offer price, not the market price.",
        answerLabel: "$2,500.0 million",
      },
    ],
  },
  {
    id: "2.2b",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — enterprise value",
    variants: [
      {
        kind: "numeric",
        prompt: `Rosenbaum Industries. Equity Value $2,500.0m. Total Debt $1,375.0m. Cash $50.0m.\n\nCalculate enterprise value.`,
        unitHint: "Million dollars (e.g. 2000)",
        check: { mode: "exact", accept: [3825] },
        method:
          "EV = Equity Value + Total Debt − Cash = 2,500 + 1,375 − 50 = $3,825.0 million.",
        answerLabel: "$3,825.0 million",
      },
    ],
  },
  {
    id: "2.3a",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — adjusted LTM gross profit",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_LTM}\n\nCalculate adjusted LTM gross profit, assuming the $25.0m litigation settlement is NOT part of COGS.`,
        unitHint: "Million dollars (e.g. 500.0)",
        check: { mode: "exact", accept: [768.5] },
        method:
          "The litigation settlement does not affect COGS — adjusted gross profit equals reported: $768.5 million.",
        answerLabel: "$768.5 million",
      },
    ],
  },
  {
    id: "2.3b",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — adjusted LTM EBIT",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_LTM}\n\nCalculate adjusted LTM EBIT, assuming the $25.0m litigation settlement was included in reported EBIT.`,
        unitHint: "Million dollars (e.g. 200.0)",
        check: { mode: "exact", accept: [316.5] },
        method:
          "Add back $25.0m to FY2018A: 275.0 + 25.0 = 300.0.\nLTM = 300.0 + 222.8 − 206.3 = $316.5 million.",
        answerLabel: "$316.5 million",
      },
    ],
  },
  {
    id: "2.3c",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — adjusted LTM EBITDA",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_LTM}\n\nAdjusted LTM EBIT = $316.5m.\n\nCalculate adjusted LTM EBITDA.`,
        unitHint: "Million dollars (e.g. 300.0)",
        check: { mode: "exact", accept: [423.5] },
        method: "Adjusted LTM EBIT + LTM D&A = 316.5 + 107.0 = $423.5 million.",
        answerLabel: "$423.5 million",
      },
    ],
  },
  {
    id: "2.3d",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — adjusted LTM net income",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_LTM}\n\nCalculate adjusted LTM net income (tax-affect at 25%).`,
        unitHint: "Million dollars (e.g. 100.0)",
        check: { mode: "exact", accept: [162.4] },
        method:
          "After-tax add-back = 25.0 × (1 − 0.25) = 18.75. Adjusted FY NI = 131.3 + 18.75 = 150.05 ≈ 150.0.\nLTM = 150.0 + 110.8 − 98.4 = $162.4 million.",
        answerLabel: "$162.4 million",
      },
    ],
  },
  // --- Exchange ratio ---
  {
    id: "2.4",
    theme: "precedent-transactions",
    section: S.EXCHANGE,
    title: "Most common exchange ratio type",
    variants: [
      {
        kind: "choice",
        prompt: "Which exchange ratio is most common in a stock-for-stock transaction?",
        options: ["Linear", "Floating", "Fixed", "Non-Floating"],
        correctIndex: 2,
        method: "A fixed exchange ratio is the most common structure in stock-for-stock deals.",
      },
    ],
  },
  {
    id: "2.5",
    theme: "precedent-transactions",
    section: S.EXCHANGE,
    title: "Calculate exchange ratio",
    variants: [
      {
        kind: "choice",
        prompt:
          "What is the exchange ratio if an acquirer agrees to exchange 0.5 shares of its stock for every 2 shares of the target's stock?",
        options: ["0.25", "0.45", "2.0", "4.0"],
        correctIndex: 0,
        method: "Exchange Ratio = 0.5 / 2 = 0.25.",
      },
    ],
  },
  {
    id: "2.6",
    theme: "precedent-transactions",
    section: S.EXCHANGE,
    title: "Implied equity value from exchange ratio",
    variants: [
      {
        kind: "choice",
        prompt: `Acquirer's Share Price: $20.00. Target's Fully Diluted Shares: 200.0m. Exchange Ratio: 0.25.\n\nImplied equity value for the target?`,
        options: [
          "$1,000 million",
          "$1,200 million",
          "$1,250 million",
          "$1,275 million",
        ],
        correctIndex: 0,
        method:
          "Implied Equity Value = Exchange Ratio × Acquirer Price × Target Diluted Shares = 0.25 × $20 × 200 = $1,000 million.",
      },
    ],
  },
  {
    id: "2.7",
    theme: "precedent-transactions",
    section: S.EXCHANGE,
    title: "Share price decline risk — fixed vs floating",
    variants: [
      {
        kind: "choice",
        prompt:
          "Assuming no structural protections, in which structure does the acquirer assume the full risk of a decline in its share price?",
        options: ["Fixed", "Floating", "Both", "Neither"],
        correctIndex: 1,
        method:
          "In a floating structure, the offer price per share is fixed while the number of shares adjusts with the acquirer's price. The acquirer absorbs the full downside risk.",
      },
    ],
  },
  {
    id: "2.8",
    theme: "precedent-transactions",
    section: S.EXCHANGE,
    title: "When is a floating exchange offer used?",
    variants: [
      {
        kind: "choice",
        prompt: "When is a floating exchange offer most commonly used?",
        options: [
          "Acquirer is significantly larger than target",
          "Target is significantly larger than acquirer",
          "Target is public",
          "Acquirer is public",
        ],
        correctIndex: 0,
        method:
          "A significant decline in the target's business does not materially affect the acquirer's value, but not the reverse — hence the protection given to the target.",
      },
    ],
  },
  // --- Premiums paid ---
  {
    id: "2.9",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Target offer value with premium",
    variants: [
      {
        kind: "choice",
        prompt: `Unaffected Share Price $25.00. Premium Paid 30.0%. Fully Diluted Shares 150.0m.\n\nCalculate the target offer value.`,
        options: [
          "$3,750 million",
          "$4,500 million",
          "$4,875 million",
          "$5,000 million",
        ],
        correctIndex: 2,
        method:
          "Offer Value = $25.00 × 1.30 × 150.0 = $4,875 million.",
      },
    ],
  },
  {
    id: "2.10",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Enterprise value from offer value",
    variants: [
      {
        kind: "choice",
        prompt: `Equity Value $4,875m. Total Debt $1,500m. Preferred $125m. NCI $100m. Cash $150m.\n\nTarget enterprise value?`,
        options: [
          "$4,875 million",
          "$5,875 million",
          "$6,375 million",
          "$6,450 million",
        ],
        correctIndex: 3,
        method:
          "EV = 4,875 + 1,500 + 125 + 100 − 150 = $6,450 million.",
      },
    ],
  },
  {
    id: "2.11",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Implied premium paid",
    variants: [
      {
        kind: "choice",
        prompt: `Unaffected share price $50.00. Offer price $67.50.\n\nImplied premium paid?`,
        options: ["20%", "25%", "30%", "35%"],
        correctIndex: 3,
        method: "Premium = ($67.50 / $50.00) − 1 = 35%.",
      },
    ],
  },
  {
    id: "2.12",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Premium from offer and unaffected prices",
    variants: [
      {
        kind: "choice",
        prompt: `Offer price $15.00. Unaffected share price $12.50.\n\nPremium paid?`,
        options: ["15.0%", "17.0%", "20.0%", "25.0%"],
        correctIndex: 2,
        method: "($15.00 / $12.50) − 1 = 20.0%.",
      },
    ],
  },
  {
    id: "2.13",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Basis of premiums paid analysis",
    variants: [
      {
        kind: "open",
        prompt: "On which share price(s) is the premiums paid analysis based?",
        method:
          "It is based on the 'unaffected' share price, typically measured at several intervals before the transaction announcement (e.g. 1 day, 1 week, and 1 month prior).",
        answerLabel: "The unaffected share price at various intervals before announcement",
      },
    ],
  },
  {
    id: "2.14",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "When day-prior price is not the right benchmark",
    variants: [
      {
        kind: "open",
        prompt:
          "When might the day prior to the actual transaction announcement not serve as the appropriate benchmark for the 'unaffected' share price?",
        method:
          "When the company has previously announced its intention to explore strategic alternatives, when information has leaked to the public, or when rumors have surfaced prior to the official announcement — all events that move the price before the deal is announced.",
        answerLabel: "Strategic review announcement, leaks, or pre-announcement rumors",
      },
    ],
  },
  // --- Synergies ---
  {
    id: "2.15",
    theme: "precedent-transactions",
    section: S.SYNERGIES,
    title: "Examples of synergies",
    variants: [
      {
        kind: "choice",
        prompt: `Which of the following are examples of synergies?

I. Closing of overlapping facilities
II. Cost savings from headcount reduction
III. Hiring a new brand marketing team
IV. Loss of sales due to overlapping customers`,
        options: ["I and II", "I and III", "III and IV", "I, II, III, and IV"],
        correctIndex: 0,
        method:
          "Only I and II are synergies. III is a new cost, not a saving. IV is dis-synergy (revenue loss).",
      },
    ],
  },
  {
    id: "2.16",
    theme: "precedent-transactions",
    section: S.SYNERGIES,
    title: "Primary types of synergies",
    variants: [
      {
        kind: "choice",
        prompt: `What are the primary types of synergies?

I. Revenue  II. Transaction  III. Cost  IV. Time`,
        options: ["I and II", "I and III", "III and IV", "I, II, and III"],
        correctIndex: 1,
        method:
          "Synergies break down into revenue synergies and cost synergies. 'Transaction' and 'Time' are not synergy categories.",
      },
    ],
  },
  {
    id: "2.17",
    theme: "precedent-transactions",
    section: S.SYNERGIES,
    title: "EV/EBITDA with and without synergies",
    variants: [
      {
        kind: "choice",
        prompt: `Enterprise Value $1,200.0m. LTM Revenue $700.0m. LTM EBITDA $150.0m. Synergies $25.0m.\n\nEV/EBITDA without and with synergies?`,
        options: [
          "8.0x and 6.9x",
          "8.0x and 9.6x",
          "11.7x and 10.0x",
          "11.7x and 12.3x",
        ],
        correctIndex: 0,
        method:
          "Without: 1,200 / 150 = 8.0x. With: 1,200 / (150 + 25) = 1,200 / 175 = 6.9x.\nAdding synergies to the denominator mechanically lowers the displayed multiple.",
      },
    ],
  },
  {
    id: "2.18",
    theme: "precedent-transactions",
    section: S.SYNERGIES,
    title: "When are synergies most common?",
    variants: [
      {
        kind: "open",
        prompt: "In which type of M&A scenario are synergies most common, and why?",
        method:
          "Synergies are most common when a strategic acquirer buys a target operating a similar or adjacent business. Overlapping facilities and personnel can then be eliminated.",
        answerLabel: "Strategic acquirer + similar/adjacent business → overlapping facilities & headcount",
      },
    ],
  },
  {
    id: "2.19",
    theme: "precedent-transactions",
    section: S.SYNERGIES,
    title: "Why announce expected synergies?",
    variants: [
      {
        kind: "open",
        prompt: "Why do public acquirers typically announce expected synergies?",
        method:
          "To gain credit from investors for the potential value creation linked to the transaction.",
        answerLabel: "To get investor credit for potential deal value creation",
      },
    ],
  },
  // --- Framework & weaknesses ---
  {
    id: "2.20",
    theme: "precedent-transactions",
    section: S.FRAMEWORK,
    title: "Time lag as a weakness",
    variants: [
      {
        kind: "choice",
        prompt: `Why is "time lag" a potential weakness when using precedent transactions?`,
        options: [
          "Targets with April fiscal year-ends are hard to include",
          "Past transactions may not reflect current market conditions",
          "Spreading precedents is complex",
          "Some deals closed faster than others",
        ],
        correctIndex: 1,
        method:
          "Precedent transactions, by definition, took place in the past and may not reflect prevailing market conditions (e.g. mid-2000s LBO boom vs. the credit crunch that followed).",
      },
    ],
  },
  {
    id: "2.21",
    theme: "precedent-transactions",
    section: S.FRAMEWORK,
    title: "NOT a weakness of precedent transactions",
    variants: [
      {
        kind: "choice",
        prompt: "Which of the following is NOT a potential weakness of precedent transactions?",
        options: [
          "Time lag",
          "Scarcity of comparable acquisitions",
          "Locating transaction information",
          "Relativity",
        ],
        correctIndex: 3,
        method:
          "'Relativity' is actually a strength: the multiples approach provides simple benchmarks across sectors and time periods.",
      },
    ],
  },
  {
    id: "2.22",
    theme: "precedent-transactions",
    section: S.FRAMEWORK,
    title: "Premise behind precedent transactions",
    variants: [
      {
        kind: "open",
        prompt: "What is the premise behind precedent transactions analysis?",
        method:
          "Like trading comps, precedent transactions uses a multiples-based approach to derive an implied valuation range for a target. It relies on multiples paid in prior comparable M&A transactions.",
        answerLabel: "Multiples-based valuation using prior comparable M&A deals",
      },
    ],
  },
  {
    id: "2.23",
    theme: "precedent-transactions",
    section: S.FRAMEWORK,
    title: "Where do precedent transactions sit in the valuation range?",
    variants: [
      {
        kind: "open",
        prompt:
          "In a comprehensive valuation, would precedent transactions be toward the high end, low end, or middle of the range?",
        method:
          "Toward the high end, generally above trading comps and LBO analysis.",
        answerLabel: "High end of the range",
      },
    ],
  },
  {
    id: "2.24",
    theme: "precedent-transactions",
    section: S.FRAMEWORK,
    title: "Why higher than trading comps?",
    variants: [
      {
        kind: "open",
        prompt:
          "Why does precedent transactions analysis tend to yield a higher valuation than trading comps?",
        method:
          "First, buyers typically pay a 'control premium' — in exchange, the acquirer gains the right to control the target's business decisions and underlying cash flows. Second, strategic acquirers can often realize synergies, supporting higher purchase prices.",
        answerLabel: "Control premium + synergies",
      },
    ],
  },
  // --- Benefits & considerations ---
  {
    id: "2.25",
    theme: "precedent-transactions",
    section: S.BENEFITS,
    title: "Benefits of precedent transactions",
    variants: [
      {
        kind: "open",
        prompt: "What are some of the benefits of using precedent transactions analysis?",
        method:
          "Market-based (multiples and premiums actually paid), current (recent deals reflect prevailing M&A conditions), relativity (simple benchmarks across sectors), simplicity (a handful of deals can anchor valuation), objectivity (based on precedents, avoids forward assumptions).",
        answerLabel: "Market-based, current, relative, simple, objective",
      },
    ],
  },
  {
    id: "2.26",
    theme: "precedent-transactions",
    section: S.BENEFITS,
    title: "Considerations when using precedent transactions",
    variants: [
      {
        kind: "open",
        prompt: "What are some of the considerations when using precedent transactions analysis?",
        method:
          "Market-based (multiples can be distorted by capital-market conditions at deal time), time lag (past deals may not reflect today), scarcity (hard to find enough comparable deals), availability of information (deal terms may be undisclosed), acquirer's basis (buyer may have valued on non-public forward assumptions).",
        answerLabel: "Market distortion, time lag, scarcity, info gaps, non-public assumptions",
      },
    ],
  },
  // --- Mini-case Q37-42 ---
  {
    id: "2.27",
    theme: "precedent-transactions",
    section: S.MINI_CASE,
    title: "Exchange ratio in a stock-for-stock deal",
    variants: [
      {
        kind: "choice",
        prompt: `${MINI_CASE_DATA}\n\nAssuming a stock-for-stock transaction, determine the exchange ratio.`,
        options: ["0.50", "0.75", "1.1", "2.0"],
        correctIndex: 0,
        method: "Exchange Ratio = Offer Price / Acquirer Price = $15.00 / $30.00 = 0.50.",
      },
    ],
  },
  {
    id: "2.28",
    theme: "precedent-transactions",
    section: S.MINI_CASE,
    title: "Target fully diluted shares (TSM)",
    variants: [
      {
        kind: "choice",
        prompt: `${MINI_CASE_DATA}\n\nCalculate the target's fully diluted shares outstanding (TSM).`,
        options: [
          "253.3 million",
          "350.0 million",
          "416.7 million",
          "420.3 million",
        ],
        correctIndex: 0,
        method:
          "Proceeds = 10.0 × $10 = $100m. Repurchased = $100 / $15 = 6.7m.\nNet new = 10.0 − 6.7 = 3.3m. Diluted = 250.0 + 3.3 = 253.3 million.\nNote: TSM uses the offer price, not the market price.",
      },
    ],
  },
  {
    id: "2.29",
    theme: "precedent-transactions",
    section: S.MINI_CASE,
    title: "Target offer value and enterprise value",
    variants: [
      {
        kind: "choice",
        prompt: `${MINI_CASE_DATA}\n\nFully Diluted Shares = 253.3m.\n\nCalculate the target's offer value and enterprise value.`,
        options: [
          "$3,800m and $4,800m",
          "$4,250m and $5,250m",
          "$4,750m and $5,150m",
          "$5,250m and $6,250m",
        ],
        correctIndex: 0,
        method:
          "Offer Value = 253.3 × $15 = $3,800m. EV = $3,800 + $1,000 (net debt) = $4,800m.",
      },
    ],
  },
  {
    id: "2.30",
    theme: "precedent-transactions",
    section: S.MINI_CASE,
    title: "LTM EV/EBITDA",
    variants: [
      {
        kind: "choice",
        prompt: `${MINI_CASE_DATA}\n\nEnterprise Value = $4,800m.\n\nCalculate LTM EV/EBITDA.`,
        options: ["9.0x", "8.4x", "6.4x", "7.4x"],
        correctIndex: 3,
        method: "$4,800 / $650 = 7.4x.",
      },
    ],
  },
  {
    id: "2.31",
    theme: "precedent-transactions",
    section: S.MINI_CASE,
    title: "LTM EV/Revenue",
    variants: [
      {
        kind: "choice",
        prompt: `${MINI_CASE_DATA}\n\nEnterprise Value = $4,800m.\n\nCalculate LTM EV/Revenue.`,
        options: ["1.1x", "1.3x", "1.5x", "2.0x"],
        correctIndex: 0,
        method: "$4,800 / $4,500 = 1.07x ≈ 1.1x.",
      },
    ],
  },
  // --- Screening ---
  {
    id: "2.32",
    theme: "precedent-transactions",
    section: S.SCREENING,
    title: "NOT a traditional source for comparable acquisitions",
    variants: [
      {
        kind: "choice",
        prompt: "Which of the following is NOT a traditional source when creating an initial list of comparable acquisitions?",
        options: [
          "M&A databases",
          "Target's M&A history",
          "Credit reports",
          "Fairness opinions for recent transactions in the target's sector",
        ],
        correctIndex: 2,
        method:
          "Credit reports are not a standard source. Other resources include equity and fixed-income research reports, and merger proxies.",
      },
    ],
  },
  {
    id: "2.33",
    theme: "precedent-transactions",
    section: S.SCREENING,
    title: "Factors for selecting precedent transactions",
    variants: [
      {
        kind: "choice",
        prompt: `What factors should be considered when selecting precedent transactions?

I. CEO compensation  II. Financial characteristics (growth, margins)  III. Timing  IV. Size of companies`,
        options: [
          "II and IV",
          "I, II, and IV",
          "II, III, and IV",
          "I, II, III, and IV",
        ],
        correctIndex: 2,
        method: "Financial characteristics, timing, and company size — not CEO compensation.",
      },
    ],
  },
  {
    id: "2.34",
    theme: "precedent-transactions",
    section: S.SCREENING,
    title: "Strategies for locating comparable acquisitions",
    variants: [
      {
        kind: "choice",
        prompt: `Which of the following are useful strategies for locating comparable acquisitions?

I. Search M&A databases
II. Examine the target's M&A history
III. Search through merger proxies
IV. Examine the M&A history of comparable companies`,
        options: [
          "I and II",
          "I, II, and IV",
          "II, III, and IV",
          "I, II, III, and IV",
        ],
        correctIndex: 3,
        method: "All four are valid strategies. Equity and fixed-income research reports are also useful.",
      },
    ],
  },
  {
    id: "2.35",
    theme: "precedent-transactions",
    section: S.SCREENING,
    title: "Why can a strategic buyer pay more?",
    variants: [
      {
        kind: "choice",
        prompt: `Why can a strategic buyer often pay more for a target than a financial sponsor?

I. Synergies  II. Lower cost of capital  III. Longer time horizons  IV. Lower return thresholds`,
        options: [
          "II and III",
          "III and IV",
          "I, III, and IV",
          "I, II, III, and IV",
        ],
        correctIndex: 3,
        method:
          "All four reasons explain why, under normal market conditions, a strategic buyer can typically afford to pay more than a financial sponsor.",
      },
    ],
  },
];
