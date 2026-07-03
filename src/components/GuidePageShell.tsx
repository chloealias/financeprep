import type { ReactNode } from "react";
import { GuideSubLayout } from "@/components/GuideSubLayout";
import { PageHeader } from "@/components/ui/page-header";

type GuidePageShellProps = {
  tag: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function GuidePageShell({ tag, title, description, children }: GuidePageShellProps) {
  return (
    <GuideSubLayout>
      <PageHeader size="page" eyebrow={tag} title={title} description={description} />
      <div className="bg-card rounded-2xl border-2 border-border shadow-card px-6 sm:px-8 py-8">
        {children}
      </div>
    </GuideSubLayout>
  );
}
