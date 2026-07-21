import type { LucideIcon } from "lucide-react";
import { Calculator, Library, Newspaper, Table2, TrendingUp, Triangle, User } from "lucide-react";

export type GuideModuleId =
  | "actualite"
  | "cv"
  | "pyramid"
  | "mentalMath"
  | "excel"
  | "accretion"
  | "glossaire";

export type GuideModule = {
  id: GuideModuleId;
  href: "/cv" | "/excel" | "/pyramid" | "/accretion" | "/actualite" | "/glossaire" | "/mental-math";
  /** Fallback FR — prefer `t(\`guide.modules.${id}.tag\`)` at render. */
  tag: string;
  /** Fallback FR — prefer `t(\`guide.modules.${id}.title\`)` at render. */
  title: string;
  icon: LucideIcon;
};

export const guideModules: GuideModule[] = [
  {
    id: "actualite",
    href: "/actualite",
    tag: "Preuve d'intérêt réel",
    title: "Actualité M&A 2025-2026",
    icon: Newspaper,
  },
  {
    id: "cv",
    href: "/cv",
    tag: "La question d'ouverture",
    title: "Walk me through your CV / a deal",
    icon: User,
  },
  {
    id: "pyramid",
    href: "/pyramid",
    tag: "Méta-framework",
    title: "Pyramid Principle + STAR",
    icon: Triangle,
  },
  {
    id: "mentalMath",
    href: "/mental-math",
    tag: "Entraînement",
    title: "Calcul mental (Trachtenberg & %)",
    icon: Calculator,
  },
  {
    id: "excel",
    href: "/excel",
    tag: "Différenciant TS / PE",
    title: "Astuces Excel essentielles",
    icon: Table2,
  },
  {
    id: "accretion",
    href: "/accretion",
    tag: "Éliminatoire en M&A",
    title: "Accretion / Dilution analysis",
    icon: TrendingUp,
  },
  {
    id: "glossaire",
    href: "/glossaire",
    tag: "Référence technique",
    title: "Glossaire des acronymes",
    icon: Library,
  },
];
