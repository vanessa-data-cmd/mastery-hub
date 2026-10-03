import { SubjectId } from '../types';

export interface EcosystemExample {
  id: string;
  name: string;
  icon: string;
  milieu: string;
  vivants: string;
  interaction: string;
}

export interface CapsuleScene {
  id: string;
  stepNumber: number;
  title: string;
  durationSec: number;
  timeRange: string;
  visualType:
    | 'savannah'
    | 'migration_map'
    | 'fire_tools'
    | 'cave_writing'
    | 'english_cardinal'
    | 'english_ordinal'
    | 'english_dates_prepositions'
    | 'uk_four_nations'
    | 'uk_emblems'
    | 'classroom_english'
    | 'ecosystem'
    | 'decomposers'
    | 'fractions'
    | 'fractions_decimals'
    | 'waste'
    | 'conductors'
    | 'french_participe';
  script: string;
  timeTargetMap: { timeSec: number; target: string; label: string }[];
  keywords: string[];
  boardSchema: {
    title: string;
    points: string[];
    formulaHighlight: string;
  };
  checkpoint: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface VideoChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  durationLabel: string;
  scenes: CapsuleScene[];
}

export interface SubjectVideoHub {
  id: string;
  subject: SubjectId;
  title: string;
  chapters: VideoChapter[];
}

export const ECOSYSTEM_EXAMPLES: EcosystemExample[] = [
  {
    id: 'ocean',
    name: 'Le Récif de Corail (Océan)',
    icon: '🌊🐠',
    milieu: 'Eau salée chaude, lumière abondante, roches de corail calcaire',
    vivants: 'Poissons-clowns, anémones de mer, coraux vivants, tortues marines',
    interaction: 'Le poisson-clown s’abrite dans l’anémone urticante et la protège des prédateurs'
  },
  {
    id: 'desert',
    name: 'Le Désert du Sahara',
    icon: '🏜️🐪',
    milieu: 'Sable minéral sec, chaleur extrême le jour, froid nocturne, très peu d’eau',
    vivants: 'Dromadaires, fennecs, scorpions, arbustes acacias',
    interaction: 'Le fennec chasse la nuit pour éviter la chaleur, l’acacia offre de l’ombre aux animaux'
  },
  {
    id: 'mare',
    name: 'La Mare d’eau douce',
    icon: '🦆🐸',
    milieu: 'Eau douce calme, vase riche en matière organique, berges ensoleillées',
    vivants: 'Grenouilles rousses, nénuphars, libellules, canards colverts, roseaux',
    interaction: 'La grenouille se nourrit de larves de libellules et s’abrite sous les feuilles de nénuphar'
  }
];

export const VIDEO_SUBJECT_HUBS: Partial<Record<SubjectId, SubjectVideoHub>> = {
  // SVT 6ème avec les 3 piliers équilibrés et bienveillants
  svt: {
    id: 'hub_svt',
    subject: 'svt',
    title: "SVT 6ème • Écosystèmes & Matière Vivante",
    chapters: [
      {
        id: 'svt_ch1',
        chapterNumber: 1,
        title: "I - La Définition Complète d'un Écosystème",
        subtitle: "Le trio fondamental : Milieu naturel + Êtres vivants + Interactions",
        durationLabel: "48s",
        scenes: [
          {
            id: 'svt_sc1',
            stepNumber: 1,
            title: "Les 3 Piliers d'un Écosystème",
            durationSec: 48,
            timeRange: "Biotope + Biocénose + Interactions",
            visualType: 'ecosystem',
            script: "Retiens bien Mathieu, voici la clé pour comprendre l'écosystème. Un écosystème réunit toujours trois éléments complémentaires : 1, le milieu naturel non vivant, appelé le biotope, avec les roches, l'eau, le soleil et la température. 2, la communauté de tous les êtres vivants qui y habitent, la biocénose, avec végétaux, animaux et champignons. Et 3, toutes les interactions mutuelles, comme les chaînes alimentaires et les abris. Retiens bien : 1 le milieu, 2 les vivants et 3 leurs interactions !",
            timeTargetMap: [
              { timeSec: 0, target: 'intro', label: "Le trio fondamental de l'écosystème" },
              { timeSec: 9, target: 'milieu_physique', label: "1. Le Milieu Naturel (non vivant)" },
              { timeSec: 22, target: 'vivants', label: "2. Les Êtres Vivants (faune, flore)" },
              { timeSec: 34, target: 'interactions', label: "3. Les Interactions mutuelles (liens)" }
            ],
            keywords: ["Écosystème", "Milieu naturel", "Êtres vivants", "Interactions", "Chaînes alimentaires"],
            boardSchema: {
              title: "🌿 Le Trio Fondamental de l'Écosystème",
              points: [
                "1. Milieu naturel non vivant : eau, sol, roches, lumière, température",
                "2. Êtres vivants : végétaux, animaux, champignons, bactéries",
                "3. Interactions mutuelles : nutrition (chaînes alimentaires), pollinisation, abri"
              ],
              formulaHighlight: "Écosystème = Milieu naturel + Êtres vivants + INTERACTIONS mutuelles"
            },
            checkpoint: {
              question: "Quels sont les 3 éléments qui forment ensemble un écosystème ?",
              options: [
                "Un milieu naturel, des êtres vivants et leurs interactions mutuelles",
                "Uniquement des pierres, de l'eau et du soleil",
                "Juste des animaux dans une cage fermée"
              ],
              correctIndex: 0,
              explanation: "Exactement ! L'écosystème réunit le milieu physique, les êtres vivants et toutes leurs interactions."
            }
          }
        ]
      }
    ]
  },

  // Histoire 6ème approfondie avec rigueur historique
  histoire: {
    id: 'hub_histoire',
    subject: 'histoire',
    title: "Histoire 6ème • 6H1 : Les Débuts de l'Humanité",
    chapters: [
      {
        id: 'hist_ch1',
        chapterNumber: 1,
        title: "I - Qui sont les premiers humains ? (Le Berceau Africain)",
        subtitle: "De Toumaï (-7M ans) à l'apparition d'Homo Sapiens (-300 000 ans)",
        durationLabel: "45s",
        scenes: [
          {
            id: 'h_sc1',
            stepNumber: 1,
            title: "Le Berceau de l'Humanité en Afrique",
            durationSec: 45,
            timeRange: "De -7 millions d'années à -300 000 ans",
            visualType: 'savannah',
            script: "Retiens bien Mathieu, regarde l'Afrique sur le tableau interactif. L'Afrique est qualifiée de berceau de l'humanité pour une raison scientifique précise : c'est sur ce continent que tous les plus anciens fossiles d'hominidés ont été découverts par les archéologues. Au Tchad, le fossile de Toumaï prouve nos racines il y a 7 millions d'années. Et c'est également en Afrique, vers moins 300 000 ans, qu'apparaît notre propre espèce : l'Homo Sapiens. Nous partageons donc tous une origine africaine commune !",
            timeTargetMap: [
              { timeSec: 0, target: 'map_africa', label: "L'Afrique sur la carte" },
              { timeSec: 12, target: 'toumai', label: "Toumaï au Tchad (-7M ans)" },
              { timeSec: 24, target: 'sapiens', label: "Homo Sapiens (-300 000 ans)" },
              { timeSec: 35, target: 'berceau', label: "Le Berceau de l'humanité" }
            ],
            keywords: ["Afrique", "Berceau de l'humanité", "Homo Sapiens (-300 000 ans)", "Toumaï (-7M)", "Fossile"],
            boardSchema: {
              title: "📌 Le Repère Chronologique : Origines",
              points: [
                "-7 millions d'années : Toumaï au Tchad (premières racines humaines)",
                "Vers -300 000 ans : Apparition de notre espèce, Homo Sapiens",
                "Fossile : Trace ou reste d'être vivant pétrifié dans la roche"
              ],
              formulaHighlight: "Afrique = Berceau unique de tous les humains sur Terre"
            },
            checkpoint: {
              question: "Pourquoi les historiens qualifient-ils l'Afrique de 'berceau de l'humanité' ?",
              options: [
                "Parce que les plus vieux fossiles humains et Homo Sapiens y sont nés",
                "Parce qu'on y fabriquait des berceaux pour bébés",
                "Parce que c'est le plus grand pays du monde"
              ],
              correctIndex: 0,
              explanation: "Exactement ! Tous les fossiles fondateurs et notre espèce Homo Sapiens proviennent d'Afrique."
            }
          }
        ]
      },
      {
        id: 'hist_ch2',
        chapterNumber: 2,
        title: "II - Le Peuplement de la Terre & les Grandes Migrations",
        subtitle: "La sortie d'Afrique vers -100 000 ans et l'arrivée sur tous les continents",
        durationLabel: "45s",
        scenes: [
          {
            id: 'h_sc2',
            stepNumber: 1,
            title: "La Carte Mondiale des Migrations à Pied",
            durationSec: 45,
            timeRange: "Vers -100 000 ans",
            visualType: 'migration_map',
            script: "Suis attentivement les flèches rouges sur la carte du monde. Vers moins 100 000 ans, des groupes d'Homo Sapiens quittent l'Afrique à la recherche de nouvelles ressources et de gibier. Ce sont les grandes migrations. Ils traversent d'abord le Proche-Orient, puis peuplent l'Asie, avant d'atteindre l'Europe vers moins 45 000 ans. À la faveur des périodes glaciaires, le niveau des océans baisse : ils franchissent le détroit de Béring gelé et peuplent l'Amérique vers moins 15 000 ans !",
            timeTargetMap: [
              { timeSec: 0, target: 'fleche_depart', label: "Sortie d'Afrique vers -100 000 ans" },
              { timeSec: 14, target: 'fleche_asie_europe', label: "Arrivée en Asie et Europe (-45 000 ans)" },
              { timeSec: 27, target: 'fleche_bering_amerique', label: "Passage de Béring vers l'Amérique (-15 000 ans)" },
              { timeSec: 38, target: 'monde_peuple', label: "Peuplement complet de la planète" }
            ],
            keywords: ["Grandes migrations", "-100 000 ans", "Sortie d'Afrique", "Détroit de Béring"],
            boardSchema: {
              title: "🗺️ Le Carnet de Route : Les Migrations",
              points: [
                "Départ : L'Afrique vers -100 000 ans (changement climatique et gibier)",
                "Trajet : Afrique ➜ Proche-Orient ➜ Asie & Europe (-45 000 ans)",
                "Passage glaciaire : Détroit de Béring gelé vers l'Amérique (-15 000 ans)",
                "Résultat : Peuplement progressif de tous les continents"
              ],
              formulaHighlight: "Migration = Déplacement d'un groupe pour s'installer durablement"
            },
            checkpoint: {
              question: "Vers quelle date débutent les grandes migrations d'Homo Sapiens hors d'Afrique ?",
              options: ["Vers -100 000 ans", "En l'an 2000", "Vers -3500 av. J.-C."],
              correctIndex: 0,
              explanation: "Parfait ! C'est vers -100 000 ans qu'Homo Sapiens s'élance pour peupler le monde entier."
            }
          }
        ]
      },
      {
        id: 'hist_ch3',
        chapterNumber: 3,
        title: "III - La Vie Nomade au Paléolithique, le Silex & le Feu",
        subtitle: "L'âge de la pierre taillée et la révolution vitale du feu (-400 000 ans)",
        durationLabel: "45s",
        scenes: [
          {
            id: 'h_sc3',
            stepNumber: 1,
            title: "Outils en Silex, Campement Nomade & Maîtrise du Feu",
            durationSec: 45,
            timeRange: "Le Paléolithique (Âge de la pierre taillée)",
            visualType: 'fire_tools',
            script: "Au Paléolithique, période de la pierre taillée, les humains sont nomades : ils ne possèdent aucun habitat fixe et se déplacent au gré des saisons pour suivre les troupeaux et cueillir. En frappant le silex avec un percuteur, ils fabriquent des outils tranchants pour découper la viande et racler les peaux. Vers moins 400 000 ans, ils parviennent à maîtriser le feu. Cette découverte transforme leur vie : elle permet de cuire les aliments pour mieux les digérer, de se réchauffer l'hiver et d'éclairer le campement pour éloigner les prédateurs !",
            timeTargetMap: [
              { timeSec: 0, target: 'nomade', label: "Mode de vie nomade (sans village fixe)" },
              { timeSec: 14, target: 'silex', label: "Pierre taillée : le silex tranchant" },
              { timeSec: 25, target: 'feu', label: "Maîtrise du feu vers -400 000 ans" },
              { timeSec: 36, target: 'protection', label: "Cuisson, chaleur et sécurité contre les fauves" }
            ],
            keywords: ["Paléolithique", "Pierre taillée", "Nomade", "Feu (-400 000 ans)", "Silex"],
            boardSchema: {
              title: "🔥 L'Atelier Préhistorique : Mode de Vie",
              points: [
                "Nomade : Personne sans habitat fixe se déplaçant pour chasser et cueillir",
                "Paléolithique : Période de la pierre taillée (silex, bifaces, lances)",
                "Feu (-400 000 ans) : 1) Cuire la viande 2) Se chauffer 3) Repousser les fauves",
                "Campement : Huttes de branchages ou tentes en peaux de bêtes"
              ],
              formulaHighlight: "Paléolithique = Pierre taillée • Nomades = Sans habitat fixe"
            },
            checkpoint: {
              question: "Quels sont les 3 rôles capitaux de la maîtrise du feu vers -400 000 ans ?",
              options: [
                "Cuire les aliments, se réchauffer et éloigner les animaux dangereux",
                "Faire rouler des voitures et recharger les batteries",
                "Écrire des livres et peindre des toiles"
              ],
              correctIndex: 0,
              explanation: "Exactement ! Le feu apporte la cuisson digeste, la chaleur nocturne et la protection vitale."
            }
          }
        ]
      },
      {
        id: 'hist_ch4',
        chapterNumber: 4,
        title: "IV - L'Art des Cavernes & la Fin de la Préhistoire",
        subtitle: "Des fresques de Lascaux (-40 000) à l'invention de l'écriture (-3500)",
        durationLabel: "45s",
        scenes: [
          {
            id: 'h_sc4',
            stepNumber: 1,
            title: "Fresques de Lascaux & l'Écriture en Mésopotamie",
            durationSec: 45,
            timeRange: "De -40 000 ans à -3500 avant J.-C.",
            visualType: 'cave_writing',
            script: "Voici la dernière grande étape du chapitre. Vers moins 40 000 ans, les hommes développent l'art pariétal : dans les grottes de Chauvet et de Lascaux, ils peignent des aurochs, des chevaux et des mammouths avec des pigments d'ocre et de charbon. Puis, vers -3500 avant Jésus-Christ en Mésopotamie, les marchands et fonctionnaires inventent l'écriture sur des tablettes d'argile. Retiens ce repère fondamental pour ton évaluation : l'invention de l'écriture clôt la Préhistoire et ouvre la période de l'Histoire !",
            timeTargetMap: [
              { timeSec: 0, target: 'lascaux', label: "Art pariétal de Lascaux & Chauvet (-40 000 ans)" },
              { timeSec: 18, target: 'ecriture', label: "Invention de l'écriture en Mésopotamie (-3500 av. J.-C.)" },
              { timeSec: 32, target: 'fin_prehistoire', label: "Fin de la Préhistoire & Début de l'Histoire" }
            ],
            keywords: ["Art pariétal (-40 000 ans)", "Grottes Chauvet & Lascaux", "Écriture (-3500 av. J.-C.)", "Fin de la Préhistoire"],
            boardSchema: {
              title: "🏛️ Le Grand Repère Chronologique Final",
              points: [
                "-40 000 ans : Art des cavernes (grottes Chauvet et Lascaux)",
                "-10 000 ans : Néolithique (agriculture, élevage, villages sédentaires)",
                "-3500 av. J.-C. : Invention de l'écriture en Mésopotamie"
              ],
              formulaHighlight: "Invention de l'écriture = Fin de la Préhistoire & Début de l'Histoire"
            },
            checkpoint: {
              question: "Quel événement survenu vers -3500 avant J.-C. sépare la Préhistoire de l'Histoire ?",
              options: [
                "L'invention de l'écriture en Mésopotamie",
                "L'invention de la roue de bicyclette",
                "La découverte de la première caverne"
              ],
              correctIndex: 0,
              explanation: "Bravo ! L'écriture permet de transmettre des textes et marque le début officiel de l'Histoire."
            }
          }
        ]
      }
    ]
  },

  // Anglais avec rigueur grammaticale et orthographique 6ème
  anglais: {
    id: 'hub_anglais',
    subject: 'anglais',
    title: "Anglais 6ème • Numbers, Dates & Prepositions",
    chapters: [
      {
        id: 'ang_ch0',
        chapterNumber: 1,
        title: "I - Les Nombres Cardinaux & le Piège de FORTY",
        subtitle: "Compter de 1 à 1 000 000, le trait d'union et l'orthographe de forty",
        durationLabel: "45s",
        scenes: [
          {
            id: 'ang_sc1',
            stepNumber: 1,
            title: "Cardinal Numbers : Hyphen & Forty without U",
            durationSec: 45,
            timeRange: "Grammar & Spelling Focus",
            visualType: 'english_cardinal',
            script: "Retiens bien Mathieu ! Pour compter des quantités en anglais, on utilise les nombres cardinaux. Retiens bien les 3 pièges d'or du contrôle : 1, de 21 à 99, on met obligatoirement un trait d'union entre la dizaine et l'unité, comme dans twenty-one ou seventy-five. 2, attention à l'orthographe de quarante : forty s'écrit SANS 'u', contrairement à four et fourteen ! 3, hundred, thousand et million sont strictement invariables lorsqu'ils sont précédés d'un chiffre : on écrit five thousand sans s !",
            timeTargetMap: [
              { timeSec: 0, target: 'cardinal_title', label: "Nombres cardinaux (quantité)" },
              { timeSec: 10, target: 'tiret', label: "Trait d'union obligatoire (twenty-one)" },
              { timeSec: 22, target: 'forty_piege', label: "Piège : forty SANS 'u' (f-o-r-t-y)" },
              { timeSec: 34, target: 'thousand_invariable', label: "five thousand (sans 's')" }
            ],
            keywords: ["Cardinal numbers", "twenty-one (avec tiret)", "forty (sans 'u')", "five thousand (sans 's')"],
            boardSchema: {
              title: "🇬🇧 Cardinal Numbers Checklist",
              points: [
                "Trait d'union obligatoire de 21 à 99 : twenty-one, seventy-five",
                "Orthographe piège : 40 = forty (jamais de 'u' !)",
                "Invariable : five hundred, three thousand (pas de 's')"
              ],
              formulaHighlight: "Twenty-one avec tiret • FORTY sans U • Five thousand sans S"
            },
            checkpoint: {
              question: "Comment écrit-on correctement le nombre 40 en toutes lettres en anglais ?",
              options: ["forty", "fourty", "fortie"],
              correctIndex: 0,
              explanation: "Exactement ! Forty s'écrit SANS 'u' en anglais, c'est le piège numéro 1 du contrôle !"
            }
          }
        ]
      },
      {
        id: 'ang_ch1',
        chapterNumber: 2,
        title: "II - Les Nombres Ordinaux (1st, 2nd, 3rd) & le Podium",
        subtitle: "Classer des objets, donner des rangs et terminaisons en -th",
        durationLabel: "42s",
        scenes: [
          {
            id: 'ang_sc2',
            stepNumber: 1,
            title: "Ordinal Numbers & The Winner Podium",
            durationSec: 42,
            timeRange: "Rankings & Order",
            visualType: 'english_ordinal',
            script: "Regarde le podium des vainqueurs au tableau ! En anglais, pour exprimer un classement ou un rang dans le temps, on emploie les nombres ordinaux. Les trois premiers sont irréguliers et uniques : premier se dit first, abrégé 1st avec les deux dernières lettres. Deuxième se dit second, abrégé 2nd. Et troisième se dit third, abrégé 3rd. À partir du quatrième, la règle devient régulière : on ajoute le suffixe 'th', comme 4th fourth ou 10th tenth !",
            timeTargetMap: [
              { timeSec: 0, target: 'podium', label: "Podium des nombres ordinaux" },
              { timeSec: 10, target: 'first_second_third', label: "1st first • 2nd second • 3rd third" },
              { timeSec: 25, target: 'suffix_th', label: "Terminaison régulière en -th (4th, 5th...)" }
            ],
            keywords: ["1st = first", "2nd = second", "3rd = third", "Suffix -th (fourth)"],
            boardSchema: {
              title: "🏆 The English Podium",
              points: [
                "1er : 1st = first (st)",
                "2ème : 2nd = second (nd)",
                "3ème : 3rd = third (rd)",
                "Suivants : 4th = fourth, 5th = fifth (th)"
              ],
              formulaHighlight: "1st First • 2nd Second • 3rd Third • -th pour les autres"
            },
            checkpoint: {
              question: "Quelle est l'abréviation ordinale de 'third' (troisième) ?",
              options: ["3rd", "3th", "3nd"],
              correctIndex: 0,
              explanation: "Well done ! 1st = first, 2nd = second et 3rd = third !"
            }
          }
        ]
      },
      {
        id: 'ang_ch2',
        chapterNumber: 3,
        title: "III - La Date UK & les Prépositions IN / ON",
        subtitle: "Format de date britannique et règles absolues de prépositions",
        durationLabel: "45s",
        scenes: [
          {
            id: 'ang_sc3',
            stepNumber: 1,
            title: "British Date Format & IN vs ON Rules",
            durationSec: 45,
            timeRange: "Dates & Time Prepositions",
            visualType: 'english_dates_prepositions',
            script: "Voici la règle d'or pour écrire les dates au collège. En anglais britannique, on écrit le jour de la semaine avec une majuscule obligatoire, puis le numéro ordinal et le mois, par exemple : Wednesday the 21st of June. Pour les prépositions de temps, retiens cette règle absolue : on utilise ON devant un jour ou une date précise, comme on Friday ou on September 15th. En revanche, on utilise IN devant un mois seul ou une année, comme in July ou in 2026 !",
            timeTargetMap: [
              { timeSec: 0, target: 'calendar_board', label: "Le calendrier britannique" },
              { timeSec: 14, target: 'rule_on', label: "ON + Jour précis (on Friday, on June 21st)" },
              { timeSec: 28, target: 'rule_in', label: "IN + Mois ou Année (in July, in 2026)" }
            ],
            keywords: ["ON Friday (jour)", "IN July (mois)", "IN 2026 (année)", "Format UK (Wednesday 21st June)"],
            boardSchema: {
              title: "📅 The Golden Preposition Rule",
              points: [
                "ON + Jour ou date exacte : on Monday, on the 10th of May",
                "IN + Mois seul ou Année : in September, in 2026",
                "Majuscule obligatoire aux jours et aux mois !"
              ],
              formulaHighlight: "ON pour le Jour • IN pour le Mois ou l'Année"
            },
            checkpoint: {
              question: "Quelle préposition utilise-t-on devant un jour précis comme 'Friday' ?",
              options: ["on Friday", "in Friday", "at Friday"],
              correctIndex: 0,
              explanation: "Parfait ! On dit 'on Friday' pour un jour, et 'in July' pour un mois !"
            }
          }
        ]
      },
      {
        id: 'ang_ch4',
        chapterNumber: 4,
        title: "IV - The 4 Nations of the UK : Countries, Capitals & Emblems",
        subtitle: "England, Scotland, Wales, Northern Ireland, les emblèmes et The Union Jack",
        durationLabel: "50s",
        scenes: [
          {
            id: 'ang_sc4_1',
            stepNumber: 1,
            title: "The 4 Nations of the United Kingdom",
            durationSec: 50,
            timeRange: "Geography & Nationalities",
            visualType: 'uk_four_nations',
            script: "Ne confonds jamais l'Angleterre et le Royaume-Uni ! The United Kingdom réunit quatre nations sœurs : England avec pour capitale London, Scotland au nord avec Edinburgh, Wales à l'ouest avec Cardiff, et Northern Ireland avec Belfast. Les habitants sont English, Scottish, Welsh, et Northern Irish. Le drapeau qui les unit tous s'appelle The Union Jack !",
            timeTargetMap: [
              { timeSec: 0, target: 'uk_overview', label: "The United Kingdom (4 nations)" },
              { timeSec: 10, target: 'nation_england', label: "England • London • English" },
              { timeSec: 22, target: 'nation_scotland', label: "Scotland • Edinburgh • Scottish" },
              { timeSec: 32, target: 'nation_wales', label: "Wales • Cardiff • Welsh" },
              { timeSec: 42, target: 'nation_nireland', label: "Northern Ireland • Belfast" }
            ],
            keywords: ["The United Kingdom", "England (London)", "Scotland (Edinburgh)", "Wales (Cardiff)", "Northern Ireland (Belfast)", "The Union Jack"],
            boardSchema: {
              title: "🇬🇧 The 4 Nations of the UK",
              points: [
                "England : London • English • 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
                "Scotland : Edinburgh • Scottish • 🏴󠁧󠁢󠁳󠁣󠁴󠁿",
                "Wales : Cardiff • Welsh • 🏴󠁧󠁢󠁷󠁬󠁳󠁿",
                "Northern Ireland : Belfast • Northern Irish • 🇬🇧"
              ],
              formulaHighlight: "UK = England + Scotland + Wales + Northern Ireland"
            },
            checkpoint: {
              question: "Combien de pays forment le Royaume-Uni (The United Kingdom) ?",
              options: [
                "4 nations (England, Scotland, Wales, Northern Ireland)",
                "3 nations seulement",
                "1 seul grand pays"
              ],
              correctIndex: 0,
              explanation: "Exactement ! Le Royaume-Uni est une union de 4 nations distinctes."
            }
          },
          {
            id: 'ang_sc4_2',
            stepNumber: 2,
            title: "National Emblems & Languages",
            durationSec: 45,
            timeRange: "Culture & Symbols",
            visualType: 'uk_emblems',
            script: "Chaque nation possède son emblème légendaire ! L'Angleterre est représentée par The Tudor Rose, la rose rouge. L'Écosse a pour emblème The Thistle, le chardon violet piquant. Le Pays de Galles a deux emblèmes végétaux : The Daffodil, la jonquille jaune, et The Leek, le poireau, sans oublier son célèbre Red Dragon ! Enfin, l'Irlande du Nord est symbolisée par The Shamrock, le trèfle à trois feuilles de St Patrick !",
            timeTargetMap: [
              { timeSec: 0, target: 'emblems_board', label: "Les 4 Emblèmes Nationaux" },
              { timeSec: 10, target: 'rose_england', label: "England : The Tudor Rose 🌹" },
              { timeSec: 20, target: 'thistle_scotland', label: "Scotland : The Thistle 🪻" },
              { timeSec: 30, target: 'daffodil_wales', label: "Wales : The Daffodil 🌼 & The Leek 🌱" },
              { timeSec: 38, target: 'shamrock_ireland', label: "Northern Ireland : The Shamrock ☘️" }
            ],
            keywords: ["The Tudor Rose (Rose)", "The Thistle (Chardon)", "The Daffodil (Jonquille)", "The Leek (Poireau)", "The Shamrock (Trèfle)"],
            boardSchema: {
              title: "🌹 National Emblems of the UK",
              points: [
                "England 🏴󠁧󠁢󠁥󠁮󠁧󠁿 : The Tudor Rose (Rose rouge)",
                "Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿 : The Thistle (Chardon violet)",
                "Wales 🏴󠁧󠁢󠁷󠁬󠁳󠁿 : The Daffodil (Jonquille) & The Leek (Poireau)",
                "Northern Ireland 🇬🇧 : The Shamrock (Trèfle à 3 feuilles)"
              ],
              formulaHighlight: "Rose 🌹 • Thistle 🪻 • Daffodil 🌼 • Shamrock ☘️"
            },
            checkpoint: {
              question: "Quel est l'emblème floral de l'Écosse (Scotland) ?",
              options: [
                "The Thistle (Le Chardon)",
                "The Tudor Rose (La Rose)",
                "The Shamrock (Le Trèfle)"
              ],
              correctIndex: 0,
              explanation: "Well done ! The Thistle (le chardon) est l'emblème fier et piquant de l'Écosse !"
            }
          }
        ]
      },
      {
        id: 'ang_ch5',
        chapterNumber: 5,
        title: "V - Classroom English : Les 31 Actions & Consignes",
        subtitle: "The 18 Teacher's Instructions & The 13 Pupil's Requests (Feuille officielle du professeur)",
        durationLabel: "1 min 30",
        scenes: [
          {
            id: 'ang_sc5_1',
            stepNumber: 1,
            title: "Teacher's Instructions (Les 18 Consignes du Professeur)",
            durationSec: 50,
            timeRange: "18 Teacher Orders",
            visualType: 'classroom_english',
            script: "Listen to the teacher's instructions! 'Stand up!' pour se lever, 'Sit down!' pour s'asseoir. 'Open your book' et 'Close your copybook'. 'Listen' pour écouter, 'Look at the board' pour regarder le tableau. 'Read' pour lire et 'Write' pour écrire. 'Raise your hand' ou 'Put up your hand' pour lever la main ! 'Silence' et 'Be quiet' pour faire silence. 'Repeat after me', 'Come to the board', 'Take your pen', 'Put away your things', 'Copy the lesson', 'Stick the worksheet', 'Underline the title' et 'Work in pairs' !",
            timeTargetMap: [
              { timeSec: 0, target: 'teacher_orders', label: "Stand up • Sit down • Open/Close" },
              { timeSec: 15, target: 'teacher_attention', label: "Listen • Look at board • Raise hand • Be quiet" },
              { timeSec: 30, target: 'teacher_actions', label: "Take pen • Copy lesson • Stick worksheet • Underline title" }
            ],
            keywords: [
              "Stand up! (Lève-toi)",
              "Sit down! (Assieds-toi)",
              "Open your book (Ouvre)",
              "Close your copybook (Ferme)",
              "Raise your hand! (Lève la main)",
              "Be quiet! (Silence)",
              "Look at the board! (Regarde le tableau)",
              "Stick the worksheet! (Colle la feuille)",
              "Underline the title! (Souligne le titre)"
            ],
            boardSchema: {
              title: "🧑‍🏫 The 18 Teacher's Instructions",
              points: [
                "Gestes : Stand up • Sit down • Raise your hand / Put up your hand • Come to the board",
                "Affaires : Open / Close book or copybook • Take your pen/pencil • Put away your things",
                "Attention : Listen • Look at the board • Silence / Be quiet • Repeat after me",
                "Cahier : Copy the lesson • Stick the worksheet • Underline the title • Work in pairs"
              ],
              formulaHighlight: "18 consignes du professeur à reconnaître immédiatement !"
            },
            checkpoint: {
              question: "Que signifie la consigne 'Stick the worksheet' donnée par le professeur d'anglais ?",
              options: [
                "Colle la feuille d'exercices dans ton cahier",
                "Souligne le titre en rouge",
                "Range toutes tes affaires dans ton sac"
              ],
              correctIndex: 0,
              explanation: "Well done ! 'Stick the worksheet' signifie 'Colle la feuille d'exercices' (stick = coller, worksheet = feuille de travail) !"
            }
          },
          {
            id: 'ang_sc5_2',
            stepNumber: 2,
            title: "Pupil's Requests & Questions (Les 13 Demandes de l'Élève)",
            durationSec: 50,
            timeRange: "13 Pupil Requests",
            visualType: 'classroom_english',
            script: "À toi de parler en classe d'anglais ! Pour une permission, utilise May ou Can : 'May I go to the toilets, please ?', 'Can I open the window, please ?', 'Can I close the window ?', 'Can I switch on the light ?', 'Can I switch off the light ?', 'May I drink some water ?', 'Can I borrow a pen ?'. Si tu es bloqué : 'I don't understand', 'I don't know', 'What's the English for... ?', 'How do you spell... ?', 'Can you repeat, please ?' et 'I have forgotten my copybook' !",
            timeTargetMap: [
              { timeSec: 0, target: 'pupil_permissions', label: "Toilets • Window • Light • Water • Borrow pen" },
              { timeSec: 25, target: 'pupil_questions', label: "I don't understand • What's the English for • How do you spell" },
              { timeSec: 40, target: 'pupil_emergencies', label: "Can you repeat • I have forgotten my copybook" }
            ],
            keywords: [
              "May I go to the toilets, please?",
              "Can I open the window, please?",
              "Can I switch on/off the light?",
              "May I drink some water?",
              "Can I borrow a pen / glue?",
              "I don't understand (Je ne comprends pas)",
              "What's the English for...? (Comment dit-on...)",
              "How do you spell...? (Comment épelles-tu)",
              "I have forgotten my copybook (J'ai oublié mon cahier)"
            ],
            boardSchema: {
              title: "🙋 The 13 Pupil's Requests & Questions",
              points: [
                "Permissions (May/Can I...) : Toilets • Open/Close window • Switch on/off light • Drink water • Borrow a pen/glue",
                "Compréhension : I don't understand • I don't know • Can you repeat, please?",
                "Vocabulaire & Épellation : What's the English for ...? • How do you spell ...?",
                "Oubli : I have forgotten my copybook / my book"
              ],
              formulaHighlight: "May I...? / Can I...? pour demander poliment • What's the English for...?"
            },
            checkpoint: {
              question: "Comment demandes-tu si tu peux emprunter un stylo ou de la colle à un camarade ?",
              options: [
                "Can I borrow a pen / glue, please ?",
                "Give me a pen fast please",
                "I open a pen please"
              ],
              correctIndex: 0,
              explanation: "Very good ! 'Can I borrow a pen, please ?' utilise le verbe 'borrow' (emprunter) !"
            }
          }
        ]
      }
    ]
  },

  maths: {
    id: 'hub_maths',
    subject: 'maths',
    title: "Maths 6ème • Fractions & Nombres Décimaux",
    chapters: [
      {
        id: 'maths_ch1',
        chapterNumber: 1,
        title: "I - Les Fractions : Partage du Gâteau (3/4)",
        subtitle: "Numérateur (haut = parts prises) et Dénominateur (bas = découpage total)",
        durationLabel: "40s",
        scenes: [
          {
            id: 'm_sc1',
            stepNumber: 1,
            title: "Le Gâteau des Fractions (3/4)",
            durationSec: 40,
            timeRange: "Fractions simples",
            visualType: 'fractions',
            script: "Retiens bien Mathieu, en mathématiques, une fraction représente un partage en parts rigoureusement égales. Regarde le gâteau au tableau : le chiffre du bas s'appelle le dénominateur. C'est lui qui donne l'unité : il indique en combien de parts égales on a partagé le gâteau entier, ici 4 parts. Le chiffre du haut s'appelle le numérateur : il compte le nombre de parts sélectionnées ou mangées, ici 3 parts bleues. 3 parts sur 4 s'écrit 3 sur 4, soit 3/4 !",
            timeTargetMap: [
              { timeSec: 0, target: 'fraction_pie', label: "Le gâteau découpé en 4" },
              { timeSec: 12, target: 'denominateur', label: "Dénominateur en BAS = 4 parts égales" },
              { timeSec: 24, target: 'numerateur', label: "Numérateur en HAUT = 3 parts prises" }
            ],
            keywords: ["Dénominateur (en bas = découpage)", "Numérateur (en haut = parts prises)", "Parts égales"],
            boardSchema: {
              title: "🍰 La Règle d'Or des Fractions",
              points: [
                "Dénominateur (BAS) : Nombre total de parts égales découpées",
                "Numérateur (HAUT) : Nombre de parts sélectionnées",
                "Exemple : 3/4 = 3 parts prises sur un gâteau de 4 parts"
              ],
              formulaHighlight: "Dénominateur en Bas • Numérateur en Haut"
            },
            checkpoint: {
              question: "Dans la fraction 3/4, que représente le chiffre 4 situé en bas ?",
              options: [
                "Le nombre total de parts égales découpées dans le gâteau",
                "Le nombre de parts mangées",
                "Le prix du gâteau en euros"
              ],
              correctIndex: 0,
              explanation: "Parfait ! Le dénominateur en bas indique toujours le nombre total de parts découpées."
            }
          }
        ]
      }
    ]
  },

  pc: {
    id: 'hub_pc',
    subject: 'pc',
    title: "Physique-Chimie 6ème • Matière & Énergie",
    chapters: [
      {
        id: 'pc_ch1',
        chapterNumber: 1,
        title: "1 - Les Déchets & le Tri Sélectif",
        subtitle: "Identifier les matières, trier et recycler pour protéger la planète",
        durationLabel: "45s",
        scenes: [
          {
            id: 'pc_sc1',
            stepNumber: 1,
            title: "Le Tri Sélectif des Matières",
            durationSec: 45,
            timeRange: "Matière & Recyclage",
            visualType: 'waste',
            script: "En physique-chimie, comprendre la matière commence par savoir la trier ! Voici les 3 bacs de tri indispensables : 1, la poubelle jaune pour tous les emballages en plastique, les boîtes métalliques et les cartons. 2, le conteneur vert pour les bouteilles et bocaux en verre recyclable à l'infini. 3, le composteur ou bac brun pour les déchets organiques et restes alimentaires. Attention au piège : la vaisselle cassée ne va jamais dans le verre, mais aux ordures ménagères !",
            timeTargetMap: [
              { timeSec: 0, target: 'waste_bins', label: "Les 3 bacs de tri" },
              { timeSec: 10, target: 'yellow_bin', label: "1. Bac Jaune : Plastique, Métal & Carton" },
              { timeSec: 22, target: 'green_bin', label: "2. Bac Vert : Verre recyclable" },
              { timeSec: 34, target: 'compost_bin', label: "3. Compost : Déchets organiques" }
            ],
            keywords: ["Tri sélectif (3 bacs)", "Poubelle jaune (plastique/métal)", "Bac vert (verre)", "Composteur (organique)", "Recyclage"],
            boardSchema: {
              title: "♻️ Le Tri Sélectif des Déchets (3 Bacs)",
              points: [
                "1. Bac Jaune : Bouteilles plastique, canettes métal, cartons",
                "2. Bac Vert : Bouteilles et pots en verre (sans couvercle)",
                "3. Bac Marron / Compost : Épluchures et restes alimentaires"
              ],
              formulaHighlight: "3 bacs : 1. Jaune = Emballages • 2. Vert = Verre • 3. Marron = Compost"
            },
            checkpoint: {
              question: "Dans quelle poubelle doit-on jeter une canette de soda en aluminium ?",
              options: [
                "La poubelle jaune (métaux et emballages)",
                "Le conteneur vert (verre)",
                "La poubelle grise (ordures ordinaires)"
              ],
              correctIndex: 0,
              explanation: "Exactement ! Les métaux comme l'aluminium se recyclent dans le bac jaune !"
            }
          }
        ]
      },
      {
        id: 'pc_ch2',
        chapterNumber: 2,
        title: "2 - Conducteurs & Isolants Thermiques",
        subtitle: "Comment la chaleur se propage ou est bloquée",
        durationLabel: "45s",
        scenes: [
          {
            id: 'pc_sc2',
            stepNumber: 1,
            title: "Conducteur ou Isolant Thermique ?",
            durationSec: 45,
            timeRange: "Transferts d'énergie",
            visualType: 'conductors',
            script: "Retiens bien la différence entre conducteur et isolant ! Un conducteur thermique laisse passer la chaleur très rapidement : c'est le cas de tous les métaux comme le cuivre, le fer ou l'aluminium. C'est pour cela que la casserole est en métal pour chauffer l'eau ! En revanche, un isolant thermique bloque ou ralentit la chaleur : c'est le bois, le plastique, la laine ou l'air. C'est pour cela que le manche de la poêle est en bois ou en plastique pour ne pas te brûler les doigts !",
            timeTargetMap: [
              { timeSec: 0, target: 'thermal_board', label: "Conducteurs vs Isolants" },
              { timeSec: 12, target: 'conductors_metals', label: "Conducteurs : Cuivre, Fer, Aluminium" },
              { timeSec: 28, target: 'insulators_wood', label: "Isolants : Bois, Plastique, Laine, Air" }
            ],
            keywords: ["Conducteur thermique (métaux)", "Isolant thermique (bois/plastique)", "Casserole en métal", "Manche isolant"],
            boardSchema: {
              title: "🔥 Conducteurs vs Isolants Thermiques",
              points: [
                "Conducteurs : Laisse passer la chaleur (Métaux : cuivre, fer, alu)",
                "Isolants : Bloque la chaleur (Bois, plastique, laine, air)",
                "Application : Casserole en inox (chauffe vite) + Manche en bois (isole)"
              ],
              formulaHighlight: "Métaux = Conducteurs • Bois/Plastique = Isolants"
            },
            checkpoint: {
              question: "Pourquoi le manche d'une casserole est-il souvent recouvert de bois ou de plastique ?",
              options: [
                "Car le bois et le plastique sont des isolants thermiques (protègent des brûlures)",
                "Car le bois conduit mieux la chaleur",
                "Uniquement pour faire joli"
              ],
              correctIndex: 0,
              explanation: "Bravo ! Le bois et le plastique sont des isolants thermiques qui ne transmettent pas la chaleur."
            }
          }
        ]
      }
    ]
  },

  francais: {
    id: 'hub_francais',
    subject: 'francais',
    title: "Français 6ème • Orthographe & Grammaire",
    chapters: [
      {
        id: 'fr_ch1',
        chapterNumber: 1,
        title: "1 - L'Accord du Participe Passé (Être & Avoir)",
        subtitle: "La règle d'or pour ne plus jamais hésiter entre -é, -ée, -és, -ées",
        durationLabel: "50s",
        scenes: [
          {
            id: 'fr_sc1',
            stepNumber: 1,
            title: "Être vs Avoir : Les 2 Règles Indispensables",
            durationSec: 50,
            timeRange: "Grammaire & Orthographe",
            visualType: 'french_participe',
            script: "Voici le secret pour réussir tous tes accords de participe passé en 6ème ! Règle numéro 1 avec l'auxiliaire ÊTRE : le participe passé s'accorde toujours en genre et en nombre avec le sujet. Par exemple : 'Elles sont parties' prend un 'e' féminin et un 's' pluriel. Règle numéro 2 avec l'auxiliaire AVOIR : le participe passé ne s'accorde JAMAIS avec le sujet ! On écrit 'Ils ont mangé' avec un simple 'é'. Le seul cas exceptionnel d'accord avec AVOIR, c'est si le COD est placé AVANT le verbe, comme dans 'La pomme que j'ai mangée' !",
            timeTargetMap: [
              { timeSec: 0, target: 'participe_title', label: "L'Accord du Participe Passé" },
              { timeSec: 10, target: 'regle_etre', label: "Avec ÊTRE : Accord obligatoire avec le Sujet" },
              { timeSec: 25, target: 'regle_avoir', label: "Avec AVOIR : Pas d'accord avec le Sujet" },
              { timeSec: 38, target: 'regle_avoir_cod', label: "Exception AVOIR : Accord si le COD est AVANT" }
            ],
            keywords: ["Auxiliaire Être (accord sujet)", "Auxiliaire Avoir (pas d'accord sujet)", "COD placé avant", "Elles sont arrivées"],
            boardSchema: {
              title: "✍️ Règle d'or du Participe Passé",
              points: [
                "Avec ÊTRE : Accord avec le SUJET (Elles sont arrivées -ées)",
                "Avec AVOIR : PAS d'accord avec le sujet (Ils ont mangé -é)",
                "Avec AVOIR + COD AVANT : Accord avec le COD (Les fraises que j'ai mangées)"
              ],
              formulaHighlight: "Être = Accord Sujet • Avoir = Zéro accord avec le sujet !"
            },
            checkpoint: {
              question: "Comment écrit-on correctement : 'Les filles sont arriv____' ?",
              options: [
                "arrivées (accord féminin pluriel avec le sujet)",
                "arrivé (invariable)",
                "arrivés (masculin)"
              ],
              correctIndex: 0,
              explanation: "Parfait ! Avec l'auxiliaire ÊTRE, on accorde toujours avec le sujet 'Les filles' (féminin pluriel : -ées) !"
            }
          }
        ]
      }
    ]
  }
};

export const KEYWORD_DEFINITIONS: Record<string, { term: string; definition: string; icon: string }> = {
  // SVT
  "écosystème": {
    term: "Écosystème",
    definition: "L'ensemble formé par un milieu naturel de vie, des êtres vivants et toutes leurs relations mutuelles.",
    icon: "🌿"
  },
  "milieu naturel": {
    term: "Milieu Naturel (Biotope)",
    definition: "Le décor physique non vivant indispensable à la vie : l'eau, le sol, les roches, la lumière et la température.",
    icon: "☀️"
  },
  "êtres vivants": {
    term: "Êtres Vivants (Biocénose)",
    definition: "La communauté de tous les êtres qui habitent le milieu : végétaux, animaux, champignons et bactéries.",
    icon: "🦌"
  },
  "interactions": {
    term: "Interactions",
    definition: "Les liens indispensables entre les êtres vivants : pour se nourrir (chaînes alimentaires), s'abriter ou se reproduire.",
    icon: "🔄"
  },
  "chaînes alimentaires": {
    term: "Chaînes Alimentaires",
    definition: "Les relations trophiques où chaque être vivant se nourrit du précédent et nourrit le suivant.",
    icon: "🐛"
  },
  // Histoire
  "afrique": {
    term: "L'Afrique",
    definition: "Le continent où sont nés tous les premiers ancêtres de l'humanité.",
    icon: "🌍"
  },
  "berceau de l'humanité": {
    term: "Berceau de l'Humanité",
    definition: "L'Afrique, lieu de naissance unique de tous les premiers humains sur Terre.",
    icon: "👶"
  },
  "fossile": {
    term: "Fossile",
    definition: "Une trace ou un reste d'os d'être vivant ancien piégé et durci dans la roche depuis des millénaires.",
    icon: "🦴"
  },
  "toumaï (-7m)": {
    term: "Toumaï",
    definition: "Le plus ancien fossile pré-humain connu (-7 millions d'années), découvert au Tchad en Afrique.",
    icon: "💀"
  },
  "homo sapiens (-300 000 ans)": {
    term: "Homo Sapiens",
    definition: "Notre propre espèce humaine moderne, apparue en Afrique il y a 300 000 ans.",
    icon: "🚶"
  },
  "grandes migrations": {
    term: "Grandes Migrations",
    definition: "Le long voyage à pied d'Homo Sapiens hors d'Afrique pour peupler progressivement tous les continents de la Terre.",
    icon: "🗺️"
  },
  "détroit de béring": {
    term: "Détroit de Béring",
    definition: "Le bras de mer gelé entre l'Asie et l'Amérique que les premiers humains ont traversé à pied vers -15 000 ans.",
    icon: "🧊"
  },
  "paléolithique": {
    term: "Paléolithique",
    definition: "L'âge de la pierre taillée (silex), très longue période où les humains vivaient en nomades.",
    icon: "🪨"
  },
  "nomade": {
    term: "Nomade",
    definition: "Une personne qui n'a pas d'habitat fixe et qui se déplace sans cesse pour suivre les troupeaux et cueillir.",
    icon: "⛺"
  },
  "pierre taillée": {
    term: "Pierre Taillée",
    definition: "Outil fabriqué en frappant le silex pour obtenir des lames tranchantes de chasse.",
    icon: "🔪"
  },
  "feu (-400 000 ans)": {
    term: "Maîtrise du Feu",
    definition: "Révolution vitale vers -400 000 ans pour cuire les aliments, se réchauffer et éloigner les fauves.",
    icon: "🔥"
  },
  "art pariétal (-40 000 ans)": {
    term: "Art Pariétal",
    definition: "Peintures et gravures réalisées par les hommes préhistoriques sur les parois des grottes (Lascaux, Chauvet).",
    icon: "🦣"
  },
  "grottes chauvet & lascaux": {
    term: "Chauvet & Lascaux",
    definition: "Les grottes préhistoriques célèbres pour leurs fresques magnifiques de chevaux, aurochs et mammouths.",
    icon: "🎨"
  },
  "écriture (-3500 av. j.-c.)": {
    term: "Invention de l'Écriture",
    definition: "Inventée vers -3500 av. J.-C. en Mésopotamie sur des tablettes d'argile : elle met fin à la Préhistoire et débute l'Histoire !",
    icon: "📜"
  },
  // Anglais
  "twenty-one (avec tiret)": {
    term: "Twenty-one",
    definition: "En anglais, on met obligatoirement un trait d'union entre la dizaine et l'unité de 21 à 99.",
    icon: "➖"
  },
  "forty (sans 'u')": {
    term: "Forty (sans 'u')",
    definition: "Le piège d'orthographe numéro 1 : 40 s'écrit SANS 'u' en anglais (f-o-r-t-y), contrairement à four.",
    icon: "⚠️"
  },
  "five thousand (sans 's')": {
    term: "Five thousand",
    definition: "Hundred, thousand et million sont strictement invariables (sans 's') lorsqu'ils sont précédés d'un chiffre.",
    icon: "💯"
  },
  "1st = first": {
    term: "1st (first)",
    definition: "Premier en anglais. On ajoute les deux dernières lettres 'st' après le chiffre 1.",
    icon: "🥇"
  },
  "2nd = second": {
    term: "2nd (second)",
    definition: "Deuxième en anglais. On ajoute 'nd' après le chiffre 2.",
    icon: "🥈"
  },
  "3rd = third": {
    term: "3rd (third)",
    definition: "Troisième en anglais. On ajoute 'rd' après le chiffre 3.",
    icon: "🥉"
  },
  "on friday (jour)": {
    term: "Préposition ON",
    definition: "Règle d'or : On utilise toujours ON devant un jour précis ou une date complète (on Monday, on July 14th).",
    icon: "📅"
  },
  "in july (mois)": {
    term: "Préposition IN",
    definition: "Règle d'or : On utilise toujours IN devant un mois seul ou une année (in July, in 2026).",
    icon: "🗓️"
  },
  // The 4 Nations of the UK & Emblems
  "the united kingdom": {
    term: "The United Kingdom (Le Royaume-Uni)",
    definition: "L'union de 4 nations distinctes : England, Scotland, Wales et Northern Ireland. À ne pas confondre avec l'Angleterre seule !",
    icon: "🇬🇧"
  },
  "the union jack": {
    term: "The Union Jack",
    definition: "Le drapeau officiel du Royaume-Uni qui fusionne la croix rouge de St George (Angleterre), la croix blanche en X de St Andrew (Écosse) et la croix rouge en X de St Patrick (Irlande).",
    icon: "🇬🇧"
  },
  "england (london)": {
    term: "England (L'Angleterre)",
    definition: "Capitale : London (Londres) • Nationalité : English • Langue : English • Emblème : The Tudor Rose (la Rose rouge).",
    icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
  },
  "scotland (edinburgh)": {
    term: "Scotland (L'Écosse)",
    definition: "Capitale : Edinburgh (Édimbourg) • Nationalité : Scottish • Langues : English & Scottish Gaelic • Emblème : The Thistle (le Chardon).",
    icon: "🏴󠁧󠁢󠁳󠁣󠁴󠁿"
  },
  "wales (cardiff)": {
    term: "Wales (Le Pays de Galles)",
    definition: "Capitale : Cardiff • Nationalité : Welsh • Langues : English & Welsh (Gallois) • Emblèmes : The Daffodil (Jonquille) & The Leek (Poireau) • Symbole : Red Dragon.",
    icon: "🏴󠁧󠁢󠁷󠁬󠁳󠁿"
  },
  "northern ireland (belfast)": {
    term: "Northern Ireland (L'Irlande du Nord)",
    definition: "Capitale : Belfast • Nationalité : Northern Irish • Langues : English & Irish • Emblème : The Shamrock (le Trèfle à 3 feuilles) • Saint patron : St Patrick.",
    icon: "☘️"
  },
  "the tudor rose (rose)": {
    term: "The Tudor Rose (Rose rouge)",
    definition: "L'emblème floral officiel de l'Angleterre, symbole historique de paix.",
    icon: "🌹"
  },
  "the thistle (chardon)": {
    term: "The Thistle (Le Chardon)",
    definition: "La fleur piquante légendaire d'Écosse : la légende dit qu'un envahisseur a marché dessus, réveillant les soldats écossais !",
    icon: "🪻"
  },
  "the daffodil (jonquille)": {
    term: "The Daffodil (La Jonquille)",
    definition: "La fleur jaune emblème du Pays de Galles, fêtée le 1er mars pour la St David.",
    icon: "🌼"
  },
  "the leek (poireau)": {
    term: "The Leek (Le Poireau)",
    definition: "Le légume emblème historique du Pays de Galles, porté par les soldats gallois pour se reconnaître au combat.",
    icon: "🌱"
  },
  "the shamrock (trèfle)": {
    term: "The Shamrock (Le Trèfle)",
    definition: "Le trèfle à 3 feuilles, symbole emblématique d'Irlande associé à St Patrick.",
    icon: "☘️"
  },
  // Classroom English
  "raise your hand!": {
    term: "Raise your hand!",
    definition: "Consigne du professeur : 'Lève la main !' avant de prendre la parole.",
    icon: "🙋"
  },
  "be quiet!": {
    term: "Be quiet!",
    definition: "Consigne du professeur : 'Silence !' ou 'Sois calme !'.",
    icon: "🤫"
  },
  "can i open the window?": {
    term: "Can I open the window?",
    definition: "Formule polie pour demander au professeur : 'Puis-je ouvrir la fenêtre ?'.",
    icon: "🪟"
  },
  "may i go to the toilets?": {
    term: "May I go to the toilets?",
    definition: "Formule de grande politesse pour demander : 'Puis-je aller aux toilettes, s'il vous plaît ?'.",
    icon: "🚻"
  },
  "i don't understand": {
    term: "I don't understand",
    definition: "Expression indispensable pour dire : 'Je ne comprends pas'.",
    icon: "❓"
  },
  "what's the word for...?": {
    term: "What's the word for...?",
    definition: "Formule magique pour demander la traduction d'un mot en anglais au professeur : 'Comment dit-on ... en anglais ?'.",
    icon: "🗣️"
  },
  // Maths
  "dénominateur (en bas = découpage)": {
    term: "Dénominateur",
    definition: "Le chiffre situé en BAS de la fraction : il indique en combien de parts égales on découpe le tout.",
    icon: "🍰"
  },
  "numérateur (en haut = parts prises)": {
    term: "Numérateur",
    definition: "Le chiffre situé en HAUT de la fraction : il compte combien de parts égales ont été sélectionnées.",
    icon: "🥧"
  },
  // Physique-Chimie
  "poubelle jaune (plastique/métal)": {
    term: "Poubelle Jaune",
    definition: "Le bac de tri sélectif réservé à tous les emballages en plastique, briques en carton et boîtes métalliques.",
    icon: "🟡"
  },
  "bac vert (verre)": {
    term: "Conteneur à Verre",
    definition: "Le conteneur spécial pour bouteilles et bocaux en verre, recyclable à 100% et à l'infini !",
    icon: "🟢"
  },
  "conducteur thermique (métaux)": {
    term: "Conducteur Thermique",
    definition: "Un matériau qui laisse passer la chaleur très rapidement (cuivre, fer, aluminium).",
    icon: "🔥"
  },
  "isolant thermique (bois/plastique)": {
    term: "Isolant Thermique",
    definition: "Un matériau qui bloque ou ralentit les transferts de chaleur (bois, plastique, laine, air).",
    icon: "🪵"
  },
  // Français
  "auxiliaire être (accord sujet)": {
    term: "Auxiliaire ÊTRE",
    definition: "Avec l'auxiliaire ÊTRE, le participe passé s'accorde TOUJOURS en genre (e) et en nombre (s) avec le sujet.",
    icon: "✨"
  },
  "auxiliaire avoir (pas d'accord sujet)": {
    term: "Auxiliaire AVOIR",
    definition: "Avec l'auxiliaire AVOIR, le participe passé ne s'accorde JAMAIS avec le sujet !",
    icon: "🛡️"
  }
};

