import type { GuideAccretionContent } from "./accretion.types";

export const guideAccretionEn: GuideAccretionContent = {
  accretive: {
    body: "The deal increases the acquirer's EPS after the acquisition.",
    formula: "Pro forma EPS > current EPS",
    condition: "Condition (stock deal): acquirer P/E > target P/E",
  },
  dilutive: {
    body: "The deal decreases the acquirer's EPS after the acquisition.",
    formula: "Pro forma EPS < current EPS",
    condition: "Condition (stock deal): acquirer P/E < target P/E",
  },
  formula: {
    line1: "Pro forma EPS =",
    numerator:
      "(Acquirer net income + Target net income + After-tax synergies − Financing cost)",
    denominator: "(Acquirer shares outstanding + New shares issued)",
    result: "Accretive if: pro forma EPS > acquirer pre-deal EPS",
  },
  peCompare: {
    accretif: "Acq P/E > Target P/E",
    dilutif: "Acq P/E < Target P/E",
    neutre: "Acq P/E = Target P/E",
  },
  rules: [
    {
      labelKey: "guide.accretion.rule.cash",
      texte:
        "Always accretive if the target's earnings yield (1/target P/E) exceeds the after-tax cost of debt.",
    },
    {
      labelKey: "guide.accretion.rule.stock",
      texte:
        "Accretive iff acquirer P/E > target P/E. The most tested rule in M&A interviews.",
    },
    {
      labelKey: "guide.accretion.rule.mix",
      texte:
        "Analyse the marginal contribution of each tranche. Cash is less dilutive than stock when debt cost is low.",
    },
    {
      labelKey: "guide.accretion.rule.goodwill",
      texte:
        "Amortisation of intangibles (Purchase Price Allocation) weighs on accounting EPS but not on cash. Spell out GAAP vs cash EPS.",
    },
    {
      labelKey: "guide.accretion.rule.synergies",
      texte:
        'A dilutive deal can become accretive if synergies are large enough. Always ask: "accretive with or without synergies?"',
    },
  ],
};
