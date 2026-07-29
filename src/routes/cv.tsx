import { createFileRoute } from "@tanstack/react-router";
import { BlocCV } from "@/components/guide/BlocCV";
import { GuidePageShell } from "@/components/GuidePageShell";
import { routeMeta } from "@/lib/i18n/route-head";
import { useT } from "@/hooks/useT";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: routeMeta("routes.cv.metaTitle", "routes.cv.metaDescription"),
  }),
  component: CVPage,
});

function CVPage() {
  const { t } = useT();
  return (
    <GuidePageShell tag={t("guide.modules.cv.tag")} title={t("guide.modules.cv.title")}>
      <BlocCV />
    </GuidePageShell>
  );
}
