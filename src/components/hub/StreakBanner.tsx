import { useEffect, useState } from "react";
import { getProfileDashboard } from "@/lib/profile-dashboard";
import { isStreakAtRisk } from "@/lib/daily-goal";
import { useT } from "@/hooks/useT";

export function StreakBanner() {
  const { t } = useT();
  const [srsDue, setSrsDue] = useState<number | null>(null);

  useEffect(() => {
    if (!isStreakAtRisk()) return;
    const { srsDue: due } = getProfileDashboard();
    if (due > 0) setSrsDue(due);
  }, []);

  if (srsDue === null) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div
        role="status"
        className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground"
      >
        {t("hub.streak.srsDue", { count: srsDue, s: srsDue === 1 ? "" : "s" })}
      </div>
    </div>
  );
}
