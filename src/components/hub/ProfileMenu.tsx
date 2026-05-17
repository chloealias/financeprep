import { useEffect, useRef, useState } from "react";
import { BarChart3, Landmark, User } from "lucide-react";
import { requestOpenTargetsFilter, getTargetBankIds } from "@/lib/target-banks-storage";
import type { AppTab } from "@/lib/app-tabs";

type ProfileMenuProps = {
  onPageChange: (page: AppTab) => void;
  hasProgress?: boolean;
};

export function ProfileMenu({ onPageChange, hasProgress = false }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
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

  const goToProgress = () => {
    onPageChange("progress");
    setOpen(false);
  };

  const goToTargetBanks = () => {
    requestOpenTargetsFilter();
    onPageChange("banques");
    setOpen(false);
  };

  const targetCount = getTargetBankIds().length;

  return (
    <div ref={rootRef} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Mon profil"
        aria-expanded={open}
        aria-haspopup="menu"
        className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/25 transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
      >
        <User className="w-5 h-5" aria-hidden="true" />
        {hasProgress && (
          <span
            className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-blue-900"
            aria-hidden="true"
          />
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 z-50 min-w-[200px] rounded-xl bg-white border border-blue-100 shadow-xl py-1 overflow-hidden"
        >
          <button
            type="button"
            role="menuitem"
            onClick={goToProgress}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-blue-950 hover:bg-blue-50 transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
            <span className="font-medium">Progression</span>
          </button>
          {targetCount > 0 && (
            <button
              type="button"
              role="menuitem"
              onClick={goToTargetBanks}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-blue-950 hover:bg-blue-50 transition-colors"
            >
              <Landmark className="w-4 h-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium">Mes banques ({targetCount})</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
