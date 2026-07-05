import { useState } from "react";
import { getQuestionEnrichment } from "@/data/questions-enriched";
import { AcronymText } from "@/components/interview/AcronymText";

type Tab = "steps" | "junior" | "senior" | "mistakes";

type QuestionEnrichedPanelProps = {
  questionId: string | number;
  explanation: string;
  steps: string[];
  tip?: string;
};

export function QuestionEnrichedPanel({
  questionId,
  explanation,
  steps,
  tip,
}: QuestionEnrichedPanelProps) {
  const enrichment = getQuestionEnrichment(questionId);
  const hasEnrichment = Boolean(
    enrichment?.answerJunior ||
      enrichment?.answerSenior ||
      enrichment?.commonMistakes?.length ||
      enrichment?.followUp,
  );
  const [tab, setTab] = useState<Tab>("steps");

  if (!hasEnrichment) {
    return (
      <>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-6 bg-primary" />
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider">
              Explication
            </h4>
          </div>
          <p className="text-foreground leading-relaxed font-light">
            <AcronymText text={explanation} />
          </p>
        </div>
        <StepsList steps={steps} />
        {tip && <TipBlock tip={tip} />}
      </>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "steps", label: "Étapes" },
    ...(enrichment?.answerJunior ? [{ id: "junior" as const, label: "Junior" }] : []),
    ...(enrichment?.answerSenior ? [{ id: "senior" as const, label: "Senior" }] : []),
    ...(enrichment?.commonMistakes?.length
      ? [{ id: "mistakes" as const, label: "Pièges" }]
      : []),
  ];

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors ${
              tab === t.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "steps" && (
        <>
          <p className="text-foreground leading-relaxed font-light mb-4">
            <AcronymText text={explanation} />
          </p>
          <StepsList steps={steps} />
        </>
      )}
      {tab === "junior" && enrichment?.answerJunior && (
        <p className="text-foreground leading-relaxed font-light">
          <AcronymText text={enrichment.answerJunior} />
        </p>
      )}
      {tab === "senior" && enrichment?.answerSenior && (
        <p className="text-foreground leading-relaxed font-light">
          <AcronymText text={enrichment.answerSenior} />
        </p>
      )}
      {tab === "mistakes" && enrichment?.commonMistakes && (
        <ul className="space-y-2">
          {enrichment.commonMistakes.map((m, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground">
              <span className="text-destructive">•</span>
              <AcronymText text={m} />
            </li>
          ))}
        </ul>
      )}

      {enrichment?.followUp && (
        <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
          <span className="text-xs uppercase tracking-wider font-semibold text-primary">
            Relance interviewer
          </span>
          <p className="mt-1 text-foreground font-light">
            <AcronymText text={enrichment.followUp} />
          </p>
        </div>
      )}
      {tip && <TipBlock tip={tip} />}
    </>
  );
}

function StepsList({ steps }: { steps: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px w-6 bg-primary" />
        <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider">
          Étapes de réponse
        </h4>
      </div>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4 bg-card rounded-lg p-4 border border-border">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary text-primary-foreground font-serif text-sm flex items-center justify-center">
              {i + 1}
            </div>
            <p className="text-foreground leading-relaxed flex-1 pt-0.5">
              <AcronymText text={step} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TipBlock({ tip }: { tip: string }) {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-xl p-5 text-white relative overflow-hidden mt-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-200 text-xs uppercase tracking-[0.2em] font-medium">
            Conseil de pro
          </span>
        </div>
        <p className="text-white font-light leading-relaxed">
          <AcronymText text={tip} />
        </p>
      </div>
    </div>
  );
}
