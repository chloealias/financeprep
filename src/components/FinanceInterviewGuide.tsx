import { useState, useEffect } from "react";
import { QUESTION_CATEGORIES, getCategoryLabel } from "@/lib/categories";
import { questions } from "@/data/questions";
import type { AppTab } from "@/lib/app-tabs";
import {
  clearRatings,
  loadRatings,
  loadRatingsWithLegacyMigration,
  loadReviewList,
  questionIdKey,
  saveRatings,
  saveReviewList,
  type QuestionRatings,
} from "@/lib/storage";
import { isOnboardingDone } from "@/lib/onboarding";
import { OnboardingDialog } from "@/components/onboarding/OnboardingDialog";
import { ProgressPage } from "@/components/interview/ProgressPage";
import { AppHubLayout } from "@/components/hub/AppHubLayout";
import { HubTabPanels } from "@/components/hub/HubTabPanels";
import { BankHubPage } from "@/components/banks/BankHubPage";
import { SectorsTab } from "@/components/sectors/SectorsTab";
import { GuideTab } from "@/components/hub/GuideTab";
import { ConceptsTab } from "@/components/hub/ConceptsTab";
import { QuestionsTab } from "@/components/hub/QuestionsTab";
import { AppSplash } from "@/components/AppSplash";
import { useAppSplash } from "@/hooks/useAppSplash";
import { StreakBanner } from "@/components/hub/StreakBanner";

type FinanceInterviewGuideProps = {
  activePage: AppTab;
  onPageChange: (page: AppTab) => void;
};

const FinanceInterviewGuide = ({ activePage, onPageChange }: FinanceInterviewGuideProps) => {
  const [ratings, setRatings] = useState<QuestionRatings>({});
  const [reviewList, setReviewList] = useState<string[]>([]);
  const [questionsFiltersKey, setQuestionsFiltersKey] = useState(0);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { showSplash } = useAppSplash(mounted);

  useEffect(() => {
    setMounted(true);
    setReviewList(loadReviewList());
    void loadRatingsWithLegacyMigration().then((migrated) => {
      if (Object.keys(migrated).length > 0) {
        setRatings(migrated);
        return;
      }
      setRatings(loadRatings());
    });
    if (!isOnboardingDone()) {
      setOnboardingOpen(true);
    }
  }, []);

  const toggleReview = (qid: string | number) => {
    const key = questionIdKey(qid);
    setReviewList((prev) => {
      const next = prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key];
      saveReviewList(next);
      return next;
    });
  };

  const updateRating = (qid: string | number, value: number) => {
    const key = questionIdKey(qid);
    const next = { ...ratings, [key]: value };
    if (value === 0) delete next[key];
    setRatings(next);
    saveRatings(next);
  };

  const resetRatings = () => {
    setRatings({});
    clearRatings();
  };

  const categories = QUESTION_CATEGORIES;
  const hasProgress = Object.keys(ratings).some((k) => ratings[k] > 0);

  if (showSplash) {
    return <AppSplash />;
  }

  return (
    <>
      <OnboardingDialog
        open={onboardingOpen}
        onComplete={() => setOnboardingOpen(false)}
      />
      <AppHubLayout activePage={activePage} onPageChange={onPageChange} hasProgress={hasProgress}>
        <StreakBanner />
        <HubTabPanels
          activePage={activePage}
          panels={{
            questions: (
              <QuestionsTab
                ratings={ratings}
                onUpdateRating={updateRating}
                reviewList={reviewList}
                onToggleReview={toggleReview}
                filtersKey={questionsFiltersKey}
              />
            ),
            concepts: <ConceptsTab />,
            guide: <GuideTab />,
            secteurs: <SectorsTab />,
            banques: <BankHubPage />,
            progress: (
              <ProgressPage
                questions={questions}
                ratings={ratings}
                categories={categories}
                getCategoryLabel={getCategoryLabel}
                onReset={resetRatings}
                onPageChange={onPageChange}
                onQuestionsFiltersChange={() => setQuestionsFiltersKey((k) => k + 1)}
              />
            ),
          }}
        />
      </AppHubLayout>
    </>
  );
};

export default FinanceInterviewGuide;
