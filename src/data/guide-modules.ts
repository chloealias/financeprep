import type { LucideIcon } from "lucide-react";
import { Calculator, Library, Newspaper, Table2, TrendingUp, Triangle, User } from "lucide-react";

export type GuideModule = {
  href: "/cv" | "/excel" | "/pyramid" | "/accretion" | "/actualite" | "/glossaire" | "/mental-math";
  tag: string;
  title: string;
  icon: LucideIcon;
  learningGoals?: string[];
};

export const guideModules: GuideModule[] = [
  {
    href: "/cv",
    tag: "La question d'ouverture",
    title: "Walk me through your CV / a deal",
    icon: User,
    learningGoals: [
      "Structurer un pitch CV en 2 minutes",
      "Présenter un deal avec chiffres clés",
    ],
  },
  {
    href: "/pyramid",
    tag: "Méta-framework",
    title: "Pyramid Principle + STAR",
    icon: Triangle,
    learningGoals: ["Réponse conclusion-first", "Méthode STAR pour le comportemental"],
  },
  {
    href: "/mental-math",
    tag: "Entraînement",
    title: "Calcul mental (Trachtenberg & %)",
    icon: Calculator,
    learningGoals: ["Estimations rapides % et ratios", "Techniques Trachtenberg de base"],
  },
  {
    href: "/excel",
    tag: "Différenciant TS / PE",
    title: "Astuces Excel essentielles",
    icon: Table2,
    learningGoals: ["Raccourcis audit / modélisation", "Checks d'erreurs fréquents"],
  },
  {
    href: "/accretion",
    tag: "Éliminatoire en M&A",
    title: "Accretion / Dilution analysis",
    icon: TrendingUp,
    learningGoals: ["Mécanique EPS pro forma", "Drivers accretion/dilution"],
  },
  {
    href: "/actualite",
    tag: "Preuve d'intérêt réel",
    title: "Actualité M&A 2025-2026",
    icon: Newspaper,
    learningGoals: ["Pitcher 2–3 deals récents", "Lier deals à vos banques cibles"],
  },
  {
    href: "/glossaire",
    tag: "Référence technique",
    title: "Glossaire des acronymes",
    icon: Library,
    learningGoals: ["Maîtriser EV, WACC, LBO, IRR", "Mode apprentissage flashcards"],
  },
];
