import { getQuestions } from "@/data/questions";
import { getMaDeals, type MaDeal } from "@/data/ma-deals";
import { getSectorData } from "@/data/sector-data";
import { SECTOR_IDS, type SectorId } from "@/lib/sectors";
import { shuffle, type SrsStore } from "@/lib/srs";
import { getTargetBankNames, loadProfile, type UserProfile } from "@/lib/profile-storage";
import { questionIdKey, type QuestionRatings } from "@/lib/storage";
import { dealMatchesBank } from "@/data/bank-profiles";
import type { TranslateFn } from "@/lib/i18n/t";
import { createTranslator } from "@/lib/i18n/t";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/types";
import type { Question } from "@/data/questions";

export type InterviewSlot = "opening" | "fit" | "technical" | "actu" | "sector" | "brainteaser";

export type InterviewSlotOnQuestion = "fit" | "technical" | "brainteaser";

export const SLOT_SECONDS: Record<InterviewSlot, number> = {
  opening: 180,
  fit: 180,
  technical: 300,
  actu: 240,
  sector: 240,
  brainteaser: 240,
};

const defaultT = createTranslator(DEFAULT_LOCALE);

export type CvOpening = {
  id: string;
  question: string;
  steps: string[];
  tip: string;
  guideHref: "/cv";
};

export function getCvOpening(translate: TranslateFn = defaultT): CvOpening {
  return {
    id: "opening-cv",
    question: translate("interviewPack.cv.question"),
    steps: [
      translate("interviewPack.cv.step1"),
      translate("interviewPack.cv.step2"),
      translate("interviewPack.cv.step3"),
      translate("interviewPack.cv.step4"),
    ],
    tip: translate("interviewPack.cv.tip"),
    guideHref: "/cv",
  };
}

export type BaseQuestionFields = {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  steps: string[];
  tip?: string;
};

export type OpeningPackItem = {
  kind: "opening";
  slot: "opening";
  secondsLimit: number;
} & CvOpening;

export type QuestionPackItem = {
  kind: "question";
  slot: InterviewSlot;
  secondsLimit: number;
} & BaseQuestionFields;

export type DealPackItem = {
  kind: "deal";
  slot: "actu";
  secondsLimit: number;
  dealId: string;
  dealTitle: string;
  question: string;
  steps: string[];
  tip?: string;
};

export type SectorPackItem = {
  kind: "sector";
  slot: "sector";
  secondsLimit: number;
  sectorId: SectorId;
  sectorName: string;
  emblematicDealId?: string;
  question: string;
  steps: string[];
  tip?: string;
};

export type PackGuideLink = {
  label: string;
  to: "/actualite" | "/cv" | "/pyramid" | "/";
  search?: Record<string, string | undefined>;
};

export type InterviewPackItem = OpeningPackItem | QuestionPackItem | DealPackItem | SectorPackItem;

export const FIT_QUESTION_IDS = new Set(["58", "59", "67", "123", "124", "125", "129", "130"]);

type RawQuestion = Question;

function rawQuestionForSlot(q: RawQuestion) {
  return {
    id: q.id,
    interviewSlot: q.interviewSlot as InterviewSlotOnQuestion | undefined,
    question: q.question,
    explanation: q.explanation,
    tip: q.tip,
    category: q.category,
  };
}

export function inferInterviewSlot(q: {
  id: string | number;
  interviewSlot?: InterviewSlotOnQuestion;
  question?: string;
  explanation?: string;
  tip?: string;
  category?: string;
}): InterviewSlotOnQuestion {
  if (q.interviewSlot) return q.interviewSlot;
  const id = questionIdKey(q.id);
  if (FIT_QUESTION_IDS.has(id)) return "fit";
  const blob = `${q.question ?? ""} ${q.explanation ?? ""} ${q.tip ?? ""}`.toLowerCase();
  if (
    /\bquestion fit\b|\bfit ultra\b|\bfit révélatrice\b|\bfit piège\b|\bfit\/strat\b|\bfit fondamentale\b|\bfit déstabilisante\b/.test(
      blob,
    )
  ) {
    return "fit";
  }
  if (q.category === "brainteaser") return "brainteaser";
  return "technical";
}

function toQuestionFields(q: RawQuestion): BaseQuestionFields {
  return {
    id: questionIdKey(q!.id),
    category: q!.category,
    difficulty: q!.difficulty,
    question: q!.question,
    steps: (q!.steps ?? []) as string[],
    tip: q!.tip,
  };
}

function pickOne<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return shuffle(arr)[0];
}

function pickUnique<T>(arr: T[], count: number, key: (t: T) => string): T[] {
  const shuffled = shuffle(arr);
  const out: T[] = [];
  const seen = new Set<string>();
  for (const item of shuffled) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
    if (out.length >= count) break;
  }
  return out;
}

function experienceLevelBoost(q: RawQuestion, level: UserProfile["experienceLevel"]): number {
  if (level === "reconversion" || level === "stagiaire") {
    if (q.difficulty === "basique") return 2;
    if (q.difficulty === "avancé") return -2;
  }
  return 0;
}

function scoreWeakness(
  q: RawQuestion,
  ratings: QuestionRatings,
  srsStore: SrsStore,
  experienceLevel?: UserProfile["experienceLevel"],
): number {
  const id = questionIdKey(q!.id);
  const rating = ratings[id] ?? 0;
  const srs = srsStore[`q-${id}`];
  let score = 0;
  if (rating > 0 && rating <= 2) score += 10;
  else if (rating === 0) score += 3;
  else if (rating === 3) score += 1;
  if (srs && srs.reps > 0 && srs.interval < 3) score += 5;
  if (srs && srs.due <= Date.now() && srs.reps > 0) score += 4;
  score += experienceLevelBoost(q, experienceLevel);
  return score;
}

function pickTechnicalQuestions(
  pool: RawQuestion[],
  ratings: QuestionRatings,
  srsStore: SrsStore,
  count: number,
  excludeIds: Set<string>,
  experienceLevel?: UserProfile["experienceLevel"],
): QuestionPackItem[] {
  const candidates = pool.filter((q) => {
    const id = questionIdKey(q!.id);
    if (excludeIds.has(id)) return false;
    const slot = inferInterviewSlot({ ...rawQuestionForSlot(q!), id });
    return slot === "technical";
  });
  const ranked = [...candidates].sort(
    (a, b) =>
      scoreWeakness(b, ratings, srsStore, experienceLevel) -
      scoreWeakness(a, ratings, srsStore, experienceLevel),
  );
  const picked: RawQuestion[] = [];
  const seen = new Set<string>();
  for (const q of ranked) {
    const id = questionIdKey(q!.id);
    if (seen.has(id)) continue;
    seen.add(id);
    picked.push(q);
    if (picked.length >= count) break;
  }
  return picked.map((q) => ({
    kind: "question" as const,
    slot: "technical" as const,
    secondsLimit: SLOT_SECONDS.technical,
    ...toQuestionFields(q),
  }));
}

function pickFitQuestion(
  pool: RawQuestion[],
  excludeIds: Set<string>,
): QuestionPackItem | undefined {
  const fits = pool.filter((q) => {
    const id = questionIdKey(q!.id);
    if (excludeIds.has(id)) return false;
    return inferInterviewSlot({ ...rawQuestionForSlot(q!), id }) === "fit";
  });
  const q = pickOne(fits);
  if (!q) return undefined;
  return {
    kind: "question",
    slot: "fit",
    secondsLimit: SLOT_SECONDS.fit,
    ...toQuestionFields(q),
  };
}

function buildDealItem(deal: MaDeal, translate: TranslateFn): DealPackItem {
  return {
    kind: "deal",
    slot: "actu",
    secondsLimit: SLOT_SECONDS.actu,
    dealId: deal.id,
    dealTitle: deal.title,
    question: translate("interviewPack.deal.question", { title: deal.title }),
    steps: [
      deal.pointEntretien,
      deal.headlineEv ? translate("interviewPack.deal.valuation", { value: deal.headlineEv }) : "",
      deal.contexte ?? "",
    ].filter(Boolean),
    tip: translate("interviewPack.deal.tip"),
  };
}

function buildSectorItem(
  sectorId: SectorId,
  translate: TranslateFn,
  locale: AppLocale = DEFAULT_LOCALE,
): SectorPackItem {
  const s = getSectorData(locale)[sectorId];
  return {
    kind: "sector",
    slot: "sector",
    secondsLimit: SLOT_SECONDS.sector,
    sectorId,
    sectorName: s.name,
    emblematicDealId: s.emblematicDealId,
    question: s.question,
    steps: [
      s.reponse,
      translate("interviewPack.sector.context", {
        tag: s.tag,
        marketSize: s.panorama.tailleMarche,
      }),
    ],
    tip: translate("interviewPack.sector.tip"),
  };
}

export function getPackItemGuideLinks(
  item: InterviewPackItem,
  translate: TranslateFn = defaultT,
): PackGuideLink[] {
  if (item.kind === "opening") {
    return [{ label: translate("interviewPack.link.cvGuide"), to: item.guideHref }];
  }
  if (item.kind === "deal") {
    return [
      {
        label: translate("interviewPack.link.dealSheet"),
        to: "/actualite",
        search: { deal: item.dealId },
      },
    ];
  }
  if (item.kind === "sector") {
    const links: PackGuideLink[] = [
      {
        label: translate("interviewPack.link.sectorSheet"),
        to: "/",
        search: { tab: "secteurs", sector: item.sectorId },
      },
    ];
    if (item.emblematicDealId) {
      links.push({
        label: translate("interviewPack.link.emblematicDeal"),
        to: "/actualite",
        search: { deal: item.emblematicDealId },
      });
    }
    return links;
  }
  return [];
}

export type BuildInterviewPackOptions = {
  ratings?: QuestionRatings;
  srsStore?: SrsStore;
  size?: 5 | 7;
  /** Secteurs préférés du profil (sinon tirage aléatoire). */
  preferredSectorIds?: SectorId[];
  /** Noms de banques cibles pour biaiser les deals actu. */
  targetBankNames?: string[];
  /** Langue des libellés générés (question d'ouverture, deals, sectoriel). */
  locale?: AppLocale;
};

export function pickDealForPack(
  bankNames: string[],
  locale: AppLocale = DEFAULT_LOCALE,
): MaDeal | undefined {
  const base = getMaDeals(locale).filter((d) => d.kind === "deal" && d.pointEntretien.length > 20);
  if (bankNames.length > 0) {
    const matched = base.filter((d) => bankNames.some((name) => dealMatchesBank(d, name)));
    if (matched.length > 0) return pickOne(matched);
  }
  return pickOne(base);
}

function pickSectorForPack(preferred: SectorId[]): SectorId {
  if (preferred.length > 0) return pickOne(preferred) ?? preferred[0]!;
  return pickOne([...SECTOR_IDS]) ?? "tmt";
}

export function buildInterviewPack(options: BuildInterviewPackOptions = {}): InterviewPackItem[] {
  const profile = typeof window !== "undefined" ? loadProfile() : null;
  const locale = options.locale ?? DEFAULT_LOCALE;
  const translate = createTranslator(locale);
  const bankNames = options.targetBankNames ?? getTargetBankNames();
  const sectors =
    options.preferredSectorIds ??
    (profile?.sectorIds && profile.sectorIds.length > 0 ? profile.sectorIds : undefined) ??
    [];

  const packSize = options.size ?? profile?.defaultPackSize ?? 5;
  const { ratings = {}, srsStore = {} } = options;
  const pool = getQuestions(locale) as RawQuestion[];
  const excludeIds = new Set<string>();

  const opening: OpeningPackItem = {
    kind: "opening",
    slot: "opening",
    secondsLimit: SLOT_SECONDS.opening,
    ...getCvOpening(translate),
  };

  const pack: InterviewPackItem[] = [opening];

  const techCount = packSize === 7 ? 3 : 2;
  const technicals = pickTechnicalQuestions(
    pool,
    ratings,
    srsStore,
    techCount,
    excludeIds,
    profile?.experienceLevel,
  );
  for (const t of technicals) {
    excludeIds.add(t.id);
    pack.push(t);
  }

  if (packSize === 7) {
    const fit = pickFitQuestion(pool, excludeIds);
    if (fit) {
      excludeIds.add(fit.id);
      pack.splice(1, 0, fit);
    }
  }

  const deal = pickDealForPack(bankNames, locale);
  if (deal) pack.push(buildDealItem(deal, translate));

  pack.push(buildSectorItem(pickSectorForPack(sectors), translate, locale));

  return pack.slice(0, packSize === 7 ? 7 : 5);
}

export function packItemLabel(item: InterviewPackItem, translate: TranslateFn = defaultT): string {
  switch (item.kind) {
    case "opening":
      return translate("interviewPack.label.opening");
    case "question":
      if (item.slot === "fit") return translate("interviewPack.label.fit");
      if (item.slot === "technical") return translate("interviewPack.label.technical");
      return item.slot;
    case "deal":
      return translate("interviewPack.label.deal");
    case "sector":
      return translate("interviewPack.label.sector", { name: item.sectorName });
  }
}

export function packItemCategory(item: InterviewPackItem): string {
  if (item.kind === "question") return item.category;
  if (item.kind === "deal") return "actu";
  if (item.kind === "sector") return "sector";
  return "opening";
}

export function packTotalSeconds(pack: InterviewPackItem[]): number {
  return pack.reduce((sum, item) => sum + item.secondsLimit, 0);
}

export function packItemSrsId(item: InterviewPackItem): string | null {
  if (item.kind === "question") return `q-${item.id}`;
  return null;
}
