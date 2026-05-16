import { createFileRoute } from '@tanstack/react-router';
import FinanceInterviewGuide from '@/components/FinanceInterviewGuide';
import {
  DEFAULT_APP_TAB,
  isAppTab,
  normalizeHubTab,
  type AppTab,
  type HubNavTab,
} from '@/lib/app-tabs';

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => {
    const tab = typeof search.tab === 'string' ? search.tab : undefined;
    const resolved: AppTab = isAppTab(tab) ? tab : DEFAULT_APP_TAB;
    return { tab: normalizeHubTab(resolved) };
  },
  component: HomePage,
});

function HomePage() {
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();

  const onPageChange = (page: HubNavTab) => {
    navigate({ search: { tab: page } });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return <FinanceInterviewGuide activePage={tab} onPageChange={onPageChange} />;
}
