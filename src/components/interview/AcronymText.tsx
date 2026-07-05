import { useMemo } from "react";
import { acronymSections } from "@/data/acronyms";

type AcronymMatch = {
  abbr: string;
  french: string;
  english?: string;
  start: number;
  end: number;
};

const ACRONYM_MAP = new Map<string, { french: string; english?: string }>();
for (const section of acronymSections) {
  for (const item of section.items) {
    ACRONYM_MAP.set(item.abbr.toUpperCase(), { french: item.french, english: item.english });
  }
}

const SORTED_ABBRS = [...ACRONYM_MAP.keys()].sort((a, b) => b.length - a.length);

function findAcronyms(text: string): AcronymMatch[] {
  const matches: AcronymMatch[] = [];
  const upper = text.toUpperCase();
  for (const abbr of SORTED_ABBRS) {
    let idx = 0;
    while (idx < upper.length) {
      const pos = upper.indexOf(abbr, idx);
      if (pos === -1) break;
      const before = pos > 0 ? upper[pos - 1] : " ";
      const after = pos + abbr.length < upper.length ? upper[pos + abbr.length] : " ";
      const isBoundary = (c: string) => !/[A-Z0-9/]/.test(c);
      if (isBoundary(before!) && isBoundary(after!)) {
        matches.push({
          abbr,
          french: ACRONYM_MAP.get(abbr)!.french,
          english: ACRONYM_MAP.get(abbr)?.english,
          start: pos,
          end: pos + abbr.length,
        });
      }
      idx = pos + 1;
    }
  }
  return matches.sort((a, b) => a.start - b.start);
}

type AcronymTextProps = {
  text: string;
  className?: string;
};

export function AcronymText({ text, className }: AcronymTextProps) {
  const parts = useMemo(() => {
    const matches = findAcronyms(text);
    if (matches.length === 0) return [{ type: "text" as const, value: text }];

    const out: Array<{ type: "text" | "acronym"; value: string; title?: string }> = [];
    let cursor = 0;
    for (const m of matches) {
      if (m.start < cursor) continue;
      if (m.start > cursor) out.push({ type: "text", value: text.slice(cursor, m.start) });
      const title = m.english ? `${m.english} — ${m.french}` : m.french;
      out.push({ type: "acronym", value: text.slice(m.start, m.end), title });
      cursor = m.end;
    }
    if (cursor < text.length) out.push({ type: "text", value: text.slice(cursor) });
    return out;
  }, [text]);

  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.type === "acronym" ? (
          <abbr
            key={i}
            title={p.title}
            className="underline decoration-dotted decoration-primary/50 cursor-help font-medium"
          >
            {p.value}
          </abbr>
        ) : (
          <span key={i}>{p.value}</span>
        ),
      )}
    </span>
  );
}
