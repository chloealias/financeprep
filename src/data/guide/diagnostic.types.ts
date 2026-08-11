export type DiagnosticTechnicalStatus = "mastered" | "review";

export type GuideDiagnosticChecklistItem = {
  id: string;
  text: string;
};

export type GuideDiagnosticTechnicalSection = {
  id: string;
  title: string;
  items: GuideDiagnosticChecklistItem[];
};

export type GuideDiagnosticStarItem = GuideDiagnosticChecklistItem & {
  /** Lien vers le module STAR existant */
  href: "/pyramid";
};

export type GuideDiagnosticTemplate = {
  id: string;
  title: string;
  body: string;
};

export type GuideDiagnosticContent = {
  technicalIntro: string;
  technicalSections: GuideDiagnosticTechnicalSection[];
  fitPresentation: GuideDiagnosticChecklistItem[];
  fitStar: GuideDiagnosticStarItem[];
  networkingWeeklyGoals: string[];
  networkingPrep: GuideDiagnosticChecklistItem[];
  networkingHook: string;
  networkingTemplates: GuideDiagnosticTemplate[];
  diagnosticNone: string;
  diagnosticReady: string;
  diagnosticPriority: string;
  diagnosticCoaching: string;
};
