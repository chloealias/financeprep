import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Eye, Clock, Trophy, RotateCcw } from "lucide-react";
import { questions } from "@/data/questions";
import { getCategoryLabel } from "@/lib/categories";
import { shuffle } from "@/lib/srs";

type QuizQuestion = {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  steps: string[];
  tip?: string;
};

function buildPool(): QuizQuestion[] {
  return (questions as Array<(typeof questions)[number]>).map((q) => ({
    id: String(q!.id),
    category: q!.category,
    difficulty: q!.difficulty,
    question: q!.question,
    steps: q!.steps as string[],
    tip: q!.tip,
  }));
}

type Mode = "setup" | "playing" | "done";

type Answer = {
  question: QuizQuestion;
  correct: boolean;
  timeMs: number;
};

const SECONDS_PER_Q = 60;

export function QuizSession({ onBack }: { onBack: () => void }) {
  const pool = useMemo(() => buildPool(), []);

  const [mode, setMode] = useState<Mode>("setup");
  const [size, setSize] = useState<5 | 10 | 20>(10);
  const [queue, setQueue] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [remaining, setRemaining] = useState(0);
  const startedAtRef = useRef<number>(0);
  const questionStartRef = useRef<number>(0);

  // Timer
  useEffect(() => {
    if (mode !== "playing") return;
    const tick = () => {
      const total = queue.length * SECONDS_PER_Q * 1000;
      const elapsed = Date.now() - startedAtRef.current;
      const left = Math.max(0, total - elapsed);
      setRemaining(left);
      if (left <= 0) finish();
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, queue.length]);

  const start = () => {
    const picked = shuffle(pool).slice(0, size);
    setQueue(picked);
    setIndex(0);
    setRevealed(false);
    setAnswers([]);
    startedAtRef.current = Date.now();
    questionStartRef.current = Date.now();
    setMode("playing");
  };

  const recordAndNext = (correct: boolean) => {
    const q = queue[index];
    if (!q) return;
    const ans: Answer = { question: q, correct, timeMs: Date.now() - questionStartRef.current };
    const next = [...answers, ans];
    setAnswers(next);
    if (index + 1 >= queue.length) {
      finishWith(next);
    } else {
      setIndex(index + 1);
      setRevealed(false);
      questionStartRef.current = Date.now();
    }
  };

  const finish = () => finishWith(answers);
  const finishWith = (final: Answer[]) => {
    setAnswers(final);
    setMode("done");
  };

  if (mode === "setup") {
    return (
      <QuizSetup
        size={size}
        onSizeChange={setSize}
        onStart={start}
        onBack={onBack}
        poolSize={pool.length}
      />
    );
  }

  if (mode === "done") {
    return (
      <QuizResults
        answers={answers}
        total={queue.length}
        onRestart={() => setMode("setup")}
        onBack={onBack}
      />
    );
  }

  const q = queue[index];
  if (!q) return null;

  return (
    <QuizPlay
      q={q}
      index={index}
      total={queue.length}
      revealed={revealed}
      onReveal={() => setRevealed(true)}
      onAnswer={recordAndNext}
      remainingMs={remaining}
      onAbort={() => setMode("setup")}
    />
  );
}

// ============================================================================

function QuizSetup({
  size,
  onSizeChange,
  onStart,
  onBack,
  poolSize,
}: {
  size: 5 | 10 | 20;
  onSizeChange: (s: 5 | 10 | 20) => void;
  onStart: () => void;
  onBack: () => void;
  poolSize: number;
}) {
  const sizes: Array<5 | 10 | 20> = [5, 10, 20];
  const minutes = (size * SECONDS_PER_Q) / 60;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au menu
      </button>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-blue-700" />
          <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">
            Mode entretien
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
          Quiz <span className="italic font-light text-blue-700">chronométré</span>
        </h1>
        <p className="text-blue-700 mt-3 font-light max-w-2xl">
          {poolSize} questions au hasard, {SECONDS_PER_Q}s par question. Auto-évaluation après
          chaque réponse, score final et liste des questions ratées.
        </p>
      </div>

      <div className="mb-8">
        <div className="text-xs uppercase tracking-wider text-blue-700 font-medium mb-3">
          Nombre de questions
        </div>
        <div className="grid grid-cols-3 gap-3">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSizeChange(s)}
              className={`px-4 py-5 rounded-xl border-2 font-medium transition-colors ${
                size === s
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-white text-blue-900 border-blue-200 hover:border-blue-400"
              }`}
            >
              <div className="text-3xl font-serif">{s}</div>
              <div className="text-xs uppercase tracking-wider mt-1 opacity-80">
                ~{(s * SECONDS_PER_Q) / 60} min
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all"
      >
        <Clock className="w-5 h-5" />
        Lancer le quiz ({minutes} min)
      </button>
    </div>
  );
}

// ============================================================================

function formatTime(ms: number): string {
  const totalSec = Math.ceil(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function QuizPlay({
  q,
  index,
  total,
  revealed,
  onReveal,
  onAnswer,
  remainingMs,
  onAbort,
}: {
  q: QuizQuestion;
  index: number;
  total: number;
  revealed: boolean;
  onReveal: () => void;
  onAnswer: (correct: boolean) => void;
  remainingMs: number;
  onAbort: () => void;
}) {
  const progress = (index / total) * 100;
  const danger = remainingMs < 30_000;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6 gap-3">
        <button
          type="button"
          onClick={onAbort}
          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Quitter
        </button>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-semibold tabular-nums ${
            danger ? "bg-red-100 text-red-800 animate-pulse" : "bg-blue-100 text-blue-900"
          }`}
        >
          <Clock className="w-4 h-4" />
          {formatTime(remainingMs)}
        </div>
        <div className="text-blue-700 text-sm font-medium tabular-nums">
          {index + 1} / {total}
        </div>
      </div>

      <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-blue-100 bg-blue-50/50 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-blue-700 font-semibold">
            {getCategoryLabel(q.category)}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-white border border-blue-200 text-blue-700 capitalize">
            {q.difficulty}
          </span>
        </div>

        <div className="px-6 py-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-blue-950 leading-snug mb-6">
            {q.question}
          </h2>

          {revealed && (
            <>
              <div className="border-t border-dashed border-blue-200 my-4" />
              <div className="text-blue-700 text-xs uppercase tracking-wider font-medium mb-3">
                Réponse modèle
              </div>
              <ol className="space-y-3">
                {q.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 bg-blue-50 rounded-lg p-4">
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-700 text-white font-serif text-xs flex items-center justify-center">
                      {i + 1}
                    </div>
                    <p className="text-blue-900 leading-relaxed flex-1 text-sm">{step}</p>
                  </li>
                ))}
              </ol>
              {q.tip && (
                <div className="mt-5 rounded-lg bg-gradient-to-r from-indigo-900 to-blue-900 text-white px-4 py-3">
                  <div className="text-blue-200 text-xs uppercase tracking-[0.2em] font-medium mb-1">
                    💡 Conseil de pro
                  </div>
                  <p className="text-sm font-light leading-relaxed">{q.tip}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-6">
        {!revealed ? (
          <button
            type="button"
            onClick={onReveal}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors"
          >
            <Eye className="w-5 h-5" />
            Voir la réponse modèle
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onAnswer(false)}
              className="flex flex-col items-center justify-center gap-1 px-3 py-5 rounded-xl border-2 bg-red-50 border-red-200 text-red-900 hover:bg-red-100 hover:border-red-300 transition-colors"
            >
              <XCircle className="w-6 h-6" />
              <span className="text-sm font-semibold mt-1">Raté</span>
            </button>
            <button
              type="button"
              onClick={() => onAnswer(true)}
              className="flex flex-col items-center justify-center gap-1 px-3 py-5 rounded-xl border-2 bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-300 transition-colors"
            >
              <CheckCircle2 className="w-6 h-6" />
              <span className="text-sm font-semibold mt-1">Réussi</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================

function QuizResults({
  answers,
  total,
  onRestart,
  onBack,
}: {
  answers: Answer[];
  total: number;
  onRestart: () => void;
  onBack: () => void;
}) {
  const correct = answers.filter((a) => a.correct).length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  const missed = answers.filter((a) => !a.correct);

  // Weak categories
  const byCat: Record<string, { ok: number; ko: number }> = {};
  for (const a of answers) {
    const k = a.question.category;
    byCat[k] = byCat[k] ?? { ok: 0, ko: 0 };
    if (a.correct) byCat[k]!.ok++;
    else byCat[k]!.ko++;
  }
  const weakCategories = Object.entries(byCat)
    .filter(([, v]) => v.ko > v.ok)
    .map(([k, v]) => ({ cat: k, ko: v.ko, ok: v.ok }));

  const tone = score >= 80 ? "emerald" : score >= 50 ? "amber" : "red";
  const toneClasses = {
    emerald: "from-emerald-700 to-emerald-900",
    amber: "from-amber-600 to-amber-800",
    red: "from-red-700 to-red-900",
  } as const;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <div
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${toneClasses[tone]} text-white mb-6 shadow-xl`}
        >
          <Trophy className="w-10 h-10" />
        </div>
        <div className="text-7xl font-serif text-blue-950 mb-2 tabular-nums">{score}%</div>
        <p className="text-blue-700 font-light">
          {correct} / {total} questions réussies
        </p>
      </div>

      {weakCategories.length > 0 && (
        <div className="mb-8 rounded-xl bg-amber-50 border-2 border-amber-200 p-5">
          <div className="text-amber-900 text-xs uppercase tracking-[0.2em] font-bold mb-2">
            Points faibles à retravailler
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {weakCategories.map((w) => (
              <span
                key={w.cat}
                className="px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-900 text-sm font-medium"
              >
                {getCategoryLabel(w.cat)} · {w.ok}/{w.ok + w.ko}
              </span>
            ))}
          </div>
        </div>
      )}

      {missed.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-serif text-blue-950 mb-4">
            Questions ratées ({missed.length})
          </h2>
          <ul className="space-y-2">
            {missed.map((a, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg bg-white border border-red-200"
              >
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-red-700 uppercase tracking-wider font-semibold mb-1">
                    {getCategoryLabel(a.question.category)} · {a.question.difficulty}
                  </div>
                  <div className="text-blue-950 text-sm leading-snug">{a.question.question}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Nouveau quiz
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-blue-200 text-blue-900 font-medium hover:border-blue-400 transition-colors"
        >
          Retour au menu
        </button>
      </div>
    </div>
  );
}
