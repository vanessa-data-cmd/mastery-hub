import React, { useState } from 'react';
import {
  Compass,
  Lightbulb,
  Search,
  BookOpen,
  Volume2,
  VolumeX,
  CheckCircle,
  HelpCircle,
  Send,
  Loader2,
  FileText
} from 'lucide-react';
import { TEACHER_VERBS_DICTIONARY, METHOD_GUIDES } from '../data/methodologyData';

interface MethodologyTabProps {
  isBattleRoyale: boolean;
  onSelectSubject?: (sub: string) => void;
}

export const MethodologyTab: React.FC<MethodologyTabProps> = ({ isBattleRoyale }) => {
  const [activeSubTab, setActiveSubTab] = useState<'decoder' | 'verbs' | 'resume' | 'guides'>('decoder');
  const [instructionInput, setInstructionInput] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodedResult, setDecodedResult] = useState<any | null>(null);

  // Resume assistant state
  const [resumeText, setResumeText] = useState('');
  const [childSummary, setChildSummary] = useState('');
  const [isReadingResume, setIsReadingResume] = useState(false);

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isReadingResume) {
      window.speechSynthesis.cancel();
      setIsReadingResume(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.92;
    utterance.onend = () => setIsReadingResume(false);
    utterance.onerror = () => setIsReadingResume(false);
    setIsReadingResume(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleDecodeInstruction = async () => {
    if (!instructionInput.trim()) return;
    setIsDecoding(true);
    try {
      const res = await fetch('/api/decode-instruction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instructionText: instructionInput })
      });
      const data = await res.json();
      if (data.success && data.decoded) {
        setDecodedResult(data.decoded);
      }
    } catch (err) {
      console.error('Error decoding instruction:', err);
    } finally {
      setIsDecoding(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Intro Header */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm ${
        isBattleRoyale
          ? 'bg-slate-900 border-purple-500/40 text-white'
          : 'bg-white border-indigo-100 text-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-black uppercase tracking-wider mb-2">
              <Compass className="h-3.5 w-3.5" />
              Atelier Méthodologie 6ème
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Apprendre à décoder les consignes & maîtriser les méthodes
            </h2>
            <p className="text-xs sm:text-sm opacity-80 mt-1 max-w-2xl leading-relaxed">
              En 6ème, la majorité des points perdus viennent d'une consigne mal comprise.
              Ici, apprends à déjouer les pièges des profs et utilise les super-méthodes de Mathieu !
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex overflow-x-auto gap-2 mt-5 pt-3 border-t border-slate-200/40 text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveSubTab('decoder')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'decoder'
                ? isBattleRoyale ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white shadow-xs'
                : isBattleRoyale ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🔍 Détecteur de Consigne
          </button>
          <button
            onClick={() => setActiveSubTab('verbs')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'verbs'
                ? isBattleRoyale ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white shadow-xs'
                : isBattleRoyale ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
            }`}
          >
            📖 Le Dico des Verbes du Prof
          </button>
          <button
            onClick={() => setActiveSubTab('resume')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'resume'
                ? isBattleRoyale ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white shadow-xs'
                : isBattleRoyale ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
            }`}
          >
            📝 Le Protocole Résumé Mathieu
          </button>
          <button
            onClick={() => setActiveSubTab('guides')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'guides'
                ? isBattleRoyale ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white shadow-xs'
                : isBattleRoyale ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🧭 Frises, Cartes & SVT
          </button>
        </div>
      </div>

      {/* Subtab 1: Interactive Instruction Decoder */}
      {activeSubTab === 'decoder' && (
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-5 ${
          isBattleRoyale ? 'bg-slate-900 border-purple-500/40 text-white' : 'bg-white border-slate-200'
        }`}>
          <div>
            <h3 className="text-lg font-black flex items-center gap-2">
              <Search className="h-5 w-5 text-indigo-500" />
              <span>Colle ou tape la consigne de ton contrôle / exercice</span>
            </h3>
            <p className="text-xs opacity-75 mt-1">
              L'IA va isoler le verbe d'action, surligner les mots-pièges et te traduire exactement ce que le professeur attend sur ta copie.
            </p>
          </div>

          <div className="space-y-3">
            <textarea
              rows={3}
              value={instructionInput}
              onChange={(e) => setInstructionInput(e.target.value)}
              placeholder="Ex : En vous appuyant sur le document 2, justifiez pourquoi les premiers humains étaient nomades..."
              className={`w-full p-4 rounded-2xl border text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 ${
                isBattleRoyale ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs font-bold opacity-60 self-center">Exemples fréquents :</span>
              {[
                "Justifiez votre réponse en citant le texte",
                "À l'aide du document 1, déduisez les conséquences du froid",
                "Comparez les métaux et le bois face à la chaleur"
              ].map((sample, i) => (
                <button
                  key={i}
                  onClick={() => setInstructionInput(sample)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border cursor-pointer ${
                    isBattleRoyale ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {sample}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={handleDecodeInstruction}
                disabled={isDecoding || !instructionInput.trim()}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                {isDecoding ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Décodage en cours...</span>
                  </>
                ) : (
                  <>
                    <Compass className="h-4 w-4" />
                    <span>Traduire en Français Simple</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Decoded Result */}
          {decodedResult && (
            <div className={`p-5 rounded-2xl border-2 space-y-4 animate-fadeIn ${
              isBattleRoyale ? 'bg-slate-800/80 border-purple-500/60' : 'bg-indigo-50/80 border-indigo-200'
            }`}>
              <div className="flex items-center justify-between border-b border-indigo-200/50 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                  🎯 Résultat du Décodage
                </span>
                <button
                  onClick={() =>
                    handleSpeak(
                      `Action : ${decodedResult.actionVerb}. Ce que le prof attend : ${decodedResult.plainFrenchTranslation}. Conseil : ${decodedResult.methodTip}`
                    )
                  }
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Écouter l'explication</span>
                </button>
              </div>

              {/* Surlignage intelligent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-900 border border-blue-200">
                  <span className="font-extrabold block mb-0.5">🔵 Ce que tu dois FAIRE (Action) :</span>
                  <span className="text-sm font-black">{decodedResult.actionVerb}</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-100 text-amber-900 border border-amber-200">
                  <span className="font-extrabold block mb-0.5">⚠️ Mots-Pièges & Conditions :</span>
                  <span className="font-bold">
                    {decodedResult.trapWords && decodedResult.trapWords.length > 0
                      ? decodedResult.trapWords.join(', ')
                      : 'Aucun piège sournois détecté'}
                  </span>
                </div>
              </div>

              {/* Traduction limpide */}
              <div className="p-4 rounded-xl bg-white border border-indigo-200 text-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-indigo-700 block">
                  💡 Traduction en langage clair pour Mathieu :
                </span>
                <p className="text-base font-bold text-indigo-950 leading-relaxed dys-text">
                  "{decodedResult.plainFrenchTranslation}"
                </p>
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <strong className="text-slate-800">Ce que le prof veut voir : </strong>
                  {decodedResult.whatTeacherWants}
                </div>
                <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Astuce réussite : {decodedResult.methodTip}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Dico des Verbes du Prof */}
      {activeSubTab === 'verbs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEACHER_VERBS_DICTIONARY.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border shadow-xs space-y-3 ${
                isBattleRoyale ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-black px-3 py-1 rounded-xl bg-indigo-100 text-indigo-900">
                  {item.verb}
                </span>
                <button
                  onClick={() =>
                    handleSpeak(
                      `${item.verb}. Piège : ${item.trap}. Traduction : ${item.plainTranslation}`
                    )
                  }
                  className="p-1 hover:opacity-80 text-slate-500 cursor-pointer"
                  title="Écouter"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                ⚠️ Le piège : {item.trap}
              </div>

              <div className="text-xs sm:text-sm font-semibold leading-relaxed">
                <span className="font-extrabold text-indigo-700 block mb-0.5">En clair :</span>
                {item.plainTranslation}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-600 font-mono border border-slate-200">
                {item.exampleCopy}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtab 3: Le Protocole Résumé Mathieu */}
      {activeSubTab === 'resume' && (
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
          isBattleRoyale ? 'bg-slate-900 border-purple-500/40 text-white' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase mb-2">
              ⭐ Méthode Validée par Mathieu
            </div>
            <h3 className="text-xl font-black">
              Le Protocole Résumé : Écouter l'oral, isoler les 3 piliers, rédiger sans stress
            </h3>
            <p className="text-xs sm:text-sm opacity-80 mt-1">
              Quand un texte est trop long et fatigant à lire pour les yeux, applique les 4 étapes magiques ci-dessous :
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {METHOD_GUIDES[0].steps.map((s, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border space-y-2 flex flex-col justify-between ${
                  isBattleRoyale ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                  #{s.num}
                </div>
                <h4 className="font-extrabold text-sm leading-snug">{s.title}</h4>
                <p className="text-xs opacity-75 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Workshop Area */}
          <div className={`p-5 rounded-2xl border-2 space-y-4 ${
            isBattleRoyale ? 'bg-slate-800 border-purple-500/50' : 'bg-amber-50/70 border-amber-200'
          }`}>
            <h4 className="font-extrabold text-sm text-amber-950 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-600" />
              <span>Entraîne-toi sur un texte long ici</span>
            </h4>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                1. Colle ici le texte du livre ou de la leçon :
              </label>
              <textarea
                rows={4}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Colle ton texte de français ou d'histoire ici..."
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900"
              />
              {resumeText && (
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => handleSpeak(resumeText)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    {isReadingResume ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    <span>{isReadingResume ? 'Arrêter la lecture' : 'Écouter le texte à l\'oral (Zéro fatigue)'}</span>
                  </button>
                  <span className="text-xs text-slate-500">
                    Ferme les yeux et écoute simplement pour comprendre l'histoire !
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-amber-200/60">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                2. Rédige ton résumé en 3 phrases courtes avec TES propres mots :
              </label>
              <textarea
                rows={3}
                value={childSummary}
                onChange={(e) => setChildSummary(e.target.value)}
                placeholder="Rédige ici ton résumé (ne t'inquiète pas des fautes, concentre-toi sur l'essentiel !)..."
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 dys-text"
              />
              {childSummary && (
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleSpeak(childSummary)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Réécouter mon résumé pour vérifier qu'il sonne bien</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Frises, Cartes & SVT Guides */}
      {activeSubTab === 'guides' && (
        <div className="space-y-4">
          {METHOD_GUIDES.slice(1).map((guide) => (
            <div
              key={guide.id}
              className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
                isBattleRoyale ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-extrabold uppercase">
                    {guide.badge}
                  </span>
                  <h3 className="text-lg font-black">{guide.title}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {guide.steps.map((st, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border space-y-1.5 ${
                      isBattleRoyale ? 'bg-slate-800/70 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-xs font-black text-indigo-600 uppercase">
                      Étape {st.num}
                    </div>
                    <h4 className="font-bold text-sm leading-snug">{st.title}</h4>
                    <p className="text-xs opacity-75 leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
