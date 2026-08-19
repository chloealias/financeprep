import type { Exercise } from "@/data/exercise-types";

const S = {
  ROSENBAUM: "Cas Rosenbaum Industries — Exercice multi-étapes",
  EXCHANGE: "Ratio d'échange — Fixe vs Flottant",
  PREMIUM: "Analyse des primes payées",
  SYNERGIES: "Synergies",
  FRAMEWORK: "Cadre & faiblesses",
  BENEFITS: "Avantages & limites",
  MINI_CASE: "Mini-cas — TSM dans une transaction",
  SCREENING: "Recherche & sourcing",
};

const ROSENBAUM_TSM = `Rosenbaum Industries (cible). Pearl Corp. (acquéreur).

| Hypothèses | |
|---|---|
| Prix d'offre par action | $20,00 |
| Actions de base en circulation | 123,00m |

| Options/Warrants | Nombre d'actions | Prix d'exercice |
|---|---|---|
| Tranche 1 | 1,500m | $5,00 |
| Tranche 2 | 1,250m | $10,00 |
| Tranche 3 | 1,000m | $15,00 |`;

const ROSENBAUM_LTM = `Rosenbaum Industries — extraits du compte de résultat ($ millions) :

| | 2018R | Stub 30/09/2018 | Stub 30/09/2019 | LTM 30/09/2019 |
|---|---|---|---|---|
| Marge brute | $725,0 | $543,8 | $587,3 | $768,5 |
| EBIT | $275,0 | $206,3 | $222,8 | $291,5 |
| D&A | 100,0 | 75,0 | 82,0 | 107,0 |
| Résultat net | $131,3 | $98,4 | $110,8 | $143,6 |
| Taux marginal d'impôt | 25,0 % |

Élément non récurrent : $25,0m de règlement de litige (avant impôt), comptabilisé au T4 2018.`;

const MINI_CASE_DATA = `| Hypothèses | |
|---|---|
| Prix d'offre par action | $15,00 |
| Cours de l'acquéreur | $30,00 |
| Cours non affecté de la cible | $12,50 |
| Actions de base de la cible | 250,0m |
| Options en circulation | 10,0m |
| Prix d'exercice | $10,00 |
| CA LTM de la cible | $4 500,0m |
| EBITDA LTM de la cible | $650,0m |
| Dette nette de la cible | $1 000,0m |`;

export const precedentTransactionsExercises: Exercise[] = [
  // --- Cas Rosenbaum multi-étapes ---
  {
    id: "2.1a",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — options dans la monnaie",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_TSM}\n\nCalculez le nombre d'options/warrants dans la monnaie de Rosenbaum Industries.`,
        unitHint: "Millions d'actions",
        check: { mode: "exact", accept: [3.75] },
        method:
          "Les trois tranches ont un prix d'exercice inférieur au prix d'offre de $20,00, elles sont donc toutes dans la monnaie.\n1,500 + 1,250 + 1,000 = 3,75 millions.",
        answerLabel: "3,75 millions",
      },
    ],
  },
  {
    id: "2.1b",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — produits d'exercice",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_TSM}\n\nCalculez les produits totaux des options/warrants dans la monnaie.`,
        unitHint: "Millions de dollars (ex. 50)",
        check: { mode: "exact", accept: [35] },
        method:
          "(1,500 × $5) + (1,250 × $10) + (1,000 × $15) = 7,5 + 12,5 + 15,0 = $35,0 millions.",
        answerLabel: "$35,0 millions",
      },
    ],
  },
  {
    id: "2.1c",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — actions nettes (TSM)",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_TSM}\n\nOptions dans la monnaie = 3,75m. Produits = $35,0m.\n\nCalculez les actions nettes nouvelles selon la méthode du rachat d'actions (TSM).`,
        unitHint: "Millions d'actions",
        check: { mode: "exact", accept: [2] },
        method:
          "Actions rachetées = $35,0m / $20,00 = 1,750m.\nActions nettes = 3,750 − 1,750 = 2,00 millions.",
        answerLabel: "2,00 millions",
      },
    ],
  },
  {
    id: "2.1d",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — nombre d'actions dilué",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_TSM}\n\nActions nettes = 2,00m.\n\nCalculez le nombre d'actions totalement dilué.`,
        unitHint: "Millions d'actions",
        check: { mode: "exact", accept: [125] },
        method: "123,0 + 2,00 = 125,0 millions.",
        answerLabel: "125,0 millions",
      },
    ],
  },
  {
    id: "2.2a",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — valeur des capitaux propres",
    variants: [
      {
        kind: "numeric",
        prompt: `Rosenbaum Industries. Prix d'offre $20,00. Actions diluées = 125,0m. Dette totale $1 375,0m. Trésorerie $50,0m.\n\nCalculez la valeur des capitaux propres (equity value).`,
        unitHint: "Millions de dollars (ex. 1000)",
        check: { mode: "exact", accept: [2500] },
        method:
          "Capitaux propres = actions diluées × prix d'offre = 125,0 × $20,00 = $2 500,0 millions.\nDifférence clé vs comparables boursiers : on utilise le prix d'offre, pas le cours de marché.",
        answerLabel: "$2 500,0 millions",
      },
    ],
  },
  {
    id: "2.2b",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — valeur d'entreprise",
    variants: [
      {
        kind: "numeric",
        prompt: `Rosenbaum Industries. Capitaux propres $2 500,0m. Dette totale $1 375,0m. Trésorerie $50,0m.\n\nCalculez la valeur d'entreprise.`,
        unitHint: "Millions de dollars (ex. 2000)",
        check: { mode: "exact", accept: [3825] },
        method:
          "VE = capitaux propres + dette − trésorerie = 2 500 + 1 375 − 50 = $3 825,0 millions.",
        answerLabel: "$3 825,0 millions",
      },
    ],
  },
  {
    id: "2.3a",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — marge brute LTM ajustée",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_LTM}\n\nCalculez la marge brute LTM ajustée, sachant que le règlement de litige de $25,0m n'est PAS dans le coût des ventes.`,
        unitHint: "Millions de dollars (ex. 500.0)",
        check: { mode: "exact", accept: [768.5] },
        method:
          "Le règlement de litige n'affecte pas le coût des ventes — la marge brute ajustée est identique à la marge brute reportée : $768,5 millions.",
        answerLabel: "$768,5 millions",
      },
    ],
  },
  {
    id: "2.3b",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — EBIT LTM ajusté",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_LTM}\n\nCalculez l'EBIT LTM ajusté, sachant que le règlement de litige de $25,0m était inclus dans l'EBIT reporté.`,
        unitHint: "Millions de dollars (ex. 200.0)",
        check: { mode: "exact", accept: [316.5] },
        method:
          "On réintègre $25,0m dans le FY 2018R : 275,0 + 25,0 = 300,0.\nLTM = 300,0 + 222,8 − 206,3 = $316,5 millions.",
        answerLabel: "$316,5 millions",
      },
    ],
  },
  {
    id: "2.3c",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — EBITDA LTM ajusté",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_LTM}\n\nEBIT LTM ajusté = $316,5m.\n\nCalculez l'EBITDA LTM ajusté.`,
        unitHint: "Millions de dollars (ex. 300.0)",
        check: { mode: "exact", accept: [423.5] },
        method: "EBIT LTM ajusté + D&A LTM = 316,5 + 107,0 = $423,5 millions.",
        answerLabel: "$423,5 millions",
      },
    ],
  },
  {
    id: "2.3d",
    theme: "precedent-transactions",
    section: S.ROSENBAUM,
    title: "Rosenbaum — résultat net LTM ajusté",
    variants: [
      {
        kind: "numeric",
        prompt: `${ROSENBAUM_LTM}\n\nCalculez le résultat net LTM ajusté (fiscalisez à 25 %).`,
        unitHint: "Millions de dollars (ex. 100.0)",
        check: { mode: "exact", accept: [162.4] },
        method:
          "Réintégration après impôt = 25,0 × (1 − 0,25) = 18,75. RN FY ajusté = 131,3 + 18,75 ≈ 150,0.\nLTM = 150,0 + 110,8 − 98,4 = $162,4 millions.",
        answerLabel: "$162,4 millions",
      },
    ],
  },
  // --- Ratio d'échange ---
  {
    id: "2.4",
    theme: "precedent-transactions",
    section: S.EXCHANGE,
    title: "Type de ratio d'échange le plus courant",
    variants: [
      {
        kind: "choice",
        prompt: "Quel type de ratio d'échange est le plus courant dans une transaction en actions ?",
        options: ["Linéaire", "Flottant", "Fixe", "Non flottant"],
        correctIndex: 2,
        method: "Le ratio d'échange fixe est la structure la plus courante dans les fusions en actions.",
      },
    ],
  },
  {
    id: "2.5",
    theme: "precedent-transactions",
    section: S.EXCHANGE,
    title: "Calcul du ratio d'échange",
    variants: [
      {
        kind: "choice",
        prompt:
          "Quel est le ratio d'échange si un acquéreur échange 0,5 de ses actions pour chaque 2 actions de la cible ?",
        options: ["0,25", "0,45", "2,0", "4,0"],
        correctIndex: 0,
        method: "Ratio d'échange = 0,5 / 2 = 0,25.",
      },
    ],
  },
  {
    id: "2.6",
    theme: "precedent-transactions",
    section: S.EXCHANGE,
    title: "Valeur implicite des capitaux propres via ratio d'échange",
    variants: [
      {
        kind: "choice",
        prompt: `Cours de l'acquéreur : $20,00. Actions diluées de la cible : 200,0m. Ratio d'échange : 0,25.\n\nValeur implicite des capitaux propres de la cible ?`,
        options: [
          "$1 000 millions",
          "$1 200 millions",
          "$1 250 millions",
          "$1 275 millions",
        ],
        correctIndex: 0,
        method:
          "Capitaux propres implicites = ratio × cours acquéreur × actions diluées cible = 0,25 × $20 × 200 = $1 000 millions.",
      },
    ],
  },
  {
    id: "2.7",
    theme: "precedent-transactions",
    section: S.EXCHANGE,
    title: "Risque de baisse du cours — fixe vs flottant",
    variants: [
      {
        kind: "choice",
        prompt:
          "Sans protection structurelle, dans quelle structure l'acquéreur supporte-t-il l'intégralité du risque de baisse de son cours ?",
        options: ["Fixe", "Flottant", "Les deux", "Aucun"],
        correctIndex: 1,
        method:
          "Dans une structure flottante, le prix d'offre par action est fixé tandis que le nombre d'actions s'ajuste au cours de l'acquéreur. L'acquéreur absorbe tout le risque baissier.",
      },
    ],
  },
  {
    id: "2.8",
    theme: "precedent-transactions",
    section: S.EXCHANGE,
    title: "Quand utilise-t-on un ratio flottant ?",
    variants: [
      {
        kind: "choice",
        prompt: "Quand une offre à ratio d'échange flottant est-elle la plus courante ?",
        options: [
          "L'acquéreur est nettement plus grand que la cible",
          "La cible est nettement plus grande que l'acquéreur",
          "La cible est cotée",
          "L'acquéreur est coté",
        ],
        correctIndex: 0,
        method:
          "Une baisse significative de l'activité de la cible n'affecte pas matériellement la valeur de l'acquéreur, mais la réciproque n'est pas vraie — d'où la protection accordée à la cible.",
      },
    ],
  },
  // --- Primes payées ---
  {
    id: "2.9",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Valeur d'offre avec prime",
    variants: [
      {
        kind: "choice",
        prompt: `Cours non affecté $25,00. Prime payée 30,0 %. Actions diluées 150,0m.\n\nCalculez la valeur d'offre de la cible.`,
        options: [
          "$3 750 millions",
          "$4 500 millions",
          "$4 875 millions",
          "$5 000 millions",
        ],
        correctIndex: 2,
        method: "Valeur d'offre = $25,00 × 1,30 × 150,0 = $4 875 millions.",
      },
    ],
  },
  {
    id: "2.10",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Valeur d'entreprise à partir de la valeur d'offre",
    variants: [
      {
        kind: "choice",
        prompt: `Capitaux propres $4 875m. Dette totale $1 500m. Préférentielles $125m. Minoritaires $100m. Trésorerie $150m.\n\nValeur d'entreprise de la cible ?`,
        options: [
          "$4 875 millions",
          "$5 875 millions",
          "$6 375 millions",
          "$6 450 millions",
        ],
        correctIndex: 3,
        method: "VE = 4 875 + 1 500 + 125 + 100 − 150 = $6 450 millions.",
      },
    ],
  },
  {
    id: "2.11",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Prime implicite payée",
    variants: [
      {
        kind: "choice",
        prompt: `Cours non affecté $50,00. Prix d'offre $67,50.\n\nPrime implicite payée ?`,
        options: ["20 %", "25 %", "30 %", "35 %"],
        correctIndex: 3,
        method: "($67,50 / $50,00) − 1 = 35 %.",
      },
    ],
  },
  {
    id: "2.12",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Prime à partir du prix d'offre et du cours non affecté",
    variants: [
      {
        kind: "choice",
        prompt: `Prix d'offre $15,00. Cours non affecté $12,50.\n\nPrime payée ?`,
        options: ["15,0 %", "17,0 %", "20,0 %", "25,0 %"],
        correctIndex: 2,
        method: "($15,00 / $12,50) − 1 = 20,0 %.",
      },
    ],
  },
  {
    id: "2.13",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Base de l'analyse des primes payées",
    variants: [
      {
        kind: "open",
        prompt: "Sur quel(s) cours l'analyse des primes payées est-elle fondée ?",
        method:
          "Elle repose sur le cours « non affecté », généralement mesuré à plusieurs intervalles avant l'annonce de la transaction (par exemple 1 jour, 1 semaine et 1 mois avant).",
        answerLabel: "Le cours non affecté à différents intervalles avant l'annonce",
      },
    ],
  },
  {
    id: "2.14",
    theme: "precedent-transactions",
    section: S.PREMIUM,
    title: "Quand le cours J-1 n'est pas le bon repère",
    variants: [
      {
        kind: "open",
        prompt:
          "Quand le cours de la veille de l'annonce ne sert-il pas de référence appropriée pour le cours « non affecté » ?",
        method:
          "Quand la société a annoncé son intention d'explorer des alternatives stratégiques, quand des informations ont fuité, ou quand des rumeurs ont circulé avant l'annonce officielle — autant d'événements qui font bouger le cours avant le deal.",
        answerLabel: "Annonce de revue stratégique, fuites ou rumeurs pré-annonce",
      },
    ],
  },
  // --- Synergies ---
  {
    id: "2.15",
    theme: "precedent-transactions",
    section: S.SYNERGIES,
    title: "Exemples de synergies",
    variants: [
      {
        kind: "choice",
        prompt: `Lesquels sont des exemples de synergies ?

I. Fermeture d'installations redondantes
II. Économies liées à des réductions d'effectifs
III. Recrutement d'une nouvelle équipe marketing
IV. Perte de ventes due à un chevauchement de clients`,
        options: ["I et II", "I et III", "III et IV", "I, II, III et IV"],
        correctIndex: 0,
        method:
          "Seuls I et II sont des synergies. III est un nouveau coût. IV est une dis-synergie (perte de revenus).",
      },
    ],
  },
  {
    id: "2.16",
    theme: "precedent-transactions",
    section: S.SYNERGIES,
    title: "Types principaux de synergies",
    variants: [
      {
        kind: "choice",
        prompt: `Quels sont les types principaux de synergies ?

I. Revenus  II. Transaction  III. Coûts  IV. Temps`,
        options: ["I et II", "I et III", "III et IV", "I, II et III"],
        correctIndex: 1,
        method:
          "Les synergies se décomposent en synergies de revenus et synergies de coûts. « Transaction » et « Temps » ne sont pas des catégories de synergies.",
      },
    ],
  },
  {
    id: "2.17",
    theme: "precedent-transactions",
    section: S.SYNERGIES,
    title: "VE/EBITDA avec et sans synergies",
    variants: [
      {
        kind: "choice",
        prompt: `Valeur d'entreprise $1 200,0m. CA LTM $700,0m. EBITDA LTM $150,0m. Synergies $25,0m.\n\nVE/EBITDA sans puis avec synergies ?`,
        options: [
          "8,0x et 6,9x",
          "8,0x et 9,6x",
          "11,7x et 10,0x",
          "11,7x et 12,3x",
        ],
        correctIndex: 0,
        method:
          "Sans : 1 200 / 150 = 8,0x. Avec : 1 200 / (150 + 25) = 1 200 / 175 = 6,9x.\nAjouter les synergies au dénominateur fait mécaniquement baisser le multiple affiché.",
      },
    ],
  },
  {
    id: "2.18",
    theme: "precedent-transactions",
    section: S.SYNERGIES,
    title: "Quand les synergies sont-elles les plus courantes ?",
    variants: [
      {
        kind: "open",
        prompt: "Dans quel type d'opération M&A les synergies sont-elles les plus fréquentes, et pourquoi ?",
        method:
          "Les synergies sont les plus courantes lorsqu'un acquéreur stratégique rachète une cible opérant une activité similaire ou connexe. Le chevauchement d'installations et de personnel peut alors être éliminé.",
        answerLabel: "Acquéreur stratégique + activité similaire → chevauchement éliminable",
      },
    ],
  },
  {
    id: "2.19",
    theme: "precedent-transactions",
    section: S.SYNERGIES,
    title: "Pourquoi annoncer les synergies attendues ?",
    variants: [
      {
        kind: "open",
        prompt: "Pourquoi les acquéreurs cotés annoncent-ils généralement les synergies attendues ?",
        method:
          "Afin d'obtenir du crédit de la part des investisseurs pour la création de valeur potentielle liée à l'opération.",
        answerLabel: "Obtenir le crédit des investisseurs pour la création de valeur",
      },
    ],
  },
  // --- Cadre & faiblesses ---
  {
    id: "2.20",
    theme: "precedent-transactions",
    section: S.FRAMEWORK,
    title: "Le « décalage temporel » comme faiblesse",
    variants: [
      {
        kind: "choice",
        prompt: `Pourquoi le « décalage temporel » est-il une faiblesse potentielle de l'analyse par transactions précédentes ?`,
        options: [
          "Les cibles avec un exercice fiscal décalé sont difficiles à inclure",
          "Les transactions passées peuvent ne pas refléter les conditions de marché actuelles",
          "Il est complexe de construire le tableau des précédents",
          "Certains deals ont été conclus plus vite que d'autres",
        ],
        correctIndex: 1,
        method:
          "Par définition, les transactions précédentes ont eu lieu dans le passé et peuvent ne pas refléter les conditions de marché en vigueur.",
      },
    ],
  },
  {
    id: "2.21",
    theme: "precedent-transactions",
    section: S.FRAMEWORK,
    title: "Ce qui n'est PAS une faiblesse des transactions précédentes",
    variants: [
      {
        kind: "choice",
        prompt: "Lequel n'est PAS une faiblesse potentielle de l'analyse par transactions précédentes ?",
        options: [
          "Décalage temporel",
          "Rareté des acquisitions comparables",
          "Difficulté à trouver l'information",
          "Relativité",
        ],
        correctIndex: 3,
        method:
          "La « relativité » est en réalité un avantage : l'approche par multiples fournit des repères simples à travers secteurs et périodes.",
      },
    ],
  },
  {
    id: "2.22",
    theme: "precedent-transactions",
    section: S.FRAMEWORK,
    title: "Principe de l'analyse par transactions précédentes",
    variants: [
      {
        kind: "open",
        prompt: "Quel est le principe fondateur de l'analyse par transactions précédentes ?",
        method:
          "Comme les comparables boursiers, elle utilise une approche par multiples pour dériver une fourchette de valorisation implicite pour une cible. Elle repose sur les multiples payés lors de transactions M&A comparables antérieures.",
        answerLabel: "Valorisation par multiples de transactions M&A antérieures comparables",
      },
    ],
  },
  {
    id: "2.23",
    theme: "precedent-transactions",
    section: S.FRAMEWORK,
    title: "Positionnement dans la fourchette de valorisation",
    variants: [
      {
        kind: "open",
        prompt:
          "Dans une valorisation complète, les transactions précédentes se situent-elles dans le haut, le bas ou le milieu de la fourchette ?",
        method:
          "Dans le haut de la fourchette, généralement au-dessus des comparables boursiers et de l'analyse LBO.",
        answerLabel: "Haut de la fourchette",
      },
    ],
  },
  {
    id: "2.24",
    theme: "precedent-transactions",
    section: S.FRAMEWORK,
    title: "Pourquoi plus élevé que les comparables boursiers ?",
    variants: [
      {
        kind: "open",
        prompt:
          "Pourquoi l'analyse par transactions précédentes donne-t-elle généralement une valorisation plus élevée que les comparables boursiers ?",
        method:
          "D'abord, les acheteurs paient une « prime de contrôle » — en contrepartie, l'acquéreur obtient le droit de contrôler les décisions et les flux de trésorerie de la cible. Ensuite, les acquéreurs stratégiques peuvent réaliser des synergies, ce qui soutient des prix d'achat plus élevés.",
        answerLabel: "Prime de contrôle + synergies",
      },
    ],
  },
  // --- Avantages & limites ---
  {
    id: "2.25",
    theme: "precedent-transactions",
    section: S.BENEFITS,
    title: "Avantages de l'analyse par transactions précédentes",
    variants: [
      {
        kind: "open",
        prompt: "Quels sont les avantages de l'analyse par transactions précédentes ?",
        method:
          "Fondée sur le marché (multiples et primes réellement payés), actuelle (les transactions récentes reflètent les conditions M&A en vigueur), relative (repères simples entre secteurs), simple (quelques transactions suffisent à ancrer la valorisation), objective (fondée sur des précédents, évite les hypothèses prospectives).",
        answerLabel: "Fondée sur le marché, actuelle, relative, simple, objective",
      },
    ],
  },
  {
    id: "2.26",
    theme: "precedent-transactions",
    section: S.BENEFITS,
    title: "Limites de l'analyse par transactions précédentes",
    variants: [
      {
        kind: "open",
        prompt: "Quelles sont les limites de l'analyse par transactions précédentes ?",
        method:
          "Fondée sur le marché (multiples biaisés par les conditions de l'époque), décalage temporel (transactions passées), rareté (difficile de trouver assez de deals comparables), information limitée (termes parfois non divulgués), base de l'acquéreur (le multiple payé peut reposer sur des anticipations non publiques).",
        answerLabel: "Biais de marché, décalage, rareté, information limitée, hypothèses non publiques",
      },
    ],
  },
  // --- Mini-cas ---
  {
    id: "2.27",
    theme: "precedent-transactions",
    section: S.MINI_CASE,
    title: "Ratio d'échange dans une fusion en actions",
    variants: [
      {
        kind: "choice",
        prompt: `${MINI_CASE_DATA}\n\nDans une transaction en actions, déterminez le ratio d'échange.`,
        options: ["0,50", "0,75", "1,1", "2,0"],
        correctIndex: 0,
        method: "Ratio d'échange = prix d'offre / cours acquéreur = $15,00 / $30,00 = 0,50.",
      },
    ],
  },
  {
    id: "2.28",
    theme: "precedent-transactions",
    section: S.MINI_CASE,
    title: "Actions diluées de la cible (TSM)",
    variants: [
      {
        kind: "choice",
        prompt: `${MINI_CASE_DATA}\n\nCalculez le nombre d'actions diluées de la cible (TSM).`,
        options: [
          "253,3 millions",
          "350,0 millions",
          "416,7 millions",
          "420,3 millions",
        ],
        correctIndex: 0,
        method:
          "Produits = 10,0 × $10 = $100m. Rachetées = $100 / $15 = 6,7m.\nNettes = 10,0 − 6,7 = 3,3m. Diluées = 250,0 + 3,3 = 253,3 millions.\nLe TSM utilise le prix d'offre, pas le cours de marché.",
      },
    ],
  },
  {
    id: "2.29",
    theme: "precedent-transactions",
    section: S.MINI_CASE,
    title: "Valeur d'offre et valeur d'entreprise de la cible",
    variants: [
      {
        kind: "choice",
        prompt: `${MINI_CASE_DATA}\n\nActions diluées = 253,3m.\n\nCalculez la valeur d'offre et la valeur d'entreprise de la cible.`,
        options: [
          "$3 800m et $4 800m",
          "$4 250m et $5 250m",
          "$4 750m et $5 150m",
          "$5 250m et $6 250m",
        ],
        correctIndex: 0,
        method:
          "Valeur d'offre = 253,3 × $15 = $3 800m. VE = $3 800 + $1 000 (dette nette) = $4 800m.",
      },
    ],
  },
  {
    id: "2.30",
    theme: "precedent-transactions",
    section: S.MINI_CASE,
    title: "VE/EBITDA LTM",
    variants: [
      {
        kind: "choice",
        prompt: `${MINI_CASE_DATA}\n\nValeur d'entreprise = $4 800m.\n\nCalculez le VE/EBITDA LTM.`,
        options: ["9,0x", "8,4x", "6,4x", "7,4x"],
        correctIndex: 3,
        method: "$4 800 / $650 = 7,4x.",
      },
    ],
  },
  {
    id: "2.31",
    theme: "precedent-transactions",
    section: S.MINI_CASE,
    title: "VE/CA LTM",
    variants: [
      {
        kind: "choice",
        prompt: `${MINI_CASE_DATA}\n\nValeur d'entreprise = $4 800m.\n\nCalculez le VE/CA LTM.`,
        options: ["1,1x", "1,3x", "1,5x", "2,0x"],
        correctIndex: 0,
        method: "$4 800 / $4 500 = 1,07x ≈ 1,1x.",
      },
    ],
  },
  // --- Recherche & sourcing ---
  {
    id: "2.32",
    theme: "precedent-transactions",
    section: S.SCREENING,
    title: "Source NON traditionnelle pour les acquisitions comparables",
    variants: [
      {
        kind: "choice",
        prompt: "Lequel n'est PAS une source traditionnelle pour constituer une liste d'acquisitions comparables ?",
        options: [
          "Bases de données M&A",
          "Historique M&A de la cible",
          "Rapports de crédit",
          "Fairness opinions de transactions récentes du secteur",
        ],
        correctIndex: 2,
        method:
          "Les rapports de crédit ne sont pas une source standard. D'autres ressources incluent la recherche actions et obligataire, ainsi que les circulaires de fusion.",
      },
    ],
  },
  {
    id: "2.33",
    theme: "precedent-transactions",
    section: S.SCREENING,
    title: "Critères de sélection des transactions précédentes",
    variants: [
      {
        kind: "choice",
        prompt: `Quels facteurs prendre en compte pour sélectionner des transactions précédentes ?

I. Rémunération du PDG  II. Caractéristiques financières (croissance, marges)  III. Timing  IV. Taille des entreprises`,
        options: [
          "II et IV",
          "I, II et IV",
          "II, III et IV",
          "I, II, III et IV",
        ],
        correctIndex: 2,
        method: "Caractéristiques financières, timing et taille — pas la rémunération du PDG.",
      },
    ],
  },
  {
    id: "2.34",
    theme: "precedent-transactions",
    section: S.SCREENING,
    title: "Stratégies pour trouver des acquisitions comparables",
    variants: [
      {
        kind: "choice",
        prompt: `Lesquelles sont des stratégies utiles pour trouver des acquisitions comparables ?

I. Chercher dans les bases M&A
II. Examiner l'historique M&A de la cible
III. Consulter les circulaires de fusion
IV. Examiner l'historique M&A des pairs`,
        options: [
          "I et II",
          "I, II et IV",
          "II, III et IV",
          "I, II, III et IV",
        ],
        correctIndex: 3,
        method: "Les quatre stratégies sont valides. La recherche actions et obligataire est également utile.",
      },
    ],
  },
  {
    id: "2.35",
    theme: "precedent-transactions",
    section: S.SCREENING,
    title: "Pourquoi un acquéreur stratégique peut-il payer plus ?",
    variants: [
      {
        kind: "choice",
        prompt: `Pourquoi un acquéreur stratégique peut-il souvent payer plus qu'un sponsor financier ?

I. Synergies  II. Coût du capital plus bas  III. Horizon d'investissement plus long  IV. Seuils de rendement plus bas`,
        options: [
          "II et III",
          "III et IV",
          "I, III et IV",
          "I, II, III et IV",
        ],
        correctIndex: 3,
        method:
          "Toutes ces raisons expliquent pourquoi, en conditions normales, un acquéreur stratégique peut se permettre de payer davantage qu'un sponsor financier.",
      },
    ],
  },
];
