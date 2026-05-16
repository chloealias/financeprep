import React, { useState, useEffect } from 'react';
import { User, Clock, ChevronRight, CheckCircle2, Award } from 'lucide-react';
import { BlocWrapper } from '@/components/guide/BlocWrapper';

export function BlocCV ({ openBloc, setOpenBloc }) {
  const [checked, setChecked] = useState({});
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const intervalRef = React.useRef(null);

  const checklist = [
    { id: 'c1', text: "Je connais le nom de mon interlocuteur et sa banque" },
    { id: 'c2', text: "Je sais pourquoi cette banque / ce bureau spécifiquement" },
    { id: 'c3', text: "J'ai un fil directeur (1 phrase qui relie tout mon parcours)" },
    { id: 'c4', text: "J'ai au moins 1 chiffre concret par expérience clé" },
    { id: 'c5', text: "Ma réponse tient en moins de 2 minutes" },
    { id: 'c6', text: "Je termine par 'c'est pourquoi ce poste m'intéresse'" },
  ];
  const score = Object.values(checked).filter(Boolean).length;

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerActive, timeLeft]);

  const resetTimer = () => { setTimerActive(false); setTimeLeft(120); };
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');
  const progress = (timeLeft / 120) * 100;

  const pieges = [
    "Réciter son CV chronologiquement sans fil directeur",
    "Parler plus de 2 minutes sans y être invité",
    "Mentionner des expériences non pertinentes pour le poste",
    "Ne pas personnaliser pour la banque cible",
    "Terminer sans transition vers 'pourquoi ce poste'",
  ];

  const dealSteps = [
    { num: '01', label: 'Contexte', desc: "Quelle entreprise, quel secteur, quelle taille de deal (EV / equity value)" },
    { num: '02', label: 'Logique stratégique', desc: "Pourquoi ce deal ? Synergies, consolidation, expansion géographique ?" },
    { num: '03', label: 'Structure financière', desc: "Mix financement : cash / actions / dette. Multiple payé (EV/EBITDA)" },
    { num: '04', label: 'Votre rôle', desc: "Votre équipe, vos livrables concrets (modèle, due dil, mémo, data room)" },
    { num: '05', label: 'Outcome', desc: "Résultat du deal. Leçon apprise. Pourquoi ce deal est représentatif de vos compétences." },
  ];

  return (
    <BlocWrapper id="cv" tag="La question d'ouverture" titre="Walk me through your CV / a deal" icon={User} openBloc={openBloc} setOpenBloc={setOpenBloc}>
      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Checklist avant de répondre
          {score === 6 && <span className="ml-2 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">✓ Prêt à répondre</span>}
        </div>
        <div className="space-y-2 mb-3">
          {checklist.map(item => (
            <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!checked[item.id]}
                onChange={e => setChecked(c => ({ ...c, [item.id]: e.target.checked }))}
                className="w-4 h-4 accent-blue-700"
              />
              <span className={`text-sm transition-all ${checked[item.id] ? 'line-through text-blue-300' : 'text-blue-900'}`}>
                {item.text}
              </span>
            </label>
          ))}
        </div>
        <div className="text-xs text-blue-500">{score}/6 critères cochés</div>
      </div>

      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Structure recommandée — Walk me through your CV
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { num: '01', titre: "L'origine", duree: '20 sec', desc: "D'où venez-vous ? Un fil conducteur, pas une liste chronologique. 1 phrase d'ancrage : 'J'ai toujours été attiré par la compréhension des entreprises à travers leurs chiffres.'", dark: false },
            { num: '02', titre: "Le pivot", duree: '60 sec', desc: "Vos 2-3 expériences les plus pertinentes. Pour chacune : contexte (1 phrase) + action + résultat chiffré. Ne détaillez que ce qui compte pour le poste.", dark: false },
            { num: '03', titre: "La cible", duree: '20 sec', desc: "Pourquoi cette banque, ce bureau, ce moment. Montrez que vous avez fait vos recherches. Terminez sur une conviction, pas une question.", dark: true },
          ].map(acte => (
            <div key={acte.num} className={`rounded-xl p-5 ${acte.dark ? 'bg-blue-900 text-white' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-serif font-light text-blue-300">{acte.num}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${acte.dark ? 'bg-blue-800 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>{acte.duree}</span>
              </div>
              <div className={`font-serif text-lg mb-2 ${acte.dark ? 'text-white' : 'text-blue-950'}`}>{acte.titre}</div>
              <div className={`text-sm font-light leading-relaxed ${acte.dark ? 'text-blue-200' : 'text-blue-700'}`}>{acte.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Variante — Walk me through a deal
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-blue-100 space-y-3">
          {dealSteps.map(step => (
            <div key={step.num} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 text-white text-sm font-serif flex items-center justify-center">{step.num}</div>
              <div className="pt-1">
                <span className="text-blue-950 font-medium text-sm">{step.label} — </span>
                <span className="text-blue-700 text-sm font-light">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Timer d'entraînement
        </div>
        <div className="bg-white border-2 border-blue-100 rounded-xl p-6 text-center">
          <div className={`text-5xl font-mono font-light mb-4 ${timeLeft === 0 ? 'text-red-500' : 'text-blue-950'}`}>
            {mm}:{ss}
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2 mb-6">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${timeLeft === 0 ? 'bg-red-400' : 'bg-blue-700'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {timeLeft === 0 && <div className="text-red-500 font-medium mb-4">Temps écoulé !</div>}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setTimerActive(a => !a)}
              disabled={timeLeft === 0}
              className="px-6 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 disabled:opacity-40 transition-all"
            >
              {timerActive ? 'Pause' : timeLeft === 120 ? 'Démarrer (2 min)' : 'Reprendre'}
            </button>
            <button onClick={resetTimer} className="px-6 py-2.5 border border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all">
              Reset
            </button>
          </div>
          <p className="text-blue-400 text-xs mt-4 italic">Répondez à voix haute. Enregistrez-vous si possible.</p>
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Pièges classiques
        </div>
        <div className="space-y-2">
          {pieges.map((p, i) => (
            <div key={i} className="flex gap-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg px-4 py-3">
              <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-red-800 text-sm">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </BlocWrapper>
  );
};

