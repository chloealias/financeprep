import { createFileRoute } from "@tanstack/react-router";
import { BlocPyramid } from "@/components/guide/BlocPyramid";
import { GuidePageShell } from "@/components/GuidePageShell";

export const Route = createFileRoute("/pyramid")({
  head: () => ({
    meta: [
      { title: "Pyramid Principle + STAR — FinancePrep" },
      {
        name: "description",
        content:
          "Frameworks pour structurer vos réponses techniques et comportementales en entretien.",
      },
    ],
  }),
  component: PyramidPage,
});

function PyramidPage() {
  return (
    <GuidePageShell
      tag="Méta-framework"
      title="Pyramid Principle + STAR"
      description="Ces deux frameworks structurent toutes vos réponses — techniques et comportementales."
    >
      <BlocPyramid />
    </GuidePageShell>
  );
}
