import { Link } from "@tanstack/react-router";
import { getBankIdByName } from "@/data/bank-profiles";
import { getSectorIdForSecteur, getSectorLabel } from "@/lib/sector-deals";
import type { SectorId } from "@/lib/sectors";

type SectorHubChipProps = {
  sectorId: SectorId;
  label?: string;
  className?: string;
};

/** Lien vers la fiche secteur sur le hub (symétrique à BankDealChip). */
export function SectorHubChip({ sectorId, label, className }: SectorHubChipProps) {
  const display = label ?? getSectorLabel(sectorId);
  return (
    <Link
      to="/"
      search={{ tab: "secteurs", sector: sectorId }}
      className={
        className ??
        "bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded hover:bg-slate-200 transition-colors"
      }
      onClick={(e) => e.stopPropagation()}
    >
      {display}
    </Link>
  );
}

export function SectorDealChip({ secteur }: { secteur: string }) {
  const sectorId = getSectorIdForSecteur(secteur);
  if (!sectorId) {
    return (
      <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">{secteur}</span>
    );
  }
  return <SectorHubChip sectorId={sectorId} label={secteur} />;
}

export function BankDealChip({ name }: { name: string }) {
  const bankId = getBankIdByName(name);
  if (!bankId) {
    return (
      <span className="inline-block bg-blue-50 border border-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded">
        {name}
      </span>
    );
  }
  return (
    <Link
      to="/"
      search={{ tab: "banques", bank: bankId }}
      className="inline-block bg-blue-50 border border-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded hover:bg-blue-100 hover:border-blue-200 transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {name}
    </Link>
  );
}

/** Nom de banque dans une liste d'advisors (texte libre, ex. « Lazard (M&A) »). */
export function AdvisorBankName({ name }: { name: string }) {
  const bankId = getBankIdByName(name);
  const display = name.replace(/^[·\s]+/, "").trim();
  if (!bankId) {
    return <span>{name}</span>;
  }
  return (
    <Link
      to="/"
      search={{ tab: "banques", bank: bankId }}
      className="text-blue-800 hover:text-blue-950 underline underline-offset-2"
      onClick={(e) => e.stopPropagation()}
    >
      {display.replace(/\s*\([^)]*\)\s*$/, "").trim() || display}
    </Link>
  );
}
