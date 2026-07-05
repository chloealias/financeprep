import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  Bookmark,
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  Mic,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { TodayPlanWidget, TodayActionCard } from "@/components/hub/TodayPlanWidget";
import { getAllTodayActions, type TodayAction, type TodayActionId } from "@/lib/today-plan";
import { SECTOR_DATA } from "@/data/sector-data";
import { AppearanceDialog } from "@/components/profile/AppearanceDialog";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileDataSection } from "@/components/profile/ProfileDataSection";
import { TargetBankQuickPick } from "@/components/profile/TargetBankQuickPick";
import { getProfileDashboard } from "@/lib/profile-dashboard";
import { downloadSessionReport } from "@/lib/download-session-report";
import {
  describePackPersonalization,
  formatPackPersonalizationShort,
  suggestedDefaultPackSize,
} from "@/lib/profile-personalization";
import { applyProfileAccentTheme } from "@/lib/profile-cosmetics";
import {
  DEFAULT_PROFILE,
  EXPERIENCE_LEVEL_OPTIONS,
  PROCESS_TYPE_OPTIONS,
  formatInterviewCountdown,
  loadProfile,
  saveProfile,
  toggleProfileSector,
  type ProcessType,
  type UserProfile,
  type ExperienceLevel,
} from "@/lib/profile-storage";
import type { SectorId } from "@/lib/sectors";
import { requestOpenTargetsFilter } from "@/lib/target-banks-storage";
import { getTargetBankIds } from "@/lib/target-banks-storage";
import {
  loadInterviewSessions,
  saveSavedFilters,
  type InterviewSessionRecord,
} from "@/lib/storage";
const defaultFilters = {
  activeCategory: "all",
  activeDifficulty: "all",
  searchQuery: "",
  ratingFilter: "all",
  conceptCategory: "all",
};

export function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const appearanceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyProfileAccentTheme(profile.accentThemeId);
  }, [mounted, profile.accentThemeId]);

  const handleOpenAppearance = () => {
    setAppearanceOpen(true);
  };

  const dashboard = useMemo(() => {
    if (!mounted) return null;
    void refreshKey;
    return getProfileDashboard();
  }, [mounted, refreshKey]);
  const packSummary = useMemo(() => describePackPersonalization(profile), [profile]);
  const sessions = useMemo(() => {
    if (!mounted) return [];
    void refreshKey;
    return loadInterviewSessions();
  }, [mounted, refreshKey]);
  const targetIds = useMemo(() => {
    if (!mounted) return [];
    void refreshKey;
    return getTargetBankIds();
  }, [mounted, refreshKey]);
  const countdown = formatInterviewCountdown(dashboard?.daysUntil ?? null);

  const persist = useCallback((next: UserProfile) => {
    const normalized = { ...next };
    saveProfile(normalized);
    setProfile(normalized);
    setRefreshKey((k) => k + 1);
  }, []);

  const update = (patch: Partial<UserProfile>) => {
    const next = { ...profile, ...patch };
    if (patch.processType !== undefined) {
      const suggested = suggestedDefaultPackSize(patch.processType);
      if (suggested) next.defaultPackSize = suggested;
    }
    persist(next);
  };

  const bumpRefresh = () => setRefreshKey((k) => k + 1);

  const openWeakQuestions = () => {
    saveSavedFilters({ ...defaultFilters, ratingFilter: "weak" });
    navigate({ to: "/", search: { tab: "questions" } });
  };

  if (!mounted || !dashboard) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="h-10 w-32 rounded-lg bg-muted animate-pulse mb-8" />
        <div className="h-48 rounded-2xl bg-muted/80 animate-pulse mb-8" />
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="h-24 rounded-xl bg-muted/60 animate-pulse" />
          <div className="h-24 rounded-xl bg-muted/60 animate-pulse" />
          <div className="h-24 rounded-xl bg-muted/60 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        to="/"
        className="touch-target-bar gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au guide
      </Link>

      <ProfileHero
        profile={profile}
        countdown={countdown}
        interviewPlan={dashboard.interviewPlan}
        onChange={update}
        onOpenAppearance={handleOpenAppearance}
      />

      <div ref={appearanceRef} />
      <AppearanceDialog
        open={appearanceOpen}
        onOpenChange={setAppearanceOpen}
        profile={profile}
        onChange={update}
      />

      <section className="mb-8 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card">
        <h2 className="type-section-title mb-4">Préférences entretien</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="type-label mb-1 block">
              Entretien
            </span>
            <input
              type="date"
              value={profile.interviewDate ?? ""}
              onChange={(e) => update({ interviewDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="block">
            <span className="type-label mb-1 block">
              Niveau
            </span>
            <select
              value={profile.experienceLevel ?? ""}
              onChange={(e) => update({ experienceLevel: e.target.value as ExperienceLevel })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            >
              {EXPERIENCE_LEVEL_OPTIONS.map((o) => (
                <option key={o.id || "none"} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="type-label mb-1 block">
              Process
            </span>
            <select
              value={profile.processType ?? ""}
              onChange={(e) => update({ processType: e.target.value as ProcessType })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            >
              {PROCESS_TYPE_OPTIONS.map((o) => (
                <option key={o.id || "none"} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="mb-10 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card">
        <h2 className="type-section-title mb-3">Objectifs</h2>

        <p className="mb-4 text-xs text-muted-foreground">
          Simulations : {formatPackPersonalizationShort(packSummary)}
          {!packSummary.hasBanks && " · ajoutez des banques"}
          {!packSummary.hasSectors && " · choisissez des secteurs"}
        </p>

        <div className="mb-6">
          <span className="text-sm font-medium text-foreground block mb-3">Banques cibles</span>
          <TargetBankQuickPick
            targetIds={targetIds}
            onChange={bumpRefresh}
            onViewAll={() => {
              requestOpenTargetsFilter();
              navigate({ to: "/", search: { tab: "banques" } });
            }}
          />
        </div>

        <div className="mb-6">
          <span className="text-sm font-medium text-foreground block mb-2">
            Secteurs d&apos;intérêt (max 3)
          </span>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(SECTOR_DATA) as SectorId[]).map((id) => {
              const selected = (profile.sectorIds ?? []).includes(id);
              return (
                <div
                  key={id}
                  className={`inline-flex items-center rounded-lg border text-sm font-medium transition-colors ${
                    selected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      update({
                        sectorIds: toggleProfileSector(profile.sectorIds ?? [], id),
                      })
                    }
                    className="touch-target-bar px-3"
                    aria-pressed={selected}
                  >
                    {SECTOR_DATA[id].name}
                  </button>
                  <Link
                    to="/"
                    search={{ tab: "secteurs", sector: id }}
                    className={`touch-target rounded-r-lg ${
                      selected
                        ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    aria-label={`Fiche ${SECTOR_DATA[id].name}`}
                    title="Voir la fiche secteur"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-foreground block mb-2">
            Taille pack entretien par défaut
          </span>
          <div className="flex gap-2">
            {([5, 7] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => update({ defaultPackSize: s })}
                className={`touch-target-bar px-4 rounded-lg border-2 text-sm font-medium ${
                  profile.defaultPackSize === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground"
                }`}
              >
                {s} questions
              </button>
            ))}
          </div>
        </label>
      </section>

      <section className="mb-10">
        <TodayPlanWidget showStreak className="mb-6" maxCards={3} compact />
        <h2 className="type-section-title mb-4">Toutes les actions</h2>
        <ProfileTodayGrid
          actions={getAllTodayActions(dashboard, profile)}
          onWeak={openWeakQuestions}
          onReview={() => {
            saveSavedFilters({ ...defaultFilters, ratingFilter: "all" });
            navigate({ to: "/", search: { tab: "questions" } });
          }}
        />
      </section>

      <section className="mb-10 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="type-section-title">Activité</h2>
          <Link
            to="/"
            search={{ tab: "progress" }}
            className="text-sm text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
          >
            Progression détaillée
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Questions maîtrisées (≥ 4★)</span>
            <span className="text-foreground font-medium tabular-nums">
              {dashboard.masteredCount}/{dashboard.totalQuestions} · {dashboard.masteredPct}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${dashboard.masteredPct}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground font-light mb-4">
          {dashboard.lastSessionLabel ?? "Aucune simulation enregistrée pour l'instant."}
        </p>

        {sessions.length > 0 && (
          <ul className="border-t border-border pt-4 space-y-3">
            {sessions.slice(0, 3).map((s) => (
              <SessionRow key={s.id} session={s} />
            ))}
          </ul>
        )}
      </section>

      <ProfileDataSection
        onImportDone={() => {
          setProfile(loadProfile());
          setRefreshKey((k) => k + 1);
        }}
        onResetAll={() => {
          setProfile(DEFAULT_PROFILE);
          setRefreshKey((k) => k + 1);
        }}
      />
    </div>
  );
}

function SessionRow({ session }: { session: InterviewSessionRecord }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 text-sm text-foreground">
      <span>
        {session.mode === "full" ? "Simulation" : "Mini"} ·{" "}
        {new Date(session.startedAt).toLocaleString("fr-FR", {
          day: "numeric",
          month: "short",
        })}{" "}
        · {session.avgStars.toFixed(1)}★
      </span>
      <span className="flex gap-2">
        <button
          type="button"
          onClick={() => downloadSessionReport(session)}
          className="touch-target-bar text-primary hover:text-primary/80 font-medium text-xs"
        >
          Rapport
        </button>
        <Link
          to={session.mode === "full" ? "/interview" : "/flashcards"}
          search={session.mode === "full" ? undefined : { mode: "quiz" }}
          className="touch-target-bar text-primary hover:text-primary/80 font-medium text-xs"
        >
          Refaire
        </Link>
      </span>
    </li>
  );
}

function ProfileTodayGrid({
  actions,
  onWeak,
  onReview,
}: {
  actions: TodayAction[];
  onWeak: () => void;
  onReview: () => void;
}) {
  const ICONS: Record<TodayActionId, React.ReactNode> = {
    srs: <Sparkles className="w-5 h-5" />,
    quiz: <Clock className="w-5 h-5" />,
    simulation: <Mic className="w-5 h-5" />,
    weak: <BarChart3 className="w-5 h-5" />,
    cv: <Calendar className="w-5 h-5" />,
    review: <Bookmark className="w-5 h-5" />,
    deal: <Newspaper className="w-5 h-5" />,
  };

  const handleAction = (action: TodayAction) => {
    if (action.onClickKey === "weak") onWeak();
    if (action.onClickKey === "review") onReview();
  };

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {actions.map((action) => (
        <TodayActionCard
          key={action.id}
          action={action}
          icon={ICONS[action.id]}
          onAction={handleAction}
        />
      ))}
    </div>
  );
}
