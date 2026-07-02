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
      <p className="text-blue-600 text-xs font-light mb-4 break-words">
        Dernière MAJ : {quarter} · {formatUpdatedAt(updatedAt)}
        {sources.length > 0 && (
          <span className="text-blue-400"> — Sources : {sources.join(", ")}</span>
        )}
      </p>

      {/* Mobile : cartes empilées (pas de scroll horizontal) */}
      <ul className="sm:hidden space-y-2">
        {indicators.map((row) => (
          <li
            key={row.id}
            className="bg-white border border-blue-200 rounded-lg px-3 py-2.5 text-xs shadow-sm"
          >
            <div className="font-semibold text-blue-950 leading-snug">{row.label}</div>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-blue-800 font-medium">{row.value}</span>
              {row.delta && <span className="text-blue-600 font-light">{row.delta}</span>}
            </div>
            {row.interviewNote && (
              <p className="mt-1.5 text-blue-700 font-light leading-snug border-t border-blue-100 pt-1.5">
                <span className="text-blue-400 uppercase tracking-wider text-[10px] font-medium">
                  Entretien ·{" "}
                </span>
                {row.interviewNote}
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* sm+ : tableau compact, largeur 100 % du conteneur */}
      <div className="hidden sm:block bg-white border border-blue-200 rounded-xl overflow-hidden shadow-sm min-w-0">
        <table className="w-full table-fixed text-xs">
          <colgroup>
            <col className="w-[26%]" />
            <col className="w-[20%]" />
            <col className="w-[16%]" />
            <col className="w-[38%]" />
          </colgroup>
          <thead className="bg-blue-900 text-white">
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
              <tr key={row.id} className={ri % 2 === 0 ? "bg-blue-50/40" : "bg-white"}>
                <td className="px-2 py-2 font-semibold text-blue-950 align-top break-words">
                  {row.label}
                </td>
                <td className="px-2 py-2 text-blue-800 font-medium align-top break-words">
                  {row.value}
                </td>
                <td className="px-2 py-2 text-blue-700 font-light align-top break-words">
                  {row.delta ?? "—"}
                </td>
                <td className="px-2 py-2 text-blue-800 font-light align-top break-words leading-snug">
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
