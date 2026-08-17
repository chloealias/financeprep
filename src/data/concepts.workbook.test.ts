import { describe, expect, it } from "vitest";
import { conceptsEn } from "@/data/concepts/en";
import { conceptsFr } from "@/data/concepts/fr";
import type { Concept } from "@/data/concepts/types";

function byId(list: Concept[], id: string): Concept {
  const concept = list.find((item) => item.id === id);
  if (!concept) throw new Error(`Missing concept ${id}`);
  return concept;
}

function textBlob(concept: Concept): string {
  return [
    concept.formula,
    concept.interview,
    concept.simple,
    concept.example?.body,
    ...(concept.steps ?? []),
    ...(concept.pitfalls ?? []),
    ...(concept.table?.rows.flat() ?? []),
  ]
    .join("\n")
    .toLowerCase();
}

describe("Rosenbaum & Pearl workbook facts", () => {
  const locales = [
    { name: "fr", list: conceptsFr },
    { name: "en", list: conceptsEn },
  ] as const;

  it("c1 includes preferred stock in the EV bridge", () => {
    for (const { name, list } of locales) {
      const blob = textBlob(byId(list, "c1"));
      const preferred = name === "fr" ? "préférentielles" : "preferred";
      expect(blob, name).toContain(preferred);
      expect(byId(list, "c1").formula, name).toMatch(/preferred|préférentielles/i);
    }
  });

  it("c2 uses a 5-year base horizon and 15-20 years for contractual revenue", () => {
    for (const { name, list } of locales) {
      const blob = textBlob(byId(list, "c2"));
      expect(blob, name).toMatch(/15\s*[–-]\s*20|15-20/);
      expect(blob, name).toMatch(/utilit/);
      expect(blob, name).toMatch(/wacc/);
      expect(blob, name).toMatch(/ebit/);
    }
  });

  it("c2 distinguishes mid-year EMM vs PGM discounting", () => {
    for (const { name, list } of locales) {
      const blob = textBlob(byId(list, "c2"));
      expect(blob, name).toContain("emm");
      expect(blob, name).toContain("pgm");
      expect(blob, name).toMatch(/mid-year|mid year|milieu d'année/);
    }
  });

  it("c6 cites 30-40% equity as the book range and documents cash sweep", () => {
    for (const { name, list } of locales) {
      const blob = textBlob(byId(list, "c6"));
      expect(blob, name).toMatch(/30\s*[–-]\s*40|30-40/);
      expect(blob, name).toMatch(/cash sweep|cash flow sweep/);
      expect(blob, name).toMatch(/1\s*%/);
      expect(blob, name).toMatch(/revolver/);
      expect(blob, name).toMatch(/term loan/);
    }
  });

  it("c7 states exit multiple ≤ entry multiple as the conservative default", () => {
    for (const { name, list } of locales) {
      const blob = textBlob(byId(list, "c7"));
      expect(blob, name).toMatch(/sortie|exit/);
      expect(blob, name).toMatch(/entrée|entry/);
      expect(blob, name).toMatch(/≤|<=|inférieur|below|equal to, or below/);
    }
  });

  it("c8 states EV vs equity numerator/denominator consistency", () => {
    for (const { name, list } of locales) {
      const blob = textBlob(byId(list, "c8"));
      expect(blob, name).toMatch(/net income|bénéfice net|eps/);
      expect(blob, name).toMatch(/avant intérêts|before interest/);
    }
  });

  it("c14 uses a long-term government bond as Rf, not a money-market rate", () => {
    for (const { name, list } of locales) {
      const blob = textBlob(byId(list, "c14"));
      expect(blob, name).toMatch(/fed funds|euribor|libor/);
      expect(blob, name).toMatch(/oat|20 ans|20-year|government|obligation/);
    }
  });

  it("c24 covers Treasury Stock Method and in-the-money options only", () => {
    for (const { name, list } of locales) {
      const concept = byId(list, "c24");
      expect(concept.category, name).toBe("valuation");
      const blob = textBlob(concept);
      expect(blob, name).toMatch(/tsm|treasury stock/);
      expect(blob, name).toMatch(/in-the-money|dans la monnaie/);
      expect(blob, name).toMatch(/if-converted|net share settlement|nss/);
      expect(blob, name).toMatch(/valeur de conversion|conversion value/);
      expect(blob, name).toMatch(/circulaire|circular/);
    }
  });

  it("c25 covers premium paid vs unaffected share price", () => {
    for (const { name, list } of locales) {
      const blob = textBlob(byId(list, "c25"));
      expect(blob, name).toMatch(/premium paid|prime/);
      expect(blob, name).toMatch(/unaffected|non affecté|non-affecté/);
      expect(blob, name).toMatch(/30/);
      expect(blob, name).toMatch(/merger-of-equals|moe|fusion entre égaux/);
      expect(blob, name).toMatch(/actions diluées|diluted shares/);
    }
  });

  it("c26 covers accretion/dilution vs standalone EPS", () => {
    for (const { name, list } of locales) {
      const concept = byId(list, "c26");
      expect(concept.category, name).toBe("ma");
      const blob = textBlob(concept);
      expect(blob, name).toMatch(/accrét|accret/);
      expect(blob, name).toContain("eps");
      expect(blob, name).toMatch(/p\/e/);
      expect(blob, name).toMatch(/write-up|write-ups/);
      expect(blob, name).toMatch(/contribution analysis|analyse de contribution/);
    }
  });

  it("c27 covers credit ratios and leverage through the cycle", () => {
    for (const { name, list } of locales) {
      const concept = byId(list, "c27");
      expect(concept.category, name).toBe("lbo");
      const blob = textBlob(concept);
      expect(blob, name).toMatch(/ebitda/);
      expect(blob, name).toMatch(/coverage|couverture/);
      expect(blob, name).toMatch(/6,1|6.1/);
    }
  });

  it("c28 distinguishes bank maintenance covenants from HY incurrence covenants", () => {
    for (const { name, list } of locales) {
      const concept = byId(list, "c28");
      expect(concept.category, name).toBe("lbo");
      const blob = textBlob(concept);
      expect(blob, name).toMatch(/maintenance/);
      expect(blob, name).toMatch(/incurrence/);
      expect(blob, name).toMatch(/opco|holdco/);
      expect(blob, name).toMatch(/undrawn|non tiré/);
    }
  });

  it("c29 covers stock vs asset deals with a US/EU tax caveat", () => {
    for (const { name, list } of locales) {
      const concept = byId(list, "c29");
      expect(concept.category, name).toBe("ma");
      const blob = textBlob(concept);
      expect(blob, name).toMatch(/stock deal/);
      expect(blob, name).toMatch(/asset deal/);
      expect(blob, name).toMatch(/338/);
      expect(blob, name).toMatch(/france|europe|européen|european/);
    }
  });
});
