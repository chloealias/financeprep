import { ChevronRight } from "lucide-react";

interface Guide {
  id: number;
  title: string;
  category: string;
  level: string;
  description: string;
}

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <div className="bg-card rounded-3xl border border-border shadow-card p-5 space-y-4 transition-shadow hover:shadow-card-hover hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
            {String(guide.id).padStart(2, "0")}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium py-1 px-2.5 rounded-md border border-border text-foreground bg-muted">
              {guide.category}
            </span>
            <span className="text-xs font-medium py-1 px-2.5 rounded-md border border-primary/20 text-primary bg-primary/10">
              {guide.level}
            </span>
          </div>
        </div>

        <span className="text-primary/70 flex-shrink-0" aria-hidden="true">
          <ChevronRight size={20} />
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="type-card-title text-foreground">{guide.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
      </div>
    </div>
  );
}
