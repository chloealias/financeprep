import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getConcepts } from "@/data/concepts";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/types";

export default defineTool({
  name: "list_concepts",
  title: "List finance concepts",
  description:
    "List the finance concept sheets (EV/Equity, DCF, WACC, LBO mechanics, accretion/dilution, etc.). Optionally filter by category or fetch a specific concept by id.",
  inputSchema: {
    id: z.string().optional().describe("If provided, return only the concept with this id (e.g. 'c1')."),
    category: z.string().optional().describe("Optional category filter."),
    locale: z
      .enum(["fr", "en"])
      .optional()
      .describe("Content locale. Defaults to French."),
    includeDeepDive: z
      .boolean()
      .describe("Include the long-form explanation and tables. Set to false for a compact list.")
      .default(false),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id, category, locale, includeDeepDive }) => {
    const contentLocale = (locale ?? DEFAULT_LOCALE) as AppLocale;
    const filtered = getConcepts(contentLocale).filter((c) => {
      if (id && c.id !== id) return false;
      if (category && c.category !== category) return false;
      return true;
    });

    const results = filtered.map((c) => ({
      id: c.id,
      category: c.category,
      title: c.title,
      simple: c.simple,
      formula: c.formula ?? null,
      ...(includeDeepDive
        ? {
            intuition: c.intuition ?? null,
            steps: c.steps ?? null,
            example: c.example ?? null,
            interview: c.interview ?? null,
            deepDive: c.deepDive ?? null,
            table: c.table ?? null,
            pitfalls: c.pitfalls ?? [],
          }
        : {}),
    }));

    return {
      content: [{ type: "text", text: JSON.stringify({ count: results.length, results }, null, 2) }],
      structuredContent: { count: results.length, results },
    };
  },
});
