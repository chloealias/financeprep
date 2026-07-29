import type { TranslateFn } from "@/lib/i18n/t";

export type AccretionVerdict = "accretif" | "dilutif" | "neutre";

/** Deal 100 % actions : relutif ssi P/E acquéreur > P/E cible. */
export function stockDealVerdict(peAcquirer: number, peTarget: number): AccretionVerdict {
  if (peAcquirer > peTarget) return "accretif";
  if (peAcquirer < peTarget) return "dilutif";
  return "neutre";
}

/** Deal cash : relutif ssi earnings yield cible > coût dette après impôt. */
export function isCashDealAccretive(peTarget: number, kdAfterTax: number): boolean {
  return 1 / peTarget > kdAfterTax;
}

export const STOCK_DEAL_RULE = {
  accretiveWhen: "P/E acquéreur > P/E cible",
  dilutiveWhen: "P/E acquéreur < P/E cible",
} as const;

export const CASH_DEAL_RULE = {
  accretiveWhen: "earnings yield cible (1/P/E) > coût dette après impôt",
} as const;

/**
 * Règles affichées dans le guide accrétion — source unique pour les tests de cohérence.
 * `label` reste la clé canonique FR utilisée par les tests ; `labelKey` sert à l'affichage.
 * Les `texte` pédagogiques FR restent ici ; l'UI localisée lit `getGuideAccretion(locale)`.
 */
export const INTERVIEW_ACCRETION_RULES = [
  {
    label: "Paiement 100% cash",
    labelKey: "guide.accretion.rule.cash",
    texte:
      "Toujours accretif si le rendement des bénéfices de la cible (1/P/E cible) dépasse le coût après impôt de la dette.",
  },
  {
    label: "Échange d'actions pur",
    labelKey: "guide.accretion.rule.stock",
    texte: "Accretif ssi P/E acquéreur > P/E cible. La règle la plus testée en entretien M&A.",
  },
  {
    label: "Mix cash + actions",
    labelKey: "guide.accretion.rule.mix",
    texte:
      "Analyser la contribution marginale de chaque tranche. Le cash est moins dilutif que les actions si le coût de dette est bas.",
  },
  {
    label: "Goodwill & PPA",
    labelKey: "guide.accretion.rule.goodwill",
    texte:
      "L'amortissement des intangibles (Purchase Price Allocation) pèse sur l'EPS comptable mais pas sur le cash. Préciser la différence GAAP vs cash EPS.",
  },
  {
    label: "Synergies",
    labelKey: "guide.accretion.rule.synergies",
    texte:
      'Un deal dilutif peut devenir accretif si les synergies sont suffisantes. Toujours demander : "accretif avec ou sans synergies ?"',
  },
] as const;

export type InterviewAccretionRule = (typeof INTERVIEW_ACCRETION_RULES)[number];

export function getAccretionRuleLabel(
  rule: InterviewAccretionRule,
  translate: TranslateFn,
): string {
  return translate(rule.labelKey);
}

export function getAccretionVerdictLabel(
  verdict: AccretionVerdict,
  translate: TranslateFn,
): string {
  return translate(`guide.accretion.verdict.${verdict}`);
}

/** Questions dont le contenu doit respecter les règles canoniques. */
export const ACCRETION_RULE_QUESTION_IDS = [10, 37, 84, 85, 110] as const;

/** Formulations inversées connues — ne doivent jamais réapparaître. */
export const INVERTED_ACCRETION_PATTERNS: readonly RegExp[] = [
  /Cash\s*=\s*dilut/i,
  /Actions\s*=\s*dilut.*P\/E.*acquéreur\s*>\s*P\/E/i,
  /dilut.*si\s+Pe\s+acquéreur\s*>\s*Pe\s+cible/i,
  /yield.*EBITDA.*cible/i,
];

export function findInvertedAccretionRules(text: string): string[] {
  return INVERTED_ACCRETION_PATTERNS.filter((pattern) => pattern.test(text)).map(
    (pattern) => pattern.source,
  );
}
