import { createFileRoute } from "@tanstack/react-router";
import { BlocMentalMath } from "@/components/guide/BlocMentalMath";
import { GuidePageShell } from "@/components/GuidePageShell";
import { routeMeta } from "@/lib/i18n/route-head";
import { useT } from "@/hooks/useT";

export const Route = createFileRoute("/mental-math")({
  head: () => ({
    meta: routeMeta("routes.mentalMath.metaTitle", "routes.mentalMath.metaDescription"),
  }),
  component: MentalMathPage,
});

function MentalMathPage() {
  const { t } = useT();
  return (
    <GuidePageShell
      tag={t("guide.modules.mentalMath.tag")}
      title={t("routes.mentalMath.pageTitle")}
      description={t("routes.mentalMath.pageDescription")}
    >
      <BlocMentalMath />
    </GuidePageShell>
  );
}
