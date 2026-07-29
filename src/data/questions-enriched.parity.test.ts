import { describe, expect, it } from "vitest";
import { QUESTION_ENRICHMENTS as fr } from "@/data/questions-enriched/fr";
import { QUESTION_ENRICHMENTS as en } from "@/data/questions-enriched/en";

describe("questions-enriched locale parity", () => {
  it("has the same ids in FR and EN", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(fr).sort());
  });

  it("has non-empty English text fields", () => {
    for (const [id, e] of Object.entries(en)) {
      if (e.answerJunior) expect(e.answerJunior.trim().length, `junior ${id}`).toBeGreaterThan(0);
      if (e.answerSenior) expect(e.answerSenior.trim().length, `senior ${id}`).toBeGreaterThan(0);
      if (e.followUp) expect(e.followUp.trim().length, `followUp ${id}`).toBeGreaterThan(0);
      if (e.commonMistakes) {
        expect(e.commonMistakes.length, `mistakes ${id}`).toBe(fr[Number(id)]!.commonMistakes!.length);
        for (const m of e.commonMistakes) expect(m.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
