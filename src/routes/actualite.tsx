import { createFileRoute } from "@tanstack/react-router";
import { BlocActualite } from "@/components/guide/BlocActualite";
import { GuidePageShell } from "@/components/GuidePageShell";
import { validateActualiteSearch } from "@/lib/route-search";

export const Route = createFileRoute("/actualite")({
  validateSearch: validateActualiteSearch,
  head: () => ({
    meta: [
      { title: "Actualité M&A 2025-2026 — FinancePrep" },
      {
        name: "description",
        content:
          "Indicateurs macro trimestriels (taux BCE/Fed, CAC 40, FX, spreads, pétrole) et deals M&A 2023-2026 pour l'entretien finance.",
      },
    ],
  }),
  component: ActualitePage,
});

function ActualitePage() {
  return (
    <GuidePageShell tag="Preuve d'intérêt réel" title="Actualité M&A 2025-2026">
      <BlocActualite />
    </GuidePageShell>
  );
}
