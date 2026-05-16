import { useEffect, useState } from 'react';

/**
 * Returns whether a media query matches. Always `false` on the first render
 * (SSR and client) to avoid hydration mismatches; updates after mount.
 */
export function useMediaQuery (query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
