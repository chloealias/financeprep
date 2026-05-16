import { useState } from 'react';
import { GuideChipButton } from '@/components/guide/guide-ui';
import { BankPanel } from '@/components/banks/BankPanel';
import { BANK_LIST, getBankById } from '@/data/bank-profiles';

export function BankHubPage () {
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;

  const handleSelect = (id: string) => {
    setSelectedBankId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-blue-700" />
          <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">Ciblage entretien</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
          Fiches <span className="italic font-light text-blue-700">banques</span>
        </h2>
        <p className="text-blue-700 mt-3 font-light max-w-2xl">
          Particularités, divisions et points clés pour {BANK_LIST.length} banques présentes dans l&apos;actualité M&A.
          Sélectionnez une banque pour afficher la fiche complète.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {BANK_LIST.map(bank => (
          <GuideChipButton
            key={bank.id}
            size="sm"
            active={selectedBankId === bank.id}
            onClick={() => handleSelect(bank.id)}
          >
            {bank.name}
          </GuideChipButton>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {BANK_LIST.map(bank => (
          <button
            key={bank.id}
            type="button"
            onClick={() => handleSelect(bank.id)}
            className={`text-left rounded-xl border px-4 py-3 transition-all ${
              selectedBankId === bank.id
                ? 'border-blue-400 bg-blue-50 shadow-sm'
                : 'border-blue-100 bg-white/80 hover:border-blue-200 hover:bg-white'
            }`}
          >
            <div className="font-serif text-blue-950 text-base">{bank.name}</div>
            <div className="text-blue-500 text-xs mt-0.5">{bank.category}</div>
            <p className="text-blue-600 text-xs font-light mt-1 line-clamp-2">{bank.tagline}</p>
          </button>
        ))}
      </div>

      {selectedBank && (
        <BankPanel bank={selectedBank} onClose={() => setSelectedBankId(null)} />
      )}
    </div>
  );
}
