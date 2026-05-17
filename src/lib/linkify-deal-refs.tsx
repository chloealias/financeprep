import { Link } from "@tanstack/react-router";
import { isValidDealId } from "@/data/ma-deals";

const DEAL_REF_PATTERN = /\b(?:deal\s+)?(d\d{2})\b/gi;

type TextPart = { type: "text"; value: string } | { type: "deal"; id: string };

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

type DealRefTextProps = {
  text: string;
  className?: string;
};

/** Affiche un texte en transformant les références « deal d02 » / « d02 » en liens Actualité. */
export function DealRefText({ text, className }: DealRefTextProps) {
  const parts = splitDealRefs(text);
  if (parts.length === 1 && parts[0]?.type === "text") {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.type === "text" ? (
          <span key={i}>{part.value}</span>
        ) : (
          <Link
            key={i}
            to="/actualite"
            search={{ deal: part.id }}
            className="text-blue-700 hover:text-blue-900 underline underline-offset-2 font-medium"
          >
            deal {part.id}
          </Link>
        ),
      )}
    </span>
  );
}
