import { useEffect, useState } from "react";
import { Landmark } from "lucide-react";
import { getAppStats } from "@/lib/app-stats";
import { useT } from "@/hooks/useT";

const SPLASH_PHRASE_KEYS = [
  "splash.phrase.prepare",
  "splash.phrase.stack",
  "splash.phrase.topics",
] as const;

type AppSplashProps = Record<string, never>;

export function AppSplash(_props: AppSplashProps) {
  const { t } = useT();
  const stats = getAppStats();
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhraseIndex((i) => (i + 1) % SPLASH_PHRASE_KEYS.length);
    }, 400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
      aria-busy="true"
      aria-label={t("splash.ariaLoading")}
    >
      <div className="flex items-center gap-3 mb-8">
        <Landmark className="w-10 h-10 text-blue-900" aria-hidden="true" />
        <span className="font-serif text-3xl text-blue-900 tracking-tight">{t("splash.brand")}</span>
      </div>

      <p
        key={phraseIndex}
        className="text-muted-foreground text-sm font-light mb-6 animate-in fade-in duration-300"
      >
        {t(SPLASH_PHRASE_KEYS[phraseIndex])}
      </p>

      <p className="text-xs text-muted-foreground mb-8 tabular-nums">
        {t("splash.stats", {
          questions: stats.questions,
          deals: stats.deals,
          banks: stats.banks,
        })}
      </p>

      <div className="w-48 h-1 bg-blue-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-900 rounded-full animate-[splash-bar_0.8s_ease-out_forwards] origin-left scale-x-0" />
      </div>
    </div>
  );
}
