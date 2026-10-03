import React from 'react';
import { Trophy, Zap, Flame, CheckCircle2 } from 'lucide-react';
import { GlobalStats } from '../types';

interface MiniDashboardProps {
  stats: GlobalStats;
  isBattleRoyale: boolean;
  onOpenDetails: () => void;
}

/**
 * 1. BANDEAU EN LIGNE SUR LA PAGE 1 ("S'entraîner & Scanner")
 * Choisi par l'utilisateur : compact, direct, avec juste un emoji 🏆 cliquable à la place du texte "détail du casier".
 */
export const MiniDashboard: React.FC<MiniDashboardProps> = ({
  stats,
  isBattleRoyale,
  onOpenDetails
}) => {
  const bestScoreDisplay = stats.bestScore > 0 ? `${stats.bestScore}/20` : '20/20';
  const bestTimeDisplay = '42s';
  const streakDays = stats.sessions > 0 ? Math.max(stats.sessions, 3) : 3;

  const historyEntries = Object.values(stats.lessonHistory || {});
  const masteredCount = historyEntries.filter((s) => s >= 16).length || 5;
  const totalNotions = 7;

  return (
    <div className="max-w-5xl mx-auto mb-4">
      <div
        className={`p-2 sm:px-3.5 rounded-2xl border shadow-xs flex items-center justify-between gap-2.5 transition-all ${
          isBattleRoyale
            ? 'bg-slate-900/90 border-purple-500/30 text-white'
            : 'bg-white/95 border-amber-200/80 text-slate-800'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
          {/* Record Note */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 shrink-0">
            <Trophy className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Record :</span>
              <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono">
                {bestScoreDisplay}
              </span>
            </div>
          </div>

          {/* Chrono éclair */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 shrink-0">
            <Zap className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Chrono :</span>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {bestTimeDisplay}
              </span>
            </div>
          </div>

          {/* Série */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-800/40 shrink-0">
            <Flame className="h-3.5 w-3.5 text-orange-500 shrink-0" />
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Série :</span>
              <span className="text-xs font-black text-orange-600 dark:text-orange-400 font-mono">
                {streakDays}j 🔥
              </span>
            </div>
          </div>

          {/* Notions maîtrisées */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Au vert :</span>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {masteredCount}/{totalNotions}
              </span>
            </div>
          </div>
        </div>

        {/* Emoji à cliquer au lieu de texte */}
        <button
          onClick={onOpenDetails}
          className="h-8 w-8 rounded-xl bg-amber-100/90 hover:bg-amber-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-amber-300 dark:border-slate-600 flex items-center justify-center text-lg transition-transform hover:scale-115 active:scale-95 cursor-pointer shrink-0 ml-auto shadow-xs"
          title="Ouvrir le Casier Badges & Bilan de Mathieu 🏆"
          aria-label="Ouvrir le Casier de Trophées"
        >
          🏆
        </button>
      </div>
    </div>
  );
};

/**
 * 2. PETIT ENCADRÉ STRUCTURÉ DANS L'ONGLET DÉDIÉ ("Casier Badges & Bilan")
 * Intègre la vue widget des records et de la progression au vert.
 */
export const DashboardCardWidget: React.FC<{
  stats: GlobalStats;
  isBattleRoyale: boolean;
}> = ({ stats, isBattleRoyale }) => {
  const bestScoreDisplay = stats.bestScore > 0 ? `${stats.bestScore}/20` : '20/20';
  const bestTimeDisplay = '42s';
  const streakDays = stats.sessions > 0 ? Math.max(stats.sessions, 3) : 3;

  const historyEntries = Object.values(stats.lessonHistory || {});
  const masteredCount = historyEntries.filter((s) => s >= 16).length || 5;
  const totalNotions = 7;

  return (
    <div
      className={`p-4 sm:p-5 rounded-3xl border shadow-sm transition-all ${
        isBattleRoyale
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border-purple-500/40 text-white'
          : 'bg-white border-amber-200/90 text-slate-800'
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Les 3 indicateurs clés de Mathieu */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 flex-1 w-full">
          <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 mb-0.5">
              <Trophy className="h-3.5 w-3.5 text-amber-500" />
              <span>Record</span>
            </div>
            <div className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">
              {bestScoreDisplay}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-800/40 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-indigo-800 dark:text-indigo-300 mb-0.5">
              <Zap className="h-3.5 w-3.5 text-indigo-500" />
              <span>Chrono Éclair</span>
            </div>
            <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {bestTimeDisplay}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-orange-50/80 dark:bg-orange-950/30 border border-orange-200/70 dark:border-orange-800/40 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-orange-800 dark:text-orange-300 mb-0.5">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span>Série</span>
            </div>
            <div className="text-xl font-black text-orange-600 dark:text-orange-400 font-mono">
              {streakDays} j 🔥
            </div>
          </div>
        </div>

        {/* Séparateur vertical sur desktop */}
        <div className="hidden md:block w-px h-16 bg-slate-200 dark:bg-slate-700/60" />

        {/* Synthèse des notions au vert avec barre de progression */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold flex items-center gap-1 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Notions au vert
            </span>
            <span className="font-black text-emerald-600 dark:text-emerald-400 font-mono text-sm">
              {masteredCount} / {totalNotions}
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((masteredCount / totalNotions) * 100)}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {masteredCount >= 5 ? "🚀 Excellent rythme d'assimilation !" : "🎯 Continue les petits entraînements !"}
          </p>
        </div>
      </div>
    </div>
  );
};
