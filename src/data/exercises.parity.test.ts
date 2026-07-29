import { describe, expect, it } from "vitest";
import { exercisesEn, EXERCISE_CHEATSHEET as cheatEn } from "@/data/exercises/en";
import { exercisesFr, EXERCISE_CHEATSHEET as cheatFr } from "@/data/exercises/fr";

describe("exercises locale parity", () => {
  it("has the same ids in FR and EN", () => {
    expect(exercisesEn.map((e) => e.id)).toEqual(exercisesFr.map((e) => e.id));
  });

  it("has non-empty English text fields", () => {
    for (const e of exercisesEn) {
      expect(e.title.trim().length, `title ${e.id}`).toBeGreaterThan(0);
      expect(e.variants.length, `variants ${e.id}`).toBeGreaterThan(0);
      for (const [i, v] of e.variants.entries()) {
        expect(v.prompt.trim().length, `prompt ${e.id}.${i}`).toBeGreaterThan(0);
        expect(v.method.trim().length, `method ${e.id}.${i}`).toBeGreaterThan(0);
        if (v.kind === "choice") {
          expect(v.options.length).toBeGreaterThan(0);
          for (const opt of v.options) {
            expect(opt.trim().length).toBeGreaterThan(0);
          }
        } else {
          expect(v.answerLabel.trim().length, `answerLabel ${e.id}.${i}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("has the same cheatsheet length", () => {
    expect(cheatEn.length).toBe(cheatFr.length);
    for (const tip of cheatEn) {
      expect(tip.trim().length).toBeGreaterThan(0);
    }
  });
});
