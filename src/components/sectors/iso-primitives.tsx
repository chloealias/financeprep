/** Primitives isométriques 3D (coords locales, centre ≈ 0,0 au sol) */

type FaceColors = {
  left: string;
  right: string;
  top: string;
};

export function isoBlock ({
  x,
  y,
  w,
  d,
  h,
  colors,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  colors: FaceColors;
}) {
  const hw = w / 2;
  const hd = d / 2;
  return (
    <g>
      {/* Face gauche */}
      <polygon
        points={`${x - hw},${y} ${x - hw},${y - h} ${x},${y - h - hd * 0.5} ${x},${y - hd * 0.5}`}
        fill={colors.left}
      />
      {/* Face droite */}
      <polygon
        points={`${x},${y - hd * 0.5} ${x},${y - h - hd * 0.5} ${x + hw},${y - h} ${x + hw},${y}`}
        fill={colors.right}
      />
      {/* Toit */}
      <polygon
        points={`${x - hw},${y - h} ${x},${y - h - hd * 0.5} ${x + hw},${y - h} ${x},${y - h + hd * 0.5}`}
        fill={colors.top}
      />
    </g>
  );
}

export const ISO_NAVY = {
  left: '#172554',
  right: '#1e40af',
  top: '#1e3a8a',
} as const;

export const ISO_NAVY_LIGHT = {
  left: '#1e3a8a',
  right: '#2563eb',
  top: '#3b82f6',
} as const;
