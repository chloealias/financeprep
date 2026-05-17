import { createFileRoute } from "@tanstack/react-router";
import { BlocCV } from "@/components/guide/BlocCV";
import { GuidePageShell } from "@/components/GuidePageShell";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "Walk me through your CV — FinancePrep" },
      {
        name: "description",
        content:
          "Structure, checklist et timer pour répondre à la question d’ouverture en entretien finance.",
      },
    ],
  }),
  component: CVPage,
});

function CVPage() {
  return (
    <GuidePageShell tag="La question d'ouverture" title="Walk me through your CV / a deal">
      <BlocCV />
    </GuidePageShell>
  );
}
