import {
  BookOpen,
  TrendingUp,
  Calculator,
  Briefcase,
  Target,
  Brain,
  type LucideIcon,
} from 'lucide-react';

export type CategoryId =
  | 'all'
  | 'valuation'
  | 'accounting'
  | 'ma'
  | 'ts'
  | 'lbo'
  | 'dcf'
  | 'brainteaser';

export type CategoryOption = {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
};

export const QUESTION_CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'Toutes', icon: BookOpen },
  { id: 'valuation', label: 'Valorisation', icon: TrendingUp },
  { id: 'accounting', label: 'Comptabilité', icon: Calculator },
  { id: 'ma', label: 'M&A', icon: Briefcase },
  { id: 'ts', label: 'Transaction Services', icon: Target },
  { id: 'lbo', label: 'LBO', icon: TrendingUp },
  { id: 'dcf', label: 'DCF', icon: Calculator },
  { id: 'brainteaser', label: 'Déstabilisantes', icon: Brain },
];

export const DIFFICULTY_OPTIONS = [
  { id: 'all', label: 'Tous niveaux' },
  { id: 'basique', label: 'Basique' },
  { id: 'intermédiaire', label: 'Intermédiaire' },
  { id: 'avancé', label: 'Avancé' },
] as const;

export const RATING_FILTER_OPTIONS = [
  { id: 'all', label: 'Toutes' },
  { id: 'unrated', label: 'Non notées' },
  { id: 'weak', label: '≤ 2 étoiles' },
  { id: 'mastered', label: '≥ 4 étoiles' },
] as const;

export function getCategoryLabel(catId: string): string {
  const cat = QUESTION_CATEGORIES.find((c) => c.id === catId);
  return cat ? cat.label : catId;
}
