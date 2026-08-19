import { useMemo, useState } from "react";
import { Calculator, CheckCircle2, ChevronRight, List, MessageSquare } from "lucide-react";
import {
  EXERCISE_THEMES,
  getExercises,
  getExerciseThemeLabel,
  type Exercise,
  type ExerciseTheme,
} from "@/data/exercises";
import { ExercisePlayer } from "@/components/hub/ExercisePlayer";
import { PracticeBackButton } from "@/components/hub/PracticeHub";
import { PageHeader } from "@/components/ui/page-header";
import { getChapterProgress } from "@/lib/exercise-progress";
import { useT } from "@/hooks/useT";

type ExercisesTabProps = {
  solvedIds: Set<string>;
  onSolved: (id: string) => void;
  onBack: () => void;
};

type ExercisesView =
  | { kind: "chapters" }
  | { kind: "chapter"; theme: ExerciseTheme }
  | { kind: "player"; theme: ExerciseTheme; id: string };

type SectionGroup = { section: string; exercises: Exercise[] };

function groupBySection(exercises: Exercise[]): SectionGroup[] {
  const groups: SectionGroup[] = [];
  let current: SectionGroup | null = null;
  for (const ex of exercises) {
    const sec = ex.section ?? "";
    if (!current || current.section !== sec) {
      current = { section: sec, exercises: [] };
      groups.push(current);
    }
    current.exercises.push(ex);
  }
  return groups;
}

const KIND_ICON = {
  numeric: Calculator,
  choice: List,
  open: MessageSquare,
} as const;

const KIND_LABEL: Record<string, string> = {
  numeric: "Calcul",
  choice: "QCM",
  open: "Ouverte",
};

export function ExercisesTab({ solvedIds, onSolved, onBack }: ExercisesTabProps) {
  const { t, locale } = useT();
  const exercises = getExercises(locale);
  const [view, setView] = useState<ExercisesView>({ kind: "chapters" });

  const validTheme = view.kind === "chapters" || !EXERCISE_THEMES.includes(view.theme)
    ? null
    : view.theme;

  const chapterExercises = useMemo(() => {
    if (!validTheme) return [];
    return exercises.filter((exercise) => exercise.theme === validTheme);
  }, [exercises, validTheme]);

  const active =
    view.kind === "player" && validTheme
      ? chapterExercises.find((exercise) => exercise.id === view.id)
      : undefined;

  if (active && validTheme) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <PracticeBackButton
          onBack={() => setView({ kind: "chapter", theme: validTheme })}
          label={t("hub.exercises.backToChapter")}
        />
        <ExercisePlayer
          exercise={active}
          solved={solvedIds.has(active.id)}
          onSolved={() => onSolved(active.id)}
        />
      </div>
    );
  }

  if (validTheme) {
    const title = getExerciseThemeLabel(validTheme, t);
    const sections = groupBySection(chapterExercises);
    const chapterProgress = getChapterProgress(chapterExercises, solvedIds);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <PracticeBackButton
          onBack={() => setView({ kind: "chapters" })}
          label={t("hub.exercises.backToChapters")}
        />
        <PageHeader size="page" title={title} />
        {chapterProgress.percent !== null && (
          <div className="mb-8 space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="tabular-nums">
                {t("hub.exercises.progressCount", {
                  solved: chapterProgress.solved,
                  total: chapterProgress.total,
                })}
              </span>
              <span className="tabular-nums text-primary font-semibold">
                {t("hub.exercises.progressPercent", { percent: chapterProgress.percent })}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${chapterProgress.percent}%` }}
              />
            </div>
          </div>
        )}
        {chapterExercises.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground font-light py-16 m-0">
            {t("hub.exercises.emptyChapter")}
          </p>
        ) : (
          <div className="space-y-8">
            {sections.map((group) => {
              const sectionSolved = group.exercises.filter((e) => solvedIds.has(e.id)).length;
              const allDone = sectionSolved === group.exercises.length;
              return (
                <section key={group.section}>
                  {group.section && (
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-sm font-semibold text-foreground m-0">{group.section}</h3>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {sectionSolved}/{group.exercises.length}
                      </span>
                      {allDone && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" aria-hidden />
                      )}
                    </div>
                  )}
                  <ul className="space-y-2">
                    {group.exercises.map((exercise) => (
                      <ExerciseRow
                        key={exercise.id}
                        exercise={exercise}
                        solved={solvedIds.has(exercise.id)}
                        onOpen={() =>
                          setView({ kind: "player", theme: validTheme, id: exercise.id })
                        }
                      />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PracticeBackButton onBack={onBack} />
      <PageHeader
        eyebrow={t("hub.exercises.eyebrow")}
        title={t("hub.exercises.title")}
        description={t("hub.exercises.description")}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXERCISE_THEMES.map((theme) => {
          const items = exercises.filter((exercise) => exercise.theme === theme);
          const progress = getChapterProgress(items, solvedIds);
          return (
            <li key={theme}>
              <ExerciseChapterCard
                title={getExerciseThemeLabel(theme, t)}
                progress={progress}
                noExercisesLabel={t("hub.exercises.noExercises")}
                progressCount={t("hub.exercises.progressCount", {
                  solved: progress.solved,
                  total: progress.total,
                })}
                progressPercent={
                  progress.percent === null
                    ? ""
                    : t("hub.exercises.progressPercent", { percent: progress.percent })
                }
                onOpen={() => setView({ kind: "chapter", theme })}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ExerciseChapterCard({
  title,
  progress,
  noExercisesLabel,
  progressCount,
  progressPercent,
  onOpen,
}: {
  title: string;
  progress: ReturnType<typeof getChapterProgress>;
  noExercisesLabel: string;
  progressCount: string;
  progressPercent: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-full min-h-[8.5rem] w-full flex-col justify-between rounded-2xl border border-border bg-card/80 p-5 text-left transition-all hover:border-primary/40 hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <h3 className="text-base font-semibold text-foreground m-0 line-clamp-2">{title}</h3>
      {progress.percent === null ? (
        <p className="text-xs text-muted-foreground m-0 mt-6">{noExercisesLabel}</p>
      ) : (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="tabular-nums">{progressCount}</span>
            <span className="tabular-nums text-primary font-medium">{progressPercent}</span>
          </div>
          <div
            className="h-1.5 bg-muted rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={progressPercent}
          >
            <div className="h-full bg-primary transition-all" style={{ width: `${progress.percent}%` }} />
          </div>
        </div>
      )}
    </button>
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
  const kind = exercise.variants[0]?.kind ?? "open";
  const Icon = KIND_ICON[kind] ?? MessageSquare;
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
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              <Icon className="w-3 h-3" aria-hidden />
              {KIND_LABEL[kind] ?? kind}
            </span>
            {solved && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" aria-hidden />
            )}
          </div>
          <p className="text-sm font-medium text-foreground truncate m-0">{exercise.title}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden />
      </button>
    </li>
  );
}
