import type { FaceColors } from "@/components/sectors/iso-primitives";

export const ISO_NAVY: FaceColors = {
  left: "color-mix(in oklch, var(--primary) 70%, black)",
  right: "var(--primary)",
  top: "color-mix(in oklch, var(--primary) 85%, white)",
};

export const ISO_NAVY_LIGHT: FaceColors = {
  left: "color-mix(in oklch, var(--primary) 80%, white)",
  right: "color-mix(in oklch, var(--ring) 70%, var(--primary))",
  top: "var(--ring)",
};
