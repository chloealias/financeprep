import { ArrowLeft, BookOpen, Calculator, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { useT } from "@/hooks/useT";
import type { PracticeView } from "@/lib/route-search";

type PracticeHubProps = {
  questionCount: number;
  exerciseCount: number;
  solvedCount: number;
  onSelect: (view: Exclude<PracticeView, "hub">) => void;
};

export function PracticeHub({
  questionCount,
  exerciseCount,
  solvedCount,
  onSelect,
}: PracticeHubProps) {
  const { t } = useT();

  const cards = [
    {
      view: "questions" as const,
      icon: BookOpen,
      title: t("hub.practice.card.questions.title"),
      description: t("hub.practice.card.questions.description", { count: questionCount }),
      meta: t("hub.practice.card.questions.meta", { count: questionCount }),
      disabled: false,
    },
    {
      view: "exercices" as const,
      icon: Calculator,
      title: t("hub.practice.card.exercises.title"),
      description: t("hub.practice.card.exercises.description", { count: exerciseCount }),
      meta: t("hub.practice.card.exercises.meta", {
        solved: solvedCount,
        total: exerciseCount,
      }),
      disabled: false,
    },
    {
      view: "cas" as const,
      icon: Briefcase,
      title: t("hub.practice.card.cases.title"),
      description: t("hub.practice.card.cases.description"),
      meta: t("hub.practice.card.cases.meta"),
      disabled: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PageHeader
        eyebrow={t("hub.practice.eyebrow")}
        title={t("hub.practice.title")}
        description={t("hub.practice.description")}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.view}
              type="button"
              disabled={card.disabled}
              onClick={() => onSelect(card.view)}
              className="group text-left rounded-2xl border border-border bg-card/80 p-5 sm:p-6 transition-all hover:border-primary/40 hover:bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="w-5 h-5" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-foreground m-0">{card.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                {card.description}
              </p>
              <p className="text-xs text-primary font-medium m-0 group-hover:underline">
                {card.meta}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

type PracticeBackProps = {
  onBack: () => void;
  label?: string;
};

export function PracticeBackButton({ onBack, label }: PracticeBackProps) {
  const { t } = useT();
  return (
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" aria-hidden />
      {label ?? t("hub.practice.back")}
    </button>
  );
}
