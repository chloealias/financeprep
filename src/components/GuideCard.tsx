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
    <div className="bg-white rounded-3xl border border-blue-100 shadow-card p-5 space-y-4 transition-shadow hover:shadow-card-hover hover:border-blue-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-semibold flex-shrink-0">
            {String(guide.id).padStart(2, "0")}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium py-1 px-2.5 rounded-md border border-yellow-300 text-yellow-700 bg-yellow-50">
              {guide.category}
            </span>
            <span className="text-xs font-medium py-1 px-2.5 rounded-md border border-blue-300 text-blue-700 bg-blue-50">
              {guide.level}
            </span>
          </div>
        </div>

        <span className="text-blue-500 flex-shrink-0" aria-hidden="true">
          <ChevronRight size={20} />
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900 leading-snug">{guide.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{guide.description}</p>
      </div>
    </div>
  );
}
