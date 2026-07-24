import React, { useEffect, useState, useTransition, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Library, Mic } from "lucide-react";
import { Visual } from "@/components/interview/Visual";
import { AcronymText } from "@/components/interview/AcronymText";
import { ClientOnly } from "@/components/hub/ClientOnly";
import { ConceptDetailSkeleton } from "@/components/hub/QuestionDetailSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import type { Concept } from "@/data/concepts";
import { hubBadgeClass, hubBadgeGroupClass } from "@/components/guide/guide-ui";
import { smoothScrollIntoViewAfterLayout } from "@/lib/scroll";
import { loadStudyMode, type StudyMode } from "@/lib/storage";
import { useT } from "@/hooks/useT";

type ConceptCardProps = {
  concept: Concept;
  isExpanded: boolean;
  onToggle: () => void;
  getCategoryLabel: (id: string) => string;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

function ConceptSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="text-foreground font-semibold text-sm mb-2">{title}</h4>
      {children}
    </div>
  );
}

function FormulaBlock({ formula }: { formula: string }) {
  return (
    <div className="rounded-xl border-2 border-primary/25 bg-card px-4 py-4 sm:px-5 sm:py-5 shadow-sm">
      <code className="block w-full text-foreground font-mono text-sm sm:text-base font-medium leading-snug sm:leading-relaxed whitespace-pre-wrap break-words">
        {formula}
      </code>
    </div>
  );
}

export function ConceptCard({
  concept,
  isExpanded,
  onToggle,
  getCategoryLabel,
  index,
  total,
  onPrev,
  onNext,
}: ConceptCardProps) {
  const { t } = useT();
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const wasExpanded = React.useRef(isExpanded);
  const [studyMode, setStudyMode] = useState<StudyMode>("lecture");
  const [revealed, setRevealed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const hasStructuredBody =
    Boolean(concept.intuition) ||
    Boolean(concept.steps?.length) ||
    Boolean(concept.example) ||
    Boolean(concept.interview);

  useEffect(() => {
    setStudyMode(loadStudyMode());
  }, []);

  useEffect(() => {
    if (!isExpanded) setRevealed(false);
  }, [isExpanded]);

  React.useEffect(() => {
    if (isExpanded && !wasExpanded.current && cardRef.current) {
      const cleanup = smoothScrollIntoViewAfterLayout(cardRef.current, { block: "start" });
      wasExpanded.current = isExpanded;
      return cleanup;
    }
    wasExpanded.current = isExpanded;
  }, [isExpanded]);

  return (
    <div
      ref={cardRef}
      className={`relative z-0 bg-card rounded-2xl shadow-card border transition-colors duration-200 overflow-hidden scroll-mt-48 ${
        isExpanded
          ? "border-primary shadow-card-elevated"
          : "border-border hover:border-primary/40 hover:shadow-card-hover"
      }`}
    >
      <button
        onClick={() => startTransition(() => onToggle())}
        aria-expanded={isExpanded}
        className="w-full min-h-11 text-left p-4 sm:p-5 flex items-start gap-3 sm:gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
      >
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors ${
              isExpanded ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
            }`}
          >
            <Library className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <div className={`${hubBadgeGroupClass} mb-2`}>
            <span className="text-xs sm:text-xs uppercase tracking-wider font-semibold text-primary tabular-nums py-1 px-2.5">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span
              className={`text-xs sm:text-xs uppercase tracking-wider font-semibold ${hubBadgeClass}`}
            >
              {getCategoryLabel(concept.category)}
            </span>
          </div>
          <h3 className="text-foreground font-serif text-base sm:text-xl leading-snug break-words">
            {concept.title}
          </h3>
          {!isExpanded && studyMode === "lecture" && (
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed line-clamp-2 font-light">
              <AcronymText text={concept.simple} />
            </p>
          )}
          {!isExpanded && studyMode === "entretien" && (
            <p className="text-muted-foreground mt-1.5 text-sm italic">
              {t("interview.concept.entretienHint")}
            </p>
          )}
        </div>
        <div
          className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-border bg-muted/30">
          {isPending ? (
            <ConceptDetailSkeleton />
          ) : studyMode === "entretien" && !revealed ? (
            <div className="ml-0 sm:ml-16 mt-6 text-center py-8 space-y-4">
              <Mic className="w-8 h-8 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">
                {t("interview.concept.revealPrompt")}
              </p>
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="touch-target-bar px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
              >
                {t("interview.concept.iAnswered")}
              </button>
            </div>
          ) : (
            <div className="ml-0 sm:ml-16 mt-5 space-y-6">
              <ConceptSection title={t("interview.concept.essentials")}>
                <p className="text-foreground leading-relaxed font-light">
                  <AcronymText text={concept.simple} />
                </p>
              </ConceptSection>

              {concept.intuition && (
                <ConceptSection title={t("interview.concept.intuition")}>
                  <p className="text-foreground leading-relaxed font-light">
                    <AcronymText text={concept.intuition} />
                  </p>
                </ConceptSection>
              )}

              {concept.formula && (
                <ConceptSection title={t("interview.concept.keyFormula")}>
                  <FormulaBlock formula={concept.formula} />
                </ConceptSection>
              )}

              {concept.steps && concept.steps.length > 0 && (
                <ConceptSection title={t("interview.concept.steps")}>
                  <ol className="space-y-2.5 list-none">
                    {concept.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-foreground leading-relaxed font-light">
                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-semibold tabular-nums flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <AcronymText text={step} />
                        </span>
                      </li>
                    ))}
                  </ol>
                </ConceptSection>
              )}

              {concept.example && (
                <ConceptSection title={concept.example.label || t("interview.concept.example")}>
                  <div className="rounded-xl border border-border bg-card px-4 py-3.5">
                    <p className="text-foreground leading-relaxed font-light">
                      <AcronymText text={concept.example.body} />
                    </p>
                  </div>
                </ConceptSection>
              )}

              {concept.interview && (
                <ConceptSection title={t("interview.concept.interviewTips")}>
                  <p className="text-foreground leading-relaxed font-light">
                    <AcronymText text={concept.interview} />
                  </p>
                </ConceptSection>
              )}

              {!hasStructuredBody && concept.deepDive && (
                <ConceptSection title={t("interview.concept.understand")}>
                  <p className="text-foreground leading-relaxed font-light whitespace-pre-line">
                    <AcronymText text={concept.deepDive} />
                  </p>
                </ConceptSection>
              )}

              {concept.table && (
                <ConceptSection title={t("interview.concept.refTable")}>
                  <div className="bg-card border border-border rounded-lg overflow-x-auto -mx-4 sm:mx-0">
                    <table className="w-full text-sm min-w-[480px]">
                      <thead className="bg-primary text-primary-foreground">
                        <tr>
                          {concept.table.headers.map((h, i) => (
                            <th
                              key={i}
                              className="px-3 py-2.5 text-left text-xs uppercase tracking-wider font-semibold"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {concept.table.rows.map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? "bg-muted/40" : "bg-card"}>
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className={`px-3 py-2.5 ${ci === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {concept.id === "c3" && (
                    <p className="mt-3 text-sm">
                      <Link
                        to="/actualite"
                        hash="indicateurs-macro"
                        className="text-primary font-medium hover:text-primary/80 underline"
                      >
                        {t("interview.concept.macroLink")}
                      </Link>
                    </p>
                  )}
                </ConceptSection>
              )}

              {concept.visual && (
                <ConceptSection title={t("interview.concept.diagram")}>
                  <ClientOnly fallback={<Skeleton className="h-48 w-full rounded-xl" />}>
                    <Visual type={concept.visual} />
                  </ClientOnly>
                </ConceptSection>
              )}

              {concept.pitfalls && concept.pitfalls.length > 0 && (
                <div className="bg-muted border border-border rounded-xl p-4">
                  <h4 className="text-foreground font-semibold text-sm mb-2">
                    {t("interview.concept.pitfalls")}
                  </h4>
                  <ul className="space-y-1.5">
                    {concept.pitfalls.map((p, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-foreground text-sm leading-relaxed font-light"
                      >
                        <span className="text-primary flex-shrink-0">•</span>
                        <span>
                          <AcronymText text={p} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={index === 0}
                  aria-label={t("interview.concept.prevAria")}
                  className="touch-target-bar gap-1.5 text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:cursor-not-allowed text-sm font-light px-3 rounded-lg border border-border hover:border-primary/50 disabled:border-border bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <span className="hidden sm:inline">{t("interview.concept.prev")}</span>
                </button>
                <button
                  type="button"
                  onClick={onToggle}
                  className="touch-target-bar gap-2 text-primary hover:text-primary/80 text-sm font-light px-4 rounded-lg border border-border hover:border-primary/50 bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="tabular-nums text-primary text-xs">
                    {index + 1}/{total}
                  </span>
                  <span>{t("interview.concept.collapse")}</span>
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={index === total - 1}
                  aria-label={t("interview.concept.nextAria")}
                  className="touch-target-bar gap-1.5 text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:cursor-not-allowed text-sm font-light px-3 rounded-lg border border-border hover:border-primary/50 disabled:border-border bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="hidden sm:inline">{t("interview.concept.next")}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
