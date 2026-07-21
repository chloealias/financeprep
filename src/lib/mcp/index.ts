import { defineMcp } from "@lovable.dev/mcp-js";
import searchQuestions from "./tools/search-questions";
import listConcepts from "./tools/list-concepts";
import searchAcronyms from "./tools/search-acronyms";
import listDeals from "./tools/list-deals";
import listBanks from "./tools/list-banks";

export default defineMcp({
  name: "finance-interview-mcp",
  title: "Finance Interview Prep",
  version: "0.1.0",
  instructions:
    "Public read-only tools over a French investment-banking interview prep dataset: interview questions with model answers, finance concepts, acronym glossary, M&A deals, and bank profiles. Use `search_questions` to find questions, `list_concepts` for concept explanations, `search_acronyms` for the glossary, `list_ma_deals` for deal case studies, and `list_banks` for bank profiles.",
  tools: [searchQuestions, listConcepts, searchAcronyms, listDeals, listBanks],
});
