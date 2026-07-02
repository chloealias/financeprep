import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function GuideSubLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background pb-[calc(6rem+env(safe-area-inset-bottom))] sm:pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/"
          search={{ tab: "guide" }}
          className="touch-target-bar gap-2 text-primary text-sm mb-6 hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour au guide
        </Link>
        {children}
      </div>
    </div>
  );
}
