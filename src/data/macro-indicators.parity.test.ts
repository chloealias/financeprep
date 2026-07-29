import { describe, expect, it } from "vitest";
import { MACRO_SNAPSHOT as fr } from "@/data/macro-indicators/fr";
import { MACRO_SNAPSHOT as en } from "@/data/macro-indicators/en";

describe("macro-indicators locale parity", () => {
  it("has the same indicator ids", () => {
    expect(en.indicators.map((i) => i.id)).toEqual(fr.indicators.map((i) => i.id));
  });

  it("has non-empty English labels and notes", () => {
    for (const ind of en.indicators) {
      expect(ind.label.trim().length, ind.id).toBeGreaterThan(0);
      expect(ind.value.trim().length, ind.id).toBeGreaterThan(0);
      if (ind.interviewNote) expect(ind.interviewNote.trim().length, ind.id).toBeGreaterThan(0);
    }
  });
});
