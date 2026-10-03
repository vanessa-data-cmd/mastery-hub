import React, { useState } from 'react';
import {
  Globe,
  Compass,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Trophy,
  Volume2,
  Printer,
  FileText,
  Eye,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveMapTabProps {
  isBattleRoyale: boolean;
  onWinBadge?: () => void;
}

type MapMode = 'oceans' | 'continents' | 'europe';
type MapStyle = 'bw' | 'color';

interface LandmarkTarget {
  id: string;
  name: string;
  category: MapMode;
  numLabel: string; // ex: ①, ②... comme dans les contrôles du collège
  x: number;
  y: number;
  hint: string;
  fact: string;
}

// 1. DATA: PLANISPHÈRE SCOLAIRE 6ème (Océans & Continents)
const WORLD_TARGETS: LandmarkTarget[] = [
  // 5 Océans
  {
    id: 'oc_atlantique',
    name: 'Océan Atlantique',
    category: 'oceans',
    numLabel: '①',
    x: 420,
    y: 260,
    hint: "Entre l'Europe/Afrique à l'est et les Amériques à l'ouest.",
    fact: "C'est l'océan qui borde la côte ouest de la France (Bretagne, Aquitaine) !"
  },
  {
    id: 'oc_pacifique',
    name: 'Océan Pacifique',
    category: 'oceans',
    numLabel: '②',
    x: 130,
    y: 250,
    hint: "Le plus immense océan de la planète Terre, à l'ouest de l'Amérique.",
    fact: "Il est tellement vaste qu'il couvre plus d'un tiers de la planète !"
  },
  {
    id: 'oc_indien',
    name: 'Océan Indien',
    category: 'oceans',
    numLabel: '③',
    x: 710,
    y: 340,
    hint: "Au sud de l'Inde, entre l'Afrique de l'Est et l'Australie.",
    fact: "Océan chaud qui abrite Madagascar et l'île de La Réunion."
  },
  {
    id: 'oc_arctique',
    name: 'Océan Arctique',
    category: 'oceans',
    numLabel: '④',
    x: 500,
    y: 40,
    hint: "Tout en haut du planisphère, au Pôle Nord !",
    fact: "En partie recouvert par la banquise blanche où vit l'ours polaire."
  },
  {
    id: 'oc_antarctique',
    name: 'Océan Austral (Antarctique)',
    category: 'oceans',
    numLabel: '⑤',
    x: 500,
    y: 460,
    hint: "Tout en bas du planisphère, entourant le continent de l'Antarctique.",
    fact: "Eaux très froides qui encerclent le continent glacé du Pôle Sud."
  },

  // 6 Continents
  {
    id: 'cont_afrique',
    name: 'Afrique',
    category: 'continents',
    numLabel: 'A',
    x: 515,
    y: 270,
    hint: "Le continent berceau de l'humanité, traversé au milieu par l'Équateur.",
    fact: "Deuxième plus grand continent du monde, où sont nés les premiers humains !"
  },
  {
    id: 'cont_europe',
    name: 'Europe',
    category: 'continents',
    numLabel: 'B',
    x: 495,
    y: 135,
    hint: "Notre continent, situé au nord de la Méditerranée et à l'ouest de l'Asie.",
    fact: "L'Europe regroupe la France, l'Italie, l'Espagne, l'Allemagne et plus de 45 pays."
  },
  {
    id: 'cont_asie',
    name: 'Asie',
    category: 'continents',
    numLabel: 'C',
    x: 740,
    y: 165,
    hint: "Le plus vaste et le plus peuplé de tous les continents (Chine, Inde).",
    fact: "Plus de la moitié de l'humanité y vit et on y trouve l'Himalaya !"
  },
  {
    id: 'cont_am_nord',
    name: 'Amérique du Nord',
    category: 'continents',
    numLabel: 'D',
    x: 230,
    y: 140,
    hint: "Au nord-ouest du planisphère (Canada, États-Unis, Mexique).",
    fact: "Bordée par l'océan Pacifique à l'ouest et l'océan Atlantique à l'est."
  },
  {
    id: 'cont_am_sud',
    name: 'Amérique du Sud',
    category: 'continents',
    numLabel: 'E',
    x: 320,
    y: 340,
    hint: "Au sud du continent américain, traversée par la forêt amazonienne.",
    fact: "Le Brésil, l'Argentine et le fleuve Amazone s'y trouvent !"
  },
  {
    id: 'cont_oceanie',
    name: 'Océanie',
    category: 'continents',
    numLabel: 'F',
    x: 840,
    y: 360,
    hint: "Le continent composé de l'Australie et des îles du Pacifique.",
    fact: "Le plus petit continent du monde, avec ses kangourous et sa barrière de corail."
  },
  {
    id: 'cont_antarctique',
    name: 'Antarctique',
    category: 'continents',
    numLabel: 'G',
    x: 500,
    y: 490,
    hint: "Le grand continent blanc tout en bas du globe au Pôle Sud.",
    fact: "Recouvert à 98% par une épaisse calotte de glace et sans habitants permanents."
  }
];

// 2. DATA: EUROPE SCOLAIRE (Zoom Fond de carte)
const EUROPE_TARGETS: LandmarkTarget[] = [
  {
    id: 'pays_italie',
    name: 'Italie',
    category: 'europe',
    numLabel: '①',
    x: 620,
    y: 470,
    hint: "La fameuse forme de BOTTE en Méditerranée avec la Sicile au bout du pied !",
    fact: "Capitale : Rome ! Berceau de l'Empire romain étudié en Histoire de 6ème."
  },
  {
    id: 'pays_france',
    name: 'France',
    category: 'europe',
    numLabel: '②',
    x: 420,
    y: 360,
    hint: "Notre pays ! En forme d'Hexagone, bordé par l'Atlantique et la Méditerranée.",
    fact: "Capitale : Paris ! Traversée par la Seine, la Loire, le Rhône et la Garonne."
  },
  {
    id: 'pays_espagne',
    name: 'Espagne',
    category: 'europe',
    numLabel: '③',
    x: 290,
    y: 530,
    hint: "Dans la péninsule ibérique, au sud-ouest de la France après les Pyrénées.",
    fact: "Capitale : Madrid ! Bordée par l'océan Atlantique et la mer Méditerranée."
  },
  {
    id: 'pays_allemagne',
    name: 'Allemagne',
    category: 'europe',
    numLabel: '④',
    x: 580,
    y: 270,
    hint: "Au cœur de l'Europe centrale, juste au nord-est de la France.",
    fact: "Capitale : Berlin ! C'est le pays le plus peuplé de l'Union européenne."
  },
  {
    id: 'pays_uk',
    name: 'Royaume-Uni',
    category: 'europe',
    numLabel: '⑤',
    x: 350,
    y: 200,
    hint: "La grande île au nord-ouest de la France, de l'autre côté de la Manche.",
    fact: "Capitale : Londres ! Composé de l'Angleterre, de l'Écosse, du Pays de Galles et de l'Irlande du Nord."
  },
  {
    id: 'pays_portugal',
    name: 'Portugal',
    category: 'europe',
    numLabel: '⑥',
    x: 180,
    y: 530,
    hint: "Tout à l'ouest de la péninsule ibérique, bordé par l'océan Atlantique.",
    fact: "Capitale : Lisbonne ! Le pays d'origine des grands navigateurs."
  },
  {
    id: 'pays_belgique',
    name: 'Belgique',
    category: 'europe',
    numLabel: '⑦',
    x: 470,
    y: 260,
    hint: "Le pays voisin situé immédiatement au nord-est de la France.",
    fact: "Capitale : Bruxelles ! Siège des grandes institutions européennes."
  },
  {
    id: 'pays_grece',
    name: 'Grèce',
    category: 'europe',
    numLabel: '⑧',
    x: 810,
    y: 580,
    hint: "Au sud-est de l'Europe dans la Méditerranée, avec le Péloponnèse.",
    fact: "Capitale : Athènes ! Berceau de la démocratie et des Jeux Olympiques antiques."
  }
];

export const InteractiveMapTab: React.FC<InteractiveMapTabProps> = ({ isBattleRoyale, onWinBadge }) => {
  const [activeCategory, setActiveCategory] = useState<MapMode>('oceans');
  const [mapStyle, setMapStyle] = useState<MapStyle>('bw'); // 'bw' (Noir & Blanc comme photocopie contrôle) vs 'color'
  const [shuffledTargets, setShuffledTargets] = useState<LandmarkTarget[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isExplorationMode, setIsExplorationMode] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<LandmarkTarget | null>(null);

  const initCategory = (cat: MapMode) => {
    setActiveCategory(cat);
    let pool: LandmarkTarget[] = [];
    if (cat === 'europe') {
      pool = [...EUROPE_TARGETS];
    } else {
      pool = WORLD_TARGETS.filter((t) => t.category === cat);
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setShuffledTargets(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setFoundIds([]);
    setFeedback(null);
    setShowHint(false);
    setSelectedTarget(null);
    setHoveredId(null);
  };

  React.useEffect(() => {
    initCategory(activeCategory);
  }, [activeCategory]);

  const currentTarget = shuffledTargets[currentIndex];
  const isFinished = shuffledTargets.length > 0 && foundIds.length === shuffledTargets.length;
  const isEurope = activeCategory === 'europe';
  const isBW = mapStyle === 'bw';

  const handleTargetClick = (target: LandmarkTarget) => {
    if (isExplorationMode) {
      setSelectedTarget(target);
      return;
    }

    if (isFinished || !currentTarget) return;

    if (target.id === currentTarget.id) {
      // Good answer
      const newScore = score + 1;
      setScore(newScore);
      setFoundIds((prev) => [...prev, target.id]);
      setFeedback({
        isCorrect: true,
        text: `🎯 EXCELLENT ! Tu as bien placé ${target.name} ! ${target.fact}`
      });
      setShowHint(false);

      if (newScore === shuffledTargets.length) {
        confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
        if (onWinBadge) onWinBadge();
      } else {
        setTimeout(() => {
          setFeedback(null);
          setCurrentIndex((prev) => prev + 1);
        }, 1700);
      }
    } else {
      // Wrong answer
      setFeedback({
        isCorrect: false,
        text: `Ici c'est ${target.name}. Cherche encore où se trouve : ${currentTarget.name} ! (${currentTarget.hint})`
      });
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

  const handlePrintMap = () => {
    window.print();
  };

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border-2 shadow-sm space-y-5 animate-fadeIn ${
      isBW
        ? 'bg-white border-slate-400 text-slate-900'
        : isBattleRoyale
          ? 'bg-slate-900 border-purple-500/50 text-white'
          : 'bg-white border-sky-300 text-slate-800'
    }`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-300">
        <div className="flex items-center gap-2.5">
          <div className={`h-10 w-10 rounded-2xl flex items-center justify-center text-white shadow-md ${
            isBW ? 'bg-slate-900' : 'bg-gradient-to-tr from-blue-600 to-indigo-600'
          }`}>
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>{isBW ? "📝 Fond de Carte Scolaire (Noir & Blanc comme en contrôle)" : "🗺️ Atlas Géographique Interactif"}</span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase border ${
                isBW ? 'bg-slate-100 text-slate-900 border-slate-400' : 'bg-blue-100 text-blue-900 border-blue-300'
              }`}>
                {isEurope ? "Zoom Europe" : "Planisphère Mondial"}
              </span>
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Le format exact des évaluations de 6ème : place chaque repère sur le fond de carte vierge !
            </p>
          </div>
        </div>

        {/* Style & Mode Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Style Toggle: Noir & Blanc (Contrôle) vs Couleur */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
            <button
              type="button"
              onClick={() => setMapStyle('bw')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isBW ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>📄 Noir & Blanc (Contrôle)</span>
            </button>
            <button
              type="button"
              onClick={() => setMapStyle('color')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                !isBW ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🎨 Atlas Couleur</span>
            </button>
          </div>

          {/* Mode Toggle: Défi vs Exploration */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
            <button
              type="button"
              onClick={() => setIsExplorationMode(false)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !isExplorationMode ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎯 Défi
            </button>
            <button
              type="button"
              onClick={() => setIsExplorationMode(true)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isExplorationMode ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🧭 Exploration
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills & Print Button */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase text-slate-700">
            Planisphère & Cartes :
          </span>

          <button
            type="button"
            onClick={() => initCategory('oceans')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'oceans'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <span>🌊</span>
            <span>Les 5 Océans</span>
          </button>

          <button
            type="button"
            onClick={() => initCategory('continents')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'continents'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <span>🌍</span>
            <span>Les 6 Continents</span>
          </button>

          <button
            type="button"
            onClick={() => initCategory('europe')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'europe'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <span>🇮🇹</span>
            <span>Zoom Pays d'Europe (Italie, France...)</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handlePrintMap}
          className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
          title="Imprimer le fond de carte pour s'entraîner au stylo"
        >
          <Printer className="h-3.5 w-3.5 text-slate-600" />
          <span>Imprimer le Fond de Carte vierge</span>
        </button>
      </div>

      {/* Target Question Box (Défi Mode) */}
      {!isExplorationMode && !isFinished && currentTarget && (
        <div className="p-4 rounded-2xl border-2 border-slate-400 bg-slate-50 text-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                Consigne d'évaluation ({currentIndex + 1} / {shuffledTargets.length}) :
              </span>
              <button
                type="button"
                onClick={() => speakText(`Place sur le planisphère : ${currentTarget.name}`)}
                className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                title="Écouter la consigne"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-base sm:text-lg font-black mt-0.5 flex items-center gap-2">
              <span>Clique sur le repère correspondant à :</span>
              <span className="px-3 py-0.5 rounded-lg bg-slate-900 text-white font-black">
                {currentTarget.name}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-amber-50 border border-slate-400 text-slate-900 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Lightbulb className="h-4 w-4 text-amber-600" />
              <span>{showHint ? 'Cacher indice' : '💡 Indice'}</span>
            </button>

            <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-mono font-black text-xs">
              Score : {score} / {shuffledTargets.length}
            </span>
          </div>
        </div>
      )}

      {/* Visual Hint Box */}
      {showHint && currentTarget && !isExplorationMode && (
        <div className="p-3.5 rounded-xl bg-amber-50 text-amber-950 text-xs font-bold border-2 border-amber-300 animate-fadeIn flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-600 shrink-0" />
          <span>Indice de repérage : {currentTarget.hint}</span>
        </div>
      )}

      {/* Finished Celebration */}
      {isFinished && !isExplorationMode && (
        <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 text-center space-y-3 animate-fadeIn">
          <Trophy className="h-10 w-10 text-amber-500 mx-auto animate-bounce" />
          <h3 className="text-lg sm:text-xl font-black text-emerald-900">
            🏆 EXCELLENT TRAVAIL ! Ton fond de carte est 100% rempli ({score} / {shuffledTargets.length}) !
          </h3>
          <p className="text-xs sm:text-sm font-semibold max-w-lg mx-auto">
            Tu as placé tous les repères demandés comme en véritable interrogation écrite de Géographie.
          </p>
          <button
            type="button"
            onClick={() => initCategory(activeCategory)}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs flex items-center gap-2 mx-auto cursor-pointer shadow-md"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Refaire ce contrôle blanc</span>
          </button>
        </div>
      )}

      {/* Exploration Info */}
      {isExplorationMode && selectedTarget && (
        <div className="p-4 rounded-2xl bg-slate-100 border-2 border-slate-300 space-y-1 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
              <span>📍 {selectedTarget.name}</span>
              <button
                type="button"
                onClick={() => speakText(`${selectedTarget.name}. ${selectedTarget.fact}`)}
                className="text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold uppercase">
              {selectedTarget.category}
            </span>
          </div>
          <p className="text-xs text-slate-700 font-medium">
            {selectedTarget.fact}
          </p>
        </div>
      )}

      {/* Instant Feedback Message */}
      {feedback && (
        <div className={`p-3.5 rounded-xl border-2 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs ${
          feedback.isCorrect
            ? 'bg-emerald-50 text-emerald-950 border-emerald-400'
            : 'bg-rose-50 text-rose-950 border-rose-400'
        }`}>
          {feedback.isCorrect ? <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" /> : <XCircle className="h-5 w-5 shrink-0 text-rose-600" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* MAP SVG CONTAINER (BLACK & WHITE SCHOOL FOND DE CARTE)   */}
      {/* ======================================================== */}
      <div className={`relative w-full rounded-2xl overflow-hidden border-2 shadow-inner print:border-none ${
        isBW ? 'bg-white border-slate-800' : 'bg-sky-950 border-slate-700'
      }`}>
        {isEurope ? (
          /* ======================================================== */
          /* EUROPE FOND DE CARTE (Zoom avec Botte d'Italie très nette)*/
          /* ======================================================== */
          <svg
            viewBox="0 0 1000 750"
            className="w-full h-auto select-none"
            style={{ maxHeight: '540px' }}
          >
            {/* Sea Background */}
            <rect width="1000" height="750" fill={isBW ? "#ffffff" : "#1e3a8a"} />

            {/* Subtle School Grid Lines */}
            <line x1="0" y1="200" x2="1000" y2="200" stroke={isBW ? "#cbd5e1" : "#38bdf8"} strokeWidth="0.8" strokeDasharray="4 6" />
            <line x1="0" y1="400" x2="1000" y2="400" stroke={isBW ? "#cbd5e1" : "#38bdf8"} strokeWidth="0.8" strokeDasharray="4 6" />
            <line x1="0" y1="600" x2="1000" y2="600" stroke={isBW ? "#cbd5e1" : "#38bdf8"} strokeWidth="0.8" strokeDasharray="4 6" />
            <line x1="300" y1="0" x2="300" y2="750" stroke={isBW ? "#cbd5e1" : "#38bdf8"} strokeWidth="0.8" strokeDasharray="4 6" />
            <line x1="600" y1="0" x2="600" y2="750" stroke={isBW ? "#cbd5e1" : "#38bdf8"} strokeWidth="0.8" strokeDasharray="4 6" />
            <line x1="900" y1="0" x2="900" y2="750" stroke={isBW ? "#cbd5e1" : "#38bdf8"} strokeWidth="0.8" strokeDasharray="4 6" />

            {/* Sea Titles */}
            <text x="60" y="420" fill={isBW ? "#64748b" : "#7dd3fc"} fontSize="13" fontWeight="bold" fontStyle="italic">OCÉAN ATLANTIQUE</text>
            <text x="560" y="690" fill={isBW ? "#64748b" : "#7dd3fc"} fontSize="14" fontWeight="bold" fontStyle="italic">MER MÉDITERRANÉE</text>
            <text x="440" y="140" fill={isBW ? "#64748b" : "#7dd3fc"} fontSize="11" fontWeight="bold" fontStyle="italic">MER DU NORD</text>
            <text x="290" y="270" fill={isBW ? "#64748b" : "#7dd3fc"} fontSize="11" fontWeight="bold" fontStyle="italic">LA MANCHE</text>

            {/* Realistic European Outline (Noir & Blanc ou Couleur) */}

            {/* United Kingdom */}
            <path
              d="M 330 110 Q 360 80 390 120 Q 370 170 410 220 Q 420 270 380 290 Q 330 290 310 270 Q 330 220 310 180 Z"
              fill={isBW ? (foundIds.includes('pays_uk') ? '#e2e8f0' : '#f8fafc') : (foundIds.includes('pays_uk') ? '#10b981' : '#64748b')}
              stroke="#0f172a"
              strokeWidth="2"
            />
            {/* Ireland */}
            <path
              d="M 230 190 Q 270 180 280 220 Q 270 260 230 260 Q 210 220 230 190 Z"
              fill={isBW ? '#f8fafc' : '#475569'}
              stroke="#0f172a"
              strokeWidth="1.5"
            />

            {/* France (Hexagone) */}
            <path
              d="M 330 330 Q 300 350 330 360 Q 360 380 360 440 Q 370 490 410 490 Q 480 490 500 460 Q 520 420 540 380 Q 530 320 480 300 Q 440 280 380 300 Q 360 280 330 330 Z"
              fill={isBW ? (foundIds.includes('pays_france') ? '#e2e8f0' : '#ffffff') : (foundIds.includes('pays_france') ? '#10b981' : '#2563eb')}
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            <ellipse cx="550" cy="520" rx="12" ry="22" fill={isBW ? '#ffffff' : '#2563eb'} stroke="#0f172a" strokeWidth="1.5" />

            {/* Germany */}
            <path
              d="M 500 230 Q 580 200 640 220 Q 660 280 670 330 Q 640 370 560 380 Q 520 370 510 320 Q 480 280 500 230 Z"
              fill={isBW ? (foundIds.includes('pays_allemagne') ? '#e2e8f0' : '#ffffff') : (foundIds.includes('pays_allemagne') ? '#10b981' : '#059669')}
              stroke="#0f172a"
              strokeWidth="2"
            />

            {/* Belgium */}
            <path
              d="M 450 270 Q 485 260 495 285 Q 470 305 450 295 Z"
              fill={isBW ? (foundIds.includes('pays_belgique') ? '#e2e8f0' : '#ffffff') : (foundIds.includes('pays_belgique') ? '#10b981' : '#d97706')}
              stroke="#0f172a"
              strokeWidth="1.5"
            />

            {/* Spain */}
            <path
              d="M 230 490 Q 370 490 410 495 Q 420 560 380 630 Q 310 660 260 650 Q 230 640 240 550 Q 240 490 230 490 Z"
              fill={isBW ? (foundIds.includes('pays_espagne') ? '#e2e8f0' : '#ffffff') : (foundIds.includes('pays_espagne') ? '#10b981' : '#ea580c')}
              stroke="#0f172a"
              strokeWidth="2.5"
            />

            {/* Portugal */}
            <path
              d="M 170 500 Q 220 500 220 630 Q 180 640 170 630 Q 150 560 170 500 Z"
              fill={isBW ? (foundIds.includes('pays_portugal') ? '#e2e8f0' : '#ffffff') : (foundIds.includes('pays_portugal') ? '#10b981' : '#65a30d')}
              stroke="#0f172a"
              strokeWidth="2"
            />

            {/* ITALY (LA BOTTE & SICILE - CONTOUR NOIR PARFAIT) */}
            <path
              d="M 520 410 Q 640 400 680 430 Q 670 480 730 540 Q 770 560 760 590 Q 720 590 700 560 Q 680 580 640 640 Q 610 630 630 580 Q 610 540 570 470 Q 520 440 520 410 Z"
              fill={isBW ? (foundIds.includes('pays_italie') ? '#cbd5e1' : '#ffffff') : (foundIds.includes('pays_italie') ? '#10b981' : '#dc2626')}
              stroke="#000000"
              strokeWidth="3"
            />
            {/* Sicile au bout du pied de la botte */}
            <polygon
              points="590,640 660,645 615,690"
              fill={isBW ? (foundIds.includes('pays_italie') ? '#cbd5e1' : '#ffffff') : (foundIds.includes('pays_italie') ? '#10b981' : '#dc2626')}
              stroke="#000000"
              strokeWidth="2.5"
            />
            {/* Sardaigne */}
            <path
              d="M 500 530 Q 530 530 525 610 Q 495 610 500 530 Z"
              fill={isBW ? '#ffffff' : '#dc2626'}
              stroke="#000000"
              strokeWidth="2"
            />

            {/* Greece */}
            <path
              d="M 760 520 Q 840 510 860 560 Q 830 620 810 650 Q 770 630 780 580 Q 740 560 760 520 Z"
              fill={isBW ? (foundIds.includes('pays_grece') ? '#e2e8f0' : '#ffffff') : (foundIds.includes('pays_grece') ? '#10b981' : '#0891b2')}
              stroke="#0f172a"
              strokeWidth="2"
            />
            <ellipse cx="840" cy="695" rx="36" ry="8" fill={isBW ? '#ffffff' : '#0891b2'} stroke="#0f172a" strokeWidth="1.5" />

            {/* INTERACTIVE PINS (Pastilles Numérotées ①, ②... comme dans les contrôles scolaires) */}
            {EUROPE_TARGETS.map((target) => {
              const isFound = foundIds.includes(target.id);
              const isCandidate = !isExplorationMode && currentTarget && target.id === currentTarget.id;
              const isHintPulsing = showHint && isCandidate;

              return (
                <g
                  key={target.id}
                  onClick={() => handleTargetClick(target)}
                  onMouseEnter={() => setHoveredId(target.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer transition-all hover:scale-115 origin-center"
                >
                  {isHintPulsing && (
                    <circle
                      cx={target.x}
                      cy={target.y}
                      r="32"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Marker Pin Circle */}
                  <circle
                    cx={target.x}
                    cy={target.y}
                    r="18"
                    fill={
                      isFound
                        ? '#10b981'
                        : isBW
                          ? '#0f172a'
                          : '#ffffff'
                    }
                    stroke={isBW ? '#ffffff' : '#0f172a'}
                    strokeWidth="2"
                    className="shadow-md"
                  />

                  {/* Number / Checkmark inside */}
                  <text
                    x={target.x}
                    y={target.y + 5}
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    {isFound ? '✓' : target.numLabel}
                  </text>

                  {/* Label écrit sur la carte une fois trouvé (comme l'écriture au stylo de l'élève) */}
                  {(isFound || isExplorationMode || hoveredId === target.id) && (
                    <g>
                      <rect
                        x={target.x - 42}
                        y={target.y + 20}
                        width="84"
                        height="18"
                        rx="4"
                        fill="#000000"
                        opacity="0.85"
                      />
                      <text
                        x={target.x}
                        y={target.y + 33}
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {target.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* School Map Frame & Rose des Vents */}
            <g transform="translate(80, 100)" opacity="0.85">
              <circle cx="0" cy="0" r="30" fill="none" stroke="#000000" strokeWidth="1.5" />
              <polygon points="0,-26 4,-4 -4,-4" fill="#000000" />
              <polygon points="0,26 4,4 -4,4" fill="#94a3b8" />
              <text x="0" y="-12" fill="#000000" fontSize="10" fontWeight="900" textAnchor="middle">N</text>
            </g>
            <text x="50" y="725" fill="#64748b" fontSize="10" fontWeight="bold">Échelle : 1 / 5 000 000</text>
          </svg>
        ) : (
          /* ======================================================== */
          /* PLANISPHERE SCOLAIRE (Noir & Blanc officiel 6ème)        */
          /* ======================================================== */
          <svg
            viewBox="0 0 1000 520"
            className="w-full h-auto select-none"
            style={{ maxHeight: '480px' }}
          >
            {/* Background Sea */}
            <rect width="1000" height="520" fill={isBW ? "#ffffff" : "#0f2b5c"} />

            {/* Equator & Reference Lines (Traits essentiels du cours de 6ème) */}
            <line x1="0" y1="260" x2="1000" y2="260" stroke={isBW ? "#000000" : "#38bdf8"} strokeDasharray="5 5" strokeWidth="1.5" opacity={isBW ? "0.7" : "0.5"} />
            <text x="15" y="254" fill={isBW ? "#000000" : "#7dd3fc"} fontSize="11" fontWeight="bold">Équateur (0° de latitude)</text>

            <line x1="0" y1="175" x2="1000" y2="175" stroke={isBW ? "#64748b" : "#38bdf8"} strokeDasharray="3 5" strokeWidth="1" opacity={isBW ? "0.6" : "0.3"} />
            <text x="15" y="170" fill={isBW ? "#475569" : "#7dd3fc"} fontSize="9">Tropique du Cancer (23°26' N)</text>

            <line x1="0" y1="345" x2="1000" y2="345" stroke={isBW ? "#64748b" : "#38bdf8"} strokeDasharray="3 5" strokeWidth="1" opacity={isBW ? "0.6" : "0.3"} />
            <text x="15" y="340" fill={isBW ? "#475569" : "#7dd3fc"} fontSize="9">Tropique du Capricorne (23°26' S)</text>

            <line x1="500" y1="0" x2="500" y2="520" stroke={isBW ? "#64748b" : "#38bdf8"} strokeDasharray="3 5" strokeWidth="1" opacity={isBW ? "0.5" : "0.3"} />
            <text x="506" y="20" fill={isBW ? "#475569" : "#7dd3fc"} fontSize="9">Méridien de Greenwich (0°)</text>

            {/* Realistic Continental Outlines in Black & White School Style */}
            {/* North America */}
            <path
              d="M 80 80 Q 200 40 280 80 Q 320 120 280 180 Q 240 220 210 240 Q 180 200 130 140 Z"
              fill={isBW ? (foundIds.includes('cont_am_nord') ? '#e2e8f0' : '#f1f5f9') : '#10b981'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* South America */}
            <path
              d="M 230 250 Q 340 250 370 330 Q 350 430 300 450 Q 260 410 230 320 Z"
              fill={isBW ? (foundIds.includes('cont_am_sud') ? '#e2e8f0' : '#f1f5f9') : '#059669'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Europe */}
            <path
              d="M 440 90 Q 540 80 560 140 Q 530 190 450 195 Q 420 140 440 90 Z"
              fill={isBW ? (foundIds.includes('cont_europe') ? '#e2e8f0' : '#f1f5f9') : '#f59e0b'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Africa */}
            <path
              d="M 440 200 Q 580 190 600 270 Q 560 380 500 390 Q 440 320 440 200 Z"
              fill={isBW ? (foundIds.includes('cont_afrique') ? '#e2e8f0' : '#f1f5f9') : '#eab308'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Madagascar */}
            <ellipse cx="630" cy="340" rx="10" ry="24" fill={isBW ? '#f1f5f9' : '#eab308'} stroke="#000000" strokeWidth="1.5" />
            {/* Asia */}
            <path
              d="M 560 80 Q 880 70 900 190 Q 840 280 720 280 Q 590 220 560 80 Z"
              fill={isBW ? (foundIds.includes('cont_asie') ? '#e2e8f0' : '#f1f5f9') : '#8b5cf6'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Australia / Oceania */}
            <path
              d="M 770 320 Q 890 310 900 390 Q 840 420 780 390 Z"
              fill={isBW ? (foundIds.includes('cont_oceanie') ? '#e2e8f0' : '#f1f5f9') : '#ec4899'}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Antarctica */}
            <path
              d="M 70 475 Q 500 460 930 475 L 900 505 L 100 505 Z"
              fill={isBW ? (foundIds.includes('cont_antarctique') ? '#e2e8f0' : '#f8fafc') : '#e2e8f0'}
              stroke="#000000"
              strokeWidth="2"
            />

            {/* Target Pins on World Map (Pastilles Numérotées d'évaluation) */}
            {WORLD_TARGETS.filter((t) => t.category === activeCategory).map((target) => {
              const isFound = foundIds.includes(target.id);
              const isCandidate = !isExplorationMode && currentTarget && target.id === currentTarget.id;
              const isHintPulsing = showHint && isCandidate;

              return (
                <g
                  key={target.id}
                  onClick={() => handleTargetClick(target)}
                  onMouseEnter={() => setHoveredId(target.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer transition-all hover:scale-115 origin-center"
                >
                  {isHintPulsing && (
                    <circle
                      cx={target.x}
                      cy={target.y}
                      r="28"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Marker Pin Bubble */}
                  <circle
                    cx={target.x}
                    cy={target.y}
                    r="16"
                    fill={
                      isFound
                        ? '#10b981'
                        : isBW
                          ? '#000000'
                          : '#0284c7'
                    }
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="shadow-md"
                  />

                  <text
                    x={target.x}
                    y={target.y + 4.5}
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    {isFound ? '✓' : target.numLabel}
                  </text>

                  {/* Name pill on map when placed */}
                  {(isFound || isExplorationMode || hoveredId === target.id) && (
                    <g>
                      <rect
                        x={target.x - 55}
                        y={target.y + 20}
                        width="110"
                        height="20"
                        rx="6"
                        fill="#000000"
                        opacity="0.85"
                      />
                      <text
                        x={target.x}
                        y={target.y + 34}
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {target.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Target Chips Quick List / Nomenclature */}
      <div className="pt-2 border-t border-slate-300 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-slate-700 block">
            Nomenclature à connaître ({shuffledTargets.length} repères) :
          </span>
          <span className="text-[11px] font-semibold text-slate-500">
            Clique sur un numéro de la carte pour placer son nom !
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {shuffledTargets.map((target) => {
            const isFound = foundIds.includes(target.id);
            return (
              <button
                key={target.id}
                type="button"
                onClick={() => handleTargetClick(target)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isFound
                    ? 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 hover:border-slate-500'
                }`}
              >
                <span className="font-mono text-xs font-black">{isFound ? '✅' : target.numLabel}</span>
                <span>{target.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
