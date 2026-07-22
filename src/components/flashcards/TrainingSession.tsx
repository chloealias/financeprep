import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Triangle, User } from "lucide-react";
import { getTargetBankNames, loadProfile } from "@/lib/profile-storage";
import { InterviewSession, InterviewSessionSetup } from "@/components/interview/InterviewSession";
import { PageHeader } from "@/components/ui/page-header";
import { useT } from "@/hooks/useT";

const THIRTY_MIN_MS = 30 * 60 * 1000;

type Phase = "briefing" | "setup" | "playing";
type TimeLimit = "none" | "30min";

export function TrainingSession({ onBack }: { onBack: () => void }) {
  const { t } = useT();
  const [phase, setPhase] = useState<Phase>("briefing");
  const [packSize, setPackSize] = useState<5 | 7>(() =>
    typeof window !== "undefined" ? (loadProfile().defaultPackSize ?? 5) : 5,
  );
  const [timeLimit, setTimeLimit] = useState<TimeLimit>("none");
  const targetBankNames = typeof window !== "undefined" ? getTargetBankNames() : [];

  const mode = timeLimit === "30min" ? "full" : "mini";
  const globalLimitMs = timeLimit === "30min" ? THIRTY_MIN_MS : undefined;

  if (phase === "briefing") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="touch-target-bar gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("interview.simulator.back")}
        </button>

        <PageHeader
          eyebrow={t("routes.flashcards.training.tag")}
          title={
            <>
              {t("routes.flashcards.training.titlePrefix")}{" "}
              <span className="type-accent">{t("routes.flashcards.training.titleAccent")}</span>
            </>
          }
          description={t("routes.flashcards.training.description")}
          className="mb-8"
        />

        {targetBankNames.length > 0 && (
          <div className="mb-6 rounded-xl bg-primary/10 border border-primary/20 p-4 text-sm text-foreground">
            <strong>{t("interview.simulator.targetBanks")}</strong>{" "}
            {t("interview.simulator.targetBanksHint", { banks: targetBankNames.join(", ") })}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/cv"
            className="flex gap-3 p-4 rounded-xl bg-card border-2 border-border hover:border-primary/40 transition-colors"
          >
            <User className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <div className="font-medium text-foreground">{t("interview.simulator.guideCv")}</div>
              <p className="text-sm text-muted-foreground font-light">
                {t("interview.simulator.guideCvDesc")}
              </p>
            </div>
          </Link>
          <Link
            to="/pyramid"
            className="flex gap-3 p-4 rounded-xl bg-card border-2 border-border hover:border-primary/40 transition-colors"
          >
            <Triangle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <div className="font-medium text-foreground">
                {t("interview.simulator.pyramidStar")}
              </div>
              <p className="text-sm text-muted-foreground font-light">
                {t("interview.simulator.pyramidStarDesc")}
              </p>
            </div>
          </Link>
        </div>

        <div className="mb-6">
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3">
            {t("interview.simulator.packSize")}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {([5, 7] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setPackSize(s)}
                className={`px-4 py-4 rounded-xl border-2 font-medium transition-colors ${
                  packSize === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/50"
                }`}
              >
                <div className="text-2xl font-serif">{s}</div>
                <div className="text-xs uppercase tracking-wider mt-1 opacity-80">
                  {t("interview.simulator.questions")}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3">
            {t("routes.flashcards.training.timeLimit")}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { id: "none" as const, label: t("routes.flashcards.training.timeNone") },
                { id: "30min" as const, label: t("routes.flashcards.training.time30") },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTimeLimit(opt.id)}
                className={`px-4 py-4 rounded-xl border-2 font-medium transition-colors ${
                  timeLimit === opt.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPhase("setup")}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium text-lg shadow-lg hover:bg-primary/90"
        >
          <Clock className="w-5 h-5" />
          {t("interview.simulator.continue")}
        </button>
      </div>
    );
  }

  if (phase === "setup") {
    return (
      <InterviewSessionSetup
        mode={mode}
        packSize={packSize}
        onStart={() => setPhase("playing")}
        onBack={() => setPhase("briefing")}
      />
    );
  }

  return (
    <InterviewSession
      mode={mode}
      packSize={packSize}
      globalLimitMs={globalLimitMs}
      onBack={() => setPhase("setup")}
    />
  );
}
