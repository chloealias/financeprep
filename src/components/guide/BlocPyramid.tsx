import { GuideIntro, GuideSectionTitle } from "@/components/guide/guide-ui";
import { getGuidePyramid } from "@/data/guide/pyramid";
import { useT } from "@/hooks/useT";

export function BlocPyramid() {
  const { t, locale } = useT();
  const content = getGuidePyramid(locale);

  return (
    <>
      <GuideIntro>{content.intro}</GuideIntro>

      <div className="mb-8">
        <GuideSectionTitle>{t("guide.pyramid.section.pyramid")}</GuideSectionTitle>
        <svg
          viewBox="0 0 500 300"
          className="w-full h-auto max-w-lg mx-auto mb-6"
          role="img"
          aria-label={t("guide.pyramid.svgLabel")}
        >
          <defs>
            <clipPath id="pyramid-tier-top">
              <polygon points="250,28 169,115 331,115" />
            </clipPath>
          </defs>
          <polygon
            points="250,28 169,115 331,115"
            fill="#1e3a8a"
            shapeRendering="geometricPrecision"
          />
          <g clipPath="url(#pyramid-tier-top)">
            <text
              x="250"
              y="84"
              fontSize="8"
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
              fontWeight="bold"
            >
              {content.svg.conclusion}
            </text>
            <text
              x="250"
              y="100"
              fontSize="7"
              fill="#bfdbfe"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {content.svg.conclusionHint}
            </text>
          </g>
          <polygon
            points="169,115 331,115 408,200 92,200"
            fill="#3b82f6"
            shapeRendering="geometricPrecision"
          />
          <text
            x="250"
            y="162"
            fontSize="11"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
          >
            {content.svg.arguments}
          </text>
          <text
            x="250"
            y="182"
            fontSize="9"
            fill="#dbeafe"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {content.svg.argumentsHint}
          </text>
          <polygon
            points="92,200 408,200 485,285 15,285"
            fill="#93c5fd"
            shapeRendering="geometricPrecision"
          />
          <text
            x="250"
            y="248"
            fontSize="11"
            fill="#1e3a8a"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
          >
            {content.svg.evidence}
          </text>
          <text
            x="250"
            y="268"
            fontSize="9"
            fill="#1e40af"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {content.svg.evidenceHint}
          </text>
        </svg>
        <div className="bg-primary text-primary-foreground rounded-xl p-5 mb-6">
          <div className="text-primary-foreground/80 text-xs uppercase tracking-[0.2em] mb-2">
            {t("guide.pyramid.goldenRule")}
          </div>
          <p className="font-light">{content.goldenRuleBody}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="text-red-700 text-xs font-semibold uppercase tracking-wider mb-2">
              {t("guide.pyramid.withoutPyramid")}
            </div>
            <p className="text-red-800 text-sm font-light italic">{content.withoutExample}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">
              {t("guide.pyramid.withPyramid")}
            </div>
            <p className="text-emerald-800 text-sm font-light italic space-y-2">
              <span className="block">
                <span className="font-semibold not-italic text-emerald-900">
                  {content.withExample.conclusionLabel}
                </span>{" "}
                {content.withExample.conclusion}
              </span>
              <span className="block">
                <span className="font-semibold not-italic text-emerald-900">
                  {content.withExample.argumentsLabel}
                </span>{" "}
                {content.withExample.arguments}
              </span>
              <span className="block">
                <span className="font-semibold not-italic text-emerald-900">
                  {content.withExample.evidenceLabel}
                </span>{" "}
                {content.withExample.evidence}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle>{t("guide.pyramid.section.star")}</GuideSectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          {content.starCards.map((card) => (
            <div key={card.letter} className="bg-card border-2 border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground font-serif text-xl flex items-center justify-center">
                  {card.letter}
                </div>
                <span className="font-serif text-foreground text-lg">{card.label}</span>
              </div>
              <div className="text-foreground text-sm mb-2">{card.quoi}</div>
              <div className="bg-red-50 rounded-lg px-3 py-2 mb-2 text-red-700 text-xs">
                ⚠ {card.erreur}
              </div>
              <div className="bg-muted rounded-lg px-3 py-2 text-muted-foreground text-xs italic">
                "{card.exemple}"
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <GuideSectionTitle>{t("guide.pyramid.section.matrix")}</GuideSectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-4 py-3 rounded-tl-lg font-medium">
                  {t("guide.pyramid.table.question")}
                </th>
                <th className="px-4 py-3 font-medium text-center">
                  {t("guide.pyramid.table.pyramid")}
                </th>
                <th className="px-4 py-3 rounded-tr-lg font-medium text-center">
                  {t("guide.pyramid.table.star")}
                </th>
              </tr>
            </thead>
            <tbody>
              {content.matrix.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-muted" : "bg-card"}>
                  <td className="px-4 py-3 text-foreground">{row.q}</td>
                  <td className="px-4 py-3 text-center">
                    {row.pyramid ? (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                        {t("guide.pyramid.table.yes")}
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded text-xs">
                        —
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.star ? (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                        {t("guide.pyramid.table.yes")}
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded text-xs">
                        —
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 mb-8">
        <GuideSectionTitle>{t("guide.pyramid.section.timeBuying")}</GuideSectionTitle>
        <p className="text-muted-foreground text-sm font-light mb-4">{content.timeBuyingIntro}</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">
              {t("guide.pyramid.usefulPhrases")}
            </div>
            <ul className="text-foreground text-sm space-y-2 list-disc list-inside">
              {content.usefulPhrases.map((phrase) => (
                <li key={phrase}>{phrase}</li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold mb-2">
              {t("guide.pyramid.toAvoid")}
            </div>
            <ul className="text-foreground text-sm space-y-2 list-disc list-inside">
              {content.avoidPhrases.map((phrase) => (
                <li key={phrase}>{phrase}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-muted-foreground text-xs font-light italic">{content.timeBuyingRule}</p>
      </div>
    </>
  );
}
