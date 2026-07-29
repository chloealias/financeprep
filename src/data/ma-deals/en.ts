import type { MaDeal } from "./types";

export const MA_DEALS_RAW: Omit<MaDeal, "sectorId">[] = [
  {
    id: "d01",
    title: "Sanofi / Opella → CD&R",
    dates: "Announced Oct 2024 — SPA Feb 2025 — Closing 30 Apr 2025",
    type: "LBO",
    secteur: "Healthcare / Consumer Healthcare",
    headlineEv: "~€16bn",
    banks: [
      "Rothschild & Co",
      "Bank of America",
      "BNP Paribas",
      "Goldman Sachs",
      "Morgan Stanley",
      "Lazard",
      "Citigroup",
      "Barclays",
      "Société Générale",
      "HSBC",
    ],
    parties: [
      {
        label: "Target",
        text: "Opella (Sanofi Consumer Healthcare — Doliprane, Allegra, Dulcolax). 11,000 employees, 100 countries, 13 industrial sites. 3rd global OTC/VMS player.",
      },
      {
        label: "Acquirer",
        text: "Clayton, Dubilier & Rice (CD&R) — US PE, acquires 50% controlling stake.",
      },
      {
        label: "Seller",
        text: "Sanofi — retains 48.2%. Bpifrance takes 1.8% + a board seat.",
      },
    ],
    valorisation: [
      { label: "Enterprise Value", value: "~€16bn" },
      { label: "Net cash received by Sanofi", value: "~€10bn" },
      { label: "Multiple", value: "~14x estimated 2024 EBITDA" },
    ],
    financing:
      "€8.65bn of debt — Term Loan B €5.45bn (EUR Euribor+350bps and USD SOFR+325bps tranches), Bridge to High Yield bonds €2bn, RCF €1.2bn.",
    advisors: {
      sellSide: [
        "Rothschild & Co (M&A lead)",
        "Bank of America",
        "BNP Paribas",
        "Goldman Sachs",
        "Morgan Stanley",
      ],
      buySide: ["Lazard (M&A)", "Citigroup (M&A + financing)"],
      other: [
        {
          label: "Debt coordinators",
          banks: [
            "Citigroup",
            "Goldman Sachs",
            "Barclays",
            "BNP Paribas",
            "Morgan Stanley",
            "Société Générale",
            "HSBC",
          ],
        },
      ],
    },
    interests: [
      {
        side: "Sanofi",
        text: "“Play to Win” strategy (2019) — become a pure-play biopharma (immunology, oncology, rare diseases, vaccines). The ~€10bn funds biotech acquisitions (Vigil Neuroscience, Blueprint Medicines in 2025) and share buybacks (including €3bn of L'Oréal). Follows J&J (Kenvue), GSK (Haleon), Pfizer.",
      },
      {
        side: "CD&R",
        text: "Opella = iconic brands with pricing power in an OTC/VMS market with structural growth (aging, self-medication). CD&R specialized in industrial carve-outs, France track record: Rexel, Spie, Socotec.",
      },
    ],
    contexte:
      "Doliprane seen as a healthcare sovereignty asset. Job-protection and production-site clauses negotiated with the French government. Bpifrance enters as guarantor.",
    pointEntretien:
      "Explain carve-out + LBO financing mechanics. Know Rothschild & Co’s sell-side lead role. Understand the tension between financial logic and political sovereignty issues.",
    ftUrl: "https://www.ft.com/content/sanofi-opella-cdr-deal",
    kind: "deal",
  },
  {
    id: "d02",
    title: "Altice France — €24bn debt restructuring",
    dates: "Agreement Feb 2025 — Court Aug 2025 — Closing 1 Oct 2025",
    type: "Restructuring",
    secteur: "TMT / Telecom",
    headlineEv: "€24bn of debt",
    banks: ["Lazard", "Rothschild & Co", "Houlihan Lokey"],
    parties: [
      {
        label: "Entity",
        text: "Altice France S.A. + Altice France Holding S.A. (Patrick Drahi). SFR = 2nd telecom operator in France, 25M+ customers.",
      },
      {
        label: "Pre-restructuring debt",
        text: "~€24bn (of which ~€19bn secured at opco, ~€4.4bn holdco)",
      },
    ],
    valorisation: [
      { label: "Reduction", value: "~€8.6bn eliminated → net debt ~€15.5bn" },
      { label: "Pro forma leverage", value: "< 4x EBITDA (vs ~6x before)" },
      { label: "Annual savings", value: "~€400m of interest expense" },
      { label: "Maturities", value: "Extended from 2025 to 2028-2033" },
    ],
    financing:
      "AF SA (secured) creditors: 7.60 pts cash + 2.50 pts early bird + ~77 cts new debt (maturity +2.75 years, coupon +137.5 bps) + 31% equity. AF Holding creditors: 2.50 pts cash + 2.50 pts early bird + 20 cts holdco debt (9.125%, Jan 2033) + 14% equity + CVR. Post-deal: Drahi retains 55%, creditors 45%.",
    advisors: {
      sellSide: ["Lazard (restructuring)", "Mayer Brown / Ropes & Gray / White & Case (legal)"],
      other: [
        {
          label: "Secured creditors (~200 institutions, ~€19bn)",
          banks: ["Rothschild & Co (restructuring)", "Gibson Dunn (legal)"],
        },
        {
          label: "Holdco creditors (~€4.4bn)",
          banks: ["Houlihan Lokey (restructuring)", "Milbank / Wilkie Farr (legal)"],
        },
        {
          label: "Key hedge funds",
          banks: [
            "Elliott",
            "Anchorage",
            "Sona",
            "Sculptor (secured)",
            "Arini (holdco)",
            "Pimco",
            "BlackRock",
            "Fidelity",
          ],
        },
      ],
    },
    interests: [
      {
        side: "Altice / Drahi",
        text: "Avoid default and loss of control. Retain 55% and operational control of SFR. Free up cash flow to invest in the fibre/5G network.",
      },
      {
        side: "Creditors",
        text: "Avoid chaotic liquidation. Secured creditors recover most of their claim (77 cts debt + equity kicker). Cooperation agreement among 200 institutions (first of this scale in Europe, initiated by Rothschild & Co).",
      },
    ],
    contexte:
      "Case study of an overlevered telecom LBO (Numericable, SFR, Portugal Telecom acquisitions). Drahi tried aggressive US-style tactics (asset drop-downs) but French law protected creditors. Largest European restructuring in 2025.",
    pointEntretien:
      "Distinguish Lazard (debtor) vs Rothschild & Co (creditors) vs Houlihan Lokey (holdco). Explain debt-for-equity swap and cooperation agreement. Essential restructuring case.",
    ftUrl: "https://www.ft.com/content/altice-france-restructuring",
    kind: "deal",
  },
  {
    id: "d03",
    title: "Goldman Sachs Alternatives / Mace Consult",
    dates: "Announced Jul 2025 — Closing completed 5 March 2026",
    type: "Carve-out",
    secteur: "Industrials / Construction & Infrastructure",
    headlineEv: "EV undisclosed (~$1bn rev.)",
    banks: ["UBS", "Lazard", "Jefferies"],
    parties: [
      {
        label: "Target",
        text: "Mace Consult (Mace Group’s consulting arm — programme management, cost consultancy). 5,200+ employees, 6 continents. Projects: Hudson Tunnel (NYC), Qiddiya (Saudi Arabia), New Hospitals Programme (UK).",
      },
      {
        label: "Acquirer",
        text: "Goldman Sachs Alternatives (Private Equity) — majority stake (% not publicly disclosed).",
      },
      {
        label: "Seller",
        text: "Mace Group (shareholders retain minority + board seats).",
      },
    ],
    valorisation: [
      { label: "Revenue", value: "£687m in 2024, ~$1bn in 2025" },
      { label: "EV", value: "Not publicly disclosed" },
    ],
    advisors: {
      sellSide: ["UBS (M&A)", "Linklaters (legal)"],
      buySide: ["Lazard (M&A + financing)", "Jefferies (M&A)", "White & Case (legal)"],
    },
    interests: [
      {
        side: "Goldman Sachs",
        text: "Exposure to the global infra boom (energy transition, data centers, transport). Infra consulting = high organic-growth market with recurring revenues. GS Alternatives (>$625bn AUM) targets consolidation via bolt-on acquisitions (Turton Bond in the US as of Aug 2025).",
      },
      {
        side: "Mace",
        text: "Capital for expansion (North America, digital). Mace Construct (UK contracting) develops independently with a clean balance sheet. Remove advisory vs construction conflicts of interest.",
      },
    ],
    pointEntretien:
      "Cite in interviews at GS or Lazard. Shows GS is not only M&A/trading — the PE arm is a major PE player. Understand why a pure consultant is worth more than a mixed conglomerate (consulting multiples > contracting).",
    ftUrl: "https://www.ft.com/content/goldman-sachs-mace-consult",
    kind: "deal",
  },
  {
    id: "d04",
    title: "UniCredit / Commerzbank",
    dates: "9% stake Sept 2024 — Offer published 5 May 2026 — Acceptance extended to 3 Jul 2026 — Final result 8 Jul 2026",
    type: "OPA",
    secteur: "FIG — Banks",
    headlineEv: "~€43bn (CBK market cap)",
    banks: ["Goldman Sachs", "Rothschild & Co", "UBS", "JPMorgan"],
    parties: [
      {
        label: "Target",
        text: "Commerzbank AG (2nd German bank, ~40,000 employees).",
      },
      {
        label: "Acquirer",
        text: "UniCredit S.p.A. (CEO : Andrea Orcel). Stake actuel ~28-30% (26% actions + ~4% total return swaps).",
      },
      {
        label: "Exchange ratio",
        text: "0.485 UniCredit share per Commerzbank share. Implied price ~€31.07/share (vs ~€36 price in May 2026 → ~14% discount).",
      },
      {
        label: "Calendrier",
        text: "Regular period: 5 May — 16 June 2026. Legal extension: 20 June — 3 Jul 2026. Final result published 8 Jul 2026.",
      },
      {
        label: "Offer outcome",
        text: "17.60% of Commerzbank shares tendered into the offer (Jul 2026). Very low free-float participation (~1% excluding derivative counterparties). German state (~12%) rejected the offer.",
      },
    ],
    valorisation: [
      { label: "Estimated synergies (UniCredit)", value: "~€1.1bn/year by 2030" },
      {
        label: "German state",
        value: "Holds ~12% of Commerzbank (leftover from 2008 bailout), opposed to the takeover",
      },
    ],
    advisors: {
      sellSide: [
        "Goldman Sachs (Commerzbank defense)",
        "UBS (conseil supervisory board Commerzbank)",
      ],
      other: [
        { label: "German state (~12%)", banks: ["Rothschild & Co"] },
        { label: "Bookrunner partial disposal Sept 2024", banks: ["JPMorgan"] },
      ],
    },
    interests: [
      {
        side: "UniCredit",
        text: "Pan-European banking champion. Commerzbank complements HypoVereinsbank (UC’s German subsidiary). >20% returns even without full control. P/Book discount vs peers.",
      },
      {
        side: "Commerzbank",
        text: 'ROE target 17% in 2028, 21% in 2030 (standalone "Momentum 2030" strategy). UC offer lacks detail on HVB integration and undervalues the bank. German state fears losing the Mittelstand bank.',
      },
    ],
    contexte:
      "Commerzbank CEO: Bettina Orlopp. Hostile/exchange offer. Strong German political resistance. Offer failed to convince free float (~14% discount vs price); UniCredit retains ~28–30% + derivatives (~42% total economic exposure). ECB regulatory closing expected 2027. Goldman Sachs advises Commerzbank’s defense; Rothschild advises the German state on its residual stake.",
    pointEntretien:
      "Essential in European FIG or M&A. Explain: progressive offer via total return swaps, 30% threshold under German law, relative offer failure (17.60% tendered), why cross-border bank mergers fail in Europe (no banking union, political resistance, CET1 requirements).",
    ftUrl: "https://www.ft.com/content/unicredit-commerzbank",
    kind: "deal",
  },
  {
    id: "d05",
    title: "Worldline — Asset disposal programme",
    dates: "Programme launched 2024 — MeTS closed 1 June 2026, North America (Bambora) closed 2 March 2026",
    type: "Cessions",
    secteur: "TMT / Fintech / Payments",
    headlineEv: "MeTS ~€410m EV",
    banks: ["Jefferies"],
    parties: [
      {
        label: "Entity",
        text: "Worldline SA (Euronext: WLN). European payments leader.",
      },
      {
        label: "Financial context",
        text: "Repeated profit warnings 2023-2024. Share price from ~€80 (2021) to ~€2.50 (2025). €4.7bn goodwill impairment in 2025. S&P downgrade to BB. Net debt ~€2.1bn.",
      },
      {
        label: "Principales cessions",
        text: "MeTS → Magellan Partners Group (~€410m EV, closing 1 June 2026); Worldline North America (Bambora) → Shift4 (~€70m EV, closing 2 March 2026); Cetrel (Luxembourg), PaymentIQ, MS India, other IFRS 5 assets.",
      },
    ],
    valorisation: [
      {
        label: "Impact total",
        value: "~€900m revenue deconsolidated, ~€200m EBITDA, ~30% of headcount",
      },
    ],
    advisors: {
      sellSide: ["Jefferies (sole financial advisor)", "Norton Rose (legal)"],
    },
    interests: [
      {
        side: "Worldline",
        text: 'Radical refocus on the European core (acquiring, processing). After failed acquisitions (Ingenico, SIX Payment Services, Equens), a heterogeneous, low-synergy portfolio. Cut debt, simplify the structure, restore credibility. New CEO Pierre-Antoine Vacheron executes the "Power24" plan.',
      },
      {
        side: "Acheteurs",
        text: "Shift4 gains an entry into European payment processing. Assets with strong local positions despite group distress.",
      },
    ],
    pointEntretien:
      'Answer "when does M&A destroy value?" or "example of failed inorganic growth". Understand the link falling share price → credit downgrade → disposals to survive. Parallel with Atos.',
    ftUrl: "https://www.ft.com/content/worldline-restructuring",
    kind: "deal",
  },
  {
    id: "d06",
    title: "Kering Beauté / Creed → L'Oréal",
    dates: "Announced Oct 2025 — Closing completed 31 March 2026",
    type: "M&A",
    secteur: "Retail / Luxury / FMCG",
    headlineEv: "€4bn cash",
    banks: ["Evercore", "Centerview Partners", "Bank of America", "Rothschild & Co"],
    parties: [
      {
        label: "Target",
        text: "Kering Beauté (including Creed, luxury fragrance house) + 50-year licenses for Bottega Veneta, Balenciaga, and Gucci (when Coty license expires in 2028).",
      },
      {
        label: "Acquirer",
        text: "L'Oréal (largest acquisition in its history).",
      },
      {
        label: "Seller",
        text: "Kering (CEO: Luca de Meo, joined Sept 2025).",
      },
    ],
    valorisation: [
      { label: "Price", value: "€4bn cash (= ~$4.66bn)" },
      {
        label: "Multiple",
        value: "~12.4x revenue (Kering Beauté: ~€323m 2024 revenue, of which Creed in strong growth)",
      },
    ],
    advisors: {
      sellSide: ["Evercore", "Centerview Partners"],
      buySide: ["Bank of America", "Rothschild & Co"],
    },
    interests: [
      {
        side: "L'Oréal",
        text: "Creed = one of the most dynamic ultra-luxury fragrance brands. Access to Gucci/Balenciaga/Bottega licenses for 50 years → major strategic move vs Coty and Estée Lauder. Complements YSL (license acquired in 2008). Fragrances grow double-digit at L'Oréal.",
      },
      {
        side: "Kering",
        text: 'Cut net debt (€9.5bn mid-2025). Kering had bought Creed for €3.5bn in 2023 — sells the whole for €4bn two years later. Bernstein analyst: "bitter but necessary". De Meo refocuses Kering on fashion (Gucci struggling, -14% in Q3 2025).',
      },
    ],
    contexte:
      "Largest L'Oréal acquisition (116 years of history). Parallel Kering/L'Oréal JV in wellness and longevity. Illustrates luxury consolidation: even the most powerful groups dispose of non-core assets under balance-sheet pressure.",
    pointEntretien:
      "Cite if applying to luxury/consumer M&A. Understand long license mechanics (50 years) and why the multiple is high (12x revenue): the brand pipeline (Gucci, Balenciaga) justifies the price, not current revenue.",
    ftUrl: "https://www.ft.com/content/kering-loreal-creed-beauty",
    kind: "deal",
  },
  {
    id: "d07",
    title: "Swisscom / Vodafone Italia → Fastweb",
    dates: "Announced March 2024 — Closing 31 Dec 2024",
    type: "M&A",
    secteur: "TMT / Telecom",
    headlineEv: "~€8bn",
    banks: ["Evercore", "Deutsche Bank", "JPMorgan", "UBS"],
    parties: [
      {
        label: "Target",
        text: "Vodafone Italia (mobile and fixed activities in Italy).",
      },
      {
        label: "Acquirer",
        text: "Swisscom (via its Fastweb subsidiary).",
      },
      {
        label: "Seller",
        text: "Vodafone Group.",
      },
    ],
    valorisation: [
      { label: "Price", value: "~€8bn (EV)" },
      { label: "Multiple", value: "~6x EBITDA" },
    ],
    advisors: {
      buySide: [
        "Evercore",
        "Deutsche Bank",
        "JPMorgan (M&A)",
        "Legance",
        "White & Case",
        "Sullivan & Cromwell (legal)",
        "PwC (due diligence)",
      ],
      sellSide: ["UBS (M&A)", "Slaughter and May", "ADVANT NCTM (legal)"],
    },
    interests: [
      {
        side: "Swisscom",
        text: "Create a convergent operator (fixed + mobile) of critical scale in Italy. Fastweb + Vodafone Italia = challenger vs TIM and Iliad. Network synergies (migrating Fastweb mobile customers onto the Vodafone network).",
      },
      {
        side: "Vodafone",
        text: "Deleveraging and portfolio simplification. Vodafone Group under activist pressure (Cevian Capital). Exit markets where Vodafone is subscale.",
      },
    ],
    contexte:
      "Accelerated European telecom consolidation (Vodafone also exits Spain, Hungary). Approved by the European Commission (Sept 2024), AGCOM (Nov 2024), Italian competition authority (Dec 2024).",
    pointEntretien:
      "Understand European telecom consolidation logic (too much fragmentation = underinvestment in networks). Know antitrust regulatory issues in telecom.",
    ftUrl: "https://www.ft.com/content/swisscom-vodafone-italy",
    kind: "deal",
  },
  {
    id: "d08",
    title: "Altice France — Disposal of metropolitan SFR",
    dates: "Joint offer 17 Apr 2026 — MOU signed 6 June 2026 — Definitive agreements expected H2 2026 — Closing targeted H2 2027",
    type: "Cessions",
    secteur: "TMT / Telecom",
    headlineEv: "€20.35bn",
    banks: ["Lazard"],
    parties: [
      {
        label: "Target",
        text: "Altice France’s telecom activities in metropolitan France (SFR, fibre network, 5G).",
      },
      {
        label: "Acquirers",
        text: "Consortium Bouygues Telecom (~42%), Free–Groupe iliad (~31%) and Orange (~27%) — exclusive joint offer.",
      },
    ],
    valorisation: [{ label: "EV", value: "€20.35bn (ex earn-out)" }],
    advisors: {
      sellSide: ["Lazard (probable)"],
    },
    interests: [
      {
        side: "Altice",
        text: "Direct follow-on from deal 2 (debt restructuring). Once delevered, sale of most telecom activities. Price reflects a distress discount vs pre-crisis valuation.",
      },
      {
        side: "Acquirers",
        text: "Consortium Bouygues (~42%), Free–iliad (~31%) and Orange (~27%) — MOU signed 6 June 2026. Bouygues takes ~52% of disposed revenues; indicative price split unchanged vs April offer. Closing subject to antitrust (France + EU).",
      },
    ],
    contexte:
      "Sequence: overlevered LBO → debt restructuring → asset disposal → residual deleveraging. See also deal d02 (Altice restructuring).",
    pointEntretien:
      "Show the full sequencing: overlevered LBO → debt restructuring → asset disposal → residual deleveraging. Linking Deal 2 + Deal 8 in interview demonstrates end-to-end understanding.",
    ftUrl: "https://www.ft.com/content/altice-sfr-sale-2026",
    kind: "deal",
  },
  {
    id: "d09",
    title: "Sanofi / Blueprint Medicines",
    dates: "Announced June 2025 — Closing completed 18 Jul 2025",
    type: "OPA",
    secteur: "Healthcare / Biopharma",
    headlineEv: "~$9,1-9,5 Md (equity value)",
    banks: ["Centerview Partners", "Jefferies"],
    parties: [
      {
        label: "Target",
        text: "Blueprint Medicines Corporation (Nasdaq: BPMC — US biotech, systemic mastocytosis).",
      },
      {
        label: "Acquirer",
        text: "Sanofi (via filiale Rothko Merger Sub).",
      },
    ],
    valorisation: [
      { label: "Price", value: "$129/share cash + CVR up to $6/share additional (milestones)" },
      {
        label: "Equity value",
        value: "~$9.1bn upfront; up to ~$9.5bn with CVR (BLU-808 milestones)",
      },
    ],
    advisors: {
      sellSide: ["Centerview Partners", "Jefferies"],
    },
    interests: [
      {
        side: "Sanofi",
        text: "Strengthen the immunology pipeline after the Opella disposal. Blueprint brings AYVAKIT (avapritinib) for mastocytosis. Fits the pure-play biopharma strategy.",
      },
      {
        side: "Blueprint",
        text: "Significant premium vs pre-announcement price. CVR offers additional upside.",
      },
    ],
    contexte:
      "Illustrates redeployment of the €10bn cash from the Opella disposal. Sanofi chains bolt-on acquisitions in 2025: Vigil Neuroscience (Alzheimer’s), Dren Bio ($600M + milestones), Blueprint.",
    pointEntretien:
      'Perfect to illustrate Sanofi’s strategic sequencing. Understand tender offer + CVR mechanics. Cite if asked for "a recent pharma deal example".',
    ftUrl: "https://www.ft.com/content/sanofi-blueprint-medicines",
    kind: "deal",
  },
  {
    id: "d10",
    title: "Vinci / Safeway Concessions (autoroutes Inde)",
    dates: "Announced March 2026 — Closing expected end-2026",
    type: "M&A",
    secteur: "Industrials / Infrastructure",
    headlineEv: "~1,6 Md$",
    banks: ["HSBC", "Macquarie"],
    parties: [
      {
        label: "Target",
        text: "Safeway Concessions — 9 highway concessions in India (~700 km, Andhra Pradesh and Gujarat).",
      },
      {
        label: "Acquirer",
        text: "Vinci.",
      },
      {
        label: "Seller",
        text: "Macquarie Asset Management.",
      },
    ],
    valorisation: [
      { label: "EV", value: "~150 Md roupies indiennes (~1,6 Md$)" },
      { label: "Multiple", value: "~15x EBITDA" },
    ],
    advisors: {
      buySide: ["HSBC (M&A — Vinci)"],
      sellSide: ["Macquarie Asset Management"],
    },
    interests: [
      {
        side: "Vinci",
        text: "Expansion into Indian highway concessions, a high-growth market (GDP +6-7%/year, massive infra investment). Vinci is already #1 global concessions player (highways, airports). Geographic diversification outside Europe.",
      },
      {
        side: "Macquarie",
        text: "Realization of a mature infra investment. Macquarie Asset Management is the world’s largest infra asset manager — classic portfolio rotation cycle (build, stabilize, exit).",
      },
    ],
    pointEntretien:
      "Cite if applying to Vinci, Macquarie, or infra/PE. Shows concessions dynamics: high multiples (15x) justified by long-term cash-flow visibility (tolls, 20-30 year contracts).",
    ftUrl: "https://www.ft.com/content/vinci-india-highways",
    kind: "deal",
  },
  {
    id: "d11",
    title: "Rheinmetall / European defense inorganic growth",
    dates: "Multiples acquisitions 2025-2026",
    type: "Tendance",
    secteur: "Industrials / Defense",
    headlineEv: "Tendance macro",
    banks: [],
    parties: [
      {
        label: "Context",
        text: "European defense budgets rising sharply post-Ukraine (>3.5% of German GDP by 2029, i.e. >€150bn/year). Rheinmetall (European leader in munitions and armored vehicles) is the main consolidator. Market cap ×5 in 3 years.",
      },
      {
        label: "Acquisition examples",
        text: "Expal Systems (munitions, Spain), Loc Performance (US), American Rheinmetall. Pipeline of defense-division carve-outs from diversified groups (e.g. Thales, BAE Systems).",
      },
    ],
    interests: [
      {
        side: "Buyers (Rheinmetall and peers)",
        text: "Increase production capacity to meet demand (orders estimated at 20× current annual production). Acquire software/AI technologies (e.g. Helsing, autonomous drones). Sovereignty: European governments favor local suppliers.",
      },
      {
        side: "PE / mid-market",
        text: "Active PE in suppliers and subcontractors (carve-outs, mid-market).",
      },
    ],
    contexte:
      "Essential macro M&A theme for 2026. Defense multiples rising (10-year order-book visibility).",
    pointEntretien:
      "Essential macro theme. Understand why defense multiples rise (10-year order-book visibility). Active PE in suppliers and subcontractors (carve-outs, mid-market). Mention if asked about 2026 M&A trends.",
    ftUrl: "https://www.ft.com/content/european-defence-ma-2025",
    advisors: {},
    kind: "trend",
  },
  {
    id: "d12",
    title: "ExxonMobil / Pioneer Natural Resources",
    dates: "Announced Oct 2023 — Closing May 2024",
    type: "M&A",
    secteur: "Energy / Oil & Gas",
    headlineEv: "~$60 Md",
    banks: [
      "Citigroup",
      "Centerview Partners",
      "Goldman Sachs",
      "Morgan Stanley",
      "Bank of America",
    ],
    parties: [
      {
        label: "Target",
        text: "Pioneer Natural Resources (Permian basin leader, Texas — US shale).",
      },
      {
        label: "Acquirer",
        text: "ExxonMobil.",
      },
    ],
    valorisation: [
      { label: "Price", value: "~$60bn (all-stock — share exchange)" },
      { label: "Multiple", value: "~6x EBITDA forward" },
      { label: "Synergies", value: "$2 Md/an via optimisation technique" },
    ],
    advisors: {
      buySide: ["Citigroup (lead)", "Centerview Partners"],
      sellSide: ["Goldman Sachs (lead)", "Morgan Stanley", "Bank of America"],
    },
    interests: [
      {
        side: "Exxon",
        text: "Consolidate the Permian position (the world’s most productive shale basin). Combined Pioneer + Exxon production = ~1.3M barrels/day in the Permian. Massive proved reserves at lower extraction cost.",
      },
      {
        side: "Pioneer",
        text: "Premium for shareholders. Pioneer alone lacked the scale to optimize extraction costs to Exxon’s level. All-stock deal = tax-efficient for Pioneer shareholders.",
      },
    ],
    contexte:
      "Largest energy acquisition in 20 years. Triggered an O&G consolidation wave in 2024-2025 (Chevron/Hess, ConocoPhillips/Marathon, Diamondback/Endeavor). ESG paradox: majors buy massive fossil reserves despite the energy transition.",
    pointEntretien:
      'Answer "why are oil companies making massive acquisitions if the world wants to decarbonize?". O&G assets have a 10-30 year life, medium-term demand remains high, majors generate cash to fund the transition. Rational logic on a 2035 horizon.',
    ftUrl: "https://www.ft.com/content/exxonmobil-pioneer-resources",
    kind: "deal",
  },
  {
    id: "d13",
    title: "Lineage Logistics — IPO (2024)",
    dates: "IPO juil. 2024",
    type: "IPO",
    secteur: "Real Estate / Logistics REIT",
    headlineEv: "~18 Md$ valorisation",
    banks: ["Morgan Stanley", "Goldman Sachs", "JPMorgan"],
    parties: [
      {
        label: "Entity",
        text: "Lineage Logistics — REIT specialized in cold storage warehouses. US leader.",
      },
    ],
    valorisation: [
      { label: "IPO valuation", value: "~18 Md$" },
      { label: "Context", value: "Largest global IPO in 2024" },
    ],
    interests: [
      {
        side: "Investisseurs",
        text: "Exposure to e-commerce logistics and the cold chain. Returns linked to long-term rents and occupancy.",
      },
    ],
    pointEntretien:
      "Illustrate REIT vs developer differences: FFO, NAV, cap rates. Cite MS/GS/JPM as bookrunners on an infra/logistics IPO.",
    advisors: {
      other: [
        {
          label: "Bookrunners IPO",
          banks: ["Morgan Stanley", "Goldman Sachs", "JPMorgan"],
        },
      ],
    },
    kind: "deal",
  },
  {
    id: "d14",
    title: "Microsoft / Activision Blizzard",
    dates: "Announced Jan 2022 — Closing Oct 2023",
    type: "M&A",
    secteur: "TMT / Gaming",
    headlineEv: "~69 Md$",
    banks: ["Goldman Sachs", "Morgan Stanley"],
    parties: [
      {
        label: "Target",
        text: "Activision Blizzard (Call of Duty, World of Warcraft, Candy Crush).",
      },
      { label: "Acquirer", text: "Microsoft." },
    ],
    valorisation: [
      { label: "Price", value: "~95$/action, ~69 Md$" },
      { label: "Multiple", value: "~10x revenue" },
    ],
    advisors: {
      buySide: ["Goldman Sachs"],
      sellSide: ["Morgan Stanley"],
    },
    interests: [
      {
        side: "Microsoft",
        text: "Gaming + cloud (Game Pass). FTC/EU regulatory battle for 2 years — tech antitrust case study.",
      },
    ],
    pointEntretien:
      "Largest gaming deal in history. Show that strategic value (ecosystem) can justify a high revenue multiple despite regulatory delay.",
    kind: "deal",
  },
  {
    id: "d15",
    title: "Chevron / Hess Corporation",
    dates: "Announced Oct 2023 — Closing Jul 2024",
    type: "M&A",
    secteur: "Energy / Oil & Gas",
    headlineEv: "~53 Md$",
    banks: ["Morgan Stanley", "Citigroup"],
    parties: [
      { label: "Target", text: "Hess Corporation (Guyana, Bakken)." },
      { label: "Acquirer", text: "Chevron." },
    ],
    valorisation: [
      { label: "Structure", value: "All-stock" },
      { label: "Multiple", value: "~10x EBITDA" },
    ],
    interests: [
      {
        side: "Chevron",
        text: "Access to Guyanese oil (Stabroek) — one of the world’s most coveted assets. US shale consolidation.",
      },
    ],
    advisors: {
      buySide: ["Morgan Stanley", "Citigroup"],
    },
    pointEntretien:
      "Complements Exxon/Pioneer: O&G M&A wave 2023-24. Discuss ESG paradox vs buying fossil reserves.",
    kind: "deal",
  },
  {
    id: "d16",
    title: "UBS / Credit Suisse (emergency merger)",
    dates: "Announced 19 March 2023 — Closing June 2023",
    type: "M&A",
    secteur: "FIG — Banks",
    headlineEv: "CHF 3 Md (~3,2 Md$)",
    banks: ["UBS"],
    parties: [
      {
        label: "Target",
        text: "Credit Suisse AG — 2nd Swiss bank, in a confidence crisis (deposit flight, share price collapse) after SVB’s failure.",
      },
      {
        label: "Acquirer",
        text: "UBS Group AG — rescue orchestrated by FINMA and the Swiss government.",
      },
      {
        label: "Exchange ratio",
        text: "1 UBS share for 22.48 Credit Suisse shares (~CHF 0.76/CS share, ~60% discount vs prior Friday).",
      },
    ],
    valorisation: [
      { label: "Price", value: "CHF 3bn in UBS shares" },
      {
        label: "AT1",
        value:
          "~CHF 16bn of AT1 instruments fully written off (no compensation to holders)",
      },
      {
        label: "Soutien public",
        value:
          "Federal guarantee up to CHF 9bn on asset losses; SNB liquidity up to CHF 100bn",
      },
    ],
    advisors: {
      other: [
        {
          label: "Transaction supported by",
          banks: ["FINMA", "Federal Department of Finance", "Banque nationale suisse"],
        },
      ],
    },
    interests: [
      {
        side: "UBS",
        text: "Avoid a systemic Swiss failure. Create the #1 global wealth manager (~$5,000bn AUM). Massive cost synergies but integration and culture risk.",
      },
      {
        side: "Credit Suisse / actionnaires",
        text: "Alternative to liquidation. Historic valuation discount. Total loss for AT1 holders (major European regulatory precedent).",
      },
    ],
    contexte:
      "Largest European bank merger since the 2008 crisis. Case study: regulation, bail-in, hybrid instruments, systemic rescue. In 2026 interviews: speak in the past for Credit Suisse, UBS strategy for the future.",
    pointEntretien:
      "Essential for UBS, Credit Suisse (legacy) and FIG. Explain FINMA, the AT1 write-off, and why a “negative control premium” was accepted for financial stability.",
    kind: "deal",
  },
  {
    id: "d17",
    title: "Automotive — EV consolidation and price pressure (Europe)",
    dates: "Tendance 2025-2026",
    type: "Tendance",
    secteur: "Automotive / Mobility & EV",
    headlineEv: "Tendance sectorielle",
    banks: [],
    parties: [
      {
        label: "Context",
        text: "Accelerated BEV transition but EV profitability under pressure (price war, battery costs). European OEMs (Stellantis, Renault, VW) reorganize platforms and partnerships. Aggressive entry of Chinese OEMs (BYD, SAIC) in Europe.",
      },
      {
        label: "Examples to cite",
        text: "Stellantis (multi-brand, equity discount), Renault Group (Ampere / EV), Volkswagen (software, Scout), BMW & Mercedes (premium EV mix). Tesla remains the BEV pricing reference.",
      },
    ],
    interests: [
      {
        side: "European OEMs",
        text: "Cut platform cost, share R&D (batteries, software), dispose of or close non-strategic assets. Targeted M&A on suppliers and tech (ADAS, batteries).",
      },
      {
        side: "PE / strategics",
        text: "Non-core division carve-outs, supply-chain restructurings, opportunities in distressed suppliers (reorganization, debt).",
      },
    ],
    contexte:
      "Cyclical auto multiples: EV/EBIT often elevated in investment phases; market penalizes execution and BEV mix. In interview: link volumes, ASP, platform CapEx and cycle.",
    pointEntretien:
      "Cite Stellantis or Renault to illustrate cycle discount + EV challenge. Distinguish OEM vs suppliers (margins, NWC, backlog). Mention BYD/Tesla as BEV price references.",
    advisors: {},
    kind: "trend",
  },
  {
    id: "d18",
    title: "Meta / Scale AI",
    dates: "Announced June 2025",
    type: "M&A",
    secteur: "TMT / Artificial Intelligence",
    headlineEv: "~14,3 Md$ (49%)",
    banks: [],
    parties: [
      {
        label: "Target",
        text: "Scale AI — leader in annotation and data preparation for AI model training. Founded by Alexandr Wang.",
      },
      {
        label: "Acquirer",
        text: "Meta — ~49% minority stake, intentionally non-controlling. Alexandr Wang joins Meta to lead “superintelligence” efforts.",
      },
    ],
    valorisation: [
      { label: "Investissement", value: "~$14.3bn for ~49%" },
      { label: "Implied Scale AI valuation", value: "~29 Md$" },
      { label: "Structure", value: "Minority stake + management acqui-hire" },
    ],
    interests: [
      {
        side: "Meta",
        text: "Catch up with OpenAI, Google and Anthropic in the frontier-model race. Logic is to acquire talent (Wang + team) and privileged access to training data, without taking legal control to limit antitrust risk.",
      },
      {
        side: "Scale AI",
        text: "Access to massive capital and Meta’s ecosystem while remaining nominally independent. Founders and employees get liquidity.",
      },
    ],
    contexte:
      "Perfect illustration of a “quasi-acquisition”: non-controlling minority stake + hiring of key executives. Structure aims to sidestep merger control (FTC/DOJ, European Commission), same model as Microsoft/Inflection, Google/Character.AI and Amazon/Adept (see trend deal d19).",
    pointEntretien:
      "Explain why Big Tech prefers minority stakes with acqui-hires over full acquisitions: sidestep merger control while capturing talent and technology. Key angle on AI regulatory risk.",
    ftUrl: "https://www.ft.com/content/meta-scale-ai",
    advisors: {},
    kind: "deal",
  },
  {
    id: "d19",
    title: "Big Tech / AI — mega-investments and acqui-hires",
    dates: "Tendance 2024-2026",
    type: "Tendance",
    secteur: "TMT / Artificial Intelligence",
    headlineEv: "Tendance sectorielle",
    banks: [],
    parties: [
      {
        label: "Context",
        text: "Unable to acquire AI labs outright (dizzying valuations + antitrust risk), hyperscalers deploy two strategies: giant lab investments, and “acqui-hires” that hollow out startups of talent via license deals.",
      },
      {
        label: "Examples to cite",
        text: "Investments: Microsoft / OpenAI (~$13bn), Amazon / Anthropic (~$8bn), Google / Anthropic. Acqui-hires: Microsoft / Inflection (Mustafa Suleyman, ~$650m license), Google / Character.AI (~$2.7bn license, Noam Shazeer), Amazon / Adept, Meta / Scale AI (see deal d18).",
      },
    ],
    interests: [
      {
        side: "Hyperscalers (MSFT, Amazon, Google, Meta)",
        text: "Secure talent, models and compute volumes in the generative AI race, while keeping structure below merger-control thresholds. Frequent counterpart: a cloud spend commitment (Azure, AWS, GCP) by the funded lab.",
      },
      {
        side: "Regulators",
        text: "FTC, DOJ, CMA and European Commission review these structures (partnerships, stakes, acqui-hires) as possible disguised concentrations and potential competitive lock-ins on AI.",
      },
    ],
    contexte:
      "Essential 2026 M&A / TMT interview theme: the line between partnership, investment and acquisition blurs. Watch “circularity”: the same player (e.g. Nvidia) can be supplier, investor and beneficiary of spend.",
    pointEntretien:
      "Distinguish strategic investment, commercial partnership and acqui-hire. Understand why these structures escape (or not) merger control. Cite 3-4 precise examples (Microsoft/OpenAI, Amazon/Anthropic, Google/Character.AI, Meta/Scale AI).",
    advisors: {},
    kind: "trend",
  },
  {
    id: "d20",
    title: "CoreWeave — IPO (infrastructure IA / GPU cloud)",
    dates: "IPO mars 2025",
    type: "IPO",
    secteur: "TMT / AI Infrastructure & Cloud",
    headlineEv: "~23 Md$ valorisation",
    banks: ["Morgan Stanley", "Goldman Sachs", "JPMorgan"],
    parties: [
      {
        label: "Entity",
        text: "CoreWeave — hyperscaler specialized in GPU cloud, rents Nvidia compute capacity for AI model training and inference. Nasdaq IPO.",
      },
    ],
    valorisation: [
      { label: "IPO valuation", value: "~23 Md$" },
      { label: "Context", value: "One of the largest US tech IPOs of 2025" },
      { label: "Nuance", value: "IPO priced below the initial range (cautious appetite)" },
    ],
    interests: [
      {
        side: "Investisseurs",
        text: "“Pure-play” exposure to explosive AI compute demand, hard to get other than via Nvidia. Trade-off: highly capital-intensive model, heavy GPU-backed debt and high client concentration (Microsoft leading).",
      },
      {
        side: "CoreWeave",
        text: "Raise funds to finance massive CapEx (data centers, GPUs) and refinance significant debt. The IPO provides a currency (shares) and visibility.",
      },
    ],
    contexte:
      "AI infrastructure becomes an asset class in its own right. Debate on Nvidia “circularity” (investor, GPU supplier and demand support) and sustainability of debt backed by GPUs that depreciate quickly.",
    pointEntretien:
      "Illustrate AI infra financing: capital intensity, GPU-backed debt, client concentration risk. Cite MS/GS/JPM as bookrunners. Discuss Nvidia circularity and GPU depreciation risk.",
    ftUrl: "https://www.ft.com/content/coreweave-ipo",
    advisors: {},
    kind: "deal",
  },
  {
    id: "d21",
    title: "SpaceX / Starlink — IPO outlook",
    dates: "2025-2026 speculation",
    type: "Tendance",
    secteur: "TMT / Aerospace & Space",
    headlineEv: "~$350bn+ (private valuation)",
    banks: [],
    parties: [
      {
        label: "Context",
        text: "SpaceX valued around $350bn via a late-2024 tender offer, one of the world’s most valuable private companies. Any IPO would likely be for Starlink (satellite internet) rather than all of SpaceX.",
      },
      {
        label: "Structure probable",
        text: "Starlink carve-out / spin-off once cash flows are predictable, to keep private control of the launch business (Falcon, Starship). Elon Musk has repeated there is no urgency to list.",
      },
    ],
    interests: [
      {
        side: "SpaceX / Musk",
        text: "Keep control and long-term horizon (Mars, Starship), fund investments without public-market pressure. Employee and investor liquidity comes via regular tender offers rather than a listing.",
      },
      {
        side: "Investisseurs",
        text: "Very strong demand for SpaceX/Starlink exposure; without an IPO, access is via the secondary market (tender offers, specialized funds) often with discount/premium and limited liquidity.",
      },
    ],
    contexte:
      "“Stay private longer” case study: decacorns raise massive private capital and delay IPOs. Growing role of tender offers and secondary markets for liquidity, partially substituting for public listings.",
    pointEntretien:
      "Explain why SpaceX stays private despite its valuation (control, tender-offer financing, no need for public capital), the likely Starlink spin-off IPO structure, and the “stay private longer” trend with secondary markets.",
    advisors: {},
    kind: "trend",
  },
];

