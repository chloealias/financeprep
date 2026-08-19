import type { Exercise } from "@/data/exercise-types";

const S = {
  WACC: "WACC & Cost of Capital",
  TV: "Terminal Value — EMM & PGM",
  PV: "Present Value & Mid-Year Convention",
  EV_EQUITY: "Enterprise Value → Equity Value",
  ORDER: "DCF Process Order",
  CAPM: "CAPM & Beta",
  TV_DEEP: "Terminal Value — Deep Dive",
  FCF: "Free Cash Flow — Formula & Drivers",
  NWC: "Net Working Capital",
  RATIOS: "Operating Cycle Ratios",
  SYNTHESIS: "Synthesis & Interview Questions",
};

export const dcfExercises: Exercise[] = [
  // --- WACC ---
  {
    id: "3.1",
    theme: "dcf",
    section: S.WACC,
    title: "Equity-to-total capitalization",
    variants: [
      {
        kind: "numeric",
        prompt: `Debt-to-Total Capitalization: 30.0%.\n\nCalculate equity-to-total capitalization.`,
        unitHint: "Percent (e.g. 45)",
        check: { mode: "exact", accept: [70] },
        method: "1 − 30% = 70%.",
        answerLabel: "70%",
      },
    ],
  },
  {
    id: "3.2",
    theme: "dcf",
    section: S.WACC,
    title: "After-tax cost of debt",
    variants: [
      {
        kind: "numeric",
        prompt: `Cost of Debt: 6.5%. Tax Rate: 25.0%.\n\nCalculate after-tax cost of debt.`,
        unitHint: "Percent (e.g. 3.2)",
        check: { mode: "exact", accept: [4.875, 4.9] },
        method: "6.5% × (1 − 25%) = 4.875% ≈ 4.9%.",
        answerLabel: "4.9%",
      },
    ],
  },
  // --- Terminal Value ---
  {
    id: "3.3",
    theme: "dcf",
    section: S.TV,
    title: "Terminal value — exit multiple method",
    variants: [
      {
        kind: "numeric",
        prompt: `Terminal Year EBITDA (2024E): $929.2m. Exit Multiple: 7.5x.\n\nCalculate terminal value using the exit multiple method.`,
        unitHint: "Million dollars (e.g. 5000)",
        check: { mode: "exact", accept: [6969] },
        method: "TV = $929.2 × 7.5 = $6,969.0 million.",
        answerLabel: "$6,969.0 million",
      },
    ],
  },
  {
    id: "3.4",
    theme: "dcf",
    section: S.TV,
    title: "Implied perpetuity growth rate from EMM",
    variants: [
      {
        kind: "numeric",
        prompt: `TV (EMM) = $6,969.0m. WACC = 11.0%. Terminal FCF (2024E) = $540.5m. Mid-year convention.\n\nCalculate the implied perpetuity growth rate.`,
        unitHint: "Percent (e.g. 4.0)",
        check: { mode: "tolerance", value: 2.6, pct: 5 },
        method:
          "Implied g = ((TV × WACC) − FCF × (1+WACC)^0.5) / (TV + FCF × (1+WACC)^0.5) ≈ 2.6%.",
        answerLabel: "2.6%",
      },
    ],
  },
  {
    id: "3.5",
    theme: "dcf",
    section: S.TV,
    title: "Terminal value — perpetuity growth method",
    variants: [
      {
        kind: "numeric",
        prompt: `Terminal FCF (2024E): $540.5m. Perpetuity Growth Rate: 3%. WACC: 11%.\n\nCalculate terminal value using the perpetuity growth method.`,
        unitHint: "Million dollars (e.g. 5000)",
        check: { mode: "tolerance", value: 6959.6, pct: 1 },
        method: "TV = [$540.5 × (1 + 3%)] / (11% − 3%) = $556.7 / 8% = $6,959.6 million.",
        answerLabel: "$6,959.6 million",
      },
    ],
  },
  {
    id: "3.6",
    theme: "dcf",
    section: S.TV,
    title: "Implied exit multiple from PGM",
    variants: [
      {
        kind: "numeric",
        prompt: `TV (PGM) = $6,959.6m. WACC = 11%. EBITDA terminal = $929.2m. Mid-year convention on PGM but year-end on EMM.\n\nCalculate the implied exit multiple.`,
        unitHint: "Multiple (e.g. 5.0)",
        check: { mode: "tolerance", value: 7.9, pct: 5 },
        method:
          "Implied Multiple = [TV × (1+WACC)^0.5] / EBITDA = [$6,959.6 × 1.0536] / $929.2 ≈ 7.9x.\nCross-check: 7.5x EMM vs 7.9x implied — consistent.",
        answerLabel: "7.9x",
      },
    ],
  },
  // --- Present Value ---
  {
    id: "3.7",
    theme: "dcf",
    section: S.PV,
    title: "Mid-year discount period",
    variants: [
      {
        kind: "numeric",
        prompt: `Projection starts in 2020 (Year 1). Base year is 2019.\n\nDetermine the 2020 discount period under mid-year convention.`,
        unitHint: "Number (e.g. 1.5)",
        check: { mode: "exact", accept: [0.5] },
        method: "2020 − 2019 − 0.5 = 0.5.",
        answerLabel: "0.5",
      },
    ],
  },
  {
    id: "3.8",
    theme: "dcf",
    section: S.PV,
    title: "Discount factor for Year 2",
    variants: [
      {
        kind: "numeric",
        prompt: `WACC = 11%. Mid-year convention.\n\nCalculate the 2021 (Year 2) discount factor.`,
        unitHint: "Number rounded to 2 decimals (e.g. 0.75)",
        check: { mode: "tolerance", value: 0.86, pct: 2 },
        method: "DF = 1 / (1.11)^1.5 = 0.86.",
        answerLabel: "0.86",
      },
    ],
  },
  {
    id: "3.9",
    theme: "dcf",
    section: S.PV,
    title: "Present value of Year 3 FCF",
    variants: [
      {
        kind: "numeric",
        prompt: `FCF 2022E = $490.6m. Discount factor = 0.77.\n\nCalculate the 2022 present value of FCF.`,
        unitHint: "Million dollars (e.g. 250.0)",
        check: { mode: "tolerance", value: 377.9, pct: 1 },
        method: "$490.6 × 0.77 = $377.9 million.",
        answerLabel: "$377.9 million",
      },
    ],
  },
  {
    id: "3.10",
    theme: "dcf",
    section: S.PV,
    title: "Terminal value discount factor (EMM — no mid-year)",
    variants: [
      {
        kind: "numeric",
        prompt: `WACC = 11%. Terminal value at end of Year 5.\n\nDetermine the terminal value discount factor using the exit multiple method.\n\n⚠️ Unlike projected FCF, EMM terminal value is discounted at year-end (no mid-year adjustment).`,
        unitHint: "Number rounded to 2 decimals (e.g. 0.75)",
        check: { mode: "tolerance", value: 0.59, pct: 2 },
        method: "DF = 1 / (1.11)^5 = 0.59. No mid-year for EMM.",
        answerLabel: "0.59",
      },
    ],
  },
  {
    id: "3.11",
    theme: "dcf",
    section: S.PV,
    title: "Present value of terminal value",
    variants: [
      {
        kind: "numeric",
        prompt: `Terminal value (EMM) = $6,969.0m. Discount factor = 0.59.\n\nCalculate the present value of the terminal value.`,
        unitHint: "Million dollars (e.g. 3000.0)",
        check: { mode: "tolerance", value: 4135.8, pct: 1 },
        method: "$6,969.0 × 0.59 ≈ $4,135.8 million (exact: $6,969.0 × 0.5935 = $4,135.8).",
        answerLabel: "$4,135.8 million",
      },
    ],
  },
  // --- EV → Equity ---
  {
    id: "3.12",
    theme: "dcf",
    section: S.EV_EQUITY,
    title: "Enterprise value from DCF",
    variants: [
      {
        kind: "numeric",
        prompt: `Cumulative PV of FCF (2020–2024): $1,872.9m. PV of Terminal Value: $4,135.8m.\n\nCalculate enterprise value.`,
        unitHint: "Million dollars (e.g. 5000.0)",
        check: { mode: "tolerance", value: 6008.7, pct: 1 },
        method: "EV = $1,872.9 + $4,135.8 = $6,008.7 million.",
        answerLabel: "$6,008.7 million",
      },
    ],
  },
  {
    id: "3.13",
    theme: "dcf",
    section: S.EV_EQUITY,
    title: "Terminal value as % of enterprise value",
    variants: [
      {
        kind: "numeric",
        prompt: `PV of Terminal Value: $4,135.8m. Enterprise Value: $6,008.7m.\n\nWhat percentage of EV is the terminal value?`,
        unitHint: "Percent (e.g. 45.0)",
        check: { mode: "tolerance", value: 68.8, pct: 2 },
        method: "$4,135.8 / $6,008.7 = 68.8%.",
        answerLabel: "68.8%",
      },
    ],
  },
  {
    id: "3.14",
    theme: "dcf",
    section: S.EV_EQUITY,
    title: "Implied equity value",
    variants: [
      {
        kind: "numeric",
        prompt: `Enterprise Value: $6,008.7m. Total Debt: $1,500.0m. Cash: $250.0m.\n\nCalculate implied equity value.`,
        unitHint: "Million dollars (e.g. 3000.0)",
        check: { mode: "tolerance", value: 4758.7, pct: 1 },
        method: "Equity = EV − Debt + Cash = $6,008.7 − $1,500 + $250 = $4,758.7 million.",
        answerLabel: "$4,758.7 million",
      },
    ],
  },
  // --- DCF order ---
  {
    id: "3.15",
    theme: "dcf",
    section: S.ORDER,
    title: "Correct order of DCF steps",
    variants: [
      {
        kind: "choice",
        prompt: `Which is the correct order of the steps to complete a DCF?

I. Determine terminal value
II. Study the target and determine key performance drivers
III. Calculate present value and determine valuation
IV. Project free cash flow
V. Calculate WACC`,
        options: [
          "II, V, IV, III, and I",
          "II, IV, V, I, and III",
          "III, IV, V, I, and II",
          "III, IV, V, II, and I",
        ],
        correctIndex: 1,
        method: "Study target → Project FCF → WACC → Terminal value → PV and valuation.",
      },
    ],
  },
  // --- CAPM & Beta ---
  {
    id: "3.16",
    theme: "dcf",
    section: S.CAPM,
    title: "Method used to calculate cost of equity",
    variants: [
      {
        kind: "choice",
        prompt: "What method is used to calculate cost of equity?",
        options: ["WACC", "CAPM", "NWC", "YTW"],
        correctIndex: 1,
        method: "The Capital Asset Pricing Model (CAPM) is used to calculate cost of equity.",
      },
    ],
  },
  {
    id: "3.17",
    theme: "dcf",
    section: S.CAPM,
    title: "Proxy for the risk-free rate",
    variants: [
      {
        kind: "choice",
        prompt: "Which is an acceptable proxy for the risk-free rate in the CAPM?",
        options: [
          "The after-tax cost of debt",
          "The Fed Funds Rate",
          "The interpolated yield on a 20-year bond",
          "The London Interbank Offered Rate",
        ],
        correctIndex: 2,
        method:
          "Use the longest-maturity instrument available to match the expected life of the company under a going-concern assumption.",
      },
    ],
  },
  {
    id: "3.18",
    theme: "dcf",
    section: S.CAPM,
    title: "Appropriate market risk premium range",
    variants: [
      {
        kind: "choice",
        prompt: "Which is the most appropriate market risk premium to use in cost of equity?",
        options: ["0%–1%", "2%–3%", "5%–8%", "10%+"],
        correctIndex: 2,
        method: "The commonly accepted range is 5%–8%.",
      },
    ],
  },
  {
    id: "3.19",
    theme: "dcf",
    section: S.CAPM,
    title: "Calculate cost of equity",
    variants: [
      {
        kind: "choice",
        prompt: `Levered Beta: 1.25. Risk-free Rate: 3.0%. Market Risk Premium: 6.6%.\n\nCost of equity?`,
        options: ["11.3%", "12.0%", "13.1%", "14.4%"],
        correctIndex: 0,
        method: "re = 3.0% + (1.25 × 6.6%) = 3.0% + 8.25% = 11.25% ≈ 11.3%.",
      },
    ],
  },
  {
    id: "3.20",
    theme: "dcf",
    section: S.CAPM,
    title: "Calculate unlevered beta",
    variants: [
      {
        kind: "choice",
        prompt: `Levered Beta: 1.25. D/E: 40.0%. Tax Rate: 25.0%.\n\nUnlevered beta?`,
        options: ["0.96", "1.00", "1.12", "1.35"],
        correctIndex: 0,
        method: "βu = 1.25 / [1 + (0.40 × 0.75)] = 1.25 / 1.30 = 0.96.",
      },
    ],
  },
  {
    id: "3.21",
    theme: "dcf",
    section: S.CAPM,
    title: "Calculate levered beta",
    variants: [
      {
        kind: "choice",
        prompt: `Unlevered Beta: 1.00. D/E: 45.0%. Tax Rate: 25.0%.\n\nLevered beta?`,
        options: ["1.01", "1.25", "1.34", "1.42"],
        correctIndex: 2,
        method: "βL = 1.00 × [1 + (0.45 × 0.75)] = 1.00 × 1.3375 = 1.34.",
      },
    ],
  },
  {
    id: "3.22",
    theme: "dcf",
    section: S.CAPM,
    title: "Sector with the lowest beta",
    variants: [
      {
        kind: "choice",
        prompt: "Which sector should have the lowest beta?",
        options: ["Social media", "Utility", "Homebuilder", "Chemicals"],
        correctIndex: 1,
        method: "Utilities are less volatile and risky than social media, homebuilders, and chemicals.",
      },
    ],
  },
  {
    id: "3.23",
    theme: "dcf",
    section: S.CAPM,
    title: "Why add a size premium to CAPM?",
    variants: [
      {
        kind: "choice",
        prompt: "Why may a banker choose to add a size premium to the CAPM formula?",
        options: [
          "Empirical evidence that smaller companies are riskier → higher cost of equity",
          "Empirical evidence that larger companies are riskier",
          "To compensate for the market risk premium, which can vary",
          "To compensate for the risk-free rate, which can vary",
        ],
        correctIndex: 0,
        method:
          "Smaller companies' risk is not fully captured by beta due to limited trading volumes that make covariance calculations imprecise.",
      },
    ],
  },
  // --- TV deep dive ---
  {
    id: "3.24",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Methodology for value beyond projection period",
    variants: [
      {
        kind: "choice",
        prompt: "Which methodology captures the value of a company beyond its projection period?",
        options: ["Long-term value", "Long-term adjusted value", "Terminal value", "Projected value"],
        correctIndex: 2,
        method: "Terminal value captures all value beyond the explicit projection period.",
      },
    ],
  },
  {
    id: "3.25",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Terminal value via PGM — calculation",
    variants: [
      {
        kind: "choice",
        prompt: `Year 5 FCF: $250.0m. Growth Rate: 3.0%. WACC: 12.0%.\n\nTerminal value?`,
        options: [
          "$2,800.2 million",
          "$2,861.1 million",
          "$3,111.5 million",
          "$3,215.2 million",
        ],
        correctIndex: 1,
        method: "TV = [$250 × 1.03] / (12% − 3%) = $257.5 / 9% = $2,861.1 million.",
      },
    ],
  },
  {
    id: "3.26",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Mid-year convention — impact on valuation",
    variants: [
      {
        kind: "choice",
        prompt: "How does mid-year convention affect valuation vs year-end discounting?",
        options: [
          "Higher value than year-end discounting",
          "Lower value than year-end discounting",
          "Same value",
          "Not applicable",
        ],
        correctIndex: 0,
        method: "Mid-year gives a slightly higher valuation because cash flows are assumed to be received earlier.",
      },
    ],
  },
  {
    id: "3.27",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "PV of FCF with mid-year discounting",
    variants: [
      {
        kind: "choice",
        prompt: `A company will generate $500m FCF over the next year. WACC = 12%.\n\nPresent value using mid-year discounting?`,
        options: [
          "$529.2 million",
          "$421.8 million",
          "$446.4 million",
          "$472.5 million",
        ],
        correctIndex: 3,
        method: "$500 / (1.12)^0.5 = $472.5 million.",
      },
    ],
  },
  {
    id: "3.28",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Mid-year convention — PGM vs EMM",
    variants: [
      {
        kind: "choice",
        prompt: "How does mid-year convention apply to PGM and EMM?",
        options: [
          "Mid-year for PGM; year-end for EMM",
          "Mid-year for EMM; year-end for PGM",
          "Mid-year for both",
          "Not used in either",
        ],
        correctIndex: 0,
        method:
          "PGM discounts a perpetual cash flow received throughout the year → mid-year. EMM is based on LTM multiples at calendar year-end → year-end discounting.",
      },
    ],
  },
  {
    id: "3.29",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Why use PGM instead of EMM?",
    variants: [
      {
        kind: "choice",
        prompt: "Why might PGM be used instead of EMM?",
        options: [
          "Absence of relevant comparables to determine an exit multiple",
          "Difficult to determine a long-term growth rate",
          "Current economic environment is volatile",
          "Target company is private",
        ],
        correctIndex: 0,
        method: "When no suitable comparable companies exist to anchor an exit multiple.",
      },
    ],
  },
  {
    id: "3.30",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Steady state requirement",
    variants: [
      {
        kind: "choice",
        prompt: "Which terminal value formula requires a steady state at the end of the projection period?",
        options: ["PGM", "EMM", "Both", "Neither"],
        correctIndex: 2,
        method: "Both formulas require a steady state at the end of projection, otherwise TV will be distorted.",
      },
    ],
  },
  {
    id: "3.31",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Cost of debt when debt is not traded",
    variants: [
      {
        kind: "choice",
        prompt: "Which method is preferred for cost of debt when the target's debt is not traded?",
        options: [
          "Historical average interest expense",
          "Spread between CAPM and risk-free rate",
          "Determine implied credit rating based on target capital structure",
          "None of the above",
        ],
        correctIndex: 2,
        method:
          "Approximate cost of debt based on implied credit rating at target capital structure, with help from a DCM professional.",
      },
    ],
  },
  // --- FCF ---
  {
    id: "3.32",
    theme: "dcf",
    section: S.FCF,
    title: "Calculate free cash flow",
    variants: [
      {
        kind: "choice",
        prompt: `EBIT $300.0m. D&A $50.0m. Capex $25.0m. Increase in NWC $10.0m. Tax Rate 25.0%.\n\nFCF?`,
        options: [
          "$151.0 million",
          "$189.0 million",
          "$240.0 million",
          "$389.0 million",
        ],
        correctIndex: 2,
        method:
          "EBIAT = 300 × (1 − 25%) = 225. FCF = 225 + 50 − 25 − 10 = $240.0 million.",
      },
    ],
  },
  {
    id: "3.33",
    theme: "dcf",
    section: S.FCF,
    title: "Relevant assumptions for projecting FCF",
    variants: [
      {
        kind: "choice",
        prompt: `Which are relevant for creating assumptions when projecting FCF?

I. Historical interest expense  II. Historical growth rates  III. Classes of debt securities  IV. Historical EBIT margins`,
        options: ["I and II", "I and III", "II and IV", "I, II, III, and IV"],
        correctIndex: 2,
        method:
          "FCF is unlevered (pre-interest), so historical interest expense (I) and debt classes (III) are irrelevant.",
      },
    ],
  },
  {
    id: "3.34",
    theme: "dcf",
    section: S.FCF,
    title: "NOT a key driver of projected FCF",
    variants: [
      {
        kind: "choice",
        prompt: "Which is NOT a key driver of projected FCF?",
        options: ["Capital expenditures", "Sales growth", "EBIT margins", "Discount rate"],
        correctIndex: 3,
        method: "The discount rate is used in the discounting step, not in projecting FCF itself.",
      },
    ],
  },
  {
    id: "3.35",
    theme: "dcf",
    section: S.FCF,
    title: "Typical projection period length",
    variants: [
      {
        kind: "choice",
        prompt: "What is the typical projection period for a DCF?",
        options: ["3 years", "5 years", "10 years", "20 years"],
        correctIndex: 1,
        method: "5 years is the standard projection period.",
      },
    ],
  },
  {
    id: "3.36",
    theme: "dcf",
    section: S.FCF,
    title: "When is a 15–20 year projection appropriate?",
    variants: [
      {
        kind: "choice",
        prompt: "A 15 to 20 year projection period is appropriate for a company with:",
        options: [
          "Long-term contractual revenue streams",
          "High revenue volatility",
          "Negative free cash flow",
          "Recent IPO",
        ],
        correctIndex: 0,
        method: "Long-term contractual revenues (e.g. utilities, infrastructure) justify extended projection periods.",
      },
    ],
  },
  {
    id: "3.37",
    theme: "dcf",
    section: S.FCF,
    title: "Sector most likely to have >5 year projection",
    variants: [
      {
        kind: "choice",
        prompt: "Which sector is most likely to have a projection period greater than 5 years?",
        options: ["Utility", "Technology", "Retail", "Financial services"],
        correctIndex: 0,
        method: "Utilities have highly predictable or contractual revenue streams.",
      },
    ],
  },
  {
    id: "3.38",
    theme: "dcf",
    section: S.FCF,
    title: "Key variables commonly sensitized in DCF",
    variants: [
      {
        kind: "choice",
        prompt: `Which are key variables commonly sensitized in the DCF?

I. WACC  II. Exit multiple  III. IRR  IV. EBIT margins`,
        options: ["I and III", "II and III", "I, II, and IV", "I, III, and IV"],
        correctIndex: 2,
        method: "WACC, exit multiple, and EBIT margins. Other common sensitivities: perpetuity growth rate and sales growth.",
      },
    ],
  },
  {
    id: "3.39",
    theme: "dcf",
    section: S.FCF,
    title: "Companies with high capital expenditures",
    variants: [
      {
        kind: "choice",
        prompt: `Which companies would be expected to have high capex?

I. Mining  II. Heavy equipment manufacturer  III. Mature distributor  IV. Oil and gas`,
        options: ["I, II, and III", "I, II, and IV", "I, III, and IV", "I, II, III, and IV"],
        correctIndex: 1,
        method: "Mining, heavy equipment manufacturing, and oil & gas are capital-intensive. A mature distributor is not.",
      },
    ],
  },
  // --- NWC ---
  {
    id: "3.40",
    theme: "dcf",
    section: S.NWC,
    title: "Change in net working capital",
    variants: [
      {
        kind: "choice",
        prompt: `($ million)          2018    2019
A/R                  $325.0  $350.0
Inventories           200.0   210.0
Prepaid & Other        35.0    45.0
A/P                   300.0   315.0
Accrued Liabilities   150.0   160.0
Other Current Liab.    60.0    65.0

(Increase)/Decrease in NWC from 2018 to 2019?`,
        options: [
          "$10.0 million",
          "($10.0) million",
          "$15.0 million",
          "($15.0) million",
        ],
        correctIndex: 3,
        method:
          "NWC 2018 = 560 − 510 = $50. NWC 2019 = 605 − 540 = $65.\n(Inc)/Dec = 50 − 65 = ($15.0) million. An increase in NWC is a use of cash.",
      },
    ],
  },
  {
    id: "3.41",
    theme: "dcf",
    section: S.NWC,
    title: "Increase in inventory — cash impact",
    variants: [
      {
        kind: "choice",
        prompt: "An increase in inventory is:",
        options: ["A use of cash", "A source of cash", "No change in cash", "A decrease in PP&E"],
        correctIndex: 0,
        method: "An increase in a current asset (inventory) ties up cash → use of cash.",
      },
    ],
  },
  {
    id: "3.42",
    theme: "dcf",
    section: S.NWC,
    title: "Increase in accounts payable — cash impact",
    variants: [
      {
        kind: "choice",
        prompt: "An increase in accounts payable is:",
        options: ["A use of cash", "A source of cash", "No change in cash", "An increase in PP&E"],
        correctIndex: 1,
        method: "An increase in a current liability (A/P) means deferring payment → source of cash.",
      },
    ],
  },
  // --- Operating cycle ratios ---
  {
    id: "3.43",
    theme: "dcf",
    section: S.RATIOS,
    title: "Calculate DSO",
    variants: [
      {
        kind: "choice",
        prompt: `Revenue: $3.5 billion. A/R: $300 million.\n\nDSO?`,
        options: ["29 days", "30 days", "31 days", "43 days"],
        correctIndex: 2,
        method: "DSO = ($300 / $3,500) × 365 = 31 days.",
      },
    ],
  },
  {
    id: "3.44",
    theme: "dcf",
    section: S.RATIOS,
    title: "Calculate DIH",
    variants: [
      {
        kind: "choice",
        prompt: `Revenue: $3.5B. COGS: $2.4B. Inventory: $525m.\n\nDIH?`,
        options: ["70 days", "75 days", "80 days", "85 days"],
        correctIndex: 2,
        method: "DIH = ($525 / $2,400) × 365 = 80 days.",
      },
    ],
  },
  {
    id: "3.45",
    theme: "dcf",
    section: S.RATIOS,
    title: "Calculate inventory turns",
    variants: [
      {
        kind: "choice",
        prompt: `COGS: $2.4B. Inventory: $525m.\n\nInventory turns?`,
        options: ["4.6x", "4.9x", "5.1x", "6.1x"],
        correctIndex: 0,
        method: "Inventory Turns = $2,400 / $525 = 4.6x.",
      },
    ],
  },
  {
    id: "3.46",
    theme: "dcf",
    section: S.RATIOS,
    title: "Calculate DPO",
    variants: [
      {
        kind: "choice",
        prompt: `Revenue: $4.3B. COGS: $3.3B. A/P: $250m.\n\nDPO?`,
        options: ["28 days", "30 days", "32 days", "33 days"],
        correctIndex: 0,
        method: "DPO = ($250 / $3,300) × 365 = 28 days.",
      },
    ],
  },
  // --- Synthesis ---
  {
    id: "3.47",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Challenges projecting FCF for cyclical companies",
    variants: [
      {
        kind: "open",
        prompt: "What are some challenges with projecting FCF for cyclical companies?",
        method:
          "Sales must track the underlying commodity cycle, leading to volatile trends with significant peak-to-trough swings depending on where the company sits in the cycle at projection start.",
        answerLabel: "Volatile sales tied to commodity cycles, peak-to-trough sensitivity",
      },
    ],
  },
  {
    id: "3.48",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Terminal year FCF for cyclical companies",
    variants: [
      {
        kind: "open",
        prompt: "What considerations apply when projecting terminal year FCF for a cyclical company?",
        method:
          "Terminal year performance must reflect a normalized level, not a cyclical peak or trough. Otherwise, TV — which often represents a substantial portion of total DCF value — will be skewed to a non-representative level.",
        answerLabel: "Must be normalized, not a cyclical peak or trough",
      },
    ],
  },
  {
    id: "3.49",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Depreciation across the three statements",
    variants: [
      {
        kind: "open",
        prompt: "How is depreciation reflected on (a) income statement, (b) cash flow statement, (c) balance sheet?",
        method:
          "(a) Usually embedded in COGS, sometimes a separate line. (b) Added back to net income in operating cash flows. (c) Subtracted from opening PP&E balance.",
        answerLabel: "In COGS / added back in CF / reduces PP&E",
      },
    ],
  },
  {
    id: "3.50",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "WACC increase → impact on EV",
    variants: [
      {
        kind: "open",
        prompt: "All else equal, if WACC increases, does enterprise value increase or decrease? Why?",
        method:
          "EV decreases. A higher WACC means future cash flows and terminal value are discounted with a larger denominator, reducing their present value.",
        answerLabel: "Decreases — higher discount rate reduces PV of all future flows",
      },
    ],
  },
  {
    id: "3.51",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Impact of 5% vs 8% market risk premium",
    variants: [
      {
        kind: "open",
        prompt: "What is the impact on valuation of using a 5.0% vs 8.0% market risk premium?",
        method:
          "Using 5.0% instead of 8.0% leads to a higher valuation. A lower risk premium → lower cost of equity → lower WACC → higher present values.",
        answerLabel: "5% → higher valuation (lower discount rate)",
      },
    ],
  },
  {
    id: "3.52",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Benefits of DCF analysis",
    variants: [
      {
        kind: "open",
        prompt: "What are some benefits of using DCF analysis?",
        method:
          "Cash flow-based (more fundamental than multiples), market independent (insulated from bubbles/distress), self-sufficient (no need for truly comparable companies), flexibility (multiple financial performance scenarios).",
        answerLabel: "Cash flow-based, market independent, self-sufficient, flexible",
      },
    ],
  },
  {
    id: "3.53",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Considerations when using DCF",
    variants: [
      {
        kind: "open",
        prompt: "What are some considerations when using DCF analysis?",
        method:
          "Dependence on projections (hard to forecast accurately), sensitivity to assumptions (small changes → big swings), terminal value dominance (can be 75%+ of total), assumes constant capital structure.",
        answerLabel: "Projection dependence, assumption sensitivity, TV dominance, constant capital structure",
      },
    ],
  },
  {
    id: "3.54",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Weakness of the DCF",
    variants: [
      {
        kind: "choice",
        prompt: "Which is considered a weakness of the DCF?",
        options: [
          "Market independent",
          "Terminal value represents a large portion of total value",
          "Can handle multiple financial performance scenarios",
          "Minimal reliance on comparable companies or transactions",
        ],
        correctIndex: 1,
        method:
          "Terminal value is a potential weakness: highly sensitive to assumptions and can represent 75%+ of total DCF value.",
      },
    ],
  },
];
