import { describe, expect, it } from "vitest";
import { MA_DEALS_RAW as fr } from "@/data/ma-deals/fr";
import { MA_DEALS_RAW as en } from "@/data/ma-deals/en";
import { getMaDeals } from "@/data/ma-deals";

describe("ma-deals locale parity", () => {
  it("has the same ids in the same order", () => {
    expect(en.map((d) => d.id)).toEqual(fr.map((d) => d.id));
  });

  it("keeps type/kind/banks and non-empty English narrative", () => {
    for (let i = 0; i < fr.length; i++) {
      const a = fr[i]!;
      const b = en[i]!;
      expect(b.type, a.id).toBe(a.type);
      expect(b.kind, a.id).toBe(a.kind);
      expect(b.banks, a.id).toEqual(a.banks);
      expect(b.title.trim().length, a.id).toBeGreaterThan(0);
      expect(b.pointEntretien.trim().length, a.id).toBeGreaterThan(0);
      expect(b.parties.length, a.id).toBe(a.parties.length);
      expect(b.interests.length, a.id).toBe(a.interests.length);
      for (const p of b.parties) {
        expect(p.text.trim().length, a.id).toBeGreaterThan(0);
      }
    }
  });

  it("resolves the same sectorId in FR and EN", () => {
    const frDeals = getMaDeals("fr");
    const enDeals = getMaDeals("en");
    for (const d of frDeals) {
      const enDeal = enDeals.find((x) => x.id === d.id)!;
      expect(enDeal.sectorId, d.id).toBe(d.sectorId);
    }
  });
});
