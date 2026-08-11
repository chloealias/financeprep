import { Link } from "@tanstack/react-router";
import {
  GuideIntro,
  GuideSectionTitle,
  GuideChipButton,
  guideCardClass,
} from "@/components/guide/guide-ui";
import { useDiagnosticState } from "@/components/guide/useDiagnosticState";
import { getGuideDiagnostic, getDiagnosticTechnicalItemIds } from "@/data/guide/diagnostic";
import { useT } from "@/hooks/useT";
import { countTechnicalReview, diagnosticTier } from "@/lib/diagnostic-score";

export function BlocDiagnostic() {
  const { t, locale } = useT();
  const content = getGuideDiagnostic(locale);
  const itemIds = getDiagnosticTechnicalItemIds(content);
  const { state, setTechnical, toggleFit } = useDiagnosticState();

  const { reviewCount, evaluatedCount } = countTechnicalReview(state.technical, itemIds);
  const tier = diagnosticTier(reviewCount, evaluatedCount);

  const diagnosticText =
    tier === "none"
      ? content.diagnosticNone
      : tier === "ready"
        ? content.diagnosticReady
        : tier === "priority"
          ? content.diagnosticPriority
          : content.diagnosticCoaching;

  return (
    <div className="space-y-10">
      <section id="technical">
        <GuideSectionTitle>{t("guide.diagnostic.technicalTitle")}</GuideSectionTitle>
        <GuideIntro>{content.technicalIntro}</GuideIntro>
        <p className="text-xs text-primary mb-4">
          {t("guide.diagnostic.reviewCounter", {
            review: reviewCount,
            evaluated: evaluatedCount,
            total: itemIds.length,
          })}
        </p>
        <div className="space-y-6">
          {content.technicalSections.map((section) => (
            <div key={section.id} className={`${guideCardClass} p-4 sm:p-5`}>
              <h3 className="text-base font-serif text-foreground mb-3">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item) => {
                  const status = state.technical[item.id];
                  return (
                    <li
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                    >
                      <span className="text-sm text-foreground flex-1 min-w-0">{item.text}</span>
                      <div className="flex gap-2 shrink-0">
                        <GuideChipButton
                          size="sm"
                          active={status === "mastered"}
                          onClick={() => setTechnical(item.id, "mastered")}
                        >
                          {t("guide.diagnostic.mastered")}
                        </GuideChipButton>
                        <GuideChipButton
                          size="sm"
                          active={status === "review"}
                          onClick={() => setTechnical(item.id, "review")}
                        >
                          {t("guide.diagnostic.review")}
                        </GuideChipButton>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="fit">
        <GuideSectionTitle>{t("guide.diagnostic.fitTitle")}</GuideSectionTitle>
        <p className="text-sm text-muted-foreground mb-4">{t("guide.diagnostic.fitIntro")}</p>

        <h3 className="text-sm font-semibold text-foreground mb-2">
          {t("guide.diagnostic.fitPresentationTitle")}
        </h3>
        <div className="space-y-2 mb-6">
          {content.fitPresentation.map((item) => (
            <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!state.fit[item.id]}
                onChange={(e) => toggleFit(item.id, e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-primary"
              />
              <span
                className={`text-sm ${state.fit[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}
              >
                {item.text}
              </span>
            </label>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-foreground mb-2">
          {t("guide.diagnostic.fitStarTitle")}
        </h3>
        <div className="space-y-2">
          {content.fitStar.map((item) => (
            <div key={item.id} className="flex items-center gap-3 flex-wrap">
              <label className="flex items-center gap-3 cursor-pointer group flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={!!state.fit[item.id]}
                  onChange={(e) => toggleFit(item.id, e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span
                  className={`text-sm ${state.fit[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}
                >
                  {item.text}
                </span>
              </label>
              <Link
                to={item.href}
                className="text-xs font-medium text-primary hover:text-primary/80 whitespace-nowrap"
              >
                {t("guide.diagnostic.starLink")}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className={`${guideCardClass} p-5 sm:p-6`}>
        <GuideSectionTitle className="mb-3">{t("guide.diagnostic.globalTitle")}</GuideSectionTitle>
        <p className="text-xs text-muted-foreground mb-2">
          {t("guide.diagnostic.reviewCounter", {
            review: reviewCount,
            evaluated: evaluatedCount,
            total: itemIds.length,
          })}
        </p>
        <p className="text-sm text-foreground leading-relaxed">{diagnosticText}</p>
      </section>
    </div>
  );
}
