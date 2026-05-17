export const concepts = [
  {
    id: "c1",
    category: "valuation",
    title: "Enterprise Value vs Equity Value",
    simple:
      "L'EV, c'est la valeur de toute l'entreprise (actionnaires + banques). L'Equity Value, c'est seulement la part des actionnaires. On passe de l'un à l'autre avec la dette nette et quelques postes du bilan.",
    formula: "EV = Equity Value + Dette nette + Minoritaires + Provisions retraites − Associates",
    deepDive:
      "Imaginez que vous achetez une maison : le prix total (toit + crédit) correspond à l'EV. Ce qu'il vous reste vraiment à payer après le crédit, c'est l'Equity Value.\n\nPourquoi utiliser l'EV en M&A ? Parce qu'on compare des entreprises avec des dettes différentes. L'EV/EBITDA regarde le business, pas la structure financière.\n\nLe pont EV → Equity Value (à connaître par cœur) :\n• On ajoute la dette (l'acheteur la reprend)\n• On ajoute les minoritaires et les provisions retraites (engagements réels)\n• On retire le cash (l'acheteur le récupère)\n• On retire les associates (parts non consolidées)\n\nEn entretien : oublier les minoritaires dans le pont reste une erreur éliminatoire.",
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
    formula: "EV = Σ (FCFFₜ / (1+WACC)ᵗ) + Valeur Terminale / (1+WACC)ⁿ",
    deepDive:
      "Le DCF répond à une question simple : combien vaut l'entreprise si on projette ses cash futurs ?\n\nLes 6 étapes :\n1. Projeter les FCFF (cash généré par l'activité) sur 5 à 10 ans\n2. Calculer le WACC (taux d'actualisation)\n3. Actualiser chaque flux : plus il est loin, moins il compte\n4. Calculer la valeur terminale (cash après la période de projection)\n5. Sommer le tout = EV\n6. Retirer la dette nette pour obtenir l'Equity Value\n\nPoint clé : la valeur terminale représente souvent 60 à 80 % du total. Le DCF est donc très sensible au taux de croissance long terme (g) et au WACC. Toujours faire des sensibilités.",
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
      "Le WACC est le taux minimum que demandent ensemble les actionnaires et les banques. C'est le taux qu'on utilise pour actualiser les flux dans un DCF.",
    formula: "WACC = (E/V) × Ke + (D/V) × Kd × (1−t)",
    deepDive:
      "Le WACC mélange deux sources de financement :\n\n• Ke (coût des fonds propres) : ce que veulent les actionnaires. On le calcule avec le CAPM : Ke = taux sans risque + β × prime de risque marché.\n• Kd (coût de la dette) : ce que coûte l'emprunt. On multiplie par (1 − taux d'IS) car les intérêts sont déductibles.\n\nLes pondérations E/V et D/V se font en valeur de marché, pas en valeur comptable.\n\nPour le beta : on prend des comparables, on les « délévre » (on enlève l'effet de leur dette), on prend la médiane, puis on « relève » avec la structure cible de la société analysée.",
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
    formula: "Net Income (P&L) → Equity (Bilan) | Δ Bilan → Flux | Cash final (CFS) → Cash (Bilan)",
    deepDive:
      "Comment les trois se parlent :\n\n1. Le résultat net du compte de résultat augmente les capitaux propres au bilan.\n2. Ce même résultat net est le point de départ du tableau de flux (méthode indirecte).\n3. Les variations du bilan (stocks, créances, immos, dettes…) alimentent les flux d'exploitation, d'investissement et de financement.\n4. La variation totale de trésorerie au tableau de flux explique la variation du cash au bilan.\n\nSi tout boucle, votre modèle est cohérent. En entretien, savoir expliquer un exemple chiffré (CAPEX, emprunt, dividende) montre une vraie maîtrise.",
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
    formula: "BFR = Stocks + Créances clients − Dettes fournisseurs (± autres opérationnels)",
    deepDive:
      "Pour lire le BFR en jours, trois indicateurs :\n\n• DSO (délai clients) = créances / CA × 365\n• DIO (délai stocks) = stocks / coût des ventes × 365\n• DPO (délai fournisseurs) = dettes fournisseurs / coût des ventes × 365\n\nLe Cycle de Conversion du Cash (CCC) = DIO + DSO − DPO.\n\nUn CCC négatif est rare mais puissant : les fournisseurs financent les clients (ex. grande distribution). Un CCC élevé signifie beaucoup de cash immobilisé avant d'être payé par les clients.\n\nEn modélisation : quand le CA augmente, le BFR augmente aussi — il faut le prévoir dans le DCF.",
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
    formula:
      "TRI = (Equity Exit / Equity Entry)^(1/n) − 1     |    MOIC = Equity Exit / Equity Entry",
    deepDive:
      "Structure type : 30 à 50 % en fonds propres (equity du fonds PE), 50 à 70 % en dette.\n\nLe fonds crée une holding qui emprunte et achète la cible. La dette est remboursée grâce aux dividendes remontant de la cible. Horizon classique : 4 à 7 ans.\n\nTrois leviers pour gagner de l'argent :\n1. Faire croître l'EBITDA (opérationnel, acquisitions)\n2. Revendre à un multiple plus élevé (dépend du marché)\n3. Rembourser la dette (à EV constant, l'equity augmente mécaniquement)\n\nAujourd'hui, environ la moitié du TRI vient de la performance opérationnelle, pas seulement du désendettement.",
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
    formula:
      "Δ Equity Value = Δ EBITDA × Multiple_entrée + EBITDA_sortie × Δ Multiple + Δ Dette nette",
    deepDive:
      "Levier 1 — Croissance de l'EBITDA :\nAugmenter les ventes, les marges, ou faire des acquisitions (build-ups). C'est le levier le plus difficile mais le plus valorisé aujourd'hui (~50 % du TRI).\n\nLevier 2 — Expansion du multiple :\nRevendre plus cher qu'au moment de l'achat. Dépend surtout du marché : peu contrôlable (~15-20 % du TRI).\n\nLevier 3 — Désendettement :\nUtiliser le cash de la cible pour rembourser la dette. À EV constant, moins de dette = plus d'equity pour le fonds. C'était le levier dominant avant 2008 ; aujourd'hui ~30-35 % du TRI.\n\nEn entretien : expliquer lequel domine dans un deal montre que vous comprenez le modèle économique.",
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
    formula: "Multiple = Valeur (EV ou Eq.V) / Métrique (EBITDA, Sales, EPS, BV)",
    deepDive:
      "Comment lire les multiples les plus courants :\n\n• EV/EBITDA : le standard en M&A. On compare des entreprises indépendamment de leur dette.\n• EV/Sales : utile quand l'entreprise n'est pas encore rentable (startups).\n• P/E : utile en bourse, mais mélange dette et fiscalité — moins comparable en M&A.\n• P/B : standard pour les banques (la dette fait partie du métier).\n\nMéthode : choisir 5 à 10 comparables proches (secteur, taille, géographie), calculer leurs multiples, prendre la médiane, l'appliquer à la cible. Toujours croiser plusieurs multiples pour ne pas se tromper.",
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
    formula:
      "EBITDA ajusté = EBITDA reporté ± Add-backs (non récurrents, non opérationnels, non cash)",
    deepDive:
      "Pourquoi c'est central en due diligence : le prix M&A se base souvent sur un multiple × EBITDA. Chaque million d'EBITDA en plus à 8× = 8 M€ de valeur en plus.\n\nUn add-back positif augmente l'EBITDA ajusté. Exemples acceptés :\n• Coûts de restructuration (plan social unique)\n• Frais M&A ou litiges exceptionnels\n• Management fees d'un actionnaire sortant\n\nUn add-back négatif retire un gain exceptionnel (vente d'actif, gain de change).\n\nRègle pratique : chaque add-back doit être documenté (facture, contrat). Au-delà de 15-20 % de l'EBITDA reporté, les acheteurs deviennent méfiants.",
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
    formula: "Net Debt = Dette financière − Cash + Debt-like items − Cash-like items",
    deepDive:
      "Principe : tout ce que l'acheteur devra payer après le closing, en dehors du BFR courant, ressemble à de la dette.\n\nDette classique : emprunts bancaires, obligations, crédit tiré.\n\nCash qui ne réduit pas la dette nette :\n• Cash bloqué à l'étranger\n• Cash minimum nécessaire pour faire tourner l'activité\n\nDebt-like (traités comme de la dette) :\n• Provisions retraites non financées\n• Earn-outs déjà dus sur d'anciennes acquisitions\n• Dividendes promis mais pas encore payés\n• Parfois le leasing IFRS 16 (selon le marché)\n\nEn SPA, la définition précise de la dette nette est négociée ligne par ligne.",
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
    formula:
      "Préparation → Marketing → 1er tour → DD → 2nd tour → Signing → Closing → Post-closing",
    deepDive:
      "Côté vendeur (sell-side) :\n1. Préparation : rédaction de l'Information Memorandum (IM) et d'une due diligence vendeur (VDD)\n2. Marketing : teaser anonyme, puis IM sous NDA\n3. 1er tour : les acheteurs envoient des offres indicatives (non engageantes)\n4. Short-list (4-6) : accès à la dataroom, due diligence approfondie\n5. 2nd tour : offres fermes (engageantes) + commentaires sur le contrat (SPA)\n6. Signing : signature du SPA — engagement juridique\n7. Closing : paiement effectif (après autorisations antitrust, financement…)\n\nSigning ≠ closing : il peut s'écouler 3 à 6 mois entre les deux.",
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
    formula:
      "Locked Box: Prix fixé à T-passé + intérêts | Completion: Prix ajusté avec Net Debt/BFR au closing",
    deepDive:
      "Locked box (fréquent en Europe / PE) :\n• Le prix est calculé sur des comptes d'une date passée (ex. il y a 3 mois)\n• Entre cette date et le closing, le vendeur ne doit pas « vider » la société (pas de dividendes cachés = leakage)\n• L'acheteur paie une compensation (ticking fee) pour le délai\n• Avantage : prix connu tôt, moins de litiges\n\nCompletion accounts (fréquent aux US) :\n• Le prix est recalculé au closing avec la dette nette et le BFR réels\n• Plus juste économiquement, mais plus de débats et d'audits après coup\n\nEn résumé : locked box = simplicité et certitude ; completion = précision mais complexité.",
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
    formula: "NPV Synergies = Σ (Synergies × (1−t) − Coûts d'intégration) / (1+WACC)ᵗ",
    deepDive:
      "Quatre familles :\n\n1. Coûts (les plus fiables, 70-90 % de réalisation) : fermer un doublon de siège, mutualiser les achats, fusionner les systèmes IT.\n2. Revenus (plus risqué, 50-65 %) : vendre les produits de B aux clients de A. Prend plus de temps.\n3. Fiscales : utiliser des déficits reportables de la cible.\n4. Financières : WACC plus bas grâce à la taille (effet modeste).\n\nNe pas oublier les coûts d'intégration (souvent 1 à 2× les synergies annuelles annoncées). Les revenus mettent 3 à 5 ans à arriver ; les coûts, 1 à 2 ans.",
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
    formula: "Ke = Rf + β × (Rm − Rf) + primes spécifiques (size, country, illiquidity)",
    deepDive:
      "Lire le beta :\n• β = 1 : l'action suit le marché\n• β > 1 : plus volatile (secteur cyclique)\n• β < 1 : plus stable (secteur défensif)\n\nEn pratique, on ne calcule pas le beta de la cible directement. On prend des comparables cotés, on retire l'effet de leur dette (déléverage), on prend la médiane, puis on réapplique la dette cible (releverage).\n\nFormule de déléverage : β_unlevered = β_levered / (1 + (1−t) × D/E)\n\nPour les mid-caps non cotées, on ajoute souvent une prime de taille (5-10 %).",
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
    formula: "EBITDA = Résultat d'exploitation + Amortissements + Dépréciations",
    deepDive:
      "Pourquoi tout le monde l'utilise :\n• On compare des entreprises avec des dettes différentes (avant intérêts)\n• On compare des pays avec des fiscalités différentes (avant impôts)\n• On neutralise les choix d'amortissement (avant D&A)\n\nMais attention, l'EBITDA n'est pas du cash :\n• Il ignore les investissements (CAPEX) — critique en industrie lourde\n• Il ignore le BFR — une forte croissance « mange » du cash\n• Il ignore les intérêts — énormes en LBO\n\nEn pratique : toujours regarder l'EBITDA avec le cash flow opérationnel et le CAPEX. Un EBITDA qui monte mais un cash qui baisse est un signal d'alerte.",
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
];
