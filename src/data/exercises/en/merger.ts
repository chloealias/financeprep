import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme6: Exercise[] = [
  {
    id: "6.1",
    theme: "merger",
    title: "Leverage of the combined group",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A: EBITDA €300m, debt €600m (x2). It acquires B: EBITDA €100m, debt €200m, price = €800m, funded entirely with new debt. Combined leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [4], unit: "multiple" },
        method:
          "Combined debt = 600 + 200 + 800 = 1,600. EBITDA = 300 + 100 = 400. Leverage = 1,600 / 400 = x4.",
        answerLabel: "x4",
      },
    ],
  },
  {
    id: "6.2",
    theme: "merger",
    title: "Leverage including synergies",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Same deal (debt €1,600m, EBITDA €400m), plus €100m of annual cost synergies. New leverage?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [3.2], unit: "multiple" },
        method: "EBITDA = 400 + 100 = 500. Leverage = 1,600 / 500 = x3.2.",
        answerLabel: "x3.2",
      },
    ],
  },
  {
    id: "6.3",
    theme: "merger",
    title: "Goodwill created",
    variants: [
      {
        kind: "numeric",
        prompt: "Price paid for a target = €600m. Identifiable net assets = €250m. Goodwill?",
        unitHint: "€m",
        check: { mode: "exact", accept: [350], unit: "number" },
        method: "600 − 250 = €350m.",
        answerLabel: "€350m",
      },
    ],
  },
  {
    id: "6.4",
    theme: "merger",
    title: "Goodwill under IFRS",
    variants: [
      {
        kind: "open",
        prompt:
          "Why is goodwill not amortized under IFRS but tested for impairment every year instead?",
        method:
          "Its useful life cannot be determined reliably, so rather than run a fixed amortization schedule you test each year whether the carrying value is still supported.",
        answerLabel: "Indefinite useful life → annual impairment test",
      },
    ],
  },
  {
    id: "6.5",
    theme: "merger",
    title: "Revenue versus cost synergies",
    variants: [
      {
        kind: "open",
        prompt:
          "Why are revenue synergies (cross-selling) valued at a steeper discount than cost synergies?",
        method:
          "They depend on uncertain external factors — customer decisions, competitive response — whereas cost synergies are largely within the acquirer's own control.",
        answerLabel: "External uncertainty vs control over costs",
      },
    ],
  },
  {
    id: "6.6",
    theme: "merger",
    title: "Higher leverage and credit",
    variants: [
      {
        kind: "open",
        prompt: "An acquisition takes leverage from x3 to x5. Typical consequence on credit?",
        method:
          "Risk of a ratings downgrade, and a higher cost on both the existing and the future debt.",
        answerLabel: "Ratings downgrade risk / cost of debt ↑",
      },
    ],
  },
  {
    id: "6.7",
    theme: "merger",
    title: "Overlapping roles",
    variants: [
      {
        kind: "open",
        prompt: "A merger creates overlapping roles. Typical short-term versus medium-term impact?",
        method:
          "One-off restructuring charges in years 1-2, progressively offset by recurring savings thereafter.",
        answerLabel: "One-off costs first, then recurring savings",
      },
    ],
  },
  {
    id: "6.8",
    theme: "merger",
    title: "The debt tax shield",
    variants: [
      {
        kind: "open",
        prompt: "Why does a debt-funded acquisition benefit from a tax shield?",
        method:
          "Interest on the debt is tax deductible, which reduces the tax charge and lifts after-tax cash flow.",
        answerLabel: "Deductible interest → lower tax",
      },
    ],
  },
  {
    id: "6.9",
    theme: "merger",
    title: "Interest coverage ratio",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Combined group: debt €1,600m, EBITDA €400m, average interest rate 5%. Interest coverage ratio?",
        unitHint: "Format: xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method: "Interest expense = 1,600 × 5% = 80. Coverage = 400 / 80 = x5.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "6.10",
    theme: "merger",
    title: "Covenant breach",
    variants: [
      {
        kind: "open",
        prompt:
          "A covenant caps leverage at x4. Post-deal leverage comes out at x4.5 — a breach. What are the acquirer's typical options?",
        method:
          "Renegotiate the covenants, reduce debt by putting in more equity, divest a non-core asset, or revisit the price and structure of the deal.",
        answerLabel: "Renegotiate / more equity / divest / restructure the deal",
      },
    ],
  },
];
