import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { GuideIntro, GuideSectionTitle } from "@/components/guide/guide-ui";
import { getGuideMentalMath } from "@/data/guide/mental-math";
import { useT } from "@/hooks/useT";

export function BlocMentalMath() {
  const { t, locale } = useT();
  const content = getGuideMentalMath(locale);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  return (
    <>
      <GuideIntro>{content.intro}</GuideIntro>

      <div className="mb-8">
        <GuideSectionTitle>{t("guide.mentalMath.section.trachtenberg")}</GuideSectionTitle>
        <div className="space-y-3 text-sm">
          <p className="text-foreground leading-relaxed">{content.trachtenbergBody}</p>
          <p className="text-muted-foreground font-light italic leading-relaxed">
            {content.trachtenbergExample}
          </p>
          <div>
            <p className="text-foreground font-medium mb-1">{content.times12Title}</p>
            <p className="text-muted-foreground font-light leading-relaxed">{content.times12Body}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle>{t("guide.mentalMath.section.percentages")}</GuideSectionTitle>
        <div className="grid sm:grid-cols-2 gap-3">
          {content.pctTips.map((row) => (
            <div key={row.pct} className="bg-muted rounded-lg px-3 py-2.5 text-sm">
              <span className="font-semibold text-foreground">{row.pct}</span>
              <span className="text-muted-foreground font-light"> — {row.tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle>{t("guide.mentalMath.section.drills")}</GuideSectionTitle>
        <div className="space-y-4">
          {content.drills.map((d, i) => (
            <div key={i}>
              <p className="text-foreground font-medium">{d.prompt}</p>
              {!revealed[i] ? (
                <button
                  type="button"
                  onClick={() => setRevealed((r) => ({ ...r, [i]: true }))}
                  className="mt-1 text-primary text-sm underline underline-offset-2 hover:text-primary/80"
                >
                  {t("guide.mentalMath.revealDrill")}
                </button>
              ) : (
                <div className="mt-1 space-y-1">
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    {d.method}
                  </p>
                  <p className="text-emerald-800 text-sm font-semibold">→ {d.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-xs font-light mt-4">
          <Link to="/flashcards" search={{ mode: "flashcards" }} className="underline">
            {t("guide.mentalMath.flashcardsLink")}
          </Link>{" "}
          {content.flashcardsSuffix}
        </p>
      </div>
    </>
  );
}
