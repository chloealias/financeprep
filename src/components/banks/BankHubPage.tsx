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
import { DetailSheet } from "@/components/hub/DetailSheet";
import { PageHeader } from "@/components/ui/page-header";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  BANK_LIST,
  getBankById,
  getBanksByCategory,
  getDealsForBank,
  type BankProfile,
} from "@/data/bank-profiles";
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
  const { bank: bankFromUrl } = Route.useSearch();
  const navigate = Route.useNavigate();
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

  const selectedBankId = bankFromUrl && getBankById(bankFromUrl) ? bankFromUrl : null;
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;
  const detailOpen = selectedBankId !== null;
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
      }),
    });
  };

  const handleClose = useCallback(() => {
    navigate({
      search: (prev: HomeSearch): HomeSearch => ({
        ...prev,
        tab: prev.tab ?? "banques",
        bank: undefined,
      }),
    });
  }, [navigate]);

  const handleToggleTarget = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    toggleTargetBank(id);
    setTargetIds(getTargetBankIds());
  };

  useEffect(() => {
    if (!selectedBankId) return;
    if (!visibleBankIds.has(selectedBankId)) {
      navigate({
        search: (_prev: HomeSearch) => ({
          tab: "banques",
          bank: undefined,
        }),
      });
    }
  }, [selectedBankId, visibleBankIds, navigate]);

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
      <PageHeader
        eyebrow="Ciblage entretien"
        title={
          <>
            Fiches <span className="type-accent">banques</span>
          </>
        }
        description={`${BANK_LIST.length} banques de conseil et groupes intégrés — fiches pour préparer vos entretiens M&A.`}
        className="max-w-2xl"
      />

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
          <GuideChipButton
            size="sm"
            active={targetsOnly}
            onClick={() => setTargetsOnly((v) => !v)}
          >
            Mes banques ({targetIds.length})
          </GuideChipButton>
        )}
      </div>

      <div className="mb-8 relative max-w-md">
        <label htmlFor="bank-search" className="sr-only">
          Rechercher une banque
        </label>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          aria-hidden
        />
        <input
          id="bank-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher par nom…"
          className="w-full rounded-lg border border-border bg-card/80 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>

      {sections.length === 0 ? (
        <p className="text-muted-foreground text-sm font-light italic text-center py-8">
          Aucune banque ne correspond à votre recherche.
        </p>
      ) : (
        <div className="space-y-10 mb-6 md:mt-0">
          {sections.map(({ categoryId, banks }) => (
            <section key={categoryId}>
              <div className="mb-4">
                <h3 className="text-lg font-serif text-foreground">
                  {BANK_CATEGORY_META[categoryId].label}
                  <span className="text-muted-foreground text-sm font-light ml-2">
                    ({banks.length})
                  </span>
                </h3>
                <p className="text-muted-foreground text-sm font-light mt-1">
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
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border bg-card/80 hover:border-primary/30 hover:bg-card"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => handleToggleTarget(bank.id, e)}
                          className="absolute top-1 right-1 z-10 touch-target rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                          aria-label={
                            isFav ? "Retirer des banques cibles" : "Ajouter aux banques cibles"
                          }
                        >
                          <Star className={`w-4 h-4 ${isFav ? "fill-primary text-primary" : ""}`} />
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
                              <span className="font-serif text-foreground text-base">
                                {bank.name}
                              </span>
                              {dealCount > 0 && (
                                <Link
                                  to="/actualite"
                                  search={{ bank: bank.id }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-xs font-medium uppercase tracking-wide text-primary bg-primary/10 hover:bg-primary/20 px-1.5 py-0.5 rounded transition-colors"
                                >
                                  {dealCount} deal{dealCount > 1 ? "s" : ""}
                                </Link>
                              )}
                            </div>
                            <div className="text-primary text-xs mt-0.5">{bank.category}</div>
                            <p className="text-muted-foreground text-xs font-light mt-1 line-clamp-2">
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

      {isMobile && selectedBank && (
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
    </div>
  );
}
