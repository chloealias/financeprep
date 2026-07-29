import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme2: Exercise[] = [
  {
    id: "2.1",
    theme: "accretion",
    title: "All-stock deal",
    variants: [
      {
        kind: "choice",
        prompt:
          "A trades on a 20x P/E. It buys B, on a 10x P/E, 100% in shares at market price. Effect on pro forma EPS?",
        options: ["Accretive", "Dilutive", "Neutral"],
        correctIndex: 0,
        method:
          "In an all-stock deal it is accretive when the acquirer's P/E is above the target's. 20x > 10x → accretive.",
      },
    ],
  },
  {
    id: "2.2",
    theme: "accretion",
    title: "All-stock deal, the other way round",
    variants: [
      {
        kind: "choice",
        prompt: "A trades on a 10x P/E. It buys C, on a 20x P/E, 100% in shares. Effect?",
        options: ["Accretive", "Dilutive", "Neutral"],
        correctIndex: 1,
        method: "10x < 20x → dilutive.",
      },
    ],
  },
  {
    id: "2.3",
    theme: "accretion",
    title: "All-cash deal funded with debt",
    variants: [
      {
        kind: "choice",
        prompt:
          "A trades on a 20x P/E. It buys D, on a 10x P/E, all cash funded with debt at 5%, tax rate 25%. Effect?",
        options: ["Accretive", "Dilutive", "Neutral"],
        correctIndex: 0,
        method:
          "D's earnings yield = 1/10 = 10%. After-tax cost of debt = 5% × (1 − 25%) = 3.75%. 10% > 3.75% → accretive.",
      },
    ],
  },
  {
    id: "2.4",
    theme: "accretion",
    title: "All-cash deal funded from balance sheet cash",
    variants: [
      {
        kind: "choice",
        prompt:
          "A trades on a 20x P/E. It buys E, on a 10x P/E, all cash drawn from balance sheet cash that was earning 2% pre-tax (tax rate 25%). Effect?",
        options: ["Accretive", "Dilutive", "Neutral"],
        correctIndex: 0,
        method:
          "E's earnings yield = 10%. After-tax opportunity cost of the cash = 2% × 75% = 1.5%. 10% > 1.5% → accretive.",
      },
    ],
  },
  {
    id: "2.5",
    theme: "accretion",
    title: "Paying a large control premium",
    variants: [
      {
        kind: "choice",
        prompt:
          "A acquires F paying a substantial control premium above the market price, funded in shares. How does that shift the accretion/dilution conclusion versus paying the undisturbed market price?",
        options: ["Pushes towards dilution", "Pushes towards accretion", "No effect"],
        correctIndex: 0,
        method:
          "A premium raises the price, and therefore the number of shares issued, without adding any acquired earnings → it pushes towards dilution unless synergies close the gap.",
      },
    ],
  },
  {
    id: "2.6",
    theme: "accretion",
    title: "Identical multiples",
    variants: [
      {
        kind: "choice",
        prompt:
          "A trades on a 15x P/E. It buys G, also on a 15x P/E, 100% in shares, with no synergies. Effect?",
        options: ["Accretive", "Dilutive", "Neutral"],
        correctIndex: 2,
        method:
          "Identical P/Es → neutral (marginally dilutive once you add a premium or transaction fees).",
      },
    ],
  },
  {
    id: "2.7",
    theme: "accretion",
    title: "Mixed consideration",
    variants: [
      {
        kind: "choice",
        prompt:
          "A trades on a 20x P/E. It buys H, on a 10x P/E, funded 50% in shares / 50% in debt (after-tax cost 6%). Effect?",
        options: ["Accretive", "Dilutive", "Neutral"],
        correctIndex: 0,
        method:
          "Share-funded portion: 20x > 10x → accretive. Debt-funded portion: 10% earnings yield > 6% cost → accretive. Both tests point the same way → accretive.",
      },
    ],
  },
  {
    id: "2.8",
    theme: "accretion",
    title: "Breakeven period",
    variants: [
      {
        kind: "open",
        prompt:
          "An acquisition is dilutive in year 1 and turns accretive in year 3 as synergies come through. What do you call the number of years needed to get back to neutral?",
        method: "That is the breakeven period — the time taken for EPS to return to neutral.",
        answerLabel: "Breakeven period",
      },
    ],
  },
  {
    id: "2.9",
    theme: "accretion",
    title: "Issuing shares at a price you believe is undervalued",
    variants: [
      {
        kind: "choice",
        prompt:
          "A issues shares at a price it believes undervalues the company in order to fund an acquisition. What is the additional EPS risk versus the theoretical calculation?",
        options: ["More dilution than expected", "Less dilution than expected", "No impact"],
        correctIndex: 0,
        method:
          "Issuing shares cheaply means issuing more of them to raise the same amount → more dilution than the theoretical calculation suggests.",
      },
    ],
  },
  {
    id: "2.10",
    theme: "accretion",
    title: "Impact of synergies",
    variants: [
      {
        kind: "choice",
        prompt:
          "A trades on a 25x P/E. It buys I, on a 15x P/E, 100% in shares, with cost synergies added to combined earnings. Final effect?",
        options: [
          "Accretive, reinforced by the synergies",
          "Dilutive despite the synergies",
          "Neutral",
        ],
        correctIndex: 0,
        method:
          "25x > 15x is already accretive on its own; the synergies add further to combined earnings with no extra shares issued → accretive, and more strongly so.",
      },
    ],
  },
];
