import { createFileRoute } from "@tanstack/react-router";
import FinanceInterviewGuide from "@/components/FinanceInterviewGuide";

export const Route = createFileRoute("/")({
  component: FinanceInterviewGuide,
});
