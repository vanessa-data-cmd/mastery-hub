import React, { useState } from 'react';
import { X, BookOpen, CheckCircle2, ChevronRight, Zap, Target, Sparkles, Compass } from 'lucide-react';
import { SubjectId } from '../types';
import { MainTabType } from './Header';
import { SUBJECTS_CONFIG, SUBJECT_CHAPTERS, INITIAL_LESSON_PACKS } from '../data/lessonsData';

interface SommaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (tab: MainTabType, subjectId: SubjectId, chapterId?: string) => void;
  isBattleRoyale: boolean;
}

export const SommaireModal: React.FC<SommaireModalProps> = ({
  isOpen,
  onClose,
  onNavigateTo,
  isBattleRoyale
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('anglais');

  if (!isOpen) return null;

  const validSubjects = SUBJECTS_CONFIG.filter((s) => s.id !== 'mix');
  const activeSubjectConfig = SUBJECTS_CONFIG.find((s) => s.id === selectedSubject) || validSubjects[0];
  const chapters = SUBJECT_CHAPTERS[selectedSubject] || [];
  const currentPack = INITIAL_LESSON_PACKS[selectedSubject];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className={`relative w-full max-w-4xl max-h-[92vh] rounded-3xl border-2 flex flex-col shadow-2xl overflow-hidden ${
        isBattleRoyale ? 'bg-slate-900 border-purple-500/50 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md shrink-0">
              📚
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black flex items-center gap-2">
                <span>Sommaire du Programme 6ème</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-[10px] uppercase">
                  Toutes matières
                </span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Choisis une matière pour retrouver toutes ses leçons, chapitres et réviser en 1 clic.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Fermer le sommaire"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Subject Navigation Tabs */}
        <div className="p-3 sm:px-6 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex overflow-x-auto gap-2 scrollbar-none">
          {validSubjects.map((sub) => {
            const isSel = selectedSubject === sub.id;
            const subChapters = SUBJECT_CHAPTERS[sub.id] || [];
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubject(sub.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  isSel
                    ? 'bg-indigo-600 text-white shadow-md scale-[1.02]'
                    : isBattleRoyale
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-white">
                  {subChapters.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body: Chapters list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Active Subject Summary Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeSubjectConfig.icon}</span>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  {activeSubjectConfig.label} • {currentPack ? currentPack.title : 'Programme 6ème'}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {chapters.length} chapitres disponibles pour apprendre et s'entraîner pas à pas.
              </p>
            </div>

            {/* Quick Actions for entire subject */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onNavigateTo('video', selectedSubject);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all scale-100 hover:scale-105"
              >
                <span>🖥️ Au Tableau</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigateTo('quiz', selectedSubject);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all scale-100 hover:scale-105"
              >
                <span>🎯 Lancer Quiz</span>
              </button>
            </div>
          </div>

          {/* Chapters List */}
          <div className="space-y-3">
            {chapters.map((ch, idx) => (
              <div
                key={ch.id}
                className={`p-4 rounded-2xl border-2 transition-all shadow-xs ${
                  isBattleRoyale
                    ? 'bg-slate-800/80 border-slate-700 hover:border-purple-400'
                    : 'bg-white border-slate-200 hover:border-indigo-400'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-mono font-black text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="font-black text-sm text-slate-900 dark:text-white">
                        {ch.titre}
                      </h4>
                    </div>

                    {/* Bullet Points "Ce qu'il faut savoir" */}
                    {ch.aSavoir && ch.aSavoir.length > 0 && (
                      <div className="pl-8 space-y-1">
                        {ch.aSavoir.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Direct Launch Buttons for this specific chapter */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pl-8 sm:pl-0">
                    <button
                      type="button"
                      onClick={() => {
                        onNavigateTo('video', selectedSubject, ch.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-black transition-all cursor-pointer flex items-center gap-1"
                      title="Ouvrir ce chapitre au Tableau"
                    >
                      <span>🖥️ Tableau</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onNavigateTo('quiz', selectedSubject, ch.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-emerald-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-black transition-all cursor-pointer flex items-center gap-1"
                      title="S'entraîner sur ce chapitre au Quiz"
                    >
                      <span>🎯 Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>💡 Astuce : Toutes les leçons scannées avec l'appareil photo s'ajoutent automatiquement ici.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:opacity-80 cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
