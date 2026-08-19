import type { Exercise } from "@/data/exercise-types";

const S = {
  VALUECO: "ValueCo — Waterfall LBO complet",
  SU: "Sources & Uses",
  EXIT: "Sortie — Valorisation & Rendements",
  PAPER: "Paper LBO — Sources & Uses",
  IRR_CR: "TRI & Cash Return",
  CREDIT: "Ratios de crédit — Levier & Couverture",
  GOODWILL: "Goodwill & Bilan",
  REVOLVER: "Revolver & Commission d'engagement",
  SECURED: "Sûretés — Secured vs Unsecured",
  VALUE_CREATION: "Leviers de création de valeur",
  SUBORDINATION: "Subordination contractuelle & structurelle",
  FUNCTIONS: "Fonctions & mécaniques du LBO",
  PROCESS: "Process, sensibilité & projections",
};

const CREDIT_TABLE = `| ($ millions) | 2019 | 2020 | 2021 | 2022 | 2023 |
|---|---|---|---|---|---|
| Dette totale | $4 000,0 | $3 500,0 | $3 000,0 | $2 500,0 | $2 000,0 |
| Charges d'intérêt | 600,0 | 465,0 | 400,0 | 330,0 | 240,0 |
| EBITDA | 730,0 | 775,0 | 805,0 | 850,0 | 900,0 |`;

export const lboAnalysisExercises: Exercise[] = [
  // --- ValueCo waterfall ---
  {
    id: "5.1a",
    theme: "lbo-analysis",
    section: S.VALUECO,
    title: "ValueCo — valeur d'entreprise",
    variants: [
      {
        kind: "numeric",
        prompt: `EBITDA LTM : $700,0m. Multiple d'entrée : 8,0x.\n\nCalculez la valeur d'entreprise.`,
        unitHint: "Millions de dollars",
        check: { mode: "exact", accept: [5600] },
        method: "VE = 8,0x × $700,0 = $5 600,0 millions.",
        answerLabel: "$5 600,0 millions",
      },
    ],
  },
  {
    id: "5.1b",
    theme: "lbo-analysis",
    section: S.VALUECO,
    title: "ValueCo — prix d'achat des capitaux propres",
    variants: [
      {
        kind: "numeric",
        prompt: `Valeur d'entreprise : $5 600,0m. Dette totale : $1 500,0m. Trésorerie : $250,0m.\n\nCalculez le prix d'achat des capitaux propres.`,
        unitHint: "Millions de dollars",
        check: { mode: "exact", accept: [4350] },
        method: "Capitaux propres = VE − dette + trésorerie = 5 600 − 1 500 + 250 = $4 350,0 millions.",
        answerLabel: "$4 350,0 millions",
      },
    ],
  },
  // --- Sources & Uses ---
  {
    id: "5.2a",
    theme: "lbo-analysis",
    section: S.SU,
    title: "ValueCo — solde d'ouverture du revolver",
    variants: [
      {
        kind: "choice",
        prompt: "Si aucun tirage sur le revolver n'est prévu à la clôture, quel est le solde d'ouverture ?",
        options: ["Zéro", "$125,0 millions", "$250,0 millions", "Impossible à déterminer"],
        correctIndex: 0,
        method:
          "Aucun tirage à la clôture → solde nul. Une commission d'engagement annuelle reste due sur la portion non tirée.",
      },
    ],
  },
  {
    id: "5.2b",
    theme: "lbo-analysis",
    section: S.SU,
    title: "ValueCo — principal du term loan B",
    variants: [
      {
        kind: "numeric",
        prompt: `EBITDA LTM : $700,0m. Levier senior secured : 4,0x.\n\nCalculez le principal du term loan B.`,
        unitHint: "Millions de dollars",
        check: { mode: "exact", accept: [2800] },
        method: "TLB = $700,0 × 4,0x = $2 800,0 millions.",
        answerLabel: "$2 800,0 millions",
      },
    ],
  },
  {
    id: "5.2c",
    theme: "lbo-analysis",
    section: S.SU,
    title: "ValueCo — principal des obligations senior",
    variants: [
      {
        kind: "numeric",
        prompt: `EBITDA LTM : $700,0m. Levier total : 5,2x. Levier senior secured : 4,0x.\n\nCalculez le principal des obligations senior.`,
        unitHint: "Millions de dollars",
        check: { mode: "exact", accept: [840] },
        method: "Obligations senior = $700,0 × (5,2x − 4,0x) = $700,0 × 1,2x = $840,0 millions.",
        answerLabel: "$840,0 millions",
      },
    ],
  },
  {
    id: "5.2d",
    theme: "lbo-analysis",
    section: S.SU,
    title: "ValueCo — total des emplois",
    variants: [
      {
        kind: "numeric",
        prompt: `Achat des capitaux propres : $4 350,0m. Remboursement de dette existante : $1 500,0m. Primes de tender/call : $20,0m. Frais de financement : $100,0m. Autres frais : $30,0m.\n\nCalculez le total des emplois.`,
        unitHint: "Millions de dollars",
        check: { mode: "exact", accept: [6000] },
        method: "Total emplois = 4 350 + 1 500 + 20 + 100 + 30 = $6 000,0 millions.",
        answerLabel: "$6 000,0 millions",
      },
    ],
  },
  {
    id: "5.2e",
    theme: "lbo-analysis",
    section: S.SU,
    title: "ValueCo — apport en fonds propres du sponsor",
    variants: [
      {
        kind: "numeric",
        prompt: `Total sources = Total emplois = $6 000,0m. TLB : $2 800,0m. Obligations senior : $850,0m. Trésorerie existante : $250,0m.\n\nCalculez l'apport en fonds propres du sponsor.`,
        unitHint: "Millions de dollars",
        check: { mode: "exact", accept: [2100] },
        method: "Fonds propres = 6 000 − 2 800 − 850 − 250 = $2 100,0 millions.",
        answerLabel: "$2 100,0 millions",
      },
    ],
  },
  // --- Sortie ---
  {
    id: "5.3a",
    theme: "lbo-analysis",
    section: S.EXIT,
    title: "ValueCo — convention du multiple de sortie",
    variants: [
      {
        kind: "open",
        prompt: "En LBO, quel multiple de sortie devrait typiquement être utilisé, et pourquoi ?",
        method:
          "On utilise un multiple de sortie égal (ou inférieur) au multiple d'entrée — hypothèse conservatrice standard, sauf justification sectorielle particulière.",
        answerLabel: "Multiple d'entrée (hypothèse conservatrice)",
      },
    ],
  },
  {
    id: "5.3b",
    theme: "lbo-analysis",
    section: S.EXIT,
    title: "ValueCo — valeur d'entreprise à la sortie",
    variants: [
      {
        kind: "numeric",
        prompt: `EBITDA 2024E : $929,2m. Multiple de sortie : 8,0x.\n\nCalculez la valeur d'entreprise à la sortie.`,
        unitHint: "Millions de dollars",
        check: { mode: "tolerance", value: 7433.6, pct: 1 },
        method: "VE = $929,2 × 8,0 = $7 433,6 millions.",
        answerLabel: "$7 433,6 millions",
      },
    ],
  },
  {
    id: "5.3c",
    theme: "lbo-analysis",
    section: S.EXIT,
    title: "ValueCo — dette nette à la sortie",
    variants: [
      {
        kind: "numeric",
        prompt: `TLB restant : $1 050,8m. Obligations senior : $850,0m. Trésorerie : $0.\n\nCalculez la dette nette à la sortie.`,
        unitHint: "Millions de dollars",
        check: { mode: "exact", accept: [1900.8] },
        method: "Dette nette = (1 050,8 + 850,0) − 0 = $1 900,8 millions.",
        answerLabel: "$1 900,8 millions",
      },
    ],
  },
  {
    id: "5.3d",
    theme: "lbo-analysis",
    section: S.EXIT,
    title: "ValueCo — valeur des capitaux propres à la sortie",
    variants: [
      {
        kind: "numeric",
        prompt: `VE à la sortie : $7 433,7m. Dette nette : $1 900,8m.\n\nCalculez la valeur des capitaux propres à la sortie.`,
        unitHint: "Millions de dollars",
        check: { mode: "tolerance", value: 5532.9, pct: 1 },
        method: "Capitaux propres = 7 433,7 − 1 900,8 = $5 532,9 millions.",
        answerLabel: "$5 532,9 millions",
      },
    ],
  },
  {
    id: "5.3e",
    theme: "lbo-analysis",
    section: S.EXIT,
    title: "ValueCo — cash return (MOIC)",
    variants: [
      {
        kind: "numeric",
        prompt: `Fonds propres initiaux : $2 100,0m. Capitaux propres à la sortie : $5 532,8m.\n\nCalculez le cash return (MOIC).`,
        unitHint: "Multiple (ex. 1,5x)",
        check: { mode: "tolerance", value: 2.6, pct: 5 },
        method: "Cash Return = $5 532,8 / $2 100,0 = 2,6x.",
        answerLabel: "2,6x",
      },
    ],
  },
  // --- Paper LBO ---
  {
    id: "5.4",
    theme: "lbo-analysis",
    section: S.PAPER,
    title: "Reconstituer un Sources & Uses — trouver la tranche manquante",
    variants: [
      {
        kind: "choice",
        prompt: `| Sources | | Emplois | |
|---|---|---|---|
| Term Loan B | ? | Achat des capitaux propres | $825,0 |
| Obligations subordonnées | $300,0 | Remboursement de dette | $300,0 |
| Fonds propres | $385,0 | Frais de financement | $20,0 |
| Trésorerie | $25,0 | Autres frais | $15,0 |

Montant du Term Loan B et total sources/emplois ?`,
        options: [
          "$300,0m ; $1 000,0m",
          "$320,0m ; $1 425,0m",
          "$450,0m ; $1 160,0m",
          "Impossible à déterminer",
        ],
        correctIndex: 2,
        method:
          "Total emplois = 825 + 300 + 20 + 15 = $1 160. TLB = 1 160 − 300 − 385 − 25 = $450,0 millions.",
      },
    ],
  },
  // --- TRI & Cash Return ---
  {
    id: "5.5",
    theme: "lbo-analysis",
    section: S.IRR_CR,
    title: "TRI à partir d'un investissement et d'une sortie",
    variants: [
      {
        kind: "choice",
        prompt: "Un fonds PE investit $400m de fonds propres et sort au bout de 5 ans à $1 000m. TRI ?",
        options: ["19,5 %", "20,1 %", "25,7 %", "26,7 %"],
        correctIndex: 1,
        method: "TRI = (1 000/400)^(1/5) − 1 = 2,5^0,2 − 1 = 20,1 %.",
      },
    ],
  },
  {
    id: "5.6",
    theme: "lbo-analysis",
    section: S.IRR_CR,
    title: "Cash return à partir d'un investissement et d'une sortie",
    variants: [
      {
        kind: "choice",
        prompt: "Un fonds PE investit $225m de fonds propres et sort au bout de 5 ans à $820m. Cash return ?",
        options: ["2,5x", "3,5x", "3,6x", "4,0x"],
        correctIndex: 2,
        method: "Cash Return = $820 / $225 = 3,6x.",
      },
    ],
  },
  // --- Ratios de crédit ---
  {
    id: "5.7",
    theme: "lbo-analysis",
    section: S.CREDIT,
    title: "Ratio de couverture des intérêts 2023",
    variants: [
      {
        kind: "choice",
        prompt: `${CREDIT_TABLE}\n\nCalculez le ratio de couverture des intérêts 2023. Qu'est-ce que cela indique ?`,
        options: [
          "3,4x, profil de crédit plus fort qu'en 2019",
          "3,4x, profil de crédit plus faible qu'en 2019",
          "3,8x, profil de crédit plus fort qu'en 2019",
          "8,3x, profil de crédit plus faible qu'en 2019",
        ],
        correctIndex: 2,
        method:
          "Couverture = $900 / $240 = 3,8x (vs 2019 : $730/$600 = 1,2x). Plus la couverture est élevée, plus le profil de crédit est solide.",
      },
    ],
  },
  {
    id: "5.8",
    theme: "lbo-analysis",
    section: S.CREDIT,
    title: "Évolution du levier total 2019–2023",
    variants: [
      {
        kind: "choice",
        prompt: `${CREDIT_TABLE}\n\nEntre 2019 et 2023, le levier total :`,
        options: ["Diminue", "Augmente", "Reste constant", "Impossible à déterminer"],
        correctIndex: 0,
        method: "La dette est divisée par deux tandis que l'EBITDA augmente. Le levier (dette/EBITDA) diminue.",
      },
    ],
  },
  {
    id: "5.9",
    theme: "lbo-analysis",
    section: S.CREDIT,
    title: "Évolution du profil de crédit 2019–2023",
    variants: [
      {
        kind: "choice",
        prompt: `${CREDIT_TABLE}\n\nEntre 2019 et 2023, le profil de crédit de la société :`,
        options: ["S'affaiblit", "Se renforce", "Reste constant", "Impossible à déterminer"],
        correctIndex: 1,
        method: "Le levier diminue et la couverture augmente — les deux signaux convergent vers un profil renforcé.",
      },
    ],
  },
  {
    id: "5.10",
    theme: "lbo-analysis",
    section: S.CREDIT,
    title: "Ratio de levier raisonnable pour un LBO",
    variants: [
      {
        kind: "choice",
        prompt: "Quel ratio de levier total est raisonnable pour un LBO en conditions normales de marché ?",
        options: ["3,0x EBITDA", "6,0x EBITDA", "5,0x résultat net", "1,0x CA"],
        correctIndex: 1,
        method: "Le levier moyen des LBO a oscillé entre ~4x et ~6x EBITDA ces dernières années.",
      },
    ],
  },
  // --- Goodwill ---
  {
    id: "5.11",
    theme: "lbo-analysis",
    section: S.GOODWILL,
    title: "Comment le goodwill est-il créé ?",
    variants: [
      {
        kind: "choice",
        prompt: "Comment le goodwill est-il créé ?",
        options: [
          "Prime par action payée",
          "Synergies créées dans une opération M&A",
          "Excédent du prix payé sur les actifs nets identifiables",
          "Dépréciation au bilan",
        ],
        correctIndex: 2,
        method: "Goodwill = prix d'achat − actifs nets identifiables.",
      },
    ],
  },
  {
    id: "5.12",
    theme: "lbo-analysis",
    section: S.GOODWILL,
    title: "Calcul du goodwill",
    variants: [
      {
        kind: "choice",
        prompt: "Actifs nets identifiables : $700m. Prix d'achat : $825m. Goodwill ?",
        options: ["$125,0 millions", "$700,0 millions", "$1 525,0 millions", "Impossible à déterminer"],
        correctIndex: 0,
        method: "Goodwill = $825 − $700 = $125,0 millions.",
      },
    ],
  },
  {
    id: "5.13",
    theme: "lbo-analysis",
    section: S.GOODWILL,
    title: "Ajustements typiques du bilan d'ouverture LBO",
    variants: [
      {
        kind: "choice",
        prompt: `Lesquels sont des ajustements typiques du bilan d'ouverture en LBO ?

I. Soustraction de la nouvelle dette LBO
II. Soustraction des capitaux propres existants
III. Ajout des frais de financement différés
IV. Ajout du goodwill créé`,
        options: ["I et II", "II et III", "I, II et IV", "II, III et IV"],
        correctIndex: 3,
        method:
          "La nouvelle dette LBO est ajoutée (pas soustraite) — elle finance l'acquisition. II, III et IV sont corrects.",
      },
    ],
  },
  // --- Revolver ---
  {
    id: "5.14",
    theme: "lbo-analysis",
    section: S.REVOLVER,
    title: "Solde du revolver quand il n'est pas tiré",
    variants: [
      {
        kind: "choice",
        prompt: "Si aucun tirage sur le revolver n'est prévu dans le financement LBO, quel est le solde d'ouverture ?",
        options: ["Zéro", "$1,25 millions", "$125,0 millions", "$250,0 millions"],
        correctIndex: 0,
        method: "Zéro si non tiré. Une commission d'engagement annuelle reste due sur la capacité non tirée.",
      },
    ],
  },
  // --- Secured vs Unsecured ---
  {
    id: "5.15",
    theme: "lbo-analysis",
    section: S.SECURED,
    title: "Classer les instruments de financement LBO",
    variants: [
      {
        kind: "open",
        prompt: "Classez chaque instrument comme secured ou unsecured : obligations high yield, revolver, term loan, dette mezzanine, fonds propres, ABL.",
        method:
          "Secured : revolver, term loan, ABL. Unsecured : obligations high yield, dette mezzanine, fonds propres. La dette bancaire est adossée à des sûretés ; le HY et la mezz ne le sont pas, d'où leur coût plus élevé.",
        answerLabel: "Secured : revolver, TL, ABL. Unsecured : HY, mezz, fonds propres",
      },
    ],
  },
  // --- Leviers de création de valeur ---
  {
    id: "5.16",
    theme: "lbo-analysis",
    section: S.VALUE_CREATION,
    title: "Croissance de l'EBITDA vs remboursement de dette",
    variants: [
      {
        kind: "open",
        prompt: "Pourquoi un dollar de croissance pérenne d'EBITDA est-il généralement préférable à un dollar de réduction de dette ?",
        method:
          "Le remboursement de dette crée de la valeur dollar pour dollar. L'EBITDA est capitalisé à un multiple à la sortie — un dollar de croissance pérenne génère donc un effet multiplicateur, contrairement au désendettement qui reste linéaire.",
        answerLabel: "L'EBITDA est capitalisé à un multiple ; la dette est 1:1",
      },
    ],
  },
  {
    id: "5.17",
    theme: "lbo-analysis",
    section: S.VALUE_CREATION,
    title: "Cession vs introduction en bourse — avantages d'une cession",
    variants: [
      {
        kind: "open",
        prompt: "Quels sont les avantages potentiels d'une cession par rapport à une introduction en bourse pour une sortie PE ?",
        method:
          "Une cession offre une sortie complète et du cash immédiat. Le vendeur n'est pas exposé au risque que les conditions de marché affectent une sortie complète via des offres secondaires ultérieures.",
        answerLabel: "Sortie complète, cash immédiat, pas de risque de follow-on",
      },
    ],
  },
  {
    id: "5.18",
    theme: "lbo-analysis",
    section: S.VALUE_CREATION,
    title: "Stratégies d'expansion du multiple",
    variants: [
      {
        kind: "open",
        prompt: "Décrivez des stratégies pour obtenir une expansion du multiple en LBO.",
        method:
          "Accroître la taille et l'échelle, réaliser des améliorations opérationnelles significatives, repositionner vers des segments mieux valorisés, accélérer la croissance organique et/ou la profitabilité, synchroniser la sortie avec un point haut du cycle.",
        answerLabel: "Taille, opérations, repositionnement, croissance, timing de cycle",
      },
    ],
  },
  // --- Subordination ---
  {
    id: "5.19",
    theme: "lbo-analysis",
    section: S.SUBORDINATION,
    title: "Subordination contractuelle",
    variants: [
      {
        kind: "open",
        prompt: "Expliquez la subordination contractuelle.",
        method:
          "C'est le rang de priorité des instruments de dette au sein d'une même entité juridique. Au niveau de l'OpCo, la dette senior secured et senior unsecured sont contractuellement prioritaires sur la dette senior subordonnée en cas de liquidation.",
        answerLabel: "Même entité, priorité déterminée par les termes du contrat de crédit",
      },
    ],
  },
  {
    id: "5.20",
    theme: "lbo-analysis",
    section: S.SUBORDINATION,
    title: "Subordination structurelle",
    variants: [
      {
        kind: "open",
        prompt: "Expliquez la subordination structurelle.",
        method:
          "C'est le rang de priorité de la dette à des entités juridiques différentes. Dans une structure HoldCo/OpCo, si tous les actifs sont à l'OpCo, la dette OpCo est structurellement senior à la dette HoldCo (mezz, actions préférentielles) — à condition que l'OpCo n'ait pas garanti la dette HoldCo.",
        answerLabel: "Entités différentes, priorité déterminée par la localisation des actifs",
      },
    ],
  },
  // --- Fonctions & mécaniques ---
  {
    id: "5.21",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Fonctions principales de l'analyse LBO",
    variants: [
      {
        kind: "open",
        prompt: "Quelles sont les fonctions principales de l'analyse LBO ?",
        method:
          "L'analyse LBO sert d'outil analytique central pour évaluer la structure de financement, les rendements d'investissement et la valorisation dans des scénarios de rachat par effet de levier.",
        answerLabel: "Évaluer structure de financement, rendements et valorisation",
      },
    ],
  },
  {
    id: "5.22",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "LBO pour analyser la structure de financement",
    variants: [
      {
        kind: "open",
        prompt: "Comment l'analyse LBO est-elle utilisée pour analyser la structure de financement ?",
        method:
          "Elle permet d'analyser une structure donnée sur la base de la génération de cash-flow, du remboursement de dette, des statistiques de crédit et des rendements, sur une période de projection et sous plusieurs scénarios.",
        answerLabel: "Cash-flow, remboursement, crédit, rendements sous plusieurs scénarios",
      },
    ],
  },
  {
    id: "5.23",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "LBO pour la valorisation",
    variants: [
      {
        kind: "open",
        prompt: "Comment l'analyse LBO est-elle utilisée pour la valorisation ?",
        method:
          "Elle détermine une fourchette de valorisation implicite pour une cible dans une vente LBO potentielle, sur la base de rendements acceptables. Le résultat repose sur les projections financières, le prix d'achat/de sortie et la structure de financement.",
        answerLabel: "Fourchette de valorisation implicite basée sur des rendements cibles",
      },
    ],
  },
  {
    id: "5.24",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Pourquoi la charge d'intérêt historique est-elle non pertinente en LBO ?",
    variants: [
      {
        kind: "open",
        prompt: "Pourquoi la charge d'intérêt historique n'est-elle pas pertinente dans un modèle LBO ?",
        method:
          "La charge d'intérêt et le résultat net historiques ne sont pas pertinents car la cible sera recapitalisée avec une nouvelle structure de capital et de nouvelles conditions de dette via le LBO.",
        answerLabel: "La cible sera recapitalisée avec une dette entièrement nouvelle",
      },
    ],
  },
  {
    id: "5.25",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Cash disponible pour le remboursement optionnel de dette",
    variants: [
      {
        kind: "open",
        prompt: "Comment calcule-t-on le cash disponible pour le remboursement optionnel de dette ?",
        method:
          "Somme des flux d'exploitation et d'investissement projetés. Ce montant couvre d'abord l'amortissement obligatoire sur les term loans. Le flux restant finance les remboursements optionnels (cash flow sweep).",
        answerLabel: "Flux d'exploitation + investissement, après amortissement obligatoire",
      },
    ],
  },
  {
    id: "5.26",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Erreurs courantes qui déséquilibrent le bilan",
    variants: [
      {
        kind: "open",
        prompt: "Quelles sont les erreurs courantes qui empêchent le bilan d'être équilibré dans un modèle LBO ?",
        method:
          "Amortissement ou capex mal reliés aux immobilisations, et/ou variations de postes de bilan non correctement reflétées dans le tableau de flux de trésorerie.",
        answerLabel: "D&A/capex non reliés aux immobilisations ; variations de bilan absentes du TFT",
      },
    ],
  },
  {
    id: "5.27",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Prix d'achat — cible cotée vs privée",
    variants: [
      {
        kind: "open",
        prompt: "Comment le prix d'achat est-il déterminé pour une cible cotée ? Pour une cible privée ?",
        method:
          "Cotée : prix d'offre × actions diluées = prix d'achat des capitaux propres ; on ajoute la dette nette pour la VE implicite. Privée : EBITDA LTM × multiple d'achat = VE directement.",
        answerLabel: "Cotée : offre × actions diluées. Privée : EBITDA × multiple",
      },
    ],
  },
  {
    id: "5.28",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Comment les frais de financement différés sont-ils créés ?",
    variants: [
      {
        kind: "open",
        prompt: "Comment les frais de financement différés sont-ils créés ?",
        method:
          "Les frais de chaque tranche de dette sont multipliés par le montant engagé. Les frais annuels sont ensuite calculés en divisant le total par la maturité (en années) de la tranche.",
        answerLabel: "Frais × montant engagé, amortis sur la maturité",
      },
    ],
  },
  {
    id: "5.29",
    theme: "lbo-analysis",
    section: S.FUNCTIONS,
    title: "Pourquoi le LBO cadre-t-il le bas de la fourchette de valorisation ?",
    variants: [
      {
        kind: "open",
        prompt: "Pourquoi l'analyse LBO se situe-t-elle généralement en bas de la fourchette de valorisation ?",
        method:
          "Le LBO est contraint par des rendements minimaux requis (seuil de TRI) plutôt que par une maximisation du prix. Un acquéreur stratégique peut justifier un prix plus élevé via synergies ou prime de contrôle.",
        answerLabel: "Contraint par le seuil de rendement, pas par la maximisation du prix",
      },
    ],
  },
  // --- Process QCMs ---
  {
    id: "5.30",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Période de projection pour un prêteur",
    variants: [
      {
        kind: "choice",
        prompt: "La période de projection d'un modèle LBO pour un prêteur est typiquement de combien d'années ?",
        options: ["1–2 ans", "3–4 ans", "7–10 ans", "15+ ans"],
        correctIndex: 2,
        method: "7–10 ans pour correspondre à la maturité de l'instrument de dette le plus long.",
      },
    ],
  },
  {
    id: "5.31",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Seuil de TRI historique pour les sponsors",
    variants: [
      {
        kind: "choice",
        prompt: "Quel seuil de TRI a historiquement servi de standard pour les sponsors envisageant un LBO ?",
        options: ["5 %", "10 %", "20 %", "40 %"],
        correctIndex: 2,
        method: "20 %+ est la règle empirique historique, variable selon les conditions de marché et le risque.",
      },
    ],
  },
  {
    id: "5.32",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Variables clés pour l'analyse de sensibilité LBO",
    variants: [
      {
        kind: "choice",
        prompt: `Lesquelles sont des variables clés pour l'analyse de sensibilité en LBO ?

I. Prix d'achat  II. Structure de financement  III. Dividendes historiques  IV. Multiple de sortie`,
        options: ["I et II", "II et III", "I, II et IV", "I, II, III et IV"],
        correctIndex: 2,
        method: "Prix d'achat, structure de financement et multiple de sortie. Les dividendes historiques ne sont pas pertinents.",
      },
    ],
  },
  {
    id: "5.33",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Source principale des projections du Management Case",
    variants: [
      {
        kind: "choice",
        prompt: "Dans un processus de vente M&A organisé, quelle est la source principale des projections utilisées dans le modèle LBO ?",
        options: [
          "Analyse de comparables boursiers",
          "Estimations de recherche",
          "Fournisseurs tiers d'information",
          "CIM (Memorandum d'Information Confidentiel)",
        ],
        correctIndex: 3,
        method:
          "Le conseil sell-side fournit les projections via le CIM, complété par la présentation management et la data room.",
      },
    ],
  },
  {
    id: "5.34",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Donnée financière historique la moins pertinente en LBO",
    variants: [
      {
        kind: "choice",
        prompt: "Quelle donnée financière historique est la moins pertinente pour l'analyse LBO ?",
        options: ["Croissance du CA", "Marges EBITDA et EBIT", "Capex", "Charges d'intérêt"],
        correctIndex: 3,
        method: "Les charges d'intérêt historiques ne sont pas pertinentes — la cible sera recapitalisée via le LBO.",
      },
    ],
  },
  {
    id: "5.35",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Scénario opérationnel NON typique en LBO",
    variants: [
      {
        kind: "choice",
        prompt: "Lequel n'est PAS un scénario opérationnel typique en analyse LBO ?",
        options: ["Cas SEC", "Cas de base", "Cas défavorable", "Cas sponsor"],
        correctIndex: 0,
        method: "Le « cas SEC » n'existe pas. Le cas de base repose sur les hypothèses du management ajustées pour la due diligence.",
      },
    ],
  },
  {
    id: "5.36",
    theme: "lbo-analysis",
    section: S.PROCESS,
    title: "Section NON standard du tableau de flux de trésorerie",
    variants: [
      {
        kind: "choice",
        prompt: "Laquelle n'est PAS une section standard du tableau de flux de trésorerie ?",
        options: ["Activités opérationnelles", "Activités de financement", "Activités d'investissement", "Activités d'acquisition"],
        correctIndex: 3,
        method: "Les « activités d'acquisition » n'existent pas comme section standard du TFT.",
      },
    ],
  },
];
