import { describe, expect, it } from "vitest";
import { getBankById, getBankIdByName, getDealsForBank, isValidBankId } from "@/data/bank-profiles";

describe("bank-profiles helpers", () => {
  it("isValidBankId", () => {
    expect(isValidBankId("rothschild-co")).toBe(true);
    expect(isValidBankId("invalid")).toBe(false);
  });

  it("getBankById", () => {
    const bank = getBankById("lazard");
    expect(bank?.name).toBe("Lazard");
    expect(bank?.emblematicDealId).toBe("d02");
  });

  it("getBankIdByName", () => {
    expect(getBankIdByName("Rothschild & Co")).toBe("rothschild-co");
    expect(getBankIdByName("Unknown")).toBeUndefined();
  });

  it("getDealsForBank", () => {
    const deals = getDealsForBank("Lazard");
    expect(deals.some((d) => d.id === "d02")).toBe(true);
  });

  it("getDealsForBank matches Citi alias on coordinateur dette", () => {
    const deals = getDealsForBank("Citigroup");
    expect(deals.some((d) => d.id === "d01")).toBe(true);
  });

  it("getBankIdByName resolves advisor labels and aliases", () => {
    expect(getBankIdByName("Lazard (M&A)")).toBe("lazard");
    expect(getBankIdByName("Citi")).toBe("citi");
  });

  it("financing banks can use bank filter link type", () => {
    const socgen = getBankById("societe-generale");
    expect(socgen?.emblematicLinkType).toBe("bank");
  });

  it("includes European boutiques and banks", () => {
    expect(getBankById("credit-suisse")?.name).toBe("Credit Suisse");
    expect(getBankById("credit-suisse")?.emblematicDealId).toBe("d17");
    expect(getBankById("evercore")?.emblematicDealId).toBe("d06");
    expect(getBankById("houlihan-lokey")?.categoryId).toBe("elite-boutique");
    expect(getBankById("mediobanca")?.hq).toContain("Milan");
    expect(getBankById("moelis")?.categoryId).toBe("elite-boutique");
    expect(getBankById("pjt-partners")?.name).toContain("PJT");
    expect(getBankById("perella-weinberg")?.name).toContain("Perella");
  });
});
