import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { BarChart3, Landmark } from "lucide-react";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { getProfileMenuBadges } from "@/lib/profile-dashboard";
import { formatInterviewCountdown, daysUntilInterview } from "@/lib/profile-storage";
import { useUserProfile } from "@/hooks/useUserProfile";
import { requestOpenTargetsFilter, getTargetBankIds } from "@/lib/target-banks-storage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { AppTab } from "@/lib/app-tabs";

type ProfileMenuProps = {
  onPageChange: (page: AppTab) => void;
  hasProgress?: boolean;
};

type MenuPosition = { top: number; right: number };

function ProfileMenuPanel({
  id,
  className,
  style,
  children,
}: {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      role="menu"
      className={
        className ??
        "min-w-[200px] rounded-xl bg-white border border-blue-100 shadow-xl py-1 overflow-hidden"
      }
      style={style}
    >
      {children}
    </div>
  );
}

export function ProfileMenu({ onPageChange, hasProgress = false }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const { profile } = useUserProfile();
  const [badges, setBadges] = useState({
    srsDue: 0,
    countdown: null as string | null,
    targetBankCount: 0,
  });

  useEffect(() => {
    if (!open) return;
    setBadges(getProfileMenuBadges());
  }, [open, profile]);

  useEffect(() => {
    if (!open || !isMobile || !triggerRef.current) {
      setMenuPosition(null);
      return;
    }

    const updatePosition = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        right: Math.max(8, window.innerWidth - rect.right),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, isMobile]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (document.getElementById("profile-menu-portal")?.contains(target)) return;
      setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const targetCount = open ? badges.targetBankCount : getTargetBankIds().length;
  const showSrsBadge = badges.srsDue > 0;
  const showCountdownBadge = !!badges.countdown;
  const showTargetBadge = targetCount > 0 && !showCountdownBadge;
  const countdownLabel = formatInterviewCountdown(daysUntilInterview(profile.interviewDate));

  const menuItems = (
    <>
      <Link
        to="/profil"
        role="menuitem"
        onClick={() => setOpen(false)}
        className="w-full touch-target-bar gap-3 px-3 text-left text-sm text-blue-950 hover:bg-blue-50"
      >
        <ProfileAvatar profile={profile} size="sm" />
        <span className="font-medium truncate">{profile.firstName?.trim() || "Profil"}</span>
      </Link>
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onPageChange("progress");
          setOpen(false);
        }}
        className="w-full touch-target-bar gap-3 px-3 text-left text-sm text-blue-950 hover:bg-blue-50"
      >
        <BarChart3 className="w-4 h-4 text-blue-600" />
        Progression
      </button>
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          requestOpenTargetsFilter();
          onPageChange("banques");
          setOpen(false);
        }}
        className="w-full touch-target-bar gap-3 px-3 text-left text-sm text-blue-950 hover:bg-blue-50"
      >
        <Landmark className="w-4 h-4 text-blue-600" />
        {targetCount > 0 ? `Banques (${targetCount})` : "Banques"}
      </button>
    </>
  );

  const mobilePortal =
    open &&
    isMobile &&
    menuPosition &&
    typeof document !== "undefined" &&
    createPortal(
      <ProfileMenuPanel
        id="profile-menu-portal"
        style={{
          position: "fixed",
          top: menuPosition.top,
          right: menuPosition.right,
          zIndex: 100,
        }}
      >
        {menuItems}
      </ProfileMenuPanel>,
      document.body,
    );

  return (
    <div ref={rootRef} className="relative flex-shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Profil"
        aria-expanded={open}
        aria-haspopup="menu"
        className="touch-target rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <ProfileAvatar profile={profile} size="sm" className="border-2 border-white/40" />
        {showCountdownBadge && (
          <span
            className="absolute -top-0.5 -left-0.5 min-w-[1.25rem] h-5 px-1 rounded-full bg-violet-500 border-2 border-blue-900 text-[10px] font-bold text-white flex items-center justify-center tabular-nums"
            title={countdownLabel ?? undefined}
          >
            {badges.countdown === "J" ? "J" : badges.countdown}
          </span>
        )}
        {showTargetBadge && (
          <span
            className="absolute -top-0.5 -left-0.5 min-w-[1.25rem] h-5 px-1 rounded-full bg-sky-400 border-2 border-blue-900 text-[10px] font-bold text-blue-950 flex items-center justify-center tabular-nums"
            title={`${targetCount} banques`}
          >
            {targetCount > 9 ? "9+" : targetCount}
          </span>
        )}
        {showSrsBadge && (
          <span
            className="absolute -bottom-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-0.5 rounded-full bg-amber-400 border-2 border-blue-900 text-[9px] font-bold text-blue-950 flex items-center justify-center"
            title={`${badges.srsDue} SRS`}
          >
            {badges.srsDue > 9 ? "9+" : badges.srsDue}
          </span>
        )}
        {hasProgress && !showSrsBadge && !showCountdownBadge && !showTargetBadge && (
          <span
            className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-blue-900"
            aria-hidden
          />
        )}
      </button>

      {open && !isMobile && (
        <ProfileMenuPanel className="absolute right-0 top-full mt-2 z-[60] min-w-[200px] rounded-xl bg-white border border-blue-100 shadow-xl py-1 overflow-hidden">
          {menuItems}
        </ProfileMenuPanel>
      )}

      {mobilePortal}
    </div>
  );
}
