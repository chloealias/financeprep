import { describe, expect, it } from "vitest";
import { guideDiagnosticEn } from "@/data/guide/diagnostic.en";
import { guideDiagnosticFr } from "@/data/guide/diagnostic.fr";
import { getDiagnosticTechnicalItemIds } from "@/data/guide/diagnostic";

describe("diagnostic guide content parity", () => {
  it("keeps the same technical item ids in FR and EN", () => {
    expect(getDiagnosticTechnicalItemIds(guideDiagnosticEn)).toEqual(
      getDiagnosticTechnicalItemIds(guideDiagnosticFr),
    );
  });

  it("keeps the same fit and networking checklist ids", () => {
    expect(guideDiagnosticEn.fitPresentation.map((i) => i.id)).toEqual(
      guideDiagnosticFr.fitPresentation.map((i) => i.id),
    );
    expect(guideDiagnosticEn.fitStar.map((i) => i.id)).toEqual(
      guideDiagnosticFr.fitStar.map((i) => i.id),
    );
    expect(guideDiagnosticEn.networkingPrep.map((i) => i.id)).toEqual(
      guideDiagnosticFr.networkingPrep.map((i) => i.id),
    );
    expect(guideDiagnosticEn.networkingTemplates.map((i) => i.id)).toEqual(
      guideDiagnosticFr.networkingTemplates.map((i) => i.id),
    );
  });

  it("has 17 technical items", () => {
    expect(getDiagnosticTechnicalItemIds(guideDiagnosticFr)).toHaveLength(17);
  });
});
