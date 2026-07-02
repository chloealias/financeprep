import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { TargetBankQuickPick } from "@/components/profile/TargetBankQuickPick";

describe("TargetBankQuickPick", () => {
  it("does not render per-bank navigation links", () => {
    const html = renderToStaticMarkup(
      createElement(TargetBankQuickPick, {
        targetIds: [],
        onChange: () => {},
        onViewAll: () => {},
      }),
    );
    expect(html).not.toContain("tab=banques&amp;bank=");
    expect(html).toContain("Voir toutes les banques (action distincte)");
  });
});
