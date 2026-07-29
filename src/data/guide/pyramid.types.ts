export type GuidePyramidStarCard = {
  letter: string;
  label: string;
  quoi: string;
  erreur: string;
  exemple: string;
};

export type GuidePyramidMatrixRow = {
  q: string;
  pyramid: boolean;
  star: boolean;
};

export type GuidePyramidSvgLabels = {
  conclusion: string;
  conclusionHint: string;
  arguments: string;
  argumentsHint: string;
  evidence: string;
  evidenceHint: string;
};

export type GuidePyramidWithExample = {
  conclusionLabel: string;
  conclusion: string;
  argumentsLabel: string;
  arguments: string;
  evidenceLabel: string;
  evidence: string;
};

export type GuidePyramidContent = {
  intro: string;
  svg: GuidePyramidSvgLabels;
  goldenRuleBody: string;
  withoutExample: string;
  withExample: GuidePyramidWithExample;
  starCards: GuidePyramidStarCard[];
  matrix: GuidePyramidMatrixRow[];
  timeBuyingIntro: string;
  usefulPhrases: string[];
  avoidPhrases: string[];
  timeBuyingRule: string;
};
