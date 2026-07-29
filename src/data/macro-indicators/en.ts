import type { MacroSnapshot } from "./types";

/**
 * Quarterly macro snapshot — manual update.
 *
 * Sources (checked 05/07/2026):
 * - ECB: policy rates (ecb.europa.eu, decision 11/06/2026)
 * - Fed: Fed funds target range (federalreserve.gov, FOMC 17/06/2026)
 * - CAC 40: Euronext / Investing.com (close 03/07/2026)
 * - EUR/USD: spot (Investing.com, 03/07/2026)
 * - Spreads: FRED — BAMLHE00EHYIOAS (HY EU), BAMLC0A0CM (IG US, reference)
 * - Brent: ICE spot (Trading Economics / Convex, 03–05/07/2026)
 */
export const MACRO_SNAPSHOT: MacroSnapshot = {
  quarter: "Q3 2026",
  updatedAt: "2026-07-05",
  sources: ["ECB", "Fed", "Euronext", "FRED (ICE BofA)", "ICE Brent / Trading Economics"],
  indicators: [
    {
      id: "bce-deposit",
      label: "ECB rate (deposit / MRO)",
      value: "2.25% / 2.40%",
      delta: "+25 bp since June 2025 (hike 11/06/2026)",
      interviewNote:
        "Latest hike: +25 bp in June 2026 (Middle East tensions / inflation). End of the easing cycle that began in 2024.",
    },
    {
      id: "fed-funds",
      label: "Fed funds (target range)",
      value: "3.50% – 3.75%",
      delta: "hold FOMC June 2026",
      interviewNote:
        "Fed–ECB gap narrowed after the ECB hike — dollar less supported than in May; useful for FX and EU exporters.",
    },
    {
      id: "cac40",
      label: "CAC 40 (level / YTD performance)",
      value: "~8,460 pts · YTD ~+3%",
      delta: "peak ~8,650 in Feb 2026",
      interviewNote:
        "June rebound (+7.5% in Q2) after the May geopolitical correction — cite YTD, not only the spot level.",
    },
    {
      id: "eur-usd",
      label: "EUR / USD",
      value: "~1.14",
      delta: "range 1.14–1.15 in Jul 2026",
      interviewNote:
        "Euro softer vs >1.16 early 2026; in interview, link import/export and valuation of US targets.",
    },
    {
      id: "spread-ig",
      label: "IG credit spread (ICE BofA US Corp., ref.)",
      value: "~75 bp",
      delta: "stable vs June 2026",
      interviewNote:
        "Liquid IG reference (USD); order of magnitude for IG debt Kd in an LBO.",
    },
    {
      id: "spread-hy",
      label: "HY EU credit spread (ICE BofA)",
      value: "~265 bp",
      delta: "stable vs June 2026",
      interviewNote:
        "HY EU around 2.6% OAS — LBO financing more selective if widening persists.",
    },
    {
      id: "brent",
      label: "Brent crude (spot)",
      value: "~$72/bbl",
      delta: "−~35% vs May 2026 peak (~$110)",
      interviewNote:
        "Post–Middle East correction — lower inflation pressure vs May, but Energy remains sensitive to geopolitical shocks.",
    },
  ],
};
