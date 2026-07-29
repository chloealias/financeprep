import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme7: Exercise[] = [
  {
    id: "7.1",
    theme: "working-capital",
    title: "Change in working capital",
    variants: [
      {
        kind: "choice",
        prompt: "NWC moves from €40m to €50m over the year. Impact on FCF?",
        options: ["A €10m cash outflow (FCF ↓)", "A €10m cash inflow (FCF ↑)", "No impact"],
        correctIndex: 0,
        method: "An increase in working capital consumes cash → a negative €10m impact on FCF.",
      },
    ],
  },
  {
    id: "7.2",
    theme: "working-capital",
    title: "DSO impact",
    variants: [
      {
        kind: "numeric",
        prompt:
          "DSO goes from 60 to 90 days on revenue of €360m (360-day convention). Cash impact (outflow)?",
        unitHint: "€m",
        check: { mode: "exact", accept: [30], unit: "number" },
        method: "Delta = 30 days → 30/360 × 360 = €30m of cash consumed.",
        answerLabel: "€30m (outflow)",
      },
    ],
  },
  {
    id: "7.3",
    theme: "working-capital",
    title: "DPO impact",
    variants: [
      {
        kind: "numeric",
        prompt:
          "DPO goes from 30 to 60 days on purchases of €240m (360-day convention). Cash generated?",
        unitHint: "€m",
        check: { mode: "exact", accept: [20], unit: "number" },
        method: "Delta = 30 days → 30/360 × 240 = €20m of cash generated.",
        answerLabel: "€20m (inflow)",
      },
    ],
  },
  {
    id: "7.4",
    theme: "working-capital",
    title: "Negative cash conversion cycle",
    variants: [
      {
        kind: "open",
        prompt: "Why is a negative cash conversion cycle so sought after (retail, for example)?",
        method:
          "The business collects from its customers before it pays its suppliers, so the cycle itself throws off cash to fund growth with no additional debt or equity.",
        answerLabel: "Collect before paying suppliers → self-funded growth",
      },
    ],
  },
  {
    id: "7.5",
    theme: "working-capital",
    title: "Growth and working capital",
    variants: [
      {
        kind: "open",
        prompt:
          "A fast-growing company sees NWC rise in absolute terms even with stable DSO/DIO/DPO ratios. Why?",
        method:
          "Working capital scales with the level of activity — more sales mechanically means more receivables and more inventory in absolute terms.",
        answerLabel: "Working capital scales with activity",
      },
    ],
  },
  {
    id: "7.6",
    theme: "working-capital",
    title: "Unlevered FCF",
    variants: [
      {
        kind: "numeric",
        prompt: "EBITDA €100m, capex €20m, NWC movement €20m (outflow), tax €20m. FCF?",
        unitHint: "€m",
        check: { mode: "exact", accept: [40], unit: "number" },
        method: "100 − 20 − 20 − 20 = €40m.",
        answerLabel: "€40m",
      },
    ],
  },
  {
    id: "7.7",
    theme: "working-capital",
    title: "DIO impact",
    variants: [
      {
        kind: "numeric",
        prompt:
          "DIO goes from 90 to 60 days on cost of sales of €360m (360-day convention). Cash released?",
        unitHint: "€m",
        check: { mode: "exact", accept: [30], unit: "number" },
        method: "Delta = 30 days → 30/360 × 360 = €30m of cash released.",
        answerLabel: "€30m (released)",
      },
    ],
  },
  {
    id: "7.8",
    theme: "working-capital",
    title: "Working capital in an LBO",
    variants: [
      {
        kind: "open",
        prompt:
          "Why do LBO buyers pay such close attention to the stability of a target's working capital?",
        method:
          "Stable or negative working capital limits the need for additional funding and improves the cash available to service and repay the debt.",
        answerLabel: "Less cash tied up / more capacity to repay debt",
      },
    ],
  },
  {
    id: "7.9",
    theme: "working-capital",
    title: "Seasonal working capital",
    variants: [
      {
        kind: "open",
        prompt:
          "A seasonal business has working capital that swings widely through the year. Which financing tool typically smooths that need?",
        method:
          "A revolving credit facility (RCF), drawn and repaid as the seasonal need comes and goes.",
        answerLabel: "RCF (revolving credit facility)",
      },
    ],
  },
  {
    id: "7.10",
    theme: "working-capital",
    title: "Normalized working capital",
    variants: [
      {
        kind: "open",
        prompt:
          "Normalized working capital is often heavily negotiated in an SPA. Why is it so sensitive between buyer and seller?",
        method:
          "It sets the target level of working capital to be delivered at closing; any shortfall or excess feeds straight into a price adjustment.",
        answerLabel: "Closing price adjustment against the target working capital level",
      },
    ],
  },
];

export const EXERCISE_CHEATSHEET = [
  "Leverage: debt after / EBITDA after — cash used to pay counts as debt, whether it comes off the balance sheet or from a new loan.",
  "Accretion/dilution: in a stock deal, compare the P/Es; in a cash or debt deal, compare the earnings yield (1/multiple) with the after-tax cost of funding.",
  "MOIC → IRR (rule of thumb, five-year hold): 2x ≈ 15% · 2.5x ≈ 20% · 3x ≈ 25%.",
  "Terminal value: use the forward FCF directly to avoid an unnecessary extra multiplication by (1+g).",
  "Working capital: always think in days × (revenue or purchases)/360, never /365 — it keeps the numbers round when you are speaking out loud.",
];
