import { createFileRoute } from "@tanstack/react-router";
import { BlocDiagnostic } from "@/components/guide/BlocDiagnostic";
import { GuidePageShell } from "@/components/GuidePageShell";
import { routeMeta } from "@/lib/i18n/route-head";
import { useT } from "@/hooks/useT";

export const Route = createFileRoute("/diagnostic")({
  head: () => ({
    meta: routeMeta("routes.diagnostic.metaTitle", "routes.diagnostic.metaDescription"),
  }),
  component: DiagnosticPage,
});

function DiagnosticPage() {
  const { t } = useT();
  return (
    <GuidePageShell
      tag={t("guide.modules.diagnostic.tag")}
      title={t("guide.modules.diagnostic.title")}
    >
      <BlocDiagnostic />
    </GuidePageShell>
  );
}
