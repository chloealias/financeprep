import { useEffect, useState } from "react";

const SPLASH_SEEN_KEY = "fp_splash_seen";
const SPLASH_MIN_MS = 800;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useAppSplash(ready: boolean) {
  const [showSplash, setShowSplash] = useState(true);
  const [minElapsed, setMinElapsed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(SPLASH_SEEN_KEY);
    if (seen === "1" || prefersReducedMotion()) {
      setShowSplash(false);
      return;
    }

    const duration = prefersReducedMotion() ? 150 : SPLASH_MIN_MS;
    const t = window.setTimeout(() => setMinElapsed(true), duration);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showSplash) return;
    if (ready && minElapsed) {
      sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
      setShowSplash(false);
    }
  }, [ready, minElapsed, showSplash]);

  const dismissSplash = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    }
    setShowSplash(false);
  };

  return { showSplash, dismissSplash };
}
