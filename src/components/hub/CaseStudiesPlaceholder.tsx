import { PageHeader } from "@/components/ui/page-header";
import { PracticeBackButton } from "@/components/hub/PracticeHub";
import { useT } from "@/hooks/useT";

type CaseStudiesPlaceholderProps = {
  onBack: () => void;
};

export function CaseStudiesPlaceholder({ onBack }: CaseStudiesPlaceholderProps) {
  const { t } = useT();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PracticeBackButton onBack={onBack} />
      <PageHeader
        eyebrow={t("hub.cases.eyebrow")}
        title={t("hub.cases.title")}
        description={t("hub.cases.description")}
      />
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
        <p className="text-foreground font-medium mb-2">{t("hub.cases.soonTitle")}</p>
        <p className="text-sm text-muted-foreground font-light max-w-md mx-auto">
          {t("hub.cases.soonBody")}
        </p>
      </div>
    </div>
  );
}
