import { describe, expect, it } from "vitest";
import { BANK_LIST as fr } from "@/data/bank-profiles/fr";
import { BANK_LIST as en } from "@/data/bank-profiles/en";

describe("bank-profiles locale parity", () => {
  it("has the same ids in the same order", () => {
    expect(en.map((b) => b.id)).toEqual(fr.map((b) => b.id));
  });

  it("keeps structural fields and non-empty English narrative", () => {
    for (let i = 0; i < fr.length; i++) {
      const a = fr[i]!;
      const b = en[i]!;
      expect(b.name, a.id).toBe(a.name);
      expect(b.categoryId, a.id).toBe(a.categoryId);
      expect(b.websiteUrl, a.id).toBe(a.websiteUrl);
      expect(b.emblematicDealId, a.id).toBe(a.emblematicDealId);
      expect(b.emblematicLinkType, a.id).toBe(a.emblematicLinkType);
      expect(b.particularites.length, a.id).toBe(a.particularites.length);
      expect(b.tagline.trim().length, a.id).toBeGreaterThan(0);
      expect(b.pointEntretien.trim().length, a.id).toBeGreaterThan(0);
      expect(b.questionPiège.trim().length, a.id).toBeGreaterThan(0);
      expect(b.reponsePiège.trim().length, a.id).toBeGreaterThan(0);
    }
  });
});
