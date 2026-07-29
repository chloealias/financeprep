import { describe, expect, it } from "vitest";
import { findAcronyms } from "@/components/interview/AcronymText";

describe("findAcronyms", () => {
  it("matches glossary acronyms", () => {
    const hits = findAcronyms("L'EBITDA et le WACC comptent.");
    expect(hits.map((h) => h.abbr)).toEqual(["EBITDA", "WACC"]);
  });

  it("expands TRI / IRR aliases", () => {
    const hits = findAcronyms("IRR cible ≈ 20%");
    expect(hits.some((h) => h.abbr === "IRR")).toBe(true);
  });

  it("matches FCF, BFR, VT aliases", () => {
    const text = "Impact FCF, hausse du BFR, calcul de la VT.";
    const abbrs = findAcronyms(text).map((h) => h.abbr);
    expect(abbrs).toContain("FCF");
    expect(abbrs).toContain("BFR");
    expect(abbrs).toContain("VT");
  });

  it("prefers EV/EBITDA over EV alone", () => {
    const hits = findAcronyms("Multiple EV/EBITDA sectoriel");
    expect(hits).toHaveLength(1);
    expect(hits[0]?.abbr).toBe("EV/EBITDA");
  });

  it("matches DSO inside DSO/DIO/DPO", () => {
    const abbrs = findAcronyms("Ratios DSO/DIO/DPO inchangés").map((h) => h.abbr);
    expect(abbrs).toEqual(expect.arrayContaining(["DSO", "DIO", "DPO"]));
  });

  it("matches TSM", () => {
    expect(findAcronyms("Treasury Stock Method (TSM)").some((h) => h.abbr === "TSM")).toBe(true);
  });
});
