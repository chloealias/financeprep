import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  ClipboardCheck,
  MessageSquare,
  Newspaper,
  Sparkles,
  TrendingUp,
  Triangle,
  User,
} from "lucide-react";
import type { GuideProgressKey } from "@/lib/guide-progress";

export type GuideModuleGroup = "fundamentals" | "training" | "networking";

export type GuideModuleId =
  | "actualite"
  | "cv"
  | "pyramid"
  | "mentalMath"
  | "accretion"
  | "diagnostic"
  | "networking"
  | "flashcards";

export type GuideModuleHref =
  | "/cv"
  | "/pyramid"
  | "/accretion"
  | "/actualite"
  | "/mental-math"
  | "/diagnostic"
  | "/networking"
  | "/flashcards";

export type GuideModule = {
  id: GuideModuleId;
  href: GuideModuleHref;
  group: GuideModuleGroup;
  progressKey?: GuideProgressKey | null;
  defaultOrder: number;
  hero?: boolean;
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
    group: "fundamentals",
    progressKey: null,
    defaultOrder: 0,
    tag: "Preuve d'intérêt réel",
    title: "Actualité M&A 2025-2026",
    icon: Newspaper,
  },
  {
    id: "cv",
    href: "/cv",
    group: "fundamentals",
    progressKey: "cv",
    defaultOrder: 1,
    tag: "La question d'ouverture",
    title: "Walk me through your CV / a deal",
    icon: User,
  },
  {
    id: "pyramid",
    href: "/pyramid",
    group: "fundamentals",
    progressKey: "pyramid",
    defaultOrder: 2,
    tag: "Méta-framework",
    title: "Pyramid Principle + STAR",
    icon: Triangle,
  },
  {
    id: "flashcards",
    href: "/flashcards",
    group: "training",
    progressKey: "flashcards",
    defaultOrder: 0,
    hero: true,
    tag: "Entraînement actif",
    title: "Flashcards avec répétition espacée",
    icon: Sparkles,
  },
  {
    id: "diagnostic",
    href: "/diagnostic",
    group: "training",
    progressKey: "diagnostic",
    defaultOrder: 1,
    tag: "Diagnostic de rentrée",
    title: "Checklist prep entretien",
    icon: ClipboardCheck,
  },
  {
    id: "mentalMath",
    href: "/mental-math",
    group: "training",
    progressKey: null,
    defaultOrder: 2,
    tag: "Entraînement",
    title: "Calcul mental (Trachtenberg & %)",
    icon: Calculator,
  },
  {
    id: "accretion",
    href: "/accretion",
    group: "training",
    progressKey: null,
    defaultOrder: 3,
    tag: "Éliminatoire en M&A",
    title: "Accretion / Dilution analysis",
    icon: TrendingUp,
  },
  {
    id: "networking",
    href: "/networking",
    group: "networking",
    progressKey: "networking",
    defaultOrder: 0,
    tag: "Pipeline de contacts",
    title: "Networking — objectifs & templates",
    icon: MessageSquare,
  },
];

export const guideModuleGroups: GuideModuleGroup[] = [
  "fundamentals",
  "training",
  "networking",
];

export function getGuideModulesByGroup(group: GuideModuleGroup): GuideModule[] {
  return guideModules.filter((module) => module.group === group);
}
