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
import { defaultHomeSearch } from "@/lib/route-search";
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
  formatInterviewCountdown,
  getExperienceLevelOptions,
  getProcessTypeOptions,
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
import { useT } from "@/hooks/useT";
import { APP_LOCALES } from "@/lib/i18n/types";
const defaultFilters = {
  activeCategory: "all",
  activeDifficulty: "all",
  searchQuery: "",
  ratingFilter: "all",
  conceptCategory: "all",
};

export function ProfilePage() {
  const navigate = useNavigate();
  const { t, locale } = useT();
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
  const countdown = formatInterviewCountdown(dashboard?.daysUntil ?? null, locale);
  const experienceOptions = useMemo(() => getExperienceLevelOptions(locale), [locale]);
  const processOptions = useMemo(() => getProcessTypeOptions(locale), [locale]);

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
        search={defaultHomeSearch()}
        className="touch-target-bar gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("profile.backToGuide")}
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
        <h2 className="type-section-title mb-4">{t("profile.interviewPreferences")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="block">
            <span className="type-label mb-1 block">{t("profile.language")}</span>
            <div className="flex gap-2">
              {APP_LOCALES.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => update({ locale: loc })}
                  className={`touch-target-bar flex-1 justify-center px-3 rounded-lg border-2 text-sm font-medium ${
                    (profile.locale ?? "fr") === loc
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground"
                  }`}
                  aria-pressed={(profile.locale ?? "fr") === loc}
                >
                  {t(loc === "fr" ? "profile.language.fr" : "profile.language.en")}
                </button>
              ))}
            </div>
          </label>
          <label className="block">
            <span className="type-label mb-1 block">{t("profile.interviewDate")}</span>
            <input
              type="date"
              value={profile.interviewDate ?? ""}
              onChange={(e) => update({ interviewDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="block">
            <span className="type-label mb-1 block">{t("profile.level")}</span>
            <select
              value={profile.experienceLevel ?? ""}
              onChange={(e) => update({ experienceLevel: e.target.value as ExperienceLevel })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            >
              {experienceOptions.map((o) => (
                <option key={o.id || "none"} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="type-label mb-1 block">{t("profile.process")}</span>
            <select
              value={profile.processType ?? ""}
              onChange={(e) => update({ processType: e.target.value as ProcessType })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            >
              {processOptions.map((o) => (
                <option key={o.id || "none"} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="mb-10 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card">
        <h2 className="type-section-title mb-3">{t("profile.goals")}</h2>

        <p className="mb-4 text-xs text-muted-foreground">
          Simulations : {formatPackPersonalizationShort(packSummary)}
          {!packSummary.hasBanks && ` ${t("profile.addBanks")}`}
          {!packSummary.hasSectors && ` ${t("profile.chooseSectors")}`}
        </p>

        <div className="mb-6">
          <span className="text-sm font-medium text-foreground block mb-3">
            {t("profile.targetBanks")}
          </span>
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
            {t("profile.sectorsOfInterest")}
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
                    aria-label={t("profile.sectorSheetAria", { name: SECTOR_DATA[id].name })}
                    title={t("profile.viewSectorSheet")}
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
            {t("profile.defaultPackSize")}
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
                {t("profile.nQuestions", { count: s })}
              </button>
            ))}
          </div>
        </label>
      </section>

      <section className="mb-10">
        <TodayPlanWidget showStreak className="mb-6" maxCards={3} compact />
        <h2 className="type-section-title mb-4">{t("profile.allActions")}</h2>
        <ProfileTodayGrid
          actions={getAllTodayActions(dashboard, profile, t)}
          onWeak={openWeakQuestions}
          onReview={() => {
            saveSavedFilters({ ...defaultFilters, ratingFilter: "all" });
            navigate({ to: "/", search: { tab: "questions" } });
          }}
        />
      </section>

      <section className="mb-10 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="type-section-title">{t("profile.activity")}</h2>
          <Link
            to="/"
            search={{ tab: "progress" }}
            className="text-sm text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
          >
            {t("profile.detailedProgress")}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">{t("profile.masteredQuestions")}</span>
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
          {dashboard.lastSessionLabel ?? t("profile.noSimulationYet")}
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
  const { t, locale } = useT();
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 text-sm text-foreground">
      <span>
        {session.mode === "full"
          ? t("profile.sessionMode.simulation")
          : t("profile.sessionMode.mini")}{" "}
        ·{" "}
        {new Date(session.startedAt).toLocaleString(locale === "en" ? "en-GB" : "fr-FR", {
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
          {t("profile.sessionReport")}
        </button>
        <Link
          to={session.mode === "full" ? "/interview" : "/flashcards"}
          search={session.mode === "full" ? undefined : { mode: "quiz" }}
          className="touch-target-bar text-primary hover:text-primary/80 font-medium text-xs"
        >
          {t("profile.sessionRedo")}
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
