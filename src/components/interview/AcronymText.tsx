import { useMemo, useState } from "react";
import { acronymSections } from "@/data/acronyms";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

type AcronymPart =
  | { type: "text"; value: string }
  | { type: "acronym"; value: string; french: string; english?: string };

type AcronymTextProps = {
  text: string;
  className?: string;
};

export function AcronymText({ text, className }: AcronymTextProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const parts = useMemo((): AcronymPart[] => {
    const matches = findAcronyms(text);
    if (matches.length === 0) return [{ type: "text", value: text }];

    const out: AcronymPart[] = [];
    let cursor = 0;
    for (const m of matches) {
      if (m.start < cursor) continue;
      if (m.start > cursor) out.push({ type: "text", value: text.slice(cursor, m.start) });
      out.push({
        type: "acronym",
        value: text.slice(m.start, m.end),
        french: m.french,
        english: m.english,
      });
      cursor = m.end;
    }
    if (cursor < text.length) out.push({ type: "text", value: text.slice(cursor) });
    return out;
  }, [text]);

  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.type === "acronym" ? (
          <Popover
            key={i}
            open={openIndex === i}
            onOpenChange={(open) => setOpenIndex(open ? i : null)}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline underline decoration-dotted decoration-primary/50 cursor-pointer font-medium text-inherit bg-transparent border-0 p-0 m-0 align-baseline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {p.value}
              </button>
            </PopoverTrigger>
            <PopoverContent className="space-y-1" side="top" collisionPadding={12}>
              {p.english && (
                <p className="text-xs font-medium text-muted-foreground leading-snug">{p.english}</p>
              )}
              <p className="text-sm text-foreground leading-snug">{p.french}</p>
            </PopoverContent>
          </Popover>
        ) : (
          <span key={i}>{p.value}</span>
        ),
      )}
    </span>
  );
}
