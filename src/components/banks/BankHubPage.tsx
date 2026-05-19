import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { Link } from "@tanstack/react-router";
import { Search, Star } from "lucide-react";
import { Route } from "@/routes/index";
import { GuideChipButton } from "@/components/guide/guide-ui";
import { BankPanel } from "@/components/banks/BankPanel";
import { BankLogo } from "@/components/banks/BankLogo";
import { PeFundPanel } from "@/components/banks/PeFundPanel";
import { PeFundLogo } from "@/components/banks/PeFundLogo";
import { DetailSheet } from "@/components/hub/DetailSheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  BANK_LIST,
  getBankById,
  getBanksByCategory,
  getDealsForBank,
  type BankProfile,
} from "@/data/bank-profiles";
import { getPeFundById, PE_FUND_LIST, type PeFundProfile } from "@/data/pe-fund-profiles";
import {
  BANK_CATEGORY_FILTERS,
  BANK_CATEGORY_IDS,
  BANK_CATEGORY_META,
  type BankCategoryFilter,
} from "@/lib/bank-categories";
import {
  consumeOpenTargetsFilter,
  getTargetBankIds,
  isTargetBank,
  toggleTargetBank,
} from "@/lib/target-banks-storage";
import { smoothScrollIntoViewAfterLayout } from "@/lib/scroll";
import { usePreserveScrollOnDetailClose } from "@/hooks/usePreserveScrollOnDetailClose";
import type { HomeSearch } from "@/lib/route-search";

function matchesSearch(bank: BankProfile, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return bank.name.toLowerCase().includes(q);
}

function matchesPeSearch(fund: PeFundProfile, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fund.name.toLowerCase().includes(q);
}

function bankPassesHubFilters(
  bank: BankProfile,
  opts: {
    searchQuery: string;
    targetsOnly: boolean;
    targetIds: Set<string>;
  },
): boolean {
  if (!matchesSearch(bank, opts.searchQuery)) return false;
  if (opts.targetsOnly && !opts.targetIds.has(bank.id)) return false;
  return true;
}

export function BankHubPage() {
  const { bank: bankFromUrl, pe: peFromUrl } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [hubView, setHubViewState] = useState<"conseil" | "pe">(() =>
    peFromUrl ? "pe" : "conseil",
  );

  useEffect(() => {
    if (peFromUrl) setHubViewState("pe");
    else if (bankFromUrl) setHubViewState("conseil");
  }, [peFromUrl, bankFromUrl]);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [categoryFilter, setCategoryFilter] = useState<BankCategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [targetsOnly, setTargetsOnly] = useState(false);
  const [targetIds, setTargetIds] = useState<string[]>([]);

  useEffect(() => {
    setTargetsOnly(consumeOpenTargetsFilter());
    setTargetIds(getTargetBankIds());
  }, []);

  const targetIdSet = useMemo(() => new Set(targetIds), [targetIds]);

  const selectedBankId =
    hubView === "conseil" && bankFromUrl && getBankById(bankFromUrl) ? bankFromUrl : null;
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;
  const selectedPeId =
    hubView === "pe" && peFromUrl && getPeFundById(peFromUrl) ? peFromUrl : null;
  const selectedPe = selectedPeId ? getPeFundById(selectedPeId) : null;
  const detailOpen = selectedBankId !== null || selectedPeId !== null;
  const captureScroll = usePreserveScrollOnDetailClose(detailOpen);

  const visibleCategories = useMemo(() => {
    if (categoryFilter !== "all") return [categoryFilter];
    return [...BANK_CATEGORY_IDS];
  }, [categoryFilter]);

  const filterOpts = useMemo(
    () => ({ searchQuery, targetsOnly, targetIds: targetIdSet }),
    [searchQuery, targetsOnly, targetIdSet],
  );

  const visibleBankIds = useMemo(() => {
    const ids = new Set<string>();
    for (const bank of BANK_LIST) {
      if (bankPassesHubFilters(bank, filterOpts)) ids.add(bank.id);
    }
    return ids;
  }, [filterOpts]);

  const sections = useMemo(() => {
    return visibleCategories
      .map((categoryId) => {
        const banks = getBanksByCategory(categoryId).filter((b) =>
          bankPassesHubFilters(b, filterOpts),
        );
        return { categoryId, banks };
      })
      .filter((s) => s.banks.length > 0);
  }, [visibleCategories, filterOpts]);

  const handleSelectBank = (id: string, trigger?: HTMLButtonElement | null) => {
    if (trigger) lastTriggerRef.current = trigger;
    const next = selectedBankId === id ? undefined : id;
    if (next && !selectedBankId) captureScroll();
    navigate({
      search: (prev: HomeSearch): HomeSearch => ({
        ...prev,
        tab: "banques",
        bank: next,
        pe: undefined,
      }),
    });
  };

  const handleSelectPe = (id: string, trigger?: HTMLButtonElement | null) => {
    if (trigger) lastTriggerRef.current = trigger;
    const next = selectedPeId === id ? undefined : id;
    if (next && !selectedPeId) captureScroll();
    navigate({
      search: (prev: HomeSearch): HomeSearch => ({
        ...prev,
        tab: "banques",
        pe: next,
        bank: undefined,
      }),
    });
  };

  const handleClose = useCallback(() => {
    navigate({
      search: (prev: HomeSearch): HomeSearch => ({
        ...prev,
        tab: prev.tab ?? "banques",
        bank: undefined,
        pe: undefined,
      }),
    });
  }, [navigate]);

  const setHubView = (view: "conseil" | "pe") => {
    setHubViewState(view);
    navigate({
      search: (prev: HomeSearch): HomeSearch => ({
        ...prev,
        tab: "banques",
        bank: undefined,
        pe: undefined,
      }),
    });
  };

  const filteredPeFunds = useMemo(
    () => PE_FUND_LIST.filter((f) => matchesPeSearch(f, searchQuery)),
    [searchQuery],
  );

  const handleToggleTarget = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    toggleTargetBank(id);
    setTargetIds(getTargetBankIds());
  };

  useEffect(() => {
    if (!selectedBankId) return;
    if (!visibleBankIds.has(selectedBankId)) {
      navigate({
        search: (prev) => ({
          tab: "banques",
          bank: undefined,
        }),
      });
    }
  }, [selectedBankId, visibleBankIds, navigate]);

  useEffect(() => {
    if (!selectedPeId) return;
    if (!filteredPeFunds.some((f) => f.id === selectedPeId)) {
      navigate({
        search: (prev) => ({
          tab: "banques",
          pe: undefined,
        }),
      });
    }
  }, [selectedPeId, filteredPeFunds, navigate]);

  useEffect(() => {
    if (!detailOpen || isMobile || !panelRef.current) return;
    return smoothScrollIntoViewAfterLayout(panelRef.current, { block: "nearest" });
  }, [detailOpen, isMobile]);

  useEffect(() => {
    if (!detailOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [detailOpen, handleClose]);

  const showTargetsChip = targetIds.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-blue-700" />
          <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">
            Ciblage entretien
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
          Fiches <span className="italic font-light text-blue-700">banques</span>
        </h2>
        <p className="text-blue-700 mt-3 font-light max-w-2xl">
          {hubView === "conseil"
            ? `${BANK_LIST.length} banques de conseil et groupes intégrés — fiches pour préparer vos entretiens M&A.`
            : `${PE_FUND_LIST.length} fonds PE majeurs en France — stratégie, deals et questions piège.`}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <GuideChipButton
          size="sm"
          active={hubView === "conseil"}
          onClick={() => setHubView("conseil")}
        >
          Conseil & banques
        </GuideChipButton>
        <GuideChipButton size="sm" active={hubView === "pe"} onClick={() => setHubView("pe")}>
          Fonds PE France
        </GuideChipButton>
      </div>

      {hubView === "conseil" && (
      <div className="flex flex-wrap gap-2 mb-4">
        {BANK_CATEGORY_FILTERS.map(({ id, label }) => (
          <GuideChipButton
            key={id}
            size="sm"
            active={categoryFilter === id && !targetsOnly}
            onClick={() => {
              setCategoryFilter(id);
              setTargetsOnly(false);
            }}
          >
            {label}
          </GuideChipButton>
        ))}
        {showTargetsChip && (
          <GuideChipButton size="sm" active={targetsOnly} onClick={() => setTargetsOnly((v) => !v)}>
            Mes banques ({targetIds.length})
          </GuideChipButton>
        )}
      </div>
      )}

      <div className="mb-8 relative max-w-md">
        <label htmlFor="bank-search" className="sr-only">
          {hubView === "conseil" ? "Rechercher une banque" : "Rechercher un fonds PE"}
        </label>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300 pointer-events-none"
          aria-hidden
        />
        <input
          id="bank-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher par nom…"
          className="w-full rounded-lg border border-blue-200 bg-white/80 pl-10 pr-4 py-2.5 text-sm text-blue-900 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      {hubView === "pe" ? (
        filteredPeFunds.length === 0 ? (
          <p className="text-blue-400 text-sm font-light italic text-center py-8">
            Aucun fonds ne correspond à votre recherche.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredPeFunds.map((fund) => (
              <Fragment key={fund.id}>
                <div
                  className={`relative rounded-xl border transition-all ${
                    selectedPeId === fund.id
                      ? "border-blue-400 bg-blue-50 shadow-sm"
                      : "border-blue-100 bg-white/80 hover:border-blue-200 hover:bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => handleSelectPe(fund.id, e.currentTarget)}
                    className="w-full text-left px-4 py-3 flex gap-3 items-start"
                  >
                    <PeFundLogo fundId={fund.id} fundName={fund.name} size="sm" expandable />
                    <div className="min-w-0 flex-1">
                      <span className="font-serif text-blue-950 text-base">{fund.name}</span>
                      <div className="text-blue-500 text-xs mt-0.5">{fund.aum}</div>
                      <p className="text-blue-600 text-xs font-light mt-1 line-clamp-2">
                        {fund.ticketTypique}
                      </p>
                    </div>
                  </button>
                </div>
                {selectedPeId === fund.id && selectedPe && !isMobile && (
                  <div ref={panelRef} className="col-span-1 sm:col-span-2 lg:col-span-3">
                    <PeFundPanel fund={selectedPe} onClose={handleClose} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        )
      ) : sections.length === 0 ? (
        <p className="text-blue-400 text-sm font-light italic text-center py-8">
          Aucune banque ne correspond à votre recherche.
        </p>
      ) : (
        <div className="space-y-10 mb-6 md:mt-0">
          {sections.map(({ categoryId, banks }) => (
            <section key={categoryId}>
              <div className="mb-4">
                <h3 className="text-lg font-serif text-blue-950">
                  {BANK_CATEGORY_META[categoryId].label}
                  <span className="text-blue-400 font-sans text-sm font-light ml-2">
                    ({banks.length})
                  </span>
                </h3>
                <p className="text-blue-600 text-sm font-light mt-1">
                  {BANK_CATEGORY_META[categoryId].description}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {banks.map((bank) => {
                  const dealCount = getDealsForBank(bank.name).length;
                  const isFav = isTargetBank(bank.id);
                  return (
                    <Fragment key={bank.id}>
                      <div
                        className={`relative rounded-xl border transition-all ${
                          selectedBankId === bank.id
                            ? "border-blue-400 bg-blue-50 shadow-sm"
                            : "border-blue-100 bg-white/80 hover:border-blue-200 hover:bg-white"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => handleToggleTarget(bank.id, e)}
                          className="absolute top-1 right-1 z-10 touch-target rounded-full text-blue-300 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                          aria-label={
                            isFav ? "Retirer des banques cibles" : "Ajouter aux banques cibles"
                          }
                        >
                          <Star
                            className={`w-4 h-4 ${isFav ? "fill-amber-400 text-amber-500" : ""}`}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleSelectBank(bank.id, e.currentTarget)}
                          className="w-full text-left px-4 py-3 pr-12 flex gap-3 items-start"
                        >
                          <BankLogo
                            bankId={bank.id}
                            bankName={bank.name}
                            size="sm"
                            className="mt-0.5"
                            expandable
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-serif text-blue-950 text-base">
                                {bank.name}
                              </span>
                              {dealCount > 0 && (
                                <Link
                                  to="/actualite"
                                  search={{ bank: bank.id }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[10px] font-medium uppercase tracking-wide text-blue-600 bg-blue-100 hover:bg-blue-200 px-1.5 py-0.5 rounded transition-colors"
                                >
                                  {dealCount} deal{dealCount > 1 ? "s" : ""}
                                </Link>
                              )}
                            </div>
                            <div className="text-blue-500 text-xs mt-0.5">{bank.category}</div>
                            <p className="text-blue-600 text-xs font-light mt-1 line-clamp-2">
                              {bank.tagline}
                            </p>
                          </div>
                        </button>
                      </div>
                      {selectedBankId === bank.id && selectedBank && !isMobile && (
                        <div ref={panelRef} className="col-span-1 sm:col-span-2 lg:col-span-3">
                          <BankPanel bank={selectedBank} onClose={handleClose} />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {isMobile && selectedBank && hubView === "conseil" && (
        <DetailSheet
          open
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
          title={`Fiche ${selectedBank.name}`}
          returnFocusRef={lastTriggerRef}
        >
          <BankPanel bank={selectedBank} onClose={handleClose} />
        </DetailSheet>
      )}

      {isMobile && selectedPe && hubView === "pe" && (
        <DetailSheet
          open
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
          title={`Fiche ${selectedPe.name}`}
          returnFocusRef={lastTriggerRef}
        >
          <PeFundPanel fund={selectedPe} onClose={handleClose} />
        </DetailSheet>
      )}
    </div>
  );
}
