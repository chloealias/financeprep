import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { GuideSectionTitle, guideCardClass } from "@/components/guide/guide-ui";
import { useDiagnosticState } from "@/components/guide/useDiagnosticState";
import { getGuideDiagnostic } from "@/data/guide/diagnostic";
import { useT } from "@/hooks/useT";

function CopyTemplateButton({ text }: { text: string }) {
  const { t } = useT();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" aria-hidden />
          {t("guide.diagnostic.copied")}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" aria-hidden />
          {t("guide.diagnostic.copy")}
        </>
      )}
    </button>
  );
}

export function BlocNetworking() {
  const { t, locale } = useT();
  const content = getGuideDiagnostic(locale);
  const { state, toggleNetworking } = useDiagnosticState();

  return (
    <div className="space-y-8">
      <section>
        <GuideSectionTitle>{t("guide.diagnostic.weeklyGoalsTitle")}</GuideSectionTitle>
        <ul className="list-disc list-inside text-sm text-foreground space-y-1">
          {content.networkingWeeklyGoals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </section>

      <section>
        <GuideSectionTitle>{t("guide.diagnostic.prepTitle")}</GuideSectionTitle>
        <div className="space-y-2">
          {content.networkingPrep.map((item) => (
            <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!state.networking[item.id]}
                onChange={(e) => toggleNetworking(item.id, e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-primary"
              />
              <span
                className={`text-sm ${state.networking[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}
              >
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <p className="text-sm text-foreground italic border-l-2 border-primary pl-3">
          {content.networkingHook}
        </p>
      </section>

      <section>
        <GuideSectionTitle>{t("guide.diagnostic.templatesTitle")}</GuideSectionTitle>
        <div className="space-y-4">
          {content.networkingTemplates.map((tpl) => (
            <div key={tpl.id} className={`${guideCardClass} p-4`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-medium text-foreground">{tpl.title}</h4>
                <CopyTemplateButton text={tpl.body} />
              </div>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">
                {tpl.body}
              </pre>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
