import type { Concept } from "@/data/concepts/types";

export const conceptsFr: Concept[] = [
  {
    id: "c1",
    category: "valuation",
    title: "Enterprise Value vs Equity Value",
    simple:
      "L'EV, c'est la valeur de toute l'entreprise (actionnaires + banques). L'Equity Value, c'est seulement la part des actionnaires. On passe de l'un à l'autre avec la dette nette et quelques postes du bilan.",
    intuition:
      "Imaginez une maison : le prix total (toit + crédit) correspond à l'EV. Ce qu'il vous reste vraiment à payer après le crédit, c'est l'Equity Value.",
    formula:
      "EV = Equity Value + Dette nette + Actions préférentielles\n  + Minoritaires + Provisions retraites − Associates",
    steps: [
      "Pourquoi l'EV en M&A ? Pour comparer des entreprises avec des dettes différentes : l'EV/EBITDA regarde le business, pas la structure financière.",
      "Formule canonique du livre : EV = Equity Value + Dette totale + Preferred Stock + Minoritaires − Cash. Provisions retraites et associates sont des extensions de marché autour de ce socle.",
      "Pont Equity → EV : on ajoute la dette (l'acheteur la reprend), les actions préférentielles, les minoritaires et les provisions retraites ; on retire le cash et les associates.",
      "Pont EV → Equity (prix par action) : on fait l'inverse — on retire dette, preferred, minoritaires et provisions ; on ajoute cash et associates.",
    ],
    example: {
      label: "Exemple express",
      body: "Equity Value 800, dette nette 200, minoritaires 50, cash déjà netté dans la dette nette → EV ≈ 800 + 200 + 50 = 1 050. Oublier les +50 minoritaires fausse tout le pont.",
    },
    interview:
      "Le pont Equity ↔ EV doit sortir par cœur. Oublier les minoritaires reste une erreur éliminatoire.",
    table: {
      headers: ["Élément", "Logique", "Impact"],
      rows: [
        ["Dette financière", "Sera repayée par l'acheteur", "+ EV"],
        ["Cash", "Récupéré par l'acheteur", "− EV"],
        ["Actions préférentielles", "Créance senior aux actions ordinaires", "+ EV"],
        ["Intérêts minoritaires", "Quote-part non détenue", "+ EV"],
        ["Provisions retraites", "Engagement futur", "+ EV"],
        ["Associates (20-50%)", "Participation non consolidée", "− EV"],
        ["Leasing IFRS 16", "Dette opérationnelle", "+ EV (débattu)"],
      ],
    },
    visual: "ev-bridge",
    pitfalls: [
      "Oublier les minoritaires dans le pont",
      "Oublier les actions préférentielles (poste standard de la formule du livre, souvent zappé)",
      "Mélanger cash « disponible » et cash minimum d'exploitation",
      "Confondre dette brute et dette nette",
      "Ignorer les engagements hors bilan (retraites, garanties)",
    ],
  },
  {
    id: "c2",
    category: "dcf",
    title: "Le DCF (Discounted Cash Flow)",
    simple:
      "Le DCF estime la valeur d'une entreprise en additionnant ses flux de trésorerie futurs, ramenés à aujourd'hui. Un euro demain vaut moins qu'un euro aujourd'hui : on les « actualise » avec le WACC.",
    intuition:
      "Combien vaut l'entreprise si on projette ses cash futurs et qu'on les ramène à aujourd'hui ? C'est toute la logique du DCF.",
    formula: "EV = Σ FCFF(t) / (1+WACC)^t\n  + VT / (1+WACC)^n",
    steps: [
      "Projeter les FCFF (cash généré par l'activité) sur 5 ans en général ; jusqu'à 15-20 ans pour des activités à revenus très prévisibles/contractuels (utilities, concessions).",
      "Calculer le WACC, le taux d'actualisation.",
      "Actualiser chaque flux : plus il est loin, moins il compte.",
      "Calculer la valeur terminale (cash après la période de projection).",
      "Convention mid-year (milieu d'année) : les FCFF et la VT en croissance perpétuelle (PGM) s'actualisent en mid-year ; la VT par multiple de sortie (EMM) reste en year-end, car elle repose sur des multiples LTM de fin d'année.",
      "Sensibiliser en priorité WACC, multiple de sortie et marges d'EBIT, puis g et la croissance du CA.",
      "Sommer le tout = EV, puis retirer la dette nette pour l'Equity Value.",
    ],
    example: {
      label: "Exemple express",
      body: "FCFF an 1 = 100, WACC = 10 %. Valeur actualisée ≈ 100 / 1,10 ≈ 91. Le même flux dans 5 ans ne vaut plus que ~62. La valeur terminale (souvent 60–80 % de l'EV) amplifie cet effet — d'où les sensibilités WACC / g.",
    },
    interview:
      "Savoir dérouler les étapes à l'oral. Question type : quelles variables sensibiliser ? WACC, multiple de sortie, marges d'EBIT — puis g et croissance du CA.",
    table: {
      headers: ["Composant", "Formule", "Ordre de grandeur"],
      rows: [
        ["FCFF", "EBIT × (1−t) + D&A − CAPEX − ΔBFR", "Selon business"],
        ["WACC", "(E/V)×Ke + (D/V)×Kd×(1−t)", "6-12% en mid-cap"],
        ["Valeur terminale (Gordon)", "FCF × (1+g) / (WACC−g)", "60-80% de l'EV"],
        ["g (croissance perpétuelle)", "Croissance long terme", "1,5-3% (≤ inflation+1pt)"],
        ["Horizon explicite", "Période de projection", "5 ans (15-20 ans si revenus contractuels)"],
        ["Mid-year — PGM", "VT croissance perpétuelle", "Actualisation mid-year"],
        ["Mid-year — EMM", "VT multiple de sortie LTM", "Actualisation year-end"],
      ],
    },
    visual: "dcf-bridge",
    pitfalls: [
      "g supérieur à la croissance économique long terme",
      "Oublier que le BFR augmente avec le chiffre d'affaires",
      "Sous-estimer le CAPEX de maintenance",
      "Actualiser avec Ke au lieu du WACC",
      "Ne pas tester plusieurs hypothèses WACC / g",
      "Actualiser l'EMM en mid-year : le multiple de sortie LTM reste en year-end",
    ],
  },
  {
    id: "c3",
    category: "dcf",
    title: "Le WACC (Coût Moyen Pondéré du Capital)",
    simple:
      "Le WACC est le taux moyen exigé par ceux qui financent l'entreprise : actionnaires (Ke) et prêteurs (Kd). C'est le taux d'actualisation du DCF.",
    intuition:
      "Deux financeurs, deux exigences : les actionnaires veulent Ke, les banques Kd. Le WACC est la moyenne pondérée — et c'est avec ce taux qu'on actualise les FCFF.",
    formula: "WACC = (E/V) × Ke + (D/V) × Kd × (1 − t)",
    steps: [
      "Ke (fonds propres) : CAPM = taux sans risque + β × prime de risque marché.",
      "Kd (dette) : coût de l'emprunt, multiplié par (1 − taux d'IS) car les intérêts sont déductibles.",
      "Pondérer E/V et D/V en valeur de marché, jamais en comptable.",
      "Pour le beta : comparables → déléverage → médiane → releverage à la structure cible.",
    ],
    example: {
      label: "Exemple express",
      body: "Equity 700 M€, Dette 300 M€ → V = 1 000. Ke = 10 %, Kd = 5 %, IS = 25 %. WACC = 70 % × 10 % + 30 % × 5 % × 0,75 = 7 % + 1,125 % = 8,125 %.",
    },
    interview:
      "Citez toujours valeur de marché, (1−t) sur la dette, et le parcours unlever / relever du beta.",
    table: {
      headers: ["Composant", "Source", "Niveau typique (2026)"],
      rows: [
        ["Rf (taux sans risque)", "OAT 10 ans", "~3,5-3,9% (2026)"],
        ["ERP (prime de risque)", "Damodaran, Fernandez", "5-7%"],
        ["β unlevered", "Comparables délévérés", "0,6 à 1,5"],
        ["Ke (CAPM)", "Rf + β × ERP", "8-14%"],
        ["Kd avant impôt", "Spread + Rf", "4-7% (IG), 7-12% (HY)"],
        ["WACC final", "Pondération E/V, D/V", "6-12% en mid-cap"],
      ],
    },
    visual: "wacc-curve",
    pitfalls: [
      "Utiliser des pondérations comptables au lieu du marché",
      "Prendre un beta « levered » sans le délévrer d'abord",
      "Oublier l'avantage fiscal de la dette (× (1−t))",
      "WACC trop bas pour une cible très risquée",
      "Pas de prime de risque pays pour l'étranger",
    ],
  },
  {
    id: "c4",
    category: "accounting",
    title: "Les 3 états financiers et leur liaison",
    simple:
      "Trois documents à connaître : le compte de résultat (gains et pertes sur une période), le bilan (photo à un instant T), le tableau de flux (entrées et sorties de cash). Ils sont liés entre eux.",
    intuition:
      "Ce ne sont pas trois silos : le résultat net, le bilan et le cash se parlent. Si la boucle ferme, le modèle est cohérent.",
    formula:
      "Résultat net (P&L)  →  Equity (Bilan)\nΔ Bilan  →  Flux (CFS)\nCash final (CFS)  →  Cash (Bilan)",
    steps: [
      "Le résultat net du P&L augmente les capitaux propres au bilan.",
      "Ce même résultat net démarre le tableau de flux (méthode indirecte).",
      "Les variations du bilan (stocks, créances, immos, dettes…) alimentent CFO, CFI et CFF.",
      "La variation de trésorerie du CFS explique la variation du cash au bilan.",
    ],
    example: {
      label: "Exemple express",
      body: "CAPEX 100 € : bilan Immo +100 / Cash −100, flux CFI −100, puis D&A ~20 € en P&L l'année suivante. Emprunt 200 € : Cash +200 / Dette +200, CFF +200 — aucun impact direct sur le résultat net.",
    },
    interview:
      "Savoir dérouler un exemple chiffré (CAPEX, emprunt, dividende) sur les trois états montre une vraie maîtrise.",
    table: {
      headers: ["Action", "Impact P&L", "Impact Bilan", "Impact Flux"],
      rows: [
        ["CAPEX 100€", "−20€ D&A (an1)", "Immo +100, Cash −100", "CFI −100"],
        ["Augmentation BFR 50€", "Aucun direct", "BFR +50, Cash −50", "CFO −50"],
        ["Emprunt 200€", "−10€ intérêts (an1)", "Cash +200, Dette +200", "CFF +200"],
        ["Dividendes 30€", "Aucun (sortie equity)", "Cash −30, Equity −30", "CFF −30"],
        [
          "Provision 40€",
          "Charge −40€ (NI −30 après IS 25%)",
          "Provision +40, Equity −30",
          "CFO non-cash (+40)",
        ],
      ],
    },
    visual: "3-statements",
    pitfalls: [
      "Oublier que les amortissements sont non-cash (retraités en CFO)",
      "Mélanger BFR et investissements",
      "Bilan qui ne balance pas (actif ≠ passif)",
      "Confondre résultat net et cash d'exploitation",
    ],
  },
  {
    id: "c5",
    category: "accounting",
    title: "Le BFR et le Cycle de Conversion du Cash",
    simple:
      "Le BFR, c'est le cash « bloqué » dans l'activité courante : stocks + créances clients − dettes fournisseurs. Plus il est élevé, plus il faut financer la croissance.",
    intuition:
      "Plus le BFR est haut, plus il faut financer la croissance. Un CCC négatif (rare) signifie que les fournisseurs financent vos clients — comme en grande distribution.",
    formula:
      "BFR = Stocks + Créances clients − Dettes fournisseurs\nCCC = DIO + DSO − DPO",
    steps: [
      "DSO (délai clients) = créances / CA × 365.",
      "DIO (délai stocks) = stocks / coût des ventes × 365.",
      "DPO (délai fournisseurs) = dettes fournisseurs / coût des ventes × 365.",
      "CCC = DIO + DSO − DPO : temps pendant lequel le cash est immobilisé.",
    ],
    example: {
      label: "Exemple express",
      body: "Industrie classique : DSO 60 + DIO 60 − DPO 60 = CCC 60 jours. Retail type Amazon : DSO 5 + DIO 30 − DPO 80 = CCC −45 jours — le fournisseur finance le cycle.",
    },
    interview:
      "En modélisation : quand le CA augmente, le BFR augmente aussi — il faut le prévoir dans le DCF.",
    table: {
      headers: ["Secteur", "DSO", "DIO", "DPO", "CCC"],
      rows: [
        ["SaaS (cash upfront)", "30j", "0j", "30j", "0j ou négatif"],
        ["Retail (Amazon)", "5j", "30j", "80j", "−45j ✓"],
        ["Distribution (Carrefour)", "5j", "25j", "60j", "−30j ✓"],
        ["Industrie classique", "60j", "60j", "60j", "60j"],
        ["BTP", "90j", "30j", "45j", "75j"],
        ["Pharma branded", "100j", "120j", "60j", "160j"],
      ],
    },
    visual: "ccc-cycle",
    pitfalls: [
      "Confondre BFR opérationnel et dette financière",
      "Oublier la saisonnalité (moyenne sur 12 mois)",
      "Inclure le cash dans le calcul du BFR",
      "Ne pas lier la croissance du CA à celle du BFR",
    ],
  },
  {
    id: "c6",
    category: "lbo",
    title: "Le LBO (Leveraged Buy-Out)",
    simple:
      "Un LBO, c'est acheter une entreprise surtout avec de la dette. Une société holding emprunte, achète la cible, puis la dette est remboursée avec le cash généré par l'entreprise.",
    intuition:
      "Le fonds met une partie d'equity, les banques le reste. La holding emprunte, achète, et rembourse avec le cash de la cible — horizon classique 4 à 7 ans.",
    formula: "TRI = (Equity Exit / Equity Entry)^(1/n) − 1\nMOIC = Equity Exit / Equity Entry",
    steps: [
      "Structure type : 30–40 % equity selon le livre (jusqu'à 50 % selon le cycle de crédit), le reste en dette.",
      "Créer une holding qui emprunte et achète la cible ; rembourser via les cash-flows / dividendes remontés.",
      "Cash disponible pour la dette = CF opérationnel + CF d'investissement (avant financement). D'abord l'amortissement obligatoire, puis le sweep optionnel.",
      "Cash sweep 100 % : tout le cash restant après remboursements obligatoires va au remboursement optionnel de la dette prepayable (généralement la dette bancaire), dans l'ordre Revolver → Term Loan A → Term Loan B.",
      "Term Loan B : amortissement standard ~1 % par an du principal, le reste en bullet à maturité. High yield (senior / sub notes) : pas d'amortissement obligatoire, solde identique chaque année.",
      "Séniorité / maturité typique (du plus court au plus long) : Revolver → Term Loan institutionnel → Senior Notes → Senior Subordinated Notes.",
      "Intérêts : convention « average interest expense » = moyenne des soldes début et fin d'année, car la dette est remboursée en cours d'année.",
      "Trois leviers de gain : croître l'EBITDA, revendre à un multiple plus élevé, rembourser la dette.",
    ],
    example: {
      label: "Exemple express",
      body: "EV 100 : Equity 40 + Dette 60. Après 5 ans, EV sortie 150, dette remboursée à 20 → equity exit 130. MOIC = 130/40 = 3,25× ; TRI ≈ 27 %.",
    },
    interview:
      "Expliquer structure, horizon, cash sweep et les trois leviers — et ne pas oublier BFR / CAPEX. Le livre cite 30–40 % d'equity comme fourchette de référence ; en pratique récente (crédit tendu, multiples élevés), on observe parfois jusqu'à 50 %.",
    table: {
      headers: ["Composant", "% typique", "Coût", "Rang"],
      rows: [
        ["Equity (Sponsor + MEP)", "30-40% (livre) / jusqu'à 50% selon cycle", "TRI cible 20-25%", "Junior"],
        ["Senior Term Loan", "40-50%", "Euribor + 250-450 bps", "Senior 1"],
        ["Unitranche", "0-60%", "Euribor + 500-700 bps", "Senior 1 (hybride)"],
        ["Mezzanine", "10-20%", "10-15% (cash + PIK)", "Junior secured"],
        ["RCF (revolving)", "Pour BFR", "Euribor + 200-300 bps", "Senior 1"],
      ],
    },
    visual: "lbo-structure",
    pitfalls: [
      "LBO sur une cible très cyclique (cash instable)",
      "Oublier le BFR ou le CAPEX dans le business plan",
      "Oublier le cash sweep (100 % du cash excess vers la dette bancaire prepayable)",
      "TRI calculé sans les frais de transaction",
      "Hypothèse de revente trop optimiste sur le multiple",
    ],
  },
  {
    id: "c7",
    category: "lbo",
    title: "Les trois leviers de création de valeur en LBO",
    simple:
      "Le gain d'un LBO vient de trois sources : l'EBITDA qui monte, le multiple de revente qui monte, et la dette qu'on rembourse. Savoir lequel compte le plus dans votre modèle est essentiel.",
    intuition:
      "Trois façons de gagner : faire mieux tourner le business, revendre plus cher, ou rembourser la dette. Aujourd'hui, c'est surtout l'opérationnel qui compte.",
    formula:
      "Δ Equity = Δ EBITDA × Multiple_entrée\n  + EBITDA_sortie × Δ Multiple\n  + Δ Dette nette",
    steps: [
      "Levier 1 — Croissance EBITDA (~50 % du TRI) : ventes, marges, build-ups. Le plus dur, le plus valorisé.",
      "Levier 2 — Expansion du multiple (~15–20 %) : revendre plus cher. Peu contrôlable, dépend du marché. Convention de modélisation : multiple de sortie ≤ multiple d'entrée, par prudence.",
      "Levier 3 — Désendettement (~30–35 %) : cash → remboursement dette. À EV constant, l'equity monte.",
    ],
    example: {
      label: "Exemple express",
      body: "Entrée EV 800 (EBITDA 100 × 8×), dette 500 → equity 300. Sortie : EBITDA 130 × 9× = EV 1 170, dette 200 → equity 970. Gains : EBITDA +240, multiple +130, désendettement +300.",
    },
    interview:
      "Expliquer lequel des trois leviers domine dans un deal montre que vous comprenez le modèle économique.",
    table: {
      headers: ["Levier", "% TRI typique (2026)", "% TRI années 2000", "Difficulté"],
      rows: [
        ["EBITDA growth", "~50%", "~25%", "Élevée (exécution)"],
        ["Multiple expansion", "~15-20%", "~15%", "Hasard (marché)"],
        ["Deleveraging", "~30-35%", "~60%", "Mécanique"],
      ],
    },
    visual: "lbo-value-bridge",
    pitfalls: [
      "Compter surtout sur le multiple (incertain)",
      "Supposer un multiple de sortie supérieur au multiple d'entrée sans justification — la convention standard est un multiple de sortie ≤ multiple d'entrée, par prudence.",
      "Sous-estimer le temps pour améliorer l'EBITDA",
      "Pas d'acquisitions add-on dans le plan",
      "Croissance du CA sans CAPEX ni BFR associés",
    ],
  },
  {
    id: "c8",
    category: "valuation",
    title: "Multiples de valorisation (EV/EBITDA, P/E, EV/Sales)",
    simple:
      "Un multiple compare la valeur d'une entreprise à un indicateur (EBITDA, ventes, bénéfice). On regarde ce que paient des entreprises similaires pour estimer un prix.",
    intuition:
      "Si des sociétés proches se paient 8× l'EBITDA, appliquer ce multiple à la cible donne une première idée de prix — à croiser avec d'autres méthodes.",
    formula: "Multiple = Valeur (EV ou Eq.V)\n  / Métrique (EBITDA, Sales, EPS, BV)",
    steps: [
      "EV/EBITDA : standard M&A, compare indépendamment de la dette.",
      "EV/Sales : utile si pas encore rentable (startups).",
      "P/E : utile en bourse, moins comparable en M&A (dette + fiscalité).",
      "Règle de cohérence : un multiple EV se rapporte à un agrégat avant intérêts (EBITDA, EBIT, Sales) ; un multiple Equity Value à un agrégat après intérêts (Net Income, EPS). EV/Net Income et Equity Value/EBITDA sont incorrects.",
      "Méthode : 5–10 comps → médiane → appliquer à la cible → croiser plusieurs multiples.",
    ],
    example: {
      label: "Exemple express",
      body: "Médiane comps = 8× EV/EBITDA. Cible EBITDA 50 M€ → EV ≈ 400 M€. Dette nette 120 → Equity Value ≈ 280 M€.",
    },
    interview:
      "Toujours préciser LTM vs NTM, et dire si vous citez la médiane ou la moyenne.",
    table: {
      headers: ["Multiple", "Cas d'usage", "Mid-cap industrie", "Tech/SaaS", "Banques"],
      rows: [
        ["EV/EBITDA", "M&A standard", "6-9x", "15-25x", "N/A"],
        ["EV/Sales", "Non profitables", "0,8-1,5x", "5-15x", "N/A"],
        ["EV/EBIT", "Capitalistique", "8-12x", "20-30x", "N/A"],
        ["P/E", "Actionnaire", "12-18x", "25-50x", "8-12x"],
        ["P/B", "Banques, foncières", "1,5-2,5x", "5-10x", "0,8-1,5x"],
        ["EV/FCF", "Free cash yield", "12-20x", "20-35x", "N/A"],
      ],
    },
    visual: "football-field",
    pitfalls: [
      "Comparer des entreprises à des stades très différents",
      "Mélanger données passées (LTM) et futures (NTM)",
      "Oublier les retraitements (add-backs, IFRS 16)",
      "Trop peu de comparables ou trop hétérogènes",
      "Donner une moyenne sans préciser la médiane",
      "Mélanger un agrégat « equity » (Net Income, EPS) avec l'EV, ou un agrégat « firme » (EBITDA, Sales) avec l'Equity Value — la cohérence numérateur/dénominateur est un piège classique testé à l'oral.",
    ],
  },
  {
    id: "c9",
    category: "ts",
    title: "Quality of Earnings (QoE)",
    simple:
      "La QoE cherche l'EBITDA « normal », celui qu'on peut reproduire chaque année. On retire les éléments exceptionnels pour voir la vraie performance de l'entreprise.",
    intuition:
      "Le prix M&A se base souvent sur multiple × EBITDA. Chaque million d'EBITDA en plus à 8× = 8 M€ de valeur — d'où la chasse aux add-backs.",
    formula:
      "EBITDA ajusté = EBITDA reporté\n  ± Add-backs (non récurrents, non opérationnels, non cash)",
    steps: [
      "Add-back positif : retire une charge exceptionnelle (restructuration, frais M&A, litige unique).",
      "Add-back négatif : retire un gain exceptionnel (vente d'actif, gain de change).",
      "Chaque ligne doit être documentée (facture, contrat).",
      "Au-delà de 15–20 % de l'EBITDA reporté, les acheteurs deviennent méfiants.",
    ],
    example: {
      label: "Exemple express",
      body: "EBITDA reporté 40 M€ + plan social unique 2 M€ + honoraires M&A 1 M€ → EBITDA ajusté 43 M€. À 8×, +3 M€ d'EBITDA = +24 M€ d'EV.",
    },
    interview:
      "Savoir distinguer add-backs « one-shot » et charges qui se répètent chaque année.",
    table: {
      headers: ["Type d'add-back", "Exemple", "Impact EBITDA", "Acceptation marché"],
      rows: [
        ["Restructuration", "Plan de départ 2M€", "+2M€", "Élevée (90%)"],
        ["Litige réglé", "Indemnité unique", "+ montant", "Élevée"],
        ["M&A fees", "Honoraires juridiques", "+1M€", "Élevée"],
        ["Lancement produit", "Marketing one-shot", "+ partiel", "Moyenne (50%)"],
        ["Management fees holding", "1% du CA", "+ retiré", "Élevée si tiers normalisé"],
        ["COVID impact", "Sur/sous-performance", "Débattu", "Faible (variable)"],
        ["IFRS 16 (leasing)", "Rents → Amort+Int", "Souvent retraité", "Pratique courante"],
      ],
    },
    pitfalls: [
      "Add-backs qui se répètent chaque année (pas vraiment exceptionnels)",
      "Pas de justificatif par ligne",
      "EBITDA ajusté très supérieur au cash sans explication",
      "Trop d'add-backs (>15-20 % de l'EBITDA)",
    ],
  },
  {
    id: "c10",
    category: "ts",
    title: "Net Debt et Debt-like items",
    simple:
      "La dette nette détermine combien l'acheteur paie vraiment (Equity Value = EV − dette nette). Chaque ligne négociée peut valoir des millions.",
    intuition:
      "Tout ce que l'acheteur devra payer après le closing, hors BFR courant, ressemble à de la dette — et réduit le prix payé aux vendeurs.",
    formula:
      "Net Debt = Dette financière − Cash\n  + Debt-like − Cash-like",
    steps: [
      "Dette classique : emprunts, obligations, RCF tirée.",
      "Cash « vrai » seulement : pas le cash bloqué ni le minimum opérationnel.",
      "Debt-like : provisions retraites, earn-outs dus, dividendes promis, parfois leasing IFRS 16.",
      "En SPA, chaque ligne de dette nette se négocie une par une.",
    ],
    example: {
      label: "Exemple express",
      body: "EV 100. Emprunts 40, cash dispo 10, retraites 5, earn-out dû 3 → dette nette 38. Equity Value = 100 − 38 = 62 M€. Chaque million de debt-like = 1 M€ de moins pour le vendeur.",
    },
    interview:
      "Ne jamais mettre le BFR opérationnel dans la dette nette (double comptage avec le locked box / completion).",
    table: {
      headers: ["Élément", "Catégorie", "Logique"],
      rows: [
        ["Emprunts bancaires", "Dette pure", "Évident"],
        ["Obligations émises", "Dette pure", "Évident"],
        ["RCF tirée", "Dette pure", "Si > 0"],
        ["Cash et équivalents", "Cash", "Évident"],
        ["Cash trapped (étranger)", "Restricted", "Coûts de rapatriement"],
        ["Cash minimum opérationnel", "Restricted", "Non disponible"],
        ["Provisions retraites non financées", "Debt-like", "Engagement futur"],
        ["Earn-outs sur passé", "Debt-like", "Paiement futur certain"],
        ["Dividendes à payer", "Debt-like", "Engagement"],
        ["Leasing IFRS 16", "Débattu", "Pratique de marché : oui"],
        ["Over-aged payables", "Debt-like", "Tension trésorerie"],
        ["Comptes courants positifs actionnaires", "Cash-like", "Récupéré"],
      ],
    },
    pitfalls: [
      "Oublier les garanties et engagements hors bilan",
      "Tout le cash n'est pas disponible pour l'acheteur",
      "Sous-estimer les provisions retraites",
      "Mettre le BFR opérationnel dans la dette nette (double comptage)",
    ],
  },
  {
    id: "c11",
    category: "ma",
    title: "Process M&A — du teaser au closing",
    simple:
      "Une vente d'entreprise suit en général 7 à 8 étapes sur 6 à 12 mois : préparation, recherche d'acheteurs, offres, due diligence, négociation, signature, closing.",
    intuition:
      "Ce n'est pas un sprint : 6 à 12 mois, avec un moment clé — signing ≠ closing (souvent 3 à 6 mois entre les deux).",
    formula:
      "Préparation → Marketing → 1er tour → DD\n  → 2nd tour → Signing → Closing → Post-closing",
    steps: [
      "Préparation : IM + VDD (due diligence vendeur).",
      "Marketing : teaser anonyme, puis IM sous NDA.",
      "1er tour : offres indicatives non engageantes.",
      "Short-list + dataroom / DD approfondie, puis offres fermes + mark-up SPA.",
      "Signing (engagement juridique) puis Closing (paiement après conditions).",
    ],
    example: {
      label: "Exemple express",
      body: "Deal mid-cap typique : M0–M2 préparation, M3–M4 1er tour, M4–M6 DD, M7 signing, M9–M12 closing après antitrust / financement.",
    },
    interview:
      "Ne jamais confondre signing et closing — et mentionner la clause MAC et locked box vs completion.",
    table: {
      headers: ["Phase", "Durée", "Livrable clé", "Acteur principal"],
      rows: [
        ["Préparation", "M0-M2", "IM, teaser, VDD", "Banque sell-side"],
        ["Marketing", "M2-M3", "NDA signées", "Banque sell-side"],
        ["1er tour", "M3-M4", "Offres indicatives", "Acheteurs"],
        ["Due diligence", "M4-M6", "Rapports DD", "Conseils acheteurs"],
        ["2nd tour", "M6-M7", "Offres fermes + SPA mark-up", "Acheteurs"],
        ["Signing", "M7", "SPA signé", "Conseils juridiques"],
        ["Closing", "M9-M12", "Levée conditions, paiement", "Banques + juridique"],
        ["Post-closing", "M12+", "Ajustement prix, intégration", "Management"],
      ],
    },
    visual: "ma-process",
    pitfalls: [
      "Confondre signing et closing",
      "Sous-estimer le délai antitrust sur les gros deals",
      "Ignorer la clause MAC (changement défavorable majeur)",
      "Ne pas anticiper locked box vs completion accounts",
    ],
  },
  {
    id: "c12",
    category: "ma",
    title: "Locked Box vs Completion Accounts",
    simple:
      "Deux façons de fixer le prix final. Locked box : prix figé sur un bilan passé. Completion accounts : prix ajusté au closing selon la dette nette et le BFR réels.",
    intuition:
      "Locked box = certitude tôt (Europe / PE). Completion = précision au closing, mais plus de litiges (US).",
    formula:
      "Locked Box : prix figé à T-passé + ticking fee\nCompletion : prix ajusté Net Debt / BFR au closing",
    steps: [
      "Locked box : comptes d'une date passée ; interdiction de « vider » la société (leakage) ; ticking fee pour le délai.",
      "Completion : recalcul dette nette et BFR au closing — plus juste, plus d'audits post-deal.",
      "Choisir selon stabilité de la cible et pratique régionale.",
    ],
    example: {
      label: "Exemple express",
      body: "Equity locked box 80 M€ au 31/12, closing 30/06, ticking 5 %/an → ~2 M€. Prix ≈ 82 M€ figé. En completion, +5 M€ de dette nette imprévue → prix 75 M€.",
    },
    interview:
      "Résumer en une phrase : locked box = simplicité ; completion = précision mais complexité.",
    table: {
      headers: ["Critère", "Locked Box", "Completion Accounts"],
      rows: [
        ["Date de référence", "Passée (3-6 mois avant)", "Date du closing"],
        ["Certitude du prix", "Élevée (dès signing)", "Faible (ajusté post-closing)"],
        ["Risque entre signing et closing", "Acheteur (ticking fee) ; leakage = vendeur", "Acheteur"],
        ["Compensation", "Ticking fee (intérêts)", "Aucun (réel)"],
        ["Complexité", "Plus simple, rapide", "Plus complexe, audit"],
        ["Litiges", "Limités", "Fréquents"],
        ["Région privilégiée", "Europe (PE)", "US"],
        ["Cibles", "Stables", "Volatiles ou complexes"],
      ],
    },
    pitfalls: [
      "Leakages mal définis en locked box",
      "Ticking fee trop bas pour le vendeur",
      "Oublier des lignes dans la dette nette (completion)",
      "Mauvaise estimation du BFR normatif",
    ],
  },
  {
    id: "c13",
    category: "ma",
    title: "Synergies — types et valorisation",
    simple:
      "Les synergies, c'est la valeur en plus créée après la fusion : économies de coûts, ventes croisées, etc. Elles expliquent souvent pourquoi l'acheteur paie une prime.",
    intuition:
      "Les synergies de coûts sont les plus crédibles ; les synergies de revenus se vendent bien en pitch mais se réalisent moins souvent.",
    formula:
      "NPV Synergies = Σ (Synergies × (1−t)\n  − Coûts d'intégration) / (1+WACC)^t",
    steps: [
      "Coûts (70–90 % de réalisation) : doublons, achats, IT — délai 1–2 ans.",
      "Revenus (50–65 %) : cross-sell — délai 3–5 ans, plus risqué.",
      "Fiscales / financières : déficits, WACC — effets plus modestes.",
      "Toujours netter des coûts d'intégration (souvent 1–2× les synergies annuelles).",
    ],
    example: {
      label: "Exemple express",
      body: "Synergies coûts 20 M€/an, coûts d'intégration 30 M€ an 1, IS 25 %, WACC 8 %. La NPV de ces flux nets justifie une partie de la prime payée.",
    },
    interview:
      "Ne jamais annoncer 100 % des synergies dès l'an 1 — et distinguer brutes vs nettes.",
    table: {
      headers: ["Type", "Exemple", "Taux de réalisation", "Délai"],
      rows: [
        ["Coûts de structure", "Suppression siège", "85-95%", "12-18 mois"],
        ["Coûts opérationnels", "Sourcing groupé", "70-85%", "24-36 mois"],
        ["Coûts IT", "Consolidation systèmes", "60-75%", "24-48 mois"],
        ["Revenus cross-sell", "Nouveaux produits", "50-65%", "36-60 mois"],
        ["Revenus géographiques", "Nouveaux marchés", "40-55%", "36-72 mois"],
        ["Fiscales", "Déficits, structure", "Variable", "12-24 mois"],
        ["Financières (WACC)", "Diversification risque", "Modeste", "Long terme"],
      ],
    },
    visual: "synergies-jcurve",
    pitfalls: [
      "Surestimer les synergies de revenus",
      "Oublier les coûts d'intégration",
      "Annoncer toutes les synergies dès l'an 1",
      "Pas de plan concret (qui, quand, combien)",
      "Confondre synergies brutes et nettes",
    ],
  },
  {
    id: "c14",
    category: "valuation",
    title: "CAPM et calcul du Beta",
    simple:
      "Le CAPM estime ce que demandent les actionnaires : Ke = taux sans risque + β × prime de risque. Le beta mesure si l'action bouge plus ou moins que le marché.",
    intuition:
      "β = 1 suit le marché ; β > 1 plus volatile ; β < 1 plus stable. On ne prend presque jamais le beta « brut » de la cible.",
    formula:
      "Ke = Rf + β × (Rm − Rf)\n  + primes (size, country, illiquidity)",
    steps: [
      "Rf : obligation d'État long terme (OAT 10 ans en zone euro ; aux US, interpolé ~20 ans). Jamais un taux monétaire court terme (Fed Funds, Euribor, LIBOR).",
      "Prendre des comparables cotés.",
      "Déléverage : β_u = β_l / (1 + (1−t) × D/E).",
      "Médiane des β unlevered, puis releverage à la structure cible.",
      "Brancher Ke dans le WACC ; ajouter une prime de taille pour les mid-caps non cotées.",
    ],
    example: {
      label: "Exemple express",
      body: "Rf 3,5 %, β 1,2, ERP 5,5 % → Ke = 3,5 % + 1,2 × 5,5 % = 10,1 %.",
    },
    interview:
      "Citez toujours le parcours unlever / relever — et un Rf d'obligation long terme, jamais un taux monétaire court.",
    table: {
      headers: ["Secteur", "β unlevered typique", "β levered (typique)", "Caractère"],
      rows: [
        ["Utilities", "0,4-0,6", "0,5-0,7", "Défensif"],
        ["Consumer staples", "0,5-0,7", "0,7-0,9", "Défensif"],
        ["Pharma", "0,6-0,9", "0,7-1,0", "Défensif"],
        ["Industrie", "0,8-1,1", "1,0-1,3", "Cyclique modéré"],
        ["Tech", "1,0-1,4", "1,1-1,5", "Cyclique"],
        ["Luxe", "1,0-1,3", "1,1-1,4", "Cyclique"],
        ["Auto", "1,1-1,5", "1,3-1,7", "Très cyclique"],
        ["Banques", "0,8-1,2", "1,2-1,8", "Très levered"],
        ["Mines / Commodities", "1,2-1,8", "1,3-2,0", "Très cyclique"],
      ],
    },
    visual: "beta-sectors",
    pitfalls: [
      "Beta levered utilisé sans déléverage",
      "Prendre Fed Funds, Euribor ou LIBOR comme Rf au lieu d'une obligation d'État long terme",
      "Période de calcul trop courte ou trop longue",
      "Pas de prime small cap pour une mid-cap",
      "Oublier le risque pays à l'étranger",
      "Beta négatif sans vérifier les données",
    ],
  },
  {
    id: "c15",
    category: "accounting",
    title: "EBITDA — utilité et limites",
    simple:
      "L'EBITDA mesure la rentabilité opérationnelle avant intérêts, impôts et amortissements. C'est l'indicateur le plus utilisé en M&A, mais ce n'est pas du cash.",
    intuition:
      "On l'aime parce qu'il compare des dettes et fiscalités différentes — mais il ignore CAPEX, BFR et intérêts.",
    formula: "EBITDA = Résultat d'exploitation\n  + Amortissements + Dépréciations",
    steps: [
      "Avant intérêts → comparable entre structures de dette.",
      "Avant impôts → comparable entre pays.",
      "Avant D&A → neutralise les choix d'amortissement.",
      "Toujours croiser avec CFO et CAPEX : EBITDA ↑ + cash ↓ = alerte.",
    ],
    example: {
      label: "Exemple express",
      body: "EBITDA 80 M€ mais CAPEX 40 et ΔBFR +25 → le cash opérationnel est bien plus bas que l'EBITDA ne le laisse croire.",
    },
    interview:
      "Dire « EBITDA n'est pas du cash » et expliquer IFRS 16 (loyers → amort + intérêts).",
    table: {
      headers: ["Métrique", "Inclut", "Exclut", "Usage"],
      rows: [
        [
          "EBITDA",
          "Opérations courantes",
          "Intérêts, IS, D&A, BFR, CAPEX",
          "Multiples de valorisation",
        ],
        [
          "EBITDA − CAPEX",
          "Idem + CAPEX maintenance",
          "Intérêts, IS, BFR, CAPEX growth",
          "Industries lourdes",
        ],
        ["EBIT", "Opérations + D&A", "Intérêts, IS, BFR, CAPEX", "ROCE, valorisation alternative"],
        ["CFO (Cash Flow Opérationnel)", "Cash réel généré", "CAPEX, financement", "Réalité cash"],
        ["FCFF", "CFO + intérêts × (1−t) − CAPEX", "Aucun (cash to firm)", "DCF"],
        [
          "FCFE",
          "FCFF − intérêts × (1−t) + emprunts nets",
          "Cash to equity only",
          "DDM, valuation equity",
        ],
      ],
    },
    pitfalls: [
      "Confondre EBITDA et cash",
      "Comparer EBITDA reporté et EBITDA ajusté",
      "Oublier l'effet IFRS 16 (loyers → amort + intérêts)",
      "EBITDA positif mais cash négatif (BFR)",
      "Marge EBITDA haute mais ROCE faible",
    ],
  },
  {
    id: "c16",
    category: "valuation",
    title: "DDM — Gordon, 2 étapes et H-model",
    simple:
      "Le DDM valorise une action en additionnant les dividendes futurs, ramenés à aujourd'hui. Utile pour les banques, assurances et utilities, où les dividendes sont stables et plus lisibles que les free cash flows.",
    intuition:
      "Quand le dividende est prévisible (banques, utilities), actualiser les dividendes peut être plus clair qu'un DCF classique.",
    formula:
      "Gordon : P0 = D1 / (Ke − g)\n2 étapes : Σ Dt/(1+Ke)^t + Pn/(1+Ke)^n",
    steps: [
      "Gordon : croissance constante g < Ke — sociétés matures seulement.",
      "2 étapes : projection explicite puis Gordon terminal — banques en transition.",
      "H-model : g décline linéairement de gs à gl — évite le cliff brutal.",
      "Ke vient du CAPM ; le DDM donne directement l'Equity Value.",
    ],
    example: {
      label: "Exemple express",
      body: "D1 = 2 €, Ke = 8 %, g = 2 % → P0 = 2 / 0,06 = 33,3 €. Si g = 3 %, P0 = 40 € — sensibilité extrême à g.",
    },
    interview:
      "Ne jamais appliquer Gordon à une tech sans dividende ; rappeler g < Ke sinon le modèle casse.",
    table: {
      headers: ["Modèle", "Hypothèse clé", "Secteur type", "Piège"],
      rows: [
        ["Gordon", "g constant, g < Ke", "Utility mature, REIT", "g trop élevé"],
        ["2 étapes", "Croissance explicite puis stable", "Banque en transition", "TV mal calibrée"],
        ["H-model", "g décline linéairement", "Utility qui monte le dividende", "H mal estimé"],
        ["DDM vs DCF", "Dividendes vs FCFF", "FIG / utilities", "Payout ≠ 100 % FCF"],
      ],
    },
    pitfalls: [
      "g ≥ Ke (modèle invalide)",
      "Appliquer Gordon à une tech en forte croissance sans dividende",
      "Oublier que le DDM donne l'Equity Value directement (pas l'EV)",
      "Payout ratio non soutenable à long terme",
      "Ke incohérent avec le beta du secteur",
    ],
  },
  {
    id: "c17",
    category: "ma",
    title: "Process IPO — book-building, greenshoe, lock-up",
    simple:
      "Une IPO, c'est l'entrée en Bourse d'une société privée. On fixe le prix via le book-building (carnets d'ordres des investisseurs). La greenshoe aide à stabiliser le cours ; le lock-up empêche les insiders de tout vendre tout de suite.",
    intuition:
      "Le marché « vote » le prix pendant le book-building. Greenshoe et lock-up évitent que les premiers jours de cotation partent en vrille.",
    formula:
      "Flottant = Actions vendues / Capital post-IPO\nGreenshoe = +15 % max (sur-allocation)",
    steps: [
      "Préparation : audit, prospectus, choix de place (6–9 mois).",
      "Roadshow puis book-building : ordres prix × quantité.",
      "Pricing & allocation, première cotation.",
      "Greenshoe (~15 %) pour stabiliser ; lock-up 90–180 jours pour les insiders.",
    ],
    example: {
      label: "Exemple express",
      body: "Dual track : IPO parallèle à un process M&A pour maximiser la tension. Lineage Logistics (2024) — grosse IPO US cold storage, book institutionnel massif.",
    },
    interview:
      "Distinguer prix d'offre et premier cours (pop) ; citer greenshoe et lock-up sans les confondre.",
    table: {
      headers: ["Élément", "Rôle", "Durée / taille", "Pour qui"],
      rows: [
        ["Book-building", "Découverte prix-demande", "1-2 semaines", "Institutionnels"],
        ["Fourchette indicative", "Guide de pricing", "±10-15 % du prix final", "Marché"],
        ["Greenshoe", "Stabilisation cours", "Jusqu'à +15 % actions", "Syndicat lead"],
        ["Lock-up", "Interdiction de vente insiders", "90-180 jours", "Fondateurs, PE"],
        ["Dual track", "IPO vs M&A en parallèle", "Tout le process", "Vendeur PE/stratégique"],
        ["Flottant", "Liquidité boursière", "15-30 % typique mid-cap", "Investisseurs publics"],
      ],
    },
    visual: "ipo-process",
    pitfalls: [
      "Confondre prix d'offre et premier cours de bourse (pop)",
      "Oublier les frais (underwriting ~3-7 %)",
      "Ignorer le lock-up dans l'analyse du flottant réel",
      "Dual track sans NDA et calendrier alignés",
    ],
  },
  {
    id: "c18",
    category: "ma",
    title: "Squeeze-out, OPA et OPE",
    simple:
      "OPA : offre en cash pour prendre le contrôle (seuil 30 % en France). OPE : même logique, mais on paie en titres (échange d'actions). Squeeze-out : une fois à 90 %, on peut forcer les minoritaires restants à vendre. Pour sortir de la cote, c'est plutôt l'OPR puis le squeeze-out.",
    intuition:
      "OPA = cash, OPE = titres, squeeze-out = forcer à 90 %. L'OPE seule ne sort pas de la cote — c'est l'OPR + squeeze-out.",
    formula:
      "OPA / OPE : seuil 30 % (déclenchement FR)\nSqueeze-out : 90 % capital ou votes (PACTE)",
    steps: [
      "OPA : contrôle payé en cash, prime souvent 20–40 % vs cours.",
      "OPE : contrôle payé en actions de l'acquéreur — conserve la trésorerie.",
      "À ≥ 90 % : OPR puis squeeze-out pour forcer les minoritaires / delisting.",
      "Acquisition = contrôle ; fusion = combinaison juridique (souvent « fusion » = acquisition + prime).",
    ],
    example: {
      label: "Exemple express",
      body: "UniCredit / Commerzbank : OPA hostile cash. Après une offre réussie à 90 %, squeeze-out possible pour simplifier le capital.",
    },
    interview:
      "Ne jamais confondre OPE (échange) et OPR/delisting — citer un deal récent aide.",
    table: {
      headers: ["Mécanisme", "Objectif", "Seuil clé", "Exemple type"],
      rows: [
        ["OPA", "Contrôle (paiement cash)", "30 % déclenchement (FR)", "UniCredit/CBK"],
        ["OPE", "Contrôle (paiement en titres)", "30 % déclenchement (FR)", "Offre d'échange cross-border"],
        ["OPA amicale", "Accord conseil cible", "Négocié", "L'Oréal/Aesop"],
        ["OPR + Squeeze-out", "Forcer minoritaires / delisting", "90 % capital ou votes", "Simplification groupe"],
        ["Fusion", "Entités combinées", "Accord 2/3 AG", "UBS/CS (urgence)"],
        ["Acquisition", "Achat de contrôle", "Variable", "Majorité des deals"],
      ],
    },
    pitfalls: [
      "Confondre OPE (échange de titres) et OPR/delisting",
      "Oublier la prime réglementaire minimale",
      "Ignorer les seuils allemands vs français dans un deal cross-border",
      "Squeeze-out impossible si seuils non atteints",
    ],
  },
  {
    id: "c19",
    category: "ma",
    title: "Earn-out, Vendor Loan et Revenue-based pricing",
    simple:
      "Trois façons d'ajuster le prix après le closing : earn-out (je te paie si tu performes), vendor loan (je te paie plus tard avec intérêts), revenue-based pricing (le prix suit le CA).",
    intuition:
      "Quand vendeur et acheteur ne sont pas d'accord sur la valeur, on décale une partie du prix dans le futur — sous conditions ou avec intérêts.",
    formula:
      "Prix = Upfront + Earn-out + Vendor Loan\nRBP : Prix = f(CA futur)",
    steps: [
      "Earn-out : payé si KPIs atteints (1–5 ans) — risque de « management » des KPIs par l'acheteur.",
      "Vendor loan : crédit-vendeur différé (10–30 %), subordonné, taux ~4–8 %.",
      "RBP : indexation sur le CA — fréquent en SaaS early-stage.",
      "Souvent combinés : ex. upfront 70 % + earn-out 20 % + vendor loan 10 %.",
    ],
    example: {
      label: "Exemple express",
      body: "Deal 100 : 70 cash au closing, 20 earn-out sur EBITDA an 2–3, 10 vendor loan sur 3 ans à 6 %. Le vendeur reste exposé à la performance.",
    },
    interview:
      "Distinguer earn-out passé (debt-like en Net Debt) et earn-out futur (composante de prix).",
    table: {
      headers: ["Mécanisme", "Déclencheur", "Qui porte le risque", "Litiges"],
      rows: [
        ["Earn-out", "KPIs futurs (EBITDA, CA)", "Vendeur (performance)", "Très fréquents"],
        ["Vendor Loan", "Échéancier contractuel", "Vendeur (crédit)", "Modérés"],
        ["RBP", "CA réalisé", "Vendeur (volume)", "Définition du CA"],
        ["Escrow", "Indemnités garanties", "Vendeur (bloqué)", "Post-closing"],
        ["CVR", "Événement boursier (biotech)", "Acheteur (option)", "Spécifique pharma"],
      ],
    },
    pitfalls: [
      "Earn-out mal documenté (source de litige #1 post-deal)",
      "Vendor loan sans subordination claire",
      "RBP avec définition de CA trop large (consolidé vs standalone)",
      "Confondre earn-out passé (debt-like) et earn-out futur (prix)",
    ],
  },
  {
    id: "c20",
    category: "dcf",
    title: "Pont Net Income → Free Cash Flow",
    simple:
      "Le pont relie le résultat net comptable au cash réellement disponible. C'est la base du DCF : on part du P&L, on retire les éléments non-cash et on intègre les investissements.",
    intuition:
      "Le résultat net n'est pas du cash. On ajoute le non-cash, on retire BFR et CAPEX, puis on ajuste les intérêts pour obtenir le FCFF.",
    formula:
      "FCFF = NI + D&A − ΔBFR − CAPEX + Int.(1−t)\nou : EBIT×(1−t) + D&A − CAPEX − ΔBFR",
    steps: [
      "Partir du Net Income.",
      "+ D&A (non-cash).",
      "− Δ BFR (hausse = sortie de cash).",
      "− CAPEX.",
      "+ Intérêts × (1−t) pour passer en vision « entreprise » = FCFF.",
    ],
    example: {
      label: "Exemple express",
      body: "NI 50 + D&A 20 − ΔBFR 15 − CAPEX 25 + 8 × 0,75 = 36. Malgré un NI de 50, le cash « entreprise » n'est que 36.",
    },
    interview:
      "Ne pas confondre FCFF (WACC) et FCFE (Ke) — et faire boucler le pont avec les 3 états.",
    table: {
      headers: ["Étape", "Impact cash", "Non-cash ?", "Oubli fréquent"],
      rows: [
        ["Net Income", "Départ", "—", "—"],
        ["+ D&A", "Ajout", "Oui", "Provision non-cash"],
        ["− Δ BFR", "Si BFR ↑ = sortie", "Non", "Saisonnalité"],
        ["− CAPEX", "Sortie", "Non", "Maintenance vs growth"],
        ["+ Int.(1−t)", "Reclassement FCFF", "Non", "Actualiser au WACC"],
        ["= FCFF", "Base DCF", "—", "Confondre avec FCFE"],
      ],
    },
    visual: "ni-fcff-bridge",
    pitfalls: [
      "Oublier le Δ BFR dans une entreprise en forte croissance",
      "Confondre FCFF (WACC) et FCFE (Ke)",
      "CAPEX = D&A en perpetuity sans vérifier le secteur",
      "Double comptage des intérêts",
    ],
  },
  {
    id: "c21",
    category: "valuation",
    title: "Football Field — synthèse de valorisation",
    simple:
      "Le football field est un graphique qui empile les fourchettes de valorisation de chaque méthode (DCF, comps, transactions, LBO). On ne défend pas un prix unique : on montre la zone où les méthodes se rejoignent.",
    intuition:
      "La valorisation n'est pas une science exacte. On montre où DCF, comps et deals se chevauchent — c'est la zone « défendable ».",
    formula:
      "Fair value = zone de chevauchement\nLargeur barre = sensibilité de la méthode",
    steps: [
      "Afficher 4–5 méthodes : DCF, trading comps, deal comps, LBO (± DDM / brokers).",
      "Chaque barre = fourchette (sensibilités), pas un point.",
      "Lire la zone commune comme fourchette board.",
      "Exclure les méthodes non pertinentes plutôt que de les minorer.",
    ],
    example: {
      label: "Exemple express",
      body: "DCF 90–120, trading 95–110, deals 100–130, LBO 85–105 → zone commune ~100–105. Une barre DCF 70–150 signale des hypothèses trop sensibles.",
    },
    interview:
      "Ne jamais présenter un prix unique ; dater la valorisation et justifier les exclusions.",
    table: {
      headers: ["Méthode", "Borne basse", "Borne haute", "Quand exclure"],
      rows: [
        ["DCF", "WACC élevé, g bas", "WACC bas, g haut", "Données flux faibles"],
        ["Trading comps", "Médiane − décote", "Médiane + prime", "Pas de comparables"],
        ["Deal comps", "Transactions − prime", "Transactions + prime", "Peu de deals récents"],
        ["LBO", "TRI 25 %+", "TRI 18-20 %", "Cible non LBO-able"],
        ["DDM", "Ke élevé", "Ke bas", "Hors FIG/utilities"],
        ["ANR", "Actif net retraité", "Liquidation", "Holding, foncière"],
      ],
    },
    visual: "football-field",
    pitfalls: [
      "Présenter un point unique au lieu d'une fourchette",
      "Mélanger dates de valorisation entre méthodes",
      "Inclure des méthodes non pertinentes pour faire « sérieux »",
      "Oublier la prime de contrôle dans les trading comps",
    ],
  },
  {
    id: "c22",
    category: "ma",
    title: "Restructuring et Distressed M&A",
    simple:
      "Quand la dette dépasse la valeur de l'entreprise, les actionnaires ne valent plus grand-chose. On restructure la dette (souvent en donnant des actions aux créanciers) ou on vend les actifs à prix « distressed ».",
    intuition:
      "Si EV < dette totale, l'equity vaut 0. Les créanciers deviennent les vrais décideurs.",
    formula:
      "EV < Dette totale → equity ≈ 0\nDebt-for-equity : créanciers → actionnaires",
    steps: [
      "Cash insuffisant / covenants cassés → détresse.",
      "Waterfall : senior récupère d'abord, juniors et equity dilués ou effacés.",
      "Debt-for-equity ou vente d'actifs distressed (souvent sans toute la dette).",
      "Connaître Chapter 11 (US), scheme (UK), sauvegarde / conciliation (FR).",
    ],
    example: {
      label: "Exemple express",
      body: "EV going concern 80, dette 120 → equity = 0. Seniors (80) prennent toute la valeur ; juniors et ancien equity sont effacés ou dilués.",
    },
    interview:
      "Ne jamais valoriser l'equity comme en going concern ; citer la waterfall des créanciers.",
    table: {
      headers: ["Mécanisme", "Juridiction", "Qui perd", "Qui gagne"],
      rows: [
        ["Chapter 11", "US", "Equity, juniors", "Senior, DIP lenders"],
        ["Scheme of arrangement", "UK", "Equity diluée", "Créanciers votants"],
        ["Conciliation / sauvegarde", "France", "Actionnaires", "Plan de continuation"],
        ["Debt-for-equity", "Tous", "Ancien equity", "Créanciers convertis"],
        ["363 sale (asset)", "US", "Dette résiduelle", "Acheteur d'actifs"],
        ["Stalking horse", "US/EU", "—", "Acheteur de référence"],
      ],
    },
    visual: "distressed-waterfall",
    pitfalls: [
      "Valoriser l'equity comme en going concern",
      "Ignorer la waterfall des créanciers (senior vs sub vs holdco)",
      "Confondre restructuring opérationnel et financier",
      "Oublier le risque de litige entre classes de créanciers",
    ],
  },
  {
    id: "c23",
    category: "accounting",
    title: "IFRS vs US GAAP — 10 différences clés",
    simple:
      "IFRS (Europe) et US GAAP (États-Unis) sont deux « langages » comptables. Ils divergent surtout sur le leasing, la R&D et quelques postes de cash. En M&A, ça change l'EBITDA, la dette nette et donc le prix.",
    intuition:
      "Même business, deux normes → EBITDA et dette nette différents. IFRS 16 (leasing) est l'écart le plus négocié en SPA.",
    formula:
      "Écart comptable → retraitement QoE / Net Debt\n→ impact EBITDA, FCF, multiples",
    steps: [
      "Identifier la norme des comptes (US GAAP vs IFRS).",
      "Retraiter les écarts clés : leasing, R&D, SBC, classification cash.",
      "IFRS 16 : loyer sort de l'EBITDA, dette de leasing entre au bilan.",
      "Appliquer ensuite QoE / Net Debt comme d'habitude.",
    ],
    example: {
      label: "Exemple express",
      body: "Loyer 10 M€/an. Avant : EBITDA −10. Après IFRS 16 : EBITDA +10, mais +40–60 M€ de dette leasing. Multiples et Net Debt changent d'un coup.",
    },
    interview:
      "En deal cross-border US/EU, toujours préciser sous quelle norme sont les comptes de la cible.",
    table: {
      headers: ["Thème", "IFRS", "US GAAP", "Impact M&A"],
      rows: [
        [
          "Goodwill",
          "Pas d'amortissement — test d'impairment annuel (IAS 36)",
          "Idem post-2001 (impairment only)",
          "PPA et tests de dépréciation",
        ],
        [
          "R&D",
          "Recherche en charge ; développement immobilisable si critères PIRATE (IAS 38)",
          "R&D en charge sauf logiciels internes (ASC 350-40)",
          "EBITDA ajusté, actifs incorporels",
        ],
        [
          "Leasing",
          "IFRS 16 : quasi tout au bilan (dette + droit d'usage)",
          "ASC 842 : similaire mais seuils et exemptions US",
          "Dette nette, EBITDA (loyer → amort + intérêts)",
        ],
        [
          "Revenus",
          "IFRS 15 — 5 étapes, contrôle du bien/service",
          "ASC 606 — aligné conceptuellement",
          "ARR vs revenue SaaS, contrats long terme",
        ],
        [
          "Intérêts (CFO)",
          "Choix : intérêts payés souvent en CFO ou CFF",
          "Intérêts payés en CFO (règle stricte)",
          "CFO comparabilité cross-border",
        ],
        [
          "Impairment",
          "Test valeur recouvrable (max fair value less costs / VIU)",
          "Two-step goodwill test (ASC 350)",
          "Charges exceptionnelles, QoE",
        ],
        [
          "Stock options",
          "IFRS 2 — juste valeur à l'attribution, étalement",
          "ASC 718 — modèle similaire",
          "Diluted EPS, retraitement non-cash",
        ],
        [
          "Joint-ventures",
          "Mise en équivalence (IAS 28) — pas de proportionnelle",
          "Equity method (ASC 323)",
          "Consolidation, périmètre",
        ],
        [
          "Cash flow",
          "Méthode indirecte standard ; flexibilité intérêts/dividendes",
          "Règles plus prescriptives (ASC 230)",
          "Pont NI → FCF",
        ],
        [
          "Présentation",
          "Pas de format P&L imposé (par nature ou fonction)",
          "SEC : lignes spécifiques (operating income…)",
          "Comparables US vs EU",
        ],
      ],
    },
    pitfalls: [
      "Appliquer des multiples US à des comptes IFRS sans retraitement",
      "Oublier IFRS 16 dans la dette nette",
      "Confondre ARR (métrique business) et revenue IFRS 15",
      "Supposer que goodwill est amorti sous IFRS",
    ],
  },
  {
    id: "c24",
    category: "valuation",
    title: "Treasury Stock Method (TSM) et actions diluées",
    simple:
      "Le TSM calcule combien d'actions supplémentaires existeraient si tous les détenteurs d'options dans la monnaie les exerçaient. On suppose que l'argent récolté sert à racheter des actions au cours actuel — seul le solde net (actions émises − actions rachetées) dilue vraiment le capital.",
    intuition:
      "Une option in-the-money (prix d'exercice < cours actuel) crée de nouvelles actions. Mais l'exercice rapporte du cash à l'entreprise, qui peut s'en servir pour racheter des actions — donc la dilution nette est plus faible que le nombre brut d'options.",
    formula:
      "Actions nettes nouvelles = Options in-the-money − (Produit total de l'exercice / Cours actuel)\nActions diluées = Actions de base + Actions nettes nouvelles (options) + Actions nettes nouvelles (convertibles)\nNSS : Valeur de conversion = Actions sous-jacentes × Cours actuel\nExcédent = Valeur de conversion − Montant nominal du convertible\nActions nettes NSS = Excédent / Cours actuel",
    steps: [
      "Identifier les tranches d'options in-the-money uniquement (prix d'exercice < cours actuel) — les autres sont ignorées.",
      "Calculer le produit total de l'exercice (Σ prix d'exercice × nombre d'options in-the-money).",
      "Diviser ce produit par le cours actuel pour obtenir le nombre théorique d'actions rachetées.",
      "Actions nettes nouvelles = actions in-the-money − actions rachetées.",
      "Pour les convertibles : choisir entre if-converted method et net share settlement (NSS) selon le cas — l'implied share price crée une référence circulaire (le prix dépend des actions diluées, qui dépendent du prix) : activer les itérations Excel pour la résoudre.",
    ],
    example: {
      label: "Exemple express",
      body: "20M d'options, prix d'exercice 10€, cours actuel 25€. Produit de l'exercice = 200M€. Actions rachetées = 200M€/25€ = 8M. Actions nettes nouvelles = 20M − 8M = 12M. NSS : convertible de 225 M€, prix de conversion 22,50€ → 10M actions sous-jacentes. Cours actuel 30€ → valeur de conversion 300M€. Excédent = 300 − 225 = 75M€. Actions nettes NSS = 75M€/30€ = 2,5M (vs 10M en if-converted — la NSS est presque toujours moins diluante).",
    },
    interview:
      "Toujours vérifier que l'option est in-the-money avant de l'inclure — une option hors la monnaie n'est jamais diluante. Et si le calcul boucle (le cours dépend des actions diluées), c'est normal : c'est une référence circulaire classique, pas une erreur de modèle.",
    table: {
      headers: ["Méthode", "Instrument", "Logique"],
      rows: [
        [
          "TSM",
          "Options / warrants",
          "Rachat théorique au cours actuel avec le produit de l'exercice",
        ],
        [
          "If-converted",
          "Convertibles",
          "Conversion totale, ajout des actions sous-jacentes au pair",
        ],
        [
          "Net Share Settlement (NSS)",
          "Convertibles",
          "Seul l'excédent (valeur de conversion − montant au pair) devient des actions",
        ],
      ],
    },
    pitfalls: [
      "Inclure des options hors la monnaie (exercice > cours actuel)",
      "Oublier de nettoyer le produit de l'exercice avant de calculer les actions rachetées",
      "Confondre if-converted method (conversion totale) et net share settlement (seul l'excédent devient des actions) — l'écart de dilution entre les deux peut être considérable",
      "Ne pas gérer la référence circulaire implied share price ↔ actions diluées (activer les itérations Excel)",
    ],
  },
  {
    id: "c25",
    category: "valuation",
    title: "Premium Paid Analysis",
    simple:
      "Le premium paid mesure combien l'acheteur paie en plus du cours de bourse non affecté de la cible, en %. C'est la prime que l'acheteur accepte de payer pour obtenir le contrôle.",
    intuition:
      "Le cours de bourse juste avant l'annonce a souvent déjà bougé (fuites, rumeurs) — il faut alors remonter à un cours « propre », non affecté par l'anticipation du deal.",
    formula:
      "% Premium Paid = (Offer Price per Share / Unaffected Share Price) − 1\nEquity Value = Cours unaffected × (1 + Premium) × Actions diluées\nEV = Equity Value + Dette + Préférentielles + Minoritaires − Cash",
    steps: [
      "Identifier le cours unaffected — généralement mesuré à 1, 7 et 30 jours avant l'annonce.",
      "Vérifier qu'aucune fuite, rumeur ou annonce de revue stratégique n'a déjà fait bouger le cours à ces dates.",
      "Si c'est le cas, remonter plus loin dans le temps pour trouver un cours réellement propre.",
      "Calculer la prime sur chacun des horizons (1j / 7j / 30j) pour donner une fourchette, pas un chiffre unique.",
      "Combiner avec le pont Equity → EV (c1) : Equity Value = Cours unaffected × (1 + Premium) × Actions diluées ; EV = Equity Value + Dette + Préférentielles + Minoritaires − Cash.",
    ],
    example: {
      label: "Exemple express",
      body: "Offre 20€/action. Cours 1 jour avant annonce : 17,39€ (déjà 15% de prime — fuite probable). Cours 30 jours avant (non affecté) : 14,60€ → prime réelle 37%. L'écart 15% vs 37% trahit une fuite d'information avant l'annonce officielle.",
    },
    interview:
      "Toujours préciser sur quel horizon (1j/7j/30j) la prime est calculée, et pourquoi le cours « 1 jour avant » peut être trompeur en cas de fuite.",
    table: {
      headers: ["Facteur", "Effet sur la prime", "Explication"],
      rows: [
        ["Deal hostile", "↑", "Tender offer direct aux actionnaires, risque de surenchère"],
        ["Fuite / rumeur avant annonce", "Cours déjà gonflé", "Utiliser un cours plus ancien comme référence"],
        [
          "Acheteur stratégique avec synergies",
          "↑",
          "Capacité à payer plus car création de valeur additionnelle",
        ],
        ["Cible en difficulté / vente forcée", "↓", "Moins de pouvoir de négociation côté vendeur"],
        [
          "Merger-of-equals (MOE)",
          "↓↓",
          "Consideration typiquement 100% actions, prime faible comparée à un takeover classique",
        ],
      ],
    },
    pitfalls: [
      "Utiliser le cours « 1 jour avant annonce » sans vérifier qu'il n'a pas déjà réagi à une fuite",
      "Donner un seul chiffre de prime au lieu d'une fourchette (1j/7j/30j)",
      "Appliquer une analyse de premium paid à une cible non cotée (non pertinent)",
      "Confondre prime de contrôle et prime totale (qui inclut aussi l'anticipation de synergies)",
      "Appliquer la logique takeover premium à un merger-of-equals, où la prime est structurellement plus faible",
    ],
  },
  {
    id: "c26",
    category: "ma",
    title: "Accretion / Dilution Analysis",
    simple:
      "Un deal est accrétif si l'EPS de l'acquéreur augmente après la transaction, dilutif s'il baisse. C'est le test que les acquéreurs cotés appliquent presque systématiquement avant de valider un deal.",
    intuition:
      "On compare l'EPS pro forma (après fusion) à l'EPS standalone de l'acquéreur seul. Si le nouvel ensemble génère plus de résultat net par action qu'avant, le marché y voit un signal positif.",
    formula:
      "EPS combiné pro forma = Résultat net combiné pro forma / Actions diluées pro forma\nAccretion/(Dilution) $ = EPS combiné pro forma − EPS standalone acquéreur\nAccretion/(Dilution) % = (EPS combiné pro forma / EPS standalone acquéreur) − 1\nSynergies pré-impôt pour breakeven = − (Accretion/(Dilution) $ × Actions diluées pro forma) / (1 − taux IS)",
    steps: [
      "Calculer le résultat net combiné pro forma (résultat acquéreur + résultat cible + synergies − charges financières supplémentaires liées au financement du deal − D&A additionnel sur les write-ups d'actifs).",
      "Calculer les actions diluées pro forma (actions acquéreur + actions nouvelles émises si paiement en titres).",
      "EPS combiné pro forma = résultat net combiné / actions diluées pro forma.",
      "Comparer à l'EPS standalone de l'acquéreur → accrétif si supérieur, dilutif si inférieur.",
      "Si dilutif, calculer les synergies pré-impôt nécessaires pour atteindre le breakeven.",
      "Identifier les 3 sources de financement — cash disponible, dette, actions — et leurs arbitrages : coût du capital, flexibilité du bilan, avis des agences de notation, rapidité/certitude de closing.",
    ],
    example: {
      label: "Exemple express",
      body: "Résultat net combiné 1 000, actions diluées pro forma 250M → EPS 4,00€. EPS standalone acquéreur 3,50€. Accretion = +0,50€ (+14,3%) → deal accrétif.",
    },
    interview:
      "Règle rapide pour un deal 100% actions : si le P/E de l'acquéreur est supérieur à celui de la cible, le deal est mécaniquement accrétif (et inversement). Mais accrétif ≠ créateur de valeur : un deal peut rester dilutif au départ et être justifié si les synergies sont crédibles, si l'actif est stratégique, ou si plus d'actions préservent le rating. Le test DCF/NPV reste le juge de paix économique.",
    table: {
      headers: ["Driver", "Effet sur l'accretion"],
      rows: [
        ["Prix payé plus bas", "↑ accrétif"],
        ["Financement en cash/dette peu chère plutôt qu'en actions", "↑ accrétif (pas de nouvelles actions émises)"],
        ["P/E acquéreur > P/E cible (deal tout actions)", "↑ accrétif"],
        ["Synergies élevées et rapides", "↑ accrétif"],
        ["Coût de la dette élevé", "↓ dilutif"],
        [
          "Augmenter la part actions pour préserver le rating",
          "↓ dilutif à court terme, mais protège le bilan",
        ],
      ],
    },
    pitfalls: [
      "Se focaliser uniquement sur l'accretion/dilution sans regarder la création de valeur réelle (un deal peut être accrétif mais destructeur de valeur, et inversement)",
      "Oublier les charges financières supplémentaires liées à la dette d'acquisition",
      "Oublier l'amortissement des write-ups d'actifs incorporels dans le résultat pro forma",
      "Confondre accretion/dilution (test comptable EPS) et création de valeur DCF (test économique)",
      "Ignorer que la contribution analysis (part de CA/EBITDA/résultat net/equity value apportée par chaque partie) est l'outil de référence pour un merger-of-equals, distinct de l'accretion/dilution classique",
    ],
  },
  {
    id: "c27",
    category: "lbo",
    title: "Ratios de crédit et séniorité de la dette",
    simple:
      "Les ratios de crédit mesurent la capacité d'une entreprise à porter et rembourser sa dette. Ils déterminent combien de levier un prêteur est prêt à accorder dans un LBO, et se répartissent en deux familles : ratios de levier (dette vs cash-flow) et ratios de couverture (capacité à payer les intérêts).",
    intuition:
      "Un prêteur ne regarde pas seulement « combien elle vaut » mais « combien elle peut rembourser chaque année ». Deux entreprises à l'EV identique peuvent supporter des niveaux de dette très différents selon leur génération de cash.",
    formula:
      "Levier : Dette / EBITDA, Dette senior secured / EBITDA, Dette nette / EBITDA\nCouverture : EBITDA / Intérêts, (EBITDA − Capex) / Intérêts, EBIT / Intérêts",
    steps: [
      "Dette senior secured / EBITDA : levier prioritaire, celui que regardent les prêteurs bancaires senior.",
      "Dette totale / EBITDA : levier global de la structure, y compris subordonnée / high yield.",
      "EBITDA / Intérêts (interest coverage) : plus il est élevé, plus la structure est solide — un ratio bas signale un risque de défaut sur les intérêts.",
      "(EBITDA − Capex) / Intérêts : version plus stricte, retire le capex avant de mesurer la capacité à payer les intérêts — pertinent pour les activités capitalistiques.",
      "Ces ratios se lisent dans le temps : un LBO réussi voit le levier baisser et la couverture augmenter (désendettement).",
    ],
    example: {
      label: "Exemple express",
      body: "LTM EBITDA 700, intérêts 248,5, dette senior secured 2 800, dette totale 3 650. EBITDA/Intérêts = 2,8x. Dette senior/EBITDA = 4,0x. Dette totale/EBITDA = 5,2x.",
    },
    interview:
      "Le levier moyen des LBO fluctue avec le cycle de crédit : ~3,9x en 2002, jusqu'à 6,1x au pic de 2007, 4,0x en 2009, puis ~6,0x en 2018. Savoir situer le cycle actuel dans cette fourchette montre une vraie culture marché.",
    table: {
      headers: ["Ratio", "Formule", "Ce qu'il mesure"],
      rows: [
        [
          "Dette senior secured / EBITDA",
          "Dette senior secured / EBITDA",
          "Levier prioritaire — ce que les prêteurs bancaires regardent en premier",
        ],
        ["Dette totale / EBITDA", "Dette totale / EBITDA", "Levier global de la structure"],
        ["Dette nette / EBITDA", "(Dette totale − Cash) / EBITDA", "Levier net de la trésorerie disponible"],
        ["EBITDA / Intérêts", "EBITDA / Charges financières", "Capacité à couvrir les intérêts"],
        [
          "(EBITDA − Capex) / Intérêts",
          "(EBITDA − Capex) / Charges financières",
          "Version plus stricte pour activités capitalistiques",
        ],
        [
          "Debt-to-Total Cap.",
          "Dette / (Dette + Capitaux propres)",
          "Poids de la dette dans la structure de financement",
        ],
      ],
    },
    pitfalls: [
      "Confondre dette senior secured/EBITDA (levier prioritaire) et dette totale/EBITDA (levier global) — deux covenants, deux seuils",
      "Utiliser l'EBITDA brut sans soustraire le capex pour un secteur très capitalistique",
      "Ignorer le cycle de crédit — un même niveau de levier n'a pas le même sens en 2007 qu'en 2009",
      "Oublier que les ratios de couverture doivent s'améliorer dans le temps (sinon alerte covenant)",
    ],
  },
  {
    id: "c28",
    category: "lbo",
    title: "Instruments de dette LBO : séniorité, covenants et maturité",
    simple:
      "Dans un LBO, tous les créanciers ne sont pas égaux : certains sont remboursés en premier (senior secured), d'autres après (subordonnés), et certains prêteurs sont structurellement derrière d'autres selon l'entité juridique qui porte la dette (OpCo vs HoldCo).",
    intuition:
      "Deux notions de priorité à ne pas confondre : la séniorité contractuelle (qui est payé en premier au sein d'une même entité) et la subordination structurelle (qui est payé en premier selon l'entité juridique qui détient les actifs).",
    formula:
      "Séniorité contractuelle (même entité) : Senior secured > Senior unsecured > Senior subordinated > Equity\nSubordination structurelle : Dette OpCo > Dette HoldCo (les actifs sont à l'OpCo)",
    steps: [
      "Ordre de maturité typique (du plus court au plus long) : Revolver → Term Loan B → Senior Notes → Senior Subordinated Notes.",
      "Dette bancaire (revolver, term loan) : prêteurs traditionnels, covenants de maintenance stricts (tests trimestriels), amortissement obligatoire (~1%/an pour un TLB, bullet final).",
      "High yield bonds : prêteurs institutionnels, covenants d'incurrence plus souples (testés seulement lors d'un événement), pas d'amortissement obligatoire avant maturité, mais call protection.",
      "Le revolver reste généralement non tiré à la clôture (undrawn at close) — coussin de liquidité (BFR saisonnier, capex imprévu), avec une commitment fee sur la portion non utilisée.",
      "Financement relais (bridge loan) : solution temporaire (≤ 1 an) en attendant un financement permanent — une commission de conversion s'applique s'il reste en place au-delà.",
    ],
    example: {
      label: "Exemple express",
      body: "Structure typique : Revolver (undrawn, maturité 5-6 ans) → Term Loan B (maturité 7 ans, amort. 1%/an) → Senior Notes (maturité 7-10 ans, aucun amort. avant échéance, call protection). En cas de défaut, le revolver et le TLB sont remboursés avant les Senior Notes.",
    },
    interview:
      "Savoir distinguer covenants maintenance (bancaires, testés en continu) et covenants incurrence (high yield, testés seulement à un événement) est un point que le livre teste explicitement — c'est aussi pourquoi les fonds PE apprécient la flexibilité des high yield malgré un coût plus élevé.",
    table: {
      headers: ["Instrument", "Prêteur type", "Covenants", "Amortissement", "Coût relatif"],
      rows: [
        ["Revolver", "Banques commerciales", "Maintenance", "Aucun (ligne de liquidité)", "Le moins cher (souvent non tiré)"],
        ["Term Loan A/B", "Banques / institutionnels", "Maintenance", "~1%/an + bullet final", "Modéré"],
        [
          "Senior Notes (High Yield)",
          "Investisseurs obligataires",
          "Incurrence (plus souples)",
          "Aucun avant maturité",
          "Plus élevé, mais flexible",
        ],
        [
          "Senior Subordinated Notes",
          "Investisseurs obligataires",
          "Incurrence",
          "Aucun avant maturité",
          "Le plus élevé (junior)",
        ],
        ["Mezzanine / PIK", "Fonds mezzanine", "Incurrence", "Aucun, intérêts capitalisables", "Élevé (10-15%), hybride dette/equity"],
      ],
    },
    pitfalls: [
      "Confondre séniorité contractuelle (même entité) et subordination structurelle (entités différentes, OpCo vs HoldCo)",
      "Croire que le revolver est automatiquement tiré à la clôture — il sert surtout de coussin de liquidité",
      "Oublier la call protection des high yield bonds, qui limite un refinancement rapide si les taux baissent",
      "Confondre covenants de maintenance (bancaires, stricts) et d'incurrence (high yield, souples)",
    ],
  },
  {
    id: "c29",
    category: "ma",
    title: "Stock Deal vs Asset Deal : structuration fiscale d'une acquisition",
    simple:
      "Racheter une entreprise, ce n'est pas toujours racheter les actions : on peut aussi racheter les actifs un par un. Le choix change qui paie combien d'impôt, et qui porte les risques cachés (litiges, passifs non identifiés).",
    intuition:
      "Stock deal = l'acheteur reprend tout, y compris les passifs inconnus, mais l'opération est plus simple et souvent moins taxée pour le vendeur. Asset deal = l'acheteur choisit ce qu'il reprend, limite son risque, et peut réévaluer fiscalement les actifs (step-up) — plus complexe, parfois plus taxé pour le vendeur (double imposition possible).",
    formula:
      "Inside basis = base fiscale des actifs de la société\nOutside basis = base fiscale des actions de la société\nDTL = (Write-up tangible + Write-up intangible) × Taux d'IS",
    steps: [
      "Cadre US (IRC, Ch. buy-side du livre). En France/Europe : pas de 338(h)(10) ; regarder droits d'enregistrement, mali/boni de fusion, intégration fiscale. Le principe stock vs asset et le step-up restent transposables, pas les dispositifs précis.",
      "Stock deal (achat d'actions) : la cible devient filiale à 100% ; l'acquéreur reprend tous les passifs (connus et inconnus). Structure la plus courante pour les C Corp aux US.",
      "Asset deal (achat d'actifs) : l'entité juridique de la cible continue d'exister ; l'acheteur choisit actifs repris et passifs assumés — protège contre les passifs cachés, plus complexe à documenter.",
      "Step-up fiscal (asset deal) : l'acheteur réévalue la base fiscale des actifs à la juste valeur → D&A déductible pendant la période de step-up, un vrai bénéfice cash.",
      "338(h)(10) (US, filiale de groupe) : hybride — stock deal juridiquement, asset deal fiscalement (step-up autorisé). Consentement conjoint acheteur/vendeur ; l'acheteur paie souvent plus cher en échange du step-up.",
      "DTL : dans un stock deal, l'amortissement du write-up GAAP n'est pas déductible fiscalement → écart base comptable/fiscale → passif d'impôt différé.",
    ],
    example: {
      label: "Exemple express",
      body: "Asset deal avec step-up de 550M€ (tangible + intangible), IS 25% → DTL de 137,5M€ ajouté au passif. Ce step-up génère du D&A fiscalement déductible — contrairement à un stock deal classique où ce D&A n'est pas déductible.",
    },
    interview:
      "Le vendeur préfère souvent un stock deal payé en titres : l'imposition de la plus-value peut être différée. Le double niveau d'imposition (société puis actionnaires à la distribution) est un risque spécifique de l'asset deal. Ne pas plaquer le 338(h)(10) US sur un deal français.",
    table: {
      headers: ["Critère", "Stock Deal", "Asset Deal"],
      rows: [
        ["Entité cible", "Disparaît (filiale de l'acquéreur)", "Continue d'exister juridiquement"],
        ["Passifs repris", "Tous, y compris inconnus", "Seulement ceux spécifiés au contrat"],
        ["Step-up fiscal", "Non (sauf 338(h)(10))", "Oui — base fiscale réévaluée"],
        [
          "Risque double imposition",
          "Non",
          "Oui, si le produit de cession est distribué aux actionnaires",
        ],
        ["Complexité", "Plus simple", "Plus complexe (transfert actif par actif)"],
        [
          "Préférence typique",
          "Vendeur (simplicité, report d'imposition si stock)",
          "Acheteur (moins de risque, step-up déductible)",
        ],
        ["Structure la plus courante (US, C Corp)", "Stock deal", "—"],
      ],
    },
    pitfalls: [
      "Croire qu'un step-up d'actifs est automatique dans un stock deal classique — seulement via une élection spécifique (338(h)(10) aux US, sans équivalent direct en France)",
      "Confondre inside basis (base fiscale des actifs) et outside basis (base fiscale des actions)",
      "Oublier le risque de double imposition en asset deal si le produit de cession est ensuite distribué aux actionnaires",
      "Plaquer telles quelles les règles fiscales américaines du livre sur un deal français/européen sans vérifier les équivalents locaux",
    ],
  },
];
