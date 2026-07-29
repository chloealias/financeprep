import type { InterviewSessionAnswer, InterviewSessionRecord } from "@/lib/storage";
import { getCategoryLabel } from "@/lib/categories";
import { getSectorData } from "@/data/sector-data";
import type { SectorId } from "@/lib/sectors";
import type { TranslateFn } from "@/lib/i18n/t";
import { createTranslator } from "@/lib/i18n/t";
import { formatDateTime } from "@/lib/i18n/format";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/types";

function answerResourceLink(
  a: InterviewSessionAnswer,
  translate: TranslateFn,
  locale: AppLocale = DEFAULT_LOCALE,
): string | null {
  if (a.itemKind === "deal") {
    const label = translate("interviewReport.link.dealSheet", { label: a.label });
    return `[${label}](/actualite?deal=${encodeURIComponent(a.itemId)})`;
  }
  if (a.itemKind === "sector") {
    const sectorId = a.itemId as SectorId;
    const emblematic = getSectorData(locale)[sectorId]?.emblematicDealId;
    const label = translate("interviewReport.link.sectorSheet", { label: a.label });
    const sectorLink = `[${label}](/?tab=secteurs&sector=${encodeURIComponent(a.itemId)})`;
    if (emblematic) {
      const dealLabel = translate("interviewReport.link.emblematicDeal");
      return `${sectorLink} · [${dealLabel}](/actualite?deal=${encodeURIComponent(emblematic)})`;
    }
    return sectorLink;
  }
  if (a.itemKind === "opening") {
    return `[${translate("interviewReport.link.cvGuide")}](/cv)`;
  }
  return null;
}

export function buildInterviewMarkdown(
  session: InterviewSessionRecord,
  weakCategories: { cat: string; avg: number }[],
  locale: AppLocale = DEFAULT_LOCALE,
): string {
  const translate = createTranslator(locale);
  const sep = translate("interviewReport.labelSeparator");
  const date = formatDateTime(session.startedAt, locale);
  const mode = translate(
    session.mode === "full" ? "interviewReport.mode.full" : "interviewReport.mode.mini",
  );
  const lines: string[] = [
    `# ${translate("interviewReport.title", { mode })}`,
    "",
    `- **${translate("interviewReport.date")}${sep}** ${date}`,
    `- **${translate("interviewReport.duration")}${sep}** ${Math.round(session.durationMs / 60000)} min`,
    `- **${translate("interviewReport.questions")}${sep}** ${session.packSize}`,
    `- **${translate("interviewReport.avgScore")}${sep}** ${session.avgStars.toFixed(1)} / 5`,
    "",
    `## ${translate("interviewReport.answersHeading")}`,
    "",
  ];

  const yes = translate("interviewReport.yes");
  const no = translate("interviewReport.no");

  for (const a of session.answers) {
    const struct = a.structureOk ? yes : no;
    const nums = a.numbersOk ? yes : no;
    const resource = answerResourceLink(a, translate, locale);
    lines.push(
      `### ${a.label}`,
      "",
      `**${translate("interviewReport.questionLabel")}${sep}** ${a.question}`,
      "",
      `- ${translate("interviewReport.score")}${sep} ${a.stars}/5`,
      `- ${translate("interviewReport.structure")}${sep} ${struct}`,
      `- ${translate("interviewReport.numbers")}${sep} ${nums}`,
      `- ${translate("interviewReport.time")}${sep} ${Math.round(a.timeMs / 1000)}s`,
    );
    if (resource) {
      lines.push(`- ${translate("interviewReport.resource")}${sep} ${resource}`);
    }
    lines.push("");
  }

  if (weakCategories.length > 0) {
    lines.push(`## ${translate("interviewReport.weakHeading")}`, "");
    for (const w of weakCategories) {
      lines.push(
        `- ${translate("interviewReport.weakLine", {
          label: getCategoryLabel(w.cat, translate),
          avg: w.avg.toFixed(1),
        })}`,
      );
    }
    lines.push("");
  }

  const dealLinks = session.answers
    .filter((a) => a.itemKind === "deal")
    .map((a) => answerResourceLink(a, translate, locale))
    .filter(Boolean);

  lines.push(
    `## ${translate("interviewReport.resourcesHeading")}`,
    "",
    `- [${translate("interviewReport.link.cvGuideFull")}](/cv)`,
    `- [${translate("interviewReport.link.pyramid")}](/pyramid)`,
    `- [${translate("interviewReport.link.macro")}](/actualite#indicateurs-macro)`,
  );

  if (dealLinks.length > 0) {
    for (const link of dealLinks) {
      lines.push(`- ${link}`);
    }
  } else {
    lines.push(`- [${translate("interviewReport.link.actualite")}](/actualite)`);
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
