import { describe, expect, it } from "vitest";
import type { Exercise } from "@/data/exercise-types";
import { getChapterProgress } from "@/lib/exercise-progress";

function exercise(id: string): Exercise {
  return {
    id,
    theme: "dcf",
    title: id,
    variants: [{ kind: "open", prompt: "p", method: "m", answerLabel: "a" }],
  };
}

describe("getChapterProgress", () => {
  it("returns null percent when the chapter has no exercises", () => {
    expect(getChapterProgress([], new Set(["1.1"]))).toEqual({
      total: 0,
      solved: 0,
      percent: null,
    });
  });

  it("returns 50 percent when one of two chapter exercises is solved", () => {
    expect(getChapterProgress([exercise("a"), exercise("b")], new Set(["a"]))).toEqual({
      total: 2,
      solved: 1,
      percent: 50,
    });
  });

  it("ignores solved ids that are not in the chapter", () => {
    expect(getChapterProgress([exercise("a")], new Set(["a", "other"]))).toEqual({
      total: 1,
      solved: 1,
      percent: 100,
    });
  });
});
