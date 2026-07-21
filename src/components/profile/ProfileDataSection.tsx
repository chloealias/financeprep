import { useRef, useState } from "react";
import { ChevronDown, Download, RotateCcw, Upload } from "lucide-react";
import {
  downloadBackup,
  importBackup,
  parseBackupPreview,
  resetData,
  type BackupPreview,
  type ResetScope,
} from "@/lib/profile-storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useT } from "@/hooks/useT";
import type { TranslateFn } from "@/lib/i18n/t";

type ProfileDataSectionProps = {
  onImportDone: () => void;
  onResetAll: () => void;
};

const RESET_SCOPE_KEYS: ResetScope[] = ["ratings", "srs", "sessions"];

function getResetScopeCopy(scope: ResetScope, t: TranslateFn) {
  return {
    scope,
    title: t(`profile.data.reset.${scope}.title`),
    short: t(`profile.data.reset.${scope}.short`),
    dialogTitle: t(`profile.data.reset.${scope}.dialogTitle`),
    dialogDescription: t(`profile.data.reset.${scope}.dialogDescription`),
  };
}

export function ProfileDataSection({ onImportDone, onResetAll }: ProfileDataSectionProps) {
  const { t } = useT();
  const fileRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const [pendingImport, setPendingImport] = useState<{
    json: string;
    preview: BackupPreview;
  } | null>(null);
  const [dangerOpen, setDangerOpen] = useState(false);

  return (
    <section className="mb-10 rounded-2xl border border-border bg-card overflow-hidden shadow-card">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-foreground font-serif text-lg">{t("profile.data.title")}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{t("profile.data.subtitle")}</p>
      </div>

      <div className="p-5 grid sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={downloadBackup}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          <Download className="w-4 h-4" />
          {t("profile.data.export")}
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted"
        >
          <Upload className="w-4 h-4" />
          {t("profile.data.import")}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              const text = String(reader.result ?? "");
              const parsed = parseBackupPreview(text);
              if (!parsed.ok) {
                setImportMsg(parsed.error);
                setPendingImport(null);
              } else {
                setPendingImport({ json: text, preview: parsed.preview });
                setImportMsg(null);
              }
            };
            reader.readAsText(file);
            e.target.value = "";
          }}
        />
      </div>

      {importMsg && (
        <p className="mx-5 mb-4 text-sm text-foreground bg-muted px-3 py-2 rounded-lg">
          {importMsg}
        </p>
      )}

      {pendingImport && (
        <div className="mx-5 mb-4 rounded-xl border border-border bg-muted p-4 text-sm">
          <p className="font-medium text-foreground mb-2">{t("profile.data.confirmImport")}</p>
          <p className="text-muted-foreground text-xs mb-3">
            {t("profile.data.importPreview", {
              ratingsCount: pendingImport.preview.ratingsCount,
              sessionsCount: pendingImport.preview.sessionsCount,
              targetBanksCount: pendingImport.preview.targetBanksCount,
            })}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="touch-target-bar px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium"
              onClick={() => {
                const result = importBackup(pendingImport.json);
                if (result.ok) {
                  setImportMsg(t("profile.data.importOk"));
                  onImportDone();
                } else setImportMsg(result.error);
                setPendingImport(null);
              }}
            >
              {t("profile.data.confirm")}
            </button>
            <button
              type="button"
              className="touch-target-bar px-3 rounded-lg border border-border text-xs"
              onClick={() => setPendingImport(null)}
            >
              {t("profile.data.cancel")}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setDangerOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm text-destructive bg-destructive/10 hover:bg-destructive/15 border-t border-destructive/20"
      >
        <span className="font-medium">{t("profile.data.resetZone")}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${dangerOpen ? "rotate-180" : ""}`} />
      </button>
      {dangerOpen && (
        <div className="px-5 pb-5 pt-2 space-y-2">
          {RESET_SCOPE_KEYS.map((scope) => (
            <ResetRow key={scope} {...getResetScopeCopy(scope, t)} onDone={onImportDone} />
          ))}
          <ResetRow
            title={t("profile.data.reset.all.title")}
            short={t("profile.data.reset.all.short")}
            dialogTitle={t("profile.data.reset.all.dialogTitle")}
            dialogDescription={t("profile.data.reset.all.dialogDescription")}
            confirmLabel={t("profile.data.confirm")}
            cancelLabel={t("profile.data.cancel")}
            destructive
            onDone={() => {
              resetData("all");
              onResetAll();
            }}
          />
        </div>
      )}
    </section>
  );
}

function ResetRow({
  scope,
  title,
  short,
  dialogTitle,
  dialogDescription,
  destructive,
  confirmLabel,
  cancelLabel,
  onDone,
}: {
  scope?: ResetScope;
  title: string;
  short: string;
  dialogTitle: string;
  dialogDescription: string;
  destructive?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onDone: () => void;
}) {
  const { t } = useT();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left text-sm ${
            destructive
              ? "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15"
              : "border-border bg-muted text-foreground hover:bg-card"
          }`}
        >
          <span className="flex items-center gap-2">
            <RotateCcw className="w-3.5 h-3.5 opacity-60" />
            <span className="font-medium">{title}</span>
          </span>
          <span className="text-xs opacity-70">{short}</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel ?? t("profile.data.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className={destructive ? "bg-destructive hover:bg-destructive/90" : undefined}
            onClick={() => {
              if (scope) resetData(scope);
              onDone();
            }}
          >
            {confirmLabel ?? t("profile.data.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
