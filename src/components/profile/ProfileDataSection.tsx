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

type ProfileDataSectionProps = {
  onImportDone: () => void;
  onResetAll: () => void;
};

export function ProfileDataSection({ onImportDone, onResetAll }: ProfileDataSectionProps) {
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
        <h2 className="text-foreground font-serif text-lg">Données</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Stockage local · export pour changer d&apos;appareil
        </p>
      </div>

      <div className="p-5 grid sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={downloadBackup}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          <Download className="w-4 h-4" />
          Exporter
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted"
        >
          <Upload className="w-4 h-4" />
          Importer
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
          <p className="font-medium text-foreground mb-2">Confirmer l&apos;import ?</p>
          <p className="text-muted-foreground text-xs mb-3">
            {pendingImport.preview.ratingsCount} notes · {pendingImport.preview.sessionsCount}{" "}
            sessions · {pendingImport.preview.targetBanksCount} banques
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="touch-target-bar px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium"
              onClick={() => {
                const result = importBackup(pendingImport.json);
                if (result.ok) {
                  setImportMsg("Import OK.");
                  onImportDone();
                } else setImportMsg(result.error);
                setPendingImport(null);
              }}
            >
              Confirmer
            </button>
            <button
              type="button"
              className="touch-target-bar px-3 rounded-lg border border-border text-xs"
              onClick={() => setPendingImport(null)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setDangerOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm text-destructive bg-destructive/10 hover:bg-destructive/15 border-t border-destructive/20"
      >
        <span className="font-medium">Zone de réinitialisation</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${dangerOpen ? "rotate-180" : ""}`} />
      </button>
      {dangerOpen && (
        <div className="px-5 pb-5 pt-2 space-y-2">
          {RESET_SCOPES.map((opt) => (
            <ResetRow key={opt.scope} {...opt} onDone={onImportDone} />
          ))}
          <ResetRow
            title="Tout effacer"
            short="Profil + progression"
            dialogTitle="Tout réinitialiser ?"
            dialogDescription="Supprime toutes les données locales. Irréversible."
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

const RESET_SCOPES: {
  scope: ResetScope;
  title: string;
  short: string;
  dialogTitle: string;
  dialogDescription: string;
}[] = [
  {
    scope: "ratings",
    title: "Notes",
    short: "Étoiles questions",
    dialogTitle: "Effacer les notes ?",
    dialogDescription: "Toutes les auto-notations seront supprimées.",
  },
  {
    scope: "srs",
    title: "SRS",
    short: "Flashcards",
    dialogTitle: "Réinitialiser le SRS ?",
    dialogDescription: "Historique de répétition espacée effacé.",
  },
  {
    scope: "sessions",
    title: "Simulations",
    short: "Entretiens",
    dialogTitle: "Effacer les simulations ?",
    dialogDescription: "Historique mini-entretien et 30 min supprimé.",
  },
];

function ResetRow({
  scope,
  title,
  short,
  dialogTitle,
  dialogDescription,
  destructive,
  onDone,
}: {
  scope?: ResetScope;
  title: string;
  short: string;
  dialogTitle: string;
  dialogDescription: string;
  destructive?: boolean;
  onDone: () => void;
}) {
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
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            className={destructive ? "bg-destructive hover:bg-destructive/90" : undefined}
            onClick={() => {
              if (scope) resetData(scope);
              onDone();
            }}
          >
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
