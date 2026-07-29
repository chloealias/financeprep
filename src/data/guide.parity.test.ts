import { describe, expect, it } from "vitest";
import { guideAccretionEn } from "@/data/guide/accretion.en";
import { guideAccretionFr } from "@/data/guide/accretion.fr";
import { guideCvEn } from "@/data/guide/cv.en";
import { guideCvFr } from "@/data/guide/cv.fr";
import { guideMentalMathEn } from "@/data/guide/mental-math.en";
import { guideMentalMathFr } from "@/data/guide/mental-math.fr";
import { guidePyramidEn } from "@/data/guide/pyramid.en";
import { guidePyramidFr } from "@/data/guide/pyramid.fr";
import { INTERVIEW_ACCRETION_RULES } from "@/lib/accretion-rules";

describe("guide content locale parity", () => {
  it("CV checklist ids match across locales", () => {
    expect(guideCvEn.checklist.map((c) => c.id)).toEqual(guideCvFr.checklist.map((c) => c.id));
    expect(guideCvEn.acts.map((a) => a.num)).toEqual(guideCvFr.acts.map((a) => a.num));
    expect(guideCvEn.dealSteps.map((s) => s.num)).toEqual(guideCvFr.dealSteps.map((s) => s.num));
    expect(guideCvEn.pitfalls).toHaveLength(guideCvFr.pitfalls.length);
  });

  it("Pyramid STAR letters and matrix flags match", () => {
    expect(guidePyramidEn.starCards.map((c) => c.letter)).toEqual(
      guidePyramidFr.starCards.map((c) => c.letter),
    );
    expect(guidePyramidEn.matrix.map((r) => ({ pyramid: r.pyramid, star: r.star }))).toEqual(
      guidePyramidFr.matrix.map((r) => ({ pyramid: r.pyramid, star: r.star })),
    );
    expect(guidePyramidEn.usefulPhrases).toHaveLength(guidePyramidFr.usefulPhrases.length);
    expect(guidePyramidEn.avoidPhrases).toHaveLength(guidePyramidFr.avoidPhrases.length);
  });

  it("Mental math drills share answers and tip counts", () => {
    expect(guideMentalMathEn.drills).toHaveLength(guideMentalMathFr.drills.length);
    expect(guideMentalMathEn.drills.map((d) => d.answer)).toEqual(
      guideMentalMathFr.drills.map((d) => d.answer),
    );
    expect(guideMentalMathEn.pctTips).toHaveLength(guideMentalMathFr.pctTips.length);
  });

  it("Accretion FR rules stay aligned with INTERVIEW_ACCRETION_RULES", () => {
    expect(guideAccretionFr.rules.map((r) => r.labelKey)).toEqual(
      INTERVIEW_ACCRETION_RULES.map((r) => r.labelKey),
    );
    expect(guideAccretionEn.rules.map((r) => r.labelKey)).toEqual(
      guideAccretionFr.rules.map((r) => r.labelKey),
    );
    for (let i = 0; i < INTERVIEW_ACCRETION_RULES.length; i++) {
      expect(guideAccretionFr.rules[i]?.texte).toBe(INTERVIEW_ACCRETION_RULES[i]?.texte);
    }
  });
});
