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
  | "copper"
  | "graphite";

export const PROFILE_ICONS: {
  id: ProfileIconId;
  label: string;
  Icon: LucideIcon;
  bg: string;
  fg: string;
}[] = [
  { id: "landmark", label: "Banque", Icon: Landmark, bg: "#1e3a8a", fg: "#fff" },
  { id: "trending", label: "Marchés", Icon: TrendingUp, bg: "#0f766e", fg: "#fff" },
  { id: "briefcase", label: "M&A", Icon: Briefcase, bg: "#4c1d95", fg: "#fff" },
  { id: "pie", label: "Valorisation", Icon: PieChart, bg: "#b45309", fg: "#fff" },
  { id: "building", label: "Corporate", Icon: Building2, bg: "#334155", fg: "#fff" },
  { id: "banknote", label: "Levée", Icon: Banknote, bg: "#047857", fg: "#fff" },
  { id: "scale", label: "LBO", Icon: Scale, bg: "#7c2d12", fg: "#fff" },
  { id: "line", label: "Trading", Icon: LineChart, bg: "#1d4ed8", fg: "#fff" },
  { id: "bars", label: "Analyse", Icon: BarChart3, bg: "#4338ca", fg: "#fff" },
  { id: "wallet", label: "PE", Icon: Wallet, bg: "#0e7490", fg: "#fff" },
];

export const PROFILE_BANNERS: {
  id: ProfileBannerId;
  label: string;
  className: string;
}[] = [
  {
    id: "midnight",
    label: "Minuit",
    className: "bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950",
  },
  {
    id: "ocean",
    label: "Océan",
    className: "bg-gradient-to-br from-cyan-800 via-blue-800 to-indigo-900",
  },
  {
    id: "slate",
    label: "Ardoise",
    className: "bg-gradient-to-br from-slate-600 via-slate-800 to-slate-900",
  },
  {
    id: "gold",
    label: "Or",
    className: "bg-gradient-to-br from-amber-700 via-yellow-800 to-amber-950",
  },
  {
    id: "violet",
    label: "Violet",
    className: "bg-gradient-to-br from-violet-700 via-purple-900 to-indigo-950",
  },
  {
    id: "emerald",
    label: "Émeraude",
    className: "bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900",
  },
  {
    id: "rose",
    label: "Rose",
    className: "bg-gradient-to-br from-rose-700 via-fuchsia-900 to-slate-900",
  },
  {
    id: "navy",
    label: "Marine",
    className: "bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900",
  },
  {
    id: "copper",
    label: "Cuivre",
    className: "bg-gradient-to-br from-orange-800 via-red-900 to-stone-900",
  },
  {
    id: "graphite",
    label: "Graphite",
    className: "bg-gradient-to-br from-zinc-700 via-zinc-800 to-black",
  },
];

const ICON_MAP = Object.fromEntries(PROFILE_ICONS.map((i) => [i.id, i])) as Record<
  ProfileIconId,
  (typeof PROFILE_ICONS)[number]
>;

const BANNER_MAP = Object.fromEntries(PROFILE_BANNERS.map((b) => [b.id, b])) as Record<
  ProfileBannerId,
  (typeof PROFILE_BANNERS)[number]
>;

export function getProfileIcon(id: string | undefined) {
  return ICON_MAP[id as ProfileIconId] ?? PROFILE_ICONS[0]!;
}

export function getProfileBanner(id: string | undefined) {
  return BANNER_MAP[id as ProfileBannerId] ?? PROFILE_BANNERS[0]!;
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

export function normalizePatternSeed(raw: unknown): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return Math.abs(Math.floor(raw)) % 1_000_000;
  return randomPatternSeed();
}
