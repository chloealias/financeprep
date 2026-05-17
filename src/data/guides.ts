import { guideModules } from "@/data/guide-modules";

/** @deprecated Utiliser `guideModules` — conservé pour compatibilité éventuelle */
export const guides = guideModules.map((m, i) => ({
  id: i + 1,
  title: m.title,
  category: "Guide",
  level: "Essential",
  description: m.tag,
  href: m.href,
}));
