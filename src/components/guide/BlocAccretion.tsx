import { useState } from "react";
import { GuideSectionTitle } from "@/components/guide/guide-ui";
import { getGuideAccretion } from "@/data/guide/accretion";
import {
  getAccretionVerdictLabel,
  stockDealVerdict,
  type AccretionVerdict,
} from "@/lib/accretion-rules";
import { useT } from "@/hooks/useT";

export function BlocAccretion() {
  const { t, locale } = useT();
  const content = getGuideAccretion(locale);
  const [peAcq, setPeAcq] = useState(20);
  const [peTgt, setPeTgt] = useState(15);

  const verdict = stockDealVerdict(peAcq, peTgt);
  const peCompare = content.peCompare[verdict as AccretionVerdict];

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-primary/10 border-l-4 border-primary rounded-r-xl p-5">
          <div className="bg-primary/20 text-primary text-xs font-semibold px-2 py-0.5 rounded inline-block mb-3">
            {t("guide.accretion.badge.accretive")}
          </div>
          <p className="text-foreground text-sm mb-2">{content.accretive.body}</p>
          <p className="text-primary text-sm font-mono">{content.accretive.formula}</p>
          <p className="text-muted-foreground text-xs mt-2">{content.accretive.condition}</p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-5">
          <div className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded inline-block mb-3">
            {t("guide.accretion.badge.dilutive")}
          </div>
          <p className="text-red-900 text-sm mb-2">{content.dilutive.body}</p>
          <p className="text-red-700 text-sm font-mono">{content.dilutive.formula}</p>
          <p className="text-red-400 text-xs mt-2">{content.dilutive.condition}</p>
        </div>
      </div>

      <div className="bg-foreground rounded-xl p-6 mb-8">
        <div className="text-primary/70 text-xs uppercase tracking-[0.2em] mb-4">
          {t("guide.accretion.formulaTitle")}
        </div>
        <div className="font-mono text-sm leading-loose">
          <div className="text-white">{content.formula.line1}</div>
          <div className="text-primary/80 pl-4">{content.formula.numerator}</div>
          <div className="text-white pl-4">÷</div>
          <div className="text-primary/80 pl-4">{content.formula.denominator}</div>
          <div className="mt-3 text-emerald-400">{content.formula.result}</div>
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle className="mb-1">
          {t("guide.accretion.simulatorTitle")}
        </GuideSectionTitle>
        <p className="text-muted-foreground text-xs italic mb-5">
          {t("guide.accretion.simulatorHint")}
        </p>

        <div className="space-y-4 mb-6">
          {[
            { label: t("guide.accretion.simulator.peAcquirer"), val: peAcq, set: setPeAcq },
            { label: t("guide.accretion.simulator.peTarget"), val: peTgt, set: setPeTgt },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm w-36 flex-shrink-0">{s.label}</span>
              <input
                type="range"
                min="8"
                max="40"
                step="1"
                value={s.val}
                onChange={(e) => s.set(+e.target.value)}
                className="flex-1 accent-primary"
              />
              <span className="text-foreground font-semibold text-sm w-10 text-right">
                {s.val}x
              </span>
            </div>
          ))}
        </div>

        <div
          className={`rounded-xl p-4 border-2 flex items-center justify-between gap-4 transition-all ${
            verdict === "accretif"
              ? "bg-blue-50 border-blue-300"
              : verdict === "dilutif"
                ? "bg-red-50 border-red-300"
                : "bg-slate-50 border-slate-200"
          }`}
        >
          <span className="text-sm text-slate-600">{t("guide.accretion.verdict")}</span>
          <div className="flex items-center gap-3">
            <span
              className={`text-xl font-serif font-medium ${
                verdict === "accretif"
                  ? "text-blue-800"
                  : verdict === "dilutif"
                    ? "text-red-700"
                    : "text-slate-600"
              }`}
            >
              {getAccretionVerdictLabel(verdict, t)}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                verdict === "accretif"
                  ? "bg-primary/10 text-primary"
                  : verdict === "dilutif"
                    ? "bg-red-100 text-red-700"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              {peCompare}
            </span>
          </div>
        </div>
      </div>

      <div>
        <GuideSectionTitle>{t("guide.accretion.rulesTitle")}</GuideSectionTitle>
        <div className="space-y-2">
          {content.rules.map((r) => (
            <div key={r.labelKey} className="flex gap-3">
              <span className="bg-primary/10 text-primary text-xs font-mono px-2 py-0.5 rounded flex-shrink-0 mt-0.5 h-fit">
                →
              </span>
              <div>
                <span className="text-foreground text-sm font-medium">
                  {t(r.labelKey)}
                  {" : "}
                </span>
                <span className="text-muted-foreground text-sm font-light">{r.texte}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
