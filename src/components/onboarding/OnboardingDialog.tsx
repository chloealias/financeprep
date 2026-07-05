import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TargetBankQuickPick } from "@/components/profile/TargetBankQuickPick";
import { getProfileDashboard } from "@/lib/profile-dashboard";
import { markOnboardingDone } from "@/lib/onboarding";
import { getPrioritizedTodayActions } from "@/lib/today-plan";
import {
  DEFAULT_PROFILE,
  loadProfile,
  saveProfile,
  type UserProfile,
} from "@/lib/profile-storage";
import { getTargetBankIds } from "@/lib/target-banks-storage";

type OnboardingDialogProps = {
  open: boolean;
  onComplete: () => void;
};

type Step = 1 | 2 | 3;

export function OnboardingDialog({ open, onComplete }: OnboardingDialogProps) {
  const [step, setStep] = useState<Step>(1);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [targetRefresh, setTargetRefresh] = useState(0);

  useEffect(() => {
    if (open) {
      setProfile(loadProfile());
      setStep(1);
    }
  }, [open]);

  const previewActions = useMemo(() => {
    void targetRefresh;
    const dash = getProfileDashboard();
    return getPrioritizedTodayActions(dash, profile, 3);
  }, [profile, targetRefresh, step]);

  const finish = () => {
    saveProfile(profile);
    markOnboardingDone();
    onComplete();
  };

  const skip = () => {
    markOnboardingDone();
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && skip()}>
      <DialogContent className="max-w-md sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {step === 1 && "Bienvenue sur FinancePrep"}
            {step === 2 && "Vos banques cibles"}
            {step === 3 && "Votre plan du jour"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Personnalisez votre préparation en 3 étapes rapides."}
            {step === 2 && "Sélectionnez 1 à 3 banques pour des packs d'entretien adaptés."}
            {step === 3 && "Voici par où commencer aujourd'hui."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-2">
            <label className="block">
              <span className="type-label mb-1 block">Prénom</span>
              <input
                type="text"
                value={profile.firstName ?? ""}
                onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                placeholder="Alex"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </label>
            <label className="block">
              <span className="type-label mb-1 block">Date d&apos;entretien (optionnel)</span>
              <input
                type="date"
                value={profile.interviewDate ?? ""}
                onChange={(e) => setProfile((p) => ({ ...p, interviewDate: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="py-2">
            <TargetBankQuickPick
              targetIds={getTargetBankIds()}
              onChange={() => setTargetRefresh((k) => k + 1)}
              onViewAll={() => {
                finish();
              }}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3 py-2">
            {previewActions.map((action) => (
              <div
                key={action.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4"
              >
                <Sparkles className="w-5 h-5 text-primary shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-foreground">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.desc}</div>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              Retrouvez ces actions sur l&apos;onglet Guide et dans votre profil.
            </p>
          </div>
        )}

        <div className="flex gap-1 justify-center pt-2">
          {([1, 2, 3] as const).map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${s === step ? "w-6 bg-primary" : "w-1.5 bg-muted"}`}
            />
          ))}
        </div>

        <DialogFooter className="flex-row justify-between sm:justify-between gap-2">
          <button
            type="button"
            onClick={skip}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Passer
          </button>
          <div className="flex gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="touch-target-bar px-4 rounded-lg border border-border text-sm font-medium"
              >
                Retour
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1) saveProfile(profile);
                  setStep((s) => (s + 1) as Step);
                }}
                className="touch-target-bar gap-1 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/flashcards"
                search={{ mode: "flashcards" }}
                onClick={finish}
                className="touch-target-bar gap-1 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
              >
                Commencer
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
