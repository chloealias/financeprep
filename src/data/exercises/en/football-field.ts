import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme5: Exercise[] = [
  {
    id: "5.1",
    theme: "football-field",
    title: "The three core valuation methods",
    variants: [
      {
        kind: "open",
        prompt: "Name the three most common valuation methods.",
        method: "Trading comparables, precedent transactions, DCF.",
        answerLabel: "Trading comparables, precedent transactions, DCF",
      },
    ],
  },
  {
    id: "5.2",
    theme: "football-field",
    title: "Why precedent transactions sit higher",
    variants: [
      {
        kind: "open",
        prompt:
          "Precedent transactions usually produce a higher range than trading comparables. Why?",
        method:
          "They embed a control premium, which is absent from share prices — those reflect minority stakes.",
        answerLabel: "Control premium, absent from share prices",
      },
    ],
  },
  {
    id: "5.3",
    theme: "football-field",
    title: "DCF far above the comps",
    variants: [
      {
        kind: "open",
        prompt:
          "The DCF produces a valuation well above the comparables. What is the usual explanation?",
        method: "Growth or margin assumptions that are too optimistic, or an understated WACC.",
        answerLabel: "Assumptions too optimistic, or WACC too low",
      },
    ],
  },
  {
    id: "5.4",
    theme: "football-field",
    title: "Stale transactions",
    variants: [
      {
        kind: "open",
        prompt:
          "Why do you screen out transactions older than three to five years in a precedent transactions analysis?",
        method:
          "Market conditions — rates, acquirer appetite, sector multiples — move on, which makes older deals a poor read on value today.",
        answerLabel: "Market conditions no longer comparable",
      },
    ],
  },
  {
    id: "5.5",
    theme: "football-field",
    title: "A comparable with a very different margin",
    variants: [
      {
        kind: "choice",
        prompt:
          "A comparable trades on a similar multiple but has a very different EBITDA margin. Should you drop it?",
        options: [
          "Not necessarily — adjust it, weight it less, or move to EV/Sales",
          "Always drop it",
          "Always keep it with no adjustment",
        ],
        correctIndex: 0,
        method:
          "Not necessarily — adjust it or give it less weight, and consider EV/Sales if the cost structures are simply too far apart.",
      },
    ],
  },
  {
    id: "5.6",
    theme: "football-field",
    title: "EV → Equity Value",
    variants: [
      {
        kind: "open",
        prompt: "How do you bridge from enterprise value to equity value?",
        method:
          "Equity value = EV − net debt − minority interests (+ the share of equity-accounted investments where relevant).",
        answerLabel: "EV − net debt − minorities (± other bridge items)",
      },
    ],
  },
  {
    id: "5.7",
    theme: "football-field",
    title: "In-the-money options",
    variants: [
      {
        kind: "open",
        prompt:
          "A target has a significant number of in-the-money stock options. What adjustment do you make to the share count?",
        method:
          "The Treasury Stock Method (TSM), which dilutes the share count for exercisable options, net of the proceeds received on exercise.",
        answerLabel: "Treasury Stock Method (TSM)",
      },
    ],
  },
  {
    id: "5.8",
    theme: "football-field",
    title: "Why show several methods",
    variants: [
      {
        kind: "open",
        prompt: "Why present several methods rather than a single number?",
        method:
          "To frame a defensible range that reflects the genuine uncertainty and gives you room to negotiate.",
        answerLabel: "A range that frames uncertainty and supports negotiation",
      },
    ],
  },
  {
    id: "5.9",
    theme: "football-field",
    title: "A loss-making company",
    variants: [
      {
        kind: "open",
        prompt: "Which multiple do you use for a loss-making company (negative EBITDA)?",
        method: "EV/Sales, or sector-specific multiples — per user or per subscriber in tech, say.",
        answerLabel: "EV/Sales (or sector-specific multiples)",
      },
    ],
  },
  {
    id: "5.10",
    theme: "football-field",
    title: "Why the implied LBO sets the floor",
    variants: [
      {
        kind: "open",
        prompt: "An implied LBO valuation often sets the low end of a football field. Why?",
        method:
          "It reflects the most a financial sponsor can pay while still hitting its target IRR, which is usually below what a strategic buyer can justify once synergies are factored in.",
        answerLabel: "Sponsor's max price at target IRR < strategic buyer with synergies",
      },
    ],
  },
];
