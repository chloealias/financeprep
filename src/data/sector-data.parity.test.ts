import { describe, expect, it } from "vitest";
import { SECTOR_DATA as fr } from "@/data/sector-data/fr";
import { SECTOR_DATA as en } from "@/data/sector-data/en";
import type { SectorId } from "@/lib/sectors";

describe("sector-data locale parity", () => {
  const ids = Object.keys(fr) as SectorId[];

  it("has the same sector ids", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(fr).sort());
  });

  it("keeps emblematicDealIds and array lengths", () => {
    for (const id of ids) {
      expect(en[id].emblematicDealId, id).toBe(fr[id].emblematicDealId);
      expect(en[id].kpis.length, id).toBe(fr[id].kpis.length);
      expect(en[id].tendances.length, id).toBe(fr[id].tendances.length);
      expect(en[id].multiples.length, id).toBe(fr[id].multiples.length);
      expect(en[id].panorama.acteursMajeurs.length, id).toBe(fr[id].panorama.acteursMajeurs.length);
      expect(en[id].panorama.segmentsCles.length, id).toBe(fr[id].panorama.segmentsCles.length);
    }
  });

  it("has non-empty English text fields", () => {
    for (const id of ids) {
      const s = en[id];
      expect(s.name.trim().length, id).toBeGreaterThan(0);
      expect(s.question.trim().length, id).toBeGreaterThan(0);
      expect(s.reponse.trim().length, id).toBeGreaterThan(0);
      expect(s.deal.titre.trim().length, id).toBeGreaterThan(0);
      expect(s.deal.texte.trim().length, id).toBeGreaterThan(0);
    }
  });
});
