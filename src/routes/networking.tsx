import { createFileRoute } from "@tanstack/react-router";
import { BlocNetworking } from "@/components/guide/BlocNetworking";
import { GuidePageShell } from "@/components/GuidePageShell";
import { routeMeta } from "@/lib/i18n/route-head";
import { useT } from "@/hooks/useT";

export const Route = createFileRoute("/networking")({
  head: () => ({
    meta: routeMeta("routes.networking.metaTitle", "routes.networking.metaDescription"),
  }),
  component: NetworkingPage,
});

function NetworkingPage() {
  const { t } = useT();
  return (
    <GuidePageShell
      tag={t("guide.modules.networking.tag")}
      title={t("guide.modules.networking.title")}
    >
      <BlocNetworking />
    </GuidePageShell>
  );
}
