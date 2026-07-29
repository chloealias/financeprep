export type GuideCvChecklistItem = {
  id: string;
  text: string;
};

export type GuideCvAct = {
  num: string;
  titre: string;
  duree: string;
  desc: string;
  dark: boolean;
};

export type GuideCvDealStep = {
  num: string;
  label: string;
  desc: string;
};

export type GuideCvContent = {
  checklist: GuideCvChecklistItem[];
  acts: GuideCvAct[];
  dealSteps: GuideCvDealStep[];
  pitfalls: string[];
};
