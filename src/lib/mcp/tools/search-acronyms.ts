import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getAcronymSections } from "@/data/acronyms";
import { isAppLocale } from "@/lib/i18n/types";

export default defineTool({
  name: "search_acronyms",
  title: "Search finance acronyms",
  description:
    "Search the finance acronym glossary by abbreviation, English name, or French translation. Returns matching entries with their section.",
  inputSchema: {
    query: z
      .string()
      .describe("Keyword to match against abbreviation, English label, or French definition. Empty returns all.")
      .default(""),
    limit: z.number().int().describe("Max number of results.").default(50),
    locale: z
      .enum(["fr", "en"])
      .describe("Locale for section titles (fr default).")
      .default("fr"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit, locale }) => {
    const q = query.trim().toLowerCase();
    const sectionLocale = isAppLocale(locale) ? locale : "fr";
    const results: Array<{ section: string; abbr: string; english: string | null; french: string }> = [];
    for (const section of getAcronymSections(sectionLocale)) {
      for (const item of section.items) {
        const hay = `${item.abbr} ${item.english ?? ""} ${item.french}`.toLowerCase();
        if (!q || hay.includes(q)) {
          results.push({
            section: section.title,
            abbr: item.abbr,
            english: item.english ?? null,
            french: item.french,
          });
          if (results.length >= Math.max(1, Math.min(limit, 500))) break;
        }
      }
      if (results.length >= Math.max(1, Math.min(limit, 500))) break;
    }
    return {
      content: [{ type: "text", text: JSON.stringify({ count: results.length, results }, null, 2) }],
      structuredContent: { count: results.length, results },
    };
  },
});
