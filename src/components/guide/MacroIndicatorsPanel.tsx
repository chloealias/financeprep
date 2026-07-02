import { MACRO_SNAPSHOT } from "@/data/macro-indicators";
import { GuideSectionTitle } from "@/components/guide/guide-ui";

function formatUpdatedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function MacroIndicatorsPanel() {
  const { quarter, updatedAt, sources, indicators } = MACRO_SNAPSHOT;

  return (
    <section id="indicateurs-macro" className="scroll-mt-24 mb-8 min-w-0">
      <GuideSectionTitle>Indicateurs macro à connaître</GuideSectionTitle>
      <p className="text-muted-foreground text-xs font-light mb-4 break-words">
        Dernière MAJ : {quarter} · {formatUpdatedAt(updatedAt)}
        {sources.length > 0 && (
          <span className="text-primary"> — Sources : {sources.join(", ")}</span>
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
                <span className="text-primary uppercase tracking-wider text-[10px] font-medium">
                  Entretien ·{" "}
                </span>
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
              {["Indicateur", "Niveau", "Évol.", "En entretien"].map((h) => (
                <th key={h} className="px-2 py-2 text-left uppercase tracking-wider font-semibold">
                  {h}
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
