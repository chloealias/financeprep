import { describe, expect, it } from "vitest";
import { getInterviewPlanMessage } from "@/lib/profile-personalization";

describe("getInterviewPlanMessage", () => {
  it("returns null when no interview date context", () => {
    expect(
      getInterviewPlanMessage(null, { srsDue: 0, weakCount: 0, suggestSimulation: false }),
    ).toBeNull();
  });

  it("returns day-of message", () => {
    const msg = getInterviewPlanMessage(0, { srsDue: 5, weakCount: 1, suggestSimulation: true });
    expect(msg).toContain("Jour J");
  });
});
