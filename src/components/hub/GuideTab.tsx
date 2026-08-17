import { useEffect, useMemo, useState } from "react";
import {
  guideModules,
  guideModuleGroups,
  getGuideModulesByGroup,
  type GuideModule,
} from "@/data/guide-modules";
import { GuideModuleLink, GuideModuleSection } from "@/components/guide/guide-ui";
import { PageHeader } from "@/components/ui/page-header";
import { getGuideModuleProgress, sortGuideModulesByUrgency } from "@/lib/guide-progress";
import { useT } from "@/hooks/useT";

const GROUP_LABEL_KEYS = {
  fundamentals: "hub.guide.groups.fundamentals",
  training: "hub.guide.groups.training",
  networking: "hub.guide.groups.networking",
} as const;

function isPinnedDiagnostic(module: GuideModule): boolean {
  return module.id === "diagnostic";
}

function renderModuleCard(
  module: GuideModule,
  badgeLabel: string | null,
  t: ReturnType<typeof useT>["t"],
) {
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
  const diagnosticModule = guideModules.find(isPinnedDiagnostic) ?? null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const groupedModules = useMemo(() => {
    const modulesForGroup = (group: (typeof guideModuleGroups)[number]) =>
      getGuideModulesByGroup(group).filter((module) => !isPinnedDiagnostic(module));

    if (!mounted) {
      return guideModuleGroups.map((group) => ({ group, modules: modulesForGroup(group) }));
    }
    return guideModuleGroups.map((group) => ({
      group,
      modules: sortGuideModulesByUrgency(modulesForGroup(group), locale),
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

      {diagnosticModule && (
        <div className="mb-10">
          {renderModuleCard(diagnosticModule, getBadgeLabel(diagnosticModule), t)}
        </div>
      )}

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
