import { useCallback, useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getWindowScrollY, restoreWindowScrollPosition } from "@/lib/scroll";

/**
 * Mémorise le scroll fenêtre avant ouverture d’un détail (modale, panneau, accordéon),
 * puis le restaure à la fermeture.
 */
export function usePreserveScrollOnDetailClose(isDetailOpen: boolean) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const scrollYBeforeDetail = useRef<number | null>(null);

  const captureScroll = useCallback(() => {
    scrollYBeforeDetail.current = getWindowScrollY();
  }, []);

  useEffect(() => {
    if (isDetailOpen) return;
    const y = scrollYBeforeDetail.current;
    if (y === null) return;
    scrollYBeforeDetail.current = null;
    const delay = isMobile ? 150 : 50;
    return restoreWindowScrollPosition(y, delay);
  }, [isDetailOpen, isMobile]);

  return captureScroll;
}
