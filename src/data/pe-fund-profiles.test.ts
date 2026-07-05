import { describe, expect, it } from "vitest";
import { getPeFundById, PE_FUND_LIST } from "@/data/pe-fund-profiles";

describe("pe-fund-profiles", () => {
  it("has 10 fund profiles", () => {
    expect(PE_FUND_LIST.length).toBe(10);
  });

  it("each profile has required fields", () => {
    for (const fund of PE_FUND_LIST) {
      expect(fund.name.length).toBeGreaterThan(0);
      expect(fund.aum.length).toBeGreaterThan(0);
      expect(fund.pointEntretien.length).toBeGreaterThan(0);
      expect(fund.questionPiège.length).toBeGreaterThan(0);
      expect(fund.reponsePiège.length).toBeGreaterThan(0);
    }
  });

  it("Ardian AUM reflects 2025 reporting (~200 Md$)", () => {
    const ardian = getPeFundById("ardian");
    expect(ardian?.aum).toMatch(/200/);
  });

  it("CD&R links to emblematic Opella deal", () => {
    const cdr = getPeFundById("cdr");
    expect(cdr?.emblematicDealId).toBe("d01");
    expect(cdr?.dealEmblematique.titre).toContain("Opella");
  });
});
