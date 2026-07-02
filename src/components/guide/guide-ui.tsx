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
      className={`text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2 flex-wrap ${className || "mb-4"}`}
    >
      <span className="h-px w-6 bg-primary shrink-0" aria-hidden="true" />
      {children}
    </div>
  );
}

export function GuideIntro({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground font-light leading-relaxed mb-8">{children}</p>;
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
        className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2 block"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-border bg-card px-3 py-2.5 pr-10 text-sm text-foreground font-medium shadow-sm transition-colors hover:border-primary/40 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
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
  const sizeClass = size === "sm" ? "px-3 min-h-11 min-w-11 text-xs" : "px-4 min-h-11 text-sm";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ariaPressed ?? active}
      className={`${sizeClass} rounded-lg font-medium border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-foreground border-border hover:bg-muted"
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
      to:
        | "/cv"
        | "/excel"
        | "/pyramid"
        | "/accretion"
        | "/actualite"
        | "/glossaire"
        | "/mental-math";
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
      className="block group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="bg-card rounded-2xl border-2 border-border shadow-card transition-all group-hover:border-primary/30 group-hover:shadow-card-hover">
        <div className="px-6 sm:px-8 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-0.5">
                {tag}
              </div>
              <h3 className="text-xl font-serif text-foreground">{title}</h3>
            </div>
          </div>
          <ChevronRight
            className="w-5 h-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </article>
    </Link>
  );
}

/** Carte interne standard des blocs guide */
export const guideCardClass = "bg-card border-2 border-border rounded-xl shadow-card";

/** Groupe de badges/chips (gap 8px) */
export const hubBadgeGroupClass = "flex flex-wrap items-center gap-2";

/** Badge hub — padding 4px 10px */
export const hubBadgeClass =
  "inline-flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded border bg-muted text-foreground border-border";

/** Encadré d'avertissement (actualité, tips) */
export const guideAlertClass =
  "bg-muted border border-border rounded-xl p-4 text-foreground text-sm";
