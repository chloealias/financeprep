import { getBankById } from "@/data/bank-profiles";
import { BankLogo } from "@/components/banks/BankLogo";
import { POPULAR_TARGET_BANK_IDS } from "@/lib/profile-personalization";
import { isTargetBank, toggleTargetBank } from "@/lib/target-banks-storage";
import { useT } from "@/hooks/useT";

type TargetBankQuickPickProps = {
  targetIds: string[];
  onChange: () => void;
  onViewAll: () => void;
};

export function TargetBankQuickPick({ targetIds, onChange, onViewAll }: TargetBankQuickPickProps) {
  const { t } = useT();
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
                  ? "bg-primary/10 border-primary/50 text-foreground"
                  : "bg-card border-border text-foreground hover:border-primary/40"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  toggleTargetBank(id);
                  onChange();
                }}
                className="inline-flex items-center gap-2 px-2 py-1 text-sm"
                aria-pressed={selected}
              >
                <BankLogo bankId={id} bankName={bank.name} size="sm" />
                <span className="font-medium">{bank.name}</span>
              </button>
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
                  className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-muted border border-border text-sm text-foreground"
                >
                  <BankLogo bankId={id} bankName={bank?.name} size="sm" />
                  {bank?.name ?? id}
                </span>
              );
            })}
        </div>
      )}

      <button
        type="button"
        onClick={onViewAll}
        className="text-sm text-primary hover:text-primary/80 font-medium underline-offset-2 hover:underline"
      >
        {t("profile.targetBanks.viewAll")}
      </button>
    </div>
  );
}
