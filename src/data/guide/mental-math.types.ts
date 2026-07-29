export type GuideMentalMathDrill = {
  prompt: string;
  method: string;
  answer: string;
};

export type GuideMentalMathPctTip = {
  pct: string;
  tip: string;
};

export type GuideMentalMathContent = {
  intro: string;
  trachtenbergBody: string;
  trachtenbergExample: string;
  times12Title: string;
  times12Body: string;
  pctTips: GuideMentalMathPctTip[];
  drills: GuideMentalMathDrill[];
  flashcardsSuffix: string;
};
