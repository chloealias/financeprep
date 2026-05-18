import { useState } from "react";
import { InterviewSession, InterviewSessionSetup } from "@/components/interview/InterviewSession";
import { loadProfile } from "@/lib/profile-storage";

type Phase = "setup" | "playing";

export function QuizSession({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>("setup");
  const packSize = typeof window !== "undefined" ? (loadProfile().defaultPackSize ?? 5) : 5;

  if (phase === "setup") {
    return (
      <InterviewSessionSetup
        mode="mini"
        packSize={packSize}
        onStart={() => setPhase("playing")}
        onBack={onBack}
      />
    );
  }

  return <InterviewSession mode="mini" packSize={packSize} onBack={() => setPhase("setup")} />;
}
