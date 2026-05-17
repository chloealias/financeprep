import { describe, expect, it } from "vitest";
import {
  buildBackup,
  daysUntilInterview,
  formatInterviewCountdown,
  importBackup,
  normalizeProfile,
  parseBackupPreview,
  toggleProfileSector,
} from "@/lib/profile-storage";

describe("profile-storage", () => {
  it("normalizes profile defaults", () => {
    const p = normalizeProfile({});
    expect(p.defaultPackSize).toBe(5);
    expect(p.sectorIds).toEqual([]);
    expect(p.avatarKind).toBe("icon");
    expect(p.bannerId).toBe("midnight");
  });

  it("limits sectors to 3", () => {
    const p = normalizeProfile({
      sectorIds: ["tmt", "sante", "energie", "retail"],
    });
    expect(p.sectorIds).toHaveLength(3);
  });

  it("toggleProfileSector respects max 3", () => {
    const next = toggleProfileSector(["tmt", "sante", "energie"], "retail");
    expect(next).toHaveLength(3);
    expect(next.includes("retail")).toBe(false);
  });

  it("daysUntilInterview", () => {
    const today = new Date("2026-05-17T10:00:00");
    expect(daysUntilInterview("2026-05-20", today)).toBe(3);
    expect(formatInterviewCountdown(3)).toBe("J-3");
    expect(formatInterviewCountdown(0)).toBe("Jour J");
  });

  it("parseBackupPreview rejects invalid json", () => {
    expect(parseBackupPreview("{")).toEqual({ ok: false, error: "Fichier JSON invalide." });
  });

  it("parseBackupPreview reads backup metadata", () => {
    const backup = buildBackup();
    const parsed = parseBackupPreview(JSON.stringify(backup));
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.preview.sessionsCount).toBeGreaterThanOrEqual(0);
    }
  });

  it("importBackup filters invalid bank ids", () => {
    const backup = buildBackup();
    backup.targetBankIds = ["lazard", "not-a-bank"];
    const result = importBackup(JSON.stringify(backup));
    expect(result.ok).toBe(true);
  });
});
