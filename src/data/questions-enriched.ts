export type QuestionEnrichment = {
  answerJunior?: string;
  answerSenior?: string;
  commonMistakes?: string[];
  followUp?: string;
};

/** Enriched coaching content for pilot questions (by id). */
export const QUESTION_ENRICHMENTS: Record<number, QuestionEnrichment> = {
  1: {
    answerJunior:
      "Trois familles : intrinsèque (DCF), comparables (trading & deal comps), patrimoniale (ANR). On croise toujours plusieurs méthodes pour une fourchette.",
    answerSenior:
      "Je structure en football field : DCF (sensibilité WACC/g), trading comps (LTM/NTM, ajustements sectoriels), deal comps (primes contrôle/synergies), LBO floor si sponsor. J'explicite les ajustements EV→EqV et les limites (DCF = hypothèses, comps = comparabilité).",
    commonMistakes: [
      "Ne citer qu'une seule méthode",
      "Oublier le LBO comme borne inférieure en process compétitif",
      "Confondre Equity Value et Enterprise Value",
    ],
    followUp: "Sur quelle méthode vous appuyez-vous en priorité pour ce secteur, et pourquoi ?",
  },
  2: {
    answerJunior:
      "EV/EBITDA neutralise la structure financière et la fiscalité ; le P/E dépend du levier et des politiques comptables — moins comparable en M&A.",
    answerSenior:
      "EV/EBITDA est le standard deal car capital-structure neutral et proxy du cash opérationnel avant politique d'investissement. Je nuance : CAPEX-heavy → EV/EBIT ou EV/(EBITDA−CAPEX) ; services à faible D&A → P/E peut compléter. Je cite les limites EBITDA (ignore CAPEX, BFR).",
    commonMistakes: [
      "Dire que P/E est toujours mauvais",
      "Ignorer l'impact du levier sur le P/E",
      "Utiliser EBITDA pour une utility CAPEX-intensive sans nuance",
    ],
    followUp: "Quel multiple utiliseriez-vous pour une société très CAPEX-intensive ?",
  },
  3: {
    answerJunior: "Equity Value = EV − dette nette, avec ajustements minoritaires, retraites, associates.",
    answerSenior:
      "Pont complet : EV − net debt − NCI − unfunded pensions − leasing IFRS16 + equity method investments + non-core assets. Prix par action sur base fully diluted (treasury stock method).",
    commonMistakes: [
      "Oublier les minoritaires",
      "Confondre cash et dette nette (cash se soustrait)",
      "Oublier la dilution options/warrants",
    ],
    followUp: "Comment traitez-vous les stock-options dans le nombre d'actions diluées ?",
  },
  4: {
    answerJunior:
      "Projections FCFF → WACC → actualisation → valeur terminale → EV → pont equity → sensibilités.",
    answerSenior:
      "Je déroule FCFF (EBIT(1−t)+D&A−CAPEX−ΔBFR), WACC via CAPM, VT en Gordon ou exit multiple, puis sensibilités 2D car 60–80% de la valeur est souvent dans la VT. Je challenge g vs croissance nominale long terme.",
    commonMistakes: [
      "Oublier la valeur terminale dans l'actualisation",
      "WACC avec beta non re-leveré",
      "Croissance terminale > PIB long terme sans justification",
    ],
    followUp: "Quelle part de votre DCF vient de la valeur terminale sur ce modèle ?",
  },
  5: {
    answerJunior: "WACC = (E/V)×Ke + (D/V)×Kd×(1−t). Ke via CAPM.",
    answerSenior:
      "Coût equity CAPM (Rf, beta releveré, ERP), coût dette after-tax, pondération market values. J'ajuste beta sectoriel, country risk si EM, et discute optimal capital structure vs WACC marginal.",
    commonMistakes: [
      "Utiliser book values pour E et D",
      "Oublier (1−t) sur Kd",
      "Beta non re-leveré pour la société cible",
    ],
    followUp: "Comment estimez-vous le beta d'une société non cotée ?",
  },
  6: {
    answerJunior:
      "LBO : acquisition avec dette, remboursement via cash flows, TRI cible 20–25% pour le sponsor.",
    answerSenior:
      "Structure sources & uses, entry/exit multiples, deleveraging, management rollover, covenants. Sensibilité entry vs exit multiple et leverage. Moat du sponsor = operational improvement + multiple arbitrage.",
    commonMistakes: [
      "Ignorer le deleveraging dans le TRI",
      "Confondre IRR equity et IRR projet",
      "Oublier les fees et le management package",
    ],
    followUp: "Quel leverage maximal accepteriez-vous sur ce secteur ?",
  },
  7: {
    answerJunior: "Goodwill = prix payé − juste valeur des actifs nets identifiables acquis.",
    answerSenior:
      "Purchase price allocation : identification intangibles (marques, client), goodwill residual, tests impairment annuels IAS 36. Impact P&L si dépréciation (non cash mais signal).",
    commonMistakes: [
      "Confondre goodwill et goodwill comptable d'écarts de consolidation",
      "Oublier les intangibles identifiables",
    ],
    followUp: "Comment un impairment de goodwill affecte-t-il le DCF ?",
  },
  8: {
    answerJunior: "Accretion si EPS combiné > EPS acquéreur standalone ; dilution sinon.",
    answerSenior:
      "Mécanique : pro forma net income / shares. Drivers : prix payé, mix cash/actions, synergies, coût dette, amortissement PPA. Je quantifie break-even synergies.",
    commonMistakes: [
      "Oublier l'amortissement des intangibles PPA",
      "Comparer EPS sans ajuster le nombre d'actions émis",
    ],
    followUp: "Quel niveau de synergies pour rendre l'opération accretive ?",
  },
  9: {
    answerJunior: "Synergies revenus (cross-sell) et coûts (doublons) ; intégration = risque d'exécution.",
    answerSenior:
      "Je sépare cost vs revenue synergies, timing (run-rate 12–24m), one-off costs, et haircut revenue synergies (plus risquées). Due diligence qualifie le % réalisable.",
    commonMistakes: [
      "Sur-estimer les synergies revenus",
      "Oublier les coûts d'intégration one-off",
    ],
    followUp: "Comment provisionnez-vous les coûts d'intégration en modèle ?",
  },
  10: {
    answerJunior: "TS vérifie la qualité des chiffres (QoE), le BFR, la dette-like, les ajustements EBITDA.",
    answerSenior:
      "Bridge reported → adjusted EBITDA, normalisation BFR, net debt/debt-like (leases, litiges), QoE (one-offs, accounting policies), management meetings. Livrables : rapport TS + ajustements pour SPA.",
    commonMistakes: [
      "Confondre TS et audit légal",
      "Ignorer les debt-like items hors bilan",
    ],
    followUp: "Quel ajustement EBITDA avez-vous vu le plus impactant en deal ?",
  },
  11: {
    answerJunior: "Three statements liés : P&L → cash flow → bilan ; BFR et CAPEX clés.",
    answerSenior:
      "Je walk through circularité (intérêts/dette, cash, BS balance). Changes in NWC, D&A non cash, capex investing, financing flows. Lien vers FCFF et covenant headroom.",
    commonMistakes: [
      "Cash flow qui ne tie pas au bilan",
      "Oublier le BFR dans le cash opérationnel",
    ],
    followUp: "Si D&A augmente de 10M, impact sur les trois états ?",
  },
  12: {
    answerJunior: "D&A augmente → EBIT baisse → net income baisse ; cash flow add-back D&A.",
    answerSenior:
      "P&L : EBIT −10, NI −7 (35% tax). CFS : NI −7, +D&A +10 → CFO +3. BS : cash +3, PP&E −10 (capex net), equity −7. Classique question piège three statements.",
    commonMistakes: [
      "Oublier l'effet fiscal",
      "Penser que le cash baisse du montant D&A",
    ],
    followUp: "Et si c'est un amortissement d'intangibles PPA ?",
  },
  13: {
    answerJunior: "FCF = EBIT(1−t) + D&A − CAPEX − ΔBFR ; actualisé au WACC.",
    answerSenior:
      "Unlevered FCF to firm ; alternative FCFE avec coût equity. Mid-year vs end-year convention. Bridge UFCF ↔ levered cash si LBO.",
    commonMistakes: [
      "Double-count D&A",
      "Oublier ΔBFR",
    ],
    followUp: "FCFF vs FCFE : quand utiliser l'un ou l'autre ?",
  },
  14: {
    answerJunior: "Working capital = actifs court terme − passifs court terme opérationnels ; ΔBFR consomme du cash si hausse.",
    answerSenior:
      "DSO/DIO/DPO, seasonality, normalized NWC en TS. Cash impact : increase in NWC is use of cash. SPA mechanisms (locked box vs completion accounts).",
    commonMistakes: [
      "Inclure la dette financière dans le BFR",
      "Ignorer la saisonnalité en LTM",
    ],
    followUp: "Locked box vs completion accounts : trade-offs ?",
  },
  15: {
    answerJunior: "DCF sensible au WACC et à g ; trading comps au multiple marché ; LBO au leverage.",
    answerSenior:
      "Football field : chaque méthode a ses drivers. Je présente borne basse LBO, médiane comps, DCF central, strategic premium deal comps.",
    commonMistakes: [
      "Une seule hypothèse sans fourchette",
      "Multiples peak cycle sans normalisation",
    ],
    followUp: "Quelle méthode donne la borne la plus fiable ici ?",
  },
  16: {
    answerJunior: "TRI = taux qui annule la VAN des flux ; IRR equity en LBO.",
    answerSenior:
      "IRR vs MOIC, dividend recap, exit timing. Sensibilité entry multiple, leverage, EBITDA growth. Compare à hurdle rate du fonds.",
    commonMistakes: [
      "IRR sans vérifier la réinvestissement des flux intermédiaires",
      "Confondre MOIC et IRR",
    ],
    followUp: "MOIC 2.0x en 5 ans — quel IRR approximatif ?",
  },
  17: {
    answerJunior: "Beta mesure sensibilité au marché ; re-lever selon structure cible.",
    answerSenior:
      "Hamada : βL = βU × (1 + (1−t)×D/E). Beta sectoriel via comps, size premium si small cap. Rf et ERP cohérents avec devise.",
    commonMistakes: [
      "Utiliser beta levered sans de-lever",
      "ERP incohérent avec le marché géographique",
    ],
    followUp: "Comment obtenez-vous un beta pour une cible privée ?",
  },
  18: {
    answerJunior: "Purchase price allocation : actifs identifiables à fair value, goodwill résiduel.",
    answerSenior:
      "IFRS 3 : intangibles (technology, customer relationships), deferred tax on step-up, impact futur P&L (amort PPA → EPS dilution).",
    commonMistakes: [
      "Tout mettre en goodwill",
      "Oublier l'impact fiscal des step-ups",
    ],
    followUp: "Impact d'un PPA agressif sur l'accretion/dilution ?",
  },
  19: {
    answerJunior: "Earn-out aligne vendeur/acheteur si incertitude sur la performance future.",
    answerSenior:
      "Structuration : metrics (EBITDA, revenue), cap/collar, accounting disputes, classification cash vs equity sous IFRS. Valorisation via scénarios.",
    commonMistakes: [
      "Métriques non auditables",
      "Oublier le risque de litige post-closing",
    ],
    followUp: "Comment valoriser un earn-out dans le prix ?",
  },
  20: {
    answerJunior: "Walk me through a deal : contexte, rationale stratégique, valorisation, financing, risques.",
    answerSenior:
      "Structure STAR : situation (secteur), task (mandat), action (process, multiples, synergies), result (outcome, ce que j'ai appris). Chiffrer EV/EBITDA, premium, league tables si pertinent.",
    commonMistakes: [
      "Rester vague sans chiffres",
      "Ne pas expliquer le rationale stratégique",
      "Oublier son rôle personnel",
    ],
    followUp: "Qu'est-ce qui pourrait faire échouer ce deal aujourd'hui ?",
  },
};

export function getQuestionEnrichment(id: string | number): QuestionEnrichment | undefined {
  const n = typeof id === "number" ? id : Number(id);
  return Number.isFinite(n) ? QUESTION_ENRICHMENTS[n] : undefined;
}
