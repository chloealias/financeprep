import { describe, expect, it } from "vitest";
import { exercises } from "@/data/exercises";
import { EXERCISE_THEMES } from "@/data/exercise-types";

describe("exercises data", () => {
  it("has 70 exercises across 7 themes", () => {
    expect(exercises).toHaveLength(70);
    for (const theme of EXERCISE_THEMES) {
      expect(exercises.filter((e) => e.theme === theme)).toHaveLength(10);
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
