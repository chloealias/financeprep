import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme4: Exercise[] = [
  {
    id: "4.1",
    theme: "dcf",
    title: "Valeur terminale (Gordon Growth)",
    variants: [
      {
        kind: "numeric",
        prompt: "FCF forward = 100 M, g = 2%, WACC = 10%. Valeur terminale ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [1250], unit: "number" },
        method: "Dénominateur = 10% − 2% = 8%. VT = 100 / 0,08 = 1 250 M.",
        answerLabel: "1 250 M",
      },
    ],
  },
  {
    id: "4.2",
    theme: "dcf",
    title: "Sensibilité au WACC",
    variants: [
      {
        kind: "numeric",
        prompt: "FCF 100 M, g = 2%, WACC = 12%. Nouvelle VT ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [1000], unit: "number" },
        method: "Dénominateur = 10%. VT = 100 / 0,10 = 1 000 M (WACC +2 pts → VT −20%).",
        answerLabel: "1 000 M",
      },
    ],
  },
  {
    id: "4.3",
    theme: "dcf",
    title: "Actualisation de la VT",
    variants: [
      {
        kind: "numeric",
        prompt:
          "FCF forward année 5 = 50 M, g = 2%, WACC = 10%. Facteur d'actualisation à 5 ans ≈ 0,62. PV aujourd'hui ?",
        unitHint: "M€",
        check: { mode: "tolerance", value: 387.5, pct: 3 },
        method: "VT année 5 = 50 / 0,08 = 625. PV = 625 × 0,62 ≈ 387,5 M (≈ 390 M).",
        answerLabel: "≈ 390 M",
      },
    ],
  },
  {
    id: "4.4",
    theme: "dcf",
    title: "Pourquoi la VT domine",
    variants: [
      {
        kind: "open",
        prompt: "Pourquoi la valeur terminale représente-t-elle souvent 70-80% de la valeur totale d'un DCF ?",
        method:
          "Elle capture tous les flux au-delà de l'horizon explicite (souvent 5 ans), soit une infinité d'années actualisées, contre seulement quelques flux explicites.",
        answerLabel:
          "Elle capture tous les flux au-delà de l'horizon explicite",
      },
    ],
  },
  {
    id: "4.5",
    theme: "dcf",
    title: "Calcul du WACC",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Coût des fonds propres 12%, coût de la dette après impôt 4%, structure 75% equity / 25% dette. WACC ?",
        unitHint: "%",
        check: { mode: "exact", accept: [10], unit: "percent" },
        method: "0,75 × 12% + 0,25 × 4% = 9% + 1% = 10%.",
        answerLabel: "10%",
      },
    ],
  },
  {
    id: "4.6",
    theme: "dcf",
    title: "Hausse du taux sans risque",
    variants: [
      {
        kind: "choice",
        prompt:
          "Le taux sans risque augmente de 1 point, la prime de marché reste stable. Effet sur le coût des fonds propres (CAPM) et le WACC ?",
        options: [
          "Re ↑, WACC ↑, valorisation DCF ↓",
          "Re ↓, WACC ↓, valorisation DCF ↑",
          "Aucun effet sur le WACC",
        ],
        correctIndex: 0,
        method:
          "Re = Rf + β(Rm−Rf) → hausse de Rf augmente Re. Donc WACC ↑ et valorisation DCF ↓.",
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
        prompt: "Bêta = 1,5, Rf = 3%, prime de marché = 6%. Coût des fonds propres ?",
        unitHint: "%",
        check: { mode: "exact", accept: [12], unit: "percent" },
        method: "3% + 1,5 × 6% = 3% + 9% = 12%.",
        answerLabel: "12%",
      },
    ],
  },
  {
    id: "4.8",
    theme: "dcf",
    title: "Méthode alternative de VT",
    variants: [
      {
        kind: "open",
        prompt: "Quelle méthode utiliser à la place de Gordon Growth pour la valeur terminale ?",
        method:
          "Méthode du multiple de sortie (appliquer un multiple EV/EBITDA à l'EBITDA de la dernière année explicite).",
        answerLabel: "Multiple de sortie (exit multiple)",
      },
    ],
  },
  {
    id: "4.9",
    theme: "dcf",
    title: "De l'EV à l'equity value",
    variants: [
      {
        kind: "numeric",
        prompt: "DCF donne EV = 1 000 M. Dette nette = 200 M, minoritaires = 50 M. Equity value ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [750], unit: "number" },
        method: "1 000 − 200 − 50 = 750 M.",
        answerLabel: "750 M",
      },
    ],
  },
  {
    id: "4.10",
    theme: "dcf",
    title: "FCF unlevered et frais financiers",
    variants: [
      {
        kind: "open",
        prompt: "Pourquoi exclure les frais financiers du FCF unlevered ?",
        method:
          "Le FCF unlevered mesure les flux pour tous les apporteurs de capitaux (dette + equity) avant service de la dette, cohérent avec l'actualisation au WACC.",
        answerLabel:
          "Cohérent avec le WACC : flux avant service de la dette pour dette + equity",
      },
    ],
  },
];
