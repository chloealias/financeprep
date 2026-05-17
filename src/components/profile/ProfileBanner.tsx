import { getProfileBanner } from "@/lib/profile-cosmetics";

type ProfileBannerProps = {
  bannerId?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export function ProfileBanner({
  bannerId,
  className = "",
  style,
  children,
}: ProfileBannerProps) {
  const banner = getProfileBanner(bannerId);
  return (
    <div className={`relative ${banner.className} ${className}`} style={style}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, white 0%, transparent 45%), radial-gradient(circle at 80% 70%, white 0%, transparent 40%)",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
