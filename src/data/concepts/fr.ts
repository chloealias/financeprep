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
      "EV = Equity Value + Dette nette\n  + Minoritaires + Provisions retraites − Associates",
    steps: [
      "Pourquoi l'EV en M&A ? Pour comparer des entreprises avec des dettes différentes : l'EV/EBITDA regarde le business, pas la structure financière.",
      "Pont Equity → EV : on ajoute la dette (l'acheteur la reprend), les minoritaires et les provisions retraites ; on retire le cash et les associates.",
      "Pont EV → Equity (prix par action) : on fait l'inverse — on retire dette, minoritaires et provisions ; on ajoute cash et associates.",
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
        ["Intérêts minoritaires", "Quote-part non détenue", "+ EV"],
        ["Provisions retraites", "Engagement futur", "+ EV"],
        ["Associates (20-50%)", "Participation non consolidée", "− EV"],
        ["Leasing IFRS 16", "Dette opérationnelle", "+ EV (débattu)"],
      ],
    },
    visual: "ev-bridge",
    pitfalls: [
      "Oublier les minoritaires dans le pont",
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
      "Projeter les FCFF (cash généré par l'activité) sur 5 à 10 ans.",
      "Calculer le WACC, le taux d'actualisation.",
      "Actualiser chaque flux : plus il est loin, moins il compte.",
      "Calculer la valeur terminale (cash après la période de projection).",
      "Sommer le tout = EV, puis retirer la dette nette pour l'Equity Value.",
    ],
    example: {
      label: "Exemple express",
      body: "FCFF an 1 = 100, WACC = 10 %. Valeur actualisée ≈ 100 / 1,10 ≈ 91. Le même flux dans 5 ans ne vaut plus que ~62. La valeur terminale (souvent 60–80 % de l'EV) amplifie cet effet — d'où les sensibilités WACC / g.",
    },
    interview:
      "Savoir dérouler les 5–6 étapes à l'oral, et expliquer pourquoi on teste plusieurs couples WACC / g.",
    table: {
      headers: ["Composant", "Formule", "Ordre de grandeur"],
      rows: [
        ["FCFF", "EBIT × (1−t) + D&A − CAPEX − ΔBFR", "Selon business"],
        ["WACC", "(E/V)×Ke + (D/V)×Kd×(1−t)", "6-12% en mid-cap"],
        ["Valeur terminale (Gordon)", "FCF × (1+g) / (WACC−g)", "60-80% de l'EV"],
        ["g (croissance perpétuelle)", "Croissance long terme", "1,5-3% (≤ inflation+1pt)"],
        ["Horizon explicite", "Période de projection", "5-10 ans"],
      ],
    },
    visual: "dcf-bridge",
    pitfalls: [
      "g supérieur à la croissance économique long terme",
      "Oublier que le BFR augmente avec le chiffre d'affaires",
      "Sous-estimer le CAPEX de maintenance",
      "Actualiser avec Ke au lieu du WACC",
      "Ne pas tester plusieurs hypothèses WACC / g",
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
      "Structure type : 30–50 % equity (fonds PE), 50–70 % dette.",
      "Créer une holding qui emprunte et achète la cible ; rembourser via les cash-flows / dividendes remontés.",
      "Trois leviers de gain : croître l'EBITDA, revendre à un multiple plus élevé, rembourser la dette.",
      "Aujourd'hui, environ la moitié du TRI vient de la perf opérationnelle, pas seulement du désendettement.",
    ],
    example: {
      label: "Exemple express",
      body: "EV 100 : Equity 40 + Dette 60. Après 5 ans, EV sortie 150, dette remboursée à 20 → equity exit 130. MOIC = 130/40 = 3,25× ; TRI ≈ 27 %.",
    },
    interview:
      "Expliquer structure, horizon et les trois leviers — et ne pas oublier BFR / CAPEX dans le business plan.",
    table: {
      headers: ["Composant", "% typique", "Coût", "Rang"],
      rows: [
        ["Equity (Sponsor + MEP)", "30-50%", "TRI cible 20-25%", "Junior"],
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
      "Levier 2 — Expansion du multiple (~15–20 %) : revendre plus cher. Peu contrôlable, dépend du marché.",
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
      "Citez toujours le parcours unlever / relever — utiliser un beta levered tel quel est une faute classique.",
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
];
