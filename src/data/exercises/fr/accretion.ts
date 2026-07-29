import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme2: Exercise[] = [
  {
    id: "2.1",
    theme: "accretion",
    title: "Deal 100% actions",
    variants: [
      {
        kind: "choice",
        prompt:
          "A : P/E 20x. Achète B : P/E 10x, 100% en actions au prix de marché. Effet sur l'EPS pro forma ?",
        options: ["Accrétif", "Dilutif", "Neutre"],
        correctIndex: 0,
        method:
          "En stock deal, accrétif si P/E acquéreur > P/E cible. 20x > 10x → Accrétif.",
      },
    ],
  },
  {
    id: "2.2",
    theme: "accretion",
    title: "Deal 100% actions, sens inverse",
    variants: [
      {
        kind: "choice",
        prompt: "A : P/E 10x. Achète C : P/E 20x, 100% en actions. Effet ?",
        options: ["Accrétif", "Dilutif", "Neutre"],
        correctIndex: 1,
        method: "10x < 20x → Dilutif.",
      },
    ],
  },
  {
    id: "2.3",
    theme: "accretion",
    title: "Deal 100% cash financé par dette",
    variants: [
      {
        kind: "choice",
        prompt:
          "A : P/E 20x. Achète D : P/E 10x, 100% cash financé par dette à 5%, taux d'IS 25%. Effet ?",
        options: ["Accrétif", "Dilutif", "Neutre"],
        correctIndex: 0,
        method:
          "Yield de D = 1/10 = 10%. Coût de la dette après impôt = 5% × (1−25%) = 3,75%. 10% > 3,75% → Accrétif.",
      },
    ],
  },
  {
    id: "2.4",
    theme: "accretion",
    title: "Deal 100% cash de trésorerie",
    variants: [
      {
        kind: "choice",
        prompt:
          "A : P/E 20x. Achète E : P/E 10x, 100% cash prélevé sur la trésorerie qui rapportait 2% avant impôt (IS 25%). Effet ?",
        options: ["Accrétif", "Dilutif", "Neutre"],
        correctIndex: 0,
        method:
          "Yield de E = 10%. Coût d'opportunité du cash après impôt = 2% × 75% = 1,5%. 10% > 1,5% → Accrétif.",
      },
    ],
  },
  {
    id: "2.5",
    theme: "accretion",
    title: "Prime de contrôle élevée",
    variants: [
      {
        kind: "choice",
        prompt:
          "A rachète F en payant une prime de contrôle importante au-dessus du prix de marché, financée en actions. Effet sur la conclusion accretion/dilution par rapport à un prix « au marché » ?",
        options: [
          "Pousse vers la dilution",
          "Pousse vers l'accrétion",
          "Sans effet",
        ],
        correctIndex: 0,
        method:
          "Payer une prime augmente le prix (donc le nombre d'actions émises) sans augmenter le profit acquis → pousse vers la dilution (sauf synergies suffisantes).",
      },
    ],
  },
  {
    id: "2.6",
    theme: "accretion",
    title: "Multiples identiques",
    variants: [
      {
        kind: "choice",
        prompt:
          "A : P/E 15x. Achète G : P/E 15x, 100% en actions, sans synergies. Effet ?",
        options: ["Accrétif", "Dilutif", "Neutre"],
        correctIndex: 2,
        method:
          "P/E identiques → Neutre (légèrement dilutif si prime ou frais de transaction).",
      },
    ],
  },
  {
    id: "2.7",
    theme: "accretion",
    title: "Financement mixte",
    variants: [
      {
        kind: "choice",
        prompt:
          "A : P/E 20x. Achète H : P/E 10x, financé 50% actions / 50% dette (coût après impôt 6%). Effet ?",
        options: ["Accrétif", "Dilutif", "Neutre"],
        correctIndex: 0,
        method:
          "Partie actions : 20x > 10x → accrétif. Partie dette : yield 10% > coût 6% → accrétif. Les deux tests vont dans le même sens → Accrétif.",
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
          "Une acquisition dilutive en année 1 devient accrétive en année 3 grâce aux synergies. Comment nomme-t-on le nombre d'années pour atteindre la neutralité ?",
        method: "C'est la breakeven period (période de retour à la neutralité).",
        answerLabel: "Breakeven period",
      },
    ],
  },
  {
    id: "2.9",
    theme: "accretion",
    title: "Émission à un cours sous-évalué",
    variants: [
      {
        kind: "choice",
        prompt:
          "A émet des actions à un cours qu'elle juge sous-évalué pour financer une acquisition. Risque additionnel sur l'EPS par rapport au calcul théorique ?",
        options: [
          "Dilution plus forte que prévu",
          "Dilution plus faible que prévu",
          "Aucun impact",
        ],
        correctIndex: 0,
        method:
          "Émettre « moins cher » oblige à émettre plus d'actions pour lever le même montant → dilution plus forte que prévu.",
      },
    ],
  },
  {
    id: "2.10",
    theme: "accretion",
    title: "Effet des synergies",
    variants: [
      {
        kind: "choice",
        prompt:
          "A : P/E 25x. Achète I : P/E 15x, 100% actions, avec synergies de coûts ajoutées au profit combiné. Effet final ?",
        options: [
          "Accrétif, renforcé par les synergies",
          "Dilutif malgré les synergies",
          "Neutre",
        ],
        correctIndex: 0,
        method:
          "25x > 15x déjà favorable ; les synergies augmentent encore le profit combiné sans actions supplémentaires → Accrétif, renforcé.",
      },
    ],
  },
];
