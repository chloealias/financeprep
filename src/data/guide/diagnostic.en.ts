import type { GuideDiagnosticContent } from "./diagnostic.types";

export const guideDiagnosticEn: GuideDiagnosticContent = {
  technicalIntro:
    'Tick "I master this" only if you can explain the topic out loud, without notes, in under 2 minutes.',
  technicalSections: [
    {
      id: "modelisation-excel",
      title: "Modelling & Excel",
      items: [
        {
          id: "tech-excel-shortcuts",
          text: "Advanced keyboard shortcuts (F4, Ctrl+arrows, Ctrl+Shift+$...) without using the mouse",
        },
        {
          id: "tech-3-statements",
          text: "Building a 3-statement model that loops without circular-reference errors",
        },
        {
          id: "tech-sensitivity",
          text: "Two-variable sensitivity table without VBA",
        },
        {
          id: "tech-model-format",
          text: "Professional model formatting",
        },
      ],
    },
    {
      id: "valorisation-lbo",
      title: "Valuation & LBO",
      items: [
        {
          id: "tech-ev-eqv",
          text: "EV → Equity Value bridge (full bridge)",
        },
        {
          id: "tech-dcf",
          text: "Building a DCF",
        },
        {
          id: "tech-lbo",
          text: "LBO mechanics (sources & uses, leverage, IRR)",
        },
        {
          id: "tech-multiples",
          text: "Valuation multiples",
        },
        {
          id: "tech-sellside-process",
          text: "Structuring a sell-side sale process",
        },
      ],
    },
    {
      id: "comptabilite-cas",
      title: "Accounting & case studies",
      items: [
        {
          id: "tech-goodwill",
          text: "Impact of a goodwill impairment on the 3 financial statements",
        },
        {
          id: "tech-bfr",
          text: "Working-capital variation",
        },
        {
          id: "tech-ifrs",
          text: "Basic IFRS adjustments",
        },
      ],
    },
    {
      id: "industry-knowledge",
      title: "Industry knowledge",
      items: [
        {
          id: "tech-deals",
          text: "3 landmark M&A deals in your target sector",
        },
        {
          id: "tech-competitive",
          text: "Competitive positioning",
        },
        {
          id: "tech-sellside-deal",
          text: "Mastery of a sell-side deal",
        },
        {
          id: "tech-renault",
          text: "“If you had to value Renault, how would you do it concretely?”",
        },
        {
          id: "tech-macro",
          text: "Macro dynamics",
        },
      ],
    },
  ],
  fitPresentation: [
    { id: "fit-presente", text: "Tell me about yourself" },
    {
      id: "fit-pourquoi-ma",
      text: "Why M&A / TS / PE? in under 90 seconds, without hesitation",
    },
    {
      id: "fit-analyste",
      text: "Concretely, what is expected of an analyst?",
    },
    {
      id: "fit-banque",
      text: "Why this bank in particular? with a genuinely specific hook",
    },
    {
      id: "fit-experience",
      text: "What did you do in your previous experience?",
    },
    {
      id: "fit-pourquoi-vous",
      text: 'A clear answer to "why you and not another candidate?"',
    },
  ],
  fitStar: [
    { id: "star-leadership", text: "Leadership", href: "/pyramid" },
    { id: "star-echec", text: "Failure", href: "/pyramid" },
    { id: "star-equipe", text: "Teamwork", href: "/pyramid" },
    { id: "star-conflit", text: "Conflict management", href: "/pyramid" },
    { id: "star-chiffre", text: "Quantified result", href: "/pyramid" },
  ],
  networkingWeeklyGoals: [
    "15 to 20 new targeted LinkedIn contacts",
    "5 to 10 call requests sent",
    "2 to 3 networking calls actually secured",
    "Systematic follow-up after a few days",
    "1 persona contacted per bank",
    "Channel diversification",
  ],
  networkingPrep: [
    {
      id: "net-30-contacts",
      text: "Written list of your next 30 priority contacts, each with their hook",
    },
    {
      id: "net-alumnis",
      text: "Alumni-hiring structures identified",
    },
  ],
  networkingHook:
    "The hook that makes the difference: a recent deal, a job change, a shared school or sector.",
  networkingTemplates: [
    {
      id: "tpl-linkedin",
      title: "Short LinkedIn message",
      body: "Hi [First name],\n\nI’m preparing for M&A interviews and your path at [Bank] particularly caught my eye ([hook: deal / school / sector]).\nWould you have 15 minutes for a quick chat in the coming weeks?\n\nThanks in advance,\n[First name]",
    },
    {
      id: "tpl-hr",
      title: "Email to HR",
      body: "Subject: M&A Analyst application — [Your school / profile]\n\nHi [First name],\n\nI’m [First Last], [short background]. I’m applying for an M&A analyst role at [Bank] and want to join a team known for [sector / geography].\nWould you be available for a short conversation about the recruiting process?\n\nBest regards,\n[First Last]",
    },
    {
      id: "tpl-senior",
      title: "Email to a senior profile",
      body: "Subject: Advice — M&A interview prep / [specific hook]\n\nHi [First name],\n\nYour recent work / deal on [precise topic] stood out to me. I’m preparing for M&A processes and would greatly value your advice on [concrete question], rather than a generic call.\nIf you have 10–15 minutes in the coming weeks, I’d be very grateful.\n\nKind regards,\n[First Last]",
    },
  ],
  diagnosticNone: "Assess the technical topics to get your diagnostic.",
  diagnosticReady:
    "you are broadly ready; a few details remain to refine",
  diagnosticPriority:
    "clear priority areas emerge — work on them before recruiting season picks up",
  diagnosticCoaching:
    "structured coaching would make a real difference over the coming weeks",
};
