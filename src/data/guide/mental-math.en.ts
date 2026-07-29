import type { GuideMentalMathContent } from "./mental-math.types";

export const guideMentalMathEn: GuideMentalMathContent = {
  intro:
    "Mental math is tested for quick thinking and stress management — not to replace Excel. Trachtenberg and % shortcuts save 10–20 seconds per question.",
  trachtenbergBody:
    "For AB × 11 (two digits): units = B; middle = A+B (carry if ≥10); tens = A (+ carry).",
  trachtenbergExample: "E.g. 53 × 11 → units 3; 5+3=8; tens 5 → 583",
  times12Title: "Quick ×12",
  times12Body: "×12 = ×10 + ×2. E.g. 45 × 12 = 450 + 90 = 540.",
  pctTips: [
    { pct: "10%", tip: "Shift the decimal one place" },
    { pct: "5%", tip: "Half of 10%" },
    { pct: "15%", tip: "10% + 5%" },
    { pct: "20%", tip: "÷5 or ×2 on 10%" },
    { pct: "25%", tip: "÷4" },
    { pct: "1%", tip: "÷100 — order of magnitude" },
  ],
  drills: [
    {
      prompt: "27 × 11 = ?",
      method: "Trachtenberg ×11: units digit = 7; middle = 2+7=9; tens = 2 → 297",
      answer: "297",
    },
    {
      prompt: "48 × 5 = ?",
      method: "×5 = ×10 then ÷2 → 480 ÷ 2 = 240",
      answer: "240",
    },
    {
      prompt: "15% of 320 = ?",
      method: "10% = 32; 5% = 16; total = 48",
      answer: "48",
    },
    {
      prompt: "35² = ?",
      method: "Ends in 5: 3×4 = 12 → append 25 → 1,225",
      answer: "1225",
    },
  ],
  flashcardsSuffix: "(Destabilising category) for more number drills.",
};
