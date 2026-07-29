export type GuideAccretionCard = {
  body: string;
  formula: string;
  condition: string;
};

export type GuideAccretionFormula = {
  line1: string;
  numerator: string;
  denominator: string;
  result: string;
};

export type GuideAccretionPeCompare = {
  accretif: string;
  dilutif: string;
  neutre: string;
};

export type GuideAccretionRule = {
  labelKey: string;
  texte: string;
};

export type GuideAccretionContent = {
  accretive: GuideAccretionCard;
  dilutive: GuideAccretionCard;
  formula: GuideAccretionFormula;
  peCompare: GuideAccretionPeCompare;
  rules: GuideAccretionRule[];
};
