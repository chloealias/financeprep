import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Triangle, User } from "lucide-react";
import { getTargetBankNames, loadProfile } from "@/lib/profile-storage";
import { InterviewSession, InterviewSessionSetup } from "@/components/interview/InterviewSession";

const THIRTY_MIN_MS = 30 * 60 * 1000;

type Phase = "briefing" | "setup" | "playing";

export function InterviewSimulator({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [packSize, setPackSize] = useState<5 | 7>(() =>
    typeof window !== "undefined" ? loadProfile().defaultPackSize ?? 5 : 5,
  );
  const targetBankNames = typeof window !== "undefined" ? getTargetBankNames() : [];

  if (phase === "briefing") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-blue-700" />
            <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">
              Simulation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
            Entretien <span className="italic font-light text-blue-700">30 min</span>
          </h1>
          <p className="text-blue-700 mt-3 font-light max-w-2xl">
            Pack structuré type vrai entretien : CV, technique, actualité M&A, sectoriel. Timer par
            question + limite globale 30 minutes.
          </p>
        </div>

        {targetBankNames.length > 0 && (
          <div className="mb-6 rounded-xl bg-indigo-50 border border-indigo-200 p-4 text-sm text-indigo-950">
            <strong>Banques cibles :</strong> {targetBankNames.join(", ")} — personnalisez vos
            exemples fit et deals en conséquence.
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/cv"
            className="flex gap-3 p-4 rounded-xl bg-white border-2 border-blue-100 hover:border-blue-300 transition-colors"
          >
            <User className="w-6 h-6 text-blue-700 flex-shrink-0" />
            <div>
              <div className="font-medium text-blue-950">Guide CV</div>
              <p className="text-sm text-blue-600 font-light">Timer 2 min · checklist</p>
            </div>
          </Link>
          <Link
            to="/pyramid"
            className="flex gap-3 p-4 rounded-xl bg-white border-2 border-blue-100 hover:border-blue-300 transition-colors"
          >
            <Triangle className="w-6 h-6 text-blue-700 flex-shrink-0" />
            <div>
              <div className="font-medium text-blue-950">Pyramid + STAR</div>
              <p className="text-sm text-blue-600 font-light">Structurer vos réponses</p>
            </div>
          </Link>
        </div>

        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-blue-700 font-medium mb-3">
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
                    ? "bg-blue-900 text-white border-blue-900"
                    : "bg-white text-blue-900 border-blue-200 hover:border-blue-400"
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
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-medium text-lg shadow-lg"
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
