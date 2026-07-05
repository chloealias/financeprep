import { Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { guideModules } from "@/data/guide-modules";
import { GuideModuleLink } from "@/components/guide/guide-ui";
import { TodayPlanWidget } from "@/components/hub/TodayPlanWidget";
import { PageHeader } from "@/components/ui/page-header";
import { getProfileMenuBadges } from "@/lib/profile-dashboard";
import { loadGuideGoals, toggleGuideGoal } from "@/lib/storage";

export function GuideTab() {
  const [srsDue, setSrsDue] = useState(0);
  const [guideGoals, setGuideGoals] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSrsDue(getProfileMenuBadges().srsDue);
    setGuideGoals(loadGuideGoals());
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <TodayPlanWidget className="mb-10" />

      <PageHeader
        eyebrow="Méthodologie"
        title={
          <>
            Le <span className="type-accent">guide complet</span>
          </>
        }
        description="6 guides interactifs. Cliquez sur un module pour l'ouvrir en pleine page."
      />

      <Link
        to="/flashcards"
        className="group block mb-10 rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
      >
        {srsDue > 0 && (
          <span className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-white/20 text-xs font-semibold">
            {srsDue} SRS due
          </span>
        )}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center gap-5">
          <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-primary-foreground/80" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-primary-foreground/70 text-xs uppercase tracking-[0.2em] font-semibold mb-1">
              Nouveau · Entraînement actif
            </div>
            <h3 className="type-card-title text-xl sm:text-2xl">
              Flashcards avec répétition espacée
            </h3>
            <p className="text-primary-foreground/80 text-sm font-light mt-1 hidden sm:block">
              Sessions de 20 cartes. L&apos;algorithme SM-2 fait revenir les cartes ratées plus
              souvent.
            </p>
          </div>
          <ChevronRight
            className="w-6 h-6 text-primary-foreground/70 group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </div>
      </Link>

      <div className="space-y-6">
        {guideModules.map((module) => (
          <div key={module.href} className="space-y-2">
            <GuideModuleLink
              to={module.href}
              tag={module.tag}
              title={module.title}
              icon={module.icon}
            />
            {module.learningGoals && module.learningGoals.length > 0 && (
              <ul className="ml-4 sm:ml-6 space-y-1">
                {module.learningGoals.map((goal) => {
                  const goalKey = `${module.href}:${goal}`;
                  const done = guideGoals[goalKey];
                  return (
                    <li key={goalKey}>
                      <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(done)}
                          onChange={() => setGuideGoals(toggleGuideGoal(goalKey))}
                          className="mt-0.5"
                        />
                        <span className={done ? "line-through opacity-70" : ""}>{goal}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
