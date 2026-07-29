import type { BankCategoryId } from "@/lib/bank-categories";

export type BankProfile = {
  id: string;
  categoryId: BankCategoryId;
  name: string;
  category: string;
  hq: string;
  /** Page About / Values / Purpose sur le site officiel */
  websiteUrl: string;
  /** Valeurs / principes officiels (libellés du site) */
  valeurs: string[];
  tagline: string;
  divisions: string[];
  particularites: string[];
  recrutement?: string;
  pointEntretien: string;
  dealEmblematique: { titre: string; texte: string };
  /** Absent si le deal emblématique n'est pas dans l'actualité M&A (ex. fusion CS/UBS) */
  emblematicDealId?: string;
  /** deal = lien vers ?deal= ; bank = liste filtrée ?bank= (coordinateurs dette) */
  emblematicLinkType?: "deal" | "bank";
  questionPiège: string;
  reponsePiège: string;
  piegeAEviter?: string;
};
