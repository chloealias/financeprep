import { describe, expect, it } from "vitest";
import { collectDealBankLabels, normalizeBankLabel } from "@/lib/bank-name-resolve";
import { getDealById } from "@/data/ma-deals";

describe("bank-name-resolve", () => {
  it("normalizes advisor labels and aliases", () => {
    expect(normalizeBankLabel("Lazard (M&A)")).toBe("Lazard");
    expect(normalizeBankLabel("Citi")).toBe("Citigroup");
  });

  it("collects banks from deal advisors", () => {
    const deal = getDealById("d01");
    expect(deal).toBeDefined();
    const labels = collectDealBankLabels(deal!);
    expect(labels.some((l) => l.includes("Citi"))).toBe(true);
    expect(labels.some((l) => l.includes("Rothschild"))).toBe(true);
  });
});
