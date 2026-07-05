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

/** Règles affichées dans le guide accrétion — source unique pour les tests de cohérence. */
export const INTERVIEW_ACCRETION_RULES = [
  {
    label: "Paiement 100% cash",
    texte:
      "Toujours accretif si le rendement des bénéfices de la cible (1/P/E cible) dépasse le coût après impôt de la dette.",
  },
  {
    label: "Échange d'actions pur",
    texte: "Accretif ssi P/E acquéreur > P/E cible. La règle la plus testée en entretien M&A.",
  },
  {
    label: "Mix cash + actions",
    texte:
      "Analyser la contribution marginale de chaque tranche. Le cash est moins dilutif que les actions si le coût de dette est bas.",
  },
  {
    label: "Goodwill & PPA",
    texte:
      "L'amortissement des intangibles (Purchase Price Allocation) pèse sur l'EPS comptable mais pas sur le cash. Préciser la différence GAAP vs cash EPS.",
  },
  {
    label: "Synergies",
    texte:
      'Un deal dilutif peut devenir accretif si les synergies sont suffisantes. Toujours demander : "accretif avec ou sans synergies ?"',
  },
] as const;

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
