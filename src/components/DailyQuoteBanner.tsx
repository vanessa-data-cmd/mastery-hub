import React, { useState, useEffect } from 'react';
import { RefreshCw, Volume2, X, BookOpen } from 'lucide-react';

interface CultureQuote {
  quote: string;
  author: string;
  field: string;
}

const CULTURE_QUOTES: CultureQuote[] = [
  {
    quote: "Dans la vie, rien n'est à craindre, tout est à comprendre.",
    author: "Marie Curie",
    field: "Prix Nobel de physique et chimie"
  },
  {
    quote: "Je ne perds jamais. Soit je gagne, soit j'apprends.",
    author: "Nelson Mandela",
    field: "Prix Nobel de la Paix"
  },
  {
    quote: "Fais de ta vie un rêve, et d'un rêve, une réalité.",
    author: "Antoine de Saint-Exupéry",
    field: "Écrivain & Aviateur (Le Petit Prince)"
  },
  {
    quote: "L'imagination est plus importante que le savoir.",
    author: "Albert Einstein",
    field: "Physicien théoricien"
  },
  {
    quote: "Ce n'est pas parce que c'est difficile qu'on n'ose pas, c'est parce qu'on n'ose pas que c'est difficile.",
    author: "Sénèque",
    field: "Philosophe de l'Antiquité romaine"
  },
  {
    quote: "Rien ne sert de courir ; il faut partir à point.",
    author: "Jean de La Fontaine",
    field: "Poète & Fabuliste"
  },
  {
    quote: "Même la plus longue des marches commence toujours par un premier pas.",
    author: "Lao-Tseu",
    field: "Philosophe"
  },
  {
    quote: "La persévérance, c'est ce qui rend l'impossible possible.",
    author: "Léon Tolstoï",
    field: "Grand écrivain"
  },
  {
    quote: "C'est en forgeant qu'on devient forgeron.",
    author: "Aristote",
    field: "Philosophe grec"
  },
  {
    quote: "Celui qui déplace une montagne commence par déplacer de petites pierres.",
    author: "Confucius",
    field: "Penseur"
  }
];

interface DailyQuoteBannerProps {
  isBattleRoyale: boolean;
}

export const DailyQuoteBanner: React.FC<DailyQuoteBannerProps> = ({ isBattleRoyale }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const today = new Date().getDate();
    setCurrentIndex(today % CULTURE_QUOTES.length);
  }, []);

  const current = CULTURE_QUOTES[currentIndex];

  const handleNextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % CULTURE_QUOTES.length);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`Citation de ${current.author} : "${current.quote}"`);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Citation de culture générale" className={`max-w-5xl mx-auto rounded-xl border transition-all py-1.5 px-3 mb-3 text-xs flex items-center justify-between gap-2 shadow-2xs ${
      isBattleRoyale
        ? 'bg-slate-900/90 border-purple-500/30 text-purple-200'
        : 'bg-amber-50/70 border-amber-200/80 text-amber-950'
    }`}>
      {/* Quote line */}
      <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
        <span className="shrink-0 p-1 rounded-lg bg-amber-200/60 dark:bg-purple-900/60 text-amber-900 dark:text-purple-200">
          <BookOpen className="h-3 w-3" />
        </span>
        <span className="font-black text-[10px] uppercase tracking-wider shrink-0 text-amber-700 dark:text-purple-300">
          Culture :
        </span>
        <p className="truncate italic font-medium">
          « {current.quote} »
          <strong className="not-italic font-black ml-1.5 opacity-90 text-slate-900 dark:text-white">
            — {current.author}
          </strong>
          <span className="opacity-60 text-[10px] hidden md:inline ml-1 font-normal">
            ({current.field})
          </span>
        </p>
      </div>

      {/* Quick compact controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={handleSpeak}
          className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 cursor-pointer"
          title="Écouter la citation"
        >
          <Volume2 className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={handleNextQuote}
          className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 cursor-pointer"
          title="Citation suivante"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 opacity-50 hover:opacity-100 cursor-pointer text-slate-500"
          title="Fermer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
};
