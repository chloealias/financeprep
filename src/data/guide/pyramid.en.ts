import type { GuidePyramidContent } from "./pyramid.types";

export const guidePyramidEn: GuidePyramidContent = {
  intro:
    "These two frameworks structure all your answers — technical AND behavioural. Master them and you will sound twice as clear as other candidates at the same knowledge level.",
  svg: {
    conclusion: "CONCLUSION",
    conclusionHint: "First",
    arguments: "KEY ARGUMENTS",
    argumentsHint: "2–3 main reasons",
    evidence: "EVIDENCE & EXAMPLES",
    evidenceHint: "Numbers, concrete cases, anecdotes",
  },
  goldenRuleBody:
    "Never start with context. Start with the answer. Context comes next to justify it.",
  withoutExample:
    '"I\'ve always been interested in numbers... In high school I liked maths... In undergrad I took an accounting class..."',
  withExample: {
    conclusionLabel: "Conclusion —",
    conclusion:
      "« Finance lets me understand how companies create value — that's what excites me. »",
    argumentsLabel: "Arguments —",
    arguments: "« First… Second… »",
    evidenceLabel: "Evidence —",
    evidence: "« That's notably what I did at X where… »",
  },
  starCards: [
    {
      letter: "S",
      label: "Situation",
      quoi: "The context in 1–2 sentences max",
      erreur: "Too long — 30 sec max",
      exemple:
        "I was on an M&A internship at X, during the due diligence phase of a retail acquisition",
    },
    {
      letter: "T",
      label: "Task",
      quoi: "Your specific role and objective",
      erreur: "Confusing Task and Action — the task is WHAT you had to do, not how",
      exemple:
        "I was responsible for reviewing historical NWC and normalizing EBITDA",
    },
    {
      letter: "A",
      label: "Action",
      quoi: "WHAT YOU did — always 'I', never 'we'",
      erreur: "Using 'we' — the interviewer wants YOUR personal contribution",
      exemple:
        "I built a monthly NWC model over 3 years and identified 2 non-recurring adjustments representing €800k of normalized EBITDA",
    },
    {
      letter: "R",
      label: "Result",
      quoi: "Measurable impact. Always quantify if possible.",
      erreur: "Ending without a result — 'I did X' without saying what it produced",
      exemple:
        "The analysis was included in the acquisition memo. The client cut its offer by 5% as a result.",
    },
  ],
  matrix: [
    { q: "Why finance?", pyramid: true, star: false },
    { q: "Tell me about a challenge", pyramid: false, star: true },
    { q: "What's your value-add?", pyramid: true, star: false },
    { q: "Teamwork — example?", pyramid: false, star: true },
    { q: "Explain a concept to me", pyramid: true, star: false },
    { q: "A difficult decision?", pyramid: false, star: true },
    { q: "Why our bank?", pyramid: true, star: false },
  ],
  timeBuyingIntro:
    "A 3-second silence feels long in an interview. These reflexes buy time without losing credibility — combined with Pyramid (conclusion first).",
  usefulPhrases: [
    "« If I understand correctly, you're asking… »",
    "« I'll structure my answer in three points. »",
    "« In short: [conclusion]. Detail: … »",
    "« May I take a few seconds to organise my thoughts? »",
    "« On the numbers, the order of magnitude is… » (before the exact calc)",
  ],
  avoidPhrases: [
    "Total silence without announcing structure",
    "Making up a number to 'fill the gap'",
    "« I don't know » without offering a path forward",
    "Diving into detail before the conclusion",
  ],
  timeBuyingRule:
    "Rule: even under pressure, give a conclusion in 10 seconds — then go deeper or ask for a clarification.",
};
