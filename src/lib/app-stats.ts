import { questions } from "@/data/questions";
import { concepts } from "@/data/concepts";
import { BANK_LIST } from "@/data/bank-profiles";
import { MA_DEALS } from "@/data/ma-deals";

export const SPLASH_PHRASES = [
  "Préparez vos entretiens en finance",
  "Questions · Notions · Simulations",
  "M&A · Valorisation · LBO",
] as const;

export function getAppStats() {
  return {
    questions: questions.length,
    concepts: concepts.length,
    banks: BANK_LIST.length,
    deals: MA_DEALS.length,
  };
}
