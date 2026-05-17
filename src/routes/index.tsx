import { createFileRoute } from "@tanstack/react-router";
import FinanceInterviewGuide from "@/components/FinanceInterviewGuide";
import type { AppTab } from "@/lib/app-tabs";
import { validateHomeSearch } from "@/lib/route-search";

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
        sector: page === "secteurs" ? prev.sector : undefined,
      }),
    });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return <FinanceInterviewGuide activePage={tab} onPageChange={onPageChange} />;
}
