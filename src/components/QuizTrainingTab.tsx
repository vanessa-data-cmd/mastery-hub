import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  Gamepad2,
  Clock,
  Volume2,
  VolumeX,
  Mic,
  Send,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  XCircle,
  RotateCcw,
  Star,
  Shield,
  ArrowRight,
  BookOpen,
  Loader2,
  ThumbsUp,
  Smile,
  AlertCircle,
  PenTool,
  Check,
  FileCheck,
  Calculator,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubjectId, QuizQuestion, LessonPack, GlobalStats, ChapterItem } from '../types';
import { INITIAL_LESSON_PACKS, SUBJECTS_CONFIG, SUBJECT_CHAPTERS } from '../data/lessonsData';
import { generateEnglishDateQuestions } from '../data/englishDateGenerator';
import { UkFlagIcon, FrenchFlagIcon } from './FlagIcons';
import { MultiplicationTab } from './MultiplicationTab';
import { InteractiveMapTab } from './InteractiveMapTab';
import { HistoryTimelineTab } from './HistoryTimelineTab';

export type PhrasingTier = 'mot_isole' | 'phrase_simple' | 'phrase_argumentee';

export interface PhrasingEvaluation {
  tier: PhrasingTier;
  multiplier: number; // 0.5 for mot_isole, 0.75 for phrase_simple, 1.0 for phrase_argumentee
  badgeText: string;
  badgeClass: string;
  feedbackText: string;
  upgradeTip: string;
  wordsCount: number;
}

export function evaluatePhrasing(text: string, explanation?: string, isEnglish?: boolean): PhrasingEvaluation {
  const clean = text.trim();
  const words = clean.split(/\s+/).filter(Boolean);
  const wordsCount = words.length;

  if (wordsCount === 0) {
    return {
      tier: 'mot_isole',
      multiplier: 0,
      badgeText: 'Non répondu',
      badgeClass: 'text-slate-400 bg-slate-100 border-slate-200',
      feedbackText: 'Réponse vide',
      upgradeTip: 'Formule au moins un mot ou une phrase.',
      wordsCount: 0
    };
  }

  // English-specific evaluation (no "justifie avec car/parce que", focus on date syntax & capitals)
  if (isEnglish) {
    if (wordsCount >= 4) {
      return {
        tier: 'phrase_argumentee',
        multiplier: 1.0,
        badgeText: '🌟 Rédaction en anglais complète (+100% des points)',
        badgeClass: 'bg-emerald-100 text-emerald-950 border-emerald-400',
        feedbackText: "Excellente phrase en anglais ! Pense bien aux majuscules aux jours et aux mois.",
        upgradeTip: "Vérifie l'ordre des mots et la ponctuation (virgule en US, 'the' et 'of' en UK).",
        wordsCount
      };
    }
    if (wordsCount >= 2) {
      return {
        tier: 'phrase_simple',
        multiplier: 0.85,
        badgeText: '🟢 Réponse rédigée (+85% des points)',
        badgeClass: 'bg-blue-100 text-blue-950 border-blue-400',
        feedbackText: "Bonne phrase rédigée ! Vérifie bien les majuscules et les suffixes ordinaux (1st, 2nd, 3rd, 4th...).",
        upgradeTip: "Pour avoir la note maximale, écris la date complète exigée par le professeur !",
        wordsCount
      };
    }
    return {
      tier: 'mot_isole',
      multiplier: 0.6,
      badgeText: '🟡 Mot isolé (+60% des points)',
      badgeClass: 'bg-amber-100 text-amber-950 border-amber-400',
      feedbackText: "Formule la date complète en anglais avec le jour et le mois !",
      upgradeTip: `Exemple attendu : "${explanation || 'Écris la date complète.'}"`,
      wordsCount
    };
  }

  // Common French logical connectors & explanatory words for 6th grade
  const connectorsRegex = /\b(car|parce\s+que|afin\s+de|pour\s+que|pour|donc|puisque|en\s+effet|c'est\s+pourquoi|comme|qui\s+permet|grâce\s+à|alors\s+que|sert\s+à)\b/i;
  const hasConnector = connectorsRegex.test(clean);

  // Common personal example markers
  const exampleRegex = /\b(exemple|par\s+exemple|comme|moi|mon\s+exemple|chez\s+moi|dans\s+ma\s+vie|j'ai|nous\s+avons|ma\s+commune|ma\s+ville|à\s+la\s+maison|dans\s+mon\s+jardin|dans\s+ma\s+cuisine)\b/i;
  const hasExample = exampleRegex.test(clean);

  // Common verbal markers in 6th grade explanations
  const verbMarkersRegex = /\b(est|sont|était|étaient|a|ont|vit|vivaient|se\s+déplace|se\s+déplacent|permet|permettent|sert|servent|vient|viennent|fabrique|fabriquent|s'appelle|s'appellent|fait|font|utilise|utilisent|doit|doivent|peint|peignaient|partage|partagent|calcul|calcule)\b/i;
  const hasVerb = verbMarkersRegex.test(clean);

  // Top Tier: Both Personal Example AND Justification present!
  if (hasExample && hasConnector && wordsCount >= 6) {
    return {
      tier: 'phrase_argumentee',
      multiplier: 1.0,
      badgeText: '🌟 Exemple perso + Justification validés (+100% des points)',
      badgeClass: 'bg-emerald-100 text-emerald-950 border-emerald-400 ring-2 ring-emerald-300',
      feedbackText: "Excellente rédaction ! Tu as donné un exemple personnel ET justifié ta réponse avec un connecteur : exactement ce qu'il faut pour un 20/20 !",
      upgradeTip: 'Parfait ! Ton exemple personnel et ta justification sont complets et solides.',
      wordsCount
    };
  }

  // Tier 3: 8+ words OR has a connector + at least 5 words (Phrase argumentée 6ème : note 18-20/20)
  if (wordsCount >= 8 || (hasConnector && wordsCount >= 5)) {
    return {
      tier: 'phrase_argumentee',
      multiplier: 1.0,
      badgeText: '🌟 Rédaction 6ème Pro (+100% des points)',
      badgeClass: 'bg-emerald-100 text-emerald-950 border-emerald-400',
      feedbackText: "Excellente rédaction ! Phrase complète et argumentée : exactement ce qu'il faut pour un 18 ou 20/20.",
      upgradeTip: hasExample
        ? 'Super exemple perso ! Pense à justifier avec "car" ou "parce que".'
        : 'Pense aussi à dire ton exemple perso pour enrichir ta réponse !',
      wordsCount
    };
  }

  // Tier 2: 4 to 7 words with a verb (Phrase simple rédigée : note 15-16/20)
  if (wordsCount >= 4 || hasVerb) {
    return {
      tier: 'phrase_simple',
      multiplier: 0.75, // 75% of points (ex: 3/4 pts -> leads to 15-16/20)
      badgeText: '🟢 Phrase simple rédigée (+75% des points)',
      badgeClass: 'bg-blue-100 text-blue-950 border-blue-400',
      feedbackText: 'Bonne phrase rédigée ! Pour passer de 15/20 à 18-20/20, ajoute un connecteur ("car", "parce que") pour justifier.',
      upgradeTip: 'Ajoute un "car" ou un "parce que" avec une justification pour décrocher le 18/20 !',
      wordsCount
    };
  }

  // Tier 1: 1 to 3 words without verb (Mot isolé / réponse brute : note 11-13/20 maximum)
  return {
    tier: 'mot_isole',
    multiplier: 0.5, // 50% of points (ex: 2/4 pts -> leads to 12-13/20)
    badgeText: '🟡 Idée comprise mais mot isolé (+50% des points)',
    badgeClass: 'bg-amber-100 text-amber-950 border-amber-400',
    feedbackText: "L'idée est juste 👍, mais en 6ème un mot isolé ne donne que la moyenne (12/20). Fais une phrase pour passer à 16 ou 18/20 !",
    upgradeTip: `Exemple de phrase attendue : "${explanation || 'Rédige une phrase avec un sujet et un verbe.'}"`,
    wordsCount
  };
}

export type QuizModeType = 5 | 10 | 20 | 'controle';

interface QuizTrainingTabProps {
  isBattleRoyale: boolean;
  isParentTestMode: boolean;
  stats: GlobalStats;
  onSaveStats: (score20: number, timeSec: number, subId: SubjectId, relectureBonus: boolean) => void;
  onUnlockBadge: (badgeId: string) => void;
  initialSubject?: SubjectId;
  initialChapterId?: string;
  autoOpenPhotoScanner?: boolean;
  onSubjectChange?: (subId: SubjectId) => void;
}

export const QuizTrainingTab: React.FC<QuizTrainingTabProps> = ({
  isBattleRoyale,
  isParentTestMode,
  stats,
  onSaveStats,
  onUnlockBadge,
  initialSubject,
  initialChapterId,
  autoOpenPhotoScanner,
  onSubjectChange
}) => {
  // Navigation & Subject selection
  const [currentSub, setCurrentSub] = useState<SubjectId>(() => {
    if (initialSubject) return initialSubject;
    const saved = typeof window !== 'undefined' ? localStorage.getItem('mathieu_active_subject') : null;
    return (saved as SubjectId) || 'histoire';
  });

  useEffect(() => {
    if (initialSubject && initialSubject !== currentSub) {
      setCurrentSub(initialSubject);
    }
  }, [initialSubject]);
  const [activeInteractiveTool, setActiveInteractiveTool] = useState<'tables' | 'map' | 'timeline' | null>(null);
  const [questionCount, setQuestionCount] = useState<QuizModeType>(5);
  const [isChronoEnabled, setIsChronoEnabled] = useState(false);
  const [chronoSeconds, setChronoSeconds] = useState(0);
  const [chronoTimer, setChronoTimer] = useState<any>(null);

  // Chapter & Scope selection (Toute la matière / La leçon entière / Un sous-chapitre ciblé)
  const [selectedChapters, setSelectedChapters] = useState<string[]>(initialChapterId ? [initialChapterId] : []);

  // Photo Scan & Confirmation state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(Boolean(autoOpenPhotoScanner));
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState(false);
  const [scanConfirmationData, setScanConfirmationData] = useState<{
    title: string;
    subject: SubjectId;
    aSavoir: string[];
    pack: LessonPack;
  } | null>(null);

  // Active Lesson Pack
  const [currentPack, setCurrentPack] = useState<LessonPack>(INITIAL_LESSON_PACKS.histoire);

  // Quiz questions & state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selectedBricks, setSelectedBricks] = useState<Record<number, string[]>>({});
  const [radarChoices, setRadarChoices] = useState<Record<number, number>>({});
  const [openRadarHints, setOpenRadarHints] = useState<Record<number, boolean>>({});
  const [openHints, setOpenHints] = useState<Record<number, boolean>>({});
  const [openSpellingTips, setOpenSpellingTips] = useState<Record<number, boolean>>({});
  const [flagTranslated, setFlagTranslated] = useState<Record<number, boolean>>({});
  const [activeSpeechIndex, setActiveSpeechIndex] = useState<number | null>(null);
  const [listeningState, setListeningState] = useState(false);
  const [paperChecks, setPaperChecks] = useState<Record<number, boolean>>({});

  // Validation results
  const [isValidated, setIsValidated] = useState(false);
  const [showIncompleteAlert, setShowIncompleteAlert] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    note20: number;
    ptsObtenus: number;
    ptsMax: number;
    acquis: { titre: string; userAns: string; expected: string; explanation: string; phrasingTier?: PhrasingTier }[];
    revoir: {
      titre: string;
      userAns: string;
      expected: string;
      explanation: string;
      pointsGot: number;
      maxPts: number;
      phrasingTier?: PhrasingTier;
      upgradeTip?: string;
    }[];
    failedQuestions: QuizQuestion[];
    relectureBonusAwarded: boolean;
    phrasingStats: {
      motIsoleCount: number;
      phraseSimpleCount: number;
      phraseArgumenteeCount: number;
    };
  } | null>(null);

  // Audio Speech synthesis
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize chapters for the current subject
  useEffect(() => {
    const chapters = SUBJECT_CHAPTERS[currentSub] || [];
    const allIds = chapters.map((c) => c.id);
    setSelectedChapters(allIds);
    const pack = INITIAL_LESSON_PACKS[currentSub] || INITIAL_LESSON_PACKS.histoire;
    setCurrentPack(pack);
    buildQuizQuestions(currentSub, questionCount, undefined, allIds);
  }, [currentSub]);

  // When question count changes, rebuild
  useEffect(() => {
    buildQuizQuestions(currentSub, questionCount, undefined, selectedChapters);
  }, [questionCount]);

  // Helpers for multi-sentence Cloze (texte à trous) state
  const getClozeMap = (qIdx: number): Record<string, string> => {
    try {
      return JSON.parse(userAnswers[qIdx] || '{}');
    } catch {
      return {};
    }
  };

  const setClozeBlank = (qIdx: number, blankNum: number, value: string) => {
    const current = getClozeMap(qIdx);
    const updated = { ...current, [String(blankNum)]: value };
    setUserAnswers((prev) => ({ ...prev, [qIdx]: JSON.stringify(updated) }));
  };

  const handleToggleBrick = (qIdx: number, brick: string) => {
    setSelectedBricks((prev) => {
      const current = prev[qIdx] || [];
      const alreadyIndex = current.indexOf(brick);
      let updated: string[];
      if (alreadyIndex >= 0) {
        updated = current.filter((_, i) => i !== alreadyIndex);
      } else {
        updated = [...current, brick];
      }
      setUserAnswers((uPrev) => ({ ...uPrev, [qIdx]: updated.join(' ') }));
      return { ...prev, [qIdx]: updated };
    });
  };

  const handleClearBricks = (qIdx: number) => {
    setSelectedBricks((prev) => ({ ...prev, [qIdx]: [] }));
    setUserAnswers((uPrev) => ({ ...uPrev, [qIdx]: '' }));
  };

  const handleSelectRadarChoice = (qIdx: number, optIdx: number) => {
    setRadarChoices((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  // Build Quiz Questions based on subject, selected chapters, and count with dynamic random sampling
  const buildQuizQuestions = (
    sub: SubjectId,
    count: QuizModeType,
    customFailed?: QuizQuestion[],
    activeChapters?: string[]
  ) => {
    stopChrono();
    setIsValidated(false);
    setScoreResult(null);
    setUserAnswers({});
    setSelectedBricks({});
    setRadarChoices({});
    setOpenRadarHints({});
    setOpenHints({});
    setOpenSpellingTips({});
    setFlagTranslated({});
    setShowIncompleteAlert(false);

    if (customFailed && customFailed.length > 0) {
      setQuestions(customFailed);
      startChrono();
      return;
    }

    let rawPool: QuizQuestion[] = [];
    if (sub === 'mix') {
      const subjects: SubjectId[] = ['svt', 'histoire', 'geo', 'maths', 'pc', 'anglais', 'francais'];
      subjects.forEach((s) => {
        const pack = INITIAL_LESSON_PACKS[s];
        if (pack && pack.quizQuestions) {
          rawPool.push(...pack.quizQuestions);
        }
      });
    } else {
      const pack = currentPack.subject === sub ? currentPack : INITIAL_LESSON_PACKS[sub] || INITIAL_LESSON_PACKS.histoire;
      rawPool = [...(pack.quizQuestions || [])];
    }

    // Strict filter by selected chapters when a specific subset of chapters is chosen (BEFORE any mode selection)
    const chaptersToFilter = activeChapters !== undefined ? activeChapters : selectedChapters;
    const allChaptersForSub = SUBJECT_CHAPTERS[sub] || [];
    const isTargetedChapterSelection = sub !== 'mix' && chaptersToFilter.length > 0 && chaptersToFilter.length < allChaptersForSub.length;

    // Générateur dynamique JS pour le Chapitre 3 d'Anglais (Dates UK / US) :
    // Tirage aléatoire des jours, ordinaux (1-31) et mois à chaque session (zéro liste figée)
    // Respect strict de l'échafaudage DYS :
    // - Mode 5 questions : 2 briques, 2 saisie clavier, 1 erreur à corriger
    // - Mode 10 questions : 4 briques, 3 saisie clavier, 2 erreurs à corriger, 1 audio
    // - Mode 20 questions / Contrôle : 8 briques, 6 saisie clavier, 4 erreurs à corriger, 2 audio
    if (sub === 'anglais' && chaptersToFilter.includes('ang_ch3')) {
      if (isTargetedChapterSelection && chaptersToFilter.length === 1 && chaptersToFilter[0] === 'ang_ch3') {
        const dynamicQuestions = generateEnglishDateQuestions(count);
        setQuestions(dynamicQuestions);
        startChrono();
        return;
      } else {
        // En sélection globale ou multi-chapitres, rafraîchir les questions du chap 3 avec de nouveaux tirages aléatoires
        const nonCh3 = rawPool.filter((q) => q.chapterId !== 'ang_ch3');
        const freshCh3 = generateEnglishDateQuestions(20);
        rawPool = [...nonCh3, ...freshCh3];
      }
    }

    if (isTargetedChapterSelection) {
      const strictlyFiltered = rawPool.filter((q) => q.chapterId && chaptersToFilter.includes(q.chapterId));
      if (strictlyFiltered.length > 0) {
        rawPool = strictlyFiltered;
      }
    }

    // Special mode: "Contrôle Réflexion (Comme en classe)" -> 5 questions variées + 1 question défi autonomie reprise sans briques = 6 questions
    if (count === 'controle') {
      if (sub === 'mix') {
        const subjects: SubjectId[] = ['svt', 'pc', 'histoire', 'geo', 'francais', 'maths'];
        const mixedExam: QuizQuestion[] = [];
        subjects.forEach((s) => {
          const pack = INITIAL_LESSON_PACKS[s];
          if (pack && pack.quizQuestions) {
            const found = pack.quizQuestions.find((q) => (q.isOfficialExam || q.type === 'briques' || q.consigneRadar) && !q.isAutonomyChallenge);
            if (found && !mixedExam.some((m) => m.id === found.id)) mixedExam.push(found);
          }
        });
        if (mixedExam.length > 0) {
          const standard5 = mixedExam.slice(0, 5);
          const reprisedSource = standard5[0];
          const autonomy6: QuizQuestion = {
            ...reprisedSource,
            id: `${reprisedSource.id}_reprise_sans_indice`,
            titre: `🔥 Défi 6 Sans Indice (Reprise de la Q1) : ${reprisedSource.titre.replace(/^Contrôle\s*•?\s*/i, '').replace(/\(\d+\s*points?\)/i, '').trim()} (4 points)`,
            type: 'libre',
            consigneRadar: undefined,
            hint: '',
            isOfficialExam: true,
            isAutonomyChallenge: true,
            points: 4,
            explanation: reprisedSource.explanation,
            criteriaChecklist: reprisedSource.criteriaChecklist,
            keywords: reprisedSource.keywords
          };
          setQuestions([...standard5, autonomy6]);
          startChrono();
          return;
        }
      }

      let examPool = rawPool.filter((q) => (q.isOfficialExam || q.type === 'briques' || q.consigneRadar) && !q.isAutonomyChallenge);
      if (examPool.length === 0) {
        examPool = (INITIAL_LESSON_PACKS[sub]?.quizQuestions || []).filter(
          (q) => (q.isOfficialExam || q.type === 'briques' || q.consigneRadar) && !q.isAutonomyChallenge
        );
      }

      const chosenStandard = examPool.slice(0, 5);
      if (chosenStandard.length > 0) {
        const reprisedSource = chosenStandard[0];
        const autonomy6: QuizQuestion = {
          ...reprisedSource,
          id: `${reprisedSource.id}_reprise_sans_indice`,
          titre: `🔥 Défi 6 Sans Indice (Reprise de la Q1) : ${reprisedSource.titre.replace(/^Contrôle\s*•?\s*/i, '').replace(/\(\d+\s*points?\)/i, '').trim()} (4 points)`,
          type: 'libre',
          consigneRadar: undefined,
          hint: '',
          isOfficialExam: true,
          isAutonomyChallenge: true,
          points: 4,
          explanation: reprisedSource.explanation,
          criteriaChecklist: reprisedSource.criteriaChecklist,
          keywords: reprisedSource.keywords
        };
        setQuestions([...chosenStandard, autonomy6]);
        startChrono();
        return;
      }

      // Fallback: take level 3 questions that require reasoning
      const lvl3 = rawPool.filter((q) => q.level === 3 || q.type === 'libre');
      setQuestions((lvl3.length > 0 ? lvl3 : rawPool).slice(0, 6));
      startChrono();
      return;
    }

    const numericCount = typeof count === 'number' ? count : 5;

    // In Grand DS (20 questions), exclude simple devinettes to keep it rigorous and prevent answer leakage
    if (numericCount === 20) {
      rawPool = rawPool.filter((q) => !q.titre.toLowerCase().includes('devinette') && !q.id.includes('inv_'));
    }

    // 1. Separate Cloze Final Boss questions from regular questions
    const clozeQuestions = rawPool.filter((q) => q.type === 'texte_a_trous');
    const regularQuestions = rawPool.filter((q) => q.type !== 'texte_a_trous');

    // How many clozes to include at the end (Histoire has 2: vocabulaire + dates chronologiques)
    const clozeCountToUse = numericCount === 20
      ? Math.min(clozeQuestions.length, 2)
      : Math.min(clozeQuestions.length, 1);
    const clozesToAppend = clozeQuestions.slice(0, clozeCountToUse);
    const regularTargetCount = Math.max(1, numericCount - clozesToAppend.length);

    // Guaranteed minimum genuine Level 3 deduction questions (strictly from this lesson)
    const minLvl3Count = numericCount === 20 ? 3 : numericCount === 10 ? 2 : 1;
    const lvl3Pool = regularQuestions.filter((q) => q.level === 3 || q.isOfficialExam || q.type === 'briques');
    const otherPool = regularQuestions.filter((q) => q.level < 3 && !q.isOfficialExam && q.type !== 'briques');

    const shuffledLvl3 = [...lvl3Pool].sort(() => Math.random() - 0.5);
    const shuffledOther = [...otherPool].sort(() => Math.random() - 0.5);

    const chosenLvl3 = shuffledLvl3.slice(0, minLvl3Count);
    const nonCollidingRegular: QuizQuestion[] = [...chosenLvl3];

    // 2. Anti-collision filter: prevent questions in the same quiz from leaking answers to each other
    for (const cand of shuffledOther) {
      if (nonCollidingRegular.length >= regularTargetCount) break;

      const candAnswer = (cand.correctAnswer || '').toLowerCase().trim();
      const candKeywords = (cand.keywords || []).map((k) => k.toLowerCase().trim());
      const candTerms = [candAnswer, ...candKeywords].filter((t) => t.length > 3);
      const isCandDevinette = cand.titre.toLowerCase().includes('devinette') || cand.id.includes('inv_');

      const hasCollision = nonCollidingRegular.some((sel) => {
        const selTitle = sel.titre.toLowerCase();
        const selAnswer = (sel.correctAnswer || '').toLowerCase().trim();
        const selKeywords = (sel.keywords || []).map((k) => k.toLowerCase().trim());
        const selTerms = [selAnswer, ...selKeywords].filter((t) => t.length > 3);
        const isSelDevinette = sel.titre.toLowerCase().includes('devinette') || sel.id.includes('inv_');

        // Prevent devinette + definition collision of the same word
        if (isCandDevinette || isSelDevinette) {
          const candConcept = candTerms.join(' ');
          const selConcept = selTerms.join(' ');
          if (candConcept && selConcept && (candConcept.includes(selAnswer) || selConcept.includes(candAnswer))) {
            return true;
          }
        }

        const candLeakedInSelTitle = candTerms.some((t) => selTitle.includes(t));
        const selLeakedInCandTitle = selTerms.some((t) => cand.titre.toLowerCase().includes(t));
        const sameAnswerConcept =
          candAnswer &&
          selAnswer &&
          (candAnswer === selAnswer || candAnswer.includes(selAnswer) || selAnswer.includes(candAnswer));

        return candLeakedInSelTitle || selLeakedInCandTitle || sameAnswerConcept;
      });

      if (!hasCollision) {
        nonCollidingRegular.push(cand);
      }
    }

    // Fill remaining if needed
    if (nonCollidingRegular.length < regularTargetCount) {
      for (const cand of shuffledOther) {
        if (!nonCollidingRegular.some((s) => s.id === cand.id) && nonCollidingRegular.length < regularTargetCount) {
          nonCollidingRegular.push(cand);
        }
      }
    }

    // Sort regular questions by pedagogical progression (Level 1: Vocab/Def/Ortho -> Level 2: App/QCM/VF -> Level 3: Déduction & Réflexion)
    nonCollidingRegular.sort((a, b) => a.level - b.level);

    // 5. Append Grand Défi Synthèse (Texte à Trous 1 & 2) as the very last questions of the test
    const finalPool = [...nonCollidingRegular, ...clozesToAppend];

    setQuestions(finalPool);
    startChrono();
  };

  const startChrono = () => {
    stopChrono();
    if (!isChronoEnabled) return;
    setChronoSeconds(0);
    const int = setInterval(() => setChronoSeconds((s) => s + 1), 1000);
    setChronoTimer(int);
  };

  const stopChrono = () => {
    if (chronoTimer) {
      clearInterval(chronoTimer);
      setChronoTimer(null);
    }
  };

  // Text-To-Speech
  const handleSpeak = (text: string, lang = 'fr-FR') => {
    if (!('speechSynthesis' in window)) return;
    if (speakingText === text) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = lang.startsWith('en') ? 0.88 : 0.92;
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);
    setSpeakingText(text);
    window.speechSynthesis.speak(utterance);
  };

  // Speech Recognition (Dictée Vocale 🎤)
  const toggleSpeech = (idx: number) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("La dictée vocale n'est pas supportée par ce navigateur.");
      return;
    }

    if (listeningState && activeSpeechIndex === idx) {
      setListeningState(false);
      setActiveSpeechIndex(null);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = currentSub === 'anglais' ? 'en-US' : 'fr-FR';
    recognition.interimResults = false;

    setActiveSpeechIndex(idx);
    setListeningState(true);

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setUserAnswers((prev) => ({
        ...prev,
        [idx]: prev[idx] ? `${prev[idx]} ${transcript}` : transcript
      }));
    };

    recognition.onend = () => {
      setListeningState(false);
      setActiveSpeechIndex(null);
    };

    recognition.onerror = () => {
      setListeningState(false);
      setActiveSpeechIndex(null);
    };

    recognition.start();
  };

  // Handle Photo Scan of notebook / test
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setScannedImage(base64);
      setIsAnalyzingPhoto(true);

      try {
        const res = await fetch('/api/transform-lesson', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lessonTitle: 'Cours ou contrôle scanné',
            subject: currentSub === 'mix' ? 'svt' : currentSub,
            imageBase64: base64,
            isFortniteMode: isBattleRoyale
          })
        });

        const json = await res.json();
        if (json.success && json.data) {
          // Prepare confirmation step
          setScanConfirmationData({
            title: json.data.title || 'Leçon de ' + currentSub,
            subject: currentSub,
            aSavoir: json.data.survivalSheet?.warningYellow || [
              'Notion clé du cours',
              'Vocabulaire technique attendu par le prof',
              'Exemple d\'application pratique'
            ],
            pack: json.data
          });
          setIsPhotoModalOpen(false);
        }
      } catch (err) {
        console.error('Error analyzing photo with Gemini:', err);
      } finally {
        setIsAnalyzingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const confirmScannedLesson = () => {
    if (!scanConfirmationData) return;
    setCurrentPack(scanConfirmationData.pack);
    setScanConfirmationData(null);
    buildQuizQuestions(scanConfirmationData.subject, questionCount);
    confetti({ particleCount: 90, spread: 70 });
  };

  // Toggle chapter checkboxes
  const toggleChapter = (chapId: string) => {
    let next: string[];
    if (selectedChapters.includes(chapId)) {
      if (selectedChapters.length > 1) {
        next = selectedChapters.filter((id) => id !== chapId);
      } else {
        next = selectedChapters;
      }
    } else {
      next = [...selectedChapters, chapId];
    }
    setSelectedChapters(next);
    buildQuizQuestions(currentSub, questionCount, undefined, next);
  };

  const chaptersForSub = SUBJECT_CHAPTERS[currentSub] || [];
  const areAllChaptersSelected = chaptersForSub.length > 0 && selectedChapters.length === chaptersForSub.length;

  const toggleAllChapters = () => {
    let next: string[];
    if (areAllChaptersSelected) {
      // Keep the first one selected so the training always has material
      next = chaptersForSub.length > 0 ? [chaptersForSub[0].id] : [];
    } else {
      next = chaptersForSub.map((c) => c.id);
    }
    setSelectedChapters(next);
    buildQuizQuestions(currentSub, questionCount, undefined, next);
  };

  const selectAllChapters = () => {
    const next = chaptersForSub.map((c) => c.id);
    setSelectedChapters(next);
    buildQuizQuestions(currentSub, questionCount, undefined, next);
  };

  // Check before validation if questions are unanswered
  const handleValidateClick = () => {
    const unansweredCount = questions.filter((_, idx) => !userAnswers[idx] || userAnswers[idx].trim() === '').length;
    if (unansweredCount > 0 && !showIncompleteAlert) {
      setShowIncompleteAlert(true);
      return;
    }
    executeGlobalValidation();
  };

  // Execute Global Validation with Dys Grading Rule (half points for concept, full points for concept+keyword)
  const executeGlobalValidation = () => {
    setShowIncompleteAlert(false);
    stopChrono();

    let totalPtsObtenus = 0;
    let totalPtsMax = 0;
    const acquisList: { titre: string; userAns: string; expected: string; explanation: string; phrasingTier?: PhrasingTier }[] = [];
    const revoirList: {
      titre: string;
      userAns: string;
      expected: string;
      explanation: string;
      pointsGot: number;
      maxPts: number;
      phrasingTier?: PhrasingTier;
      upgradeTip?: string;
    }[] = [];
    const failed: QuizQuestion[] = [];
    let hasNiceRelectureEffort = false;
    const phrasingStats = {
      motIsoleCount: 0,
      phraseSimpleCount: 0,
      phraseArgumenteeCount: 0
    };

    questions.forEach((q, idx) => {
      const answer = (userAnswers[idx] || '').trim();
      const maxPts = q.points || 2;
      totalPtsMax += maxPts;

      let isSuccess = false;
      let pointsEarned = 0;
      let questionPhrasingTier: PhrasingTier | undefined = undefined;
      let questionUpgradeTip: string | undefined = undefined;

      if (q.type === 'qcm') {
        const selectedIdx = answer !== '' ? parseInt(answer, 10) : -1;
        if (selectedIdx === q.correctIndex) {
          isSuccess = true;
          pointsEarned = maxPts;
        }
      } else if (q.type === 'vf') {
        if (answer.toLowerCase() === (q.correctAnswer || '').toLowerCase()) {
          isSuccess = true;
          pointsEarned = maxPts;
        }
      } else if (q.type === 'trou') {
        const target = (q.correctAnswer || '').toLowerCase();
        if (answer.toLowerCase().includes(target) || (target.length > 3 && answer.toLowerCase().includes(target.slice(0, 3)))) {
          isSuccess = true;
          pointsEarned = maxPts;
        } else if (answer.length >= 2) {
          // Concept partially understood: half points
          pointsEarned = Math.max(1, Math.round(maxPts / 2));
        }
      } else if (q.type === 'texte_a_trous') {
        const expected = q.clozeAnswers || [];
        let parsed: Record<string, string> = {};
        try {
          parsed = JSON.parse(answer || '{}');
        } catch {
          parsed = {};
        }
        let correctCount = 0;
        expected.forEach((exp, eIdx) => {
          const userVal = (parsed[String(eIdx + 1)] || '').trim().toLowerCase();
          const target = exp.trim().toLowerCase();
          if (
            userVal === target ||
            (target.length > 3 && userVal.includes(target.slice(0, 3))) ||
            (userVal.length > 3 && target.includes(userVal.slice(0, 3)))
          ) {
            correctCount++;
          }
        });
        if (expected.length > 0) {
          const ratio = correctCount / expected.length;
          pointsEarned = Math.round(ratio * maxPts);
          if (ratio >= 0.6) {
            isSuccess = true;
          }
        }
      } else if (q.type === 'briques') {
        const cleanAnswer = answer.toLowerCase();
        const criteria = q.criteriaChecklist || [];
        let criteriaMet = 0;
        if (criteria.length > 0) {
          criteria.forEach((crit) => {
            const hasMatch = crit.keywords.some((kw) => cleanAnswer.includes(kw.toLowerCase()));
            if (hasMatch) criteriaMet++;
          });
          const ratio = criteriaMet / criteria.length;
          pointsEarned = Math.round(ratio * maxPts);
          if (ratio >= 0.7) {
            isSuccess = true;
            questionPhrasingTier = 'phrase_argumentee';
            phrasingStats.phraseArgumenteeCount++;
          } else if (ratio >= 0.35) {
            questionPhrasingTier = 'phrase_simple';
            phrasingStats.phraseSimpleCount++;
            if (pointsEarned === maxPts) isSuccess = true;
          } else {
            questionPhrasingTier = 'mot_isole';
            phrasingStats.motIsoleCount++;
          }
        } else if (q.correctBricks && q.correctBricks.length > 0) {
          const matchCount = q.correctBricks.filter((b) => cleanAnswer.includes(b.toLowerCase().slice(0, 10))).length;
          const ratio = matchCount / q.correctBricks.length;
          pointsEarned = Math.round(ratio * maxPts);
          isSuccess = ratio >= 0.65;
          questionPhrasingTier = isSuccess ? 'phrase_argumentee' : 'phrase_simple';
          if (isSuccess) phrasingStats.phraseArgumenteeCount++;
          else phrasingStats.phraseSimpleCount++;
        } else {
          const phrasingEval = evaluatePhrasing(answer, q.explanation, q.subject === 'anglais');
          questionPhrasingTier = phrasingEval.tier;
          questionUpgradeTip = phrasingEval.upgradeTip;
          pointsEarned = Math.round(phrasingEval.multiplier * maxPts);
          isSuccess = phrasingEval.tier === 'phrase_argumentee';
          if (phrasingEval.tier === 'phrase_argumentee') phrasingStats.phraseArgumenteeCount++;
          else if (phrasingEval.tier === 'phrase_simple') phrasingStats.phraseSimpleCount++;
          else phrasingStats.motIsoleCount++;
        }
      } else {
        // Free answer or personal example: Barème Rédaction 6ème (Mots bruts vs Phrases simples vs Phrases argumentées)
        if (answer.length >= 2) {
          // Special matching for English date questions
          if (q.subject === 'anglais' && q.correctAnswer) {
            const cleanExp = q.correctAnswer.toLowerCase().trim().replace(/\s+,/g, ',');
            const cleanAns = answer.toLowerCase().trim().replace(/\s+,/g, ',');
            const kw = q.keywords || [];
            const matchedKw = kw.filter((k) => cleanAns.includes(k.toLowerCase())).length;
            const kwRatio = kw.length > 0 ? matchedKw / kw.length : (cleanAns === cleanExp ? 1 : 0);

            if (cleanAns === cleanExp || kwRatio >= 0.8) {
              pointsEarned = maxPts;
              isSuccess = true;
              questionPhrasingTier = 'phrase_argumentee';
              phrasingStats.phraseArgumenteeCount++;
            } else if (kwRatio >= 0.5) {
              pointsEarned = Math.max(1, Math.round(maxPts * 0.7));
              isSuccess = false;
              questionPhrasingTier = 'phrase_simple';
              phrasingStats.phraseSimpleCount++;
            } else {
              pointsEarned = 0;
              isSuccess = false;
              questionPhrasingTier = 'mot_isole';
              phrasingStats.motIsoleCount++;
            }
          } else {
            const kw = q.keywords || [];
            const hasKeyword = kw.length > 0 && kw.some((k) => answer.toLowerCase().includes(k.toLowerCase()));
            const isIdeaPresent = hasKeyword || answer.length >= 8;

            // Does this question require formulation / explanation?
            const requiresSentence = q.titre.toLowerCase().includes('expliqu') ||
              q.titre.toLowerCase().includes('pourquoi') ||
              q.titre.toLowerCase().includes('défin') ||
              q.titre.toLowerCase().includes('cite') ||
              q.titre.toLowerCase().includes('phrase') ||
              maxPts >= 3;

            if (isIdeaPresent) {
              if (requiresSentence) {
                const phrasingEval = evaluatePhrasing(answer, q.explanation, q.subject === 'anglais');
                questionPhrasingTier = phrasingEval.tier;
                questionUpgradeTip = phrasingEval.upgradeTip;

                if (phrasingEval.tier === 'phrase_argumentee') {
                  // Tier 3: 100% of points (allows 18-20/20)
                  pointsEarned = maxPts;
                  isSuccess = true;
                  phrasingStats.phraseArgumenteeCount++;
                } else if (phrasingEval.tier === 'phrase_simple') {
                  // Tier 2: 75% of points (gives 15-16/20)
                  pointsEarned = Math.max(1, Math.round(maxPts * 0.75));
                  isSuccess = pointsEarned === maxPts;
                  phrasingStats.phraseSimpleCount++;
                } else {
                  // Tier 1: 50% of points (gives 11-13/20 maximum)
                  pointsEarned = Math.max(1, Math.round(maxPts * 0.5));
                  isSuccess = false; // goes to 'revoir' so student learns how to form a sentence
                  phrasingStats.motIsoleCount++;
                }
              } else {
                // Direct devinette or single word question: 100%
                pointsEarned = maxPts;
                isSuccess = true;
              }
            } else {
              // Off-topic or incomplete
              pointsEarned = 0;
              isSuccess = false;
            }
          }

          if (answer.length > 8 && !answer.includes('???')) {
            hasNiceRelectureEffort = true;
          }
        }
      }

      totalPtsObtenus += pointsEarned;

      const expectedText = q.type === 'texte_a_trous'
        ? (q.clozeAnswers || []).map((w, i) => `Trou ${i + 1} : ${w}`).join(' • ')
        : q.type === 'briques'
          ? (q.correctBricks && q.correctBricks.length > 0 ? q.correctBricks.join(' ') : q.explanation)
          : (q.correctAnswer || (q.options && q.correctIndex !== undefined ? q.options[q.correctIndex] : q.explanation));

      const userAnsText = q.type === 'texte_a_trous'
        ? Object.entries(getClozeMap(idx)).map(([k, v]) => `Trou ${k} : ${v}`).join(' • ') || 'Non répondu'
        : (answer || 'Non répondu');

      if (pointsEarned === maxPts) {
        acquisList.push({
          titre: q.titre,
          userAns: userAnsText,
          expected: expectedText,
          explanation: q.explanation,
          phrasingTier: questionPhrasingTier
        });
      } else {
        revoirList.push({
          titre: q.titre,
          userAns: userAnsText,
          expected: expectedText,
          explanation: q.explanation,
          pointsGot: pointsEarned,
          maxPts,
          phrasingTier: questionPhrasingTier,
          upgradeTip: questionUpgradeTip
        });
        failed.push(q);
      }
    });

    const note20 = totalPtsMax > 0 ? Math.min(20, Math.round((totalPtsObtenus / totalPtsMax) * 20)) : 0;

    setScoreResult({
      note20,
      ptsObtenus: totalPtsObtenus,
      ptsMax: totalPtsMax,
      acquis: acquisList,
      revoir: revoirList,
      failedQuestions: failed,
      relectureBonusAwarded: hasNiceRelectureEffort,
      phrasingStats
    });
    setIsValidated(true);

    if (!isParentTestMode) {
      onSaveStats(note20, chronoSeconds, currentSub, hasNiceRelectureEffort);

      if (note20 === 20) onUnlockBadge('b_top1');
      if (note20 >= 16 && isChronoEnabled) onUnlockBadge('b_chrono');
      if (note20 >= 14 && currentSub === 'mix') onUnlockBadge('b_mix');
      if (note20 >= 16 && currentSub === 'svt') onUnlockBadge('b_svt');
      if (note20 >= 14 && currentSub === 'histoire') onUnlockBadge('b_hist');
      if (note20 >= 14 && currentSub === 'pc') onUnlockBadge('b_pc');
      if (note20 >= 14 && currentSub === 'anglais') onUnlockBadge('b_ang');
      if (note20 >= 14 && currentSub === 'maths') onUnlockBadge('b_maths');
      if (note20 >= 14 && currentSub === 'francais') onUnlockBadge('b_francais');
      if (hasNiceRelectureEffort) onUnlockBadge('b_relecture');
    }

    if (note20 >= 12) {
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } });
    }

    setTimeout(() => {
      document.getElementById('matchReport')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 animate-fadeIn">
      {/* Subject Selector Bar */}
      <div className={`p-4 sm:p-5 rounded-3xl border shadow-xs ${
        isBattleRoyale ? 'bg-slate-900 border-purple-500/40 text-white' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-purple-400">
            1. Choisis la matière ou le Grand Mix :
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {SUBJECTS_CONFIG.map((sub) => {
            const isSelected = currentSub === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setCurrentSub(sub.id);
                  setActiveInteractiveTool(null);
                  setSelectedChapters([]);
                  localStorage.setItem('mathieu_active_subject', sub.id);
                  onSubjectChange?.(sub.id);
                }}
                className={`p-2.5 rounded-2xl text-center border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? isBattleRoyale
                      ? 'bg-purple-600 text-white border-purple-300 shadow-md ring-2 ring-purple-400/40'
                      : 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-300/40'
                    : isBattleRoyale
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sub.id === 'anglais' ? (
                  <UkFlagIcon className="h-5 w-7 my-0.5" />
                ) : (
                  <span className="text-xl">{sub.icon}</span>
                )}
                <span className="text-[11px] font-extrabold truncate w-full">{sub.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chapter Filtering Area (Chapters Hierarchy: Toute la matière / Sous-chapitres & Ateliers) */}
        {chaptersForSub.length > 0 && currentSub !== 'mix' && (
          <div className="mt-4 pt-3 border-t border-slate-200/40 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
              <span className="text-indigo-700 dark:text-purple-300">
                🎯 Chapitres & Ateliers ciblés (Choisis ce que tu veux réviser) :
              </span>
              <label
                onClick={() => {
                  if (activeInteractiveTool) setActiveInteractiveTool(null);
                }}
                className="text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={areAllChaptersSelected && !activeInteractiveTool}
                  onChange={() => {
                    setActiveInteractiveTool(null);
                    toggleAllChapters();
                  }}
                  className="rounded text-indigo-600 focus:ring-0 cursor-pointer h-3.5 w-3.5"
                />
                <span>Leçon entière</span>
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              {chaptersForSub.map((chap) => {
                if (chap.interactiveTool) {
                  const isToolActive = activeInteractiveTool === chap.interactiveTool;
                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => {
                        setActiveInteractiveTool(isToolActive ? null : chap.interactiveTool!);
                      }}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-black flex items-center gap-2 cursor-pointer transition-all shadow-xs ${
                        isToolActive
                          ? chap.interactiveTool === 'map'
                            ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-300/50'
                            : chap.interactiveTool === 'timeline'
                              ? 'bg-amber-600 text-white border-amber-400 ring-2 ring-amber-300/50'
                              : 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-300/50'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                      }`}
                    >
                      {chap.interactiveTool === 'map' ? (
                        <Globe className="h-4 w-4 text-blue-700" />
                      ) : chap.interactiveTool === 'timeline' ? (
                        <Clock className="h-4 w-4 text-amber-700" />
                      ) : (
                        <Calculator className="h-4 w-4 text-indigo-700" />
                      )}
                      <span>{chap.titre}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-lg bg-white/90 text-slate-900 font-extrabold uppercase shadow-xs">
                        {isToolActive ? 'En cours' : 'Ouvrir'}
                      </span>
                    </button>
                  );
                }

                const isChecked = selectedChapters.includes(chap.id) && !activeInteractiveTool;
                return (
                  <label
                    key={chap.id}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                      isChecked
                        ? isBattleRoyale
                          ? 'bg-purple-950/80 border-purple-400 text-purple-200 shadow-xs'
                          : 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-xs'
                        : 'opacity-60 bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        setActiveInteractiveTool(null);
                        toggleChapter(chap.id);
                      }}
                      className="rounded text-indigo-600 focus:ring-0 cursor-pointer"
                    />
                    <span>{chap.titre}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Options Bar : 5, 10, 20 Questions + Mode Chrono */}
        {!activeInteractiveTool && (
          <div className="mt-4 pt-3 border-t border-slate-200/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold opacity-75">Questions :</span>
              <div className="flex flex-wrap gap-1.5 items-center">
                {([5, 10, 20, 'controle'] as QuizModeType[]).map((mode) => {
                  const isSelected = questionCount === mode;
                  const isExam = mode === 'controle';
                  return (
                    <button
                      key={String(mode)}
                      onClick={() => setQuestionCount(mode)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? isExam
                            ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 text-white border-purple-300 shadow-md ring-2 ring-purple-300'
                            : isBattleRoyale
                              ? 'bg-purple-600 text-white border-purple-400 shadow-xs'
                              : 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                          : isExam
                            ? 'bg-purple-50 text-purple-900 border-purple-300 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-700 font-black'
                            : isBattleRoyale
                              ? 'bg-slate-800 text-slate-300 border-slate-700'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {mode === 5 && '⚡ 5 Express'}
                      {mode === 10 && '🎯 10 Standard'}
                      {mode === 20 && '🏆 20 Grand DS'}
                      {isExam && (
                        <>
                          <span>📝 Contrôle comme en classe</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20 uppercase tracking-wider font-black">
                            Consignes & Briques
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const next = !isChronoEnabled;
                  setIsChronoEnabled(next);
                  if (next) startChrono();
                  else stopChrono();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                  isChronoEnabled
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                    : isBattleRoyale ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700'
                }`}
              >
                ⏱️ Mode Chrono : {isChronoEnabled ? 'ON' : 'OFF'}
              </button>
              {isChronoEnabled && (
                <span className="font-mono text-sm font-black text-amber-500">
                  {chronoSeconds}s
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {activeInteractiveTool === 'tables' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-indigo-600" />
              <span className="text-xs font-black uppercase text-slate-800 dark:text-slate-200">
                Atelier Chapitre : Défi Tables de Multiplication
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveInteractiveTool(null)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>← Revenir aux questions du cours</span>
            </button>
          </div>
          <MultiplicationTab
            isBattleRoyale={isBattleRoyale}
            onWinBadge={() => onUnlockBadge('b_tables')}
          />
        </div>
      ) : activeInteractiveTool === 'map' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-black uppercase text-slate-800 dark:text-slate-200">
                Atelier Chapitre : Carte Interactive (Continents, Océans, Pays)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveInteractiveTool(null)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>← Revenir aux questions du cours</span>
            </button>
          </div>
          <InteractiveMapTab
            isBattleRoyale={isBattleRoyale}
            onWinBadge={() => onUnlockBadge('b_geo')}
          />
        </div>
      ) : activeInteractiveTool === 'timeline' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <span className="text-xs font-black uppercase text-slate-800 dark:text-slate-200">
                Atelier Chapitre : Frise Chronologique Interactive
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveInteractiveTool(null)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>← Revenir aux questions du cours</span>
            </button>
          </div>
          <HistoryTimelineTab
            isBattleRoyale={isBattleRoyale}
            onWinBadge={() => onUnlockBadge('b_dates')}
          />
        </div>
      ) : (
        <>
          {/* Confirmation Screen after Photo Scan / Lesson Change */}
      {scanConfirmationData && (
        <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 text-slate-900 space-y-4 animate-fadeIn shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-black uppercase">
                📸 Cours Reconnu par l'IA
              </span>
              <h3 className="text-xl font-black">{scanConfirmationData.title}</h3>
            </div>
            <button
              onClick={() => setScanConfirmationData(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              ✕ Annuler
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-2">
            <span className="text-xs font-black uppercase text-amber-800 flex items-center gap-1.5">
              <FileCheck className="h-4 w-4 text-emerald-600" />
              <span>📋 Ce que le professeur attend (À Savoir) :</span>
            </span>
            <ul className="text-xs font-medium space-y-1 text-slate-700 pl-4 list-disc">
              {scanConfirmationData.aSavoir.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={confirmScannedLesson}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Check className="h-4 w-4" />
              <span>Oui, c'est ma leçon ! Lancer l'entraînement</span>
            </button>
            <button
              onClick={() => {
                setScanConfirmationData(null);
                setIsPhotoModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 font-bold text-xs cursor-pointer hover:bg-slate-50"
            >
              📷 Reprendre la photo
            </button>
          </div>
        </div>
      )}

      {/* Indicateur de chapitre ciblé si l'élève a sélectionné un sous-ensemble */}
      {currentSub !== 'mix' && selectedChapters.length > 0 && selectedChapters.length < chaptersForSub.length && (
        <div className={`p-3.5 px-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-bold shadow-xs ${
          isBattleRoyale
            ? 'bg-purple-950/40 border-purple-500/50 text-purple-200'
            : 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-purple-400 shrink-0" />
            <span>
              🎯 Entraînement ciblé sur {selectedChapters.length} sous-chapitre{selectedChapters.length > 1 ? 's' : ''} ({questions.length} questions au programme)
            </span>
          </div>
          <button
            onClick={selectAllChapters}
            className="text-[11px] underline opacity-80 hover:opacity-100 cursor-pointer whitespace-nowrap"
          >
            Réactiver tous les chapitres
          </button>
        </div>
      )}

      {/* Main Questions List (Enchaînement ordonné sans jugement) */}
      <div className="space-y-5">
        {questions.map((q, idx) => {
          const currentAnswer = userAnswers[idx] || '';
          const isHintOpen = openHints[idx] || false;
          const isSpellingOpen = openSpellingTips[idx] || false;
          const isFlagOpen = flagTranslated[idx] || false;
          const isMicListening = listeningState && activeSpeechIndex === idx;
          const isPaperChecked = paperChecks[idx] || false;

          return (
            <div
              key={q.id || idx}
              className={`p-6 sm:p-7 rounded-3xl border-2 shadow-sm space-y-4 transition-all ${
                isBattleRoyale
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {/* Question Header & Order Logic */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider ${
                    q.level === 1
                      ? 'bg-blue-100 text-blue-900'
                      : q.level === 2
                        ? 'bg-indigo-100 text-indigo-900'
                        : 'bg-purple-100 text-purple-900'
                  }`}>
                    {q.level === 1 ? '1. Vocabulaire & Orthographe' : q.level === 2 ? '2. Application & Synthèse' : '3. Déduction & Réflexion'}
                  </span>
                  <span className="text-xs font-black opacity-60">QUESTION {idx + 1} / {questions.length}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    📋 Barème : {q.points} pts
                  </span>

                  <button
                    onClick={() => handleSpeak(q.titre, q.subject === 'anglais' ? 'en-US' : 'fr-FR')}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-indigo-600 cursor-pointer"
                    title="Écouter la question"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Autonomy Challenge Special Banner */}
              {q.isAutonomyChallenge && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-black text-xs sm:text-sm flex items-center justify-between gap-2 shadow-sm animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    <span>DÉFI AUTONOMIE (Sans les briques) • Rédige ta réponse complète comme en classe !</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider shrink-0 font-extrabold">
                    Ultime défi
                  </span>
                </div>
              )}

              {/* Ortho Question Special Banner */}
              {q.isOrthoQuestion && (
                <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700 text-blue-950 dark:text-blue-200 text-xs font-black flex items-center gap-2 animate-fadeIn">
                  <span>✍️</span>
                  <span>QUESTION ORTHOGRAPHE : Le professeur vérifie que tu écris ce mot-clé sans faute !</span>
                </div>
              )}

              {/* Oral Listening Special Banner */}
              {q.isOralListening && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white shadow-md space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                      <span className="text-lg">🎧</span>
                      <span>ÉCOUTE ORALE : Dictée audio de la date en anglais</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/20 uppercase tracking-wider font-extrabold">
                      Compréhension Orale
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSpeak(q.audioDictationText || q.titre, 'en-GB')}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-emerald-950 font-black text-xs hover:bg-emerald-50 active:scale-95 transition-all shadow-sm cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4 text-emerald-600" />
                      <span>{speakingText === (q.audioDictationText || q.titre) ? 'Lecture en cours...' : '🇬🇧 Écouter la dictée audio (Prononciation UK)'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSpeak(q.audioDictationText || q.titre, 'en-US')}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-xs active:scale-95 transition-all cursor-pointer"
                    >
                      <span>🇺🇸 Version US</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Title & Consigne with English Flag Toggle */}
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <h4 className="text-base sm:text-lg font-bold leading-relaxed dys-text flex-1">
                    {q.titre}
                  </h4>
                  {q.consigneFr && (
                    <button
                      onClick={() => setFlagTranslated((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                      className="px-2.5 py-1.5 rounded-xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-blue-900 text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1.5 shadow-xs transition-all"
                      title="Traduire la consigne en français"
                    >
                      <FrenchFlagIcon className="h-3.5 w-5" />
                      <span>{isFlagOpen ? 'Masquer' : 'Français'}</span>
                    </button>
                  )}
                </div>

                {q.consigneFr && isFlagOpen && (
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs font-semibold animate-fadeIn">
                    🇫🇷 Traduction : {q.consigneFr}
                  </div>
                )}
              </div>

              {/* Défi Écrit Papier uniquement si la question le demande explicitement */}
              {q.paperChallenge && (
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <PenTool className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>✏️ Défi Brouillon :</strong> {q.paperChallenge}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaperChecks((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer shrink-0 ${
                      isPaperChecked
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    {isPaperChecked ? '✓ Tracé sur ma feuille' : 'Cocher fait'}
                  </button>
                </div>
              )}

              {/* 🎯 RADAR DE CONSIGNE & DÉTECTEUR DE PIÈGE DU PROFESSEUR */}
              {q.consigneRadar && (
                <div className={`p-4 sm:p-5 rounded-2xl border-2 space-y-3.5 ${
                  isBattleRoyale
                    ? 'bg-purple-950/40 border-purple-500/40 text-purple-100'
                    : 'bg-indigo-50/90 border-indigo-300 text-slate-900'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🎯</span>
                      <span className="text-xs sm:text-sm font-black text-indigo-950 dark:text-indigo-200">
                        Radar de Consigne : Décoder l'attente du professeur
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setOpenRadarHints((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                          openRadarHints[idx]
                            ? 'bg-amber-100 text-amber-950 border-amber-300'
                            : 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border-indigo-200 hover:bg-indigo-50 dark:hover:bg-slate-700 shadow-xs'
                        }`}
                        title="Demander un indice sur le piège à éviter"
                      >
                        <span>{openRadarHints[idx] ? '🙈 Masquer le piège' : '💡 Demander un indice sur le piège'}</span>
                      </button>
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-200 text-indigo-900 uppercase tracking-wide">
                        Étape 1 indispensable
                      </span>
                    </div>
                  </div>

                  {/* Radar Question (Mathieu réfléchit à ce qu'on attend de lui) */}
                  <div className="text-xs sm:text-sm font-extrabold text-indigo-950 dark:text-indigo-100">
                    ❓ {q.consigneRadar.radarQuestion}
                  </div>

                  {/* Interactive Options */}
                  <div className="space-y-2">
                    {q.consigneRadar.options.map((opt, oIdx) => {
                      const isSelected = radarChoices[idx] === oIdx;
                      return (
                        <div key={oIdx} className="space-y-1">
                          <button
                            type="button"
                            onClick={() => handleSelectRadarChoice(idx, oIdx)}
                            className={`w-full text-left p-3 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                              isSelected
                                ? opt.isCorrect
                                ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-xs'
                                : 'bg-rose-100 border-rose-400 text-rose-950'
                              : isBattleRoyale
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                                : 'bg-white hover:bg-slate-50 border-indigo-100 text-slate-800'
                            }`}
                          >
                            <span>{opt.text}</span>
                            {isSelected && (
                              <span className="shrink-0 text-base">
                                {opt.isCorrect ? '✅' : '❌'}
                              </span>
                            )}
                          </button>
                          {isSelected && (
                            <div className={`p-2.5 rounded-xl text-xs font-semibold animate-fadeIn ${
                              opt.isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                                : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
                            }`}>
                              {opt.isCorrect ? '🌟 Bravo ! ' : '💡 Conseil : '}
                              {opt.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Trap Warning Alert (Révélé si l'élève demande l'indice ou après avoir cliqué sur un choix) */}
                  {(openRadarHints[idx] || radarChoices[idx] !== undefined) && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200 text-xs font-bold flex items-start gap-2.5 animate-fadeIn">
                      <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-black text-rose-700 dark:text-rose-400 block uppercase text-[10px] tracking-wider">
                          ⚠️ Piège classique décodé par le professeur :
                        </span>
                        <span>{q.consigneRadar.trapWarning}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Interactive Input by Type */}
              {q.type === 'qcm' && q.options && (
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = currentAnswer === String(optIdx);
                    return (
                      <button
                        key={optIdx}
                        onClick={() => setUserAnswers((prev) => ({ ...prev, [idx]: String(optIdx) }))}
                        className={`w-full p-3.5 rounded-2xl text-left text-sm font-semibold border-2 transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? isBattleRoyale
                              ? 'bg-purple-600 text-white border-purple-300'
                              : 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                            : isBattleRoyale
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === 'vf' && (
                <div className="flex gap-3 pt-1">
                  {['Vrai', 'Faux'].map((val) => {
                    const isSelected = currentAnswer.toLowerCase() === val.toLowerCase();
                    return (
                      <button
                        key={val}
                        onClick={() => setUserAnswers((prev) => ({ ...prev, [idx]: val }))}
                        className={`flex-1 py-3.5 rounded-2xl font-black text-sm border-2 transition-all cursor-pointer ${
                          isSelected
                            ? isBattleRoyale
                              ? 'bg-purple-600 text-white border-purple-300'
                              : 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                            : isBattleRoyale
                              ? 'bg-slate-800 text-slate-300 border-slate-700'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {val === 'Vrai' ? '✅ Vrai' : '❌ Faux'}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Le Grand Texte à Trous Multi-Phrases de Synthèse (Apothéose de fin de contrôle) */}
              {q.type === 'texte_a_trous' && q.clozeTemplate && (
                <div className={`p-4 sm:p-5 rounded-2xl border-2 space-y-4 ${
                  isBattleRoyale
                    ? 'bg-purple-950/30 border-purple-500/40 text-purple-100'
                    : 'bg-amber-50/80 border-amber-300 text-slate-800'
                }`}>
                  {/* Paragraph with inline inputs */}
                  <div className="text-sm sm:text-base leading-loose font-medium dys-text">
                    {q.clozeTemplate.split(/(\{\d+\})/g).map((chunk, cIdx) => {
                      const match = chunk.match(/^\{(\d+)\}$/);
                      if (match) {
                        const blankNum = parseInt(match[1], 10);
                        const clozeMap = getClozeMap(idx);
                        const userVal = clozeMap[String(blankNum)] || '';
                        const expected = q.clozeAnswers ? q.clozeAnswers[blankNum - 1] : '';
                        const isBlankCorrect =
                          userVal.trim().toLowerCase() === expected.trim().toLowerCase() ||
                          (expected.length > 3 && userVal.toLowerCase().includes(expected.toLowerCase().slice(0, 3))) ||
                          (userVal.length > 3 && expected.toLowerCase().includes(userVal.toLowerCase().slice(0, 3)));

                        if (isValidated) {
                          return (
                            <span
                              key={cIdx}
                              className={`inline-flex items-center gap-1 mx-1 px-2.5 py-1 rounded-lg font-bold border ${
                                isBlankCorrect
                                  ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                                  : 'bg-rose-100 border-rose-400 text-rose-950'
                              }`}
                            >
                              <span>{isBlankCorrect ? '✅' : '❌'}</span>
                              <span>{userVal || '(vide)'}</span>
                              {!isBlankCorrect && (
                                <span className="text-[11px] text-emerald-700 font-black underline ml-1">
                                  ➜ {expected}
                                </span>
                              )}
                            </span>
                          );
                        }

                        return (
                          <span key={cIdx} className="inline-flex items-center gap-1 mx-1 my-1">
                            <span className="text-[10px] font-black opacity-60">#{blankNum}</span>
                            <input
                              type="text"
                              value={userVal}
                              onChange={(e) => setClozeBlank(idx, blankNum, e.target.value)}
                              placeholder={`[Trou ${blankNum}]`}
                              className={`w-28 sm:w-36 px-2.5 py-1 text-xs sm:text-sm font-bold rounded-lg border-2 text-center transition-all focus:outline-hidden focus:ring-2 focus:ring-amber-400 ${
                                userVal
                                  ? isBattleRoyale
                                    ? 'bg-purple-900/60 border-purple-400 text-white'
                                    : 'bg-white border-amber-400 text-amber-950'
                                  : isBattleRoyale
                                    ? 'bg-slate-900/80 border-slate-700 text-white'
                                    : 'bg-white border-dashed border-amber-300 text-slate-700'
                              }`}
                            />
                          </span>
                        );
                      }
                      return <span key={cIdx}>{chunk}</span>;
                    })}
                  </div>
                </div>
              )}

              {/* 🏗️ FABRIQUE DE PHRASE EN BRIQUES (Machine à comparer & réponses rédigées 6ème) */}
              {q.type === 'briques' && (
                <div className="space-y-3.5 pt-1">
                  {/* Instructions Bar */}
                  <div className={`p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    isBattleRoyale
                      ? 'bg-purple-950/30 border-purple-500/40 text-purple-100'
                      : 'bg-amber-50/90 border-amber-300 text-slate-800'
                  }`}>
                    <div>
                      <div className="text-xs font-black flex items-center gap-1.5 text-amber-900 dark:text-amber-200">
                        <span>🏗️ Fabrique de Phrase & Comparaison en Briques</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold uppercase">
                          Note visée : 18-20/20
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800/90 dark:text-amber-300 font-medium">
                        Clique sur les briques dans l'ordre pour assembler ta réponse complète, ou saisis au clavier/micro.
                      </p>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleClearBricks(idx)}
                        className="px-2.5 py-1 text-xs rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-800 border border-amber-300 text-amber-900 dark:text-amber-200 font-bold transition-all cursor-pointer"
                        title="Effacer la phrase et recommencer"
                      >
                        🔄 Vider
                      </button>
                      {q.correctBricks && q.correctBricks.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const bricks = q.correctBricks || [];
                            setSelectedBricks((prev) => ({ ...prev, [idx]: [...bricks] }));
                            setUserAnswers((prev) => ({ ...prev, [idx]: bricks.join(' ') }));
                          }}
                          className="px-2.5 py-1 text-xs rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold transition-all cursor-pointer shadow-xs"
                          title="Insérer la phrase modèle si tu as besoin d'aide"
                        >
                          ✨ Phrase modèle
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Word Bricks Bank */}
                  {q.bricksBank && q.bricksBank.length > 0 && (
                    <div className={`p-4 rounded-2xl border-2 border-dashed space-y-2.5 ${
                      isBattleRoyale
                        ? 'bg-slate-900/80 border-purple-500/50'
                        : 'bg-white border-indigo-300'
                    }`}>
                      <span className="text-[11px] font-black uppercase text-indigo-700 dark:text-indigo-300 block">
                        🧱 Boîte à briques de phrases (Clique pour ajouter ou retirer) :
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {q.bricksBank.map((brick, bIdx) => {
                          const isUsed = (selectedBricks[idx] || []).includes(brick);
                          return (
                            <button
                              key={bIdx}
                              type="button"
                              onClick={() => handleToggleBrick(idx, brick)}
                              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5 text-left ${
                                isUsed
                                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs ring-2 ring-indigo-300 scale-98'
                                  : isBattleRoyale
                                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                                    : 'bg-slate-50 hover:bg-indigo-50 text-slate-800 border-slate-300 hover:border-indigo-400'
                              }`}
                            >
                              <span>{isUsed ? '✓ ' : '+ '}{brick}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Assembled Sentence Preview & Editable Textarea */}
                  <div className="space-y-2">
                    <div className="relative">
                      <textarea
                        rows={3}
                        value={currentAnswer}
                        onChange={(e) => setUserAnswers((prev) => ({ ...prev, [idx]: e.target.value }))}
                        placeholder="Assemble tes briques ou tape / dicte ta phrase de comparaison complète..."
                        className={`w-full p-3.5 pr-14 rounded-2xl border text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-sans dys-text ${
                          isBattleRoyale
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => toggleSpeech(idx)}
                        className={`absolute right-3 top-3.5 p-2 rounded-xl border transition-all cursor-pointer ${
                          isMicListening
                            ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
                        }`}
                        title="Dicter la réponse au micro"
                      >
                        <Mic className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Selected Bricks Chips with Quick Delete */}
                    {(selectedBricks[idx] || []).length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs">
                        <span className="font-extrabold text-indigo-900 dark:text-indigo-300 text-[11px] mr-1">
                          Briques assemblées :
                        </span>
                        {(selectedBricks[idx] || []).map((brick, sIdx) => (
                          <span
                            key={sIdx}
                            onClick={() => handleToggleBrick(idx, brick)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-100 hover:bg-rose-100 dark:bg-indigo-900 dark:hover:bg-rose-950 text-indigo-950 dark:text-indigo-100 hover:text-rose-700 border border-indigo-300 text-xs font-semibold cursor-pointer transition-all"
                            title="Cliquer pour retirer cette brique"
                          >
                            <span>{brick}</span>
                            <span className="text-[10px] font-black opacity-70">✕</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Live Criteria Checklist (Cahier des charges du professeur) */}
                  {q.criteriaChecklist && q.criteriaChecklist.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase text-emerald-900 dark:text-emerald-300">
                          📋 Cahier des charges du professeur (S'allume en vert en direct) :
                        </span>
                        <span className="text-[10px] font-extrabold text-emerald-800 dark:text-emerald-400">
                          {q.criteriaChecklist.filter((c) =>
                            c.keywords.some((kw) => currentAnswer.toLowerCase().includes(kw.toLowerCase()))
                          ).length} / {q.criteriaChecklist.length} critères validés
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.criteriaChecklist.map((crit, cIdx) => {
                          const isMet = crit.keywords.some((kw) =>
                            currentAnswer.toLowerCase().includes(kw.toLowerCase())
                          );
                          return (
                            <div
                              key={cIdx}
                              className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                                isMet
                                  ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-xs'
                                  : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-500'
                              }`}
                            >
                              <span className="text-sm shrink-0">{isMet ? '✅' : '⚪'}</span>
                              <span className={isMet ? 'font-extrabold' : 'font-medium'}>
                                {crit.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {(q.type === 'libre' || q.type === 'trou' || q.type === 'exemple_perso') && (
                <div className="space-y-2.5 pt-1">
                  {/* Guideline Bar for 6ème : Exemple perso & Justification - Désactivée pour l'anglais */}
                  {currentSub !== 'anglais' && q.subject !== 'anglais' && (
                    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[11px] font-black text-indigo-950 dark:text-indigo-200">
                      <span className="flex items-center gap-1.5">
                        <span>💬 Dis ton exemple perso</span>
                        <span>•</span>
                        <span>🎯 Justifie ta réponse</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setUserAnswers((prev) => ({
                              ...prev,
                              [idx]: prev[idx] ? `${prev[idx]} Par exemple, ` : 'Par exemple, '
                            }))
                          }
                          className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-100 text-indigo-900 dark:text-indigo-200 border border-indigo-300 text-[10px] font-extrabold cursor-pointer transition-all shadow-2xs"
                        >
                          + "Par exemple..."
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setUserAnswers((prev) => ({
                              ...prev,
                              [idx]: prev[idx] ? `${prev[idx]} parce que ` : 'parce que '
                            }))
                          }
                          className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-100 text-indigo-900 dark:text-indigo-200 border border-indigo-300 text-[10px] font-extrabold cursor-pointer transition-all shadow-2xs"
                        >
                          + "parce que..."
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Suggested Examples Tiles (Anti Single-Example Trap) */}
                  {q.suggestedExamples && q.suggestedExamples.length > 0 && (
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5">
                      <span className="text-[11px] font-black uppercase text-amber-800 block">
                        💡 Dis ton exemple perso (ou clique sur une de ces tuiles d'inspiration) :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {q.suggestedExamples.map((ex, exIdx) => (
                          <button
                            key={exIdx}
                            type="button"
                            onClick={() =>
                              setUserAnswers((prev) => ({
                                ...prev,
                                [idx]: prev[idx] ? `${prev[idx]} - ${ex}` : ex
                              }))
                            }
                            className="px-2.5 py-1 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-xs font-bold text-slate-800 cursor-pointer transition-all"
                          >
                            {ex}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    <textarea
                      rows={2}
                      value={currentAnswer}
                      onChange={(e) => setUserAnswers((prev) => ({ ...prev, [idx]: e.target.value }))}
                      placeholder={q.subject === 'anglais' ? "Write your answer in English here..." : "Tape ta réponse ou clique sur le micro pour dicter..."}
                      className={`w-full p-3.5 pr-14 rounded-2xl border text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-sans dys-text ${
                        isBattleRoyale
                          ? 'bg-slate-800 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => toggleSpeech(idx)}
                      className={`absolute right-3 top-3.5 p-2 rounded-xl border transition-all cursor-pointer ${
                        isMicListening
                          ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
                      }`}
                      title="Dicter la réponse au micro"
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Live 6ème Phrasing Assistant */}
                  {currentAnswer.trim().length > 0 && (q.type === 'libre' || q.type === 'exemple_perso') && (
                    (() => {
                      const evalP = evaluatePhrasing(currentAnswer, q.explanation, q.subject === 'anglais');
                      return (
                        <div className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 animate-fadeIn ${evalP.badgeClass}`}>
                          <div className="flex items-center gap-1.5 font-black">
                            <span>{evalP.badgeText}</span>
                          </div>
                          <span className="text-[11px] opacity-85">
                            {evalP.upgradeTip}
                          </span>
                        </div>
                      );
                    })()
                  )}
                </div>
              )}

              {/* The 2 Separated Help Buttons: 1. Astuce Magique, 2. Bonus Relecture */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/40 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenHints((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                    className="text-amber-500 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span>
                      {isHintOpen
                        ? 'Cacher l\'astuce'
                        : q.type === 'texte_a_trous'
                          ? '💡 Astuce : Boîte à Mots (si tu hésites)'
                          : '💡 Astuce Magique'}
                    </span>
                  </button>

                  {q.spellingTip && (
                    <button
                      type="button"
                      onClick={() => setOpenSpellingTips((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                      className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Star className="h-3.5 w-3.5" />
                      <span>{isSpellingOpen ? 'Masquer conseil' : '⭐ Bonus Phrase Soignée'}</span>
                    </button>
                  )}
                </div>

                <span className="text-[11px] opacity-60">
                  {currentAnswer ? '✓ Réponse saisie' : 'Non répondu'}
                </span>
              </div>

              {isHintOpen && (
                <div className="p-3.5 rounded-xl bg-amber-100 text-amber-950 text-xs font-semibold border border-amber-300 animate-fadeIn space-y-2.5">
                  {q.hint && (
                    <div className="flex items-center gap-1.5 font-bold">
                      <Lightbulb className="h-4 w-4 text-amber-700 shrink-0" />
                      <span>Indice : {q.hint}</span>
                    </div>
                  )}

                  {q.type === 'texte_a_trous' && q.clozeWordBank && q.clozeWordBank.length > 0 && !isValidated && (
                    <div className="pt-2 border-t border-amber-300/80 space-y-1.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 block">
                        🔤 Boîte à Mots de secours (Clique sur un mot pour le placer dans le trou vide) :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {q.clozeWordBank.map((word, wIdx) => (
                          <button
                            key={wIdx}
                            type="button"
                            onClick={() => {
                              const clozeMap = getClozeMap(idx);
                              const answersCount = (q.clozeAnswers || []).length;
                              let targetBlank = 1;
                              for (let i = 1; i <= answersCount; i++) {
                                if (!clozeMap[String(i)]) {
                                  targetBlank = i;
                                  break;
                                }
                              }
                              setClozeBlank(idx, targetBlank, word);
                            }}
                            className="px-2.5 py-1 rounded-xl text-xs font-bold bg-white hover:bg-amber-200 text-amber-950 border border-amber-400 shadow-xs cursor-pointer transition-all"
                          >
                            + {word}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isSpellingOpen && q.spellingTip && (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-950 text-xs font-semibold border border-emerald-300 animate-fadeIn">
                  ⭐ Astuce Zéro Faute : {q.spellingTip}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Incomplete Warning Alert before Validation */}
      {showIncompleteAlert && (
        <div className="p-4 rounded-2xl bg-amber-100 text-amber-950 border-2 border-amber-400 font-bold text-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <span>
              Attention Mathieu : il te reste des questions sans réponse ! Veux-tu les remplir avant de valider ?
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIncompleteAlert(false)}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-400 text-amber-900 cursor-pointer"
            >
              Je vérifie d'abord
            </button>
            <button
              onClick={executeGlobalValidation}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white cursor-pointer"
            >
              Valider quand même ➔
            </button>
          </div>
        </div>
      )}

      {/* Global Validation Action Button */}
      <div className="pt-4 text-center">
        <button
          onClick={handleValidateClick}
          className={`w-full sm:w-auto px-10 py-5 rounded-3xl font-black text-lg shadow-xl flex items-center justify-center gap-3 mx-auto cursor-pointer transition-all ${
            isBattleRoyale
              ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:opacity-95 text-white shadow-purple-600/30'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
          }`}
        >
          <span>{isBattleRoyale ? '🚀 Valider et Valider le Top 1' : '📊 Valider toutes mes réponses & Voir mon bilan'}</span>
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>

      {/* Final Match Report (Bilan Global de l'Évaluation avec Comparatif Côte-à-Côte) */}
      {isValidated && scoreResult && (
        <div
          id="matchReport"
          className={`p-6 sm:p-10 rounded-3xl border-2 shadow-2xl space-y-6 animate-fadeIn ${
            isBattleRoyale ? 'bg-slate-900 border-purple-500 text-white' : 'bg-white border-slate-300 text-slate-800'
          }`}
        >
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-500">
              {isBattleRoyale ? '🏆 RAPPORT DE VICTORY ROYALE' : '🎮 Bilan de l\'évaluation'}
            </span>
            <div className="text-4xl sm:text-5xl font-black font-mono">
              Note estimée : <span className="text-emerald-500">{scoreResult.note20} / 20</span>
            </div>

            {isChronoEnabled && (
              <div className="text-xs font-bold text-amber-500">
                ⏱️ Temps total réalisé : {chronoSeconds} secondes
              </div>
            )}

            {/* Pouce 👍 or Smiley 🤔 with comforting message */}
            <div className="pt-2">
              {scoreResult.note20 >= 16 ? (
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-emerald-100 text-emerald-950 font-black text-base shadow-sm">
                  <span>🎉 VICTOIRE ROYALE ! Top 1 Maîtrisé !</span>
                </div>
              ) : scoreResult.note20 >= 12 ? (
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-blue-100 text-blue-950 font-black text-base shadow-sm">
                  <ThumbsUp className="h-5 w-5 text-blue-600" />
                  <span>👍 Top 10 ! Bien joué, continue comme ça !</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-amber-100 text-amber-950 font-black text-base shadow-sm">
                  <Smile className="h-5 w-5 text-amber-600" />
                  <span>🤔 En cours d'acquisition. Relance une game et révise ces notions !</span>
                </div>
              )}
            </div>

            {scoreResult.relectureBonusAwarded && (
              <div className="text-xs font-bold text-amber-500 pt-1">
                ⭐ Bonus de relecture soignée accordé (+1 Étoile) !
              </div>
            )}
          </div>

          {/* Barème Rédaction & Argumentation 6ème (Visual Progress Gauge) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/90 dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-500/40 text-slate-900 dark:text-white space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase text-indigo-900 dark:text-indigo-300">
                <span>✍️ Barème Rédaction & Argumentation 6ème</span>
              </div>
              <span className="text-[11px] font-extrabold text-indigo-700 dark:text-indigo-300">
                Règle : 1 mot = ~12/20 • Phrase simple = ~15/20 • Phrase avec argument = 18-20/20 !
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 space-y-1">
                <div className="font-black flex items-center justify-between">
                  <span>🟡 Mots bruts sans phrase</span>
                  <span className="font-mono text-base font-black">{scoreResult.phrasingStats.motIsoleCount}</span>
                </div>
                <p className="text-[10px] opacity-80 leading-tight">
                  Idée comprise mais mot seul : donne la moyenne (~11-13/20).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-100/90 border border-blue-300 text-blue-950 space-y-1">
                <div className="font-black flex items-center justify-between">
                  <span>🟢 Phrases simples rédigées</span>
                  <span className="font-mono text-base font-black">{scoreResult.phrasingStats.phraseSimpleCount}</span>
                </div>
                <p className="text-[10px] opacity-80 leading-tight">
                  Phrase avec verbe : donne une bonne note (~15-16/20).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-950 space-y-1">
                <div className="font-black flex items-center justify-between">
                  <span>🌟 Rédaction Pro 6ème</span>
                  <span className="font-mono text-base font-black">{scoreResult.phrasingStats.phraseArgumenteeCount}</span>
                </div>
                <p className="text-[10px] opacity-80 leading-tight">
                  Phrase avec argument (car, parce que...) : décroche le 18 à 20/20 !
                </p>
              </div>
            </div>
          </div>

          {/* Tableau Bilan Bicolore avec Comparatif Côte-à-Côte */}
          <div className="space-y-4 pt-4 border-t border-slate-200/40">
            {/* 1. Acquis */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-emerald-950 space-y-2">
              <div className="flex items-center gap-2 font-black text-sm text-emerald-800 uppercase">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>✅ Ce que je maîtrise bien ({isBattleRoyale ? 'Loot Sécurisé' : 'Acquis'})</span>
              </div>
              <ul className="text-xs space-y-1.5 font-semibold">
                {scoreResult.acquis.length > 0 ? (
                  scoreResult.acquis.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600">•</span>
                      <span>{item.titre}</span>
                      {item.phrasingTier === 'phrase_argumentee' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-200 text-emerald-950 font-black">
                          🌟 Phrase argumentée
                        </span>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500">Aucune réponse correcte sur cette série.</li>
                )}
              </ul>
            </div>

            {/* 2. À Revoir avec Comparatif Côte-à-Côte (Ce que tu as écrit vs Ce que le prof attend) */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-950 space-y-3">
              <div className="flex items-center gap-2 font-black text-sm text-amber-800 uppercase">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span>🔍 À revoir & Comparatif Côte-à-Côte</span>
              </div>

              {scoreResult.revoir.length > 0 ? (
                <div className="space-y-3">
                  {scoreResult.revoir.map((item, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-amber-200 text-xs space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-extrabold text-slate-900">
                          Question : {item.titre}
                        </span>
                        {item.phrasingTier === 'mot_isole' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-black self-start sm:self-auto">
                            🟡 Idée juste mais mot isolé ({item.pointsGot} / {item.maxPts} pts)
                          </span>
                        )}
                        {item.phrasingTier === 'phrase_simple' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 border border-blue-300 font-black self-start sm:self-auto">
                            🟢 Phrase simple ({item.pointsGot} / {item.maxPts} pts)
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded-lg bg-rose-50 text-rose-900 border border-rose-200">
                          <span className="font-bold block">Ce que tu as écrit :</span>
                          <span className="italic">{item.userAns}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                          <span className="font-bold block">Ce que le prof attendait pour avoir tous les points :</span>
                          <span>{item.expected}</span>
                        </div>
                      </div>

                      {item.phrasingTier === 'mot_isole' && (
                        <div className="p-2 rounded-lg bg-amber-50 text-amber-950 border border-amber-200 text-[11px] font-semibold">
                          💡 <strong>Comment passer de {item.pointsGot} à {item.maxPts} points :</strong> Rédige une vraie phrase en reprenant les mots de la question ! {item.upgradeTip}
                        </div>
                      )}

                      <p className="text-slate-600 text-[11px] pt-1 border-t border-slate-100">
                        💡 <strong>Pourquoi l'idée était bonne :</strong> {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-emerald-700 font-bold text-xs">🎉 Tout est maîtrisé à 100% !</div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {scoreResult.failedQuestions.length > 0 && (
              <button
                onClick={() => buildQuizQuestions(currentSub, questionCount, scoreResult.failedQuestions)}
                className="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>🔄 Revenir sur la zone (Refaire mes {scoreResult.failedQuestions.length} erreurs)</span>
              </button>
            )}

            <button
              onClick={() => buildQuizQuestions(currentSub, questionCount)}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>🔥 Enchaîner une nouvelle série ({questionCount} questions)</span>
            </button>
          </div>
        </div>
      )}
        </>
      )}

      {/* Photo Scanner Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Camera className="h-5 w-5 text-indigo-600" />
                <span>Scanner un cours, exercice ou contrôle</span>
              </h3>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Prends en photo la page de ton cahier ou ton devoir surveillé. L'IA Gemini extrait la notion, décode les attentes du prof et génère le quiz instantanément !
            </p>

            <div className="p-8 border-2 border-dashed border-indigo-200 rounded-2xl text-center space-y-3 bg-indigo-50/50">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              {isAnalyzingPhoto ? (
                <div className="space-y-2 py-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
                  <p className="text-xs font-bold text-indigo-900">
                    Gemini analyse l'écriture et les consignes du professeur...
                  </p>
                </div>
              ) : (
                <>
                  <Camera className="h-10 w-10 text-indigo-600 mx-auto" />
                  <div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md cursor-pointer hover:bg-indigo-700"
                    >
                      Ouvrir la caméra ou importer une photo
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    Fonctionne sur smartphone, tablette et webcam d'ordinateur
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
