import type { UserProfile } from "@/lib/profile-storage";
import {
  getProfileIcon,
  patternColors,
  type AvatarKind,
} from "@/lib/profile-cosmetics";

type ProfileAvatarProps = {
  profile: Pick<UserProfile, "avatarKind" | "avatarId" | "avatarPatternSeed" | "firstName">;
  size?: "sm" | "md" | "lg";
  className?: string;
  ring?: boolean;
};

const SIZE = {
  sm: "w-9 h-9 text-sm",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

const ICON_SIZE = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-11 h-11",
};

function PatternFace({ seed, className }: { seed: number; className: string }) {
  const { a, b, c } = patternColors(seed);
  const r1 = 18 + (seed % 12);
  const r2 = 14 + ((seed >> 3) % 10);
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`pg-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={a} />
          <stop offset="50%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill={`url(#pg-${seed})`} />
      <circle cx={20 + (seed % 8)} cy={22 + (seed % 6)} r={r1} fill="white" fillOpacity="0.12" />
      <circle cx={48 - (seed % 5)} cy={40 - (seed % 4)} r={r2} fill="white" fillOpacity="0.18" />
      <path
        d="M8 52 Q32 28 56 52"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function ProfileAvatar({
  profile,
  size = "md",
  className = "",
  ring = false,
}: ProfileAvatarProps) {
  const kind: AvatarKind = profile.avatarKind ?? "icon";
  const ringClass = ring ? "ring-4 ring-white shadow-lg" : "shadow-md";

  if (kind === "pattern") {
    const seed = profile.avatarPatternSeed ?? 42;
    return (
      <div
        className={`rounded-full overflow-hidden flex-shrink-0 ${SIZE[size]} ${ringClass} ${className}`}
        aria-hidden
      >
        <PatternFace seed={seed} className="w-full h-full" />
      </div>
    );
  }

  const icon = getProfileIcon(profile.avatarId);
  const { Icon } = icon;

  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 ${SIZE[size]} ${ringClass} ${className}`}
      style={{ backgroundColor: icon.bg, color: icon.fg }}
      aria-hidden
    >
      <Icon className={ICON_SIZE[size]} strokeWidth={1.75} />
    </div>
  );
}
