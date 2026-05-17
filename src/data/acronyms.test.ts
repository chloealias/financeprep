import { describe, expect, it } from "vitest";
import { acronyms } from "@/data/acronyms";

describe("acronyms", () => {
  it("EBITDA is not translated as EBE (French accounting term for operating profit)", () => {
    const ebitda = acronyms.find((a) => a.abbr === "EBITDA");
    expect(ebitda?.french).not.toBe("EBE");
    expect(ebitda?.french).toMatch(/EBITDA|amort/i);
  });

  it("DG COMP describes EU Commission competition directorate", () => {
    const dg = acronyms.find((a) => a.abbr === "DG COMP");
    expect(dg?.french).toMatch(/Commission européenne/i);
  });
});
