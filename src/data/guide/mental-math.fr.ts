import type { GuideMentalMathContent } from "./mental-math.types";

export const guideMentalMathFr: GuideMentalMathContent = {
  intro:
    "Le calcul mental est testé pour la vivacité et la gestion du stress — pas pour remplacer Excel. Méthode Trachtenberg et astuces % pour gagner 10–20 secondes par question.",
  trachtenbergBody:
    "Pour AB × 11 (deux chiffres) : unité = B ; milieu = A+B (retenue si ≥10) ; dizaine = A (+ retenue).",
  trachtenbergExample: "Ex. 53 × 11 → unité 3 ; 5+3=8 ; dizaine 5 → 583",
  times12Title: "×12 rapide",
  times12Body: "×12 = ×10 + ×2. Ex. 45 × 12 = 450 + 90 = 540.",
  pctTips: [
    { pct: "10 %", tip: "Décaler la virgule d'un rang" },
    { pct: "5 %", tip: "Moitié de 10 %" },
    { pct: "15 %", tip: "10 % + 5 %" },
    { pct: "20 %", tip: "÷5 ou ×2 sur 10 %" },
    { pct: "25 %", tip: "÷4" },
    { pct: "1 %", tip: "÷100 — ordre de grandeur" },
  ],
  drills: [
    {
      prompt: "27 × 11 = ?",
      method: "Trachtenberg ×11 : chiffre des unités = 7 ; milieu = 2+7=9 ; dizaines = 2 → 297",
      answer: "297",
    },
    {
      prompt: "48 × 5 = ?",
      method: "×5 = ×10 puis ÷2 → 480 ÷ 2 = 240",
      answer: "240",
    },
    {
      prompt: "15 % de 320 = ?",
      method: "10 % = 32 ; 5 % = 16 ; total = 48",
      answer: "48",
    },
    {
      prompt: "35² = ?",
      method: "Milieu de 5 : 3×4 = 12 → coller 25 → 1 225",
      answer: "1225",
    },
  ],
  flashcardsSuffix: "(catégorie Déstabilisantes) pour plus d'exercices chiffrés.",
};
