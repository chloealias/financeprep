import { createFileRoute } from "@tanstack/react-router";
import { BlocAccretion } from "@/components/guide/BlocAccretion";
import { GuidePageShell } from "@/components/GuidePageShell";
import { routeMeta } from "@/lib/i18n/route-head";
import { useT } from "@/hooks/useT";

export const Route = createFileRoute("/accretion")({
  head: () => ({
    meta: routeMeta("routes.accretion.metaTitle", "routes.accretion.metaDescription"),
  }),
  component: AccretionPage,
});

function AccretionPage() {
  const { t } = useT();
  return (
    <GuidePageShell
      tag={t("guide.modules.accretion.tag")}
      title={t("guide.modules.accretion.title")}
    >
      <BlocAccretion />
    </GuidePageShell>
  );
}
