import { describe, expect, it } from "vitest";
import { validateActualiteSearch, validateHomeSearch } from "@/lib/route-search";

describe("validateHomeSearch", () => {
  it("defaults tab to guide", () => {
    expect(validateHomeSearch({})).toEqual({ tab: "guide" });
  });

  it("preserves secteurs tab and sector for modal deep link", () => {
    expect(validateHomeSearch({ tab: "secteurs", sector: "tmt" })).toEqual({
      tab: "secteurs",
      sector: "tmt",
    });
  });

  it("opens secteurs tab when sector is set without tab", () => {
    expect(validateHomeSearch({ sector: "tmt" })).toEqual({
      tab: "secteurs",
      sector: "tmt",
    });
  });

  it("rejects invalid sector", () => {
    expect(validateHomeSearch({ tab: "secteurs", sector: "invalid" })).toEqual({
      tab: "secteurs",
    });
  });

  it("validates bank id", () => {
    expect(validateHomeSearch({ tab: "banques", bank: "rothschild-co" })).toEqual({
      tab: "banques",
      bank: "rothschild-co",
    });
  });
});

describe("validateActualiteSearch", () => {
  it("validates deal and bank", () => {
    expect(validateActualiteSearch({ deal: "d01", bank: "rothschild-co" })).toEqual({
      deal: "d01",
      bank: "rothschild-co",
    });
  });

  it("rejects invalid deal", () => {
    expect(validateActualiteSearch({ deal: "d99" })).toEqual({});
  });

  it("validates sector filter", () => {
    expect(validateActualiteSearch({ sector: "sante" })).toEqual({ sector: "sante" });
    expect(validateActualiteSearch({ sector: "invalid" })).toEqual({});
  });

  it("combines deal, bank and sector", () => {
    expect(validateActualiteSearch({ deal: "d01", bank: "bnp-paribas", sector: "sante" })).toEqual({
      deal: "d01",
      bank: "bnp-paribas",
      sector: "sante",
    });
  });
});
