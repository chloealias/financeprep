import type { ReactNode } from "react";
import type { SectorId } from "@/lib/sectors";
import type { SectorMeta } from "@/data/sector-meta";

const MAP_WIDTH = 640;
const MAP_HEIGHT = 360;

export function MapDefs() {
  return (
    <defs>
      <linearGradient id="roofGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e40af" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <filter id="buildingShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#172554" floodOpacity="0.3" />
      </filter>
      <filter id="selectionGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#fbbf24" floodOpacity="0.7" />
      </filter>
    </defs>
  );
}

/** Fond blanc uni */
export function MapBackground() {
  return (
    <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="#ffffff" pointerEvents="none" />
  );
}

export { MAP_WIDTH, MAP_HEIGHT };

type SectorBuildingProps = {
  meta: SectorMeta;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
  children: ReactNode;
};

export function SectorBuilding({
  meta,
  isSelected,
  isHovered,
  isDimmed,
  onSelect,
  onHover,
  onLeave,
  children,
}: SectorBuildingProps) {
  const { mapSlot, labelOffset, label } = meta;
  const lift = isSelected ? -6 : 0;
  const opacity = isDimmed ? 0.55 : isHovered ? 0.92 : 1;
  const labelWidth = label.length > 8 ? 88 : 48;
  const hitR = 42;

  return (
    <g
      transform={`translate(${mapSlot.x}, ${mapSlot.y + lift})`}
      opacity={opacity}
      style={{
        transition: "opacity 0.2s, filter 0.2s",
        filter: isDimmed ? "grayscale(0.35)" : "none",
      }}
      className="cursor-pointer"
    >
      {/* Anneau de sélection — sous le bâtiment */}
      {isSelected && (
        <ellipse
          cx={0}
          cy={10}
          rx={38}
          ry={10}
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeDasharray="4,2"
          filter="url(#selectionGlow)"
          pointerEvents="none"
        />
      )}

      {/* Bâtiment 3D avec ombre */}
      <g filter="url(#buildingShadow)" pointerEvents="none">
        {children}
      </g>

      {/* Label — au-dessus du bâtiment, non cliquable */}
      <g transform={`translate(${labelOffset.x}, ${labelOffset.y})`} pointerEvents="none">
        <rect
          x={-labelWidth / 2}
          y={-14}
          width={labelWidth}
          height={18}
          rx="4"
          fill="white"
          fillOpacity={isSelected ? 0.96 : 0.9}
          stroke={isSelected ? "#fbbf24" : "#bfdbfe"}
          strokeWidth="1"
        />
        <text
          x={0}
          y={-1}
          fontSize="11"
          fill={isSelected ? "#b45309" : "#1e3a8a"}
          textAnchor="middle"
          fontWeight="600"
        >
          {label}
        </text>
      </g>

      {/* Zone cliquable — souris, tactile et clavier */}
      <g
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        aria-label={`Ouvrir la fiche ${label}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            onSelect();
          }
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
        className="cursor-pointer outline-none focus-visible:[&>circle:last-child]:stroke-primary focus-visible:[&>circle:last-child]:stroke-[3px]"
      >
        <circle cx={0} cy={-25} r={hitR} fill="transparent" pointerEvents="all" />
      </g>
    </g>
  );
}

export type { SectorId };
