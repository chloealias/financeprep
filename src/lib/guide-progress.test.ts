import { describe, expect, it } from "vitest";
import { guideDiagnosticFr } from "@/data/guide/diagnostic.fr";
import {
  getBlocCompletionRates,
  getDiagnosticFitStarIds,
  getWeakestDiagnosticBloc,
  sortGuideModulesByUrgency,
  type GuideModuleSortable,
} from "@/lib/guide-progress";
import type { DiagnosticState } from "@/lib/storage";

const FIT_IDS = [
  ...guideDiagnosticFr.fitPresentation.map((item) => item.id),
  ...guideDiagnosticFr.fitStar.map((item) => item.id),
];
const STAR_IDS = getDiagnosticFitStarIds(guideDiagnosticFr);
const NET_IDS = guideDiagnosticFr.networkingPrep.map((item) => item.id);

describe("getBlocCompletionRates", () => {
  it("returns zero rates for empty state", () => {
    const rates = getBlocCompletionRates(
      { technical: {}, fit: {}, networking: {} },
      guideDiagnosticFr,
    );
    expect(rates).toEqual({ technical: 0, fit: 0, networking: 0 });
  });

  it("computes rates from partial progress", () => {
    const state: DiagnosticState = {
      technical: { "tech-dcf": "mastered", "tech-lbo": "review" },
      fit: { [FIT_IDS[0]!]: true },
      networking: { [NET_IDS[0]!]: true },
    };
    const rates = getBlocCompletionRates(state, guideDiagnosticFr);
    expect(rates.technical).toBeCloseTo(1 / 17);
    expect(rates.fit).toBeCloseTo(1 / 11);
    expect(rates.networking).toBe(0.5);
  });
});

describe("getWeakestDiagnosticBloc", () => {
  it("picks the lowest completion rate", () => {
    expect(
      getWeakestDiagnosticBloc({ technical: 0.2, fit: 0.5, networking: 0.8 }),
    ).toBe("technical");
    expect(
      getWeakestDiagnosticBloc({ technical: 0.5, fit: 0.1, networking: 0.8 }),
    ).toBe("fit");
  });

  it("breaks ties with technical > fit > networking priority", () => {
    expect(getWeakestDiagnosticBloc({ technical: 0, fit: 0, networking: 0 })).toBe("technical");
    expect(getWeakestDiagnosticBloc({ technical: 0.5, fit: 0.5, networking: 0.5 })).toBe(
      "technical",
    );
    expect(getWeakestDiagnosticBloc({ technical: 0.6, fit: 0.4, networking: 0.4 })).toBe("fit");
  });
});

describe("sortGuideModulesByUrgency", () => {
  const modules: (GuideModuleSortable & { id: string })[] = [
    { id: "actualite", progressKey: null, defaultOrder: 0 },
    { id: "cv", progressKey: "cv", defaultOrder: 1 },
    { id: "pyramid", progressKey: "pyramid", defaultOrder: 2 },
    { id: "flashcards", progressKey: "flashcards", defaultOrder: 0 },
    { id: "diagnostic", progressKey: "diagnostic", defaultOrder: 1 },
  ];

  it("sorts modules with progress before those without", () => {
    const sorted = sortGuideModulesByUrgency(modules);
    const ids = sorted.map((m) => m.id);
    expect(ids.indexOf("cv")).toBeLessThan(ids.indexOf("actualite"));
    expect(ids.indexOf("pyramid")).toBeLessThan(ids.indexOf("actualite"));
  });
});

describe("getDiagnosticFitStarIds", () => {
  it("returns five STAR item ids", () => {
    expect(STAR_IDS).toHaveLength(5);
  });
});
