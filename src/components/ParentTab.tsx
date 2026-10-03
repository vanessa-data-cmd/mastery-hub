import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  FlaskConical,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
  HeartHandshake,
  ArrowRight,
  Download,
  FileCode
} from 'lucide-react';
import { GlobalStats, BadgeItem } from '../types';

interface ParentTabProps {
  stats: GlobalStats;
  badges: BadgeItem[];
  isBattleRoyale: boolean;
  isParentTestMode: boolean;
  setIsParentTestMode: (val: boolean) => void;
  onSimulateScore: (score: number) => void;
  onResetStats: () => void;
  onBackToMathieu: () => void;
}

export const ParentTab: React.FC<ParentTabProps> = ({
  stats,
  badges,
  isBattleRoyale,
  isParentTestMode,
  setIsParentTestMode,
  onSimulateScore,
  onResetStats,
  onBackToMathieu
}) => {
  // Simple parental gate: state to prevent Mathieu from entering by mistake
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [errorGate, setErrorGate] = useState<boolean>(false);
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);

  // Security question: 8 x 7 = 56
  const handleVerifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim() === '56') {
      setIsUnlocked(true);
      setErrorGate(false);
    } else {
      setErrorGate(true);
    }
  };

  // If locked, show parental lock gate screen
  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 sm:p-8 rounded-3xl border-2 border-amber-300 bg-white dark:bg-slate-900 shadow-lg text-slate-800 dark:text-white text-center space-y-5 animate-fadeIn">
        <div className="h-16 w-16 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <Lock className="h-8 w-8" />
        </div>

        <div>
          <h2 className="text-xl font-black">Espace Réservé aux Parents</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Cet espace contient la gestion des scores et les outils de simulation. Pour éviter que Mathieu ne clique sans faire exprès, résolvez ce petit calcul :
          </p>
        </div>

        <form onSubmit={handleVerifyGate} className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
              Combien font <strong className="text-base text-amber-600 font-black">8 × 7</strong> ?
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                if (errorGate) setErrorGate(false);
              }}
              placeholder="Votre réponse (ex: 56)"
              className="w-full text-center py-2.5 px-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 font-mono text-lg font-black focus:outline-none focus:border-amber-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              autoFocus
            />
            {errorGate && (
              <p className="text-xs font-bold text-rose-500 mt-2">
                Réponse incorrecte. (Indice : 8 × 7 = 56)
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Unlock className="h-4 w-4" />
            <span>Déverrouiller l'Espace Parent</span>
          </button>

          <button
            type="button"
            onClick={onBackToMathieu}
            className="w-full py-2.5 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>← Revenir à l'Espace Mathieu</span>
          </button>
        </form>

        <p className="text-[11px] text-slate-400">
          🔒 Sécurité active • Mathieu ne peut pas réinitialiser ses résultats par accident.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fadeIn">
      {/* Top Banner with lock status */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-black uppercase text-amber-700 dark:text-amber-400">
              <Unlock className="h-3 w-3" />
              Accès Parent Sécurisé
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Panneau de Contrôle & Outils Parent
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mathieu est protégé contre toute manipulation accidentelle de ses notes ou de son casier.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToMathieu}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>🚀 Revenir à l'Espace Mathieu</span>
          </button>

          <button
            onClick={() => {
              setIsUnlocked(false);
              setUserAnswer('');
            }}
            className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Verrouiller</span>
          </button>
        </div>
      </div>

      {/* Sandbox Toggle */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-indigo-500" />
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Mode Test Parent (Bac à sable)
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Quand ce mode est activé, un bandeau orange apparaît et vous pouvez tester n'importe quel quiz ou fonctionnalité sans que vos réponses ne modifient les notes ou statistiques réelles de Mathieu.
            </p>
          </div>

          <button
            onClick={() => setIsParentTestMode(!isParentTestMode)}
            className={`px-4 py-2 rounded-2xl text-xs font-black border transition-all cursor-pointer shrink-0 ${
              isParentTestMode
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            {isParentTestMode ? '🧪 Mode Test ACTIF' : '⚪ Mode Test DÉSACTIVÉ'}
          </button>
        </div>
      </div>

      {/* Simulations & Tests */}
      <div className="p-6 rounded-3xl bg-amber-50/80 dark:bg-amber-950/20 border-2 border-amber-300 text-slate-900 dark:text-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-600" />
            <h3 className="text-base font-black">Simulations de Bilan & Affichage</h3>
          </div>
          <span className="text-[10px] font-bold bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200 px-2.5 py-0.5 rounded-full">
            Sans risque
          </span>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          Ces boutons permettent de voir instantanément comment l'application réagit (confettis, feux tricolores vert/orange/rouge, badges débloqués) sans devoir taper 10 questions.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={() => {
              onSimulateScore(20);
              setResetFeedback('Simulation 20/20 appliquée avec succès !');
              setTimeout(() => setResetFeedback(null), 3000);
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>🎯 Simuler un 20/20 (Victoire Royale + Trophées)</span>
          </button>

          <button
            onClick={() => {
              onSimulateScore(8);
              setResetFeedback('Simulation erreurs appliquée avec succès !');
              setTimeout(() => setResetFeedback(null), 3000);
            }}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>🤔 Simuler des erreurs (Voir tableau à consolider)</span>
          </button>
        </div>
      </div>

      {/* Reset Section with double security */}
      <div className="p-6 rounded-3xl bg-rose-50/70 dark:bg-rose-950/20 border-2 border-rose-200 dark:border-rose-900 text-slate-900 dark:text-white space-y-4">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="text-base font-black">Zone de Réinitialisation des Données</h3>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          Pour remettre à zéro toutes les notes, séances et trophées de Mathieu (par exemple en début de trimestre ou pour repartir d'une page blanche).
        </p>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Confirmation Parent :\nVoulez-vous vraiment remettre à zéro les scores et statistiques de Mathieu ?"
                )
              ) {
                onResetStats();
                setResetFeedback('Les scores ont été remis à zéro avec succès.');
                setTimeout(() => setResetFeedback(null), 3500);
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-xs cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Réinitialiser les scores de Mathieu</span>
          </button>

          {resetFeedback && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              {resetFeedback}
            </span>
          )}
        </div>
      </div>

      {/* Code Backup & Export Section */}
      <div className="p-6 rounded-3xl bg-indigo-50/80 dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-800 text-slate-900 dark:text-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
            <Download className="h-5 w-5" />
            <h3 className="text-base font-black">Sauvegarde & Sécurité du Code (Version 3)</h3>
          </div>
          <span className="text-[10px] font-bold bg-indigo-200 dark:bg-indigo-950 text-indigo-950 dark:text-indigo-200 px-2.5 py-0.5 rounded-full">
            Archive Complète .ZIP
          </span>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          Pour garder votre application en totale sécurité sur votre ordinateur ou pour la publier sur GitHub, vous pouvez télécharger l'intégralité du projet en un seul fichier ZIP. Il contient 100% du code source (tous les composants, cours, fiches mémo, quiz, styles et configurations).
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="./capdys-6eme-v3-code-complet.zip"
            download="capdys-6eme-v3-code-complet.zip"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md cursor-pointer flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Download className="h-4 w-4" />
            <span>📥 Télécharger l'archive complète (.ZIP)</span>
          </a>
          <a
            href="./capdys-v3-standalone.html"
            download="capdys-v3-standalone.html"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md cursor-pointer flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Download className="h-4 w-4" />
            <span>🌐 Télécharger l'application HTML autonome (.HTML)</span>
          </a>
        </div>
      </div>

      {/* Helpful Parent Guidelines */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <HeartHandshake className="h-5 w-5 text-indigo-500" />
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            Repères Pédagogiques & Attentes des Professeurs en 6ème
          </h3>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-2">
          <div className="font-extrabold text-sm flex items-center gap-1.5">
            <span>🎯 Pourquoi Mathieu travaille beaucoup (jusqu'à 2h) sans avoir la note attendue ?</span>
          </div>
          <p className="leading-relaxed">
            Au collège, les professeurs de <strong>SVT, Physique-Chimie, Histoire-Géo et Français</strong> changent de barème :
            avoir la bonne idée dans la tête ne suffit plus. Un chiffre isolé ou un mot sans verbe ne rapporte que 0 à 1 point sur 4.
            Pour obtenir 16 à 20/20, le professeur exige :
          </p>
          <ul className="list-disc pl-5 space-y-1 font-semibold">
            <li><strong>Bien décoder la consigne :</strong> Ne pas confondre « changer » (saisons) avec « un autre milieu », ni « comparer » avec « lister deux nombres côte à côte ».</li>
            <li><strong>La formule magique de comparaison :</strong> Nommer ce qui est comparé + connecteur (« PLUS que » / « MOINS que ») + valeurs chiffrées avec unités obligatoires.</li>
            <li><strong>L'argumentation :</strong> Ajouter un « car » ou « parce que » pour prouver son raisonnement.</li>
          </ul>
        </div>

        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5">
          <li>
            <strong>Mode « Contrôle comme en classe » :</strong> Lance des séries de quelques questions ciblées avec le <em>Radar de Consigne</em> (détecteur de pièges) et la <em>Fabrique de Phrase en Briques</em>.
          </li>
          <li>
            <strong>Checklist en direct :</strong> Pendant que Mathieu clique sur les briques ou dicte au micro, la checklist du professeur s'allume en vert en temps réel dès qu'il intègre les mots attendus.
          </li>
          <li>
            <strong>100% Bienveillant :</strong> Les erreurs ne sont jamais sanctionnées, elles ouvrent simplement le bouton magique de réexplication.
          </li>
          <li>
            <strong>Bonus Relecture :</strong> Chaque phrase rédigée avec majuscule et point rapporte un bonus ⭐ pour valoriser son attention.
          </li>
        </ul>
      </div>
    </div>
  );
};
