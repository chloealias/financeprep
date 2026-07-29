import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import type { Exercise, ExerciseVariant } from "@/data/exercise-types";
import { getExerciseThemeLabel } from "@/data/exercise-types";
import { checkNumericAnswer } from "@/lib/exercise-check";
import { AcronymText } from "@/components/interview/AcronymText";
import { useT } from "@/hooks/useT";

type ExercisePlayerProps = {
  exercise: Exercise;
  solved: boolean;
  onSolved: () => void;
};

type Feedback = "idle" | "correct" | "incorrect";

export function ExercisePlayer({ exercise, solved, onSolved }: ExercisePlayerProps) {
  const { t } = useT();
  const [variantIndex, setVariantIndex] = useState(0);
  const variant = exercise.variants[variantIndex] ?? exercise.variants[0];

  const [input, setInput] = useState("");
  const [choice, setChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [revealed, setRevealed] = useState(false);

  const hasOtherVariants = exercise.variants.length > 1;

  const resetAttempt = (nextIndex: number) => {
    setVariantIndex(nextIndex);
    setInput("");
    setChoice(null);
    setFeedback("idle");
    setRevealed(false);
  };

  const pickOtherVariant = () => {
    if (!hasOtherVariants) {
      resetAttempt(variantIndex);
      return;
    }
    const candidates = exercise.variants.map((_, i) => i).filter((i) => i !== variantIndex);
    const next = candidates[Math.floor(Math.random() * candidates.length)] ?? 0;
    resetAttempt(next);
  };

  const markOk = () => {
    setFeedback("correct");
    setRevealed(true);
    onSolved();
  };

  const onCheck = () => {
    if (!variant) return;
    if (variant.kind === "numeric") {
      const ok = checkNumericAnswer(input, variant.check);
      if (ok) markOk();
      else setFeedback("incorrect");
      return;
    }
    if (variant.kind === "choice") {
      if (choice === null) return;
      if (choice === variant.correctIndex) markOk();
      else setFeedback("incorrect");
      return;
    }
    // open: reveal only
    setRevealed(true);
    setFeedback("idle");
  };

  const method = variant?.method ?? "";
  const answerLabel = useMemo(() => {
    if (!variant) return "";
    if (variant.kind === "choice") return variant.options[variant.correctIndex] ?? "";
    return variant.answerLabel;
  }, [variant]);

  if (!variant) return null;

  return (
    <article>
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <span className="text-xs font-semibold text-primary tabular-nums">{exercise.id}</span>
        <span className="text-xs text-muted-foreground">
          {getExerciseThemeLabel(exercise.theme, t)}
        </span>
        {solved && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden />
            {t("hub.exercises.solved")}
          </span>
        )}
      </div>

      <h2 className="type-page-title mb-4">{exercise.title}</h2>

      <p className="text-foreground leading-relaxed mb-6 whitespace-pre-wrap">
        <AcronymText text={variant.prompt} />
      </p>

      <VariantInput
        variant={variant}
        input={input}
        setInput={(v) => {
          setInput(v);
          if (feedback === "incorrect") setFeedback("idle");
        }}
        choice={choice}
        setChoice={(v) => {
          setChoice(v);
          if (feedback === "incorrect") setFeedback("idle");
        }}
        disabled={feedback === "correct"}
      />

      <div className="flex flex-wrap gap-2 mt-4">
        {variant.kind !== "open" ? (
          <button
            type="button"
            data-check
            onClick={onCheck}
            disabled={feedback === "correct" || (variant.kind === "choice" && choice === null)}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
          >
            {t("hub.exercises.check")}
          </button>
        ) : (
          <button
            type="button"
            data-check
            onClick={onCheck}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
          >
            {t("hub.exercises.reveal")}
          </button>
        )}

        {feedback === "incorrect" && (
          <button
            type="button"
            onClick={pickOtherVariant}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden />
            {hasOtherVariants ? t("hub.exercises.retryOther") : t("hub.exercises.retrySame")}
          </button>
        )}

        {feedback !== "correct" && variant.kind !== "open" && (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground"
          >
            {t("hub.exercises.showSolution")}
          </button>
        )}

        {variant.kind === "open" && revealed && !solved && (
          <button
            type="button"
            onClick={markOk}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted"
          >
            {t("hub.exercises.markSolved")}
          </button>
        )}
      </div>

      {feedback === "correct" && (
        <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-400 font-medium">
          {t("hub.exercises.feedback.correct")}
        </p>
      )}
      {feedback === "incorrect" && (
        <p className="mt-4 text-sm text-destructive font-medium">
          {t("hub.exercises.feedback.incorrect")}
        </p>
      )}

      {revealed && (
        <div className="mt-6 rounded-xl border border-border bg-muted/40 px-4 py-4 space-y-2">
          <p className="text-sm font-semibold text-foreground m-0">
            {t("hub.exercises.solution")}
            {answerLabel ? (
              <span className="font-normal text-primary">
                {" "}
                — <AcronymText text={answerLabel} />
              </span>
            ) : null}
          </p>
          <p className="text-sm text-muted-foreground font-light leading-relaxed m-0 whitespace-pre-wrap">
            <AcronymText text={method} />
          </p>
        </div>
      )}
    </article>
  );
}

function VariantInput({
  variant,
  input,
  setInput,
  choice,
  setChoice,
  disabled,
}: {
  variant: ExerciseVariant;
  input: string;
  setInput: (v: string) => void;
  choice: number | null;
  setChoice: (v: number | null) => void;
  disabled: boolean;
}) {
  const { t } = useT();

  if (variant.kind === "numeric") {
    return (
      <div>
        {variant.unitHint && (
          <p className="text-xs text-muted-foreground mb-2">{variant.unitHint}</p>
        )}
        <label className="sr-only" htmlFor="exercise-answer">
          {t("hub.exercises.answerLabel")}
        </label>
        <input
          id="exercise-answer"
          type="text"
          inputMode="decimal"
          value={input}
          disabled={disabled}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              (
                e.currentTarget
                  .closest("article")
                  ?.querySelector("[data-check]") as HTMLButtonElement | null
              )?.click();
            }
          }}
          placeholder={t("hub.exercises.answerPlaceholder")}
          className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          autoComplete="off"
        />
      </div>
    );
  }

  if (variant.kind === "choice") {
    return (
      <div className="space-y-2" role="radiogroup" aria-label={t("hub.exercises.answerLabel")}>
        {variant.options.map((opt, i) => {
          const selected = choice === i;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => setChoice(i)}
              className={`w-full text-left rounded-lg border px-4 py-2.5 text-sm transition-colors disabled:opacity-60 ${
                selected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <AcronymText text={opt} />
            </button>
          );
        })}
      </div>
    );
  }

  return <p className="text-sm text-muted-foreground italic">{t("hub.exercises.openHint")}</p>;
}
