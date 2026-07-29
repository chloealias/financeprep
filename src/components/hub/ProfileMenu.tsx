import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { getProfileMenuBadges } from "@/lib/profile-dashboard";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getTargetBankIds } from "@/lib/target-banks-storage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useT } from "@/hooks/useT";
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
        "min-w-[200px] rounded-xl bg-card border border-border shadow-xl py-1 overflow-hidden"
      }
      style={style}
    >
      {children}
    </div>
  );
}

export function ProfileMenu({ onPageChange, hasProgress = false }: ProfileMenuProps) {
  const { t, locale } = useT();
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
    setBadges(getProfileMenuBadges(locale));
  }, [open, profile, locale]);

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

  const menuItems = (
    <>
      <Link
        to="/profil"
        role="menuitem"
        onClick={() => setOpen(false)}
        className="w-full touch-target-bar gap-3 px-3 text-left text-sm text-foreground hover:bg-muted"
      >
        <ProfileAvatar profile={profile} size="sm" />
        <span className="font-medium truncate">
          {profile.firstName?.trim() || t("hub.profile.fallbackName")}
        </span>
      </Link>
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onPageChange("progress");
          setOpen(false);
        }}
        className="w-full touch-target-bar gap-3 px-3 text-left text-sm text-foreground hover:bg-muted"
      >
        <BarChart3 className="w-4 h-4 text-primary" />
        {t("hub.profile.menu.progress")}
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
        aria-label={t("hub.profile.triggerAria")}
        aria-expanded={open}
        aria-haspopup="menu"
        className="touch-target rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <ProfileAvatar profile={profile} size="sm" className="border-2 border-white/40" />
        {hasProgress && !showSrsBadge && !showCountdownBadge && !showTargetBadge && (
          <span
            className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-primary/30 border-2 border-primary"
            aria-hidden
          />
        )}
      </button>

      {open && !isMobile && (
        <ProfileMenuPanel className="absolute right-0 top-full mt-2 z-[60] min-w-[200px] rounded-xl bg-card border border-border shadow-xl py-1 overflow-hidden">
          {menuItems}
        </ProfileMenuPanel>
      )}

      {mobilePortal}
    </div>
  );
}
