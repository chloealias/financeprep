import { describe, expect, it } from "vitest";
import {
  ACCRETION_RULE_QUESTION_IDS,
  findInvertedAccretionRules,
  INTERVIEW_ACCRETION_RULES,
  stockDealVerdict,
} from "@/lib/accretion-rules";
import { questions } from "@/data/questions";

function getQuestion(id: number) {
  const question = questions.find((q) => q.id === id);
  expect(question).toBeDefined();
  return question!;
}

function questionText(id: number): string {
  const question = getQuestion(id);
  return [question.question, question.explanation, ...question.steps].join("\n");
}

describe("questions accretion consistency", () => {
  it.each(ACCRETION_RULE_QUESTION_IDS)("question %i has no inverted accretion rules", (id) => {
    expect(findInvertedAccretionRules(questionText(id))).toEqual([]);
  });

  it("stock deal questions align with guide rule", () => {
    const guideStockRule = INTERVIEW_ACCRETION_RULES.find(
      (rule) => rule.label === "Échange d'actions pur",
    )!.texte;

    const stockAccretivePattern =
      /(P\/E|PE).*acquéreur.*(>|supérieur).*(P\/E|PE).*cible/i;

    for (const id of [10, 84, 85]) {
      expect(questionText(id)).toMatch(stockAccretivePattern);
    }

    expect(guideStockRule).toMatch(/P\/E acquéreur > P\/E cible/);
  });

  it("question 37 example matches stockDealVerdict", () => {
    const question = getQuestion(37);
    expect(questionText(37)).toMatch(/RELUTIVE/i);
    expect(stockDealVerdict(14, 9)).toBe("accretif");
  });

  it("cash deal questions reference earnings yield, not EBITDA yield", () => {
    for (const id of [10, 85, 110]) {
      const text = questionText(id);
      expect(text).not.toMatch(/yield.*EBITDA/i);
    }
  });

  it("questions 84 and 85 agree on cash deal logic", () => {
    const q84 = questionText(84);
    const q85 = questionText(85);
    expect(q84).toMatch(/relutif.*P\/E cible.*1\/Kd/i);
    expect(q85).toMatch(/Kd.*\(1−t\).*inférieur.*earnings yield/i);
  });
});
