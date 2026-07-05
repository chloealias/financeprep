import { describe, expect, it } from "vitest";
import {
  findInvertedAccretionRules,
  INTERVIEW_ACCRETION_RULES,
  isCashDealAccretive,
  stockDealVerdict,
  STOCK_DEAL_RULE,
} from "@/lib/accretion-rules";

describe("accretion-rules", () => {
  describe("stockDealVerdict", () => {
    it("accretif when acquirer P/E exceeds target P/E", () => {
      expect(stockDealVerdict(20, 15)).toBe("accretif");
      expect(stockDealVerdict(14, 9)).toBe("accretif");
    });

    it("dilutif when acquirer P/E is below target P/E", () => {
      expect(stockDealVerdict(9, 14)).toBe("dilutif");
    });

    it("neutre when P/E are equal", () => {
      expect(stockDealVerdict(15, 15)).toBe("neutre");
    });
  });

  describe("isCashDealAccretive", () => {
    it("relutif when target earnings yield exceeds after-tax debt cost", () => {
      expect(isCashDealAccretive(15, 0.0375)).toBe(true);
    });

    it("dilutif when debt cost exceeds target earnings yield", () => {
      expect(isCashDealAccretive(25, 0.05)).toBe(false);
    });
  });

  describe("findInvertedAccretionRules", () => {
    it("detects known inverted formulations", () => {
      expect(
        findInvertedAccretionRules("Cash = dilution si Pe < 1/Kd_aftertax"),
      ).not.toHaveLength(0);
      expect(
        findInvertedAccretionRules("Actions = dilution si Pe acquéreur > Pe cible"),
      ).not.toHaveLength(0);
    });

    it("accepts correct formulations", () => {
      const correct = [
        "Cash = relutif si P/E cible < 1/Kd_aftertax",
        "Actions = relutif si P/E acquéreur > P/E cible",
        INTERVIEW_ACCRETION_RULES[1].texte,
      ].join("\n");
      expect(findInvertedAccretionRules(correct)).toHaveLength(0);
    });
  });

  it("guide stock rule matches canonical condition", () => {
    const stockRule = INTERVIEW_ACCRETION_RULES.find((r) => r.label === "Échange d'actions pur");
    expect(stockRule?.texte).toContain(STOCK_DEAL_RULE.accretiveWhen);
  });
});
