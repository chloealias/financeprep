import { describe, expect, it } from "vitest";
import { questions as questionsEn } from "@/data/questions/en";
import { questions as questionsFr } from "@/data/questions/fr";

describe("questions locale parity", () => {
  it("has the same ids in FR and EN", () => {
    const frIds = questionsFr.map((q) => q.id).sort((a, b) => a - b);
    const enIds = questionsEn.map((q) => q.id).sort((a, b) => a - b);
    expect(enIds).toEqual(frIds);
  });

  it("has non-empty English text fields", () => {
    for (const q of questionsEn) {
      expect(q.question.trim().length, `question ${q.id}`).toBeGreaterThan(0);
      expect(q.explanation.trim().length, `explanation ${q.id}`).toBeGreaterThan(0);
      expect(q.tip.trim().length, `tip ${q.id}`).toBeGreaterThan(0);
      expect(q.steps.length, `steps ${q.id}`).toBeGreaterThan(0);
      for (const step of q.steps) {
        expect(step.trim().length, `step of ${q.id}`).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the same step counts per id", () => {
    const frById = new Map(questionsFr.map((q) => [q.id, q]));
    for (const q of questionsEn) {
      expect(q.steps.length, `steps count ${q.id}`).toBe(frById.get(q.id)!.steps.length);
    }
  });
});
