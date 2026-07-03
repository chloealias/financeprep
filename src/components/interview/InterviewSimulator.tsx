import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Triangle, User } from "lucide-react";
import { getTargetBankNames, loadProfile } from "@/lib/profile-storage";
import { InterviewSession, InterviewSessionSetup } from "@/components/interview/InterviewSession";
import { PageHeader } from "@/components/ui/page-header";

const THIRTY_MIN_MS = 30 * 60 * 1000;

type Phase = "briefing" | "setup" | "playing";

export function InterviewSimulator({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [packSize, setPackSize] = useState<5 | 7>(() =>
    typeof window !== "undefined" ? (loadProfile().defaultPackSize ?? 5) : 5,
  );
  const targetBankNames = typeof window !== "undefined" ? getTargetBankNames() : [];

  if (phase === "briefing") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="touch-target-bar gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>

        <PageHeader
          eyebrow="Simulation"
          title={
            <>
              Entretien <span className="type-accent">30 min</span>
            </>
          }
          description="Pack structuré type vrai entretien : CV, technique, actualité M&A, sectoriel. Timer par question + limite globale 30 minutes."
          className="mb-8"
        />

        {targetBankNames.length > 0 && (
          <div className="mb-6 rounded-xl bg-primary/10 border border-primary/20 p-4 text-sm text-foreground">
            <strong>Banques cibles :</strong> {targetBankNames.join(", ")} — personnalisez vos
            exemples fit et deals en conséquence.
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/cv"
            className="flex gap-3 p-4 rounded-xl bg-card border-2 border-border hover:border-primary/40 transition-colors"
          >
            <User className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <div className="font-medium text-foreground">Guide CV</div>
              <p className="text-sm text-muted-foreground font-light">Timer 2 min · checklist</p>
            </div>
          </Link>
          <Link
            to="/pyramid"
            className="flex gap-3 p-4 rounded-xl bg-card border-2 border-border hover:border-primary/40 transition-colors"
          >
            <Triangle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <div className="font-medium text-foreground">Pyramid + STAR</div>
              <p className="text-sm text-muted-foreground font-light">Structurer vos réponses</p>
            </div>
          </Link>
        </div>

        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3">
            Taille du pack
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
                <div className="text-xs uppercase tracking-wider mt-1 opacity-80">questions</div>
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
          Continuer vers le pack
        </button>
      </div>
    );
  }

  if (phase === "setup") {
    return (
      <InterviewSessionSetup
        mode="full"
        packSize={packSize}
        onStart={() => setPhase("playing")}
        onBack={() => setPhase("briefing")}
      />
    );
  }

  return (
    <InterviewSession
      mode="full"
      packSize={packSize}
      globalLimitMs={THIRTY_MIN_MS}
      onBack={() => setPhase("setup")}
    />
  );
}
