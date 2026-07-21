import { describe, expect, it } from "vitest";
import { t, createTranslator } from "@/lib/i18n/t";
import { normalizeLocale, DEFAULT_LOCALE } from "@/lib/i18n/types";
import { fr } from "@/lib/i18n/messages/fr";
import { en } from "@/lib/i18n/messages/en";
import {
  formatInterviewCountdown,
  normalizeProfile,
  saveProfile,
  loadProfile,
} from "@/lib/profile-storage";

describe("i18n", () => {
  it("normalizeLocale falls back to fr", () => {
    expect(normalizeLocale(undefined)).toBe("fr");
    expect(normalizeLocale("de")).toBe("fr");
    expect(normalizeLocale("en")).toBe("en");
  });

  it("fr and en catalogs share the same keys", () => {
    const frKeys = Object.keys(fr).sort();
    const enKeys = Object.keys(en).sort();
    expect(enKeys).toEqual(frKeys);
  });

  it("t interpolates params and falls back to fr", () => {
    expect(t("en", "profile.nQuestions", { count: 5 })).toBe("5 questions");
    expect(t("fr", "profileStorage.countdown.today")).toBe("Jour J");
    expect(t("en", "profileStorage.countdown.today")).toBe("Interview day");
    // unknown key
    expect(t("en", "does.not.exist")).toBe("does.not.exist");
  });

  it("createTranslator binds locale", () => {
    const translate = createTranslator("en");
    expect(translate("hub.layout.nav.concepts")).toBe("Concepts");
  });

  it("normalizeProfile persists locale", () => {
    expect(normalizeProfile({}).locale).toBe(DEFAULT_LOCALE);
    expect(normalizeProfile({ locale: "en" }).locale).toBe("en");
    expect(normalizeProfile({ locale: "xx" }).locale).toBe("fr");
  });

  it("formatInterviewCountdown respects locale", () => {
    expect(formatInterviewCountdown(3, "fr")).toBe("J-3");
    expect(formatInterviewCountdown(0, "fr")).toBe("Jour J");
    expect(formatInterviewCountdown(3, "en")).toBe("D-3");
    expect(formatInterviewCountdown(0, "en")).toBe("Interview day");
  });

  it("saveProfile persists locale en", () => {
    if (typeof localStorage === "undefined") return;
    saveProfile({ ...normalizeProfile({}), locale: "en" });
    expect(loadProfile().locale).toBe("en");
    saveProfile({ ...normalizeProfile({}), locale: "fr" });
  });
});
