import React from 'react';
import {
  Sparkles,
  Gamepad2,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Type,
  User,
  FlaskConical,
  Compass,
  Calculator,
  Glasses,
  Flame,
  Zap,
  Lock,
  Camera
} from 'lucide-react';

export type MainTabType = 'quiz' | 'video' | 'survival' | 'method' | 'multiplication' | 'progression' | 'ruler' | 'parent';

interface HeaderProps {
  activeTab: MainTabType;
  setActiveTab: (tab: MainTabType) => void;
  isBattleRoyale: boolean;
  setIsBattleRoyale: (val: boolean) => void;
  isParentTestMode: boolean;
  setIsParentTestMode: (val: boolean) => void;
  dyslexicMode: boolean;
  setDyslexicMode: (val: boolean) => void;
  fontScale: number;
  setFontScale: (fn: (prev: number) => number) => void;
  isReadingRulerActive: boolean;
  setIsReadingRulerActive: (val: boolean) => void;
  onOpenSommaire?: () => void;
  onOpenPhotoScanner?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isBattleRoyale,
  setIsBattleRoyale,
  isParentTestMode,
  setIsParentTestMode,
  dyslexicMode,
  setDyslexicMode,
  fontScale,
  setFontScale,
  isReadingRulerActive,
  setIsReadingRulerActive,
  onOpenSommaire,
  onOpenPhotoScanner
}) => {
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      isBattleRoyale
        ? 'bg-slate-900/95 border-purple-500/40 text-slate-100'
        : 'bg-white/95 border-amber-200/80 text-slate-800'
    } shadow-sm`}>
      {/* Parent Test Sandbox Banner if active */}
      {isParentTestMode && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            <span>🧪 MODE TEST PARENT ACTIF — Vos réponses et simulations n'impactent pas les scores de Mathieu</span>
          </div>
          <button
            onClick={() => setIsParentTestMode(false)}
            className="underline hover:text-white cursor-pointer font-bold"
          >
            Quitter le mode test
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand & Theme Title */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className={`h-10 w-10 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md transition-all shrink-0 ${
              isBattleRoyale 
                ? 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 text-amber-200' 
                : 'bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-400 text-white shadow-indigo-200'
            }`}>
              {isBattleRoyale ? '⚡' : '🚀'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
                  {activeTab === 'parent'
                    ? '🔒 Espace Parent'
                    : 'Mathieu'}
                </h1>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  activeTab === 'parent'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : isBattleRoyale
                      ? 'bg-purple-900/80 text-purple-200 border border-purple-500/40'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  {activeTab === 'parent' ? 'Supervision' : 'Réussite Collège 6ème'}
                </span>
              </div>
              <p className="text-[11px] opacity-75 hidden sm:block leading-normal">
                {activeTab === 'parent'
                  ? 'Gestion des notes, simulations de bilan et paramètres'
                  : isBattleRoyale
                    ? 'Mission Top 1 • Défis, Loots & Progression de Mathieu'
                    : 'Entraîneur autonome, leçons & méthodes gagnantes'}
              </p>
            </div>
          </div>

          {/* Controls Bar: Sommaire, Scanner, Profile & Theme (Prominent in top bandeau) */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
            {/* Sommaire Button - Le bandeau au dessus */}
            {onOpenSommaire && (
              <button
                type="button"
                onClick={onOpenSommaire}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all border cursor-pointer shrink-0 shadow-xs ${
                  isBattleRoyale
                    ? 'bg-gradient-to-r from-amber-500/25 via-purple-600/30 to-indigo-600/30 text-amber-300 border-amber-400/70 hover:bg-amber-500/40 hover:scale-105'
                    : 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200 hover:scale-105'
                }`}
                title="Consulter le sommaire complet des matières et leçons"
              >
                <BookOpen className="h-4 w-4 text-amber-500" />
                <span>📚 Sommaire</span>
              </button>
            )}

            {/* Photo Scanner Action in Top Bar */}
            {onOpenPhotoScanner && (
              <button
                type="button"
                onClick={onOpenPhotoScanner}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shadow-xs cursor-pointer transition-all scale-100 hover:scale-105 shrink-0"
                title="Prendre en photo un cours ou un devoir de Mathieu"
              >
                <Camera className="h-3.5 w-3.5" />
                <span>📸 Photo</span>
              </button>
            )}

            {/* Dual Space Switcher: Espace Mathieu vs Espace Parent */}
            <div className={`flex items-center p-0.5 sm:p-1 rounded-2xl border shrink-0 ${
              isBattleRoyale
                ? 'bg-slate-800/90 border-slate-700'
                : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab !== 'parent'
                    ? isBattleRoyale
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Accéder aux cours, quiz et trophées de Mathieu"
              >
                <User className="h-3.5 w-3.5" />
                <span>🚀 Mathieu</span>
              </button>

              <button
                onClick={() => setActiveTab('parent')}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'parent'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : isParentTestMode
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-amber-800 dark:text-amber-400 hover:bg-amber-100/60 dark:hover:bg-slate-700'
                }`}
                title="Accéder à l'espace parent sécurisé"
              >
                {isParentTestMode ? <FlaskConical className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                <span>🔒 Parent</span>
              </button>
            </div>
          </div>
        </div>

        {/* LIGNE 2 : Navigation Principale de Mathieu (5 modules clairs et centrés) */}
        <div className={`mt-2 pt-2 border-t flex items-center justify-center ${
          isBattleRoyale ? 'border-slate-800' : 'border-slate-200/80'
        }`}>
          <nav className="flex overflow-x-auto gap-2 sm:gap-3 py-0.5 scrollbar-none text-xs sm:text-sm font-black w-full justify-start sm:justify-center">
            {/* 1. TABLEAU */}
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'video'
                  ? isBattleRoyale
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 border border-purple-400'
                    : 'bg-indigo-600 text-white shadow-sm'
                  : isBattleRoyale
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>🖥️</span>
              <span>Tableau</span>
            </button>

            {/* 2. FLASH & MÉMO */}
            <button
              onClick={() => setActiveTab('survival')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'survival'
                  ? isBattleRoyale
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-amber-500 text-white shadow-sm'
                  : isBattleRoyale
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>Flash</span>
            </button>

            {/* 3. MON QUIZ */}
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? isBattleRoyale
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-emerald-600 text-white shadow-sm'
                  : isBattleRoyale
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>🎯</span>
              <span>Mon Quiz</span>
            </button>

            {/* 4. MÉTHODE 6ÈME */}
            <button
              onClick={() => setActiveTab('method')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'method'
                  ? isBattleRoyale
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-indigo-600 text-white shadow-sm'
                  : isBattleRoyale
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>🎒 Méthode</span>
            </button>

            {/* 5. MES TROPHÉES */}
            <button
              onClick={() => setActiveTab('progression')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'progression'
                  ? isBattleRoyale
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-amber-600 text-white shadow-sm'
                  : isBattleRoyale
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>🏆</span>
              <span>Trophées</span>
            </button>
          </nav>
        </div>

        {/* LIGNE 3 : Bandeau Dédié Confort de Lecture & Accessibilité DYS */}
        <div className={`mt-1.5 pt-1.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
          isBattleRoyale ? 'border-slate-800/80 text-slate-400' : 'border-slate-200/60 text-slate-500'
        }`}>
          <div className="flex items-center gap-1.5 font-bold text-[11px]">
            <Glasses className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Confort de lecture :
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Mode Classique / Fortnite Toggle */}
            <button
              onClick={() => setIsBattleRoyale(!isBattleRoyale)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                isBattleRoyale
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-xs font-black'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 font-black'
              }`}
              title="Basculer entre le mode Classique et le mode Fortnite (Battle Royale)"
            >
              <Gamepad2 className="h-3.5 w-3.5" />
              <span>{isBattleRoyale ? '🎮 Mode Fortnite' : '🏫 Mode Classique'}</span>
            </button>

            {/* Global Reading Ruler toggle */}
            <button
              onClick={() => setIsReadingRulerActive(!isReadingRulerActive)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                isReadingRulerActive
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs ring-2 ring-amber-300 font-black'
                  : isBattleRoyale
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Activer la règle de lecture guidée sur toutes les pages et questions"
            >
              <Glasses className="h-3.5 w-3.5" />
              <span>Règle {isReadingRulerActive ? 'ON' : 'OFF'}</span>
            </button>

            {/* Lexend DYS toggle */}
            <button
              onClick={() => setDyslexicMode(!dyslexicMode)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                dyslexicMode
                  ? isBattleRoyale
                    ? 'bg-purple-600 text-white border-purple-400 font-black'
                    : 'bg-amber-500 text-white border-amber-600 shadow-xs font-black'
                  : isBattleRoyale
                    ? 'bg-slate-800 text-slate-300 border-slate-700'
                    : 'bg-white text-slate-700 border-slate-200'
              }`}
              title="Activer/désactiver la police Lexend à espacement renforcé"
            >
              <Type className="h-3.5 w-3.5" />
              <span>Police DYS {dyslexicMode ? 'ON' : 'OFF'}</span>
            </button>

            {/* Text Zoom */}
            <div className={`flex items-center p-0.5 rounded-xl text-xs font-semibold border shrink-0 ${
              isBattleRoyale
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <button
                onClick={() => setFontScale((s) => Math.max(0.9, Number((s - 0.1).toFixed(1))))}
                className="p-1 hover:opacity-80 rounded-md cursor-pointer"
                title="Diminuer texte"
              >
                <ZoomOut className="h-3 w-3" />
              </button>
              <span className="px-1 text-[11px] font-bold">{Math.round(fontScale * 100)}%</span>
              <button
                onClick={() => setFontScale((s) => Math.min(1.4, Number((s + 0.1).toFixed(1))))}
                className="p-1 hover:opacity-80 rounded-md cursor-pointer"
                title="Agrandir texte"
              >
                <ZoomIn className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
