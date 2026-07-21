import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw, CheckCircle2, AlertTriangle, Sparkles, Eye } from "lucide-react";
import { questions } from "@/data/questions";
import { concepts } from "@/data/concepts";
import { getCategoryLabel } from "@/lib/categories";
import {
  buildQueue,
  countBuckets,
  loadSrsStore,
  recordGrade,
  type SrsGrade,
  type SrsStore,
} from "@/lib/srs";
import { PageHeader } from "@/components/ui/page-header";
import { defaultHomeSearch } from "@/lib/route-search";
import { logDailyActivity } from "@/lib/daily-goal";
import { useT } from "@/hooks/useT";

type CardSource = "question" | "concept";

type Flashcard = {
  id: string;
  source: CardSource;
  category: string;
  difficulty?: string;
  front: string;
  back: string;
  backSteps?: string[];
  moreStepsRest?: number;
  hint?: string;
  hubQuestionId?: string;
};

function summarizeSteps(steps: string[], max = 3): { preview: string; rest: number } {
  const slice = steps.slice(0, max);
  const preview = slice
    .map((s, i) => `${i + 1}. ${s}`)
    .join("\n\n")
    .slice(0, 900);
  return { preview, rest: Math.max(0, steps.length - max) };
}

function buildAllCards(): Flashcard[] {
  const qCards: Flashcard[] = (questions as Array<(typeof questions)[number]>).map((q) => {
    const steps = (q!.steps ?? []) as string[];
    const { preview, rest } = summarizeSteps(steps);
    return {
      id: `q-${q!.id}`,
      source: "question",
      category: q!.category,
      difficulty: q!.difficulty,
      front: q!.question,
      back: preview || (q!.explanation ?? ""),
      backSteps: steps,
      moreStepsRest: rest > 0 ? rest : undefined,
      hint: q!.tip,
      hubQuestionId: String(q!.id),
    };
  });
  const cCards: Flashcard[] = (concepts as Array<(typeof concepts)[number]>).map((c) => ({
    id: `c-${c!.id}`,
    source: "concept",
    category: c!.category,
    front: c!.title,
    back: c!.simple,
    hint: c!.formula,
  }));
  return [...qCards, ...cCards];
}

type Mode = "menu" | "session" | "done";

export function FlashcardSession() {
  const allCards = useMemo(() => buildAllCards(), []);

  const [store, setStore] = useState<SrsStore>({});
  const [mode, setMode] = useState<Mode>("menu");
  const [queue, setQueue] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [sessionStats, setSessionStats] = useState({ again: 0, good: 0, easy: 0 });
  const [scope, setScope] = useState<"all" | "questions" | "concepts">("all");

  useEffect(() => {
    setStore(loadSrsStore());
  }, []);

  const scopedCards = useMemo(() => {
    if (scope === "questions") return allCards.filter((c) => c.source === "question");
    if (scope === "concepts") return allCards.filter((c) => c.source === "concept");
    return allCards;
  }, [allCards, scope]);

  const counts = useMemo(() => countBuckets(scopedCards, store), [scopedCards, store]);

  const startSession = () => {
    const q = buildQueue(scopedCards, store, { maxNew: 8, maxTotal: 20 });
    if (q.length === 0) return;
    setQueue(q);
    setIndex(0);
    setRevealed(false);
    setSessionStats({ again: 0, good: 0, easy: 0 });
    setMode("session");
  };

  const handleGrade = (g: SrsGrade) => {
    const card = queue[index];
    if (!card) return;
    const nextState = recordGrade(card.id, g);
    setStore((prev) => ({ ...prev, [card.id]: nextState }));
    setSessionStats((prev) => ({ ...prev, [g]: prev[g] + 1 }));

    if (index + 1 >= queue.length) {
      logDailyActivity("srs", 15);
      setMode("done");
    } else {
      setIndex(index + 1);
      setRevealed(false);
    }
  };

  if (mode === "menu") {
    return (
      <FlashcardMenu
        counts={counts}
        scope={scope}
        onScopeChange={setScope}
        onStart={startSession}
        totalCards={scopedCards.length}
      />
    );
  }

  if (mode === "done") {
    return (
      <SessionDone
        stats={sessionStats}
        total={queue.length}
        onRestart={startSession}
        onBackToMenu={() => setMode("menu")}
      />
    );
  }

  const card = queue[index];
  if (!card) return null;

  return (
    <CardView
      card={card}
      index={index}
      total={queue.length}
      revealed={revealed}
      onReveal={() => setRevealed(true)}
      onGrade={handleGrade}
      onAbort={() => setMode("menu")}
    />
  );
}

// ============================================================================

type CountsType = ReturnType<typeof countBuckets>;

function FlashcardMenu({
  counts,
  scope,
  onScopeChange,
  onStart,
  totalCards,
}: {
  counts: CountsType;
  scope: "all" | "questions" | "concepts";
  onScopeChange: (s: "all" | "questions" | "concepts") => void;
  onStart: () => void;
  totalCards: number;
}) {
  const { t } = useT();
  const reviewable = counts.due + counts.fresh;
  const scopes: { id: "all" | "questions" | "concepts"; labelKey: string }[] = [
    { id: "all", labelKey: "flashcards.scope.all" },
    { id: "questions", labelKey: "flashcards.scope.questions" },
    { id: "concepts", labelKey: "flashcards.scope.concepts" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/"
        search={defaultHomeSearch()}
        className="touch-target-bar gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("flashcards.back")}
      </Link>

      <PageHeader
        eyebrow={t("flashcards.menu.eyebrow")}
        title={t("flashcards.menu.title")}
        description={t("flashcards.menu.description")}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard label={t("flashcards.stat.due")} value={counts.due} tone="alert" />
        <StatCard label={t("flashcards.stat.fresh")} value={counts.fresh} tone="primary" />
        <StatCard label={t("flashcards.stat.later")} value={counts.later} tone="neutral" />
        <StatCard label={t("flashcards.stat.mastered")} value={counts.mastered} tone="success" />
      </div>

      {/* Scope picker */}
      <div className="mb-8">
        <div className="type-label text-primary mb-3">{t("flashcards.scope.label")}</div>
        <div className="flex flex-wrap gap-2">
          {scopes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onScopeChange(s.id)}
              className={`touch-target-bar px-4 rounded-full text-sm font-medium border transition-colors ${
                scope === s.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-primary border-border hover:border-primary/40"
              }`}
            >
              {t(s.labelKey)}
            </button>
          ))}
        </div>
        <p className="text-muted-foreground text-xs mt-2">
          {t("flashcards.scope.count", { totalCards })}
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onStart}
        disabled={reviewable === 0}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-5 h-5" />
        {reviewable === 0
          ? t("flashcards.startEmpty")
          : t("flashcards.start", { count: Math.min(20, reviewable) })}
      </button>

      {reviewable === 0 && counts.later > 0 && (
        <p className="text-muted-foreground text-sm mt-4 font-light">
          {t("flashcards.emptyLaterHint")}
        </p>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "alert" | "primary" | "neutral" | "success";
}) {
  const tones = {
    alert: "bg-amber-50 border-amber-200 text-amber-900",
    primary: "bg-primary/10 border-primary/20 text-foreground",
    neutral: "bg-muted border-border text-muted-foreground",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  } as const;
  return (
    <div className={`rounded-xl border-2 px-4 py-3 ${tones[tone]}`}>
      <div className="text-3xl font-serif">{value}</div>
      <div className="text-xs uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

// ============================================================================

function CardView({
  card,
  index,
  total,
  revealed,
  onReveal,
  onGrade,
  onAbort,
}: {
  card: Flashcard;
  index: number;
  total: number;
  revealed: boolean;
  onReveal: () => void;
  onGrade: (g: SrsGrade) => void;
  onAbort: () => void;
}) {
  const { t } = useT();
  const progress = (index / total) * 100;
  const rest = card.moreStepsRest ?? 0;
  const moreSteps =
    rest > 0
      ? rest === 1
        ? t("flashcards.back.moreSteps", { rest })
        : t("flashcards.back.moreStepsPlural", { rest })
      : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onAbort}
          className="touch-target-bar gap-2 text-primary hover:text-primary/80 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("flashcards.quit")}
        </button>
        <div className="text-primary text-sm font-medium tabular-nums">
          {t("flashcards.progress", { current: index + 1, total })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card */}
      <div className="bg-card rounded-2xl border-2 border-border shadow-card overflow-hidden min-h-[400px] flex flex-col">
        <div className="px-6 py-4 border-b border-border bg-muted/50 flex items-center justify-between">
          <span className="type-label text-primary font-semibold">
            {card.source === "question" ? t("flashcards.badge.question") : t("flashcards.badge.concept")}{" "}
            · {getCategoryLabel(card.category)}
          </span>
          {card.difficulty && (
            <span className="text-xs font-medium py-1 px-2.5 rounded bg-card border border-border text-primary capitalize">
              {card.difficulty}
            </span>
          )}
        </div>

        <div className="flex-1 px-6 py-8 flex flex-col">
          <div className="type-label text-primary mb-3">{t("flashcards.front")}</div>
          <h2 className="type-page-title leading-snug mb-6">{card.front}</h2>

          {revealed && (
            <>
              <div className="border-t border-dashed border-border my-4" />
              <div className="type-label text-primary mb-3">{t("flashcards.backLabel")}</div>
              <p className="text-foreground leading-relaxed font-light text-base sm:text-lg whitespace-pre-line">
                {card.back}
                {moreSteps ? `\n\n${moreSteps}` : ""}
              </p>
              {card.hubQuestionId && (
                <Link
                  to="/"
                  search={{ tab: "questions" }}
                  className="inline-block mt-4 text-sm text-primary hover:text-primary/80 font-medium underline"
                >
                  {t("flashcards.fullAnswerLink")}
                </Link>
              )}
              {card.hint && (
                <div className="mt-5 rounded-lg bg-primary text-primary-foreground px-4 py-3">
                  <div className="text-primary-foreground/70 text-xs uppercase tracking-[0.2em] font-medium mb-1">
                    💡{" "}
                    {card.source === "concept"
                      ? t("flashcards.hint.formula")
                      : t("flashcards.hint.tip")}
                  </div>
                  <p className="text-sm font-light leading-relaxed">{card.hint}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6">
        {!revealed ? (
          <button
            type="button"
            onClick={onReveal}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Eye className="w-5 h-5" />
            {t("flashcards.reveal")}
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <GradeButton
              tone="red"
              icon={<AlertTriangle className="w-5 h-5" />}
              label={t("flashcards.grade.again")}
              sub={t("flashcards.grade.againSub")}
              onClick={() => onGrade("again")}
            />
            <GradeButton
              tone="blue"
              icon={<RotateCcw className="w-5 h-5" />}
              label={t("flashcards.grade.good")}
              sub={t("flashcards.grade.goodSub")}
              onClick={() => onGrade("good")}
            />
            <GradeButton
              tone="emerald"
              icon={<CheckCircle2 className="w-5 h-5" />}
              label={t("flashcards.grade.easy")}
              sub={t("flashcards.grade.easySub")}
              onClick={() => onGrade("easy")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function GradeButton({
  tone,
  icon,
  label,
  sub,
  onClick,
}: {
  tone: "red" | "blue" | "emerald";
  icon: React.ReactNode;
  label: string;
  sub: string;
  onClick: () => void;
}) {
  const tones = {
    red: "bg-red-50 border-red-200 text-red-900 hover:bg-red-100 hover:border-red-300",
    blue: "bg-primary/10 border-primary/20 text-foreground hover:bg-primary/15 hover:border-primary/30",
    emerald:
      "bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-300",
  } as const;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 flex-col items-center justify-center gap-1 px-3 py-4 rounded-xl border-2 transition-colors ${tones[tone]}`}
    >
      {icon}
      <span className="text-sm font-semibold mt-1">{label}</span>
      <span className="text-xs opacity-70">{sub}</span>
    </button>
  );
}

// ============================================================================

function SessionDone({
  stats,
  total,
  onRestart,
  onBackToMenu,
}: {
  stats: { again: number; good: number; easy: number };
  total: number;
  onRestart: () => void;
  onBackToMenu: () => void;
}) {
  const { t } = useT();
  const successRate = total > 0 ? Math.round(((stats.good + stats.easy) / total) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-6">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h1 className="type-display mb-3">{t("flashcards.done.title")}</h1>
      <p className="type-body-muted mb-10">
        {t("flashcards.done.summary", { total, successRate })}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-10">
        <div className="rounded-xl border-2 border-red-200 bg-red-50 px-3 py-4">
          <div className="text-3xl font-serif text-red-900">{stats.again}</div>
          <div className="text-xs uppercase tracking-wider text-red-700 mt-1">
            {t("flashcards.done.again")}
          </div>
        </div>
        <div className="rounded-xl border-2 border-primary/20 bg-primary/10 px-3 py-4">
          <div className="text-3xl font-serif text-foreground">{stats.good}</div>
          <div className="type-label text-primary mt-1">{t("flashcards.done.good")}</div>
        </div>
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-4">
          <div className="text-3xl font-serif text-emerald-900">{stats.easy}</div>
          <div className="text-xs uppercase tracking-wider text-emerald-700 mt-1">
            {t("flashcards.done.easy")}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          {t("flashcards.done.newSession")}
        </button>
        <button
          type="button"
          onClick={onBackToMenu}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-card border-2 border-border text-foreground font-medium hover:border-primary/40 transition-colors"
        >
          {t("flashcards.done.backToMenu")}
        </button>
      </div>
    </div>
  );
}
