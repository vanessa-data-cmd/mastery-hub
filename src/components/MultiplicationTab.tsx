import React, { useState, useEffect } from 'react';
import {
  Calculator,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle,
  XCircle,
  HelpCircle,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MultiplicationTabProps {
  isBattleRoyale: boolean;
  onWinBadge?: () => void;
}

interface MathProblem {
  a: number;
  b: number;
  answer: number;
  trick?: string;
}

const MNEMONIC_TRICKS: Record<string, string> = {
  '7x8': "Le compte à rebours magique : 5, 6, 7, 8 ➔ 56 = 7 x 8 !",
  '8x7': "Le compte à rebours magique : 5, 6, 7, 8 ➔ 56 = 8 x 7 !",
  '9x6': "L'astuce des doigts de 9 : baisse le 6ème doigt ➔ il reste 5 doigts à gauche et 4 à droite ➔ 54 !",
  '6x9': "Astuce de 9 : 6 - 1 = 5 (dizaine) et pour aller à 9 il manque 4 ➔ 54 !",
  '8x9': "Astuce de 9 : 8 - 1 = 7 (dizaine) et pour aller à 9 il manque 2 ➔ 72 !",
  '9x8': "Astuce de 9 : 8 - 1 = 7 et 9 - 7 = 2 ➔ 72 !",
  '7x7': "Le carré de 7 : 7 x 7 = 49 (pense au département 49 ou à 50 moins 1) !",
  '6x8': "Dans un abri sous la pluie, 6 x 8 = 48 !",
  '8x6': "Dans un abri sous la pluie, 8 x 6 = 48 !",
  '6x6': "Le carré de 6 : 6 x 6 = 36 !",
  '9x9': "Le carré de 9 : 9 x 9 = 81 (8 et 1 font 9) !"
};

export const MultiplicationTab: React.FC<MultiplicationTabProps> = ({ isBattleRoyale, onWinBadge }) => {
  const [selectedTable, setSelectedTable] = useState<number | 'mix'>(7);
  const [questions, setQuestions] = useState<MathProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showTrick, setShowTrick] = useState(false);

  // Chrono state
  const [isChronoOn, setIsChronoOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<any>(null);

  const generateProblems = (tbl: number | 'mix') => {
    let pool: MathProblem[] = [];
    if (tbl === 'mix') {
      // Focus on difficult tables (6, 7, 8, 9)
      const tablesFocus = [6, 7, 8, 9];
      for (let i = 0; i < 10; i++) {
        const a = tablesFocus[Math.floor(Math.random() * tablesFocus.length)];
        const b = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const key = `${a}x${b}`;
        pool.push({ a, b, answer: a * b, trick: MNEMONIC_TRICKS[key] });
      }
    } else {
      for (let b = 2; b <= 9; b++) {
        const key = `${tbl}x${b}`;
        pool.push({ a: tbl, b, answer: tbl * b, trick: MNEMONIC_TRICKS[key] });
      }
      pool = pool.sort(() => Math.random() - 0.5);
    }

    setQuestions(pool);
    setCurrentIndex(0);
    setUserAnswer('');
    setScore(0);
    setIsDone(false);
    setFeedback(null);
    setShowTrick(false);

    if (isChronoOn) {
      setTimer(0);
      if (timerInterval) clearInterval(timerInterval);
      const int = setInterval(() => setTimer((t) => t + 1), 1000);
      setTimerInterval(int);
    }
  };

  useEffect(() => {
    generateProblems(selectedTable);
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [selectedTable]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || !questions[currentIndex]) return;

    const currentQ = questions[currentIndex];
    const val = parseInt(userAnswer.trim(), 10);
    const correct = val === currentQ.answer;

    if (correct) {
      setScore((s) => s + 1);
      setFeedback({ isCorrect: true, message: `✅ Exact ! ${currentQ.a} x ${currentQ.b} = ${currentQ.answer}` });
    } else {
      setFeedback({
        isCorrect: false,
        message: `❌ ${currentQ.a} x ${currentQ.b} = ${currentQ.answer} ${currentQ.trick ? `(Astuce : ${currentQ.trick})` : ''}`
      });
    }

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      setShowTrick(false);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsDone(true);
        if (timerInterval) clearInterval(timerInterval);
        if (score + (correct ? 1 : 0) >= questions.length - 1) {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          if (onWinBadge) onWinBadge();
        }
      }
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 animate-fadeIn">
      {/* Intro Header */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm ${
        isBattleRoyale
          ? 'bg-slate-900 border-purple-500/40 text-white'
          : 'bg-white border-rose-100 text-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-black uppercase tracking-wider mb-2">
              <Calculator className="h-3.5 w-3.5" />
              Module Spécial Maths 6ème
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Les Tables de Multiplication sans stress
            </h2>
            <p className="text-xs sm:text-sm opacity-80 mt-1 max-w-xl">
              Entraîne-toi sur les tables pièges (6, 7, 8, 9) grâce à des astuces visuelles et le fameux compte à rebours 5, 6, 7, 8 !
            </p>
          </div>

          <button
            onClick={() => {
              setIsChronoOn(!isChronoOn);
              generateProblems(selectedTable);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer ${
              isChronoOn
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                : isBattleRoyale ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700'
            }`}
          >
            ⏱️ Mode Chrono Sprint : {isChronoOn ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Table Selector Grid */}
        <div className="flex flex-wrap items-center gap-1.5 mt-5 pt-3 border-t border-slate-200/40">
          <span className="text-xs font-bold opacity-75 mr-2">Choisis la table :</span>
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTable(t)}
              className={`h-9 w-9 rounded-xl font-black text-xs transition-all border cursor-pointer ${
                selectedTable === t
                  ? isBattleRoyale ? 'bg-purple-600 text-white border-purple-400' : 'bg-rose-600 text-white border-rose-700 shadow-xs'
                  : isBattleRoyale ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              } ${[6, 7, 8, 9].includes(t) ? 'ring-2 ring-amber-400/50' : ''}`}
              title={([6, 7, 8, 9].includes(t) ? 'Table clé de 6ème !' : '')}
            >
              x{t}
            </button>
          ))}
          <button
            onClick={() => setSelectedTable('mix')}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all border cursor-pointer ml-1 ${
              selectedTable === 'mix'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                : isBattleRoyale ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🎲 Grand Mix 6, 7, 8, 9
          </button>
        </div>
      </div>

      {/* Main Flash Problem Card */}
      {!isDone && questions.length > 0 && (
        <div className={`p-8 sm:p-12 rounded-3xl border text-center shadow-lg space-y-6 ${
          isBattleRoyale ? 'bg-slate-900 border-purple-500/50 text-white' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold opacity-70">
            <span>Question {currentIndex + 1} sur {questions.length}</span>
            {isChronoOn && <span className="text-amber-500 font-mono text-sm">⏱️ {timer}s</span>}
            <span>Score : <strong className="text-emerald-500 text-sm">{score}</strong></span>
          </div>

          <div className="py-4">
            <span className="text-xs uppercase font-black tracking-widest text-indigo-500 block mb-2">
              Calcul rapide :
            </span>
            <div className="text-5xl sm:text-6xl font-black font-mono tracking-wider">
              {questions[currentIndex].a} × {questions[currentIndex].b} = ?
            </div>
          </div>

          {/* Answer Form */}
          <form onSubmit={handleSubmit} className="max-w-xs mx-auto space-y-4">
            <input
              type="number"
              autoFocus
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Ta réponse..."
              className={`w-full p-4 rounded-2xl text-center text-3xl font-mono font-black border-2 focus:outline-hidden focus:ring-4 ${
                isBattleRoyale
                  ? 'bg-slate-800 border-purple-500 text-white focus:ring-purple-400'
                  : 'bg-slate-50 border-indigo-400 text-slate-900 focus:ring-indigo-300'
              }`}
            />

            <button
              type="submit"
              disabled={!userAnswer.trim()}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-base shadow-md cursor-pointer transition-all"
            >
              Valider (ou Entrée ↵)
            </button>
          </form>

          {/* Hint / Trick Button */}
          {questions[currentIndex].trick && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowTrick(!showTrick)}
                className="text-xs font-bold text-amber-500 hover:text-amber-600 inline-flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="h-4 w-4" />
                <span>{showTrick ? 'Cacher l\'astuce magique' : 'Besoin de l\'astuce mnémotechnique ?'}</span>
              </button>
              {showTrick && (
                <div className="mt-3 p-3.5 rounded-2xl bg-amber-100 text-amber-950 font-bold text-xs max-w-md mx-auto border border-amber-300 animate-fadeIn">
                  💡 {questions[currentIndex].trick}
                </div>
              )}
            </div>
          )}

          {/* Feedback Flash */}
          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm max-w-md mx-auto animate-fadeIn ${
              feedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}>
              {feedback.message}
            </div>
          )}
        </div>
      )}

      {/* Done Card */}
      {isDone && (
        <div className={`p-8 sm:p-12 rounded-3xl border text-center shadow-lg space-y-5 animate-fadeIn ${
          isBattleRoyale ? 'bg-slate-900 border-purple-500 text-white' : 'bg-white border-slate-200'
        }`}>
          <div className="text-5xl">
            {score >= questions.length - 1 ? '🏆' : '👍'}
          </div>
          <h3 className="text-2xl font-black">
            {score === questions.length
              ? 'Sans-Faute Magistral ! Top 1 des Tables !'
              : score >= questions.length - 2
                ? 'Super score ! Les réflexes sont là !'
                : 'Bien joué ! Enchaîne une série pour consolider !'}
          </h3>
          <p className="text-xl font-mono font-black text-emerald-500">
            Score : {score} / {questions.length}
            {isChronoOn && ` en ${timer}s`}
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => generateProblems(selectedTable)}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Rejouer une série</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
