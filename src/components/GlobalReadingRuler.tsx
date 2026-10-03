import React, { useState, useEffect } from 'react';
import { Glasses, X, Plus, Minus, Palette } from 'lucide-react';

interface GlobalReadingRulerProps {
  isActive: boolean;
  onClose: () => void;
}

export const GlobalReadingRuler: React.FC<GlobalReadingRulerProps> = ({ isActive, onClose }) => {
  const [mouseY, setMouseY] = useState(250);
  const [rulerHeight, setRulerHeight] = useState(48); // height in px
  const [rulerColor, setRulerColor] = useState<'yellow' | 'blue' | 'green'>('yellow');
  const [maskDarkness, setMaskDarkness] = useState(0.35); // 35% opacity

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        setMouseY(e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isActive]);

  if (!isActive) return null;

  const topBoundary = Math.max(0, mouseY - rulerHeight / 2);
  const bottomBoundary = mouseY + rulerHeight / 2;

  const colorThemes = {
    yellow: {
      band: 'bg-amber-300/25 border-y-2 border-amber-400 shadow-sm shadow-amber-400/20',
      line: 'border-amber-500/60',
      badge: 'bg-amber-400 text-amber-950',
    },
    blue: {
      band: 'bg-sky-300/25 border-y-2 border-sky-400 shadow-sm shadow-sky-400/20',
      line: 'border-sky-500/60',
      badge: 'bg-sky-400 text-sky-950',
    },
    green: {
      band: 'bg-emerald-300/25 border-y-2 border-emerald-400 shadow-sm shadow-emerald-400/20',
      line: 'border-emerald-500/60',
      badge: 'bg-emerald-400 text-emerald-950',
    },
  };

  const currentTheme = colorThemes[rulerColor];

  return (
    <>
      {/* Upper Mask (dimmed area above current line) */}
      <div
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none transition-all duration-75"
        style={{
          height: `${topBoundary}px`,
          backgroundColor: `rgba(15, 23, 42, ${maskDarkness})`,
        }}
      />

      {/* Reading Band (Clear & Tinted line guide following mouse) */}
      <div
        className={`fixed left-0 right-0 z-40 pointer-events-none transition-all duration-75 ${currentTheme.band}`}
        style={{
          top: `${topBoundary}px`,
          height: `${rulerHeight}px`,
        }}
      >
        {/* Subtle center hairline guide */}
        <div className={`w-full h-1/2 border-b border-dashed ${currentTheme.line} opacity-30`} />
      </div>

      {/* Lower Mask (dimmed area below current line) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none transition-all duration-75"
        style={{
          top: `${bottomBoundary}px`,
          backgroundColor: `rgba(15, 23, 42, ${maskDarkness})`,
        }}
      />

      {/* Floating Control Pill (bottom right, interactive) */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 text-white border border-slate-700 shadow-2xl backdrop-blur-md text-xs font-bold animate-fadeIn">
        <div className="flex items-center gap-1.5 pl-1.5 pr-2">
          <Glasses className="h-4 w-4 text-amber-400" />
          <span className="hidden sm:inline">Règle de lecture</span>
        </div>

        {/* Color buttons */}
        <div className="flex items-center gap-1 border-x border-slate-700 px-2">
          <button
            type="button"
            onClick={() => setRulerColor('yellow')}
            className={`w-5 h-5 rounded-full bg-amber-400 cursor-pointer transition-transform ${
              rulerColor === 'yellow' ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
            }`}
            title="Surlignage jaune pastel"
          />
          <button
            type="button"
            onClick={() => setRulerColor('blue')}
            className={`w-5 h-5 rounded-full bg-sky-400 cursor-pointer transition-transform ${
              rulerColor === 'blue' ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
            }`}
            title="Surlignage bleu ciel"
          />
          <button
            type="button"
            onClick={() => setRulerColor('green')}
            className={`w-5 h-5 rounded-full bg-emerald-400 cursor-pointer transition-transform ${
              rulerColor === 'green' ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
            }`}
            title="Surlignage vert menthe"
          />
        </div>

        {/* Height adjustment */}
        <div className="flex items-center gap-1 border-r border-slate-700 pr-2">
          <button
            type="button"
            onClick={() => setRulerHeight((h) => Math.max(32, h - 8))}
            className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            title="Rétrécir la hauteur de la règle (1 ligne)"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="text-[10px] text-slate-400 min-w-7 text-center">{rulerHeight}px</span>
          <button
            type="button"
            onClick={() => setRulerHeight((h) => Math.min(96, h + 8))}
            className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            title="Agrandir la hauteur de la règle (2 lignes)"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
          title="Désactiver la règle"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </>
  );
};
