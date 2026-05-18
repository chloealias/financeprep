export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getScrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}

export function smoothScrollTo(
  top: number,
  options?: Omit<ScrollToOptions, "top" | "behavior">,
): void {
  if (typeof window === "undefined") return;
  window.scrollTo({ ...options, top, behavior: getScrollBehavior() });
}

export function smoothScrollIntoView(
  element: Element,
  options?: Omit<ScrollIntoViewOptions, "behavior">,
): void {
  element.scrollIntoView({
    block: "start",
    ...options,
    behavior: getScrollBehavior(),
  });
}

/** Scroll après layout (panneau ouvert, accordéon, etc.). */
export function smoothScrollIntoViewAfterLayout(
  element: Element | null | undefined,
  options?: Omit<ScrollIntoViewOptions, "behavior">,
  delayMs = 100,
): () => void {
  if (typeof window === "undefined" || !element) return () => {};
  const timer = window.setTimeout(() => {
    smoothScrollIntoView(element, options);
  }, delayMs);
  return () => window.clearTimeout(timer);
}
