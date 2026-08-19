import type { Exercise } from "@/data/exercise-types";

const S = {
  WACC: "CMPC & Coût du capital",
  TV: "Valeur terminale — MME & MCP",
  PV: "Valeur actuelle & convention mid-year",
  EV_EQUITY: "Valeur d'entreprise → Capitaux propres",
  ORDER: "Étapes d'un DCF",
  CAPM: "MEDAF & Bêta",
  TV_DEEP: "Valeur terminale — approfondissement",
  FCF: "Flux de trésorerie disponible",
  NWC: "Besoin en fonds de roulement",
  RATIOS: "Ratios du cycle d'exploitation",
  SYNTHESIS: "Synthèse & questions d'entretien",
};

export const dcfExercises: Exercise[] = [
  // --- CMPC ---
  {
    id: "3.1",
    theme: "dcf",
    section: S.WACC,
    title: "Proportion des capitaux propres dans la capitalisation",
    variants: [
      {
        kind: "numeric",
        prompt: `Ratio dette / capitalisation totale : 30,0 %.\n\nCalculez la proportion des capitaux propres dans la capitalisation totale.`,
        unitHint: "Pourcentage (ex. 45)",
        check: { mode: "exact", accept: [70] },
        method: "1 − 30 % = 70 %.",
        answerLabel: "70 %",
      },
    ],
  },
  {
    id: "3.2",
    theme: "dcf",
    section: S.WACC,
    title: "Coût de la dette après impôt",
    variants: [
      {
        kind: "numeric",
        prompt: `Coût de la dette : 6,5 %. Taux d'impôt : 25,0 %.\n\nCalculez le coût de la dette après impôt.`,
        unitHint: "Pourcentage (ex. 3.2)",
        check: { mode: "exact", accept: [4.875, 4.9] },
        method: "6,5 % × (1 − 25 %) = 4,875 % ≈ 4,9 %.",
        answerLabel: "4,9 %",
      },
    ],
  },
  // --- Valeur terminale ---
  {
    id: "3.3",
    theme: "dcf",
    section: S.TV,
    title: "Valeur terminale — méthode du multiple de sortie",
    variants: [
      {
        kind: "numeric",
        prompt: `EBITDA de l'année terminale (2024E) : $929,2m. Multiple de sortie : 7,5x.\n\nCalculez la valeur terminale (méthode du multiple de sortie).`,
        unitHint: "Millions de dollars (ex. 5000)",
        check: { mode: "exact", accept: [6969] },
        method: "VT = $929,2 × 7,5 = $6 969,0 millions.",
        answerLabel: "$6 969,0 millions",
      },
    ],
  },
  {
    id: "3.4",
    theme: "dcf",
    section: S.TV,
    title: "Taux de croissance perpétuel implicite (depuis MME)",
    variants: [
      {
        kind: "numeric",
        prompt: `VT (MME) = $6 969,0m. CMPC = 11,0 %. FCF terminal (2024E) = $540,5m. Convention mid-year.\n\nCalculez le taux de croissance perpétuel implicite.`,
        unitHint: "Pourcentage (ex. 4.0)",
        check: { mode: "tolerance", value: 2.6, pct: 5 },
        method:
          "g implicite = ((VT × CMPC) − FCF × (1+CMPC)^0,5) / (VT + FCF × (1+CMPC)^0,5) ≈ 2,6 %.",
        answerLabel: "2,6 %",
      },
    ],
  },
  {
    id: "3.5",
    theme: "dcf",
    section: S.TV,
    title: "Valeur terminale — méthode de la croissance perpétuelle",
    variants: [
      {
        kind: "numeric",
        prompt: `FCF terminal (2024E) : $540,5m. Taux de croissance perpétuel : 3 %. CMPC : 11 %.\n\nCalculez la valeur terminale (méthode de la croissance perpétuelle).`,
        unitHint: "Millions de dollars (ex. 5000)",
        check: { mode: "tolerance", value: 6959.6, pct: 1 },
        method: "VT = [$540,5 × (1 + 3 %)] / (11 % − 3 %) = $556,7 / 8 % = $6 959,6 millions.",
        answerLabel: "$6 959,6 millions",
      },
    ],
  },
  {
    id: "3.6",
    theme: "dcf",
    section: S.TV,
    title: "Multiple de sortie implicite (depuis MCP)",
    variants: [
      {
        kind: "numeric",
        prompt: `VT (MCP) = $6 959,6m. CMPC = 11 %. EBITDA terminale = $929,2m. Mid-year sur MCP mais fin d'année sur MME.\n\nCalculez le multiple de sortie implicite.`,
        unitHint: "Multiple (ex. 5.0)",
        check: { mode: "tolerance", value: 7.9, pct: 5 },
        method:
          "Multiple implicite = [VT × (1+CMPC)^0,5] / EBITDA = [$6 959,6 × 1,0536] / $929,2 ≈ 7,9x.\nCross-check : 7,5x MME vs 7,9x implicite — cohérent.",
        answerLabel: "7,9x",
      },
    ],
  },
  // --- Valeur actuelle ---
  {
    id: "3.7",
    theme: "dcf",
    section: S.PV,
    title: "Période d'actualisation mid-year",
    variants: [
      {
        kind: "numeric",
        prompt: `La projection commence en 2020 (Année 1). L'année de base est 2019.\n\nDéterminez la période d'actualisation de 2020 en convention mid-year.`,
        unitHint: "Nombre (ex. 1.5)",
        check: { mode: "exact", accept: [0.5] },
        method: "2020 − 2019 − 0,5 = 0,5.",
        answerLabel: "0,5",
      },
    ],
  },
  {
    id: "3.8",
    theme: "dcf",
    section: S.PV,
    title: "Facteur d'actualisation de l'Année 2",
    variants: [
      {
        kind: "numeric",
        prompt: `CMPC = 11 %. Convention mid-year.\n\nCalculez le facteur d'actualisation de 2021 (Année 2).`,
        unitHint: "Nombre arrondi à 2 décimales (ex. 0.75)",
        check: { mode: "tolerance", value: 0.86, pct: 2 },
        method: "FA = 1 / (1,11)^1,5 = 0,86.",
        answerLabel: "0,86",
      },
    ],
  },
  {
    id: "3.9",
    theme: "dcf",
    section: S.PV,
    title: "Valeur actuelle du FCF de l'Année 3",
    variants: [
      {
        kind: "numeric",
        prompt: `FCF 2022E = $490,6m. Facteur d'actualisation = 0,77.\n\nCalculez la valeur actuelle du FCF 2022.`,
        unitHint: "Millions de dollars (ex. 250.0)",
        check: { mode: "tolerance", value: 377.9, pct: 1 },
        method: "$490,6 × 0,77 = $377,9 millions.",
        answerLabel: "$377,9 millions",
      },
    ],
  },
  {
    id: "3.10",
    theme: "dcf",
    section: S.PV,
    title: "Facteur d'actualisation de la VT (MME — sans mid-year)",
    variants: [
      {
        kind: "numeric",
        prompt: `CMPC = 11 %. Valeur terminale en fin d'Année 5.\n\nDéterminez le facteur d'actualisation de la valeur terminale (méthode du multiple de sortie).\n\n⚠️ Contrairement au FCF projeté, la VT par MME est actualisée en fin d'année (pas de mid-year).`,
        unitHint: "Nombre arrondi à 2 décimales (ex. 0.75)",
        check: { mode: "tolerance", value: 0.59, pct: 2 },
        method: "FA = 1 / (1,11)^5 = 0,59. Pas de mid-year pour la MME.",
        answerLabel: "0,59",
      },
    ],
  },
  {
    id: "3.11",
    theme: "dcf",
    section: S.PV,
    title: "Valeur actuelle de la valeur terminale",
    variants: [
      {
        kind: "numeric",
        prompt: `VT (MME) = $6 969,0m. Facteur d'actualisation = 0,59.\n\nCalculez la valeur actuelle de la valeur terminale.`,
        unitHint: "Millions de dollars (ex. 3000.0)",
        check: { mode: "tolerance", value: 4135.8, pct: 1 },
        method: "$6 969,0 × 0,59 ≈ $4 135,8 millions.",
        answerLabel: "$4 135,8 millions",
      },
    ],
  },
  // --- VE → Capitaux propres ---
  {
    id: "3.12",
    theme: "dcf",
    section: S.EV_EQUITY,
    title: "Valeur d'entreprise issue du DCF",
    variants: [
      {
        kind: "numeric",
        prompt: `VA cumulée des FCF (2020–2024) : $1 872,9m. VA de la valeur terminale : $4 135,8m.\n\nCalculez la valeur d'entreprise.`,
        unitHint: "Millions de dollars (ex. 5000.0)",
        check: { mode: "tolerance", value: 6008.7, pct: 1 },
        method: "VE = $1 872,9 + $4 135,8 = $6 008,7 millions.",
        answerLabel: "$6 008,7 millions",
      },
    ],
  },
  {
    id: "3.13",
    theme: "dcf",
    section: S.EV_EQUITY,
    title: "Part de la VT dans la valeur d'entreprise",
    variants: [
      {
        kind: "numeric",
        prompt: `VA de la VT : $4 135,8m. Valeur d'entreprise : $6 008,7m.\n\nQuel pourcentage de la VE est représenté par la valeur terminale ?`,
        unitHint: "Pourcentage (ex. 45.0)",
        check: { mode: "tolerance", value: 68.8, pct: 2 },
        method: "$4 135,8 / $6 008,7 = 68,8 %.",
        answerLabel: "68,8 %",
      },
    ],
  },
  {
    id: "3.14",
    theme: "dcf",
    section: S.EV_EQUITY,
    title: "Valeur implicite des capitaux propres",
    variants: [
      {
        kind: "numeric",
        prompt: `Valeur d'entreprise : $6 008,7m. Dette totale : $1 500,0m. Trésorerie : $250,0m.\n\nCalculez la valeur implicite des capitaux propres.`,
        unitHint: "Millions de dollars (ex. 3000.0)",
        check: { mode: "tolerance", value: 4758.7, pct: 1 },
        method: "Capitaux propres = VE − dette + trésorerie = $6 008,7 − $1 500 + $250 = $4 758,7 millions.",
        answerLabel: "$4 758,7 millions",
      },
    ],
  },
  // --- Étapes du DCF ---
  {
    id: "3.15",
    theme: "dcf",
    section: S.ORDER,
    title: "Ordre correct des étapes d'un DCF",
    variants: [
      {
        kind: "choice",
        prompt: `Quel est l'ordre correct des étapes d'un DCF ?

I. Déterminer la valeur terminale
II. Étudier la cible et identifier les facteurs de performance
III. Calculer la valeur actuelle et déterminer la valorisation
IV. Projeter les flux de trésorerie disponibles
V. Calculer le CMPC`,
        options: [
          "II, V, IV, III et I",
          "II, IV, V, I et III",
          "III, IV, V, I et II",
          "III, IV, V, II et I",
        ],
        correctIndex: 1,
        method: "Étudier la cible → Projeter le FCF → CMPC → Valeur terminale → VA et valorisation.",
      },
    ],
  },
  // --- MEDAF & Bêta ---
  {
    id: "3.16",
    theme: "dcf",
    section: S.CAPM,
    title: "Méthode de calcul du coût des fonds propres",
    variants: [
      {
        kind: "choice",
        prompt: "Quelle méthode utilise-t-on pour calculer le coût des fonds propres ?",
        options: ["CMPC", "MEDAF (CAPM)", "BFR", "YTW"],
        correctIndex: 1,
        method: "Le Modèle d'Évaluation des Actifs Financiers (MEDAF/CAPM) est utilisé pour le coût des fonds propres.",
      },
    ],
  },
  {
    id: "3.17",
    theme: "dcf",
    section: S.CAPM,
    title: "Proxy pour le taux sans risque",
    variants: [
      {
        kind: "choice",
        prompt: "Quel instrument constitue un proxy acceptable pour le taux sans risque dans le MEDAF ?",
        options: [
          "Le coût de la dette après impôt",
          "Le taux directeur de la banque centrale",
          "Le rendement interpolé d'une obligation à 20 ans",
          "Le taux interbancaire",
        ],
        correctIndex: 2,
        method:
          "On utilise l'instrument à l'échéance la plus longue possible pour correspondre à la durée de vie attendue de l'entreprise.",
      },
    ],
  },
  {
    id: "3.18",
    theme: "dcf",
    section: S.CAPM,
    title: "Fourchette de prime de risque de marché",
    variants: [
      {
        kind: "choice",
        prompt: "Quelle fourchette de prime de risque de marché est la plus appropriée ?",
        options: ["0 %–1 %", "2 %–3 %", "5 %–8 %", "10 %+"],
        correctIndex: 2,
        method: "La fourchette communément admise est 5 %–8 %.",
      },
    ],
  },
  {
    id: "3.19",
    theme: "dcf",
    section: S.CAPM,
    title: "Calcul du coût des fonds propres",
    variants: [
      {
        kind: "choice",
        prompt: `Bêta endetté : 1,25. Taux sans risque : 3,0 %. Prime de risque de marché : 6,6 %.\n\nCoût des fonds propres ?`,
        options: ["11,3 %", "12,0 %", "13,1 %", "14,4 %"],
        correctIndex: 0,
        method: "re = 3,0 % + (1,25 × 6,6 %) = 3,0 % + 8,25 % = 11,25 % ≈ 11,3 %.",
      },
    ],
  },
  {
    id: "3.20",
    theme: "dcf",
    section: S.CAPM,
    title: "Calcul du bêta désendetté",
    variants: [
      {
        kind: "choice",
        prompt: `Bêta endetté : 1,25. D/E : 40,0 %. Taux d'impôt : 25,0 %.\n\nBêta désendetté ?`,
        options: ["0,96", "1,00", "1,12", "1,35"],
        correctIndex: 0,
        method: "βu = 1,25 / [1 + (0,40 × 0,75)] = 1,25 / 1,30 = 0,96.",
      },
    ],
  },
  {
    id: "3.21",
    theme: "dcf",
    section: S.CAPM,
    title: "Calcul du bêta re-endetté",
    variants: [
      {
        kind: "choice",
        prompt: `Bêta désendetté : 1,00. D/E : 45,0 %. Taux d'impôt : 25,0 %.\n\nBêta re-endetté ?`,
        options: ["1,01", "1,25", "1,34", "1,42"],
        correctIndex: 2,
        method: "βL = 1,00 × [1 + (0,45 × 0,75)] = 1,00 × 1,3375 = 1,34.",
      },
    ],
  },
  {
    id: "3.22",
    theme: "dcf",
    section: S.CAPM,
    title: "Secteur avec le bêta le plus bas",
    variants: [
      {
        kind: "choice",
        prompt: "Quel secteur devrait avoir le bêta le plus bas ?",
        options: ["Réseaux sociaux", "Services aux collectivités (utilities)", "Construction résidentielle", "Chimie"],
        correctIndex: 1,
        method: "Les utilities sont moins volatiles et risquées que les réseaux sociaux, la construction et la chimie.",
      },
    ],
  },
  {
    id: "3.23",
    theme: "dcf",
    section: S.CAPM,
    title: "Pourquoi ajouter une prime de taille au MEDAF ?",
    variants: [
      {
        kind: "choice",
        prompt: "Pourquoi un banquier peut-il ajouter une prime de taille à la formule du MEDAF ?",
        options: [
          "Évidence empirique que les petites sociétés sont plus risquées → coût des fonds propres plus élevé",
          "Évidence empirique que les grandes sociétés sont plus risquées",
          "Pour compenser la variabilité de la prime de risque de marché",
          "Pour compenser la variabilité du taux sans risque",
        ],
        correctIndex: 0,
        method:
          "Le risque des petites sociétés n'est pas entièrement capté par le bêta en raison de volumes d'échange limités rendant les calculs de covariance imprécis.",
      },
    ],
  },
  // --- VT approfondissement ---
  {
    id: "3.24",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Méthodologie pour la valeur au-delà de la projection",
    variants: [
      {
        kind: "choice",
        prompt: "Quelle méthodologie capture la valeur d'une société au-delà de la période de projection ?",
        options: ["Valeur à long terme", "Valeur ajustée à long terme", "Valeur terminale", "Valeur projetée"],
        correctIndex: 2,
        method: "La valeur terminale capture toute la valeur au-delà de la période de projection explicite.",
      },
    ],
  },
  {
    id: "3.25",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Valeur terminale via MCP — calcul",
    variants: [
      {
        kind: "choice",
        prompt: `FCF Année 5 : $250,0m. Taux de croissance : 3,0 %. CMPC : 12,0 %.\n\nValeur terminale ?`,
        options: [
          "$2 800,2 millions",
          "$2 861,1 millions",
          "$3 111,5 millions",
          "$3 215,2 millions",
        ],
        correctIndex: 1,
        method: "VT = [$250 × 1,03] / (12 % − 3 %) = $257,5 / 9 % = $2 861,1 millions.",
      },
    ],
  },
  {
    id: "3.26",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Convention mid-year — impact sur la valorisation",
    variants: [
      {
        kind: "choice",
        prompt: "Quel est l'effet de la convention mid-year sur la valorisation par rapport à l'actualisation en fin d'année ?",
        options: [
          "Valorisation plus élevée qu'en fin d'année",
          "Valorisation plus basse qu'en fin d'année",
          "Même valorisation",
          "Non applicable",
        ],
        correctIndex: 0,
        method: "Le mid-year donne une valorisation légèrement plus élevée car les flux sont supposés perçus plus tôt.",
      },
    ],
  },
  {
    id: "3.27",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "VA d'un FCF avec actualisation mid-year",
    variants: [
      {
        kind: "choice",
        prompt: `Une société générera $500m de FCF l'année prochaine. CMPC = 12 %.\n\nValeur actuelle en actualisation mid-year ?`,
        options: [
          "$529,2 millions",
          "$421,8 millions",
          "$446,4 millions",
          "$472,5 millions",
        ],
        correctIndex: 3,
        method: "$500 / (1,12)^0,5 = $472,5 millions.",
      },
    ],
  },
  {
    id: "3.28",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Convention mid-year — MCP vs MME",
    variants: [
      {
        kind: "choice",
        prompt: "Comment la convention mid-year s'applique-t-elle à la MCP et à la MME ?",
        options: [
          "Mid-year pour la MCP ; fin d'année pour la MME",
          "Mid-year pour la MME ; fin d'année pour la MCP",
          "Mid-year pour les deux",
          "Pas utilisé dans les deux cas",
        ],
        correctIndex: 0,
        method:
          "La MCP actualise un flux perpétuel perçu tout au long de l'année → mid-year. La MME repose sur des multiples LTM en fin d'année civile → fin d'année.",
      },
    ],
  },
  {
    id: "3.29",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Pourquoi utiliser la MCP plutôt que la MME ?",
    variants: [
      {
        kind: "choice",
        prompt: "Pourquoi utiliser la méthode de croissance perpétuelle plutôt que le multiple de sortie ?",
        options: [
          "Absence de comparables pertinents pour déterminer un multiple de sortie",
          "Difficulté à déterminer un taux de croissance à long terme",
          "Environnement économique volatile",
          "La cible est privée",
        ],
        correctIndex: 0,
        method: "Quand il n'existe pas de sociétés comparables pour ancrer un multiple de sortie.",
      },
    ],
  },
  {
    id: "3.30",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Exigence d'état stable",
    variants: [
      {
        kind: "choice",
        prompt: "Quelle formule de valeur terminale nécessite un état stable en fin de période de projection ?",
        options: ["MCP", "MME", "Les deux", "Aucune"],
        correctIndex: 2,
        method: "Les deux formules nécessitent un état stable, sinon la VT sera faussée.",
      },
    ],
  },
  {
    id: "3.31",
    theme: "dcf",
    section: S.TV_DEEP,
    title: "Coût de la dette quand elle n'est pas cotée",
    variants: [
      {
        kind: "choice",
        prompt: "Quelle méthode est préférable pour le coût de la dette quand celle-ci n'est pas cotée ?",
        options: [
          "Moyenne historique des charges d'intérêt",
          "Écart entre MEDAF et taux sans risque",
          "Déterminer la notation de crédit implicite à partir de la structure de capital cible",
          "Aucune des réponses ci-dessus",
        ],
        correctIndex: 2,
        method:
          "Approximer le coût de la dette sur la base de la notation de crédit implicite à la structure de capital cible, avec l'aide d'un professionnel DCM.",
      },
    ],
  },
  // --- FCF ---
  {
    id: "3.32",
    theme: "dcf",
    section: S.FCF,
    title: "Calcul du flux de trésorerie disponible",
    variants: [
      {
        kind: "choice",
        prompt: `EBIT $300,0m. D&A $50,0m. Capex $25,0m. Hausse du BFR $10,0m. Taux d'impôt 25,0 %.\n\nFCF ?`,
        options: [
          "$151,0 millions",
          "$189,0 millions",
          "$240,0 millions",
          "$389,0 millions",
        ],
        correctIndex: 2,
        method:
          "EBIAT = 300 × (1 − 25 %) = 225. FCF = 225 + 50 − 25 − 10 = $240,0 millions.",
      },
    ],
  },
  {
    id: "3.33",
    theme: "dcf",
    section: S.FCF,
    title: "Hypothèses pertinentes pour projeter le FCF",
    variants: [
      {
        kind: "choice",
        prompt: `Lesquelles sont pertinentes pour projeter le FCF ?

I. Historique de charges d'intérêt  II. Taux de croissance historiques  III. Classes de dette  IV. Marges EBIT historiques`,
        options: ["I et II", "I et III", "II et IV", "I, II, III et IV"],
        correctIndex: 2,
        method:
          "Le FCF est « unlevered » (avant charges financières), donc l'historique d'intérêts (I) et les classes de dette (III) sont hors sujet.",
      },
    ],
  },
  {
    id: "3.34",
    theme: "dcf",
    section: S.FCF,
    title: "Ce qui n'est PAS un facteur clé du FCF projeté",
    variants: [
      {
        kind: "choice",
        prompt: "Lequel n'est PAS un facteur clé du FCF projeté ?",
        options: ["Investissements (capex)", "Croissance des ventes", "Marges EBIT", "Taux d'actualisation"],
        correctIndex: 3,
        method: "Le taux d'actualisation intervient lors de l'actualisation, pas dans la projection du FCF.",
      },
    ],
  },
  {
    id: "3.35",
    theme: "dcf",
    section: S.FCF,
    title: "Durée typique de la période de projection",
    variants: [
      {
        kind: "choice",
        prompt: "Quelle est la durée typique de projection dans un DCF ?",
        options: ["3 ans", "5 ans", "10 ans", "20 ans"],
        correctIndex: 1,
        method: "5 ans est la durée standard.",
      },
    ],
  },
  {
    id: "3.36",
    theme: "dcf",
    section: S.FCF,
    title: "Quand projeter sur 15–20 ans ?",
    variants: [
      {
        kind: "choice",
        prompt: "Une projection sur 15 à 20 ans est appropriée pour une société avec :",
        options: [
          "Des revenus contractuels de long terme",
          "Une forte volatilité des revenus",
          "Un FCF négatif",
          "Une introduction en bourse récente",
        ],
        correctIndex: 0,
        method: "Les revenus contractuels de long terme (ex : utilities, infrastructure) justifient des projections allongées.",
      },
    ],
  },
  {
    id: "3.37",
    theme: "dcf",
    section: S.FCF,
    title: "Secteur susceptible d'une projection > 5 ans",
    variants: [
      {
        kind: "choice",
        prompt: "Quel secteur est le plus susceptible d'avoir une période de projection supérieure à 5 ans ?",
        options: ["Services aux collectivités", "Technologie", "Distribution", "Services financiers"],
        correctIndex: 0,
        method: "Les utilities ont des flux de revenus très prévisibles ou contractuels.",
      },
    ],
  },
  {
    id: "3.38",
    theme: "dcf",
    section: S.FCF,
    title: "Variables clés sensibilisées dans un DCF",
    variants: [
      {
        kind: "choice",
        prompt: `Quelles variables sont couramment sensibilisées dans un DCF ?

I. CMPC  II. Multiple de sortie  III. TRI  IV. Marges EBIT`,
        options: ["I et III", "II et III", "I, II et IV", "I, III et IV"],
        correctIndex: 2,
        method: "CMPC, multiple de sortie et marges EBIT. Autres : taux de croissance perpétuel et croissance des ventes.",
      },
    ],
  },
  {
    id: "3.39",
    theme: "dcf",
    section: S.FCF,
    title: "Sociétés à forte intensité capitalistique",
    variants: [
      {
        kind: "choice",
        prompt: `Lesquelles auraient des capex élevés ?

I. Mines  II. Équipement lourd  III. Distributeur mature  IV. Pétrole et gaz`,
        options: ["I, II et III", "I, II et IV", "I, III et IV", "I, II, III et IV"],
        correctIndex: 1,
        method: "Mines, équipement lourd et pétrole & gaz sont capitalistiques. Un distributeur mature ne l'est pas.",
      },
    ],
  },
  // --- BFR ---
  {
    id: "3.40",
    theme: "dcf",
    section: S.NWC,
    title: "Variation du besoin en fonds de roulement",
    variants: [
      {
        kind: "choice",
        prompt: `($ millions)          2018    2019
Créances clients      $325,0  $350,0
Stocks                 200,0   210,0
Charges constatées      35,0    45,0
Dettes fournisseurs    300,0   315,0
Charges à payer        150,0   160,0
Autres passifs courants 60,0    65,0

(Hausse)/Baisse du BFR entre 2018 et 2019 ?`,
        options: [
          "$10,0 millions",
          "($10,0) millions",
          "$15,0 millions",
          "($15,0) millions",
        ],
        correctIndex: 3,
        method:
          "BFR 2018 = 560 − 510 = $50. BFR 2019 = 605 − 540 = $65.\n(Hausse)/Baisse = 50 − 65 = ($15,0) millions. Une hausse du BFR est une consommation de trésorerie.",
      },
    ],
  },
  {
    id: "3.41",
    theme: "dcf",
    section: S.NWC,
    title: "Hausse des stocks — impact trésorerie",
    variants: [
      {
        kind: "choice",
        prompt: "Une hausse des stocks est :",
        options: ["Une consommation de trésorerie", "Une source de trésorerie", "Sans impact", "Une baisse des immobilisations"],
        correctIndex: 0,
        method: "Une hausse d'un actif courant (stocks) immobilise de la trésorerie → consommation.",
      },
    ],
  },
  {
    id: "3.42",
    theme: "dcf",
    section: S.NWC,
    title: "Hausse des dettes fournisseurs — impact trésorerie",
    variants: [
      {
        kind: "choice",
        prompt: "Une hausse des dettes fournisseurs est :",
        options: ["Une consommation de trésorerie", "Une source de trésorerie", "Sans impact", "Une hausse des immobilisations"],
        correctIndex: 1,
        method: "Une hausse d'un passif courant (fournisseurs) repousse les paiements → source de trésorerie.",
      },
    ],
  },
  // --- Ratios du cycle d'exploitation ---
  {
    id: "3.43",
    theme: "dcf",
    section: S.RATIOS,
    title: "Calcul du DSO (délai de recouvrement)",
    variants: [
      {
        kind: "choice",
        prompt: `CA : $3,5 milliards. Créances clients : $300 millions.\n\nDSO ?`,
        options: ["29 jours", "30 jours", "31 jours", "43 jours"],
        correctIndex: 2,
        method: "DSO = ($300 / $3 500) × 365 = 31 jours.",
      },
    ],
  },
  {
    id: "3.44",
    theme: "dcf",
    section: S.RATIOS,
    title: "Calcul du DIH (jours de stocks)",
    variants: [
      {
        kind: "choice",
        prompt: `CA : $3,5Mds. Coût des ventes : $2,4Mds. Stocks : $525m.\n\nDIH ?`,
        options: ["70 jours", "75 jours", "80 jours", "85 jours"],
        correctIndex: 2,
        method: "DIH = ($525 / $2 400) × 365 = 80 jours.",
      },
    ],
  },
  {
    id: "3.45",
    theme: "dcf",
    section: S.RATIOS,
    title: "Calcul de la rotation des stocks",
    variants: [
      {
        kind: "choice",
        prompt: `Coût des ventes : $2,4Mds. Stocks : $525m.\n\nRotation des stocks ?`,
        options: ["4,6x", "4,9x", "5,1x", "6,1x"],
        correctIndex: 0,
        method: "Rotation = $2 400 / $525 = 4,6x.",
      },
    ],
  },
  {
    id: "3.46",
    theme: "dcf",
    section: S.RATIOS,
    title: "Calcul du DPO (délai de paiement fournisseurs)",
    variants: [
      {
        kind: "choice",
        prompt: `CA : $4,3Mds. Coût des ventes : $3,3Mds. Dettes fournisseurs : $250m.\n\nDPO ?`,
        options: ["28 jours", "30 jours", "32 jours", "33 jours"],
        correctIndex: 0,
        method: "DPO = ($250 / $3 300) × 365 = 28 jours.",
      },
    ],
  },
  // --- Synthèse ---
  {
    id: "3.47",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Difficultés de projection pour les sociétés cycliques",
    variants: [
      {
        kind: "open",
        prompt: "Quelles sont les difficultés de projection du FCF pour les sociétés cycliques ?",
        method:
          "Les ventes doivent suivre les mouvements du cycle des matières premières sous-jacentes, avec des tendances volatiles et des variations pic-creux significatives selon le point du cycle au début de la projection.",
        answerLabel: "Ventes volatiles liées aux cycles des matières premières, sensibilité pic-creux",
      },
    ],
  },
  {
    id: "3.48",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "FCF de l'année terminale pour les sociétés cycliques",
    variants: [
      {
        kind: "open",
        prompt: "Quelles précautions prendre pour le FCF de l'année terminale d'une société cyclique ?",
        method:
          "La performance de l'année terminale doit refléter un niveau normalisé, pas un pic ou creux cyclique. Sinon, la VT — qui représente souvent une part substantielle de la valeur DCF — sera faussée.",
        answerLabel: "Doit être normalisé, pas un pic ou un creux cyclique",
      },
    ],
  },
  {
    id: "3.49",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "L'amortissement dans les trois états financiers",
    variants: [
      {
        kind: "open",
        prompt: "Comment l'amortissement est-il reflété dans (a) le compte de résultat, (b) le tableau de flux, (c) le bilan ?",
        method:
          "(a) Généralement inclus dans le coût des ventes, parfois en ligne séparée. (b) Réintégré au résultat net dans les flux d'exploitation. (c) Soustrait du solde d'immobilisations en début de période.",
        answerLabel: "Dans le coût des ventes / réintégré en flux / réduit les immobilisations",
      },
    ],
  },
  {
    id: "3.50",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Hausse du CMPC → impact sur la VE",
    variants: [
      {
        kind: "open",
        prompt: "Toutes choses égales, si le CMPC augmente, la valeur d'entreprise augmente-t-elle ou diminue-t-elle ? Pourquoi ?",
        method:
          "La VE diminue. Un CMPC plus élevé signifie que les flux futurs et la VT sont actualisés avec un dénominateur plus grand, réduisant leur valeur actuelle.",
        answerLabel: "Diminue — un taux d'actualisation plus élevé réduit la VA de tous les flux futurs",
      },
    ],
  },
  {
    id: "3.51",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Impact d'une prime de risque de 5 % vs 8 %",
    variants: [
      {
        kind: "open",
        prompt: "Quel est l'impact sur la valorisation d'utiliser une prime de risque de marché de 5,0 % plutôt que 8,0 % ?",
        method:
          "Utiliser 5,0 % donne une valorisation plus élevée. Une prime plus basse → coût des fonds propres plus bas → CMPC plus bas → valeurs actuelles plus élevées.",
        answerLabel: "5 % → valorisation plus élevée (taux d'actualisation plus bas)",
      },
    ],
  },
  {
    id: "3.52",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Avantages de l'analyse DCF",
    variants: [
      {
        kind: "open",
        prompt: "Quels sont les avantages de l'analyse DCF ?",
        method:
          "Fondée sur les flux (plus fondamentale que les multiples), indépendante du marché (isolée des bulles et de la détresse), autonome (pas besoin de comparables), flexible (permet de tester plusieurs scénarios).",
        answerLabel: "Fondée sur les flux, indépendante du marché, autonome, flexible",
      },
    ],
  },
  {
    id: "3.53",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Limites de l'analyse DCF",
    variants: [
      {
        kind: "open",
        prompt: "Quelles sont les limites de l'analyse DCF ?",
        method:
          "Dépendance aux projections (difficile de prévoir avec précision), sensibilité aux hypothèses (petites variations → gros écarts), domination de la VT (75 %+ de la valeur totale possible), suppose une structure de capital constante.",
        answerLabel: "Dépendance aux projections, sensibilité, domination de la VT, structure de capital constante",
      },
    ],
  },
  {
    id: "3.54",
    theme: "dcf",
    section: S.SYNTHESIS,
    title: "Faiblesse du DCF",
    variants: [
      {
        kind: "choice",
        prompt: "Laquelle est considérée comme une faiblesse du DCF ?",
        options: [
          "Indépendance vis-à-vis du marché",
          "La valeur terminale représente une part importante de la valorisation",
          "Permet de tester plusieurs scénarios",
          "Faible dépendance aux comparables",
        ],
        correctIndex: 1,
        method:
          "La valeur terminale est une faiblesse potentielle : très sensible aux hypothèses et pouvant représenter 75 %+ de la valorisation DCF totale.",
      },
    ],
  },
];
