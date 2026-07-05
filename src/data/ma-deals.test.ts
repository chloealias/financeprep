import { describe, expect, it } from "vitest";
import { dealMatchesBank } from "@/data/bank-profiles";
import {
  dealMatchesSector,
  getDealById,
  getDealsForSector,
  isValidDealId,
  MA_DEALS,
} from "@/data/ma-deals";

describe("ma-deals helpers", () => {
  it("getDealById returns deal", () => {
    expect(getDealById("d01")?.title).toContain("Opella");
  });

  it("isValidDealId", () => {
    expect(isValidDealId("d01")).toBe(true);
    expect(isValidDealId("d99")).toBe(false);
  });

  it("dealMatchesBank", () => {
    const deal = getDealById("d01");
    expect(deal).toBeDefined();
    expect(dealMatchesBank(deal!, "Rothschild & Co")).toBe(true);
    expect(dealMatchesBank(deal!, "Citi")).toBe(true);
    expect(dealMatchesBank(deal!, "Unknown Bank")).toBe(false);
  });

  it("getDealsForSector maps sectorId", () => {
    const sante = getDealsForSector("sante");
    expect(sante.some((d) => d.id === "d01")).toBe(true);
    expect(getDealsForSector("tmt").some((d) => d.id === "d07")).toBe(true);
    expect(getDealsForSector("immo").some((d) => d.id === "d13")).toBe(true);
  });

  it("dealMatchesSector", () => {
    const deal = getDealById("d13");
    expect(deal).toBeDefined();
    expect(dealMatchesSector(deal!, "immo")).toBe(true);
    expect(dealMatchesSector(deal!, "tmt")).toBe(false);
  });

  it("has 21 deals", () => {
    expect(MA_DEALS.length).toBe(21);
  });

  it("getDealsForSector includes automotive", () => {
    const auto = getDealsForSector("auto");
    expect(auto.some((d) => d.id === "d18")).toBe(true);
    expect(dealMatchesSector(getDealById("d18")!, "auto")).toBe(true);
  });

  it("includes UBS / Credit Suisse rescue deal", () => {
    expect(getDealById("d17")?.title).toContain("Credit Suisse");
    expect(dealMatchesBank(getDealById("d17")!, "UBS")).toBe(true);
  });
});
