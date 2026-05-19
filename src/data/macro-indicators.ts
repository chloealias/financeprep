/**
 * Snapshot macro trimestriel — MAJ manuelle.
 *
 * Sources (vérif. au 19/05/2026) :
 * - BCE : taux directeurs (ecb.europa.eu)
 * - Fed : fourchette Fed funds (federalreserve.gov, H.15)
 * - CAC 40 : Euronext / presse (clôture ~19/05/2026)
 * - EUR/USD : taux de réf. BCE / marché spot
 * - Spreads : FRED — BAMLHE00EHYIOAS (HY EU), BAMLC0A0CM (IG US, référence)
 * - Brent : spot ICE (ex. Fortune / Trading Economics, 18/05/2026)
 */
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
  quarter: "Q2 2026",
  updatedAt: "2026-05-19",
  sources: ["BCE", "Fed", "Euronext", "FRED (ICE BofA)", "Bloomberg / ICE Brent"],
  indicators: [
    {
      id: "bce-deposit",
      label: "Taux BCE (dépôt / MRO)",
      value: "2,00 % / 2,15 %",
      delta: "inchangé depuis juin 2025",
      interviewNote:
        "Dernière baisse : −25 bp en juin 2025. Cycle accommodant : soutien aux multiples si la croissance tient.",
    },
    {
      id: "fed-funds",
      label: "Fed funds (fourchette cible)",
      value: "3,50 % – 3,75 %",
      delta: "4e hold (réunion mai 2026)",
      interviewNote:
        "Écart Fed–BCE plus marqué qu'en 2024 — dollar soutenu vs euro ; utile pour FX et exportateurs EU.",
    },
    {
      id: "cac40",
      label: "CAC 40 (niveau / perf. YTD)",
      value: "~7 980 pts · YTD lég. négatif",
      delta: "pic ~8 650 en fév. 2026",
      interviewNote:
        "Volatilité géopolitique (Iran) et taux US longs en mai 2026 — citer le YTD, pas seulement le niveau du jour.",
    },
    {
      id: "eur-usd",
      label: "EUR / USD",
      value: "~1,17",
      delta: "fourchette 1,16–1,18 en mai 2026",
      interviewNote:
        "Euro plus fort qu'en mars 2026 (~1,15) ; en entretien, lier import/export et valorisation des cibles US.",
    },
    {
      id: "spread-ig",
      label: "Spread crédit IG (ICE BofA US Corp., ref.)",
      value: "~75 bp",
      delta: "stable vs avr. 2026",
      interviewNote:
        "Référence IG liquide (USD) ; ordre de grandeur pour Kd dette investment grade en LBO.",
    },
    {
      id: "spread-hy",
      label: "Spread crédit HY EU (ICE BofA)",
      value: "~265 bp",
      delta: "légère hausse vs avr. 2026",
      interviewNote:
        "HY EU autour de 2,6 % OAS — financement LBO plus sélectif si élargissement persistant.",
    },
    {
      id: "brent",
      label: "Pétrole Brent (spot)",
      value: "~110 $/bbl",
      delta: "+~40 $/bbl sur 12 mois",
      interviewNote:
        "Niveau élevé (tensions Moyen-Orient, détroit d'Ormuz) — impact inflation, transport, secteur Énergie et deals Oil & Gas.",
    },
  ],
};
