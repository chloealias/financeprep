import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Clock } from "lucide-react";
import { FlashcardSession } from "@/components/flashcards/FlashcardSession";
import { QuizSession } from "@/components/flashcards/QuizSession";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards & Quiz — FinancePrep" },
      {
        name: "description",
        content:
          "Révisez vos questions de finance en flashcards (répétition espacée) ou en quiz chronométré avec score.",
      },
    ],
  }),
  component: FlashcardsPage,
});

type Tool = "menu" | "flashcards" | "quiz";

function FlashcardsPage() {
  const [tool, setTool] = useState<Tool>("menu");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100">
      {tool === "menu" && <ToolPicker onPick={setTool} />}
      {tool === "flashcards" && <FlashcardSession />}
      {tool === "quiz" && <QuizSession onBack={() => setTool("menu")} />}
    </div>
  );
}

function ToolPicker({ onPick }: { onPick: (t: Tool) => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au guide
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-blue-700" />
          <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">
            Entraînement actif
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
          Comment veux-tu <span className="italic font-light text-blue-700">t&apos;entraîner</span>{" "}
          ?
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <ToolCard
          onClick={() => onPick("flashcards")}
          icon={<Sparkles className="w-7 h-7" />}
          tag="Mémoire long terme"
          title="Flashcards SRS"
          description="Sessions de 20 cartes. L'algorithme SM-2 fait revenir les cartes ratées plus souvent et espace celles que vous maîtrisez."
          accent="from-blue-700 to-indigo-800"
        />
        <ToolCard
          onClick={() => onPick("quiz")}
          icon={<Clock className="w-7 h-7" />}
          tag="Simulation entretien"
          title="Quiz chronométré"
          description="5, 10 ou 20 questions au hasard, 1 min par question. Score final, points faibles et liste des ratés."
          accent="from-emerald-700 to-teal-800"
        />
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
  accent,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-300 shadow-md hover:shadow-xl transition-all overflow-hidden"
    >
      <div className={`px-6 py-5 bg-gradient-to-br ${accent} text-white`}>
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
        <p className="text-blue-800 text-sm font-light leading-relaxed">{description}</p>
        <div className="mt-4 text-blue-700 text-sm font-semibold group-hover:translate-x-1 transition-transform">
          Démarrer →
        </div>
      </div>
    </button>
  );
}
