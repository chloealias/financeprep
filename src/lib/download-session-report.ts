import { buildInterviewMarkdown, computeWeakCategories } from "@/lib/interview-report";
import type { InterviewSessionRecord } from "@/lib/storage";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/types";

export function downloadSessionReport(
  session: InterviewSessionRecord,
  locale: AppLocale = DEFAULT_LOCALE,
): void {
  const weak = computeWeakCategories(session.answers);
  const md = buildInterviewMarkdown(session, weak, locale);
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date(session.startedAt).toISOString().slice(0, 10);
  a.href = url;
  a.download = `financeprep-${session.mode}-${date}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
