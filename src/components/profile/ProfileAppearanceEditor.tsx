import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { ProfileBanner } from "@/components/profile/ProfileBanner";
import {
  PROFILE_BANNERS,
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
      <p className="text-xs text-blue-500 mb-4">
        Avatar et bannière du header, appliqués dans toute l&apos;app.
      </p>

      {showAppPreview && (
        <div className="mb-6 rounded-xl overflow-hidden border border-blue-100">
          <p className="text-[10px] uppercase tracking-wider text-blue-400 px-3 pt-2">
            Aperçu header
          </p>
          <ProfileBanner bannerId={profile.bannerId} className="h-16">
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
        <h3 className="text-sm font-medium text-blue-950 mb-3">Icône de profil</h3>
        <div className="flex gap-1 p-1 bg-slate-100 rounded-lg mb-3 max-w-xs">
          <button
            type="button"
            onClick={() => setAvatarTab("icon")}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md ${
              avatarTab === "icon" ? "bg-white shadow-sm text-blue-950" : "text-slate-600"
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
            className={`flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center gap-1 ${
              avatarTab === "pattern" ? "bg-white shadow-sm text-blue-950" : "text-slate-600"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            Style unique
          </button>
        </div>

        {avatarTab === "icon" ? (
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
                  className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                    selected
                      ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
                      : "opacity-85 hover:opacity-100 hover:scale-105"
                  }`}
                  style={{ backgroundColor: bg, color: fg }}
                  aria-pressed={selected}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <ProfileAvatar profile={{ ...profile, avatarKind: "pattern" }} size="lg" ring />
            <button
              type="button"
              onClick={() => selectPattern()}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-200 text-sm text-blue-900 hover:bg-blue-50"
            >
              <RefreshCw className="w-4 h-4" />
              Nouveau motif
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-blue-950 mb-3">
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
                  selected
                    ? "ring-2 ring-blue-500 ring-offset-2 scale-[1.02]"
                    : "hover:scale-[1.02]"
                }`}
                aria-pressed={selected}
              >
                <span className="absolute bottom-1 left-2 text-[10px] font-medium text-white/90 drop-shadow">
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
