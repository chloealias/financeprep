export type ExerciseTheme =
  | "leverage"
  | "accretion"
  | "paper-lbo"
  | "dcf"
  | "football-field"
  | "merger"
  | "working-capital";

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
  title: string;
  variants: ExerciseVariant[];
};

export const EXERCISE_THEMES: ExerciseTheme[] = [
  "leverage",
  "accretion",
  "paper-lbo",
  "dcf",
  "football-field",
  "merger",
  "working-capital",
];

/** @deprecated Prefer getExerciseThemeLabel(theme, t) for localized labels. */
export const EXERCISE_THEME_LABELS: Record<ExerciseTheme, string> = {
  leverage: "Leverage Math",
  accretion: "Accretion / Dilution",
  "paper-lbo": "Paper LBO",
  dcf: "DCF simplifié",
  "football-field": "Football Field",
  merger: "Merger Consequences",
  "working-capital": "Working Capital",
};

const THEME_I18N_KEYS: Record<ExerciseTheme, string> = {
  leverage: "hub.exercises.theme.leverage",
  accretion: "hub.exercises.theme.accretion",
  "paper-lbo": "hub.exercises.theme.paper-lbo",
  dcf: "hub.exercises.theme.dcf",
  "football-field": "hub.exercises.theme.football-field",
  merger: "hub.exercises.theme.merger",
  "working-capital": "hub.exercises.theme.working-capital",
};

/** Localized theme label via the app translator. */
export function getExerciseThemeLabel(
  theme: ExerciseTheme,
  translate: (key: string) => string,
): string {
  return translate(THEME_I18N_KEYS[theme]);
}
