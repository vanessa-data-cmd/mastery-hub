import { LessonPack, SubjectId, ChapterItem } from '../types';

export const SUBJECTS_CONFIG: { id: SubjectId; label: string; icon: string; color: string }[] = [
  { id: 'histoire', label: 'Histoire', icon: '📜', color: 'from-amber-600 to-amber-800' },
  { id: 'geo', label: 'Géographie', icon: '🌍', color: 'from-emerald-600 to-teal-800' },
  { id: 'svt', label: 'SVT', icon: '🌱', color: 'from-green-600 to-emerald-800' },
  { id: 'pc', label: 'Physique-Chimie', icon: '🔥', color: 'from-rose-600 to-orange-700' },
  { id: 'anglais', label: 'Anglais', icon: '🇬🇧', color: 'from-blue-600 to-indigo-800' },
  { id: 'maths', label: 'Maths', icon: '📐', color: 'from-indigo-600 to-purple-800' },
  { id: 'francais', label: 'Français', icon: '📚', color: 'from-fuchsia-600 to-pink-800' },
  { id: 'mix', label: 'Grand Mix Toutes Matières', icon: '🎲', color: 'from-violet-600 to-indigo-900' }
];

export const SUBJECT_CHAPTERS: Record<SubjectId, ChapterItem[]> = {
  histoire: [
    { id: 'hist_ch1', titre: "I - Qui sont les premiers humains ?", aSavoir: ["Homo Sapiens", "Origine en Afrique il y a des millions d'années", "Fossiles dans la roche", "Toumaï & Lucy"] },
    { id: 'hist_ch2', titre: "II - Le peuplement de la Terre & migrations", aSavoir: ["Grandes migrations hors d'Afrique", "Peuplement des continents", "Période de la Préhistoire (jusqu'à -3500 av. J.-C.)"] },
    { id: 'hist_ch3', titre: "III - La vie nomade au Paléolithique", aSavoir: ["Nomades (sans habitat fixe)", "Pierre taillée & silex", "Maîtrise du feu (-400 000 ans)", "Art pariétal (grottes Chauvet, Lascaux)"] },
    {
      id: 'hist_ch_timeline',
      titre: "⏳ Frise Chronologique de la Préhistoire",
      aSavoir: ["Toumaï (-7 millions d'années)", "Homo Sapiens (-300 000 ans)", "Migrations (-100 000 ans)", "Grottes (-40 000 ans)", "Néolithique (-10 000 av. J.-C.)", "Écriture (-3500 av. J.-C.)"],
      interactiveTool: 'timeline'
    }
  ],
  svt: [
    { id: 'svt_ch1', titre: "Leçon A1 - Les écosystèmes et le milieu de vie", aSavoir: ["Milieu de vie (le décor)", "Êtres vivants (les habitants)", "Interactions (les liens)", "Exemples : mare, récif, désert"] },
    { id: 'svt_ch2', titre: "Leçon A2 - Les variations au cours des saisons", aSavoir: ["Adaptation au froid", "Perte des feuilles en automne pour économiser l'eau"] }
  ],
  pc: [
    { id: 'pc_ch1', titre: "1 - Les déchets et le tri sélectif", aSavoir: ["Poubelle jaune (métaux, cartons, plastiques)", "Verre dans son conteneur spécial"] },
    { id: 'pc_ch2', titre: "2 - La conductivité thermique", aSavoir: ["Conducteur thermique (métaux qui chauffent)", "Isolant thermique (plastique, bois, laine qui bloquent la chaleur)"] }
  ],
  anglais: [
    {
      id: 'ang_ch0',
      titre: "0 - Les nombres cardinaux (1 à 1 000 000)",
      aSavoir: [
        "1 à 20 (one, two, twelve, thirteen, fourteen, fifteen...)",
        "Dizaines (twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety)",
        "Trait d'union obligatoire pour les dizaines composées (twenty-one, seventy-five)",
        "Centaines & Milliers (hundred, thousand) : invariables avec un nombre (three thousand)",
        "Millions (million) : invariable avec un nombre (two million)",
        "Piège d'orthographe : forty s'écrit SANS 'u' !"
      ]
    },
    { id: 'ang_ch1', titre: "1 - Les nombres ordinaux (1st, 2nd, 3rd...)", aSavoir: ["1st = first", "2nd = second", "3rd = third", "Terminaison régulière en -th"] },
    { id: 'ang_ch2', titre: "2 - Prépositions IN et ON", aSavoir: ["ON devant une date précise avec jour", "IN devant un mois seul ou une année"] },
    {
      id: 'ang_ch3',
      titre: "3 - Les Dates UK & US (Formats complets, pièges & écoute)",
      aSavoir: [
        "Format UK complet : Day the [Ordinal] of [Month] (ex: Monday the 2nd of December)",
        "Format US avec virgule : Day, [Month] [Ordinal] (ex: Monday, December 2nd, Saturday, December 6th)",
        "Majuscule OBLIGATOIRE aux jours et aux mois (Monday, April, December...)",
        "Suffixes ordinaux indispensables : 1st, 2nd, 3rd, 4th, 21st, 22nd, 23rd, 31st... et piège 11th !",
        "Identify the mistake : repérer les 4 pièges du contrôle (majuscules, accents français, the/of, suffixe ordinal)",
        "Écoute orale : dictée audio de la date en anglais"
      ]
    },
    {
      id: 'ang_ch4',
      titre: "IV - The 4 Nations of the UK : Countries, Capitals & Emblems",
      aSavoir: [
        "4 nations : England (London), Scotland (Edinburgh), Wales (Cardiff), Northern Ireland (Belfast)",
        "Nationalités : English, Scottish, Welsh, Northern Irish",
        "Emblèmes : Rose (England), Thistle / Chardon (Scotland), Daffodil / Jonquille & Leek / Poireau (Wales), Shamrock / Trèfle (Northern Ireland)",
        "Le drapeau : The Union Jack"
      ]
    },
    {
      id: 'ang_ch5',
      titre: "V - Classroom English (Consignes du Prof & Questions des Élèves)",
      aSavoir: [
        "Ordres du prof : Open/Close your book, Raise your hand, Listen, Look at the board, Be quiet, Stand up / Sit down",
        "Demandes d'élèves : Can I open the window?, May I go to the toilets?, Can I clean the board?, Can I switch on the light?",
        "Compréhension : I don't understand, I don't know, What's the word for...?"
      ]
    }
  ],
  maths: [
    { id: 'maths_ch1', titre: "1 - Nombres décimaux & Fractions", aSavoir: ["Dénominateur en bas = découpe du gâteau", "Numérateur en haut = parts mangées", "14/10 = 1,4", "7/100 = 0,07"] },
    {
      id: 'maths_ch_tables',
      titre: "⚡ Défi Tables de Multiplication",
      aSavoir: ["Calcul mental express", "Tables 6, 7, 8, 9", "Astuces mnémotechniques"],
      interactiveTool: 'tables'
    }
  ],
  geo: [
    { id: 'geo_ch1', titre: "I - Habiter une métropole", aSavoir: ["Forte concentration de population", "Activités de commandement", "Mégapole > 10 millions"] },
    { id: 'geo_ch2', titre: "II - Espaces à faible densité", aSavoir: ["Moins de 30 hab/km²", "Contraintes naturelles (Sahara, hautes montagnes)"] },
    {
      id: 'geo_ch_map',
      titre: "🗺️ Carte Interactive : Continents, Océans & Pays d'Europe",
      aSavoir: ["Repères spatiaux", "Localisation des 5 océans", "Les 6 continents", "Grands pays d'Europe (Italie, France, Espagne...)"],
      interactiveTool: 'map'
    }
  ],
  francais: [
    { id: 'fr_ch1', titre: "1 - Auxiliaire Être et accord sujet", aSavoir: ["Accord automatique en genre et nombre avec le sujet (Elles sont arrivées)"] },
    { id: 'fr_ch2', titre: "2 - Auxiliaire Avoir et accord COD", aSavoir: ["Ne s'accorde JAMAIS avec le sujet", "Accord uniquement si le COD est placé avant (La pomme que j'ai mangée)"] },
    { id: 'fr_ch3', titre: "3 - Astuce magique mordre ou vendu", aSavoir: ["Si on peut dire vendu = -é", "Si on peut dire mordre = infinitif -er"] }
  ],
  mix: [
    { id: 'mix_all', titre: "Grand Mix Toutes Matières", aSavoir: ["Panachage complet de toutes les disciplines"] }
  ]
};

export const INITIAL_LESSON_PACKS: Record<SubjectId, LessonPack> = {
  svt: {
    id: 'svt_ecosystemes',
    title: 'Leçon A1 - Les écosystèmes et le vivant',
    subject: 'svt',
    summaryKids: "Un écosystème réunit un milieu naturel, des êtres vivants et toutes les interactions qu'ils fabriquent ensemble. Ce n'est pas seulement la forêt : une mare ou un désert sont aussi des écosystèmes !",
    audioFlashScript: "Bienvenue dans ton flash SVT de 2 minutes ! Aujourd'hui, on explore l'écosystème. Imagine un décor naturel : un étang, un récif de corail ou la forêt. Dans ce milieu de vie, les êtres vivants dépendent les uns des autres pour se nourrir et s'abriter : ce sont les interactions. Si un élément est pollué ou détruit, tout l'équilibre est menacé. Retiens bien les 3 piliers : Milieu + Êtres vivants + Interactions !",
    survivalSheet: {
      dangerRed: "Pense bien à élargir : un écosystème n'est pas uniquement la forêt ou le sous-bois. Une mare, un aquarium ou un désert sont aussi des écosystèmes complets.",
      warningYellow: ["Milieu de vie (le décor)", "Êtres vivants (les habitants)", "Interactions (les liens)"],
      greenFoundation: "Écosystème = Décor naturel + Vivants + Liens entre eux !"
    },
    practicalMission: {
      role: "Garde Forestier d'élite",
      scenario: "Une mare vient d'apparaître dans la réserve. Les grenouilles mangent les moustiques et les nénuphars filtrent l'eau.",
      task: "Explique ce qui risque d'arriver à cet écosystème si des produits chimiques sont déversés dans l'eau."
    },
    everydayApplications: [
      "Comprendre pourquoi un aquarium à la maison a besoin de plantes et de filtres pour que les poissons restent en vie.",
      "Savoir pourquoi il faut protéger les abeilles dans le jardin car elles permettent à nos fruits de pousser.",
      "Observer la chaîne de vie sous une pierre ou au bord d'un ruisseau en balade."
    ],
    mnemonicTrick: "Pense au trio M.E.I. : Milieu + Êtres vivants + Interactions !",
    quizQuestions: [
      {
        id: "svt_exam_def_ecosysteme",
        type: "briques",
        subject: "svt",
        level: 3,
        titre: "Contrôle A1 • Donne la définition complète d'un écosystème (4 points)",
        points: 4,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Piège réel du contrôle de Mathieu : Écrire seulement 'des êtres vivants' sans le milieu fait perdre 2,5 points !",
          radarQuestion: "Que cherche le professeur pour attribuer la totalité des 4 points ?",
          options: [
            {
              text: "Le trio complet : Les êtres vivants + Leur milieu de vie + Leurs interactions mutuelles",
              isCorrect: true,
              explanation: "Bravo ! Les 3 composantes doivent obligatoirement figurer dans ta phrase pour avoir 4/4 !"
            },
            {
              text: "Seulement citer des animaux de la forêt comme le cerf et le renard",
              isCorrect: false,
              explanation: "Attention ! Citer des animaux ne donne que 1 point sur 4, il manque le milieu et les interactions."
            }
          ]
        },
        bricksBank: [
          "Un écosystème est un ensemble formé par",
          "les êtres vivants (animaux, végétaux, décomposeurs),",
          "leur milieu de vie (biotope),",
          "et les interactions des êtres vivants entre eux et avec leur milieu.",
          "le désert aride",
          "les routes goudronnées"
        ],
        correctBricks: [
          "Un écosystème est un ensemble formé par",
          "les êtres vivants (animaux, végétaux, décomposeurs),",
          "leur milieu de vie (biotope),",
          "et les interactions des êtres vivants entre eux et avec leur milieu."
        ],
        criteriaChecklist: [
          { label: "1. Êtres vivants cités (+1 pt)", keywords: ["vivants", "animaux", "végétaux"] },
          { label: "2. Milieu de vie cité (Biotope) (+1.5 pt)", keywords: ["milieu de vie", "milieu", "biotope"] },
          { label: "3. Interactions mutuelles citées (+1.5 pt)", keywords: ["interactions", "relations"] }
        ],
        explanation: "Un écosystème est l'ensemble formé par les êtres vivants, leur milieu de vie, ainsi que les interactions des êtres vivants entre eux et avec leur milieu.",
        hint: "Pense au trio : 1. Êtres vivants + 2. Milieu de vie + 3. Interactions !"
      },
      {
        id: "svt_exam_saisons_changent",
        type: "briques",
        subject: "svt",
        level: 3,
        titre: "Contrôle A2 • Est-ce que les écosystèmes changent ? Donne un exemple précis (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Le piège où Mathieu a répondu 'le désert' : 'changent' = dans le temps (saisons), PAS un autre pays !",
          radarQuestion: "Quand le professeur demande si les écosystèmes 'changent', que veut-il évaluer ?",
          options: [
            {
              text: "L'évolution d'un milieu au fil des 4 saisons de l'année (hiver, printemps, été, automne)",
              isCorrect: true,
              explanation: "Exactement ! L'écosystème reste au même endroit mais change d'aspect au fil des saisons !"
            },
            {
              text: "Un paysage différent dans un autre pays comme le désert du Sahara",
              isCorrect: false,
              explanation: "Attention ! Le désert est un autre écosystème, ce n'est pas un changement dans le temps !"
            }
          ]
        },
        bricksBank: [
          "Oui, les écosystèmes varient selon les saisons :",
          "en automne et en hiver, les températures baissent,",
          "les arbres perdent leurs feuilles (bourgeons résistants)",
          "et certains animaux modifient leur comportement (migration ou hibernation).",
          "le désert avec des dromadaires",
          "les cactus poussent dans le sable"
        ],
        correctBricks: [
          "Oui, les écosystèmes varient selon les saisons :",
          "en automne et en hiver, les températures baissent,",
          "les arbres perdent leurs feuilles (bourgeons résistants)",
          "et certains animaux modifient leur comportement (migration ou hibernation)."
        ],
        criteriaChecklist: [
          { label: "1. Changement lié aux saisons affirmé (+1 pt)", keywords: ["varient", "saisons", "oui"] },
          { label: "2. Paramètre physique modifié (températures, froid) (+1 pt)", keywords: ["hiver", "températures", "baissent", "froid"] },
          { label: "3. Exemple d'adaptation animale ou végétale (+1 pt)", keywords: ["migrent", "hibernent", "feuilles", "bourgeons"] }
        ],
        explanation: "Les écosystèmes varient selon les saisons car les organismes vivants sont sensibles aux conditions du milieu (températures, nourriture) : certains migrent ou hibernent, d'autres résistent par leurs graines et bourgeons.",
        hint: "Pense au passage de l'été à l'hiver !"
      },
      {
        id: "svt_ortho_ecosysteme",
        chapterId: "svt_ch1",
        type: "qcm",
        subject: "svt",
        level: 1,
        isOrthoQuestion: true,
        titre: "✍️ Orthographe du Mot Clé : Comment s'écrit correctement le mot central de la leçon de SVT ?",
        points: 2,
        options: [
          "Un écosystème (un seul 'c', un 's', accent aigu sur le é)",
          "Un éccosystème (avec deux 'c')",
          "Un écosystéme (avec un accent grave sur le premier e)"
        ],
        correctIndex: 0,
        explanation: "Bravo ! Écosystème s'écrit avec un seul 'c', un 's' et un 'y'. Le préfixe 'éco-' vient du grec oikos qui signifie la maison.",
        hint: "Éco (la maison en grec) + système.",
        spellingTip: "Pense à Éco-responsable : un seul 'c' !"
      },
      {
        id: "svt_exam_autonomie_saisons",
        chapterId: "svt_ch2",
        type: "libre",
        subject: "svt",
        level: 3,
        titre: "🔥 Défi Autonomie (Sans les briques) • Rédige ta réponse complète : Pourquoi un écosystème forestier change-t-il entre l'été et l'hiver ? (3 points)",
        points: 3,
        isOfficialExam: true,
        isAutonomyChallenge: true,
        consigneRadar: {
          trapWarning: "⚠️ Défi sans filet : N'oublie pas d'évoquer la baisse de température ET un exemple d'adaptation (arbres ou animaux) !",
          radarQuestion: "Que dois-tu formuler dans ta phrase pour avoir tous les points ?",
          options: [
            {
              text: "Expliquer que les températures baissent en hiver et donner l'exemple des feuilles qui tombent ou de l'hibernation/migration",
              isCorrect: true,
              explanation: "Exactement ! Le paramètre physique (température) + l'effet sur les vivants."
            },
            {
              text: "Parler du désert",
              isCorrect: false,
              explanation: "Rappel : la question porte sur les saisons d'un même milieu, pas un autre pays !"
            }
          ]
        },
        criteriaChecklist: [
          { label: "1. Baisse des températures en hiver (+1 pt)", keywords: ["température", "froid", "baissent", "hiver"] },
          { label: "2. Adaptation des végétaux (perte des feuilles, bourgeons) (+1 pt)", keywords: ["feuilles", "arbres", "bourgeons", "végétaux"] },
          { label: "3. Adaptation des animaux (hibernation, migration) (+1 pt)", keywords: ["animaux", "hibernent", "migrent", "comportement"] }
        ],
        explanation: "En hiver, la baisse des températures modifie l'écosystème : les arbres perdent leurs feuilles pour limiter les pertes d'eau et les animaux adaptent leur comportement (hibernation ou migration).",
        hint: "Température qui baisse ➡️ Feuilles qui tombent + Animaux qui migrent ou hibernent."
      },
      {
        id: "svt_exam_compare_milieux",
        type: "briques",
        subject: "svt",
        level: 3,
        titre: "Contrôle Savoir-Faire • Compare les conditions physiques entre le sous-bois et la prairie (Sous-bois = 18 °C et 150 Lux / Prairie = 25 °C et 8 000 Lux) (4 points)",
        points: 4,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Interdit d'écrire juste '18 et 25' ! Il faut la phrase de comparaison complète avec unités !",
          radarQuestion: "Quelle est la règle d'or pour comparer deux données en 6ème ?",
          options: [
            {
              text: "Construire une phrase avec 'PLUS que' ou 'MOINS que' reliant ce qui est comparé avec chiffres et unités",
              isCorrect: true,
              explanation: "Parfait ! La comparaison doit comporter les connecteurs et les unités précises (°C et Lux)."
            },
            {
              text: "Écrire simplement les deux nombres côte à côte sur la copie",
              isCorrect: false,
              explanation: "Écrire juste les chiffres sans phrase vaut 0 point au collège !"
            }
          ]
        },
        bricksBank: [
          "Dans le sous-bois,",
          "la température est PLUS basse que dans la prairie (18 °C contre 25 °C),",
          "et la luminosité est NETTEMENT MOINS forte",
          "(150 Lux contre 8 000 Lux).",
          "18 et 25 sans phrase",
          "150 et 8000"
        ],
        correctBricks: [
          "Dans le sous-bois,",
          "la température est PLUS basse que dans la prairie (18 °C contre 25 °C),",
          "et la luminosité est NETTEMENT MOINS forte",
          "(150 Lux contre 8 000 Lux)."
        ],
        criteriaChecklist: [
          { label: "1. Ce qui est comparé (Température & Luminosité) (+1 pt)", keywords: ["température", "luminosité"] },
          { label: "2. Mots de comparaison utilisés (PLUS basse / MOINS forte) (+1.5 pt)", keywords: ["plus", "moins"] },
          { label: "3. Données chiffrées avec unités obligatoires (°C et Lux) (+1.5 pt)", keywords: ["°c", "lux", "18", "25", "150", "8 000"] }
        ],
        explanation: "Dans le sous-bois, la température est plus basse qu'en prairie (18 °C contre 25 °C) et la luminosité est beaucoup moins forte (150 Lux contre 8 000 Lux).",
        hint: "Utilise la formule magique : [Où] [Grandeur] est [PLUS/MOINS] [que...] ([Preuve chiffrée avec unité])."
      },
      {
        id: "svt_exam_mauvaise_saison",
        type: "briques",
        subject: "svt",
        level: 3,
        titre: "Contrôle A2 • Comment les êtres vivants passent-ils la « mauvaise saison » ? (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Deux stratégies indispensables : le comportement des animaux ET la résistance des végétaux !",
          radarQuestion: "Quelles sont les deux grandes stratégies enseignées par le professeur ?",
          options: [
            {
              text: "Modifier son comportement (migration / hibernation) ET résister sous forme de graines ou bourgeons",
              isCorrect: true,
              explanation: "Exactement ! Les deux catégories d'êtres vivants ont des stratégies différentes pour survivre au froid."
            },
            {
              text: "Acheter un manteau chaud et allumer le chauffage",
              isCorrect: false,
              explanation: "Ce n'est pas une stratégie biologique dans la nature !"
            }
          ]
        },
        bricksBank: [
          "Pour passer l'hiver, certains animaux modifient leur comportement",
          "(migration vers les pays chauds ou hibernation),",
          "tandis que les végétaux survivent grâce à des formes de résistance",
          "(graines dans le sol ou bourgeons sur les branches).",
          "tous les animaux meurent de froid",
          "les arbres s'envolent"
        ],
        correctBricks: [
          "Pour passer l'hiver, certains animaux modifient leur comportement",
          "(migration vers les pays chauds ou hibernation),",
          "tandis que les végétaux survivent grâce à des formes de résistance",
          "(graines dans le sol ou bourgeons sur les branches)."
        ],
        criteriaChecklist: [
          { label: "1. Stratégie animale : Migration ou hibernation (+1.5 pt)", keywords: ["migration", "hibernation"] },
          { label: "2. Stratégie végétale : Graines ou bourgeons (+1.5 pt)", keywords: ["graines", "bourgeons", "résistance"] }
        ],
        explanation: "Il existe différentes stratégies : certains organismes partent ou modifient leur comportement (migration ou hibernation) ; d'autres survivent grâce à des formes de résistance (graines, bourgeons).",
        hint: "Animaux (comportement) + Végétaux (résistance)."
      },
      {
        id: "svt_exam_perturbation",
        type: "briques",
        subject: "svt",
        level: 3,
        titre: "Contrôle A3 • Comment un écosystème évolue-t-il après une perturbation naturelle (incendie, tempête) ? (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Le mot magique du cours : 'régénération' en suivant différents stades d'espèces !",
          radarQuestion: "Que devient un milieu forestier après le passage d'une tempête ou d'un feu ?",
          options: [
            {
              text: "L'écosystème évolue par étapes avec de nouvelles espèces : il se régénère",
              isCorrect: true,
              explanation: "Bravo ! C'est la régénération naturelle de l'écosystème au cours du temps !"
            },
            {
              text: "Le sol reste stérile et plus rien ne poussera jamais",
              isCorrect: false,
              explanation: "Faux ! La forêt recolonise progressivement le milieu grâce aux graines et aux décomposeurs."
            }
          ]
        },
        bricksBank: [
          "Après une perturbation naturelle,",
          "les écosystèmes évoluent au cours du temps",
          "avec le développement successif de différentes espèces :",
          "ils se régénèrent progressivement.",
          "le milieu est mort définitivement",
          "aucun arbre ne repoussera"
        ],
        correctBricks: [
          "Après une perturbation naturelle,",
          "les écosystèmes évoluent au cours du temps",
          "avec le développement successif de différentes espèces :",
          "ils se régénèrent progressivement."
        ],
        criteriaChecklist: [
          { label: "1. Évolution dans le temps (+1 pt)", keywords: ["évoluent", "temps"] },
          { label: "2. Stades d'espèces successifs (+1 pt)", keywords: ["stades", "espèces", "développement"] },
          { label: "3. Notion clé de régénération (+1 pt)", keywords: ["régénèrent", "régénération"] }
        ],
        explanation: "Les écosystèmes évoluent au cours du temps avec le développement de différentes espèces en suivant différents stades : ils se régénèrent.",
        hint: "Le mot clé est 'régénération'."
      },
      {
        id: "svt_1",
        type: "libre",
        subject: "svt",
        level: 1,
        titre: "Définis ce qu'est un 'écosystème' en rédigeant une phrase complète.",
        points: 4,
        explanation: "Un écosystème réunit un milieu de vie, des êtres vivants et toutes les interactions entre eux.",
        hint: "Pense au trio indispensable : le décor naturel (milieu), les êtres vivants et les liens (interactions) entre eux.",
        spellingTip: "Astuce : 'écosystème' s'écrit avec un 'y' comme dans système !"
      },
      {
        id: "svt_inv_ecosysteme",
        type: "libre",
        subject: "svt",
        level: 1,
        titre: "Devinette de définition : Comment appelle-t-on l'ensemble formé par un milieu naturel de vie, des êtres vivants et toutes leurs relations mutuelles ?",
        points: 3,
        correctAnswer: "un écosystème",
        keywords: ["écosystème", "ecosysteme"],
        explanation: "C'est un écosystème ! Il réunit le milieu physique, le vivant et les interactions.",
        hint: "Ce mot commence par 'éco...' et contient un 'y'.",
        spellingTip: "Astuce : 'écosystème' s'écrit avec un 'y' comme dans système !"
      },
      {
        id: "svt_inv_decomposeurs",
        type: "libre",
        subject: "svt",
        level: 1,
        titre: "Devinette de définition : Comment appelle-t-on les êtres vivants (champignons, vers de terre) qui recyclent la matière morte en humus fertilisant ?",
        points: 3,
        correctAnswer: "les décomposeurs",
        keywords: ["décomposeurs", "decomposeurs", "décomposeur", "decomposeur"],
        explanation: "Ce sont les décomposeurs ! Ils nettoient le milieu naturel et enrichissent le sol.",
        hint: "Pense au verbe 'décomposer'."
      },
      {
        id: "svt_2",
        type: "trou",
        subject: "svt",
        level: 2,
        titre: "Texte à trous : Un écosystème est composé d'un milieu naturel, d'êtres vivants et de leurs ________.",
        points: 2,
        correctAnswer: "interactions",
        explanation: "Le mot clé est 'interactions' (ou liens/relations).",
        hint: "Ce sont les échanges et actions mutuelles entre les êtres vivants.",
        spellingTip: "Inter-actions s'écrit en un seul mot !"
      },
      {
        id: "svt_3",
        type: "exemple_perso",
        subject: "svt",
        level: 3,
        titre: "Cite un autre écosystème que la forêt ou le sous-bois : dis ton exemple perso et justifie ta réponse.",
        points: 4,
        suggestedExamples: [
          "🌊 Le récif de corail tropical",
          "🏜️ Le désert du Sahara",
          "🐠 Mon aquarium d'eau douce",
          "🧊 La banquise polaire",
          "🏝️ Une mare de jardin"
        ],
        explanation: "Super exemple personnel ! Dans chacun de ces milieux, des êtres vivants spécifiques interagissent avec les conditions naturelles pour se nourrir et s'abriter.",
        hint: "Dis ton exemple perso et justifie ta réponse : donne le décor (milieu), les habitants (vivants) et les liens !"
      },
      {
        id: "svt_4",
        type: "vf",
        subject: "svt",
        level: 2,
        titre: "Vrai ou Faux : Une simple mare ou un aquarium peuvent être considérés comme de véritables écosystèmes.",
        points: 2,
        correctAnswer: "Vrai",
        explanation: "C'est VRAI ! Même à petite échelle, il y a de l'eau (milieu), des plantes/animaux (vivant) et des échanges mutuels.",
        hint: "La taille n'a pas d'importance tant que les 3 conditions sont réunies."
      },
      {
        id: "svt_5",
        type: "qcm",
        subject: "svt",
        level: 2,
        titre: "Que se passe-t-il si les prédateurs d'un écosystème disparaissent soudainement ?",
        points: 2,
        options: [
          "Les herbivores prolifèrent et dévorent toute la végétation (déséquilibre)",
          "Rien du tout, la nature s'en fiche",
          "L'écosystème gèle instantanément"
        ],
        correctIndex: 0,
        explanation: "Exactement ! Sans prédateurs, les mangeurs de plantes deviennent trop nombreux et détruisent l'équilibre.",
        hint: "Pense à ce qui se passe si les loups disparaissent dans une forêt de cerfs."
      },
      {
        id: "svt_6",
        type: "libre",
        subject: "svt",
        level: 2,
        titre: "Pourquoi dit-on que les végétaux verts sont indispensables au début d'une chaîne alimentaire ?",
        points: 4,
        explanation: "Les végétaux verts fabriquent leur propre matière grâce à la lumière du soleil (photosynthèse) et nourrissent tous les herbivores.",
        hint: "Sans plantes, que mangeraient les herbivores ?"
      },
      {
        id: "svt_7",
        type: "vf",
        subject: "svt",
        level: 2,
        titre: "Vrai ou Faux : Dans la forêt, les vers de terre et les champignons sont des décomposeurs qui recyclent les feuilles mortes en terreau fertile.",
        points: 2,
        correctAnswer: "Vrai",
        explanation: "C'est VRAI ! Les décomposeurs transforment la matière organique morte en sels minéraux réutilisables par les plantes.",
        hint: "Ils nettoient et enrichissent le sol naturel."
      },
      {
        id: "svt_8",
        type: "qcm",
        subject: "svt",
        level: 1,
        titre: "Lequel de ces éléments fait partie du milieu physique (non-vivant) d'une mare ?",
        points: 2,
        options: [
          "La température de l'eau et la lumière du soleil",
          "Les grenouilles et les têtards",
          "Les libellules et nénuphars"
        ],
        correctIndex: 0,
        explanation: "Exact ! L'eau, la lumière, la température et le sol composent le milieu physique (non-vivant).",
        hint: "On cherche ce qui n'est pas un être vivant."
      },
      {
        id: "svt_9",
        type: "libre",
        subject: "svt",
        level: 3,
        titre: "Explique pourquoi la disparition des abeilles dans un jardin menacerait les fleurs et les arbres fruitiers.",
        points: 4,
        explanation: "Les abeilles transportent le pollen d'une fleur à l'autre (pollinisation), ce qui permet aux fleurs de se transformer en fruits.",
        hint: "Pense au mot 'pollinisation' et au transport du pollen."
      },
      {
        id: "svt_cloze_final",
        type: "texte_a_trous",
        subject: "svt",
        level: 2,
        titre: "🏆 Défi Synthèse Finale : Complète le Grand Texte Bilan de la leçon",
        points: 4,
        clozeTemplate: "Un écosystème est l'ensemble formé par un {1} naturel et par les êtres {2} qui y vivent. Entre tous ces êtres vivants, il existe de nombreuses {3} indispensables pour se nourrir et s'abriter. Si la pollution ou les humains détruisent un seul maillon, tout l'{4} de la nature est menacé.",
        clozeAnswers: ["milieu", "vivants", "interactions", "équilibre"],
        clozeWordBank: ["milieu", "vivants", "interactions", "équilibre", "volcan", "panthères"],
        explanation: "Bravo ! Tu maîtrises les 4 piliers d'un écosystème : Milieu naturel + Êtres vivants + Interactions + Équilibre fragile.",
        hint: "Pense au trio magique : le décor (milieu), les habitants (vivants), les liens (interactions) et la stabilité (équilibre)."
      }
    ]
  },

  anglais: {
    id: 'ang_dates',
    title: 'Nombres, Dates, 4 Nations du Royaume-Uni & Classroom English',
    subject: 'anglais',
    summaryKids: "L'anglais de 6ème réunit : 1) Les nombres cardinaux et ordinaux, 2) Les dates et prépositions (ON jour, IN mois), 3) Les 4 nations du Royaume-Uni (England, Scotland, Wales, Northern Ireland avec leurs capitales et emblèmes) et 4) Les consignes indispensables de Classroom English !",
    audioFlashScript: "Hello Mathieu! Here is your 2-minute English flash. Retiens bien : 1, forty s'écrit SANS 'u', et five thousand ne prend JAMAIS de 's' ! 2, on utilise ON pour un jour précis comme on Friday, et IN pour un mois comme in July. 3, le Royaume-Uni (The UK) réunit 4 nations : England avec London et la Rose rouge, Scotland avec Edinburgh et le Chardon (Thistle), Wales avec Cardiff et la Jonquille (Daffodil) ou le Poireau (Leek), et Northern Ireland avec Belfast et le Trèfle (Shamrock) ! Enfin en classe : Raise your hand pour lever la main, et May I go to the toilets pour demander les toilettes !",
    survivalSheet: {
      dangerRed: "Attention aux pièges du prof : 1) forty s'écrit SANS 'u'. 2) The UK réunit 4 nations (ne dis jamais que c'est juste l'Angleterre !). 3) L'emblème d'Écosse est The Thistle (chardon) et du Pays de Galles The Daffodil/Leek.",
      warningYellow: [
        "forty (sans 'u')",
        "ON (jour) / IN (mois)",
        "England (London / 🌹 Rose)",
        "Scotland (Edinburgh / 🪻 Thistle)",
        "Wales (Cardiff / 🌼 Daffodil & 🌱 Leek)",
        "Northern Ireland (Belfast / ☘️ Shamrock)",
        "The Union Jack 🇬🇧",
        "May I go to the toilets? 🚻",
        "Raise your hand! 🙋"
      ],
      greenFoundation: "UK = 4 nations ! Cardinaux : twenty-one avec tiret & forty sans U ! Dates : ON jour, IN mois !"
    },
    practicalMission: {
      role: "British Squad Leader",
      scenario: "You need to invite your squad for a special tournament in London.",
      task: "Write the invitation date correctly using the British format and proper prepositions."
    },
    everydayApplications: [
      "Comprendre les scores, prix et dates de sortie de jeux vidéo sur les serveurs UK/US.",
      "Donner ton âge, ton numéro ou ta date d'anniversaire à un anglophone sans faute.",
      "Réserver un billet de train ou d'avion sur un site en anglais."
    ],
    mnemonicTrick: "F-O-R-T-Y = 5 lettres et ZÉRO 'u' ! O-N = One single day (un jour précis) ! I-N = Inside the month (dans le mois) !",
    quizQuestions: [
      // === CHAPITRE 0 : NOMBRES CARDINAUX (1 à 1 000 000) ===
      {
        id: "ang_card_1",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 1",
        consigneFr: "Écris le nombre en toutes lettres : 1",
        points: 2,
        correctAnswer: "one",
        keywords: ["one"],
        explanation: "1 s'écrit 'one' !",
        hint: "Trois lettres : o - n - e."
      },
      {
        id: "ang_card_2",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 2",
        consigneFr: "Écris le nombre en toutes lettres : 2",
        points: 2,
        correctAnswer: "two",
        keywords: ["two"],
        explanation: "2 s'écrit 'two'.",
        hint: "Commence par t - w - o."
      },
      {
        id: "ang_card_3",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 4",
        consigneFr: "Écris le nombre en toutes lettres : 4",
        points: 2,
        correctAnswer: "four",
        keywords: ["four"],
        explanation: "4 s'écrit 'four' (avec un 'u'). Attention, c'est 'forty' (40) qui perd son 'u' !",
        hint: "Quatre lettres : f - o - u - r."
      },
      {
        id: "ang_card_4",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 8",
        consigneFr: "Écris le nombre en toutes lettres : 8",
        points: 2,
        correctAnswer: "eight",
        keywords: ["eight"],
        explanation: "8 s'écrit 'eight'.",
        hint: "Commence par e - i - g - h - t."
      },
      {
        id: "ang_card_5",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 11",
        consigneFr: "Écris le nombre en toutes lettres : 11",
        points: 2,
        correctAnswer: "eleven",
        keywords: ["eleven"],
        explanation: "11 s'écrit 'eleven'.",
        hint: "Commence par e - l - e - v - e - n."
      },
      {
        id: "ang_card_6",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 12",
        consigneFr: "Écris le nombre en toutes lettres : 12",
        points: 2,
        correctAnswer: "twelve",
        keywords: ["twelve"],
        explanation: "12 s'écrit 'twelve'.",
        hint: "Commence par t - w - e - l - v - e."
      },
      {
        id: "ang_card_7",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 13",
        consigneFr: "Écris le nombre en toutes lettres : 13",
        points: 2,
        correctAnswer: "thirteen",
        keywords: ["thirteen"],
        explanation: "13 s'écrit 'thirteen'. Pense à thir- suivi de -teen (avec deux 'e').",
        hint: "Commence par thir- et finit par -teen."
      },
      {
        id: "ang_card_8",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 14",
        consigneFr: "Écris le nombre en toutes lettres : 14",
        points: 2,
        correctAnswer: "fourteen",
        keywords: ["fourteen"],
        explanation: "14 s'écrit 'fourteen' (four + teen).",
        hint: "Le mot four suivi de teen."
      },
      {
        id: "ang_card_9",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 15",
        consigneFr: "Écris le nombre en toutes lettres : 15 (attention à la racine !)",
        points: 2,
        correctAnswer: "fifteen",
        keywords: ["fifteen"],
        explanation: "15 s'écrit 'fifteen' (avec fif- et non five-).",
        hint: "Pense à fif- suivi de -teen."
      },
      {
        id: "ang_card_10",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 20",
        consigneFr: "Écris le nombre en toutes lettres : 20",
        points: 2,
        correctAnswer: "twenty",
        keywords: ["twenty"],
        explanation: "20 s'écrit 'twenty'.",
        hint: "Commence par tw- et finit par -ty."
      },
      {
        id: "ang_card_11",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "Write in full letters: 21 (with the hyphen !)",
        consigneFr: "Écris le nombre en toutes lettres : 21 (avec le trait d'union !)",
        points: 2,
        correctAnswer: "twenty-one",
        keywords: ["twenty-one", "twenty one"],
        explanation: "21 s'écrit 'twenty-one'. En anglais, un trait d'union relie toujours la dizaine et l'unité de 21 à 99 !",
        hint: "La dizaine 'twenty', un trait d'union '-', puis l'unité 'one'."
      },
      {
        id: "ang_card_12",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 30",
        consigneFr: "Écris le nombre en toutes lettres : 30",
        points: 2,
        correctAnswer: "thirty",
        keywords: ["thirty"],
        explanation: "30 s'écrit 'thirty'.",
        hint: "Commence par thir- et finit par -ty."
      },
      {
        id: "ang_card_13",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "Write in full letters: 40 (careful with spelling !)",
        consigneFr: "Écris le nombre en toutes lettres : 40 (Attention au piège classique !)",
        points: 2,
        correctAnswer: "forty",
        keywords: ["forty"],
        explanation: "40 s'écrit 'forty' SANS 'u' ! C'est le piège numéro 1 des contrôles d'anglais en 6ème.",
        hint: "PIÈGE : contrairement à 'four', quarante perd son 'u' et s'écrit avec 5 lettres (f-o-r-t-y)."
      },
      {
        id: "ang_card_14",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 50",
        consigneFr: "Écris le nombre en toutes lettres : 50",
        points: 2,
        correctAnswer: "fifty",
        keywords: ["fifty"],
        explanation: "50 s'écrit 'fifty' (avec fif- et non five-).",
        hint: "fif- suivi de -ty."
      },
      {
        id: "ang_card_15",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "Write in full letters: 75",
        consigneFr: "Écris le nombre en toutes lettres : 75 (avec le trait d'union)",
        points: 2,
        correctAnswer: "seventy-five",
        keywords: ["seventy-five", "seventy five"],
        explanation: "75 s'écrit 'seventy-five'.",
        hint: "seventy + trait d'union + five."
      },
      {
        id: "ang_card_16",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the number: 80",
        consigneFr: "Écris le nombre en toutes lettres : 80",
        points: 2,
        correctAnswer: "eighty",
        keywords: ["eighty"],
        explanation: "80 s'écrit 'eighty' (un seul 't').",
        hint: "eight + y."
      },
      {
        id: "ang_card_17",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "Write in full letters: 100",
        consigneFr: "Écris le nombre en toutes lettres : 100 (cent)",
        points: 2,
        correctAnswer: "one hundred",
        keywords: ["one hundred", "a hundred", "hundred"],
        explanation: "100 s'écrit 'one hundred' (ou 'a hundred').",
        hint: "one + le mot h-u-n-d-r-e-d."
      },
      {
        id: "ang_card_18",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "Write in full letters: 250",
        consigneFr: "Écris en toutes lettres : 250 (deux cents et cinquante)",
        points: 3,
        correctAnswer: "two hundred and fifty",
        keywords: ["two hundred and fifty", "two hundred fifty"],
        explanation: "250 s'écrit 'two hundred and fifty'. Hundred ne prend pas de 's' car il y a un nombre devant !",
        hint: "two hundred + and + fifty."
      },
      {
        id: "ang_card_19",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "Write in full letters: 1,000",
        consigneFr: "Écris le nombre en toutes lettres : 1 000 (mille)",
        points: 2,
        correctAnswer: "one thousand",
        keywords: ["one thousand", "a thousand", "thousand"],
        explanation: "1 000 s'écrit 'one thousand' (ou 'a thousand').",
        hint: "one + t-h-o-u-s-a-n-d."
      },
      {
        id: "ang_card_20",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "Write in full letters: 5,000",
        consigneFr: "Écris le nombre en toutes lettres : 5 000 (cinq mille)",
        points: 3,
        correctAnswer: "five thousand",
        keywords: ["five thousand"],
        explanation: "5 000 s'écrit 'five thousand'. Attention, thousand ne prend JAMAIS de 's' quand il est précédé d'un chiffre !",
        hint: "five + thousand (pas de 's' à thousand !)."
      },
      {
        id: "ang_card_21",
        chapterId: "ang_ch0",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "Write in full letters: 1,000,000",
        consigneFr: "Écris le nombre en toutes lettres : 1 000 000 (un million)",
        points: 3,
        correctAnswer: "one million",
        keywords: ["one million", "a million", "million"],
        explanation: "1 000 000 s'écrit 'one million'.",
        hint: "one + m-i-l-l-i-o-n."
      },
      {
        id: "ang_card_22",
        chapterId: "ang_ch0",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "Which spelling is correct for the number 40 ?",
        consigneFr: "Quelle est la bonne orthographe pour le nombre 40 en anglais ?",
        points: 2,
        options: ["forty", "fourty", "fourti", "fortee"],
        correctIndex: 0,
        explanation: "C'est 'forty' ! Contrairement à 'four' (4), quarante s'écrit toujours SANS 'u'. C'est une faute très courante !",
        hint: "Retiens bien : pas de 'u' dans quarante !"
      },
      {
        id: "ang_card_23",
        chapterId: "ang_ch0",
        type: "vf",
        subject: "anglais",
        level: 2,
        titre: "Vrai ou Faux : En anglais, 'hundred', 'thousand' et 'million' prennent un 's' au pluriel quand ils sont précédés d'un nombre (ex: three thousands).",
        consigneFr: "Vrai ou Faux : Met-on un 's' à hundred, thousand ou million s'il y a un chiffre devant ?",
        points: 2,
        correctAnswer: "Faux",
        explanation: "C'est FAUX ! 'Hundred', 'thousand' et 'million' sont invariables lorsqu'ils sont précédés d'un nombre (on dit 'three thousand', jamais 'three thousands').",
        hint: "Pense à la règle : ils restent invariables après un chiffre."
      },

      // === CHAPITRE 1 : NOMBRES ORDINAUX (1st, 2nd, 3rd...) ===
      {
        id: "ang_1",
        chapterId: "ang_ch1",
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
        id: "ang_2",
        chapterId: "ang_ch1",
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
        id: "ang_3",
        chapterId: "ang_ch1",
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
        id: "ang_6",
        chapterId: "ang_ch1",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the ordinal number: 4th",
        consigneFr: "Écris en toutes lettres le nombre ordinal : 4th",
        points: 2,
        correctAnswer: "fourth",
        explanation: "4th = fourth (four + th).",
        hint: "Le chiffre 4 (four) suivi du son 'th'."
      },
      {
        id: "ang_7",
        chapterId: "ang_ch1",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write in full letters the ordinal number: 5th",
        consigneFr: "Écris en toutes lettres le nombre ordinal : 5th",
        points: 2,
        correctAnswer: "fifth",
        explanation: "5th = fifth (attention, five devient fif- !).",
        hint: "Ça commence par 'fif...'."
      },

      // === CHAPITRE 2 : PRÉPOSITIONS IN ET ON ===
      {
        id: "ang_4",
        chapterId: "ang_ch2",
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
        id: "ang_8",
        chapterId: "ang_ch2",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "Choose the correct preposition: 'The party is ______ Friday.'",
        consigneFr: "Choisis la bonne préposition : 'La fête est vendredi.'",
        points: 2,
        options: ["ON", "IN", "AT"],
        correctIndex: 0,
        explanation: "Pour un jour de la semaine précis (Friday), on utilise toujours ON !",
        hint: "Pense à la règle : un jour précis = ON."
      },
      {
        id: "ang_5",
        chapterId: "ang_ch2",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "Correct the capital letter and preposition: 'my birthday is on july.'",
        consigneFr: "Corrige la majuscule et la préposition : 'my birthday is on july.'",
        points: 4,
        correctAnswer: "My birthday is in July.",
        explanation: "Deux corrections nécessaires : Majuscules à 'My' et au mois 'July', et préposition 'in' devant un mois seul.",
        hint: "N'oublie pas : les mois en anglais prennent TOUJOURS une majuscule !"
      },
      {
        id: "ang_9",
        chapterId: "ang_ch2",
        type: "vf",
        subject: "anglais",
        level: 2,
        titre: "Vrai ou Faux : En anglais, les jours et les mois prennent obligatoirement une MAJUSCULE (ex: Monday, October).",
        points: 2,
        correctAnswer: "Vrai",
        explanation: "C'est VRAI ! Contrairement au français, l'anglais met toujours une majuscule aux jours et mois.",
        hint: "Regarde comment on écrit Monday ou July."
      },

      // === CHAPITRE 3 : LES DATES UK & US (20 QUESTIONS ALIGNÉES SUR LE CONTRÔLE DYS) ===
      // --- 1. 8 QUESTIONS EN BRIQUES DE MOTS À ORDONNER (SCAFFOLDING DYS - 40 %) ---
      {
        id: "ang_date_briques_uk_1",
        chapterId: "ang_ch3",
        type: "briques",
        subject: "anglais",
        level: 2,
        titre: "🇬🇧 Briques UK (1/8) • Clique sur les étiquettes pour composer la date : 'Lundi 2 décembre'",
        consigneFr: "Remets les étiquettes dans le bon ordre au format UK complet : Lundi 2 décembre",
        points: 2,
        correctBricks: ["Monday", "the", "2nd", "of", "December"],
        bricksBank: ["Monday", "the", "2nd", "of", "December", "in", "on", "2th", "Décembre"],
        explanation: "Au format britannique complet, la structure est : Monday THE 2nd OF December. N'oublie pas la majuscule à Monday et December !",
        hint: "Ordre UK : Jour (Monday) ➡️ the ➡️ ordinal (2nd) ➡️ of ➡️ mois (December)."
      },
      {
        id: "ang_date_briques_uk_2",
        chapterId: "ang_ch3",
        type: "briques",
        subject: "anglais",
        level: 2,
        titre: "🇬🇧 Briques UK (2/8) • Clique sur les étiquettes pour composer la date : 'Mercredi 24 mars'",
        consigneFr: "Remets les étiquettes dans le bon ordre au format UK complet : Mercredi 24 mars",
        points: 2,
        correctBricks: ["Wednesday", "the", "24th", "of", "March"],
        bricksBank: ["Wednesday", "the", "24th", "of", "March", "at", "Mars", "24st", "in"],
        explanation: "Format UK : Wednesday the 24th of March. 24ème se termine en 'th' (twenty-fourth) et Mars s'écrit March !",
        hint: "Mercredi = Wednesday, 24th = twenty-fourth, mars = March."
      },
      {
        id: "ang_date_briques_uk_3",
        chapterId: "ang_ch3",
        type: "briques",
        subject: "anglais",
        level: 2,
        titre: "🇬🇧 Briques UK (3/8) • Clique sur les étiquettes pour composer la date : 'Vendredi 1er mai'",
        consigneFr: "Remets les étiquettes dans le bon ordre au format UK complet : Vendredi 1er mai",
        points: 2,
        correctBricks: ["Friday", "the", "1st", "of", "May"],
        bricksBank: ["Friday", "the", "1st", "of", "May", "1th", "Mai", "on", "of"],
        explanation: "1er se dit 'first', donc 1st (avec 'st'). Format UK : Friday the 1st of May.",
        hint: "1er = 1st (first), mai = May."
      },
      {
        id: "ang_date_briques_uk_4",
        chapterId: "ang_ch3",
        type: "briques",
        subject: "anglais",
        level: 2,
        titre: "🇬🇧 Briques UK (4/8) • Clique sur les étiquettes pour composer la date : 'Dimanche 31 août'",
        consigneFr: "Remets les étiquettes dans le bon ordre au format UK complet : Dimanche 31 août",
        points: 2,
        correctBricks: ["Sunday", "the", "31st", "of", "August"],
        bricksBank: ["Sunday", "the", "31st", "of", "August", "31th", "Aout", "in", "the"],
        explanation: "Dimanche = Sunday. 31ème = thirty-first ➡️ 31st. Août = August. Format UK : Sunday the 31st of August.",
        hint: "31 se termine par 1 (first ➡️ 31st), et Août = August."
      },
      {
        id: "ang_date_briques_us_1",
        chapterId: "ang_ch3",
        type: "briques",
        subject: "anglais",
        level: 2,
        titre: "🇺🇸 Briques US (5/8) • Clique sur les étiquettes pour composer la date : 'Lundi 2 décembre' (Format américain avec virgule)",
        consigneFr: "Remets les étiquettes dans le bon ordre au format US : Lundi 2 décembre",
        points: 2,
        correctBricks: ["Monday,", "December", "2nd"],
        bricksBank: ["Monday,", "December", "2nd", "the", "of", "2th", "Monday"],
        explanation: "Au format américain (US), le mois se place AVANT le jour et on met une virgule obligatoire après le jour de la semaine : Monday, December 2nd.",
        hint: "Ordre US : Jour avec virgule (Monday,) ➡️ Mois (December) ➡️ Ordinal (2nd)."
      },
      {
        id: "ang_date_briques_us_2",
        chapterId: "ang_ch3",
        type: "briques",
        subject: "anglais",
        level: 2,
        titre: "🇺🇸 Briques US (6/8) • Clique sur les étiquettes pour composer la date : 'Samedi 6 décembre' (Format américain avec virgule)",
        consigneFr: "Remets les étiquettes dans le bon ordre au format US : Samedi 6 décembre",
        points: 2,
        correctBricks: ["Saturday,", "December", "6th"],
        bricksBank: ["Saturday,", "December", "6th", "the", "of", "Saturday", "6st"],
        explanation: "Format US : Saturday, December 6th. Ne pas oublier la virgule après 'Saturday' ni la majuscule à December !",
        hint: "Samedi = Saturday, virgule, December, 6th."
      },
      {
        id: "ang_date_briques_us_3",
        chapterId: "ang_ch3",
        type: "briques",
        subject: "anglais",
        level: 2,
        titre: "🇺🇸 Briques US (7/8) • Clique sur les étiquettes pour composer la date : 'Mardi 1er avril' (Format américain avec virgule)",
        consigneFr: "Remets les étiquettes dans le bon ordre au format US : Mardi 1er avril",
        points: 2,
        correctBricks: ["Tuesday,", "April", "1st"],
        bricksBank: ["Tuesday,", "April", "1st", "Avril", "1th", "Tuesday", "in"],
        explanation: "Mardi = Tuesday. Avril = April. 1er = 1st. Format US : Tuesday, April 1st.",
        hint: "Tuesday, + April + 1st."
      },
      {
        id: "ang_date_briques_us_4",
        chapterId: "ang_ch3",
        type: "briques",
        subject: "anglais",
        level: 2,
        titre: "🇺🇸 Briques US (8/8) • Clique sur les étiquettes pour composer la date : 'Jeudi 3 septembre' (Format américain avec virgule)",
        consigneFr: "Remets les étiquettes dans le bon ordre au format US : Jeudi 3 septembre",
        points: 2,
        correctBricks: ["Thursday,", "September", "3rd"],
        bricksBank: ["Thursday,", "September", "3rd", "3th", "the", "Thursday", "of"],
        explanation: "Jeudi = Thursday. Septembre = September. 3ème = 3rd (third). Format US : Thursday, September 3rd.",
        hint: "Thursday, + September + 3rd."
      },

      // --- 2. 6 QUESTIONS EN SAISIE CLAVIER LIBRE (3 UK + 3 US - 30 %) ---
      {
        id: "ang_date_clavier_uk_1",
        chapterId: "ang_ch3",
        type: "libre",
        subject: "anglais",
        level: 3,
        titre: "🇬🇧 Saisie Clavier UK (1/6) • Écris la date complète au format britannique : 'Mardi 3 novembre'",
        consigneFr: "Tape la date complète au format UK : Mardi 3 novembre",
        points: 3,
        correctAnswer: "Tuesday the 3rd of November",
        keywords: ["Tuesday", "the", "3rd", "of", "November"],
        criteriaChecklist: [
          { label: "1. Majuscules obligatoires (Tuesday, November)", keywords: ["Tuesday", "November"] },
          { label: "2. Mots de liaison 'the' et 'of' présents", keywords: ["the", "of"] },
          { label: "3. Ordinal exact (3rd)", keywords: ["3rd"] }
        ],
        explanation: "Format britannique complet attendu : 'Tuesday the 3rd of November'. N'oublie ni la majuscule ni 'the' et 'of' !",
        hint: "Mardi = Tuesday, 3ème = 3rd, novembre = November."
      },
      {
        id: "ang_date_clavier_uk_2",
        chapterId: "ang_ch3",
        type: "libre",
        subject: "anglais",
        level: 3,
        titre: "🇬🇧 Saisie Clavier UK (2/6) • Écris la date complète au format britannique : 'Jeudi 22 octobre'",
        consigneFr: "Tape la date complète au format UK : Jeudi 22 octobre",
        points: 3,
        correctAnswer: "Thursday the 22nd of October",
        keywords: ["Thursday", "the", "22nd", "of", "October"],
        criteriaChecklist: [
          { label: "1. Majuscules obligatoires (Thursday, October)", keywords: ["Thursday", "October"] },
          { label: "2. Mots de liaison 'the' et 'of' présents", keywords: ["the", "of"] },
          { label: "3. Ordinal exact (22nd)", keywords: ["22nd"] }
        ],
        explanation: "Format britannique complet attendu : 'Thursday the 22nd of October'. 22 se termine par 2 (second ➡️ 22nd).",
        hint: "Jeudi = Thursday, 22nd = twenty-second, octobre = October."
      },
      {
        id: "ang_date_clavier_uk_3",
        chapterId: "ang_ch3",
        type: "libre",
        subject: "anglais",
        level: 3,
        titre: "🇬🇧 Saisie Clavier UK (3/6) • Écris la date complète au format britannique : 'Samedi 11 juillet'",
        consigneFr: "Tape la date complète au format UK : Samedi 11 juillet",
        points: 3,
        correctAnswer: "Saturday the 11th of July",
        keywords: ["Saturday", "the", "11th", "of", "July"],
        criteriaChecklist: [
          { label: "1. Majuscules obligatoires (Saturday, July)", keywords: ["Saturday", "July"] },
          { label: "2. Mots de liaison 'the' et 'of' présents", keywords: ["the", "of"] },
          { label: "3. Piège ordinal évité : 11th (et non 11st)", keywords: ["11th"] }
        ],
        explanation: "Format britannique complet attendu : 'Saturday the 11th of July'. Attention au piège : 11 se dit eleventh ➡️ 11th (PAS 11st) !",
        hint: "Samedi = Saturday, 11th = eleventh, juillet = July."
      },
      {
        id: "ang_date_clavier_us_1",
        chapterId: "ang_ch3",
        type: "libre",
        subject: "anglais",
        level: 3,
        titre: "🇺🇸 Saisie Clavier US (4/6) • Écris la date complète au format américain avec la virgule : 'Vendredi 23 janvier'",
        consigneFr: "Tape la date complète au format US avec virgule : Vendredi 23 janvier",
        points: 3,
        correctAnswer: "Friday, January 23rd",
        keywords: ["Friday", "January", "23rd", ","],
        criteriaChecklist: [
          { label: "1. Majuscules obligatoires (Friday, January)", keywords: ["Friday", "January"] },
          { label: "2. Virgule obligatoire après le jour (Friday,)", keywords: [",", "Friday,"] },
          { label: "3. Ordre US : Mois avant le jour (January 23rd)", keywords: ["January", "23rd"] }
        ],
        explanation: "Format américain attendu : 'Friday, January 23rd'. Attention à la virgule après Friday et au mois January placé avant le jour 23rd !",
        hint: "Friday, + January + 23rd."
      },
      {
        id: "ang_date_clavier_us_2",
        chapterId: "ang_ch3",
        type: "libre",
        subject: "anglais",
        level: 3,
        titre: "🇺🇸 Saisie Clavier US (5/6) • Écris la date complète au format américain avec la virgule : 'Mercredi 15 juin'",
        consigneFr: "Tape la date complète au format US avec virgule : Mercredi 15 juin",
        points: 3,
        correctAnswer: "Wednesday, June 15th",
        keywords: ["Wednesday", "June", "15th", ","],
        criteriaChecklist: [
          { label: "1. Majuscules obligatoires (Wednesday, June)", keywords: ["Wednesday", "June"] },
          { label: "2. Virgule obligatoire après le jour (Wednesday,)", keywords: [",", "Wednesday,"] },
          { label: "3. Ordre US : Mois avant le jour (June 15th)", keywords: ["June", "15th"] }
        ],
        explanation: "Format américain attendu : 'Wednesday, June 15th'. Mercredi = Wednesday, juin = June, 15th.",
        hint: "Wednesday, + June + 15th."
      },
      {
        id: "ang_date_clavier_us_3",
        chapterId: "ang_ch3",
        type: "libre",
        subject: "anglais",
        level: 3,
        titre: "🇺🇸 Saisie Clavier US (6/6) • Écris la date complète au format américain avec la virgule : 'Dimanche 22 février'",
        consigneFr: "Tape la date complète au format US avec virgule : Dimanche 22 février",
        points: 3,
        correctAnswer: "Sunday, February 22nd",
        keywords: ["Sunday", "February", "22nd", ","],
        criteriaChecklist: [
          { label: "1. Majuscules obligatoires (Sunday, February)", keywords: ["Sunday", "February"] },
          { label: "2. Virgule obligatoire après le jour (Sunday,)", keywords: [",", "Sunday,"] },
          { label: "3. Ordre US : Mois avant le jour (February 22nd)", keywords: ["February", "22nd"] }
        ],
        explanation: "Format américain attendu : 'Sunday, February 22nd'. Dimanche = Sunday, février = February, 22nd = twenty-second.",
        hint: "Sunday, + February + 22nd."
      },

      // --- 3. 4 QUESTIONS IDENTIFY THE MISTAKE (REPÉRER LES 4 ERREURS DU COURS - 20 %) ---
      {
        id: "ang_mistake_capitals",
        chapterId: "ang_ch3",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "🔍 Identify the mistake (1/4) • 'We have English on saturday the 18th of april.' Quelle est la faute majeure dans cette date ?",
        consigneFr: "Trouve la faute dans : 'We have English on saturday the 18th of april.'",
        points: 2,
        options: [
          "Oubli des majuscules : 'saturday' et 'april' doivent obligatoirement s'écrire 'Saturday' et 'April'",
          "18th est faux, il fallait écrire 18st",
          "La préposition 'on' est fausse, il fallait mettre 'in'",
          "Il n'y a aucune faute dans cette phrase"
        ],
        correctIndex: 0,
        explanation: "En anglais, les jours de la semaine (Saturday) et les mois (April) prennent TOUJOURS une majuscule obligatoire !",
        hint: "Regarde bien la première lettre de saturday et april."
      },
      {
        id: "ang_mistake_french_word",
        chapterId: "ang_ch3",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "🔍 Identify the mistake (2/4) • 'Today is Tuesday the 15th of Décembre.' Quel est le piège glissé par inattention dans cette date ?",
        consigneFr: "Trouve l'erreur dans : 'Today is Tuesday the 15th of Décembre.'",
        points: 2,
        options: [
          "Le mot français 'Décembre' avec un accent é au lieu du mot anglais 'December'",
          "Tuesday est mal orthographié",
          "Le suffixe 15th est faux",
          "Il fallait mettre 'on' à la place de 'the'"
        ],
        correctIndex: 0,
        explanation: "En anglais, décembre s'écrit December sans aucun accent (les accents n'existent pas en anglais) et se termine en -er !",
        hint: "Regarde l'orthographe du mois : y a-t-il un accent en anglais ?"
      },
      {
        id: "ang_mistake_the_of",
        chapterId: "ang_ch3",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "🔍 Identify the mistake (3/4) • Dans le contrôle UK : 'Today is Friday 2nd October', que manque-t-il obligatoirement selon la consigne du professeur ?",
        consigneFr: "Trouve ce qui manque dans la date UK : 'Today is Friday 2nd October'",
        points: 2,
        options: [
          "Il manque 'the' devant le nombre ordinal et 'of' devant le mois : 'Friday THE 2nd OF October'",
          "Il manque une virgule après Friday comme aux États-Unis",
          "Le mot Friday prend un 's' à la fin",
          "October s'écrit avec un 'k'"
        ],
        correctIndex: 0,
        explanation: "Au format britannique complet exigé en 6ème, 'the' et 'of' sont obligatoires à l'oral comme à l'écrit formel : Friday the 2nd of October !",
        hint: "Pense aux deux petits mots indispensables du format UK : the et of."
      },
      {
        id: "ang_mistake_ordinal_suffix",
        chapterId: "ang_ch3",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "🔍 Identify the mistake (4/4) • 'My little brother was born on Monday, May 1th.' Quel est le piège d'abréviation ordinale dans cette date ?",
        consigneFr: "Trouve la faute dans : 'My little brother was born on Monday, May 1th.'",
        points: 2,
        options: [
          "1th est faux : 1er se dit 'first' et s'abrège obligatoirement '1st' !",
          "May doit s'écrire 'Mai'",
          "La virgule après Monday est interdite",
          "Monday doit s'écrire sans majuscule"
        ],
        correctIndex: 0,
        explanation: "1er se dit 'first', donc la terminaison est 'st' (1st). Le suffixe 'th' n'arrive qu'à partir de 4th (sauf exceptions 11th, 12th, 13th) !",
        hint: "1st = first, 2nd = second, 3rd = third."
      },

      // --- 4. 2 QUESTIONS DE DICTÉE AUDIO (1 UK + 1 US - 10 %) ---
      {
        id: "ang_oral_listening_1",
        chapterId: "ang_ch3",
        type: "qcm",
        subject: "anglais",
        level: 2,
        isOralListening: true,
        audioDictationText: "Wednesday the 24th of March",
        titre: "🎧 Dictée Audio UK (1/2) • Écoute la date dictée en anglais en cliquant sur le haut-parleur, puis choisis la transcription exacte :",
        consigneFr: "Écoute la date dictée en anglais UK et choisis la bonne écriture parmi les 3 propositions",
        points: 3,
        options: [
          "Wednesday the 24th of March",
          "Wednesday the 21st of March",
          "Wednesday the 24th of May"
        ],
        correctIndex: 0,
        explanation: "Tu as bien entendu 'Wednesday the twenty-fourth of March' = Wednesday the 24th of March !",
        hint: "Écoute bien le numéro (twenty-fourth) et le mois (March)."
      },
      {
        id: "ang_oral_listening_2",
        chapterId: "ang_ch3",
        type: "qcm",
        subject: "anglais",
        level: 2,
        isOralListening: true,
        audioDictationText: "Friday, December 2nd",
        titre: "🎧 Dictée Audio US (2/2) • Écoute la date dictée en anglais en cliquant sur le haut-parleur, puis choisis la transcription exacte :",
        consigneFr: "Écoute la date dictée en anglais US et choisis la bonne écriture parmi les 3 propositions",
        points: 3,
        options: [
          "Friday, December 2nd",
          "Friday, December 12th",
          "Friday the 2nd of December"
        ],
        correctIndex: 0,
        explanation: "La dictée anglaise a prononcé 'Friday, December second' avec le mois avant le jour : c'est le format US Friday, December 2nd !",
        hint: "Écoute l'ordre des mots : le mois December est prononcé avant le jour second."
      },

      // === CHAPITRE 4 : THE 4 NATIONS OF THE UK (Countries, Capitals & Emblems) ===
      {
        id: "ang_uk_1",
        chapterId: "ang_ch4",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "How many nations form the United Kingdom (The UK) ?",
        consigneFr: "Combien de nations forment le Royaume-Uni (The UK) ?",
        points: 2,
        options: [
          "4 nations (England, Scotland, Wales, Northern Ireland)",
          "3 nations seulement",
          "1 seul grand pays"
        ],
        correctIndex: 0,
        explanation: "The United Kingdom is composed of 4 nations: England, Scotland, Wales, and Northern Ireland !",
        hint: "Pense au quatuor uni sous The Union Jack."
      },
      {
        id: "ang_uk_2",
        chapterId: "ang_ch4",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "What is the capital city of England ?",
        consigneFr: "Quelle est la capitale de l'Angleterre (England) ?",
        points: 2,
        correctAnswer: "London",
        keywords: ["london", "londres"],
        explanation: "The capital of England is London !",
        hint: "Commence par L - o - n - d - o - n."
      },
      {
        id: "ang_uk_3",
        chapterId: "ang_ch4",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "What is the capital city of Scotland ?",
        consigneFr: "Quelle est la capitale de l'Écosse (Scotland) ?",
        points: 2,
        correctAnswer: "Edinburgh",
        keywords: ["edinburgh", "edimbourg"],
        explanation: "The capital of Scotland is Edinburgh (Édimbourg) !",
        hint: "Commence par E - d - i - n - b - u - r - g - h."
      },
      {
        id: "ang_uk_4",
        chapterId: "ang_ch4",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "What is the capital city of Wales ?",
        consigneFr: "Quelle est la capitale du Pays de Galles (Wales) ?",
        points: 2,
        correctAnswer: "Cardiff",
        keywords: ["cardiff"],
        explanation: "The capital of Wales is Cardiff !",
        hint: "Commence par C - a - r - d - i - f - f."
      },
      {
        id: "ang_uk_5",
        chapterId: "ang_ch4",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "What is the capital city of Northern Ireland ?",
        consigneFr: "Quelle est la capitale de l'Irlande du Nord (Northern Ireland) ?",
        points: 2,
        correctAnswer: "Belfast",
        keywords: ["belfast"],
        explanation: "The capital of Northern Ireland is Belfast !",
        hint: "Commence par B - e - l - f - a - s - t."
      },
      {
        id: "ang_uk_6",
        chapterId: "ang_ch4",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "What is the floral emblem of Scotland ?",
        consigneFr: "Quel est l'emblème floral de l'Écosse (Scotland) ?",
        points: 2,
        options: [
          "The Thistle (Le Chardon violet)",
          "The Tudor Rose (La Rose rouge)",
          "The Shamrock (Le Trèfle)"
        ],
        correctIndex: 0,
        explanation: "The Thistle (le chardon violet piquant) est l'emblème légendaire de l'Écosse !",
        hint: "C'est une plante piquante violette."
      },
      {
        id: "ang_uk_7",
        chapterId: "ang_ch4",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "What is the floral emblem of England ?",
        consigneFr: "Quel est l'emblème floral de l'Angleterre (England) ?",
        points: 2,
        options: [
          "The Tudor Rose (La Rose rouge)",
          "The Daffodil (La Jonquille)",
          "The Thistle (Le Chardon)"
        ],
        correctIndex: 0,
        explanation: "The Tudor Rose (la rose rouge) est l'emblème historique officiel de l'Angleterre !",
        hint: "Une fleur rouge très connue."
      },
      {
        id: "ang_uk_8",
        chapterId: "ang_ch4",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "What are the two plant emblems of Wales (Pays de Galles) ?",
        consigneFr: "Quels sont les deux emblèmes végétaux du Pays de Galles (Wales) ?",
        points: 2,
        options: [
          "The Daffodil (Jonquille) & The Leek (Poireau)",
          "The Rose & The Tulip",
          "The Shamrock & The Thistle"
        ],
        correctIndex: 0,
        explanation: "The Daffodil (la jonquille jaune) et The Leek (le poireau) sont les emblèmes du Pays de Galles !",
        hint: "Une fleur jaune et un légume à soupe !"
      },
      {
        id: "ang_uk_9",
        chapterId: "ang_ch4",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "What is the emblem of Northern Ireland (Irlande du Nord) ?",
        consigneFr: "Quel est l'emblème de l'Irlande du Nord ?",
        points: 2,
        options: [
          "The Shamrock (Le Trèfle à 3 feuilles)",
          "The Thistle (Le Chardon)",
          "The Red Rose"
        ],
        correctIndex: 0,
        explanation: "The Shamrock (le trèfle à 3 feuilles) de St Patrick est l'emblème de l'Irlande du Nord !",
        hint: "Une petite plante verte porte-bonheur."
      },
      {
        id: "ang_uk_10",
        chapterId: "ang_ch4",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "What is the nationality of people living in Wales ?",
        consigneFr: "Quelle est la nationalité des habitants du Pays de Galles ?",
        points: 2,
        options: ["Welsh", "English", "Scottish"],
        correctIndex: 0,
        explanation: "Les habitants du Pays de Galles sont les Welsh (Gallois) !",
        hint: "Commence par W - e - l - s - h."
      },
      {
        id: "ang_uk_11",
        chapterId: "ang_ch4",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "What is the official name of the British flag ?",
        consigneFr: "Quel est le nom officiel du drapeau britannique ?",
        points: 3,
        correctAnswer: "The Union Jack",
        keywords: ["the union jack", "union jack"],
        explanation: "The flag of the UK is officially called The Union Jack !",
        hint: "Union + Jack !"
      },

      // === CHAPITRE 5 : CLASSROOM ENGLISH (Consignes du prof & Questions des élèves) ===
      {
        id: "ang_class_1",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "How do you politely ask to go to the toilets in English ? (May I...)",
        consigneFr: "Comment demandes-tu poliment d'aller aux toilettes en classe ? (May I...)",
        points: 3,
        correctAnswer: "May I go to the toilets",
        keywords: ["may i go to the toilets", "can i go to the toilets", "may i go to the toilet"],
        explanation: "'May I go to the toilets, please ?' est la formule indispensable et très polie attendue par le prof !",
        hint: "May I go to the toilets, please ?"
      },
      {
        id: "ang_class_2",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "How do you ask to open the window in English ? (Can I...)",
        consigneFr: "Comment demandes-tu l'autorisation d'ouvrir la fenêtre ? (Can I...)",
        points: 3,
        correctAnswer: "Can I open the window",
        keywords: ["can i open the window", "may i open the window"],
        explanation: "'Can I open the window ?' permet de demander l'autorisation d'ouvrir la fenêtre !",
        hint: "Can I open the window, please ?"
      },
      {
        id: "ang_class_3",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "What does the teacher say when you must raise your hand before speaking ?",
        consigneFr: "Que dit le professeur pour te demander de lever la main avant de parler ?",
        points: 2,
        options: [
          "Raise your hand !",
          "Sit down !",
          "Open your copybook !"
        ],
        correctIndex: 0,
        explanation: "'Raise your hand !' (ou 'Put up your hand') signifie : Lève la main !",
        hint: "Raise = lever / hand = la main."
      },
      {
        id: "ang_class_4",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "What does the teacher say when the classroom must be completely silent ?",
        consigneFr: "Que dit le professeur quand tout le monde doit faire silence en classe ?",
        points: 2,
        options: ["Be quiet !", "Speak up !", "Stand up !"],
        correctIndex: 0,
        explanation: "'Be quiet !' signifie 'Silence !' ou 'Sois calme !'.",
        hint: "Quiet = silencieux / calme."
      },
      {
        id: "ang_class_5",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "What do you say in English when you don't understand the teacher's lesson ?",
        consigneFr: "Que dis-tu en anglais quand tu ne comprends pas ce que dit le professeur ?",
        points: 3,
        correctAnswer: "I don't understand",
        keywords: ["i don't understand", "i dont understand"],
        explanation: "'I don't understand' signifie 'Je ne comprends pas'.",
        hint: "I don't + u-n-d-e-r-s-t-a-n-d."
      },
      {
        id: "ang_class_6",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "How do you ask the teacher how to say a French word in English ? (What's the...)",
        consigneFr: "Comment demandes-tu la traduction d'un mot en anglais au professeur ? (What's the...)",
        points: 3,
        correctAnswer: "What's the word for",
        keywords: ["what's the word for", "whats the word for", "how do you say"],
        explanation: "'What's the word for [merci] ?' ou 'How do you say [merci] in English ?'.",
        hint: "What's the word for..."
      },
      {
        id: "ang_class_7",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "How do you ask to switch on the lights in the classroom ?",
        consigneFr: "Comment demandes-tu pour allumer la lumière en classe ?",
        points: 2,
        options: [
          "Can I switch on the light ?",
          "Can I close the light ?",
          "Open the light please"
        ],
        correctIndex: 0,
        explanation: "En anglais, on dit 'switch on the light' pour allumer la lumière (et 'switch off' pour éteindre) !",
        hint: "Pense à 'switch on' = allumer."
      },
      {
        id: "ang_class_8",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "What does the teacher mean by: 'Stand up !' ?",
        consigneFr: "Que signifie la consigne du professeur : 'Stand up !' ?",
        points: 2,
        options: ["Lève-toi / Levez-vous !", "Assieds-toi !", "Sors de la classe !"],
        correctIndex: 0,
        explanation: "'Stand up !' signifie 'Lève-toi !' ou 'Mettez-vous debout !'.",
        hint: "Stand = être debout / up = vers le haut."
      },
      {
        id: "ang_class_9",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "What does the teacher say to tell students to sit in their chairs ?",
        consigneFr: "Que dit le professeur pour dire aux élèves de s'asseoir ?",
        points: 2,
        options: ["Sit down !", "Stand up !", "Run down !"],
        correctIndex: 0,
        explanation: "'Sit down !' signifie 'Assieds-toi !' ou 'Asseyez-vous !'.",
        hint: "Sit = s'asseoir / down = vers le bas."
      },
      {
        id: "ang_class_10",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write the instruction: 'Ouvre ton livre' in English",
        consigneFr: "Écris la consigne en anglais : 'Ouvre ton livre' (Open your...)",
        points: 2,
        correctAnswer: "Open your book",
        keywords: ["open your book", "open your books"],
        explanation: "'Open your book !' signifie 'Ouvre ton livre !'.",
        hint: "Open + your + book."
      },
      {
        id: "ang_class_11",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "Write the instruction: 'Ferme ton cahier' in English",
        consigneFr: "Écris la consigne en anglais : 'Ferme ton cahier' (Close your...)",
        points: 2,
        correctAnswer: "Close your copybook",
        keywords: ["close your copybook", "close your notebook"],
        explanation: "'Close your copybook !' signifie 'Ferme ton cahier !'. (copybook = cahier).",
        hint: "Close + your + copybook."
      },
      {
        id: "ang_class_12",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "Which order means you must listen carefully to the audio or teacher ?",
        consigneFr: "Quelle consigne signifie que tu dois écouter attentivement le professeur ou l'audio ?",
        points: 2,
        options: ["Listen !", "Look !", "Write !"],
        correctIndex: 0,
        explanation: "'Listen !' signifie 'Écoute !'. Pense aux écouteurs et à la musique !",
        hint: "Le mot commence par 'L' et a un 't' muet."
      },
      {
        id: "ang_class_13",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "How do you say 'Regarde le tableau' in English ?",
        consigneFr: "Comment dis-tu 'Regarde le tableau' en anglais ? (Look at...)",
        points: 2,
        correctAnswer: "Look at the board",
        keywords: ["look at the board", "look at board"],
        explanation: "'Look at the board !' signifie 'Regarde le tableau !' (board = le tableau de classe).",
        hint: "Look at the board."
      },
      {
        id: "ang_class_14",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "Which verb means 'Lire' in English ?",
        consigneFr: "Quel verbe signifie 'Lire' quand le professeur te demande de lire un texte ?",
        points: 2,
        options: ["Read", "Write", "Speak"],
        correctIndex: 0,
        explanation: "'Read' (prononcé 'riid') signifie 'Lire' !",
        hint: "R-E-A-D."
      },
      {
        id: "ang_class_15",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "Which verb means 'Écrire' in English ?",
        consigneFr: "Quel verbe signifie 'Écrire' en anglais ?",
        points: 2,
        options: ["Write", "Read", "Listen"],
        correctIndex: 0,
        explanation: "'Write' (avec un 'W' muet) signifie 'Écrire' !",
        hint: "W-R-I-T-E."
      },
      {
        id: "ang_class_16",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "How does the teacher say 'Répète après moi' in English ?",
        consigneFr: "Que dit le professeur pour 'Répète après moi' ? (Repeat...)",
        points: 2,
        correctAnswer: "Repeat after me",
        keywords: ["repeat after me"],
        explanation: "'Repeat after me !' signifie 'Répète après moi !'.",
        hint: "Repeat + after + me."
      },
      {
        id: "ang_class_17",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "What does 'Come to the board !' mean ?",
        consigneFr: "Que signifie la consigne 'Come to the board !' ?",
        points: 2,
        options: [
          "Viens au tableau !",
          "Retourne à ta place !",
          "Ouvre la porte !"
        ],
        correctIndex: 0,
        explanation: "'Come to the board !' signifie 'Viens au tableau !'.",
        hint: "Come = venir / board = le tableau."
      },
      {
        id: "ang_class_18",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "What does 'Take your pen !' mean ?",
        consigneFr: "Que signifie 'Take your pen !' ?",
        points: 2,
        options: [
          "Prends ton stylo !",
          "Range ta trousse !",
          "Prête ta règle !"
        ],
        correctIndex: 0,
        explanation: "'Take your pen !' signifie 'Prends ton stylo !' (pen = stylo, pencil = crayon à papier).",
        hint: "Take = prendre / pen = stylo."
      },
      {
        id: "ang_class_19",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "What does the teacher say at the end of the lesson to say 'Rangez vos affaires' ?",
        consigneFr: "Que dit le professeur à la fin du cours pour dire 'Rangez vos affaires' ? (Put away...)",
        points: 3,
        correctAnswer: "Put away your things",
        keywords: ["put away your things", "put away your school things", "pack your bags"],
        explanation: "'Put away your things !' signifie 'Rangez vos affaires !'.",
        hint: "Put away your things."
      },
      {
        id: "ang_class_20",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "What does 'Copy the lesson !' mean in French ?",
        consigneFr: "Que signifie 'Copy the lesson !' en français ?",
        points: 2,
        options: [
          "Copie la leçon dans ton cahier !",
          "Apprends la leçon par cœur !",
          "Rends ta feuille d'évaluation !"
        ],
        correctIndex: 0,
        explanation: "'Copy the lesson !' signifie 'Copie la leçon !'.",
        hint: "Copy = copier / lesson = leçon."
      },
      {
        id: "ang_class_21",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "What does 'Stick the worksheet !' mean ?",
        consigneFr: "Que signifie 'Stick the worksheet !' ?",
        points: 2,
        options: [
          "Colle la feuille d'exercices dans ton cahier !",
          "Déchire la feuille !",
          "Range ton livre sous la table !"
        ],
        correctIndex: 0,
        explanation: "'Stick the worksheet !' signifie 'Colle la feuille (d'exercices) !' (stick = coller, worksheet = feuille de travail).",
        hint: "Pense au bâton de colle (glue stick)."
      },
      {
        id: "ang_class_22",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "What does 'Underline the title !' mean ?",
        consigneFr: "Que signifie la consigne 'Underline the title !' ?",
        points: 2,
        options: [
          "Souligne le titre !",
          "Efface le titre !",
          "Écris le titre en majuscules !"
        ],
        correctIndex: 0,
        explanation: "'Underline the title !' signifie 'Souligne le titre !' (under = sous, line = ligne -> tracer une ligne dessous).",
        hint: "Under = sous / line = ligne."
      },
      {
        id: "ang_class_23",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "What does 'Work in pairs !' mean in English class ?",
        consigneFr: "Que signifie 'Work in pairs !' en cours d'anglais ?",
        points: 2,
        options: [
          "Travaillez par deux (en binôme) !",
          "Travaillez seul en silence !",
          "Travaillez par groupe de quatre !"
        ],
        correctIndex: 0,
        explanation: "'Work in pairs !' signifie 'Travaillez par deux / en binôme !' (pair = une paire = 2 élèves).",
        hint: "Pair = une paire (2 personnes)."
      },
      {
        id: "ang_class_24",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "How do you ask permission to close the window ? (Can I...)",
        consigneFr: "Comment demandes-tu poliment l'autorisation de fermer la fenêtre ? (Can I...)",
        points: 3,
        correctAnswer: "Can I close the window",
        keywords: ["can i close the window", "may i close the window"],
        explanation: "'Can I close the window, please ?' permet de demander à fermer la fenêtre s'il fait froid !",
        hint: "Can I close the window, please ?"
      },
      {
        id: "ang_class_25",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "How do you ask permission to switch off the light in the classroom ?",
        consigneFr: "Comment demandes-tu l'autorisation d'éteindre la lumière en classe ?",
        points: 2,
        options: [
          "Can I switch off the light ?",
          "Can I switch on the light ?",
          "Close the light please"
        ],
        correctIndex: 0,
        explanation: "'Can I switch off the light, please ?' : on utilise 'switch off' pour éteindre !",
        hint: "Switch off = éteindre."
      },
      {
        id: "ang_class_26",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "How do you ask permission to drink some water in English ? (May I...)",
        consigneFr: "Comment demandes-tu l'autorisation de boire de l'eau en classe ? (May I...)",
        points: 3,
        correctAnswer: "May I drink some water",
        keywords: ["may i drink some water", "can i drink some water", "may i drink water"],
        explanation: "'May I drink some water, please ?' est la formule polie pour demander à boire de l'eau !",
        hint: "May I drink some water, please ?"
      },
      {
        id: "ang_class_27",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "How do you ask a friend or the teacher to borrow a pen or glue ?",
        consigneFr: "Comment demandes-tu poliment pour emprunter un stylo ou de la colle ?",
        points: 2,
        options: [
          "Can I borrow a pen / glue, please ?",
          "Give me your pen now !",
          "Take a pen for me !"
        ],
        correctIndex: 0,
        explanation: "'Can I borrow a pen, please ?' : le verbe 'borrow' signifie emprunter !",
        hint: "Borrow = emprunter."
      },
      {
        id: "ang_class_28",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 1,
        titre: "What do you say in English when you don't know the answer to a question ?",
        consigneFr: "Que dis-tu en anglais quand tu ne sais pas la réponse ? (I don't...)",
        points: 2,
        correctAnswer: "I don't know",
        keywords: ["i don't know", "i dont know"],
        explanation: "'I don't know' signifie 'Je ne sais pas'.",
        hint: "I don't + k-n-o-w."
      },
      {
        id: "ang_class_29",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "How do you ask how to spell a word in English ? (How do you...)",
        consigneFr: "Comment demandes-tu comment s'épelle un mot en anglais ? (How do you...)",
        points: 3,
        correctAnswer: "How do you spell",
        keywords: ["how do you spell", "how do you spell that", "how do you spell it"],
        explanation: "'How do you spell [cat] ?' permet de demander l'orthographe lettre par lettre !",
        hint: "How do you spell..."
      },
      {
        id: "ang_class_30",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "How do you ask the teacher to repeat something you missed ? (Can you...)",
        consigneFr: "Comment demandes-tu au professeur de répéter ce qu'il vient de dire ? (Can you...)",
        points: 3,
        correctAnswer: "Can you repeat please",
        keywords: ["can you repeat please", "can you repeat", "could you repeat please"],
        explanation: "'Can you repeat, please ?' (ou 'Could you repeat, please ?') permet de faire répéter poliment !",
        hint: "Can you repeat, please ?"
      },
      {
        id: "ang_class_31",
        chapterId: "ang_ch5",
        type: "libre",
        subject: "anglais",
        level: 2,
        titre: "What do you tell the teacher if you forgot your copybook at home ? (I have forgotten...)",
        consigneFr: "Que dis-tu au professeur si tu as oublié ton cahier à la maison ? (I have forgotten...)",
        points: 3,
        correctAnswer: "I have forgotten my copybook",
        keywords: ["i have forgotten my copybook", "i have forgotten my book", "i forgot my copybook"],
        explanation: "'I have forgotten my copybook' signifie 'J'ai oublié mon cahier' !",
        hint: "I have forgotten my copybook."
      },
      {
        id: "ang_class_32",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 1,
        titre: "Which of these also means 'Lève la main' besides 'Raise your hand' ?",
        consigneFr: "Quelle autre expression courante signifie aussi 'Lève la main' ?",
        points: 2,
        options: [
          "Put up your hand !",
          "Put down your hand !",
          "Shake your hand !"
        ],
        correctIndex: 0,
        explanation: "'Put up your hand !' et 'Raise your hand !' sont deux expressions identiques pour dire 'Lève la main !'.",
        hint: "Put UP = mettre vers le haut."
      },
      {
        id: "ang_class_33",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "How do you ask permission to throw away trash into the bin ?",
        consigneFr: "Comment demandes-tu pour jeter un papier à la poubelle en classe ?",
        points: 2,
        options: [
          "Can I throw this into the bin, please ?",
          "Take this paper out please",
          "Put my paper on floor"
        ],
        correctIndex: 0,
        explanation: "'Can I throw this into the bin, please ?' (bin = la poubelle de classe, throw = jeter) !",
        hint: "Bin = poubelle."
      },
      {
        id: "ang_class_34",
        chapterId: "ang_ch5",
        type: "qcm",
        subject: "anglais",
        level: 2,
        titre: "How do you ask permission to erase or clean the blackboard ?",
        consigneFr: "Comment demandes-tu pour effacer le tableau ?",
        points: 2,
        options: [
          "Can I clean the board, please ?",
          "Can I wash the floor, please ?",
          "Break the board please"
        ],
        correctIndex: 0,
        explanation: "'Can I clean the board, please ?' permet de proposer d'effacer le tableau avec l'éponge !",
        hint: "Clean the board = nettoyer/effacer le tableau."
      },
      {
        id: "ang_cloze_final",
        chapterId: "ang_ch1",
        type: "texte_a_trous",
        subject: "anglais",
        level: 2,
        titre: "🏆 Défi Synthèse Finale : Complète le Grand Texte Bilan sur les dates et prépositions",
        points: 4,
        clozeTemplate: "In English, the first three ordinal numbers are special : 1st is {1}, 2nd is {2}, and 3rd is {3}. To write a precise date with a day, we use the preposition {4}. But for a month or a year alone, we must use {5}.",
        clozeAnswers: ["first", "second", "third", "on", "in"],
        clozeWordBank: ["first", "second", "third", "on", "in", "fourth", "at"],
        explanation: "Well done! Tu maîtrises first, second, third, ainsi que la différence ON (jour précis) et IN (mois).",
        hint: "Les 3 ordinaux irréguliers, puis les prépositions magiques ON et IN."
      }
    ]
  },

  histoire: {
    id: 'hist_prehistoire',
    title: "6H1 - Les débuts de l'humanité & Paléolithique",
    subject: 'histoire',
    summaryKids: "Les premiers humains sont nés en Afrique (le berceau de l'humanité). Au Paléolithique, ils étaient nomades : ils suivaient les bêtes, taillaient le silex et n'avaient aucun village fixe !",
    audioFlashScript: "Voici ton flash Histoire de 2 minutes ! Remontons le temps jusqu'à la Préhistoire. La Préhistoire commence avec l'apparition des premiers humains et se termine avec l'invention de l'écriture vers -3500 avant Jésus-Christ. Au Paléolithique (l'âge de la pierre taillée), nos ancêtres ne vivent pas dans des maisons fixes : ce sont des nomades ! Ils se déplacent sans cesse pour chasser et cueillir. En partant d'Afrique, berceau de l'humanité, ils migrent sur tous les continents. Retiens bien : fossile, nomade et migration !",
    survivalSheet: {
      dangerRed: "Distingue bien les deux périodes : au Paléolithique, les humains sont nomades (aucun village fixe). Les villages et l'agriculture n'arrivent qu'au Néolithique.",
      warningYellow: ["Fossile (trace dans la roche)", "Nomade (sans habitat fixe)", "Migration (déplacement)", "Afrique (berceau)"],
      greenFoundation: "Préhistoire = De l'homme jusqu'à l'écriture (-3500 av. J.-C.)",
      keyDates: [
        {
          date: "Vers -7 millions d'années",
          event: "Les plus anciens ancêtres de la lignée humaine en Afrique (Toumaï)",
          memo: "Toumaï en Afrique : 7 millions d'années de racines !"
        },
        {
          date: "Vers -300 000 ans",
          event: "Apparition des premiers Homo Sapiens en Afrique",
          memo: "Notre espèce humaine est née en Afrique il y a 300 000 ans."
        },
        {
          date: "Vers -100 000 ans",
          event: "Grandes migrations d'Homo Sapiens hors d'Afrique pour peupler la Terre",
          memo: "Sortie d'Afrique et voyage vers tous les continents."
        },
        {
          date: "Vers -40 000 ans",
          event: "L'art pariétal dans les grottes (Chauvet, Lascaux)",
          memo: "Les chasseurs peignent les parois des grottes (mammouths, lions)."
        },
        {
          date: "Vers -10 000 avant J.-C.",
          event: "Révolution néolithique : début de l'agriculture et de l'élevage",
          memo: "Fin du nomadisme, début des premiers villages d'agriculteurs sédentaires."
        },
        {
          date: "Vers -3500 avant J.-C.",
          event: "Invention de l'écriture en Mésopotamie",
          memo: "Fin de la Préhistoire, début officiel de l'Histoire !"
        }
      ]
    },
    practicalMission: {
      role: "Archéologue de terrain en expédition",
      scenario: "Tu viens de déterrer des outils en silex taillé et des os anciens dans une grotte.",
      task: "Explique aux journalistes pourquoi ces traces prouvent qu'un groupe d'Homo Sapiens nomades a vécu ici."
    },
    everydayApplications: [
      "Comprendre comment les archéologues reconstituent l'histoire de ta région lors de fouilles.",
      "Reconnaître les silex taillés lors de balades en forêt ou dans les champs.",
      "Savoir d'où vient l'humanité et pourquoi nous partageons tous la même origine africaine."
    ],
    mnemonicTrick: "Paléo = Pierre taillée (P comme Pierre et Paléo) !",
    quizQuestions: [
      {
        id: "hist_exam_compare_paleo_neo",
        chapterId: "hist_ch1",
        type: "briques",
        subject: "histoire",
        level: 3,
        titre: "Contrôle • Compare le mode de vie des humains au Paléolithique et au Néolithique (4 points)",
        points: 4,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Piège : Bien opposer nomade / sédentaire ET chasseur-cueilleur / agriculteur-éleveur !",
          radarQuestion: "Quels sont les deux grands changements majeurs qui séparent ces deux époques ?",
          options: [
            {
              text: "L'habitat (nomades vs sédentaires) ET la nourriture (chasse/cueillette vs agriculture/élevage)",
              isCorrect: true,
              explanation: "Bravo ! Ce sont les deux transformations majeures de la vie humaine lors de la Révolution néolithique !"
            },
            {
              text: "L'invention de l'électricité et des ordinateurs",
              isCorrect: false,
              explanation: "Hors-sujet, cela se passe à la Préhistoire il y a des milliers d'années !"
            }
          ]
        },
        bricksBank: [
          "Au Paléolithique, les humains étaient des nomades chasseurs-cueilleurs,",
          "alors qu'au Néolithique, ils deviennent sédentaires,",
          "vivent dans les premiers villages",
          "et pratiquent l'agriculture et l'élevage.",
          "ils habitaient dans des châteaux",
          "ils voyageaient en avion"
        ],
        correctBricks: [
          "Au Paléolithique, les humains étaient des nomades chasseurs-cueilleurs,",
          "alors qu'au Néolithique, ils deviennent sédentaires,",
          "vivent dans les premiers villages",
          "et pratiquent l'agriculture et l'élevage."
        ],
        criteriaChecklist: [
          { label: "1. Mode de vie Paléolithique (Nomades, chasseurs-cueilleurs) (+1.5 pt)", keywords: ["paléolithique", "nomades", "chasseurs"] },
          { label: "2. Connecteur de comparaison (Alors que, au contraire) (+1 pt)", keywords: ["alors que", "contraire"] },
          { label: "3. Mode de vie Néolithique (Sédentaires, agriculture, élevage) (+1.5 pt)", keywords: ["néolithique", "sédentaires", "agriculture", "élevage"] }
        ],
        explanation: "Au Paléolithique, les hommes sont nomades (chasse, pêche, cueillette) ; au Néolithique, ils se sédentarisent dans des villages grâce à l'agriculture et l'élevage.",
        hint: "Paléolithique (Nomades) ➡️ Néolithique (Sédentaires & Agriculteurs)."
      },
      {
        id: "hist_exam_feu_revolution",
        chapterId: "hist_ch3",
        type: "briques",
        subject: "histoire",
        level: 3,
        titre: "Contrôle • Explique pourquoi la maîtrise du feu (vers -400 000 ans) a été une révolution vitale pour les premiers humains (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Ne pas dire juste 'pour faire des grillades' ! Le professeur attend 3 fonctions vitales : chaleur, protection contre les prédateurs, et cuisson des viandes !",
          radarQuestion: "Quels sont les rôles indispensables attendus dans ton explication rédigée ?",
          options: [
            {
              text: "Se chauffer contre le froid glacial, éloigner les animaux féroces la nuit et cuire les aliments pour digérer et éviter les maladies",
              isCorrect: true,
              explanation: "Bravo ! Ces 3 éléments expliquent pourquoi le feu a permis à l'espèce humaine de survivre et d'explorer des régions plus froides."
            },
            {
              text: "Pouvoir allumer des lampes électriques et regarder la télévision",
              isCorrect: false,
              explanation: "Attention aux anachronismes géants ! L'électricité est inventée bien plus tard !"
            }
          ]
        },
        bricksBank: [
          "La maîtrise du feu vers -400 000 ans a transformé la vie humaine :",
          "il a permis de se réchauffer face aux climats froids,",
          "d'éloigner les prédateurs dangereux pendant la nuit,",
          "et de cuire la viande pour mieux la digérer et éviter les parasites.",
          "pour allumer des moteurs",
          "pour brûler toutes les forêts"
        ],
        correctBricks: [
          "La maîtrise du feu vers -400 000 ans a transformé la vie humaine :",
          "il a permis de se réchauffer face aux climats froids,",
          "d'éloigner les prédateurs dangereux pendant la nuit,",
          "et de cuire la viande pour mieux la digérer et éviter les parasites."
        ],
        criteriaChecklist: [
          { label: "1. Chauffage & lutte contre le froid cités (+1 pt)", keywords: ["chauffer", "froid", "chaleur", "climat"] },
          { label: "2. Protection contre les prédateurs mentionnée (+1 pt)", keywords: ["prédateurs", "animaux", "danger", "fauves"] },
          { label: "3. Cuisson des aliments & santé expliquée (+1 pt)", keywords: ["cuire", "cuisson", "digérer", "viande"] }
        ],
        explanation: "Le feu a apporté la chaleur contre les périodes glaciaires, la lumière au fond des grottes, la protection nocturne contre les bêtes sauvages et la cuisson des aliments.",
        hint: "Pense au trio vital : Chaleur + Protection + Cuisson des viandes."
      },
      {
        id: "hist_exam_art_parietal_deduction",
        chapterId: "hist_ch3",
        type: "briques",
        subject: "histoire",
        level: 3,
        titre: "Contrôle • Déduction : Pourquoi l'Homo Sapiens peignait-il au fond des grottes sombres (art pariétal) et non à l'entrée ? (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Les hommes préhistoriques ne vivaient PAS au fond des grottes sombres ! Le fond était un sanctuaire sacré ou rituel !",
          radarQuestion: "Que déduisent les historiens sur la fonction de ces peintures au fond des grottes ?",
          options: [
            {
              text: "Le fond obscur de la grotte servait de sanctuaire sacré pour accomplir des rituels magiques liés à la chasse et aux croyances spirituelles",
              isCorrect: true,
              explanation: "Exactement ! Les hommes vivaient sous des tentes ou à l'entrée des grottes (sous l'abri sous roche) mais s'enfonçaient dans le noir uniquement pour des cérémonies rituelles."
            },
            {
              text: "Ils habitaient au fond parce qu'ils n'aimaient pas la lumière du soleil",
              isCorrect: false,
              explanation: "Faux ! Le fond des grottes est humide, obscur et dangereux, ils n'y dormaient pas !"
            }
          ]
        },
        bricksBank: [
          "Homo Sapiens peignait au fond des grottes sombres car ces lieux obscurs",
          "servaient de sanctuaires sacrés pour accomplir des rituels magiques,",
          "afin d'honorer les animaux et de s'attirer la chance pour la chasse.",
          "Les premiers hommes ne vivaient pas au fond mais à l'entrée sous abri.",
          "ils peignaient pour vendre leurs toiles",
          "ils voulaient cacher leurs dessins à leurs voisins"
        ],
        correctBricks: [
          "Homo Sapiens peignait au fond des grottes sombres car ces lieux obscurs",
          "servaient de sanctuaires sacrés pour accomplir des rituels magiques,",
          "afin d'honorer les animaux et de s'attirer la chance pour la chasse.",
          "Les premiers hommes ne vivaient pas au fond mais à l'entrée sous abri."
        ],
        criteriaChecklist: [
          { label: "1. Lieu sacré / rituel / croyance identifié (+1 pt)", keywords: ["sacré", "rituel", "magique", "croyance", "sanctuaire"] },
          { label: "2. Lien avec les animaux / la chasse expliqué (+1 pt)", keywords: ["animaux", "chasse", "honorer", "esprit"] },
          { label: "3. Distinction avec l'habitat (ne vivaient pas au fond) (+1 pt)", keywords: ["vivaient", "entrée", "abri", "fond", "habitat"] }
        ],
        explanation: "L'art pariétal au fond des grottes n'était pas décoratif : ces lieux difficiles d'accès servaient de sanctuaires rituels pour s'attirer la bienveillance des esprits animaux avant la chasse.",
        hint: "Le fond de la grotte = sanctuaire sacré pour rituels de chasse (pas lieu d'habitation)."
      },
      {
        id: "hist_exam_nomade_cause",
        chapterId: "hist_ch3",
        type: "briques",
        subject: "histoire",
        level: 3,
        titre: "Contrôle • Pourquoi les humains du Paléolithique étaient-ils obligés d'être nomades ? Justifie avec leur mode de vie (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Ils ne voyageaient pas par plaisir ! Le nomadisme était une contrainte de survie imposée par les troupeaux et les saisons !",
          radarQuestion: "Quelle cause matérielle forçait les premiers hommes à changer constamment de campement ?",
          options: [
            {
              text: "L'obligation de suivre les déplacements des troupeaux de rennes et de bisons et l'épuisement des baies et racines sauvages selon les saisons",
              isCorrect: true,
              explanation: "Parfait ! Ne pratiquant ni l'agriculture ni l'élevage, ils dépendaient entièrement de la nature sauvage qui se déplace."
            },
            {
              text: "Le fait qu'ils s'ennuyaient au même endroit",
              isCorrect: false,
              explanation: "Hors-sujet : le mode de vie nomade était dicté par la recherche de nourriture vitale !"
            }
          ]
        },
        bricksBank: [
          "Au Paléolithique, les humains étaient obligés d'être nomades",
          "car ils dépendaient exclusivement de la chasse et de la cueillette sauvage :",
          "ils devaient impérativement suivre les migrations des troupeaux de gibier",
          "et se déplacer lorsque les végétaux comestibles venaient à manquer.",
          "ils voulaient faire le tour du monde",
          "ils voyageaient en train"
        ],
        correctBricks: [
          "Au Paléolithique, les humains étaient obligés d'être nomades",
          "car ils dépendaient exclusivement de la chasse et de la cueillette sauvage :",
          "ils devaient impérativement suivre les migrations des troupeaux de gibier",
          "et se déplacer lorsque les végétaux comestibles venaient à manquer."
        ],
        criteriaChecklist: [
          { label: "1. Dépendance à la chasse et cueillette (+1 pt)", keywords: ["chasse", "cueillette", "nourriture", "sauvage"] },
          { label: "2. Suivi de la migration des troupeaux (+1 pt)", keywords: ["migrations", "troupeaux", "gibier", "suivre"] },
          { label: "3. Épuisement des ressources naturelles (+1 pt)", keywords: ["saisons", "végétaux", "déplacer", "manquer"] }
        ],
        explanation: "Au Paléolithique, ne connaissant ni l'agriculture ni l'élevage, les hommes ne pouvaient pas rester sur place : quand le gibier migrait ou que les baies étaient cueillies, ils devaient déménager leur campement.",
        hint: "Chasseurs-cueilleurs ➡️ Obligés de suivre les animaux et les saisons."
      },
      {
        id: "hist_exam_outils_chasse_exemples",
        chapterId: "hist_ch3",
        type: "briques",
        subject: "histoire",
        level: 3,
        titre: "Contrôle • Cite 3 outils ou armes inventés par les chasseurs du Paléolithique et explique leur utilité pour survivre (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Ne pas citer d'outils en métal (fer, bronze) ou de charrues ! Au Paléolithique, les outils sont uniquement en silex taillé, bois et os !",
          radarQuestion: "Quels matériaux et inventions de survie le professeur attend-il pour le Paléolithique ?",
          options: [
            {
              text: "Des bifaces en silex taillé pour découper, des sagaies avec propulseurs pour chasser à distance et des aiguilles en os pour coudre des peaux",
              isCorrect: true,
              explanation: "Bravo ! Pierre taillée (silex), propulseurs et os d'animaux sont les vraies technologies de l'époque !"
            },
            {
              text: "Des épées en acier et des fusils de chasse",
              isCorrect: false,
              explanation: "Attention aux anachronismes ! Le métal n'est inventé que des milliers d'années plus tard !"
            }
          ]
        },
        bricksBank: [
          "Au Paléolithique, les chasseurs fabriquaient des bifaces en silex taillé pour découper la viande,",
          "des sagaies propulsées pour chasser les grands mammifères à distance sans danger,",
          "et des aiguilles en os d'animaux",
          "pour coudre des vêtements chauds en peaux de bêtes.",
          "ils utilisaient des couteaux en métal",
          "ils labouraient les champs avec des tracteurs"
        ],
        correctBricks: [
          "Au Paléolithique, les chasseurs fabriquaient des bifaces en silex taillé pour découper la viande,",
          "des sagaies propulsées pour chasser les grands mammifères à distance sans danger,",
          "et des aiguilles en os d'animaux",
          "pour coudre des vêtements chauds en peaux de bêtes."
        ],
        criteriaChecklist: [
          { label: "1. Silex taillé / bifaces mentionnés (+1 pt)", keywords: ["silex", "bifaces", "taillé", "découper"] },
          { label: "2. Chasse à distance (sagaies / propulseur) (+1 pt)", keywords: ["sagaies", "propulsées", "chasser", "distance"] },
          { label: "3. Aiguilles en os / vêtements en peaux (+1 pt)", keywords: ["aiguilles", "os", "coudre", "peaux", "vêtements"] }
        ],
        explanation: "Les chasseurs du Paléolithique ont perfectionné le débitage du silex (bifaces, grattoirs), inventé le propulseur pour chasser à distance et utilisé l'os pour des aiguilles à chas afin de coudre des vêtements isolants.",
        hint: "Pense au trio : Silex taillé (biface) + Chasse (sagaie/propulseur) + Vêtements (aiguille en os)."
      },
      {
        id: "hist_exemple_perso_nomade",
        type: "exemple_perso",
        subject: "histoire",
        level: 3,
        titre: "Imagine la vie d'un chasseur-cueilleur au Paléolithique : dis ton exemple perso d'activité quotidienne et justifie ta réponse.",
        points: 4,
        suggestedExamples: [
          "⛺ Fabriquer un abri démontable avec des peaux de bêtes et des branchages",
          "🔥 Frotter du silex et de la marcassite pour allumer un feu et cuire la viande",
          "🏹 Tailler une pointe de sagaie en os pour chasser le renne à distance",
          "🎨 Peindre un mammouth sur la paroi d'une grotte avec de l'ocre et du charbon",
          "🫐 Cueillir des baies sauvages, des racines et des noisettes avec le groupe"
        ],
        explanation: "Excellente projection historique ! Les nomades du Paléolithique n'avaient pas de maison fixe et se déplaçaient sans cesse pour suivre les troupeaux et cueillir.",
        hint: "Dis ton exemple perso d'activité et justifie ta réponse : explique pourquoi cette action était indispensable pour survivre !"
      },
      {
        id: "hist_ortho_paleolithique",
        chapterId: "hist_ch1",
        type: "qcm",
        subject: "histoire",
        level: 1,
        isOrthoQuestion: true,
        titre: "✍️ Orthographe du Mot Clé : Comment s'écrit correctement le mot désignant la période de la pierre taillée ?",
        points: 2,
        options: [
          "Le Paléolithique (avec accent aigu sur le é, 'th' et terminaison en -ique)",
          "Le paléolitique (sans 'h')",
          "Le paléolytique (avec un y)"
        ],
        correctIndex: 0,
        explanation: "Bravo ! Paléolithique s'écrit avec un accent aigu 'é' et 'th'. Paléo = ancien en grec, et lithos = la pierre (avec th comme thermomètre).",
        hint: "Pense à lithos (la pierre avec 'th').",
        spellingTip: "Astuce magique : Paléo- (ancien) + lithique (pierre avec un 'th' comme monothéiste) !"
      },
      {
        id: "hist_ortho_sapiens",
        chapterId: "hist_ch1",
        type: "qcm",
        subject: "histoire",
        level: 1,
        isOrthoQuestion: true,
        titre: "✍️ Orthographe du Mot Clé : Comment s'écrit correctement le nom de notre espèce humaine apparue il y a 300 000 ans ?",
        points: 2,
        options: [
          "Homo Sapiens (Majuscule à Homo et toujours un 's' à Sapiens)",
          "Homo Sapien (sans le 's' final)",
          "Omo Sapience (avec un 'c')"
        ],
        correctIndex: 0,
        explanation: "Exact ! Homo Sapiens prend toujours un 's' final (même au singulier) car en latin 'sapiens' signifie sage ou savant.",
        hint: "Homo (l'Homme avec H) Sapiens (qui sait avec un s).",
        spellingTip: "Homo prend un H majuscule et Sapiens garde toujours son 's' !"
      },
      {
        id: "hist_1",
        chapterId: "hist_ch1",
        type: "libre",
        subject: "histoire",
        level: 1,
        titre: "Définis précisément ce qu'est un 'fossile' en rédigeant une phrase complète.",
        points: 4,
        explanation: "Un fossile est une trace ou un reste d'être vivant conservé dans la roche ou la terre depuis des milliers d'années.",
        hint: "Pense à une trace ou un reste d'être vivant ancien piégé et conservé dans la roche.",
        spellingTip: "Fossile s'écrit avec deux 's' !"
      },
      {
        id: "hist_inv_fossile",
        chapterId: "hist_ch1",
        type: "libre",
        subject: "histoire",
        level: 1,
        titre: "Devinette de définition : Comment appelle-t-on la trace ou le reste d'un être vivant piégé et conservé dans la roche depuis des milliers d'années ?",
        points: 3,
        correctAnswer: "un fossile",
        keywords: ["fossile"],
        explanation: "C'est un fossile ! C'est grâce aux fossiles que les archéologues reconstituent l'histoire de la Terre et des humains.",
        hint: "Ce mot commence par 'fo...' et prend deux 's'.",
        spellingTip: "Fossile s'écrit avec deux 's' !"
      },
      {
        id: "hist_inv_nomade",
        chapterId: "hist_ch3",
        type: "libre",
        subject: "histoire",
        level: 1,
        titre: "Devinette de définition : Comment qualifie-t-on un être humain qui n'a pas d'habitat fixe et se déplace continuellement pour chasser et cueillir ?",
        points: 3,
        correctAnswer: "nomade",
        keywords: ["nomade"],
        explanation: "C'est un nomade ! Au Paléolithique, les humains étaient tous nomades.",
        hint: "Le mot opposé à 'sédentaire' (qui a une maison fixe)."
      },
      {
        id: "hist_inv_afrique",
        chapterId: "hist_ch1",
        type: "libre",
        subject: "histoire",
        level: 1,
        titre: "Devinette d'Histoire : Quel continent les historiens qualifient-ils de 'berceau de l'humanité' ?",
        points: 3,
        correctAnswer: "l'Afrique",
        keywords: ["afrique"],
        explanation: "L'Afrique ! C'est là que sont apparus les plus anciens fossiles d'hominidés (comme Toumaï ou Lucy).",
        hint: "C'est un continent qui commence par un A."
      },
      {
        id: "hist_inv_ecriture",
        chapterId: "hist_ch1",
        type: "libre",
        subject: "histoire",
        level: 1,
        titre: "Devinette d'Histoire : Quelle invention majeure survenue vers -3500 avant J.-C. marque officiellement la fin de la Préhistoire ?",
        points: 3,
        correctAnswer: "l'écriture",
        keywords: ["écriture", "ecriture"],
        explanation: "L'invention de l'écriture en Mésopotamie marque le passage de la Préhistoire à l'Histoire.",
        hint: "Ce que l'on trace avec des lettres ou des signes pour transmettre des messages."
      },
      {
        id: "hist_date_sapiens",
        chapterId: "hist_ch1",
        type: "libre",
        subject: "histoire",
        level: 2,
        titre: "Repère Chronologique : Vers quelle date notre espèce (Homo Sapiens) est-elle apparue en Afrique ?",
        points: 3,
        correctAnswer: "vers -300 000 ans",
        keywords: ["300 000", "-300 000", "300000"],
        explanation: "Vers -300 000 ans en Afrique ! C'est l'apparition de l'Homo Sapiens (l'homme moderne, notre espèce).",
        hint: "Pense au chiffre 300 suivi de mille (300 000 ans)."
      },
      {
        id: "hist_date_migrations",
        chapterId: "hist_ch2",
        type: "libre",
        subject: "histoire",
        level: 2,
        titre: "Repère Chronologique : Vers quelle date les grandes migrations d'Homo Sapiens hors d'Afrique ont-elles débuté pour peupler la Terre ?",
        points: 3,
        correctAnswer: "vers -100 000 ans",
        keywords: ["100 000", "-100 000", "100000"],
        explanation: "Vers -100 000 ans ! Homo Sapiens quitte le berceau africain et part peupler les autres continents (Asie, Europe, puis Amérique).",
        hint: "Cent mille ans : 100 000 ans."
      },
      {
        id: "hist_date_feu",
        chapterId: "hist_ch3",
        type: "libre",
        subject: "histoire",
        level: 2,
        titre: "Repère d'Histoire : Vers quelle date les premiers humains ont-ils réussi à maîtriser le feu ?",
        points: 3,
        correctAnswer: "vers -400 000 ans",
        keywords: ["400 000", "-400 000", "40000"],
        explanation: "Vers -400 000 ans ! Le feu est une révolution pour cuire la viande, s'éclairer et se protéger la nuit.",
        hint: "Quatre cent mille ans : 400 000 ans."
      },
      {
        id: "hist_date_grottes",
        chapterId: "hist_ch3",
        type: "libre",
        subject: "histoire",
        level: 2,
        titre: "Repère d'Histoire : Vers quelle date les peintures de la grotte Chauvet et de Lascaux (art pariétal) ont-elles été réalisées ?",
        points: 3,
        correctAnswer: "vers -40 000 ans",
        keywords: ["40 000", "-40 000", "40000"],
        explanation: "Vers -40 000 ans ! Les chasseurs du Paléolithique peignent les parois des grottes avec des pigments naturels.",
        hint: "Quarante mille ans : 40 000 ans."
      },
      {
        id: "hist_2",
        chapterId: "hist_ch3",
        type: "libre",
        subject: "histoire",
        level: 1,
        titre: "Explique ce que signifie être 'nomade' pour les premiers humains.",
        points: 4,
        explanation: "Un nomade est une personne qui n'a pas d'habitat fixe et qui se déplace pour trouver sa nourriture (chasse et cueillette).",
        hint: "Pense au contraire d'avoir une maison permanente."
      },
      {
        id: "hist_3",
        chapterId: "hist_ch1",
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
        id: "hist_4",
        chapterId: "hist_ch3",
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
        id: "hist_5",
        chapterId: "hist_ch3",
        type: "trou",
        subject: "histoire",
        level: 2,
        titre: "Texte à trous : Le mot Paléolithique signifie l'âge de la pierre ________.",
        points: 2,
        correctAnswer: "taillée",
        explanation: "C'est l'âge de la pierre taillée (par opposition à la pierre polie du Néolithique).",
        hint: "Les hommes taillaient le silex pour faire des pointes et des grattoirs."
      },
      {
        id: "hist_6",
        chapterId: "hist_ch3",
        type: "libre",
        subject: "histoire",
        level: 2,
        titre: "Cite deux avantages essentiels que la maîtrise du feu a apportés aux premiers humains.",
        points: 4,
        explanation: "Le feu permettait de cuire la viande (meilleure digestion), de s'éclairer la nuit, de se réchauffer et d'éloigner les bêtes sauvages.",
        hint: "Pense à la cuisine, à la chaleur et à la sécurité contre les prédateurs."
      },
      {
        id: "hist_7",
        chapterId: "hist_ch1",
        type: "qcm",
        subject: "histoire",
        level: 2,
        titre: "Vers quelle date et avec quel événement historique la Préhistoire prend-elle fin ?",
        points: 2,
        options: [
          "Vers -3500 avant J.-C. avec l'invention de l'écriture",
          "Vers l'an 0 avec notre calendrier moderne",
          "En 1789 avec la Révolution française"
        ],
        correctIndex: 0,
        explanation: "L'apparition de l'écriture vers -3500 av. J.-C. marque le passage de la Préhistoire à l'Histoire.",
        hint: "Pense à l'invention de l'écriture en Mésopotamie."
      },
      {
        id: "hist_8",
        chapterId: "hist_ch3",
        type: "vf",
        subject: "histoire",
        level: 2,
        titre: "Vrai ou Faux : Les célèbres peintures préhistoriques des grottes de Chauvet et Lascaux datent du Paléolithique.",
        points: 2,
        correctAnswer: "Vrai",
        explanation: "C'est VRAI ! L'art pariétal (peintures sur parois de grottes) a été créé par les chasseurs-cueilleurs nomades du Paléolithique.",
        hint: "Ils peignaient des mammouths, chevaux et lions des cavernes."
      },
      {
        id: "hist_9",
        chapterId: "hist_ch3",
        type: "libre",
        subject: "histoire",
        level: 1,
        titre: "Pourquoi les premiers hommes étaient-ils obligés de se déplacer sans cesse au Paléolithique ?",
        points: 4,
        explanation: "Ils étaient nomades car ils devaient suivre les troupeaux d'animaux pour chasser et chercher de nouveaux fruits et baies à cueillir.",
        hint: "Pense à la recherche de nourriture (chasse et cueillette) selon les saisons."
      },
      {
        id: "hist_cloze_notions",
        chapterId: "hist_ch1",
        type: "texte_a_trous",
        subject: "histoire",
        level: 2,
        titre: "🏆 Texte à Trous 1 • Vocabulaire & Notions clés du Paléolithique",
        points: 4,
        clozeTemplate: "Les premiers Homo Sapiens sont apparus en {1}. Pour survivre, ils menaient une vie {2} en suivant les troupeaux de gibier. Ils fabriquaient des outils et armes tranchantes en pierre {3} (silex, bifaces). Dans l'obscurité des grottes comme Chauvet ou Lascaux, ils ont inventé l'art {4}.",
        clozeAnswers: ["Afrique", "nomade", "taillée", "pariétal"],
        clozeWordBank: ["Afrique", "nomade", "taillée", "pariétal", "sédentaire", "métal"],
        explanation: "Superbe synthèse ! L'humanité est née en Afrique, a vécu de façon nomade avec des pierres taillées et a créé l'art pariétal.",
        hint: "Afrique (berceau), mode de vie nomade, pierre taillée, et art pariétal (peintures)."
      },
      {
        id: "hist_cloze_dates",
        chapterId: "hist_ch1",
        type: "texte_a_trous",
        subject: "histoire",
        level: 2,
        titre: "⏳ Texte à Trous 2 • Frise Chronologique & Dates repères de la Préhistoire",
        points: 4,
        clozeTemplate: "Le plus ancien ancêtre connu (Toumaï) remonte à -{1} millions d'années. Notre espèce Homo Sapiens apparaît il y a environ -{2} 000 ans en Afrique. Les célèbres peintures des grottes ornées datent de -{3} 000 ans. La sédentarisation commence vers -{4} 000 ans, et l'écriture naît vers -3500 avant J.-C.",
        clozeAnswers: ["7", "300", "40", "10"],
        clozeWordBank: ["7", "300", "40", "10", "100", "2000"],
        explanation: "Excellente maîtrise de la chronologie ! -7 millions (Toumaï), -300 000 (Homo Sapiens), -40 000 (art des grottes Chauvet/Lascaux), -10 000 (Néolithique).",
        hint: "Toumaï (-7M), Sapiens (-300k), Grottes (-40k), Néolithique (-10k)."
      },
      {
        id: "hist_exam_autonomie_nomade",
        chapterId: "hist_ch1",
        type: "libre",
        subject: "histoire",
        level: 3,
        titre: "🔥 Défi Autonomie (Sans les briques) • Compare en une phrase le mode de vie des nomades du Paléolithique et des sédentaires du Néolithique (4 points)",
        points: 4,
        isOfficialExam: true,
        isAutonomyChallenge: true,
        consigneRadar: {
          trapWarning: "⚠️ Défi sans filet : Rédige toi-même ta phrase complète avec tes propres mots sans oublier 'nomades', 'sédentaires' et le mot de comparaison !",
          radarQuestion: "Quelle formule magique vas-tu appliquer pour obtenir la note maximale 4/4 ?",
          options: [
            {
              text: "Rédiger : 'Au Paléolithique, les hommes sont nomades (chasseurs), ALORS QU'au Néolithique, ils deviennent sédentaires (agriculteurs)'",
              isCorrect: true,
              explanation: "Parfait ! Les deux périodes sont comparées avec leur mode d'habitat et leur moyen de subsistance."
            },
            {
              text: "Écrire simplement deux mots sans faire de phrase",
              isCorrect: false,
              explanation: "Interdit en 6ème ! Une vraie phrase rédigée est indispensable."
            }
          ]
        },
        criteriaChecklist: [
          { label: "1. Mode de vie nomade au Paléolithique (+1.5 pt)", keywords: ["nomade", "paléolithique", "chasse"] },
          { label: "2. Mot de comparaison (alors que / au contraire) (+1 pt)", keywords: ["alors que", "contraire", "tandis que"] },
          { label: "3. Mode de vie sédentaire au Néolithique (+1.5 pt)", keywords: ["sédentaire", "néolithique", "agriculture"] }
        ],
        explanation: "Au Paléolithique, les humains étaient des nomades chasseurs-cueilleurs, alors qu'au Néolithique, ils sont devenus des sédentaires vivant dans des villages d'agriculteurs-éleveurs.",
        hint: "Paléolithique (Nomades) ➡️ 'alors que' ➡️ Néolithique (Sédentaires)."
      }
    ]
  },

  maths: {
    id: 'maths_fractions',
    title: 'Fractions, Décimaux & Tables de multiplication',
    subject: 'maths',
    summaryKids: "Une fraction est un partage : le dénominateur (en bas) indique le nombre de parts égales découpées, et le numérateur (en haut) indique le nombre de parts prises.",
    audioFlashScript: "Salut Mathieu ! Voici ton flash Maths de 2 minutes. Les fractions sont tes alliées. 14 dixièmes, c'est 14 divisé par 10, ce qui donne 1,4. 7 centièmes, c'est 0,07 avec deux zéros après la virgule. Et pour les tables magiques : 7 fois 8, c'est le fameux compte à rebours 5, 6, 7, 8 donc 56 ! 8 fois 9, c'est 72. Reste concentré, ton score va exploser !",
    survivalSheet: {
      dangerRed: "Attention à la place de la virgule : 7 dixièmes = 0,7 (1 chiffre après la virgule), alors que 7 centièmes = 0,07 (2 chiffres après la virgule).",
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
        id: "maths_exam_compare_fractions",
        type: "briques",
        subject: "maths",
        level: 3,
        titre: "Contrôle • Compare les fractions 7/10 et 4/10 en justifiant ton résultat avec rigueur (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ En maths, écrire juste '>' ne suffit pas : le prof attend la règle du cours 'même dénominateur' !",
          radarQuestion: "Comment justifie-t-on qu'une fraction est plus grande qu'une autre ?",
          options: [
            {
              text: "Affirmer que 7/10 > 4/10 car elles ont le même dénominateur (10) et 7 est plus grand que 4",
              isCorrect: true,
              explanation: "Parfait ! Quand les dénominateurs sont égaux, la plus grande fraction est celle qui a le plus grand numérateur."
            },
            {
              text: "Additionner 7 et 10 ensemble",
              isCorrect: false,
              explanation: "Non, additionner ne justifie pas une comparaison !"
            }
          ]
        },
        bricksBank: [
          "7/10 est PLUS grand que 4/10 (7/10 > 4/10),",
          "car les deux fractions ont le même dénominateur (10),",
          "et le numérateur 7 est supérieur au numérateur 4.",
          "10 est plus grand que 7",
          "on soustrait les deux chiffres"
        ],
        correctBricks: [
          "7/10 est PLUS grand que 4/10 (7/10 > 4/10),",
          "car les deux fractions ont le même dénominateur (10),",
          "et le numérateur 7 est supérieur au numérateur 4."
        ],
        criteriaChecklist: [
          { label: "1. Comparaison affirmée (7/10 > 4/10 ou PLUS grand) (+1 pt)", keywords: ["plus grand", ">"] },
          { label: "2. Même dénominateur justifié (10) (+1 pt)", keywords: ["dénominateur", "10"] },
          { label: "3. Numérateurs comparés (7 > 4) (+1 pt)", keywords: ["numérateur", "7", "4"] }
        ],
        explanation: "7/10 > 4/10 car deux fractions ayant le même dénominateur sont rangées dans l'ordre de leurs numérateurs (7 > 4).",
        hint: "Même dénominateur (10) ➡️ on compare les numérateurs (7 > 4)."
      },
      {
        id: "maths_exam_proportionnalite",
        type: "briques",
        subject: "maths",
        level: 3,
        titre: "Contrôle • 3 kg de pommes coûtent 6 €. Calcule et justifie le prix de 5 kg en expliquant ta méthode (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Ne pas écrire juste '10 €' ! Le professeur exige la méthode (passage par l'unité ou coefficient) avec phrase !",
          radarQuestion: "Comment justifie-t-on rigoureusement un calcul de proportionnalité en 6ème ?",
          options: [
            {
              text: "Calculer d'abord le prix d'un seul kilo (6 € ÷ 3 = 2 € le kg), puis multiplier par 5 kg (5 × 2 € = 10 €)",
              isCorrect: true,
              explanation: "Parfait ! La méthode du retour à l'unité est claire, infaillible et rapporte tous les points au contrôle !"
            },
            {
              text: "Deviner le nombre 10 au hasard sans calcul écrit",
              isCorrect: false,
              explanation: "Une réponse sans calcul ni démarche vaut 0 point !"
            }
          ]
        },
        bricksBank: [
          "On calcule d'abord le prix d'un kilogramme de pommes : 6 € ÷ 3 = 2 € par kg,",
          "puis on multiplie par la quantité demandée :",
          "5 kg × 2 € = 10 €.",
          "Le prix de 5 kg de pommes est donc de 10 €.",
          "on fait 6 + 5 = 11 €",
          "on multiplie 3 par 6"
        ],
        correctBricks: [
          "On calcule d'abord le prix d'un kilogramme de pommes : 6 € ÷ 3 = 2 € par kg,",
          "puis on multiplie par la quantité demandée :",
          "5 kg × 2 € = 10 €.",
          "Le prix de 5 kg de pommes est donc de 10 €."
        ],
        criteriaChecklist: [
          { label: "1. Calcul du prix unitaire (6 ÷ 3 = 2 €/kg) (+1 pt)", keywords: ["2", "kilo", "kg", "unitaire"] },
          { label: "2. Multiplication par la nouvelle quantité (5 × 2) (+1 pt)", keywords: ["5", "multiplie", "10"] },
          { label: "3. Phrase réponse claire avec unité (10 €) (+1 pt)", keywords: ["10 €", "10 euros", "coûtent"] }
        ],
        explanation: "Méthode du retour à l'unité : 1 kg coûte 6 € ÷ 3 = 2 €. Donc 5 kg coûtent 5 × 2 € = 10 €.",
        hint: "Prix d'1 kg (6 ÷ 3 = 2 €) ➡️ puis 5 × 2 € = 10 €."
      },
      {
        id: "maths_exam_probleme_fractions_partage",
        type: "briques",
        subject: "maths",
        level: 3,
        titre: "Contrôle • Dans une classe de 24 élèves, 3/4 font du sport. Calcule le nombre d'élèves sportifs en détaillant les étapes (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Ne pas se contenter de poser un nombre sans phrase ! Le professeur attend la démarche : diviser par 4 puis multiplier par 3 !",
          radarQuestion: "Comment calcule-t-on la fraction d'une quantité en 6ème ?",
          options: [
            {
              text: "Calculer le quart de l'effectif (24 ÷ 4 = 6 élèves), puis multiplier par 3 pour obtenir les trois quarts (3 × 6 = 18 élèves)",
              isCorrect: true,
              explanation: "Exactement ! Fraction d'une quantité = (Quantité ÷ Dénominateur) × Numérateur."
            },
            {
              text: "Additionner 24 + 3 + 4",
              isCorrect: false,
              explanation: "Non, une fraction représente une division suivie d'une multiplication !"
            }
          ]
        },
        bricksBank: [
          "On calcule d'abord la valeur d'un quart : 24 ÷ 4 = 6 élèves,",
          "puis on multiplie par le numérateur 3 :",
          "3 × 6 = 18 élèves.",
          "Il y a donc 18 élèves sportifs dans cette classe.",
          "24 - 3 = 21",
          "on multiplie 24 par 4"
        ],
        correctBricks: [
          "On calcule d'abord la valeur d'un quart : 24 ÷ 4 = 6 élèves,",
          "puis on multiplie par le numérateur 3 :",
          "3 × 6 = 18 élèves.",
          "Il y a donc 18 élèves sportifs dans cette classe."
        ],
        criteriaChecklist: [
          { label: "1. Partage en 4 parts égales (24 ÷ 4 = 6) (+1 pt)", keywords: ["24", "4", "6", "quart"] },
          { label: "2. Multiplication par 3 (3 × 6 = 18) (+1 pt)", keywords: ["3", "18", "multiplie"] },
          { label: "3. Phrase réponse avec unité 'élèves' (+1 pt)", keywords: ["18 élèves", "sportifs", "classe"] }
        ],
        explanation: "Pour prendre 3/4 de 24, on calcule (24 ÷ 4) × 3 = 6 × 3 = 18. Il y a donc 18 élèves sportifs.",
        hint: "(24 ÷ 4) = 6 ➡️ puis 6 × 3 = 18 élèves."
      },
      {
        id: "maths_exam_conversion_longueurs",
        type: "briques",
        subject: "maths",
        level: 3,
        titre: "Contrôle • Compare 2,5 km et 2 300 m en justifiant par une conversion dans la même unité (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ On ne peut JAMAIS comparer deux grandeurs sans les convertir d'abord dans la même unité !",
          radarQuestion: "Quelle est l'étape indispensable exigée par le professeur ?",
          options: [
            {
              text: "Convertir les kilomètres en mètres (2,5 km = 2 500 m) puis comparer 2 500 m > 2 300 m",
              isCorrect: true,
              explanation: "Parfait ! Une fois dans la même unité (mètres), la comparaison est limpide et irréfutable !"
            },
            {
              text: "Comparer 2,5 et 2 300 directement sans convertir",
              isCorrect: false,
              explanation: "Piège fatal : 2,5 km est bien plus grand que 2 300 m !"
            }
          ]
        },
        bricksBank: [
          "On convertit d'abord 2,5 km en mètres : 2,5 km = 2 500 m,",
          "puis on compare les deux valeurs dans la même unité :",
          "2 500 m est PLUS grand que 2 300 m (2 500 m > 2 300 m).",
          "Donc 2,5 km est strictement supérieur à 2 300 m.",
          "2,5 est plus petit que 2300",
          "on additionne km et m"
        ],
        correctBricks: [
          "On convertit d'abord 2,5 km en mètres : 2,5 km = 2 500 m,",
          "puis on compare les deux valeurs dans la même unité :",
          "2 500 m est PLUS grand que 2 300 m (2 500 m > 2 300 m).",
          "Donc 2,5 km est strictement supérieur à 2 300 m."
        ],
        criteriaChecklist: [
          { label: "1. Conversion correcte (2,5 km = 2 500 m) (+1 pt)", keywords: ["2 500", "2500", "m", "conversion"] },
          { label: "2. Comparaison justifiée (2 500 m > 2 300 m) (+1 pt)", keywords: ["plus grand", ">", "supérieur"] },
          { label: "3. Conclusion claire (+1 pt)", keywords: ["donc", "2,5 km"] }
        ],
        explanation: "1 km = 1 000 m, donc 2,5 km = 2 500 m. Comme 2 500 m > 2 300 m, on a bien 2,5 km > 2 300 m.",
        hint: "Convertir en mètres : 2,5 km = 2 500 m ➡️ 2 500 m > 2 300 m."
      },
      {
        id: "maths_exam_perimetre_rectangle",
        type: "briques",
        subject: "maths",
        level: 3,
        titre: "Contrôle • Calcule le périmètre d'un terrain rectangulaire de longueur L = 15 m et largeur l = 8 m en citant la formule (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Ne pas confondre PÉRIMÈTRE (le tour, en mètres) et AIRE (la surface, en m²) !",
          radarQuestion: "Quelle formule et unité sont attendues pour le périmètre du rectangle ?",
          options: [
            {
              text: "La formule P = 2 × (L + l) avec le résultat en mètres : 2 × (15 + 8) = 2 × 23 = 46 m",
              isCorrect: true,
              explanation: "Bravo ! Le périmètre est une longueur (mètres) et vaut le double de la somme (longueur + largeur)."
            },
            {
              text: "Multiplier 15 × 8 = 120 m²",
              isCorrect: false,
              explanation: "Attention, 15 × 8 donne l'aire (la surface intérieure en m²), pas le périmètre (le contour) !"
            }
          ]
        },
        bricksBank: [
          "La formule du périmètre d'un rectangle est P = 2 × (Longueur + largeur) :",
          "P = 2 × (15 m + 8 m) = 2 × 23 m = 46 m.",
          "Le périmètre de ce terrain est donc de 46 mètres.",
          "L'unité est le mètre car c'est une mesure de longueur.",
          "15 × 8 = 120 m²",
          "on divise 15 par 8"
        ],
        correctBricks: [
          "La formule du périmètre d'un rectangle est P = 2 × (Longueur + largeur) :",
          "P = 2 × (15 m + 8 m) = 2 × 23 m = 46 m.",
          "Le périmètre de ce terrain est donc de 46 mètres.",
          "L'unité est le mètre car c'est une mesure de longueur."
        ],
        criteriaChecklist: [
          { label: "1. Formule du périmètre citée (2 × (L + l)) (+1 pt)", keywords: ["formule", "périmètre", "longueur", "largeur", "2 ×"] },
          { label: "2. Calcul exact (2 × 23 = 46) (+1 pt)", keywords: ["46", "23"] },
          { label: "3. Unité correcte en mètres (+1 pt)", keywords: ["mètres", "m", "longueur"] }
        ],
        explanation: "Périmètre = 2 × (Longueur + largeur) = 2 × (15 + 8) = 2 × 23 = 46 m. (Ne pas confondre avec l'aire 15 × 8 = 120 m²).",
        hint: "Formule : 2 × (15 + 8) = 2 × 23 = 46 m."
      },
      {
        id: "maths_exemple_perso_fraction",
        type: "exemple_perso",
        subject: "maths",
        level: 3,
        titre: "Donne un exemple de situation de ta vie où tu partages équitablement : dis ton exemple perso et justifie ta réponse avec une fraction.",
        points: 4,
        suggestedExamples: [
          "🍕 Couper une pizza en 8 parts et en manger 3 : j'ai mangé 3/8 de la pizza",
          "🍫 Partager une tablette de 20 carrés de chocolat en 4 parts égales : 5 carrés (1/4) chacun",
          "🎂 Découper un gâteau d'anniversaire en 6 parts identiques pour 6 copains : 1/6 par invité",
          "⏱️ Une demi-heure de sport qui correspond à 30 minutes sur 60, soit la fraction 1/2"
        ],
        explanation: "Bravo ! Une fraction représente toujours un partage en parts rigoureusement égales : le dénominateur indique en combien de parts on découpe, et le numérateur compte les parts sélectionnées.",
        hint: "Dis ton exemple perso et justifie ta réponse en précisant ce que représentent le dénominateur et le numérateur !"
      },
      {
        id: "maths_ortho_denominateur",
        type: "qcm",
        subject: "maths",
        level: 1,
        isOrthoQuestion: true,
        titre: "✍️ Orthographe du Mot Clé : Comment s'écrit correctement le mot désignant le nombre du bas dans une fraction ?",
        points: 2,
        options: [
          "Le dénominateur (avec un 'é' accent aigu et un seul 'n')",
          "Le denominateur (sans accent)",
          "Le dénominatteur (avec deux 't')"
        ],
        correctIndex: 0,
        explanation: "Exact ! Le dénominateur s'écrit avec un 'é' accent aigu et un seul 't'. Il dénomme (donne le nom des parts : tiers, quarts, dixièmes...).",
        hint: "Dénomin-ateur vient de 'dénommer' (donner le nom de la découpe).",
        spellingTip: "Dé-nom-i-na-teur : accent aigu sur le é et un seul t !"
      },
      {
        id: "maths_1",
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
        id: "maths_2",
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
        id: "maths_3",
        type: "libre",
        subject: "maths",
        level: 1,
        titre: "Combien font 7 × 8 ?",
        points: 2,
        correctAnswer: "56",
        explanation: "7 × 8 = 56 ! (5, 6, 7, 8 : 56 = 7 × 8).",
        hint: "Pense au compte à rebours magique : 5, 6, 7, 8 !",
      },
      {
        id: "maths_4",
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
        id: "maths_5",
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
      },
      {
        id: "maths_inv_denominateur",
        type: "libre",
        subject: "maths",
        level: 1,
        titre: "Devinette de fractions : Comment s'appelle le nombre situé EN BAS d'une fraction, qui donne la découpe en parts égales ?",
        points: 3,
        correctAnswer: "le dénominateur",
        keywords: ["dénominateur", "denominateur"],
        explanation: "C'est le dénominateur ! (D comme Descendre ou Dessous).",
        hint: "Ce mot commence par 'D' comme dessous."
      },
      {
        id: "maths_inv_numerateur",
        type: "libre",
        subject: "maths",
        level: 1,
        titre: "Devinette de fractions : Comment s'appelle le nombre situé EN HAUT d'une fraction, qui compte le nombre de parts que l'on prend ?",
        points: 3,
        correctAnswer: "le numérateur",
        keywords: ["numérateur", "numerateur"],
        explanation: "C'est le numérateur ! Il numérote le nombre de parts sélectionnées.",
        hint: "Ce mot commence par un N comme un Nuage (en haut)."
      },
      {
        id: "maths_6",
        type: "libre",
        subject: "maths",
        level: 1,
        titre: "Combien font 6 × 8 ?",
        points: 2,
        correctAnswer: "48",
        explanation: "6 × 8 = 48 !",
        hint: "Pense à 5 × 8 = 40, puis rajoute 8."
      },
      {
        id: "maths_7",
        type: "libre",
        subject: "maths",
        level: 1,
        titre: "Écris la fraction 25/100 sous forme de nombre décimal à virgule.",
        points: 2,
        correctAnswer: "0,25",
        explanation: "25 centièmes = 25 divisé par 100 = 0,25.",
        hint: "Deux zéros dans 100, donc deux chiffres après la virgule."
      },
      {
        id: "maths_8",
        type: "vf",
        subject: "maths",
        level: 2,
        titre: "Vrai ou Faux : 3 dixièmes (3/10) représente une quantité plus grande que 3 centièmes (3/100).",
        points: 2,
        correctAnswer: "Vrai",
        explanation: "C'est VRAI ! 3/10 = 0,30 alors que 3/100 = 0,03. 0,30 est 10 fois plus grand que 0,03.",
        hint: "Pense à 3 grosses parts de gâteau sur 10 contre 3 miettes sur 100."
      },
      {
        id: "maths_9",
        type: "libre",
        subject: "maths",
        level: 1,
        titre: "Combien font 9 × 7 ?",
        points: 2,
        correctAnswer: "63",
        explanation: "9 × 7 = 63 !",
        hint: "Astuce des doigts de 9 : le 7ème doigt baissé laisse 6 dizaines et 3 unités."
      },
      {
        id: "maths_cloze_final",
        type: "texte_a_trous",
        subject: "maths",
        level: 2,
        titre: "🏆 Défi Synthèse Finale : Complète le Grand Texte Bilan sur les fractions et tables",
        points: 4,
        clozeTemplate: "Dans une fraction, le chiffre du haut s'appelle le {1} et le chiffre du bas s'appelle le {2}. La fraction 14/10 correspond au nombre décimal {3}. Pour les tables, 7 fois 8 fait {4} et 8 fois 9 fait {5}.",
        clozeAnswers: ["numérateur", "dénominateur", "1,4", "56", "72"],
        clozeWordBank: ["numérateur", "dénominateur", "1,4", "56", "72", "0,14", "48"],
        explanation: "Magnifique sans-faute ! Numérateur en haut, dénominateur en bas, virgule à 1,4 et tables de 7 et 8 dominées !",
        hint: "Pense au nom du haut, au nom du bas (dessous), au décalage de la virgule pour /10, et au compte à rebours 5, 6, 7, 8 !"
      }
    ]
  },

  pc: {
    id: 'pc_conducteurs',
    title: 'Physique-Chimie - Conducteurs, Isolants & Recyclage',
    subject: 'pc',
    summaryKids: "Un conducteur thermique laisse passer la chaleur (comme les métaux). Un isolant thermique bloque la chaleur (bois, plastique, laine). Les 3 bacs de tri : 1. Jaune (emballages), 2. Vert (verre), 3. Marron (compost) !",
    audioFlashScript: "Flash Physique-Chimie en 2 minutes ! Pourquoi les casseroles ont-elles un manche en plastique ou en bois ? Parce que le plastique et le bois sont des isolants thermiques : ils empêchent la chaleur de brûler tes doigts ! En revanche, le fond de la casserole est en métal car les métaux sont d'excellents conducteurs thermiques qui chauffent vite tes aliments. Côté planète, voici les 3 bacs de tri indispensables : 1, la poubelle jaune pour les emballages, canettes métalliques et cartons. 2, le bac vert pour les bouteilles et pots en verre. 3, le bac à compost pour les restes de repas. Tu es prêt pour le top score !",
    survivalSheet: {
      dangerRed: "Utilise les termes exacts : les métaux conduisent la chaleur (conducteurs thermiques), tandis que le plastique et le bois l'arrêtent (isolants thermiques).",
      warningYellow: ["Les 3 bacs : 1. Jaune (emballages), 2. Vert (verre), 3. Marron (compost)", "Conducteur thermique (métaux)", "Isolant thermique (plastique, bois, laine)"],
      greenFoundation: "Conducteur = Laisse passer / Isolant = Bloque la chaleur • 3 bacs de tri pour recycler"
    },
    practicalMission: {
      role: "Ingénieur Matériaux d'élite",
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
        id: "pc_exam_compare_masse_eau_huile",
        type: "briques",
        subject: "pc",
        level: 3,
        titre: "Contrôle • Compare la masse de 1 L d'eau et de 1 L d'huile alimentaire (1 L eau = 1 000 g / 1 L huile = 920 g) (4 points)",
        points: 4,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ En sciences, comparer ne veut pas dire 'l'huile est jaune'. Il faut comparer la grandeur chiffrée avec unités !",
          radarQuestion: "Quelle est la règle d'or pour comparer deux grandeurs physiques en 6ème ?",
          options: [
            {
              text: "Nommer la grandeur (la masse) + le mot 'PLUS grande que' + les valeurs avec unités (1 000 g contre 920 g)",
              isCorrect: true,
              explanation: "Bravo ! C'est la démarche scientifique rigoureuse attendue en contrôle de Physique-Chimie !"
            },
            {
              text: "Écrire seulement 'l'eau coule et l'huile flotte'",
              isCorrect: false,
              explanation: "La consigne demande de comparer la MASSE, pas d'observer la flottaison !"
            }
          ]
        },
        bricksBank: [
          "À volume égal (1 litre),",
          "la masse de l'eau liquide est PLUS grande que la masse de l'huile",
          "(1 000 g contre 920 g),",
          "ce qui explique que l'huile moins dense flotte sur l'eau.",
          "1000 et 920 sans unité",
          "l'huile est jaune"
        ],
        correctBricks: [
          "À volume égal (1 litre),",
          "la masse de l'eau liquide est PLUS grande que la masse de l'huile",
          "(1 000 g contre 920 g),",
          "ce qui explique que l'huile moins dense flotte sur l'eau."
        ],
        criteriaChecklist: [
          { label: "1. Grandeur comparée explicitée (Masse) (+1 pt)", keywords: ["masse"] },
          { label: "2. Mot de comparaison utilisé (PLUS grande que) (+1.5 pt)", keywords: ["plus"] },
          { label: "3. Données chiffrées avec unités (1 000 g et 920 g) (+1.5 pt)", keywords: ["1 000 g", "920 g", "g", "1000", "920"] }
        ],
        explanation: "À volume égal (1 L), la masse de l'eau est plus grande que la masse de l'huile (1 000 g contre 920 g) : l'eau est plus dense.",
        hint: "Formule : [Grandeur] de [A] est [PLUS/MOINS] [que B] ([Valeurs avec unités])."
      },
      {
        id: "pc_exam_gaz_masse",
        type: "briques",
        subject: "pc",
        level: 3,
        titre: "Contrôle • Décris l'expérience qui prouve que l'air possède une masse (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Démarche d'investigation : Décrire la pesée AVANT, l'action, et la pesée APRÈS !",
          radarQuestion: "Comment démontre-t-on qu'un gaz invisible pèse quelque chose ?",
          options: [
            {
              text: "Peser un ballon gonflé, retirer 1,5 L d'air et constater que la masse diminue sur la balance",
              isCorrect: true,
              explanation: "Exactement ! La diminution de masse prouve que l'air extrait avait une masse (environ 1,2 g par litre)."
            },
            {
              text: "Secouer le ballon pour entendre le bruit de l'air",
              isCorrect: false,
              explanation: "Le son ne prouve pas une masse !"
            }
          ]
        },
        bricksBank: [
          "On pèse d'abord un ballon gonflé d'air sur une balance électronique,",
          "puis on extrait une partie de l'air et on repèse le ballon :",
          "la masse affichée a diminué,",
          "ce qui prouve scientifiquement que l'air possède une masse."
        ],
        correctBricks: [
          "On pèse d'abord un ballon gonflé d'air sur une balance électronique,",
          "puis on extrait une partie de l'air et on repèse le ballon :",
          "la masse affichée a diminué,",
          "ce qui prouve scientifiquement que l'air possède une masse."
        ],
        criteriaChecklist: [
          { label: "1. Matériel expérimental (Ballon + balance) (+1 pt)", keywords: ["pèse", "ballon", "balance"] },
          { label: "2. Démarche (retirer de l'air et repeser) (+1 pt)", keywords: ["extrait", "repèse", "diminué"] },
          { label: "3. Conclusion scientifique validée (+1 pt)", keywords: ["prouve", "masse"] }
        ],
        explanation: "En pesant un ballon gonflé puis en lui retirant de l'air, la masse mesurée diminue : cela prouve que l'air a une masse (environ 1,2 g pour 1 L d'air).",
        hint: "Peser ➡️ Vider de l'air ➡️ Repeser."
      },
      {
        id: "pc_exam_dissolution_conservation_masse",
        type: "briques",
        subject: "pc",
        level: 3,
        titre: "Contrôle • On dissout 20 g de sucre dans 100 g d'eau. Compare la masse du mélange obtenu à la masse des ingrédients et justifie (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Le piège historique où Mathieu perd des points : Croire que parce que le sucre devient invisible, sa masse s'envole !",
          radarQuestion: "Que devient la masse lors d'une dissolution d'un solide dans l'eau ?",
          options: [
            {
              text: "La masse totale se conserve rigoureusement : la masse finale est égale à 100 g + 20 g = 120 g car les molécules de sucre sont toujours présentes",
              isCorrect: true,
              explanation: "Bravo ! En sciences physiques, la masse se conserve toujours lors d'une dissolution : rien ne se perd !"
            },
            {
              text: "La masse devient plus légère car le liquide fait fondre et disparaître la matière",
              isCorrect: false,
              explanation: "Attention, le sucre ne disparaît pas : il se disperse sous forme de molécules invisibles à l'œil nu !"
            }
          ]
        },
        bricksBank: [
          "La masse du mélange obtenu est rigoureusement ÉGALE à la somme des masses de départ (100 g + 20 g = 120 g),",
          "car lors d'une dissolution, la masse totale se conserve :",
          "les molécules de sucre sont toujours présentes dans l'eau,",
          "même si elles sont devenues invisibles à l'œil nu.",
          "la masse diminue à 100 g",
          "le sucre a disparu sans laisser de trace"
        ],
        correctBricks: [
          "La masse du mélange obtenu est rigoureusement ÉGALE à la somme des masses de départ (100 g + 20 g = 120 g),",
          "car lors d'une dissolution, la masse totale se conserve :",
          "les molécules de sucre sont toujours présentes dans l'eau,",
          "même si elles sont devenues invisibles à l'œil nu."
        ],
        criteriaChecklist: [
          { label: "1. Calcul et égalité énoncés (100 g + 20 g = 120 g) (+1 pt)", keywords: ["120", "égale", "somme"] },
          { label: "2. Loi scientifique de conservation de la masse (+1 pt)", keywords: ["conserve", "conservation", "masse"] },
          { label: "3. Justification par la présence des particules (+1 pt)", keywords: ["sucre", "présent", "dissolution", "molécules"] }
        ],
        explanation: "Lors d'une dissolution, la masse se conserve : la masse de la solution d'eau sucrée est égale à la masse de l'eau plus celle du sucre (100 g + 20 g = 120 g).",
        hint: "Masse eau (100 g) + Masse sucre (20 g) = 120 g (Conservation de la masse)."
      },
      {
        id: "pc_exam_compare_etats_matiere",
        type: "briques",
        subject: "pc",
        level: 3,
        titre: "Contrôle • Compare l'état solide (glaçon) et l'état gazeux (vapeur d'eau) en décrivant la forme et le volume (4 points)",
        points: 4,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Bien distinguer 'forme propre' (garde sa forme tout seul) et 'volume propre' (ne se compresse pas facilement) !",
          radarQuestion: "Quelles sont les propriétés physiques qui opposent un solide et un gaz ?",
          options: [
            {
              text: "Un solide a une forme propre et un volume propre, alors qu'un gaz n'a pas de forme propre et occupe tout le volume disponible (compressible)",
              isCorrect: true,
              explanation: "Exactement ! Le solide garde sa forme, alors que le gaz se disperse et peut être comprimé ou détendu."
            },
            {
              text: "Le glaçon est froid et la vapeur est blanche",
              isCorrect: false,
              explanation: "La consigne demande de comparer la FORME et le VOLUME, pas la couleur ou la température !"
            }
          ]
        },
        bricksBank: [
          "À l'état solide (le glaçon), l'eau possède une forme propre et un volume propre,",
          "alors qu'à l'état gazeux (la vapeur d'eau),",
          "l'eau n'a pas de forme propre : elle est compressible",
          "et occupe tout le volume du récipient qui la contient.",
          "le gaz a une forme carrée",
          "le solide n'a pas de volume"
        ],
        correctBricks: [
          "À l'état solide (le glaçon), l'eau possède une forme propre et un volume propre,",
          "alors qu'à l'état gazeux (la vapeur d'eau),",
          "l'eau n'a pas de forme propre : elle est compressible",
          "et occupe tout le volume du récipient qui la contient."
        ],
        criteriaChecklist: [
          { label: "1. État solide (forme propre & volume propre) (+1.5 pt)", keywords: ["solide", "forme propre", "volume propre"] },
          { label: "2. Mot de comparaison (alors que / en revanche) (+1 pt)", keywords: ["alors que", "revanche", "contraire"] },
          { label: "3. État gazeux (pas de forme propre, compressible, volume récipient) (+1.5 pt)", keywords: ["gaz", "gazeux", "compressible", "récipient"] }
        ],
        explanation: "Un solide a une forme propre et un volume propre (les particules sont ordonnées et liées) ; un gaz n'a pas de forme propre et est compressible (les particules sont très dispersées et agitées).",
        hint: "Solide : forme propre + volume propre / Gaz : pas de forme propre + compressible."
      },
      {
        id: "pc_exam_conducteurs_isolants_exemples",
        type: "briques",
        subject: "pc",
        level: 3,
        titre: "Contrôle • Cite 2 matériaux conducteurs thermiques et 2 isolants, puis explique pourquoi la poignée d'une casserole est en plastique (4 points)",
        points: 4,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Ne pas confondre conducteur électrique et thermique ! La question porte sur le transfert de chaleur et la sécurité dans la cuisine !",
          radarQuestion: "Quel rôle vital joue l'isolant thermique sur la poignée de la casserole ?",
          options: [
            {
              text: "L'isolant thermique bloque le transfert de chaleur du métal bouillant vers la main pour éviter toute brûlure",
              isCorrect: true,
              explanation: "Bravo ! Le corps en métal conduit la chaleur aux aliments, et la poignée isolante protège le cuisinier."
            },
            {
              text: "L'isolant sert juste à décorer et changer la couleur de la casserole",
              isCorrect: false,
              explanation: "Non, c'est une mesure de sécurité physique essentielle !"
            }
          ]
        },
        bricksBank: [
          "Les métaux comme le cuivre et l'aluminium sont des conducteurs thermiques,",
          "tandis que le plastique et le bois sont des isolants thermiques :",
          "la poignée de la casserole est en plastique isolant",
          "pour empêcher la chaleur de se propager et éviter de se brûler les mains.",
          "le plastique fait fondre la casserole",
          "l'aluminium ne chauffe jamais"
        ],
        correctBricks: [
          "Les métaux comme le cuivre et l'aluminium sont des conducteurs thermiques,",
          "tandis que le plastique et le bois sont des isolants thermiques :",
          "la poignée de la casserole est en plastique isolant",
          "pour empêcher la chaleur de se propager et éviter de se brûler les mains."
        ],
        criteriaChecklist: [
          { label: "1. Deux conducteurs cités (cuivre, aluminium, fer) (+1 pt)", keywords: ["cuivre", "aluminium", "métaux", "conducteurs"] },
          { label: "2. Deux isolants cités (plastique, bois) (+1 pt)", keywords: ["plastique", "bois", "isolants"] },
          { label: "3. Rôle de protection contre la chaleur (+2 pts)", keywords: ["chaleur", "brûler", "propager", "poignée"] }
        ],
        explanation: "Le corps en métal (conducteur) diffuse la chaleur pour cuire les aliments, alors que la poignée en plastique ou bois (isolant) bloque le transfert de chaleur pour manipuler la casserole sans risque de brûlure.",
        hint: "Métaux = conducteurs / Plastique et bois = isolants pour ne pas se brûler."
      },
      {
        id: "pc_exemple_perso_bacs_isolant",
        type: "exemple_perso",
        subject: "pc",
        level: 3,
        titre: "Dans ta maison ou ta cuisine, trie tes déchets dans les 3 bacs ou observe la chaleur : dis ton exemple perso et justifie ta réponse.",
        points: 4,
        suggestedExamples: [
          "🟡 Jeter une canette de soda vide dans le bac jaune (métal recyclable)",
          "🟢 Mettre un pot de confiture en verre dans le conteneur vert (verre 100% recyclable)",
          "🟤 Déposer des épluchures de fruits dans le bac à compost (matière organique)",
          "🥄 Choisir une cuillère en bois pour mélanger le potage brûlant car le bois est isolant",
          "🧤 Mettre des maniques en tissu épais pour attraper le plat chaud car le tissu bloque la chaleur"
        ],
        explanation: "Super exemple personnel ! Les 3 bacs sont : 1. Jaune pour les emballages (plastique, métal, carton), 2. Vert pour le verre, 3. Marron pour le compost. Et les isolants bloquent la chaleur pour protéger tes mains !",
        hint: "Dis ton exemple perso et justifie ta réponse : cite le bon bac de tri ou explique pourquoi le matériau est conducteur ou isolant !"
      },
      {
        id: "pc_ortho_conductivite",
        type: "qcm",
        subject: "pc",
        level: 1,
        isOrthoQuestion: true,
        titre: "✍️ Orthographe du Mot Clé : Comment s'écrit correctement le mot désignant la capacité à laisser passer la chaleur ?",
        points: 2,
        options: [
          "La conductivité thermique (avec 'ct' et un accent aigu sur le é)",
          "La conductivitée thermique (avec un e muet inutile)",
          "La condussivité thermique"
        ],
        correctIndex: 0,
        explanation: "Bravo ! Les noms féminins terminés par le suffixe -té (comme conductivité, rapidité, liberté) ne prennent généralement JAMAIS de 'e' muet final !",
        hint: "Pense à la règle des noms en -té (pas de 'e' final).",
        spellingTip: "Les noms féminins en -ité ne prennent pas de 'e' muet final (conductivité, solidarité, rapidité) !"
      },
      {
        id: "pc_1",
        type: "libre",
        subject: "pc",
        level: 1,
        titre: "Définis ce qu'est un 'conducteur thermique' et donne un exemple de matériau.",
        points: 4,
        explanation: "Un conducteur thermique est un matériau qui laisse facilement passer la chaleur, comme les métaux (cuivre, fer, aluminium).",
        hint: "Pense au matériau qui chauffe très vite sur une plaque."
      },
      {
        id: "pc_inv_conducteur",
        type: "libre",
        subject: "pc",
        level: 1,
        titre: "Devinette de définition : Comment qualifie-t-on un matériau qui laisse très facilement et rapidement circuler la chaleur ?",
        points: 3,
        correctAnswer: "conducteur",
        keywords: ["conducteur", "conducteur thermique"],
        explanation: "C'est un conducteur thermique ! Tous les métaux (cuivre, fer, aluminium) sont d'excellents conducteurs.",
        hint: "Pense au verbe 'conduire' la chaleur."
      },
      {
        id: "pc_inv_isolant",
        type: "libre",
        subject: "pc",
        level: 1,
        titre: "Devinette de définition : Comment qualifie-t-on un matériau qui bloque ou freine la chaleur (comme le bois, la laine ou le plastique) ?",
        points: 3,
        correctAnswer: "isolant",
        keywords: ["isolant", "isolant thermique"],
        explanation: "C'est un isolant thermique ! C'est grâce aux isolants qu'on ne se brûle pas avec le manche d'une casserole.",
        hint: "Pense au verbe 'isoler'."
      },
      {
        id: "pc_2",
        type: "libre",
        subject: "pc",
        level: 1,
        titre: "Définis ce qu'est un 'isolant thermique' et donne un exemple concret.",
        points: 4,
        explanation: "Un isolant thermique bloque ou ralentit la transmission de la chaleur, comme le bois, le plastique, la laine ou le polystyrène.",
        hint: "Pense au manche d'une poêle qui ne brûle pas les mains."
      },
      {
        id: "pc_3",
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
        id: "pc_4",
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
        id: "pc_5",
        type: "vf",
        subject: "pc",
        level: 2,
        titre: "Vrai ou Faux : Les bouteilles en verre doivent être jetées dans la poubelle jaune avec les canettes et cartons.",
        points: 2,
        correctAnswer: "Faux",
        explanation: "FAUX ! Le verre a son propre conteneur spécifique et ne va pas dans la poubelle jaune.",
        hint: "Pense au bruit du verre qu'on jette dans la colonne à verre du quartier."
      },
      {
        id: "pc_6",
        type: "libre",
        subject: "pc",
        level: 2,
        titre: "Pourquoi met-on un manteau en laine ou une doudoune en hiver pour avoir chaud ?",
        points: 4,
        explanation: "La laine et les plumes sont des isolants thermiques qui emprisonnent l'air chaud dégagé par notre corps et empêchent le froid d'entrer.",
        hint: "Pense à l'air chaud piégé qui ne peut pas s'échapper."
      },
      {
        id: "pc_7",
        type: "vf",
        subject: "pc",
        level: 1,
        titre: "Vrai ou Faux : Les métaux comme le cuivre, le fer et l'aluminium sont tous de très bons conducteurs thermiques.",
        points: 2,
        correctAnswer: "Vrai",
        explanation: "C'est VRAI ! Tous les métaux transmettent rapidement la chaleur.",
        hint: "Pense à une cuillère en métal qui chauffe très vite dans la soupe."
      },
      {
        id: "pc_8",
        type: "qcm",
        subject: "pc",
        level: 2,
        titre: "Dans quelle poubelle doit-on jeter une canette de soda en aluminium pour la recycler ?",
        points: 2,
        options: ["La poubelle jaune (recyclables)", "La poubelle verte", "La colonne à verre"],
        correctIndex: 0,
        explanation: "Dans la poubelle jaune ! L'aluminium se recycle à l'infini pour fabriquer de nouveaux objets.",
        hint: "C'est la poubelle de tri des emballages et métaux."
      },
      {
        id: "pc_cloze_final",
        type: "texte_a_trous",
        subject: "pc",
        level: 2,
        titre: "🏆 Défi Synthèse Finale : Complète le Grand Texte Bilan sur les matériaux et la chaleur",
        points: 4,
        clozeTemplate: "Un matériau qui laisse rapidement passer la chaleur est un {1} thermique, comme tous les {2}. À l'inverse, un matériau qui bloque ou freine la chaleur est un {3} thermique, comme le bois ou le plastique. Pour protéger la Terre, les emballages en carton et métal vont dans la poubelle {4}, tandis que le verre a son propre conteneur.",
        clozeAnswers: ["conducteur", "métaux", "isolant", "jaune"],
        clozeWordBank: ["conducteur", "métaux", "isolant", "jaune", "verte", "radiateur"],
        explanation: "Excellent ! Conducteur laisse passer, isolant retient, métaux au chaud et poubelle jaune pour le recyclage !",
        hint: "Pense à ce qui conduit, à la famille des métaux, à ce qui isole, et à la couleur de la poubelle de tri."
      }
    ]
  },

  geo: {
    id: 'geo_metropoles',
    title: 'Géographie - Habiter les métropoles et espaces à faible densité',
    subject: 'geo',
    summaryKids: "Une métropole est une grande ville qui concentre la population et les activités de commandement. À l'inverse, un espace à faible densité compte très peu d'habitants au kilomètre carré.",
    audioFlashScript: "Voici ton flash Géographie de 2 minutes ! Aujourd'hui, on explore comment les humains habitent la Terre. D'un côté, il y a les métropoles : des villes géantes comme Paris, Tokyo ou New York, avec des millions d'habitants, des gratte-ciels, des gares et aéroports internationaux. De l'autre côté, il y a les espaces à faible densité : les déserts, les hautes montagnes ou les campagnes isolées, où il y a moins de 30 habitants par kilomètre carré. Retiens bien la différence entre forte densité et faible densité !",
    survivalSheet: {
      dangerRed: "Distingue bien les deux termes : la métropole est une grande ville qui commande, tandis que la mégapole est une ville géante de plus de 10 millions d'habitants.",
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
      "Comprendre pourquoi certains services sont concentrés dans les métropoles."
    ],
    mnemonicTrick: "Métro-pole = Là où il y a le Métro et la foule !",
    quizQuestions: [
      {
        id: "geo_exam_compare_metropoles",
        type: "briques",
        subject: "geo",
        level: 3,
        titre: "Contrôle Savoir-Faire • Compare la vie quotidienne dans une métropole d'un pays développé (Tokyo) et d'un pays en développement (Lagos) (4 points)",
        points: 4,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Ne pas se contenter de dire 'c'est plus pauvre' ! Il faut comparer précisément les logements, les transports et les services !",
          radarQuestion: "Quels sont les 3 critères obligatoires pour comparer deux métropoles mondiales ?",
          options: [
            {
              text: "Comparer la qualité de l'habitat (immeubles modernes vs bidonvilles), l'efficacité des transports et l'accès à l'eau potable / électricité",
              isCorrect: true,
              explanation: "Exactement ! En géographie 6ème, on compare l'habitat, les mobilités et les services essentiels."
            },
            {
              text: "Donner la liste des magasins de souvenirs dans chaque aéroport",
              isCorrect: false,
              explanation: "Hors-sujet : la géographie urbaine s'intéresse aux conditions de vie des habitants !"
            }
          ]
        },
        bricksBank: [
          "À Tokyo (pays développé), les habitants disposent de logements modernes et d'un métro très rapide,",
          "tandis qu'à Lagos (pays en développement), une grande partie de la population vit dans des bidonvilles",
          "avec d'importants embouteillages",
          "et un accès difficile à l'eau potable et à l'électricité.",
          "les deux villes sont exactement pareilles",
          "ils vont tous à pied sans transport"
        ],
        correctBricks: [
          "À Tokyo (pays développé), les habitants disposent de logements modernes et d'un métro très rapide,",
          "tandis qu'à Lagos (pays en développement), une grande partie de la population vit dans des bidonvilles",
          "avec d'importants embouteillages",
          "et un accès difficile à l'eau potable et à l'électricité."
        ],
        criteriaChecklist: [
          { label: "1. Métropole développée (Tokyo / moderne / transports) (+1.5 pt)", keywords: ["tokyo", "moderne", "métro", "développé"] },
          { label: "2. Mot d'opposition géographique (Tandis que / Alors que) (+1 pt)", keywords: ["tandis que", "alors que", "contraire"] },
          { label: "3. Métropole en développement (Lagos / bidonvilles / eau) (+1.5 pt)", keywords: ["lagos", "bidonville", "eau", "développement"] }
        ],
        explanation: "À Tokyo, les habitants bénéficient d'infrastructures modernes et de transports efficaces ; à l'inverse, à Lagos, la croissance démographique entraîne l'extension de bidonvilles et des difficultés d'accès aux services de base (eau, électricité, assainissement).",
        hint: "Tokyo (confort & transports modernes) vs Lagos (bidonvilles & manque de services de base)."
      },
      {
        id: "geo_exam_compare_densite",
        type: "briques",
        subject: "geo",
        level: 3,
        titre: "Contrôle • Compare un espace à très forte densité (Asie du Sud) et un espace à faible densité (Désert du Sahara) en justifiant par les contraintes (4 points)",
        points: 4,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Comparer les chiffres de densité ET nommer la contrainte naturelle (aridité/sécheresse) qui bloque l'installation !",
          radarQuestion: "Quelle est la cause naturelle principale qui crée un espace à faible densité ?",
          options: [
            {
              text: "Une contrainte naturelle forte (froid polaire, manque d'eau et sécheresse du désert, ou forte pente en montagne)",
              isCorrect: true,
              explanation: "Parfait ! La contrainte naturelle rend l'agriculture et la vie humaine difficiles, ce qui explique la très faible densité (< 30 hab/km²)."
            },
            {
              text: "Le fait que les gens n'aiment pas le soleil",
              isCorrect: false,
              explanation: "La géographie s'appuie sur les contraintes physiques du milieu, pas sur les goûts personnels !"
            }
          ]
        },
        bricksBank: [
          "En Asie du Sud, la densité est très forte (plus de 300 hab/km²) grâce aux plaines fertiles et aux fleuves,",
          "alors que dans le désert du Sahara, la densité est très faible (moins de 2 hab/km²)",
          "en raison de la contrainte naturelle de l'aridité (manque d'eau) et de la chaleur extrême.",
          "il y a des millions d'habitants dans le Sahara",
          "les gens préfèrent le sable"
        ],
        correctBricks: [
          "En Asie du Sud, la densité est très forte (plus de 300 hab/km²) grâce aux plaines fertiles et aux fleuves,",
          "alors que dans le désert du Sahara, la densité est très faible (moins de 2 hab/km²)",
          "en raison de la contrainte naturelle de l'aridité (manque d'eau) et de la chaleur extrême."
        ],
        criteriaChecklist: [
          { label: "1. Espace à forte densité identifié avec atouts (+1.5 pt)", keywords: ["forte", "plaine", "asie", "300"] },
          { label: "2. Mot de comparaison utilisé (Alors que / En revanche) (+1 pt)", keywords: ["alors que", "revanche", "contraire"] },
          { label: "3. Espace à faible densité avec contrainte naturelle (+1.5 pt)", keywords: ["faible", "sahara", "aridité", "contrainte"] }
        ],
        explanation: "L'Asie du Sud est un foyer de peuplement majeur à très forte densité favorisé par le climat et les fleuves, alors que le Sahara est un désert humain à très faible densité (< 2 hab/km²) à cause de la contrainte de l'aridité.",
        hint: "Forte densité (atouts) vs Faible densité (contrainte d'aridité)."
      },
      {
        id: "geo_exam_contraintes_exemples",
        type: "briques",
        subject: "geo",
        level: 3,
        titre: "Contrôle • Cite 3 contraintes naturelles majeures qui bloquent l'installation humaine sur Terre et donne un exemple de lieu pour chacune (4 points)",
        points: 4,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Le professeur exige les 3 grands types de contraintes : le froid polaire, l'aridité/sécheresse et la forte pente du relief !",
          radarQuestion: "Quelles sont les 3 contraintes naturelles fondamentales du cours de 6ème ?",
          options: [
            {
              text: "Le froid polaire extrême (Antarctique, Groenland), l'aridité et le manque d'eau (désert du Sahara) et la pente raide des hautes montagnes (l'Himalaya)",
              isCorrect: true,
              explanation: "Bravo ! Froid, manque d'eau et relief abrupt sont les 3 freins naturels qui créent des déserts humains !"
            },
            {
              text: "Le bruit des voitures, les embouteillages et le manque de magasins",
              isCorrect: false,
              explanation: "Ce sont des inconvénients urbains humains, pas des contraintes naturelles physiques du milieu !"
            }
          ]
        },
        bricksBank: [
          "Les trois grandes contraintes naturelles qui limitent le peuplement sont :",
          "le froid polaire extrême (comme au Groenland ou en Sibérie),",
          "l'aridité et l'absence d'eau douce (comme dans le désert du Sahara),",
          "et la forte pente liée à l'altitude en haute montagne (comme dans l'Himalaya).",
          "le soleil qui brille trop",
          "la présence de trop d'arbres"
        ],
        correctBricks: [
          "Les trois grandes contraintes naturelles qui limitent le peuplement sont :",
          "le froid polaire extrême (comme au Groenland ou en Sibérie),",
          "l'aridité et l'absence d'eau douce (comme dans le désert du Sahara),",
          "et la forte pente liée à l'altitude en haute montagne (comme dans l'Himalaya)."
        ],
        criteriaChecklist: [
          { label: "1. Froid polaire cité avec exemple (Groenland, Sibérie) (+1 pt)", keywords: ["froid", "polaire", "groenland", "sibérie"] },
          { label: "2. Aridité / manque d'eau avec exemple (Sahara) (+1 pt)", keywords: ["aridité", "eau", "sahara", "désert"] },
          { label: "3. Relief / altitude avec exemple (Himalaya, montagne) (+1.5 pt)", keywords: ["pente", "altitude", "montagne", "himalaya"] }
        ],
        explanation: "Les milieux contraignants sont les déserts froids (polaire), les déserts chauds (aridité sans eau) et les hautes montagnes (froid, altitude et pente abrupte), ce qui explique leur très faible densité de population.",
        hint: "3 contraintes : 1. Froid (Groenland) + 2. Sécheresse (Sahara) + 3. Pente (Himalaya)."
      },
      {
        id: "geo_exam_foyers_peuplement_atouts",
        type: "briques",
        subject: "geo",
        level: 3,
        titre: "Contrôle • Pourquoi la majorité des humains vivent-ils sur les littoraux et dans les plaines fluviales ? Explique les atouts (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Ne pas dire juste 'pour aller à la plage' ! La géographie explique le rôle du commerce maritime mondial et de l'agriculture fertile !",
          radarQuestion: "Quels atouts géographiques et économiques attirent la population sur les côtes ?",
          options: [
            {
              text: "La fertilité des terres agricoles près des fleuves, le climat plus doux et l'ouverture sur les routes du commerce maritime mondial (ports)",
              isCorrect: true,
              explanation: "Parfait ! La littoralisation s'explique par l'agriculture facile et les échanges mondiaux par porte-conteneurs !"
            },
            {
              text: "Pour pouvoir faire du surf tous les jours",
              isCorrect: false,
              explanation: "Les loisirs ne sont pas le moteur principal du peuplement mondial !"
            }
          ]
        },
        bricksBank: [
          "Les humains se concentrent sur les littoraux et dans les plaines fluviales",
          "car ces milieux offrent des terres fertiles pour l'agriculture,",
          "un climat plus modéré favorable à la vie quotidienne,",
          "et un accès direct aux grands ports pour le commerce mondial.",
          "ils aiment voir les vagues",
          "pour éviter de marcher"
        ],
        correctBricks: [
          "Les humains se concentrent sur les littoraux et dans les plaines fluviales",
          "car ces milieux offrent des terres fertiles pour l'agriculture,",
          "un climat plus modéré favorable à la vie quotidienne,",
          "et un accès direct aux grands ports pour le commerce mondial."
        ],
        criteriaChecklist: [
          { label: "1. Terres fertiles / agriculture le long des fleuves (+1 pt)", keywords: ["terres", "fertiles", "agriculture", "fleuves"] },
          { label: "2. Climat modéré et favorable (+1 pt)", keywords: ["climat", "favorable", "modéré"] },
          { label: "3. Ports et commerce maritime mondial (+1 pt)", keywords: ["ports", "commerce", "mondial", "littoraux"] }
        ],
        explanation: "La concentration des hommes sur les côtes (littoralisation) s'explique par les plaines fertiles irrigables et le rôle stratégique des mers pour transporter les marchandises du commerce international.",
        hint: "Atouts : Terres fertiles + Climat tempéré + Ports pour le commerce maritime."
      },
      {
        id: "geo_exam_habiter_bidonville_defi",
        type: "briques",
        subject: "geo",
        level: 3,
        titre: "Contrôle • Décris les difficultés quotidiennes rencontrées par les habitants des bidonvilles dans les métropoles des pays en développement (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Le professeur attend des faits précis sur les besoins vitaux : eau potable, électricité, assainissement (égouts) et transports !",
          radarQuestion: "Quels services de base essentiels manquent cruellement dans les bidonvilles ?",
          options: [
            {
              text: "L'absence de raccordement à l'eau potable, l'absence de réseau d'égouts et les logements précaires faits de matériaux de récupération",
              isCorrect: true,
              explanation: "Exactement ! Les bidonvilles souffrent du manque d'infrastructures publiques essentielles."
            },
            {
              text: "Le manque de piscines privées et de cinémas 4D",
              isCorrect: false,
              explanation: "Dans un bidonville, ce sont les besoins vitaux de base qui manquent !"
            }
          ]
        },
        bricksBank: [
          "Dans les bidonvilles des pays en développement (comme à Lagos),",
          "les habitants vivent dans des abris précaires en tôle ou bois,",
          "sans accès direct à l'eau courante potable ni réseau d'égouts,",
          "ce qui favorise les maladies et rend les déplacements très longs.",
          "ils ont des ascenseurs dorés",
          "les rues sont toujours vides"
        ],
        correctBricks: [
          "Dans les bidonvilles des pays en développement (comme à Lagos),",
          "les habitants vivent dans des abris précaires en tôle ou bois,",
          "sans accès direct à l'eau courante potable ni réseau d'égouts,",
          "ce qui favorise les maladies et rend les déplacements très longs."
        ],
        criteriaChecklist: [
          { label: "1. Logements précaires décrits (tôle, matériaux récupérés) (+1 pt)", keywords: ["abris", "précaires", "tôle", "bidonvilles"] },
          { label: "2. Manque d'eau potable et égouts/assainissement (+1 pt)", keywords: ["eau", "potable", "égouts", "accès"] },
          { label: "3. Conséquences sur la santé et la vie quotidienne (+1 pt)", keywords: ["maladies", "santé", "déplacements", "quotidienne"] }
        ],
        explanation: "Dans les bidonvilles, l'explosion démographique dépasse les capacités de la ville : les habitants subissent l'absence d'eau courante, d'électricité fiable, de ramassage des déchets et d'égouts, créant des risques sanitaires.",
        hint: "Difficultés : Abris de fortune + Manque d'eau potable + Pas d'égouts (risques sanitaires)."
      },
      {
        id: "geo_exemple_perso_espace",
        type: "exemple_perso",
        subject: "geo",
        level: 3,
        titre: "Pense à ta commune ou à un lieu que tu as déjà visité : dis ton exemple perso de forte ou faible densité et justifie ta réponse.",
        points: 4,
        suggestedExamples: [
          "🏙️ Paris ou Lyon : métro bondé, immeubles hauts et commerces partout (forte densité)",
          "⛰️ Un village de haute montagne avec 40 habitants et beaucoup d'espace (faible densité)",
          "🏜️ Une expédition dans le désert où l'eau est rare et sans aucun habitant (faible densité)",
          "🌾 La campagne chez mes grands-parents avec des fermes et peu de voisins (espace rural)"
        ],
        explanation: "Exemple très clair ! La densité mesure le nombre d'habitants par kilomètre carré : forte densité dans les grandes villes contre très faible densité dans les zones rurales ou montagneuses.",
        hint: "Dis ton exemple perso et justifie ta réponse avec les bâtiments, les transports ou le nombre d'habitants !"
      },
      {
        id: "geo_ortho_metropole",
        type: "qcm",
        subject: "geo",
        level: 1,
        isOrthoQuestion: true,
        titre: "✍️ Orthographe du Mot Clé : Comment s'écrit correctement le mot désignant une très grande ville qui commande ?",
        points: 2,
        options: [
          "Une métropole (avec un accent aigu sur le premier 'é' et un seul 'p')",
          "Une metropole (sans accent)",
          "Une métroppole (avec deux 'p')"
        ],
        correctIndex: 0,
        explanation: "Exact ! Métropole s'écrit avec un accent aigu sur le 'é' et un seul 'p'. Le mot vient du grec mêtêr (mère) et polis (la cité), la ville-mère !",
        hint: "Pense à la ville-mère : Mé-tro-pole avec accent aigu sur le premier e.",
        spellingTip: "Mé-tro-pole : un accent aigu sur le premier E et un seul P !"
      },
      {
        id: "geo_1",
        type: "libre",
        subject: "geo",
        level: 1,
        titre: "Définis ce qu'est une 'métropole' en rédigeant une phrase complète.",
        points: 4,
        explanation: "Une métropole est une très grande ville qui concentre beaucoup d'habitants et des fonctions économiques, politiques ou culturelles importantes.",
        hint: "Pense aux mots-clés : très grande ville, forte population et activités de commandement.",
      },
      {
        id: "geo_inv_metropole",
        type: "libre",
        subject: "geo",
        level: 1,
        titre: "Devinette de définition : Comment appelle-t-on une très grande ville qui concentre la population, les richesses et les pouvoirs de décision (comme Paris ou Tokyo) ?",
        points: 3,
        correctAnswer: "une métropole",
        keywords: ["métropole", "metropole"],
        explanation: "C'est une métropole ! Elle rayonne sur sa région et souvent sur le monde entier.",
        hint: "Pense au mot qui commence par 'métro...'."
      },
      {
        id: "geo_inv_megapole",
        type: "libre",
        subject: "geo",
        level: 1,
        titre: "Devinette de définition : Comment appelle-t-on une ville géante comptant plus de 10 millions d'habitants ?",
        points: 3,
        correctAnswer: "une mégapole",
        keywords: ["mégapole", "megapole"],
        explanation: "C'est une mégapole ! Tokyo, New York ou São Paulo sont des mégapoles.",
        hint: "Pense au préfixe 'méga' qui signifie géant."
      },
      {
        id: "geo_rep_pacifique",
        type: "libre",
        subject: "geo",
        level: 1,
        titre: "Repère Géographique : Quel est le plus vaste et le plus grand océan de notre planète Terre ?",
        points: 3,
        correctAnswer: "l'Océan Pacifique",
        keywords: ["pacifique"],
        explanation: "L'Océan Pacifique ! Il couvre plus d'un tiers de la planète et borde l'Asie et l'Amérique.",
        hint: "Ce nom évoque la paix et le calme."
      },
      {
        id: "geo_rep_equateur",
        type: "libre",
        subject: "geo",
        level: 1,
        titre: "Repère Géographique : Comment s'appelle la ligne imaginaire horizontale (à 0° de latitude) qui sépare la Terre en hémisphère Nord et hémisphère Sud ?",
        points: 3,
        correctAnswer: "l'Équateur",
        keywords: ["équateur", "equateur"],
        explanation: "L'Équateur sépare le globe en deux moitiés égales !",
        hint: "Pense au mot qui commence par Équ... comme équitable ou égalité."
      },
      {
        id: "geo_2",
        type: "libre",
        subject: "geo",
        level: 1,
        titre: "Qu'appelle-t-on un espace à 'faible densité' ?",
        points: 4,
        explanation: "C'est un espace géographique qui compte très peu d'habitants au kilomètre carré (comme les déserts, les montagnes ou certaines campagnes).",
        hint: "Moins de 30 habitants par km²."
      },
      {
        id: "geo_3",
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
        id: "geo_4",
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
        id: "geo_5",
        type: "trou",
        subject: "geo",
        level: 2,
        titre: "Texte à trous : Une ville de plus de 10 millions d'habitants est appelée une ________.",
        points: 2,
        correctAnswer: "mégapole",
        explanation: "Au-delà de 10 millions d'habitants, c'est une mégapole.",
        hint: "Méga = géant."
      },
      {
        id: "geo_6",
        type: "libre",
        subject: "geo",
        level: 1,
        titre: "Qu'appelle-t-on la 'densité de population' en géographie ?",
        points: 4,
        explanation: "C'est le nombre moyen d'habitants qui vivent sur un kilomètre carré (hab/km²).",
        hint: "Pense au nombre d'habitants divisé par la surface en km²."
      },
      {
        id: "geo_7",
        type: "vf",
        subject: "geo",
        level: 2,
        titre: "Vrai ou Faux : Les métropoles mondiales concentrent des fonctions de commandement comme des aéroports internationaux, des banques et de grandes universités.",
        points: 2,
        correctAnswer: "Vrai",
        explanation: "C'est VRAI ! C'est ce qui fait la puissance des métropoles à l'échelle du monde.",
        hint: "Pense à ce qu'on trouve dans les capitales mondiales."
      },
      {
        id: "geo_8",
        type: "qcm",
        subject: "geo",
        level: 2,
        titre: "Laquelle de ces villes est une 'mégapole' géante comptant plus de 30 millions d'habitants dans son agglomération ?",
        points: 2,
        options: ["Tokyo (Japon)", "Bordeaux (France)", "Genève (Suisse)"],
        correctIndex: 0,
        explanation: "Tokyo est la plus grande mégapole du monde avec près de 37 millions d'habitants !",
        hint: "C'est une capitale asiatique ultra-peuplée."
      },
      {
        id: "geo_cloze_final",
        type: "texte_a_trous",
        subject: "geo",
        level: 2,
        titre: "🏆 Défi Synthèse Finale : Complète le Grand Texte Bilan sur l'occupation de la Terre",
        points: 4,
        clozeTemplate: "Une {1} est une très grande ville qui concentre la population et les pouvoirs de décision. Lorsqu'elle dépasse 10 millions d'habitants, on la qualifie de {2}. À l'opposé, les déserts ou les hautes montagnes sont des espaces à {3} densité en raison des fortes contraintes du relief ou du {4}.",
        clozeAnswers: ["métropole", "mégapole", "faible", "climat"],
        clozeWordBank: ["métropole", "mégapole", "faible", "climat", "forte", "village"],
        explanation: "Superbe ! Métropole, mégapole, faible densité et contraintes de climat.",
        hint: "Pense aux grandes villes, au préfixe méga, au mot opposé à forte, et à la météo."
      }
    ]
  },

  francais: {
    id: 'fr_accords',
    title: 'Français 6ème - Les accords du participe passé',
    subject: 'francais',
    summaryKids: "Le participe passé s'accorde avec le sujet avec l'auxiliaire 'être'. Avec 'avoir', il ne s'accorde JAMAIS avec le sujet, uniquement si le COD est placé avant lui !",
    audioFlashScript: "Voici ton flash Français en 2 minutes sur le participe passé ! Règle numéro 1 : avec l'auxiliaire ÊTRE, le participe passé est poli, il s'accorde toujours avec le sujet. Exemple : 'Les filles sont arrivées'. Règle numéro 2 : avec l'auxiliaire AVOIR, il ne s'accorde JAMAIS avec le sujet. Il s'accorde uniquement si le COD est passé devant lui, comme dans : 'La pomme que j'ai mangée'. Astuce magique : pour savoir si tu écris -é ou -er, remplace par le verbe 'vendu' ou 'mordre' ! Tu as toutes les armes pour réussir.",
    survivalSheet: {
      dangerRed: "Avec l'auxiliaire 'avoir', n'accorde le participe passé QUE si le COD est placé avant lui. Exemple : 'J'ai mangé des pommes' (le COD est après -> 'mangé' ne s'accorde pas).",
      warningYellow: ["Être -> accord sujet automatique", "Avoir -> accord COD avant uniquement", "Astuce mordre / vendu (-er ou -é)"],
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
        id: "fr_exam_nature_fonction",
        type: "briques",
        subject: "francais",
        level: 3,
        titre: "Contrôle • Dans 'Le loup affamé rôde', donne la nature et la fonction du mot 'affamé' en justifiant (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Ne pas confondre NATURE (ce que le mot est pour toujours) et FONCTION (son rôle dans la phrase) !",
          radarQuestion: "Que demande précisément la consigne quand elle demande nature ET fonction ?",
          options: [
            {
              text: "Identifier son identité grammaticale (adjectif) ET son rôle précis auprès du nom (épithète)",
              isCorrect: true,
              explanation: "Exactement ! Nature = sa carte d'identité (adjectif), Fonction = son métier dans la phrase (épithète)."
            },
            {
              text: "Dire si on aime ou pas le mot",
              isCorrect: false,
              explanation: "Ce n'est pas une question d'opinion personnelle !"
            }
          ]
        },
        bricksBank: [
          "'Affamé' a pour nature d'être un adjectif qualificatif,",
          "et il a pour fonction d'être épithète du nom 'loup',",
          "car il est placé directement à côté du nom qu'il qualifie sans verbe entre eux.",
          "c'est un verbe conjugué",
          "c'est le sujet du verbe"
        ],
        correctBricks: [
          "'Affamé' a pour nature d'être un adjectif qualificatif,",
          "et il a pour fonction d'être épithète du nom 'loup',",
          "car il est placé directement à côté du nom qu'il qualifie sans verbe entre eux."
        ],
        criteriaChecklist: [
          { label: "1. Nature identifiée (Adjectif qualificatif) (+1 pt)", keywords: ["nature", "adjectif", "qualificatif"] },
          { label: "2. Fonction identifiée (Épithète) (+1 pt)", keywords: ["fonction", "épithète"] },
          { label: "3. Justification par la position (+1 pt)", keywords: ["placé", "côté", "qualifie", "nom"] }
        ],
        explanation: "'Affamé' est un adjectif qualificatif (nature) ; sa fonction est épithète du nom 'loup' car il est rattaché directement au nom.",
        hint: "Nature : Adjectif / Fonction : Épithète."
      },
      {
        id: "fr_exam_justifier_accord_participe",
        type: "briques",
        subject: "francais",
        level: 3,
        titre: "Contrôle • Justifie l'accord dans : 'Les pommes que nous avons cueillies sont délicieuses' (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Avec l'auxiliaire AVOIR, le participe ne s'accorde JAMAIS avec le sujet 'nous' ! Il s'accorde avec le COD placé AVANT !",
          radarQuestion: "Quelle est la règle d'accord d'or du professeur de français avec l'auxiliaire avoir ?",
          options: [
            {
              text: "Le participe passé 'cueillies' s'accorde avec le COD 'que' (qui remplace 'les pommes', féminin pluriel) car il est placé AVANT le verbe avoir",
              isCorrect: true,
              explanation: "Parfait ! Règle d'or : Avec avoir, accord avec le COD seulement s'il est placé devant !"
            },
            {
              text: "Il s'accorde avec le sujet 'nous' qui cueille les fruits",
              isCorrect: false,
              explanation: "Piège classique ! Avec l'auxiliaire avoir, on ne s'accorde JAMAIS avec le sujet !"
            }
          ]
        },
        bricksBank: [
          "Le participe passé 'cueillies' s'accorde au féminin pluriel (-es),",
          "car il est employé avec l'auxiliaire 'avoir'",
          "et le Complément d'Objet Direct (le pronom 'que' qui reprend 'les pommes')",
          "est placé AVANT le verbe.",
          "il s'accorde avec le sujet nous",
          "c'est un adjectif invariable"
        ],
        correctBricks: [
          "Le participe passé 'cueillies' s'accorde au féminin pluriel (-es),",
          "car il est employé avec l'auxiliaire 'avoir'",
          "et le Complément d'Objet Direct (le pronom 'que' qui reprend 'les pommes')",
          "est placé AVANT le verbe."
        ],
        criteriaChecklist: [
          { label: "1. Terminaison féminin pluriel justifiée (-es) (+1 pt)", keywords: ["féminin", "pluriel", "-es", "cueillies"] },
          { label: "2. Auxiliaire Avoir mentionné (+1 pt)", keywords: ["auxiliaire", "avoir"] },
          { label: "3. Règle du COD placé AVANT (+1 pt)", keywords: ["cod", "avant", "pommes", "que"] }
        ],
        explanation: "Avec l'auxiliaire avoir, le participe passé s'accorde avec le COD si celui-ci est placé avant le verbe ('que' mis pour 'les pommes', fém. pluriel ➡️ cueillies).",
        hint: "Auxiliaire AVOIR + COD 'que' (les pommes) placé AVANT ➡️ accord féminin pluriel."
      },
      {
        id: "fr_exam_homophones_a_a",
        type: "briques",
        subject: "francais",
        level: 3,
        titre: "Contrôle • Complète et justifie la règle pour choisir entre 'a' et 'à' dans : 'Lucas ___ donné un livre ___ sa cousine' (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Le piège classique : Remplacer par 'avait' ! Si 'avait' fonctionne, c'est le verbe avoir sans accent. Sinon, c'est la préposition à !",
          radarQuestion: "Quelle est la méthode infaillible exigée par le professeur ?",
          options: [
            {
              text: "Remplacer par 'avait' : 'Lucas avait donné' fonctionne (verbe avoir 'a'), mais 'avait sa cousine' est impossible (préposition 'à')",
              isCorrect: true,
              explanation: "Parfait ! 'Avait' valide le verbe avoir sans accent. Quand c'est impossible, c'est la préposition avec accent grave 'à'."
            },
            {
              text: "Mettre un accent au hasard ou selon l'humeur",
              isCorrect: false,
              explanation: "La grammaire obéit à une règle logique de substitution !"
            }
          ]
        },
        bricksBank: [
          "On écrit d'abord 'a' sans accent car on peut remplacer par l'imparfait 'avait' (Lucas avait donné),",
          "ce qui prouve qu'il s'agit du verbe avoir conjugué,",
          "puis on écrit 'à' avec un accent grave car on ne peut pas dire 'avait sa cousine' :",
          "c'est donc le mot invariable de liaison (la préposition).",
          "on met toujours un accent",
          "les deux s'écrivent pareil"
        ],
        correctBricks: [
          "On écrit d'abord 'a' sans accent car on peut remplacer par l'imparfait 'avait' (Lucas avait donné),",
          "ce qui prouve qu'il s'agit du verbe avoir conjugué,",
          "puis on écrit 'à' avec un accent grave car on ne peut pas dire 'avait sa cousine' :",
          "c'est donc le mot invariable de liaison (la préposition)."
        ],
        criteriaChecklist: [
          { label: "1. Substitution par 'avait' formulée (+1 pt)", keywords: ["avait", "remplacer", "imparfait"] },
          { label: "2. Verbe 'a' sans accent justifié (+1 pt)", keywords: ["verbe", "avoir", "sans accent"] },
          { label: "3. Préposition 'à' avec accent démontrée (+1 pt)", keywords: ["préposition", "accent", "impossible"] }
        ],
        explanation: "Si on peut remplacer par 'avait', c'est le verbe avoir (a sans accent). Si c'est impossible, c'est la préposition (à avec accent grave). On écrit donc : 'Lucas a donné un livre à sa cousine'.",
        hint: "Test magique : 'avait' possible ➡️ 'a' (verbe) / 'avait' impossible ➡️ 'à' (préposition)."
      },
      {
        id: "fr_exam_accord_sujet_inverse",
        type: "briques",
        subject: "francais",
        level: 3,
        titre: "Contrôle • Justifie l'accord du verbe dans : 'Au fond de la forêt chantent les oiseaux matinaux' (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Attention au sujet inversé ! Le sujet n'est PAS 'la forêt' (singulier), mais 'les oiseaux' (pluriel) placé APRÈS le verbe !",
          radarQuestion: "Qui fait l'action de chanter dans cette phrase littéraire ?",
          options: [
            {
              text: "Le sujet est 'les oiseaux matinaux' (pluriel) placé après le verbe (sujet inversé) : le verbe s'accorde au pluriel (-ent)",
              isCorrect: true,
              explanation: "Exactement ! La question 'Qui est-ce qui chante ?' donne 'les oiseaux matinaux' (sujet inversé)."
            },
            {
              text: "Le sujet est 'la forêt', donc le verbe devrait être au singulier",
              isCorrect: false,
              explanation: "Piège classique ! 'Au fond de la forêt' est un complément de lieu, pas le sujet du verbe !"
            }
          ]
        },
        bricksBank: [
          "Le verbe 'chantent' prend la terminaison du pluriel (-ent)",
          "car son sujet est le groupe nominal 'les oiseaux matinaux',",
          "qui est un sujet inversé placé après le verbe :",
          "en posant la question 'Qui est-ce qui chante ?', la réponse est 'les oiseaux'.",
          "la forêt est le sujet du verbe",
          "on accorde avec le mot le plus proche"
        ],
        correctBricks: [
          "Le verbe 'chantent' prend la terminaison du pluriel (-ent)",
          "car son sujet est le groupe nominal 'les oiseaux matinaux',",
          "qui est un sujet inversé placé après le verbe :",
          "en posant la question 'Qui est-ce qui chante ?', la réponse est 'les oiseaux'."
        ],
        criteriaChecklist: [
          { label: "1. Terminaison pluriel (-ent) identifiée (+1 pt)", keywords: ["chantent", "-ent", "pluriel"] },
          { label: "2. Sujet réel identifié (les oiseaux matinaux) (+1 pt)", keywords: ["sujet", "oiseaux", "matinaux"] },
          { label: "3. Règle du sujet inversé explicitée (+1 pt)", keywords: ["inversé", "après", "qui est-ce qui"] }
        ],
        explanation: "Le sujet du verbe 'chantent' est 'les oiseaux matinaux' (sujet inversé placé après le verbe). Comme il est au pluriel, le verbe s'accorde avec la terminaison -ent.",
        hint: "Pose la question : 'Qui est-ce qui chante ?' ➡️ Les oiseaux (pluriel ➡️ -ent)."
      },
      {
        id: "fr_exam_participe_avoir_sans_accord",
        type: "briques",
        subject: "francais",
        level: 3,
        titre: "Contrôle • Pourquoi 'cueilli' ne s'accorde-t-il PAS dans : 'Lucas a cueilli des fraises dans le jardin' ? (3 points)",
        points: 3,
        isOfficialExam: true,
        consigneRadar: {
          trapWarning: "⚠️ Même s'il y a plusieurs fraises (féminin pluriel), le COD est placé APRÈS le verbe ! Donc zéro accord !",
          radarQuestion: "Où se trouve le Complément d'Objet Direct par rapport au verbe avoir ?",
          options: [
            {
              text: "Le COD 'des fraises' est placé APRÈS le verbe avoir : la règle impose qu'il n'y ait aucun accord (participe invariable)",
              isCorrect: true,
              explanation: "Bravo ! Avec l'auxiliaire avoir, l'accord ne se fait QUE si le COD a été prononcé ou écrit AVANT le verbe !"
            },
            {
              text: "Parce que Lucas est au singulier",
              isCorrect: false,
              explanation: "Avec l'auxiliaire avoir, le sujet ne commande jamais l'accord du participe !"
            }
          ]
        },
        bricksBank: [
          "Le participe passé 'cueilli' reste invariable (-i sans accord)",
          "car il est conjugué avec l'auxiliaire 'avoir'",
          "et le Complément d'Objet Direct ('des fraises') est situé APRÈS le verbe :",
          "avec avoir, l'accord ne s'applique que si le COD est placé avant.",
          "il s'accorde au féminin pluriel",
          "c'est le verbe être"
        ],
        correctBricks: [
          "Le participe passé 'cueilli' reste invariable (-i sans accord)",
          "car il est conjugué avec l'auxiliaire 'avoir'",
          "et le Complément d'Objet Direct ('des fraises') est situé APRÈS le verbe :",
          "avec avoir, l'accord ne s'applique que si le COD est placé avant."
        ],
        criteriaChecklist: [
          { label: "1. Participe invariable justifié (-i) (+1 pt)", keywords: ["invariable", "cueilli", "accord"] },
          { label: "2. Auxiliaire avoir mentionné (+1 pt)", keywords: ["auxiliaire", "avoir"] },
          { label: "3. Position du COD après le verbe énoncée (+1 pt)", keywords: ["cod", "après", "fraises"] }
        ],
        explanation: "Avec l'auxiliaire avoir, le participe passé ne s'accorde jamais avec le sujet. Comme le COD ('des fraises') est placé après le verbe, 'cueilli' reste au masculin singulier sans accord.",
        hint: "Auxiliaire AVOIR + COD placé APRÈS ➡️ Participe invariable !"
      },
      {
        id: "fr_exemple_perso_accord",
        type: "exemple_perso",
        subject: "francais",
        level: 3,
        titre: "Invente une phrase avec un participe passé bien accordé : dis ton exemple perso et justifie ta réponse avec la règle.",
        points: 4,
        suggestedExamples: [
          "🍎 'Les pommes que j'ai cueillies sont délicieuses' (accord avec le COD 'que' placé avant)",
          "🏡 'Elles sont arrivées à l'heure au collège' (accord avec le sujet 'Elles' avec l'auxiliaire être)",
          "💌 'La lettre que tu as écrite était touchante' (accord avec le COD 'que' placé avant)",
          "⚽ 'Les médailles que l'équipe a remportées brillent' (accord avec le COD 'que' placé avant)"
        ],
        explanation: "Magnifique phrase rédigée ! Avec être, accord systématique avec le sujet. Avec avoir, accord uniquement si le COD est placé AVANT le verbe !",
        hint: "Dis ton exemple perso et justifie ta réponse : donne ta phrase et explique pourquoi le participe s'accorde !"
      },
      {
        id: "fr_ortho_epithete",
        type: "qcm",
        subject: "francais",
        level: 1,
        isOrthoQuestion: true,
        titre: "✍️ Orthographe du Mot Clé : Comment s'écrit correctement le nom de la fonction de l'adjectif rattaché directement au nom ?",
        points: 2,
        options: [
          "Épithète (avec accent aigu sur le E, accent circonflexe sur le î/ê et 'th')",
          "Épitète (sans le h)",
          "Épittète (avec deux t)"
        ],
        correctIndex: 0,
        explanation: "Bravo ! Épithète s'écrit avec un accent aigu sur le 'é', 'th' et un accent circonflexe sur le 'ê'. Le mot vient du grec epithetos qui signifie 'placé à côté' !",
        hint: "É-pi-thète (avec un th comme théorème).",
        spellingTip: "É-pi-thète : accent aigu sur le premier E, 'th', et accent circonflexe sur le deuxième ê !"
      },
      {
        id: "fr_1",
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
        id: "fr_inv_cod",
        type: "libre",
        subject: "francais",
        level: 1,
        titre: "Devinette de grammaire : Avec l'auxiliaire avoir, quel complément doit être obligatoirement placé AVANT le verbe pour que le participe passé s'accorde ?",
        points: 3,
        correctAnswer: "le COD",
        keywords: ["cod", "complément d'objet direct", "c.o.d."],
        explanation: "C'est le COD (Complément d'Objet Direct) ! Ex: 'Les pommes que j'ai mangées'.",
        hint: "Ce sont les 3 lettres magiques : C... O... D..."
      },
      {
        id: "fr_2",
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
        id: "fr_3",
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
        id: "fr_4",
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
        id: "fr_5",
        type: "vf",
        subject: "francais",
        level: 2,
        titre: "Vrai ou Faux : Avec l'auxiliaire avoir, le participe passé s'accorde avec le sujet du verbe.",
        points: 2,
        correctAnswer: "Faux",
        explanation: "FAUX ! Avec avoir, il ne s'accorde JAMAIS avec le sujet.",
        hint: "Seul l'auxiliaire être s'accorde avec le sujet."
      },
      {
        id: "fr_6",
        type: "vf",
        subject: "francais",
        level: 2,
        titre: "Vrai ou Faux : Dans la phrase 'Elles sont arrivées à l'heure', la terminaison -ées est obligatoire car l'auxiliaire est ÊTRE.",
        points: 2,
        correctAnswer: "Vrai",
        explanation: "C'est VRAI ! Avec l'auxiliaire être, on accorde toujours en genre et en nombre avec le sujet (Elles = féminin pluriel).",
        hint: "Pense à la politesse de l'auxiliaire être qui s'accorde toujours."
      },
      {
        id: "fr_7",
        type: "libre",
        subject: "francais",
        level: 1,
        titre: "Complète par la bonne terminaison (-er ou -é) : 'Lucas a envie de (jouer / joué) dehors.'",
        points: 2,
        correctAnswer: "jouer",
        explanation: "On peut dire 'envie de mordre' (infinitif), donc on écrit jouer (-er) !",
        hint: "Remplace par 'mordre' ou 'vendu'."
      },
      {
        id: "fr_8",
        type: "qcm",
        subject: "francais",
        level: 2,
        titre: "Dans la phrase : 'La valise que Thomas a prépar____', quelle est la bonne orthographe ?",
        points: 2,
        options: ["préparée (-ée)", "préparé (-é)", "préparés (-és)"],
        correctIndex: 0,
        explanation: "Le COD 'que' (qui remplace la valise, féminin singulier) est placé AVANT le verbe avoir -> accord : préparée !",
        hint: "Qu'est-ce qui est préparé ? La valise, placée avant."
      },
      {
        id: "fr_cloze_final",
        type: "texte_a_trous",
        subject: "francais",
        level: 2,
        titre: "🏆 Défi Synthèse Finale : Complète le Grand Texte Bilan sur les accords du participe passé",
        points: 4,
        clozeTemplate: "Employé avec l'auxiliaire {1}, le participe passé s'accorde toujours avec le sujet. Mais avec l'auxiliaire {2}, il ne s'accorde jamais avec le sujet : il s'accorde uniquement avec le {3} si celui-ci est placé {4} le verbe. Pour savoir si le verbe finit en -é ou -er, on remplace par le verbe {5}.",
        clozeAnswers: ["être", "avoir", "COD", "avant", "vendu"],
        clozeWordBank: ["être", "avoir", "COD", "avant", "vendu", "après", "sujet"],
        explanation: "Impeccable ! Règle de l'auxiliaire être, règle de l'auxiliaire avoir avec COD avant, et l'astuce de vendu / mordre !",
        hint: "Pense aux deux auxiliaires, au complément d'objet direct, à sa position (avant/après), et au verbe vendu."
      }
    ]
  },

  mix: {
    id: 'mix_all',
    title: 'Grand Mix Inter-Matières',
    subject: 'mix',
    summaryKids: "Un défi complet qui regroupe des questions d'Histoire, SVT, Maths, Anglais et Français pour tester tes réflexes dans toutes les matières !",
    audioFlashScript: "Bienvenue dans le Grand Défi Mix ! Prépare tes méninges, on va enchaîner les écosystèmes, les nombres ordinaux en anglais, les fractions et la Préhistoire. Fais confiance à ta logique, donne le meilleur de toi-même !",
    survivalSheet: {
      dangerRed: "Prends le temps d'identifier la matière et le mot-clé avant de rédiger ta réponse pour appliquer la bonne méthode.",
      warningYellow: ["Respire calmement", "Vérifie les mots clés", "Prends le temps de relire"],
      greenFoundation: "Chaque matière a sa logique, fais confiance à ton bon sens !"
    },
    practicalMission: {
      role: "Capitaine Tous Terrains",
      scenario: "Tu dois résoudre une énigme multidimensionnelle combinant sciences, histoire et calculs.",
      task: "Réponds aux questions dans l'ordre logique pour débloquer le portail de la victoire."
    },
    everydayApplications: [
      "Développer une grande agilité mentale entre différentes disciplines.",
      "Se préparer aux épreuves complètes et aux bilans de trimestre.",
      "Gagner un maximum de points bonus de relecture dans toutes les matières."
    ],
    mnemonicTrick: "Reste calme et concentre-toi sur une question à la fois !",
    quizQuestions: []
  }
};
