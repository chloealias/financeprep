import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Mic, Sparkles } from "lucide-react";
import { FlashcardSession } from "@/components/flashcards/FlashcardSession";
import { QuizSession } from "@/components/flashcards/QuizSession";
import { PageHeader } from "@/components/ui/page-header";
import { validateFlashcardsSearch, defaultHomeSearch } from "@/lib/route-search";
import { useT } from "@/hooks/useT";

export const Route = createFileRoute("/flashcards")({
  validateSearch: validateFlashcardsSearch,
  head: () => ({
    meta: [
      { title: "Flashcards & Entraînement — FinancePrep" },
      {
        name: "description",
        content:
          "Révisez en flashcards SRS, mini-entretien structuré ou simulation 30 minutes avec rapport.",
      },
    ],
  }),
  component: FlashcardsPage,
});

type Tool = "menu" | "flashcards" | "quiz";

function FlashcardsPage() {
  const { mode } = Route.useSearch();
  const [tool, setTool] = useState<Tool>(() => {
    if (mode === "quiz") return "quiz";
    if (mode === "flashcards") return "flashcards";
    return "menu";
  });

  useEffect(() => {
    if (mode === "quiz") setTool("quiz");
    else if (mode === "flashcards") setTool("flashcards");
    else if (!mode) setTool("menu");
  }, [mode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background">
      {tool === "menu" && <ToolPicker onPick={setTool} />}
      {tool === "flashcards" && <FlashcardSession />}
      {tool === "quiz" && <QuizSession onBack={() => setTool("menu")} />}
    </div>
  );
}

function ToolPicker({ onPick }: { onPick: (t: Tool) => void }) {
  const { t } = useT();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/"
        search={defaultHomeSearch()}
        className="touch-target-bar gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("routes.flashcards.back")}
      </Link>

      <PageHeader
        eyebrow={t("routes.flashcards.eyebrow")}
        title={t("routes.flashcards.heading")}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <ToolCard
          onClick={() => onPick("flashcards")}
          icon={<Sparkles className="w-7 h-7" />}
          tag={t("routes.flashcards.srs.tag")}
          title={t("routes.flashcards.srs.title")}
          description={t("routes.flashcards.srs.description")}
          cta={t("routes.flashcards.cta.start")}
          accent="from-primary to-primary/80"
        />
        <ToolCard
          onClick={() => onPick("quiz")}
          icon={<Clock className="w-7 h-7" />}
          tag={t("routes.flashcards.quiz.tag")}
          title={t("routes.flashcards.quiz.title")}
          description={t("routes.flashcards.quiz.description")}
          cta={t("routes.flashcards.cta.start")}
          accent="from-primary to-primary/80"
        />
        <Link
          to="/interview"
          className="group text-left rounded-2xl bg-card border-2 border-border hover:border-primary/40 shadow-card hover:shadow-card-elevated transition-all overflow-hidden"
        >
          <div className="px-6 py-5 bg-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <Mic className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] font-semibold opacity-80">
                  {t("routes.flashcards.interview.tag")}
                </div>
                <div className="text-xl font-serif mt-0.5">
                  {t("routes.flashcards.interview.title")}
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <p className="text-foreground text-sm font-light leading-relaxed">
              {t("routes.flashcards.interview.description")}
            </p>
            <div className="mt-4 text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
              {t("routes.flashcards.cta.start")}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function ToolCard({
  onClick,
  icon,
  tag,
  title,
  description,
  cta,
  accent,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  cta: string;
  accent: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left rounded-2xl bg-card border-2 border-border hover:border-primary/40 shadow-card hover:shadow-card-elevated transition-all overflow-hidden"
    >
      <div className={`px-6 py-5 bg-gradient-to-br ${accent} text-primary-foreground`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold opacity-80">{tag}</div>
            <div className="text-xl font-serif mt-0.5">{title}</div>
          </div>
        </div>
      </div>
      <div className="px-6 py-5">
        <p className="text-foreground text-sm font-light leading-relaxed">{description}</p>
        <div className="mt-4 text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
          {cta}
        </div>
      </div>
    </button>
  );
}
