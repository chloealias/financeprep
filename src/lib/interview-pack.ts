import { questions } from "@/data/questions";
import { MA_DEALS, type MaDeal } from "@/data/ma-deals";
import { SECTOR_DATA } from "@/data/sector-data";
import { SECTOR_IDS, type SectorId } from "@/lib/sectors";
import { shuffle, type SrsStore } from "@/lib/srs";
import { getTargetBankNames, loadProfile, type UserProfile } from "@/lib/profile-storage";
import { questionIdKey, type QuestionRatings } from "@/lib/storage";
import { dealMatchesBank } from "@/data/ma-deals";

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

export const CV_OPENING = {
  id: "opening-cv",
  question: "Walk me through your CV",
  steps: [
    "Structure en 2 minutes max : formation → expériences (ordre chronologique inverse) → pourquoi ce poste maintenant.",
    "Fil directeur : une phrase qui relie tout le parcours (secteur, géographie, type de deals visé).",
    "Chaque expérience : contexte (1 phrase) → votre rôle → 1 chiffre ou résultat concret.",
    "Terminer par : « C'est pourquoi ce poste chez [banque] est la suite logique de mon parcours. »",
  ],
  tip: "Préparer avec le timer 2 min du guide CV. Éviter de lire le CV — raconter une histoire.",
  guideHref: "/cv" as const,
};

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
} & typeof CV_OPENING;

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
  guideHref: "/actualite";
};

export type SectorPackItem = {
  kind: "sector";
  slot: "sector";
  secondsLimit: number;
  sectorId: SectorId;
  sectorName: string;
  question: string;
  steps: string[];
  tip?: string;
};

export type InterviewPackItem = OpeningPackItem | QuestionPackItem | DealPackItem | SectorPackItem;

export const FIT_QUESTION_IDS = new Set([
  "58",
  "59",
  "67",
  "87",
  "89",
  "123",
  "124",
  "125",
  "129",
  "130",
]);

type RawQuestion = (typeof questions)[number];

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
  if (/\bquestion fit\b|\bfit ultra\b|\bfit révélatrice\b|\bfit piège\b|\bfit\/strat\b|\bfit fondamentale\b|\bfit déstabilisante\b/.test(blob)) {
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
    const slot = inferInterviewSlot({ ...q!, id });
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

function pickFitQuestion(pool: RawQuestion[], excludeIds: Set<string>): QuestionPackItem | undefined {
  const fits = pool.filter((q) => {
    const id = questionIdKey(q!.id);
    if (excludeIds.has(id)) return false;
    return inferInterviewSlot({ ...q!, id }) === "fit";
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

function buildDealItem(deal: MaDeal): DealPackItem {
  return {
    kind: "deal",
    slot: "actu",
    secondsLimit: SLOT_SECONDS.actu,
    dealId: deal.id,
    dealTitle: deal.title,
    question: `Actualité M&A — ${deal.title}`,
    steps: [
      deal.pointEntretien,
      deal.headlineEv ? `Valorisation / taille : ${deal.headlineEv}` : "",
      deal.contexte ?? "",
    ].filter(Boolean),
    tip: "Structure : contexte → logique stratégique → valorisation → ce que vous en retiendriez pour un client.",
    guideHref: "/actualite",
  };
}

function buildSectorItem(sectorId: SectorId): SectorPackItem {
  const s = SECTOR_DATA[sectorId];
  return {
    kind: "sector",
    slot: "sector",
    secondsLimit: SLOT_SECONDS.sector,
    sectorId,
    sectorName: s.name,
    question: s.question,
    steps: [s.reponse, `Secteur : ${s.tag} — ${s.panorama.tailleMarche}`],
    tip: "Relier la réponse à un deal récent du secteur si possible.",
  };
}

export type BuildInterviewPackOptions = {
  ratings?: QuestionRatings;
  srsStore?: SrsStore;
  size?: 5 | 7;
  /** Secteurs préférés du profil (sinon tirage aléatoire). */
  preferredSectorIds?: SectorId[];
  /** Noms de banques cibles pour biaiser les deals actu. */
  targetBankNames?: string[];
};

function pickDealForPack(bankNames: string[]): MaDeal | undefined {
  const base = MA_DEALS.filter((d) => d.kind === "deal" && d.pointEntretien.length > 20);
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
  const bankNames = options.targetBankNames ?? getTargetBankNames();
  const sectors =
    options.preferredSectorIds ??
    (profile?.sectorIds && profile.sectorIds.length > 0 ? profile.sectorIds : undefined) ??
    [];

  const packSize = options.size ?? profile?.defaultPackSize ?? 5;
  const { ratings = {}, srsStore = {} } = options;
  const pool = questions as RawQuestion[];
  const excludeIds = new Set<string>();

  const opening: OpeningPackItem = {
    kind: "opening",
    slot: "opening",
    secondsLimit: SLOT_SECONDS.opening,
    ...CV_OPENING,
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

  const deal = pickDealForPack(bankNames);
  if (deal) pack.push(buildDealItem(deal));

  pack.push(buildSectorItem(pickSectorForPack(sectors)));

  return pack.slice(0, packSize === 7 ? 7 : 5);
}

export function packItemLabel(item: InterviewPackItem): string {
  switch (item.kind) {
    case "opening":
      return "Ouverture CV";
    case "question":
      if (item.slot === "fit") return "Fit / comportemental";
      if (item.slot === "technical") return "Technique";
      return item.slot;
    case "deal":
      return "Actualité M&A";
    case "sector":
      return `Sectoriel · ${item.sectorName}`;
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
