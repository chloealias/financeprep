import { useMemo, useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import {
  EXERCISE_CHEATSHEET,
  EXERCISE_THEME_LABELS,
  EXERCISE_THEMES,
  exercises,
  type Exercise,
  type ExerciseTheme,
} from "@/data/exercises";
import { ExercisePlayer } from "@/components/hub/ExercisePlayer";
import { PracticeBackButton } from "@/components/hub/PracticeHub";
import { PageHeader } from "@/components/ui/page-header";
import { AcronymText } from "@/components/interview/AcronymText";
import { useT } from "@/hooks/useT";

type ExercisesTabProps = {
  solvedIds: Set<string>;
  onSolved: (id: string) => void;
  onBack: () => void;
};

export function ExercisesTab({ solvedIds, onSolved, onBack }: ExercisesTabProps) {
  const { t } = useT();
  const [theme, setTheme] = useState<ExerciseTheme | "all">("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);

  const filtered = useMemo(() => {
    if (theme === "all") return exercises;
    return exercises.filter((e) => e.theme === theme);
  }, [theme]);

  const active = activeId ? exercises.find((e) => e.id === activeId) : undefined;

  if (active) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <PracticeBackButton
          onBack={() => setActiveId(null)}
          label={t("hub.exercises.backToList")}
        />
        <ExercisePlayer
          exercise={active}
          solved={solvedIds.has(active.id)}
          onSolved={() => onSolved(active.id)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PracticeBackButton onBack={onBack} />
      <PageHeader
        eyebrow={t("hub.exercises.eyebrow")}
        title={t("hub.exercises.title")}
        description={t("hub.exercises.description", {
          count: exercises.length,
          solved: solvedIds.size,
        })}
      />

      <div className="mb-6">
        <button
          type="button"
          onClick={() => setShowTips((v) => !v)}
          className="text-sm text-primary font-medium hover:underline"
        >
          {showTips ? t("hub.exercises.tips.hide") : t("hub.exercises.tips.show")}
        </button>
        {showTips && (
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground font-light leading-relaxed list-disc pl-5">
            {EXERCISE_CHEATSHEET.map((tip) => (
              <li key={tip}>
                <AcronymText text={tip} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6" role="group" aria-label={t("hub.exercises.filterAria")}>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTheme("all")}
            className={`text-xs font-medium py-1.5 px-3 rounded-lg border transition-colors ${
              theme === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary/40"
            }`}
          >
            {t("hub.exercises.filter.all")}
          </button>
          {EXERCISE_THEMES.map((th) => (
            <button
              key={th}
              type="button"
              onClick={() => setTheme(th)}
              className={`text-xs font-medium py-1.5 px-3 rounded-lg border transition-colors ${
                theme === th
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/40"
              }`}
            >
              {EXERCISE_THEME_LABELS[th]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {t("hub.exercises.filteredCount", { count: filtered.length })}
      </p>

      <ul className="space-y-2">
        {filtered.map((ex) => (
          <ExerciseRow
            key={ex.id}
            exercise={ex}
            solved={solvedIds.has(ex.id)}
            onOpen={() => setActiveId(ex.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function ExerciseRow({
  exercise,
  solved,
  onOpen,
}: {
  exercise: Exercise;
  solved: boolean;
  onOpen: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="w-full flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 text-left hover:border-primary/40 hover:bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-xs font-semibold text-primary tabular-nums">{exercise.id}</span>
            <span className="text-xs text-muted-foreground">
              {EXERCISE_THEME_LABELS[exercise.theme]}
            </span>
            {solved && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden />
                OK
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-foreground truncate m-0">{exercise.title}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden />
      </button>
    </li>
  );
}
