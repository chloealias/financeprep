import { describe, expect, it } from "vitest";
import { buildInterviewMarkdown } from "@/lib/interview-report";
import type { InterviewSessionRecord } from "@/lib/storage";

const baseSession: InterviewSessionRecord = {
  id: "test",
  mode: "mini",
  startedAt: Date.now(),
  durationMs: 600_000,
  packSize: 3,
  avgStars: 3.5,
  answers: [],
};

describe("buildInterviewMarkdown", () => {
  it("includes deep link for deal answers", () => {
    const md = buildInterviewMarkdown(
      {
        ...baseSession,
        answers: [
          {
            itemKind: "deal",
            itemId: "d01",
            label: "Actu M&A",
            category: "actu",
            question: "Deal test",
            stars: 4,
            structureOk: true,
            numbersOk: true,
            timeMs: 120_000,
          },
        ],
      },
      [],
    );
    expect(md).toContain("/actualite?deal=d01");
    expect(md).toContain("Fiche deal");
  });

  it("includes sector and emblematic deal links", () => {
    const md = buildInterviewMarkdown(
      {
        ...baseSession,
        answers: [
          {
            itemKind: "sector",
            itemId: "sante",
            label: "Santé",
            category: "sector",
            question: "Secteur santé",
            stars: 3,
            structureOk: true,
            numbersOk: false,
            timeMs: 90_000,
          },
        ],
      },
      [],
    );
    expect(md).toContain("/?tab=secteurs&sector=sante");
    expect(md).toContain("/actualite?deal=d01");
  });
});
