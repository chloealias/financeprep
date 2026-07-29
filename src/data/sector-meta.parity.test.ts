import { describe, expect, it } from "vitest";
import { SECTOR_META as fr } from "@/data/sector-meta/fr";
import { SECTOR_META as en } from "@/data/sector-meta/en";
import type { SectorId } from "@/lib/sectors";

describe("sector-meta locale parity", () => {
  it("has the same ids and map slots", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(fr).sort());
    for (const id of Object.keys(fr) as SectorId[]) {
      expect(en[id].mapSlot).toEqual(fr[id].mapSlot);
      expect(en[id].labelOffset).toEqual(fr[id].labelOffset);
      expect(en[id].label.trim().length).toBeGreaterThan(0);
      expect(en[id].tagline.trim().length).toBeGreaterThan(0);
    }
  });
});
