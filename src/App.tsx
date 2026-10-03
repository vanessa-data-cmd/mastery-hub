import React, { useState, useEffect } from 'react';
import { Header, MainTabType } from './components/Header';
import { QuizTrainingTab } from './components/QuizTrainingTab';
import { LessonVideoPlayerTab } from './components/LessonVideoPlayerTab';
import { SurvivalAudioTab } from './components/SurvivalAudioTab';
import { MethodologyTab } from './components/MethodologyTab';
import { MultiplicationTab } from './components/MultiplicationTab';
import { ProgressionTab } from './components/ProgressionTab';
import { ReadingRulerTab } from './components/ReadingRulerTab';
import { GlobalReadingRuler } from './components/GlobalReadingRuler';
import { ParentTab } from './components/ParentTab';
import { DailyQuoteBanner } from './components/DailyQuoteBanner';
import { MiniDashboard } from './components/MiniDashboard';
import { SommaireModal } from './components/SommaireModal';
import { INITIAL_BADGES } from './data/badgesData';
import { GlobalStats, BadgeItem, SubjectId } from './types';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTabType>('video');
  const [isBattleRoyale, setIsBattleRoyale] = useState<boolean>(() => {
    const saved = localStorage.getItem('mathieu_theme_br');
    return saved !== null ? saved === 'true' : true; // Default to Battle Royale for Mathieu !
  });
  const [isParentTestMode, setIsParentTestMode] = useState<boolean>(false);
  const [dyslexicMode, setDyslexicMode] = useState<boolean>(true);
  const [fontScale, setFontScale] = useState<number>(1.0);
  const [isReadingRulerActive, setIsReadingRulerActive] = useState<boolean>(false);
  const [isSommaireOpen, setIsSommaireOpen] = useState<boolean>(false);
  const [autoOpenPhotoScanner, setAutoOpenPhotoScanner] = useState<boolean>(false);
  const [sommaireTargetSub, setSommaireTargetSub] = useState<SubjectId | undefined>(undefined);
  const [sommaireTargetChapter, setSommaireTargetChapter] = useState<string | undefined>(undefined);
  const [currentSubject, setCurrentSubject] = useState<SubjectId>(() => {
    const saved = localStorage.getItem('mathieu_active_subject');
    return (saved as SubjectId) || 'histoire';
  });

  const handleSubjectChange = (subId: SubjectId) => {
    setCurrentSubject(subId);
    localStorage.setItem('mathieu_active_subject', subId);
  };

  // Stats & Badges State
  const [stats, setStats] = useState<GlobalStats>(() => {
    const savedStats = localStorage.getItem('mathieu_hub_stats');
    const savedHistory = localStorage.getItem('mathieu_lesson_history');
    return {
      sessions: savedStats ? JSON.parse(savedStats).sessions || 0 : 0,
      totalScore: savedStats ? JSON.parse(savedStats).totalScore || 0 : 0,
      bestScore: savedStats ? JSON.parse(savedStats).bestScore || 0 : 0,
      bestTimes: savedStats ? JSON.parse(savedStats).bestTimes || {} : {},
      lessonHistory: savedHistory ? JSON.parse(savedHistory) : {},
      relectureBonusCount: savedStats ? JSON.parse(savedStats).relectureBonusCount || 0 : 0
    };
  });

  const [badges, setBadges] = useState<BadgeItem[]>(() => {
    const saved = localStorage.getItem('mathieu_badges');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_BADGES;
  });

  // Persist theme choice
  useEffect(() => {
    localStorage.setItem('mathieu_theme_br', String(isBattleRoyale));
    if (isBattleRoyale) {
      document.body.classList.add('theme-br');
    } else {
      document.body.classList.remove('theme-br');
    }
  }, [isBattleRoyale]);

  // Apply root font scale
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale * 100}%`;
  }, [fontScale]);

  const handleSaveStats = (score20: number, timeSec: number, subId: SubjectId, relectureBonus: boolean) => {
    if (isParentTestMode) return; // Do not touch Mathieu's real data in parent sandbox !

    setStats((prev) => {
      const nextSessions = prev.sessions + 1;
      const nextTotal = prev.totalScore + score20;
      const nextBest = Math.max(prev.bestScore, score20);
      const nextTimes = { ...prev.bestTimes };
      if (score20 >= 16 && (!nextTimes[subId] || timeSec < nextTimes[subId])) {
        nextTimes[subId] = timeSec;
      }
      const nextHistory = { ...prev.lessonHistory, [subId]: Math.max(prev.lessonHistory[subId] || 0, score20) };
      const nextBonus = prev.relectureBonusCount + (relectureBonus ? 1 : 0);

      const updated = {
        sessions: nextSessions,
        totalScore: nextTotal,
        bestScore: nextBest,
        bestTimes: nextTimes,
        lessonHistory: nextHistory,
        relectureBonusCount: nextBonus
      };

      localStorage.setItem('mathieu_hub_stats', JSON.stringify(updated));
      localStorage.setItem('mathieu_lesson_history', JSON.stringify(nextHistory));
      return updated;
    });
  };

  const handleUnlockBadge = (badgeId: string) => {
    if (isParentTestMode) return;
    setBadges((prev) => {
      const updated = prev.map((b) => (b.id === badgeId ? { ...b, unlocked: true } : b));
      localStorage.setItem('mathieu_badges', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSimulateScore = (score: number) => {
    // Sandbox test for parents
    if (score >= 16) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
    alert(`[Simulation Parent] Note test simulée : ${score}/20. Les données réelles de Mathieu n'ont pas été modifiées.`);
  };

  const handleResetStats = () => {
    const emptyStats: GlobalStats = {
      sessions: 0,
      totalScore: 0,
      bestScore: 0,
      bestTimes: {},
      lessonHistory: {},
      relectureBonusCount: 0
    };
    setStats(emptyStats);
    setBadges(INITIAL_BADGES);
    localStorage.removeItem('mathieu_hub_stats');
    localStorage.removeItem('mathieu_lesson_history');
    localStorage.removeItem('mathieu_badges');
    alert('Les statistiques et les badges ont été réinitialisés.');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      isBattleRoyale ? 'bg-slate-950 text-slate-100' : 'bg-[#faf7f2] text-slate-800'
    } ${dyslexicMode ? 'dys-text' : ''}`}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBattleRoyale={isBattleRoyale}
        setIsBattleRoyale={setIsBattleRoyale}
        isParentTestMode={isParentTestMode}
        setIsParentTestMode={setIsParentTestMode}
        dyslexicMode={dyslexicMode}
        setDyslexicMode={setDyslexicMode}
        fontScale={fontScale}
        setFontScale={setFontScale}
        isReadingRulerActive={isReadingRulerActive}
        setIsReadingRulerActive={setIsReadingRulerActive}
        onOpenSommaire={() => setIsSommaireOpen(true)}
        onOpenPhotoScanner={() => {
          setAutoOpenPhotoScanner(true);
          setActiveTab('quiz');
        }}
      />

      {/* Sommaire Modal */}
      <SommaireModal
        isOpen={isSommaireOpen}
        onClose={() => setIsSommaireOpen(false)}
        isBattleRoyale={isBattleRoyale}
        onNavigateTo={(tab, subId, chapterId) => {
          if (subId) {
            handleSubjectChange(subId);
            setSommaireTargetSub(subId);
          }
          setSommaireTargetChapter(chapterId);
          setActiveTab(tab);
        }}
      />

      {/* Global Reading Ruler Overlay */}
      <GlobalReadingRuler
        isActive={isReadingRulerActive}
        onClose={() => setIsReadingRulerActive(false)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 pt-5">
        {activeTab === 'quiz' && (
          <DailyQuoteBanner isBattleRoyale={isBattleRoyale} />
        )}

        {activeTab === 'quiz' && (
          <MiniDashboard
            stats={stats}
            isBattleRoyale={isBattleRoyale}
            onOpenDetails={() => setActiveTab('progression')}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizTrainingTab
            isBattleRoyale={isBattleRoyale}
            isParentTestMode={isParentTestMode}
            stats={stats}
            onSaveStats={handleSaveStats}
            onUnlockBadge={handleUnlockBadge}
            initialSubject={sommaireTargetSub || currentSubject}
            initialChapterId={sommaireTargetChapter}
            autoOpenPhotoScanner={autoOpenPhotoScanner}
            onSubjectChange={handleSubjectChange}
          />
        )}

        {activeTab === 'video' && (
          <LessonVideoPlayerTab
            isBattleRoyale={isBattleRoyale}
            initialSubject={sommaireTargetSub || currentSubject}
            initialChapterId={sommaireTargetChapter}
            onSubjectChange={handleSubjectChange}
            onGoToQuiz={(subId) => {
              if (subId) handleSubjectChange(subId);
              setActiveTab('quiz');
            }}
            onGoToSurvival={(subId) => {
              if (subId) handleSubjectChange(subId);
              setActiveTab('survival');
            }}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {activeTab === 'survival' && (
          <SurvivalAudioTab
            isBattleRoyale={isBattleRoyale}
            initialSubject={sommaireTargetSub || currentSubject}
            onSubjectChange={handleSubjectChange}
            onGoToQuiz={() => setActiveTab('quiz')}
            onGoToVideo={() => setActiveTab('video')}
          />
        )}

        {activeTab === 'method' && (
          <MethodologyTab isBattleRoyale={isBattleRoyale} />
        )}

        {activeTab === 'multiplication' && (
          <MultiplicationTab
            isBattleRoyale={isBattleRoyale}
            onWinBadge={() => handleUnlockBadge('b_tables')}
          />
        )}

        {activeTab === 'progression' && (
          <ProgressionTab
            stats={stats}
            badges={badges}
            isBattleRoyale={isBattleRoyale}
            isParentTestMode={isParentTestMode}
            onGoToTrainer={(subId) => {
              setActiveTab('quiz');
            }}
            onSimulateScore={handleSimulateScore}
            onResetStats={handleResetStats}
          />
        )}

        {activeTab === 'ruler' && (
          <ReadingRulerTab />
        )}

        {activeTab === 'parent' && (
          <ParentTab
            stats={stats}
            badges={badges}
            isBattleRoyale={isBattleRoyale}
            isParentTestMode={isParentTestMode}
            setIsParentTestMode={setIsParentTestMode}
            onSimulateScore={handleSimulateScore}
            onResetStats={handleResetStats}
            onBackToMathieu={() => setActiveTab('quiz')}
          />
        )}
      </main>

      <footer className={`mt-auto border-t py-5 px-4 text-xs ${
        isBattleRoyale
          ? 'bg-slate-900/90 border-slate-800 text-slate-400'
          : 'bg-white/80 border-amber-200/60 text-slate-500'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-white">
              {isBattleRoyale ? 'Mastery Hub // Battle Royale' : 'Mathieu • Réussite • Collège 6ème'}
            </span>
            <span>• Conçu pour Mathieu • Réussite Collège</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Pédagogie positive sans sanction d'orthographe
            </span>
            <span className="inline-flex items-center gap-1 text-amber-500 font-semibold">
              <Sparkles className="h-4 w-4" />
              Propulsé par Gemini 3.8 Flash
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
