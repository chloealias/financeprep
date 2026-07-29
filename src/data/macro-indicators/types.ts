export const MACRO_SNAPSHOT_REVIEW_INTERVAL_DAYS = 90;

export type MacroIndicator = {
  id: string;
  label: string;
  value: string;
  delta?: string;
  interviewNote?: string;
};

export type MacroSnapshot = {
  quarter: string;
  updatedAt: string;
  sources: string[];
  indicators: MacroIndicator[];
};
