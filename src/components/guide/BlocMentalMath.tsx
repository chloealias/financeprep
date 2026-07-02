import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { GuideIntro, GuideSectionTitle, guideCardClass } from "@/components/guide/guide-ui";

type Drill = {
  prompt: string;
  method: string;
  answer: string;
};

const drills: Drill[] = [
  {
    prompt: "27 × 11 = ?",
    method: "Trachtenberg ×11 : chiffre des unités = 7 ; milieu = 2+7=9 ; dizaines = 2 → 297",
    answer: "297",
  },
  {
    prompt: "48 × 5 = ?",
    method: "×5 = ×10 puis ÷2 → 480 ÷ 2 = 240",
    answer: "240",
  },
  {
    prompt: "15 % de 320 = ?",
    method: "10 % = 32 ; 5 % = 16 ; total = 48",
    answer: "48",
  },
  {
    prompt: "35² = ?",
    method: "Milieu de 5 : 3×4 = 12 → coller 25 → 1 225",
    answer: "1225",
  },
];

export function BlocMentalMath() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  return (
    <>
      <GuideIntro>
        Le calcul mental est testé pour la vivacité et la gestion du stress — pas pour remplacer
        Excel. Méthode Trachtenberg et astuces % pour gagner 10–20 secondes par question.
      </GuideIntro>

      <div className="mb-8">
        <GuideSectionTitle>Trachtenberg — multiplier par 11</GuideSectionTitle>
        <div className={guideCardClass}>
          <p className="text-foreground text-sm mb-3">
            Pour <strong>AB × 11</strong> (deux chiffres) : unité = B ; milieu = A+B (retenue si
            ≥10) ; dizaine = A (+ retenue).
          </p>
          <p className="text-muted-foreground text-sm font-light italic">
            Ex. 53 × 11 → unité 3 ; 5+3=8 ; dizaine 5 → <strong>583</strong>
          </p>
        </div>
        <div className={`${guideCardClass} mt-3`}>
          <p className="text-foreground text-sm font-medium mb-1">×12 rapide</p>
          <p className="text-muted-foreground text-sm font-light">
            ×12 = ×10 + ×2. Ex. 45 × 12 = 450 + 90 = 540.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle>Pourcentages rapides</GuideSectionTitle>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { pct: "10 %", tip: "Décaler la virgule d'un rang" },
            { pct: "5 %", tip: "Moitié de 10 %" },
            { pct: "15 %", tip: "10 % + 5 %" },
            { pct: "20 %", tip: "÷5 ou ×2 sur 10 %" },
            { pct: "25 %", tip: "÷4" },
            { pct: "1 %", tip: "÷100 — ordre de grandeur" },
          ].map((row) => (
            <div key={row.pct} className="bg-muted rounded-lg px-3 py-2.5 text-sm">
              <span className="font-semibold text-foreground">{row.pct}</span>
              <span className="text-muted-foreground font-light"> — {row.tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle>Mini-entraînement</GuideSectionTitle>
        <div className="space-y-3">
          {drills.map((d, i) => (
            <div key={i} className={guideCardClass}>
              <p className="text-foreground font-medium mb-2">{d.prompt}</p>
              {!revealed[i] ? (
                <button
                  type="button"
                  onClick={() => setRevealed((r) => ({ ...r, [i]: true }))}
                  className="text-primary text-sm underline underline-offset-2 hover:text-primary/80"
                >
                  Voir méthode et réponse
                </button>
              ) : (
                <>
                  <p className="text-muted-foreground text-sm font-light mb-1">{d.method}</p>
                  <p className="text-emerald-800 text-sm font-semibold">→ {d.answer}</p>
                </>
              )}
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-xs font-light mt-4">
          <Link to="/flashcards" search={{ mode: "flashcards" }} className="underline">
            Continuer en flashcards
          </Link>{" "}
          (catégorie Déstabilisantes) pour plus d&apos;exercices chiffrés.
        </p>
      </div>
    </>
  );
}
