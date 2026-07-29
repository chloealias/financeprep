export type QuestionDifficulty = "basique" | "intermédiaire" | "avancé";

export type Question = {
  id: number;
  category: string;
  difficulty: QuestionDifficulty | string;
  question: string;
  explanation: string;
  steps: string[];
  tip: string;
  visual?: string;
  interviewSlot?: "fit" | "technical" | "brainteaser";
};
