import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight } from "lucide-react";

export function GuideSectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-sm font-semibold text-blue-900 uppercase tracking-wider flex items-center gap-2 flex-wrap ${className || "mb-4"}`}
    >
      <span className="h-px w-6 bg-blue-700 shrink-0" aria-hidden="true" />
      {children}
    </div>
  );
}

export function GuideIntro({ children }: { children: ReactNode }) {
  return <p className="text-blue-700 font-light leading-relaxed mb-8">{children}</p>;
}

export function GuideSelect({
  label,
  value,
  onChange,
  options,
  id,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  id?: string;
}) {
  const selectId = id ?? `guide-select-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label
        htmlFor={selectId}
        className="text-xs uppercase tracking-[0.2em] text-blue-400 font-medium mb-2 block"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-blue-200 bg-white px-3 py-2.5 pr-10 text-sm text-blue-900 font-medium shadow-sm transition-colors hover:border-blue-300 focus:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400"
          aria-hidden
        />
      </div>
    </div>
  );
}

export function GuideChipButton({
  active,
  onClick,
  children,
  size = "md",
  ariaPressed,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  size?: "sm" | "md";
  ariaPressed?: boolean;
}) {
  const sizeClass = size === "sm" ? "px-3 py-2 min-h-11 text-xs" : "px-4 py-2 min-h-11 text-sm";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ariaPressed ?? active}
      className={`${sizeClass} rounded-lg font-medium border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
        active
          ? "bg-blue-900 text-white border-blue-900"
          : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
      }`}
    >
      {children}
    </button>
  );
}

type GuideModuleLinkProps = {
  tag: string;
  title: string;
  icon: LucideIcon;
} & (
  | {
      to: "/cv" | "/excel" | "/pyramid" | "/accretion" | "/actualite" | "/glossaire";
      search?: never;
    }
  | { to: "/"; search: { tab: "banques" | "secteurs" | "guide" } }
);

export function GuideModuleLink({ to, tag, title, icon: Icon, ...rest }: GuideModuleLinkProps) {
  const search = "search" in rest ? rest.search : undefined;
  return (
    <Link
      to={to}
      search={search}
      className="block group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <article className="bg-white rounded-2xl border-2 border-blue-100 shadow-sm transition-all group-hover:border-blue-200 group-hover:shadow-md">
        <div className="px-6 sm:px-8 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-[0.2em] text-blue-400 font-medium mb-0.5">
                {tag}
              </div>
              <h3 className="text-xl font-serif text-blue-950">{title}</h3>
            </div>
          </div>
          <ChevronRight
            className="w-5 h-5 text-blue-400 shrink-0 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </article>
    </Link>
  );
}

/** Carte interne standard des blocs guide */
export const guideCardClass = "bg-white border-2 border-blue-100 rounded-xl";

/** Encadré d'avertissement (actualité, tips) */
export const guideAlertClass =
  "bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-sm";
