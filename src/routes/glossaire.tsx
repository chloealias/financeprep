import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  ArrowLeft,
  GraduationCap,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Check,
  X,
} from "lucide-react";
import { acronymSections, acronyms, type Acronym } from "@/data/acronyms";
import { loadSavedFilters, saveSavedFilters } from "@/lib/storage";
import type { CategoryId } from "@/lib/categories";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function SectionConceptLink({ category }: { category: CategoryId }) {
  const persistAndGo = () => {
    const defaults = {
      activeCategory: "all",
      activeDifficulty: "all",
      searchQuery: "",
      ratingFilter: "all",
      conceptCategory: "all",
    };
    const current = loadSavedFilters((raw) => {
      const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
      return {
        ...defaults,
        conceptCategory: typeof o.conceptCategory === "string" ? o.conceptCategory : "all",
      };
    }, defaults);
    saveSavedFilters({ ...current, conceptCategory: category });
  };

  return (
    <Link
      to="/"
      search={{ tab: "concepts" }}
      onClick={persistAndGo}
      className="text-xs text-blue-600 hover:text-blue-900 underline underline-offset-2"
    >
      Voir les concepts
    </Link>
  );
}

export const Route = createFileRoute("/glossaire")({
  head: () => ({
    meta: [
      { title: "Glossaire des acronymes — FinancePrep" },
      {
        name: "description",
        content:
          "Tous les acronymes indispensables en TS, IB et PE, avec leur traduction française.",
      },
      { property: "og:title", content: "Glossaire des acronymes — FinancePrep" },
      {
        property: "og:description",
        content:
          "Tous les acronymes indispensables en TS, IB et PE, avec leur traduction française.",
      },
    ],
  }),
  component: GlossairePage,
});

function GlossairePage() {
  const [query, setQuery] = useState("");
  const [learnOpen, setLearnOpen] = useState(false);
  const q = query.trim().toLowerCase();

  const filtered = acronymSections
    .map((s) => ({
      ...s,
      items: q
        ? s.items.filter((a) =>
            [a.abbr, a.english ?? "", a.french].some((v) => v.toLowerCase().includes(q)),
          )
        : s.items,
    }))
    .filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        <Link
          to="/"
          search={{ tab: "guide" }}
          className="touch-target-bar gap-1.5 text-sm text-blue-700 hover:text-blue-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour au guide
        </Link>

        <header className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-medium text-blue-950 tracking-tight">
            Glossaire des acronymes
          </h1>
          <p className="text-sm text-slate-600">
            Tous les acronymes indispensables en TS / IB / PE.
          </p>
          <button
            type="button"
            onClick={() => setLearnOpen(true)}
            className="touch-target-bar gap-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors text-white text-sm font-medium px-4 shadow-sm"
          >
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            Mode apprentissage
          </button>
        </header>

        <div className="bg-white rounded-3xl border border-blue-100 shadow-card p-5 sm:p-6 space-y-5">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un acronyme ou une traduction…"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-blue-100 bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Aucun résultat.</p>
          ) : (
            filtered.map((section) => (
              <div key={section.title} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xs uppercase tracking-[0.18em] text-blue-700 font-medium">
                    {section.title}
                  </h2>
                  {section.hubCategory && <SectionConceptLink category={section.hubCategory} />}
                </div>
                <ul className="divide-y divide-blue-50">
                  {section.items.map((a) => (
                    <li
                      key={a.abbr}
                      className="py-3 grid grid-cols-[minmax(90px,auto)_1fr] gap-x-4 gap-y-1 sm:grid-cols-[180px_1fr_1.2fr] sm:gap-x-6 items-baseline"
                    >
                      <span className="font-semibold text-blue-900 text-sm sm:text-base">
                        {a.abbr}
                      </span>
                      {a.english ? (
                        <>
                          <span className="text-slate-700 text-sm sm:text-base col-start-2">
                            {a.english}
                          </span>
                          <span className="text-slate-600 text-sm sm:text-base col-span-2 sm:col-span-1 sm:col-start-3">
                            {a.french}
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-600 text-sm sm:text-base col-start-2 sm:col-start-2 sm:col-span-2">
                          {a.french}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={learnOpen} onOpenChange={setLearnOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-blue-950">Mode apprentissage</DialogTitle>
            <DialogDescription>
              Révise les acronymes en flashcards ou teste-toi en QCM.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="flash" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="flash">Flashcards</TabsTrigger>
              <TabsTrigger value="qcm">QCM</TabsTrigger>
            </TabsList>
            <TabsContent value="flash" className="pt-4">
              <FlashcardMode />
            </TabsContent>
            <TabsContent value="qcm" className="pt-4">
              <QcmMode />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function meaningOf(a: Acronym): string {
  return a.english ? `${a.english} — ${a.french}` : a.french;
}

function FlashcardMode() {
  const [deck, setDeck] = useState<Acronym[]>(() => shuffle(acronyms));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = deck[idx];

  const next = () => {
    setFlipped(false);
    setIdx((i) => (i + 1) % deck.length);
  };
  const prev = () => {
    setFlipped(false);
    setIdx((i) => (i - 1 + deck.length) % deck.length);
  };
  const reshuffle = () => {
    setDeck(shuffle(acronyms));
    setIdx(0);
    setFlipped(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {idx + 1} / {deck.length}
        </span>
        <button
          type="button"
          onClick={reshuffle}
          className="touch-target-bar gap-1 text-blue-700 hover:text-blue-900"
        >
          <Shuffle className="w-3.5 h-3.5" /> Mélanger
        </button>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[220px] rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-card flex flex-col items-center justify-center gap-3 p-6 text-center transition hover:shadow-card-hover"
      >
        {!flipped ? (
          <>
            <span className="text-xs uppercase tracking-[0.18em] text-blue-600">Acronyme</span>
            <span className="text-3xl sm:text-4xl font-semibold text-blue-950">{card.abbr}</span>
            <span className="text-xs text-slate-400 mt-2 inline-flex items-center gap-1">
              <RotateCw className="w-3 h-3" /> Cliquer pour révéler
            </span>
          </>
        ) : (
          <>
            <span className="text-xs uppercase tracking-[0.18em] text-blue-600">Signification</span>
            {card.english && (
              <span className="text-base sm:text-lg font-medium text-blue-900">{card.english}</span>
            )}
            <span className="text-sm sm:text-base text-slate-700">{card.french}</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={prev}
          className="touch-target-bar gap-1 rounded-full border border-blue-100 px-3 text-sm text-blue-800 hover:bg-blue-50"
        >
          <ChevronLeft className="w-4 h-4" /> Précédent
        </button>
        <button
          type="button"
          onClick={next}
          className="touch-target-bar gap-1 rounded-full bg-blue-700 hover:bg-blue-800 text-white px-4 text-sm"
        >
          Suivant <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface QcmQuestion {
  acronym: Acronym;
  choices: string[];
  correct: string;
}

function buildQuiz(n = 10): QcmQuestion[] {
  const pool = shuffle(acronyms).slice(0, n);
  return pool.map((a) => {
    const correct = meaningOf(a);
    const distractors = shuffle(acronyms.filter((x) => x.abbr !== a.abbr))
      .slice(0, 3)
      .map(meaningOf);
    return {
      acronym: a,
      choices: shuffle([correct, ...distractors]),
      correct,
    };
  });
}

function formatDuration(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m > 0) return `${m} min ${sec} s`;
  return `${sec} s`;
}

const QCM_OPTIONS = [5, 10, 15, 20, "all"] as const;

function QcmMode() {
  const [qCount, setQCount] = useState<number | "all">(10);
  const [quiz, setQuiz] = useState<QcmQuestion[]>(() => buildQuiz(10));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [startTime, setStartTime] = useState(() => Date.now());

  const q = quiz[idx];
  const total = quiz.length;

  const choose = (c: string) => {
    if (picked) return;
    setPicked(c);
    if (c === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= total) {
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  };

  const startQuiz = (count: number | "all") => {
    const n = count === "all" ? acronyms.length : count;
    setQCount(count);
    setQuiz(buildQuiz(n));
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setStartTime(Date.now());
  };

  const restart = () => startQuiz(qCount);
  const restartSame = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setStartTime(Date.now());
  };

  if (done) {
    const elapsed = Date.now() - startTime;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center space-y-5 py-6">
        <div className="text-xs uppercase tracking-[0.18em] text-blue-600">Résultat</div>

        <div className="flex items-center justify-center gap-6">
          <div className="space-y-1">
            <div className="text-3xl font-semibold text-blue-950">
              {score} / {total}
            </div>
            <div className="text-xs text-slate-500">bonnes réponses</div>
          </div>
          <div className="w-px h-10 bg-blue-100" />
          <div className="space-y-1">
            <div className="text-3xl font-semibold text-blue-950">{pct}%</div>
            <div className="text-xs text-slate-500">de réussite</div>
          </div>
          <div className="w-px h-10 bg-blue-100" />
          <div className="space-y-1">
            <div className="text-3xl font-semibold text-blue-950">{formatDuration(elapsed)}</div>
            <div className="text-xs text-slate-500">temps</div>
          </div>
        </div>

        <p className="text-sm text-slate-600">
          {score === total
            ? "Sans faute, bravo !"
            : score >= total * 0.7
              ? "Bon score, continue."
              : "À retravailler."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={restartSame}
            className="touch-target-bar gap-1 rounded-full border border-blue-100 bg-white hover:bg-blue-50 text-blue-800 px-4 text-sm"
          >
            <RotateCw className="w-4 h-4" /> Recommencer la même session
          </button>
          <button
            type="button"
            onClick={restart}
            className="touch-target-bar gap-1 rounded-full bg-blue-700 hover:bg-blue-800 text-white px-4 text-sm"
          >
            <Shuffle className="w-4 h-4" /> Nouveau quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Question {idx + 1} / {total}
        </span>
        <span>Score : {score}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500">Questions :</span>
        {QCM_OPTIONS.map((opt) => {
          const active = qCount === opt;
          const label = opt === "all" ? "Toutes" : `${opt}`;
          return (
            <button
              key={label}
              type="button"
              onClick={() => startQuiz(opt)}
              className={`touch-target-bar text-xs rounded-full px-2.5 transition border ${
                active
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-white text-slate-600 border-blue-100 hover:border-blue-300"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5 text-center">
        <div className="text-xs uppercase tracking-[0.18em] text-blue-600 mb-2">Que signifie</div>
        <div className="text-2xl sm:text-3xl font-semibold text-blue-950">{q.acronym.abbr}</div>
      </div>

      <div className="space-y-2">
        {q.choices.map((c) => {
          const isCorrect = c === q.correct;
          const isPicked = picked === c;
          let cls = "border-blue-100 hover:bg-blue-50";
          if (picked) {
            if (isCorrect) cls = "border-green-300 bg-green-50";
            else if (isPicked) cls = "border-red-300 bg-red-50";
            else cls = "border-blue-100 opacity-60";
          }
          return (
            <button
              key={c}
              type="button"
              onClick={() => choose(c)}
              disabled={!!picked}
              className={`w-full touch-target-bar text-left px-4 rounded-xl border text-sm transition justify-between gap-2 ${cls}`}
            >
              <span className="text-slate-800">{c}</span>
              {picked && isCorrect && <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />}
              {picked && isPicked && !isCorrect && (
                <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={next}
          disabled={!picked}
          className="touch-target-bar gap-1 rounded-full bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 text-sm"
        >
          {idx + 1 >= total ? "Voir le résultat" : "Suivant"} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
