export interface TeacherVerb {
  verb: string;
  trap: string;
  plainTranslation: string;
  exampleCopy: string;
}

export const TEACHER_VERBS_DICTIONARY: TeacherVerb[] = [
  {
    verb: "Justifier",
    trap: "Ne te contente pas de dire 'oui' ou 'non' !",
    plainTranslation: "Prouve pourquoi tu as raison en donnant une phrase du texte, un mot du cours ou un calcul.",
    exampleCopy: "Exemple à écrire : 'Je sais cela parce que dans le document, il est écrit : ...'"
  },
  {
    verb: "Citer",
    trap: "Ne raconte pas avec tes mots, c'est du copier-coller !",
    plainTranslation: "Recopie le passage exact du texte entre guillemets « ... » sans changer un seul mot.",
    exampleCopy: "Exemple à écrire : 'Le texte l'indique : « les premiers humains taillaient le silex ».'"
  },
  {
    verb: "Déduire",
    trap: "La réponse n'est pas écrite mot pour mot dans le texte !",
    plainTranslation: "Fais le détective : utilise les indices sous tes yeux pour trouver la conséquence logique cachée.",
    exampleCopy: "Exemple à écrire : 'Comme l'eau est à 0°C, j'en déduis qu'elle va se transformer en glace.'"
  },
  {
    verb: "Comparer",
    trap: "Ne décris pas seulement un seul objet !",
    plainTranslation: "Dis ce qui est pareil (les points communs) ET ce qui est différent entre deux choses.",
    exampleCopy: "Exemple : 'Le métal conduit la chaleur, alors que le bois bloque la chaleur.'"
  },
  {
    verb: "Relever / Repérer",
    trap: "Ne fais pas une longue dissertation !",
    plainTranslation: "Trouve et recopie uniquement le mot ou l'information demandée dans le document.",
    exampleCopy: "Exemple : 'Le mot relevé dans le texte est : « nomades ».'"
  },
  {
    verb: "Illustrer par un exemple",
    trap: "Ne récite pas la définition abstraite !",
    plainTranslation: "Donne un cas précis et concret tiré de la vie réelle ou du cours pour montrer que tu as compris.",
    exampleCopy: "Exemple : 'Un isolant thermique, par exemple le plastique du manche de la casserole.'"
  }
];

export const METHOD_GUIDES = [
  {
    id: "methode_resume",
    title: "📝 Le Protocole de Résumé de Mathieu",
    badge: "Méthode Star",
    steps: [
      {
        num: 1,
        title: "Écoute vocale d'abord (Zéro fatigue visuelle)",
        desc: "Fais lire le texte par la synthèse vocale ou l'IA pour le comprendre sans t'épuiser à déchiffrer chaque ligne avec les yeux."
      },
      {
        num: 2,
        title: "La règle du 1-2-3 (Les 3 idées forces)",
        desc: "Ferme les yeux et demande-toi : 'Quelles sont les 3 informations les plus importantes sans lesquelles l'histoire ne tiendrait pas debout ?'"
      },
      {
        num: 3,
        title: "Rédige avec TES propres mots (Sans copier-coller)",
        desc: "Écris 3 à 4 phrases courtes. N'essaie pas d'utiliser des mots compliqués : ce qui compte, c'est que l'idée soit limpide !"
      },
      {
        num: 4,
        title: "La relecture magique",
        desc: "Active la lecture vocale sur ton résumé : si à l'oreille ta phrase sonne bien, c'est réussi !"
      }
    ]
  },
  {
    id: "methode_frise",
    title: "⏳ Savoir lire une Frise Chronologique en Histoire",
    badge: "Repère Histoire",
    steps: [
      {
        num: 1,
        title: "Le sens de la flèche du temps",
        desc: "Le temps avance toujours de GAUCHE à DROITE (du passé le plus lointain vers aujourd'hui)."
      },
      {
        num: 2,
        title: "Le point zéro magique (Jésus-Christ)",
        desc: "Avant l'an 0, les dates 'reculent' : -3500 est plus ancien que -100 ! Après l'an 0, les années avancent normalement (1789, 2026)."
      },
      {
        num: 3,
        title: "Repérer les grandes périodes en couleurs",
        desc: "Une frise découpe l'histoire en blocs de couleurs : Préhistoire, Antiquité, Moyen Âge, Temps modernes, Époque contemporaine."
      }
    ]
  },
  {
    id: "methode_carte",
    title: "🗺️ Savoir lire une Carte & sa Légende en Géo",
    badge: "Repère Géo",
    steps: [
      {
        num: 1,
        title: "Toujours lire le titre d'abord",
        desc: "Le titre te dit exactement de quoi parle la carte (ex : 'La répartition de la population mondiale')."
      },
      {
        num: 2,
        title: "La légende est ta boîte à outils décodeur",
        desc: "Chaque carré de couleur ou symbole est expliqué dans la légende : rouge = très peuplé, jaune = désert, point = métropole."
      },
      {
        num: 3,
        title: "La rose des vents (N.S.E.O.)",
        desc: "Nord en haut, Sud en bas, Est à droite, Ouest à gauche. Pense au mot 'N-E-S-O' ou à la phrase 'N'écoute Sans Obéir' !"
      }
    ]
  },
  {
    id: "methode_svt",
    title: "🔬 La Démarche d'Investigation en SVT",
    badge: "Réflexe Scientifique",
    steps: [
      {
        num: 1,
        title: "1. Observer le phénomène",
        desc: "Je remarque quelque chose de curieux dans la nature (ex : les feuilles tombent en automne)."
      },
      {
        num: 2,
        title: "2. Formuler le problème",
        desc: "Je pose la question scientifique : 'Pourquoi les arbres perdent-ils leurs feuilles ?'"
      },
      {
        num: 3,
        title: "3. Lancer une hypothèse",
        desc: "Je propose une idée : 'Je pense que c'est pour se protéger du froid et du manque de lumière.'"
      },
      {
        num: 4,
        title: "4. Conclusion & Preuve",
        desc: "L'expérience confirme mon hypothèse : l'arbre ralentit sa sève en hiver."
      }
    ]
  }
];
