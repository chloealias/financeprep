import type { GuideDiagnosticContent } from "./diagnostic.types";

export const guideDiagnosticFr: GuideDiagnosticContent = {
  technicalIntro:
    'Cochez "je maîtrise" uniquement si vous pouvez expliquer le sujet à voix haute, sans notes, en moins de 2 minutes.',
  technicalSections: [
    {
      id: "modelisation-excel",
      title: "Modélisation & Excel",
      items: [
        {
          id: "tech-excel-shortcuts",
          text: "Raccourcis clavier avancés (F4, Ctrl+flèches, Ctrl+Maj+$...) sans utiliser la souris",
        },
        {
          id: "tech-3-statements",
          text: "Construction d'un modèle 3 états qui boucle sans erreur de référence circulaire",
        },
        {
          id: "tech-sensitivity",
          text: "Tableau de sensibilité à 2 variables sans VBA",
        },
        {
          id: "tech-model-format",
          text: "Format professionnel d'un modèle",
        },
      ],
    },
    {
      id: "valorisation-lbo",
      title: "Valorisation & LBO",
      items: [
        {
          id: "tech-ev-eqv",
          text: "Passage EV → EqV (bridge complet)",
        },
        {
          id: "tech-dcf",
          text: "Construction d'un DCF",
        },
        {
          id: "tech-lbo",
          text: "Mécanique d'un LBO (sources & uses, effet de levier, IRR)",
        },
        {
          id: "tech-multiples",
          text: "Multiples de valorisation",
        },
        {
          id: "tech-sellside-process",
          text: "Structuration d'un process de vente sell-side",
        },
      ],
    },
    {
      id: "comptabilite-cas",
      title: "Comptabilité & cas pratiques",
      items: [
        {
          id: "tech-goodwill",
          text: "Impact d'une dépréciation de goodwill sur les 3 états financiers",
        },
        {
          id: "tech-bfr",
          text: "Variation du BFR",
        },
        {
          id: "tech-ifrs",
          text: "Retraitements IFRS de base",
        },
      ],
    },
    {
      id: "industry-knowledge",
      title: "Industry knowledge",
      items: [
        {
          id: "tech-deals",
          text: "3 deals M&A structurants du secteur cible",
        },
        {
          id: "tech-competitive",
          text: "Positionnement concurrentiel",
        },
        {
          id: "tech-sellside-deal",
          text: "Maîtrise d'un deal sell-side",
        },
        {
          id: "tech-renault",
          text: "« Si tu devais valoriser Renault tu t'y prendrais comment concrètement ? »",
        },
        {
          id: "tech-macro",
          text: "Dynamiques macro",
        },
      ],
    },
  ],
  fitPresentation: [
    { id: "fit-presente", text: "Présente toi" },
    {
      id: "fit-pourquoi-ma",
      text: "Pourquoi le M&A/TS/PE ? en moins de 90 secondes, sans hésitation",
    },
    {
      id: "fit-analyste",
      text: "Concrètement qu'est-ce qui est attendu d'un analyste ?",
    },
    {
      id: "fit-banque",
      text: "Pourquoi cette banque en particulier ? avec un hook réellement spécifique",
    },
    {
      id: "fit-experience",
      text: "Tu as fait quoi dans ta précédente expérience ?",
    },
    {
      id: "fit-pourquoi-vous",
      text: 'Réponse claire à "pourquoi vous et pas un autre candidat ?"',
    },
  ],
  fitStar: [
    { id: "star-leadership", text: "Leadership", href: "/pyramid" },
    { id: "star-echec", text: "Échec", href: "/pyramid" },
    { id: "star-equipe", text: "Travail d'équipe", href: "/pyramid" },
    { id: "star-conflit", text: "Gestion de conflit", href: "/pyramid" },
    { id: "star-chiffre", text: "Résultat chiffré", href: "/pyramid" },
  ],
  networkingWeeklyGoals: [
    "15 à 20 nouveaux contacts LinkedIn ciblés",
    "5 à 10 demandes de call envoyées",
    "2 à 3 networking calls réellement obtenus",
    "Relance systématique après quelques jours",
    "1 persona par banque contacté",
    "Diversification des canaux",
  ],
  networkingPrep: [
    {
      id: "net-30-contacts",
      text: "Liste écrite de vos 30 prochains contacts prioritaires, avec leur hook respectif",
    },
    {
      id: "net-alumnis",
      text: "Structures qui recrutent les alumnis identifiées",
    },
  ],
  networkingHook:
    "Le hook qui fait la différence : un deal récent, un changement de poste, une école ou un secteur commun.",
  networkingTemplates: [
    {
      id: "tpl-linkedin",
      title: "Message LinkedIn court",
      body: "Bonjour [Prénom],\n\nJe prépare des entretiens en M&A et votre parcours chez [Banque] m'a particulièrement intéressé ([hook : deal / école / secteur]).\nAuriez-vous 15 minutes pour un échange rapide dans les prochaines semaines ?\n\nMerci d'avance,\n[Prénom]",
    },
    {
      id: "tpl-hr",
      title: "Email à un RH",
      body: "Objet : Candidature Analyste M&A — [Votre école / profil]\n\nBonjour [Prénom],\n\nJe suis [Prénom Nom], [formation / expérience courte]. Je candidate au poste d'analyste M&A chez [Banque] et souhaite rejoindre une équipe reconnue sur [secteur / géographie].\nSeriez-vous disponible pour un court échange sur le process de recrutement ?\n\nCordialement,\n[Prénom Nom]",
    },
    {
      id: "tpl-senior",
      title: "Email à un profil senior",
      body: "Objet : Conseil — préparation entretiens M&A / [hook spécifique]\n\nBonjour [Prénom],\n\nVotre récente intervention / deal sur [sujet précis] m'a marqué. Je prépare des process en M&A et apprécierais grandement votre conseil sur [question concrète], plutôt qu'un call générique.\nSi vous avez 10–15 minutes dans les prochaines semaines, j'en serais très reconnaissant(e).\n\nBien cordialement,\n[Prénom Nom]",
    },
  ],
  diagnosticNone: "Évaluez les sujets techniques pour obtenir votre diagnostic.",
  diagnosticReady:
    "vous êtes globalement prêt(e), il reste des points de détail à affiner",
  diagnosticPriority:
    "des axes prioritaires clairs se dégagent, à travailler avant la rentrée des process",
  diagnosticCoaching:
    "un accompagnement structuré ferait une vraie différence sur les prochaines semaines",
};
