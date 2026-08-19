import type { Exercise } from "@/data/exercise-types";

const KESTREL_CASE = `Kestrel Industrial. Share price $30.00. Basic shares outstanding 92.0 million.

Options / warrants:
A — 4.00m shares, strike $10.00
B — 2.00m shares, strike $15.00
C — 1.00m shares, strike $20.00
D — 1.00m shares, strike $45.00`;

const KESTREL_LTM = `Kestrel Industrial — reported P&L extract ($ million):

                    FY 2023A   Stub 9/30/2023   Stub 9/30/2024   LTM 9/30/2024
Gross profit        1,100        800              960              1,260
EBIT                  500        300              320                520
D&A                   160        120              120                160
Net income            250        125              160                285
Marginal tax rate     25%

Non-recurring items (pre-tax):
- $40m gain on a warehouse sale in FY 2023
- $40m inventory write-down in the current stub (in COGS)
- $20m restructuring charge (severance) in the current stub`;

const S = {
  TSM: "Kestrel Case — TSM Dilution",
  EV: "Equity Value & Enterprise Value",
  LTM: "LTM Adjustments",
  PROCESS: "Process & Methodology",
  CONVERT: "Convertibles & Dilution Methods",
  VALO: "Implied Valuation",
  STRUCTURE: "Capital Structure & EV",
  CULTURE: "General Knowledge & Interview",
  RATIOS: "Ratios & Calendarization",
  MULTIPLES: "Trading Multiples",
};

export const comparableCompaniesExercises: Exercise[] = [
  {
    id: "1.1",
    theme: "comparable-companies",
    section: S.TSM,
    title: "Kestrel — in-the-money options",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}\n\nHow many options/warrants are in-the-money?`,
        unitHint: "Million shares",
        check: { mode: "exact", accept: [7] },
        method:
          "ITM if strike < $30. Tranches A, B and C. D at $45 is out-of-the-money.\n4.00 + 2.00 + 1.00 = 7.00 million.",
        answerLabel: "7.00 million",
      },
    ],
  },
  {
    id: "1.2",
    theme: "comparable-companies",
    section: S.TSM,
    title: "Kestrel — option proceeds",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}\n\nWhat cash proceeds come from exercising the in-the-money options/warrants?`,
        unitHint: "Million dollars, no thousand separator (e.g. 50)",
        check: { mode: "exact", accept: [90] },
        method:
          "(4.00m × $10) + (2.00m × $15) + (1.00m × $20) = 40 + 30 + 20 = $90 million.",
        answerLabel: "$90 million",
      },
    ],
  },
  {
    id: "1.3",
    theme: "comparable-companies",
    section: S.TSM,
    title: "Kestrel — TSM net new shares",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}\n\nUnder the treasury stock method, how many net new shares do the options/warrants create?`,
        unitHint: "Million shares",
        check: { mode: "exact", accept: [4] },
        method:
          "ITM shares = 7.00m. Proceeds = $90m, used to buy back stock at $30 → 90 / 30 = 3.00m shares.\nNet new shares = 7.00 − 3.00 = 4.00 million.",
        answerLabel: "4.00 million",
      },
    ],
  },
  {
    id: "1.4",
    theme: "comparable-companies",
    section: S.TSM,
    title: "Kestrel — fully diluted shares",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}\n\nWhat is fully diluted shares outstanding (TSM)?`,
        unitHint: "Million shares",
        check: { mode: "exact", accept: [96] },
        method: "92.0 basic + 4.0 net new shares = 96.0 million.",
        answerLabel: "96.0 million",
      },
    ],
  },
  {
    id: "1.5",
    theme: "comparable-companies",
    section: S.EV,
    title: "Kestrel — equity value",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}

Fully diluted shares (TSM) = 96.0 million.
52-week high $41.00 / low $22.00. Last quarterly dividend $0.40.

Current share price $30.00. Total debt $1,200.0m. Cash $80.0m. No preferred stock, no NCI.

What is equity value?`,
        unitHint: "Million dollars, no thousand separator (e.g. 1000)",
        check: { mode: "exact", accept: [2880] },
        method:
          "Equity value = diluted shares × current price = 96.0 × $30 = $2,880 million.\nDo not use the 52-week high/low or the dividend.",
        answerLabel: "$2,880 million",
      },
    ],
  },
  {
    id: "1.6",
    theme: "comparable-companies",
    section: S.EV,
    title: "Kestrel — enterprise value",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}

Fully diluted shares = 96.0 million. Equity value = $2,880 million.
Total debt $1,200.0m. Cash $80.0m. Preferred stock and NCI are nil.

What is enterprise value?`,
        unitHint: "Million dollars, no thousand separator (e.g. 2000)",
        check: { mode: "exact", accept: [4000] },
        method:
          "EV = equity value + debt + preferred + NCI − cash = 2,880 + 1,200 + 0 + 0 − 80 = $4,000 million.",
        answerLabel: "$4,000 million",
      },
    ],
  },
  {
    id: "1.7",
    theme: "comparable-companies",
    section: S.LTM,
    title: "Kestrel — adjusted LTM gross profit",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_LTM}

Compute adjusted LTM gross profit. Add the inventory write-down back to COGS (hence to gross profit).`,
        unitHint: "Million dollars, no thousand separator (e.g. 500)",
        check: { mode: "exact", accept: [1300] },
        method:
          "Current stub GP 960 + 40 inventory add-back = 1,000.\nLTM = FY + current stub − prior stub = 1,100 + 1,000 − 800 = $1,300 million.\nThe warehouse gain and the restructuring sit below gross profit — leave them out here.",
        answerLabel: "$1,300 million",
      },
    ],
  },
  {
    id: "1.8",
    theme: "comparable-companies",
    section: S.LTM,
    title: "Kestrel — adjusted LTM EBIT",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_LTM}

Compute adjusted LTM EBIT.`,
        unitHint: "Million dollars, no thousand separator (e.g. 150)",
        check: { mode: "exact", accept: [540] },
        method:
          "FY EBIT: strip the $40 gain → 500 − 40 = 460.\nCurrent stub: add back inventory $40 and restructuring $20 → 320 + 40 + 20 = 380.\nLTM = 460 + 380 − 300 = $540 million.\nPlace each item in the period where it actually hit.",
        answerLabel: "$540 million",
      },
    ],
  },
  {
    id: "1.9",
    theme: "comparable-companies",
    section: S.LTM,
    title: "Kestrel — adjusted LTM EBITDA",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_LTM}

Adjusted LTM EBIT is $540 million. Compute adjusted LTM EBITDA.`,
        unitHint: "Million dollars, no thousand separator (e.g. 400)",
        check: { mode: "exact", accept: [700] },
        method: "Adjusted LTM EBIT + LTM D&A = 540 + 160 = $700 million.",
        answerLabel: "$700 million",
      },
    ],
  },
  {
    id: "1.10",
    theme: "comparable-companies",
    section: S.LTM,
    title: "Kestrel — adjusted LTM net income",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_LTM}

Compute adjusted LTM net income. Tax-affect the add-backs/strips at 25%.`,
        unitHint: "Million dollars, no thousand separator (e.g. 150)",
        check: { mode: "exact", accept: [300] },
        method:
          "After-tax warehouse gain = 40 × (1 − 0.25) = 30 → FY NI 250 − 30 = 220.\nAfter-tax inventory = 30; after-tax restructuring = 15 → current stub NI 160 + 30 + 15 = 205.\nLTM = 220 + 205 − 125 = $300 million.\nTax-affect NI only — never EBIT/EBITDA.",
        answerLabel: "$300 million",
      },
    ],
  },
  {
    id: "1.11",
    theme: "comparable-companies",
    section: S.PROCESS,
    title: "Trading comps process order",
    variants: [
      {
        kind: "choice",
        prompt: `Which sequence completes a comparable companies analysis?

I. Compute key stats, ratios and trading multiples
II. Pick the peer set
III. Conclude on value
IV. Pull filings and market data
V. Benchmark the peers`,
        options: [
          "II, IV, I, V, III",
          "IV, II, I, III, V",
          "II, IV, I, III, V",
          "I, II, III, V, IV",
        ],
        correctIndex: 0,
        method:
          "Peer set first, then data, then spread the sheet, then benchmark, then value. Skipping the universe or valuing before the benchmark is the usual interview miss.",
      },
    ],
  },
  {
    id: "1.12",
    theme: "comparable-companies",
    section: S.EV,
    title: "Equity value and enterprise value",
    variants: [
      {
        kind: "choice",
        prompt: `Share price $18.00. Fully diluted shares 40.0 million. Total debt $180.0m. Preferred stock $20.0m. NCI $10.0m. Cash $40.0m.

Equity value and enterprise value, respectively?`,
        options: [
          "$720 million; $890 million",
          "$720 million; $970 million",
          "$720 million; $850 million",
          "$800 million; $890 million",
        ],
        correctIndex: 0,
        method:
          "Equity = 18 × 40 = $720m.\nEV = 720 + 180 + 20 + 10 − 40 = $890m.\nForgetting preferred or NCI, or adding cash, produces the distractors.",
      },
    ],
  },
  {
    id: "1.13",
    theme: "comparable-companies",
    section: S.CONVERT,
    title: "If-converted incremental shares",
    variants: [
      {
        kind: "choice",
        prompt: `Share price $40.00. Convertible notes $200.0 million outstanding. Conversion price $25.00.

Incremental shares under the if-converted method?`,
        options: ["2.0 million", "3.0 million", "5.0 million", "8.0 million"],
        correctIndex: 3,
        method:
          "If-converted assumes the whole issue converts: 200 / 25 = 8.0 million shares. No buyback, no net-down.",
      },
    ],
  },
  {
    id: "1.14",
    theme: "comparable-companies",
    section: S.CONVERT,
    title: "Net share settlement incremental shares",
    variants: [
      {
        kind: "choice",
        prompt: `Share price $40.00. Convertible notes $200.0 million outstanding. Conversion price $25.00.

Incremental shares under net share settlement?`,
        options: ["2.0 million", "3.0 million", "5.0 million", "8.0 million"],
        correctIndex: 1,
        method:
          "Underlying shares = 200 / 25 = 8.0m. Conversion value = 8.0 × $40 = $320m.\nExcess over par = 320 − 200 = $120m. NSS shares = 120 / 40 = 3.0 million.\nNSS only counts the in-the-money slice, so it is less dilutive than if-converted.",
      },
    ],
  },
  {
    id: "1.15",
    theme: "comparable-companies",
    section: S.VALO,
    title: "Implied value from LTM EBITDA",
    variants: [
      {
        kind: "open",
        prompt: `LTM EBITDA $480 million. Peer EV/EBITDA range 6.5x–7.5x. Net debt $900 million. Fully diluted shares 60.0 million.

Give implied EV, equity value and share-price ranges.`,
        method:
          "EV = 480 × 6.5x–7.5x = $3,120m–$3,600m.\nEquity = EV − net debt = $2,220m–$2,700m.\nPrice = equity / 60 = $37.00–$45.00.\nEBITDA is unlevered: start from EV, then subtract net debt.",
        answerLabel: "EV $3,120–$3,600m; equity $2,220–$2,700m; $37.00–$45.00",
      },
    ],
  },
  {
    id: "1.16",
    theme: "comparable-companies",
    section: S.VALO,
    title: "Implied value from LTM net income",
    variants: [
      {
        kind: "open",
        prompt: `LTM net income $180 million. Peer P/E range 12.0x–14.0x. Fully diluted shares 60.0 million.

Give implied equity value and share-price ranges.`,
        method:
          "P/E is an equity multiple: 180 × 12x–14x = $2,160m–$2,520m equity. No EV bridge.\nPrice = 2,160 / 60 to 2,520 / 60 = $36.00–$42.00.",
        answerLabel: "Equity $2,160–$2,520m; $36.00–$42.00",
      },
    ],
  },
  {
    id: "1.17",
    theme: "comparable-companies",
    section: S.STRUCTURE,
    title: "Equity issue used to repay debt",
    variants: [
      {
        kind: "choice",
        prompt:
          "A company issues new equity and uses every dollar of proceeds to repay debt. All else equal, what happens to enterprise value?",
        options: ["It is unchanged", "It rises", "It falls", "Cannot say without the WACC"],
        correctIndex: 0,
        method:
          "EV is capital-structure neutral. Equity value steps up by the cash raised; debt steps down by the same amount. The two legs cancel in the EV bridge.",
      },
    ],
  },
  {
    id: "1.18",
    theme: "comparable-companies",
    section: S.STRUCTURE,
    title: "Pro forma EV after a debt paydown",
    variants: [
      {
        kind: "open",
        prompt: `Actual: equity value $800m, total debt $500m, preferred $50m, NCI $25m, cash $75m.

The company issues $150m of equity and uses the proceeds to repay debt.

Show the pro forma EV bridge.`,
        method:
          "Actual EV = 800 + 500 + 50 + 25 − 75 = $1,300m.\nPro forma equity 950, debt 350; preferred, NCI and cash unchanged.\nPro forma EV = 950 + 350 + 50 + 25 − 75 = $1,300m. Zero-sum on EV.",
        answerLabel: "Pro forma EV still $1,300 million",
      },
    ],
  },
  {
    id: "1.19",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Similar businesses, different multiples",
    variants: [
      {
        kind: "open",
        prompt:
          "Two peers look alike operationally but trade at very different multiples. Which financial differences could explain the gap?",
        method:
          "The richer multiple often sits with higher margins, faster expected growth or lower leverage. The cheaper name may have missed numbers, a management change, a lost key customer, or a one-off that the market has not looked through.",
        answerLabel: "Growth, margins, leverage, or a company-specific scare",
      },
    ],
  },
  {
    id: "1.20",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Leverage and the trading multiple",
    variants: [
      {
        kind: "open",
        prompt:
          "All else equal, which name should trade at a higher multiple: a highly levered company or one with modest leverage? Why?",
        method:
          "Modest leverage. Distress risk is lower, and the firm still has capacity to fund organic growth and acquisitions. Heavy debt eats that optionality and raises the required return.",
        answerLabel: "The modestly levered company",
      },
    ],
  },
  {
    id: "1.21",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "SEC forms",
    variants: [
      {
        kind: "open",
        prompt: "What is each of these SEC forms: 10-K, 10-Q, 8-K, DEF 14A?",
        method:
          "10-K: annual report. 10-Q: quarterly report. 8-K: current report (material events). DEF 14A: proxy statement.",
        answerLabel: "Annual / quarterly / current / proxy",
      },
    ],
  },
  {
    id: "1.22",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Sector-specific multiples",
    variants: [
      {
        kind: "open",
        prompt:
          "Which sectors typically use EV/reserves, EV/EBITDAR, EV/subscriber and price/book?",
        method:
          "EV/reserves — metals & mining. EV/EBITDAR — retail (rent add-back). EV/subscriber — media/telecom. Price/book — banks and other financials.",
        answerLabel: "Mining / retail / media / financials",
      },
    ],
  },
  {
    id: "1.23",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Why use trading comps",
    variants: [
      {
        kind: "open",
        prompt: "Give four reasons interviewers like comparable companies analysis.",
        method:
          "It is market-based (embeds growth, risk and sentiment), relative (easy to line up vs peers), fast (few inputs), and current (prices move every session).",
        answerLabel: "Market-based, relative, quick, current",
      },
    ],
  },
  {
    id: "1.24",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Limits of trading comps",
    variants: [
      {
        kind: "open",
        prompt: "Give four limitations of comparable companies analysis.",
        method:
          "The market can be wrong (bubbles or panics). True peers may not exist. Price can drift far from DCF cash flows. Comps miss target-specific strengths, weaknesses and deal dynamics.",
        answerLabel: "Sentiment, no peers, vs cash flows, company-specific gaps",
      },
    ],
  },
  {
    id: "1.25",
    theme: "comparable-companies",
    section: S.CONVERT,
    title: "Fully diluted share count",
    variants: [
      {
        kind: "choice",
        prompt: "For trading comps, fully diluted shares outstanding equal:",
        options: [
          "OTM options + ITM convertibles",
          "Basic shares + ITM options/warrants + ITM convertibles",
          "ITM options/warrants + ITM convertibles only",
          "Basic shares + OTM options/warrants",
        ],
        correctIndex: 1,
        method:
          "Start from basic shares, then add only in-the-money options/warrants (TSM) and in-the-money convertibles. Out-of-the-money paper is ignored.",
      },
    ],
  },
  {
    id: "1.26",
    theme: "comparable-companies",
    section: S.CONVERT,
    title: "Options dilution method",
    variants: [
      {
        kind: "choice",
        prompt:
          "Which method turns in-the-money options and warrants into incremental shares for diluted shares?",
        options: [
          "Treasury stock method",
          "If-converted method",
          "Net share settlement",
          "In-the-money method",
        ],
        correctIndex: 0,
        method:
          "TSM: assume exercise, then use the proceeds to repurchase shares at the current price. If-converted and NSS are for convertibles, not vanilla options.",
      },
    ],
  },
  {
    id: "1.27",
    theme: "comparable-companies",
    section: S.EV,
    title: "Enterprise value formula",
    variants: [
      {
        kind: "choice",
        prompt: "Which formula is the standard EV bridge used in trading comps?",
        options: [
          "Equity value + total debt",
          "Equity value + total debt + preferred + NCI − cash",
          "Equity value + total debt − preferred − NCI − cash",
          "Equity value + total debt + preferred + NCI + cash",
        ],
        correctIndex: 1,
        method:
          "EV = equity value + total debt + preferred stock + noncontrolling interest − cash. Preferred and NCI are claims outside common equity; cash is surplus to the operating firm.",
      },
    ],
  },
  {
    id: "1.28",
    theme: "comparable-companies",
    section: S.EV,
    title: "Net debt when EV is below equity",
    variants: [
      {
        kind: "choice",
        prompt:
          "Enterprise value is $800 million and equity value is $950 million. What is net debt?",
        options: ["$150 million", "($150) million", "$200 million", "($200) million"],
        correctIndex: 1,
        method:
          "Net debt = EV − equity value = 800 − 950 = −$150 million.\nNegative net debt means net cash: EV can sit below equity value.",
      },
    ],
  },
  {
    id: "1.29",
    theme: "comparable-companies",
    section: S.RATIOS,
    title: "ROIC",
    variants: [
      {
        kind: "choice",
        prompt: `EBIT $180.0m. Net debt $320.0m. Shareholders' equity $580.0m. Accounts payable $40.0m. Accounts receivable $55.0m.

ROIC?`,
        options: ["18.0%", "20.0%", "22.5%", "25.0%"],
        correctIndex: 1,
        method:
          "ROIC = EBIT / (net debt + equity) = 180 / (320 + 580) = 180 / 900 = 20.0%.\nAP/AR are working-capital lines, not invested capital here. ROIC is pre-interest; ROE is not.",
      },
    ],
  },
  {
    id: "1.30",
    theme: "comparable-companies",
    section: S.RATIOS,
    title: "Two-period CAGRs",
    variants: [
      {
        kind: "choice",
        prompt: `Diluted EPS: 2016A $1.00, 2018A $1.21, 2020E $1.411.

CAGRs for 2016–2018 and 2018–2020?`,
        options: [
          "10.0% and 8.0%",
          "21.0% and 16.6%",
          "(10.0%) and (8.0%)",
          "10.5% and 8.5%",
        ],
        correctIndex: 0,
        method:
          "CAGR = (end / start)^(1 / years) − 1. Two-year windows.\n2016–2018: (1.21 / 1.00)^(1/2) − 1 = 10.0%.\n2018–2020: (1.411 / 1.21)^(1/2) − 1 = 8.0%.\nDo not divide the total change by two — that is not a CAGR.",
      },
    ],
  },
  {
    id: "1.31",
    theme: "comparable-companies",
    section: S.RATIOS,
    title: "LTM sales from stubs",
    variants: [
      {
        kind: "choice",
        prompt: `FY 2023 sales $1,800.0m. YTD 9/30/2024 sales $1,200.0m. YTD 9/30/2023 sales $1,050.0m.

LTM 9/30/2024 sales?`,
        options: [
          "$1,650.0 million",
          "$1,950.0 million",
          "$2,050.0 million",
          "$3,000.0 million",
        ],
        correctIndex: 1,
        method:
          "LTM = last full year + current stub − prior stub = 1,800 + 1,200 − 1,050 = $1,950 million.",
      },
    ],
  },
  {
    id: "1.32",
    theme: "comparable-companies",
    section: S.MULTIPLES,
    title: "What P/E equals",
    variants: [
      {
        kind: "choice",
        prompt: "The P/E ratio is equivalent to:",
        options: [
          "Equity value / net income",
          "Enterprise value / net income",
          "Enterprise value / EBITDA",
          "Share price / free cash flow",
        ],
        correctIndex: 0,
        method:
          "Net income is post-interest, so it pairs with equity value (or price / EPS). Pairing EV with net income mismatches levered and unlevered.",
      },
    ],
  },
  {
    id: "1.33",
    theme: "comparable-companies",
    section: S.MULTIPLES,
    title: "Workhorse trading multiples",
    variants: [
      {
        kind: "choice",
        prompt: `The two most generic valuation multiples in trading comps are:

I. EV / EBITDA
II. EBITDA / interest
III. Total debt / EBITDA
IV. P/E`,
        options: ["I and III", "I and IV", "II and III", "II and IV"],
        correctIndex: 1,
        method:
          "EV/EBITDA (unlevered) and P/E (levered) are the default pair. Interest coverage and leverage ratios are credit stats, not valuation multiples.",
      },
    ],
  },
];
