import { describe, expect, it } from "vitest";
import { SECTOR_DATA } from "@/data/sector-data";
import { SECTOR_IDS } from "@/lib/sectors";

describe("sector-data panorama", () => {
  it("every sector has complete panorama", () => {
    for (const id of SECTOR_IDS) {
      const sector = SECTOR_DATA[id];
      expect(sector.panorama.tailleMarche.length).toBeGreaterThan(10);
      expect(sector.panorama.volumeMa.length).toBeGreaterThan(10);
      expect(sector.panorama.acteursMajeurs.length).toBeGreaterThanOrEqual(5);
      expect(sector.panorama.segmentsCles.length).toBeGreaterThanOrEqual(4);
    }
  });
});
