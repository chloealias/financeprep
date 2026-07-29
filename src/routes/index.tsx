import { createFileRoute } from "@tanstack/react-router";
import FinanceInterviewGuide from "@/components/FinanceInterviewGuide";
import type { AppTab } from "@/lib/app-tabs";
import {
  validateHomeSearch,
  type HomeSearch,
  type PracticeView,
} from "@/lib/route-search";
import { smoothScrollTo } from "@/lib/scroll";

export const Route = createFileRoute("/")({
  validateSearch: validateHomeSearch,
  component: HomePage,
});

function HomePage() {
  const { tab, view } = Route.useSearch();
  const navigate = Route.useNavigate();
  const practiceView: PracticeView = view ?? "hub";

  const onPageChange = (page: AppTab) => {
    navigate({
      search: (prev: HomeSearch) => ({
        tab: page,
        bank: page === "banques" ? prev.bank : undefined,
        sector: undefined,
        view: undefined,
      }),
    });
    if (typeof window !== "undefined") {
      smoothScrollTo(0);
    }
  };

  const onPracticeViewChange = (next: PracticeView) => {
    navigate({
      search: (prev: HomeSearch) => ({
        ...prev,
        tab: "questions",
        view: next === "hub" ? undefined : next,
      }),
    });
    if (typeof window !== "undefined") {
      smoothScrollTo(0);
    }
  };

  return (
    <FinanceInterviewGuide
      activePage={tab}
      practiceView={practiceView}
      onPageChange={onPageChange}
      onPracticeViewChange={onPracticeViewChange}
    />
  );
}
