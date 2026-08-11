import { useEffect, useMemo, useState } from "react";
import {
  guideModuleGroups,
  getGuideModulesByGroup,
  type GuideModule,
} from "@/data/guide-modules";
import {
  GuideHeroModuleLink,
  GuideModuleLink,
  GuideModuleSection,
} from "@/components/guide/guide-ui";
import { GuideDiagnosticWidget } from "@/components/hub/GuideDiagnosticWidget";
import { PageHeader } from "@/components/ui/page-header";
import { getGuideModuleProgress, sortGuideModulesByUrgency } from "@/lib/guide-progress";
import { useT } from "@/hooks/useT";

const GROUP_LABEL_KEYS = {
  fundamentals: "hub.guide.groups.fundamentals",
  training: "hub.guide.groups.training",
  networking: "hub.guide.groups.networking",
} as const;

function renderModuleCard(module: GuideModule, badgeLabel: string | null, t: ReturnType<typeof useT>["t"]) {
  if (module.hero) {
    return (
      <GuideHeroModuleLink
        key={module.id}
        to={module.href}
        eyebrow={t("hub.guide.flashcards.eyebrow")}
        title={t(`guide.modules.${module.id}.title`)}
        icon={module.icon}
        badge={badgeLabel ? { label: badgeLabel, variant: "hero" } : undefined}
      />
    );
  }

  return (
    <GuideModuleLink
      key={module.id}
      to={module.href}
      tag={t(`guide.modules.${module.id}.tag`)}
      title={t(`guide.modules.${module.id}.title`)}
      icon={module.icon}
      badge={badgeLabel ? { label: badgeLabel } : undefined}
    />
  );
}

export function GuideTab() {
  const { t, locale } = useT();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const groupedModules = useMemo(() => {
    if (!mounted) {
      return guideModuleGroups.map((group) => ({ group, modules: getGuideModulesByGroup(group) }));
    }
    return guideModuleGroups.map((group) => ({
      group,
      modules: sortGuideModulesByUrgency(getGuideModulesByGroup(group), locale),
    }));
  }, [mounted, locale]);

  const getBadgeLabel = (module: GuideModule): string | null => {
    if (!mounted || !module.progressKey) return null;
    const progress = getGuideModuleProgress(module.progressKey, t, locale);
    return progress?.label ?? null;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <PageHeader
        eyebrow={t("hub.guide.eyebrow")}
        title={t("hub.guide.title")}
        description={t("hub.guide.description")}
        className="mb-8 sm:mb-10"
      />

      <GuideDiagnosticWidget />

      <div className="space-y-10">
        {groupedModules.map(({ group, modules }) => (
          <GuideModuleSection key={group} title={t(GROUP_LABEL_KEYS[group])}>
            {modules.map((module) => renderModuleCard(module, getBadgeLabel(module), t))}
          </GuideModuleSection>
        ))}
      </div>
    </div>
  );
}
