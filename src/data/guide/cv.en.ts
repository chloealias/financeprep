import type { GuideCvContent } from "./cv.types";

export const guideCvEn: GuideCvContent = {
  checklist: [
    { id: "c1", text: "I know my interviewer's name and their bank" },
    { id: "c2", text: "I know why this bank / this office specifically" },
    { id: "c3", text: "I have a through-line (1 sentence that ties my whole path together)" },
    { id: "c4", text: "I have at least 1 concrete number per key experience" },
    { id: "c5", text: "My answer fits in under 2 minutes" },
    { id: "c6", text: "I end with 'that's why this role interests me'" },
  ],
  acts: [
    {
      num: "01",
      titre: "The origin",
      duree: "20 sec",
      desc: "Where do you come from? A through-line, not a chronological list. 1 anchor sentence: 'I've always been drawn to understanding businesses through their numbers.'",
      dark: false,
    },
    {
      num: "02",
      titre: "The pivot",
      duree: "60 sec",
      desc: "Your 2–3 most relevant experiences. For each: context (1 sentence) + action + quantified result. Only detail what matters for the role.",
      dark: false,
    },
    {
      num: "03",
      titre: "The target",
      duree: "20 sec",
      desc: "Why this bank, this office, this moment. Show you've done your homework. End on a conviction, not a question.",
      dark: true,
    },
  ],
  dealSteps: [
    {
      num: "01",
      label: "Context",
      desc: "Which company, which sector, what deal size (EV / equity value)",
    },
    {
      num: "02",
      label: "Strategic rationale",
      desc: "Why this deal? Synergies, consolidation, geographic expansion?",
    },
    {
      num: "03",
      label: "Financial structure",
      desc: "Financing mix: cash / stock / debt. Multiple paid (EV/EBITDA)",
    },
    {
      num: "04",
      label: "Your role",
      desc: "Your team, your concrete deliverables (model, due diligence, memo, data room)",
    },
    {
      num: "05",
      label: "Outcome",
      desc: "Deal outcome. Lesson learned. Why this deal showcases your skills.",
    },
  ],
  pitfalls: [
    "Reciting your CV chronologically with no through-line",
    "Speaking for more than 2 minutes without being invited to",
    "Mentioning experiences that are irrelevant to the role",
    "Not customizing for the target bank",
    "Ending without a transition to 'why this role'",
  ],
};
