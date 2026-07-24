import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { BANK_LIST } from "@/data/bank-profiles";

export default defineTool({
  name: "list_banks",
  title: "List investment bank profiles",
  description:
    "List the investment bank profiles covered in the app (bulge brackets, elite boutiques, French banks, etc.), with divisions, culture, and interview tips.",
  inputSchema: {
    id: z.string().optional().describe("If provided, return only the bank with this id (e.g. 'rothschild-co')."),
    category: z.string().optional().describe("Category id filter (e.g. 'elite-boutique', 'bulge-bracket')."),
    query: z.string().describe("Free-text keyword filter.").default(""),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id, category, query }) => {
    const q = query.trim().toLowerCase();
    const results = BANK_LIST.filter((b) => {
      if (id && b.id !== id) return false;
      if (category && b.categoryId !== category) return false;
      if (!q) return true;
      const hay = `${b.name} ${b.tagline} ${b.category} ${b.hq}`.toLowerCase();
      return hay.includes(q);
    }).map((b) => ({
      id: b.id,
      name: b.name,
      category: b.category,
      categoryId: b.categoryId,
      hq: b.hq,
      websiteUrl: b.websiteUrl,
      valeurs: b.valeurs,
      tagline: b.tagline,
      divisions: b.divisions,
      particularites: b.particularites,
      pointEntretien: b.pointEntretien,
      questionPiège: b.questionPiège,
      reponsePiège: b.reponsePiège,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify({ count: results.length, results }, null, 2) }],
      structuredContent: { count: results.length, results },
    };
  },
});
