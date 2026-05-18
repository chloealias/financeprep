import { createFileRoute } from "@tanstack/react-router";
import FinanceInterviewGuide from "@/components/FinanceInterviewGuide";
import type { AppTab } from "@/lib/app-tabs";
import { validateHomeSearch } from "@/lib/route-search";
import { smoothScrollTo } from "@/lib/scroll";

export const Route = createFileRoute("/")({
  validateSearch: validateHomeSearch,
  component: HomePage,
});

function HomePage() {
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();

  const onPageChange = (page: AppTab) => {
    navigate({
      search: (prev) => ({
        tab: page,
        bank: page === "banques" ? prev.bank : undefined,
        sector: undefined,
      }),
    });
    if (typeof window !== "undefined") {
      smoothScrollTo(0);
    }
  };

  return <FinanceInterviewGuide activePage={tab} onPageChange={onPageChange} />;
}
