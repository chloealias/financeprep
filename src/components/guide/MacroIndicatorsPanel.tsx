import { getMacroSnapshot } from "@/data/macro-indicators";
import { GuideSectionTitle } from "@/components/guide/guide-ui";
import { useT } from "@/hooks/useT";
import { formatDate } from "@/lib/i18n/format";

export function MacroIndicatorsPanel() {
  const { t, locale } = useT();
  const { quarter, updatedAt, sources, indicators } = getMacroSnapshot(locale);

  return (
    <section id="indicateurs-macro" className="scroll-mt-24 mb-8 min-w-0">
      <GuideSectionTitle>{t("guide.macro.title")}</GuideSectionTitle>
      <p className="text-muted-foreground text-xs font-light mb-4 break-words">
        {t("guide.macro.lastUpdate", {
          quarter,
          date: formatDate(updatedAt, locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        })}
        {sources.length > 0 && (
          <span className="text-primary">
            {" "}
            {t("guide.macro.sources", { sources: sources.join(", ") })}
          </span>
        )}
      </p>

      {/* Mobile : cartes empilées (pas de scroll horizontal) */}
      <ul className="sm:hidden space-y-2">
        {indicators.map((row) => (
          <li
            key={row.id}
            className="bg-card border border-border rounded-lg px-3 py-2.5 text-xs shadow-sm"
          >
            <div className="font-semibold text-foreground leading-snug">{row.label}</div>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-foreground font-medium">{row.value}</span>
              {row.delta && <span className="text-muted-foreground font-light">{row.delta}</span>}
            </div>
            {row.interviewNote && (
              <p className="mt-1.5 text-muted-foreground font-light leading-snug border-t border-border pt-1.5">
                <span className="text-primary type-label">{t("guide.macro.interviewPrefix")} </span>
                {row.interviewNote}
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* sm+ : tableau compact, largeur 100 % du conteneur */}
      <div className="hidden sm:block bg-card border border-border rounded-xl overflow-hidden shadow-sm min-w-0">
        <table className="w-full table-fixed text-xs">
          <colgroup>
            <col className="w-[26%]" />
            <col className="w-[20%]" />
            <col className="w-[16%]" />
            <col className="w-[38%]" />
          </colgroup>
          <thead className="bg-primary text-primary-foreground">
            <tr>
              {[
                "guide.macro.col.indicator",
                "guide.macro.col.level",
                "guide.macro.col.change",
                "guide.macro.col.interview",
              ].map((key) => (
                <th
                  key={key}
                  className="px-2 py-2 text-left uppercase tracking-wider font-semibold"
                >
                  {t(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {indicators.map((row, ri) => (
              <tr key={row.id} className={ri % 2 === 0 ? "bg-muted/40" : "bg-card"}>
                <td className="px-2 py-2 font-semibold text-foreground align-top break-words">
                  {row.label}
                </td>
                <td className="px-2 py-2 text-foreground font-medium align-top break-words">
                  {row.value}
                </td>
                <td className="px-2 py-2 text-muted-foreground font-light align-top break-words">
                  {row.delta ?? "—"}
                </td>
                <td className="px-2 py-2 text-muted-foreground font-light align-top break-words leading-snug">
                  {row.interviewNote ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
