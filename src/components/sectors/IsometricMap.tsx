import { useState } from "react";
import type { SectorId } from "@/lib/sectors";
import { getSectorMeta, SECTOR_LIST } from "@/data/sector-meta";
import { GuideChipButton } from "@/components/guide/guide-ui";
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  MapBackground,
  MapDefs,
  SectorBuilding,
} from "@/components/sectors/sector-map-parts";
import { SECTOR_BUILDING_COMPONENTS } from "@/components/sectors/sector-buildings-3d";
import { useT } from "@/hooks/useT";

type IsometricMapProps = {
  onSectorSelect: (id: SectorId) => void;
  selectedSectorId?: SectorId | null;
};

export function IsometricMap({ onSectorSelect, selectedSectorId = null }: IsometricMapProps) {
  const { t, locale } = useT();
  const [hovered, setHovered] = useState<SectorId | null>(null);
  const sectorMeta = getSectorMeta(locale);

  const buildingProps = (id: SectorId) => {
    const Building = SECTOR_BUILDING_COMPONENTS[id];
    return {
      meta: sectorMeta[id],
      isSelected: selectedSectorId === id || hovered === id,
      isHovered: hovered === id,
      isDimmed: hovered !== null && hovered !== id,
      onSelect: () => onSectorSelect(id),
      onHover: () => setHovered(id),
      onLeave: () => setHovered(null),
      children: <Building />,
    };
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="w-full h-auto max-h-[min(50vh,360px)] block"
          preserveAspectRatio="xMidYMid meet"
          role="group"
          aria-label={t("hub.sectors.map.aria")}
        >
          <MapDefs />
          <MapBackground />

          <g id="map-buildings">
            {SECTOR_LIST.map((id) => (
              <SectorBuilding key={id} {...buildingProps(id)} />
            ))}
          </g>
        </svg>

        <p className="text-center text-xs text-muted-foreground font-light italic py-4 px-4 bg-white">
          {t("hub.sectors.map.caption")}
        </p>

        <div className="px-3 pb-3 pt-2 border-t border-slate-100 bg-white">
          <p className="type-label mb-1.5 hidden sm:block">{t("hub.sectors.map.quickAccess")}</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {SECTOR_LIST.map((id) => (
              <GuideChipButton
                key={id}
                size="sm"
                active={selectedSectorId === id}
                onClick={() => onSectorSelect(id)}
              >
                {sectorMeta[id].shortLabel}
              </GuideChipButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
