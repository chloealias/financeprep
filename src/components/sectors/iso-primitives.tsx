/** Primitives isométriques 3D (coords locales, centre ≈ 0,0 au sol) */

export type FaceColors = {
  left: string;
  right: string;
  top: string;
};

type IsoBlockProps = {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  colors: FaceColors;
};

export function IsoBlock({ x, y, w, d, h, colors }: IsoBlockProps) {
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
