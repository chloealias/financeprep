import type { GuideAccretionContent } from "./accretion.types";

export const guideAccretionFr: GuideAccretionContent = {
  accretive: {
    body: "Le deal augmente l'EPS de l'acquéreur post-acquisition.",
    formula: "EPS pro forma > EPS actuel",
    condition: "Condition (échange d'actions) : P/E acquéreur > P/E cible",
  },
  dilutive: {
    body: "Le deal diminue l'EPS de l'acquéreur post-acquisition.",
    formula: "EPS pro forma < EPS actuel",
    condition: "Condition (échange d'actions) : P/E acquéreur < P/E cible",
  },
  formula: {
    line1: "EPS pro forma =",
    numerator:
      "(Net Income acquéreur + Net Income cible + Synergies après impôt − Coût financement)",
    denominator: "(Shares outstanding acquéreur + Nouvelles actions émises)",
    result: "Accretif si : EPS pro forma > EPS pré-deal acquéreur",
  },
  peCompare: {
    accretif: "P/E acq > P/E cible",
    dilutif: "P/E acq < P/E cible",
    neutre: "P/E acq = P/E cible",
  },
  rules: [
    {
      labelKey: "guide.accretion.rule.cash",
      texte:
        "Toujours accretif si le rendement des bénéfices de la cible (1/P/E cible) dépasse le coût après impôt de la dette.",
    },
    {
      labelKey: "guide.accretion.rule.stock",
      texte: "Accretif ssi P/E acquéreur > P/E cible. La règle la plus testée en entretien M&A.",
    },
    {
      labelKey: "guide.accretion.rule.mix",
      texte:
        "Analyser la contribution marginale de chaque tranche. Le cash est moins dilutif que les actions si le coût de dette est bas.",
    },
    {
      labelKey: "guide.accretion.rule.goodwill",
      texte:
        "L'amortissement des intangibles (Purchase Price Allocation) pèse sur l'EPS comptable mais pas sur le cash. Préciser la différence GAAP vs cash EPS.",
    },
    {
      labelKey: "guide.accretion.rule.synergies",
      texte:
        'Un deal dilutif peut devenir accretif si les synergies sont suffisantes. Toujours demander : "accretif avec ou sans synergies ?"',
    },
  ],
};
