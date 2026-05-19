import type { InterviewSessionAnswer, InterviewSessionRecord } from "@/lib/storage";
import { getCategoryLabel } from "@/lib/categories";
import { SECTOR_DATA } from "@/data/sector-data";
import type { SectorId } from "@/lib/sectors";

function answerResourceLink(a: InterviewSessionAnswer): string | null {
  if (a.itemKind === "deal") {
    return `[Fiche deal — ${a.label}](/actualite?deal=${encodeURIComponent(a.itemId)})`;
  }
  if (a.itemKind === "sector") {
    const sectorId = a.itemId as SectorId;
    const emblematic = SECTOR_DATA[sectorId]?.emblematicDealId;
    const sectorLink = `[Fiche secteur — ${a.label}](/?tab=secteurs&sector=${encodeURIComponent(a.itemId)})`;
    if (emblematic) {
      return `${sectorLink} · [Deal emblématique](/actualite?deal=${encodeURIComponent(emblematic)})`;
    }
    return sectorLink;
  }
  if (a.itemKind === "opening") {
    return "[Guide CV](/cv)";
  }
  return null;
}

export function buildInterviewMarkdown(
  session: InterviewSessionRecord,
  weakCategories: { cat: string; avg: number }[],
): string {
  const date = new Date(session.startedAt).toLocaleString("fr-FR");
  const lines: string[] = [
    `# Rapport entretien — ${session.mode === "full" ? "Simulation 30 min" : "Mini-entretien"}`,
    "",
    `- **Date :** ${date}`,
    `- **Durée :** ${Math.round(session.durationMs / 60000)} min`,
    `- **Questions :** ${session.packSize}`,
    `- **Note moyenne :** ${session.avgStars.toFixed(1)} / 5`,
    "",
    "## Réponses",
    "",
  ];

  for (const a of session.answers) {
    const struct = a.structureOk ? "oui" : "non";
    const nums = a.numbersOk ? "oui" : "non";
    const resource = answerResourceLink(a);
    lines.push(
      `### ${a.label}`,
      "",
      `**Question :** ${a.question}`,
      "",
      `- Note : ${a.stars}/5`,
      `- Structure (Pyramid/STAR) : ${struct}`,
      `- Chiffres / précision : ${nums}`,
      `- Temps : ${Math.round(a.timeMs / 1000)}s`,
    );
    if (resource) {
      lines.push(`- Ressource : ${resource}`);
    }
    lines.push("");
  }

  if (weakCategories.length > 0) {
    lines.push("## Points faibles", "");
    for (const w of weakCategories) {
      lines.push(`- ${getCategoryLabel(w.cat)} (moy. ${w.avg.toFixed(1)}★)`);
    }
    lines.push("");
  }

  const dealLinks = session.answers
    .filter((a) => a.itemKind === "deal")
    .map((a) => answerResourceLink(a))
    .filter(Boolean);

  lines.push(
    "## Ressources",
    "",
    "- [Guide CV — Walk me through your CV](/cv)",
    "- [Pyramid Principle + STAR](/pyramid)",
    "- [Indicateurs macro](/actualite#indicateurs-macro)",
  );

  if (dealLinks.length > 0) {
    for (const link of dealLinks) {
      lines.push(`- ${link}`);
    }
  } else {
    lines.push("- [Actualité M&A](/actualite)");
  }

  lines.push("");

  return lines.join("\n");
}

export function computeWeakCategories(
  answers: InterviewSessionAnswer[],
): { cat: string; avg: number }[] {
  const byCat: Record<string, number[]> = {};
  for (const a of answers) {
    if (a.category === "opening") continue;
    byCat[a.category] = byCat[a.category] ?? [];
    if (a.stars > 0) byCat[a.category]!.push(a.stars);
  }
  return Object.entries(byCat)
    .map(([cat, stars]) => ({
      cat,
      avg: stars.reduce((s, n) => s + n, 0) / stars.length,
    }))
    .filter((x) => x.avg <= 3)
    .sort((a, b) => a.avg - b.avg);
}
