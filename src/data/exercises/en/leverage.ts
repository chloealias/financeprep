import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme1: Exercise[] = [
  {
    id: "1.1",
    theme: "leverage",
    title: "Simple disposal, debt-free target",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA of €100m, leverage of x6 (debt = €600m). It sells B: EBITDA €20m at a x10 multiple (price = €200m in cash, no debt). New leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method:
          "Debt before = 600. Debt after = 600 − 200 = 400; EBITDA after = 100 − 20 = 80. Leverage = 400 / 80 = x5.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "1.2",
    theme: "leverage",
    title: "Disposal of a target carrying its own debt",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA €200m, leverage x5 (debt = €1,000m). It sells C: EBITDA €40m at a x10 multiple (price = €400m), and C carries €200m of its own debt. New leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [2.5], unit: "multiple" },
        method:
          "Debt after = 1,000 − 400 (cash proceeds) − 200 (C's debt leaves the perimeter) = 400. EBITDA after = 200 − 40 = 160. Leverage = 400 / 160 = x2.5.",
        answerLabel: "x2.5",
      },
    ],
  },
  {
    id: "1.3",
    theme: "leverage",
    title: "Acquisition funded entirely with new debt",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA €100m, debt €500m (x5). It acquires D: EBITDA €20m at a x5 multiple (price = €100m), funded entirely with new debt. New leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method:
          "Debt after = 500 + 100 = 600. EBITDA after = 100 + 20 = 120. Leverage = 600 / 120 = x5.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "1.4",
    theme: "leverage",
    title: "Acquisition funded entirely with balance sheet cash",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA €100m, debt €400m (x4). It acquires E: EBITDA €25m at a x4 multiple (price = €100m), paid entirely out of cash on the balance sheet. New leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [4], unit: "multiple" },
        method:
          "Cash leaving the balance sheet increases net debt by exactly the same amount as new borrowing would. Debt after = 400 + 100 = 500; EBITDA after = 100 + 25 = 125. Leverage = 500 / 125 = x4.",
        answerLabel: "x4",
      },
    ],
  },
  {
    id: "1.5",
    theme: "leverage",
    title: "Acquisition funded half debt, half equity",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA €100m, debt €400m (x4). It acquires F: EBITDA €20m at a x8 multiple (price = €160m), funded 50% new debt / 50% share issuance. New leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [4], unit: "multiple" },
        method:
          "Only the debt half hits net debt: +80. Debt after = 400 + 80 = 480; EBITDA after = 100 + 20 = 120. Leverage = 480 / 120 = x4 — the equity portion absorbs the rest.",
        answerLabel: "x4",
      },
    ],
  },
  {
    id: "1.6",
    theme: "leverage",
    title: "Dividend recap",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA €100m, debt €400m (x4). It pays a €100m dividend funded with new debt. New leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method: "EBITDA is unchanged. Debt after = 400 + 100 = 500. Leverage = 500 / 100 = x5.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "1.7",
    theme: "leverage",
    title: "Disposal with an earn-out",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA €100m, debt €500m (x5). It sells G: EBITDA €20m at a x10 multiple (price = €200m), paid half in cash upfront (€100m) and half as an earn-out in two years (not yet received). Leverage today?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method:
          "Only cash actually received today counts: 100. Debt after = 500 − 100 = 400; EBITDA after = 100 − 20 = 80. Leverage = 400 / 80 = x5 — unchanged for now.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "1.8",
    theme: "leverage",
    title: "Pure organic growth",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA €100m, debt €500m (x5). EBITDA grows 25% with no movement in debt. New leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [4], unit: "multiple" },
        method:
          "EBITDA after = 100 × 1.25 = 125; debt unchanged at 500. Leverage = 500 / 125 = x4.",
        answerLabel: "x4",
      },
    ],
  },
  {
    id: "1.9",
    theme: "leverage",
    title: "Disposal followed by a share buyback",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA €100m, debt €400m (x4). It sells H: EBITDA €20m at a x10 multiple (price = €200m in cash), used in full to fund a share buyback. New leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method:
          "The cash comes in and goes straight back out: net effect on debt = 0. Debt after = 400; EBITDA after = 100 − 20 = 80. Leverage = 400 / 80 = x5.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "1.10",
    theme: "leverage",
    title: "Simultaneous disposal and acquisition",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA €100m, debt €500m (x5). It sells I: EBITDA €20m at a x10 multiple (price = €200m in cash). It acquires J: EBITDA €10m at a x6 multiple (price = €60m, debt funded). New leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [4], unit: "multiple" },
        method:
          "Debt after = 500 − 200 + 60 = 360. EBITDA after = 100 − 20 + 10 = 90. Leverage = 360 / 90 = x4.",
        answerLabel: "x4",
      },
    ],
  },
];
