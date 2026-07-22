export const concepts = [
  {
    id: "c1",
    category: "valuation",
    title: "Enterprise Value vs Equity Value",
    simple:
      "L'EV, c'est la valeur de toute l'entreprise (actionnaires + banques). L'Equity Value, c'est seulement la part des actionnaires. On passe de l'un à l'autre avec la dette nette et quelques postes du bilan.",
    formula: "EV = Equity Value + Dette nette + Minoritaires + Provisions retraites − Associates",
    deepDive:
      "Imaginez que vous achetez une maison : le prix total (toit + crédit) correspond à l'EV. Ce qu'il vous reste vraiment à payer après le crédit, c'est l'Equity Value.\n\nPourquoi utiliser l'EV en M&A ? Parce qu'on compare des entreprises avec des dettes différentes. L'EV/EBITDA regarde le business, pas la structure financière.\n\nPont Equity → EV (construction, à connaître par cœur) :\n• On ajoute la dette (l'acheteur la reprend)\n• On ajoute les minoritaires et les provisions retraites (engagements réels)\n• On retire le cash (l'acheteur le récupère)\n• On retire les associates (parts non consolidées)\n\nPont EV → Equity (pour obtenir le prix par action) : on fait l'inverse — on retire la dette, les minoritaires et les provisions, on ajoute le cash et les associates.\n\nEn entretien : oublier les minoritaires dans le pont reste une erreur éliminatoire.",
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
  {
    id: "c16",
    category: "valuation",
    title: "DDM — Gordon, 2 étapes et H-model",
    simple:
      "Le DDM valorise l'action en actualisant les dividendes futurs. Indispensable en FIG et utilities quand les FCF sont opaques mais les dividendes stables — complète le DCF (c2) et le CAPM (c14).",
    formula:
      "Gordon : P₀ = D₁ / (Ke − g)  |  2 étapes : Σ Dₜ/(1+Ke)ᵗ + Pₙ/(1+Ke)ⁿ  |  H-model : P₀ = D₀(1+gₗ)/(Ke−gₗ) + D₀·H·(gₛ−gₗ)/(Ke−gₗ)",
    deepDive:
      "Quand l'utiliser :\n• Banques, assurances, utilities, REITs : politique de dividende explicite, payout ratio stable\n• Complément au DCF : si le DDM et le DCF divergent, vérifier g, Ke et la politique de distribution\n\n1. Gordon Growth (croissance constante) :\n• Hypothèse : dividende croît à g constant, g < Ke\n• D₁ = D₀ × (1+g) ou EPS × payout\n• Limite : ne convient qu'aux sociétés matures à croissance stable\n\n2. Modèle à 2 étapes :\n• Phase 1 (ex. 5 ans) : dividendes projetés explicitement\n• Phase 2 : Gordon sur le dividende terminal Dₙ₊₁\n• Standard pour une banque en transition de payout\n\n3. H-model (croissance décroissante) :\n• La croissance passe linéairement de gₛ (court terme) à gₗ (long terme) sur 2H années\n• Évite le « cliff » du passage brutal au Gordon\n• Très utilisé en FIG pour les utilities en phase de hausse de dividende\n\nLien CAPM : Ke vient du CAPM (c14). Le beta des utilities est bas (0,5-0,7) → Ke plus bas → valorisation plus sensible à g.",
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
      "Une IPO transforme une société privée en cotée via une offre publique. Le book-building fixe le prix ; la greenshoe et le lock-up structurent la stabilisation et la liquidité post-flottant.",
    formula:
      "Flottant = Actions vendues / Capital post-IPO  |  Greenshoe = +15 % max (option de sur-allocation)",
    deepDive:
      "Étapes clés (6 à 9 mois typiques) :\n1. Préparation : audit IFRS/US GAAP, gouvernance, choix place (NYSE, Euronext…), rédaction du prospectus (S-1 / document de base AMF)\n2. Due diligence et roadshow : rencontres investisseurs institutionnels\n3. Book-building : les investisseurs soumissionnent un prix et une quantité ; le syndicat fixe le prix final dans la fourchette indicative\n4. Pricing & allocation : priorité aux institutionnels (book) ; retail via souscription\n5. Trading day : première cotation\n\nMécanismes à connaître :\n• Greenshoe (option de sur-allocation ~15 %) : le syndicat peut émettre des actions supplémentaires si la demande dépasse l'offre — stabilise le cours les premiers jours\n• Lock-up (90-180 jours) : insiders et PE ne peuvent pas vendre — évite la pression vendeuse immédiate\n• Dual track : process IPO parallèle à une vente M&A — le vendeur maximise la tension (ex. avant une vente stratégique)\n\nLien deal : Lineage Logistics (2024) — plus grande IPO US depuis 2021, cold storage REIT, book-building institutionnel massif.",
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
      "En droit français, l'OPA vise le contrôle (30 %), l'OPE la sortie de cotation, le squeeze-out force les minoritaires à vendre une fois le seuil atteint. Complète la distinction fusion vs acquisition.",
    formula:
      "OPA : seuil 30 % (déclenchement)  |  OPE : sortie de marché  |  Squeeze-out : seuil de 90 % du capital ou des droits de vote (loi PACTE, 2019)",
    deepDive:
      "Fusion vs acquisition (rappel) :\n• Acquisition : contrôle d'une entité par une autre (majorité des actions)\n• Fusion : combinaison juridique (absorption ou création)\n• En pratique, la plupart des « fusions » annoncées sont des acquisitions avec prime de contrôle\n\nOPA (Offre Publique d'Achat) :\n• Déclenchée quand un acquéreur franchit 30 % du capital ou des droits de vote (seuil de déclenchement)\n• Objectif : prendre le contrôle ; prix avec prime (souvent 20-40 % vs cours)\n• Régulation AMF : calendrier, document d'offre, délai d'acceptation\n• Exemple app : UniCredit / Commerzbank (OPA hostile, seuil allemand 30 %)\n\nOPE (Offre Publique d'Échange) :\n• Offre visant la sortie de cotation (delisting)\n• Souvent après une OPA réussie quand l'acquéreur détient >90 %\n• Les actionnaires restants échangent leurs titres contre une indemnité\n\nSqueeze-out (retrait obligatoire) :\n• Permet à l'acquéreur de forcer l'achat des minoritaires après OPA/OPE\n• Seuils légaux (France) : 90 % du capital ou des droits de vote (loi PACTE, 2019 — anciennement 95 %)\n• Évite les actionnaires « dormants » qui bloquent la simplification\n\nPour l'entretien : maîtriser le séquençage OPA → seuils → OPE → squeeze-out, et citer un deal récent (Commerzbank, Sanofi Blueprint tender).",
    table: {
      headers: ["Mécanisme", "Objectif", "Seuil clé", "Exemple type"],
      rows: [
        ["OPA", "Prendre le contrôle", "30 % déclenchement (FR)", "UniCredit/CBK"],
        ["OPA amicale", "Accord conseil cible", "Négocié", "L'Oréal/Aesop"],
        ["OPE", "Sortir de la cote", "Post-90 %", "Delisting post-LBO"],
        ["Squeeze-out", "Forcer les minoritaires", "90 % capital ou votes", "Simplification groupe"],
        ["Fusion", "Entités combinées", "Accord 2/3 AG", "UBS/CS (urgence)"],
        ["Acquisition", "Achat de contrôle", "Variable", "Majorité des deals"],
      ],
    },
    pitfalls: [
      "Confondre OPA et OPE (contrôle vs delisting)",
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
      "Trois mécanismes post-closing pour ajuster ou étaler le prix : l'earn-out lie le prix à la performance future, le vendor loan diffère le paiement, le revenue-based pricing indexe sur le CA.",
    formula:
      "Prix total = Upfront + Earn-out conditionnel + Vendor Loan (différé)  |  RBP : Prix = f(CA futur)",
    deepDive:
      "Earn-out (complément de prix conditionnel) :\n• Payé si objectifs atteints (EBITDA, CA, jalons produit) sur 1-5 ans\n• Usage : désaccord vendeur/acheteur sur la valeur, management qui reste\n• Risque vendeur : l'acquéreur peut « gérer » les KPIs (allocation de coûts groupe)\n• Protection : bonne foi, comptabilité séparée, plafonds/planchers\n\nVendor Loan (crédit-vendeur) :\n• Le vendeur finance une partie du prix (paiement différé, souvent 10-30 %)\n• Subordonné à la dette bancaire ; taux négocié (souvent 4-8 %)\n• Alignement : le vendeur garde un intérêt économique dans le succès\n• Hiérarchie défaut : Senior > Mezz > Vendor Loan > Equity\n\nRevenue-based pricing (RBP) :\n• Le prix varie selon le chiffre d'affaires futur (royalty, % du CA sur N années)\n• Fréquent en tech/SaaS early-stage où l'EBITDA n'est pas pertinent\n• Avantage acheteur : paie seulement si le CA se matérialise\n• Risque vendeur : dépendance à la politique commerciale post-deal\n\nComparaison rapide :\n• Earn-out = « je te paie si tu performes »\n• Vendor loan = « je te paie plus tard, avec intérêts »\n• RBP = « je t'indexe sur ton CA »\n\nSouvent combinés : upfront 70 % + earn-out 20 % + vendor loan 10 %.",
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
    formula:
      "FCFF = Net Income + D&A − ΔBFR − CAPEX + Intérêts×(1−t)  |  ou : FCFF = EBIT×(1−t) + D&A − CAPEX − ΔBFR",
    deepDive:
      "Méthode indirecte (la plus demandée en entretien) :\n\n1. Net Income (point de départ — compte de résultat)\n2. + D&A (charges non-cash : amortissements, dépréciations)\n3. +/− Δ BFR (hausse du BFR = consommation de cash)\n4. − CAPEX (investissements en immobilisations)\n5. = Cash flow opérationnel avant intérêts (proche du CFO)\n\nPour obtenir le FCFF (cash disponible pour tous les financeurs) :\n6. + Intérêts × (1 − taux d'IS) (retraitement dette → vision « entreprise »)\n7. = FCFF (utilisé dans le DCF avec le WACC)\n\nVariante FCFE (cash aux actionnaires uniquement) :\nFCFE = Net Income + D&A − ΔBFR − CAPEX − Remboursement dette net + Nouveaux emprunts\n\nPoints clés :\n• D&A : non-cash mais le CAPEX de maintenance compense en industrie lourde\n• Δ BFR : une croissance de 20 % du CA peut « manger » tout le cash malgré un NI positif\n• Toujours distinguer CAPEX maintenance vs growth\n\nEn modélisation : ce pont doit boucler avec le tableau de flux (c4).",
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
      "Graphique en barres horizontales qui juxtapose les fourchettes de chaque méthode (DCF, comps, transactions, LBO). Outil de pitch incontournable pour défendre une fourchette, pas un point unique.",
    formula:
      "Fair value = zone de chevauchement des méthodes retenues  |  Largeur barre = sensibilité de la méthode",
    deepDive:
      "Pourquoi l'utiliser :\n• Montre que la valorisation n'est pas une science exacte\n• Permet au client/board de voir la convergence (ou divergence) des approches\n• Standard dans les fairness opinions et pitch books\n\nMéthodes typiquement affichées :\n1. DCF (fourchette via sensibilités WACC × g)\n2. Trading comps (cours boursiers des comparables)\n3. Precedent transactions (deals récents avec prime de contrôle)\n4. LBO (prix max qu'un PE peut payer à TRI 20-25 %)\n5. 52-week high/low ou objectifs brokers (cotées)\n\nComment lire le graphique :\n• Chaque barre = min-max d'une méthode\n• La zone centrale où les barres se chevauchent = fourchette consensuelle\n• Une barre très large (DCF) signale une forte sensibilité aux hypothèses\n\nBonnes pratiques pitch :\n• 4-5 méthodes bien construites > 8 méthodes bâclées\n• Exclure le LBO pour une utility mature (peu pertinent)\n• Toujours dater la valorisation (les multiples bougent vite)\n• Expliquer pourquoi une méthode est exclue plutôt que de la minorer\n\nLien : la question « multiples » (c8) donne les barres ; le DCF (c2) en donne une autre.",
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
      "Quand une entreprise est surendettée, on restructure la dette (Chapter 11 US, scheme UK, conciliation FR) ou on vend les actifs en distressed M&A. L'equity est souvent diluée ou annulée.",
    formula:
      "Valeur récupérable < Dette totale → équity worthless  |  Debt-for-equity : créanciers deviennent actionnaires",
    deepDive:
      "Situation distressed :\n• L'entreprise ne peut plus servir sa dette (covenant breach, refinancement impossible)\n• La valeur d'entreprise ne couvre plus la dette → l'equity vaut théoriquement 0\n• Les créanciers deviennent les décideurs (pas les actionnaires)\n\nMécanismes par juridiction :\n• US — Chapter 11 : protection judiciaire, plan de réorganisation, DIP financing, debt-for-equity swap. L'equity existant est souvent effacé ; les créanciers senior reçoivent la nouvelle equity\n• UK — Scheme of arrangement : vote des classes de créanciers (75 % en valeur), rapide et flexible. Ex. restructurations telecom européennes\n• France — Mandat ad hoc, conciliation, sauvegarde, redressement judiciaire : cadre AMF/ tribunaux de commerce. Altice France 2025 = cas d'école\n\nDistressed M&A :\n• Vente d'actifs (stalking horse, enchères 363 US)\n• Acheteur achète sans reprendre toute la dette (asset deal) ou via NewCo\n• Prix « haircut » : EV fortement décotée vs going concern\n\nDebt-for-equity :\n• Les créanciers échangent leur créance contre des actions\n• Réduit le levier ; l'ancien equity est dilué à quasi-zéro\n• Ex. Altice : créanciers secured (~19 Md€) vs holdco (~4,4 Md€) — hiérarchie des créances détermine qui reçoit quoi\n\nLien deal : Altice France (d02) — restructuration dette €24 Md, cession SFR métropolitain, advisors distincts par camp de créanciers.",
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
      "IFRS (Europe, la plupart des marchés) et US GAAP (SEC) divergent sur le goodwill, la R&D, les leasings et la reconnaissance du revenu. En TS/M&A, ces écarts expliquent des ajustements de valorisation et de dette nette.",
    formula: "Écart comptable → retraitement en QoE / Net Debt → impact EBITDA, FCF et multiples",
    deepDive:
      "Quand citer en entretien :\n• Transaction Services : retraitements IFRS 16, goodwill, provisions, classification cash\n• Audit / Big Four : normes en détail (IAS vs ASC)\n• M&A cross-border US/EU : toujours préciser sous quelle norme sont les comptes de la cible\n\nLes 10 différences majeures sont dans le tableau ci-dessous. En pratique, l'écart le plus négocié en SPA reste le leasing IFRS 16 (debt-like) et les add-backs liés à la SBC.\n\nRappel : les groupes cotés US publient en US GAAP ; la plupart des cibles EU mid-cap en IFRS. Les ADR et les dual-listings imposent des rapprochements (reconciliation).",
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
