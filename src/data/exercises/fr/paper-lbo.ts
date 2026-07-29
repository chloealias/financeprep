import type { Exercise } from "@/data/exercise-types";

/** Paper LBO — deal fil rouge : EBITDA 100 M, entry x8 → EV = 800 M */
export const exercisesTheme3: Exercise[] = [
  {
    id: "3.1",
    theme: "paper-lbo",
    title: "Structure au closing",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Deal : EBITDA 100 M, entry multiple x8 → EV = 800 M. Dette = 75% de l'EV, equity = 25%. Montant d'equity ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [200], unit: "number" },
        method: "Dette = 800 × 75% = 600. Equity = 800 − 600 = 200 M.",
        answerLabel: "200 M",
      },
    ],
  },
  {
    id: "3.2",
    theme: "paper-lbo",
    title: "Deleveraging sur 5 ans",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Dette initiale 600 M. FCF constant de 40 M/an, entièrement utilisé pour rembourser la dette, pendant 5 ans. Dette restante à l'année 5 ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [400], unit: "number" },
        method: "Remboursement cumulé = 40 × 5 = 200. Dette restante = 600 − 200 = 400 M.",
        answerLabel: "400 M",
      },
    ],
  },
  {
    id: "3.3",
    theme: "paper-lbo",
    title: "Equity à la sortie (flat)",
    variants: [
      {
        kind: "numeric",
        prompt:
          "EBITDA exit = 100 M (flat), exit multiple = x8, dette restante = 400 M. Equity exit ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [400], unit: "number" },
        method: "EV exit = 100 × 8 = 800. Equity exit = 800 − 400 = 400 M.",
        answerLabel: "400 M",
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
        prompt: "Equity investi = 200 M, equity exit = 400 M. MOIC ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [2], unit: "multiple" },
        method: "MOIC = 400 / 200 = 2,0x.",
        answerLabel: "2,0x",
      },
    ],
  },
  {
    id: "3.5",
    theme: "paper-lbo",
    title: "IRR approximatif",
    variants: [
      {
        kind: "numeric",
        prompt:
          "MOIC de 2,0x sur 5 ans. IRR approximatif ? (heuristique : 2x ≈ 15%, 2,5x ≈ 20%, 3x ≈ 25%)",
        unitHint: "%",
        check: { mode: "exact", accept: [15], unit: "percent" },
        method: "Heuristique : 2x en 5 ans ≈ 15%.",
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
          "Même deal, exit multiple = x10 (EBITDA 100 M, dette restante 400 M, equity initial 200 M). Nouveau MOIC ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [3], unit: "multiple" },
        method:
          "EV exit = 100 × 10 = 1 000. Equity exit = 1 000 − 400 = 600. MOIC = 600 / 200 = 3,0x.",
        answerLabel: "3,0x",
      },
    ],
  },
  {
    id: "3.7",
    theme: "paper-lbo",
    title: "3 leviers de création de valeur",
    variants: [
      {
        kind: "open",
        prompt: "Cite les 3 leviers de création de valeur d'un LBO.",
        method:
          "EBITDA growth, deleveraging, multiple expansion.",
        answerLabel: "EBITDA growth, deleveraging, multiple expansion",
      },
    ],
  },
  {
    id: "3.8",
    theme: "paper-lbo",
    title: "MOIC cible et IRR",
    variants: [
      {
        kind: "numeric",
        prompt: "Un fonds vise un MOIC de 2,5x sur 5 ans. IRR cible approximatif ?",
        unitHint: "%",
        check: { mode: "exact", accept: [20], unit: "percent" },
        method: "Heuristique : 2,5x en 5 ans ≈ 20%.",
        answerLabel: "≈ 20%",
      },
    ],
  },
  {
    id: "3.9",
    theme: "paper-lbo",
    title: "Contrainte de levier maximum",
    variants: [
      {
        kind: "numeric",
        prompt:
          "EV = 800 M. Le fonds ne veut pas dépasser 65% de dette. Dette max ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [520], unit: "number" },
        method: "800 × 65% = 520 M (equity minimum = 280 M).",
        answerLabel: "520 M",
      },
    ],
  },
  {
    id: "3.10",
    theme: "paper-lbo",
    title: "Sans deleveraging",
    variants: [
      {
        kind: "numeric",
        prompt:
          "Dette constante à 600 M, EBITDA flat 100 M, exit multiple = entry x8, equity initial 200 M. MOIC ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [1], unit: "multiple" },
        method:
          "EV exit = 800. Equity exit = 800 − 600 = 200 = equity initial. MOIC = 1,0x — aucune valeur créée.",
        answerLabel: "1,0x",
      },
    ],
  },
];
