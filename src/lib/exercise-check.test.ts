import { describe, expect, it } from "vitest";
import { checkNumericAnswer, parseNumericInput } from "@/lib/exercise-check";

describe("parseNumericInput", () => {
  it("parses FR spaces and comma", () => {
    expect(parseNumericInput("1 250")).toBe(1250);
    expect(parseNumericInput("2,5")).toBe(2.5);
  });

  it("parses multiples", () => {
    expect(parseNumericInput("x5", "multiple")).toBe(5);
    expect(parseNumericInput("5x", "multiple")).toBe(5);
    expect(parseNumericInput("2,5", "multiple")).toBe(2.5);
  });

  it("parses percent_or_decimal", () => {
    expect(parseNumericInput("15%", "percent_or_decimal")).toBe(0.15);
    expect(parseNumericInput("15", "percent_or_decimal")).toBe(0.15);
    expect(parseNumericInput("0.15", "percent_or_decimal")).toBe(0.15);
  });
});

describe("checkNumericAnswer", () => {
  it("exact multiple", () => {
    expect(
      checkNumericAnswer("x5", { mode: "exact", accept: [5], unit: "multiple" }),
    ).toBe(true);
    expect(
      checkNumericAnswer("4", { mode: "exact", accept: [5], unit: "multiple" }),
    ).toBe(false);
  });

  it("exact with several accepts", () => {
    expect(
      checkNumericAnswer("2.5", { mode: "exact", accept: [2.5, 2.5], unit: "multiple" }),
    ).toBe(true);
  });

  it("tolerance relative", () => {
    expect(
      checkNumericAnswer("390", { mode: "tolerance", value: 387.5, pct: 2 }),
    ).toBe(true);
    expect(
      checkNumericAnswer("100", { mode: "tolerance", value: 387.5, pct: 2 }),
    ).toBe(false);
  });

  it("percent_or_decimal exact", () => {
    expect(
      checkNumericAnswer("15%", {
        mode: "exact",
        accept: [0.15],
        unit: "percent_or_decimal",
      }),
    ).toBe(true);
    expect(
      checkNumericAnswer("0.15", {
        mode: "exact",
        accept: [0.15],
        unit: "percent_or_decimal",
      }),
    ).toBe(true);
  });
});
