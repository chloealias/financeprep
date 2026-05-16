import { Triangle } from 'lucide-react';
import { BlocWrapper } from '@/components/guide/BlocWrapper';

export function BlocPyramid ({ openBloc, setOpenBloc }) {
  const starCards = [
    { letter: 'S', label: 'Situation', quoi: 'Le contexte en 1-2 phrases maximum', erreur: 'Trop long — 30 sec max', exemple: "J'étais en stage M&A chez X, durant la phase de due diligence d'une acquisition dans le retail" },
    { letter: 'T', label: 'Tâche', quoi: 'Votre rôle et objectif spécifique', erreur: "Confondre Tâche et Action — la tâche c'est CE QUE vous deviez faire, pas comment", exemple: "J'étais responsable de la revue du BFR historique et de la normalisation des EBITDA" },
    { letter: 'A', label: 'Action', quoi: "CE QUE VOUS avez fait — toujours 'je', pas 'nous'", erreur: "Utiliser 'nous' — l'interviewer veut savoir VOTRE contribution personnelle", exemple: "J'ai construit un modèle de BFR mensuel sur 3 ans, identifié 2 ajustements non récurrents représentant 800k€ d'EBITDA normalisé" },
    { letter: 'R', label: 'Résultat', quoi: 'Impact mesurable. Toujours chiffrer si possible.', erreur: "Terminer sans résultat — 'j'ai fait X' sans dire ce que ça a produit", exemple: "L'analyse a été intégrée au mémo d'acquisition. Le client a réduit son offre de 5% en conséquence." },
  ];

  const matrix = [
    { q: "Pourquoi la finance ?",         pyramid: true,  star: false },
    { q: "Parlez d'une difficulté",        pyramid: false, star: true  },
    { q: "Quelle est votre valeur ajoutée ?", pyramid: true, star: false },
    { q: "Travail en équipe — exemple ?",  pyramid: false, star: true  },
    { q: "Expliquez-moi un concept",       pyramid: true,  star: false },
    { q: "Une décision difficile ?",        pyramid: false, star: true  },
    { q: "Pourquoi notre banque ?",        pyramid: true,  star: false },
  ];

  return (
    <BlocWrapper id="pyramid" tag="Méta-framework" titre="Pyramid Principle + STAR" icon={Triangle} openBloc={openBloc} setOpenBloc={setOpenBloc}>
      <p className="text-blue-700 font-light leading-relaxed mb-8">
        Ces deux frameworks structurent toutes vos réponses — techniques ET comportementales. Les maîtriser, c'est paraître deux fois plus clair que les autres candidats, à niveau de connaissance égal.
      </p>

      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Pyramid Principle
        </div>
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
          <polygon points="250,28 169,115 331,115" fill="#1e3a8a" shapeRendering="geometricPrecision" />
          <g clipPath="url(#pyramid-tier-top)">
            <text x="250" y="84" fontSize="8" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">CONCLUSION</text>
            <text x="250" y="100" fontSize="7" fill="#bfdbfe" textAnchor="middle" dominantBaseline="middle">D'abord</text>
          </g>
          <polygon points="169,115 331,115 408,200 92,200" fill="#3b82f6" shapeRendering="geometricPrecision" />
          <text x="250" y="162" fontSize="11" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">ARGUMENTS CLÉS</text>
          <text x="250" y="182" fontSize="9" fill="#dbeafe" textAnchor="middle" dominantBaseline="middle">2-3 raisons principales</text>
          <polygon points="92,200 408,200 485,285 15,285" fill="#93c5fd" shapeRendering="geometricPrecision" />
          <text x="250" y="248" fontSize="11" fill="#1e3a8a" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">PREUVES &amp; EXEMPLES</text>
          <text x="250" y="268" fontSize="9" fill="#1e40af" textAnchor="middle" dominantBaseline="middle">Chiffres, cas concrets, anecdotes</text>
        </svg>
        <div className="bg-blue-900 text-white rounded-xl p-5 mb-6">
          <div className="text-blue-300 text-xs uppercase tracking-[0.2em] mb-2">Règle d'or</div>
          <p className="font-light">Ne jamais commencer par le contexte. Commencer par la réponse. Le contexte vient ensuite pour justifier.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="text-red-700 text-xs font-semibold uppercase tracking-wider mb-2">❌ Sans Pyramid</div>
            <p className="text-red-800 text-sm font-light italic">"J'ai toujours été intéressé par les chiffres... Au lycée j'aimais les maths... En L3 j'ai fait un cours de compta..."</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">✅ Avec Pyramid</div>
            <p className="text-emerald-800 text-sm font-light italic space-y-2">
              <span className="block"><span className="font-semibold not-italic text-emerald-900">Conclusion —</span> « La finance me permet de comprendre comment les entreprises créent de la valeur — c'est ce qui me passionne. »</span>
              <span className="block"><span className="font-semibold not-italic text-emerald-900">Arguments —</span> « Premièrement… Deuxièmement… »</span>
              <span className="block"><span className="font-semibold not-italic text-emerald-900">Preuve —</span> « C'est notamment ce que j'ai fait chez X où… »</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Framework STAR
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {starCards.map(card => (
            <div key={card.letter} className="bg-white border-2 border-blue-100 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 text-white font-serif text-xl flex items-center justify-center">{card.letter}</div>
                <span className="font-serif text-blue-950 text-lg">{card.label}</span>
              </div>
              <div className="text-blue-900 text-sm mb-2">{card.quoi}</div>
              <div className="bg-red-50 rounded-lg px-3 py-2 mb-2 text-red-700 text-xs">⚠ {card.erreur}</div>
              <div className="bg-blue-50 rounded-lg px-3 py-2 text-blue-700 text-xs italic">"{card.exemple}"</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Quand utiliser quoi ?
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="text-left px-4 py-3 rounded-tl-lg font-medium">Question</th>
                <th className="px-4 py-3 font-medium text-center">Pyramid</th>
                <th className="px-4 py-3 rounded-tr-lg font-medium text-center">STAR</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="px-4 py-3 text-blue-900">{row.q}</td>
                  <td className="px-4 py-3 text-center">{row.pyramid ? <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">✓ Oui</span> : <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded text-xs">—</span>}</td>
                  <td className="px-4 py-3 text-center">{row.star ? <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">✓ Oui</span> : <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded text-xs">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BlocWrapper>
  );
};

// =====================================================
