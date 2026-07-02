export type PeFundProfile = {
  id: string;
  name: string;
  hq: string;
  aum: string;
  strategies: string[];
  ticketTypique: string;
  particularites: string[];
  recrutement?: string;
  pointEntretien: string;
  dealEmblematique: { titre: string; texte: string };
  emblematicDealId?: string;
  questionPiège: string;
  reponsePiège: string;
};

export const PE_FUND_LIST: PeFundProfile[] = [
  {
    id: "ardian",
    name: "Ardian",
    hq: "Paris",
    aum: "~150 Md$ (2025)",
    strategies: ["Buyout", "Growth", "Infrastructure", "Private debt", "Secondaries"],
    ticketTypique: "Mid-cap à large cap EU — LBO €100M–2Md+",
    particularites: [
      "Plus grand fonds PE européen indépendant (ex-AXA Private Equity)",
      "Plateforme infra et dette privée très développée",
      "Culture française forte, réseau global (US, Asie)",
      "Fonds sectoriels et géographiques multiples",
    ],
    recrutement:
      "Entretiens cas LBO + fit. Stages très sélectifs — profils finance, ingénieur, parfois juriste.",
    pointEntretien:
      "Citer un deal récent (infra, buyout France) et expliquer la différenciation vs KKR/EQT (indépendance, origine française).",
    dealEmblematique: {
      titre: "Plateforme buyout & infra Europe",
      texte:
        "Ardian investit sur tout le spectre mid/large cap en Europe — référence pour les entretiens PE en France.",
    },
    questionPiège: "Ardian est-elle une banque ?",
    reponsePiège:
      "Non — asset manager / GP de fonds PE. Pas de conseil M&A pur comme Lazard. Ne pas confondre avec AXA IM (côté institutionnel).",
  },
  {
    id: "eqt",
    name: "EQT",
    hq: "Stockholm / Paris",
    aum: "~250 Md$ (levier inclus)",
    strategies: ["Private capital", "Ventures", "Infrastructure", "Real estate", "Credit"],
    ticketTypique: "Large cap global — fonds flagship multi-stratégies",
    particularites: [
      "Origine nordique, hub Paris actif",
      "Modèle « industrial growth » : création de valeur opérationnelle",
      "Mothership + fonds sectoriels (health, tech, infra)",
      "Culture très internationale, process rigoureux",
    ],
    pointEntretien:
      "Insister sur l'approche opérationnelle (EQT Motherbrain, value creation team) vs financial engineering pur.",
    dealEmblematique: {
      titre: "Buyout pan-européen",
      texte:
        "EQT est parmi les GP les plus actifs en Europe sur les deals >1 Md€ — souvent en compétition avec KKR et CVC.",
    },
    questionPiège: "EQT fait-elle du venture ou du buyout ?",
    reponsePiège:
      "Les deux — plateforme multi-stratégies. En entretien LBO, parler du fonds Private Capital / Infrastructure selon le desk visé.",
  },
  {
    id: "kkr",
    name: "KKR",
    hq: "New York / Paris",
    aum: "~600 Md$ AUM groupe",
    strategies: ["Private equity", "Credit", "Infrastructure", "Real estate", "Capital markets"],
    ticketTypique: "Large cap — LBO et growth, tickets très élevés",
    particularites: [
      "L'un des fondateurs du LBO moderne (années 1980)",
      "Présence forte en France (ex. Mondadori, Vivarte historique)",
      "Plateforme intégrée : PE + crédit + infra",
      "Culture US, process très structuré",
    ],
    pointEntretien:
      "Montrer la connaissance des 3 leviers LBO et citer un deal KKR récent en Europe. Distinguer KKR (GP) de KKR Capstone (ops).",
    dealEmblematique: {
      titre: "LBO large cap Europe",
      texte:
        "KKR reste une référence absolue en entretien PE — préparer un deal et le mécanisme de création de valeur.",
    },
    questionPiège: "KKR est-elle une banque d'investissement ?",
    reponsePiège:
      "Non — fonds de private equity / asset manager. KKR & Co. cotée. Ne pas la confondre avec les bulge brackets.",
  },
  {
    id: "eurazeo",
    name: "Eurazeo",
    hq: "Paris",
    aum: "~35 Md€",
    strategies: ["Private equity", "Growth", "Smart City / impact", "Secondaries"],
    ticketTypique: "Mid-cap France/Europe — €50M–500M EV",
    particularites: [
      "GP français coté (Euronext) — transparence actionnariale",
      "Historique Wendel / Rothschild — réseau industriel français",
      "Fort sur mid-cap française et growth",
      "Stratégie ESG / impact intégrée",
    ],
    pointEntretien:
      "Citer un portefeuille français connu (Decathlon historique, etc.) et l'angle mid-cap vs mega-fonds US.",
    dealEmblematique: {
      titre: "Mid-cap française",
      texte:
        "Eurazeo illustre le PE « français » accessible en entretien — tickets mid-cap, réseau industriel.",
    },
    questionPiège: "Eurazeo et Wendel, même groupe ?",
    reponsePiège:
      "Non — entités distinctes. Wendel est une holding familiale cotée ; Eurazeo est un GP. Liens historiques mais pas de fusion.",
  },
  {
    id: "pai-partners",
    name: "PAI Partners",
    hq: "Paris / Londres",
    aum: "~27 Md€",
    strategies: ["Buyout mid/large cap Europe"],
    ticketTypique: "€500M–5Md EV — secteurs consumer, healthcare, business services",
    particularites: [
      "Pure-play buyout européen",
      "Portefeuille : Nestlé Waters (historique), SMCP, etc.",
      "Culture partnership avec management",
      "Moins diversifié qu'Ardian (focus buyout)",
    ],
    pointEntretien:
      "Préparer un deal PAI en consumer ou healthcare et le discours « operational partner ».",
    dealEmblematique: {
      titre: "Buyout consumer & services EU",
      texte: "PAI est souvent citée avec CVC et Ardian sur les deals mid/large cap européens.",
    },
    questionPiège: "PAI fait-elle du venture ?",
    reponsePiège:
      "Non — buyout mid/large cap uniquement. Ne pas la présenter comme un fonds early-stage.",
  },
  {
    id: "wendel",
    name: "Wendel",
    hq: "Paris",
    aum: "~€8 Md (nav cotée)",
    strategies: ["Holding long-term", "PE via Wendel Participations", "Co-investissements"],
    ticketTypique: "Participations minoritaires ou majoritaires long terme",
    particularites: [
      "Holding familiale cotée (pas un fonds à durée fixe classique)",
      "Horizon très long — pas de sortie à 5 ans systématique",
      "Réseau industriel français (ex-L'Oréal, Saint-Gobain liens historiques)",
      "Structure différente d'un fonds Ardian/PAI",
    ],
    pointEntretien:
      "Expliquer le modèle holding vs fonds à durée limitée. Citer Bureau Veritas, Stahl (portefeuille).",
    dealEmblematique: {
      titre: "Holding industrielle française",
      texte: "Wendel = cas d'école pour distinguer PE « fonds » vs PE « holding cotée ».",
    },
    questionPiège: "Wendel est-elle un fonds de pension ?",
    reponsePiège:
      "Non — société d'investissement cotée, contrôlée par la famille Wendel. Investit en direct et via participations.",
  },
  {
    id: "apax",
    name: "Apax Partners",
    hq: "Londres / Paris",
    aum: "~80 Md$",
    strategies: ["Buyout", "Digital growth"],
    ticketTypique: "Mid à large cap — tech, services, healthcare",
    particularites: [
      "Fonds global avec forte présence EU",
      "Historique tech/services (ex. Trader Media, etc.)",
      "Stratégie digital growth en complément du buyout",
      "Paris : bureau actif sur mandats français",
    ],
    pointEntretien:
      "Citer le positionnement sectoriel (tech-enabled services) et un deal récent EU.",
    dealEmblematique: {
      titre: "Buyout tech-enabled services",
      texte:
        "Apax illustre le PE global avec ancrage européen — comparable à CVC sur certains segments.",
    },
    questionPiège: "Apax est-elle uniquement UK ?",
    reponsePiège:
      "Non — HQ Londres mais investissements globaux, bureau Paris, deals France réguliers.",
  },
  {
    id: "astorg",
    name: "Astorg",
    hq: "Paris / Londres",
    aum: "~€25 Md",
    strategies: ["Mid-cap buyout Europe"],
    ticketTypique: "€200M–2Md EV — healthcare, business services, software",
    particularites: [
      "GP français/européen mid-cap",
      "Croissance par acquisitions add-on",
      "Secteurs défensifs (healthcare, software B2B)",
      "Moins médiatisé que PAI/Ardian mais très actif",
    ],
    pointEntretien:
      "Mettre en avant le mid-cap et les build-ups — mécanisme de création de valeur clé.",
    dealEmblematique: {
      titre: "Mid-cap buyout EU",
      texte:
        "Astorg représente le segment mid-cap PE français en entretien — souvent en short-list avec PAI.",
    },
    questionPiège: "Astorg et Ardian, même taille ?",
    reponsePiège:
      "Non — Ardian est nettement plus large (multi-stratégies, infra, dette). Astorg = buyout mid-cap focused.",
  },
  {
    id: "cdr",
    name: "Clayton, Dubilier & Rice (CD&R)",
    hq: "New York / Londres",
    aum: "~50 Md$",
    strategies: ["Large cap buyout", "Operations-led"],
    ticketTypique: "Large cap US/EU — consumer, healthcare, industrials",
    particularites: [
      "Acquéreur Opella (Sanofi) — deal emblématique FR 2024-25",
      "Approche opérationnelle forte (ex-operateurs en équipe)",
      "Présence européenne via Londres",
      "Moins connu du grand public que KKR en France",
    ],
    pointEntretien:
      "Citer Opella / CD&R — carve-out pharma, pression politique Doliprane. Lien avec actualité M&A du site.",
    dealEmblematique: {
      titre: "Sanofi / Opella → CD&R",
      texte: "Carve-out ~16 Md€ EV — deal de référence pour CD&R en entretien France 2025-26.",
    },
    emblematicDealId: "d01",
    questionPiège: "CD&R est-elle européenne ?",
    reponsePiège:
      "US-based, mais très active en Europe. Opella prouve l'ancrage sur les grands carve-outs EU.",
  },
  {
    id: "cvc",
    name: "CVC Capital Partners",
    hq: "Luxembourg / Paris / Londres",
    aum: "~200 Md$ (AUM groupe)",
    strategies: ["Private equity", "Credit", "Secondaries", "Growth"],
    ticketTypique: "Mid à mega-cap — tous secteurs",
    particularites: [
      "L'un des plus grands GP mondiaux",
      "Très actif en France (retail, services, healthcare)",
      "Fonds flagship + sector funds",
      "Process compétitif — entretiens exigeants",
    ],
    pointEntretien:
      "Préparer un deal CVC récent et la structure multi-fonds. Ne pas confondre avec CVCE (anciennement Eurazeo).",
    dealEmblematique: {
      titre: "Buyout pan-européen multi-sectoriel",
      texte: "CVC est dans la short-list de presque tous les process mid/large cap en Europe.",
    },
    questionPiège: "CVC et CVC Credit, c'est quoi ?",
    reponsePiège:
      "Même groupe — plateformes PE et crédit. En entretien buyout, préciser le fonds Private Equity visé.",
  },
];

export const PE_FUND_PROFILES: Record<string, PeFundProfile> = Object.fromEntries(
  PE_FUND_LIST.map((f) => [f.id, f]),
);

export function getPeFundById(id: string): PeFundProfile | undefined {
  return PE_FUND_PROFILES[id];
}

export function isValidPeFundId(id: string): boolean {
  return id in PE_FUND_PROFILES;
}
