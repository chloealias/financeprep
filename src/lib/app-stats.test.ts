import { describe, expect, it } from "vitest";
import { getAppStats } from "@/lib/app-stats";
import { questions } from "@/data/questions";
import { MA_DEALS } from "@/data/ma-deals";
import { BANK_LIST } from "@/data/bank-profiles";

describe("getAppStats", () => {
  it("returns counts consistent with data modules", () => {
    const stats = getAppStats();
    expect(stats.questions).toBe(questions.length);
    expect(stats.deals).toBe(MA_DEALS.length);
    expect(stats.banks).toBe(BANK_LIST.length);
    expect(stats.questions).toBeGreaterThan(0);
  });
});
