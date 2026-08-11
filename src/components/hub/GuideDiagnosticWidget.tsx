import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { countTechnicalReview, diagnosticTier } from "@/lib/diagnostic-score";
import { getGuideDiagnostic, getDiagnosticTechnicalItemIds } from "@/data/guide/diagnostic";
import { getGuideDiagnosticSummary } from "@/lib/guide-progress";
import { loadDiagnosticState } from "@/lib/storage";
import { useT } from "@/hooks/useT";

const TIER_LABEL_KEYS = {
  none: "hub.guide.diagnosticWidget.tier.none",
  ready: "hub.guide.diagnosticWidget.tier.ready",
  priority: "hub.guide.diagnosticWidget.tier.priority",
  coaching: "hub.guide.diagnosticWidget.tier.coaching",
} as const;

const BLOC_LABEL_KEYS = {
  technical: "hub.guide.diagnosticWidget.bloc.technical",
  fit: "hub.guide.diagnosticWidget.bloc.fit",
  networking: "hub.guide.diagnosticWidget.bloc.networking",
} as const;

export function GuideDiagnosticWidget({ className = "" }: { className?: string }) {
  const { t, locale } = useT();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const summary = useMemo(() => {
    if (!mounted) return null;
    return getGuideDiagnosticSummary(locale);
  }, [mounted, locale]);

  if (!mounted || !summary) {
    return (
      <div
        className={`rounded-2xl border border-border bg-card p-5 sm:p-6 animate-pulse mb-10 ${className}`}
      >
        <div className="h-6 w-48 bg-muted rounded mb-3" />
        <div className="h-4 w-full max-w-md bg-muted/60 rounded" />
      </div>
    );
  }

  const content = getGuideDiagnostic(locale);
  const itemIds = getDiagnosticTechnicalItemIds(content);
  const state = loadDiagnosticState();
  const { reviewCount, evaluatedCount } = countTechnicalReview(state.technical, itemIds);
  const tier = diagnosticTier(reviewCount, evaluatedCount);
  const { weakestBloc, blocHref } = summary;

  return (
    <section
      className={`rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6 mb-10 ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="type-section-title">{t("hub.guide.diagnosticWidget.title")}</h2>
          {tier === "none" ? (
            <p className="text-sm text-muted-foreground font-light mt-2 max-w-xl">
              {t("hub.guide.diagnosticWidget.empty")}
            </p>
          ) : (
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-2xl font-serif text-foreground tabular-nums">
                {t("hub.guide.diagnosticWidget.reviewCount", { count: reviewCount })}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                {t(TIER_LABEL_KEYS[tier])}
              </span>
            </div>
          )}
          {tier !== "none" && evaluatedCount > 0 && (
            <p className="text-xs text-muted-foreground mt-2 tabular-nums">
              {t("guide.diagnostic.reviewCounter", {
                review: reviewCount,
                evaluated: evaluatedCount,
                total: itemIds.length,
              })}
            </p>
          )}
        </div>

        <Link
          to={tier === "none" ? "/diagnostic" : blocHref.to}
          hash={tier === "none" ? undefined : blocHref.hash}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 shrink-0"
        >
          {tier === "none"
            ? t("hub.guide.diagnosticWidget.startCta")
            : t("hub.guide.diagnosticWidget.weakestCta", {
                bloc: t(BLOC_LABEL_KEYS[weakestBloc]),
              })}
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
