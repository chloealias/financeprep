/**
 * Snapshot macro trimestriel — MAJ manuelle.
 *
 * Sources (vérif. au 05/07/2026) :
 * - BCE : taux directeurs (ecb.europa.eu, décision 11/06/2026)
 * - Fed : fourchette Fed funds (federalreserve.gov, FOMC 17/06/2026)
 * - CAC 40 : Euronext / Investing.com (clôture 03/07/2026)
 * - EUR/USD : taux spot (Investing.com, 03/07/2026)
 * - Spreads : FRED — BAMLHE00EHYIOAS (HY EU), BAMLC0A0CM (IG US, référence)
 * - Brent : spot ICE (Trading Economics / Convex, 03–05/07/2026)
 */
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

export const MACRO_SNAPSHOT: MacroSnapshot = {
  quarter: "Q3 2026",
  updatedAt: "2026-07-05",
  sources: ["BCE", "Fed", "Euronext", "FRED (ICE BofA)", "ICE Brent / Trading Economics"],
  indicators: [
    {
      id: "bce-deposit",
      label: "Taux BCE (dépôt / MRO)",
      value: "2,25 % / 2,40 %",
      delta: "+25 bp depuis juin 2025 (relevé 11/06/2026)",
      interviewNote:
        "Dernière hausse : +25 bp en juin 2026 (tensions Moyen-Orient / inflation). Fin du cycle de baisses entamé en 2024.",
    },
    {
      id: "fed-funds",
      label: "Fed funds (fourchette cible)",
      value: "3,50 % – 3,75 %",
      delta: "hold FOMC juin 2026",
      interviewNote:
        "Écart Fed–BCE resserré après la hausse BCE — dollar moins soutenu qu'en mai ; utile pour FX et exportateurs EU.",
    },
    {
      id: "cac40",
      label: "CAC 40 (niveau / perf. YTD)",
      value: "~8 460 pts · YTD ~+3 %",
      delta: "pic ~8 650 en fév. 2026",
      interviewNote:
        "Rebond en juin (+7,5 % au T2) après correction géopolitique de mai — citer le YTD, pas seulement le niveau du jour.",
    },
    {
      id: "eur-usd",
      label: "EUR / USD",
      value: "~1,14",
      delta: "fourchette 1,14–1,15 en juil. 2026",
      interviewNote:
        "Euro en retrait vs >1,16 début 2026 ; en entretien, lier import/export et valorisation des cibles US.",
    },
    {
      id: "spread-ig",
      label: "Spread crédit IG (ICE BofA US Corp., ref.)",
      value: "~75 bp",
      delta: "stable vs juin 2026",
      interviewNote:
        "Référence IG liquide (USD) ; ordre de grandeur pour Kd dette investment grade en LBO.",
    },
    {
      id: "spread-hy",
      label: "Spread crédit HY EU (ICE BofA)",
      value: "~265 bp",
      delta: "stable vs juin 2026",
      interviewNote:
        "HY EU autour de 2,6 % OAS — financement LBO plus sélectif si élargissement persistant.",
    },
    {
      id: "brent",
      label: "Pétrole Brent (spot)",
      value: "~72 $/bbl",
      delta: "−~35 % vs pic mai 2026 (~110 $)",
      interviewNote:
        "Correction post-tensions Moyen-Orient — impact inflation en baisse vs mai, mais secteur Énergie reste sensible aux chocs géopolitiques.",
    },
  ],
};
