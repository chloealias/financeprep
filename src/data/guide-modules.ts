import type { LucideIcon } from "lucide-react";
import { Calculator, Library, Newspaper, Table2, TrendingUp, Triangle, User } from "lucide-react";

export type GuideModule = {
  href: "/cv" | "/excel" | "/pyramid" | "/accretion" | "/actualite" | "/glossaire" | "/mental-math";
  tag: string;
  title: string;
  icon: LucideIcon;
};

export const guideModules: GuideModule[] = [
  {
    href: "/cv",
    tag: "La question d'ouverture",
    title: "Walk me through your CV / a deal",
    icon: User,
  },
  {
    href: "/pyramid",
    tag: "Méta-framework",
    title: "Pyramid Principle + STAR",
    icon: Triangle,
  },
  {
    href: "/mental-math",
    tag: "Entraînement",
    title: "Calcul mental (Trachtenberg & %)",
    icon: Calculator,
  },
  {
    href: "/excel",
    tag: "Différenciant TS / PE",
    title: "Astuces Excel essentielles",
    icon: Table2,
  },
  {
    href: "/accretion",
    tag: "Éliminatoire en M&A",
    title: "Accretion / Dilution analysis",
    icon: TrendingUp,
  },
  {
    href: "/actualite",
    tag: "Preuve d'intérêt réel",
    title: "Actualité M&A 2025-2026",
    icon: Newspaper,
  },
  {
    href: "/glossaire",
    tag: "Référence technique",
    title: "Glossaire des acronymes",
    icon: Library,
  },
];
