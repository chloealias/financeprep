import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme5: Exercise[] = [
  {
    id: "5.1",
    theme: "football-field",
    title: "3 méthodes de valorisation",
    variants: [
      {
        kind: "open",
        prompt: "Cite les 3 méthodes de valorisation les plus courantes.",
        method: "Comparables boursiers, transactions précédentes, DCF.",
        answerLabel: "Comparables boursiers, transactions précédentes, DCF",
      },
    ],
  },
  {
    id: "5.2",
    theme: "football-field",
    title: "Precedent transactions plus hautes",
    variants: [
      {
        kind: "open",
        prompt:
          "Les transactions précédentes donnent en général une fourchette plus haute que les comparables boursiers. Pourquoi ?",
        method:
          "Elles incluent une prime de contrôle, absente des cours de bourse (positions minoritaires).",
        answerLabel: "Prime de contrôle absente des cours de bourse",
      },
    ],
  },
  {
    id: "5.3",
    theme: "football-field",
    title: "DCF trop élevé vs comps",
    variants: [
      {
        kind: "open",
        prompt:
          "Le DCF donne une valorisation nettement plus élevée que les comparables. Explication fréquente ?",
        method:
          "Hypothèses de croissance/marge trop optimistes, ou WACC sous-estimé.",
        answerLabel: "Hypothèses trop optimistes ou WACC trop bas",
      },
    ],
  },
  {
    id: "5.4",
    theme: "football-field",
    title: "Transactions anciennes",
    variants: [
      {
        kind: "open",
        prompt:
          "Pourquoi exclut-on les transactions de plus de 3-5 ans dans les precedent transactions ?",
        method:
          "Les conditions de marché (taux, appétit des acquéreurs, multiples sectoriels) évoluent, rendant les anciennes transactions moins pertinentes.",
        answerLabel: "Conditions de marché obsolètes",
      },
    ],
  },
  {
    id: "5.5",
    theme: "football-field",
    title: "Comparable marge différente",
    variants: [
      {
        kind: "choice",
        prompt:
          "Un comparable a un multiple proche mais une marge d'EBITDA très différente. Faut-il l'exclure ?",
        options: [
          "Pas forcément — ajuster, pondérer moins, ou privilégier EV/Sales",
          "Toujours l'exclure",
          "Toujours le garder sans ajustement",
        ],
        correctIndex: 0,
        method:
          "Pas forcément — l'ajuster ou le pondérer moins, voire privilégier EV/Sales si les structures de coûts diffèrent trop.",
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
        prompt: "Comment passe-t-on d'une Enterprise Value à une valeur des capitaux propres ?",
        method:
          "Equity Value = EV − dette nette − minoritaires (+ quote-part de participations en équivalence si applicable).",
        answerLabel: "EV − dette nette − minoritaires (± autres ajustements)",
      },
    ],
  },
  {
    id: "5.7",
    theme: "football-field",
    title: "Stock-options ITM",
    variants: [
      {
        kind: "open",
        prompt:
          "Une cible a des stock-options significatives dans la monnaie. Quel ajustement fait-on sur le nombre d'actions ?",
        method:
          "Treasury Stock Method (TSM), pour diluer le nombre d'actions en tenant compte des options exerçables.",
        answerLabel: "Treasury Stock Method (TSM)",
      },
    ],
  },
  {
    id: "5.8",
    theme: "football-field",
    title: "Plusieurs méthodes",
    variants: [
      {
        kind: "open",
        prompt: "Pourquoi présenter plusieurs méthodes plutôt qu'un chiffre unique ?",
        method:
          "Pour donner une fourchette raisonnable reflétant l'incertitude et faciliter la négociation.",
        answerLabel: "Fourchette d'incertitude / négociation",
      },
    ],
  },
  {
    id: "5.9",
    theme: "football-field",
    title: "Société non rentable",
    variants: [
      {
        kind: "open",
        prompt: "Quel multiple utiliser pour une société non rentable (EBITDA négatif) ?",
        method:
          "EV/Sales, ou des multiples sectoriels spécifiques (ex. : par utilisateur pour la tech).",
        answerLabel: "EV/Sales (ou multiples sectoriels)",
      },
    ],
  },
  {
    id: "5.10",
    theme: "football-field",
    title: "LBO implicite borne basse",
    variants: [
      {
        kind: "open",
        prompt:
          "Un LBO implicite donne souvent la borne basse d'un football field. Pourquoi ?",
        method:
          "Il reflète le prix max qu'un sponsor financier peut payer pour son IRR cible, généralement inférieur au prix qu'un stratégique peut justifier via synergies.",
        answerLabel: "Prix max sponsor pour IRR cible < stratégique + synergies",
      },
    ],
  },
];
