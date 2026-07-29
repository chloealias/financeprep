import { useEffect, useState } from "react";
import { questions } from "@/data/questions";
import { exercises } from "@/data/exercises";
import { QuestionsTab } from "@/components/hub/QuestionsTab";
import { ExercisesTab } from "@/components/hub/ExercisesTab";
import { CaseStudiesPlaceholder } from "@/components/hub/CaseStudiesPlaceholder";
import { PracticeHub } from "@/components/hub/PracticeHub";
import {
  loadSolvedExerciseIds,
  markExerciseSolved,
} from "@/lib/exercise-storage";
import type { PracticeView } from "@/lib/route-search";
import type { QuestionRatings } from "@/lib/storage";

type PracticeTabProps = {
  view: PracticeView;
  onViewChange: (view: PracticeView) => void;
  ratings: QuestionRatings;
  onUpdateRating: (qid: string | number, value: number) => void;
  reviewList: string[];
  onToggleReview: (qid: string | number) => void;
  filtersKey?: number;
};

export function PracticeTab({
  view,
  onViewChange,
  ratings,
  onUpdateRating,
  reviewList,
  onToggleReview,
  filtersKey = 0,
}: PracticeTabProps) {
  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setSolvedIds(loadSolvedExerciseIds());
  }, []);

  const onSolved = (id: string) => {
    setSolvedIds(markExerciseSolved(id));
  };

  if (view === "hub") {
    return (
      <PracticeHub
        questionCount={questions.length}
        exerciseCount={exercises.length}
        solvedCount={solvedIds.size}
        onSelect={(v) => onViewChange(v)}
      />
    );
  }

  if (view === "questions") {
    return (
      <QuestionsTab
        ratings={ratings}
        onUpdateRating={onUpdateRating}
        reviewList={reviewList}
        onToggleReview={onToggleReview}
        filtersKey={filtersKey}
        onBackToHub={() => onViewChange("hub")}
      />
    );
  }

  if (view === "exercices") {
    return (
      <ExercisesTab
        solvedIds={solvedIds}
        onSolved={onSolved}
        onBack={() => onViewChange("hub")}
      />
    );
  }

  return <CaseStudiesPlaceholder onBack={() => onViewChange("hub")} />;
}
