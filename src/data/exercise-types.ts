export type ExerciseTheme =
  | "comparable-companies"
  | "precedent-transactions"
  | "dcf"
  | "leveraged-buyouts"
  | "lbo-analysis"
  | "sell-side-ma"
  | "buy-side-ma"
  | "ipos"
  | "ipo-process";

export type NumericUnit = "number" | "percent" | "percent_or_decimal" | "multiple";

export type NumericCheck =
  | { mode: "exact"; accept: number[]; unit?: NumericUnit }
  | { mode: "tolerance"; value: number; pct: number; unit?: NumericUnit };

export type NumericVariant = {
  kind: "numeric";
  prompt: string;
  unitHint?: string;
  check: NumericCheck;
  method: string;
  answerLabel: string;
};

export type ChoiceVariant = {
  kind: "choice";
  prompt: string;
  options: string[];
  correctIndex: number;
  method: string;
};

export type OpenVariant = {
  kind: "open";
  prompt: string;
  method: string;
  answerLabel: string;
};

export type ExerciseVariant = NumericVariant | ChoiceVariant | OpenVariant;

export type Exercise = {
  id: string;
  theme: ExerciseTheme;
  section?: string;
  title: string;
  variants: ExerciseVariant[];
};

export const EXERCISE_THEMES: ExerciseTheme[] = [
  "comparable-companies",
  "precedent-transactions",
  "dcf",
  "leveraged-buyouts",
  "lbo-analysis",
  "sell-side-ma",
  "buy-side-ma",
  "ipos",
  "ipo-process",
];

/** @deprecated Prefer getExerciseThemeLabel(theme, t) for localized labels. */
export const EXERCISE_THEME_LABELS: Record<ExerciseTheme, string> = {
  "comparable-companies": "Comparable Companies Analysis",
  "precedent-transactions": "Precedent Transactions Analysis",
  dcf: "Discounted Cash Flow Analysis",
  "leveraged-buyouts": "Leveraged Buyouts",
  "lbo-analysis": "LBO Analysis",
  "sell-side-ma": "Sell-Side M&A",
  "buy-side-ma": "Buy-Side M&A",
  ipos: "Initial Public Offerings",
  "ipo-process": "The IPO Process",
};

const THEME_I18N_KEYS: Record<ExerciseTheme, string> = {
  "comparable-companies": "hub.exercises.theme.comparable-companies",
  "precedent-transactions": "hub.exercises.theme.precedent-transactions",
  dcf: "hub.exercises.theme.dcf",
  "leveraged-buyouts": "hub.exercises.theme.leveraged-buyouts",
  "lbo-analysis": "hub.exercises.theme.lbo-analysis",
  "sell-side-ma": "hub.exercises.theme.sell-side-ma",
  "buy-side-ma": "hub.exercises.theme.buy-side-ma",
  ipos: "hub.exercises.theme.ipos",
  "ipo-process": "hub.exercises.theme.ipo-process",
};

/** Localized theme label via the app translator. */
export function getExerciseThemeLabel(
  theme: ExerciseTheme,
  translate: (key: string) => string,
): string {
  return translate(THEME_I18N_KEYS[theme]);
}
