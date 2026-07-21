import { Calendar, Palette } from "lucide-react";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { ProfileBanner } from "@/components/profile/ProfileBanner";
import type { UserProfile } from "@/lib/profile-storage";
import { useT } from "@/hooks/useT";

type ProfileHeroProps = {
  profile: UserProfile;
  countdown: string | null;
  interviewPlan: string | null;
  onChange: (patch: Partial<UserProfile>) => void;
  onOpenAppearance: () => void;
};

export function ProfileHero({
  profile,
  countdown,
  interviewPlan,
  onChange,
  onOpenAppearance,
}: ProfileHeroProps) {
  const { t } = useT();

  return (
    <section className="mb-4 rounded-2xl overflow-hidden border border-border shadow-card">
      <ProfileBanner bannerId={profile.bannerId} className="relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"
          aria-hidden
        />

        <button
          type="button"
          onClick={onOpenAppearance}
          aria-label={t("profile.hero.customizeAppearanceAria")}
          className="absolute top-3 left-3 z-20 bg-black/25 backdrop-blur rounded-full p-2 text-white hover:bg-black/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <Palette className="w-4 h-4" />
        </button>

        {countdown && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-xs font-medium text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {countdown}
            </span>
          </div>
        )}

        <div className="relative z-10 px-5 pt-14 pb-5 sm:pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <ProfileAvatar profile={profile} size="lg" ring className="flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-2 pt-1 sm:pb-0.5">
              <input
                type="text"
                value={profile.firstName ?? ""}
                onChange={(e) => onChange({ firstName: e.target.value })}
                placeholder={t("profile.hero.firstName")}
                className="w-full text-2xl font-serif text-white bg-transparent border-0 border-b border-white/35 focus:border-white/80 focus:outline-none placeholder:text-white/50 drop-shadow-sm"
                aria-label={t("profile.hero.firstName")}
              />
              <input
                type="text"
                value={profile.targetRole ?? ""}
                onChange={(e) => onChange({ targetRole: e.target.value })}
                placeholder={t("profile.hero.targetRole")}
                className="w-full text-sm text-white/90 bg-transparent border-0 focus:outline-none placeholder:text-white/50 drop-shadow-sm"
                aria-label={t("profile.hero.targetRole")}
              />
            </div>
          </div>

          {interviewPlan && (
            <p className="mt-4 text-xs text-foreground bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 leading-relaxed border border-border/60">
              {interviewPlan}
            </p>
          )}
        </div>
      </ProfileBanner>
    </section>
  );
}
