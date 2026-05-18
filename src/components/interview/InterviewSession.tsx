import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Copy,
  Eye,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { StarRating } from "@/components/interview/StarRating";
import { getCategoryLabel } from "@/lib/categories";
import {
  buildInterviewPack,
  getPackItemGuideLinks,
  packItemCategory,
  packItemLabel,
  packItemSrsId,
  packTotalSeconds,
  type InterviewPackItem,
} from "@/lib/interview-pack";
import { buildInterviewMarkdown, computeWeakCategories } from "@/lib/interview-report";
import { loadSrsStore, recordGrade } from "@/lib/srs";
import {
  loadRatings,
  mergeRatingFromInterview,
  saveInterviewSession,
  type InterviewSessionAnswer,
  type InterviewSessionRecord,
} from "@/lib/storage";

export type InterviewSessionMode = "mini" | "full";

type SessionAnswer = InterviewSessionAnswer & { srsId: string | null };

type Props = {
  mode: InterviewSessionMode;
  packSize?: 5 | 7;
  /** Limite globale optionnelle (ex. 30 min en mode full). */
  globalLimitMs?: number;
  onBack: () => void;
};

type Phase = "playing" | "done";

function formatTime(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function itemQuestion(item: InterviewPackItem): string {
  return item.question;
}

function itemSteps(item: InterviewPackItem): string[] {
  return item.steps;
}

function itemTip(item: InterviewPackItem): string | undefined {
  if ("tip" in item && item.tip) return item.tip;
  return undefined;
}

export function InterviewSession({ mode, packSize = 5, globalLimitMs, onBack }: Props) {
  const ratings = useMemo(() => (typeof window !== "undefined" ? loadRatings() : {}), []);
  const srsStore = useMemo(() => (typeof window !== "undefined" ? loadSrsStore() : {}), []);

  const pack = useMemo(
    () => buildInterviewPack({ ratings, srsStore, size: packSize }),
    [ratings, srsStore, packSize],
  );

  const [phase, setPhase] = useState<Phase>("playing");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<SessionAnswer[]>([]);
  const [remainingQ, setRemainingQ] = useState(0);
  const [remainingGlobal, setRemainingGlobal] = useState(globalLimitMs ?? 0);

  const [stars, setStars] = useState(0);
  const [structureOk, setStructureOk] = useState(false);
  const [numbersOk, setNumbersOk] = useState(false);

  const startedAtRef = useRef(Date.now());
  const questionStartRef = useRef(Date.now());
  const sessionIdRef = useRef(`int-${Date.now()}`);

  const current = pack[index];
  const total = pack.length;

  useEffect(() => {
    if (phase !== "playing" || !current) return;
    setRemainingQ(current.secondsLimit * 1000);
    questionStartRef.current = Date.now();
    setRevealed(false);
    setStars(0);
    setStructureOk(false);
    setNumbersOk(false);
  }, [index, phase, current]);

  useEffect(() => {
    if (phase !== "playing" || !current) return;
    const tick = () => {
      const elapsedQ = Date.now() - questionStartRef.current;
      const leftQ = Math.max(0, current.secondsLimit * 1000 - elapsedQ);
      setRemainingQ(leftQ);

      if (globalLimitMs) {
        const elapsedG = Date.now() - startedAtRef.current;
        const leftG = Math.max(0, globalLimitMs - elapsedG);
        setRemainingGlobal(leftG);
        if (leftG <= 0) finishSession(answers);
      }

      if (leftQ <= 0 && !revealed) setRevealed(true);
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, index, current, globalLimitMs, revealed]);

  const finishSession = (final: SessionAnswer[]) => {
    const durationMs = Date.now() - startedAtRef.current;
    const rated = final.filter((a) => a.stars > 0);
    const avgStars = rated.length > 0 ? rated.reduce((s, a) => s + a.stars, 0) / rated.length : 0;

    const record: InterviewSessionRecord = {
      id: sessionIdRef.current,
      mode,
      startedAt: startedAtRef.current,
      durationMs,
      packSize: total,
      answers: final.map(({ srsId: _s, ...rest }) => rest),
      avgStars,
    };
    saveInterviewSession(record);
    setAnswers(final);
    setPhase("done");
  };

  const submitAnswer = () => {
    if (!current || stars < 1) return;
    const timeMs = Date.now() - questionStartRef.current;
    const itemId =
      current.kind === "question"
        ? current.id
        : current.kind === "deal"
          ? current.dealId
          : current.kind === "sector"
            ? current.sectorId
            : current.id;

    if (current.kind === "question") {
      mergeRatingFromInterview(current.id, stars);
    }

    const ans: SessionAnswer = {
      itemKind: current.kind,
      itemId,
      label: packItemLabel(current),
      category: packItemCategory(current),
      question: itemQuestion(current),
      stars,
      structureOk,
      numbersOk,
      timeMs,
      srsId: packItemSrsId(current),
    };

    const next = [...answers, ans];
    if (index + 1 >= total) {
      finishSession(next);
    } else {
      setAnswers(next);
      setIndex(index + 1);
    }
  };

  if (phase === "done") {
    return (
      <InterviewResults
        mode={mode}
        answers={answers}
        total={total}
        startedAt={startedAtRef.current}
        onRestart={() => {
          sessionIdRef.current = `int-${Date.now()}`;
          startedAtRef.current = Date.now();
          setAnswers([]);
          setIndex(0);
          setPhase("playing");
        }}
        onBack={onBack}
      />
    );
  }

  if (!current) return null;

  const progress = (index / total) * 100;
  const danger = remainingQ < 30_000;
  const guideLinks = getPackItemGuideLinks(current);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Quitter
        </button>
        <div className="flex items-center gap-2">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-semibold tabular-nums ${
              danger ? "bg-red-100 text-red-800 animate-pulse" : "bg-blue-100 text-blue-900"
            }`}
          >
            <Clock className="w-4 h-4" />
            {formatTime(remainingQ)}
          </div>
          {globalLimitMs ? (
            <span className="text-xs text-blue-600 font-medium tabular-nums">
              Global {formatTime(remainingGlobal)}
            </span>
          ) : null}
        </div>
        <span className="text-blue-700 text-sm font-medium tabular-nums">
          {index + 1} / {total}
        </span>
      </div>

      <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <span className="text-xs uppercase tracking-wider text-indigo-800 font-semibold bg-indigo-50 px-2 py-1 rounded">
          {packItemLabel(current)}
        </span>
        {current.kind === "question" && (
          <>
            <span className="text-xs uppercase tracking-wider text-blue-700">
              {getCategoryLabel(current.category)}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-white border border-blue-200 text-blue-700 capitalize">
              {current.difficulty}
            </span>
          </>
        )}
      </div>

      <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-blue-950 leading-snug mb-6">
            {itemQuestion(current)}
          </h2>

          {revealed && (
            <>
              <div className="border-t border-dashed border-blue-200 my-4" />
              <div className="text-blue-700 text-xs uppercase tracking-wider font-medium mb-3">
                Réponse modèle
              </div>
              <ol className="space-y-3">
                {itemSteps(current).map((step, i) => (
                  <li key={i} className="flex gap-4 bg-blue-50 rounded-lg p-4">
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-700 text-white font-serif text-xs flex items-center justify-center">
                      {i + 1}
                    </div>
                    <p className="text-blue-900 leading-relaxed flex-1 text-sm">{step}</p>
                  </li>
                ))}
              </ol>
              {itemTip(current) && (
                <div className="mt-5 rounded-lg bg-gradient-to-r from-indigo-900 to-blue-900 text-white px-4 py-3">
                  <div className="text-blue-200 text-xs uppercase tracking-[0.2em] font-medium mb-1">
                    Conseil
                  </div>
                  <p className="text-sm font-light leading-relaxed">{itemTip(current)}</p>
                </div>
              )}
              {guideLinks.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {guideLinks.map((link) => (
                    <Link
                      key={`${link.to}-${link.label}`}
                      to={link.to}
                      search={link.search}
                      params={link.params}
                      className="text-sm text-blue-700 hover:text-blue-900 font-medium underline"
                    >
                      {link.label}
                    </Link>
                  ))}
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
            onClick={() => setRevealed(true)}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors"
          >
            <Eye className="w-5 h-5" />
            Voir la réponse modèle
          </button>
        ) : (
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-blue-100 p-5">
              <div className="text-xs uppercase tracking-wider text-blue-700 font-medium mb-3">
                Auto-évaluation (1–5)
              </div>
              <StarRating value={stars} onChange={setStars} size="lg" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-blue-100 bg-white cursor-pointer hover:border-blue-300">
                <input
                  type="checkbox"
                  checked={structureOk}
                  onChange={(e) => setStructureOk(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-blue-950">Structure claire (Pyramid / STAR)</span>
              </label>
              <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-blue-100 bg-white cursor-pointer hover:border-blue-300">
                <input
                  type="checkbox"
                  checked={numbersOk}
                  onChange={(e) => setNumbersOk(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-blue-950">Chiffres et précision corrects</span>
              </label>
            </div>
            <button
              type="button"
              disabled={stars < 1}
              onClick={submitAnswer}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-5 h-5" />
              {index + 1 >= total ? "Terminer la session" : "Question suivante"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InterviewResults({
  mode,
  answers,
  total,
  startedAt,
  onRestart,
  onBack,
}: {
  mode: InterviewSessionMode;
  answers: SessionAnswer[];
  total: number;
  startedAt: number;
  onRestart: () => void;
  onBack: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [srsAdded, setSrsAdded] = useState(false);

  const rated = answers.filter((a) => a.stars > 0);
  const avg = rated.length > 0 ? rated.reduce((s, a) => s + a.stars, 0) / rated.length : 0;
  const scorePct = Math.round((avg / 5) * 100);
  const weak = answers.filter((a) => a.stars > 0 && a.stars <= 2);
  const weakCats = computeWeakCategories(answers);

  const session: InterviewSessionRecord = {
    id: "report",
    mode,
    startedAt,
    durationMs: answers.reduce((s, a) => s + a.timeMs, 0),
    packSize: total,
    answers: answers.map(({ srsId: _s, ...rest }) => rest),
    avgStars: avg,
  };

  const markdown = buildInterviewMarkdown(session, weakCats);

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const addWeakToSrs = () => {
    for (const a of weak) {
      if (a.srsId) recordGrade(a.srsId, "again");
    }
    setSrsAdded(true);
  };

  const tone = scorePct >= 80 ? "emerald" : scorePct >= 50 ? "amber" : "red";
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
        <div className="text-7xl font-serif text-blue-950 mb-2 tabular-nums">{scorePct}%</div>
        <p className="text-blue-700 font-light">
          Note moyenne {avg.toFixed(1)} / 5 · {rated.length} réponses notées
        </p>
      </div>

      {weakCats.length > 0 && (
        <div className="mb-8 rounded-xl bg-amber-50 border-2 border-amber-200 p-5">
          <div className="text-amber-900 text-xs uppercase tracking-[0.2em] font-bold mb-2">
            Catégories à retravailler
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {weakCats.map((w) => (
              <span
                key={w.cat}
                className="px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-900 text-sm font-medium"
              >
                {getCategoryLabel(w.cat)} · {w.avg.toFixed(1)}★
              </span>
            ))}
          </div>
        </div>
      )}

      {weak.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-serif text-blue-950 mb-4">À revoir ({weak.length})</h2>
          <ul className="space-y-2 mb-4">
            {weak.map((a, i) => (
              <li
                key={i}
                className="p-4 rounded-lg bg-white border border-red-200 text-sm text-blue-950"
              >
                <div className="text-xs text-red-700 uppercase font-semibold mb-1">{a.label}</div>
                {a.question}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={addWeakToSrs}
            disabled={srsAdded || weak.every((a) => !a.srsId)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-900 text-white text-sm font-medium disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {srsAdded ? "Ajouté au SRS" : "Ajouter les ratées au SRS"}
          </button>
        </div>
      )}

      <div className="mb-8 flex flex-wrap gap-3">
        <Link to="/cv" className="text-sm text-blue-700 hover:text-blue-900 font-medium underline">
          Guide CV
        </Link>
        <Link
          to="/pyramid"
          className="text-sm text-blue-700 hover:text-blue-900 font-medium underline"
        >
          Pyramid + STAR
        </Link>
        <Link
          to="/actualite"
          className="text-sm text-blue-700 hover:text-blue-900 font-medium underline"
        >
          Actualité M&A
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <button
          type="button"
          onClick={copyReport}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-900 text-white font-medium hover:bg-blue-800"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copié !" : "Copier le rapport"}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-blue-200 text-blue-900 font-medium hover:border-blue-400"
        >
          <RotateCcw className="w-4 h-4" />
          Recommencer
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-blue-200 text-blue-900 font-medium hover:border-blue-400"
        >
          Retour au menu
        </button>
      </div>
    </div>
  );
}

export function InterviewSessionSetup({
  mode,
  packSize,
  onStart,
  onBack,
}: {
  mode: InterviewSessionMode;
  packSize: 5 | 7;
  onStart: () => void;
  onBack: () => void;
}) {
  const ratings = useMemo(() => (typeof window !== "undefined" ? loadRatings() : {}), []);
  const srsStore = useMemo(() => (typeof window !== "undefined" ? loadSrsStore() : {}), []);
  const pack = useMemo(
    () => buildInterviewPack({ ratings, srsStore, size: packSize }),
    [ratings, srsStore, packSize],
  );
  const totalMin = Math.ceil(packTotalSeconds(pack) / 60);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>
      <h1 className="text-4xl font-serif text-blue-950 mb-3">
        {mode === "full" ? "Simulation d'entretien" : "Mini-entretien"}
      </h1>
      <p className="text-blue-700 font-light mb-6 max-w-2xl">
        {packSize} questions type entretien · ~{totalMin} min au total (timer par question). Pack :
        ouverture CV, technique, actualité M&A, sectoriel
        {packSize === 7 ? ", + fit." : "."}
      </p>
      <ul className="mb-8 space-y-2">
        {pack.map((item, i) => (
          <li
            key={i}
            className="flex justify-between gap-4 text-sm bg-white rounded-lg border border-blue-100 px-4 py-3"
          >
            <span className="text-blue-950 font-medium">{packItemLabel(item)}</span>
            <span className="text-blue-600 tabular-nums">
              {Math.round(item.secondsLimit / 60)} min
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-medium text-lg"
      >
        <Clock className="w-5 h-5" />
        Démarrer
      </button>
    </div>
  );
}
