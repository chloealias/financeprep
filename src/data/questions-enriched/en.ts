import type { QuestionEnrichment } from "./types";

/** Enriched coaching content for pilot questions (by id). */
export const QUESTION_ENRICHMENTS: Record<number, QuestionEnrichment> = {
  1: {
    answerJunior:
      "Three families: intrinsic (DCF), market comps (trading & deal comps), and asset-based (NAV). Always cross-check several methods for a valuation range.",
    answerSenior:
      "I frame it as a football field: DCF (WACC/g sensitivity), trading comps (LTM/NTM, sector adjustments), deal comps (control premium / synergies), and an LBO floor if a sponsor is in the process. I spell out EV→EqV bridges and the limits (DCF = assumptions, comps = comparability).",
    commonMistakes: [
      "Citing only one method",
      "Forgetting LBO as a lower bound in a competitive process",
      "Confusing Equity Value and Enterprise Value",
    ],
    followUp: "Which method would you lean on first for this sector, and why?",
  },
  2: {
    answerJunior:
      "EV/EBITDA is capital-structure and tax neutral; P/E depends on leverage and accounting policies — less comparable in M&A.",
    answerSenior:
      "EV/EBITDA is the deal standard because it is capital-structure neutral and a proxy for operating cash before investment policy. I nuance: CAPEX-heavy → EV/EBIT or EV/(EBITDA−CAPEX); low-D&A services → P/E can complement. I flag EBITDA limits (ignores CAPEX, NWC).",
    commonMistakes: [
      "Saying P/E is always bad",
      "Ignoring leverage impact on P/E",
      "Using EBITDA for a CAPEX-intensive utility without nuance",
    ],
    followUp: "Which multiple would you use for a highly CAPEX-intensive company?",
  },
  3: {
    answerJunior: "Equity Value = EV − net debt, with adjustments for minorities, pensions, associates.",
    answerSenior:
      "Full bridge: EV − net debt − NCI − unfunded pensions − IFRS 16 leases + equity-method investments + non-core assets. Per-share price on a fully diluted basis (treasury stock method).",
    commonMistakes: [
      "Forgetting minorities",
      "Confusing cash and net debt (cash is subtracted)",
      "Ignoring options/warrants dilution",
    ],
    followUp: "How do you treat stock options in the diluted share count?",
  },
  4: {
    answerJunior:
      "FCFF projections → WACC → discount → terminal value → EV → equity bridge → sensitivities.",
    answerSenior:
      "I walk FCFF (EBIT(1−t)+D&A−CAPEX−ΔNWC), WACC via CAPM, TV via Gordon or exit multiple, then 2D sensitivities because 60–80% of value often sits in TV. I challenge g vs long-term nominal GDP growth.",
    commonMistakes: [
      "Forgetting terminal value in the discounting",
      "WACC with a beta that was not re-levered",
      "Terminal growth above long-term GDP without justification",
    ],
    followUp: "What share of your DCF comes from terminal value in this model?",
  },
  5: {
    answerJunior: "WACC = (E/V)×Ke + (D/V)×Kd×(1−t). Ke via CAPM.",
    answerSenior:
      "Equity cost via CAPM (Rf, re-levered beta, ERP), after-tax cost of debt, market-value weights. I adjust sector beta, country risk if EM, and discuss optimal capital structure vs marginal WACC.",
    commonMistakes: [
      "Using book values for E and D",
      "Forgetting (1−t) on Kd",
      "Beta not re-levered for the target capital structure",
    ],
    followUp: "How do you estimate beta for a private company?",
  },
  6: {
    answerJunior:
      "LBO: debt-financed acquisition, repayment via cash flows, sponsor equity IRR target typically 20–25%.",
    answerSenior:
      "Sources & uses, entry/exit multiples, deleveraging, management rollover, covenants. Sensitivity on entry vs exit multiple and leverage. Sponsor edge = operational improvement + multiple arbitrage.",
    commonMistakes: [
      "Ignoring deleveraging in the IRR",
      "Confusing equity IRR and project IRR",
      "Forgetting fees and the management package",
    ],
    followUp: "What maximum leverage would you accept in this sector?",
  },
  7: {
    answerJunior: "Goodwill = purchase price − fair value of identifiable net assets acquired.",
    answerSenior:
      "Purchase price allocation: identify intangibles (brands, customer), residual goodwill, annual IAS 36 impairment tests. P&L impact if impaired (non-cash but a signal).",
    commonMistakes: [
      "Confusing deal goodwill with consolidation accounting quirks",
      "Forgetting identifiable intangibles",
    ],
    followUp: "How does a goodwill impairment affect the DCF?",
  },
  8: {
    answerJunior: "Accretion if combined EPS > acquirer standalone EPS; dilution otherwise.",
    answerSenior:
      "Mechanics: pro forma net income / shares. Drivers: price paid, cash/stock mix, synergies, debt cost, PPA amortization. I quantify break-even synergies.",
    commonMistakes: [
      "Forgetting PPA intangible amortization",
      "Comparing EPS without adjusting for newly issued shares",
    ],
    followUp: "What synergy level makes the deal accretive?",
  },
  9: {
    answerJunior: "Revenue synergies (cross-sell) and cost synergies (overlaps); integration = execution risk.",
    answerSenior:
      "I separate cost vs revenue synergies, timing (run-rate 12–24m), one-off costs, and haircut revenue synergies (riskier). Diligence qualifies the % achievable.",
    commonMistakes: [
      "Overestimating revenue synergies",
      "Forgetting one-off integration costs",
    ],
    followUp: "How do you provision integration costs in the model?",
  },
  10: {
    answerJunior: "TS checks quality of earnings (QoE), NWC, debt-like items, and EBITDA adjustments.",
    answerSenior:
      "Bridge reported → adjusted EBITDA, NWC normalisation, net debt/debt-like (leases, litigation), QoE (one-offs, accounting policies), management meetings. Deliverables: TS report + SPA adjustments.",
    commonMistakes: [
      "Confusing TS with a statutory audit",
      "Ignoring off-balance-sheet debt-like items",
    ],
    followUp: "Which EBITDA adjustment have you seen as most impactful in a deal?",
  },
  11: {
    answerJunior: "Three statements linked: P&L → cash flow → balance sheet; NWC and CAPEX are key.",
    answerSenior:
      "I walk circularity (interest/debt, cash, BS balance). Changes in NWC, non-cash D&A, investing CAPEX, financing flows. Link to FCFF and covenant headroom.",
    commonMistakes: [
      "Cash flow that does not tie to the balance sheet",
      "Forgetting NWC in operating cash",
    ],
    followUp: "If D&A rises by 10M, what is the impact on the three statements?",
  },
  12: {
    answerJunior: "D&A up → EBIT down → net income down; cash flow adds back D&A.",
    answerSenior:
      "P&L: EBIT −10, NI −7 (35% tax). CFS: NI −7, +D&A +10 → CFO +3. BS: cash +3, PP&E −10 (net of CAPEX), equity −7. Classic three-statements trap question.",
    commonMistakes: [
      "Forgetting the tax effect",
      "Thinking cash falls by the D&A amount",
    ],
    followUp: "And if it is PPA intangible amortization?",
  },
  13: {
    answerJunior: "FCF = EBIT(1−t) + D&A − CAPEX − ΔNWC; discounted at WACC.",
    answerSenior:
      "Unlevered FCF to firm; alternative FCFE with cost of equity. Mid-year vs end-year convention. Bridge UFCF ↔ levered cash if LBO.",
    commonMistakes: [
      "Double-counting D&A",
      "Forgetting ΔNWC",
    ],
    followUp: "FCFF vs FCFE: when do you use each?",
  },
  14: {
    answerJunior:
      "Working capital = current operating assets − current operating liabilities; rising NWC consumes cash.",
    answerSenior:
      "DSO/DIO/DPO, seasonality, normalized NWC in TS. Cash impact: increase in NWC is a use of cash. SPA mechanisms (locked box vs completion accounts).",
    commonMistakes: [
      "Including financial debt in working capital",
      "Ignoring seasonality in LTM",
    ],
    followUp: "Locked box vs completion accounts: trade-offs?",
  },
  15: {
    answerJunior: "DCF sensitive to WACC and g; trading comps to market multiples; LBO to leverage.",
    answerSenior:
      "Football field: each method has its drivers. I present LBO floor, comps median, central DCF, strategic premium from deal comps.",
    commonMistakes: [
      "A single assumption with no range",
      "Peak-cycle multiples without normalisation",
    ],
    followUp: "Which method gives the most reliable bound here?",
  },
  16: {
    answerJunior: "IRR = rate that zeros NPV of cash flows; equity IRR in an LBO.",
    answerSenior:
      "IRR vs MOIC, dividend recap, exit timing. Sensitivity on entry multiple, leverage, EBITDA growth. Compare to the fund hurdle rate.",
    commonMistakes: [
      "IRR without checking reinvestment of intermediate cash flows",
      "Confusing MOIC and IRR",
    ],
    followUp: "MOIC 2.0x in 5 years — approximate IRR?",
  },
  17: {
    answerJunior: "Beta measures market sensitivity; re-lever to target structure.",
    answerSenior:
      "Hamada: βL = βU × (1 + (1−t)×D/E). Sector beta via comps, size premium if small cap. Rf and ERP consistent with currency.",
    commonMistakes: [
      "Using levered beta without de-levering",
      "ERP inconsistent with the geographic market",
    ],
    followUp: "How do you get a beta for a private target?",
  },
  18: {
    answerJunior: "Purchase price allocation: identifiable assets at fair value, residual goodwill.",
    answerSenior:
      "IFRS 3: intangibles (technology, customer relationships), deferred tax on step-up, future P&L impact (PPA amort → EPS dilution).",
    commonMistakes: [
      "Putting everything in goodwill",
      "Forgetting the tax impact of step-ups",
    ],
    followUp: "Impact of an aggressive PPA on accretion/dilution?",
  },
  19: {
    answerJunior: "Earn-out aligns seller/buyer when future performance is uncertain.",
    answerSenior:
      "Structuring: metrics (EBITDA, revenue), cap/collar, accounting disputes, cash vs equity classification under IFRS. Valuation via scenarios.",
    commonMistakes: [
      "Non-auditable metrics",
      "Ignoring post-closing litigation risk",
    ],
    followUp: "How do you value an earn-out in the purchase price?",
  },
  20: {
    answerJunior: "Walk me through a deal: context, strategic rationale, valuation, financing, risks.",
    answerSenior:
      "STAR structure: situation (sector), task (mandate), action (process, multiples, synergies), result (outcome, what I learned). Quantify EV/EBITDA, premium, league tables if relevant.",
    commonMistakes: [
      "Staying vague without numbers",
      "Not explaining the strategic rationale",
      "Forgetting your personal role",
    ],
    followUp: "What could make this deal fail today?",
  },
};
