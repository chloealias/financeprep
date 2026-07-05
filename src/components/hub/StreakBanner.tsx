import { useEffect, useState } from "react";
import { getProfileDashboard } from "@/lib/profile-dashboard";
import { isStreakAtRisk } from "@/lib/daily-goal";

export function StreakBanner() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isStreakAtRisk()) return;
    const { srsDue } = getProfileDashboard();
    if (srsDue > 0) {
      setMessage(`Il vous reste ${srsDue} carte${srsDue > 1 ? "s" : ""} SRS à réviser aujourd'hui pour garder votre streak.`);
    }
  }, []);

  if (!message) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div
        role="status"
        className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground"
      >
        {message}
      </div>
    </div>
  );
}
