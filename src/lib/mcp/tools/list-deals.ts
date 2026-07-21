import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { MA_DEALS } from "@/data/ma-deals";

export default defineTool({
  name: "list_ma_deals",
  title: "List M&A deals",
  description:
    "List recent M&A / LBO / IPO / restructuring deals covered in the app, with parties, banks, and interview angles. Filter by keyword, type, or sector.",
  inputSchema: {
    query: z.string().describe("Free-text keyword filter.").default(""),
    type: z
      .string()
      .optional()
      .describe("Deal type filter (e.g. 'M&A', 'IPO', 'LBO', 'Carve-out', 'Restructuring', 'OPA', 'Cessions', 'Tendance')."),
    sectorId: z.string().optional().describe("Sector id filter."),
    limit: z.number().int().default(20),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, type, sectorId, limit }) => {
    const q = query.trim().toLowerCase();
    const results = MA_DEALS.filter((d: any) => {
      if (type && d.type !== type) return false;
      if (sectorId && d.sectorId !== sectorId) return false;
      if (!q) return true;
      const hay = `${d.title} ${d.secteur} ${(d.banks ?? []).join(" ")} ${d.pointEntretien ?? ""}`.toLowerCase();
      return hay.includes(q);
    })
      .slice(0, Math.max(1, Math.min(limit, 100)))
      .map((d: any) => ({
        id: d.id,
        title: d.title,
        dates: d.dates,
        type: d.type,
        secteur: d.secteur,
        sectorId: d.sectorId ?? null,
        headlineEv: d.headlineEv,
        banks: d.banks,
        pointEntretien: d.pointEntretien,
        interviewAngles: d.interviewAngles ?? [],
      }));

    return {
      content: [{ type: "text", text: JSON.stringify({ count: results.length, results }, null, 2) }],
      structuredContent: { count: results.length, results },
    };
  },
});
