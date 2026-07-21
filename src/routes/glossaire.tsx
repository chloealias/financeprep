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
import { PageHeader } from "@/components/ui/page-header";
import { useT } from "@/hooks/useT";

function SectionConceptLink({ category }: { category: CategoryId }) {
  const { t } = useT();
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
      className="text-xs text-primary hover:text-primary/80 underline underline-offset-2"
    >
      {t("routes.glossaire.link.concepts")}
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
  const { t } = useT();
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        <Link
          to="/"
          search={{ tab: "guide" }}
          className="touch-target-bar gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("routes.glossaire.back")}
        </Link>

        <PageHeader
          size="page"
          title={t("routes.glossaire.pageTitle")}
          description={t("routes.glossaire.pageDescription")}
          className="mb-0 space-y-3"
          showEyebrowLine={false}
        />
        <button
          type="button"
          onClick={() => setLearnOpen(true)}
          className="touch-target-bar gap-2 rounded-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground text-sm font-medium px-4 shadow-sm"
        >
          <GraduationCap className="w-4 h-4" aria-hidden="true" />
          {t("routes.glossaire.cta.learnMode")}
        </button>

        <div className="bg-card rounded-3xl border border-border shadow-card p-5 sm:p-6 space-y-5">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("routes.glossaire.search.placeholder")}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">{t("routes.glossaire.empty")}</p>
          ) : (
            filtered.map((section) => (
              <div key={section.title} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="type-label text-primary">
                    {section.title}
                  </h2>
                  {section.hubCategory && <SectionConceptLink category={section.hubCategory} />}
                </div>
                <ul className="divide-y divide-border">
                  {section.items.map((a) => (
                    <li
                      key={a.abbr}
                      className="py-3 grid grid-cols-[minmax(90px,auto)_1fr] gap-x-4 gap-y-1 sm:grid-cols-[180px_1fr_1.2fr] sm:gap-x-6 items-baseline"
                    >
                      <span className="font-semibold text-foreground text-sm sm:text-base">
                        {a.abbr}
                      </span>
                      {a.english ? (
                        <>
                          <span className="text-foreground text-sm sm:text-base col-start-2">
                            {a.english}
                          </span>
                          <span className="text-muted-foreground text-sm sm:text-base col-span-2 sm:col-span-1 sm:col-start-3">
                            {a.french}
                          </span>
                        </>
                      ) : (
                        <span className="text-muted-foreground text-sm sm:text-base col-start-2 sm:col-start-2 sm:col-span-2">
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
            <DialogTitle className="font-serif text-foreground">
              {t("routes.glossaire.cta.learnMode")}
            </DialogTitle>
            <DialogDescription>{t("routes.glossaire.learn.description")}</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="flash" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="flash">{t("routes.glossaire.tab.flashcards")}</TabsTrigger>
              <TabsTrigger value="qcm">{t("routes.glossaire.tab.qcm")}</TabsTrigger>
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
  const { t } = useT();
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
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {idx + 1} / {deck.length}
        </span>
        <button
          type="button"
          onClick={reshuffle}
          className="touch-target-bar gap-1 text-primary hover:text-primary/80"
        >
          <Shuffle className="w-3.5 h-3.5" /> {t("routes.glossaire.flash.shuffle")}
        </button>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[220px] rounded-2xl border border-border bg-gradient-to-br from-muted to-card shadow-card flex flex-col items-center justify-center gap-3 p-6 text-center transition hover:shadow-card-hover"
      >
        {!flipped ? (
          <>
            <span className="type-label text-primary">{t("routes.glossaire.flash.front")}</span>
            <span className="text-3xl sm:text-4xl font-semibold text-foreground">{card.abbr}</span>
            <span className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-1">
              <RotateCw className="w-3 h-3" /> {t("routes.glossaire.flash.reveal")}
            </span>
          </>
        ) : (
          <>
            <span className="type-label text-primary">{t("routes.glossaire.flash.back")}</span>
            {card.english && (
              <span className="text-base sm:text-lg font-medium text-foreground">{card.english}</span>
            )}
            <span className="text-sm sm:text-base text-muted-foreground">{card.french}</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={prev}
          className="touch-target-bar gap-1 rounded-full border border-border px-3 text-sm text-foreground hover:bg-muted"
        >
          <ChevronLeft className="w-4 h-4" /> {t("routes.glossaire.flash.prev")}
        </button>
        <button
          type="button"
          onClick={next}
          className="touch-target-bar gap-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 text-sm"
        >
          {t("routes.glossaire.flash.next")} <ChevronRight className="w-4 h-4" />
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
  const { t } = useT();
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
        <div className="type-label text-primary">{t("routes.glossaire.result.title")}</div>

        <div className="flex items-center justify-center gap-6">
          <div className="space-y-1">
            <div className="text-3xl font-semibold text-foreground">
              {score} / {total}
            </div>
            <div className="text-xs text-muted-foreground">{t("routes.glossaire.result.correctAnswers")}</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="space-y-1">
            <div className="text-3xl font-semibold text-foreground">{pct}%</div>
            <div className="text-xs text-muted-foreground">{t("routes.glossaire.result.successRate")}</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="space-y-1">
            <div className="text-3xl font-semibold text-foreground">{formatDuration(elapsed)}</div>
            <div className="text-xs text-muted-foreground">{t("routes.glossaire.result.time")}</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {score === total
            ? t("routes.glossaire.result.perfect")
            : score >= total * 0.7
              ? t("routes.glossaire.result.good")
              : t("routes.glossaire.result.retry")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={restartSame}
            className="touch-target-bar gap-1 rounded-full border border-border bg-card hover:bg-muted text-foreground px-4 text-sm"
          >
            <RotateCw className="w-4 h-4" /> {t("routes.glossaire.result.restartSame")}
          </button>
          <button
            type="button"
            onClick={restart}
            className="touch-target-bar gap-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 text-sm"
          >
            <Shuffle className="w-4 h-4" /> {t("routes.glossaire.result.newQuiz")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {t("routes.glossaire.qcm.questionProgress", { current: idx + 1, total })}
        </span>
        <span>{t("routes.glossaire.qcm.score", { score })}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">{t("routes.glossaire.qcm.questionsLabel")}</span>
        {QCM_OPTIONS.map((opt) => {
          const active = qCount === opt;
          const label = opt === "all" ? t("routes.glossaire.qcm.all") : `${opt}`;
          return (
            <button
              key={label}
              type="button"
              onClick={() => startQuiz(opt)}
              className={`touch-target-bar text-xs rounded-full px-2.5 transition border ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-muted/40 p-5 text-center">
        <div className="type-label text-primary mb-2">{t("routes.glossaire.qcm.prompt")}</div>
        <div className="text-2xl sm:text-3xl font-semibold text-foreground">{q.acronym.abbr}</div>
      </div>

      <div className="space-y-2">
        {q.choices.map((c) => {
          const isCorrect = c === q.correct;
          const isPicked = picked === c;
          let cls = "border-border hover:bg-muted";
          if (picked) {
            if (isCorrect) cls = "border-green-300 bg-green-50";
            else if (isPicked) cls = "border-red-300 bg-red-50";
            else cls = "border-border opacity-60";
          }
          return (
            <button
              key={c}
              type="button"
              onClick={() => choose(c)}
              disabled={!!picked}
              className={`w-full touch-target-bar text-left px-4 rounded-xl border text-sm transition justify-between gap-2 ${cls}`}
            >
              <span className="text-foreground">{c}</span>
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
          className="touch-target-bar gap-1 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground px-4 text-sm"
        >
          {idx + 1 >= total ? t("routes.glossaire.qcm.seeResult") : t("routes.glossaire.qcm.next")} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
