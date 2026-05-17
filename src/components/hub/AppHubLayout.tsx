import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ListChecks, Library, BookMarked, Building2, Landmark } from "lucide-react";
import type { AppTab, HubNavTab } from "@/lib/app-tabs";
import { isHubNavTab } from "@/lib/app-tabs";
import { questions } from "@/data/questions";
import { concepts } from "@/data/concepts";
import { ProfileMenu } from "@/components/hub/ProfileMenu";

type HubPage = {
  id: HubNavTab;
  label: string;
  icon: LucideIcon;
  count?: number;
};

const pages: HubPage[] = [
  { id: "questions", label: "Questions", icon: ListChecks, count: questions.length },
  { id: "concepts", label: "Notions", icon: Library, count: concepts.length },
  { id: "guide", label: "Guide", icon: BookMarked },
  { id: "secteurs", label: "Secteurs", icon: Building2 },
  { id: "banques", label: "Banque", icon: Landmark },
];

type AppHubLayoutProps = {
  activePage: AppTab;
  onPageChange: (page: AppTab) => void;
  hasProgress?: boolean;
  children: ReactNode;
};

export function AppHubLayout({
  activePage,
  onPageChange,
  hasProgress,
  children,
}: AppHubLayoutProps) {
  const navActivePage = isHubNavTab(activePage) ? activePage : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100 pb-24 sm:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-900 focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-blue-400"
      >
        Aller au contenu
      </a>
      <header className="relative bg-blue-900" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-12 lg:py-16">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onPageChange("questions")}
              aria-label="Finance Interview. Retour aux questions."
              className="sm:hidden flex-1 min-w-0 text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              <h1 className="font-medium text-white text-xl tracking-tight truncate m-0">
                Finance Interview
              </h1>
            </button>
            <h1 className="hidden sm:block flex-1 text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight m-0">
              Finance Interview
            </h1>
            <ProfileMenu onPageChange={onPageChange} hasProgress={hasProgress} />
          </div>

          <nav className="hidden sm:block mt-8" aria-label="Navigation principale">
            <div className="flex flex-wrap gap-2">
              {pages.map((p) => {
                const Icon = p.icon;
                const isActive = navActivePage === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onPageChange(p.id)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all border-2 whitespace-nowrap ${
                      isActive
                        ? "bg-white text-blue-950 border-white shadow-lg"
                        : "bg-white/10 text-blue-100 border-blue-400/30 hover:bg-white/20"
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{p.label}</span>
                    {p.count != null && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-blue-100 text-blue-800" : "bg-blue-400/20 text-blue-200"}`}
                      >
                        {p.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      <nav
        className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-lg border-t border-blue-200 shadow-[0_-4px_20px_-4px_rgba(30,58,138,0.15)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Navigation mobile"
      >
        <div className="flex items-stretch justify-around">
          {pages.map((p) => {
            const Icon = p.icon;
            const isActive = navActivePage === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onPageChange(p.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-1 transition-colors min-h-[60px] ${
                  isActive ? "text-blue-900" : "text-blue-400"
                }`}
              >
                <div
                  className={`relative flex items-center justify-center w-12 h-7 rounded-full transition-all ${isActive ? "bg-blue-100" : ""}`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  {p.count != null && (
                    <span
                      className={`absolute -top-1 -right-0 text-[9px] font-semibold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center ${isActive ? "bg-blue-900 text-white" : "bg-blue-200 text-blue-800"}`}
                    >
                      {p.count}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] leading-none ${isActive ? "font-semibold" : "font-medium"}`}
                >
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <main id="main-content">{children}</main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 mt-8 border-t border-blue-200">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-blue-700" />
            <span className="text-blue-700 text-xs tracking-[0.3em] uppercase">
              Bonne préparation
            </span>
            <div className="h-px w-12 bg-blue-700" />
          </div>
          <p className="text-blue-600 text-sm font-light italic">
            « In finance, the right answer is rarely a single number — it&apos;s a structured
            argument. »
          </p>
        </div>
      </footer>
    </div>
  );
}
