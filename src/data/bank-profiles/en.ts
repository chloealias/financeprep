import type { BankProfile } from "./types";

export const BANK_LIST: BankProfile[] = [
  {
    id: "rothschild-co",
    categoryId: "elite-boutique",
    name: "Rothschild & Co",
    category: "Elite boutique (advisory)",
    hq: "Paris / London",
    websiteUrl: "https://www.rothschildandco.com/en/about-us/",
    valeurs: ["Thoughtful", "Creative", "Principled"],
    tagline: "Independent M&A and restructuring advisory — a European reference",
    divisions: ["M&A", "Restructuring", "Debt advisory", "Equity advisory", "Wealth management"],
    particularites: [
      "Partnership structure — long-term culture, no proprietary trading",
      "Strong mid-cap presence and complex situations (carve-outs, takeovers, restructurings)",
      "Sell-side excellence in France: Opella, Altice creditors",
      "Often a more qualitative process than bulge brackets (fewer mass models)",
    ],
    recrutement:
      "Technical interviews + cultural fit. M&A / restructuring cases. Highly selective internships, often via network and top-school backgrounds.",
    pointEntretien:
      "Always say “Rothschild & Co”. Show interest in pure advisory (no balance sheet) and cite a recent deal where they led (Sanofi/Opella sell-side, Altice creditors).",
    dealEmblematique: {
      titre: "Sanofi / Opella → CD&R",
      texte:
        "Sell-side M&A lead for Sanofi on the Opella carve-out (~€16bn EV). Emblematic pure-advisory deal: no integrated financing, but a strategic mandate under political pressure (Doliprane).",
    },
    emblematicDealId: "d01",
    questionPiège:
      "Why Rothschild rather than BNP on Opella, when BNP can also advise and finance?",
    reponsePiège:
      "Rothschild = full independence, no balance-sheet conflict. On a sensitive carve-out, Sanofi wants an advisor that maximizes price without pushing house financing. BNP is more often a debt coordinator, not sell-side lead.",
    piegeAEviter:
      "Never confuse Rothschild & Co (Paris/London, advisory) with Edmond de Rothschild (private bank, Geneva).",
  },
  {
    id: "lazard",
    categoryId: "elite-boutique",
    name: "Lazard",
    category: "Elite boutique",
    hq: "New York / Paris",
    websiteUrl: "https://www.lazard.com/about-lazard/",
    valeurs: ["Excellence", "Empowerment", "Ownership"],
    tagline: "The historic reference for independent global advisory",
    divisions: ["M&A", "Restructuring", "Capital markets advisory", "Asset management"],
    particularites: [
      "100% advisory model — no lending, no trading",
      "Global restructuring leader (Altice debtor, GS/Mace buy-side)",
      "Intellectual culture, relatively small teams vs bulge",
      "Strong in cross-border and politically sensitive situations",
      "Paris = major European hub for mid/large-cap M&A",
    ],
    recrutement:
      "Multiple rounds, financial cases and fit. Restructuring also hires legal/debt finance profiles alongside generalists.",
    pointEntretien:
      "Explain why Lazard vs GS: independence, no lending conflict. Distinguish debtor role (Altice) vs buy-side depending on the deal cited.",
    dealEmblematique: {
      titre: "Altice France — €24bn restructuring",
      texte:
        "Restructuring advisor on the debtor side (Altice / Drahi). Cooperation agreement among ~200 secured creditors, debt-for-equity, secured vs holdco distinction — a European restructuring case study.",
    },
    emblematicDealId: "d02",
    questionPiège:
      "On Altice, whom exactly does Lazard advise — and how does that differ from Rothschild?",
    reponsePiège:
      "Lazard = debtor mandate. Rothschild & Co = secured creditors (~€19bn). Houlihan Lokey = holdco creditors (~€4.4bn). Three camps, three advisors — do not merge them into one “Altice mandate”.",
  },
  {
    id: "goldman-sachs",
    categoryId: "bulge-bracket",
    name: "Goldman Sachs",
    category: "Bulge bracket",
    hq: "New York",
    websiteUrl: "https://www.goldmansachs.com/our-firm/purpose-and-values",
    valeurs: ["Partnership", "Client service", "Integrity", "Excellence"],
    tagline: "The “most prestigious firm” — M&A, markets, PE",
    divisions: [
      "Investment Banking",
      "Global Markets",
      "Asset Management",
      "Goldman Sachs Alternatives (PE)",
    ],
    particularites: [
      "Full service: advisory + financing + trading + PE (Mace Consult via GS Alternatives)",
      "Intense culture, long hours, analytical excellence expected",
      "Strong US mega-cap IPO and M&A pipeline; solid Paris presence",
      "GS Alternatives = major PE player (infra, carve-outs) — not only classic M&A",
      "Very active alumni network in finance",
    ],
    recrutement:
      "Superday, behavioral + technical interviews. Prepare DCF, comps, accretion/dilution. Highly competitive summer analyst internships.",
    pointEntretien:
      "Show that GS is not only an M&A job: know GS Alternatives / Mace. Be ready on a recent deal and on “Why Goldman” with a concrete example.",
    dealEmblematique: {
      titre: "Goldman Sachs Alternatives / Mace Consult",
      texte:
        "GS Alternatives acquires a majority stake (percentage not publicly disclosed) in Mace Consult (infra consulting carve-out, ~$1bn rev.). Illustrates the group’s PE arm, distinct from classic Investment Banking.",
    },
    emblematicDealId: "d03",
    questionPiège: "Is GS an investment bank or a private equity fund?",
    reponsePiège:
      "Both, via distinct entities: Investment Banking (advisory/financing) and Goldman Sachs Alternatives (PE, >$625bn AUM). Mace shows the infra bolt-on strategy — in an IB interview, citing the deal proves group-level awareness.",
  },
  {
    id: "morgan-stanley",
    categoryId: "bulge-bracket",
    name: "Morgan Stanley",
    category: "Bulge bracket",
    hq: "New York",
    websiteUrl: "https://www.morganstanley.com/about-us",
    valeurs: ["Do the right thing", "Put clients first", "Lead with exceptional ideas", "Commit to diversity and inclusion", "Give back"],
    tagline: "Global investment bank, strength in ECM and tech M&A",
    divisions: ["IBD (M&A, ECM, DCM)", "Wealth Management", "Investment Management"],
    particularites: [
      "Known for ECM and tech M&A (advisory and execution)",
      "Frequent debt coordination on European LBOs (Opella)",
      "Culture often seen as slightly more collaborative than GS, depending on teams",
      "Paris: active M&A, Lev Fin, ECM teams on mid/large cap",
    ],
    recrutement:
      "Process similar to other bulges: fit + technical. Brainteasers possible.",
    pointEntretien:
      "Cite a deal where MS is bookrunner or advisor. Compare MS vs GS on culture and strong sectors (ECM, tech).",
    dealEmblematique: {
      titre: "Lineage Logistics — IPO (2024)",
      texte:
        "Bookrunner on the largest global IPO in 2024 (~$18bn). MS illustrates ECM / equity capital markets strength beyond large M&A.",
    },
    emblematicDealId: "d13",
    questionPiège: "Why Morgan Stanley rather than Goldman Sachs?",
    reponsePiège:
      "Personalized but structured answer: MS often cited as stronger in ECM with a more collaborative culture; GS more intense with PE (Alternatives). Cite a deal where MS has an identifiable role (Opella) rather than a generality.",
  },
  {
    id: "jpmorgan",
    categoryId: "bulge-bracket",
    name: "JPMorgan",
    category: "Bulge bracket",
    hq: "New York",
    websiteUrl: "https://www.jpmorganchase.com/about",
    valeurs: ["Exceptional client service", "Operational excellence", "Integrity, fairness and responsibility", "Great team and winning culture"],
    tagline: "Largest US bank — universal banking + top-tier IB",
    divisions: ["Corporate & Investment Bank", "Commercial Banking", "Asset Management"],
    particularites: [
      "Massive balance sheet → can finance and advise on the same deals",
      "DCM and loan syndication leader; strong Lev Fin",
      "Swisscom/Vodafone Italia: buy-side advisory with Evercore, DB",
      "More institutional culture, structured processes",
    ],
    recrutement: "HireVue + superday. Standard technical tests (valuation, accounting).",
    pointEntretien:
      "Understand the universal bank model: advantages (integrated financing) vs potential conflicts. Recent European deal.",
    dealEmblematique: {
      titre: "Swisscom / Vodafone Italia → Fastweb",
      texte:
        "Buy-side M&A advisor with Evercore and Deutsche Bank on the Vodafone Italia acquisition (~€8bn EV). European telecom consolidation, antitrust issues.",
    },
    emblematicDealId: "d07",
    questionPiège: "Can JPMorgan advise and lend on the same deal without conflict?",
    reponsePiège:
      "Yes, with Chinese walls and disclosure — that is the core of the universal bank model. Advantage: integrated financing + advisory offering. Risk: conflict perception if the client wants 100% independent advice → hence elite boutiques.",
  },
  {
    id: "bank-of-america",
    categoryId: "bulge-bracket",
    name: "Bank of America",
    category: "Bulge bracket",
    hq: "Charlotte / New York",
    websiteUrl: "https://careers.bankofamerica.com/en-us/company/values",
    valeurs: ["Deliver together", "Act responsibly", "Realize the power of our people", "Trust the team"],
    tagline: "US universal bank — large-scale advisory and financing",
    divisions: ["Global Banking (IB)", "Markets", "Wealth Management"],
    particularites: [
      "Present on Opella (sell-side) and Kering/L'Oréal (buy-side)",
      "Strong in leveraged finance and loan origination",
      "Less “glamorous” than GS/MS in perception but enormous volumes",
      "Paris: growing IB team on US-Europe cross-border",
    ],
    recrutement:
      "Standard bulge bracket process. Watch accounting questions (BofA historically strong on accounting).",
    pointEntretien:
      "Do not confuse with Merrill Lynch (integrated). Cite a recent luxury or healthcare deal.",
    dealEmblematique: {
      titre: "Kering Beauté / Creed → L'Oréal",
      texte:
        "Buy-side advisor for L'Oréal (€4bn cash, largest acquisition in group history). Sell-side = Evercore + Centerview — BofA on the acquirer side.",
    },
    emblematicDealId: "d06",
    questionPiège: "Are Bank of America and Merrill Lynch the same thing?",
    reponsePiège:
      "Merrill Lynch was integrated into BofA in 2009. The Merrill brand remains in wealth management; investment banking operates as Bank of America Securities. In interview, say “BofA” unless explicitly discussing legacy Merrill.",
  },
  {
    id: "citi",
    categoryId: "bulge-bracket",
    name: "Citigroup",
    category: "Bulge bracket",
    hq: "New York",
    websiteUrl: "https://www.citigroup.com/global/about-us",
    valeurs: ["Common Purpose", "Responsible Finance", "Ingenuity", "Leadership"],
    tagline: "Global bank — the most extensive international network",
    divisions: ["Banking (M&A, DCM, Lev Fin)", "Markets", "Services"],
    particularites: [
      "Unmatched emerging markets network",
      "Opella debt coordinator (with GS, Barclays, BNP, MS, SocGen, HSBC)",
      "Can advise and finance — integrated model",
      "Diverse culture, highly international teams",
    ],
    recrutement: "Technical + behavioral interviews. Emphasis on global mindset.",
    pointEntretien:
      "Highlight the international angle if multilingual. Deal with financing + advisory role.",
    dealEmblematique: {
      titre: "Sanofi / Opella → CD&R",
      texte:
        "~€16bn LBO: Citi buy-side M&A lead + debt coordinator (club with GS, Barclays, BNP, MS, SocGen, HSBC). Integrated advisory + financing model.",
    },
    emblematicDealId: "d01",
    questionPiège: "On Opella, why so many banks as debt coordinators?",
    reponsePiège:
      "Syndication: share risk, broaden distribution (club deal), relationships with different debt investors. Citi, GS, Barclays, BNP, MS, SocGen, HSBC = coordination, not seven duplicates of the same work.",
  },
  {
    id: "barclays",
    categoryId: "bulge-bracket",
    name: "Barclays",
    category: "Bulge bracket (UK/Europe)",
    hq: "London",
    websiteUrl: "https://home.barclays/who-we-are/",
    valeurs: ["Respect", "Integrity", "Service", "Excellence", "Stewardship"],
    tagline: "Major UK bank — Lev Fin and European M&A strength",
    divisions: ["Corporate & Investment Bank", "UK consumer bank"],
    particularites: [
      "Historically very strong in European leveraged finance",
      "Debt coordinator on large LBOs (Opella)",
      "Post-Brexit: London hub positioning + Europe coverage",
      "More British culture, less Parisian than BNP/SocGen",
    ],
    recrutement: "Assessment centre in London or Paris depending on desk. Technical + fit.",
    pointEntretien:
      "If interviewing in Paris: explain the Barclays-London link. Know a Lev Fin or UK-centric deal.",
    dealEmblematique: {
      titre: "Sanofi / Opella → CD&R",
      texte:
        "~€16bn LBO: Barclays debt coordinator (Term Loan B, HY bridge). European Lev Fin angle on a flagship carve-out.",
    },
    emblematicDealId: "d01",
    questionPiège: "Is Barclays mainly a financing bank or an M&A advisory bank?",
    reponsePiège:
      "Both, but particularly strong reputation in leveraged finance and loan syndication in Europe. On Opella, debt coordinator role — in a Lev Fin interview, that is a better angle than presenting Barclays as an elite M&A boutique.",
  },
  {
    id: "bnp-paribas",
    categoryId: "universal-bank",
    name: "BNP Paribas",
    category: "French universal bank",
    hq: "Paris",
    websiteUrl: "https://group.bnpparibas/en/group/about-us/company-purpose",
    valeurs: ["Serving clients and the world", "Ethics", "Sustainable finance", "Commitment"],
    tagline: "#1 eurozone bank — M&A and financing leader in France",
    divisions: ["Corporate & Institutional Banking", "Retail", "AM"],
    particularites: [
      "Natural reference for French deals (Opella sell-side)",
      "Can align advisory + credit + markets on mid/large cap",
      "More corporate culture than elite boutiques",
      "Strong in export finance and European corporates",
    ],
    recrutement:
      "French process: HR + technical interviews, sometimes logic test. Highly sought CIB internships.",
    pointEntretien:
      "“Reference bank in France” argument. Opella or other French flagship deal. Compare with Rothschild (pure advisory).",
    dealEmblematique: {
      titre: "Sanofi / Opella → CD&R",
      texte:
        "Sell-side advisor + debt coordinator on Opella. BNP = reference bank on major French mandates, integrated advisory and financing.",
    },
    emblematicDealId: "d01",
    questionPiège: "BNP or Rothschild on Opella — who is the real lead?",
    reponsePiège:
      "Rothschild = sell-side M&A lead (pure strategic advisory). BNP = sell-side advisor AND debt coordinator — broader role but not “better” advisory: complementary. Do not dismiss Rothschild by saying BNP “does everything”.",
  },
  {
    id: "societe-generale",
    categoryId: "universal-bank",
    name: "Société Générale",
    category: "French universal bank",
    hq: "Paris",
    websiteUrl: "https://www.societegenerale.com/en/societe-generale-group/identity/values",
    valeurs: ["Team spirit", "Innovation", "Responsibility", "Commitment"],
    tagline: "Integrated CIB player — equity derivatives and financing",
    divisions: ["Global Banking & Investor Solutions", "Retail"],
    particularites: [
      "Strong reputation in equity derivatives and structured products",
      "Opella debt coordinator",
      "M&A advisory present but less iconic than BNP/Lazard",
      "Historic entrepreneurial culture, post-incident restructuring",
    ],
    recrutement:
      "French large-bank style contests and interviews. Prepare group motivation + CIB division.",
    pointEntretien:
      "Show knowledge of GBIS. Avoid talking only about M&A if applying to a mixed markets/IB role.",
    dealEmblematique: {
      titre: "Sanofi / Opella → CD&R",
      texte:
        "Debt coordinator on the Opella LBO. SocGen illustrates the group’s financing strength, alongside derivatives desks.",
    },
    emblematicDealId: "d01",
    emblematicLinkType: "bank",
    questionPiège: "Why apply to M&A at SocGen rather than derivatives?",
    reponsePiège:
      "Honest answer aligned with the target role. If M&A: acknowledge SocGen is less iconic than BNP/Lazard in pure advisory, but present on major French deals in financing and mid-cap M&A. Do not claim SocGen is a global M&A leader.",
  },
  {
    id: "hsbc",
    categoryId: "universal-bank",
    name: "HSBC",
    category: "Global bank (UK/Asia)",
    hq: "London / Hong Kong",
    websiteUrl: "https://www.hsbc.com/who-we-are/our-purpose",
    valeurs: ["We value difference", "We succeed together", "We take responsibility", "We get it done"],
    tagline: "Europe–Asia pivot — trade finance and cross-border",
    divisions: ["Global Banking & Markets", "Wealth", "Retail"],
    particularites: [
      "Asia-Pacific and trade corridor expertise",
      "Opella debt coordinator",
      "Less dominant in pure M&A advisory in France vs BNP/Lazard",
      "Conservative culture, important group processes",
    ],
    recrutement: "Structured interviews, fit and geographic motivation (HK, UK, FR).",
    pointEntretien:
      "If international profile: highlight Europe–Asia link. Otherwise cite financing role on a European deal.",
    dealEmblematique: {
      titre: "Sanofi / Opella → CD&R",
      texte:
        "Debt coordinator on Opella. HSBC brings its global debt distribution network, even if the deal is France/Europe-centric.",
    },
    emblematicDealId: "d01",
    emblematicLinkType: "bank",
    questionPiège: "Is HSBC a French or British bank?",
    reponsePiège:
      "Historic HQ in London, strong Hong Kong and Asia presence. In France, active CIB teams but the group remains UK/Asia-centric. Do not present it as a direct BNP competitor in French retail.",
  },
  {
    id: "ubs",
    categoryId: "universal-bank",
    name: "UBS",
    category: "Global Swiss bank",
    hq: "Zurich",
    websiteUrl: "https://www.ubs.com/global/en/our-firm/our-culture.html",
    valeurs: ["Client centricity", "Sustainable impact", "Accountability with integrity"],
    tagline: "Wealth + IB — Swiss M&A and cross-border strength",
    divisions: ["Global Banking", "Global Wealth Management", "Asset Management"],
    particularites: [
      "Mace sell-side (UBS); Swisscom/Vodafone buy-side (with Evercore, DB, JPM)",
      "Credit Suisse merged historically — Swiss consolidation",
      "Strong in Swiss advisory and media/luxury",
      "Swiss culture: rigor, discretion",
    ],
    recrutement: "Demanding technical interviews. Valuation and accounting questions.",
    pointEntretien: "Post CS/UBS merger: show sector awareness. Recent cross-border deal.",
    dealEmblematique: {
      titre: "Swisscom / Vodafone Italia → Fastweb",
      texte:
        "Sell-side M&A advisor on the Vodafone Italia acquisition (~€8bn EV). UBS illustrates European telecom cross-border advisory.",
    },
    emblematicDealId: "d07",
    questionPiège: "UBS acquired Credit Suisse — what impact on M&A recruiting?",
    reponsePiège:
      "Consolidation: synergies, team integration, possible near-term rationalization, but UBS strengthens its Swiss wealth and IB position. Show you follow the CS/UBS integration (2023) without dramatizing — the cross-border M&A pipeline continues (Mace, Swisscom).",
  },
  {
    id: "deutsche-bank",
    categoryId: "universal-bank",
    name: "Deutsche Bank",
    category: "German universal bank",
    hq: "Frankfurt",
    websiteUrl: "https://www.db.com/company/en/what-we-stand-for.htm",
    valeurs: ["Integrity", "Sustainable performance", "Client centricity", "Innovation", "Discipline", "Partnership"],
    tagline: "German leader — restructuring and European corporates",
    divisions: ["Corporate Bank", "Investment Bank", "Private Bank"],
    particularites: [
      "Swisscom/Vodafone buy-side with Evercore, JPM",
      "Historically strong European restructuring",
      "Group turnaround since 2019 — focus on profitability",
      "Paris hub for French-German corporates",
    ],
    recrutement: "Standard European process. Note post-internal-restructuring culture.",
    pointEntretien:
      "Know the “return to profitability” strategy. Telecom deal or German Mittelstand angle.",
    dealEmblematique: {
      titre: "Swisscom / Vodafone Italia → Fastweb",
      texte:
        "Buy-side M&A advisor with Evercore and JPM on Vodafone Italia (~€8bn EV). DB = natural coverage on telecom and European cross-border mandates.",
    },
    emblematicDealId: "d07",
    questionPiège: "Is Deutsche Bank still in trouble?",
    reponsePiège:
      "Turnaround since 2019 (Christian Sewing): refocus on IB, cut risky activities, return to profitability. Do not rehash the 2008 crisis — show the current strategy and a recent deal (Swisscom) as evidence of recovery.",
  },
  {
    id: "evercore",
    categoryId: "elite-boutique",
    name: "Evercore",
    category: "Elite boutique (US / Europe)",
    hq: "New York / London / Paris",
    websiteUrl: "https://www.evercore.com/about/",
    valeurs: ["Client first", "Excellence", "Integrity", "Partnership"],
    tagline: "Independent M&A advisory — luxury sell-side and European cross-border reference",
    divisions: ["M&A advisory", "Restructuring", "Equities advisory", "Private capital advisory"],
    particularites: [
      "100% advisory model — no balance sheet, no financing conflict",
      "Sell-side lead on Kering Beauté / Creed (with Centerview)",
      "Swisscom / Vodafone Italia buy-side with DB and JPM",
      "Paris: active European hub on luxury, consumer and telecom",
      "Analytical culture, relatively small teams vs bulge",
    ],
    recrutement:
      "Technical interviews (DCF, comps) + fit. Highly selective internships in Paris and London.",
    pointEntretien:
      "Cite a recent sell-side AND buy-side mandate. Explain why Evercore vs bulge: independence, advisory focus, sell-side reputation on premium assets.",
    dealEmblematique: {
      titre: "Kering Beauté / Creed → L'Oréal",
      texte:
        "Sell-side advisor with Centerview (~€4bn cash). Emblematic of Evercore’s luxury positioning and strategic disposals under balance-sheet pressure.",
    },
    emblematicDealId: "d06",
    questionPiège: "Can Evercore finance an LBO like BNP on Opella?",
    reponsePiège:
      "No — Evercore is pure advisory. On Opella it does not appear because the sell-side pharma/consumer mandate sits with Rothschild & BNP. On Kering/L'Oréal, Evercore maximizes price without pushing house financing — that is the elite boutique key argument.",
  },
  {
    id: "centerview",
    categoryId: "elite-boutique",
    name: "Centerview Partners",
    category: "Elite boutique (US / Europe)",
    hq: "New York / London",
    websiteUrl: "https://www.centerviewpartners.com/",
    valeurs: ["Independence", "Client focus", "Excellence", "Discretion"],
    tagline: "Premium boutique — strategic sell-side on the largest consumer mandates",
    divisions: ["M&A advisory", "Restructuring"],
    particularites: [
      "“Top of the league” reputation on strategic sell-side in the US and Europe",
      "Co-lead sell-side Kering Beauté with Evercore",
      "No trading, no lending — pure advisory",
      "Very senior-led teams, few juniors per deal",
      "Strong London presence on consumer & healthcare",
    ],
    recrutement:
      "Highly selective process, cultural fit and deep M&A cases. Prestigious alumni network.",
    pointEntretien:
      "Show knowledge of the Kering/L'Oréal deal and explain why Centerview is mandated sell-side (confidentiality, credibility with strategic buyers).",
    dealEmblematique: {
      titre: "Kering Beauté / Creed → L'Oréal",
      texte:
        "Sell-side with Evercore on the largest acquisition in L'Oréal’s history. Illustrates Centerview’s positioning on “trophy” sell-sides.",
    },
    emblematicDealId: "d06",
    questionPiège: "Centerview and Evercore — why two boutiques on the same sell-side?",
    reponsePiège:
      "Common practice on mega-deals: share workload, complementary expertise (jurisdictions, process), stronger board credibility. Not duplication — each boutique has a defined role in the process.",
  },
  {
    id: "houlihan-lokey",
    categoryId: "elite-boutique",
    name: "Houlihan Lokey",
    category: "Elite boutique (restructuring)",
    hq: "Los Angeles / London / Paris",
    websiteUrl: "https://hl.com/about-us/",
    valeurs: ["Integrity", "Excellence", "Collaboration", "Client service"],
    tagline: "#1 global restructuring — holdco creditor and special situations reference",
    divisions: ["Financial restructuring", "M&A", "Financial advisory", "Corporate finance"],
    particularites: [
      "Global restructuring leader (Refinitiv rankings)",
      "Altice holdco creditor mandate (~€4.4bn) vs Lazard debtor / Rothschild secured",
      "Paris: active restructuring and mid-cap M&A team",
      "Pure advisory model, strong debt technical culture",
    ],
    recrutement:
      "Technical debt + accounting interviews. Valued profiles: legal, structured finance, M&A.",
    pointEntretien:
      "Distinguish debtor vs creditor mandate on Altice. Cite Houlihan Lokey only for holdco — a common interview mistake.",
    dealEmblematique: {
      titre: "Altice France — €24bn restructuring",
      texte:
        "Restructuring advisor on the holdco creditor side (~€4.4bn). Complements Lazard (debtor) and Rothschild (secured) — multi-advisor mandate case study.",
    },
    emblematicDealId: "d02",
    questionPiège: "Does Houlihan Lokey advise Patrick Drahi or the creditors?",
    reponsePiège:
      "Holdco creditors, not Drahi. Lazard = debtor. Rothschild = secured (~€19bn). Houlihan Lokey = holdco (~€4.4bn). Confusing the camps is an elimination error in a restructuring interview.",
  },
  {
    id: "credit-suisse",
    categoryId: "universal-bank",
    name: "Credit Suisse",
    category: "Swiss bank (integrated into UBS)",
    hq: "Zurich (legacy)",
    websiteUrl: "https://www.ubs.com/global/en/our-firm/our-culture.html",
    valeurs: ["Client centricity", "Sustainable impact", "Accountability with integrity"],
    tagline: "Legacy Credit Suisse — integrated into UBS (March 2023) — still tested in interviews",
    divisions: ["Investment Banking (legacy)", "Wealth Management (legacy)", "Asset Management"],
    particularites: [
      "Emergency takeover by UBS at FINMA’s request (March 2023) after a confidence crisis",
      "Pre-merger: strength in equity derivatives, wealth management, Swiss advisory",
      "Archegos (2021) and AT1 credit (2023) = risk and regulation case studies",
      "In 2026 interviews: speak in the past (“CS was…”) and link to current UBS strategy",
      "No longer apply to “Credit Suisse” — recruiting via UBS",
    ],
    recrutement:
      "Recruiting now via UBS. Knowing CS history remains essential for Swiss IB interviews.",
    pointEntretien:
      "Explain the CS/UBS merger (FINMA, systemic rescue, ~CHF 16bn AT1 wiped). Distinguish Credit Suisse (IB/wealth) from UBS (consolidated leader). Cite UBS on recent deals (Mace, Swisscom).",
    dealEmblematique: {
      titre: "UBS / Credit Suisse merger (March 2023)",
      texte:
        "Systemic rescue orchestrated by FINMA (CHF 3bn, ratio 1 UBS for 22.48 CS). Full AT1 write-down (~CHF 16bn). Essential case on risk, regulation and bank consolidation.",
    },
    emblematicDealId: "d16",
    questionPiège: "Can you still apply to Credit Suisse in Paris?",
    reponsePiège:
      "No — the Credit Suisse legal entity was absorbed by UBS. In interview, show you follow the integration (synergies, rationalization) and apply to UBS if targeting Switzerland / European IB.",
    piegeAEviter:
      "Do not confuse Credit Suisse with Crédit Agricole (France) or with post-merger UBS.",
  },
  {
    id: "mediobanca",
    categoryId: "universal-bank",
    name: "Mediobanca",
    category: "Italian investment bank",
    hq: "Milan",
    websiteUrl: "https://www.mediobanca.com/en/about-us/identity.html",
    valeurs: ["Independence", "Excellence", "Integrity", "Client focus"],
    tagline: "Italian champion of M&A advisory and corporate banking",
    divisions: ["CIB (M&A, ECM, DCM)", "Wealth management", "Consumer credit (via Compass)"],
    particularites: [
      "Italy M&A reference: Generali, telecom, luxury, family mid-caps",
      "Historic “merchant bank” model — strategic stakes (Generali, RCS)",
      "Key player on Italian bank consolidation (UniCredit / Commerzbank context)",
      "Paris: more limited presence than Milan — often Italy-focused profiles",
    ],
    recrutement:
      "Italian process + interviews in English. M&A cases and Italy/Southern Europe motivation.",
    pointEntretien:
      "Cite UniCredit / Commerzbank as European FIG macro context. Show interest in Italian mid-cap and family dynasties.",
    dealEmblematique: {
      titre: "UniCredit / Commerzbank (2024-2026)",
      texte:
        "European bank consolidation context — Mediobanca closely follows cross-border takeovers as a historic advisor to the Italian FIG sector.",
    },
    emblematicDealId: "d04",
    questionPiège: "Is Mediobanca a boutique or a universal bank?",
    reponsePiège:
      "Integrated Italian investment bank (CIB + wealth + credit), not an independent elite boutique. It holds long-term strategic stakes — a unique hybrid model in Europe.",
  },
  {
    id: "natixis",
    categoryId: "universal-bank",
    name: "Natixis",
    category: "French bank (Groupe BPCE)",
    hq: "Paris",
    websiteUrl: "https://www.natixis.com/natixis/en/about-us-c_5134.html",
    valeurs: ["Team spirit", "Innovation", "Sustainable impact", "High standards"],
    tagline: "Groupe BPCE’s CIB — M&A, financing and asset management",
    divisions: [
      "Global Banking (M&A, DCM, Lev Fin)",
      "Global Financial Services",
      "Mirova (ESG AM)",
    ],
    particularites: [
      "CIB subsidiary of BPCE (2nd French banking network)",
      "Strength in structured finance, export finance, FIG",
      "M&A advisory on French mid/large cap — less iconic than BNP/Lazard",
      "Mirova = leading sustainable asset manager (group differentiator)",
    ],
    recrutement: "French large-bank contests and interviews. BPCE + Natixis CIB motivation.",
    pointEntretien:
      "Explain the BPCE / Natixis / Banque Populaire and Caisse d'Épargne link. Cite a recent French FIG or consumer deal.",
    dealEmblematique: {
      titre: "UniCredit / Commerzbank (2024-2026)",
      texte:
        "Natixis CIB follows European FIG consolidation — a reference for French bank interviews on cross-border takeovers and German banking sovereignty.",
    },
    emblematicDealId: "d04",
    questionPiège: "Natixis and BPCE — what’s the difference?",
    reponsePiège:
      "BPCE = holding (Banque Populaire + Caisse d'Épargne). Natixis = group CIB and asset management arm. In a CIB interview, apply to “Natixis” (markets brand) while knowing BPCE is the shareholder.",
  },
  {
    id: "credit-agricole-cib",
    categoryId: "universal-bank",
    name: "Crédit Agricole CIB",
    category: "French universal bank",
    hq: "Paris / Montrouge",
    websiteUrl: "https://www.ca-cib.com/about-us",
    valeurs: ["Proximity", "Responsibility", "Solidarity"],
    tagline: "Crédit Agricole’s CIB arm — European corporate financing and advisory",
    divisions: ["Investment Banking", "Global Markets", "Securities services"],
    particularites: [
      "Integrated into France’s #1 banking network (Crédit Agricole SA)",
      "Strong in DCM, loan origination, export finance — less visible in pure sell-side M&A than BNP",
      "Solid Europe, Americas and Asia presence on corporates",
      "More corporate culture than Rothschild/Lazard",
    ],
    recrutement:
      "Standard French process. Logic tests + technical interviews. Highly sought Paris CIB internships.",
    pointEntretien:
      "Compare with BNP: CA-CIB more financing-oriented, BNP more balanced M&A + Lev Fin. Know the group’s mutualist structure.",
    dealEmblematique: {
      titre: "Sanofi / Opella → CD&R",
      texte:
        "Present in the ecosystem of major French financing deals — distinct from Rothschild’s sell-side lead role on Opella.",
    },
    emblematicDealId: "d01",
    emblematicLinkType: "bank",
    questionPiège: "Are Crédit Agricole CIB and Crédit Agricole retail the same entity?",
    reponsePiège:
      "Same group, distinct entities: CA-CIB = investment bank (Montrouge), retail network = regional caisses. In an IB interview, say “CIB” to show you know the structure.",
  },
  {
    id: "jefferies",
    categoryId: "bulge-bracket",
    name: "Jefferies",
    category: "Investment bank (mid-market / growth)",
    hq: "New York / London",
    websiteUrl: "https://www.jefferies.com/About-Us/Overview/default.aspx",
    valeurs: ["Client focus", "Entrepreneurial culture", "Excellence", "Integrity"],
    tagline: "Independent investment bank — mid-cap, growth and special situations",
    divisions: ["Investment Banking", "Equities", "Fixed income", "Jefferies Financial Services"],
    particularites: [
      "Positioning between elite boutique and bulge: advisory + trading, no retail",
      "Mace / GS Alternatives buy-side — present on carve-outs and mid-cap",
      "Entrepreneurial culture, smaller teams than GS/JPM",
      "Europe: London main hub, active cross-border deals",
    ],
    recrutement:
      "Technical interviews + entrepreneurial fit. Less “prestige branding” than GS — offset by faster responsibility.",
    pointEntretien:
      "Cite Mace (buy-side with Lazard) or Worldline (Jefferies sole sell-side advisor). Show interest in mid-cap and complex situations.",
    dealEmblematique: {
      titre: "Goldman Sachs Alternatives / Mace Consult",
      texte:
        "Buy-side M&A advisor with Lazard on the Mace carve-out (~$1bn rev.). Illustrates Jefferies’ mid-cap and PE-sponsored deal positioning.",
    },
    emblematicDealId: "d03",
    questionPiège: "Is Jefferies a bulge bracket?",
    reponsePiège:
      "No — independent “middle market investment bank”. Smaller than bulges, but broader than a pure elite boutique. In interview, do not class it with GS/JPM; compare to Evercore/Moelis on some mid-cap mandates.",
  },
  {
    id: "macquarie",
    categoryId: "bulge-bracket",
    name: "Macquarie",
    category: "Australian bank (infra & alternatives)",
    hq: "Sydney / London",
    websiteUrl: "https://www.macquarie.com/au/en/about/company/what-we-stand-for.html",
    valeurs: ["Opportunity", "Accountability", "Integrity"],
    tagline: "Global infrastructure and asset management leader — strong Europe presence",
    divisions: [
      "Macquarie Asset Management",
      "Banking & Financial Services",
      "Commodities & Global Markets",
    ],
    particularites: [
      "World’s largest infra manager (build → hold → sell rotation)",
      "Vinci / Safeway Concessions India sell-side (~$1.6bn)",
      "Unique model: bank + integrated asset manager",
      "London: European hub for infra, renewables, transport",
    ],
    recrutement:
      "Fit interviews + infra/PE cases. Valued profiles: engineering, infra, structured finance.",
    pointEntretien:
      "Cite Vinci/Safeway and explain the Macquarie model (acquire, stabilize, exit). High infra multiples = long-term cash-flow visibility.",
    dealEmblematique: {
      titre: "Vinci / Safeway Concessions (India highways)",
      texte:
        "Seller (Macquarie AM) on the Indian highway carve-out (~$1.6bn). Infra portfolio rotation case study.",
    },
    emblematicDealId: "d10",
    questionPiège: "Is Macquarie a classic investment bank?",
    reponsePiège:
      "Hybrid: classic CIB + dominant infra asset management. In an infra/PE interview, Macquarie is often more relevant than GS. Do not present it as a generalist M&A bulge.",
  },
  {
    id: "oddo-bhf",
    categoryId: "elite-boutique",
    name: "Oddo BHF",
    category: "Independent financial group (France / Germany)",
    hq: "Paris / Frankfurt",
    websiteUrl: "https://www.oddo-bhf.com/en/p/about-us-group",
    valeurs: ["Independence", "Excellence", "Client proximity", "Responsibility"],
    tagline: "Independent Franco-German bank — mid-cap M&A and corporate brokerage",
    divisions: ["Corporate & Investment Banking", "Private banking", "Asset management"],
    particularites: [
      "Shareholder independence (Oddo family) — not a banking conglomerate",
      "France and DACH mid-cap strength: M&A, ECM, research",
      "Oddo + BHF merger (2017) = unique Franco-German platform",
      "Less present on mega-deals than Lazard/Rothschild",
    ],
    recrutement: "FR/DE interviews depending on desk. European mid-cap and independence motivation.",
    pointEntretien:
      "Explain the independent model vs BNP/SocGen. Cite a French mid-cap or Franco-German cross-border angle.",
    dealEmblematique: {
      titre: "European mid-cap positioning",
      texte:
        "Oddo BHF advises Franco-German ETIs and family mid-caps — a segment lightly covered by bulges, complementary to mega-deals in M&A news.",
    },
    questionPiège: "Is Oddo BHF a boutique or a universal bank?",
    reponsePiège:
      "Diversified independent group (CIB + private bank + AM), but not a universal bank in the BNP sense (no mass retail). Positioning as “independent financial group” — use that term in interview.",
  },
  {
    id: "moelis",
    categoryId: "elite-boutique",
    name: "Moelis & Company",
    category: "Elite boutique (US advisory)",
    hq: "New York / Paris",
    websiteUrl: "https://www.moelis.com/about/",
    valeurs: ["Client first", "Excellence", "Integrity", "Collaboration"],
    tagline: "Independent advisory — M&A, restructuring and capital solutions",
    divisions: ["M&A", "Restructuring", "Capital markets advisory", "Private funds advisory"],
    particularites: [
      "Founded in 2007 by Ken Moelis (ex-UBS/Lazard) — rapid US and Europe growth",
      "Strong on mid-cap, special situations and restructurings",
      "Paris: active European hub on cross-border mandates",
      "100% advisory model, no balance sheet",
    ],
    recrutement:
      "Technical interviews + fit. Demanding culture, relatively small teams vs bulge.",
    pointEntretien:
      "Compare to Evercore/Lazard: independence, focus on complex situations. Do not confuse with a universal bank.",
    dealEmblematique: {
      titre: "Restructuring & mid-cap M&A",
      texte:
        "Moelis regularly advises on restructurings and sales under pressure — a segment where process expertise outweighs balance sheet.",
    },
    questionPiège: "Is Moelis a classic investment bank?",
    reponsePiège:
      "No — pure elite advisory boutique. No lending, no proprietary trading. In interview, class it with Evercore, PJT, Perella rather than JPM/GS.",
  },
  {
    id: "pjt-partners",
    categoryId: "elite-boutique",
    name: "PJT Partners",
    category: "Elite boutique (restructuring & M&A)",
    hq: "New York / London",
    websiteUrl: "https://pjtpartners.com/firm/",
    valeurs: ["Excellence", "Integrity", "Client service", "Partnership"],
    tagline: "Blackstone Advisory spin-off — restructuring leader, strategic M&A",
    divisions: [
      "Restructuring & Special Situations",
      "Strategic Advisory",
      "Park Hill (fund placement)",
    ],
    particularites: [
      "Created in 2015 (Blackstone Advisory Partners spin-off)",
      "US reference in Chapter 11 and distressed situations",
      "Europe: London, telecom and distressed industrial mandates",
      "Culture close to restructuring banking (HL, Lazard) with pure advisory",
    ],
    recrutement:
      "Valued profiles: restructuring, debt, M&A. Very technical interviews on process and creditor waterfalls.",
    pointEntretien:
      "Cite restructuring expertise (Altice, telecom) and distinguish PJT from Blackstone (asset manager vs advisor).",
    dealEmblematique: {
      titre: "Telecom & industrials restructuring",
      texte:
        "PJT is often mandated for debtors or creditor committees on major US/EU situations — Chapter 11 and UK schemes competence.",
    },
    questionPiège: "Are PJT Partners and Blackstone the same thing?",
    reponsePiège:
      "No — separate entities since 2015. Blackstone = asset manager / PE; PJT = pure advisory. In interview, never say “I saw it at Blackstone” if the internship was at PJT.",
  },
  {
    id: "perella-weinberg",
    categoryId: "elite-boutique",
    name: "Perella Weinberg Partners",
    category: "Elite boutique (strategic M&A)",
    hq: "New York / London / Paris",
    websiteUrl: "https://pwpartners.com/",
    valeurs: ["Independence", "Excellence", "Integrity", "Client focus"],
    tagline: "Independent M&A advisory — founded by former Lazard bankers",
    divisions: ["M&A advisory", "Restructuring", "Capital markets & financing advisory"],
    particularites: [
      "Founded in 2006 by Joseph Perella and Peter Weinberg (ex-Goldman, ex-Morgan Stanley)",
      "High-end positioning: mega-deals and strategic mandates",
      "“Partner-led” culture, less hierarchy than bulges",
      "Paris: presence on sensitive European mandates",
    ],
    recrutement: "Demanding interviews, M&A cases and fit. Frequent top-school backgrounds.",
    pointEntretien:
      "Emphasize independence vs bulge and the founders’ Lazard/Goldman DNA. Good comparison with Centerview or Evercore on trophy mandates.",
    dealEmblematique: {
      titre: "Strategic cross-border M&A",
      texte:
        "PWP advises on strategic mergers and sensitive carve-outs — a segment where discretion and advisory quality come first.",
    },
    questionPiège: "How does PWP differ from Lazard?",
    reponsePiège:
      "Same pure advisory model, but PWP is younger, historically more US-centric, and less present on large-scale restructuring than Lazard. Both compete on premium M&A mandates.",
  },
];
