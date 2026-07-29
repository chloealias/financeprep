import { describe, expect, it } from "vitest";
import { acronymSections, getAcronymSections } from "@/data/acronyms";

describe("acronyms locale section titles", () => {
  it("translates FR section titles in EN", () => {
    const en = getAcronymSections("en");
    expect(en.length).toBe(acronymSections.length);
    expect(en[0]?.title).toBe("Value & valuation");
    expect(en.find((s) => s.title === "Cost of capital & returns")).toBeTruthy();
    expect(en.find((s) => s.title === "Debt & financing")).toBeTruthy();
  });

  it("keeps FR titles by default", () => {
    expect(getAcronymSections("fr")[0]?.title).toBe("Valeur & valorisation");
  });
});
