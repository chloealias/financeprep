import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { getBankById } from "@/data/bank-profiles";
import { BankLogo } from "@/components/banks/BankLogo";
import { POPULAR_TARGET_BANK_IDS } from "@/lib/profile-personalization";
import { isTargetBank, toggleTargetBank } from "@/lib/target-banks-storage";

type TargetBankQuickPickProps = {
  targetIds: string[];
  onChange: () => void;
  onViewAll: () => void;
};

export function TargetBankQuickPick({ targetIds, onChange, onViewAll }: TargetBankQuickPickProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {POPULAR_TARGET_BANK_IDS.map((id) => {
          const bank = getBankById(id);
          if (!bank) return null;
          const selected = isTargetBank(id);
          return (
            <div
              key={id}
              className={`inline-flex items-center gap-1 rounded-full border transition-colors ${
                selected
                  ? "bg-indigo-50 border-indigo-400 text-indigo-950"
                  : "bg-white border-blue-200 text-blue-800 hover:border-blue-400"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  toggleTargetBank(id);
                  onChange();
                }}
                className="inline-flex items-center gap-2 pl-1 pr-1 py-1 text-sm"
                aria-pressed={selected}
              >
                <BankLogo bankId={id} bankName={bank.name} size="sm" />
                <span className="font-medium pr-1">{bank.name}</span>
              </button>
              <Link
                to="/"
                search={{ tab: "banques", bank: id }}
                className="p-1.5 mr-0.5 rounded-full text-blue-500 hover:text-blue-900 hover:bg-blue-50"
                aria-label={`Fiche ${bank.name}`}
                title="Voir la fiche banque"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>

      {targetIds.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {targetIds
            .filter((id) => !(POPULAR_TARGET_BANK_IDS as readonly string[]).includes(id))
            .map((id) => {
              const bank = getBankById(id);
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-blue-50 border border-blue-200 text-sm text-blue-900"
                >
                  <BankLogo bankId={id} bankName={bank?.name} size="sm" />
                  {bank?.name ?? id}
                  <Link
                    to="/"
                    search={{ tab: "banques", bank: id }}
                    className="p-0.5 text-blue-500 hover:text-blue-900"
                    aria-label={`Fiche ${bank?.name ?? id}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </span>
              );
            })}
        </div>
      )}

      <button
        type="button"
        onClick={onViewAll}
        className="text-sm text-blue-700 hover:text-blue-900 font-medium"
      >
        Voir toutes les banques →
      </button>
    </div>
  );
}
