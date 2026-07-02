import { ISO_NAVY, ISO_NAVY_LIGHT } from "@/components/sectors/iso-colors";
import { IsoBlock } from "@/components/sectors/iso-primitives";

/** Modèles 3D isométriques par secteur — dessinés autour de (0, 0) au sol */
const SECTOR_ICON_COLORS = {
  deep: "color-mix(in oklch, var(--primary) 70%, black)",
  base: "var(--primary)",
  mid: "color-mix(in oklch, var(--primary) 80%, white)",
  light: "var(--ring)",
  pale: "color-mix(in oklch, var(--ring) 45%, white)",
  neutral: "var(--muted-foreground)",
  strong: "var(--foreground)",
  danger: "var(--destructive)",
} as const;

export function BuildingTMT() {
  return (
    <g>
      <IsoBlock x={0} y={0} w={44} d={36} h={52} colors={ISO_NAVY} />
      {/* Antenne / signal */}
      <line x1="0" y1="-52" x2="0" y2="-72" stroke={SECTOR_ICON_COLORS.light} strokeWidth="2" />
      <line x1="-8" y1="-66" x2="8" y2="-66" stroke={SECTOR_ICON_COLORS.light} strokeWidth="2" />
      <circle cx="0" cy="-74" r="4" fill={SECTOR_ICON_COLORS.mid} />
    </g>
  );
}

export function BuildingSante() {
  return (
    <g>
      <IsoBlock x={0} y={0} w={48} d={38} h={48} colors={ISO_NAVY} />
      {/* Croix médicale sur façade */}
      <rect x="6" y="-32" width="6" height="18" fill={SECTOR_ICON_COLORS.light} rx="1" />
      <rect x="2" y="-28" width="14" height="6" fill={SECTOR_ICON_COLORS.light} rx="1" />
      {/* Aile latérale — à droite pour ne pas décaler visuellement la colonne TMT / Industrie */}
      <IsoBlock x={28} y={4} w={22} d={20} h={28} colors={ISO_NAVY_LIGHT} />
    </g>
  );
}

export function BuildingEnergie() {
  return (
    <g>
      {/* Base */}
      <ellipse cx="0" cy="2" rx="22" ry="8" fill={SECTOR_ICON_COLORS.deep} />
      {/* Mât */}
      <polygon points="-3,0 3,0 5,-58  -5,-58" fill={SECTOR_ICON_COLORS.base} />
      <polygon points="3,0 5,-58 3,-58 1,0" fill={SECTOR_ICON_COLORS.deep} />
      {/* Nacelle */}
      <ellipse cx="0" cy="-58" rx="7" ry="5" fill={SECTOR_ICON_COLORS.light} />
      {/* Pales */}
      <polygon points="0,-58 -28,-78 -24,-70" fill={ISO_NAVY.top} />
      <polygon points="0,-58 30,-76 26,-68" fill={ISO_NAVY.top} />
      <polygon points="0,-58 -2,-32 4,-30" fill={SECTOR_ICON_COLORS.deep} />
      {/* Panneau solaire au sol — centré sur le mât */}
      <polygon points="-15,0 -5,-6 15,-6 5,0" fill={SECTOR_ICON_COLORS.base} opacity="0.9" />
      <line
        x1="-12"
        y1="-2"
        x2="12"
        y2="-2"
        stroke={SECTOR_ICON_COLORS.mid}
        strokeWidth="0.8"
        opacity="0.6"
      />
      <line
        x1="-8"
        y1="-4"
        x2="8"
        y2="-4"
        stroke={SECTOR_ICON_COLORS.mid}
        strokeWidth="0.8"
        opacity="0.6"
      />
    </g>
  );
}

export function BuildingRetail() {
  return (
    <g>
      <IsoBlock x={0} y={0} w={56} d={32} h={36} colors={ISO_NAVY} />
      {/* Auvent */}
      <polygon points="-30,-36 30,-36 34,-42 -34,-42" fill={SECTOR_ICON_COLORS.light} opacity="0.85" />
      {/* Portes / vitrine */}
      <rect x="-12" y="-8" width="10" height="14" fill={SECTOR_ICON_COLORS.deep} rx="1" />
      <rect x="4" y="-8" width="10" height="14" fill={SECTOR_ICON_COLORS.deep} rx="1" />
      {/* Panier (symbole retail) */}
      <ellipse
        cx="22"
        cy="-20"
        rx="6"
        ry="4"
        fill="none"
        stroke={SECTOR_ICON_COLORS.pale}
        strokeWidth="1.5"
      />
      <path
        d="M 18 -16 L 20 -10 L 26 -10 L 28 -16"
        fill="none"
        stroke={SECTOR_ICON_COLORS.pale}
        strokeWidth="1.5"
      />
    </g>
  );
}

export function BuildingIndustrie() {
  return (
    <g>
      <IsoBlock x={0} y={0} w={52} d={40} h={40} colors={ISO_NAVY} />
      {/* Cheminées */}
      <IsoBlock x={-16} y={-40} w={12} d={10} h={28} colors={ISO_NAVY_LIGHT} />
      <IsoBlock x={4} y={-40} w={10} d={10} h={22} colors={ISO_NAVY_LIGHT} />
      {/* Engrenage */}
      <circle
        cx="14"
        cy="-22"
        r="7"
        fill="none"
        stroke={SECTOR_ICON_COLORS.mid}
        strokeWidth="1.5"
        opacity="0.8"
      />
      <circle cx="14" cy="-22" r="3" fill={SECTOR_ICON_COLORS.mid} opacity="0.5" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={12}
          y={-30 - i * 2}
          width="4"
          height="6"
          fill={SECTOR_ICON_COLORS.light}
          opacity="0.5"
          transform={`rotate(${i * 45} 14 -22)`}
        />
      ))}
    </g>
  );
}

export function BuildingAuto() {
  const wheelY = 6;
  const rearWheelX = -24;
  const frontWheelX = 22;

  return (
    <g>
      {/* Ombre au sol */}
      <ellipse cx={0} cy={wheelY + 4} rx={36} ry={5} fill={SECTOR_ICON_COLORS.deep} opacity="0.25" />

      {/* Roues (profil latéral) */}
      <ellipse cx={rearWheelX} cy={wheelY} rx={11} ry={5.5} fill={SECTOR_ICON_COLORS.deep} />
      <ellipse cx={rearWheelX} cy={wheelY - 1} rx={6} ry={3} fill={SECTOR_ICON_COLORS.neutral} />
      <ellipse cx={frontWheelX} cy={wheelY} rx={11} ry={5.5} fill={SECTOR_ICON_COLORS.deep} />
      <ellipse cx={frontWheelX} cy={wheelY - 1} rx={6} ry={3} fill={SECTOR_ICON_COLORS.neutral} />

      {/* Carrosserie — profil berline */}
      <polygon
        points={`-34,${wheelY - 2} -34,-10 -26,-18 -10,-22 8,-22 20,-16 28,-10 32,${wheelY - 2}`}
        fill={SECTOR_ICON_COLORS.base}
      />
      {/* Toit / habitacle */}
      <polygon points="-22,-12 -8,-20 12,-20 22,-14 14,-12 -10,-12" fill={SECTOR_ICON_COLORS.light} />
      {/* Pare-brise */}
      <polygon points="6,-20 14,-15 10,-13 -4,-13" fill={SECTOR_ICON_COLORS.pale} opacity="0.9" />
      {/* Ligne de caisse */}
      <line
        x1={-32}
        y1={wheelY - 3}
        x2={30}
        y2={wheelY - 3}
        stroke={SECTOR_ICON_COLORS.base}
        strokeWidth="1.5"
      />
      {/* Phares / feux */}
      <rect x={26} y={-14} width={4} height={3} fill={SECTOR_ICON_COLORS.pale} rx="0.5" />
      <rect x={-32} y={-12} width={3} height={4} fill={SECTOR_ICON_COLORS.danger} rx="0.5" />
    </g>
  );
}

export function BuildingImmo() {
  return (
    <g>
      <IsoBlock x={0} y={0} w={36} d={32} h={64} colors={ISO_NAVY} />
      {/* Balcons */}
      {[0, 1, 2, 3].map((row) => (
        <polygon
          key={row}
          points={`${-14},${-18 - row * 14} ${14},${-18 - row * 14} ${12},${-14 - row * 14} ${-12},${-14 - row * 14}`}
          fill={SECTOR_ICON_COLORS.base}
          opacity="0.7"
        />
      ))}
    </g>
  );
}

export function BuildingFIG() {
  return (
    <g>
      <IsoBlock x={0} y={0} w={50} d={38} h={44} colors={ISO_NAVY} />
      {/* Fronton / colonnes banque */}
      <polygon
        points="-26,-44 0,-58 26,-44"
        fill={ISO_NAVY.top}
        stroke={SECTOR_ICON_COLORS.light}
        strokeWidth="1"
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={-18 + i * 12}
          y={-42}
          width="4"
          height="28"
          fill={SECTOR_ICON_COLORS.deep}
          rx="0.5"
        />
      ))}
      {/* Marches */}
      <polygon points="-20,0 20,0 18,6 -18,6" fill={SECTOR_ICON_COLORS.deep} />
      {/* Symbole $ stylisé */}
      <text
        x="0"
        y="-48"
        fontSize="14"
        fill={SECTOR_ICON_COLORS.pale}
        textAnchor="middle"
        fontWeight="bold"
        opacity="0.9"
      >
        $
      </text>
    </g>
  );
}

export const SECTOR_BUILDING_COMPONENTS = {
  tmt: BuildingTMT,
  sante: BuildingSante,
  energie: BuildingEnergie,
  retail: BuildingRetail,
  industrie: BuildingIndustrie,
  auto: BuildingAuto,
  immo: BuildingImmo,
  fi: BuildingFIG,
} as const;
