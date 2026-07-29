import type { Exercise } from "@/data/exercise-types";

export const exercisesTheme7: Exercise[] = [
  {
    id: "7.1",
    theme: "working-capital",
    title: "Variation de BFR",
    variants: [
      {
        kind: "choice",
        prompt: "BFR passe de 40 M à 50 M sur l'année. Impact sur le FCF ?",
        options: [
          "Consommation de cash de 10 M (FCF ↓)",
          "Génération de cash de 10 M (FCF ↑)",
          "Aucun impact",
        ],
        correctIndex: 0,
        method: "Hausse du BFR = consommation de cash → impact négatif de 10 M sur le FCF.",
      },
    ],
  },
  {
    id: "7.2",
    theme: "working-capital",
    title: "Impact du DSO",
    variants: [
      {
        kind: "numeric",
        prompt:
          "DSO passe de 60 à 90 jours sur un CA de 360 M (convention 360 jours). Impact cash (consommation) ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [30], unit: "number" },
        method: "Delta = 30 jours → 30/360 × 360 = 30 M de consommation de cash.",
        answerLabel: "30 M (consommation)",
      },
    ],
  },
  {
    id: "7.3",
    theme: "working-capital",
    title: "Impact du DPO",
    variants: [
      {
        kind: "numeric",
        prompt:
          "DPO passe de 30 à 60 jours sur des achats de 240 M (convention 360 jours). Génération de cash ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [20], unit: "number" },
        method: "Delta = 30 jours → 30/360 × 240 = 20 M de génération de cash.",
        answerLabel: "20 M (génération)",
      },
    ],
  },
  {
    id: "7.4",
    theme: "working-capital",
    title: "Cash conversion cycle négatif",
    variants: [
      {
        kind: "open",
        prompt:
          "Pourquoi un cash conversion cycle négatif est-il particulièrement recherché (ex. : distribution) ?",
        method:
          "L'entreprise encaisse ses ventes avant de payer ses fournisseurs, générant du cash pour financer la croissance sans dette ni equity additionnels.",
        answerLabel: "Encaissement avant paiement fournisseurs → autofinancement",
      },
    ],
  },
  {
    id: "7.5",
    theme: "working-capital",
    title: "Croissance et BFR",
    variants: [
      {
        kind: "open",
        prompt:
          "Une entreprise en forte croissance voit son BFR augmenter en valeur absolue même à ratios stables (DSO/DIO/DPO). Pourquoi ?",
        method:
          "Le BFR est proportionnel au niveau d'activité — plus de ventes = mécaniquement plus de créances et de stocks en valeur absolue.",
        answerLabel: "BFR proportionnel à l'activité",
      },
    ],
  },
  {
    id: "7.6",
    theme: "working-capital",
    title: "FCF unlevered",
    variants: [
      {
        kind: "numeric",
        prompt:
          "EBITDA 100 M, Capex 20 M, variation de BFR 20 M (consommation), impôt 20 M. FCF ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [40], unit: "number" },
        method: "100 − 20 − 20 − 20 = 40 M.",
        answerLabel: "40 M",
      },
    ],
  },
  {
    id: "7.7",
    theme: "working-capital",
    title: "Impact du DIO",
    variants: [
      {
        kind: "numeric",
        prompt:
          "DIO passe de 90 à 60 jours sur un coût des ventes de 360 M (convention 360 jours). Libération de cash ?",
        unitHint: "M€",
        check: { mode: "exact", accept: [30], unit: "number" },
        method: "Delta = 30 jours → 30/360 × 360 = 30 M de libération de cash.",
        answerLabel: "30 M (libération)",
      },
    ],
  },
  {
    id: "7.8",
    theme: "working-capital",
    title: "BFR et LBO",
    variants: [
      {
        kind: "open",
        prompt:
          "Pourquoi les acheteurs en LBO s'intéressent-ils particulièrement à la stabilité du BFR d'une cible ?",
        method:
          "Un BFR stable ou négatif limite les besoins de financement additionnels et améliore la capacité à générer du cash pour rembourser la dette.",
        answerLabel: "Moins de besoin de cash / plus de capacité de remboursement",
      },
    ],
  },
  {
    id: "7.9",
    theme: "working-capital",
    title: "Saisonnalité du BFR",
    variants: [
      {
        kind: "open",
        prompt:
          "Une entreprise saisonnière a un BFR très variable dans l'année. Outil de financement typique pour lisser ce besoin ?",
        method:
          "Une ligne de crédit revolving (RCF), tirée et remboursée au gré des besoins saisonniers.",
        answerLabel: "RCF (revolving credit facility)",
      },
    ],
  },
  {
    id: "7.10",
    theme: "working-capital",
    title: "Normalized working capital",
    variants: [
      {
        kind: "open",
        prompt:
          "Le « normalized working capital » est souvent négocié dans un SPA. Pourquoi est-ce sensible entre acheteur et vendeur ?",
        method:
          "Il détermine le niveau de BFR « cible » livré à la clôture ; tout écart donne lieu à un ajustement de prix.",
        answerLabel: "Ajustement de prix à la clôture selon l'écart au BFR cible",
      },
    ],
  },
];

export const EXERCISE_CHEATSHEET = [
  "Levier : dette après / EBITDA après — le cash utilisé pour payer compte comme de la dette, qu'il vienne du bilan ou d'un emprunt.",
  "Accretion/Dilution : en stock deal, compare les P/E ; en cash/dette deal, compare le yield (1/multiple) au coût du financement après impôt.",
  "MOIC → IRR (règle du pouce, sur 5 ans) : 2x ≈ 15% · 2,5x ≈ 20% · 3x ≈ 25%.",
  "Valeur terminale : utilise directement le FCF « forward » pour éviter une multiplication inutile par (1+g).",
  "BFR : toujours raisonner en jours × (CA ou achats)/360, jamais /365 pour garder des chiffres ronds à l'oral.",
];
