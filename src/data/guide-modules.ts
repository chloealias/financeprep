import type { LucideIcon } from "lucide-react";
import { Calculator, ClipboardCheck, Newspaper, TrendingUp, Triangle, User } from "lucide-react";

export type GuideModuleId =
  | "actualite"
  | "cv"
  | "pyramid"
  | "mentalMath"
  | "accretion"
  | "diagnostic";

export type GuideModule = {
  id: GuideModuleId;
  href: "/cv" | "/pyramid" | "/accretion" | "/actualite" | "/mental-math" | "/diagnostic";
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
    id: "diagnostic",
    href: "/diagnostic",
    tag: "Diagnostic de rentrée",
    title: "Checklist prep entretien",
    icon: ClipboardCheck,
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
    id: "accretion",
    href: "/accretion",
    tag: "Éliminatoire en M&A",
    title: "Accretion / Dilution analysis",
    icon: TrendingUp,
  },
];
