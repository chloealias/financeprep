import { describe, expect, it } from "vitest";
import { isValidSectorId, SECTOR_IDS } from "@/lib/sectors";

describe("sector routes", () => {
  it("accepts all known sector ids", () => {
    for (const id of SECTOR_IDS) {
      expect(isValidSectorId(id)).toBe(true);
    }
  });

  it("rejects unknown sector ids", () => {
    expect(isValidSectorId("invalid")).toBe(false);
    expect(isValidSectorId("")).toBe(false);
  });
});
