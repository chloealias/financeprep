import { describe, expect, it } from "vitest";
import { MACRO_SNAPSHOT } from "@/data/macro-indicators";

describe("macro-indicators", () => {
  it("has at least 6 indicators", () => {
    expect(MACRO_SNAPSHOT.indicators.length).toBeGreaterThanOrEqual(6);
  });

  it("has unique indicator ids", () => {
    const ids = MACRO_SNAPSHOT.indicators.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has parseable updatedAt (YYYY-MM-DD)", () => {
    expect(Number.isNaN(Date.parse(MACRO_SNAPSHOT.updatedAt))).toBe(false);
  });

  it("each indicator has label and value", () => {
    for (const ind of MACRO_SNAPSHOT.indicators) {
      expect(ind.label.length).toBeGreaterThan(0);
      expect(ind.value.length).toBeGreaterThan(0);
    }
  });
});
