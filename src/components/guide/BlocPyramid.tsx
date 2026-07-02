import { GuideIntro, GuideSectionTitle } from "@/components/guide/guide-ui";

export function BlocPyramid() {
  const starCards = [
    {
      letter: "S",
      label: "Situation",
      quoi: "Le contexte en 1-2 phrases maximum",
      erreur: "Trop long — 30 sec max",
      exemple:
        "J'étais en stage M&A chez X, durant la phase de due diligence d'une acquisition dans le retail",
    },
    {
      letter: "T",
      label: "Tâche",
      quoi: "Votre rôle et objectif spécifique",
      erreur: "Confondre Tâche et Action — la tâche c'est CE QUE vous deviez faire, pas comment",
      exemple:
        "J'étais responsable de la revue du BFR historique et de la normalisation des EBITDA",
    },
    {
      letter: "A",
      label: "Action",
      quoi: "CE QUE VOUS avez fait — toujours 'je', pas 'nous'",
      erreur: "Utiliser 'nous' — l'interviewer veut savoir VOTRE contribution personnelle",
      exemple:
        "J'ai construit un modèle de BFR mensuel sur 3 ans, identifié 2 ajustements non récurrents représentant 800k€ d'EBITDA normalisé",
    },
    {
      letter: "R",
      label: "Résultat",
      quoi: "Impact mesurable. Toujours chiffrer si possible.",
      erreur: "Terminer sans résultat — 'j'ai fait X' sans dire ce que ça a produit",
      exemple:
        "L'analyse a été intégrée au mémo d'acquisition. Le client a réduit son offre de 5% en conséquence.",
    },
  ];

  const matrix = [
    { q: "Pourquoi la finance ?", pyramid: true, star: false },
    { q: "Parlez d'une difficulté", pyramid: false, star: true },
    { q: "Quelle est votre valeur ajoutée ?", pyramid: true, star: false },
    { q: "Travail en équipe — exemple ?", pyramid: false, star: true },
    { q: "Expliquez-moi un concept", pyramid: true, star: false },
    { q: "Une décision difficile ?", pyramid: false, star: true },
    { q: "Pourquoi notre banque ?", pyramid: true, star: false },
  ];

  return (
    <>
      <GuideIntro>
        Ces deux frameworks structurent toutes vos réponses — techniques ET comportementales. Les
        maîtriser, c&apos;est paraître deux fois plus clair que les autres candidats, à niveau de
        connaissance égal.
      </GuideIntro>

      <div className="mb-8">
        <GuideSectionTitle>Pyramid Principle</GuideSectionTitle>
        <svg
          viewBox="0 0 500 300"
          className="w-full h-auto max-w-lg mx-auto mb-6"
          role="img"
          aria-label="Pyramide : conclusion en premier, puis arguments, puis preuves"
        >
          <defs>
            <clipPath id="pyramid-tier-top">
              <polygon points="250,28 169,115 331,115" />
            </clipPath>
          </defs>
          <polygon
            points="250,28 169,115 331,115"
            fill="#1e3a8a"
            shapeRendering="geometricPrecision"
          />
          <g clipPath="url(#pyramid-tier-top)">
            <text
              x="250"
              y="84"
              fontSize="8"
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
              fontWeight="bold"
            >
              CONCLUSION
            </text>
            <text
              x="250"
              y="100"
              fontSize="7"
              fill="#bfdbfe"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              D'abord
            </text>
          </g>
          <polygon
            points="169,115 331,115 408,200 92,200"
            fill="#3b82f6"
            shapeRendering="geometricPrecision"
          />
          <text
            x="250"
            y="162"
            fontSize="11"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
          >
            ARGUMENTS CLÉS
          </text>
          <text
            x="250"
            y="182"
            fontSize="9"
            fill="#dbeafe"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            2-3 raisons principales
          </text>
          <polygon
            points="92,200 408,200 485,285 15,285"
            fill="#93c5fd"
            shapeRendering="geometricPrecision"
          />
          <text
            x="250"
            y="248"
            fontSize="11"
            fill="#1e3a8a"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
          >
            PREUVES &amp; EXEMPLES
          </text>
          <text
            x="250"
            y="268"
            fontSize="9"
            fill="#1e40af"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Chiffres, cas concrets, anecdotes
          </text>
        </svg>
        <div className="bg-primary text-primary-foreground rounded-xl p-5 mb-6">
          <div className="text-primary-foreground/80 text-xs uppercase tracking-[0.2em] mb-2">
            Règle d'or
          </div>
          <p className="font-light">
            Ne jamais commencer par le contexte. Commencer par la réponse. Le contexte vient ensuite
            pour justifier.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="text-red-700 text-xs font-semibold uppercase tracking-wider mb-2">
              ❌ Sans Pyramid
            </div>
            <p className="text-red-800 text-sm font-light italic">
              "J'ai toujours été intéressé par les chiffres... Au lycée j'aimais les maths... En L3
              j'ai fait un cours de compta..."
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">
              ✅ Avec Pyramid
            </div>
            <p className="text-emerald-800 text-sm font-light italic space-y-2">
              <span className="block">
                <span className="font-semibold not-italic text-emerald-900">Conclusion —</span> « La
                finance me permet de comprendre comment les entreprises créent de la valeur — c'est
                ce qui me passionne. »
              </span>
              <span className="block">
                <span className="font-semibold not-italic text-emerald-900">Arguments —</span> «
                Premièrement… Deuxièmement… »
              </span>
              <span className="block">
                <span className="font-semibold not-italic text-emerald-900">Preuve —</span> « C'est
                notamment ce que j'ai fait chez X où… »
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <GuideSectionTitle>Framework STAR</GuideSectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          {starCards.map((card) => (
            <div key={card.letter} className="bg-card border-2 border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground font-serif text-xl flex items-center justify-center">
                  {card.letter}
                </div>
                <span className="font-serif text-foreground text-lg">{card.label}</span>
              </div>
              <div className="text-foreground text-sm mb-2">{card.quoi}</div>
              <div className="bg-red-50 rounded-lg px-3 py-2 mb-2 text-red-700 text-xs">
                ⚠ {card.erreur}
              </div>
              <div className="bg-muted rounded-lg px-3 py-2 text-muted-foreground text-xs italic">
                "{card.exemple}"
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <GuideSectionTitle>Quand utiliser quoi ?</GuideSectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-4 py-3 rounded-tl-lg font-medium">Question</th>
                <th className="px-4 py-3 font-medium text-center">Pyramid</th>
                <th className="px-4 py-3 rounded-tr-lg font-medium text-center">STAR</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-muted" : "bg-card"}>
                  <td className="px-4 py-3 text-foreground">{row.q}</td>
                  <td className="px-4 py-3 text-center">
                    {row.pyramid ? (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                        ✓ Oui
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded text-xs">
                        —
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.star ? (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                        ✓ Oui
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded text-xs">
                        —
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 mb-8">
        <GuideSectionTitle>Gagner du temps / gérer un blanc</GuideSectionTitle>
        <p className="text-muted-foreground text-sm font-light mb-4">
          Un silence de 3 secondes paraît long en entretien. Ces réflexes achètent du temps sans
          perdre en crédibilité — en combinant avec Pyramid (conclusion d&apos;abord).
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">
              Phrases utiles
            </div>
            <ul className="text-foreground text-sm space-y-2 list-disc list-inside">
              <li>« Si je reformule bien, vous me demandez… »</li>
              <li>« Je vais structurer ma réponse en trois points. »</li>
              <li>« En synthèse : [conclusion]. Détail : … »</li>
              <li>« Puis-je prendre quelques secondes pour organiser ma pensée ? »</li>
              <li>« Côté chiffres, l&apos;ordre de grandeur est… » (avant le calcul exact)</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold mb-2">
              À éviter
            </div>
            <ul className="text-foreground text-sm space-y-2 list-disc list-inside">
              <li>Silence total sans annoncer la structure</li>
              <li>Inventer un chiffre pour « remplir »</li>
              <li>« Je ne sais pas » sans proposer une piste</li>
              <li>Partir dans le détail avant la conclusion</li>
            </ul>
          </div>
        </div>
        <p className="text-muted-foreground text-xs font-light italic">
          Règle : même sous pression, donner une conclusion en 10 secondes — puis approfondir ou
          demander une précision.
        </p>
      </div>
    </>
  );
}

// =====================================================
