import { QuizQuestion } from '../types';

export const DAYS_EN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export const DAYS_FR = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'] as const;

export const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
] as const;
export const MONTHS_FR = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
] as const;

export function getOrdinal(day: number): string {
  if (day === 11 || day === 12 || day === 13) return `${day}th`;
  const lastDigit = day % 10;
  if (lastDigit === 1) return `${day}st`;
  if (lastDigit === 2) return `${day}nd`;
  if (lastDigit === 3) return `${day}rd`;
  return `${day}th`;
}

export function getWrongOrdinal(day: number): string {
  if (day === 1 || day === 21 || day === 31) return `${day}th`;
  if (day === 2 || day === 22) return `${day}th`;
  if (day === 3 || day === 23) return `${day}th`;
  if (day === 11) return '11st';
  if (day === 12) return '12nd';
  if (day === 13) return '13rd';
  return `${day}st`;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem<T>(arr: readonly T[]): { item: T; index: number } {
  const index = Math.floor(Math.random() * arr.length);
  return { item: arr[index], index };
}

function shuffleArray<T>(arr: T[]): T[] {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

export interface GeneratedDate {
  dayEn: string;
  dayFr: string;
  monthEn: string;
  monthFr: string;
  dayNum: number;
  ordinal: string;
  wrongOrdinal: string;
  fullDateUk: string;
  fullDateUs: string;
}

export function createRandomDate(): GeneratedDate {
  const dayIdx = getRandomInt(0, DAYS_EN.length - 1);
  const monthIdx = getRandomInt(0, MONTHS_EN.length - 1);
  const dayNum = getRandomInt(1, 31);

  const dayEn = DAYS_EN[dayIdx];
  const dayFr = DAYS_FR[dayIdx];
  const monthEn = MONTHS_EN[monthIdx];
  const monthFr = MONTHS_FR[monthIdx];
  const ordinal = getOrdinal(dayNum);
  const wrongOrdinal = getWrongOrdinal(dayNum);

  return {
    dayEn,
    dayFr,
    monthEn,
    monthFr,
    dayNum,
    ordinal,
    wrongOrdinal,
    fullDateUk: `${dayEn} the ${ordinal} of ${monthEn}`,
    fullDateUs: `${dayEn}, ${monthEn} ${ordinal}`
  };
}

/**
 * 1. Question en Briques (Scaffolding Dys - étiquettes cliquables ordonnables)
 */
export function generateBriquesQuestion(id: string, format: 'UK' | 'US'): QuizQuestion {
  const d = createRandomDate();

  if (format === 'UK') {
    const correctBricks = [d.dayEn, 'the', d.ordinal, 'of', d.monthEn];
    // Intrus pédagogiques ciblés (prépositions fausses, mauvais ordinal, mot français)
    const distractors = ['in', 'on', d.wrongOrdinal, d.monthFr.charAt(0).toUpperCase() + d.monthFr.slice(1)];
    const bricksBank = shuffleArray([...correctBricks, ...distractors]);

    return {
      id,
      chapterId: 'ang_ch3',
      type: 'briques',
      subject: 'anglais',
      level: 2,
      titre: `🇬🇧 Briques UK • Clique sur les étiquettes pour composer la date britannique : '${d.dayFr} ${d.dayNum} ${d.monthFr}'`,
      consigneFr: `Mets les briques dans le bon ordre au format UK complet : ${d.dayFr} ${d.dayNum} ${d.monthFr}`,
      points: 2,
      bricksBank,
      correctBricks,
      explanation: `Au format britannique complet, la structure est : ${d.dayEn} THE ${d.ordinal} OF ${d.monthEn}. Les majuscules au jour et au mois sont indispensables !`,
      hint: `Ordre UK : Jour (${d.dayEn}) ➡️ the ➡️ ordinal (${d.ordinal}) ➡️ of ➡️ mois (${d.monthEn}).`
    };
  } else {
    // US Format: Day, Month Ordinal
    const correctBricks = [`${d.dayEn},`, d.monthEn, d.ordinal];
    const distractors = ['the', 'of', d.wrongOrdinal, d.dayEn]; // intrus sans virgule et the/of
    const bricksBank = shuffleArray([...correctBricks, ...distractors]);

    return {
      id,
      chapterId: 'ang_ch3',
      type: 'briques',
      subject: 'anglais',
      level: 2,
      titre: `🇺🇸 Briques US • Clique sur les étiquettes pour composer la date américaine avec virgule : '${d.dayFr} ${d.dayNum} ${d.monthFr}'`,
      consigneFr: `Mets les briques dans le bon ordre au format US : ${d.dayFr} ${d.dayNum} ${d.monthFr}`,
      points: 2,
      bricksBank,
      correctBricks,
      explanation: `Au format américain (US), le mois se place AVANT le jour et on met une virgule obligatoire après le jour de la semaine : ${d.dayEn}, ${d.monthEn} ${d.ordinal}.`,
      hint: `Ordre US : Jour avec virgule (${d.dayEn},) ➡️ Mois (${d.monthEn}) ➡️ Ordinal (${d.ordinal}).`
    };
  }
}

/**
 * 2. Question en Saisie clavier libre (3 UK + 3 US en DS de 20 questions)
 */
export function generateSaisieClavierQuestion(id: string, format: 'UK' | 'US'): QuizQuestion {
  const d = createRandomDate();

  if (format === 'UK') {
    return {
      id,
      chapterId: 'ang_ch3',
      type: 'libre',
      subject: 'anglais',
      level: 3,
      titre: `🇬🇧 Saisie Clavier UK • Écris la date complète au format britannique : '${d.dayFr} ${d.dayNum} ${d.monthFr}'`,
      consigneFr: `Tape au clavier la date complète en anglais UK : ${d.dayFr} ${d.dayNum} ${d.monthFr}`,
      points: 3,
      correctAnswer: d.fullDateUk,
      keywords: [d.dayEn, 'the', d.ordinal, 'of', d.monthEn],
      criteriaChecklist: [
        { label: `1. Majuscules obligatoires (${d.dayEn}, ${d.monthEn}) (+1 pt)`, keywords: [d.dayEn, d.monthEn] },
        { label: "2. Mots de liaison 'the' et 'of' présents (+1 pt)", keywords: ['the', 'of'] },
        { label: `3. Nombre ordinal exact (${d.ordinal}) (+1 pt)`, keywords: [d.ordinal] }
      ],
      explanation: `Format UK attendu : "${d.fullDateUk}". N'oublie ni la majuscule à ${d.dayEn} et ${d.monthEn}, ni 'the' et 'of' !`,
      hint: `Formule : [Jour] the [Ordinal] of [Mois]. Ex: ${d.dayEn} the ${d.ordinal} of ${d.monthEn}.`
    };
  } else {
    return {
      id,
      chapterId: 'ang_ch3',
      type: 'libre',
      subject: 'anglais',
      level: 3,
      titre: `🇺🇸 Saisie Clavier US • Écris la date complète au format américain avec la virgule : '${d.dayFr} ${d.dayNum} ${d.monthFr}'`,
      consigneFr: `Tape au clavier la date complète en anglais US : ${d.dayFr} ${d.dayNum} ${d.monthFr}`,
      points: 3,
      correctAnswer: d.fullDateUs,
      keywords: [d.dayEn, d.monthEn, d.ordinal, ','],
      criteriaChecklist: [
        { label: `1. Majuscules obligatoires (${d.dayEn}, ${d.monthEn}) (+1 pt)`, keywords: [d.dayEn, d.monthEn] },
        { label: `2. Virgule obligatoire après le jour (${d.dayEn},) (+1 pt)`, keywords: [',', `${d.dayEn},`] },
        { label: `3. Ordre US : Mois avant le jour (${d.monthEn} ${d.ordinal}) (+1 pt)`, keywords: [d.monthEn, d.ordinal] }
      ],
      explanation: `Format US attendu : "${d.fullDateUs}". Pense bien à la virgule après ${d.dayEn} et au mois avant le jour !`,
      hint: `Formule US : [Jour], [Mois] [Ordinal]. Ex: ${d.dayEn}, ${d.monthEn} ${d.ordinal}.`
    };
  }
}

/**
 * 3. Question "Identify the mistake" (Les 4 pièges typiques du contrôle)
 */
export function generateMistakeQuestion(id: string, mistakeTypeIndex: 0 | 1 | 2 | 3): QuizQuestion {
  const d = createRandomDate();

  switch (mistakeTypeIndex) {
    case 0: {
      // Oubli de la majuscule au jour ou au mois
      const lowerDay = d.dayEn.toLowerCase();
      const lowerMonth = d.monthEn.toLowerCase();
      const sentence = `We have English on ${lowerDay} the ${d.ordinal} of ${lowerMonth}.`;
      return {
        id,
        chapterId: 'ang_ch3',
        type: 'qcm',
        subject: 'anglais',
        level: 2,
        titre: `🔍 Identify the mistake • Dans la phrase : "${sentence}", quelle est la faute majeure ?`,
        consigneFr: `Trouve l'erreur dans : "${sentence}"`,
        points: 2,
        options: [
          `Oubli des majuscules : '${lowerDay}' et '${lowerMonth}' doivent obligatoirement s'écrire '${d.dayEn}' et '${d.monthEn}'`,
          `Le suffixe '${d.ordinal}' est faux`,
          "La préposition 'on' est fausse",
          "Il n'y a aucune faute"
        ],
        correctIndex: 0,
        explanation: `En anglais, les jours (${d.dayEn}) et les mois (${d.monthEn}) prennent TOUJOURS une majuscule obligatoire !`,
        hint: `Regarde la première lettre de '${lowerDay}' et '${lowerMonth}'.`
      };
    }

    case 1: {
      // Mot français glissé par erreur
      const frenchMonth = d.monthFr.charAt(0).toUpperCase() + d.monthFr.slice(1);
      const sentence = `Today is ${d.dayEn} the ${d.ordinal} of ${frenchMonth}.`;
      return {
        id,
        chapterId: 'ang_ch3',
        type: 'qcm',
        subject: 'anglais',
        level: 2,
        titre: `🔍 Identify the mistake • Dans la phrase : "${sentence}", quel est le piège glissé par inattention ?`,
        consigneFr: `Trouve l'erreur dans : "${sentence}"`,
        points: 2,
        options: [
          `Le mot français '${frenchMonth}' a été écrit au lieu du mot anglais '${d.monthEn}'`,
          `Le jour '${d.dayEn}' est mal orthographié`,
          `Le nombre ordinal '${d.ordinal}' est faux`,
          "Il fallait mettre une virgule"
        ],
        correctIndex: 0,
        explanation: `Attention à ne pas glisser de mot français ! Le mois doit s'écrire en anglais : '${d.monthEn}' (sans accent et avec l'orthographe anglaise).`,
        hint: `Vérifie la langue du mois '${frenchMonth}'.`
      };
    }

    case 2: {
      // Oubli de 'the' et 'of' dans la date UK
      const sentence = `Today is ${d.dayEn} ${d.ordinal} ${d.monthEn}.`;
      return {
        id,
        chapterId: 'ang_ch3',
        type: 'qcm',
        subject: 'anglais',
        level: 2,
        titre: `🔍 Identify the mistake • Dans le contrôle UK : "${sentence}", que manque-t-il obligatoirement selon la consigne du professeur ?`,
        consigneFr: `Trouve ce qui manque dans la date UK : "${sentence}"`,
        points: 2,
        options: [
          `Il manque 'the' devant le numéro et 'of' devant le mois : '${d.dayEn} THE ${d.ordinal} OF ${d.monthEn}'`,
          `Il manque une virgule après ${d.dayEn} comme aux USA`,
          `Le jour prend un 's' final`,
          `Le mois doit être placé avant le jour`
        ],
        correctIndex: 0,
        explanation: `Au format britannique complet exigé au collège, 'the' et 'of' sont obligatoires : "${d.dayEn} the ${d.ordinal} of ${d.monthEn}".`,
        hint: "Pense aux 2 petits mots clés du format UK : 'the' et 'of'."
      };
    }

    case 3:
    default: {
      // Mauvais suffixe ordinal (ex: 1th au lieu de 1st, 22th au lieu de 22nd...)
      const sentence = `My birthday is on ${d.dayEn}, ${d.monthEn} ${d.wrongOrdinal}.`;
      return {
        id,
        chapterId: 'ang_ch3',
        type: 'qcm',
        subject: 'anglais',
        level: 2,
        titre: `🔍 Identify the mistake • Dans : "${sentence}", quelle est l'erreur d'abréviation ordinale ?`,
        consigneFr: `Trouve la faute dans : "${sentence}"`,
        points: 2,
        options: [
          `'${d.wrongOrdinal}' est faux : la terminaison exacte est '${d.ordinal}' !`,
          `La virgule après '${d.dayEn}' est interdite`,
          `Le mois '${d.monthEn}' ne prend pas de majuscule`,
          `On doit écrire 'in' à la place de 'on'`
        ],
        correctIndex: 0,
        explanation: `Attention aux terminaisons : 1st (first), 2nd (second), 3rd (third), 11th, 21st, 22nd... L'écriture correcte est '${d.ordinal}' et non '${d.wrongOrdinal}' !`,
        hint: `Regarde bien les 2 petites lettres de l'ordinal '${d.wrongOrdinal}'.`
      };
    }
  }
}

/**
 * 4. Question de Dictée Audio (Écouter la date et choisir la bonne transcription)
 */
export function generateAudioQuestion(id: string, format: 'UK' | 'US'): QuizQuestion {
  const d = createRandomDate();
  const dDistractor1 = createRandomDate();
  const dDistractor2 = createRandomDate();

  if (format === 'UK') {
    const correctText = d.fullDateUk;
    // Distracteur 1 : mauvais numéro ordinal
    const distractor1 = `${d.dayEn} the ${d.wrongOrdinal} of ${d.monthEn}`;
    // Distracteur 2 : autre mois proche ou autre jour
    const distractor2 = `${dDistractor1.dayEn} the ${d.ordinal} of ${d.monthEn}`;

    const options = shuffleArray([correctText, distractor1, distractor2]);
    const correctIndex = options.indexOf(correctText);

    return {
      id,
      chapterId: 'ang_ch3',
      type: 'qcm',
      subject: 'anglais',
      level: 2,
      isOralListening: true,
      audioDictationText: correctText,
      titre: `🎧 Dictée Audio UK • Clique sur le haut-parleur pour écouter la date en anglais, puis choisis la transcription exacte :`,
      consigneFr: "Écoute la date dictée en anglais UK et choisis la bonne écriture parmi les 3 propositions",
      points: 3,
      options,
      correctIndex,
      explanation: `Tu as bien entendu : "${correctText}" ! Bravo pour ton écoute.`,
      hint: `Écoute bien le jour (${d.dayEn}), le numéro (${d.ordinal}) et le mois (${d.monthEn}).`
    };
  } else {
    const correctText = d.fullDateUs;
    // Distracteur 1 : inversion UK sans virgule
    const distractor1 = `${d.dayEn} the ${d.ordinal} of ${d.monthEn}`;
    // Distracteur 2 : mauvais ordinal
    const distractor2 = `${d.dayEn}, ${d.monthEn} ${d.wrongOrdinal}`;

    const options = shuffleArray([correctText, distractor1, distractor2]);
    const correctIndex = options.indexOf(correctText);

    return {
      id,
      chapterId: 'ang_ch3',
      type: 'qcm',
      subject: 'anglais',
      level: 2,
      isOralListening: true,
      audioDictationText: correctText,
      titre: `🎧 Dictée Audio US • Clique sur le haut-parleur pour écouter la date en anglais, puis choisis la transcription exacte :`,
      consigneFr: "Écoute la date dictée en anglais US et choisis la bonne écriture parmi les 3 propositions",
      points: 3,
      options,
      correctIndex,
      explanation: `La voix a prononcé le format américain avec le mois avant le jour : "${correctText}" !`,
      hint: `Écoute l'ordre : le mois (${d.monthEn}) est prononcé avant le jour (${d.ordinal}).`
    };
  }
}

/**
 * 🎯 Générateur complet selon la session :
 * - Mode 5 questions : 2 Briques, 2 Saisie clavier, 1 Identify mistake
 * - Mode 10 questions : 4 Briques, 3 Saisie clavier, 2 Identify mistake, 1 Audio
 * - Mode 20 questions (ou 'controle') : 8 Briques (40%), 6 Saisie clavier (30%), 4 Identify mistake (20%), 2 Audio (10%)
 */
export function generateEnglishDateQuestions(count: 5 | 10 | 20 | 'controle'): QuizQuestion[] {
  const generated: QuizQuestion[] = [];

  if (count === 5) {
    // 2 Briques (1 UK, 1 US)
    generated.push(generateBriquesQuestion('gen_briq_uk_1', 'UK'));
    generated.push(generateBriquesQuestion('gen_briq_us_1', 'US'));
    // 2 Saisie clavier (1 UK, 1 US)
    generated.push(generateSaisieClavierQuestion('gen_clavier_uk_1', 'UK'));
    generated.push(generateSaisieClavierQuestion('gen_clavier_us_1', 'US'));
    // 1 Erreur à corriger
    generated.push(generateMistakeQuestion('gen_mistake_1', getRandomInt(0, 3) as any));
  } else if (count === 10) {
    // 4 Briques (2 UK, 2 US)
    generated.push(generateBriquesQuestion('gen_briq_uk_1', 'UK'));
    generated.push(generateBriquesQuestion('gen_briq_uk_2', 'UK'));
    generated.push(generateBriquesQuestion('gen_briq_us_1', 'US'));
    generated.push(generateBriquesQuestion('gen_briq_us_2', 'US'));
    // 3 Saisie clavier (2 UK, 1 US)
    generated.push(generateSaisieClavierQuestion('gen_clavier_uk_1', 'UK'));
    generated.push(generateSaisieClavierQuestion('gen_clavier_uk_2', 'UK'));
    generated.push(generateSaisieClavierQuestion('gen_clavier_us_1', 'US'));
    // 2 Erreurs à corriger
    const errIdxs = shuffleArray([0, 1, 2, 3]);
    generated.push(generateMistakeQuestion('gen_mistake_1', errIdxs[0] as any));
    generated.push(generateMistakeQuestion('gen_mistake_2', errIdxs[1] as any));
    // 1 Audio
    generated.push(generateAudioQuestion('gen_audio_1', Math.random() > 0.5 ? 'UK' : 'US'));
  } else {
    // 20 questions (Grand DS & Contrôle)
    // 8 Briques (40%) : 4 UK + 4 US
    for (let i = 1; i <= 4; i++) {
      generated.push(generateBriquesQuestion(`gen_briq_uk_${i}`, 'UK'));
      generated.push(generateBriquesQuestion(`gen_briq_us_${i}`, 'US'));
    }
    // 6 Saisie clavier (30%) : 3 UK + 3 US
    for (let i = 1; i <= 3; i++) {
      generated.push(generateSaisieClavierQuestion(`gen_clavier_uk_${i}`, 'UK'));
      generated.push(generateSaisieClavierQuestion(`gen_clavier_us_${i}`, 'US'));
    }
    // 4 Identify the mistake (20%) : les 4 types de pièges
    generated.push(generateMistakeQuestion('gen_mistake_1', 0)); // Majuscule
    generated.push(generateMistakeQuestion('gen_mistake_2', 1)); // Mot français avec accent
    generated.push(generateMistakeQuestion('gen_mistake_3', 2)); // the et of
    generated.push(generateMistakeQuestion('gen_mistake_4', 3)); // Mauvais ordinal
    // 2 Dictées audio (10%) : 1 UK + 1 US
    generated.push(generateAudioQuestion('gen_audio_uk_1', 'UK'));
    generated.push(generateAudioQuestion('gen_audio_us_1', 'US'));
  }

  // Shuffle order while keeping pedagogical flow (briques d'abord pour échafauder, puis erreurs, saisie et audio)
  return generated;
}
