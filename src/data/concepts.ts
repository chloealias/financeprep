export const concepts = [
  {
    id: 'c1',
    category: 'valuation',
    title: 'Enterprise Value vs Equity Value',
    simple: "L'Enterprise Value (EV) représente la valeur totale de l'entreprise vue par tous les financeurs (actionnaires + créanciers). L'Equity Value (EqV) ne concerne que les actionnaires. La différence : la dette nette.",
    formula: "EV = Equity Value + Dette nette + Minoritaires + Provisions retraites − Associates",
    deepDive: "L'EV mesure la valeur OPÉRATIONNELLE de l'entreprise, indépendante de sa structure financière. C'est pourquoi on l'utilise pour comparer des entreprises avec des niveaux d'endettement différents (multiples EV/EBITDA). L'Equity Value en revanche dépend du levier : plus l'entreprise est endettée, plus l'Equity Value est petit (à EV constant). Le pont EV/EqV est central en M&A : oublier les minoritaires ou les provisions retraites est éliminatoire.",
    table: {
      headers: ["Élément", "Logique", "Impact"],
      rows: [
        ["Dette financière", "Sera repayée par l'acheteur", "+ EV"],
        ["Cash", "Récupéré par l'acheteur", "− EV"],
        ["Intérêts minoritaires", "Quote-part non détenue", "+ EV"],
        ["Provisions retraites", "Engagement futur", "+ EV"],
        ["Associates (20-50%)", "Participation non consolidée", "− EV"],
        ["Leasing IFRS 16", "Dette opérationnelle", "+ EV (débattu)"],
      ]
    },
    visual: 'ev-bridge',
    pitfalls: [
      "Oublier les minoritaires dans le pont (erreur classique)",
      "Ne pas distinguer cash 'excess' du cash opérationnel minimum",
      "Confondre dette brute et dette nette",
      "Ignorer les engagements hors bilan (retraites, garanties)"
    ]
  },
  {
    id: 'c2',
    category: 'dcf',
    title: 'Le DCF (Discounted Cash Flow)',
    simple: "Le DCF estime la valeur d'une entreprise en actualisant ses flux de trésorerie futurs. La logique : un euro demain vaut moins qu'un euro aujourd'hui à cause du risque et du coût du capital.",
    formula: "EV = Σ (FCFFₜ / (1+WACC)ᵗ) + Valeur Terminale / (1+WACC)ⁿ",
    deepDive: "Le DCF se construit en 6 étapes : (1) projeter les Free Cash Flows to Firm sur 5-10 ans, (2) calculer le WACC, (3) actualiser chaque FCF, (4) calculer la valeur terminale (Gordon-Shapiro ou multiple de sortie), (5) sommer le tout pour obtenir l'EV, (6) faire le pont vers l'Equity Value. Attention : la valeur terminale représente souvent 60-80% de la valeur totale, ce qui rend le DCF très sensible aux hypothèses (taux de croissance perpétuelle g, WACC).",
    table: {
      headers: ["Composant", "Formule", "Ordre de grandeur"],
      rows: [
        ["FCFF", "EBIT × (1−t) + D&A − CAPEX − ΔBFR", "Selon business"],
        ["WACC", "(E/V)×Ke + (D/V)×Kd×(1−t)", "6-12% en mid-cap"],
        ["Valeur terminale (Gordon)", "FCF × (1+g) / (WACC−g)", "60-80% de l'EV"],
        ["g (croissance perpétuelle)", "Croissance long terme", "1,5-3% (≤ inflation+1pt)"],
        ["Horizon explicite", "Période de projection", "5-10 ans"],
      ]
    },
    visual: 'dcf-bridge',
    pitfalls: [
      "g supérieur à la croissance économique long terme (irréaliste)",
      "Oublier la croissance du BFR avec le CA",
      "Sous-estimer le CAPEX de maintenance",
      "Mélanger FCFF avec Ke (devrait être WACC)",
      "Ne pas faire de sensibilités sur WACC/g"
    ]
  },
  {
    id: 'c3',
    category: 'dcf',
    title: 'Le WACC (Coût Moyen Pondéré du Capital)',
    simple: "Le WACC est le taux de rendement minimal exigé par l'ensemble des financeurs (actionnaires + créanciers). C'est le taux d'actualisation utilisé dans le DCF pour les Free Cash Flows to Firm.",
    formula: "WACC = (E/V) × Ke + (D/V) × Kd × (1−t)",
    deepDive: "Le coût des fonds propres (Ke) se calcule via le CAPM : Ke = Rf + β × (Rm − Rf). Le beta des comparables est délévéré pour neutraliser leur structure financière, puis relévéré avec la structure cible. Le coût de la dette (Kd) est le rendement actuel des obligations ou le spread de crédit. Le facteur (1−t) traduit le bouclier fiscal : les intérêts sont déductibles. Important : on utilise des pondérations en valeur de MARCHÉ, pas comptables.",
    table: {
      headers: ["Composant", "Source", "Niveau typique (2026)"],
      rows: [
        ["Rf (taux sans risque)", "OAT 10 ans", "~3,0%"],
        ["ERP (prime de risque)", "Damodaran, Fernandez", "5-7%"],
        ["β unlevered", "Comparables délévérés", "0,6 à 1,5"],
        ["Ke (CAPM)", "Rf + β × ERP", "8-14%"],
        ["Kd avant impôt", "Spread + Rf", "4-7% (IG), 7-12% (HY)"],
        ["WACC final", "Pondération E/V, D/V", "6-12% en mid-cap"],
      ]
    },
    visual: 'wacc-curve',
    pitfalls: [
      "Utiliser des pondérations comptables (devrait être marché)",
      "Prendre le beta levered sans délévérer",
      "Oublier le tax shield sur la dette",
      "Utiliser un WACC trop bas pour des cibles risquées (startups)",
      "Ne pas adapter aux pays émergents (country risk premium)"
    ]
  },
  {
    id: 'c4',
    category: 'accounting',
    title: 'Les 3 états financiers et leur liaison',
    simple: "Toute analyse financière repose sur 3 documents : le compte de résultat (performance sur une période), le bilan (photo à un instant), et le tableau des flux (mouvement de cash sur une période). Les 3 sont liés et se bouclent.",
    formula: "Net Income (P&L) → Equity (Bilan) | Δ Bilan → Flux | Cash final (CFS) → Cash (Bilan)",
    deepDive: "Liaison 1 : le résultat net du P&L augmente les réserves au passif du bilan. Liaison 2 : le résultat net est le point de départ du tableau de flux (méthode indirecte). Liaison 3 : les variations des postes du bilan (BFR, immo, dette, equity) alimentent les sections CFO, CFI et CFF du tableau de flux. Liaison 4 : la variation de cash totale (CFO + CFI + CFF) explique la variation du poste 'Trésorerie' au bilan. Si tout boucle, le modèle est cohérent.",
    table: {
      headers: ["Action", "Impact P&L", "Impact Bilan", "Impact Flux"],
      rows: [
        ["CAPEX 100€", "−20€ D&A (an1)", "Immo +100, Cash −100", "CFI −100"],
        ["Augmentation BFR 50€", "Aucun direct", "BFR +50, Cash −50", "CFO −50"],
        ["Emprunt 200€", "−10€ intérêts (an1)", "Cash +200, Dette +200", "CFF +200"],
        ["Dividendes 30€", "Aucun (sortie equity)", "Cash −30, Equity −30", "CFF −30"],
        ["Provision 40€", "Charge −40€", "Provision +40, Equity −30", "CFO non-cash (+40)"],
      ]
    },
    visual: '3-statements',
    pitfalls: [
      "Oublier que les amortissements sont non-cash (retraités en CFO)",
      "Mélanger BFR et investissements (deux flux distincts)",
      "Ne pas balancer le bilan (somme actif ≠ passif)",
      "Confondre Net Income et CFO"
    ]
  },
  {
    id: 'c5',
    category: 'accounting',
    title: 'Le BFR et le Cycle de Conversion du Cash',
    simple: "Le Besoin en Fonds de Roulement (BFR) mesure le cash immobilisé dans l'exploitation courante : stocks + créances clients − dettes fournisseurs. Plus le BFR est élevé, plus il faut financer.",
    formula: "BFR = Stocks + Créances clients − Dettes fournisseurs (± autres opérationnels)",
    deepDive: "On analyse le BFR en jours via 3 indicateurs : DSO (délais clients = Créances/CA × 365), DIO (délais stocks = Stocks/COGS × 365), DPO (délais fournisseurs = Fournisseurs/COGS × 365). Le Cycle de Conversion du Cash (CCC) = DIO + DSO − DPO. Un CCC négatif (rare et précieux) signifie que les fournisseurs financent les clients : le BFR est une source de cash. Les retailers (Carrefour, Amazon) atteignent souvent un BFR négatif.",
    table: {
      headers: ["Secteur", "DSO", "DIO", "DPO", "CCC"],
      rows: [
        ["SaaS (cash upfront)", "30j", "0j", "30j", "0j ou négatif"],
        ["Retail (Amazon)", "5j", "30j", "80j", "−45j ✓"],
        ["Distribution (Carrefour)", "5j", "25j", "60j", "−30j ✓"],
        ["Industrie classique", "60j", "60j", "60j", "60j"],
        ["BTP", "90j", "30j", "45j", "75j"],
        ["Pharma branded", "100j", "120j", "60j", "160j"],
      ]
    },
    visual: 'ccc-cycle',
    pitfalls: [
      "Confondre BFR opérationnel et financier",
      "Ne pas neutraliser la saisonnalité (moyenne 12 mois)",
      "Inclure le cash dans le calcul (à exclure)",
      "Sous-estimer l'impact de la croissance sur le BFR"
    ]
  },
  {
    id: 'c6',
    category: 'lbo',
    title: 'Le LBO (Leveraged Buy-Out)',
    simple: "Un LBO est l'acquisition d'une entreprise majoritairement financée par dette, portée par une société holding. La dette est ensuite remboursée par les cash flows de la cible elle-même.",
    formula: "TRI = (Equity Exit / Equity Entry)^(1/n) − 1     |    MOIC = Equity Exit / Equity Entry",
    deepDive: "Structure type d'un LBO mid-cap : 30-50% equity + 50-70% dette (Senior, Mezzanine). Le fonds PE détient la holding (NewCo) qui détient la cible. La dette est portée par la NewCo, remboursée par les dividendes remontant de la cible. Horizon : 4-7 ans. Trois leviers de création de valeur : (1) croissance opérationnelle de l'EBITDA, (2) expansion du multiple à la sortie, (3) désendettement (deleveraging). Aujourd'hui ~50% du TRI vient de l'opérationnel.",
    table: {
      headers: ["Composant", "% typique", "Coût", "Rang"],
      rows: [
        ["Equity (Sponsor + MEP)", "30-50%", "TRI cible 20-25%", "Junior"],
        ["Senior Term Loan", "40-50%", "Euribor + 250-450 bps", "Senior 1"],
        ["Unitranche", "0-60%", "Euribor + 500-700 bps", "Senior 1 (hybride)"],
        ["Mezzanine", "10-20%", "10-15% (cash + PIK)", "Junior secured"],
        ["RCF (revolving)", "Pour BFR", "Euribor + 200-300 bps", "Senior 1"],
      ]
    },
    visual: 'lbo-structure',
    pitfalls: [
      "Structurer un LBO sur une cible cyclique (cash flows volatiles)",
      "Sous-estimer le BFR ou le CAPEX dans le BP",
      "Calculer le TRI sans les frais de transaction",
      "Oublier le tax shield du leverage dans le WACC",
      "Hypothèses de sortie trop optimistes (multiple expansion)"
    ]
  },
  {
    id: 'c7',
    category: 'lbo',
    title: 'Les trois leviers de création de valeur en LBO',
    simple: "Le TRI d'un LBO se décompose en 3 leviers : croissance de l'EBITDA, expansion du multiple à la sortie, et désendettement. Comprendre lequel domine est essentiel.",
    formula: "Δ Equity Value = Δ EBITDA × Multiple_entrée + EBITDA_sortie × Δ Multiple + Δ Dette nette",
    deepDive: "Levier 1 (EBITDA growth) : faire croître l'EBITDA via croissance organique, build-ups (acquisitions add-on), expansion géographique, optimisation des marges. Levier 2 (Multiple expansion) : revendre à un multiple supérieur grâce à un profil amélioré (taille, professionnalisation, diversification). Levier 3 (Deleveraging) : utiliser les FCF pour rembourser la dette, ce qui mécaniquement augmente l'Equity Value à EV constant. Évolution : avant 2008, le deleveraging dominait (60%). Aujourd'hui, l'EBITDA growth est devenu le levier principal (~50%).",
    table: {
      headers: ["Levier", "% TRI typique (2026)", "% TRI années 2000", "Difficulté"],
      rows: [
        ["EBITDA growth", "~50%", "~25%", "Élevée (exécution)"],
        ["Multiple expansion", "~15-20%", "~15%", "Hasard (marché)"],
        ["Deleveraging", "~30-35%", "~60%", "Mécanique"],
      ]
    },
    visual: 'lbo-value-bridge',
    pitfalls: [
      "Compter sur le multiple expansion (incertain, dépend du marché)",
      "Sous-estimer la difficulté d'exécution de l'EBITDA growth",
      "Ne pas prévoir d'add-ons (build-up) dans le BP",
      "Hypothèses opérationnelles non corrélées au CAPEX"
    ]
  },
  {
    id: 'c8',
    category: 'valuation',
    title: 'Multiples de valorisation (EV/EBITDA, P/E, EV/Sales)',
    simple: "Les multiples permettent de valoriser une entreprise par comparaison avec ses pairs cotés ou des transactions récentes. Chaque multiple a son cas d'usage selon le secteur et la maturité.",
    formula: "Multiple = Valeur (EV ou Eq.V) / Métrique (EBITDA, Sales, EPS, BV)",
    deepDive: "EV/EBITDA est le plus utilisé en M&A : indépendant de la structure financière, neutralise les politiques d'amortissement. EV/Sales est utile pour les startups non profitables. P/E inclut le levier et la fiscalité, moins comparable mais utile en equity research. P/B est le standard pour les banques (où la dette est opérationnelle). Toujours utiliser plusieurs multiples pour trianguler.",
    table: {
      headers: ["Multiple", "Cas d'usage", "Mid-cap industrie", "Tech/SaaS", "Banques"],
      rows: [
        ["EV/EBITDA", "M&A standard", "6-9x", "15-25x", "N/A"],
        ["EV/Sales", "Non profitables", "0,8-1,5x", "5-15x", "N/A"],
        ["EV/EBIT", "Capitalistique", "8-12x", "20-30x", "N/A"],
        ["P/E", "Actionnaire", "12-18x", "25-50x", "8-12x"],
        ["P/B", "Banques, foncières", "1,5-2,5x", "5-10x", "0,8-1,5x"],
        ["EV/FCF", "Free cash yield", "12-20x", "20-35x", "N/A"],
      ]
    },
    visual: 'football-field',
    pitfalls: [
      "Comparer des entreprises à des stades de maturité différents",
      "Utiliser des multiples LTM vs NTM sans cohérence",
      "Ignorer les retraitements (add-backs, IFRS 16)",
      "Échantillon trop petit (<5 comps) ou hétérogène",
      "Pas de hiérarchie médiane / moyenne dans les résultats"
    ]
  },
  {
    id: 'c9',
    category: 'ts',
    title: 'Quality of Earnings (QoE)',
    simple: "La QoE est l'analyse qui détermine l'EBITDA RÉCURRENT et soutenable d'une cible, en retraitant tout ce qui n'est pas représentatif du business normal. C'est LE livrable d'une DD financière.",
    formula: "EBITDA ajusté = EBITDA reporté ± Add-backs (non récurrents, non opérationnels, non cash)",
    deepDive: "Un add-back est l'ajout d'éléments retraités pour normaliser l'EBITDA. Add-backs positifs (augmentent l'EBITDA) : coûts non récurrents (restructuration, M&A fees, litiges), one-time costs (lancement produit), pertes sur business cédés. Add-backs négatifs : revenus exceptionnels, gains de change, sous-investissement à normaliser. L'EBITDA ajusté sert de base au multiple de valorisation : chaque million d'add-back à 8x multiple = 8M€ d'EV.",
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
      ]
    },
    pitfalls: [
      "Add-backs récurrents masquerés en 'one-time' (red flag)",
      "Pas de documentation par add-back (factures, contrats)",
      "Mélanger add-backs et retraitements proforma",
      "EBITDA ajusté supérieur au CFO de manière inexpliquée",
      "Trop d'add-backs (>15-20% de l'EBITDA = suspect)"
    ]
  },
  {
    id: 'c10',
    category: 'ts',
    title: 'Net Debt et Debt-like items',
    simple: "Le Net Debt impacte directement le prix payé par l'acquéreur (Equity Value = EV − Net Debt). Sa définition précise est négociée dans le SPA et chaque ligne représente des millions.",
    formula: "Net Debt = Dette financière − Cash + Debt-like items − Cash-like items",
    deepDive: "La logique : tout ce qui devra être payé par l'acheteur post-closing et qui n'est pas du BFR opérationnel courant est considéré comme dette. Le cash trapped (compte bloqué, cash étranger non rapatriable, cash minimum opérationnel) ne réduit pas le Net Debt. Inversement, certains éléments traditionnellement non-dette (provisions retraites, earn-outs sur acquisitions passées, dettes fournisseurs en retard) sont considérés comme debt-like.",
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
      ]
    },
    pitfalls: [
      "Oublier les engagements hors bilan (garanties, lettres de confort)",
      "Ne pas distinguer cash 'available' vs 'restricted'",
      "Sous-estimer les provisions retraites (passif réel)",
      "Inclure le BFR opérationnel dans le Net Debt (double comptage)"
    ]
  },
  {
    id: 'c11',
    category: 'ma',
    title: 'Process M&A — du teaser au closing',
    simple: "Un process M&A se déroule en 7-8 phases sur 6 à 12 mois. Comprendre chaque étape permet de se positionner correctement et d'éviter les pièges.",
    formula: "Préparation → Marketing → 1er tour → DD → 2nd tour → Signing → Closing → Post-closing",
    deepDive: "Côté sell-side : la banque conseil prépare l'Information Memorandum (IM) et un vendor due diligence (VDD). Les acquéreurs reçoivent d'abord un teaser anonyme, puis l'IM sous NDA. Au 1er tour, ils remettent des offres indicatives (non-binding). Les short-listés (4-6) accèdent à la dataroom pour faire leur due diligence. Le 2nd tour produit des offres fermes (binding) avec mark-up du SPA. Signing = engagement contractuel. Closing = réalisation effective (après autorisations antitrust, financement, etc.).",
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
      ]
    },
    visual: 'ma-process',
    pitfalls: [
      "Confondre signing et closing (3-6 mois entre les deux)",
      "Sous-estimer les autorisations antitrust pour les gros deals",
      "Mauvaise gestion du MAC clause (Material Adverse Change)",
      "Pas de réflexion sur l'ajustement de prix (locked box vs completion)"
    ]
  },
  {
    id: 'c12',
    category: 'ma',
    title: 'Locked Box vs Completion Accounts',
    simple: "Deux mécanismes pour fixer le prix final d'une transaction. Le Locked Box fige le prix à une date passée (pas d'ajustement post-closing). Les Completion Accounts ajustent au closing.",
    formula: "Locked Box: Prix fixé à T-passé + intérêts | Completion: Prix ajusté avec Net Debt/BFR au closing",
    deepDive: "Locked Box (privilégié en Europe / PE) : prix calculé sur un bilan de référence passé. Interdiction de leakage (sorties de valeur entre locked box date et closing : dividendes, management fees, transactions intra-groupe). Permitted leakages explicitement listés. Compensation par un ticking fee versé par l'acheteur. Completion Accounts (privilégié aux US) : prix ajusté au closing sur la base de comptes audités. Ajustements sur Net Debt cible et BFR normatif.",
    table: {
      headers: ["Critère", "Locked Box", "Completion Accounts"],
      rows: [
        ["Date de référence", "Passée (3-6 mois avant)", "Date du closing"],
        ["Certitude du prix", "Élevée (dès signing)", "Faible (ajusté post-closing)"],
        ["Risque entre signing et closing", "Vendeur", "Acheteur"],
        ["Compensation", "Ticking fee (intérêts)", "Aucun (réel)"],
        ["Complexité", "Plus simple, rapide", "Plus complexe, audit"],
        ["Litiges", "Limités", "Fréquents"],
        ["Région privilégiée", "Europe (PE)", "US"],
        ["Cibles", "Stables", "Volatiles ou complexes"],
      ]
    },
    pitfalls: [
      "Définir trop vaguement les 'permitted leakages'",
      "Ticking fee trop bas (sous-compense la value generation)",
      "Oublier des items dans la définition du Net Debt (Completion)",
      "Mauvaise estimation du BFR normatif (impact majeur sur le prix)"
    ]
  },
  {
    id: 'c13',
    category: 'ma',
    title: 'Synergies — types et valorisation',
    simple: "Les synergies sont la création de valeur supplémentaire que l'acquéreur peut générer après l'acquisition. Elles justifient souvent la prime payée. 4 grandes catégories : revenus, coûts, fiscales, financières.",
    formula: "NPV Synergies = Σ (Synergies × (1−t) − Coûts d'intégration) / (1+WACC)ᵗ",
    deepDive: "Synergies de revenus : cross-selling, accès marché, pricing power. Taux de réalisation 50-70% (les plus optimistes). Synergies de coûts : économies d'échelle, suppression de doublons, pouvoir d'achat. Plus tangibles (70-90% de réalisation). Synergies fiscales : utilisation de déficits, step-up de base fiscale. Synergies financières : réduction du WACC via diversification. Coûts à intégrer : restructurations (1-2× synergies annuelles), IT integration, branding. Phasage : coûts capturés en 1-3 ans, revenus en 3-5 ans (courbe en J).",
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
      ]
    },
    visual: 'synergies-jcurve',
    pitfalls: [
      "Surestimer les synergies de revenus (les plus risquées)",
      "Sous-estimer les coûts d'intégration (1-2× synergies)",
      "Annoncer toutes les synergies dès l'an 1 (irréaliste)",
      "Pas de plan de réalisation détaillé (responsables, KPIs)",
      "Confondre synergies brutes et nettes (après dilution)"
    ]
  },
  {
    id: 'c14',
    category: 'valuation',
    title: 'CAPM et calcul du Beta',
    simple: "Le CAPM (Capital Asset Pricing Model) donne le coût des fonds propres : Ke = Rf + β × (Rm − Rf). Le beta mesure la sensibilité d'une action aux variations du marché.",
    formula: "Ke = Rf + β × (Rm − Rf) + primes spécifiques (size, country, illiquidity)",
    deepDive: "Beta = 1 : action évolue comme le marché. Beta > 1 : plus volatile, cyclique. Beta < 1 : moins volatile, défensif. Calcul : régression linéaire des rendements de l'action sur ceux d'un indice (CAC 40, S&P 500), généralement sur 2-5 ans en données hebdomadaires. En pratique : (1) prendre les betas des comparables levered, (2) les délévérer pour neutraliser leur structure financière, (3) prendre la médiane, (4) relever avec la structure cible. Formule de délévérage : β_u = β_L / (1 + (1−t) × D/E).",
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
      ]
    },
    visual: 'beta-sectors',
    pitfalls: [
      "Utiliser le beta levered sans délévérer",
      "Régression sur période trop courte (instable) ou trop longue (obsolète)",
      "Pas de prime de small cap pour mid-cap (5-10% ajout typique)",
      "Oublier la country risk premium pour pays émergents",
      "Beta négatif (rare, suspect — vérifier données)"
    ]
  },
  {
    id: 'c15',
    category: 'accounting',
    title: 'EBITDA — utilité et limites',
    simple: "L'EBITDA (Earnings Before Interest, Taxes, Depreciation & Amortization) est la mesure de rentabilité opérationnelle la plus utilisée. Il neutralise la structure financière et les politiques d'amortissement.",
    formula: "EBITDA = Résultat d'exploitation + Amortissements + Dépréciations",
    deepDive: "Pourquoi l'EBITDA est-il roi en M&A ? (1) Indépendant de la structure financière (avant intérêts), (2) Indépendant de la fiscalité (avant IS), (3) Indépendant des politiques d'amortissement (variables entre pays/normes), (4) Proxy du cash généré par l'opérationnel. Mais limites majeures : (a) ignore le CAPEX (critique pour industries lourdes), (b) ignore le BFR (croissance forte = BFR qui gonfle), (c) ignore les charges d'intérêts (qui peuvent être énormes en LBO), (d) inclut les éléments non-cash (mark-to-market, stock-options).",
    table: {
      headers: ["Métrique", "Inclut", "Exclut", "Usage"],
      rows: [
        ["EBITDA", "Opérations courantes", "Intérêts, IS, D&A, BFR, CAPEX", "Multiples de valorisation"],
        ["EBITDA − CAPEX", "Idem + CAPEX maintenance", "Intérêts, IS, BFR, CAPEX growth", "Industries lourdes"],
        ["EBIT", "Opérations + D&A", "Intérêts, IS, BFR, CAPEX", "ROCE, valorisation alternative"],
        ["CFO (Cash Flow Opérationnel)", "Cash réel généré", "CAPEX, financement", "Réalité cash"],
        ["FCFF", "CFO + intérêts × (1−t) − CAPEX", "Aucun (cash to firm)", "DCF"],
        ["FCFE", "FCFF − intérêts × (1−t) + emprunts nets", "Cash to equity only", "DDM, valuation equity"],
      ]
    },
    pitfalls: [
      "Confondre EBITDA et cash (peut diverger fortement)",
      "Comparer EBITDA reporté vs EBITDA ajusté (add-backs)",
      "Oublier l'impact IFRS 16 sur l'EBITDA (rents → amort + intérêts)",
      "EBITDA positif mais CFO négatif = croissance financée par BFR",
      "EBITDA margin élevée mais ROCE faible = capital-intensive"
    ]
  },
];
