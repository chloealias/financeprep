import { useEffect, useState } from "react";
import { Landmark } from "lucide-react";
import { getAppStats, SPLASH_PHRASES } from "@/lib/app-stats";

type AppSplashProps = Record<string, never>;

export function AppSplash(_props: AppSplashProps) {
  const stats = getAppStats();
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setPhraseIndex((i) => (i + 1) % SPLASH_PHRASES.length);
    }, 400);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
      aria-busy="true"
      aria-label="Chargement"
    >
      <div className="flex items-center gap-3 mb-8">
        <Landmark className="w-10 h-10 text-blue-900" aria-hidden="true" />
        <span className="font-serif text-3xl text-blue-900 tracking-tight">FinancePrep</span>
      </div>

      <p
        key={phraseIndex}
        className="text-muted-foreground text-sm font-light mb-6 animate-in fade-in duration-300"
      >
        {SPLASH_PHRASES[phraseIndex]}
      </p>

      <p className="text-xs text-muted-foreground mb-8 tabular-nums">
        {stats.questions} questions · {stats.deals} deals · {stats.banks} banques
      </p>

      <div className="w-48 h-1 bg-blue-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-900 rounded-full animate-[splash-bar_0.8s_ease-out_forwards] origin-left scale-x-0" />
      </div>
    </div>
  );
}
