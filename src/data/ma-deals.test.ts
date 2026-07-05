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
    expect(dealMatchesBank(deal!, "Citigroup")).toBe(true);
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
    expect(auto.some((d) => d.id === "d17")).toBe(true);
    expect(dealMatchesSector(getDealById("d17")!, "auto")).toBe(true);
  });

  it("includes UBS / Credit Suisse rescue deal", () => {
    expect(getDealById("d16")?.title).toContain("Credit Suisse");
    expect(dealMatchesBank(getDealById("d16")!, "UBS")).toBe(true);
  });

  it("has sequential deal ids d01–d21 without gaps", () => {
    const ids = MA_DEALS.map((d) => d.id).sort();
    for (let i = 1; i <= 21; i++) {
      expect(ids).toContain(`d${String(i).padStart(2, "0")}`);
    }
  });

  it("UniCredit / Commerzbank is filterable by bank", () => {
    const deal = getDealById("d04");
    expect(deal).toBeDefined();
    expect(deal!.banks.length).toBeGreaterThan(0);
    expect(dealMatchesBank(deal!, "Goldman Sachs")).toBe(true);
    expect(dealMatchesBank(deal!, "Rothschild & Co")).toBe(true);
  });
});
