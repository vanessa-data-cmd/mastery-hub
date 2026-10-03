import React, { useState } from 'react';
import {
  Calendar,
  Hourglass,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Trophy,
  Volume2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HistoryTimelineTabProps {
  isBattleRoyale: boolean;
  onWinBadge?: () => void;
}

interface HistoricalDate {
  id: string;
  dateStr: string;
  yearNumber: number; // for chronological sorting
  title: string;
  period: 'Préhistoire' | 'Antiquité';
  description: string;
  trick: string;
  options: string[];
}

const HISTORICAL_DATES: HistoricalDate[] = [
  {
    id: 'd_toumai',
    dateStr: 'Vers -7 millions d’années',
    yearNumber: -7000000,
    title: 'Toumaï en Afrique : Origines de la lignée humaine',
    period: 'Préhistoire',
    description: "Découverte au Tchad du crâne de Toumaï, le plus ancien représentant connu de la lignée humaine.",
    trick: "7 millions d'années : les toutes premières racines en Afrique !",
    options: ['Vers -7 millions d’années', 'Vers -300 000 ans', '-3500 av. J.-C.', 'Vers -10 000 av. J.-C.']
  },
  {
    id: 'd_feu',
    dateStr: 'Vers -400 000 ans',
    yearNumber: -400000,
    title: 'La maîtrise du feu par les premiers humains',
    period: 'Préhistoire',
    description: "Les premiers hommes apprennent à allumer et conserver le feu pour cuire la viande, se réchauffer et éloigner les bêtes.",
    trick: "400 000 ans : la chaleur et la lumière dans la nuit préhistorique !",
    options: ['Vers -400 000 ans', 'Vers -7 millions d’années', '-3500 av. J.-C.', 'Vers -40 000 ans']
  },
  {
    id: 'd_sapiens',
    dateStr: 'Vers -300 000 ans',
    yearNumber: -300000,
    title: 'Apparition d’Homo Sapiens en Afrique',
    period: 'Préhistoire',
    description: "Notre propre espèce humaine apparaît en Afrique, berceau de l'humanité entière.",
    trick: "300 000 ans : notre espèce humaine naît en Afrique !",
    options: ['Vers -300 000 ans', 'Vers -100 000 ans', '-3500 av. J.-C.', 'Vers -40 000 ans']
  },
  {
    id: 'd_migrations',
    dateStr: 'Vers -100 000 ans',
    yearNumber: -100000,
    title: 'Grandes migrations d’Homo Sapiens hors d’Afrique',
    period: 'Préhistoire',
    description: "Les groupes d'Homo Sapiens nomades quittent le continent africain pour peupler l'Asie, l'Europe, puis l'Amérique.",
    trick: "100 000 ans : le grand voyage pour peupler toute la Terre !",
    options: ['Vers -100 000 ans', 'Vers -300 000 ans', '-3500 av. J.-C.', 'Vers -10 000 av. J.-C.']
  },
  {
    id: 'd_art',
    dateStr: 'Vers -40 000 ans',
    yearNumber: -40000,
    title: 'L’art pariétal au Paléolithique (Chauvet & Lascaux)',
    period: 'Préhistoire',
    description: "Les artistes préhistoriques peignent des animaux (mammouths, chevaux, bisons) sur les parois des grottes.",
    trick: "40 000 ans : les premières œuvres d'art de l'humanité !",
    options: ['Vers -40 000 ans', 'Vers -100 000 ans', '-3500 av. J.-C.', 'Vers -7 millions d’années']
  },
  {
    id: 'd_neolithique',
    dateStr: '-10 000 av. J.-C.',
    yearNumber: -10000,
    title: 'Révolution néolithique : Naissance de l’agriculture & premiers villages',
    period: 'Préhistoire',
    description: "Les humains deviennent sédentaires : ils cultivent la terre, élèvent des animaux et construisent les premiers villages.",
    trick: "10 000 ans avant J.-C. : fin du nomadisme, naissance des villages !",
    options: ['-10 000 av. J.-C.', '-3500 av. J.-C.', 'Vers -40 000 ans', 'VIIIe siècle av. J.-C.']
  },
  {
    id: 'd_ecriture',
    dateStr: '-3500 av. J.-C.',
    yearNumber: -3500,
    title: "Apparition de l'écriture en Mésopotamie",
    period: 'Préhistoire',
    description: "C'est l'invention majeure qui marque la fin de la Préhistoire et le début officiel de l'Histoire.",
    trick: "Pense au compte rond : 3500 avant Jésus-Christ, les premières tablettes d'argile gravées !",
    options: ['-3500 av. J.-C.', '-10 000 av. J.-C.', 'Vers -100 000 ans', '476 ap. J.-C.']
  },
  {
    id: 'd_rome',
    dateStr: 'VIIIe siècle av. J.-C. (-753)',
    yearNumber: -753,
    title: 'Fondation légendaire de Rome & Homère',
    period: 'Antiquité',
    description: "Romulus fonde la ville de Rome sur les bords du Tibre. À la même époque, Homère compose l'Iliade et l'Odyssée.",
    trick: "Le chiffre 8 : au 8ème siècle avant J.-C., Rome prend vie !",
    options: ['VIIIe siècle av. J.-C.', '-3500 av. J.-C.', 'Ve siècle av. J.-C.', '27 av. J.-C.']
  },
  {
    id: 'd_pericles',
    dateStr: 'Ve siècle av. J.-C.',
    yearNumber: -500,
    title: 'Siècle de Périclès et démocratie à Athènes',
    period: 'Antiquité',
    description: "Athènes brille par ses philosophes, ses temples comme le Parthénon et sa démocratie où les citoyens votent.",
    trick: "Le 5 d'or : le Ve siècle, c'est l'âge d'or d'Athènes et de Périclès !",
    options: ['Ve siècle av. J.-C.', 'VIIIe siècle av. J.-C.', '52 av. J.-C.', '476 ap. J.-C.']
  },
  {
    id: 'd_alesia',
    dateStr: '52 av. J.-C.',
    yearNumber: -52,
    title: "Siège d'Alésia : Jules César bat Vercingétorix (Chapitre Antiquité)",
    period: 'Antiquité',
    description: "Vercingétorix dépose ses armes aux pieds de Jules César. La Gaule devient romaine.",
    trick: "5, 2... les Gaulois rendent les armes en -52 !",
    options: ['52 av. J.-C.', '27 av. J.-C.', '-3500 av. J.-C.', 'Ier siècle']
  },
  {
    id: 'd_empire',
    dateStr: '27 av. J.-C.',
    yearNumber: -27,
    title: "Octave fonde l'Empire romain et devient Auguste",
    period: 'Antiquité',
    description: "Fin de la République romaine. Auguste devient le tout premier empereur romain.",
    trick: "À 27 ans avant J.-C., Auguste règne sur tout l'Empire romain.",
    options: ['27 av. J.-C.', '52 av. J.-C.', '476 ap. J.-C.', 'VIIIe siècle av. J.-C.']
  },
  {
    id: 'd_chute_rome',
    dateStr: '476 après J.-C.',
    yearNumber: 476,
    title: "Chute de l'Empire romain d'Occident",
    period: 'Antiquité',
    description: "Le dernier empereur romain est renversé. C'est la fin officielle de l'Antiquité et le début du Moyen Âge.",
    trick: "4 - 7 - 6 : La grande chute de Rome qui ferme l'Antiquité !",
    options: ['476 après J.-C.', '52 av. J.-C.', 'Ier siècle', '-3500 av. J.-C.']
  }
];

export const HistoryTimelineTab: React.FC<HistoryTimelineTabProps> = ({ isBattleRoyale, onWinBadge }) => {
  const [activeTab, setActiveTab] = useState<'challenge' | 'timeline'>('challenge');
  const [scopeFilter, setScopeFilter] = useState<'prehistoire' | 'all'>('prehistoire');
  const [shuffledQuestions, setShuffledQuestions] = useState<HistoricalDate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [showTrick, setShowTrick] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const getFilteredDates = (scope: 'prehistoire' | 'all') => {
    if (scope === 'prehistoire') {
      return HISTORICAL_DATES.filter((d) => d.period === 'Préhistoire');
    }
    return HISTORICAL_DATES;
  };

  const initGame = (scope: 'prehistoire' | 'all' = scopeFilter) => {
    const dates = getFilteredDates(scope);
    const list = [...dates].sort(() => Math.random() - 0.5);
    setShuffledQuestions(list);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback(null);
    setShowTrick(false);
    setIsFinished(false);
  };

  React.useEffect(() => {
    initGame(scopeFilter);
  }, [scopeFilter]);

  const currentQ = shuffledQuestions[currentIndex];

  const handleSelect = (opt: string) => {
    if (feedback || !currentQ) return;
    setSelectedOption(opt);

    const isGood = opt === currentQ.dateStr;
    if (isGood) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback({
        isCorrect: true,
        text: `Exact ! ${currentQ.dateStr} correspond bien à "${currentQ.title}". ${currentQ.description}`
      });
      if (newScore === shuffledQuestions.length) {
        confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
        if (onWinBadge) onWinBadge();
      }
    } else {
      setFeedback({
        isCorrect: false,
        text: `Ce n'est pas la bonne date. La bonne réponse était : ${currentQ.dateStr}. Astuce : ${currentQ.trick}`
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= shuffledQuestions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
      setShowTrick(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const ut = new SpeechSynthesisUtterance(text);
      ut.lang = 'fr-FR';
      ut.rate = 1.0;
      window.speechSynthesis.speak(ut);
    }
  };

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border-2 shadow-sm space-y-5 animate-fadeIn ${
      isBattleRoyale
        ? 'bg-slate-900 border-purple-500/50 text-white'
        : 'bg-white border-amber-300 text-slate-800'
    }`}>
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-md">
            <Hourglass className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>⏳ Les Grandes Dates & Repères Chronologiques 6ème</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold uppercase">
                Histoire 6ème
              </span>
            </h2>
            <p className="text-xs opacity-75">
              Toutes les dates clés du programme officiel : de l'écriture en Mésopotamie à la chute de Rome !
            </p>
          </div>
        </div>

        {/* View Switcher: Challenge vs Frise complète */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('challenge')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'challenge'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            ⚡ Défi Flash Dates
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            📜 Frise Chronologique
          </button>
        </div>
      </div>

      {/* Scope Selector: Leçon Préhistoire vs Tout le programme */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-700 dark:text-slate-300">
            🎯 Période ciblée :
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setScopeFilter('prehistoire')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                scopeFilter === 'prehistoire'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
              }`}
            >
              🌿 Frise de la leçon (Préhistoire & Origines)
            </button>
            <button
              type="button"
              onClick={() => setScopeFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                scopeFilter === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
              }`}
            >
              🏛️ Tout le programme 6ème (avec Antiquité & Rome)
            </button>
          </div>
        </div>

        <span className="text-[11px] font-bold text-slate-500">
          {shuffledQuestions.length} date{shuffledQuestions.length > 1 ? 's' : ''} au programme
        </span>
      </div>

      {/* CHALLENGE MODE */}
      {activeTab === 'challenge' && (
        <div className="space-y-4">
          {!isFinished && currentQ ? (
            <div className={`p-5 rounded-2xl border-2 space-y-4 ${
              isBattleRoyale
                ? 'bg-purple-950/30 border-purple-500/40 text-purple-100'
                : 'bg-amber-50/80 border-amber-300 text-slate-900'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Question {currentIndex + 1} / {shuffledQuestions.length} • Période : {currentQ.period}
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-amber-300 text-xs font-black">
                  Score : {score} / {shuffledQuestions.length}
                </span>
              </div>

              {/* Event Card */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {currentQ.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => speakText(`À quelle date ou période correspond : ${currentQ.title} ?`)}
                    className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {currentQ.description}
                </p>
              </div>

              {/* Date Options */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  À quelle date ou siècle cet événement s'est-il produit ?
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentQ.options.map((opt, oIdx) => {
                    const isPicked = selectedOption === opt;
                    const isGood = opt === currentQ.dateStr;
                    let btnClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-amber-400';

                    if (feedback) {
                      if (isGood) {
                        btnClass = 'bg-emerald-600 text-white border-emerald-400 font-black';
                      } else if (isPicked) {
                        btnClass = 'bg-rose-600 text-white border-rose-400 font-black';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelect(opt)}
                        disabled={feedback !== null}
                        className={`p-3.5 rounded-xl border-2 text-sm font-extrabold text-left transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {feedback && isGood && <CheckCircle className="h-4 w-4 text-white" />}
                        {feedback && isPicked && !isGood && <XCircle className="h-4 w-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-between gap-3 animate-fadeIn ${
                  feedback.isCorrect
                    ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
                    : 'bg-rose-100 text-rose-950 border-rose-400'
                }`}>
                  <div className="flex items-center gap-2">
                    {feedback.isCorrect ? <CheckCircle className="h-4 w-4 text-emerald-700 shrink-0" /> : <XCircle className="h-4 w-4 text-rose-700 shrink-0" />}
                    <span>{feedback.text}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-black shrink-0 hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Suivant</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Hint button */}
              {!feedback && (
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowTrick(!showTrick)}
                    className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span>{showTrick ? 'Cacher le moyen mnémotechnique' : '💡 Astuce pour retenir cette date'}</span>
                  </button>
                </div>
              )}

              {showTrick && !feedback && (
                <div className="p-3 rounded-xl bg-amber-100 text-amber-950 text-xs font-semibold border border-amber-300 animate-fadeIn">
                  💡 Moyen mnémotechnique : {currentQ.trick}
                </div>
              )}
            </div>
          ) : (
            /* Finished Card */
            <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 text-center space-y-3 animate-fadeIn">
              <Trophy className="h-10 w-10 text-amber-500 mx-auto animate-bounce" />
              <h3 className="text-lg font-black text-emerald-900">
                🎉 Défi Dates terminé ! Score : {score} / {shuffledQuestions.length} !
              </h3>
              <p className="text-xs sm:text-sm font-semibold max-w-lg mx-auto">
                {score >= 7
                  ? "Incroyable Mathieu ! Tu as les repères chronologiques d'un vrai champion d'Histoire."
                  : "Bon entraînement ! Révise les dates manquantes sur la frise chronologique pour avoir 100% au prochain essai."}
              </p>
              <button
                type="button"
                onClick={() => initGame(scopeFilter)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 mx-auto cursor-pointer shadow-md"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Rejouer le défi des dates</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TIMELINE VIEW */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-indigo-500/30 text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>
              Voici la frise chronologique officielle de 6ème ordonnée dans le temps, de la Préhistoire à la fin de l'Antiquité.
            </span>
          </div>

          <div className="relative border-l-4 border-amber-400 dark:border-purple-500 ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-6">
            {getFilteredDates(scopeFilter)
              .sort((a, b) => a.yearNumber - b.yearNumber)
              .map((d, dIdx) => (
                <div
                  key={d.id}
                  className="relative p-4 rounded-2xl border-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400 transition-all shadow-xs"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[27px] sm:-left-[35px] top-4 h-5 w-5 rounded-full bg-amber-500 border-4 border-white dark:border-slate-900 shadow-sm flex items-center justify-center" />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-1">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-black text-xs self-start">
                      {d.dateStr}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500">
                      {d.period}
                    </span>
                  </div>

                  <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white mt-1">
                    {d.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1">
                    {d.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span>Moyen mnémotechnique : {d.trick}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
