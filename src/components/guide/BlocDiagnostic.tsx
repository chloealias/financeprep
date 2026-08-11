import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import {
  GuideIntro,
  GuideSectionTitle,
  GuideChipButton,
  guideCardClass,
} from "@/components/guide/guide-ui";
import { getGuideDiagnostic, getDiagnosticTechnicalItemIds } from "@/data/guide/diagnostic";
import { useT } from "@/hooks/useT";
import { countTechnicalReview, diagnosticTier } from "@/lib/diagnostic-score";
import {
  loadDiagnosticState,
  saveDiagnosticState,
  type DiagnosticState,
  type DiagnosticTechnicalStatus,
} from "@/lib/storage";

function useDiagnosticState() {
  const [state, setState] = useState<DiagnosticState>(() =>
    typeof window !== "undefined" ? loadDiagnosticState() : { technical: {}, fit: {}, networking: {} },
  );

  const persist = (next: DiagnosticState) => {
    setState(next);
    saveDiagnosticState(next);
  };

  const setTechnical = (id: string, status: DiagnosticTechnicalStatus) => {
    persist({
      ...state,
      technical: { ...state.technical, [id]: status },
    });
  };

  const toggleFit = (id: string, value: boolean) => {
    const fit = { ...state.fit };
    if (value) fit[id] = true;
    else delete fit[id];
    persist({ ...state, fit });
  };

  const toggleNetworking = (id: string, value: boolean) => {
    const networking = { ...state.networking };
    if (value) networking[id] = true;
    else delete networking[id];
    persist({ ...state, networking });
  };

  return { state, setTechnical, toggleFit, toggleNetworking };
}

function CopyTemplateButton({ text }: { text: string }) {
  const { t } = useT();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" aria-hidden />
          {t("guide.diagnostic.copied")}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" aria-hidden />
          {t("guide.diagnostic.copy")}
        </>
      )}
    </button>
  );
}

export function BlocDiagnostic() {
  const { t, locale } = useT();
  const content = getGuideDiagnostic(locale);
  const itemIds = getDiagnosticTechnicalItemIds(content);
  const { state, setTechnical, toggleFit, toggleNetworking } = useDiagnosticState();

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
      {/* Technique */}
      <section>
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

      {/* Fit */}
      <section>
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

      {/* Networking */}
      <section>
        <GuideSectionTitle>{t("guide.diagnostic.networkingTitle")}</GuideSectionTitle>

        <h3 className="text-sm font-semibold text-foreground mb-2">
          {t("guide.diagnostic.weeklyGoalsTitle")}
        </h3>
        <ul className="list-disc list-inside text-sm text-foreground space-y-1 mb-6">
          {content.networkingWeeklyGoals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>

        <h3 className="text-sm font-semibold text-foreground mb-2">
          {t("guide.diagnostic.prepTitle")}
        </h3>
        <div className="space-y-2 mb-6">
          {content.networkingPrep.map((item) => (
            <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!state.networking[item.id]}
                onChange={(e) => toggleNetworking(item.id, e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-primary"
              />
              <span
                className={`text-sm ${state.networking[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}
              >
                {item.text}
              </span>
            </label>
          ))}
        </div>

        <p className="text-sm text-foreground italic mb-4 border-l-2 border-primary pl-3">
          {content.networkingHook}
        </p>

        <h3 className="text-sm font-semibold text-foreground mb-3">
          {t("guide.diagnostic.templatesTitle")}
        </h3>
        <div className="space-y-4">
          {content.networkingTemplates.map((tpl) => (
            <div key={tpl.id} className={`${guideCardClass} p-4`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-medium text-foreground">{tpl.title}</h4>
                <CopyTemplateButton text={tpl.body} />
              </div>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">
                {tpl.body}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Diagnostic */}
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
