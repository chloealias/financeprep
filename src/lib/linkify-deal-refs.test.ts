import { describe, expect, it } from "vitest";
import { splitDealRefs } from "@/lib/split-deal-refs";

describe("splitDealRefs", () => {
  it("returns single text part when no deal refs", () => {
    expect(splitDealRefs("Pas de référence.")).toEqual([
      { type: "text", value: "Pas de référence." },
    ]);
  });

  it("splits deal d02 reference", () => {
    const parts = splitDealRefs("Voir aussi deal d02 (Altice restructuring).");
    expect(parts.some((p) => p.type === "deal" && p.id === "d02")).toBe(true);
  });

  it("ignores invalid deal ids", () => {
    const parts = splitDealRefs("deal d99 invalid");
    expect(parts.every((p) => p.type === "text")).toBe(true);
  });
});
