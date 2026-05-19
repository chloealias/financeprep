import { createFileRoute } from "@tanstack/react-router";
import { BlocMentalMath } from "@/components/guide/BlocMentalMath";
import { GuidePageShell } from "@/components/GuidePageShell";

export const Route = createFileRoute("/mental-math")({
  head: () => ({
    meta: [
      { title: "Calcul mental — FinancePrep" },
      {
        name: "description",
        content:
          "Trachtenberg, pourcentages rapides et mini-entraînement pour les tests de calcul mental en entretien.",
      },
    ],
  }),
  component: MentalMathPage,
});

function MentalMathPage() {
  return (
    <GuidePageShell
      tag="Entraînement"
      title="Calcul mental"
      description="Méthodes rapides et drills pour les questions chiffrées sous pression."
    >
      <BlocMentalMath />
    </GuidePageShell>
  );
}
