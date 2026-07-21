import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { concepts } from "@/data/concepts";

export default defineTool({
  name: "list_concepts",
  title: "List finance concepts",
  description:
    "List the finance concept sheets (EV/Equity, DCF, WACC, LBO mechanics, accretion/dilution, etc.). Optionally filter by category or fetch a specific concept by id.",
  inputSchema: {
    id: z.string().optional().describe("If provided, return only the concept with this id (e.g. 'c1')."),
    category: z.string().optional().describe("Optional category filter."),
    includeDeepDive: z
      .boolean()
      .describe("Include the long-form explanation and tables. Set to false for a compact list.")
      .default(false),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id, category, includeDeepDive }) => {
    const filtered = concepts.filter((c: any) => {
      if (id && c.id !== id) return false;
      if (category && c.category !== category) return false;
      return true;
    });

    const results = filtered.map((c: any) => ({
      id: c.id,
      category: c.category,
      title: c.title,
      simple: c.simple,
      formula: c.formula ?? null,
      ...(includeDeepDive
        ? { deepDive: c.deepDive ?? null, table: c.table ?? null, pitfalls: c.pitfalls ?? [] }
        : {}),
    }));

    return {
      content: [{ type: "text", text: JSON.stringify({ count: results.length, results }, null, 2) }],
      structuredContent: { count: results.length, results },
    };
  },
});
