import { describe, expect, it } from "vitest";
import { conceptsEn } from "@/data/concepts/en";
import { conceptsFr } from "@/data/concepts/fr";

describe("concepts locale parity", () => {
  it("has the same ids in FR and EN", () => {
    expect(conceptsEn.map((c) => c.id)).toEqual(conceptsFr.map((c) => c.id));
  });

  it("has non-empty English text fields", () => {
    for (const c of conceptsEn) {
      expect(c.title.trim().length, c.id).toBeGreaterThan(0);
      expect(c.simple.trim().length, c.id).toBeGreaterThan(0);
    }
  });
});
