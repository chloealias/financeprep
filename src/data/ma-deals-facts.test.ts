import { describe, expect, it } from "vitest";
import { getDealById } from "@/data/ma-deals";

/** Faits vérifiés en externe — mettre à jour lors des revues trimestrielles. */
const VERIFIED_DEAL_FACTS: Record<
  string,
  { mustInclude: string[]; mustNotInclude?: string[] }
> = {
  d01: {
    mustInclude: ["~16 Md€", "30 avr. 2025", "CD&R"],
  },
  d03: {
    mustInclude: ["5 mars 2026", "Goldman Sachs Alternatives"],
  },
  d04: {
    mustInclude: ["3 juil. 2026", "12,5 %", "Commerzbank"],
    mustNotInclude: ["Acceptation jusqu'au 16 juin 2026"],
  },
  d06: {
    mustInclude: ["4 Md€", "31 mars 2026", "Creed"],
  },
  d07: {
    mustInclude: ["~8 Md€", "31 déc. 2024", "Swisscom"],
  },
  d08: {
    mustInclude: ["20,35 Md€", "6 juin 2026", "MOU"],
    mustNotInclude: ["Exclusivité prolongée jusqu'au 5 juin 2026"],
  },
  d09: {
    mustInclude: ["18 juil. 2025", "Blueprint"],
    mustNotInclude: ["Closing en cours"],
  },
};

function dealText(id: string): string {
  const deal = getDealById(id);
  expect(deal).toBeDefined();
  const parts = [
    deal!.title,
    deal!.dates,
    deal!.headlineEv,
    ...deal!.parties.map((p) => `${p.label} ${p.text}`),
    deal!.contexte ?? "",
    deal!.pointEntretien,
  ];
  return parts.join("\n");
}

describe("ma-deals verified facts", () => {
  for (const [id, facts] of Object.entries(VERIFIED_DEAL_FACTS)) {
    it(`deal ${id} matches verified external facts`, () => {
      const text = dealText(id);
      for (const snippet of facts.mustInclude) {
        expect(text).toContain(snippet);
      }
      for (const snippet of facts.mustNotInclude ?? []) {
        expect(text).not.toContain(snippet);
      }
    });
  }

  it("closed deals do not use stale 'en cours' wording", () => {
    for (const id of ["d03", "d06", "d09"]) {
      expect(dealText(id)).not.toMatch(/en cours/i);
    }
  });
});
