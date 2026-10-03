import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  CheckCircle,
  ArrowRight,
  Flame,
  Globe,
  Compass,
  Lightbulb,
  Zap,
  BookOpen,
  MapPin,
  Clock,
  Layers,
  ChevronRight,
  ChevronLeft,
  Share2,
  Download,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubjectId } from '../types';
import { SUBJECTS_CONFIG } from '../data/lessonsData';
import {
  VIDEO_SUBJECT_HUBS,
  VideoChapter,
  CapsuleScene,
  SubjectVideoHub,
  ECOSYSTEM_EXAMPLES,
  KEYWORD_DEFINITIONS
} from '../data/videoCapsulesData';
import { UkFlagIcon } from './FlagIcons';
import { InteractiveMapTab } from './InteractiveMapTab';

interface LessonVideoPlayerTabProps {
  isBattleRoyale: boolean;
  initialSubject?: SubjectId;
  initialChapterId?: string;
  onSubjectChange?: (subId: SubjectId) => void;
  onGoToQuiz?: (subjectId?: SubjectId) => void;
  onGoToSurvival?: (subjectId?: SubjectId) => void;
  onUnlockBadge?: (badgeId: string) => void;
}

export const CLASSROOM_ACTIONS = [
  // 18 Teacher's Instructions
  { id: 't1', category: 'teacher', icon: '🧍', en: 'Stand up !', fr: 'Lève-toi / Levez-vous !' },
  { id: 't2', category: 'teacher', icon: '🪑', en: 'Sit down !', fr: 'Assieds-toi / Asseyez-vous !' },
  { id: 't3', category: 'teacher', icon: '📖', en: 'Open your book / copybook !', fr: 'Ouvre ton livre / cahier !' },
  { id: 't4', category: 'teacher', icon: '📕', en: 'Close your book / copybook !', fr: 'Ferme ton livre / cahier !' },
  { id: 't5', category: 'teacher', icon: '🎧', en: 'Listen !', fr: 'Écoute / Écoutez !' },
  { id: 't6', category: 'teacher', icon: '🧑‍🏫', en: 'Look at the board !', fr: 'Regarde le tableau !' },
  { id: 't7', category: 'teacher', icon: '👀', en: 'Read !', fr: 'Lis / Lisez !' },
  { id: 't8', category: 'teacher', icon: '✍️', en: 'Write !', fr: 'Écris / Écrivez !' },
  { id: 't9', category: 'teacher', icon: '🤫', en: 'Silence / Be quiet !', fr: 'Silence !' },
  { id: 't10', category: 'teacher', icon: '🙋', en: 'Raise your hand / Put up your hand !', fr: 'Lève la main !' },
  { id: 't11', category: 'teacher', icon: '🔄', en: 'Repeat after me !', fr: 'Répète après moi !' },
  { id: 't12', category: 'teacher', icon: '🏃', en: 'Come to the board !', fr: 'Viens au tableau !' },
  { id: 't13', category: 'teacher', icon: '🖊️', en: 'Take your pen / pencil !', fr: 'Prends ton stylo / crayon !' },
  { id: 't14', category: 'teacher', icon: '🎒', en: 'Put away your things !', fr: 'Range tes affaires !' },
  { id: 't15', category: 'teacher', icon: '📝', en: 'Copy the lesson !', fr: 'Copie la leçon !' },
  { id: 't16', category: 'teacher', icon: '📄', en: 'Stick the worksheet !', fr: 'Colle la feuille d’exercices !' },
  { id: 't17', category: 'teacher', icon: '📏', en: 'Underline the title !', fr: 'Souligne le titre !' },
  { id: 't18', category: 'teacher', icon: '👥', en: 'Work in pairs / groups !', fr: 'Travaillez à deux / en groupes !' },

  // 13 Pupil's Requests & Questions
  { id: 'p1', category: 'pupil', icon: '🚻', en: 'May I go to the toilets, please ?', fr: 'Puis-je aller aux toilettes, svp ?' },
  { id: 'p2', category: 'pupil', icon: '🪟', en: 'Can I open the window, please ?', fr: 'Puis-je ouvrir la fenêtre, svp ?' },
  { id: 'p3', category: 'pupil', icon: '❄️', en: 'Can I close the window, please ?', fr: 'Puis-je fermer la fenêtre, svp ?' },
  { id: 'p4', category: 'pupil', icon: '💡', en: 'Can I switch on the light, please ?', fr: 'Puis-je allumer la lumière, svp ?' },
  { id: 'p5', category: 'pupil', icon: '🌑', en: 'Can I switch off the light, please ?', fr: 'Puis-je éteindre la lumière, svp ?' },
  { id: 'p6', category: 'pupil', icon: '💧', en: 'May I drink some water, please ?', fr: 'Puis-je boire de l’eau, svp ?' },
  { id: 'p7', category: 'pupil', icon: '✏️', en: 'Can I borrow a pen / glue, please ?', fr: 'Puis-je emprunter un stylo/colle, svp ?' },
  { id: 'p8', category: 'pupil', icon: '❓', en: "I don't understand.", fr: 'Je ne comprends pas.' },
  { id: 'p9', category: 'pupil', icon: '🤷', en: "I don't know.", fr: 'Je ne sais pas.' },
  { id: 'p10', category: 'pupil', icon: '🗣️', en: "What's the English for ... ? / What's the word for ... ?", fr: 'Comment dit-on ... en anglais ?' },
  { id: 'p11', category: 'pupil', icon: '🔤', en: 'How do you spell ... ?', fr: 'Comment épelles-tu ... ?' },
  { id: 'p12', category: 'pupil', icon: '🔁', en: 'Can you repeat, please ?', fr: 'Pouvez-vous répéter, svp ?' },
  { id: 'p13', category: 'pupil', icon: '📕', en: 'I have forgotten my copybook / book.', fr: 'J’ai oublié mon cahier / livre.' }
];

export const LessonVideoPlayerTab: React.FC<LessonVideoPlayerTabProps> = ({
  isBattleRoyale,
  initialSubject,
  initialChapterId,
  onSubjectChange,
  onGoToQuiz,
  onGoToSurvival,
  onUnlockBadge
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(() => {
    if (initialSubject && initialSubject !== 'mix') return initialSubject;
    const saved = typeof window !== 'undefined' ? localStorage.getItem('mathieu_active_subject') : null;
    return (saved as SubjectId) || 'histoire';
  });
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [progressSec, setProgressSec] = useState(0);
  const [selectedAltEcosystem, setSelectedAltEcosystem] = useState<string | null>(null);
  const [activeKeywordModal, setActiveKeywordModal] = useState<{ term: string; definition: string; icon: string } | null>(null);
  const [activeEnglishExprIdx, setActiveEnglishExprIdx] = useState<number | null>(null);
  const [classroomCategoryFilter, setClassroomCategoryFilter] = useState<'all' | 'teacher' | 'pupil'>('all');
  const [activeSpeakingAction, setActiveSpeakingAction] = useState<string | null>(null);
  const [showEmbeddedMap, setShowEmbeddedMap] = useState(false);

  // Sync when initialSubject prop changes from Sommaire or global switcher
  useEffect(() => {
    if (initialSubject && initialSubject !== 'mix' && initialSubject !== selectedSubject) {
      setSelectedSubject(initialSubject);
    }
  }, [initialSubject]);

  // Sync chapter when initialChapterId is passed
  useEffect(() => {
    if (initialChapterId) {
      const currentHub = VIDEO_SUBJECT_HUBS[selectedSubject];
      const foundIdx = currentHub?.chapters.findIndex((c) => c.id === initialChapterId);
      if (foundIdx !== undefined && foundIdx >= 0) {
        setCurrentChapterIdx(foundIdx);
        setCurrentSceneIdx(0);
      }
    }
  }, [initialChapterId, selectedSubject]);

  // Checkpoint question state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checkpointFeedback, setCheckpointFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [completedScenes, setCompletedScenes] = useState<Record<string, boolean>>({});

  const hub: SubjectVideoHub | undefined = VIDEO_SUBJECT_HUBS[selectedSubject];
  const hasHub = Boolean(hub && hub.chapters && hub.chapters.length > 0);
  const currentChapter: VideoChapter | null = hasHub ? (hub!.chapters[currentChapterIdx] || hub!.chapters[0]) : null;
  const currentScene: CapsuleScene | null = currentChapter ? (currentChapter.scenes[currentSceneIdx] || currentChapter.scenes[0]) : null;

  // Calculate total subject duration across all chapters
  const totalSubjectDurationSec = hasHub
    ? hub!.chapters.reduce(
        (total, ch) => total + ch.scenes.reduce((sub, sc) => sub + sc.durationSec, 0),
        0
      )
    : 0;
  const totalSubjectMin = Math.floor(totalSubjectDurationSec / 60);
  const totalSubjectSec = totalSubjectDurationSec % 60;

  // Refs for robust Web Speech handling
  const timerRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveRef = useRef<any>(null);

  // Determine current active pointer target
  const getCurrentTarget = () => {
    if (!currentScene) return { target: 'center', label: '' };
    if (!currentScene.timeTargetMap || currentScene.timeTargetMap.length === 0) {
      return { target: 'center', label: currentScene.title };
    }
    let active = currentScene.timeTargetMap[0];
    for (const item of currentScene.timeTargetMap) {
      if (progressSec >= item.timeSec) {
        active = item;
      }
    }
    return active;
  };

  const activePointer = getCurrentTarget();

  // Reset when subject changes
  useEffect(() => {
    setCurrentChapterIdx(0);
    setCurrentSceneIdx(0);
    setProgressSec(0);
    setIsPlaying(false);
    setSelectedOption(null);
    setCheckpointFeedback(null);
    setShowEmbeddedMap(false);
    stopVoice();
  }, [selectedSubject]);

  // When chapter or scene changes
  useEffect(() => {
    setProgressSec(0);
    setSelectedOption(null);
    setCheckpointFeedback(null);
    if (isPlaying) {
      playVoice();
    } else {
      stopVoice();
    }
  }, [currentChapterIdx, currentSceneIdx]);

  // Keep alive for speech synthesis
  useEffect(() => {
    keepAliveRef.current = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);

    return () => {
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    };
  }, []);

  // Timer simulation for progress bar (never stops speech automatically)
  useEffect(() => {
    if (isPlaying && currentScene) {
      timerRef.current = setInterval(() => {
        setProgressSec((prev) => {
          if (prev < currentScene.durationSec) {
            return prev + 1;
          }
          return prev;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentScene?.durationSec, playbackSpeed]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVoice();
      if (timerRef.current) clearInterval(timerRef.current);
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    };
  }, []);

  const stopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
    }
  };

  const playVoice = () => {
    if (!currentScene) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || isAudioMuted) return;
    stopVoice();

    const utterance = new SpeechSynthesisUtterance(currentScene.script);
    utteranceRef.current = utterance;

    utterance.lang = selectedSubject === 'anglais' ? 'en-US' : 'fr-FR';
    utterance.rate = (selectedSubject === 'anglais' ? 0.88 : 0.95) * playbackSpeed;
    utterance.pitch = 1.05;

    utterance.onend = () => {
      setIsPlaying(false);
      setProgressSec(currentScene.durationSec);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (!currentScene) return;
    if (isPlaying) {
      setIsPlaying(false);
      stopVoice();
    } else {
      setIsPlaying(true);
      playVoice();
    }
  };

  const handleRestart = () => {
    if (!currentScene) return;
    setProgressSec(0);
    setIsPlaying(true);
    playVoice();
  };

  const handleSeek = (secondsDelta: number) => {
    if (!currentScene) return;
    const next = Math.max(0, Math.min(currentScene.durationSec, progressSec + secondsDelta));
    setProgressSec(next);
  };

  const handleAnswerCheckpoint = (optIdx: number) => {
    if (!currentScene || checkpointFeedback) return;
    setSelectedOption(optIdx);
    const isGood = optIdx === currentScene.checkpoint.correctIndex;

    if (isGood) {
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
      setCheckpointFeedback({
        isCorrect: true,
        text: `🏁 Validé Mathieu ! ${currentScene.checkpoint.explanation}`
      });
      setCompletedScenes((prev) => ({ ...prev, [currentScene.id]: true }));
      if (onUnlockBadge) onUnlockBadge('b_video');
    } else {
      setCheckpointFeedback({
        isCorrect: false,
        text: `Presque ! ${currentScene.checkpoint.explanation}`
      });
    }
  };

  const handleNextStepOrChapter = () => {
    if (!hasHub || !currentChapter) return;
    if (currentSceneIdx + 1 < currentChapter.scenes.length) {
      setCurrentSceneIdx((prev) => prev + 1);
    } else if (currentChapterIdx + 1 < hub!.chapters.length) {
      setCurrentChapterIdx((prev) => prev + 1);
      setCurrentSceneIdx(0);
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.5 } });
    } else {
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.5 } });
      if (onGoToQuiz) {
        onGoToQuiz(selectedSubject);
      }
    }
  };

  const handlePrevChapter = () => {
    if (!hasHub) return;
    if (currentChapterIdx > 0) {
      setCurrentChapterIdx((prev) => prev - 1);
      setCurrentSceneIdx(0);
    }
  };

  const handleOpenKeywordDefinition = (kw: string) => {
    const cleanKw = kw.toLowerCase().trim();
    const foundKey = Object.keys(KEYWORD_DEFINITIONS).find((k) =>
      cleanKw.includes(k) || k.includes(cleanKw)
    );
    if (foundKey && KEYWORD_DEFINITIONS[foundKey]) {
      setActiveKeywordModal(KEYWORD_DEFINITIONS[foundKey]);
    } else {
      setActiveKeywordModal({
        term: kw.replace(/^[★\s]+/, ''),
        definition: "Notion clé du programme de 6ème indispensable pour comprendre la leçon et réussir ton évaluation.",
        icon: "💡"
      });
    }
  };

  const handleSpeakKeyword = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = selectedSubject === 'anglais' ? 'en-US' : 'fr-FR';
    utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  };

  const handleSpeakExpression = (text: string, index?: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    stopVoice();
    if (index !== undefined) setActiveEnglishExprIdx(index);
    setActiveSpeakingAction(text);

    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB';
    utt.rate = 0.8; // Gentle, clear dyslexic pace
    utt.onend = () => {
      setActiveSpeakingAction(null);
    };
    utt.onerror = () => {
      setActiveSpeakingAction(null);
    };
    window.speechSynthesis.speak(utt);
  };

  // Render Whiteboard Drawing & Interactive Visuals (Luminous Classroom Smartboard Style)
  const renderWhiteboardContent = () => {
    if (!currentScene) return null;
    switch (currentScene.visualType) {
      /* SVT : THE 3 COMPLETE PILLARS WITH PROMINENT INTERACTIONS BOX */
      case 'ecosystem': {
        const isMilieu = activePointer.target === 'milieu_physique';
        const isVivants = activePointer.target === 'vivants';
        const isInteractions = activePointer.target === 'interactions';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-4">
            {/* Header of Whiteboard Lesson */}
            <div className="flex flex-wrap items-center justify-between border-b-2 border-emerald-200 dark:border-emerald-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-xs">
                  SVT 6ÈME • DÉFINITION OFFICIELLE
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-emerald-300">
                  Un Écosystème = 3 Piliers Indissociables
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-300">
                ✨ Le trio fondamental indissociable
              </span>
            </div>

            {/* THE 3 EXPLICIT BOXES (Milieu + Vivants + INTERACTIONS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-auto items-stretch">
              {/* Box 1 : Milieu Naturel (non vivant) */}
              <div className={`p-4 rounded-3xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 flex flex-col justify-between shadow-md ${
                isMilieu
                  ? 'border-blue-500 shadow-blue-500/20 scale-[1.02] ring-2 ring-blue-400'
                  : 'border-blue-200 dark:border-slate-700'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-black uppercase">
                      Pilier 1 • Biotope
                    </span>
                    <span className="text-2xl">☀️🌧️</span>
                  </div>
                  <h4 className="font-black text-sm text-blue-950 dark:text-blue-200 mb-1">
                    1. Le Milieu Naturel
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                    Le décor physique <strong>non vivant</strong> indispensable à la vie :
                  </p>
                  <ul className="mt-2 text-xs space-y-1 text-slate-700 dark:text-slate-200 font-medium">
                    <li>• Eau (pluie, mare, rivière)</li>
                    <li>• Sol minéral & roches</li>
                    <li>• Lumière du soleil & température</li>
                  </ul>
                </div>
                <div className="mt-3 p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-center text-[10px] font-bold text-blue-900 dark:text-blue-300 border border-blue-200">
                  Éléments physiques du décor
                </div>
              </div>

              {/* Box 2 : Êtres Vivants (Biocénose) */}
              <div className={`p-4 rounded-3xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 flex flex-col justify-between shadow-md ${
                isVivants
                  ? 'border-emerald-500 shadow-emerald-500/20 scale-[1.02] ring-2 ring-emerald-400'
                  : 'border-emerald-200 dark:border-slate-700'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase">
                      Pilier 2 • Biocénose
                    </span>
                    <span className="text-2xl">🌲🦌🐦</span>
                  </div>
                  <h4 className="font-black text-sm text-emerald-950 dark:text-emerald-200 mb-1">
                    2. Les Êtres Vivants
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                    La communauté de tous les êtres qui <strong>habitent</strong> le milieu :
                  </p>
                  <ul className="mt-2 text-xs space-y-1 text-slate-700 dark:text-slate-200 font-medium">
                    <li>• Végétaux (chênes, mousses, fleurs)</li>
                    <li>• Animaux (cerfs, oiseaux, insectes)</li>
                    <li>• Décomposeurs (champignons, vers de terre)</li>
                  </ul>
                </div>
                <div className="mt-3 p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-center text-[10px] font-bold text-emerald-900 dark:text-emerald-300 border border-emerald-200">
                  Tous les organismes vivants
                </div>
              </div>

              {/* Box 3 : LES INTERACTIONS (Crucial pillar requested by user) */}
              <div className={`p-4 rounded-3xl bg-amber-50/80 dark:bg-slate-800 border-2 transition-all duration-300 flex flex-col justify-between shadow-md ${
                isInteractions
                  ? 'border-amber-500 shadow-amber-500/30 scale-[1.03] ring-2 ring-amber-400'
                  : 'border-amber-300 dark:border-amber-600'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-[10px] font-black uppercase tracking-wider border border-amber-300">
                      Pilier 3 • Relations Mutuelles
                    </span>
                    <span className="text-2xl">🔄🕸️</span>
                  </div>
                  <h4 className="font-black text-sm text-amber-950 dark:text-amber-300 mb-1">
                    3. Les INTERACTIONS
                  </h4>
                  <p className="text-xs text-amber-900 dark:text-slate-200 leading-relaxed font-semibold">
                    Les <strong>liens mutuels indispensables</strong> qui relient tout :
                  </p>
                  <ul className="mt-2 text-xs space-y-1 text-slate-800 dark:text-slate-100 font-medium">
                    <li>• <strong>Alimentation :</strong> chaînes trophiques (proie ➜ prédateur)</li>
                    <li>• <strong>Reproduction :</strong> pollinisation par les abeilles</li>
                    <li>• <strong>Abri & Support :</strong> nid d'oiseau dans le chêne</li>
                  </ul>
                </div>
                <div className="mt-3 p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-center text-[11px] font-black text-amber-950 dark:text-amber-200 border border-amber-300">
                  Le lien vivant qui relie le décor et les espèces
                </div>
              </div>
            </div>

            {/* Bottom Golden Formula Bar */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-center text-xs sm:text-sm font-black shadow-md flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
              <span>✨ Synthèse clé : Écosystème = Milieu naturel + Êtres vivants + INTERACTIONS mutuelles</span>
            </div>

            {/* 3 Illustrated Alternative Ecosystems (Pour briller au contrôle avec un autre exemple) */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span>Briller en classe : Découvre 3 autres exemples d'écosystèmes à citer !</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                  Clique sur un milieu pour voir ses 3 piliers
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {ECOSYSTEM_EXAMPLES.map((eco) => {
                  const isCur = selectedAltEcosystem === eco.id;
                  return (
                    <button
                      key={eco.id}
                      type="button"
                      onClick={() => setSelectedAltEcosystem(isCur ? null : eco.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer ${
                        isCur
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm scale-[1.02]'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-emerald-400'
                      }`}
                    >
                      <span className="text-lg">{eco.icon.split(' ')[0] || '🌿'}</span>
                      <div className="truncate">
                        <div className="font-black truncate">{eco.name}</div>
                        <div className="text-[10px] opacity-75">{isCur ? '▲ Masquer' : '▼ Découvrir'}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedAltEcosystem && (() => {
                const currentAlt = ECOSYSTEM_EXAMPLES.find((e) => e.id === selectedAltEcosystem);
                if (!currentAlt) return null;
                return (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between font-black text-xs text-emerald-900 dark:text-emerald-200">
                      <span>Exemple concret : {currentAlt.name}</span>
                      <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded text-emerald-950 dark:text-emerald-200">
                        Prêt à citer au contrôle !
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-700 dark:text-slate-200">
                      <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 space-y-0.5">
                        <span className="font-black text-blue-900 dark:text-blue-300 block">1. Milieu (Biotope) :</span>
                        <span>{currentAlt.milieu}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700 space-y-0.5">
                        <span className="font-black text-emerald-900 dark:text-emerald-300 block">2. Vivants (Biocénose) :</span>
                        <span>{currentAlt.vivants}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 space-y-0.5">
                        <span className="font-black text-amber-900 dark:text-amber-300 block">3. Interactions :</span>
                        <span>{currentAlt.interaction}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        );
      }

      /* HISTOIRE 6H1 : ORIGINES ET FOSSILES */
      case 'savannah': {
        const isToumaiActive = activePointer.target === 'toumai';
        const isSapiensActive = activePointer.target === 'sapiens';
        const isBerceauActive = activePointer.target === 'berceau' || activePointer.target === 'map_africa';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-amber-200 dark:border-amber-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-600 text-white font-black text-xs uppercase tracking-wider">
                  ORIGINES & FOSSILES
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  L'Afrique = Le Berceau de l'Humanité
                </span>
              </div>
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2.5 py-0.5 rounded-lg border border-amber-300">
                -7 Millions ➜ -300 000 ans
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center my-auto">
              {/* African Map with SVG Drawings */}
              <div className={`md:col-span-5 p-3 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 shadow-sm ${
                isToumaiActive || isSapiensActive || activePointer.target === 'map_africa'
                  ? 'border-amber-500 shadow-md scale-[1.02]'
                  : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase mb-1 flex items-center justify-between">
                  <span>1. Carte : Les premiers fossiles</span>
                  {(isToumaiActive || isSapiensActive) && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[9px] font-black animate-pulse">
                      POINTÉ EN DIRECT
                    </span>
                  )}
                </div>
                <svg viewBox="0 0 200 200" className="w-full h-36 mx-auto">
                  <path
                    d="M 60 20 Q 120 15 150 40 Q 170 80 150 110 Q 140 140 120 170 Q 90 195 70 180 Q 50 150 40 110 Q 30 70 60 20 Z"
                    fill="#d97706"
                    fillOpacity="0.8"
                    stroke="#b45309"
                    strokeWidth="2.5"
                  />
                  {/* Pin 1 : Tchad Toumaï */}
                  <circle cx="85" cy="65" r={isToumaiActive ? "9" : "6"} fill="#ef4444" className={isToumaiActive ? "animate-ping" : ""} />
                  <circle cx="85" cy="65" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth={isToumaiActive ? "2" : "0"} />
                  <text x="96" y="69" fill="#1e293b" className="dark:fill-amber-200" fontSize="10" fontWeight="black">
                    Toumaï (-7M Tchad)
                  </text>

                  {/* Pin 2 : Homo Sapiens */}
                  <circle cx="115" cy="95" r={isSapiensActive ? "9" : "6"} fill="#10b981" className={isSapiensActive ? "animate-ping" : ""} />
                  <circle cx="115" cy="95" r="5" fill="#10b981" stroke="#ffffff" strokeWidth={isSapiensActive ? "2" : "0"} />
                  <text x="125" y="99" fill="#1e293b" className="dark:fill-emerald-200" fontSize="10" fontWeight="black">
                    Homo Sapiens (-300k)
                  </text>
                </svg>
              </div>

              {/* Berceau Drawing Card */}
              <div className={`md:col-span-4 p-3 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 shadow-sm ${
                isBerceauActive ? 'border-amber-500 shadow-md scale-[1.02]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase mb-1">
                  2. Mot d'Or du Prof
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/40 text-center space-y-1">
                  <div className="text-3xl">👶🌍</div>
                  <div className="font-black text-xs text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                    "Le Berceau de l'Humanité"
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-amber-100">
                    C'est en <strong>Afrique</strong> que notre espèce humaine est née et a fait ses premiers pas !
                  </p>
                </div>
              </div>

              {/* Fossil Drawing Card */}
              <div className="md:col-span-3 p-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center space-y-1 shadow-sm">
                <div className="text-[10px] font-black text-indigo-700 dark:text-indigo-400 uppercase mb-1">
                  3. Définition
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/40 space-y-1">
                  <span className="text-2xl">🦴</span>
                  <div className="font-black text-xs text-indigo-900 dark:text-white">FOSSILE</div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300">
                    Trace ou os ancien conservé dans la roche.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-slate-900 border border-amber-300 text-center text-xs text-amber-950 dark:text-amber-200 font-extrabold flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-pulse" />
              <span>À RETENIR POUR LE CONTRÔLE : L'Afrique est le berceau unique de tous les humains.</span>
            </div>
          </div>
        );
      }

      /* HISTOIRE 6H1 : GRANDES MIGRATIONS */
      case 'migration_map': {
        const isDepart = activePointer.target === 'fleche_depart';
        const isAsieEurope = activePointer.target === 'fleche_asie_europe';
        const isBering = activePointer.target === 'fleche_bering_amerique';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between border-b-2 border-rose-200 dark:border-rose-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-xs uppercase tracking-wider">
                  MIGRATIONS
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  Le Peuplement de la Terre à Pied
                </span>
              </div>
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2.5 py-0.5 rounded-lg border border-rose-300">
                Départ vers -100 000 ans
              </span>
            </div>

            <div className="relative my-auto w-full h-44 sm:h-52 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-2 overflow-hidden flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 500 220" className="w-full h-full">
                <path d="M 40 40 Q 90 30 110 60 Q 100 90 70 100 Q 50 80 40 40 Z" fill="#94a3b8" />
                <text x="55" y="65" fill="#334155" className="dark:fill-slate-200" fontSize="8" fontWeight="bold">AMÉRIQUE</text>
                <path d="M 80 110 Q 110 115 105 155 Q 90 185 75 155 Z" fill="#94a3b8" />

                <path d="M 190 35 Q 230 30 240 55 Q 210 65 190 50 Z" fill="#94a3b8" />
                <text x="195" y="48" fill="#334155" className="dark:fill-slate-200" fontSize="8" fontWeight="bold">EUROPE</text>

                <path d="M 190 70 Q 235 65 240 100 Q 225 145 205 145 Q 185 105 190 70 Z" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
                <text x="198" y="100" fill="#ffffff" fontSize="9" fontWeight="black">AFRIQUE</text>
                <circle cx="215" cy="80" r="5" fill="#ef4444" className="animate-ping" />
                <circle cx="215" cy="80" r="3.5" fill="#ef4444" />

                <path d="M 245 35 Q 340 25 370 65 Q 320 105 260 80 Z" fill="#94a3b8" />
                <text x="290" y="60" fill="#334155" className="dark:fill-slate-200" fontSize="9" fontWeight="bold">ASIE</text>

                <path d="M 330 125 Q 370 120 365 155 Q 330 160 330 125 Z" fill="#94a3b8" />
                <text x="333" y="142" fill="#334155" className="dark:fill-slate-200" fontSize="7" fontWeight="bold">OCÉANIE</text>

                {/* Flèches de migration */}
                <path
                  d="M 220 75 Q 235 70 250 68"
                  fill="none"
                  stroke={isDepart ? '#f59e0b' : '#ef4444'}
                  strokeWidth={isDepart ? '5' : '3.5'}
                  strokeDasharray="4 2"
                  className={isDepart ? 'animate-pulse' : ''}
                />
                <text x="222" y="62" fill="#ef4444" fontSize="8" fontWeight="black">
                  -100 000 ans
                </text>

                <path
                  d="M 245 65 Q 230 55 215 52"
                  fill="none"
                  stroke={isAsieEurope ? '#f59e0b' : '#ef4444'}
                  strokeWidth={isAsieEurope ? '4.5' : '3'}
                  strokeDasharray="4 2"
                />
                <text x="175" y="40" fill="#ef4444" fontSize="7" fontWeight="bold">
                  Europe (-45k)
                </text>

                <path
                  d="M 255 68 Q 290 64 330 65"
                  fill="none"
                  stroke={isAsieEurope ? '#f59e0b' : '#ef4444'}
                  strokeWidth={isAsieEurope ? '4.5' : '3'}
                  strokeDasharray="4 2"
                />
                <text x="280" y="75" fill="#ef4444" fontSize="7" fontWeight="bold">
                  Asie (-70k)
                </text>

                <path
                  d="M 370 55 Q 420 35 450 30"
                  fill="none"
                  stroke={isBering ? '#f59e0b' : '#ef4444'}
                  strokeWidth={isBering ? '4.5' : '2.5'}
                  strokeDasharray="3 2"
                />
                <path
                  d="M 30 30 Q 50 40 70 55"
                  fill="none"
                  stroke={isBering ? '#f59e0b' : '#ef4444'}
                  strokeWidth={isBering ? '4.5' : '2.5'}
                  strokeDasharray="3 2"
                />
                <text x="45" y="90" fill="#ef4444" fontSize="7" fontWeight="bold">
                  Amérique via Béring (-15k)
                </text>
              </svg>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-center font-black">
              <div className={`p-2 rounded-xl border transition-all ${
                isDepart ? 'bg-rose-600 text-white border-amber-400 scale-[1.03]' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                1. Sortie d'Afrique (-100k)
              </div>
              <div className={`p-2 rounded-xl border transition-all ${
                isAsieEurope ? 'bg-rose-600 text-white border-amber-400 scale-[1.03]' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                2. Asie (-70k) & Océanie (-50k)
              </div>
              <div className={`p-2 rounded-xl border transition-all ${
                isAsieEurope ? 'bg-rose-600 text-white border-amber-400 scale-[1.03]' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                3. Europe (-45k)
              </div>
              <div className={`p-2 rounded-xl border transition-all ${
                isBering ? 'bg-rose-600 text-white border-amber-400 scale-[1.03]' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                4. Amérique via Béring (-15k)
              </div>
            </div>
          </div>
        );
      }

      /* HISTOIRE 6H1 : SILEX ET FEU */
      case 'fire_tools': {
        const isSilexActive = activePointer.target === 'silex';
        const isFeuActive = activePointer.target === 'feu' || activePointer.target === 'protection';
        const isNomadeActive = activePointer.target === 'nomade';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-orange-200 dark:border-orange-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-orange-600 text-white font-black text-xs uppercase tracking-wider">
                  PALÉOLITHIQUE
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  Outils en Silex & Révolution du Feu
                </span>
              </div>
              <span className="text-xs font-bold text-orange-800 dark:text-orange-300 bg-orange-100 dark:bg-orange-950 px-2.5 py-0.5 rounded-lg border border-orange-300">
                Vers -400 000 ans
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto">
              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-1 shadow-sm ${
                isSilexActive ? 'border-amber-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-4xl">🪨✨</div>
                <div className="font-black text-xs text-amber-900 dark:text-amber-300 uppercase">La Pierre Taillée</div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300">
                  En frappant le <strong>silex</strong>, on obtient des lames tranchantes pour la chasse.
                </p>
                <div className="text-[10px] font-bold text-amber-800 dark:text-amber-200">Paléo = Ancienne • Lithique = Pierre</div>
              </div>

              <div className={`p-3.5 rounded-2xl bg-orange-50 dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-1 shadow-sm ${
                isFeuActive ? 'border-orange-500 shadow-md scale-[1.04]' : 'border-orange-200 dark:border-slate-700'
              }`}>
                <div className="text-4xl animate-bounce">🔥🪵</div>
                <div className="font-black text-xs text-orange-900 dark:text-orange-300 uppercase">Le Feu (-400 000 ans)</div>
                <p className="text-[11px] text-slate-700 dark:text-slate-200">
                  <strong>3 rôles clés :</strong> Cuire la viande, se réchauffer, éloigner les fauves.
                </p>
                <span className="inline-block text-[9px] font-black px-2 py-0.5 rounded-full bg-orange-600 text-white">
                  Révolution Vitale
                </span>
              </div>

              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-1 shadow-sm ${
                isNomadeActive ? 'border-blue-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-4xl">⛺🦣</div>
                <div className="font-black text-xs text-blue-900 dark:text-blue-300 uppercase">Mode de Vie Nomade</div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300">
                  <strong>Zéro maison fixe</strong> : ils bougent en suivant les troupeaux.
                </p>
                <div className="text-[10px] font-bold text-blue-800 dark:text-blue-200">Tentes de peaux & entrées de grottes</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-slate-900 border border-orange-300 text-center text-xs text-orange-950 dark:text-orange-200 font-extrabold">
              ⭐ À RETENIR : Paléolithique = Pierre taillée (silex) + Nomades + Feu vers -400 000 ans !
            </div>
          </div>
        );
      }

      /* HISTOIRE 6H1 : LASCAUX ET ECRITURE */
      case 'cave_writing': {
        const isLascaux = activePointer.target === 'lascaux';
        const isEcriture = activePointer.target === 'ecriture' || activePointer.target === 'fin_prehistoire';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-purple-200 dark:border-purple-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-purple-600 text-white font-black text-xs uppercase tracking-wider">
                  CHRONOLOGIE
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  L'Art des Grottes & la Fin de la Préhistoire
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-lg border border-emerald-300">
                -3500 av. J.-C.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto items-center">
              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 space-y-1.5 text-center shadow-sm ${
                isLascaux ? 'border-amber-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="font-black text-xs text-amber-900 dark:text-amber-300 uppercase">1. L'Art Pariétal (-40 000 ans)</div>
                <div className="flex items-center justify-center gap-4 text-3xl py-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200">
                  <span>🦣</span>
                  <span>🐎</span>
                  <span>🦬</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300">
                  Grottes de <strong>Chauvet</strong> et <strong>Lascaux</strong> : peintures d'animaux avec ocres et charbon de bois.
                </p>
              </div>

              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 space-y-1.5 text-center shadow-sm ${
                isEcriture ? 'border-emerald-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="font-black text-xs text-emerald-900 dark:text-emerald-300 uppercase">2. L'Écriture (-3500 av. J.-C.)</div>
                <div className="flex items-center justify-center gap-2 text-3xl py-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200">
                  <span>✍️</span>
                  <span>📜</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-200">
                  Inventée en <strong>Mésopotamie</strong> : elle marque officiellement la <strong>FIN de la Préhistoire</strong> et le <strong>DÉBUT de l'Histoire</strong> !
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-slate-900 border border-emerald-300 text-center text-xs text-emerald-950 dark:text-emerald-200 font-black">
              🏆 QUESTION DU CONTRÔLE : L'invention de l'écriture vers -3500 met fin à la Préhistoire !
            </div>
          </div>
        );
      }

      /* ANGLAIS : CARDINAUX */
      case 'english_cardinal': {
        const isTiret = activePointer.target === 'tiret';
        const isForty = activePointer.target === 'forty_piege';
        const isThousand = activePointer.target === 'thousand_invariable';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-blue-200 dark:border-blue-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <UkFlagIcon className="h-4 w-4" />
                  <span>CARDINAL NUMBERS</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  Les Pièges Essentiels de 1 à 1 000 000
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto">
              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-1 shadow-sm ${
                isTiret ? 'border-amber-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-3xl">➖</div>
                <div className="font-black text-xs text-amber-900 dark:text-amber-300 uppercase">1. Trait d'Union</div>
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 text-xs font-black text-amber-900 dark:text-amber-200">
                  twenty-one
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  Obligatoire entre la dizaine et l'unité de 21 à 99 !
                </p>
              </div>

              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-1 shadow-sm ${
                isForty ? 'border-rose-500 shadow-md scale-[1.04]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-3xl">⚠️</div>
                <div className="font-black text-xs text-rose-900 dark:text-rose-300 uppercase">2. Le Piège de FORTY</div>
                <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-300 text-xs font-black text-rose-950 dark:text-white">
                  40 = forty <span className="text-rose-600 line-through">(fourty)</span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  S'écrit SANS 'u' en anglais !
                </p>
              </div>

              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-1 shadow-sm ${
                isThousand ? 'border-emerald-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-3xl">💯</div>
                <div className="font-black text-xs text-emerald-900 dark:text-emerald-300 uppercase">3. Invariable</div>
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-xs font-black text-emerald-950 dark:text-emerald-200">
                  five thousand <span className="line-through text-rose-600">(sans s)</span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  Jamais de 's' précédé d'un chiffre !
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-slate-900 border border-blue-200 text-center text-xs text-blue-950 dark:text-blue-200 font-extrabold">
              ⭐ Règle d'or : twenty-one avec tiret • FORTY sans U • five thousand sans S !
            </div>
          </div>
        );
      }

      /* ANGLAIS : ORDINAUX */
      case 'english_ordinal': {
        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <UkFlagIcon className="h-4 w-4" />
                  <span>ORDINAL NUMBERS</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">Le Podium des Vainqueurs</span>
              </div>
            </div>

            <div className="my-auto py-2">
              <div className="grid grid-cols-3 gap-3 items-end max-w-md mx-auto text-center">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 space-y-1 shadow-sm">
                  <span className="text-2xl">🥈</span>
                  <div className="text-sm font-black text-slate-700 dark:text-slate-300">2nd</div>
                  <div className="text-xs font-bold text-slate-500">second</div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950 border-2 border-amber-400 space-y-1 shadow-md scale-105">
                  <span className="text-3xl">🥇</span>
                  <div className="text-base font-black text-amber-800 dark:text-amber-300">1st</div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">first</div>
                </div>

                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-amber-700 space-y-1 shadow-sm">
                  <span className="text-2xl">🥉</span>
                  <div className="text-sm font-black text-amber-800 dark:text-amber-600">3rd</div>
                  <div className="text-xs font-bold text-slate-500">third</div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-purple-950 border border-indigo-200 text-indigo-900 dark:text-purple-200 text-xs font-bold">
                  Tous les suivants prennent la terminaison régulière en <strong>-th</strong> (4th fourth, 5th fifth...)
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-slate-900 border border-indigo-200 text-center text-xs text-indigo-950 dark:text-indigo-200 font-extrabold">
              ⭐ Retiens : 1st first (st) • 2nd second (nd) • 3rd third (rd) • puis -th !
            </div>
          </div>
        );
      }

      /* ANGLAIS : DATES & PREPOSITIONS */
      case 'english_dates_prepositions': {
        const isRuleOn = activePointer.target === 'rule_on';
        const isRuleIn = activePointer.target === 'rule_in';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-emerald-200 dark:border-emerald-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <UkFlagIcon className="h-4 w-4" />
                  <span>DATES & PREPOSITIONS</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">La Règle d'Or IN vs ON</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
              <div className={`p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 space-y-2 text-center shadow-sm ${
                isRuleOn ? 'border-amber-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-3xl">📅</div>
                <div className="font-black text-sm text-amber-900 dark:text-amber-300 uppercase">ON + Jour Précis</div>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/80 border border-amber-300 space-y-1">
                  <div className="font-black text-slate-900 dark:text-white text-xs">on Friday</div>
                  <div className="font-black text-amber-800 dark:text-amber-200 text-xs">on the 21st of June</div>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  Dès qu'il y a un jour précis, on utilise toujours <strong>ON</strong> !
                </p>
              </div>

              <div className={`p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 space-y-2 text-center shadow-sm ${
                isRuleIn ? 'border-emerald-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-3xl">🗓️</div>
                <div className="font-black text-sm text-emerald-900 dark:text-emerald-300 uppercase">IN + Mois ou Année</div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 space-y-1">
                  <div className="font-black text-slate-900 dark:text-white text-xs">in July</div>
                  <div className="font-black text-emerald-800 dark:text-emerald-200 text-xs">in 2026</div>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  Pour une période longue (mois seul ou année), on utilise toujours <strong>IN</strong> !
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-slate-900 border border-emerald-200 text-center text-xs text-emerald-950 dark:text-emerald-200 font-extrabold">
              ⭐ Règle d'or : ON pour le Jour précis • IN pour le Mois seul ou l'Année !
            </div>
          </div>
        );
      }

      /* ANGLAIS : THE 4 NATIONS OF THE UK (WITH INTERACTIVE GEOGRAPHIC MAP) */
      case 'uk_four_nations': {
        const isEng = activePointer.target === 'nation_england';
        const isSco = activePointer.target === 'nation_scotland';
        const isWal = activePointer.target === 'nation_wales';
        const isNI = activePointer.target === 'nation_nireland';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <UkFlagIcon className="h-4 w-4" />
                  <span>THE UNITED KINGDOM (UK)</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  Carte Géographique des 4 Nations & Capitales
                </span>
              </div>
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded-lg border border-indigo-200">
                Union Jack 🇬🇧
              </span>
            </div>

            {/* Top: The Interactive Geographic Map */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center my-auto">
              {/* SVG Map (5 cols) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-2 rounded-2xl bg-sky-50 dark:bg-slate-950/80 border-2 border-sky-200 dark:border-sky-900 shadow-inner relative overflow-hidden">
                <div className="absolute top-1 right-2 text-[9px] font-extrabold uppercase text-sky-600/70 tracking-wider">
                  North Sea 🌊
                </div>
                <div className="absolute bottom-1 left-2 text-[9px] font-extrabold uppercase text-sky-600/70 tracking-wider">
                  Irish Sea 🌊
                </div>

                <svg viewBox="0 0 280 230" className="w-full max-w-[240px] h-48 drop-shadow-md select-none">
                  {/* Surrounding ocean background */}
                  <rect width="280" height="230" fill="transparent" />

                  {/* 1. SCOTLAND (North / Blue) */}
                  <g className={`transition-all duration-300 cursor-pointer ${isSco ? 'filter drop-shadow(0 0 8px #3b82f6)' : ''}`}>
                    <path
                      d="M 140,20 L 175,30 L 190,55 L 180,85 L 150,90 L 130,85 L 115,65 L 125,35 Z"
                      fill={isSco ? "#2563eb" : "#3b82f6"}
                      stroke={isSco ? "#f59e0b" : "#1d4ed8"}
                      strokeWidth={isSco ? "3.5" : "2"}
                    />
                    {/* Edinburgh pin */}
                    <circle cx="160" cy="78" r="4.5" fill="#facc15" stroke="#1e3a8a" strokeWidth="1.5" />
                    <text x="168" y="81" fontSize="9" fontWeight="900" fill={isSco ? "#facc15" : "#ffffff"} textAnchor="start">
                      Edinburgh
                    </text>
                    <text x="145" y="55" fontSize="10" fontWeight="900" fill="#ffffff" textAnchor="middle">
                      SCOTLAND 🏴󠁧󠁢󠁳󠁣󠁴󠁿
                    </text>
                  </g>

                  {/* 2. ENGLAND (South-East / Red) */}
                  <g className={`transition-all duration-300 cursor-pointer ${isEng ? 'filter drop-shadow(0 0 8px #ef4444)' : ''}`}>
                    <path
                      d="M 150,90 L 180,85 L 205,115 L 230,150 L 225,185 L 185,200 L 140,195 L 130,165 L 145,135 L 145,100 Z"
                      fill={isEng ? "#dc2626" : "#ef4444"}
                      stroke={isEng ? "#f59e0b" : "#b91c1c"}
                      strokeWidth={isEng ? "3.5" : "2"}
                    />
                    {/* London pin */}
                    <circle cx="195" cy="175" r="5" fill="#facc15" stroke="#7f1d1d" strokeWidth="1.5" />
                    <text x="195" y="190" fontSize="10" fontWeight="900" fill="#fef08a" textAnchor="middle">
                      ★ London
                    </text>
                    <text x="180" y="140" fontSize="11" fontWeight="900" fill="#ffffff" textAnchor="middle">
                      ENGLAND 🏴󠁧󠁢󠁥󠁮󠁧󠁿
                    </text>
                  </g>

                  {/* 3. WALES (West / Green) */}
                  <g className={`transition-all duration-300 cursor-pointer ${isWal ? 'filter drop-shadow(0 0 8px #10b981)' : ''}`}>
                    <path
                      d="M 125,135 L 145,135 L 140,175 L 115,180 L 105,155 Z"
                      fill={isWal ? "#15803d" : "#16a34a"}
                      stroke={isWal ? "#f59e0b" : "#14532d"}
                      strokeWidth={isWal ? "3.5" : "2"}
                    />
                    {/* Cardiff pin */}
                    <circle cx="125" cy="175" r="4" fill="#facc15" stroke="#14532d" strokeWidth="1.5" />
                    <text x="105" y="190" fontSize="9" fontWeight="900" fill={isWal ? "#facc15" : "#ffffff"} textAnchor="middle">
                      Cardiff
                    </text>
                    <text x="125" y="152" fontSize="9" fontWeight="900" fill="#ffffff" textAnchor="middle">
                      WALES 🏴󠁧󠁢󠁷󠁬󠁳󠁿
                    </text>
                  </g>

                  {/* 4. NORTHERN IRELAND (Top-East of neighbor island / Teal) */}
                  <g className={`transition-all duration-300 cursor-pointer ${isNI ? 'filter drop-shadow(0 0 8px #14b8a6)' : ''}`}>
                    {/* Republic of Ireland outline as soft background */}
                    <path
                      d="M 50,110 L 85,95 L 90,135 L 75,175 L 45,155 Z"
                      fill="#94a3b8"
                      opacity="0.3"
                      stroke="#64748b"
                      strokeWidth="1"
                    />
                    <text x="65" y="150" fontSize="8" fontWeight="bold" fill="#64748b" textAnchor="middle">
                      (Irlande)
                    </text>

                    {/* Northern Ireland (UK) */}
                    <path
                      d="M 58,75 L 90,65 L 100,95 L 75,105 L 55,90 Z"
                      fill={isNI ? "#0f766e" : "#0d9488"}
                      stroke={isNI ? "#f59e0b" : "#134e4a"}
                      strokeWidth={isNI ? "3.5" : "2"}
                    />
                    {/* Belfast pin */}
                    <circle cx="85" cy="85" r="4" fill="#facc15" stroke="#134e4a" strokeWidth="1.5" />
                    <text x="92" y="80" fontSize="8.5" fontWeight="900" fill={isNI ? "#facc15" : "#ffffff"} textAnchor="start">
                      Belfast
                    </text>
                    <text x="75" y="78" fontSize="8" fontWeight="900" fill="#ffffff" textAnchor="middle">
                      N. IRELAND ☘️
                    </text>
                  </g>
                </svg>

                <div className="text-[10px] font-black text-slate-600 dark:text-slate-300 mt-1">
                  📍 Repères géographiques : Écosse au NORD • Galles à l'OUEST
                </div>
              </div>

              {/* The 4 Identity Cards (7 cols) */}
              <div className="md:col-span-7 grid grid-cols-2 gap-2">
                {/* England */}
                <div className={`p-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-0.5 shadow-xs ${
                  isEng ? 'border-red-500 shadow-md scale-[1.02] ring-2 ring-red-400 bg-red-50/50' : 'border-slate-200 dark:border-slate-700'
                }`}>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xl">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                    <span className="font-black text-xs text-red-700 dark:text-red-400 uppercase">ENGLAND</span>
                  </div>
                  <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">Capitale : London</div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Nationalité : English</div>
                  <div className="pt-0.5 text-[11px] font-bold text-red-600 dark:text-red-400">🌹 Tudor Rose</div>
                </div>

                {/* Scotland */}
                <div className={`p-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-0.5 shadow-xs ${
                  isSco ? 'border-blue-500 shadow-md scale-[1.02] ring-2 ring-blue-400 bg-blue-50/50' : 'border-slate-200 dark:border-slate-700'
                }`}>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xl">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
                    <span className="font-black text-xs text-blue-700 dark:text-blue-400 uppercase">SCOTLAND</span>
                  </div>
                  <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">Capitale : Edinburgh</div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Nationalité : Scottish</div>
                  <div className="pt-0.5 text-[11px] font-bold text-purple-600 dark:text-purple-400">🪻 Thistle</div>
                </div>

                {/* Wales */}
                <div className={`p-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-0.5 shadow-xs ${
                  isWal ? 'border-emerald-500 shadow-md scale-[1.02] ring-2 ring-emerald-400 bg-emerald-50/50' : 'border-slate-200 dark:border-slate-700'
                }`}>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xl">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
                    <span className="font-black text-xs text-emerald-700 dark:text-emerald-400 uppercase">WALES</span>
                  </div>
                  <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">Capitale : Cardiff</div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Nationalité : Welsh</div>
                  <div className="pt-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">🌼 Daffodil / 🌱 Leek</div>
                </div>

                {/* Northern Ireland */}
                <div className={`p-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-0.5 shadow-xs ${
                  isNI ? 'border-teal-500 shadow-md scale-[1.02] ring-2 ring-teal-400 bg-teal-50/50' : 'border-slate-200 dark:border-slate-700'
                }`}>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xl">🇬🇧☘️</span>
                    <span className="font-black text-xs text-teal-700 dark:text-teal-400 uppercase">N. IRELAND</span>
                  </div>
                  <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">Capitale : Belfast</div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Nationalité : Northern Irish</div>
                  <div className="pt-0.5 text-[11px] font-bold text-teal-600 dark:text-teal-400">☘️ Shamrock</div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-slate-900 border border-indigo-200 text-center text-xs text-indigo-950 dark:text-indigo-200 font-extrabold flex items-center justify-center gap-2">
              <span>🇬🇧 The Union Jack =</span>
              <span>St George (🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre) + St Andrew (🏴󠁧󠁢󠁳󠁣󠁴󠁿 Écosse) + St Patrick (☘️ Irlande)</span>
            </div>
          </div>
        );
      }

      /* ANGLAIS : UK EMBLEMS & CULTURE */
      case 'uk_emblems': {
        const isRose = activePointer.target === 'rose_england';
        const isThistle = activePointer.target === 'thistle_scotland';
        const isDaffodil = activePointer.target === 'daffodil_wales';
        const isShamrock = activePointer.target === 'shamrock_ireland';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-rose-200 dark:border-rose-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>🌹</span>
                  <span>UK NATIONAL EMBLEMS</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  Les 4 Symboles Légendaires & Végétaux
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto">
              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-1.5 shadow-sm ${
                isRose ? 'border-rose-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-4xl">🌹</div>
                <div className="font-black text-xs text-rose-700 dark:text-rose-400">The Tudor Rose</div>
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">England 🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Symbole royal de paix historique.</p>
              </div>

              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-1.5 shadow-sm ${
                isThistle ? 'border-purple-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-4xl">🪻</div>
                <div className="font-black text-xs text-purple-700 dark:text-purple-400">The Thistle</div>
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿</div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Le chardon piquant, protecteur et fier.</p>
              </div>

              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-1.5 shadow-sm ${
                isDaffodil ? 'border-amber-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-4xl">🌼🌱</div>
                <div className="font-black text-xs text-amber-700 dark:text-amber-400">Daffodil & Leek</div>
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Wales 🏴󠁧󠁢󠁷󠁬󠁳󠁿</div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Jonquille jaune & Poireau de St David.</p>
              </div>

              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-1.5 shadow-sm ${
                isShamrock ? 'border-emerald-500 shadow-md scale-[1.03]' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-4xl">☘️</div>
                <div className="font-black text-xs text-emerald-700 dark:text-emerald-400">The Shamrock</div>
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Northern Ireland 🇬🇧</div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Trèfle à 3 feuilles de St Patrick.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-slate-900 border border-rose-200 text-center text-xs text-rose-950 dark:text-rose-200 font-extrabold">
              ⭐ Piège classique du contrôle : L'Écosse = Thistle (chardon), Le Pays de Galles = Daffodil (jonquille) et Leek (poireau) !
            </div>
          </div>
        );
      }

      /* ANGLAIS : CLASSROOM ENGLISH (Les 31 actions officielles du cahier de Mathieu) */
      case 'classroom_english': {
        const filteredActions = CLASSROOM_ACTIONS.filter((act) => {
          if (classroomCategoryFilter === 'all') return true;
          return act.category === classroomCategoryFilter;
        });

        const teacherCount = CLASSROOM_ACTIONS.filter(a => a.category === 'teacher').length;
        const pupilCount = CLASSROOM_ACTIONS.filter(a => a.category === 'pupil').length;

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-amber-200 dark:border-amber-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>🧑‍🏫</span>
                  <span>CLASSROOM ENGLISH</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  Les 31 Actions & Consignes (Clique pour entendre la prononciation)
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setClassroomCategoryFilter('all')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                    classroomCategoryFilter === 'all'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  ⭐ Toutes ({CLASSROOM_ACTIONS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setClassroomCategoryFilter('teacher')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                    classroomCategoryFilter === 'teacher'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  🧑‍🏫 Prof ({teacherCount})
                </button>
                <button
                  type="button"
                  onClick={() => setClassroomCategoryFilter('pupil')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                    classroomCategoryFilter === 'pupil'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  🙋 Élève ({pupilCount})
                </button>
              </div>
            </div>

            {/* Interactive Grid of Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredActions.map((act) => {
                const isSpeakingThis = activeSpeakingAction === act.en;
                const isTeacher = act.category === 'teacher';

                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => handleSpeakExpression(act.en)}
                    className={`p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSpeakingThis
                        ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-500 shadow-md ring-2 ring-amber-400 scale-[1.02]'
                        : isTeacher
                          ? 'bg-white dark:bg-slate-800 border-amber-200/80 dark:border-amber-900/50 hover:border-amber-400 hover:bg-amber-50/40'
                          : 'bg-white dark:bg-slate-800 border-indigo-200/80 dark:border-indigo-900/50 hover:border-indigo-400 hover:bg-indigo-50/40'
                    }`}
                    title="Cliquer pour entendre la prononciation"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xl shrink-0">{act.icon}</span>
                      <div className="min-w-0">
                        <div className="font-black text-xs text-slate-900 dark:text-white truncate">
                          {act.en}
                        </div>
                        <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 truncate">
                          {act.fr}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span
                        className={`h-7 w-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                          isSpeakingThis
                            ? 'bg-amber-500 text-slate-950 animate-bounce'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {isSpeakingThis ? '🔊' : '▶️'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-2 rounded-xl bg-amber-50 dark:bg-slate-900 border border-amber-300 text-center text-xs text-amber-950 dark:text-amber-200 font-extrabold flex items-center justify-center gap-2">
              <span>⭐</span>
              <span>
                <strong>31 actions au complet :</strong> 18 consignes du professeur + 13 demandes de l'élève. Clique sur n'importe quelle carte pour écouter !
              </span>
            </div>
          </div>
        );
      }

      /* PHYSIQUE-CHIMIE : LE TRI SÉLECTIF ET LES DÉCHETS */
      case 'waste': {
        const isYellow = activePointer.target === 'yellow_bin';
        const isGreen = activePointer.target === 'green_bin';
        const isCompost = activePointer.target === 'compost_bin';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-emerald-200 dark:border-emerald-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>♻️</span>
                  <span>PHYSIQUE-CHIMIE 6ÈME</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  Les Déchets & le Tri Sélectif des Matières
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-amber-950 font-black text-[11px] uppercase tracking-wide shadow-xs">
                  3 Bacs de tri
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                Planète Propre 🌱
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto">
              {/* Poubelle Jaune */}
              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-2 shadow-sm ${
                isYellow ? 'border-amber-400 shadow-md scale-[1.03] ring-2 ring-amber-300 bg-amber-50/40' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-4xl">🟡🥫📦</div>
                <div className="font-black text-xs text-amber-700 dark:text-amber-400 uppercase">1. Bac Jaune : Emballages</div>
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 text-[11px] font-bold text-amber-950 dark:text-amber-200">
                  Plastique • Cartons • Métaux (canettes, conserves)
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  Se recyclent en nouveaux objets ou bouteilles !
                </p>
              </div>

              {/* Bac Vert */}
              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-2 shadow-sm ${
                isGreen ? 'border-emerald-500 shadow-md scale-[1.03] ring-2 ring-emerald-300 bg-emerald-50/40' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-4xl">🟢🍾🫙</div>
                <div className="font-black text-xs text-emerald-700 dark:text-emerald-400 uppercase">2. Conteneur Vert : Verre</div>
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-[11px] font-bold text-emerald-950 dark:text-emerald-200">
                  Bouteilles • Bocaux • Pots en verre
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  Recyclable à 100% et à l'infini (retirer les couvercles).
                </p>
              </div>

              {/* Composteur */}
              <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-2 shadow-sm ${
                isCompost ? 'border-orange-500 shadow-md scale-[1.03] ring-2 ring-orange-300 bg-orange-50/40' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-4xl">🟤🍎🍌</div>
                <div className="font-black text-xs text-orange-800 dark:text-orange-400 uppercase">3. Compost : Organique</div>
                <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 text-[11px] font-bold text-orange-950 dark:text-orange-200">
                  Épluchures • Restes de repas • Marc de café
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  Se décompose naturellement pour nourrir la terre !
                </p>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-amber-50 dark:bg-slate-900 border border-amber-300 text-center text-xs text-amber-950 dark:text-amber-200 font-extrabold">
              ⭐ RÈGLE D'OR 6ÈME : Retiens bien les 3 bacs ! (1. Jaune = Emballages • 2. Vert = Verre • 3. Marron = Compost)
            </div>
          </div>
        );
      }

      /* PHYSIQUE-CHIMIE : CONDUCTEURS ET ISOLANTS THERMIQUES */
      case 'conductors': {
        const isMetals = activePointer.target === 'conductors_metals';
        const isWood = activePointer.target === 'insulators_wood';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-orange-200 dark:border-orange-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-orange-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>🔥</span>
                  <span>TRANSFERTS DE CHALEUR</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  Conducteurs vs Isolants Thermiques
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
              {/* Conducteurs */}
              <div className={`p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-2 shadow-sm ${
                isMetals ? 'border-red-500 shadow-md scale-[1.03] ring-2 ring-red-300 bg-red-50/40' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-3xl">🔥⚡</div>
                <div className="font-black text-sm text-red-700 dark:text-red-400 uppercase">1. Les Conducteurs Thermiques</div>
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 text-xs font-black text-red-950 dark:text-red-200">
                  Tous les Métaux : Cuivre • Fer • Aluminium • Acier
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Ils laissent traverser la chaleur très rapidement. Exemple : le fond de la casserole en métal pour chauffer vite l'eau !
                </p>
              </div>

              {/* Isolants */}
              <div className={`p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-2 shadow-sm ${
                isWood ? 'border-sky-500 shadow-md scale-[1.03] ring-2 ring-sky-300 bg-sky-50/40' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="text-3xl">🪵🧤</div>
                <div className="font-black text-sm text-sky-700 dark:text-sky-400 uppercase">2. Les Isolants Thermiques</div>
                <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 text-xs font-black text-sky-950 dark:text-sky-200">
                  Bois • Plastique • Laine • Air • Verre
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Ils bloquent ou freinent le passage de la chaleur. Exemple : le manche en bois ou plastique pour ne pas te brûler !
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-slate-900 border border-orange-300 text-center text-xs text-orange-950 dark:text-orange-200 font-extrabold">
              ⭐ Règle d'or : Casserole en métal (conducteur pour chauffer) + Manche en bois/plastique (isolant pour protéger les doigts) !
            </div>
          </div>
        );
      }

      /* FRANÇAIS : ACCORD DU PARTICIPE PASSÉ */
      case 'french_participe': {
        const isEtre = activePointer.target === 'regle_etre';
        const isAvoir = activePointer.target === 'regle_avoir';
        const isAvoirCod = activePointer.target === 'regle_avoir_cod';

        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>✍️</span>
                  <span>FRANÇAIS 6ÈME</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
                  L'Accord du Participe Passé (Être vs Avoir)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
              {/* Auxiliaire Être */}
              <div className={`p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-2 shadow-sm ${
                isEtre ? 'border-emerald-500 shadow-md scale-[1.03] ring-2 ring-emerald-300 bg-emerald-50/40' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="font-black text-xs text-emerald-700 dark:text-emerald-400 uppercase">
                  ✨ 1. Avec l'Auxiliaire ÊTRE
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 space-y-1">
                  <div className="text-xs font-black text-slate-900 dark:text-white">Accord avec le SUJET</div>
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
                    Elles sont arrivé<strong className="text-emerald-600 underline">es</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  On regarde toujours qui fait l'action (féminin / pluriel).
                </p>
              </div>

              {/* Auxiliaire Avoir */}
              <div className={`p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 transition-all duration-300 text-center space-y-2 shadow-sm ${
                isAvoir || isAvoirCod ? 'border-indigo-500 shadow-md scale-[1.03] ring-2 ring-indigo-300 bg-indigo-50/40' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <div className="font-black text-xs text-indigo-700 dark:text-indigo-400 uppercase">
                  🛡️ 2. Avec l'Auxiliaire AVOIR
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 space-y-1">
                  <div className="text-xs font-black text-slate-900 dark:text-white">PAS d'accord avec le sujet !</div>
                  <div className="text-xs font-bold text-indigo-800 dark:text-indigo-200">
                    Elles ont mang<strong className="text-indigo-600 underline">é</strong> (invariable)
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Exception : S'accorde uniquement si le COD est placé AVANT (ex: Les pommes qu'elles ont mangé<strong className="text-indigo-600 underline">es</strong>).
                </p>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-slate-900 border border-indigo-300 text-center text-xs text-indigo-950 dark:text-indigo-200 font-extrabold">
              ⭐ Règle d'or : Être = Je m'accorde avec le sujet • Avoir = Zéro accord avec le sujet !
            </div>
          </div>
        );
      }

      /* MATHS : FRACTIONS */
      case 'fractions':
      default:
        return (
          <div className="w-full h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b-2 border-blue-200 dark:border-blue-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-wider">
                  FRACTIONS 6ÈME
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">Le Partage du Gâteau (3/4)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto items-center">
              <div className="flex flex-col items-center justify-center">
                <svg viewBox="0 0 160 160" className="w-36 h-36">
                  <path d="M 80 80 L 80 10 A 70 70 0 0 1 150 80 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                  <path d="M 80 80 L 150 80 A 70 70 0 0 1 80 150 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                  <path d="M 80 80 L 80 150 A 70 70 0 0 1 10 80 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                  <path d="M 80 80 L 10 80 A 70 70 0 0 1 80 10 Z" fill="#cbd5e1" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="80" cy="80" r="8" fill="#ffffff" />
                </svg>
                <span className="text-xs font-black text-blue-900 dark:text-blue-300 mt-2">3 parts bleues sur 4 = 3/4</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-300 shadow-sm">
                  <div className="font-black text-blue-900 dark:text-blue-200">NUMÉRATEUR (HAUT = 3)</div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300">Nombre de parts sélectionnées ou mangées.</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-sm">
                  <div className="font-black text-amber-800 dark:text-amber-300">DÉNOMINATEUR (BAS = 4)</div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300">Nombre total de parts égales découpées.</p>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-slate-900 border border-blue-200 text-center text-xs text-blue-950 dark:text-blue-200 font-extrabold">
              ⭐ Règle d'or : Le dénominateur en BAS découpe le gâteau • Le numérateur en HAUT compte les parts !
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 animate-fadeIn">
      {/* 1. Subject Bar Selector (with Official Flag for English) */}
      <div className={`p-4 sm:p-5 rounded-3xl border shadow-xs ${
        isBattleRoyale ? 'bg-slate-900 border-purple-500/40 text-white' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-purple-400">
            1. Matière :
          </span>
          {hasHub ? (
            <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-50 dark:bg-purple-950 border border-indigo-200 dark:border-purple-500/40 text-indigo-900 dark:text-purple-200 flex items-center gap-1.5 shadow-xs">
              <Clock className="h-3.5 w-3.5 text-indigo-600 dark:text-purple-400" />
              <span>Durée totale : {totalSubjectMin} min {totalSubjectSec} s ({hub!.chapters.length} chapitres)</span>
            </span>
          ) : (
            <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-600 text-amber-900 dark:text-amber-200 flex items-center gap-1.5 shadow-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Leçon en attente</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SUBJECTS_CONFIG.filter((s) => s.id !== 'mix').map((sub) => {
            const isSelected = selectedSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubject(sub.id);
                  setCurrentChapterIdx(0);
                  setCurrentSceneIdx(0);
                  localStorage.setItem('mathieu_active_subject', sub.id);
                  onSubjectChange?.(sub.id);
                }}
                className={`p-2.5 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? isBattleRoyale
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md scale-[1.02]'
                      : 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-[1.02]'
                    : isBattleRoyale
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-purple-400'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-400'
                }`}
              >
                {sub.id === 'anglais' ? <UkFlagIcon className="h-4 w-4" /> : <span>{sub.icon}</span>}
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {hasHub && currentChapter && currentScene ? (
        <>
          {/* 2. Chapter Chaining Bar (Enchaîner les chapitres d'une leçon / séquence) */}
          <div className={`p-3.5 sm:p-4 rounded-3xl border-2 shadow-sm space-y-2.5 ${
            isBattleRoyale
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600 dark:text-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-amber-400">
                  Chapitres de la séquence :
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevChapter}
                  disabled={currentChapterIdx === 0}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer transition-all disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Précédent</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStepOrChapter}
                  disabled={!hasHub || currentChapterIdx >= hub!.chapters.length - 1}
                  className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-xs font-black text-white flex items-center gap-1 cursor-pointer transition-all disabled:cursor-not-allowed shadow-xs"
                >
                  <span>Chapitre suivant</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Chapter Grid (Full visibility without horizontal cutting) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {hub!.chapters.map((ch, cIdx) => {
            const isCur = currentChapterIdx === cIdx;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setCurrentChapterIdx(cIdx);
                  setCurrentSceneIdx(0);
                }}
                className={`p-3 rounded-2xl text-left font-bold text-xs sm:text-sm transition-all border-2 cursor-pointer flex items-start gap-2.5 relative ${
                  isCur
                    ? isBattleRoyale
                      ? 'bg-purple-900/60 border-purple-400 text-white shadow-lg ring-2 ring-purple-400/50 scale-[1.02]'
                      : 'bg-indigo-50 border-indigo-600 text-indigo-950 shadow-md ring-2 ring-indigo-400/40 scale-[1.02]'
                    : isBattleRoyale
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-purple-400 hover:text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-white'
                }`}
              >
                <span className={`h-6 w-6 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                  isCur
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {ch.chapterNumber}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-extrabold truncate text-xs text-indigo-700 dark:text-amber-400">
                      Chapitre {ch.chapterNumber}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/10 dark:bg-white/10 shrink-0">
                      ⏱️ {ch.durationLabel}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-black line-clamp-2 leading-tight">
                    {ch.title}
                  </div>
                  {isCur && (
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-400">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>▶️ En cours au Tableau</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. THE LUMINOUS CLASSROOM SMARTBOARD (TBI) */}
      <div className="rounded-3xl border-4 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shadow-xl overflow-hidden relative">
        {/* Top Control Bar with Play Button and Live Pointer */}
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          {/* Play / Pause & Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all scale-100 hover:scale-105 ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
              <span>{isPlaying ? 'Pause' : 'Écouter le cours'}</span>
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 cursor-pointer transition-all border border-slate-200 dark:border-slate-600"
              title="Reprendre au début"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => handleSeek(-10)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 cursor-pointer transition-all border border-slate-200 dark:border-slate-600"
              title="Reculer de 10s"
            >
              <Rewind className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => handleSeek(10)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 cursor-pointer transition-all border border-slate-200 dark:border-slate-600"
              title="Avancer de 10s"
            >
              <FastForward className="h-4 w-4" />
            </button>
          </div>

          {/* DYNAMIC LASER POINTER STATUS */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-purple-950 border border-amber-300 dark:border-purple-400/50 shadow-inner">
            <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-bounce shrink-0" />
            <span className="text-xs font-black text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-purple-300">Pointeur :</span>
              <span>{activePointer.label}</span>
            </span>
          </div>

          {/* Speed & Mute */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isAudioMuted
                  ? 'bg-rose-100 border-rose-300 text-rose-700 dark:bg-rose-900/60 dark:border-rose-500 dark:text-rose-300'
                  : 'bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300'
              }`}
              title={isAudioMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isAudioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl border border-slate-200 dark:border-slate-600 text-xs font-black">
              {[0.8, 1.0, 1.2].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                    playbackSpeed === spd
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
                  }`}
                >
                  {spd === 0.8 ? '0.8x (Dys)' : `${spd}x`}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
              ⏱️ {progressSec}s / {currentScene.durationSec}s
            </span>
          </div>
        </div>

        {/* FULL-WIDTH LUMINOUS WHITEBOARD CANVAS */}
        <div className="p-5 sm:p-7 min-h-[360px] sm:min-h-[420px] flex flex-col justify-center">
          {renderWhiteboardContent()}
        </div>

        {/* CLEAN SUBTITLE BAR (No in-text highlight clutter, pure readability) */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-800 border-t-2 border-slate-200 dark:border-slate-700 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-black uppercase text-indigo-700 dark:text-amber-400">
            <span className="flex items-center gap-1.5">
              <span>🎙️ Le cours expliqué :</span>
            </span>
          </div>

          {selectedSubject === 'anglais' ? (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-amber-950 dark:text-amber-200">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎧</span>
                  <span>
                    <strong>Écoute expression par expression :</strong> clique sur chaque phrase pour l'écouter à ton rythme !
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-black shrink-0 self-start sm:self-auto">
                  Rythme calme adapté DYS (0.8x)
                </span>
              </div>

              <div className="space-y-2">
                {currentScene.script
                  .split(/(?<=[.!?])\s+/)
                  .map((s) => s.trim())
                  .filter((s) => s.length > 0)
                  .map((sentence, sIdx, allSentences) => {
                    const isSpeakingThis = activeSpeakingAction === sentence || activeEnglishExprIdx === sIdx;

                    return (
                      <div
                        key={sIdx}
                        onClick={() => handleSpeakExpression(sentence, sIdx)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSpeakingThis
                            ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-500 shadow-md ring-2 ring-amber-400 scale-[1.01]'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-amber-400 hover:bg-amber-50/40'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeakExpression(sentence, sIdx);
                            }}
                            className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                              isSpeakingThis
                                ? 'bg-amber-500 text-slate-950 animate-bounce shadow-md'
                                : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-amber-500 hover:text-slate-950'
                            }`}
                            title="Écouter cette expression"
                          >
                            {isSpeakingThis ? '🔊' : '▶️'}
                          </button>
                          <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed font-sans dys-text">
                            {sentence}
                          </span>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          {isSpeakingThis ? (
                            <span className="text-xs font-black text-amber-700 dark:text-amber-300 animate-pulse">
                              Écoute en cours...
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                              Cliquer pour écouter
                            </span>
                          )}

                          {sIdx < allSentences.length - 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeakExpression(allSentences[sIdx + 1], sIdx + 1);
                              }}
                              className="px-2.5 py-1 rounded-xl bg-slate-200 hover:bg-amber-500 hover:text-slate-950 dark:bg-slate-800 text-[11px] font-black text-slate-700 dark:text-slate-300 transition-all"
                              title="Passer directement à l'expression suivante"
                            >
                              Suivante ➡️
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2.5">
              {currentScene.script
                .split(/(?<=[.!?])\s+/)
                .map((s) => s.trim())
                .filter((s) => s.length > 0)
                .map((sentence, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-start gap-2.5 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed font-sans dys-text"
                  >
                    <span className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-black shrink-0 mt-0.5 border border-indigo-200 dark:border-indigo-800 shadow-2xs">
                      •
                    </span>
                    <span className="flex-1">{sentence}</span>
                  </div>
                ))}
            </div>
          )}

          {/* Clean keywords list placed neatly underneath (clickable to see simple definition) */}
          <div className="pt-1 flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
              Mots-clés indispensables (clique pour la définition) :
            </span>
            {currentScene.keywords.map((kw, kwIdx) => (
              <button
                key={kwIdx}
                type="button"
                onClick={() => handleOpenKeywordDefinition(kw)}
                className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 dark:bg-amber-950 dark:hover:bg-amber-900 dark:text-amber-200 text-xs font-black border border-amber-300 dark:border-amber-600 shadow-xs cursor-pointer transition-all scale-100 hover:scale-105 flex items-center gap-1"
                title="Cliquer pour voir la définition simple"
              >
                <span>★ {kw}</span>
                <Info className="h-3 w-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="p-3 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="relative w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 transition-all duration-300"
              style={{
                width: `${Math.min(100, (progressSec / currentScene.durationSec) * 100)}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. NON-BLOCKING CHECKPOINT (Peut enchaîner directement sans être bloqué) */}
      <div className="p-5 sm:p-6 rounded-3xl border-2 bg-gradient-to-br from-indigo-50 via-emerald-50 to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 border-indigo-200 dark:border-indigo-500/40 text-slate-900 dark:text-white space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-200 dark:border-indigo-400/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-600 text-white font-black text-sm">
              🎯 CHECK-POINT
            </span>
            <div>
              <h3 className="font-black text-sm sm:text-base">
                La question flash du cours :
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Réponds si tu veux tester ta mémoire, ou passe directement à la suite !
              </p>
            </div>
          </div>

          {/* ALWAYS ACCESSIBLE NEXT BUTTON (Never blocks Mathieu !) */}
          <button
            type="button"
            onClick={handleNextStepOrChapter}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md self-start sm:self-auto shrink-0 transition-all scale-100 hover:scale-105"
          >
            <span>Passer à la suite ➜</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Checkpoint Question Options */}
        <div className="space-y-3">
          <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
            {currentScene.checkpoint.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {currentScene.checkpoint.options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isCorrect = oIdx === currentScene.checkpoint.correctIndex;
              let btnClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400';

              if (checkpointFeedback) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-black';
                } else if (isSelected) {
                  btnClass = 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200 font-black';
                }
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleAnswerCheckpoint(oIdx)}
                  className={`p-3 rounded-2xl border-2 text-xs sm:text-sm font-bold text-left transition-all cursor-pointer ${btnClass}`}
                >
                  <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {checkpointFeedback && (
            <div className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn ${
              checkpointFeedback.isCorrect
                ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-950 dark:text-emerald-200'
                : 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-200'
            }`}>
              <div className="text-xs sm:text-sm font-bold">
                {checkpointFeedback.text}
              </div>

              <button
                type="button"
                onClick={handleNextStepOrChapter}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md shrink-0"
              >
                <span>Chapitre suivant ➜</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    /* VUE "LEÇON EN ATTENTE" EN SOUS-BRILLANCE POUR LA GÉOGRAPHIE OU AUTRE MATIÈRE SANS HUB */
    <div className="space-y-6">
      <div className="relative p-6 sm:p-10 rounded-3xl border-2 border-amber-300 dark:border-amber-600/70 bg-gradient-to-br from-amber-50/90 via-white to-amber-100/50 dark:from-slate-900 dark:via-slate-800 dark:to-amber-950/40 shadow-[0_15px_40px_-10px_rgba(245,158,11,0.25)] text-center space-y-5 animate-fadeIn">
        {/* Luminous badge sous-brillance */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100/90 dark:bg-amber-950/90 border-2 border-amber-400 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-black shadow-md shadow-amber-500/20 tracking-wider uppercase">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span>✨ Leçon en attente ✨</span>
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <span>🌍</span>
            <span>Géographie 6ème</span>
          </h2>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 leading-relaxed font-sans dys-text">
            Le tableau interactif pour cette matière est actuellement <strong>en attente</strong>.
            Tu peux t'entraîner dès maintenant avec la carte interactive, les fiches Flash & Mémo ou le quiz d'entraînement !
          </p>
        </div>

        {/* Actions Géographie */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowEmbeddedMap(!showEmbeddedMap)}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all shadow-md ${
              showEmbeddedMap
                ? 'bg-blue-700 text-white ring-2 ring-blue-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>{showEmbeddedMap ? 'Masquer la Carte' : '🗺️ Ouvrir la Carte Interactive (Continents & Océans)'}</span>
          </button>

          {onGoToSurvival && (
            <button
              type="button"
              onClick={() => onGoToSurvival('geo')}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <Zap className="h-4 w-4" />
              <span>⚡ Flash Mémo Géographie</span>
            </button>
          )}

          {onGoToQuiz && (
            <button
              type="button"
              onClick={() => onGoToQuiz('geo')}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <Trophy className="h-4 w-4" />
              <span>🎯 Lancer le Quiz de Géo</span>
            </button>
          )}
        </div>

        {/* Leçons prêtes dans les autres matières */}
        <div className="pt-4 border-t border-amber-200 dark:border-slate-700 max-w-lg mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
            Leçons interactives disponibles au Tableau :
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {SUBJECTS_CONFIG.filter((s) => s.id !== 'mix' && s.id !== 'geo').map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSelectedSubject(s.id);
                  setCurrentChapterIdx(0);
                  setCurrentSceneIdx(0);
                  localStorage.setItem('mathieu_active_subject', s.id);
                  onSubjectChange?.(s.id);
                }}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer transition-all flex items-center gap-1.5"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Intégration de la carte interactive directement dans la page */}
      {showEmbeddedMap && (
        <div className="rounded-3xl border-2 border-blue-300 dark:border-blue-700 p-4 sm:p-6 bg-white dark:bg-slate-900 shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-2 font-black text-sm text-blue-700 dark:text-blue-400">
              <Globe className="h-5 w-5" />
              <span>Carte Interactive : Continents, Océans & Pays d'Europe</span>
            </div>
            <button
              type="button"
              onClick={() => setShowEmbeddedMap(false)}
              className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              Fermer la carte
            </button>
          </div>
          <InteractiveMapTab
            isBattleRoyale={isBattleRoyale}
            onWinBadge={() => onUnlockBadge?.('b_map')}
          />
        </div>
      )}
    </div>
  )}

      {/* Pop-up Définition Simple au Clic sur un Mot-Clé */}
      {activeKeywordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{activeKeywordModal.icon}</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {activeKeywordModal.term}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveKeywordModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/60 text-slate-800 dark:text-slate-100 font-semibold text-sm leading-relaxed dys-text">
              {activeKeywordModal.definition}
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => handleSpeakKeyword(activeKeywordModal.term + " : " + activeKeywordModal.definition)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Volume2 className="h-4 w-4" />
                <span>Écouter la définition</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveKeywordModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
