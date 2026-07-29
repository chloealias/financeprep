import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme4: Exercise[] = [
  {
    id: "4.1",
    theme: "dcf",
    title: "Terminal value (Gordon Growth)",
    variants: [
      {
        kind: "numeric",
        prompt: "Forward FCF = €100m, g = 2%, WACC = 10%. Terminal value?",
        unitHint: "€m",
        check: { mode: "exact", accept: [1250], unit: "number" },
        method: "Denominator = 10% − 2% = 8%. TV = 100 / 0.08 = €1,250m.",
        answerLabel: "€1,250m",
      },
    ],
  },
  {
    id: "4.2",
    theme: "dcf",
    title: "WACC sensitivity",
    variants: [
      {
        kind: "numeric",
        prompt: "FCF €100m, g = 2%, WACC = 12%. New TV?",
        unitHint: "€m",
        check: { mode: "exact", accept: [1000], unit: "number" },
        method: "Denominator = 10%. TV = 100 / 0.10 = €1,000m (WACC +2pts → TV −20%).",
        answerLabel: "€1,000m",
      },
    ],
  },
  {
    id: "4.3",
    theme: "dcf",
    title: "Discounting the terminal value",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Forward FCF in year 5 = €50m, g = 2%, WACC = 10%. The five-year discount factor is ≈ 0.62. PV today?",
        unitHint: "€m",
        check: { mode: "tolerance", value: 387.5, pct: 3 },
        method: "TV at year 5 = 50 / 0.08 = 625. PV = 625 × 0.62 ≈ €387.5m (≈ €390m).",
        answerLabel: "≈ €390m",
      },
    ],
  },
  {
    id: "4.4",
    theme: "dcf",
    title: "Why terminal value dominates",
    variants: [
      {
        kind: "open",
        prompt: "Why does terminal value often account for 70-80% of total DCF value?",
        method:
          "It captures every cash flow beyond the explicit forecast horizon (typically five years) — an infinite stream discounted back — against only a handful of explicitly forecast years.",
        answerLabel: "It captures all cash flows beyond the explicit forecast horizon",
      },
    ],
  },
  {
    id: "4.5",
    theme: "dcf",
    title: "Computing the WACC",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Cost of equity 12%, after-tax cost of debt 4%, capital structure 75% equity / 25% debt. WACC?",
        unitHint: "%",
        check: { mode: "exact", accept: [10], unit: "percent" },
        method: "0.75 × 12% + 0.25 × 4% = 9% + 1% = 10%.",
        answerLabel: "10%",
      },
    ],
  },
  {
    id: "4.6",
    theme: "dcf",
    title: "A rise in the risk-free rate",
    variants: [
      {
        kind: "choice",
        prompt:
          "The risk-free rate rises by one point while the market risk premium stays flat. Effect on the cost of equity (CAPM) and on the WACC?",
        options: [
          "Ke ↑, WACC ↑, DCF value ↓",
          "Ke ↓, WACC ↓, DCF value ↑",
          "No effect on the WACC",
        ],
        correctIndex: 0,
        method:
          "Ke = Rf + β(Rm − Rf), so a higher Rf lifts the cost of equity. The WACC therefore rises and the DCF value falls.",
      },
    ],
  },
  {
    id: "4.7",
    theme: "dcf",
    title: "CAPM",
    variants: [
      {
        kind: "numeric",
        prompt: "Beta = 1.5, Rf = 3%, market risk premium = 6%. Cost of equity?",
        unitHint: "%",
        check: { mode: "exact", accept: [12], unit: "percent" },
        method: "3% + 1.5 × 6% = 3% + 9% = 12%.",
        answerLabel: "12%",
      },
    ],
  },
  {
    id: "4.8",
    theme: "dcf",
    title: "Alternative terminal value method",
    variants: [
      {
        kind: "open",
        prompt: "Which method can you use instead of Gordon Growth for terminal value?",
        method:
          "The exit multiple method — apply an EV/EBITDA multiple to the EBITDA of the final explicit forecast year.",
        answerLabel: "Exit multiple method",
      },
    ],
  },
  {
    id: "4.9",
    theme: "dcf",
    title: "From EV to equity value",
    variants: [
      {
        kind: "numeric",
        prompt:
          "The DCF gives EV = €1,000m. Net debt = €200m, minority interests = €50m. Equity value?",
        unitHint: "€m",
        check: { mode: "exact", accept: [750], unit: "number" },
        method: "1,000 − 200 − 50 = €750m.",
        answerLabel: "€750m",
      },
    ],
  },
  {
    id: "4.10",
    theme: "dcf",
    title: "Unlevered FCF and interest expense",
    variants: [
      {
        kind: "open",
        prompt: "Why do you exclude interest expense from unlevered FCF?",
        method:
          "Unlevered FCF measures the cash available to all capital providers (debt and equity) before debt service, which is what makes it consistent with discounting at the WACC.",
        answerLabel: "Consistent with the WACC: cash to debt and equity before debt service",
      },
    ],
  },
];
