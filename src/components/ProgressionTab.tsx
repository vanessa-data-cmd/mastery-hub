import React, { useState } from 'react';
import {
  Trophy,
  Zap,
  Flame,
  RotateCcw,
  Sparkles,
  ArrowRight,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  Star,
  Compass,
  Smile
} from 'lucide-react';
import { GlobalStats, BadgeItem, SubjectId } from '../types';
import { SUBJECTS_CONFIG } from '../data/lessonsData';
import { UkFlagIcon } from './FlagIcons';
import { DashboardCardWidget } from './MiniDashboard';

interface ProgressionTabProps {
  stats: GlobalStats;
  badges: BadgeItem[];
  isBattleRoyale: boolean;
  isParentTestMode: boolean;
  onGoToTrainer: (sub?: SubjectId) => void;
  onSimulateScore: (score: number) => void;
  onResetStats: () => void;
}

export const ProgressionTab: React.FC<ProgressionTabProps> = ({
  stats,
  badges,
  isBattleRoyale,
  isParentTestMode,
  onGoToTrainer,
  onSimulateScore,
  onResetStats
}) => {
  // Navigation view inside the progression dashboard
  const [activeBilanView, setActiveBilanView] = useState<'global' | 'subjects'>('global');

  // Pedagogical advice per subject to guide "où agir"
  const SUBJECT_INSIGHTS: Record<SubjectId, { strongPoint: string; actionTip: string }> = {
    histoire: {
      strongPoint: "Très bonne capacité à retenir les repères chronologiques et le vocabulaire historique.",
      actionTip: "Écouter le Flash Audio 2 min pour ancrer les dates clés sans fatigue visuelle."
    },
    geo: {
      strongPoint: "Bonne compréhension de l'espace mondial et des repères géographiques.",
      actionTip: "Visualiser les cartes mentales et faire le lien avec la vie quotidienne."
    },
    pc: {
      strongPoint: "Curiosité scientifique et esprit d'observation aiguisé.",
      actionTip: "Bien soigner les unités de mesure et le vocabulaire spécifique (masse, volume)."
    },
    svt: {
      strongPoint: "Excellente analyse des schémas et du fonctionnement du corps et de la planète.",
      actionTip: "S'entraîner à expliquer les étapes avec ses propres mots simples."
    },
    anglais: {
      strongPoint: "Bonne oreille pour la prononciation et enthousiasme pour l'expression.",
      actionTip: "Utiliser le bouton drapeau 🇫🇷/🇬🇧 pour consolider les consignes en toute confiance."
    },
    maths: {
      strongPoint: "Très bon sens logique et rapidité sur les calculs d'automatismes.",
      actionTip: "Faire le rituel des tables de multiplication 2 min par jour pour garder le réflexe éclair !"
    },
    francais: {
      strongPoint: "Richesse d'idées et bel effort d'expression.",
      actionTip: "Activer le bouton de relecture pour traquer les majuscules et accords et gagner le bonus ⭐."
    },
    mix: {
      strongPoint: "Polyvalence et agilité pour passer d'un domaine à l'autre.",
      actionTip: "Écouter régulièrement les résumés audio dans 'Flash 2 min'."
    }
  };

  const getSubjectStatus = (subId: SubjectId) => {
    const score = stats.lessonHistory[subId];
    if (score === undefined) {
      return {
        label: 'Nouveau défi',
        tag: '⚪ À explorer',
        dot: '⚪',
        badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
        color: 'text-slate-400',
        category: 'new'
      };
    }
    if (score >= 16) {
      return {
        label: 'Super-Héros',
        tag: '🟢 Maîtrisé',
        dot: '🟢',
        badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300',
        color: 'text-emerald-600 dark:text-emerald-400',
        category: 'mastered'
      };
    }
    if (score >= 12) {
      return {
        label: 'En bonne voie',
        tag: '🟠 En progrès',
        dot: '🟠',
        badgeBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300',
        color: 'text-amber-600 dark:text-amber-400',
        category: 'in_progress'
      };
    }
    return {
      label: 'Défi à booster',
      tag: '🔴 À consolider',
      dot: '🔴',
      badgeBg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 border-rose-300',
      color: 'text-rose-600 dark:text-rose-400',
      category: 'to_boost'
    };
  };

  const validSubjects = SUBJECTS_CONFIG.filter((s) => s.id !== 'mix');

  // Subjects where Mathieu excels (green)
  const strongSubjects = validSubjects.filter((s) => {
    const score = stats.lessonHistory[s.id];
    return score !== undefined && score >= 16;
  });

  // Subjects that need attention (red, orange, or not yet tested)
  const actionSubjects = validSubjects.filter((s) => {
    const score = stats.lessonHistory[s.id];
    return score === undefined || score < 16;
  });

  const bestScoreDisplay = stats.bestScore > 0 ? `${stats.bestScore}/20` : '20/20';
  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Top Header Card with View Switcher */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-sm transition-all ${
          isBattleRoyale
            ? 'bg-slate-900 border-purple-500/40 text-white'
            : 'bg-white border-amber-200 text-slate-800'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-black uppercase mb-1">
              <Trophy className="h-3.5 w-3.5 text-amber-600" />
              Tableau de bord de Mathieu
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Bilan des Progrès & Forces de Mathieu
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Valoriser là où il excelle et lui donner les clés concrètes là où il peut agir.
            </p>
          </div>

          {/* View Mode Toggle: Global vs Par Matière */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
            <button
              onClick={() => setActiveBilanView('global')}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                activeBilanView === 'global'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-purple-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>1. Bilan Global (Synthèse)</span>
            </button>

            <button
              onClick={() => setActiveBilanView('subjects')}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                activeBilanView === 'subjects'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-purple-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>2. Bilan par Matière</span>
            </button>
          </div>
        </div>

        {/* Encadré Tableau de bord structuré */}
        <div className="pt-4">
          <DashboardCardWidget stats={stats} isBattleRoyale={isBattleRoyale} />
        </div>
      </div>

      {/* ================================================================ */}
      {/* VUE 1 : BILAN GLOBAL (Forces de Mathieu & Plan d'Action "Où Agir") */}
      {/* ================================================================ */}
      {activeBilanView === 'global' && (
        <div className="space-y-6">
          {/* Dual Columns: FORCES (Où il est bon) vs MISSIONS (Où agir) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* COLUMN 1: LÀ OÙ IL EST TRÈS FORT (VALORISATION) */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border shadow-sm space-y-4 ${
                isBattleRoyale
                  ? 'bg-slate-900 border-emerald-500/40 text-white'
                  : 'bg-gradient-to-b from-emerald-50/70 to-white border-emerald-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5 pb-2 border-b border-emerald-200/50 dark:border-emerald-800/40">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-emerald-900 dark:text-emerald-300">
                    🌟 Les Super-Pouvoirs de Mathieu
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Ce qu'il maîtrise et réussit avec brio
                  </p>
                </div>
              </div>

              {strongSubjects.length > 0 ? (
                <div className="space-y-3">
                  {strongSubjects.map((sub) => {
                    const score = stats.lessonHistory[sub.id] || 18;
                    const insight = SUBJECT_INSIGHTS[sub.id];

                    return (
                      <div
                        key={sub.id}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isBattleRoyale
                            ? 'bg-slate-800/90 border-emerald-600/40'
                            : 'bg-white border-emerald-200/80 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            {sub.id === 'anglais' ? (
                              <UkFlagIcon className="h-5 w-7 rounded" />
                            ) : (
                              <span className="text-xl">{sub.icon}</span>
                            )}
                            <span className="font-black text-sm">{sub.label}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs font-mono">
                            {score}/20 🟢
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                          {insight?.strongPoint || "Excellente compréhension et réflexes bien en place."}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center space-y-2">
                  <Smile className="h-8 w-8 text-emerald-500 mx-auto" />
                  <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    Fais un premier quiz pour révéler tes super-pouvoirs ici !
                  </p>
                  <button
                    onClick={() => onGoToTrainer()}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs cursor-pointer"
                  >
                    Lancer un premier entraînement
                  </button>
                </div>
              )}

              {/* Rassurance / Motivation note */}
              <div className="p-3 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] font-semibold text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>
                  Ces matières sont des points d'appui solides qui boostent sa moyenne et sa confiance générale !
                </span>
              </div>
            </div>

            {/* COLUMN 2: LÀ OÙ IL DOIT AGIR (MISSIONS CONCRÈTES SANS PRESSION) */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border shadow-sm space-y-4 ${
                isBattleRoyale
                  ? 'bg-slate-900 border-indigo-500/40 text-white'
                  : 'bg-gradient-to-b from-indigo-50/70 to-white border-indigo-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5 pb-2 border-b border-indigo-200/50 dark:border-indigo-800/40">
                <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-indigo-900 dark:text-indigo-300">
                    🎯 Où Agir : Prochaines Victoires
                  </h3>
                  <p className="text-xs text-indigo-700 dark:text-indigo-400">
                    Les petits défis simples pour progresser vite
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {actionSubjects.slice(0, 3).map((sub) => {
                  const st = getSubjectStatus(sub.id);
                  const insight = SUBJECT_INSIGHTS[sub.id];

                  return (
                    <div
                      key={sub.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isBattleRoyale
                          ? 'bg-slate-800/90 border-indigo-600/40'
                          : 'bg-white border-indigo-200/80 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {sub.id === 'anglais' ? (
                            <UkFlagIcon className="h-5 w-7 rounded" />
                          ) : (
                            <span className="text-xl">{sub.icon}</span>
                          )}
                          <span className="font-black text-sm">{sub.label}</span>
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border ${st.badgeBg}`}>
                          {st.tag}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 leading-snug">
                        💡 <strong>Le conseil clé :</strong> {insight?.actionTip}
                      </p>

                      <button
                        onClick={() => onGoToTrainer(sub.id)}
                        className="w-full py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Relever ce défi (3 min)</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Rassurance / Motivation note */}
              <div className="p-3 rounded-xl bg-indigo-100/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-[11px] font-semibold text-indigo-900 dark:text-indigo-300 flex items-start gap-2">
                <Zap className="h-4 w-4 shrink-0 mt-0.5 text-indigo-600" />
                <span>
                  Pas de pression : un entraînement court de 3 minutes suffit pour transformer un orange en vert !
                </span>
              </div>
            </div>
          </div>

          {/* Quick Switch Button to see full subject-by-subject cards */}
          <div className="text-center pt-2">
            <button
              onClick={() => setActiveBilanView('subjects')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-indigo-300 dark:border-indigo-700 hover:border-indigo-500 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs shadow-xs transition-all cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Voir le bilan détaillé matière par matière avec les conseils ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* VUE 2 : BILAN PAR MATIÈRE (Détail complet pour chaque discipline) */}
      {/* ================================================================ */}
      {activeBilanView === 'subjects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 px-1">
            <div>
              <h3 className="text-lg font-black">Détail des 7 Matières de 6ème</h3>
              <p className="text-xs opacity-75">
                🟢 Maîtrisé (≥16/20) • 🟠 En bonne voie (12-15) • 🔴 À booster (&lt;12) • ⚪ Nouveau défi
              </p>
            </div>

            <button
              onClick={() => setActiveBilanView('global')}
              className="text-xs font-bold text-indigo-600 dark:text-purple-300 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>← Revenir au Bilan Global</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validSubjects.map((sub) => {
              const st = getSubjectStatus(sub.id);
              const score = stats.lessonHistory[sub.id];
              const insight = SUBJECT_INSIGHTS[sub.id];

              return (
                <div
                  key={sub.id}
                  className={`p-5 rounded-3xl border shadow-xs space-y-3 transition-all ${
                    isBattleRoyale
                      ? 'bg-slate-900 border-slate-700/80'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {sub.id === 'anglais' ? (
                        <UkFlagIcon className="h-7 w-9 rounded-md shadow-xs" />
                      ) : (
                        <span className="text-3xl">{sub.icon}</span>
                      )}
                      <div>
                        <h4 className="font-black text-base leading-tight">{sub.label}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${st.badgeBg}`}>
                            {st.tag}
                          </span>
                          {score !== undefined && (
                            <span className="text-xs font-black font-mono text-slate-600 dark:text-slate-300">
                              Note record : <strong>{score}/20</strong>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onGoToTrainer(sub.id)}
                      className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors shrink-0"
                    >
                      <span>Je m'entraîne</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Pedagogical insight: Strength vs Action */}
                  <div className="space-y-1.5 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 text-emerald-950 dark:text-emerald-200">
                      <span className="font-bold block text-[11px] text-emerald-800 dark:text-emerald-400">
                        🌟 Ce qui est acquis :
                      </span>
                      {insight?.strongPoint}
                    </div>

                    <div className="p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-950 dark:text-indigo-200">
                      <span className="font-bold block text-[11px] text-indigo-800 dark:text-indigo-400">
                        🎯 Ce qu'il peut faire pour progresser :
                      </span>
                      {insight?.actionTip}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 3 : CASIER DES BADGES FORTNITE DÉBLOQUÉS */}
      {/* ================================================================ */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border shadow-sm space-y-4 ${
          isBattleRoyale
            ? 'bg-slate-900 border-purple-500/40 text-white'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <h3 className="text-xl font-black">Casier des Badges de Mathieu</h3>
              <p className="text-xs opacity-75">
                Raretés : Atypique (Vert) • Rare (Bleu) • Épique (Violet) • Légendaire (Or)
              </p>
            </div>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-400 text-slate-950">
            {unlockedBadgesCount} / {badges.length} Trophées Débloqués
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {badges.map((badge) => {
            const isUnlocked = badge.unlocked;
            let rarityBg = 'bg-emerald-600';
            let rarityLabel = 'Atypique';
            if (badge.rarity === 'rare') {
              rarityBg = 'bg-blue-600';
              rarityLabel = 'Rare';
            } else if (badge.rarity === 'epic') {
              rarityBg = 'bg-purple-600';
              rarityLabel = 'Épique';
            } else if (badge.rarity === 'legendary') {
              rarityBg = 'bg-amber-500 text-slate-950 font-black';
              rarityLabel = 'Légendaire';
            }

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 relative overflow-hidden ${
                  isUnlocked
                    ? isBattleRoyale
                      ? 'bg-slate-800/90 border-amber-500/70 shadow-sm'
                      : 'bg-amber-50/70 border-amber-300 shadow-xs'
                    : 'opacity-40 grayscale border-slate-200 bg-slate-50'
                }`}
              >
                <div className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                  {badge.icon}
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h4 className="font-extrabold text-xs leading-tight truncate text-slate-900 dark:text-white">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] opacity-70 line-clamp-2 leading-snug">
                    {badge.desc}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-black text-white ${rarityBg}`}>
                      {rarityLabel}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {isUnlocked ? '✅ DÉBLOQUÉ' : '🔒 À débloquer'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
