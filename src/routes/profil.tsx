import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/profile/ProfilePage";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Mon profil — FinancePrep" },
      {
        name: "description",
        content:
          "Objectifs d'entretien, banques cibles, actions du jour, export des données et préférences.",
      },
    ],
  }),
  component: ProfilePage,
});
