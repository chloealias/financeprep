import { Star } from 'lucide-react';

export function StarRating ({ value, onChange, size = 'md' }) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={(e) => { e.stopPropagation(); onChange(star === value ? 0 : star); }}
          className="transition-transform hover:scale-110"
          aria-label={`Noter ${star} étoiles`}
        >
          <Star
            className={`${sizeClass} ${star <= value ? 'fill-amber-400 text-amber-400' : 'text-blue-200'}`}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
};


// =====================================================
//  CONCEPT CARD — Affichage d'un concept
