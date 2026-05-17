import { Link } from "@tanstack/react-router";
import { getBankIdByName } from "@/data/bank-profiles";
import { getSectorIdForSecteur } from "@/lib/sector-deals";

export function SectorDealChip({ secteur }: { secteur: string }) {
  const sectorId = getSectorIdForSecteur(secteur);
  if (!sectorId) {
    return (
      <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">{secteur}</span>
    );
  }
  return (
    <Link
      to="/actualite"
      search={{ sector: sectorId }}
      className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded hover:bg-slate-200 transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {secteur}
    </Link>
  );
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

/** Nom de banque dans une liste d'advisors (texte libre, ex. « Lazard »). */
export function AdvisorBankName({ name }: { name: string }) {
  const trimmed = name.replace(/^[·\s]+/, "").trim();
  const bankId = getBankIdByName(trimmed);
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
      {trimmed}
    </Link>
  );
}
