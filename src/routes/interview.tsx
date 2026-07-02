import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { InterviewSimulator } from "@/components/interview/InterviewSimulator";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "Simulateur d'entretien — FinancePrep" },
      {
        name: "description",
        content:
          "Simulation d'entretien finance 30 minutes : pack structuré, timers, auto-évaluation et rapport exportable.",
      },
    ],
  }),
  component: InterviewPage,
});

function InterviewPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background">
      <InterviewSimulator onBack={() => navigate({ to: "/flashcards" })} />
    </div>
  );
}
