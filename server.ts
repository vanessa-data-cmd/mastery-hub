import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Support base64 image uploads from camera/files
app.use(express.json({ limit: '25mb' }));

const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client with GEMINI_API_KEY:', err);
  }
}

// Fallback high quality lesson packs for all 6ème subjects
const FALLBACK_PACKS: Record<string, any> = {
  svt: {
    title: "Leçon A1 - Les écosystèmes et le vivant",
    subject: "svt",
    summaryKids: "Un écosystème, c'est comme une immense équipe dans un jeu vidéo : il y a un décor naturel (le milieu), des joueurs (les êtres vivants) et toutes les interactions qu'ils fabriquent ensemble pour survivre.",
    audioFlashScript: "Bienvenue dans ton flash SVT de 2 minutes ! Aujourd'hui, on explore le concept d'écosystème. Imagine un décor naturel : que ce soit un étang, un désert brûlant ou un récif de corail plein de poissons. Dans ce milieu, aucun être vivant n'est seul. Les plantes fabriquent de l'oxygène et de la nourriture grâce au soleil, les insectes pollinisent les fleurs, et les animaux interagissent sans cesse. Si un seul maillon disparaît, tout le biome est déséquilibré. Retiens bien les 3 mots magiques : le milieu de vie, les êtres vivants et leurs interactions !",
    survivalSheet: {
      dangerRed: "Ne crois SURTOUT PAS qu'un écosystème c'est seulement la forêt ou le sous-bois ! Un aquarium, une mare ou le désert sont aussi des écosystèmes complets.",
      warningYellow: ["Milieu de vie", "Êtres vivants", "Interactions"],
      greenFoundation: "Écosystème = Décor + Habitants + Liens entre eux !"
    },
    practicalMission: {
      role: "Garde Forestier et Biologiste d'élite",
      scenario: "Une mare vient d'apparaître dans la réserve. Les grenouilles mangent les moustiques et les nénuphars filtrent l'eau.",
      task: "Explique ce qui risque d'arriver à cet écosystème si une usine déverse des produits chimiques dans l'eau de la mare."
    },
    everydayApplications: [
      "Comprendre pourquoi un aquarium à la maison a besoin de plantes et de filtres pour que les poissons ne tombent pas malades.",
      "Savoir pourquoi il faut protéger les abeilles dans son jardin car elles permettent à nos fruits et légumes de pousser.",
      "Observer la chaîne de vie sous une pierre ou au bord d'un ruisseau en balade."
    ],
    mnemonicTrick: "Pense au trio 'M.E.I.' : Milieu + Êtres vivants + Interactions !",
    quizQuestions: [
      {
        id: "svt_q1",
        type: "libre",
        subject: "svt",
        level: 1,
        titre: "Définis ce qu'est un 'écosystème' avec ses 3 éléments indispensables.",
        points: 4,
        explanation: "Un écosystème réunit un milieu de vie, des êtres vivants et les interactions entre eux.",
        hint: "Pense au trio : le décor, les habitants, et les liens entre eux.",
        spellingTip: "Astuce orthographe : 'écosystème' s'écrit avec un 'y' comme dans 'système' !"
      },
      {
        id: "svt_q2",
        type: "trou",
        subject: "svt",
        level: 2,
        titre: "Texte à trous : Un écosystème est formé d'un milieu naturel, d'êtres vivants et de leurs ________.",
        points: 2,
        correctAnswer: "interactions",
        explanation: "Le mot clé est 'interactions' (ou liens/relations).",
        hint: "Ce sont les actions réciproques que font les êtres vivants entre eux.",
        spellingTip: "Inter-actions : deux mots collés !"
      },
      {
        id: "svt_q3",
        type: "exemple_perso",
        subject: "svt",
        level: 3,
        titre: "Cite un autre écosystème que la forêt ou le sous-bois, et explique pourquoi c'en est un.",
        points: 4,
        suggestedExamples: [
          "🌊 Le récif de corail tropical",
          "🏜️ Le désert du Sahara",
          "🐠 Un aquarium d'eau douce",
          "🧊 La banquise polaire",
          "🏝️ L'île volcanique"
        ],
        explanation: "Super choix ! Dans chacun de ces milieux, des êtres vivants spécifiques interagissent avec les conditions naturelles.",
        hint: "Clique sur une des tuiles proposées si tu manques d'inspiration !"
      },
      {
        id: "svt_q4",
        type: "vf",
        subject: "svt",
        level: 2,
        titre: "Vrai ou Faux : Une simple mare ou un aquarium peuvent être considérés comme de véritables écosystèmes.",
        points: 2,
        correctAnswer: "Vrai",
        explanation: "C'est VRAI ! Même à petite échelle, il y a de l'eau (milieu), des poissons/algues (vivant) et des échanges mutuels.",
        hint: "Taille n'a pas d'importance tant que les 3 conditions sont réunies."
      },
      {
        id: "svt_q5",
        type: "qcm",
        subject: "svt",
        level: 2,
        titre: "Que se passe-t-il si tous les prédateurs d'un écosystème disparaissent soudainement ?",
        points: 2,
        options: [
          "Les herbivores prolifèrent et dévorent toute la végétation (déséquilibre)",
          "Rien du tout, la nature s'en fiche",
          "L'écosystème gèle instantanément"
        ],
        correctIndex: 0,
        explanation: "Exactement ! Sans prédateurs, les mangeurs de plantes deviennent trop nombreux et détruisent l'équilibre.",
        hint: "Pense à ce qui se passe si les loups disparaissent dans une forêt de cerfs."
      }
    ]
  },
  anglais: {
    title: "Anglais - Nombres ordinaux, Dates & Prépositions",
    subject: "anglais",
    summaryKids: "In English, we write the date with ordinal numbers (1st, 2nd, 3rd) and we use the magic prepositions : ON for a specific day or date, and IN for a month or year !",
    audioFlashScript: "Hello Mathieu! Here is your 2-minute English flash. First, remember ordinal numbers: 1st is first, 2nd is second, 3rd is third. For all other numbers, just add TH, like 4th or 5th. Second, the golden rule of prepositions: use ON for precise dates, like on the 15th of September. Use IN for big time periods, like in July or in 2026. Keep your shield up, let's win this match!",
    survivalSheet: {
      dangerRed: "Attention à la préposition : on dit 'ON Wednesday 21st June' mais 'IN September'. Ne confonds jamais ON (jour précis) et IN (mois seul) !",
      warningYellow: ["1st = first", "2nd = second", "3rd = third", "ON (date)", "IN (mois)"],
      greenFoundation: "1st, 2nd, 3rd sont uniques, tous les autres prennent '-th' !"
    },
    practicalMission: {
      role: "British Royal Squad Leader",
      scenario: "You need to invite your squad for a special tournament in London.",
      task: "Write the invitation date correctly using the British format and proper prepositions."
    },
    everydayApplications: [
      "Comprendre les dates de sortie des nouvelles saisons de jeux vidéo sur les serveurs UK/US.",
      "Donner ta date d'anniversaire à un correspondant anglophone sans faire d'erreur.",
      "Réserver un billet de train ou d'avion sur un site en anglais."
    ],
    mnemonicTrick: "O-N = One single day (un jour précis) ! I-N = Inside the month (dans le mois) !",
    quizQuestions: [
      {
        id: "ang_q1",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the ordinal number: 1st",
        consigneFr: "Écris en toutes lettres le nombre ordinal : 1st",
        points: 2,
        correctAnswer: "first",
        explanation: "1st = first. C'est l'ordinal régulier pour le premier.",
        hint: "Pense au mot qu'on utilise pour dire 'premier' (f...t)."
      },
      {
        id: "ang_q2",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the ordinal number: 2nd",
        consigneFr: "Écris en toutes lettres le nombre ordinal : 2nd",
        points: 2,
        correctAnswer: "second",
        explanation: "2nd = second. C'est le deuxième.",
        hint: "Comme 'seconde' en français !"
      },
      {
        id: "ang_q3",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the ordinal number: 3rd",
        consigneFr: "Écris en toutes lettres le nombre ordinal : 3rd",
        points: 2,
        correctAnswer: "third",
        explanation: "3rd = third. C'est le troisième.",
        hint: "Commence par 'th...'."
      },
      {
        id: "ang_q4",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "Choose the correct preposition: 'My birthday is ______ 15th September.'",
        consigneFr: "Choisis la bonne préposition : 'Mon anniversaire est le 15 septembre.'",
        points: 2,
        options: ["IN", "ON", "AT", "TO"],
        correctIndex: 1,
        explanation: "Devant une date précise avec le jour, on utilise toujours 'ON' !",
        hint: "On parle d'un jour précis avec un numéro de jour."
      },
      {
        id: "ang_q5",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "Correct the capital letter and preposition: 'my birthday is on july.'",
        consigneFr: "Corrige la majuscule et la préposition : 'my birthday is on july.'",
        points: 4,
        correctAnswer: "My birthday is in July.",
        explanation: "Deux corrections nécessaires : Majuscules à 'My' et au mois 'July', et préposition 'in' devant un mois seul.",
        hint: "N'oublie pas : les mois en anglais prennent TOUJOURS une majuscule !"
      }
    ]
  },
  histoire: {
    title: "Histoire 6ème - Les débuts de l'humanité & Paléolithique",
    subject: "histoire",
    summaryKids: "Les premiers humains sont apparus en Afrique il y a des millions d'années. Au Paléolithique, ils étaient nomades : ils suivaient le gibier, fabriquaient des outils en pierre taillée et ont peuplé la Terre entière par de grandes migrations.",
    audioFlashScript: "Voici ton flash Histoire de 2 minutes ! Remontons le temps jusqu'à la Préhistoire. La Préhistoire commence avec l'apparition des premiers humains et se termine avec l'invention de l'écriture vers 3500 avant Jésus-Christ. Au Paléolithique (l'âge de la pierre taillée), nos ancêtres ne vivent pas dans des maisons fixes : ce sont des nomades ! Ils se déplacent sans cesse pour chasser et cueillir. En partant d'Afrique, berceau de l'humanité, ils migrent sur tous les continents. Retiens bien : fossile, nomade et migration !",
    survivalSheet: {
      dangerRed: "Ne confonds pas Paléolithique (pierre taillée, nomades, pas de village) et Néolithique (agriculture, sédentaires). Au Paléolithique, AUCUN village !",
      warningYellow: ["Fossile", "Nomade", "Migration", "Afrique berceau"],
      greenFoundation: "Préhistoire = De l'homme jusqu'à l'écriture (-3500 av. J.-C.)"
    },
    practicalMission: {
      role: "Archéologue de terrain en expédition",
      scenario: "Tu viens de déterrer des outils en silex taillé et des os anciens dans une grotte.",
      task: "Explique aux journalistes pourquoi ces traces prouvent qu'un groupe d'Homo Sapiens nomades a vécu ici."
    },
    everydayApplications: [
      "Comprendre comment les archéologues reconstituent l'histoire de ta région lors de travaux ou fouilles.",
      "Reconnaître les silex taillés lors de balades en forêt ou dans les champs.",
      "Savoir d'où vient l'humanité et pourquoi nous partageons tous la même origine africaine."
    ],
    mnemonicTrick: "Paléo = Pierre taillée (P comme Pierre et Paléo) !",
    quizQuestions: [
      {
        id: "hist_q1",
        type: "libre",
        subject: "histoire",
        level: 1,
        titre: "Définis précisément ce qu'est un 'fossile' (mots attendus : trace ou reste, roche).",
        points: 4,
        explanation: "Un fossile est une trace ou un reste d'être vivant conservé dans la roche ou la terre depuis des milliers d'années.",
        hint: "Pense aux os ou empreintes pétrifiées dans la pierre.",
        spellingTip: "Fossile s'écrit avec deux 's' !"
      },
      {
        id: "hist_q2",
        type: "libre",
        subject: "histoire",
        level: 1,
        titre: "Explique ce que signifie être 'nomade' pour les premiers humains.",
        points: 4,
        explanation: "Un nomade est une personne qui n'a pas d'habitat fixe et qui se déplace pour trouver sa nourriture (chasse et cueillette).",
        hint: "Pense au contraire d'avoir une maison permanente."
      },
      {
        id: "hist_q3",
        type: "qcm",
        subject: "histoire",
        level: 2,
        titre: "De quel continent tous les premiers humains (Homo Sapiens) sont-ils originaires ?",
        points: 2,
        options: ["L'Afrique (le berceau de l'humanité)", "L'Europe", "L'Asie", "L'Amérique"],
        correctIndex: 0,
        explanation: "L'Afrique est le berceau de l'humanité, d'où sont parties toutes les grandes migrations.",
        hint: "C'est là qu'on a retrouvé les plus vieux fossiles comme Lucy !"
      },
      {
        id: "hist_q4",
        type: "vf",
        subject: "histoire",
        level: 2,
        titre: "Vrai ou Faux : Au Paléolithique, les humains construisaient de grands villages fortifiés avec des remparts.",
        points: 2,
        correctAnswer: "Faux",
        explanation: "C'est FAUX ! Au Paléolithique, ils sont nomades et vivent sous des tentes en peau ou à l'entrée des grottes.",
        hint: "S'ils se déplacent tout le temps, ont-ils le temps de bâtir des forteresses en pierre ?"
      },
      {
        id: "hist_q5",
        type: "trou",
        subject: "histoire",
        level: 2,
        titre: "Texte à trous : Le mot Paléolithique signifie l'âge de la pierre ________.",
        points: 2,
        correctAnswer: "taillée",
        explanation: "C'est l'âge de la pierre taillée (par opposition à la pierre polie du Néolithique).",
        hint: "Les hommes taillaient le silex pour faire des pointes et des grattoirs."
      }
    ]
  },
  maths: {
    title: "Mathématiques - Fractions, Décimaux & Tables",
    subject: "maths",
    summaryKids: "Une fraction, c'est un partage équitable : le nombre du bas (dénominateur) dit en combien de parts on coupe le gâteau, le nombre du haut (numérateur) dit combien de parts on mange !",
    audioFlashScript: "Salut Mathieu ! Voici ton flash Maths de 2 minutes. Les fractions sont tes alliées. 14 dixièmes, c'est 14 divisé par 10, ce qui donne 1,4. 7 centièmes, c'est 0,07 avec deux zéros après la virgule. Et pour les tables magiques : 7 fois 8, c'est le fameux compte à rebours 5, 6, 7, 8 donc 56 ! 8 fois 9, c'est 72. Reste concentré, ton score va exploser !",
    survivalSheet: {
      dangerRed: "Attention à la position de la virgule : 7 dixièmes = 0,7 mais 7 centièmes = 0,07 (ne confonds jamais dixièmes et centièmes) !",
      warningYellow: ["Numérateur (en haut)", "Dénominateur (en bas)", "7 x 8 = 56", "8 x 9 = 72"],
      greenFoundation: "Dénominateur = Découpe du gâteau / Numérateur = Nombre de parts prises"
    },
    practicalMission: {
      role: "Architecte en chef des bases",
      scenario: "Tu dois partager une cargaison de bouclier de 100 unités entre 4 escouades de façon strictement égale.",
      task: "Écris la fraction correspondante et calcule le nombre de potions par escouade."
    },
    everydayApplications: [
      "Partager une pizza ou un gâteau d'anniversaire à parts parfaitement égales entre copains.",
      "Calculer les réductions pendant les soldes (-50 % c'est la moitié, 1/4 c'est diviser par 4).",
      "Mesurer les ingrédients dans une recette de cuisine (1/2 litre d'eau, 1/4 de litre de lait)."
    ],
    mnemonicTrick: "Le Dénominateur est en bas, comme la Terre (D comme Descendre ou Dessous) !",
    quizQuestions: [
      {
        id: "maths_q1",
        type: "libre",
        subject: "maths",
        level: 1,
        titre: "Écris la fraction 14/10 sous forme de nombre décimal à virgule.",
        points: 2,
        correctAnswer: "1,4",
        explanation: "14 dixièmes = 14 / 10 = 1,4.",
        hint: "Diviser par 10 décale la virgule d'un rang vers la gauche."
      },
      {
        id: "maths_q2",
        type: "libre",
        subject: "maths",
        level: 1,
        titre: "Écris la fraction 7/100 sous forme de nombre décimal.",
        points: 2,
        correctAnswer: "0,07",
        explanation: "7 centièmes = 0,07 (deux rangs après la virgule pour les centièmes).",
        hint: "Attention, deux zéros dans 100, donc deux chiffres après la virgule."
      },
      {
        id: "maths_q3",
        type: "libre",
        subject: "maths",
        level: 1,
        titre: "Combien font 7 x 8 ? (Pense au compte à rebours magique 5, 6, 7, 8)",
        points: 2,
        correctAnswer: "56",
        explanation: "7 x 8 = 56 ! (5, 6, 7, 8 : 56 = 7 x 8).",
        hint: "Le résultat commence par 5."
      },
      {
        id: "maths_q4",
        type: "libre",
        subject: "maths",
        level: 1,
        titre: "Combien font 8 x 9 ?",
        points: 2,
        correctAnswer: "72",
        explanation: "8 x 9 = 72.",
        hint: "Astuce des doigts de la table de 9 : le 8ème doigt baissé laisse 7 et 2."
      },
      {
        id: "maths_q5",
        type: "qcm",
        subject: "maths",
        level: 2,
        titre: "Dans la fraction 3/4, comment s'appelle le chiffre 4 du bas et que représente-t-il ?",
        points: 2,
        options: [
          "Le dénominateur : il indique en combien de parts égales l'unité est découpée",
          "Le numérateur : il indique le nombre de parts mangées",
          "Le multiplicateur"
        ],
        correctIndex: 0,
        explanation: "Le dénominateur est en dessous : il donne le nom et la découpe du partage.",
        hint: "Pense à 'D' comme dessous."
      }
    ]
  },
  pc: {
    title: "Physique-Chimie - Conducteurs, Isolants & Recyclage",
    subject: "pc",
    summaryKids: "Un conducteur thermique laisse passer la chaleur (comme les métaux). Un isolant thermique bloque ou ralentit la chaleur (comme le bois, le plastique ou la laine).",
    audioFlashScript: "Flash Physique-Chimie en 2 minutes ! Pourquoi les casseroles ont-elles un manche en plastique ou en bois ? Parce que le plastique et le bois sont des isolants thermiques : ils empêchent la chaleur de brûler tes doigts ! En revanche, le fond de la casserole est en métal car les métaux sont d'excellents conducteurs thermiques qui chauffent vite tes aliments. Côté planète : les métaux et cartons vont dans la poubelle jaune pour être recyclés, tandis que le verre va dans son conteneur spécial. Tu es prêt pour le top score !",
    survivalSheet: {
      dangerRed: "Ne confonds pas isolant et conducteur ! Le métal conduit la chaleur, le plastique l'isole. Ne dis jamais que le verre va dans la poubelle jaune.",
      warningYellow: ["Conducteur thermique (métaux)", "Isolant thermique (plastique, bois, laine)", "Poubelle jaune (tri)"],
      greenFoundation: "Conducteur = Laisse passer / Isolant = Bloque la chaleur"
    },
    practicalMission: {
      role: "Ingénieur Matériaux de combinaison spatiale",
      scenario: "Les astronautes doivent sortir dans l'espace à -150°C.",
      task: "Choisis quel type de matériau utiliser pour l'intérieur de leurs gants et justifie ton choix."
    },
    everydayApplications: [
      "Savoir pourquoi on met un manteau en laine en hiver (pour piéger l'air isolant chaud).",
      "Comprendre pourquoi on ne se brûle pas avec une cuillère en bois dans une soupe bouillante.",
      "Bien trier ses canettes de soda en aluminium dans la poubelle jaune pour qu'elles renaissent."
    ],
    mnemonicTrick: "I-solant = I-mperméable à la chaleur !",
    quizQuestions: [
      {
        id: "pc_q1",
        type: "libre",
        subject: "pc",
        level: 1,
        titre: "Définis ce qu'est un 'conducteur thermique' et donne un exemple de matériau.",
        points: 4,
        explanation: "Un conducteur thermique est un matériau qui laisse facilement passer la chaleur, comme les métaux (cuivre, fer, aluminium).",
        hint: "Pense au matériau qui chauffe très vite sur une plaque."
      },
      {
        id: "pc_q2",
        type: "libre",
        subject: "pc",
        level: 1,
        titre: "Définis ce qu'est un 'isolant thermique' et donne un exemple concret.",
        points: 4,
        explanation: "Un isolant thermique bloque ou ralentit la transmission de la chaleur, comme le bois, le plastique, la laine ou le polystyrène.",
        hint: "Pense au manche d'une poêle qui ne brûle pas les mains."
      },
      {
        id: "pc_q3",
        type: "trou",
        subject: "pc",
        level: 2,
        titre: "Texte à trous : Un matériau qui empêche ou retarde le passage de la chaleur est un ________ thermique.",
        points: 2,
        correctAnswer: "isolant",
        explanation: "C'est un isolant thermique.",
        hint: "Comme l'isolation des maisons."
      },
      {
        id: "pc_q4",
        type: "qcm",
        subject: "pc",
        level: 2,
        titre: "Pourquoi les manches de poêles sont-ils fabriqués en plastique ou en bois ?",
        points: 2,
        options: [
          "Parce que ce sont des isolants thermiques qui évitent de se brûler les mains",
          "Parce que le plastique cuit les aliments plus vite",
          "Pour faire plus joli"
        ],
        correctIndex: 0,
        explanation: "Exactement ! Le plastique isole et protège les mains de la chaleur du métal.",
        hint: "C'est une question de sécurité pour ne pas se brûler."
      },
      {
        id: "pc_q5",
        type: "vf",
        subject: "pc",
        level: 2,
        titre: "Vrai ou Faux : Les bouteilles en verre doivent être jetées dans la poubelle jaune avec les canettes et cartons.",
        points: 2,
        correctAnswer: "Faux",
        explanation: "FAUX ! Le verre a son propre conteneur spécifique et ne va pas dans la poubelle jaune.",
        hint: "Pense au bruit du verre qu'on jette dans la colonne à verre du quartier."
      }
    ]
  },
  geo: {
    title: "Géographie - Habiter les métropoles et espaces à faible densité",
    subject: "geo",
    summaryKids: "Une métropole est une très grande ville qui concentre population et activités de commandement mondial. À l'inverse, un espace à faible densité compte très peu d'habitants au kilomètre carré.",
    audioFlashScript: "Voici ton flash Géographie de 2 minutes ! Aujourd'hui, on explore comment les humains habitent la Terre. D'un côté, il y a les métropoles : des villes géantes comme Paris, Tokyo ou New York, avec des millions d'habitants, des gratte-ciels, des gares et aéroports internationaux. De l'autre côté, il y a les espaces à faible densité : les déserts, les hautes montagnes ou les campagnes isolées, où il y a moins de 30 habitants par kilomètre carré. Retiens bien la différence entre forte densité et faible densité !",
    survivalSheet: {
      dangerRed: "Ne confonds pas métropole (grande ville puissante) et mégapole (ville de plus de 10 millions d'habitants).",
      warningYellow: ["Métropole", "Densité de population", "Espace à faible densité", "Urbain / Rural"],
      greenFoundation: "Métropole = Grande ville concentrant population et richesses"
    },
    practicalMission: {
      role: "Urbaniste et Cartographe mondial",
      scenario: "Tu dois concevoir une nouvelle ligne de transport rapide.",
      task: "Explique pourquoi il est plus urgent de construire un métro dans une métropole que dans un espace montagnard à faible densité."
    },
    everydayApplications: [
      "Comprendre pourquoi il y a des embouteillages géants et des métros bondés dans les grandes capitales.",
      "Savoir lire une carte de France pour voir où se trouvent les campagnes calmes et les grandes villes.",
      "Comprendre pourquoi certains services (hôpitaux spécialisés, grandes universités) sont dans les métropoles."
    ],
    mnemonicTrick: "Métro-pole = Là où il y a le Métro et la foule !",
    quizQuestions: [
      {
        id: "geo_q1",
        type: "libre",
        subject: "geo",
        level: 1,
        titre: "Définis ce qu'est une 'métropole' (mots clés : grande ville, population, activités).",
        points: 4,
        explanation: "Une métropole est une très grande ville qui concentre beaucoup d'habitants et des fonctions économiques, politiques ou culturelles importantes.",
        hint: "Pense à une ville comme Paris, Londres ou Tokyo."
      },
      {
        id: "geo_q2",
        type: "libre",
        subject: "geo",
        level: 1,
        titre: "Qu'appelle-t-on un espace à 'faible densité' ?",
        points: 4,
        explanation: "C'est un espace géographique qui compte très peu d'habitants au kilomètre carré (comme les déserts, les montagnes ou certaines campagnes).",
        hint: "Moins de 30 habitants par km²."
      },
      {
        id: "geo_q3",
        type: "qcm",
        subject: "geo",
        level: 2,
        titre: "Lequel de ces espaces est un exemple d'espace à faible densité de population ?",
        points: 2,
        options: ["Le désert du Sahara ou l'Himalaya", "Le centre-ville de Tokyo", "L'agglomération parisienne"],
        correctIndex: 0,
        explanation: "Exact ! Le Sahara et les hautes montagnes comptent de très rares habitants en raison des contraintes naturelles.",
        hint: "Là où la nature rend la vie humaine rare."
      },
      {
        id: "geo_q4",
        type: "vf",
        subject: "geo",
        level: 2,
        titre: "Vrai ou Faux : Dans une métropole, la majorité des habitants travaillent dans l'agriculture des champs.",
        points: 2,
        correctAnswer: "Faux",
        explanation: "FAUX ! Dans une métropole, les emplois sont dans les services, le commerce, les bureaux et les transports.",
        hint: "Voit-on des tracteurs et des champs de blé sur les Champs-Élysées ?"
      },
      {
        id: "geo_q5",
        type: "trou",
        subject: "geo",
        level: 2,
        titre: "Texte à trous : Une ville de plus de 10 millions d'habitants est appelée une ________.",
        points: 2,
        correctAnswer: "mégapole",
        explanation: "Au-delà de 10 millions d'habitants, c'est une mégapole.",
        hint: "Méga = géant."
      }
    ]
  },
  francais: {
    title: "Français 6ème - Les accords du participe passé",
    subject: "francais",
    summaryKids: "Le participe passé s'habille d'un costume (-é, -ée, -és, -ées). Avec 'être', il s'accorde toujours avec le sujet. Avec 'avoir', il reste tranquille sauf si le COD est placé AVANT lui !",
    audioFlashScript: "Voici ton flash Français en 2 minutes sur le participe passé ! Règle numéro 1 : avec l'auxiliaire ÊTRE, le participe passé est poli, il s'accorde toujours avec le sujet. Exemple : 'Les filles sont arrivées'. Règle numéro 2 : avec l'auxiliaire AVOIR, il ne s'accorde JAMAIS avec le sujet. Il s'accorde uniquement si le COD est passé devant lui, comme dans : 'La pomme que j'ai mangée'. Astuce magique : pour savoir si tu écris -é ou -er, remplace par le verbe 'vendu' ou 'mordre' ! Tu as toutes les armes pour réussir.",
    survivalSheet: {
      dangerRed: "Ne fais JAMAIS accorder avec 'avoir' si le complément est après ! 'J'ai mangé des pommes' -> mangé reste invariable car les pommes sont après.",
      warningYellow: ["Être -> accord sujet", "Avoir -> accord COD avant uniquement", "Astuce mordre / vendu"],
      greenFoundation: "Être = Accord automatique / Avoir = Accord uniquement si COD avant"
    },
    practicalMission: {
      role: "Détective des messages secrets",
      scenario: "Tu as intercepté un message d'espions avec des accords effacés.",
      task: "Trouve quel mot donne l'indice pour accorder le verbe dans : 'Les clés que Lucas a trouvé... ou trouvées ?'"
    },
    everydayApplications: [
      "Écrire des sous-titres ou dialogues de vidéos sans se faire reprendre dans les commentaires.",
      "Rédiger un mail ou une invitation claire pour ton anniversaire.",
      "Ne pas perdre de points de présentation sur tes copies de collège dans toutes les matières."
    ],
    mnemonicTrick: "Remplace par 'mordre' ou 'vendu' : si tu peux dire 'vendu', ça finit en -é / -u !",
    quizQuestions: [
      {
        id: "fr_q1",
        type: "libre",
        subject: "francais",
        level: 1,
        titre: "Avec quel auxiliaire le participe passé s'accorde-t-il TOUJOURS avec le sujet du verbe ?",
        points: 2,
        correctAnswer: "être",
        explanation: "Avec l'auxiliaire 'être' (ex: Elles sont parties), l'accord avec le sujet est automatique !",
        hint: "Le verbe être (suis, es, est, sommes, êtes, sont)."
      },
      {
        id: "fr_q2",
        type: "libre",
        subject: "francais",
        level: 1,
        titre: "Pour tester si tu dois écrire 'mangé' ou 'manger', par quel mot secret remplaces-tu ?",
        points: 2,
        correctAnswer: "vendu",
        explanation: "Si on peut dire 'vendu' -> mangé (-é). Si on peut dire 'mordre' -> manger (-er) !",
        hint: "Pense au verbe du 3ème groupe 'mordre' ou 'vendu'."
      },
      {
        id: "fr_q3",
        type: "trou",
        subject: "francais",
        level: 2,
        titre: "Texte à trous : Complète correctement le participe passé : 'Les fleurs que Maya a cueill____.'",
        points: 4,
        correctAnswer: "ies",
        explanation: "Comme le COD 'que' remplace 'les fleurs' (féminin pluriel) et est placé AVANT le verbe avoir, on accorde : cueillies !",
        hint: "Qu'est-ce qui est cueilli ? Les fleurs (féminin pluriel) placées avant."
      },
      {
        id: "fr_q4",
        type: "qcm",
        subject: "francais",
        level: 2,
        titre: "Dans la phrase : 'Lucas a mangé des crêpes', pourquoi 'mangé' ne prend-il pas d'accord ?",
        points: 2,
        options: [
          "Parce que l'auxiliaire est avoir et le COD 'des crêpes' est placé APRÈS le verbe",
          "Parce que Lucas est un garçon",
          "Parce que c'est une faute du professeur"
        ],
        correctIndex: 0,
        explanation: "Exact ! Avec l'auxiliaire avoir, si le COD est placé après, pas d'accord !",
        hint: "Où se trouve le mot 'des crêpes' ? Avant ou après le verbe ?"
      },
      {
        id: "fr_q5",
        type: "vf",
        subject: "francais",
        level: 2,
        titre: "Vrai ou Faux : Avec l'auxiliaire avoir, le participe passé s'accorde avec le sujet du verbe.",
        points: 2,
        correctAnswer: "Faux",
        explanation: "FAUX ! Avec avoir, il ne s'accorde JAMAIS avec le sujet.",
        hint: "Seul l'auxiliaire être s'accorde avec le sujet."
      }
    ]
  }
};

// API: Transform lesson or Photo into complete pedagogical pack
app.post('/api/transform-lesson', async (req: Request, res: Response) => {
  try {
    const { lessonTitle, lessonContent, subject, childInterests, imageBase64, isFortniteMode } = req.body;

    const themeContext = isFortniteMode 
      ? "Thème imposé : Fortnite Battle Royale (Shield, loot légendaire, top 1, barils de bleuvage, zones de tempête, cartes d'assaut). Mets des références ludiques et motivantes."
      : "Thème pédagogique bienveillant 6ème : découverte concrète, missions d'exploration et analogies visuelles sans baratin.";

    if (aiClient) {
      const promptParts: any[] = [];

      if (imageBase64) {
        promptParts.push({
          inlineData: {
            mimeType: imageBase64.startsWith('data:image/png') ? 'image/png' : 'image/jpeg',
            data: imageBase64.replace(/^data:image\/[a-z]+;base64,/, '')
          }
        });
      }

      const promptText = `
Tu es le meilleur pédagogue spécialisé pour les élèves de 6ème (11 ans) atteints de DYSORTHOGRAPHIE / DYSLEXIE.
Consigne clé pour l'univers : ${themeContext}
Matière : ${subject || 'Général 6ème'}
Titre : ${lessonTitle || 'Leçon scannée'}
Texte : ${lessonContent || ''}

RÈGLES D'OR PÉDAGOGIQUES DYS :
1. Progression logique stricte des questions :
   - Question 1 & 2 : FONDATIONS & DÉFINITIONS de base (repérage de vocabulaire clé).
   - Question 3 & 4 : APPLICATION GUIDÉE & TEXTE À TROUS (mise en pratique avec choix ou mot ciblé).
   - Question 5 : DÉDUCTION & EXEMPLE PERSONNEL (l'enfant doit appliquer à un autre cas).
2. Pour les questions d'exemple personnel (ex: écosystème, matériaux, fractions) : FOURNIS TOUJOURS un tableau 'suggestedExamples' avec 4 ou 5 exemples variés HORS du cours sur lesquels l'enfant peut cliquer pour débloquer sa pensée (ex: pour l'écosystème : récif de corail, désert du Sahara, banquise polaire, île Fortnite).
3. Si la matière est l'anglais, fournis 'consigneFr' pour chaque question (traduction française accessible en cliquant sur le drapeau).
4. Fiche de survie avec code couleur tricolore : dangerRed (piège classique du contrôle), warningYellow (tableau de 2-4 mots d'or du prof indispensables), greenFoundation (la règle simple de base).
5. Un script de Flash Audio de 2 minutes (ton complice, rythmé, facile à écouter sans écran).
6. 3 applications dans la vraie vie.
7. Ne teste ni ne sanctionne JAMAIS l'orthographe lexicale. Concentre-toi sur le sens et la logique.

Génère un JSON STRICTEMENT valide avec cette structure :
{
  "title": "Titre clair et propre",
  "subject": "${subject || 'svt'}",
  "summaryKids": "Résumé de 2-3 phrases ultra-limpides avec une analogie visuelle marquante.",
  "audioFlashScript": "Script audio oral de 2 minutes, dynamique et encourageant, raconté comme une mission.",
  "survivalSheet": {
    "dangerRed": "Le piège classique du contrôle où la classe perd des points",
    "warningYellow": ["Mot d'or 1", "Mot d'or 2", "Mot d'or 3"],
    "greenFoundation": "La règle réflexe simple à retenir"
  },
  "practicalMission": {
    "role": "Rôle stimulant (ex: Explorateur de faille temporelle, Garde d'élite...)",
    "scenario": "Mise en situation concrète où la notion débloque la situation",
    "task": "La mission précise d'application"
  },
  "everydayApplications": [
    "Situation concrète 1 dans son quotidien ou ses jeux",
    "Situation concrète 2 dans la nature ou la société",
    "Situation concrète 3 amusante"
  ],
  "mnemonicTrick": "Astuce mnémotechnique visuelle pour profil dys",
  "quizQuestions": [
    {
      "id": "q1",
      "type": "libre",
      "subject": "${subject || 'svt'}",
      "level": 1,
      "titre": "Question de vocabulaire de base ou définition",
      "consigneFr": "Traduction française si question en anglais, sinon identique",
      "points": 4,
      "explanation": "Explication valorisante de la logique",
      "hint": "Indice imagé",
      "spellingTip": "Astuce magique d'orthographe sans jugement"
    },
    {
      "id": "q2",
      "type": "trou",
      "subject": "${subject || 'svt'}",
      "level": 2,
      "titre": "Texte à trous : Une phrase clé avec un mot manquant souligné ________.",
      "points": 2,
      "correctAnswer": "mot clé attendu",
      "explanation": "Pourquoi ce mot est la clé",
      "hint": "Indice"
    },
    {
      "id": "q3",
      "type": "exemple_perso",
      "subject": "${subject || 'svt'}",
      "level": 3,
      "titre": "Trouve un autre exemple concret et explique pourquoi.",
      "points": 4,
      "suggestedExamples": ["Exemple A hors cours", "Exemple B hors cours", "Exemple C", "Exemple D"],
      "explanation": "Ce qui est excellent dans le transfert",
      "hint": "Clique sur une tuile si tu hésites"
    },
    {
      "id": "q4",
      "type": "vf",
      "subject": "${subject || 'svt'}",
      "level": 2,
      "titre": "Vrai ou Faux : Une affirmation concrète",
      "points": 2,
      "correctAnswer": "Vrai",
      "explanation": "Explication claire",
      "hint": "Indice"
    },
    {
      "id": "q5",
      "type": "qcm",
      "subject": "${subject || 'svt'}",
      "level": 2,
      "titre": "Question QCM de mise en situation",
      "points": 2,
      "options": ["Choix A", "Choix B", "Choix C"],
      "correctIndex": 0,
      "explanation": "Pourquoi ce choix est le bon",
      "hint": "Indice"
    }
  ]
}
`;

      promptParts.push({ text: promptText });

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptParts.length === 1 ? promptParts[0].text : { parts: promptParts },
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      });

      const responseText = response.text || '';
      try {
        const parsed = JSON.parse(responseText);
        return res.json({ success: true, data: parsed, isAiGenerated: true });
      } catch (parseErr) {
        console.error('Failed to parse Gemini output JSON:', parseErr, responseText);
      }
    }

    // High quality pedagogical fallback
    const key = (subject || 'svt').toLowerCase();
    const fallback = FALLBACK_PACKS[key] || FALLBACK_PACKS.svt;
    return res.json({
      success: true,
      data: {
        ...fallback,
        title: lessonTitle || fallback.title
      },
      isAiGenerated: false
    });

  } catch (error: any) {
    console.error('Error in /api/transform-lesson:', error);
    return res.status(500).json({
      error: 'Erreur lors de la transformation de la leçon',
      details: error?.message || String(error)
    });
  }
});

// API: Benevolent evaluation with spelling effort bonus and explicit Dys grading rule
app.post('/api/evaluate-answer', async (req: Request, res: Response) => {
  try {
    const { question, childAnswer, contextLesson, expectedAnswer, maxPoints } = req.body;

    if (!childAnswer || !childAnswer.trim()) {
      return res.status(400).json({ error: 'Réponse requise' });
    }

    const maxPts = maxPoints || 4;

    if (aiClient) {
      const prompt = `
Tu es un enseignant bienveillant spécialisé en troubles DYS (dysorthographie et dyslexie) pour un élève de 11 ans en 6ème.
Question posée : "${question}"
Réponse écrite ou dictée par l'enfant : "${childAnswer}"
Réponse type / mots-clés attendus : "${expectedAnswer || 'Non spécifiée'}"
Contexte de la leçon : "${contextLesson || 'Collège 6ème'}"
Barème max : ${maxPts} points

RÈGLE D'OR DE NOTATION DYS :
1. RÈGLE ABSOLUE : ZÉRO SANCTION POUR LES FAUTES D'ORTHOGRAPHE ! L'enfant est dysorthographique.
2. BARÈME STRICT :
   - À MINIMA : Si l'enfant a compris le concept logique (la réflexion est bonne, même s'il n'utilise pas le mot technique exact du cours) -> Accorde AU MINIMUM LA MOITIÉ DES POINTS (${Math.round(maxPts / 2)} / ${maxPts} pts, 2 étoiles).
   - POINTS TOTAUX : Si l'enfant a compris le concept ET qu'il a mentionné le mot-clé obligatoire (ou son équivalent phonétique) -> Accorde LA TOTALITÉ DES POINTS (${maxPts} / ${maxPts} pts, 3 étoiles).
   - 0 point uniquement si c'est totalement hors-sujet ou vide.
3. DÉTECTION DU BONUS DE RELECTURE : Si l'enfant a fait l'effort d'écrire une phrase complète soignée, accorde spellingBonusAwarded: true.

Génère un JSON :
{
  "stars": 3,
  "ptsAwarded": ${maxPts},
  "maxPts": ${maxPts},
  "conceptUnderstood": true,
  "keywordPresent": true,
  "verdictTitle": "Excellente déduction !",
  "encouragement": "Ce qui est super dans ton idée...",
  "explanation": "L'astuce pour aller encore plus loin...",
  "spellingBonusAwarded": true,
  "spellingKindNote": "Si pertinent, valorise sa phrase ou reformule gentiment sans jamais dire 'tu as fait une faute'."
}
`;
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      try {
        const parsed = JSON.parse(response.text || '{}');
        return res.json({ success: true, feedback: parsed });
      } catch (err) {
        console.error('Error parsing feedback JSON:', err);
      }
    }

    // Default friendly feedback
    const hasLength = childAnswer.trim().length > 6;
    return res.json({
      success: true,
      feedback: {
        stars: 3,
        ptsAwarded: maxPts,
        maxPts,
        conceptUnderstood: true,
        keywordPresent: hasLength,
        verdictTitle: "Bravo pour ta réflexion !",
        encouragement: "Tu as su trouver la logique pratique de la leçon.",
        explanation: "Mettre en pratique avec tes propres mots est la meilleure façon de retenir pour toujours !",
        spellingBonusAwarded: hasLength,
        spellingKindNote: `Ton idée : "${childAnswer}" prouve que ton raisonnement fonctionne à 100% !`
      }
    });

  } catch (error: any) {
    console.error('Error evaluating answer:', error);
    return res.status(500).json({ error: "Erreur d'évaluation" });
  }
});

// API: Teacher Instruction Decoder (Décoder une consigne de prof)
app.post('/api/decode-instruction', async (req: Request, res: Response) => {
  try {
    const { instructionText } = req.body;
    if (!instructionText) {
      return res.status(400).json({ error: 'Consigne requise' });
    }

    if (aiClient) {
      const prompt = `
Tu es un traducteur de consignes scolaires pour un élève de 6ème dys.
Consigne du professeur : "${instructionText}"

Analyse la consigne et retourne un JSON :
{
  "actionVerb": "Le verbe d'action principal (ex: Justifier, Citer, Déduire, Calculer)",
  "trapWords": ["Mots pièges comme 'sauf', 'tous', 'ne pas', 'pourquoi', etc."],
  "plainFrenchTranslation": "La consigne traduite en français simple pour un enfant de 11 ans (1 phrase courte et percutante)",
  "whatTeacherWants": "Ce que le professeur veut absolument voir sur la copie pour mettre tous les points",
  "methodTip": "L'astuce pour ne pas tomber dans le piège"
}
`;
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      try {
        const parsed = JSON.parse(response.text || '{}');
        return res.json({ success: true, decoded: parsed });
      } catch (err) {
        console.error('Error decoding instruction:', err);
      }
    }

    // Fallback translation
    return res.json({
      success: true,
      decoded: {
        actionVerb: "Expliquer / Prouver",
        trapWords: ["pourquoi", "justifier"],
        plainFrenchTranslation: "Donne une preuve précise tirée de ton cours ou du texte pour montrer que tu as raison.",
        whatTeacherWants: "Une phrase complète avec un mot clé du cours.",
        methodTip: "Commence ta phrase par 'Parce que...' ou 'On sait que...'."
      }
    });

  } catch (error: any) {
    console.error('Error in /api/decode-instruction:', error);
    return res.status(500).json({ error: 'Erreur lors du décodage de la consigne' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`CapDys Mastery Hub Server running on port ${PORT}`);
  });
}

startServer();
