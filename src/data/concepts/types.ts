export type ConceptExample = {
  label: string;
  body: string;
};

export type Concept = {
  id: string;
  category: string;
  title: string;
  simple: string;
  intuition?: string;
  steps?: string[];
  example?: ConceptExample;
  formula?: string;
  interview?: string;
  /** Fallback for sheets not yet migrated to structured blocks */
  deepDive?: string;
  table?: { headers: string[]; rows: string[][] };
  visual?: string;
  pitfalls?: string[];
};
