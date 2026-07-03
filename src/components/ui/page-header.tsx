import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  size?: "display" | "page";
  className?: string;
  showEyebrowLine?: boolean;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  size = "display",
  className,
  showEyebrowLine = size === "display",
}: PageHeaderProps) {
  const TitleTag = size === "display" ? "h2" : "h1";

  return (
    <header className={cn("mb-10", size === "page" && "mb-8 space-y-3", className)}>
      {eyebrow && (
        <div className={cn("flex items-center gap-3", size === "display" ? "mb-3" : "")}>
          {showEyebrowLine && <div className="h-px w-12 bg-primary" />}
          <span className={cn("type-eyebrow", !showEyebrowLine && "type-label text-primary")}>
            {eyebrow}
          </span>
        </div>
      )}
      <TitleTag
        className={cn(size === "display" ? "type-display" : "type-page-title", !eyebrow && "mt-0")}
      >
        {title}
      </TitleTag>
      {description && (
        <p className={cn("type-body-muted max-w-3xl", size === "display" ? "mt-3" : "")}>
          {description}
        </p>
      )}
    </header>
  );
}
