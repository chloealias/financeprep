import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { BlocCV } from "@/components/FinanceInterviewGuide";

export const Route = createFileRoute("/cv")({
  component: CVPage,
});

function CVPage() {
  const [openBloc, setOpenBloc] = useState<string | null>("cv");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100 pb-24">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-700 text-sm mb-6 hover:text-blue-900">
          <ArrowLeft className="w-4 h-4" /> Retour au guide
        </Link>
        <BlocCV openBloc={openBloc} setOpenBloc={setOpenBloc} />
      </div>
    </div>
  );
}
