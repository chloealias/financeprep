import type { Exercise } from "@/data/exercise-types";

/** Paper LBO — running case: EBITDA €100m, entry at x8 → EV = €800m */
export const exercisesTheme3: Exercise[] = [
  {
    id: "3.1",
    theme: "paper-lbo",
    title: "Structure at closing",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Deal: EBITDA €100m, entry multiple x8 → EV = €800m. Debt = 75% of EV, equity = 25%. Equity cheque?",
        unitHint: "€m",
        check: { mode: "exact", accept: [200], unit: "number" },
        method: "Debt = 800 × 75% = 600. Equity = 800 − 600 = €200m.",
        answerLabel: "€200m",
      },
    ],
  },
  {
    id: "3.2",
    theme: "paper-lbo",
    title: "Deleveraging over five years",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Opening debt €600m. Constant FCF of €40m a year, all of it used to repay debt, for five years. Debt outstanding at year 5?",
        unitHint: "€m",
        check: { mode: "exact", accept: [400], unit: "number" },
        method: "Cumulative repayment = 40 × 5 = 200. Debt outstanding = 600 − 200 = €400m.",
        answerLabel: "€400m",
      },
    ],
  },
  {
    id: "3.3",
    theme: "paper-lbo",
    title: "Exit equity (flat case)",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Exit EBITDA = €100m (flat), exit multiple = x8, debt outstanding = €400m. Exit equity?",
        unitHint: "€m",
        check: { mode: "exact", accept: [400], unit: "number" },
        method: "Exit EV = 100 × 8 = 800. Exit equity = 800 − 400 = €400m.",
        answerLabel: "€400m",
      },
    ],
  },
  {
    id: "3.4",
    theme: "paper-lbo",
    title: "MOIC",
    variants: [
      {
        kind: "numeric",
        prompt: "Equity invested = €200m, exit equity = €400m. MOIC?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [2], unit: "multiple" },
        method: "MOIC = 400 / 200 = 2.0x.",
        answerLabel: "2.0x",
      },
    ],
  },
  {
    id: "3.5",
    theme: "paper-lbo",
    title: "Approximate IRR",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A 2.0x MOIC over five years. Approximate IRR? (rule of thumb: 2x ≈ 15%, 2.5x ≈ 20%, 3x ≈ 25%)",
        unitHint: "%",
        check: { mode: "exact", accept: [15], unit: "percent" },
        method: "Rule of thumb: 2x over five years ≈ 15%.",
        answerLabel: "≈ 15%",
      },
    ],
  },
  {
    id: "3.6",
    theme: "paper-lbo",
    title: "Multiple expansion",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Same deal, exit multiple = x10 (EBITDA €100m, debt outstanding €400m, equity invested €200m). New MOIC?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [3], unit: "multiple" },
        method:
          "Exit EV = 100 × 10 = 1,000. Exit equity = 1,000 − 400 = 600. MOIC = 600 / 200 = 3.0x.",
        answerLabel: "3.0x",
      },
    ],
  },
  {
    id: "3.7",
    theme: "paper-lbo",
    title: "The three value creation levers",
    variants: [
      {
        kind: "open",
        prompt: "Name the three value creation levers in an LBO.",
        method: "EBITDA growth, deleveraging, multiple expansion.",
        answerLabel: "EBITDA growth, deleveraging, multiple expansion",
      },
    ],
  },
  {
    id: "3.8",
    theme: "paper-lbo",
    title: "Target MOIC and IRR",
    variants: [
      {
        kind: "numeric",
        prompt: "A fund is targeting a 2.5x MOIC over five years. Approximate target IRR?",
        unitHint: "%",
        check: { mode: "exact", accept: [20], unit: "percent" },
        method: "Rule of thumb: 2.5x over five years ≈ 20%.",
        answerLabel: "≈ 20%",
      },
    ],
  },
  {
    id: "3.9",
    theme: "paper-lbo",
    title: "Maximum leverage constraint",
    variants: [
      {
        kind: "numeric",
        prompt: "EV = €800m. The fund will not go above 65% debt. Maximum debt?",
        unitHint: "€m",
        check: { mode: "exact", accept: [520], unit: "number" },
        method: "800 × 65% = €520m (minimum equity = €280m).",
        answerLabel: "€520m",
      },
    ],
  },
  {
    id: "3.10",
    theme: "paper-lbo",
    title: "No deleveraging",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Debt flat at €600m, EBITDA flat at €100m, exit multiple = entry at x8, equity invested €200m. MOIC?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [1], unit: "multiple" },
        method:
          "Exit EV = 800. Exit equity = 800 − 600 = 200, exactly the equity invested. MOIC = 1.0x — no value created.",
        answerLabel: "1.0x",
      },
    ],
  },
];
