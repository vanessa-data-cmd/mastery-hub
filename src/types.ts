export type SubjectId = 'histoire' | 'geo' | 'pc' | 'svt' | 'anglais' | 'maths' | 'francais' | 'mix';

export type QuestionType = 'libre' | 'qcm' | 'vf' | 'trou' | 'exemple_perso' | 'texte_a_trous' | 'briques';

export interface ChapterItem {
  id: string;
  titre: string;
  aSavoir?: string[];
  interactiveTool?: 'tables' | 'map' | 'timeline';
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  subject: SubjectId;
  leconId?: string;
  chapterId?: string;
  titre: string;
  consigneFr?: string; // French translation for English questions (flag toggle)
  points: number;
  level: 1 | 2 | 3; // 1: Fondations/Vocabulaire, 2: Application/Trous, 3: Déduction/Transfert
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  explanation: string;
  hint: string;
  spellingTip?: string; // Astuce magique d'orthographe
  suggestedExamples?: string[]; // Tuiles d'exemples hors-cours cliquables
  keywords?: string[];
  paperChallenge?: string; // Défi écrit sur feuille / brouillon
  // Grand texte à trous multi-phrases récapitulatif
  clozeTemplate?: string; // ex: "Un écosystème réunit un {1} naturel..."
  clozeAnswers?: string[]; // ex: ["milieu", "vivants", "interactions"]
  clozeWordBank?: string[]; // Mots proposés dans la banque pour aider
  // Briques de phrase scientifiques, machine à comparer & radar de consigne
  bricksBank?: string[];
  correctBricks?: string[];
  consigneRadar?: {
    trapWarning: string;
    radarQuestion: string;
    options: { text: string; isCorrect: boolean; explanation: string }[];
  };
  criteriaChecklist?: {
    label: string;
    keywords: string[];
  }[];
  isOfficialExam?: boolean; // Marqueur pour le mode "Contrôle comme en classe"
  isAutonomyChallenge?: boolean; // 6e question défi en autonomie sans briques
  isOrthoQuestion?: boolean; // Question dédiée d'orthographe sur mot-clé
  isOralListening?: boolean; // Question d'écoute orale audio dictée
  audioDictationText?: string; // Texte prononcé en anglais pour l'écoute orale
}

export interface PracticalMission {
  role: string;
  scenario: string;
  task: string;
}

export interface LessonDateItem {
  date: string;
  event: string;
  memo?: string;
}

export interface SurvivalSheet {
  dangerRed: string; // Zone Rouge : Piège classique du contrôle
  warningYellow: string[]; // Zone Jaune : Mots d'or du prof indispensables
  greenFoundation: string; // Zone Verte : Le réflexe simple & fondation
  keyDates?: LessonDateItem[]; // ⏳ Dates clés indispensables de cette leçon
}

export interface LessonPack {
  id: string;
  title: string;
  subject: SubjectId;
  summaryKids: string;
  audioFlashScript: string; // Flash Audio 2 minutes
  survivalSheet: SurvivalSheet;
  practicalMission: PracticalMission;
  everydayApplications: string[];
  mnemonicTrick: string;
  quizQuestions: QuizQuestion[];
  imageUrl?: string;
}

export interface AnswerFeedback {
  stars: number;
  verdictTitle: string;
  encouragement: string;
  explanation: string;
  spellingBonusAwarded: boolean;
  spellingKindNote?: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  desc: string;
  rarity: 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  unlocked: boolean;
}

export interface GlobalStats {
  sessions: number;
  totalScore: number;
  bestScore: number;
  bestTimes: Record<string, number>;
  lessonHistory: Record<string, number>; // score out of 20
  relectureBonusCount: number;
}

export interface HomeworkItem {
  id: string;
  day: 'Mardi' | 'Jeudi';
  subject: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
}

export interface PredefinedLesson {
  id: string;
  title: string;
  subject: string;
  subjectLabel?: string;
  description: string;
  sampleContent: string;
}
