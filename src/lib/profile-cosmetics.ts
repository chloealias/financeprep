import type { LucideIcon } from "lucide-react";
import {
  Landmark,
  TrendingUp,
  Briefcase,
  PieChart,
  Building2,
  Banknote,
  Scale,
  LineChart,
  BarChart3,
  Wallet,
} from "lucide-react";
import type { TranslateFn } from "@/lib/i18n/t";

export type AvatarKind = "icon" | "pattern";
export type ProfileIconId =
  | "landmark"
  | "trending"
  | "briefcase"
  | "pie"
  | "building"
  | "banknote"
  | "scale"
  | "line"
  | "bars"
  | "wallet";

export type ProfileBannerId =
  | "midnight"
  | "ocean"
  | "slate"
  | "gold"
  | "violet"
  | "emerald"
  | "rose"
  | "navy"
  | "copper";

export type ProfileAccentThemeId = "navy" | "violet" | "emerald" | "amber" | "rose" | "cobalt";
export type ProfileIconColorId = "default" | "primary" | "violet" | "emerald" | "amber" | "rose";

export const PROFILE_ICONS: {
  id: ProfileIconId;
  Icon: LucideIcon;
  bg: string;
  fg: string;
}[] = [
  { id: "landmark", Icon: Landmark, bg: "#1e3a8a", fg: "#fff" },
  { id: "trending", Icon: TrendingUp, bg: "#0f766e", fg: "#fff" },
  { id: "briefcase", Icon: Briefcase, bg: "#4c1d95", fg: "#fff" },
  { id: "pie", Icon: PieChart, bg: "#b45309", fg: "#fff" },
  { id: "building", Icon: Building2, bg: "#334155", fg: "#fff" },
  { id: "banknote", Icon: Banknote, bg: "#047857", fg: "#fff" },
  { id: "scale", Icon: Scale, bg: "#7c2d12", fg: "#fff" },
  { id: "line", Icon: LineChart, bg: "#1d4ed8", fg: "#fff" },
  { id: "bars", Icon: BarChart3, bg: "#4338ca", fg: "#fff" },
  { id: "wallet", Icon: Wallet, bg: "#0e7490", fg: "#fff" },
];

export const PROFILE_BANNERS: {
  id: ProfileBannerId;
  className: string;
}[] = [
  {
    id: "midnight",
    className: "bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950",
  },
  {
    id: "ocean",
    className: "bg-gradient-to-br from-cyan-800 via-blue-800 to-indigo-900",
  },
  {
    id: "slate",
    className: "bg-gradient-to-br from-slate-600 via-slate-800 to-slate-900",
  },
  {
    id: "gold",
    className: "bg-gradient-to-br from-amber-700 via-yellow-800 to-amber-950",
  },
  {
    id: "violet",
    className: "bg-gradient-to-br from-violet-700 via-purple-900 to-indigo-950",
  },
  {
    id: "emerald",
    className: "bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900",
  },
  {
    id: "rose",
    className: "bg-gradient-to-br from-rose-700 via-fuchsia-900 to-slate-900",
  },
  {
    id: "navy",
    className: "bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900",
  },
  {
    id: "copper",
    className: "bg-gradient-to-br from-orange-800 via-red-900 to-stone-900",
  },
];

export const PROFILE_ACCENT_THEMES: {
  id: ProfileAccentThemeId;
  primary: string;
  ring: string;
  sidebarPrimary: string;
}[] = [
  {
    id: "navy",
    primary: "oklch(0.24 0.07 258)",
    ring: "oklch(0.62 0.09 258)",
    sidebarPrimary: "oklch(0.24 0.07 258)",
  },
  {
    id: "violet",
    primary: "oklch(0.34 0.15 305)",
    ring: "oklch(0.7 0.14 305)",
    sidebarPrimary: "oklch(0.34 0.15 305)",
  },
  {
    id: "emerald",
    primary: "oklch(0.42 0.12 165)",
    ring: "oklch(0.74 0.12 165)",
    sidebarPrimary: "oklch(0.42 0.12 165)",
  },
  {
    id: "amber",
    primary: "oklch(0.55 0.14 72)",
    ring: "oklch(0.79 0.11 72)",
    sidebarPrimary: "oklch(0.55 0.14 72)",
  },
  {
    id: "rose",
    primary: "oklch(0.51 0.16 15)",
    ring: "oklch(0.74 0.12 15)",
    sidebarPrimary: "oklch(0.51 0.16 15)",
  },
  {
    id: "cobalt",
    primary: "oklch(0.42 0.14 266)",
    ring: "oklch(0.72 0.12 266)",
    sidebarPrimary: "oklch(0.42 0.14 266)",
  },
];

export const PROFILE_ICON_COLORS: {
  id: ProfileIconColorId;
  bg: string;
  fg: string;
}[] = [
  { id: "default", bg: "", fg: "" },
  { id: "primary", bg: "var(--primary)", fg: "var(--primary-foreground)" },
  { id: "violet", bg: "oklch(0.34 0.15 305)", fg: "white" },
  { id: "emerald", bg: "oklch(0.42 0.12 165)", fg: "white" },
  { id: "amber", bg: "oklch(0.55 0.14 72)", fg: "white" },
  { id: "rose", bg: "oklch(0.51 0.16 15)", fg: "white" },
];

/** Localized cosmetic labels — the catalogs own the wording, this owns the styling. */
export function getProfileIconLabel(id: ProfileIconId, translate: TranslateFn): string {
  return translate(`profile.cosmetics.icon.${id}`);
}

export function getProfileBannerLabel(id: ProfileBannerId, translate: TranslateFn): string {
  return translate(`profile.cosmetics.banner.${id}`);
}

export function getProfileAccentThemeLabel(
  id: ProfileAccentThemeId,
  translate: TranslateFn,
): string {
  return translate(`profile.cosmetics.accent.${id}`);
}

export function getProfileIconColorLabel(id: ProfileIconColorId, translate: TranslateFn): string {
  return translate(`profile.cosmetics.iconColor.${id}`);
}

const ICON_MAP = Object.fromEntries(PROFILE_ICONS.map((i) => [i.id, i])) as Record<
  ProfileIconId,
  (typeof PROFILE_ICONS)[number]
>;

const BANNER_MAP = Object.fromEntries(PROFILE_BANNERS.map((b) => [b.id, b])) as Record<
  ProfileBannerId,
  (typeof PROFILE_BANNERS)[number]
>;

const ACCENT_THEME_MAP = Object.fromEntries(
  PROFILE_ACCENT_THEMES.map((theme) => [theme.id, theme]),
) as Record<ProfileAccentThemeId, (typeof PROFILE_ACCENT_THEMES)[number]>;

const ICON_COLOR_MAP = Object.fromEntries(
  PROFILE_ICON_COLORS.map((color) => [color.id, color]),
) as Record<ProfileIconColorId, (typeof PROFILE_ICON_COLORS)[number]>;

export function getProfileIcon(id: string | undefined) {
  return ICON_MAP[id as ProfileIconId] ?? PROFILE_ICONS[0]!;
}

export function getProfileBanner(id: string | undefined) {
  return BANNER_MAP[id as ProfileBannerId] ?? PROFILE_BANNERS[0]!;
}

export function getProfileAccentTheme(id: string | undefined) {
  return ACCENT_THEME_MAP[id as ProfileAccentThemeId] ?? PROFILE_ACCENT_THEMES[0]!;
}

export function getProfileIconColor(id: string | undefined) {
  return ICON_COLOR_MAP[id as ProfileIconColorId] ?? PROFILE_ICON_COLORS[0]!;
}

export function randomPatternSeed(): number {
  return Math.floor(Math.random() * 1_000_000);
}

/** Couleurs déterministes pour avatar « style IA » (généré localement). */
export function patternColors(seed: number): { a: string; b: string; c: string } {
  const h1 = seed % 360;
  const h2 = (seed * 7) % 360;
  const h3 = (seed * 13) % 360;
  return {
    a: `hsl(${h1} 65% 45%)`,
    b: `hsl(${h2} 55% 55%)`,
    c: `hsl(${h3} 70% 35%)`,
  };
}

export function normalizeAvatarKind(raw: unknown): AvatarKind {
  return raw === "pattern" ? "pattern" : "icon";
}

export function normalizeAvatarId(raw: unknown): ProfileIconId {
  const id = typeof raw === "string" ? raw : "";
  return ICON_MAP[id as ProfileIconId] ? (id as ProfileIconId) : "landmark";
}

export function normalizeBannerId(raw: unknown): ProfileBannerId {
  const id = typeof raw === "string" ? raw : "";
  return BANNER_MAP[id as ProfileBannerId] ? (id as ProfileBannerId) : "midnight";
}

export function normalizeAccentThemeId(raw: unknown): ProfileAccentThemeId {
  const id = typeof raw === "string" ? raw : "";
  return ACCENT_THEME_MAP[id as ProfileAccentThemeId] ? (id as ProfileAccentThemeId) : "navy";
}

export function normalizeIconColorId(raw: unknown): ProfileIconColorId {
  const id = typeof raw === "string" ? raw : "";
  return ICON_COLOR_MAP[id as ProfileIconColorId] ? (id as ProfileIconColorId) : "default";
}

/** Apply the profile accent palette to global CSS variables. */
export function applyProfileAccentTheme(id: string | undefined): void {
  if (typeof document === "undefined") return;
  const theme = getProfileAccentTheme(id);
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--ring", theme.ring);
  root.style.setProperty("--sidebar-primary", theme.sidebarPrimary);
}

export function normalizePatternSeed(raw: unknown): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return Math.abs(Math.floor(raw)) % 1_000_000;
  return randomPatternSeed();
}
