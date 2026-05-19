import { SECTOR_IDS, type SectorId } from "@/lib/sectors";
import { getSectorIdForSecteur } from "@/lib/sector-deals";

export type MaDealType =
  | "M&A"
  | "LBO"
  | "Carve-out"
  | "Restructuring"
  | "OPA"
  | "Cessions"
  | "Tendance";

export type MaDeal = {
  id: string;
  title: string;
  dates: string;
  type: MaDealType;
  secteur: string;
  sectorId?: SectorId;
  headlineEv: string;
  banks: string[];
  parties: { label: string; text: string }[];
  valorisation?: { label: string; value: string }[];
  financing?: string;
  advisors: {
    sellSide?: string[];
    buySide?: string[];
    other?: { label: string; banks: string[] }[];
  };
  interests: { side: string; text: string }[];
  contexte?: string;
  pointEntretien: string;
  ftUrl?: string;
  kind: "deal" | "trend";
};

const MA_DEALS_RAW: Omit<MaDeal, "sectorId">[] = [
  {
    id: "d01",
    title: "Sanofi / Opella → CD&R",
    dates: "Annonce oct. 2024 — SPA fév. 2025 — Closing 30 avr. 2025",
    type: "LBO",
    secteur: "Santé / Consumer Healthcare",
    headlineEv: "~16 Md€",
    banks: [
      "Rothschild & Co",
      "Bank of America",
      "BNP Paribas",
      "Goldman Sachs",
      "Morgan Stanley",
      "Lazard",
      "Citigroup",
      "Barclays",
      "Société Générale",
      "HSBC",
    ],
    parties: [
      {
        label: "Cible",
        text: "Opella (Consumer Healthcare de Sanofi — Doliprane, Allegra, Dulcolax). 11 000 employés, 100 pays, 13 sites industriels. 3e acteur mondial OTC/VMS.",
      },
      {
        label: "Acquéreur",
        text: "Clayton, Dubilier & Rice (CD&R) — PE américain, acquiert 50% controlling stake.",
      },
      {
        label: "Vendeur",
        text: "Sanofi — conserve 48,2%. Bpifrance prend 1,8% + siège au board.",
      },
    ],
    valorisation: [
      { label: "Enterprise Value", value: "~16 Md€" },
      { label: "Cash net perçu par Sanofi", value: "~10 Md€" },
      { label: "Multiple", value: "~14x EBITDA 2024 estimé" },
    ],
    financing:
      "€8,65 Md de dette — Term Loan B €5,45 Md (tranches EUR Euribor+350bps et USD SOFR+325bps), Bridge to High Yield bonds €2 Md, RCF €1,2 Md.",
    advisors: {
      sellSide: [
        "Rothschild & Co (M&A lead)",
        "Bank of America",
        "BNP Paribas",
        "Goldman Sachs",
        "Morgan Stanley",
      ],
      buySide: ["Lazard (M&A)", "Citigroup (M&A + financing)"],
      other: [
        {
          label: "Coordinateurs dette",
          banks: [
            "Citi",
            "Goldman Sachs",
            "Barclays",
            "BNP Paribas",
            "Morgan Stanley",
            "Société Générale",
            "HSBC",
          ],
        },
      ],
    },
    interests: [
      {
        side: "Sanofi",
        text: "Stratégie \"Play to Win\" (2019) — devenir pure-play biopharma (immunologie, oncologie, maladies rares, vaccins). Les ~10 Md€ financent des acquisitions biotech (Vigil Neuroscience, Blueprint Medicines en 2025) et des rachats d'actions (dont 3 Md€ de L'Oréal). Suit J&J (Kenvue), GSK (Haleon), Pfizer.",
      },
      {
        side: "CD&R",
        text: "Opella = marques iconiques avec pricing power dans un marché OTC/VMS en croissance structurelle (vieillissement, automédication). CD&R spécialisé en carve-outs industriels, track record France : Rexel, Spie, Socotec.",
      },
    ],
    contexte:
      "Doliprane perçu comme bien de souveraineté sanitaire. Clauses de maintien emploi et sites de production négociées avec le gouvernement français. Bpifrance entre comme garant.",
    pointEntretien:
      "Expliquer la mécanique carve-out + LBO financing. Connaître le rôle de Rothschild & Co en sell-side lead. Comprendre la tension logique financière vs enjeu politique souveraineté.",
    ftUrl: "https://www.ft.com/content/sanofi-opella-cdr-deal",
    kind: "deal",
  },
  {
    id: "d02",
    title: "Altice France — Restructuration de dette €24 Md",
    dates: "Accord fév. 2025 — Tribunal août. 2025 — Closing 1er oct. 2025",
    type: "Restructuring",
    secteur: "TMT / Telecom",
    headlineEv: "24 Md€ de dette",
    banks: ["Lazard", "Rothschild & Co", "Houlihan Lokey"],
    parties: [
      {
        label: "Entité",
        text: "Altice France S.A. + Altice France Holding S.A. (Patrick Drahi). SFR = 2e opérateur telecom en France, 25M+ clients.",
      },
      {
        label: "Dette pré-restructuration",
        text: "~24 Md€ (dont ~19 Md€ secured au niveau opco, ~4,4 Md€ holdco)",
      },
    ],
    valorisation: [
      { label: "Réduction", value: "~8,6 Md€ éliminés → dette nette ~15,5 Md€" },
      { label: "Levier pro forma", value: "< 4x EBITDA (vs ~6x avant)" },
      { label: "Économies annuelles", value: "~400 M€ de charges financières" },
      { label: "Maturités", value: "Repoussées de 2025 à 2028-2033" },
    ],
    financing:
      "Créanciers AF SA (secured) : 7,60 pts cash + 2,50 pts early bird + ~77 cts nouvelle dette (maturité +2,75 ans, coupon +137,5 bps) + 31% equity. Créanciers AF Holding : 2,50 pts cash + 2,50 pts early bird + 20 cts dette holdco (9,125%, jan 2033) + 14% equity + CVR. Post-deal : Drahi conserve 55%, créanciers 45%.",
    advisors: {
      sellSide: ["Lazard (restructuring)", "Mayer Brown / Ropes & Gray / White & Case (legal)"],
      other: [
        {
          label: "Créanciers secured (~200 institutions, ~19 Md€)",
          banks: ["Rothschild & Co (restructuring)", "Gibson Dunn (legal)"],
        },
        {
          label: "Créanciers holdco (~4,4 Md€)",
          banks: ["Houlihan Lokey (restructuring)", "Milbank / Wilkie Farr (legal)"],
        },
        {
          label: "Hedge funds clés",
          banks: [
            "Elliott",
            "Anchorage",
            "Sona",
            "Sculptor (secured)",
            "Arini (holdco)",
            "Pimco",
            "BlackRock",
            "Fidelity",
          ],
        },
      ],
    },
    interests: [
      {
        side: "Altice / Drahi",
        text: "Éviter le défaut et la perte de contrôle. Conserver 55% et le contrôle opérationnel de SFR. Libérer du cash flow pour investir dans le réseau fibre/5G.",
      },
      {
        side: "Créanciers",
        text: "Éviter liquidation chaotique. Secured creditors récupèrent l'essentiel (77 cts dette + equity kicker). Cooperation agreement entre 200 institutions (première de cette ampleur en Europe, initiée par Rothschild & Co).",
      },
    ],
    contexte:
      "Cas d'école LBO telecom surendetté (acquisitions Numericable, SFR, Portugal Telecom). Drahi a tenté des tactiques US agressives (asset drop-downs) mais le droit français a protégé les créanciers. Plus grande restructuration européenne en 2025.",
    pointEntretien:
      "Distinguer Lazard (débiteur) vs Rothschild & Co (créanciers) vs Houlihan Lokey (holdco). Expliquer debt-for-equity swap et cooperation agreement. Cas incontournable en restructuring.",
    ftUrl: "https://www.ft.com/content/altice-france-restructuring",
    kind: "deal",
  },
  {
    id: "d03",
    title: "Goldman Sachs Alternatives / Mace Consult",
    dates: "Annonce juil. 2025 — Closing 5 mars 2026",
    type: "Carve-out",
    secteur: "Industrie / Construction & Infrastructure",
    headlineEv: "EV non divulgué (~$1 Md rev.)",
    banks: ["UBS", "Lazard", "Jefferies"],
    parties: [
      {
        label: "Cible",
        text: "Mace Consult (branche consulting de Mace Group — programme management, cost consultancy). 5 200+ employés, 6 continents. Projets : Hudson Tunnel (NYC), Qiddiya (Arabie Saoudite), New Hospitals Programme (UK).",
      },
      {
        label: "Acquéreur",
        text: "Goldman Sachs Alternatives (Private Equity) — 75% stake.",
      },
      {
        label: "Vendeur",
        text: "Mace Group (actionnaires conservent minorité + sièges board).",
      },
    ],
    valorisation: [
      { label: "Revenue", value: "£687M en 2024, ~$1 Md en 2025" },
      { label: "EV", value: "Non divulgué publiquement" },
    ],
    advisors: {
      sellSide: ["UBS (M&A)", "Linklaters (legal)"],
      buySide: ["Lazard (M&A + financing)", "Jefferies (M&A)", "White & Case (legal)"],
    },
    interests: [
      {
        side: "Goldman Sachs",
        text: "Exposition au boom infra mondial (transition énergétique, data centers, transport). Consulting infra = marché en forte croissance organique avec revenus récurrents. GS Alternatives (>$625 Md AUM) vise la consolidation via acquisitions bolt-on (Turton Bond aux US dès août 2025).",
      },
      {
        side: "Mace",
        text: "Capital pour expansion (Amérique du Nord, digital). Mace Construct (contracting UK) se développe indépendamment avec un bilan clean. Supprimer conflits d'intérêt advisory vs construction.",
      },
    ],
    pointEntretien:
      "Citer en entretien chez GS ou Lazard. Montre que GS n'est pas que M&A/trading — le bras PE est un acteur PE majeur. Comprendre pourquoi un consultant pur vaut plus qu'un conglomérat mixte (multiples consulting > contracting).",
    ftUrl: "https://www.ft.com/content/goldman-sachs-mace-consult",
    kind: "deal",
  },
  {
    id: "d04",
    title: "UniCredit / Commerzbank",
    dates: "Prise 9% sept. 2024 — Document d'offre 5 mai 2026 — Acceptation jusqu'au 16 juin 2026",
    type: "OPA",
    secteur: "FIG — Banques",
    headlineEv: "~43 Md€ (capitalisation CBK)",
    banks: [],
    parties: [
      {
        label: "Cible",
        text: "Commerzbank AG (2e banque allemande, ~40 000 employés).",
      },
      {
        label: "Acquéreur",
        text: "UniCredit S.p.A. (CEO : Andrea Orcel). Stake actuel ~28-30% (26% actions + ~4% total return swaps).",
      },
      {
        label: "Ratio d'échange",
        text: "0,485 action UniCredit par action Commerzbank. Prix implicite ~31,07€/action (vs cours ~36€ en mai 2026 → décote ~14%).",
      },
      {
        label: "Calendrier",
        text: "AGM Commerzbank : 20 mai 2026. Ex-date dividende (€1,10) : 21 mai. Période d'acceptation : 5 mai — 16 juin 2026.",
      },
    ],
    valorisation: [
      { label: "Synergies estimées (UniCredit)", value: "~1,1 Md€/an d'ici 2030" },
      {
        label: "État allemand",
        value: "Détient ~12% de Commerzbank (reliquat sauvetage 2008), opposé au rachat",
      },
    ],
    advisors: {},
    interests: [
      {
        side: "UniCredit",
        text: "Champion bancaire pan-européen. Commerzbank complémentaire de HypoVereinsbank (filiale allemande UC). Rendements >20% même sans contrôle total. Décote P/Book vs pairs.",
      },
      {
        side: "Commerzbank",
        text: 'ROE cible 17% en 2028, 21% en 2030 (stratégie standalone "Momentum 2030"). Offre UC manque de détail sur intégration HVB et sous-valorise la banque. État allemand craint perte de la banque du Mittelstand.',
      },
    ],
    contexte:
      "CEO Commerzbank : Bettina Orlopp. OPA hostile / échange d'actions. Résistance politique allemande forte.",
    pointEntretien:
      "Incontournable en FIG ou M&A européen. Expliquer : OPA progressive via total return swaps, seuil 30% en droit allemand, pourquoi les fusions bancaires cross-border échouent en Europe (pas d'union bancaire, résistance politique, exigences CET1).",
    ftUrl: "https://www.ft.com/content/unicredit-commerzbank",
    kind: "deal",
  },
  {
    id: "d05",
    title: "Worldline — Programme de cessions d'actifs",
    dates: "Programme lancé 2024, cessions en cours 2025-2026",
    type: "Cessions",
    secteur: "TMT / Fintech / Payments",
    headlineEv: "MeTS ~410 M€ EV",
    banks: ["Jefferies"],
    parties: [
      {
        label: "Entité",
        text: "Worldline SA (Euronext: WLN). Leader européen des paiements.",
      },
      {
        label: "Contexte financier",
        text: "Profit warnings répétés 2023-2024. Cours passé de ~80€ (2021) à ~2,50€ (2025). Goodwill impairment 4,7 Md€ en 2025. Downgrade S&P à BB. Dette nette ~2,1 Md€.",
      },
      {
        label: "Principales cessions",
        text: "MeTS → Shift4 (~410 M€ EV) ; Worldline North America (en cours) ; Cetrel (Luxembourg), PaymentIQ, MS India, autres actifs IFRS 5.",
      },
    ],
    valorisation: [
      {
        label: "Impact total",
        value: "~900 M€ CA déconsolidé, ~200 M€ EBITDA, ~30% des effectifs",
      },
    ],
    advisors: {
      sellSide: ["Jefferies (sole financial advisor)", "Norton Rose (legal)"],
    },
    interests: [
      {
        side: "Worldline",
        text: 'Recentrage radical sur le cœur européen (acquiring, processing). Après des acquisitions ratées (Ingenico, SIX Payment Services, Equens), portefeuille hétérogène et peu synergétique. Réduire la dette, simplifier la structure, restaurer la crédibilité. Nouveau CEO Pierre-Antoine Vacheron exécute le plan "Power24".',
      },
      {
        side: "Acheteurs",
        text: "Shift4 gagne une entrée dans le payment processing européen. Actifs avec positions locales fortes malgré la détresse du groupe.",
      },
    ],
    pointEntretien:
      'Répondre à "quand le M&A détruit-il de la valeur ?" ou "exemple de croissance externe ratée". Comprendre le lien cours de bourse en chute → downgrade crédit → cessions pour survivre. Parallèle avec Atos.',
    ftUrl: "https://www.ft.com/content/worldline-restructuring",
    kind: "deal",
  },
  {
    id: "d06",
    title: "Kering Beauté / Creed → L'Oréal",
    dates: "Annonce oct. 2025 — Closing 31 mars 2026",
    type: "M&A",
    secteur: "Retail / Luxe / FMCG",
    headlineEv: "4 Md€ cash",
    banks: ["Evercore", "Centerview Partners", "Bank of America", "Rothschild & Co"],
    parties: [
      {
        label: "Cible",
        text: "Kering Beauté (incluant Creed, maison de parfums de luxe) + licences 50 ans pour Bottega Veneta, Balenciaga, et Gucci (quand licence Coty expire en 2028).",
      },
      {
        label: "Acquéreur",
        text: "L'Oréal (plus grande acquisition de son histoire).",
      },
      {
        label: "Vendeur",
        text: "Kering (CEO : Luca de Meo, arrivé sept. 2025).",
      },
    ],
    valorisation: [
      { label: "Prix", value: "4 Md€ cash (= ~$4,66 Md)" },
      {
        label: "Multiple",
        value: "~12,4x revenue (Kering Beauté : ~323 M€ CA 2024, dont Creed en forte croissance)",
      },
    ],
    advisors: {
      sellSide: ["Evercore", "Centerview Partners"],
      buySide: ["Bank of America", "Rothschild & Co"],
    },
    interests: [
      {
        side: "L'Oréal",
        text: "Creed = une des marques les plus dynamiques de la parfumerie ultra-luxe. Accès aux licences Gucci/Balenciaga/Bottega pour 50 ans → coup stratégique majeur contre Coty et Estée Lauder. Complète YSL (licence acquise en 2008). Les fragrances croissent en double-digit chez L'Oréal.",
      },
      {
        side: "Kering",
        text: 'Réduire la dette nette (9,5 Md€ mi-2025). Kering avait acheté Creed pour 3,5 Md€ en 2023 — revend l\'ensemble pour 4 Md€ deux ans après. Analyste Bernstein : "amer mais nécessaire". De Meo recentre Kering sur la mode (Gucci en difficulté, -14% au T3 2025).',
      },
    ],
    contexte:
      "Plus grande acquisition de L'Oréal (116 ans d'histoire). JV Kering/L'Oréal dans le wellness et la longévité en parallèle. Illustre la consolidation du luxe : même les groupes les plus puissants cèdent des actifs non-core sous pression bilancielle.",
    pointEntretien:
      "Citer si vous postulez en M&A luxe/consumer. Comprendre la mécanique de licences longues (50 ans) et pourquoi le multiple est élevé (12x revenue) : c'est le pipeline de marques (Gucci, Balenciaga) qui justifie le prix, pas le CA actuel.",
    ftUrl: "https://www.ft.com/content/kering-loreal-creed-beauty",
    kind: "deal",
  },
  {
    id: "d07",
    title: "Swisscom / Vodafone Italia → Fastweb",
    dates: "Annonce mars 2024 — Closing 31 déc. 2024",
    type: "M&A",
    secteur: "TMT / Telecom",
    headlineEv: "~8 Md€",
    banks: ["Evercore", "Deutsche Bank", "JPMorgan", "UBS"],
    parties: [
      {
        label: "Cible",
        text: "Vodafone Italia (activités mobile et fixe en Italie).",
      },
      {
        label: "Acquéreur",
        text: "Swisscom (via sa filiale Fastweb).",
      },
      {
        label: "Vendeur",
        text: "Vodafone Group.",
      },
    ],
    valorisation: [
      { label: "Prix", value: "~8 Md€ (EV)" },
      { label: "Multiple", value: "~6x EBITDA" },
    ],
    advisors: {
      buySide: [
        "Evercore",
        "Deutsche Bank",
        "JPMorgan (M&A)",
        "Legance",
        "White & Case",
        "Sullivan & Cromwell (legal)",
        "PwC (due diligence)",
      ],
      sellSide: ["UBS (M&A)", "Slaughter and May", "ADVANT NCTM (legal)"],
    },
    interests: [
      {
        side: "Swisscom",
        text: "Créer un opérateur convergent (fixe + mobile) de taille critique en Italie. Fastweb + Vodafone Italia = challenger face à TIM et Iliad. Synergies réseau (migration des clients mobile Fastweb vers le réseau Vodafone).",
      },
      {
        side: "Vodafone",
        text: "Désendettement et simplification du portefeuille. Vodafone Group sous pression de l'activisme actionnarial (Cevian Capital). Cession de marchés où Vodafone est sous-dimensionné.",
      },
    ],
    contexte:
      "Consolidation telecom européen accélérée (Vodafone cède aussi l'Espagne, la Hongrie). Approuvé par la Commission européenne (sept. 2024), AGCOM (nov. 2024), autorité italienne de la concurrence (déc. 2024).",
    pointEntretien:
      "Comprendre la logique de consolidation telecom en Europe (trop de fragmentation = sous-investissement dans les réseaux). Connaître les enjeux réglementaires antitrust dans le telecom.",
    ftUrl: "https://www.ft.com/content/swisscom-vodafone-italy",
    kind: "deal",
  },
  {
    id: "d08",
    title: "Altice France — Cession SFR métropolitain",
    dates: "Offre conjointe 17 avr. 2026 — Exclusivité prolongée jusqu'au 5 juin 2026",
    type: "Cessions",
    secteur: "TMT / Telecom",
    headlineEv: "20,35 Md€",
    banks: ["Lazard"],
    parties: [
      {
        label: "Cible",
        text: "Activités telecom d'Altice France en France métropolitaine (SFR, réseau fibre, 5G).",
      },
      {
        label: "Acquéreurs",
        text: "Consortium Bouygues Telecom (~42 %), Free–Groupe iliad (~31 %) et Orange (~27 %) — offre conjointe en exclusivité.",
      },
    ],
    valorisation: [{ label: "EV", value: "20,35 Md€ (hors earn-out)" }],
    advisors: {
      sellSide: ["Lazard (probable)"],
    },
    interests: [
      {
        side: "Altice",
        text: "Suite directe du deal 2 (restructuration dette). Une fois désendettée, mise en vente de l'essentiel des activités telecom. Le prix reflète une décote de distress vs valorisation pré-crise.",
      },
      {
        side: "Acquéreur",
        text: "Consortium en négociations exclusives pour les actifs SFR métropolitains (prolongation d'exclusivité au 5 juin 2026). Répartition indicative : B2B majoritairement Bouygues ; B2C et infra partagés entre les trois opérateurs.",
      },
    ],
    contexte:
      "Enchaînement : LBO surendetté → restructuring dette → cession actifs → désendettement résiduel. Voir aussi deal d02 (Altice restructuring).",
    pointEntretien:
      "Montrer le séquencement complet : LBO surendetté → restructuring dette → cession actifs → désendettement résiduel. Enchaîner Deal 2 + Deal 8 en entretien démontre une compréhension globale.",
    ftUrl: "https://www.ft.com/content/altice-sfr-sale-2026",
    kind: "deal",
  },
  {
    id: "d09",
    title: "Sanofi / Blueprint Medicines",
    dates: "Annonce juin 2025 — OPA juil. 2025 — Closing en cours",
    type: "OPA",
    secteur: "Santé / Biopharma",
    headlineEv: "~$9,1-9,5 Md (equity value)",
    banks: [],
    parties: [
      {
        label: "Cible",
        text: "Blueprint Medicines Corporation (Nasdaq: BPMC — biotech US, mastocytose systémique).",
      },
      {
        label: "Acquéreur",
        text: "Sanofi (via filiale Rothko Merger Sub).",
      },
    ],
    valorisation: [
      { label: "Prix", value: "$129/action cash + CVR jusqu'à $6/action additionnel (milestones)" },
      {
        label: "Equity value",
        value: "~$9,1 Md upfront ; jusqu'à ~$9,5 Md avec CVR (milestones BLU-808)",
      },
    ],
    advisors: {},
    interests: [
      {
        side: "Sanofi",
        text: "Renforcer le pipeline immunologie après la cession d'Opella. Blueprint apporte AYVAKIT (avapritinib) pour la mastocytose. S'inscrit dans la stratégie pure-play biopharma.",
      },
      {
        side: "Blueprint",
        text: "Prime significative vs cours pré-annonce. CVR offre un upside additionnel.",
      },
    ],
    contexte:
      "Illustre le réemploi des 10 Md€ cash de la cession Opella. Sanofi enchaîne les acquisitions bolt-on en 2025 : Vigil Neuroscience (Alzheimer), Dren Bio ($600M + milestones), Blueprint.",
    pointEntretien:
      'Parfait pour illustrer le séquencement stratégique de Sanofi. Comprendre la mécanique OPA tender offer + CVR. Citer si on vous demande "un exemple de deal récent dans la pharma".',
    ftUrl: "https://www.ft.com/content/sanofi-blueprint-medicines",
    kind: "deal",
  },
  {
    id: "d10",
    title: "Vinci / Safeway Concessions (autoroutes Inde)",
    dates: "Annonce mars 2026 — Closing attendu fin 2026",
    type: "M&A",
    secteur: "Industrie / Infrastructure",
    headlineEv: "~1,6 Md$",
    banks: [],
    parties: [
      {
        label: "Cible",
        text: "Safeway Concessions — 9 concessions autoroutières en Inde (~700 km, Andhra Pradesh et Gujarat).",
      },
      {
        label: "Acquéreur",
        text: "Vinci.",
      },
      {
        label: "Vendeur",
        text: "Macquarie Asset Management.",
      },
    ],
    valorisation: [
      { label: "EV", value: "~150 Md roupies indiennes (~1,6 Md$)" },
      { label: "Multiple", value: "~15x EBITDA" },
    ],
    advisors: {},
    interests: [
      {
        side: "Vinci",
        text: "Expansion dans les concessions autoroutières en Inde, marché en forte croissance (PIB +6-7%/an, investissements infra massifs). Vinci est déjà n°1 mondial des concessions (autoroutes, aéroports). Diversification géographique hors Europe.",
      },
      {
        side: "Macquarie",
        text: "Réalisation d'un investissement infra mature. Macquarie Asset Management est le plus grand gestionnaire d'actifs infra au monde — cycle classique de rotation de portefeuille (construire, stabiliser, céder).",
      },
    ],
    pointEntretien:
      "Citer si vous postulez chez Vinci, Macquarie, ou en infra/PE. Montre la dynamique des concessions : multiples élevés (15x) justifiés par la visibilité long terme des cash flows (péages, contrats 20-30 ans).",
    ftUrl: "https://www.ft.com/content/vinci-india-highways",
    kind: "deal",
  },
  {
    id: "d11",
    title: "Rheinmetall / croissance externe défense européenne",
    dates: "Multiples acquisitions 2025-2026",
    type: "Tendance",
    secteur: "Industrie / Défense",
    headlineEv: "Tendance macro",
    banks: [],
    parties: [
      {
        label: "Contexte",
        text: "Budgets défense européens en hausse massive post-Ukraine (>3,5% PIB Allemagne d'ici 2029, soit >150 Md€/an). Rheinmetall (leader européen munitions et véhicules blindés) est le principal consolidateur. Capitalisation x5 en 3 ans.",
      },
      {
        label: "Exemples d'acquisitions",
        text: "Expal Systems (munitions, Espagne), Loc Performance (US), American Rheinmetall. Pipeline de carve-outs de divisions défense de groupes diversifiés (ex : Thales, BAE Systems).",
      },
    ],
    interests: [
      {
        side: "Acheteurs (Rheinmetall et pairs)",
        text: "Augmenter la capacité de production pour répondre à la demande (commandes estimées 20x la production annuelle actuelle). Acquérir des technologies software/IA (ex : Helsing, drones autonomes). Souveraineté : les gouvernements européens favorisent les fournisseurs locaux.",
      },
      {
        side: "PE / mid-market",
        text: "PE actif dans les fournisseurs et sous-traitants (carve-outs, mid-market).",
      },
    ],
    contexte:
      "Thème macro incontournable M&A 2026. Multiples défense en hausse (visibilité du carnet de commandes sur 10 ans).",
    pointEntretien:
      "Thème macro incontournable. Comprendre pourquoi les multiples défense montent (visibilité du carnet de commandes sur 10 ans). PE actif dans les fournisseurs et sous-traitants (carve-outs, mid-market). Mentionner si on vous demande les tendances M&A 2026.",
    ftUrl: "https://www.ft.com/content/european-defence-ma-2025",
    advisors: {},
    kind: "trend",
  },
  {
    id: "d12",
    title: "ExxonMobil / Pioneer Natural Resources",
    dates: "Annonce oct. 2023 — Closing mai 2024",
    type: "M&A",
    secteur: "Énergie / Oil & Gas",
    headlineEv: "~$60 Md",
    banks: [],
    parties: [
      {
        label: "Cible",
        text: "Pioneer Natural Resources (leader du bassin Permian, Texas — shale US).",
      },
      {
        label: "Acquéreur",
        text: "ExxonMobil.",
      },
    ],
    valorisation: [
      { label: "Prix", value: "~$60 Md (all-stock — échange d'actions)" },
      { label: "Multiple", value: "~6x EBITDA forward" },
      { label: "Synergies", value: "$2 Md/an via optimisation technique" },
    ],
    interests: [
      {
        side: "Exxon",
        text: "Consolider la position dans le Permian (le bassin shale le plus productif au monde). Production combinée Pioneer + Exxon = ~1,3M barils/jour dans le Permian. Réserves prouvées massives à moindre coût d'extraction.",
      },
      {
        side: "Pioneer",
        text: "Premium pour les actionnaires. Pioneer seul n'avait pas la taille pour optimiser les coûts d'extraction au même niveau qu'Exxon. Deal all-stock = fiscalité avantageuse pour les actionnaires Pioneer.",
      },
    ],
    contexte:
      "Plus grande acquisition dans l'énergie depuis 20 ans. Lance une vague de consolidation O&G en 2024-2025 (Chevron/Hess, ConocoPhillips/Marathon, Diamondback/Endeavor). Paradoxe ESG : les majors rachètent des réserves fossiles massives malgré la transition énergétique.",
    pointEntretien:
      'Répondre à "pourquoi les pétrolières font des acquisitions massives si le monde veut décarboner ?". Les actifs O&G ont une durée de vie 10-30 ans, la demande reste élevée à moyen terme, les majors génèrent du cash pour financer la transition. Logique rationnelle à horizon 2035.',
    ftUrl: "https://www.ft.com/content/exxonmobil-pioneer-resources",
    kind: "deal",
  },
  {
    id: "d13",
    title: "Lineage Logistics — IPO (2024)",
    dates: "IPO juil. 2024",
    type: "M&A",
    secteur: "Immobilier / REIT logistique",
    headlineEv: "~18 Md$ valorisation",
    banks: ["Morgan Stanley", "Goldman Sachs", "JPMorgan"],
    parties: [
      {
        label: "Entité",
        text: "Lineage Logistics — REIT spécialisé entrepôts frigorifiques (cold storage). Leader US.",
      },
    ],
    valorisation: [
      { label: "Valorisation IPO", value: "~18 Md$" },
      { label: "Contexte", value: "Plus grande IPO mondiale 2024" },
    ],
    interests: [
      {
        side: "Investisseurs",
        text: "Exposition à la logistique e-commerce et chaîne du froid. Rendements liés aux loyers long terme et occupation.",
      },
    ],
    pointEntretien:
      "Illustrer la différence REIT vs promoteur : FFO, NAV, cap rates. Citer MS/GS/JPM comme bookrunners sur une IPO infra/logistique.",
    kind: "deal",
  },
  {
    id: "d14",
    title: "Microsoft / Activision Blizzard",
    dates: "Annonce jan. 2022 — Closing oct. 2023",
    type: "M&A",
    secteur: "TMT / Gaming",
    headlineEv: "~69 Md$",
    banks: [],
    parties: [
      {
        label: "Cible",
        text: "Activision Blizzard (Call of Duty, World of Warcraft, Candy Crush).",
      },
      { label: "Acquéreur", text: "Microsoft." },
    ],
    valorisation: [
      { label: "Prix", value: "~95$/action, ~69 Md$" },
      { label: "Multiple", value: "~10x revenue" },
    ],
    interests: [
      {
        side: "Microsoft",
        text: "Gaming + cloud (Game Pass). Bataille réglementaire FTC/UE 2 ans — cas d'école antitrust tech.",
      },
    ],
    pointEntretien:
      "Plus grand deal gaming de l'histoire. Montrer que la valeur stratégique (écosystème) peut justifier un multiple revenue élevé malgré la lenteur réglementaire.",
    kind: "deal",
  },
  {
    id: "d16",
    title: "Chevron / Hess Corporation",
    dates: "Annonce oct. 2023 — Closing juil. 2024",
    type: "M&A",
    secteur: "Énergie / Oil & Gas",
    headlineEv: "~53 Md$",
    banks: ["Morgan Stanley", "Citigroup"],
    parties: [
      { label: "Cible", text: "Hess Corporation (Guyana, Bakken)." },
      { label: "Acquéreur", text: "Chevron." },
    ],
    valorisation: [
      { label: "Structure", value: "All-stock" },
      { label: "Multiple", value: "~10x EBITDA" },
    ],
    interests: [
      {
        side: "Chevron",
        text: "Accès au pétrole guyanais (Stabroek) — actif parmi les plus convoités au monde. Consolidation shale US.",
      },
    ],
    pointEntretien:
      "Complète Exxon/Pioneer : vague de M&A O&G 2023-24. Discuter paradoxe ESG vs rachat de réserves fossiles.",
    kind: "deal",
  },
  {
    id: "d17",
    title: "UBS / Credit Suisse (fusion d'urgence)",
    dates: "Annonce 19 mars 2023 — Closing juin 2023",
    type: "M&A",
    secteur: "FIG — Banques",
    headlineEv: "CHF 3 Md (~3,2 Md$)",
    banks: ["UBS"],
    parties: [
      {
        label: "Cible",
        text: "Credit Suisse AG — 2e banque suisse, en crise de confiance (fuite des dépôts, chute du cours) après la faillite de SVB.",
      },
      {
        label: "Acquéreur",
        text: "UBS Group AG — sauvetage orchestré par la FINMA et le gouvernement suisse.",
      },
      {
        label: "Ratio d'échange",
        text: "1 action UBS pour 22,48 actions Credit Suisse (~CHF 0,76/action CS, décote ~60 % vs vendredi précédent).",
      },
    ],
    valorisation: [
      { label: "Prix", value: "CHF 3 Md en actions UBS" },
      {
        label: "AT1",
        value:
          "CHF ~16 Md d'instruments AT1 entièrement annulés (sans compensation aux détenteurs)",
      },
      {
        label: "Soutien public",
        value:
          "Garantie fédérale jusqu'à CHF 9 Md sur pertes d'actifs ; liquidité BNS jusqu'à CHF 100 Md",
      },
    ],
    advisors: {
      other: [
        {
          label: "Transaction soutenue par",
          banks: ["FINMA", "Département fédéral des finances", "Banque nationale suisse"],
        },
      ],
    },
    interests: [
      {
        side: "UBS",
        text: "Éviter une faillite systémique en Suisse. Créer le 1er gestionnaire de fortune mondial (~5 000 Md$ d'actifs sous gestion). Synergies de coûts massives mais risque d'intégration et de culture.",
      },
      {
        side: "Credit Suisse / actionnaires",
        text: "Alternative à la liquidation. Décote historique sur la valorisation. Perte totale pour les détenteurs d'AT1 (précédent réglementaire majeur en Europe).",
      },
    ],
    contexte:
      "Plus grande fusion bancaire en Europe depuis la crise de 2008. Cas d'école : régulation, bail-in, instruments hybrides, sauvetage systémique. En entretien 2026 : parler au passé pour Credit Suisse, stratégie UBS pour l'avenir.",
    pointEntretien:
      "Incontournable pour UBS, Credit Suisse (legacy) et FIG. Expliquer FINMA, l'annulation des AT1, et pourquoi l'équivalent d'une « prime de contrôle négative » a été accepté pour la stabilité financière.",
    kind: "deal",
  },
  {
    id: "d18",
    title: "Automobile — consolidation EV et pression prix (Europe)",
    dates: "Tendance 2025-2026",
    type: "Tendance",
    secteur: "Automobile / Mobilité & EV",
    headlineEv: "Tendance sectorielle",
    banks: [],
    parties: [
      {
        label: "Contexte",
        text: "Transition BEV accélérée mais rentabilité EV sous pression (guerre des prix, coût batteries). OEM européens (Stellantis, Renault, VW) réorganisent plateformes et partenariats. Entrée agressive des constructeurs chinois (BYD, SAIC) en Europe.",
      },
      {
        label: "Exemples à citer",
        text: "Stellantis (multi-marques, discount boursier), Renault Group (Ampere / véhicule électrique), Volkswagen (software, Scout), BMW & Mercedes (mix premium EV). Tesla reste la référence pricing BEV.",
      },
    ],
    interests: [
      {
        side: "OEM européens",
        text: "Réduire le coût de plateforme, partager R&D (batteries, software), céder ou fermer des actifs non stratégiques. M&A ciblé sur équipementiers et tech (ADAS, batteries).",
      },
      {
        side: "PE / stratégiques",
        text: "Carve-outs de divisions non-core, restructurations supply chain, opportunités sur équipementiers en difficulté (réorganisation, dette).",
      },
    ],
    contexte:
      "Multiples auto cycliques : EV/EBIT souvent élevé en phase d'investissement ; marché sanctionne l'exécution et le mix BEV. En entretien : lier volumes, ASP, CapEx plateforme et cycle.",
    pointEntretien:
      "Citer Stellantis ou Renault pour illustrer discount de cycle + enjeu EV. Distinguer OEM vs équipementiers (marges, BFR, carnet). Mentionner BYD/Tesla comme référence prix sur le BEV.",
    advisors: {},
    kind: "trend",
  },
];

export const MA_DEALS: MaDeal[] = MA_DEALS_RAW.map((d) => ({
  ...d,
  sectorId: getSectorIdForSecteur(d.secteur),
}));

const uniqueBanks = [...new Set(MA_DEALS.flatMap((d) => d.banks))].sort((a, b) =>
  a.localeCompare(b, "fr"),
);

export const MA_DEAL_BANKS = ["all", ...uniqueBanks] as const;

export const MA_DEAL_SECTOR_IDS = [
  "all",
  ...SECTOR_IDS.filter((id) => MA_DEALS.some((d) => d.sectorId === id)),
] as const;

const TYPE_ORDER: MaDealType[] = [
  "M&A",
  "LBO",
  "Carve-out",
  "Restructuring",
  "OPA",
  "Cessions",
  "Tendance",
];

export const MA_DEAL_TYPES = [
  "all",
  ...TYPE_ORDER.filter((t) => MA_DEALS.some((d) => d.type === t)),
] as const;

export function isValidDealId(id: string): boolean {
  return MA_DEALS.some((d) => d.id === id);
}

export function getDealById(id: string): MaDeal | undefined {
  return MA_DEALS.find((d) => d.id === id);
}

export function getDealsForSector(sectorId: SectorId): MaDeal[] {
  return MA_DEALS.filter((d) => d.sectorId === sectorId);
}

export function dealMatchesType(deal: MaDeal, type: string): boolean {
  return deal.type === type;
}

export function dealMatchesSector(deal: MaDeal, sectorId: SectorId): boolean {
  return deal.sectorId === sectorId;
}

/** Badge date court pour l'en-tête de carte */
export function dealDateBadge(dates: string): string {
  const first = dates.split("—")[0]?.trim() ?? dates;
  return first.length > 28 ? `${first.slice(0, 25)}…` : first;
}
