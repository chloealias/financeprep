import { useState } from "react";
import { GuideChipButton, GuideSectionTitle, guideCardClass } from "@/components/guide/guide-ui";

export function BlocExcel() {
  const [tab, setTab] = useState<"ts" | "pe">("ts");

  const shortcuts = [
    { key: "F4", usage: "Figer une référence (absolu/relatif) — indispensable dans les formules" },
    { key: "Ctrl + Shift + L", usage: "Activer/désactiver les filtres" },
    { key: "Ctrl + T", usage: "Transformer une plage en tableau structuré" },
    { key: "Alt + =", usage: "Somme automatique de la sélection" },
    { key: "Ctrl + 1", usage: "Ouvrir format de cellule" },
    { key: "Ctrl + Shift + $", usage: "Format monétaire" },
    { key: "Ctrl + Shift + %", usage: "Format pourcentage" },
    { key: "F2", usage: "Entrer en mode édition d'une cellule" },
    { key: "Ctrl + [", usage: "Aller à la cellule source d'une formule" },
  ];

  const shortcutsPE = [
    ...shortcuts,
    { key: "Alt + A + W + T", usage: "Créer une table de données (sensitivities)" },
    { key: "F9", usage: "Recalculer manuellement — utile avec circularités activées" },
  ];

  const formulas = {
    ts: [
      {
        name: "INDEX/MATCH",
        formula: "=INDEX(plage_retour, MATCH(valeur, plage_recherche, 0))",
        usage: "Remplace VLOOKUP, cherche dans n'importe quelle direction",
        cas: "Récupérer un multiple de comparables sur un identifiant unique",
      },
      {
        name: "SUMIFS",
        formula: "=SUMIFS(sum_range, criteria_range1, criteria1, ...)",
        usage: "Somme conditionnelle multi-critères",
        cas: "Totaliser des flux par catégorie et par période",
      },
      {
        name: "IFERROR",
        formula: "=IFERROR(formule, valeur_si_erreur)",
        usage: "Éviter les #DIV/0! et #N/A dans les modèles",
        cas: "Indispensable dans les tableaux de comparables",
      },
      {
        name: "XLOOKUP",
        formula: "=XLOOKUP(valeur, plage_rech, plage_retour, [si_absent])",
        usage: "INDEX/MATCH simplifié, bidirectionnel (Excel 365)",
        cas: "Plus lisible dans les modèles partagés",
      },
    ],
    pe: [
      {
        name: "INDEX/MATCH",
        formula: "=INDEX(plage_retour, MATCH(valeur, plage_recherche, 0))",
        usage: "Remplace VLOOKUP, cherche dans n'importe quelle direction",
        cas: "Récupérer des données de dette par tranche",
      },
      {
        name: "Data Table",
        formula: "Données → Analyse de scénarios → Table de données",
        usage: "Matrice de sensitivités automatique",
        cas: "IRR selon EBITDA entry × exit multiple — attendu en entretien",
      },
      {
        name: "Circularity Switch",
        formula: "=IF(circ_switch=1, formula_avec_boucle, valeur_approx)",
        usage: "Gérer les circularités dans les modèles LBO",
        cas: "Intérêts sur dette variable. Activer calcul itératif dans Options Excel.",
      },
      {
        name: "IFERROR",
        formula: "=IFERROR(formule, valeur_si_erreur)",
        usage: "Éviter les erreurs qui cassent tout le modèle",
        cas: "Indispensable dans les debt schedules",
      },
    ],
  };

  const tips = {
    ts: [
      "Toujours lier IS → BS → CF. Ne jamais taper un chiffre qui peut être calculé.",
      'Utiliser un onglet "Inputs / Assumptions" séparé. Ne jamais hardcoder dans les formules.',
      "Mettre en bleu les inputs manuels, en noir les formules. Convention universelle.",
      'Vérifier le bilan : Actif = Passif. Ajouter une cellule "Check = 0" visible en rouge si ≠ 0.',
      "Commencer par le compte de résultat, puis bilan, puis tableau de flux.",
    ],
    pe: [
      "Structure en onglets : Inputs → IS/BS/CF → Debt Schedule → Returns → Sensitivities.",
      "Le Debt Schedule est le cœur du LBO. Modéliser les tranches séparément (Senior, Mezz, PIK).",
      "Les sensitivités IRR / MOIC selon entry × exit multiple sont systématiquement attendues.",
      "Cash sweep : tester si l'excédent de cash rembourse la dette ou reste au bilan.",
      "Ne jamais mélanger les devises sans ligne de conversion explicite.",
    ],
  };

  const activeShortcuts = tab === "pe" ? shortcutsPE : shortcuts;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {(["ts", "pe"] as const).map((t) => (
          <GuideChipButton key={t} active={tab === t} onClick={() => setTab(t)}>
            {t === "ts" ? "Transaction Services" : "Private Equity"}
          </GuideChipButton>
        ))}
      </div>

      <div className="mb-8">
        <GuideSectionTitle>Raccourcis indispensables</GuideSectionTitle>
        <div className="overflow-x-auto rounded-xl border-2 border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-4 py-3 font-medium w-48">Raccourci</th>
                <th className="text-left px-4 py-3 font-medium">Usage</th>
              </tr>
            </thead>
            <tbody>
              {activeShortcuts.map((s, i) => (
                <tr key={s.key} className={i % 2 === 0 ? "bg-muted" : "bg-card"}>
                  <td className="px-4 py-2.5 font-mono text-foreground text-xs font-medium">
                    {s.key}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{s.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle>Formules clés</GuideSectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          {formulas[tab].map((f) => (
            <div key={f.name} className={`${guideCardClass} p-5`}>
              <div className="font-serif text-foreground text-lg mb-2">{f.name}</div>
              <div className="font-mono text-xs bg-foreground text-background rounded-lg px-3 py-2 mb-3 break-all">
                {f.formula}
              </div>
              <div className="text-muted-foreground text-sm mb-1">{f.usage}</div>
              <div className="text-primary text-xs italic">Cas : {f.cas}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <GuideSectionTitle>
          {tab === "ts" ? "Conseils modèle 3-statements" : "Conseils modèle LBO"}
        </GuideSectionTitle>
        <ol className="space-y-2">
          {tips[tab].map((tip, i) => (
            <li key={tip} className={`flex gap-4 ${guideCardClass} px-4 py-3`}>
              <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary text-primary-foreground text-xs font-serif flex items-center justify-center">
                {i + 1}
              </div>
              <span className="text-foreground text-sm font-light pt-0.5">{tip}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
