import { isValidDealId } from "@/data/ma-deals";

const DEAL_REF_PATTERN = /\b(?:deal\s+)?(d\d{2})\b/gi;

export type TextPart = { type: "text"; value: string } | { type: "deal"; id: string };

export function splitDealRefs(text: string): TextPart[] {
  const parts: TextPart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(DEAL_REF_PATTERN.source, DEAL_REF_PATTERN.flags);

  while ((match = re.exec(text)) !== null) {
    const id = match[1]!.toLowerCase();
    if (!isValidDealId(id)) continue;
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "deal", id });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: "text", value: text }];
}
