import { describe, expect, it } from "vitest";
import {
  describePackPersonalization,
  formatPackPersonalizationText,
  getInterviewPlanMessage,
  getTodayHighlightKeys,
  suggestedDefaultPackSize,
  validateTargetBankIds,
} from "@/lib/profile-personalization";
import { DEFAULT_PROFILE } from "@/lib/profile-storage";

describe("profile-personalization", () => {
  it("formats pack personalization text", () => {
    const summary = describePackPersonalization({
      ...DEFAULT_PROFILE,
      defaultPackSize: 5,
      sectorIds: ["tmt"],
    });
    const text = formatPackPersonalizationText(summary);
    expect(text).toContain("pack 5");
    expect(text).toContain("sectoriel");
  });

  it("suggests pack size by process type", () => {
    expect(suggestedDefaultPackSize("full-time")).toBe(7);
    expect(suggestedDefaultPackSize("stage")).toBe(5);
  });

  it("returns interview plan for J-7", () => {
    const msg = getInterviewPlanMessage(5, { srsDue: 3, weakCount: 2, suggestSimulation: true });
    expect(msg).toContain("J-5");
    expect(msg).toContain("entraînement chronométré");
  });

  it("highlights cards by experience level", () => {
    const keys = getTodayHighlightKeys({ ...DEFAULT_PROFILE, experienceLevel: "reconversion" });
    expect(keys.has("cv")).toBe(true);
    expect(keys.has("srs")).toBe(true);
  });

  it("validates target bank ids", () => {
    expect(validateTargetBankIds(["lazard", "invalid-bank"])).toEqual(["lazard"]);
  });
});
