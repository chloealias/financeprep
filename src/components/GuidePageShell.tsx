import type { ReactNode } from "react";
import { GuideSubLayout } from "@/components/GuideSubLayout";

type GuidePageShellProps = {
  tag: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function GuidePageShell({ tag, title, description, children }: GuidePageShellProps) {
  return (
    <GuideSubLayout>
      <header className="space-y-3 mb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{tag}</div>
        <h1 className="text-2xl sm:text-3xl font-serif text-foreground tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground font-light max-w-3xl">{description}</p>
        )}
      </header>
      <div className="bg-card rounded-2xl border-2 border-border shadow-card px-6 sm:px-8 py-8">
        {children}
      </div>
    </GuideSubLayout>
  );
}
