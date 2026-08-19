import { describe, expect, it } from "vitest";
import { exercises } from "@/data/exercises";
import { EXERCISE_THEMES } from "@/data/exercise-types";

describe("exercises data", () => {
  it("has nine chapters in workbook order, with comps and precedent drills", () => {
    expect(EXERCISE_THEMES).toEqual([
      "comparable-companies",
      "precedent-transactions",
      "dcf",
      "leveraged-buyouts",
      "lbo-analysis",
      "sell-side-ma",
      "buy-side-ma",
      "ipos",
      "ipo-process",
    ]);
    expect(exercises).toHaveLength(217);
    expect(exercises.filter((e) => e.theme === "comparable-companies")).toHaveLength(33);
    expect(exercises.filter((e) => e.theme === "precedent-transactions")).toHaveLength(42);
    expect(exercises.filter((e) => e.theme === "dcf")).toHaveLength(54);
    expect(exercises.filter((e) => e.theme === "leveraged-buyouts")).toHaveLength(43);
    expect(exercises.filter((e) => e.theme === "lbo-analysis")).toHaveLength(45);
    const populated = new Set(["comparable-companies", "precedent-transactions", "dcf", "leveraged-buyouts", "lbo-analysis"]);
    for (const theme of EXERCISE_THEMES) {
      if (populated.has(theme)) continue;
      expect(exercises.filter((e) => e.theme === theme)).toHaveLength(0);
    }
  });

  it("has unique ids and at least one variant each", () => {
    const ids = new Set(exercises.map((e) => e.id));
    expect(ids.size).toBe(exercises.length);
    for (const ex of exercises) {
      expect(ex.variants.length).toBeGreaterThanOrEqual(1);
      expect(ex.title.length).toBeGreaterThan(0);
    }
  });
});
