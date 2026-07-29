import type { GuidePyramidContent } from "./pyramid.types";

export const guidePyramidFr: GuidePyramidContent = {
  intro:
    "Ces deux frameworks structurent toutes vos réponses — techniques ET comportementales. Les maîtriser, c'est paraître deux fois plus clair que les autres candidats, à niveau de connaissance égal.",
  svg: {
    conclusion: "CONCLUSION",
    conclusionHint: "D'abord",
    arguments: "ARGUMENTS CLÉS",
    argumentsHint: "2-3 raisons principales",
    evidence: "PREUVES & EXEMPLES",
    evidenceHint: "Chiffres, cas concrets, anecdotes",
  },
  goldenRuleBody:
    "Ne jamais commencer par le contexte. Commencer par la réponse. Le contexte vient ensuite pour justifier.",
  withoutExample:
    '"J\'ai toujours été intéressé par les chiffres... Au lycée j\'aimais les maths... En L3 j\'ai fait un cours de compta..."',
  withExample: {
    conclusionLabel: "Conclusion —",
    conclusion:
      "« La finance me permet de comprendre comment les entreprises créent de la valeur — c'est ce qui me passionne. »",
    argumentsLabel: "Arguments —",
    arguments: "« Premièrement… Deuxièmement… »",
    evidenceLabel: "Preuve —",
    evidence: "« C'est notamment ce que j'ai fait chez X où… »",
  },
  starCards: [
    {
      letter: "S",
      label: "Situation",
      quoi: "Le contexte en 1-2 phrases maximum",
      erreur: "Trop long — 30 sec max",
      exemple:
        "J'étais en stage M&A chez X, durant la phase de due diligence d'une acquisition dans le retail",
    },
    {
      letter: "T",
      label: "Tâche",
      quoi: "Votre rôle et objectif spécifique",
      erreur: "Confondre Tâche et Action — la tâche c'est CE QUE vous deviez faire, pas comment",
      exemple:
        "J'étais responsable de la revue du BFR historique et de la normalisation des EBITDA",
    },
    {
      letter: "A",
      label: "Action",
      quoi: "CE QUE VOUS avez fait — toujours 'je', pas 'nous'",
      erreur: "Utiliser 'nous' — l'interviewer veut savoir VOTRE contribution personnelle",
      exemple:
        "J'ai construit un modèle de BFR mensuel sur 3 ans, identifié 2 ajustements non récurrents représentant 800k€ d'EBITDA normalisé",
    },
    {
      letter: "R",
      label: "Résultat",
      quoi: "Impact mesurable. Toujours chiffrer si possible.",
      erreur: "Terminer sans résultat — 'j'ai fait X' sans dire ce que ça a produit",
      exemple:
        "L'analyse a été intégrée au mémo d'acquisition. Le client a réduit son offre de 5% en conséquence.",
    },
  ],
  matrix: [
    { q: "Pourquoi la finance ?", pyramid: true, star: false },
    { q: "Parlez d'une difficulté", pyramid: false, star: true },
    { q: "Quelle est votre valeur ajoutée ?", pyramid: true, star: false },
    { q: "Travail en équipe — exemple ?", pyramid: false, star: true },
    { q: "Expliquez-moi un concept", pyramid: true, star: false },
    { q: "Une décision difficile ?", pyramid: false, star: true },
    { q: "Pourquoi notre banque ?", pyramid: true, star: false },
  ],
  timeBuyingIntro:
    "Un silence de 3 secondes paraît long en entretien. Ces réflexes achètent du temps sans perdre en crédibilité — en combinant avec Pyramid (conclusion d'abord).",
  usefulPhrases: [
    "« Si je reformule bien, vous me demandez… »",
    "« Je vais structurer ma réponse en trois points. »",
    "« En synthèse : [conclusion]. Détail : … »",
    "« Puis-je prendre quelques secondes pour organiser ma pensée ? »",
    "« Côté chiffres, l'ordre de grandeur est… » (avant le calcul exact)",
  ],
  avoidPhrases: [
    "Silence total sans annoncer la structure",
    "Inventer un chiffre pour « remplir »",
    "« Je ne sais pas » sans proposer une piste",
    "Partir dans le détail avant la conclusion",
  ],
  timeBuyingRule:
    "Règle : même sous pression, donner une conclusion en 10 secondes — puis approfondir ou demander une précision.",
};
