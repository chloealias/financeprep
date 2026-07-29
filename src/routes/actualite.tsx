import { createFileRoute } from "@tanstack/react-router";
import { BlocActualite } from "@/components/guide/BlocActualite";
import { GuidePageShell } from "@/components/GuidePageShell";
import { validateActualiteSearch } from "@/lib/route-search";
import { routeMeta } from "@/lib/i18n/route-head";
import { useT } from "@/hooks/useT";

export const Route = createFileRoute("/actualite")({
  validateSearch: validateActualiteSearch,
  head: () => ({
    meta: routeMeta("routes.actualite.metaTitle", "routes.actualite.metaDescription"),
  }),
  component: ActualitePage,
});

function ActualitePage() {
  const { t } = useT();
  return (
    <GuidePageShell
      tag={t("guide.modules.actualite.tag")}
      title={t("guide.modules.actualite.title")}
    >
      <BlocActualite />
    </GuidePageShell>
  );
}
