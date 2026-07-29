import { useMemo, useState } from "react";
import { acronymSections } from "@/data/acronyms";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useT } from "@/hooks/useT";

type AcronymMatch = {
  abbr: string;
  french: string;
  english?: string;
  start: number;
  end: number;
};

type AcronymEntry = { french: string; english?: string };

const ACRONYM_MAP = new Map<string, AcronymEntry>();

/**
 * Register primary abbr + space-slash aliases ("TRI / IRR" → TRI, IRR).
 * Does not split compact forms like EV/EBITDA (no spaces around /).
 */
function registerAbbr(rawAbbr: string, entry: AcronymEntry): void {
  const key = rawAbbr.toUpperCase();
  if (!ACRONYM_MAP.has(key)) ACRONYM_MAP.set(key, entry);

  if (rawAbbr.includes(" / ")) {
    for (const part of rawAbbr.split(" / ")) {
      const p = part.trim().toUpperCase();
      if (p && !ACRONYM_MAP.has(p)) ACRONYM_MAP.set(p, entry);
    }
  }
}

for (const section of acronymSections) {
  for (const item of section.items) {
    registerAbbr(item.abbr, { french: item.french, english: item.english });
  }
}

const SORTED_ABBRS = [...ACRONYM_MAP.keys()].sort((a, b) => b.length - a.length);

/** Word boundary: letters/digits continue a token; `/` starts a new token (so DSO matches in DSO/DIO). */
function isBoundary(c: string): boolean {
  return !/[A-Z0-9&]/.test(c);
}

export function findAcronyms(text: string): AcronymMatch[] {
  const matches: AcronymMatch[] = [];
  const upper = text.toUpperCase();
  for (const abbr of SORTED_ABBRS) {
    let idx = 0;
    while (idx < upper.length) {
      const pos = upper.indexOf(abbr, idx);
      if (pos === -1) break;
      const before = pos > 0 ? upper[pos - 1]! : " ";
      const after = pos + abbr.length < upper.length ? upper[pos + abbr.length]! : " ";
      if (isBoundary(before) && isBoundary(after)) {
        const entry = ACRONYM_MAP.get(abbr)!;
        matches.push({
          abbr,
          french: entry.french,
          english: entry.english,
          start: pos,
          end: pos + abbr.length,
        });
      }
      idx = pos + 1;
    }
  }
  const sorted = matches.sort((a, b) => a.start - b.start || b.end - a.end);
  const nonOverlapping: AcronymMatch[] = [];
  let cursor = 0;
  for (const m of sorted) {
    if (m.start < cursor) continue;
    nonOverlapping.push(m);
    cursor = m.end;
  }
  return nonOverlapping;
}

type AcronymPart =
  | { type: "text"; value: string }
  | { type: "acronym"; value: string; french: string; english?: string };

type AcronymTextProps = {
  text: string;
  className?: string;
};

export function AcronymText({ text, className }: AcronymTextProps) {
  const { locale } = useT();
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
              {locale === "en" ? (
                <>
                  <p className="text-sm text-foreground leading-snug">
                    {p.english ?? p.french}
                  </p>
                  {p.english && (
                    <p className="text-xs text-muted-foreground leading-snug">{p.french}</p>
                  )}
                </>
              ) : (
                <>
                  {p.english && (
                    <p className="text-xs font-medium text-muted-foreground leading-snug">
                      {p.english}
                    </p>
                  )}
                  <p className="text-sm text-foreground leading-snug">{p.french}</p>
                </>
              )}
            </PopoverContent>
          </Popover>
        ) : (
          <span key={i}>{p.value}</span>
        ),
      )}
    </span>
  );
}
