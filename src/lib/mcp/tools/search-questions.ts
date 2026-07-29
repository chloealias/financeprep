import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getQuestions } from "@/data/questions";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/types";

export default defineTool({
  name: "search_questions",
  title: "Search interview questions",
  description:
    "Search the finance interview question bank by keyword and/or category (valuation, dcf, ma, lbo, accounting, ts, fit, etc.). Returns matching questions with their full model answers.",
  inputSchema: {
    query: z
      .string()
      .describe(
        "Free-text keyword matched against the question text and model answer. Use empty string to match all.",
      )
      .default(""),
    category: z
      .string()
      .optional()
      .describe(
        "Optional category filter (e.g. 'valuation', 'dcf', 'ma', 'lbo', 'accounting', 'ts', 'fit').",
      ),
    difficulty: z
      .string()
      .optional()
      .describe("Optional difficulty filter (e.g. 'basique', 'intermédiaire', 'avancé')."),
    locale: z
      .enum(["fr", "en"])
      .optional()
      .describe("Content locale. Defaults to French."),
    limit: z.number().int().describe("Max number of results. Use 20 by default.").default(20),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, category, difficulty, locale, limit }) => {
    const q = query.trim().toLowerCase();
    const contentLocale = (locale ?? DEFAULT_LOCALE) as AppLocale;
    const results = getQuestions(contentLocale)
      .filter((item) => {
        if (category && item.category !== category) return false;
        if (difficulty && item.difficulty !== difficulty) return false;
        if (!q) return true;
        const hay = [item.question, item.explanation, ...(item.steps ?? []), item.tip ?? ""]
          .join(" \n ")
          .toLowerCase();
        return hay.includes(q);
      })
      .slice(0, Math.max(1, Math.min(limit, 100)))
      .map((item) => ({
        id: item.id,
        category: item.category,
        difficulty: item.difficulty,
        question: item.question,
        explanation: item.explanation,
        steps: item.steps ?? [],
        tip: item.tip ?? null,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify({ count: results.length, results }, null, 2) }],
      structuredContent: { count: results.length, results },
    };
  },
});
