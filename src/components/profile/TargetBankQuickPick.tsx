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
            <button
              key={id}
              type="button"
              onClick={() => {
                toggleTargetBank(id);
                onChange();
              }}
              className={`inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border text-sm transition-colors ${
                selected
                  ? "bg-indigo-50 border-indigo-400 text-indigo-950"
                  : "bg-white border-blue-200 text-blue-800 hover:border-blue-400"
              }`}
              aria-pressed={selected}
            >
              <BankLogo bankId={id} bankName={bank.name} size="sm" />
              <span className="font-medium">{bank.name}</span>
            </button>
          );
        })}
      </div>

      {targetIds.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {targetIds
            .filter((id) => !(POPULAR_TARGET_BANK_IDS as readonly string[]).includes(id))
            .map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-sm text-blue-900"
              >
                <BankLogo bankId={id} bankName={getBankById(id)?.name} size="sm" />
                {getBankById(id)?.name ?? id}
              </span>
            ))}
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
