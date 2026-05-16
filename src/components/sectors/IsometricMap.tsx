import { useState } from 'react';
import type { SectorId } from '@/lib/sectors';
import { SECTOR_META, SECTOR_LIST } from '@/data/sector-meta';
import { GuideChipButton } from '@/components/guide/guide-ui';
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  MapBackground,
  MapDefs,
  SectorBuilding,
} from '@/components/sectors/sector-map-parts';
import { SECTOR_BUILDING_COMPONENTS } from '@/components/sectors/sector-buildings-3d';

type IsometricMapProps = {
  selectedSector: SectorId | null;
  onSectorSelect: (id: SectorId | null) => void;
};

export function IsometricMap ({ selectedSector, onSectorSelect }: IsometricMapProps) {
  const [hovered, setHovered] = useState<SectorId | null>(null);

  const handleClick = (id: SectorId) => {
    onSectorSelect(selectedSector === id ? null : id);
  };

  const buildingProps = (id: SectorId) => {
    const Building = SECTOR_BUILDING_COMPONENTS[id];
    return {
      meta: SECTOR_META[id],
      isSelected: selectedSector === id,
      isHovered: hovered === id,
      isDimmed: selectedSector !== null && selectedSector !== id,
      onSelect: () => handleClick(id),
      onHover: () => setHovered(id),
      onLeave: () => setHovered(null),
      children: <Building />,
    };
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="w-full h-auto max-h-[min(50vh,360px)] block"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Carte isométrique des 7 secteurs"
        >
          <MapDefs />
          <MapBackground />

          <g id="map-buildings">
            {SECTOR_LIST.map(id => (
              <SectorBuilding key={id} {...buildingProps(id)} />
            ))}
          </g>

        </svg>

        <p className="text-center text-xs text-blue-400 font-light italic py-4 px-4 bg-white">
          Cliquez sur un bâtiment pour ouvrir sa fiche
        </p>

        <div className="px-3 pb-3 pt-2 border-t border-slate-100 bg-white">
          <p className="text-[10px] uppercase tracking-wider text-blue-400 font-medium mb-1.5 hidden sm:block">
            Accès rapide
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {SECTOR_LIST.map(id => (
              <GuideChipButton
                key={id}
                size="sm"
                active={selectedSector === id}
                onClick={() => handleClick(id)}
              >
                {SECTOR_META[id].shortLabel}
              </GuideChipButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
