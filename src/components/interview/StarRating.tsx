import { Star } from "lucide-react";
import { useT } from "@/hooks/useT";

export function StarRating({
  value,
  onChange,
  size = "md",
  compact = false,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
}) {
  const { t } = useT();
  const sizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-7 h-7" : "w-5 h-5";
  const touchClass = compact
    ? "inline-flex items-center justify-center min-h-8 min-w-8"
    : "touch-target";
  return (
    <div className="flex items-center gap-0.5 sm:gap-1" onClick={(e) => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={(e) => {
            e.stopPropagation();
            onChange(star === value ? 0 : star);
          }}
          className={`${touchClass} transition-transform hover:scale-110`}
          aria-label={t("interview.starRating.aria", { star })}
        >
          <Star
            className={`${sizeClass} ${star <= value ? "fill-amber-400 text-amber-400" : "text-blue-200"}`}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

// =====================================================
//  CONCEPT CARD — Affichage d'un concept
