import React, { useState, useRef } from 'react';
import {
  BookOpen,
  Sliders,
  Volume2,
  VolumeX,
  Palette,
  Maximize2,
  Eye,
  Info,
  ArrowDown,
  ArrowUp
} from 'lucide-react';

const SAMPLE_TEXT = `Le jeune chevalier s'avança lentement dans la clairière silencieuse.
Les branches des vieux chênes craquaient sous la brise du soir.
Son armure étincelait sous les derniers reflets dorés du soleil couchant.
Il cherchait la trace du messager qui avait mystérieusement disparu près du ruisseau.
Soudain, un léger froissement d'ailes attira son regard vers le sommet d'une tour en ruine.
Une chouette blanche le fixait de ses grands yeux ronds et perçants.
Elle semblait veiller sur un secret enfoui depuis des siècles dans ce vieux château.`;

export const ReadingRulerTab: React.FC = () => {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [activeLine, setActiveLine] = useState(0);
  const [rulerColor, setRulerColor] = useState<'yellow' | 'blue' | 'green' | 'purple'>('yellow');
  const [maskOpacity, setMaskOpacity] = useState(0.5);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const lines = text.split('\n').filter((l) => l.trim().length > 0);

  const colorStyles = {
    yellow: {
      activeBg: 'bg-amber-100 border-amber-400 text-amber-950',
      pill: 'bg-amber-300 border-amber-400 text-amber-900',
    },
    blue: {
      activeBg: 'bg-sky-100 border-sky-400 text-sky-950',
      pill: 'bg-sky-300 border-sky-400 text-sky-900',
    },
    green: {
      activeBg: 'bg-emerald-100 border-emerald-400 text-emerald-950',
      pill: 'bg-emerald-300 border-emerald-400 text-emerald-900',
    },
    purple: {
      activeBg: 'bg-purple-100 border-purple-400 text-purple-950',
      pill: 'bg-purple-300 border-purple-400 text-purple-900',
    },
  };

  const handleSpeakLine = (lineToRead: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(lineToRead);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const prevLine = () => setActiveLine((l) => Math.max(0, l - 1));
  const nextLine = () => setActiveLine((l) => Math.min(lines.length - 1, l + 1));

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Option 2 • Accessibilité Visuelle (Ergonomie UI)
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                La Règle de Lecture Numérique
              </h2>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
            <Info className="h-4 w-4 text-slate-500" />
            <span>Outil d'interface (pas besoin d'IA ici !)</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Pour un enfant dysorthographique/dyslexique, les yeux "sautent" souvent de ligne (saccades oculaires instables) ou subissent une fatigue visuelle face au blanc pur. 
          Cette règle permet d'isoler la ligne active, d'atténuer le reste du texte et d'écouter la lecture.
        </p>
      </div>

      {/* Control Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Color Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
            <Palette className="h-3.5 w-3.5" /> Couleur du guide :
          </span>
          {(['yellow', 'blue', 'green', 'purple'] as const).map((color) => (
            <button
              key={color}
              onClick={() => setRulerColor(color)}
              className={`h-7 w-7 rounded-full border-2 transition-all cursor-pointer ${
                color === 'yellow'
                  ? 'bg-amber-300'
                  : color === 'blue'
                  ? 'bg-sky-300'
                  : color === 'green'
                  ? 'bg-emerald-300'
                  : 'bg-purple-300'
              } ${rulerColor === color ? 'ring-2 ring-slate-900 scale-110' : 'opacity-70 hover:opacity-100'}`}
              title={`Couleur ${color}`}
            />
          ))}
        </div>

        {/* Mask Opacity Slider */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> Masque d'ombre :
          </span>
          <input
            type="range"
            min="0.1"
            max="0.8"
            step="0.1"
            value={maskOpacity}
            onChange={(e) => setMaskOpacity(parseFloat(e.target.value))}
            className="w-24 accent-amber-500"
          />
          <span className="text-xs font-semibold text-slate-500">{Math.round(maskOpacity * 100)}%</span>
        </div>

        {/* Line Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={prevLine}
            disabled={activeLine === 0}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 cursor-pointer"
            title="Ligne précédente (ou Flèche Haut)"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <span className="text-xs font-bold px-2 text-slate-700">
            Ligne {activeLine + 1} / {lines.length}
          </span>
          <button
            onClick={nextLine}
            disabled={activeLine === lines.length - 1}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 cursor-pointer"
            title="Ligne suivante (ou Flèche Bas)"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Reading Zone */}
      <div className="bg-[#fcfaf5] rounded-3xl p-6 sm:p-10 border-2 border-slate-200/90 shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-amber-200/60 text-xs text-slate-500 font-semibold">
          <span>📖 Zone de lecture guidée (clique sur une ligne ou utilise les flèches)</span>
          <button
            onClick={() => handleSpeakLine(lines[activeLine])}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            <span>Écouter la ligne active</span>
          </button>
        </div>

        <div className="space-y-2 py-4">
          {lines.map((line, idx) => {
            const isActive = idx === activeLine;
            return (
              <div
                key={idx}
                onClick={() => setActiveLine(idx)}
                style={{
                  opacity: isActive ? 1 : 1 - maskOpacity * 0.7,
                }}
                className={`p-3.5 rounded-2xl transition-all cursor-pointer select-text dys-text text-base sm:text-lg border-2 ${
                  isActive
                    ? `${colorStyles[rulerColor].activeBg} shadow-sm font-semibold scale-[1.01]`
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-bold shrink-0 ${
                        isActive
                          ? colorStyles[rulerColor].pill
                          : 'bg-slate-200/60 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span>{line}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Text Input to Read Any Homework */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3">
        <h4 className="font-bold text-slate-900 text-sm">
          Colle un texte de son devoir de Français ou d'Histoire à lire avec la règle :
        </h4>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setActiveLine(0);
          }}
          className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          placeholder="Tape ou colle ton texte ici..."
        />
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Astuce : chaque retour à la ligne crée une nouvelle étape de lecture guidée.</span>
          <button
            onClick={() => {
              setText(SAMPLE_TEXT);
              setActiveLine(0);
            }}
            className="text-amber-700 font-bold hover:underline cursor-pointer"
          >
            Réinitialiser au texte d'exemple
          </button>
        </div>
      </div>
    </div>
  );
};
