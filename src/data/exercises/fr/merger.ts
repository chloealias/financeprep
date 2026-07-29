import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme6: Exercise[] = [
  {
    id: "6.1",
    theme: "merger",
    title: "Levier du groupe combiné",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A : EBITDA 300 M, dette 600 M (x2). Acquiert B : EBITDA 100 M, dette 200 M, prix = 800 M, financé 100% en dette nouvelle. Levier combiné ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [4], unit: "multiple" },
        method:
          "Dette combinée = 600 + 200 + 800 = 1 600. EBITDA = 300 + 100 = 400. Levier = 1 600 / 400 = x4.",
        answerLabel: "x4",
      },
    ],
  },
  {
    id: "6.2",
    theme: "merger",
    title: "Levier avec synergies",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Même deal (dette 1 600 M, EBITDA 400 M), + 100 M de synergies de coûts annuelles. Nouveau levier ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [3.2], unit: "multiple" },
        method: "EBITDA = 400 + 100 = 500. Levier = 1 600 / 500 = x3,2.",
        answerLabel: "x3,2",
      },
    ],
  },
  {
    id: "6.3",
    theme: "merger",
    title: "Goodwill généré",
    variants: [
      {
        kind: "numeric",
        prompt: "Prix payé pour une cible = 600 M. Actifs nets identifiables = 250 M. Goodwill ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [350], unit: "number" },
        method: "600 − 250 = 350 M.",
        answerLabel: "350 M",
      },
    ],
  },
  {
    id: "6.4",
    theme: "merger",
    title: "Goodwill IFRS",
    variants: [
      {
        kind: "open",
        prompt:
          "Pourquoi le goodwill n'est-il pas amorti sous IFRS mais fait l'objet d'un test de dépréciation annuel ?",
        method:
          "Sa durée de vie n'est pas déterminable de façon fiable — on évalue chaque année si sa valeur reste justifiée.",
        answerLabel: "Durée de vie non déterminable → impairment test annuel",
      },
    ],
  },
  {
    id: "6.5",
    theme: "merger",
    title: "Synergies revenus vs coûts",
    variants: [
      {
        kind: "open",
        prompt:
          "Pourquoi une synergie de revenus (cross-sell) est-elle valorisée avec une décote plus forte qu'une synergie de coûts ?",
        method:
          "Elle dépend de facteurs externes incertains (clients, concurrence), alors que les synergies de coûts sont largement sous le contrôle de l'acquéreur.",
        answerLabel: "Plus d'incertitude externe vs contrôle sur les coûts",
      },
    ],
  },
  {
    id: "6.6",
    theme: "merger",
    title: "Hausse de levier et crédit",
    variants: [
      {
        kind: "open",
        prompt: "Une acquisition fait passer le levier de x3 à x5. Conséquence typique sur le crédit ?",
        method:
          "Risque de dégradation de la notation, hausse du coût de la dette existante et future.",
        answerLabel: "Dégradation de notation / coût de dette ↑",
      },
    ],
  },
  {
    id: "6.7",
    theme: "merger",
    title: "Doublons de postes",
    variants: [
      {
        kind: "open",
        prompt:
          "Une fusion génère des doublons de postes. Impact typique court terme vs moyen terme ?",
        method:
          "Coûts de restructuration ponctuels en année 1-2, compensés progressivement par des économies récurrentes ensuite.",
        answerLabel: "Coûts ponctuels puis économies récurrentes",
      },
    ],
  },
  {
    id: "6.8",
    theme: "merger",
    title: "Tax shield de la dette",
    variants: [
      {
        kind: "open",
        prompt:
          "Pourquoi une acquisition financée en dette bénéficie-t-elle d'un effet de levier fiscal (tax shield) ?",
        method:
          "Les intérêts de la dette sont déductibles fiscalement, ce qui réduit l'impôt et augmente le cash-flow après impôt.",
        answerLabel: "Intérêts déductibles → impôt ↓",
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
          "Groupe combiné : dette 1 600 M, EBITDA 400 M, taux d'intérêt moyen 5%. Interest coverage ratio ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method: "Frais financiers = 1 600 × 5% = 80. Coverage = 400 / 80 = x5.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "6.10",
    theme: "merger",
    title: "Breach de covenant",
    variants: [
      {
        kind: "open",
        prompt:
          "Un covenant impose un levier max de x4. Le levier post-deal atteint x4,5 (breach). Options typiques de l'acquéreur ?",
        method:
          "Renégocier les covenants, réduire la dette (plus d'equity), céder un actif non-core, ou revoir le prix/la structure du deal.",
        answerLabel: "Renégocier / plus d'equity / céder / revoir le deal",
      },
    ],
  },
];
