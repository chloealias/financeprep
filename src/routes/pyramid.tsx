import { createFileRoute } from "@tanstack/react-router";
import { BlocPyramid } from "@/components/guide/BlocPyramid";
import { GuidePageShell } from "@/components/GuidePageShell";
import { routeMeta } from "@/lib/i18n/route-head";
import { useT } from "@/hooks/useT";

export const Route = createFileRoute("/pyramid")({
  head: () => ({
    meta: routeMeta("routes.pyramid.metaTitle", "routes.pyramid.metaDescription"),
  }),
  component: PyramidPage,
});

function PyramidPage() {
  const { t } = useT();
  return (
    <GuidePageShell
      tag={t("guide.modules.pyramid.tag")}
      title={t("guide.modules.pyramid.title")}
      description={t("routes.pyramid.pageDescription")}
    >
      <BlocPyramid />
    </GuidePageShell>
  );
}
