import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme1: Exercise[] = [
  {
    id: "1.1",
    theme: "leverage",
    title: "Cession simple, cible sans dette",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A : EBITDA 100 M, levier x6 (dette = 600 M). Cède B : EBITDA 20 M, multiple x10 (prix = 200 M cash, pas de dette). Nouveau levier ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method:
          "Dette avant = 600. Dette après = 600 − 200 = 400 ; EBITDA après = 100 − 20 = 80. Levier = 400 / 80 = x5.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "1.2",
    theme: "leverage",
    title: "Cession, cible avec dette propre",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A : EBITDA 200 M, levier x5 (dette = 1 000 M). Cède C : EBITDA 40 M, multiple x10 (prix = 400 M), C porte 200 M de dette propre. Nouveau levier ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [2.5], unit: "multiple" },
        method:
          "Dette après = 1 000 − 400 (cash reçu) − 200 (dette de C qui sort) = 400. EBITDA après = 200 − 40 = 160. Levier = 400 / 160 = x2,5.",
        answerLabel: "x2,5",
      },
    ],
  },
  {
    id: "1.3",
    theme: "leverage",
    title: "Acquisition 100% dette nouvelle",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A : EBITDA 100 M, dette 500 M (x5). Acquiert D : EBITDA 20 M, multiple x5 (prix = 100 M), financé 100% en dette nouvelle. Nouveau levier ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method:
          "Dette après = 500 + 100 = 600. EBITDA après = 100 + 20 = 120. Levier = 600 / 120 = x5.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "1.4",
    theme: "leverage",
    title: "Acquisition 100% cash de bilan",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A : EBITDA 100 M, dette 400 M (x4). Acquiert E : EBITDA 25 M, multiple x4 (prix = 100 M), payé 100% en cash disponible au bilan. Nouveau levier ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [4], unit: "multiple" },
        method:
          "Le cash sortant augmente la dette nette du même montant qu'une dette nouvelle. Dette après = 400 + 100 = 500 ; EBITDA après = 100 + 25 = 125. Levier = 500 / 125 = x4.",
        answerLabel: "x4",
      },
    ],
  },
  {
    id: "1.5",
    theme: "leverage",
    title: "Acquisition moitié dette / moitié capital",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A : EBITDA 100 M, dette 400 M (x4). Acquiert F : EBITDA 20 M, multiple x8 (prix = 160 M), financé 50% dette nouvelle / 50% émission d'actions. Nouveau levier ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [4], unit: "multiple" },
        method:
          "Seule la moitié dette impacte la dette nette : +80 M. Dette après = 400 + 80 = 480 ; EBITDA après = 100 + 20 = 120. Levier = 480 / 120 = x4 (l'equity absorbe l'effet).",
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
          "A : EBITDA 100 M, dette 400 M (x4). Verse un dividende de 100 M financé par dette nouvelle. Nouveau levier ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method: "L'EBITDA ne bouge pas. Dette après = 400 + 100 = 500. Levier = 500 / 100 = x5.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "1.7",
    theme: "leverage",
    title: "Cession avec earn-out",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A : EBITDA 100 M, dette 500 M (x5). Cède G : EBITDA 20 M, multiple x10 (prix = 200 M), payé moitié cash immédiat (100 M) / moitié earn-out à 2 ans (non encaissé). Levier immédiat ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method:
          "Seul le cash réellement encaissé aujourd'hui compte : 100 M. Dette après = 500 − 100 = 400 ; EBITDA après = 100 − 20 = 80. Levier = 400 / 80 = x5 (inchangé aujourd'hui).",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "1.8",
    theme: "leverage",
    title: "Croissance organique pure",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A : EBITDA 100 M, dette 500 M (x5). L'EBITDA croît de 25% sans aucun mouvement de dette. Nouveau levier ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [4], unit: "multiple" },
        method: "EBITDA après = 100 × 1,25 = 125 ; dette inchangée = 500. Levier = 500 / 125 = x4.",
        answerLabel: "x4",
      },
    ],
  },
  {
    id: "1.9",
    theme: "leverage",
    title: "Cession puis rachat d'actions",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A : EBITDA 100 M, dette 400 M (x4). Cède H : EBITDA 20 M, multiple x10 (prix = 200 M cash), utilisé intégralement pour un rachat d'actions. Nouveau levier ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [5], unit: "multiple" },
        method:
          "Le cash entre puis ressort immédiatement : effet net sur la dette = 0. Dette après = 400 ; EBITDA après = 100 − 20 = 80. Levier = 400 / 80 = x5.",
        answerLabel: "x5",
      },
    ],
  },
  {
    id: "1.10",
    theme: "leverage",
    title: "Cession + acquisition simultanées",
    variants: [
      {
        kind: "numeric",
        prompt:
          "A : EBITDA 100 M, dette 500 M (x5). Cède I : EBITDA 20 M, multiple x10 (prix = 200 M cash). Acquiert J : EBITDA 10 M, multiple x6 (prix = 60 M, financé en dette). Nouveau levier ?",
        unitHint: "Format : xN",
        check: { mode: "exact", accept: [4], unit: "multiple" },
        method:
          "Dette après = 500 − 200 + 60 = 360. EBITDA après = 100 − 20 + 10 = 90. Levier = 360 / 90 = x4.",
        answerLabel: "x4",
      },
    ],
  },
];
