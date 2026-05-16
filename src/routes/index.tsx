import { createFileRoute } from '@tanstack/react-router';
import FinanceInterviewGuide from '@/components/FinanceInterviewGuide';
import {
  DEFAULT_APP_TAB,
  isAppTab,
  type AppTab,
} from '@/lib/app-tabs';
import { isValidBankId } from '@/data/bank-profiles';

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => {
    const tab = typeof search.tab === 'string' ? search.tab : undefined;
    const resolved: AppTab = isAppTab(tab) ? tab : DEFAULT_APP_TAB;

    const bankRaw = typeof search.bank === 'string' ? search.bank : undefined;
    const bank = bankRaw && isValidBankId(bankRaw) ? bankRaw : undefined;

    return { tab: resolved, bank };
  },
  component: HomePage,
});

function HomePage() {
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();

  const onPageChange = (page: AppTab) => {
    navigate({
      search: prev => ({
        tab: page,
        bank: page === 'banques' ? prev.bank : undefined,
      }),
    });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return <FinanceInterviewGuide activePage={tab} onPageChange={onPageChange} />;
}
