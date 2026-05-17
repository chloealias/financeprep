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

type CardSource = "question" | "concept";

type Flashcard = {
  id: string;
  source: CardSource;
  category: string;
  difficulty?: string;
  front: string;
  back: string;
  hint?: string;
};

function buildAllCards(): Flashcard[] {
  const qCards: Flashcard[] = (questions as Array<(typeof questions)[number]>).map((q) => ({
    id: `q-${q!.id}`,
    source: "question",
    category: q!.category,
    difficulty: q!.difficulty,
    front: q!.question,
    back: q!.steps?.[0] ?? q!.explanation,
    hint: q!.tip,
  }));
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
  const reviewable = counts.due + counts.fresh;
  const scopes: { id: "all" | "questions" | "concepts"; label: string }[] = [
    { id: "all", label: "Tout mélanger" },
    { id: "questions", label: "Questions uniquement" },
    { id: "concepts", label: "Notions uniquement" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-blue-700" />
          <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">
            Entraînement actif
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
          Flashcards <span className="italic font-light text-blue-700">spaced repetition</span>
        </h1>
        <p className="text-blue-700 mt-3 font-light max-w-2xl">
          Algorithme SM-2 : les cartes ratées reviennent vite, celles que vous maîtrisez
          s&apos;espacent dans le temps. 20 cartes par session, 5 minutes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard label="À revoir" value={counts.due} tone="alert" />
        <StatCard label="Nouvelles" value={counts.fresh} tone="primary" />
        <StatCard label="Programmées" value={counts.later} tone="neutral" />
        <StatCard label="Maîtrisées" value={counts.mastered} tone="success" />
      </div>

      {/* Scope picker */}
      <div className="mb-8">
        <div className="text-xs uppercase tracking-wider text-blue-700 font-medium mb-3">
          Périmètre
        </div>
        <div className="flex flex-wrap gap-2">
          {scopes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onScopeChange(s.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                scope === s.id
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-white text-blue-700 border-blue-200 hover:border-blue-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-blue-500 text-xs mt-2">{totalCards} cartes dans ce périmètre.</p>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onStart}
        disabled={reviewable === 0}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-5 h-5" />
        {reviewable === 0
          ? "Aucune carte à réviser maintenant"
          : `Démarrer la session (${Math.min(20, reviewable)} cartes)`}
      </button>

      {reviewable === 0 && counts.later > 0 && (
        <p className="text-blue-600 text-sm mt-4 font-light">
          Toutes les cartes sont déjà programmées pour plus tard. Revenez demain ou changez de
          périmètre.
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
    primary: "bg-blue-50 border-blue-200 text-blue-900",
    neutral: "bg-slate-50 border-slate-200 text-slate-700",
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
  const progress = (index / total) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onAbort}
          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Quitter
        </button>
        <div className="text-blue-700 text-sm font-medium tabular-nums">
          {index + 1} / {total}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-lg overflow-hidden min-h-[400px] flex flex-col">
        <div className="px-6 py-4 border-b border-blue-100 bg-blue-50/50 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-blue-700 font-semibold">
            {card.source === "question" ? "Question" : "Notion"} · {getCategoryLabel(card.category)}
          </span>
          {card.difficulty && (
            <span className="text-xs px-2 py-0.5 rounded bg-white border border-blue-200 text-blue-700 capitalize">
              {card.difficulty}
            </span>
          )}
        </div>

        <div className="flex-1 px-6 py-8 flex flex-col">
          <div className="text-blue-700 text-xs uppercase tracking-wider font-medium mb-3">
            Recto
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-blue-950 leading-snug mb-6">
            {card.front}
          </h2>

          {revealed && (
            <>
              <div className="border-t border-dashed border-blue-200 my-4" />
              <div className="text-blue-700 text-xs uppercase tracking-wider font-medium mb-3">
                Verso
              </div>
              <p className="text-blue-900 leading-relaxed font-light text-base sm:text-lg">
                {card.back}
              </p>
              {card.hint && (
                <div className="mt-5 rounded-lg bg-gradient-to-r from-indigo-900 to-blue-900 text-white px-4 py-3">
                  <div className="text-blue-200 text-xs uppercase tracking-[0.2em] font-medium mb-1">
                    💡 {card.source === "concept" ? "Formule" : "Conseil"}
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
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors"
          >
            <Eye className="w-5 h-5" />
            Révéler la réponse
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <GradeButton
              tone="red"
              icon={<AlertTriangle className="w-5 h-5" />}
              label="À revoir"
              sub="10 min"
              onClick={() => onGrade("again")}
            />
            <GradeButton
              tone="blue"
              icon={<RotateCcw className="w-5 h-5" />}
              label="Correct"
              sub="bientôt"
              onClick={() => onGrade("good")}
            />
            <GradeButton
              tone="emerald"
              icon={<CheckCircle2 className="w-5 h-5" />}
              label="Maîtrisé"
              sub="plus tard"
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
    blue: "bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100 hover:border-blue-300",
    emerald:
      "bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-300",
  } as const;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-3 py-4 rounded-xl border-2 transition-colors ${tones[tone]}`}
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
  const successRate = total > 0 ? Math.round(((stats.good + stats.easy) / total) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-700 to-indigo-800 text-white mb-6">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-serif text-blue-950 mb-3">Session terminée</h1>
      <p className="text-blue-700 font-light mb-10">
        {total} cartes révisées · {successRate}% de réussite
      </p>

      <div className="grid grid-cols-3 gap-3 mb-10">
        <div className="rounded-xl border-2 border-red-200 bg-red-50 px-3 py-4">
          <div className="text-3xl font-serif text-red-900">{stats.again}</div>
          <div className="text-xs uppercase tracking-wider text-red-700 mt-1">À revoir</div>
        </div>
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 px-3 py-4">
          <div className="text-3xl font-serif text-blue-900">{stats.good}</div>
          <div className="text-xs uppercase tracking-wider text-blue-700 mt-1">Correct</div>
        </div>
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-4">
          <div className="text-3xl font-serif text-emerald-900">{stats.easy}</div>
          <div className="text-xs uppercase tracking-wider text-emerald-700 mt-1">Maîtrisé</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Nouvelle session
        </button>
        <button
          type="button"
          onClick={onBackToMenu}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-blue-200 text-blue-900 font-medium hover:border-blue-400 transition-colors"
        >
          Retour au menu
        </button>
      </div>
    </div>
  );
}
