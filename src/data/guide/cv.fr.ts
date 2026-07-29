import type { GuideCvContent } from "./cv.types";

export const guideCvFr: GuideCvContent = {
  checklist: [
    { id: "c1", text: "Je connais le nom de mon interlocuteur et sa banque" },
    { id: "c2", text: "Je sais pourquoi cette banque / ce bureau spécifiquement" },
    { id: "c3", text: "J'ai un fil directeur (1 phrase qui relie tout mon parcours)" },
    { id: "c4", text: "J'ai au moins 1 chiffre concret par expérience clé" },
    { id: "c5", text: "Ma réponse tient en moins de 2 minutes" },
    { id: "c6", text: "Je termine par 'c'est pourquoi ce poste m'intéresse'" },
  ],
  acts: [
    {
      num: "01",
      titre: "L'origine",
      duree: "20 sec",
      desc: "D'où venez-vous ? Un fil conducteur, pas une liste chronologique. 1 phrase d'ancrage : 'J'ai toujours été attiré par la compréhension des entreprises à travers leurs chiffres.'",
      dark: false,
    },
    {
      num: "02",
      titre: "Le pivot",
      duree: "60 sec",
      desc: "Vos 2-3 expériences les plus pertinentes. Pour chacune : contexte (1 phrase) + action + résultat chiffré. Ne détaillez que ce qui compte pour le poste.",
      dark: false,
    },
    {
      num: "03",
      titre: "La cible",
      duree: "20 sec",
      desc: "Pourquoi cette banque, ce bureau, ce moment. Montrez que vous avez fait vos recherches. Terminez sur une conviction, pas une question.",
      dark: true,
    },
  ],
  dealSteps: [
    {
      num: "01",
      label: "Contexte",
      desc: "Quelle entreprise, quel secteur, quelle taille de deal (EV / equity value)",
    },
    {
      num: "02",
      label: "Logique stratégique",
      desc: "Pourquoi ce deal ? Synergies, consolidation, expansion géographique ?",
    },
    {
      num: "03",
      label: "Structure financière",
      desc: "Mix financement : cash / actions / dette. Multiple payé (EV/EBITDA)",
    },
    {
      num: "04",
      label: "Votre rôle",
      desc: "Votre équipe, vos livrables concrets (modèle, due dil, mémo, data room)",
    },
    {
      num: "05",
      label: "Outcome",
      desc: "Résultat du deal. Leçon apprise. Pourquoi ce deal est représentatif de vos compétences.",
    },
  ],
  pitfalls: [
    "Réciter son CV chronologiquement sans fil directeur",
    "Parler plus de 2 minutes sans y être invité",
    "Mentionner des expériences non pertinentes pour le poste",
    "Ne pas personnaliser pour la banque cible",
    "Terminer sans transition vers 'pourquoi ce poste'",
  ],
};
