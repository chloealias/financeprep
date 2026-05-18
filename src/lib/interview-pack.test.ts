import { describe, expect, it } from "vitest";
import {
  buildInterviewPack,
  FIT_QUESTION_IDS,
  getPackItemGuideLinks,
  inferInterviewSlot,
  packTotalSeconds,
} from "@/lib/interview-pack";
import { questions } from "@/data/questions";

describe("inferInterviewSlot", () => {
  it("returns fit for tagged ids", () => {
    expect(inferInterviewSlot({ id: 58 })).toBe("fit");
    expect(inferInterviewSlot({ id: "123" })).toBe("fit");
  });

  it("detects fit from explanation text", () => {
    expect(
      inferInterviewSlot({
        id: 999,
        explanation: "Question fit fondamentale.",
        category: "ma",
      }),
    ).toBe("fit");
  });

  it("defaults technical for valuation", () => {
    expect(inferInterviewSlot({ id: 1, category: "valuation" })).toBe("technical");
  });
});

describe("buildInterviewPack", () => {
  it("returns 5 items by default with required slot kinds", () => {
    const pack = buildInterviewPack({ size: 5 });
    expect(pack).toHaveLength(5);
    expect(pack[0]?.kind).toBe("opening");
    const kinds = new Set(pack.map((p) => p.kind));
    expect(kinds.has("deal")).toBe(true);
    expect(kinds.has("sector")).toBe(true);
    const technicals = pack.filter((p) => p.kind === "question" && p.slot === "technical");
    expect(technicals.length).toBeGreaterThanOrEqual(2);
  });

  it("returns 7 items with fit when size is 7", () => {
    const pack = buildInterviewPack({ size: 7 });
    expect(pack).toHaveLength(7);
    const fit = pack.find((p) => p.kind === "question" && p.slot === "fit");
    expect(fit).toBeDefined();
  });

  it("has no duplicate question ids", () => {
    const pack = buildInterviewPack({ size: 7 });
    const qIds = pack.filter((p) => p.kind === "question").map((p) => (p as { id: string }).id);
    expect(new Set(qIds).size).toBe(qIds.length);
  });

  it("prioritizes weak ratings for technical picks", () => {
    const pack = buildInterviewPack({
      size: 5,
      ratings: { "1": 1, "2": 1 },
    });
    const techIds = pack
      .filter((p) => p.kind === "question" && p.slot === "technical")
      .map((p) => (p as { id: string }).id);
    expect(techIds.some((id) => id === "1" || id === "2")).toBe(true);
  });

  it("assigns positive total duration", () => {
    const pack = buildInterviewPack();
    expect(packTotalSeconds(pack)).toBeGreaterThan(600);
  });

  it("uses preferred sector when provided", () => {
    const pack = buildInterviewPack({
      size: 5,
      preferredSectorIds: ["sante"],
    });
    const sector = pack.find((p) => p.kind === "sector");
    expect(sector?.kind).toBe("sector");
    if (sector?.kind === "sector") {
      expect(sector.sectorId).toBe("sante");
    }
  });

  it("exposes deal deep link in guide links", () => {
    const pack = buildInterviewPack({ size: 5 });
    const deal = pack.find((p) => p.kind === "deal");
    expect(deal?.kind).toBe("deal");
    if (deal?.kind === "deal") {
      const links = getPackItemGuideLinks(deal);
      expect(links[0]?.to).toBe("/actualite");
      expect(links[0]?.search?.deal).toBe(deal.dealId);
    }
  });

  it("exposes sector and emblematic deal guide links", () => {
    const pack = buildInterviewPack({
      size: 5,
      preferredSectorIds: ["sante"],
    });
    const sector = pack.find((p) => p.kind === "sector");
    expect(sector?.kind).toBe("sector");
    if (sector?.kind === "sector") {
      const links = getPackItemGuideLinks(sector);
      expect(links.some((l) => l.search?.tab === "secteurs" && l.search.sector === "sante")).toBe(
        true,
      );
      expect(links.some((l) => l.search?.deal === "d01")).toBe(true);
    }
  });

  it("FIT_QUESTION_IDS match inferInterviewSlot", () => {
    for (const id of FIT_QUESTION_IDS) {
      const q = (questions as { id: number }[]).find((x) => String(x.id) === id);
      if (q) expect(inferInterviewSlot({ ...q, id })).toBe("fit");
    }
  });
});
