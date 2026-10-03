import React, { useState, useEffect } from 'react';
import {
  Printer,
  Shield,
  Key,
  Lightbulb,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Target,
  PenTool,
  CheckSquare,
  Square,
  Award,
  ArrowRight
} from 'lucide-react';
import { SubjectId } from '../types';
import { INITIAL_LESSON_PACKS, SUBJECTS_CONFIG, SUBJECT_CHAPTERS } from '../data/lessonsData';
import { UkFlagIcon } from './FlagIcons';

interface SurvivalAudioTabProps {
  isBattleRoyale: boolean;
  initialSubject?: SubjectId;
  onSubjectChange?: (subId: SubjectId) => void;
  onGoToQuiz?: () => void;
  onGoToVideo?: () => void;
}

export const SurvivalAudioTab: React.FC<SurvivalAudioTabProps> = ({
  isBattleRoyale,
  initialSubject,
  onSubjectChange,
  onGoToQuiz,
  onGoToVideo
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(() => {
    if (initialSubject && initialSubject !== 'mix') return initialSubject;
    const saved = typeof window !== 'undefined' ? localStorage.getItem('mathieu_active_subject') : null;
    return (saved as SubjectId) || 'histoire';
  });
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, Record<string, boolean>>>({});
  const [studentNotes, setStudentNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialSubject && initialSubject !== 'mix' && initialSubject !== selectedSubject) {
      setSelectedSubject(initialSubject);
    }
  }, [initialSubject]);

  const pack = INITIAL_LESSON_PACKS[selectedSubject] || INITIAL_LESSON_PACKS.svt;
  const chapters = SUBJECT_CHAPTERS[selectedSubject] || [];

  const handlePrint = () => {
    window.print();
  };

  // Checklist toggles
  const currentSubjectChecks = checkedCriteria[selectedSubject] || {};
  const toggleCheck = (criteriaId: string) => {
    setCheckedCriteria((prev) => ({
      ...prev,
      [selectedSubject]: {
        ...(prev[selectedSubject] || {}),
        [criteriaId]: !((prev[selectedSubject] || {})[criteriaId])
      }
    }));
  };

  const getDynamicCriteria = () => {
    const list: { id: string; title: string; desc: string; category: string }[] = [];

    list.push({
      id: 'crit_green',
      title: "L'Idée Clé Fondamentale",
      desc: pack.survivalSheet.greenFoundation,
      category: "Fondation"
    });

    const topKeywords = pack.survivalSheet.warningYellow.slice(0, 3).join(', ');
    list.push({
      id: 'crit_yellow',
      title: "Les Mots-Clés du Professeur",
      desc: `Je sais expliquer précisément ces termes clés : ${topKeywords}`,
      category: "Vocabulaire"
    });

    list.push({
      id: 'crit_red',
      title: "Le Bon Réflexe pour Réussir",
      desc: pack.survivalSheet.dangerRed,
      category: "Conseil Réussite"
    });

    return list;
  };

  const criteria = getDynamicCriteria();
  const totalCriteria = criteria.length;
  const completedCount = criteria.filter((c) => !!currentSubjectChecks[c.id]).length;
  const isAllCompleted = totalCriteria > 0 && completedCount === totalCriteria;
  const completionPercent = Math.round((completedCount / totalCriteria) * 100);

  const currentNote = studentNotes[selectedSubject] || '';

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Intro Header */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm ${
        isBattleRoyale ? 'bg-slate-900 border-purple-500/40 text-white' : 'bg-white border-amber-200 text-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-2">
              <Zap className="h-3.5 w-3.5" />
              Fiches Repères & Bons Réflexes
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Fiches Repères Cartable
            </h2>
            <p className="text-xs sm:text-sm opacity-80 mt-1 max-w-2xl">
              La veille d'une évaluation, inutile de relire 6 pages de cahier.
              Retiens l'essentiel, les mots-clés du prof, les bons réflexes et vérifie tes acquis avec l'auto-évaluation !
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer ${
                isBattleRoyale ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
              title="Imprimer ou enregistrer en PDF"
            >
              <Printer className="h-4 w-4" />
              <span>Imprimer ma fiche cartable</span>
            </button>
          </div>
        </div>

        {/* Subject Pills */}
        <div className="flex overflow-x-auto gap-1.5 mt-5 pt-3 border-t border-slate-200/40 scrollbar-none">
          {SUBJECTS_CONFIG.filter((s) => s.id !== 'mix').map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubject(sub.id);
                localStorage.setItem('mathieu_active_subject', sub.id);
                onSubjectChange?.(sub.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedSubject === sub.id
                  ? isBattleRoyale ? 'bg-purple-600 text-white border-purple-400' : 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : isBattleRoyale ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {sub.id === 'anglais' ? (
                <UkFlagIcon className="h-4 w-5" />
              ) : (
                <span>{sub.icon}</span>
              )}
              <span>{sub.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Raccourci vers le Tableau de Classe (comme au collège) */}
      {onGoToVideo && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-amber-500/10 border-2 border-indigo-200 dark:border-indigo-600/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
              🖥️
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">
                Besoin de revoir la leçon au Tableau de Classe (comme au collège) ?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Schémas animés, carte des migrations, exemples illustrés et chapitres pas à pas.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onGoToVideo}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md shrink-0 self-start sm:self-auto transition-all scale-100 hover:scale-105"
          >
            <span>Ouvrir le Tableau de Classe ➜</span>
          </button>
        </div>
      )}

      {/* 1. FICHE MÉMO REPOSANTE & POSITIVE (PLACÉE EN PREMIER) */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
        isBattleRoyale ? 'bg-slate-900 border-purple-500/40 text-white' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📑</span>
            <div>
              <h3 className="text-xl font-black">Fiche Mémo : {pack.title}</h3>
              <p className="text-xs opacity-70">3 repères clairs & rassurants pour aborder le contrôle sereinement</p>
            </div>
          </div>
        </div>

        {/* 1. L'Essentiel (Fondation simple et positive) */}
        <div className={`p-5 rounded-2xl border-2 space-y-2.5 ${
          isBattleRoyale
            ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100'
            : 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
        }`}>
          <div className="flex items-center gap-2 font-black text-sm text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>1. L'Idée Clé & Le Réflexe Simple</span>
          </div>
          <p className="text-sm font-bold leading-relaxed dys-text">
            {pack.survivalSheet.greenFoundation}
          </p>
          {pack.mnemonicTrick && (
            <div className={`pt-2.5 border-t text-xs font-semibold flex items-start gap-1.5 ${
              isBattleRoyale ? 'border-emerald-800/60 text-emerald-200' : 'border-emerald-200 text-emerald-900'
            }`}>
              <Lightbulb className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
              <span>Astuce magique de mémorisation : {pack.mnemonicTrick}</span>
            </div>
          )}
        </div>

        {/* 2. Les Mots-Clés du Professeur */}
        <div className={`p-5 rounded-2xl border-2 space-y-2.5 ${
          isBattleRoyale
            ? 'bg-amber-950/30 border-amber-500/50 text-amber-100'
            : 'bg-amber-50/70 border-amber-300 text-amber-950'
        }`}>
          <div className="flex items-center gap-2 font-black text-sm text-amber-800 dark:text-amber-400 uppercase tracking-wider">
            <Key className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>2. Les Mots-Clés essentiels</span>
          </div>
          <p className="text-xs text-amber-900 dark:text-amber-200 font-semibold">
            Les termes précis attendus sur ta copie :
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {pack.survivalSheet.warningYellow.map((word: string, idx: number) => (
              <span
                key={idx}
                className={`px-3.5 py-1.5 rounded-xl border font-black text-xs shadow-xs flex items-center gap-1.5 ${
                  isBattleRoyale
                    ? 'bg-slate-800 border-amber-500/50 text-amber-200'
                    : 'bg-white border-amber-300 text-amber-950'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Le Bon Réflexe pour Réussir (Instruction positive) */}
        <div className={`p-5 rounded-2xl border-2 space-y-2.5 ${
          isBattleRoyale
            ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-100'
            : 'bg-sky-50/80 border-sky-300 text-slate-800'
        }`}>
          <div className="flex items-center gap-2 font-black text-sm text-sky-900 dark:text-sky-300 uppercase tracking-wider">
            <Shield className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            <span>3. Le Bon Réflexe pour Réussir</span>
          </div>
          <p className="text-xs text-sky-800 dark:text-sky-200 font-bold">
            Le conseil qui fait toute la différence :
          </p>
          <div className={`p-3.5 rounded-xl border text-sm font-bold leading-relaxed dys-text ${
            isBattleRoyale
              ? 'bg-slate-900/80 border-indigo-500/30 text-indigo-100'
              : 'bg-white/90 border-sky-200 text-slate-800'
          }`}>
            {pack.survivalSheet.dangerRed}
          </div>
        </div>

        {/* 4. Les Dates & Repères Chronologiques Clés */}
        {pack.survivalSheet.keyDates && pack.survivalSheet.keyDates.length > 0 && (
          <div className={`p-5 rounded-2xl border-2 space-y-3 ${
            isBattleRoyale
              ? 'bg-purple-950/30 border-purple-500/50 text-purple-100'
              : 'bg-amber-50/80 border-amber-300 text-slate-900'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                <span className="text-base">⏳</span>
                <span>4. Les Dates Clés & Repères de cette leçon</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pack.survivalSheet.keyDates.map((kd: { date: string; event: string; memo?: string }, idx: number) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex flex-col justify-between ${
                    isBattleRoyale
                      ? 'bg-slate-900/90 border-purple-500/40 text-slate-200'
                      : 'bg-white border-amber-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-black text-xs text-amber-600 dark:text-amber-400">
                    <Clock className="h-3 w-3" />
                    <span>{kd.date}</span>
                  </div>
                  <div className="font-bold text-xs mt-1 text-slate-900 dark:text-white">
                    {kd.event}
                  </div>
                  <div className="text-[11px] opacity-75 mt-1 italic dys-text">
                    "{kd.memo}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. AUTO-ÉVALUATION : SUIS-JE PRÊT POUR LE CONTRÔLE ? (EN DESSOUS DE LA FICHE MÉMO) */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm space-y-5 ${
        isBattleRoyale ? 'bg-slate-900 border-indigo-500/40 text-white' : 'bg-white border-indigo-200 text-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-300 text-xs font-black uppercase tracking-wider">
              <Target className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Auto-Évaluation Express • Ce que tu dois savoir
            </div>
            <h3 className="text-xl font-extrabold">Suis-je prêt pour le contrôle ?</h3>
            <p className="text-xs opacity-75">
              Coche chaque repère pour vérifier que tu as bien les bases avant de lancer le quiz ou de refermer ton cahier :
            </p>
          </div>

          {/* Progress Bar Badge */}
          <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2.5 shrink-0 ${
            isAllCompleted
              ? 'bg-emerald-500/15 border-emerald-400 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs'
              : 'bg-indigo-50 dark:bg-slate-800 border-indigo-200 dark:border-slate-700 text-indigo-900 dark:text-indigo-200 font-bold text-xs'
          }`}>
            <span className="text-sm font-black">{completedCount}/{totalCriteria}</span>
            <div className="w-20 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isAllCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <span>{completionPercent}%</span>
          </div>
        </div>

        {/* Checklist items */}
        <div className="space-y-2.5 pt-1">
          {criteria.map((item) => {
            const isChecked = !!currentSubjectChecks[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? isBattleRoyale
                      ? 'bg-purple-950/40 border-purple-400 text-purple-100 shadow-xs'
                      : 'bg-emerald-50/70 border-emerald-400 text-emerald-950 shadow-xs'
                    : isBattleRoyale
                      ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-800'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="h-5 w-5 text-emerald-600 dark:text-purple-400" />
                  ) : (
                    <Square className="h-5 w-5 opacity-40 hover:opacity-70" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className={`text-xs sm:text-sm font-black ${
                      isChecked ? 'text-emerald-900 dark:text-purple-200' : 'text-slate-900 dark:text-white'
                    }`}>
                      {item.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed dys-text">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mini Scratchpad */}
        <div className={`p-4 rounded-2xl border space-y-2 ${
          isBattleRoyale ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400">
              <PenTool className="h-3.5 w-3.5" />
              Brouillon d'entraînement : Écris un exemple ou une idée avec tes mots
            </span>
            <span className="text-[11px] opacity-60">Pour vérifier ta mémoire</span>
          </div>
          <input
            type="text"
            value={currentNote}
            onChange={(e) => setStudentNotes({ ...studentNotes, [selectedSubject]: e.target.value })}
            placeholder={
              selectedSubject === 'anglais'
                ? "Ex: twenty-one, forty, on Friday, in July..."
                : selectedSubject === 'maths'
                  ? "Ex: 3/4 = 3 parts prises sur 4, 14/10 = 1,4..."
                  : selectedSubject === 'histoire'
                    ? "Ex: Toumaï -7M au Tchad, écriture vers -3500..."
                    : "Ex: Milieu + Vivants + Interactions..."
            }
            className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-hidden ${
              isBattleRoyale
                ? 'bg-slate-900 border-slate-700 text-white focus:border-purple-400'
                : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-400'
            }`}
          />
          {currentNote.trim().length > 3 && (
            <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              Bien joué ! Formuler ton propre exemple est le meilleur moyen d'ancrer la leçon.
            </p>
          )}
        </div>

        {/* Success Banner when 100% completed */}
        {isAllCompleted && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-500/20 border-2 border-emerald-400 text-emerald-950 dark:text-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-xs">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-black">
                  🎉 Tous les repères sont validés ! Tu maîtrises ta leçon à 100% !
                </h4>
                <p className="text-xs opacity-85">
                  Tu as les mots-clés, les définitions, ton exemple et le bon réflexe en tête. Tu peux foncer sur le quiz !
                </p>
              </div>
            </div>

            {onGoToQuiz && (
              <button
                onClick={onGoToQuiz}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md shrink-0"
              >
                <span>Passer au Quiz d'entraînement</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
