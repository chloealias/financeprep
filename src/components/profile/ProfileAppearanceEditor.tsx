import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { ProfileBanner } from "@/components/profile/ProfileBanner";
import {
  PROFILE_ACCENT_THEMES,
  PROFILE_BANNERS,
  PROFILE_ICON_COLORS,
  PROFILE_ICONS,
  randomPatternSeed,
  type AvatarKind,
  type ProfileBannerId,
  type ProfileIconId,
} from "@/lib/profile-cosmetics";
import type { UserProfile } from "@/lib/profile-storage";

type ProfileAppearanceEditorProps = {
  profile: UserProfile;
  onChange: (patch: Partial<UserProfile>) => void;
  showAppPreview?: boolean;
};

export function ProfileAppearanceEditor({
  profile,
  onChange,
  showAppPreview = true,
}: ProfileAppearanceEditorProps) {
  const [avatarTab, setAvatarTab] = useState<AvatarKind>(profile.avatarKind ?? "icon");

  const selectIcon = (id: ProfileIconId) => {
    onChange({ avatarKind: "icon", avatarId: id });
    setAvatarTab("icon");
  };

  const selectPattern = (seed?: number) => {
    onChange({
      avatarKind: "pattern",
      avatarPatternSeed: seed ?? randomPatternSeed(),
    });
    setAvatarTab("pattern");
  };

  const selectBanner = (id: ProfileBannerId) => {
    onChange({ bannerId: id });
  };

  return (
    <>
      <p className="text-xs text-muted-foreground mb-4">
        Personnalisez l&apos;avatar, la bannière et la couleur d&apos;accent principale.
      </p>

      {showAppPreview && (
        <div className="mb-6">
          <p className="type-label mb-2">
            Aperçu header
          </p>
          <ProfileBanner bannerId={profile.bannerId} className="h-16 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-end px-4 gap-3">
              <span className="text-white/90 text-sm font-medium hidden sm:inline">
                Finance Interview
              </span>
              <ProfileAvatar profile={profile} size="sm" className="border-2 border-white/50" />
            </div>
          </ProfileBanner>
        </div>
      )}

      <div className="mb-6">
        <h3 className="type-section-title text-lg mb-3">Icône de profil</h3>
        <div className="flex gap-1 p-1 bg-muted rounded-lg mb-3 max-w-xs">
          <button
            type="button"
            onClick={() => setAvatarTab("icon")}
            className={`flex-1 touch-target-bar justify-center text-xs font-medium rounded-md ${
              avatarTab === "icon" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
            }`}
          >
            Icônes finance
          </button>
          <button
            type="button"
            onClick={() => {
              setAvatarTab("pattern");
              if (profile.avatarKind !== "pattern") selectPattern();
            }}
            className={`flex-1 touch-target-bar justify-center text-xs font-medium rounded-md gap-1 ${
              avatarTab === "pattern"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            Style unique
          </button>
        </div>

        {avatarTab === "icon" ? (
          <>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {PROFILE_ICONS.map(({ id, label, Icon, bg, fg }) => {
                const selected =
                  (profile.avatarKind ?? "icon") !== "pattern" &&
                  (profile.avatarId ?? "landmark") === id;
                return (
                  <button
                    key={id}
                    type="button"
                    title={label}
                    onClick={() => selectIcon(id)}
                    className={`aspect-square min-h-10 min-w-10 rounded-xl flex items-center justify-center transition-all ${
                      selected
                        ? "ring-2 ring-ring ring-offset-2 scale-105"
                        : "opacity-85 hover:opacity-100 hover:scale-105"
                    }`}
                    style={{ backgroundColor: bg, color: fg }}
                    aria-pressed={selected}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-medium text-foreground mb-2">
                Couleur de l&apos;icône (optionnel)
              </h4>
              <div className="flex flex-wrap gap-2">
                {PROFILE_ICON_COLORS.map((opt) => {
                  const selected = (profile.avatarIconColorId ?? "default") === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onChange({ avatarIconColorId: opt.id })}
                      className={`touch-target-bar gap-2 rounded-lg border px-3 text-xs transition-colors ${
                        selected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/40"
                      }`}
                      aria-pressed={selected}
                    >
                      <span
                        className={`h-3 w-3 rounded-full border ${opt.id === "default" ? "bg-transparent" : ""}`}
                        style={{
                          background: opt.id === "default" ? undefined : opt.bg,
                          borderColor: opt.id === "default" ? "var(--border)" : "transparent",
                        }}
                      />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <ProfileAvatar profile={{ ...profile, avatarKind: "pattern" }} size="lg" ring />
            <button
              type="button"
              onClick={() => selectPattern()}
              className="touch-target-bar gap-2 px-3 rounded-lg border border-border text-sm text-foreground hover:bg-muted"
            >
              <RefreshCw className="w-4 h-4" />
              Nouveau motif
            </button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="type-section-title text-lg mb-3">Couleur d&apos;accent</h3>
        <div className="flex flex-wrap gap-2">
          {PROFILE_ACCENT_THEMES.map((theme) => {
            const selected = (profile.accentThemeId ?? "navy") === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onChange({ accentThemeId: theme.id })}
                className={`touch-target-bar gap-2 rounded-lg border px-3 text-sm transition-colors ${
                  selected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
                aria-pressed={selected}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: theme.primary }}
                />
                {theme.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="type-section-title text-lg mb-3">
          Bannière de l&apos;app ({PROFILE_BANNERS.length} thèmes)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {PROFILE_BANNERS.map(({ id, label, className }) => {
            const selected = (profile.bannerId ?? "midnight") === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectBanner(id)}
                className={`h-12 sm:h-14 rounded-xl ${className} relative overflow-hidden transition-transform ${
                  selected ? "ring-2 ring-ring ring-offset-2 scale-[1.02]" : "hover:scale-[1.02]"
                }`}
                aria-pressed={selected}
              >
                <span className="absolute bottom-1 left-2 text-xs font-medium text-white/90 drop-shadow">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
