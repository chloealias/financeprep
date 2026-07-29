import type { NumericCheck, NumericUnit } from "@/data/exercise-types";

/**
 * Parse a user numeric answer: spaces, FR comma, %, and leverage "x5" / "5x".
 */
export function parseNumericInput(raw: string, unit: NumericUnit = "number"): number | null {
  let s = raw.trim().toLowerCase().replace(/\s/g, "").replace(",", ".");
  if (!s) return null;

  const hasPercent = s.includes("%");
  s = s.replace(/%/g, "");

  const multipleMatch = s.match(/^x?(-?\d+(?:\.\d+)?)x?$/);
  if (unit === "multiple" && multipleMatch) {
    const n = Number(multipleMatch[1]);
    return Number.isFinite(n) ? n : null;
  }

  // Strip leading x for multiples typed as "x5"
  if (s.startsWith("x") && /^-?\d/.test(s.slice(1))) {
    s = s.slice(1);
  }
  if (s.endsWith("x") && /^-?\d/.test(s.slice(0, -1))) {
    s = s.slice(0, -1);
  }

  const n = Number(s);
  if (!Number.isFinite(n)) return null;

  if (unit === "percent_or_decimal") {
    // 15% or 15 → 0.15 ; 0.15 stays decimal
    if (hasPercent || Math.abs(n) > 1) return n / 100;
    return n;
  }

  if (unit === "percent") {
    return hasPercent ? n : n;
  }

  return n;
}

function normalizeForCompare(value: number, unit: NumericUnit): number {
  if (unit === "percent_or_decimal") {
    // Canonical form: decimal (0.15)
    return Math.abs(value) > 1 ? value / 100 : value;
  }
  return value;
}

function parseAcceptValue(accept: number, unit: NumericUnit): number {
  return normalizeForCompare(accept, unit);
}

/**
 * Verify a numeric answer against exact accept list or relative tolerance.
 */
export function checkNumericAnswer(raw: string, check: NumericCheck): boolean {
  const unit = check.unit ?? "number";
  const parsed = parseNumericInput(raw, unit);
  if (parsed === null) return false;

  if (check.mode === "exact") {
    const candidate = normalizeForCompare(parsed, unit);
    return check.accept.some((a) => {
      const target = parseAcceptValue(a, unit);
      return nearlyEqual(candidate, target);
    });
  }

  const candidate = normalizeForCompare(parsed, unit);
  const target = normalizeForCompare(check.value, unit);
  const tol = Math.abs(target) * (check.pct / 100);
  // Absolute floor for near-zero targets
  const absTol = Math.max(tol, 1e-9);
  return Math.abs(candidate - target) <= absTol + 1e-9;
}

function nearlyEqual(a: number, b: number): boolean {
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return Math.abs(a - b) <= scale * 1e-6 + 1e-9;
}
