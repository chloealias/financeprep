import type { Exercise } from "@/data/exercise-types";

const S = {
  ACTORS: "Acteurs du financement LBO",
  DOCS: "Documentation & Rôle du management",
  TAKE_PRIVATE: "Pourquoi un LBO / take-private",
  LEVERAGE: "Levier maximal & Base d'actifs",
  EXIT: "Stratégies de sortie & Création de valeur",
  SENIORITY: "Hiérarchie de la structure de capital",
  REVOLVER: "Revolver — Usage & Coût",
  INSTRUMENTS: "ABL, HY Bonds, Bridge & Alternatives",
  COVENANTS: "Covenants — Classification & Mécaniques",
  BOND_PRICING: "Pricing & Rendement obligataire",
  GP_LP: "Économie GP/LP",
  VALUATION: "Drivers de valorisation LBO",
};

export const leveragedBuyoutsExercises: Exercise[] = [
  // --- Acteurs ---
  {
    id: "4.1",
    theme: "leveraged-buyouts",
    section: S.ACTORS,
    title: "Ce qui n'est PAS un « financial sponsor »",
    variants: [
      {
        kind: "choice",
        prompt: `Tous les suivants sont des « financial sponsors » typiques SAUF :`,
        options: ["Fonds de private equity", "Banque commerciale", "Hedge fund", "Fonds de venture capital"],
        correctIndex: 1,
        method: "Les banques commerciales sont des prêteurs, pas des sponsors. Les sponsors incluent les fonds PE, les divisions de merchant banking, les hedge funds, les VC et les SPACs.",
      },
    ],
  },
  {
    id: "4.2",
    theme: "leveraged-buyouts",
    section: S.ACTORS,
    title: "Limited partners fournissant du capital",
    variants: [
      {
        kind: "choice",
        prompt: `Lesquels sont des limited partners fournissant du capital aux sponsors ?

I. Fonds de pension  II. Compagnies d'assurance  III. Fonds de dotation universitaires  IV. Familles fortunées`,
        options: ["I et II", "I et III", "I, III et IV", "I, II, III et IV"],
        correctIndex: 3,
        method: "Tous les quatre sont des LPs traditionnels. Les fonds souverains aussi.",
      },
    ],
  },
  {
    id: "4.3",
    theme: "leveraged-buyouts",
    section: S.ACTORS,
    title: "Ce qui n'est PAS un prêteur bancaire",
    variants: [
      {
        kind: "choice",
        prompt: "Les prêteurs bancaires incluent tous les suivants SAUF :",
        options: ["Banques commerciales", "Fonds de prêts mutualisés", "Gérants actions", "Hedge funds crédit"],
        correctIndex: 2,
        method: "Les gérants actions ne sont pas des prêteurs bancaires.",
      },
    ],
  },
  {
    id: "4.4",
    theme: "leveraged-buyouts",
    section: S.ACTORS,
    title: "Ce qui n'est PAS un investisseur obligataire",
    variants: [
      {
        kind: "choice",
        prompt: "Les investisseurs obligataires incluent tous les suivants SAUF :",
        options: ["Hedge funds", "Compagnies d'assurance", "Fonds de dette distressed", "Foncières (REITs)"],
        correctIndex: 3,
        method: "Les REITs ne sont pas des investisseurs obligataires typiques.",
      },
    ],
  },
  {
    id: "4.5",
    theme: "leveraged-buyouts",
    section: S.ACTORS,
    title: "Prêteur le plus probable d'un term loan A",
    variants: [
      {
        kind: "choice",
        prompt: "Quel est le prêteur le plus probable d'un term loan A ?",
        options: ["Dirigeant de la société", "Banque commerciale", "Fonds mezzanine", "Gérant actions"],
        correctIndex: 1,
        method: "Les banques commerciales sont les principaux prêteurs TLA.",
      },
    ],
  },
  // --- Documentation ---
  {
    id: "4.6",
    theme: "leveraged-buyouts",
    section: S.DOCS,
    title: "Ce qui ne fait PAS partie de l'engagement de financement",
    variants: [
      {
        kind: "choice",
        prompt: "Lequel ne fait PAS partie de l'engagement de financement d'une banque d'investissement ?",
        options: ["Commitment letter", "Institutional letter", "Engagement letter", "Fee letter"],
        correctIndex: 1,
        method: "L'« institutional letter » n'existe pas. L'engagement comprend : commitment letter, engagement letter et fee letter.",
      },
    ],
  },
  {
    id: "4.7",
    theme: "leveraged-buyouts",
    section: S.DOCS,
    title: "Ce que le CIM ne contient PAS",
    variants: [
      {
        kind: "choice",
        prompt: "Un CIM pour une facilité de crédit contient tout sauf :",
        options: ["Points d'investissement clés", "Projections financières", "Description des obligations", "Panorama sectoriel"],
        correctIndex: 2,
        method: "La « Description of Notes » se trouve dans l'indenture d'une obligation, pas dans le CIM.",
      },
    ],
  },
  {
    id: "4.8",
    theme: "leveraged-buyouts",
    section: S.DOCS,
    title: "Valeur tangible apportée par le management en LBO",
    variants: [
      {
        kind: "choice",
        prompt: "Comment le management de la cible apporte-t-il une valeur tangible en LBO ?",
        options: [
          "En obtenant des conditions de financement favorables",
          "En rédigeant un 10-K de qualité",
          "Grâce à sa connaissance du processus d'IPO",
          "Le management n'apporte que des bénéfices intangibles",
        ],
        correctIndex: 0,
        method: "Un management solide obtient des conditions de financement favorables via une présentation convaincante aux investisseurs crédit.",
      },
    ],
  },
  {
    id: "4.9",
    theme: "leveraged-buyouts",
    section: S.DOCS,
    title: "Documents juridiques — dette bancaire et obligations",
    variants: [
      {
        kind: "choice",
        prompt: "Quels sont les documents juridiques régissant la dette bancaire et les obligations, respectivement ?",
        options: [
          "Contrat de crédit ; contrat définitif",
          "Indenture ; contrat de crédit",
          "Contrat de crédit ; indenture",
          "Indenture ; contrat définitif",
        ],
        correctIndex: 2,
        method: "Dette bancaire → contrat de crédit. Obligations → indenture.",
      },
    ],
  },
  // --- Take-private ---
  {
    id: "4.10",
    theme: "leveraged-buyouts",
    section: S.TAKE_PRIVATE,
    title: "Ce qui n'est PAS une raison de take-private",
    variants: [
      {
        kind: "choice",
        prompt: "Toutes les raisons suivantes justifient un take-private SAUF :",
        options: [
          "Exigences Sarbanes-Oxley jugées trop lourdes",
          "Accès aux marchés actions publics",
          "Conviction que le marché sous-valorise la société",
          "Conviction que le statut coté est trop contraignant",
        ],
        correctIndex: 1,
        method: "L'accès aux marchés actions est un avantage du statut coté — pas une raison d'en sortir.",
      },
    ],
  },
  {
    id: "4.11",
    theme: "leveraged-buyouts",
    section: S.TAKE_PRIVATE,
    title: "Candidats potentiels au LBO",
    variants: [
      {
        kind: "choice",
        prompt: `Lesquels sont des candidats potentiels au LBO ?

I. Sociétés en difficulté  II. Sociétés sur marchés fragmentés  III. Sociétés performantes  IV. Filiales non-core`,
        options: ["III et IV", "I, II et III", "II, III et IV", "I, II, III et IV"],
        correctIndex: 3,
        method: "Tous les quatre : redressements, roll-ups, sociétés performantes, et carve-outs de divisions non-core.",
      },
    ],
  },
  {
    id: "4.12",
    theme: "leveraged-buyouts",
    section: S.TAKE_PRIVATE,
    title: "Caractéristiques recherchées chez un candidat LBO",
    variants: [
      {
        kind: "choice",
        prompt: `Lesquelles sont des caractéristiques recherchées chez un candidat LBO traditionnel ?

I. Positions de marché fortes  II. Forte cyclicité  III. Base d'actifs importante  IV. Modèle économique spéculatif`,
        options: ["I et II", "I et III", "II et III", "III et IV"],
        correctIndex: 1,
        method: "Positions de marché fortes et base d'actifs importante. La cyclicité élevée et les modèles spéculatifs augmentent le risque.",
      },
    ],
  },
  // --- Levier & actifs ---
  {
    id: "4.13",
    theme: "leveraged-buyouts",
    section: S.LEVERAGE,
    title: "Maximiser le levier — caractéristique clé",
    variants: [
      {
        kind: "choice",
        prompt: "Quelle caractéristique permet de maximiser le levier en LBO ?",
        options: [
          "Historique d'acquisitions bolt-on",
          "Covenants restrictifs",
          "Base d'actifs solide",
          "Encours de dette élevé",
        ],
        correctIndex: 2,
        method: "Une base d'actifs solide nantie en garantie augmente la volonté des prêteurs à fournir de la dette.",
      },
    ],
  },
  {
    id: "4.14",
    theme: "leveraged-buyouts",
    section: S.LEVERAGE,
    title: "Qualités du management recherchées par les sponsors",
    variants: [
      {
        kind: "choice",
        prompt: `Que recherchent les sponsors chez le management d'un candidat LBO ?

I. Historique d'acquisitions relutives  II. Expérience d'une structure de capital levée  III. Rémunération antérieure élevée  IV. Historique de pilules empoisonnées`,
        options: ["I et II", "I et III", "II, III et IV", "I, II, III et IV"],
        correctIndex: 0,
        method: "L'historique d'acquisitions et l'expérience sous levier sont les plus valorisés.",
      },
    ],
  },
  // --- Stratégies de sortie ---
  {
    id: "4.15",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "Stratégies de sortie courantes",
    variants: [
      {
        kind: "choice",
        prompt: `Lesquelles sont des stratégies de sortie courantes pour les sponsors ?

I. Refinancement  II. IPO  III. Cession à un stratégique  IV. Cession à un autre sponsor`,
        options: ["II et IV", "I, II et III", "I, III et IV", "II, III et IV"],
        correctIndex: 3,
        method: "Le refinancement est une monétisation mais pas une vraie sortie — le sponsor conserve sa participation.",
      },
    ],
  },
  {
    id: "4.16",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "Ce qui ne produit PAS d'expansion du multiple",
    variants: [
      {
        kind: "choice",
        prompt: "Lequel n'est PAS un moyen typique d'obtenir une expansion du multiple à la sortie ?",
        options: [
          "Acquérir des sociétés similaires en dessous des multiples de marché",
          "Pénétrer de nouveaux segments à forte croissance",
          "Améliorations d'efficacité",
          "Ajouter des frais de structure",
        ],
        correctIndex: 3,
        method: "Ajouter des frais de structure augmente les coûts sans créer de valeur.",
      },
    ],
  },
  {
    id: "4.17",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "Propriété après un dividend recap",
    variants: [
      {
        kind: "choice",
        prompt: "Quel pourcentage de sa participation le sponsor conserve-t-il après un dividend recap ?",
        options: ["50 %", "80 %", "90 %", "100 %"],
        correctIndex: 3,
        method: "Le dividend recap permet au sponsor de conserver 100 % de sa participation tout en extrayant du cash via de la dette additionnelle.",
      },
    ],
  },
  {
    id: "4.18",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "Faiblesse d'un dividend recap",
    variants: [
      {
        kind: "choice",
        prompt: "Quelle est la faiblesse d'un dividend recap ?",
        options: ["Moins de fonds propres du sponsor", "Ajout de levier supplémentaire", "Cash return", "Le sponsor conserve sa participation"],
        correctIndex: 1,
        method: "L'endettement supplémentaire fragilise le crédit et augmente le profil de risque.",
      },
    ],
  },
  {
    id: "4.19",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "Intérêt d'une IPO sans sortie complète",
    variants: [
      {
        kind: "choice",
        prompt: "Quel est l'intérêt d'introduire en bourse une société LBO si cela ne donne pas une sortie complète ?",
        options: [
          "Monétisation partielle tout en préservant le potentiel de hausse",
          "Les marchés M&A offrent des primes élevées",
          "Obligation contractuelle des LPs",
          "Obligation contractuelle des GPs",
        ],
        correctIndex: 0,
        method: "L'IPO offre un marché liquide pour la participation résiduelle tout en préservant l'optionnalité de hausse.",
      },
    ],
  },
  {
    id: "4.20",
    theme: "leveraged-buyouts",
    section: S.EXIT,
    title: "Ce qui n'est PAS un avantage d'une IPO pour le sponsor",
    variants: [
      {
        kind: "choice",
        prompt: "Tous les suivants sont des avantages de l'IPO d'une cible LBO SAUF :",
        options: [
          "Potentiel de hausse via la participation résiduelle",
          "Flexibilité de cession ultérieure avec prime",
          "Facilité et certitude d'exécution",
          "Prime de valorisation potentielle par rapport à une cession M&A",
        ],
        correctIndex: 2,
        method: "Une IPO dépend de facteurs incertains (conditions de marché, sentiment des investisseurs, roadshow) — l'inverse de la facilité et certitude.",
      },
    ],
  },
  // --- Hiérarchie ---
  {
    id: "4.21",
    theme: "leveraged-buyouts",
    section: S.SENIORITY,
    title: "Ordre de séniorité — basique",
    variants: [
      {
        kind: "choice",
        prompt: `Ordre correct du plus senior au moins senior ?

I. Fonds propres  II. Dette senior subordonnée  III. Dette secured first lien  IV. Dette senior unsecured`,
        options: [
          "II, I, IV et III",
          "III, IV, II et I",
          "III, IV, I et II",
          "IV, III, II et I",
        ],
        correctIndex: 1,
        method: "First lien secured → Senior unsecured → Senior subordonnée → Fonds propres.",
      },
    ],
  },
  {
    id: "4.22",
    theme: "leveraged-buyouts",
    section: S.SENIORITY,
    title: "Ordre de séniorité — HoldCo/OpCo",
    variants: [
      {
        kind: "choice",
        prompt: `Ordre correct du plus senior au moins senior ? (100 % des actifs à l'OpCo)

I. Obligations senior unsecured à l'OpCo  II. Obligations discount à la HoldCo  III. Dette secured first lien à l'OpCo  IV. Dette secured second lien à l'OpCo`,
        options: [
          "II, I, III et IV",
          "II, III, IV et I",
          "III, IV, I et II",
          "IV, III, I et II",
        ],
        correctIndex: 2,
        method: "First lien → Second lien → Senior unsecured (OpCo) → Discount notes (HoldCo). La dette HoldCo est structurellement subordonnée à toute la dette OpCo.",
      },
    ],
  },
  {
    id: "4.23",
    theme: "leveraged-buyouts",
    section: S.SENIORITY,
    title: "Ordre croissant de maturité",
    variants: [
      {
        kind: "choice",
        prompt: `Classez par maturité croissante :

I. Revolver  II. Obligations senior subordonnées  III. Obligations senior  IV. Term loan B`,
        options: [
          "I, IV, III et II",
          "I, III, II et IV",
          "IV, III, I et II",
          "IV, III, II et I",
        ],
        correctIndex: 0,
        method: "Revolver (5–6 ans) → TLB (7 ans) → Obligations senior (7–10 ans) → Obligations senior subordonnées (les plus longues).",
      },
    ],
  },
  // --- Revolver ---
  {
    id: "4.24",
    theme: "leveraged-buyouts",
    section: S.REVOLVER,
    title: "Utilisation NON courante d'un revolver",
    variants: [
      {
        kind: "choice",
        prompt: "Laquelle n'est PAS une utilisation courante d'un revolver ?",
        options: ["Capex de maintenance", "Financement partiel du prix d'achat LBO", "Fonds de roulement", "Investissement en capital de long terme"],
        correctIndex: 3,
        method: "Les projets de long terme sont financés par des instruments plus permanents.",
      },
    ],
  },
  {
    id: "4.25",
    theme: "leveraged-buyouts",
    section: S.REVOLVER,
    title: "Commission d'engagement typique d'un revolver",
    variants: [
      {
        kind: "choice",
        prompt: "En conditions normales de marché, la commission d'engagement d'un revolver est typiquement de :",
        options: ["5 bps", "50 bps", "200 bps", "500 bps"],
        correctIndex: 1,
        method: "~50 bps est la commission standard sur la capacité non tirée.",
      },
    ],
  },
  {
    id: "4.26",
    theme: "leveraged-buyouts",
    section: S.REVOLVER,
    title: "Coût du revolver vs autres instruments de dette",
    variants: [
      {
        kind: "choice",
        prompt: "Si un revolver tiré est utilisé dans le financement LBO, comment son coupon se compare-t-il aux autres instruments ?",
        options: ["Le plus cher", "Le moins cher", "Pari passu avec les obligations senior", "Ne peut pas être utilisé"],
        correctIndex: 1,
        method: "Le revolver est secured et le moins risqué, donc le moins cher — mais aussi le moins flexible en disponibilité.",
      },
    ],
  },
  {
    id: "4.27",
    theme: "leveraged-buyouts",
    section: S.REVOLVER,
    title: "Ce qui n'est PAS un avantage du revolver",
    variants: [
      {
        kind: "choice",
        prompt: "Lequel n'est PAS un avantage du revolver ?",
        options: [
          "Maturité plus courte que les autres dettes institutionnelles",
          "Peut être tiré, remboursé et retiré librement",
          "Taux d'intérêt bas",
          "Émis par des banques commerciales « relationnelles »",
        ],
        correctIndex: 0,
        method: "Une maturité plus courte est un inconvénient : la société doit payer des frais pour prolonger ou remplacer la facilité.",
      },
    ],
  },
  // --- Instruments ---
  {
    id: "4.28",
    theme: "leveraged-buyouts",
    section: S.INSTRUMENTS,
    title: "Garanties d'une facilité ABL",
    variants: [
      {
        kind: "choice",
        prompt: "Les facilités ABL sont généralement garanties par :",
        options: ["Actifs courants", "Passifs courants", "Dette à long terme", "Actifs de pension"],
        correctIndex: 0,
        method: "Typiquement les créances clients et les stocks — d'où « Asset-Based Lending ».",
      },
    ],
  },
  {
    id: "4.29",
    theme: "leveraged-buyouts",
    section: S.INSTRUMENTS,
    title: "Faiblesse du high yield pour le sponsor",
    variants: [
      {
        kind: "choice",
        prompt: "Du point de vue du sponsor, quelle est la faiblesse des obligations high yield ?",
        options: ["Protection contre le remboursement anticipé (call protection)", "Covenants légers", "Maturité longue", "Amortissement in fine"],
        correctIndex: 0,
        method: "La call protection limite la capacité du sponsor à refinancer tôt — un avantage pour l'obligataire mais une contrainte pour le sponsor.",
      },
    ],
  },
  {
    id: "4.30",
    theme: "leveraged-buyouts",
    section: S.INSTRUMENTS,
    title: "Durée d'un bridge loan",
    variants: [
      {
        kind: "choice",
        prompt: "La durée d'un bridge loan est typiquement de :",
        options: ["1 an", "3 ans", "5 ans", "10 ans"],
        correctIndex: 0,
        method: "~1 an. Au-delà, une commission de conversion s'applique généralement.",
      },
    ],
  },
  {
    id: "4.31",
    theme: "leveraged-buyouts",
    section: S.INSTRUMENTS,
    title: "Part des fonds propres du sponsor dans le financement LBO",
    variants: [
      {
        kind: "choice",
        prompt: "En moyenne, quel pourcentage du financement LBO représente l'apport en fonds propres du sponsor ?",
        options: ["10 %", "35 %", "70 %", "90 %"],
        correctIndex: 1,
        method: "Typiquement 30 %–40 %, variable selon les conditions de marché, le type de société et le multiple d'achat.",
      },
    ],
  },
  {
    id: "4.32",
    theme: "leveraged-buyouts",
    section: S.INSTRUMENTS,
    title: "Ce qui n'est PAS un collatéral pour les prêteurs",
    variants: [
      {
        kind: "choice",
        prompt: "Lequel n'est PAS considéré comme un collatéral par les prêteurs ?",
        options: ["Dettes fournisseurs", "Créances clients", "Actions", "Immobilisations (PP&E)"],
        correctIndex: 0,
        method: "Les dettes fournisseurs sont un passif. Le collatéral comprend : créances clients, stocks, immobilisations, PI, ou titres de participation.",
      },
    ],
  },
  // --- Covenants ---
  {
    id: "4.33",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "Risque atténué par la call protection",
    variants: [
      {
        kind: "choice",
        prompt: "La call protection atténue quel risque pour les investisseurs en dette quand les taux baissent ?",
        options: ["Risque de crédit", "Risque opérationnel", "Risque de réinvestissement", "Risque d'extension"],
        correctIndex: 2,
        method: "Les primes de remboursement protègent contre le refinancement anticipé d'une dette attractive, atténuant le risque de réinvestissement.",
      },
    ],
  },
  {
    id: "4.34",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "Ce qui n'est PAS une classification de covenant",
    variants: [
      {
        kind: "choice",
        prompt: "Laquelle n'est PAS une classification de covenant ?",
        options: ["Financier", "Limitation", "Négatif", "Affirmatif"],
        correctIndex: 1,
        method: "« Limitation » n'existe pas. Les trois classifications sont : affirmatif, négatif et financier.",
      },
    ],
  },
  {
    id: "4.35",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "Covenants de maintenance vs d'incurrence",
    variants: [
      {
        kind: "choice",
        prompt: "Les covenants de maintenance financière sont typiques de __________, tandis que __________ ont des covenants d'incurrence.",
        options: [
          "Sociétés cotées ; sociétés privées",
          "Sociétés privées ; sociétés cotées",
          "Obligations high yield ; dette bancaire",
          "Dette bancaire ; obligations high yield",
        ],
        correctIndex: 3,
        method: "Dette bancaire = covenants de maintenance (tests réguliers). HY = covenants d'incurrence (déclenchés par certaines actions).",
      },
    ],
  },
  {
    id: "4.36",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "Ce qui n'est PAS un covenant de maintenance financière",
    variants: [
      {
        kind: "choice",
        prompt: "Lequel n'est PAS un covenant de maintenance financière ?",
        options: ["Levier total maximum", "Levier senior secured maximum", "Dividendes minimum", "Couverture d'intérêts minimum"],
        correctIndex: 2,
        method: "Un minimum de dividendes versés ne relève pas de la logique protectrice des covenants de maintenance.",
      },
    ],
  },
  {
    id: "4.37",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "Évolution des covenants sur la durée du prêt",
    variants: [
      {
        kind: "choice",
        prompt: "Avec les covenants de maintenance, les ratios de levier __________ tandis que les ratios de couverture __________",
        options: [
          "Restent constants ; augmentent",
          "Restent constants ; diminuent",
          "Diminuent ; augmentent",
          "Augmentent ; diminuent",
        ],
        correctIndex: 2,
        method: "Le levier maximum requis diminue (step down) et la couverture minimum requise augmente, forçant l'emprunteur à améliorer son profil de crédit.",
      },
    ],
  },
  {
    id: "4.38",
    theme: "leveraged-buyouts",
    section: S.COVENANTS,
    title: "Ce qui n'est PAS un acheteur institutionnel qualifié (QIB)",
    variants: [
      {
        kind: "choice",
        prompt: "Lequel ne serait PAS classé comme QIB ?",
        options: [
          "Investisseur particulier avec moins de $25m de patrimoine",
          "Gérant actions avec $200m sous gestion",
          "Compagnie d'assurance avec $500m d'investissements",
          "Fonds mutuel avec $10 000m sous gestion",
        ],
        correctIndex: 0,
        method: "Les QIBs doivent détenir au minimum $100m de titres — un seuil hors de portée pour un particulier.",
      },
    ],
  },
  // --- Pricing obligataire ---
  {
    id: "4.39",
    theme: "leveraged-buyouts",
    section: S.BOND_PRICING,
    title: "Rendement courant d'une obligation au pair",
    variants: [
      {
        kind: "choice",
        prompt: "Rendement courant d'une obligation à $1 000 (valeur nominale) avec un coupon de 6,0 % traitant au pair ?",
        options: ["3,0 %", "6,0 %", "6,3 %", "6,5 %"],
        correctIndex: 1,
        method: "Au pair, le rendement courant est égal au taux de coupon : 6,0 %.",
      },
    ],
  },
  {
    id: "4.40",
    theme: "leveraged-buyouts",
    section: S.BOND_PRICING,
    title: "Rendement courant d'une obligation en dessous du pair",
    variants: [
      {
        kind: "choice",
        prompt: "Rendement courant d'une obligation traitant à $95 (émise au pair) avec un coupon de 7,0 % ?",
        options: ["7,0 %", "7,2 %", "7,4 %", "7,7 %"],
        correctIndex: 2,
        method: "Rendement courant = $70 / $950 = 7,37 % ≈ 7,4 %. En dessous du pair → rendement > coupon.",
      },
    ],
  },
  {
    id: "4.41",
    theme: "leveraged-buyouts",
    section: S.BOND_PRICING,
    title: "Fréquence de paiement des intérêts obligataires",
    variants: [
      {
        kind: "choice",
        prompt: "Les obligations d'entreprises paient typiquement des intérêts :",
        options: ["Mensuellement", "Trimestriellement", "Semestriellement", "Annuellement"],
        correctIndex: 2,
        method: "Les obligations d'entreprises paient typiquement des intérêts semestriellement.",
      },
    ],
  },
  // --- GP/LP ---
  {
    id: "4.42",
    theme: "leveraged-buyouts",
    section: S.GP_LP,
    title: "Frais de gestion payés par les LPs",
    variants: [
      {
        kind: "choice",
        prompt: "Quel pourcentage des fonds engagés les LPs versent-ils typiquement aux GPs en frais de gestion ?",
        options: ["2 %", "5 %", "15 %", "20 %"],
        correctIndex: 0,
        method: "1 %–2 % par an. Après retour du capital et seuil de rendement, le sponsor perçoit ~20 % de carried interest sur les profits.",
      },
    ],
  },
  // --- Drivers de valorisation ---
  {
    id: "4.43",
    theme: "leveraged-buyouts",
    section: S.VALUATION,
    title: "Plus grand impact sur la valorisation LBO",
    variants: [
      {
        kind: "choice",
        prompt: "Quel facteur a le plus grand impact sur la valorisation LBO ?",
        options: ["Multiples d'entrée et de sortie", "Taux d'impôt", "Taux d'intérêt de la dette", "Période de non-call de l'obligation"],
        correctIndex: 0,
        method: "Les hypothèses d'entrée et de sortie ont le plus grand impact sur la valorisation et le TRI, suivies du montant de dette, puis de la croissance du CA.",
      },
    ],
  },
];
