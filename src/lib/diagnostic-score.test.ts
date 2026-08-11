import { describe, expect, it } from "vitest";
import { countTechnicalReview, diagnosticTier } from "@/lib/diagnostic-score";
import { getDiagnosticTechnicalItemIds } from "@/data/guide/diagnostic";

const IDS = getDiagnosticTechnicalItemIds();

describe("countTechnicalReview", () => {
  it("ignores unevaluated items", () => {
    expect(countTechnicalReview({}, IDS)).toEqual({
      reviewCount: 0,
      evaluatedCount: 0,
      masteredCount: 0,
    });
  });

  it("counts review and mastered separately", () => {
    const technical = {
      [IDS[0]!]: "review" as const,
      [IDS[1]!]: "mastered" as const,
      [IDS[2]!]: "review" as const,
    };
    expect(countTechnicalReview(technical, IDS)).toEqual({
      reviewCount: 2,
      evaluatedCount: 3,
      masteredCount: 1,
    });
  });
});

describe("diagnosticTier", () => {
  it("returns none when nothing is evaluated", () => {
    expect(diagnosticTier(0, 0)).toBe("none");
  });

  it("returns ready for 0–4 review", () => {
    expect(diagnosticTier(0, 10)).toBe("ready");
    expect(diagnosticTier(4, 17)).toBe("ready");
  });

  it("returns priority for 5–14 review", () => {
    expect(diagnosticTier(5, 10)).toBe("priority");
    expect(diagnosticTier(14, 17)).toBe("priority");
  });

  it("returns coaching for 15+ review", () => {
    expect(diagnosticTier(15, 17)).toBe("coaching");
    expect(diagnosticTier(17, 17)).toBe("coaching");
  });
});
