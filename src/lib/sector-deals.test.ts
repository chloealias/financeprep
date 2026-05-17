import { describe, expect, it } from "vitest";
import { getSectorIdForSecteur } from "@/lib/sector-deals";

describe("getSectorIdForSecteur", () => {
  it("maps known secteur strings", () => {
    expect(getSectorIdForSecteur("Santé / Consumer Healthcare")).toBe("sante");
    expect(getSectorIdForSecteur("TMT / Telecom")).toBe("tmt");
    expect(getSectorIdForSecteur("FIG — Banques")).toBe("fi");
  });

  it("returns undefined for unknown", () => {
    expect(getSectorIdForSecteur("Unknown")).toBeUndefined();
  });
});
