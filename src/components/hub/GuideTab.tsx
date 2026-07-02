import { Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles } from "lucide-react";
import { guideModules } from "@/data/guide-modules";
import { GuideModuleLink } from "@/components/guide/guide-ui";

export function GuideTab() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-primary" />
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-light">
            Méthodologie
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">
          Le <span className="italic font-light text-primary">guide complet</span>
        </h2>
        <p className="text-muted-foreground mt-3 font-light max-w-3xl">
          6 guides interactifs. Cliquez sur un module pour l&apos;ouvrir en pleine page.
        </p>
      </div>

      <Link
        to="/flashcards"
        className="group block mb-10 rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center gap-5">
          <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-primary-foreground/80" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-primary-foreground/70 text-xs uppercase tracking-[0.2em] font-semibold mb-1">
              Nouveau · Entraînement actif
            </div>
            <h3 className="font-serif text-xl sm:text-2xl leading-snug">
              Flashcards avec répétition espacée
            </h3>
            <p className="text-primary-foreground/80 text-sm font-light mt-1 hidden sm:block">
              Sessions de 20 cartes. L&apos;algorithme SM-2 fait revenir les cartes ratées plus
              souvent.
            </p>
          </div>
          <ChevronRight
            className="w-6 h-6 text-primary-foreground/70 group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </div>
      </Link>

      <div className="space-y-6">
        {guideModules.map((module) => (
          <GuideModuleLink
            key={module.href}
            to={module.href}
            tag={module.tag}
            title={module.title}
            icon={module.icon}
          />
        ))}
      </div>
    </div>
  );
}
