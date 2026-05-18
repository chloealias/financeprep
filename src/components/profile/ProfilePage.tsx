import { useCallback, useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    setProfile(loadProfile());
    setMounted(true);
  }, []);

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
        <div className="h-10 w-32 rounded-lg bg-blue-100 animate-pulse mb-8" />
        <div className="h-48 rounded-2xl bg-blue-100/80 animate-pulse mb-8" />
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="h-24 rounded-xl bg-blue-50 animate-pulse" />
          <div className="h-24 rounded-xl bg-blue-50 animate-pulse" />
          <div className="h-24 rounded-xl bg-blue-50 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        to="/"
        className="touch-target-bar gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au guide
      </Link>

      <ProfileHero
        profile={profile}
        countdown={countdown}
        interviewPlan={dashboard.interviewPlan}
        onChange={update}
        onOpenAppearance={() => setAppearanceOpen(true)}
      />

      <AppearanceDialog
        open={appearanceOpen}
        onOpenChange={setAppearanceOpen}
        profile={profile}
        onChange={update}
      />

      <section className="mb-8 grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-[10px] uppercase tracking-wider text-blue-500 mb-1 block">
            Entretien
          </span>
          <input
            type="date"
            value={profile.interviewDate ?? ""}
            onChange={(e) => update({ interviewDate: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-blue-100 bg-white text-sm text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-wider text-blue-500 mb-1 block">
            Niveau
          </span>
          <select
            value={profile.experienceLevel ?? ""}
            onChange={(e) => update({ experienceLevel: e.target.value as ExperienceLevel })}
            className="w-full px-3 py-2 rounded-lg border border-blue-100 bg-white text-sm text-blue-950"
          >
            {EXPERIENCE_LEVEL_OPTIONS.map((o) => (
              <option key={o.id || "none"} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-wider text-blue-500 mb-1 block">
            Process
          </span>
          <select
            value={profile.processType ?? ""}
            onChange={(e) => update({ processType: e.target.value as ProcessType })}
            className="w-full px-3 py-2 rounded-lg border border-blue-100 bg-white text-sm text-blue-950"
          >
            {PROCESS_TYPE_OPTIONS.map((o) => (
              <option key={o.id || "none"} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      {/* Objectif entretien */}
      <section className="mb-10 bg-white rounded-2xl border border-blue-100 p-5 sm:p-6 shadow-card">
        <h2 className="text-blue-950 font-serif text-lg mb-3">Objectifs</h2>

        <p className="mb-5 text-xs text-blue-600">
          Simulations : {formatPackPersonalizationShort(packSummary)}
          {!packSummary.hasBanks && " · ajoutez des banques"}
          {!packSummary.hasSectors && " · choisissez des secteurs"}
        </p>

        <div className="mb-6">
          <span className="text-sm font-medium text-blue-950 block mb-3">Banques cibles</span>
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
          <span className="text-sm font-medium text-blue-950 block mb-2">
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
                      ? "bg-indigo-900 text-white border-indigo-900"
                      : "bg-white text-blue-800 border-blue-200 hover:border-blue-400"
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
                        ? "text-white/80 hover:text-white hover:bg-indigo-800"
                        : "text-blue-500 hover:text-blue-900 hover:bg-blue-50"
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
          <span className="text-sm font-medium text-blue-950 block mb-2">
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
                    ? "bg-blue-900 text-white border-blue-900"
                    : "border-blue-200 text-blue-900"
                }`}
              >
                {s} questions
              </button>
            ))}
          </div>
        </label>
      </section>

      {/* Aujourd'hui */}
      <section className="mb-10">
        <h2 className="text-blue-950 font-serif text-xl mb-4">Aujourd&apos;hui</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <TodayCard
            title="Flashcards SRS"
            stat={`${dashboard.srsDue} due`}
            desc="Révision SRS"
            href="/flashcards"
            search={dashboard.srsDue > 0 ? { mode: "flashcards" as const } : undefined}
            icon={<Sparkles className="w-5 h-5" />}
            highlight={dashboard.srsDue > 0 || dashboard.todayHighlights.has("srs")}
          />
          <TodayCard
            title="Mini-entretien"
            stat={dashboard.weakCount > 0 ? `${dashboard.weakCount} faiblesses` : "Pack structuré"}
            desc={`${profile.defaultPackSize ?? 5} questions`}
            href="/flashcards"
            search={{ mode: "quiz" }}
            icon={<Clock className="w-5 h-5" />}
            highlight={dashboard.todayHighlights.has("quiz")}
          />
          <TodayCard
            title="Actualité M&A"
            stat={dashboard.suggestedDealTitle ? "Deal suggéré" : "Fiches deals"}
            desc={
              dashboard.suggestedDealTitle
                ? dashboard.suggestedDealTitle.slice(0, 42) +
                  (dashboard.suggestedDealTitle.length > 42 ? "…" : "")
                : "Derniers deals et tendances"
            }
            href="/actualite"
            search={dashboard.suggestedDealId ? { deal: dashboard.suggestedDealId } : undefined}
            icon={<Newspaper className="w-5 h-5" />}
            highlight={Boolean(dashboard.suggestedDealId)}
          />
          <TodayCard
            title="Simulation 30 min"
            stat={dashboard.suggestSimulation ? "Recommandé" : "À jour"}
            desc="Timer 30 min"
            href="/interview"
            icon={<Mic className="w-5 h-5" />}
            highlight={dashboard.suggestSimulation || dashboard.todayHighlights.has("simulation")}
          />
          <TodayCard
            title="Questions faibles"
            stat={`${dashboard.weakCount}`}
            desc="Notes 1–2★"
            onClick={openWeakQuestions}
            icon={<BarChart3 className="w-5 h-5" />}
            disabled={dashboard.weakCount === 0}
            highlight={dashboard.todayHighlights.has("weak")}
          />
          <TodayCard
            title="Checklist CV"
            stat={`${dashboard.cvChecked}/${dashboard.cvTotal}`}
            desc="Walk me through CV"
            href="/cv"
            icon={<Calendar className="w-5 h-5" />}
            highlight={dashboard.todayHighlights.has("cv")}
          />
          <TodayCard
            title="À réviser"
            stat={`${dashboard.reviewCount}`}
            desc="Signets"
            onClick={() => {
              saveSavedFilters({ ...defaultFilters, ratingFilter: "all" });
              navigate({ to: "/", search: { tab: "questions" } });
            }}
            icon={<Bookmark className="w-5 h-5" />}
            disabled={dashboard.reviewCount === 0}
            highlight={dashboard.todayHighlights.has("review")}
          />
        </div>
      </section>

      {/* Activité */}
      <section className="mb-10 bg-white rounded-2xl border border-blue-100 p-5 sm:p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-blue-950 font-serif text-xl">Activité</h2>
          <Link
            to="/"
            search={{ tab: "progress" }}
            className="text-sm text-blue-700 hover:text-blue-900 font-medium inline-flex items-center gap-1"
          >
            Progression détaillée
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-700">Questions maîtrisées (≥ 4★)</span>
            <span className="text-blue-950 font-medium tabular-nums">
              {dashboard.masteredCount}/{dashboard.totalQuestions} · {dashboard.masteredPct}%
            </span>
          </div>
          <div className="h-2 bg-blue-50 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-800 transition-all"
              style={{ width: `${dashboard.masteredPct}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-blue-600 font-light mb-4">
          {dashboard.lastSessionLabel ?? "Aucune simulation enregistrée pour l'instant."}
        </p>

        {sessions.length > 0 && (
          <ul className="border-t border-blue-100 pt-4 space-y-3">
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
    <li className="flex flex-wrap items-center justify-between gap-2 text-sm text-blue-800">
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
          className="touch-target-bar text-blue-700 hover:text-blue-900 font-medium text-xs"
        >
          Rapport
        </button>
        <Link
          to={session.mode === "full" ? "/interview" : "/flashcards"}
          search={session.mode === "full" ? undefined : { mode: "quiz" }}
          className="touch-target-bar text-blue-700 hover:text-blue-900 font-medium text-xs"
        >
          Refaire
        </Link>
      </span>
    </li>
  );
}

function TodayCard({
  title,
  stat,
  desc,
  href,
  search,
  onClick,
  icon,
  highlight,
  disabled,
}: {
  title: string;
  stat: string;
  desc: string;
  href?: string;
  search?: { mode?: "flashcards" | "quiz"; deal?: string };
  onClick?: () => void;
  icon: React.ReactNode;
  highlight?: boolean;
  disabled?: boolean;
}) {
  const className = `text-left rounded-2xl p-5 border-2 transition-all w-full ${
    disabled
      ? "opacity-50 cursor-not-allowed border-blue-100 bg-white"
      : highlight
        ? "border-violet-300 bg-violet-50 hover:border-violet-400 shadow-card"
        : "border-blue-100 bg-white hover:border-blue-300 shadow-card"
  }`;

  const inner = (
    <>
      <div className="flex items-center gap-2 text-blue-700 mb-2">{icon}</div>
      <div className="font-serif text-lg text-blue-950">{title}</div>
      <div className="text-sm font-semibold text-indigo-800 mt-1">{stat}</div>
      <p className="text-xs text-blue-600 font-light mt-1">{desc}</p>
    </>
  );

  if (href && !disabled) {
    return (
      <Link to={href} search={search} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
