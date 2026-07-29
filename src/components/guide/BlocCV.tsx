import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { GuideSectionTitle, guideCardClass } from "@/components/guide/guide-ui";
import { getGuideCv } from "@/data/guide/cv";
import { loadCvChecklist, saveCvChecklist, type CvChecklist } from "@/lib/storage";
import { useT } from "@/hooks/useT";

export function BlocCV() {
  const { t, locale } = useT();
  const content = getGuideCv(locale);
  const [checked, setChecked] = useState<CvChecklist>(() =>
    typeof window !== "undefined" ? loadCvChecklist() : {},
  );

  const updateChecked = (id: string, value: boolean) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: value };
      if (!value) delete next[id];
      saveCvChecklist(next);
      return next;
    });
  };
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const score = Object.values(checked).filter(Boolean).length;

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [timerActive, timeLeft]);

  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft(120);
  };
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const progress = (timeLeft / 120) * 100;

  return (
    <>
      <div className="mb-8">
        <GuideSectionTitle>
          {t("guide.cv.checklistTitle")}
          {score === 6 && (
            <span className="ml-2 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">
              {t("guide.cv.ready")}
            </span>
          )}
        </GuideSectionTitle>
        <div className="space-y-2 mb-3">
          {content.checklist.map((item) => (
            <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!checked[item.id]}
                onChange={(e) => updateChecked(item.id, e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <span
                className={`text-sm transition-all ${checked[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}
              >
                {item.text}
              </span>
            </label>
          ))}
        </div>
        <div className="text-xs text-primary">
          {t("guide.cv.score", { score, total: content.checklist.length })}
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle>{t("guide.cv.structureTitle")}</GuideSectionTitle>
        <div className="grid md:grid-cols-3 gap-4">
          {content.acts.map((acte) => (
            <div
              key={acte.num}
              className={`rounded-xl p-5 ${acte.dark ? "bg-primary text-primary-foreground" : "bg-muted border border-border"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-serif font-light text-primary/70">{acte.num}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${acte.dark ? "bg-primary/80 text-primary-foreground/80" : "bg-primary/10 text-primary"}`}
                >
                  {acte.duree}
                </span>
              </div>
              <div
                className={`font-serif text-lg mb-2 ${acte.dark ? "text-primary-foreground" : "text-foreground"}`}
              >
                {acte.titre}
              </div>
              <div
                className={`text-sm font-light leading-relaxed ${acte.dark ? "text-primary-foreground/80" : "text-muted-foreground"}`}
              >
                {acte.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle>{t("guide.cv.dealVariantTitle")}</GuideSectionTitle>
        <div className={`${guideCardClass} p-6 bg-muted/50 space-y-3`}>
          {content.dealSteps.map((step) => (
            <div key={step.num} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary text-primary-foreground text-sm font-serif flex items-center justify-center">
                {step.num}
              </div>
              <div className="pt-1">
                <span className="text-foreground font-medium text-sm">{step.label} — </span>
                <span className="text-muted-foreground text-sm font-light">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle>{t("guide.cv.timerTitle")}</GuideSectionTitle>
        <div className={`${guideCardClass} p-6 text-center`}>
          <div
            className={`text-5xl font-mono font-light mb-4 ${timeLeft === 0 ? "text-destructive" : "text-foreground"}`}
          >
            {mm}:{ss}
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${timeLeft === 0 ? "bg-destructive/70" : "bg-primary"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {timeLeft === 0 && (
            <div className="text-destructive font-medium mb-4">{t("guide.cv.timeUp")}</div>
          )}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setTimerActive((a) => !a)}
              disabled={timeLeft === 0}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-40 transition-all"
            >
              {timerActive
                ? t("guide.cv.timer.pause")
                : timeLeft === 120
                  ? t("guide.cv.timer.start")
                  : t("guide.cv.timer.resume")}
            </button>
            <button
              onClick={resetTimer}
              className="px-6 py-2.5 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-all"
            >
              {t("guide.cv.timer.reset")}
            </button>
          </div>
          <p className="text-muted-foreground text-xs mt-4 italic">{t("guide.cv.timerHint")}</p>
        </div>
      </div>

      <div>
        <GuideSectionTitle>{t("guide.cv.pitfallsTitle")}</GuideSectionTitle>
        <div className="space-y-2">
          {content.pitfalls.map((p, i) => (
            <div
              key={i}
              className="flex gap-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg px-4 py-3"
            >
              <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-red-800 text-sm">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
