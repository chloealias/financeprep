import type { Exercise } from "@/data/exercise-types";

const KESTREL_CASE = `Kestrel Industrial. Cours de l'action : $30,00. Actions de base : 92,0 millions.

Options / warrants :
A — 4,00m d'actions, prix d'exercice $10,00
B — 2,00m d'actions, prix d'exercice $15,00
C — 1,00m d'actions, prix d'exercice $20,00
D — 1,00m d'actions, prix d'exercice $45,00`;

const KESTREL_LTM = `Kestrel Industrial — extraits du compte de résultat ($ millions) :

                    FY 2023A   Stub 30/09/2023   Stub 30/09/2024   LTM 30/09/2024
Marge brute         1 100        800               960               1 260
EBIT                  500        300               320                 520
D&A                   160        120               120                 160
Résultat net          250        125               160                 285
Taux marginal d'impôt 25 %

Éléments non récurrents (avant impôt) :
- $40m de gain sur cession d'un entrepôt en FY 2023
- $40m de dépréciation de stocks dans le stub courant (dans le coût des ventes)
- $20m de charge de restructuration (licenciements) dans le stub courant`;

const S = {
  TSM: "Cas Kestrel — Dilution TSM",
  EV: "Equity Value & Enterprise Value",
  LTM: "Retraitements LTM",
  PROCESS: "Processus & méthodologie",
  CONVERT: "Convertibles & méthodes de dilution",
  VALO: "Valorisation implicite",
  STRUCTURE: "Structure de capital & EV",
  CULTURE: "Culture générale & entretien",
  RATIOS: "Ratios & calendarisation",
  MULTIPLES: "Multiples de trading",
};

export const comparableCompaniesExercises: Exercise[] = [
  {
    id: "1.1",
    theme: "comparable-companies",
    section: S.TSM,
    title: "Kestrel — options dans la monnaie",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}\n\nCombien d'options/warrants sont dans la monnaie (in-the-money) ?`,
        unitHint: "Millions d'actions",
        check: { mode: "exact", accept: [7] },
        method:
          "Dans la monnaie si prix d'exercice < $30. Tranches A, B et C. D à $45 est hors de la monnaie.\n4,00 + 2,00 + 1,00 = 7,00 millions.",
        answerLabel: "7,00 millions",
      },
    ],
  },
  {
    id: "1.2",
    theme: "comparable-companies",
    section: S.TSM,
    title: "Kestrel — produits d'exercice",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}\n\nQuels produits en cash proviennent de l'exercice des options/warrants dans la monnaie ?`,
        unitHint: "Millions de dollars, sans séparateur (ex. 50)",
        check: { mode: "exact", accept: [90] },
        method:
          "(4,00m × $10) + (2,00m × $15) + (1,00m × $20) = 40 + 30 + 20 = $90 millions.",
        answerLabel: "$90 millions",
      },
    ],
  },
  {
    id: "1.3",
    theme: "comparable-companies",
    section: S.TSM,
    title: "Kestrel — actions nettes (TSM)",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}\n\nSelon la méthode du rachat d'actions (TSM), combien d'actions nettes nouvelles créent les options/warrants ?`,
        unitHint: "Millions d'actions",
        check: { mode: "exact", accept: [4] },
        method:
          "Actions dans la monnaie = 7,00m. Produits = $90m, utilisés pour racheter au cours de $30 → 90 / 30 = 3,00m.\nActions nettes = 7,00 − 3,00 = 4,00 millions.",
        answerLabel: "4,00 millions",
      },
    ],
  },
  {
    id: "1.4",
    theme: "comparable-companies",
    section: S.TSM,
    title: "Kestrel — nombre d'actions dilué",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}\n\nQuel est le nombre d'actions totalement dilué (TSM) ?`,
        unitHint: "Millions d'actions",
        check: { mode: "exact", accept: [96] },
        method: "92,0 de base + 4,0 actions nettes = 96,0 millions.",
        answerLabel: "96,0 millions",
      },
    ],
  },
  {
    id: "1.5",
    theme: "comparable-companies",
    section: S.EV,
    title: "Kestrel — valeur des capitaux propres",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}

Nombre d'actions dilué (TSM) = 96,0 millions.
Plus haut 52 semaines $41,00 / plus bas $22,00. Dernier dividende trimestriel $0,40.

Cours actuel $30,00. Dette totale $1 200,0m. Trésorerie $80,0m. Pas d'actions préférentielles, pas d'intérêts minoritaires.

Quelle est la valeur des capitaux propres (equity value) ?`,
        unitHint: "Millions de dollars, sans séparateur (ex. 1000)",
        check: { mode: "exact", accept: [2880] },
        method:
          "Valeur des capitaux propres = actions diluées × cours actuel = 96,0 × $30 = $2 880 millions.\nNe pas utiliser le plus haut/bas 52 semaines ni le dividende.",
        answerLabel: "$2 880 millions",
      },
    ],
  },
  {
    id: "1.6",
    theme: "comparable-companies",
    section: S.EV,
    title: "Kestrel — valeur d'entreprise",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_CASE}

Actions diluées = 96,0 millions. Valeur des capitaux propres = $2 880 millions.
Dette totale $1 200,0m. Trésorerie $80,0m. Actions préférentielles et intérêts minoritaires nuls.

Quelle est la valeur d'entreprise (enterprise value) ?`,
        unitHint: "Millions de dollars, sans séparateur (ex. 2000)",
        check: { mode: "exact", accept: [4000] },
        method:
          "VE = capitaux propres + dette + préférentielles + minoritaires − trésorerie = 2 880 + 1 200 + 0 + 0 − 80 = $4 000 millions.",
        answerLabel: "$4 000 millions",
      },
    ],
  },
  {
    id: "1.7",
    theme: "comparable-companies",
    section: S.LTM,
    title: "Kestrel — marge brute LTM ajustée",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_LTM}

Calculez la marge brute LTM ajustée. Réintégrez la dépréciation de stocks dans le coût des ventes (donc dans la marge brute).`,
        unitHint: "Millions de dollars, sans séparateur (ex. 500)",
        check: { mode: "exact", accept: [1300] },
        method:
          "Stub courant marge brute 960 + 40 de stocks = 1 000.\nLTM = FY + stub courant − stub antérieur = 1 100 + 1 000 − 800 = $1 300 millions.\nLe gain sur entrepôt et la restructuration sont sous la marge brute — on ne les touche pas ici.",
        answerLabel: "$1 300 millions",
      },
    ],
  },
  {
    id: "1.8",
    theme: "comparable-companies",
    section: S.LTM,
    title: "Kestrel — EBIT LTM ajusté",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_LTM}

Calculez l'EBIT LTM ajusté.`,
        unitHint: "Millions de dollars, sans séparateur (ex. 150)",
        check: { mode: "exact", accept: [540] },
        method:
          "FY EBIT : retirer le gain de $40 → 500 − 40 = 460.\nStub courant : réintégrer stocks $40 et restructuration $20 → 320 + 40 + 20 = 380.\nLTM = 460 + 380 − 300 = $540 millions.\nChaque item va dans la période où il a réellement frappé.",
        answerLabel: "$540 millions",
      },
    ],
  },
  {
    id: "1.9",
    theme: "comparable-companies",
    section: S.LTM,
    title: "Kestrel — EBITDA LTM ajusté",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_LTM}

L'EBIT LTM ajusté vaut $540 millions. Calculez l'EBITDA LTM ajusté.`,
        unitHint: "Millions de dollars, sans séparateur (ex. 400)",
        check: { mode: "exact", accept: [700] },
        method: "EBIT LTM ajusté + D&A LTM = 540 + 160 = $700 millions.",
        answerLabel: "$700 millions",
      },
    ],
  },
  {
    id: "1.10",
    theme: "comparable-companies",
    section: S.LTM,
    title: "Kestrel — résultat net LTM ajusté",
    variants: [
      {
        kind: "numeric",
        prompt: `${KESTREL_LTM}

Calculez le résultat net LTM ajusté. Fiscalisez les retraitements à 25 %.`,
        unitHint: "Millions de dollars, sans séparateur (ex. 150)",
        check: { mode: "exact", accept: [300] },
        method:
          "Gain après impôt = 40 × (1 − 0,25) = 30 → RN FY 250 − 30 = 220.\nStocks après impôt = 30 ; restructuration après impôt = 15 → RN stub courant 160 + 30 + 15 = 205.\nLTM = 220 + 205 − 125 = $300 millions.\nOn fiscalise uniquement le résultat net — jamais l'EBIT/EBITDA.",
        answerLabel: "$300 millions",
      },
    ],
  },
  {
    id: "1.11",
    theme: "comparable-companies",
    section: S.PROCESS,
    title: "Ordre des étapes d'une analyse de comparables",
    variants: [
      {
        kind: "choice",
        prompt: `Quel enchaînement termine une analyse de sociétés comparables ?

I. Calculer stats, ratios et multiples de trading
II. Choisir l'univers de pairs
III. Conclure sur la valorisation
IV. Collecter les documents réglementaires et données de marché
V. Comparer les pairs entre eux`,
        options: [
          "II, IV, I, V, III",
          "IV, II, I, III, V",
          "II, IV, I, III, V",
          "I, II, III, V, IV",
        ],
        correctIndex: 0,
        method:
          "D'abord l'univers, puis les données, puis le spread, puis la comparaison, puis la valeur. Sauter l'univers ou valoriser avant la comparaison est l'erreur d'entretien classique.",
      },
    ],
  },
  {
    id: "1.12",
    theme: "comparable-companies",
    section: S.EV,
    title: "Calcul de la valeur des capitaux propres et de la valeur d'entreprise",
    variants: [
      {
        kind: "choice",
        prompt: `Cours $18,00. Actions diluées 40,0 millions. Dette totale $180,0m. Actions préférentielles $20,0m. Intérêts minoritaires $10,0m. Trésorerie $40,0m.

Valeur des capitaux propres puis valeur d'entreprise ?`,
        options: [
          "$720 millions ; $890 millions",
          "$720 millions ; $970 millions",
          "$720 millions ; $850 millions",
          "$800 millions ; $890 millions",
        ],
        correctIndex: 0,
        method:
          "Capitaux propres = 18 × 40 = $720m.\nVE = 720 + 180 + 20 + 10 − 40 = $890m.\nOublier les préférentielles ou les minoritaires, ou ajouter la trésorerie, donne les pièges.",
      },
    ],
  },
  {
    id: "1.13",
    theme: "comparable-companies",
    section: S.CONVERT,
    title: "Actions incrémentales — méthode if-converted",
    variants: [
      {
        kind: "choice",
        prompt: `Cours $40,00. Obligations convertibles $200,0 millions en circulation. Prix de conversion $25,00.

Combien d'actions incrémentales avec la méthode if-converted ?`,
        options: ["2,0 millions", "3,0 millions", "5,0 millions", "8,0 millions"],
        correctIndex: 3,
        method:
          "If-converted : toute l'émission se convertit. 200 / 25 = 8,0 millions d'actions. Pas de rachat, pas d'ajustement.",
      },
    ],
  },
  {
    id: "1.14",
    theme: "comparable-companies",
    section: S.CONVERT,
    title: "Actions incrémentales — méthode du règlement net",
    variants: [
      {
        kind: "choice",
        prompt: `Cours $40,00. Obligations convertibles $200,0 millions en circulation. Prix de conversion $25,00.

Combien d'actions incrémentales avec la méthode du règlement net (NSS) ?`,
        options: ["2,0 millions", "3,0 millions", "5,0 millions", "8,0 millions"],
        correctIndex: 1,
        method:
          "Actions sous-jacentes = 200 / 25 = 8,0m. Valeur de conversion = 8,0 × $40 = $320m.\nExcédent au-dessus du nominal = 320 − 200 = $120m. Actions NSS = 120 / 40 = 3,0 millions.\nLe NSS ne compte que l'excédent, donc moins dilutif que l'if-converted.",
      },
    ],
  },
  {
    id: "1.15",
    theme: "comparable-companies",
    section: S.VALO,
    title: "Valorisation implicite via EBITDA LTM",
    variants: [
      {
        kind: "open",
        prompt: `EBITDA LTM $480 millions. Fourchette VE/EBITDA des pairs 6,5x–7,5x. Dette nette $900 millions. Actions diluées 60,0 millions.

Donnez les fourchettes de VE, de valeur des capitaux propres et de cours.`,
        method:
          "VE = 480 × 6,5x–7,5x = $3 120m–$3 600m.\nCapitaux propres = VE − dette nette = $2 220m–$2 700m.\nCours = capitaux propres / 60 = $37,00–$45,00.\nL'EBITDA est un agrégat pré-intérêts : on part de la VE, puis on retire la dette nette.",
        answerLabel: "VE $3 120–$3 600m ; capitaux propres $2 220–$2 700m ; $37,00–$45,00",
      },
    ],
  },
  {
    id: "1.16",
    theme: "comparable-companies",
    section: S.VALO,
    title: "Valorisation implicite via résultat net LTM",
    variants: [
      {
        kind: "open",
        prompt: `Résultat net LTM $180 millions. Fourchette PER des pairs 12,0x–14,0x. Actions diluées 60,0 millions.

Donnez les fourchettes de valeur des capitaux propres et de cours.`,
        method:
          "Le PER est un multiple de capitaux propres : 180 × 12x–14x = $2 160m–$2 520m. Pas de pont VE.\nCours = 2 160 / 60 à 2 520 / 60 = $36,00–$42,00.",
        answerLabel: "Capitaux propres $2 160–$2 520m ; $36,00–$42,00",
      },
    ],
  },
  {
    id: "1.17",
    theme: "comparable-companies",
    section: S.STRUCTURE,
    title: "Émission d'actions pour rembourser la dette",
    variants: [
      {
        kind: "choice",
        prompt:
          "Une société émet des actions nouvelles et utilise 100 % du produit pour rembourser de la dette. Toutes choses égales, que devient la valeur d'entreprise ?",
        options: [
          "Elle est inchangée",
          "Elle augmente",
          "Elle diminue",
          "Impossible à dire sans le CMPC",
        ],
        correctIndex: 0,
        method:
          "La VE est indépendante de la structure de capital. Les capitaux propres montent du cash levé ; la dette baisse du même montant. Les deux jambes s'annulent dans le pont VE.",
      },
    ],
  },
  {
    id: "1.18",
    theme: "comparable-companies",
    section: S.STRUCTURE,
    title: "Pont VE pro forma après remboursement",
    variants: [
      {
        kind: "open",
        prompt: `Actuel : capitaux propres $800m, dette totale $500m, préférentielles $50m, minoritaires $25m, trésorerie $75m.

La société émet $150m d'actions et rembourse de la dette avec le produit.

Montrez le pont VE pro forma.`,
        method:
          "VE actuelle = 800 + 500 + 50 + 25 − 75 = $1 300m.\nPro forma : capitaux propres 950, dette 350 ; préférentielles, minoritaires et trésorerie inchangés.\nVE pro forma = 950 + 350 + 50 + 25 − 75 = $1 300m. Somme nulle sur la VE.",
        answerLabel: "VE pro forma toujours $1 300 millions",
      },
    ],
  },
  {
    id: "1.19",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Activités similaires, multiples différents",
    variants: [
      {
        kind: "open",
        prompt:
          "Deux pairs se ressemblent opérationnellement mais se paient à des multiples très différents. Quelles différences financières peuvent l'expliquer ?",
        method:
          "Le multiple plus élevé va souvent avec de meilleures marges, une croissance attendue plus forte ou un levier plus bas. Le nom moins cher peut avoir manqué ses chiffres, changé de direction, perdu un client clé, ou porter un élément exceptionnel que le marché n'a pas retraité.",
        answerLabel: "Croissance, marges, levier, ou un événement spécifique",
      },
    ],
  },
  {
    id: "1.20",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Levier et multiple de valorisation",
    variants: [
      {
        kind: "open",
        prompt:
          "Toutes choses égales, quelle société devrait se payer plus cher : une société très endettée, ou une société à levier modéré ? Pourquoi ?",
        method:
          "Levier modéré. Moins de risque de défaut, et encore de la capacité à financer croissance organique et acquisitions. Un endettement élevé réduit cette flexibilité et augmente le rendement exigé.",
        answerLabel: "La société à levier modéré",
      },
    ],
  },
  {
    id: "1.21",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Formulaires réglementaires SEC",
    variants: [
      {
        kind: "open",
        prompt: "À quoi correspondent les formulaires SEC 10-K, 10-Q, 8-K et DEF 14A ?",
        method:
          "10-K : rapport annuel. 10-Q : rapport trimestriel. 8-K : rapport sur événement significatif. DEF 14A : circulaire de procuration (proxy statement).",
        answerLabel: "Annuel / trimestriel / événement significatif / procuration",
      },
    ],
  },
  {
    id: "1.22",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Multiples sectoriels",
    variants: [
      {
        kind: "open",
        prompt:
          "Quels secteurs utilisent typiquement VE/réserves, VE/EBITDAR, VE/abonné et cours/actif net ?",
        method:
          "VE/réserves — mines et métaux. VE/EBITDAR — distribution (réintégration des loyers). VE/abonné — médias/télécoms. Cours/actif net — banques et institutions financières.",
        answerLabel: "Mines / distribution / médias / financières",
      },
    ],
  },
  {
    id: "1.23",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Pourquoi utiliser les comparables",
    variants: [
      {
        kind: "open",
        prompt: "Donnez quatre raisons pour lesquelles on utilise l'analyse de sociétés comparables.",
        method:
          "Fondée sur le marché (intègre croissance, risque et sentiment), relative (facile à comparer entre pairs), rapide (peu de données nécessaires), et actuelle (les cours bougent chaque jour).",
        answerLabel: "Fondée sur le marché, relative, rapide, actuelle",
      },
    ],
  },
  {
    id: "1.24",
    theme: "comparable-companies",
    section: S.CULTURE,
    title: "Limites de l'analyse de comparables",
    variants: [
      {
        kind: "open",
        prompt: "Donnez quatre limites de l'analyse de sociétés comparables.",
        method:
          "Le marché peut se tromper (bulles ou paniques). Les vrais pairs peuvent être absents. Le cours peut diverger de la valorisation par les flux (DCF). Les comparables ne capturent pas les forces, faiblesses et dynamiques propres à la cible.",
        answerLabel: "Sentiment, absence de pairs, divergence vs DCF, spécificités de la cible",
      },
    ],
  },
  {
    id: "1.25",
    theme: "comparable-companies",
    section: S.CONVERT,
    title: "Nombre d'actions totalement dilué — composition",
    variants: [
      {
        kind: "choice",
        prompt: "Pour les comparables de trading, le nombre d'actions totalement dilué comprend :",
        options: [
          "Options hors de la monnaie + convertibles dans la monnaie",
          "Actions de base + options/warrants dans la monnaie + convertibles dans la monnaie",
          "Options/warrants dans la monnaie + convertibles dans la monnaie uniquement",
          "Actions de base + options/warrants hors de la monnaie",
        ],
        correctIndex: 1,
        method:
          "On part des actions de base, puis on ajoute uniquement les options/warrants dans la monnaie (TSM) et les convertibles dans la monnaie. Le papier hors de la monnaie est ignoré.",
      },
    ],
  },
  {
    id: "1.26",
    theme: "comparable-companies",
    section: S.CONVERT,
    title: "Méthode de dilution des options",
    variants: [
      {
        kind: "choice",
        prompt:
          "Quelle méthode transforme les options et warrants dans la monnaie en actions incrémentales ?",
        options: [
          "Méthode du rachat d'actions (TSM)",
          "Méthode if-converted",
          "Méthode du règlement net (NSS)",
          "Méthode « dans la monnaie »",
        ],
        correctIndex: 0,
        method:
          "TSM : on suppose l'exercice, puis on rachète des actions au cours actuel avec les produits. If-converted et NSS concernent les convertibles, pas les options classiques.",
      },
    ],
  },
  {
    id: "1.27",
    theme: "comparable-companies",
    section: S.EV,
    title: "Formule de la valeur d'entreprise",
    variants: [
      {
        kind: "choice",
        prompt: "Quelle formule correspond au pont standard de la valeur d'entreprise ?",
        options: [
          "Capitaux propres + dette totale",
          "Capitaux propres + dette totale + préférentielles + minoritaires − trésorerie",
          "Capitaux propres + dette totale − préférentielles − minoritaires − trésorerie",
          "Capitaux propres + dette totale + préférentielles + minoritaires + trésorerie",
        ],
        correctIndex: 1,
        method:
          "VE = capitaux propres + dette totale + actions préférentielles + intérêts minoritaires − trésorerie. Les préférentielles et les minoritaires sont des créances hors capitaux propres ordinaires ; la trésorerie est excédentaire.",
      },
    ],
  },
  {
    id: "1.28",
    theme: "comparable-companies",
    section: S.EV,
    title: "Dette nette quand la VE est inférieure aux capitaux propres",
    variants: [
      {
        kind: "choice",
        prompt:
          "La valeur d'entreprise vaut $800 millions et les capitaux propres $950 millions. Quelle est la dette nette ?",
        options: ["$150 millions", "($150) millions", "$200 millions", "($200) millions"],
        correctIndex: 1,
        method:
          "Dette nette = VE − capitaux propres = 800 − 950 = −$150 millions.\nUne dette nette négative signifie une trésorerie nette positive : la VE peut être inférieure aux capitaux propres.",
      },
    ],
  },
  {
    id: "1.29",
    theme: "comparable-companies",
    section: S.RATIOS,
    title: "Rendement du capital investi (ROIC)",
    variants: [
      {
        kind: "choice",
        prompt: `EBIT $180,0m. Dette nette $320,0m. Capitaux propres $580,0m. Dettes fournisseurs $40,0m. Créances clients $55,0m.

ROIC ?`,
        options: ["18,0 %", "20,0 %", "22,5 %", "25,0 %"],
        correctIndex: 1,
        method:
          "ROIC = EBIT / (dette nette + capitaux propres) = 180 / (320 + 580) = 180 / 900 = 20,0 %.\nLes dettes fournisseurs et créances clients relèvent du BFR, pas du capital investi ici. Le ROIC est avant intérêts ; le ROE non.",
      },
    ],
  },
  {
    id: "1.30",
    theme: "comparable-companies",
    section: S.RATIOS,
    title: "Deux TCAM (CAGR)",
    variants: [
      {
        kind: "choice",
        prompt: `BPA dilué : 2016R $1,00 — 2018R $1,21 — 2020E $1,411.

TCAM 2016–2018 et 2018–2020 ?`,
        options: [
          "10,0 % et 8,0 %",
          "21,0 % et 16,6 %",
          "(10,0 %) et (8,0 %)",
          "10,5 % et 8,5 %",
        ],
        correctIndex: 0,
        method:
          "TCAM = (fin / début)^(1 / nb d'années) − 1. Fenêtres de deux ans.\n2016–2018 : (1,21 / 1,00)^(1/2) − 1 = 10,0 %.\n2018–2020 : (1,411 / 1,21)^(1/2) − 1 = 8,0 %.\nNe pas diviser la variation totale par deux — ce n'est pas un TCAM.",
      },
    ],
  },
  {
    id: "1.31",
    theme: "comparable-companies",
    section: S.RATIOS,
    title: "Chiffre d'affaires LTM à partir des stubs",
    variants: [
      {
        kind: "choice",
        prompt: `CA FY 2023 $1 800,0m. CA cumulé au 30/09/2024 $1 200,0m. CA cumulé au 30/09/2023 $1 050,0m.

CA LTM au 30/09/2024 ?`,
        options: [
          "$1 650,0 millions",
          "$1 950,0 millions",
          "$2 050,0 millions",
          "$3 000,0 millions",
        ],
        correctIndex: 1,
        method:
          "LTM = dernier FY + stub courant − stub antérieur = 1 800 + 1 200 − 1 050 = $1 950 millions.",
      },
    ],
  },
  {
    id: "1.32",
    theme: "comparable-companies",
    section: S.MULTIPLES,
    title: "Équivalence du PER",
    variants: [
      {
        kind: "choice",
        prompt: "Le PER (cours / bénéfice) est équivalent à :",
        options: [
          "Capitaux propres / résultat net",
          "Valeur d'entreprise / résultat net",
          "Valeur d'entreprise / EBITDA",
          "Cours / flux de trésorerie disponible",
        ],
        correctIndex: 0,
        method:
          "Le résultat net est après intérêts, donc il s'apparie avec les capitaux propres (ou cours / BPA). Croiser la VE et le résultat net mélange des métriques levered et unlevered.",
      },
    ],
  },
  {
    id: "1.33",
    theme: "comparable-companies",
    section: S.MULTIPLES,
    title: "Les deux multiples de trading incontournables",
    variants: [
      {
        kind: "choice",
        prompt: `Les deux multiples de valorisation les plus répandus en analyse de comparables sont :

I. VE / EBITDA
II. EBITDA / intérêts
III. Dette totale / EBITDA
IV. PER`,
        options: ["I et III", "I et IV", "II et III", "II et IV"],
        correctIndex: 1,
        method:
          "VE/EBITDA (multiple pré-intérêts) et PER (multiple post-intérêts) forment le duo standard. La couverture d'intérêts et le levier sont des ratios de crédit, pas des multiples de valorisation.",
      },
    ],
  },
];
