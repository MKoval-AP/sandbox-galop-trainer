/* ============================================================
   GALOP 1 — Données des questions
   5 chapitres, ~55 questions
   ============================================================ */

const GALOP1_DATA = {
  id: 1,
  title: 'Galop 1',
  chapters: [

    /* ======================================================
       CHAPITRE 1 — Connaissances Générales (8 questions)
       ====================================================== */
    {
      id: 1,
      title: 'Connaissances Générales',
      description: 'FFE, clubs, championnats',
      questionCount: 8,
      questions: [
        {
          id: 'ch1q1',
          type: 'true-false',
          text: 'La FFE est la Fédération Française d\'Équitation.',
          correct: true
        },
        {
          id: 'ch1q2',
          type: 'true-false',
          text: 'Les clubs équestres affiliés à la FFE peuvent organiser des compétitions officielles.',
          correct: true
        },
        {
          id: 'ch1q3',
          type: 'true-false',
          text: 'N\'importe quel club peut se déclarer "Club Labellisé FFE" sans conditions.',
          correct: false
        },
        {
          id: 'ch1q4',
          type: 'true-false',
          text: 'Les championnats de France de saut d\'obstacles se déroulent à Lamotte-Beuvron.',
          correct: true
        },
        {
          id: 'ch1q5',
          type: 'mcq-multiple',
          text: 'Les clubs labellisés FFE s\'engagent à (plusieurs réponses possibles) :',
          options: [
            { id: 'a', text: 'Assurer la sécurité des cavaliers' },
            { id: 'b', text: 'Pratiquer la maltraitance animale' },
            { id: 'c', text: 'Proposer des activités de qualité' },
            { id: 'd', text: 'Respecter le bien-être animal' }
          ],
          correct: ['a', 'c', 'd']
        },
        {
          id: 'ch1q6',
          type: 'mcq-single',
          text: 'Où se trouvent le siège social de la FFE et les championnats de France ?',
          options: [
            { id: 'a', text: 'Paris' },
            { id: 'b', text: 'Bordeaux' },
            { id: 'c', text: 'Lamotte-Beuvron' },
            { id: 'd', text: 'Lyon' }
          ],
          correct: 'c'
        },
        {
          id: 'ch1q7',
          type: 'mcq-multiple',
          text: 'Parmi les propositions suivantes, lesquelles font partie des domaines gérés par la FFE ?',
          options: [
            { id: 'a', text: 'L\'équitation de loisir' },
            { id: 'b', text: 'Le football' },
            { id: 'c', text: 'Le sport de compétition équestre' },
            { id: 'd', text: 'L\'attelage' }
          ],
          correct: ['a', 'c', 'd']
        },
        {
          id: 'ch1q8',
          type: 'mcq-multiple',
          text: 'Parmi les diplômes suivants, lesquels ne permettent PAS d\'enseigner l\'équitation ?',
          options: [
            { id: 'a', text: 'Le BPJEPS équitation' },
            { id: 'b', text: 'Le Galop 1' },
            { id: 'c', text: 'Le Galop 7' },
            { id: 'd', text: 'Le permis de conduire' }
          ],
          correct: ['b', 'c', 'd']
        }
      ]
    },

    /* ======================================================
       CHAPITRE 2 — Connaissance du Cheval (13 questions)
       ====================================================== */
    {
      id: 2,
      title: 'Connaissance du Cheval',
      description: 'Comportement, allures, anatomie',
      questionCount: 13,
      questions: [
        {
          id: 'ch2q1',
          type: 'mcq-single',
          text: 'Depuis combien d\'années environ le cheval est-il domestiqué ?',
          options: [
            { id: 'a', text: '500 ans' },
            { id: 'b', text: '1 000 ans' },
            { id: 'c', text: '5 000 ans' },
            { id: 'd', text: '10 000 ans' }
          ],
          correct: 'c'
        },
        {
          id: 'ch2q2',
          type: 'mcq-single',
          text: 'Le cheval est-il une proie ou un prédateur ?',
          options: [
            { id: 'a', text: 'Un prédateur' },
            { id: 'b', text: 'Une proie' },
            { id: 'c', text: 'Ni l\'un ni l\'autre' },
            { id: 'd', text: 'Les deux à la fois' }
          ],
          correct: 'b'
        },
        {
          id: 'ch2q3',
          type: 'mcq-single',
          text: 'Laquelle de ces robes n\'est PAS une robe de base du cheval ?',
          options: [
            { id: 'a', text: 'Bai' },
            { id: 'b', text: 'Alezan' },
            { id: 'c', text: 'Gris' },
            { id: 'd', text: 'Zébré' }
          ],
          correct: 'd'
        },
        {
          id: 'ch2q4',
          type: 'true-false',
          text: 'Le cheval domestique a besoin de contact social avec d\'autres chevaux.',
          correct: true
        },
        {
          id: 'ch2q5',
          type: 'true-false',
          text: 'Le cheval peut vivre seul sans ressentir de stress.',
          correct: false
        },
        {
          id: 'ch2q6',
          type: 'mcq-single',
          text: 'Le galop est une allure à combien de temps ?',
          options: [
            { id: 'a', text: '2 temps' },
            { id: 'b', text: '3 temps' },
            { id: 'c', text: '4 temps' },
            { id: 'd', text: '5 temps' }
          ],
          correct: 'c'
        },
        {
          id: 'ch2q7',
          type: 'mcq-single',
          text: 'Le cheval est :',
          options: [
            { id: 'a', text: 'Carnivore' },
            { id: 'b', text: 'Omnivore' },
            { id: 'c', text: 'Herbivore' },
            { id: 'd', text: 'Insectivore' }
          ],
          correct: 'c'
        },
        {
          id: 'ch2q8',
          type: 'mcq-multiple',
          text: 'Parmi les propositions suivantes, lesquelles correspondent à des choses que les chevaux aiment ?',
          options: [
            { id: 'a', text: 'Vivre en groupe' },
            { id: 'b', text: 'Être seul en permanence' },
            { id: 'c', text: 'Brouter et se déplacer' },
            { id: 'd', text: 'Le contact avec l\'humain' }
          ],
          correct: ['a', 'c', 'd']
        },
        {
          id: 'ch2q9',
          type: 'mcq-single',
          text: 'Le trot est une allure :',
          options: [
            { id: 'a', text: 'Marchée à 4 temps' },
            { id: 'b', text: 'Sautée à 2 temps' },
            { id: 'c', text: 'Glissée à 3 temps' },
            { id: 'd', text: 'Bondissante à 1 temps' }
          ],
          correct: 'b'
        },
        {
          id: 'ch2q10',
          type: 'mcq-multiple',
          text: 'Que peut signifier un cheval qui couche les oreilles en arrière ?',
          options: [
            { id: 'a', text: 'Il est détendu et content' },
            { id: 'b', text: 'Il est irrité ou mécontent' },
            { id: 'c', text: 'Il écoute quelque chose derrière lui' },
            { id: 'd', text: 'Il est prêt à ruer' }
          ],
          correct: ['b', 'c', 'd']
        },
        {
          id: 'ch2q11',
          type: 'mcq-multiple',
          text: 'Quelles sont les 3 principales allures du cheval ?',
          options: [
            { id: 'a', text: 'Le pas' },
            { id: 'b', text: 'Le trot' },
            { id: 'c', text: 'Le galop' },
            { id: 'd', text: 'Le saut' }
          ],
          correct: ['a', 'b', 'c']
        },
        {
          id: 'ch2q12',
          type: 'mcq-single',
          text: 'Quel est le premier instinct du cheval face à un danger ?',
          options: [
            { id: 'a', text: 'L\'attaque' },
            { id: 'b', text: 'Se cacher' },
            { id: 'c', text: 'La fuite' },
            { id: 'd', text: 'Rester immobile' }
          ],
          correct: 'c'
        },
        {
          id: 'ch2q13',
          type: 'image-label',
          text: 'Indiquez les parties du corps du cheval sur le schéma. Cliquez sur un mot, puis sur le point correspondant.',
          diagramSrc: '../assets/placeholders/horse-anatomy.svg',
          points: [
            { id: 1,  correct: 'Tête',        x: 88, y: 20 },
            { id: 2,  correct: 'Encolure',     x: 76, y: 31 },
            { id: 3,  correct: 'Avant-main',   x: 65, y: 58 },
            { id: 4,  correct: 'Arrière-main', x: 30, y: 58 },
            { id: 5,  correct: 'Corps',        x: 52, y: 42 },
            { id: 6,  correct: 'Garrot',       x: 68, y: 24 },
            { id: 7,  correct: 'Dos',          x: 55, y: 24 },
            { id: 8,  correct: 'Croupe',       x: 27, y: 24 },
            { id: 9,  correct: 'Queue',        x: 13, y: 30 },
            { id: 10, correct: 'Main',         x: 65, y: 82 },
            { id: 11, correct: 'Jambe',        x: 30, y: 74 },
            { id: 12, correct: 'Pied',         x: 30, y: 92 }
          ],
          words: ['Tête','Encolure','Avant-main','Arrière-main','Corps','Garrot','Dos','Croupe','Queue','Main','Jambe','Pied']
        }
      ]
    },

    /* ======================================================
       CHAPITRE 3 — S'Occuper du Cheval (10 questions)
       ====================================================== */
    {
      id: 3,
      title: 'S\'Occuper du Cheval',
      description: 'Équipement, soins, harnachement',
      questionCount: 10,
      questions: [
        {
          id: 'ch3q1',
          type: 'mcq-multiple',
          text: 'Pour enlever le filet à un cheval, il faut (dans le bon ordre ou en sécurité) :',
          options: [
            { id: 'a', text: 'Attacher d\'abord le licol par-dessus le filet' },
            { id: 'b', text: 'Lâcher les rênes sans attacher le cheval' },
            { id: 'c', text: 'Déboucler la sous-gorge et passer les rênes sur l\'encolure' },
            { id: 'd', text: 'Retirer le mors doucement en avant et vers le bas' }
          ],
          correct: ['a', 'c', 'd']
        },
        {
          id: 'ch3q2',
          type: 'mcq-multiple',
          text: 'Avant une séance, il faut s\'occuper du cheval en :',
          options: [
            { id: 'a', text: 'Le brossant' },
            { id: 'b', text: 'Vérifiant ses pieds (curer)' },
            { id: 'c', text: 'Le nourrissant juste avant de monter' },
            { id: 'd', text: 'Contrôlant le harnachement' }
          ],
          correct: ['a', 'b', 'd']
        },
        {
          id: 'ch3q3',
          type: 'mcq-multiple',
          text: 'Pour entrer dans un box en toute sécurité, il faut :',
          options: [
            { id: 'a', text: 'Annoncer sa présence avant d\'entrer' },
            { id: 'b', text: 'Entrer par derrière pour ne pas se faire voir' },
            { id: 'c', text: 'Parler calmement au cheval' },
            { id: 'd', text: 'Éviter de se placer directement derrière le cheval' }
          ],
          correct: ['a', 'c', 'd']
        },
        {
          id: 'ch3q4',
          type: 'mcq-multiple',
          text: 'Pour assurer le confort du cheval au box, il faut :',
          options: [
            { id: 'a', text: 'Mettre de la litière propre et abondante' },
            { id: 'b', text: 'Laisser le box sale plusieurs jours' },
            { id: 'c', text: 'S\'assurer qu\'il a de l\'eau fraîche' },
            { id: 'd', text: 'Lui donner du foin' }
          ],
          correct: ['a', 'c', 'd']
        },
        {
          id: 'ch3q5',
          type: 'mcq-single',
          text: 'Dans quel ordre enlève-t-on la selle après une séance ?',
          options: [
            { id: 'a', text: 'Sous-ventrière, étriers, selle' },
            { id: 'b', text: 'Étriers, sous-ventrière, selle' },
            { id: 'c', text: 'Selle directement' },
            { id: 'd', text: 'Peu importe l\'ordre' }
          ],
          correct: 'b'
        },
        {
          id: 'ch3q6',
          type: 'photo-choice',
          text: 'Quel licol est correctement placé sur le cheval ?',
          photos: [
            { id: 'a', src: '../assets/placeholders/licol-a.svg', label: 'A' },
            { id: 'b', src: '../assets/placeholders/licol-b.svg', label: 'B' },
            { id: 'c', src: '../assets/placeholders/licol-c.svg', label: 'C' }
          ],
          correct: 'b'
        },
        {
          id: 'ch3q7',
          type: 'image-label',
          text: 'Identifiez les parties du licol sur le schéma.',
          diagramSrc: '../assets/placeholders/licol.svg',
          points: [
            { id: 1, correct: 'Têtière',       x: 50, y: 8  },
            { id: 2, correct: 'Muserolle',      x: 50, y: 45 },
            { id: 3, correct: 'Montant',        x: 28, y: 28 },
            { id: 4, correct: 'Sous-gorge',     x: 72, y: 28 },
            { id: 5, correct: 'Anneau de boucle', x: 25, y: 48 },
            { id: 6, correct: 'Anneau d\'attache', x: 50, y: 70 },
            { id: 7, correct: 'Longe',          x: 50, y: 88 }
          ],
          words: ['Têtière','Muserolle','Montant','Sous-gorge','Anneau de boucle','Anneau d\'attache','Longe']
        },
        {
          id: 'ch3q8',
          type: 'image-label',
          text: 'Identifiez les parties de la selle sur le schéma.',
          diagramSrc: '../assets/placeholders/selle.svg',
          points: [
            { id: 1, correct: 'Pommeau',         x: 20, y: 18 },
            { id: 2, correct: 'Siège',            x: 50, y: 22 },
            { id: 3, correct: 'Troussequin',      x: 80, y: 18 },
            { id: 4, correct: 'Quartier',         x: 30, y: 55 },
            { id: 5, correct: 'Panneaux',         x: 50, y: 75 },
            { id: 6, correct: 'Arçon',            x: 50, y: 45 },
            { id: 7, correct: 'Sous-ventrière',   x: 20, y: 80 },
            { id: 8, correct: 'Étrivière',        x: 70, y: 55 },
            { id: 9, correct: 'Étrier',           x: 80, y: 78 }
          ],
          words: ['Pommeau','Siège','Troussequin','Quartier','Panneaux','Arçon','Sous-ventrière','Étrivière','Étrier']
        },
        {
          id: 'ch3q9',
          type: 'image-label',
          text: 'Identifiez les parties du filet sur le schéma.',
          diagramSrc: '../assets/placeholders/filet.svg',
          points: [
            { id: 1, correct: 'Têtière',      x: 50, y: 8  },
            { id: 2, correct: 'Frontal',      x: 50, y: 20 },
            { id: 3, correct: 'Montant',      x: 25, y: 35 },
            { id: 4, correct: 'Muserolle',    x: 50, y: 42 },
            { id: 5, correct: 'Mors',         x: 50, y: 62 },
            { id: 6, correct: 'Sous-gorge',   x: 72, y: 30 },
            { id: 7, correct: 'Rênes',        x: 50, y: 82 }
          ],
          words: ['Têtière','Frontal','Montant','Muserolle','Mors','Sous-gorge','Rênes']
        },
        {
          id: 'ch3q10',
          type: 'photo-choice',
          text: 'Quel nœud d\'attache est correct pour attacher un cheval ?',
          photos: [
            { id: 'a', src: '../assets/placeholders/noeud-a.svg', label: 'A' },
            { id: 'b', src: '../assets/placeholders/noeud-b.svg', label: 'B' },
            { id: 'c', src: '../assets/placeholders/noeud-c.svg', label: 'C' }
          ],
          correct: 'b'
        }
      ]
    },

    /* ======================================================
       CHAPITRE 4 — Pratique Équestre à Pied (9 questions)
       ====================================================== */
    {
      id: 4,
      title: 'Pratique Équestre à Pied',
      description: 'Marcher avec son cheval, sécurité',
      questionCount: 9,
      questions: [
        {
          id: 'ch4q1',
          type: 'true-false',
          text: 'Pour marcher avec son cheval, on se place à gauche du cheval, à hauteur de l\'épaule.',
          correct: true
        },
        {
          id: 'ch4q2',
          type: 'true-false',
          text: 'On peut laisser du lest de longe pendre entre ses jambes quand on mène un cheval.',
          correct: false
        },
        {
          id: 'ch4q3',
          type: 'true-false',
          text: 'Il faut toujours passer devant le cheval lorsqu\'on change de côté.',
          correct: true
        },
        {
          id: 'ch4q4',
          type: 'mcq-single',
          text: 'À quelle vitesse doit-on marcher avec son cheval en main ?',
          options: [
            { id: 'a', text: 'Le plus vite possible' },
            { id: 'b', text: 'À la vitesse naturelle du cheval' },
            { id: 'c', text: 'En courant pour qu\'il suive' },
            { id: 'd', text: 'Très lentement' }
          ],
          correct: 'b'
        },
        {
          id: 'ch4q5',
          type: 'mcq-single',
          text: 'Si votre cheval colle (reste collé à vous), vous devez :',
          options: [
            { id: 'a', text: 'Courir devant lui' },
            { id: 'b', text: 'Le repousser doucement avec le coude ou la main' },
            { id: 'c', text: 'Le laisser faire, c\'est normal' },
            { id: 'd', text: 'Tirer fort sur la longe' }
          ],
          correct: 'b'
        },
        {
          id: 'ch4q6',
          type: 'mcq-single',
          text: 'Pour ralentir ou arrêter un cheval en main, on :',
          options: [
            { id: 'a', text: 'Tire fort d\'un coup sec' },
            { id: 'b', text: 'Crie dessus' },
            { id: 'c', text: 'Ralentit sa propre marche et donne une légère tension sur la longe' },
            { id: 'd', text: 'Lâche la longe' }
          ],
          correct: 'c'
        },
        {
          id: 'ch4q7',
          type: 'mcq-single',
          text: 'En manège, lorsque vous croisez d\'autres chevaux en main, vous passez :',
          options: [
            { id: 'a', text: 'À droite' },
            { id: 'b', text: 'Au milieu' },
            { id: 'c', text: 'Gauche contre gauche (main gauche contre main gauche)' },
            { id: 'd', text: 'N\'importe comment' }
          ],
          correct: 'c'
        },
        {
          id: 'ch4q8',
          type: 'mcq-single',
          text: 'Avec quelle main tient-on la longe principale quand on mène un cheval à gauche ?',
          options: [
            { id: 'a', text: 'La main droite' },
            { id: 'b', text: 'La main gauche' },
            { id: 'c', text: 'Les deux mains' },
            { id: 'd', text: 'Peu importe' }
          ],
          correct: 'b'
        },
        {
          id: 'ch4q9',
          type: 'photo-choice',
          text: 'Quel cavalier tient correctement son cheval en main ?',
          photos: [
            { id: 'a', src: '../assets/placeholders/cheval-tenu-a.svg', label: 'A' },
            { id: 'b', src: '../assets/placeholders/cheval-tenu-b.svg', label: 'B' }
          ],
          correct: 'b'
        }
      ]
    },

    /* ======================================================
       CHAPITRE 5 — Pratique Équestre à Cheval (15 questions)
       ====================================================== */
    {
      id: 5,
      title: 'Pratique Équestre à Cheval',
      description: 'Aides, allures, position, sécurité',
      questionCount: 15,
      questions: [
        {
          id: 'ch5q1',
          type: 'true-false',
          text: 'Le cavalier doit toujours monter et descendre du même côté (le côté gauche).',
          correct: true
        },
        {
          id: 'ch5q2',
          type: 'true-false',
          text: 'On peut chausser les étriers en laissant le pied traverser complètement.',
          correct: false
        },
        {
          id: 'ch5q3',
          type: 'true-false',
          text: 'En cas de chute, il faut garder les rênes en main à tout prix.',
          correct: false
        },
        {
          id: 'ch5q4',
          type: 'true-false',
          text: 'Le casque homologué est obligatoire pour monter à cheval.',
          correct: true
        },
        {
          id: 'ch5q5',
          type: 'true-false',
          text: 'Les transitions permettent au cheval d\'être plus attentif aux aides du cavalier.',
          correct: true
        },
        {
          id: 'ch5q6',
          type: 'mcq-multiple',
          text: 'Parmi les façons suivantes, lesquelles sont correctes pour monter à cheval ?',
          options: [
            { id: 'a', text: 'Utiliser un montoir (plot)' },
            { id: 'b', text: 'Mettre le pied à l\'étrier et s\'élancer' },
            { id: 'c', text: 'Sauter sur le cheval par derrière' },
            { id: 'd', text: 'Se faire aider par un accompagnateur' }
          ],
          correct: ['a', 'b', 'd']
        },
        {
          id: 'ch5q7',
          type: 'mcq-single',
          text: 'À quoi servent les transitions dans le travail équestre ?',
          options: [
            { id: 'a', text: 'À fatiguer le cheval' },
            { id: 'b', text: 'À rendre le cheval plus attentif aux aides' },
            { id: 'c', text: 'À changer de direction' },
            { id: 'd', text: 'À ralentir uniquement' }
          ],
          correct: 'b'
        },
        {
          id: 'ch5q8',
          type: 'mcq-single',
          text: 'Pour un débutant, quelle est souvent l\'allure la plus confortable ?',
          options: [
            { id: 'a', text: 'Le trot enlevé' },
            { id: 'b', text: 'Le trot assis' },
            { id: 'c', text: 'Le galop' },
            { id: 'd', text: 'Le pas' }
          ],
          correct: 'c'
        },
        {
          id: 'ch5q9',
          type: 'mcq-multiple',
          text: 'Quelles sont les aides naturelles du cavalier ?',
          options: [
            { id: 'a', text: 'Les jambes' },
            { id: 'b', text: 'L\'assiette (le poids du corps)' },
            { id: 'c', text: 'La cravache' },
            { id: 'd', text: 'La voix' },
            { id: 'e', text: 'Les mains' }
          ],
          correct: ['a', 'b', 'd', 'e']
        },
        {
          id: 'ch5q10',
          type: 'mcq-multiple',
          text: 'Quelles sont les aides artificielles du cavalier ?',
          options: [
            { id: 'a', text: 'La cravache' },
            { id: 'b', text: 'La chambrière' },
            { id: 'c', text: 'Les éperons' },
            { id: 'd', text: 'Les jambes' }
          ],
          correct: ['a', 'b', 'c']
        },
        {
          id: 'ch5q11',
          type: 'mcq-single',
          text: 'Quelle est la principale action des jambes du cavalier ?',
          options: [
            { id: 'a', text: 'Freiner le cheval' },
            { id: 'b', text: 'Accélérer et mettre le cheval en avant' },
            { id: 'c', text: 'Changer de direction' },
            { id: 'd', text: 'Faire reculer le cheval' }
          ],
          correct: 'b'
        },
        {
          id: 'ch5q12',
          type: 'mcq-single',
          text: 'Pour partir au pas depuis l\'arrêt, le cavalier doit :',
          options: [
            { id: 'a', text: 'Tirer sur les rênes' },
            { id: 'b', text: 'Agir avec les deux jambes simultanément et relâcher les rênes légèrement' },
            { id: 'c', text: 'Crier "Hue !"' },
            { id: 'd', text: 'Pencher le corps en avant brusquement' }
          ],
          correct: 'b'
        },
        {
          id: 'ch5q13',
          type: 'mcq-single',
          text: 'D\'où vient le nom de l\'examen "Galop" ?',
          options: [
            { id: 'a', text: 'Du nom d\'un cheval célèbre' },
            { id: 'b', text: 'Du mot anglais "gallop"' },
            { id: 'c', text: 'Des niveaux progressifs du programme FFE, du débutant à l\'expert' },
            { id: 'd', text: 'De la vitesse à laquelle on passe l\'examen' }
          ],
          correct: 'c'
        },
        {
          id: 'ch5q14',
          type: 'mcq-multiple',
          text: 'À quoi servent les mains du cavalier ?',
          options: [
            { id: 'a', text: 'À diriger le cheval' },
            { id: 'b', text: 'À ralentir et arrêter le cheval' },
            { id: 'c', text: 'À frapper le cheval' },
            { id: 'd', text: 'À maintenir le contact avec la bouche du cheval' }
          ],
          correct: ['a', 'b', 'd']
        },
        {
          id: 'ch5q15',
          type: 'photo-choice',
          text: 'Sur quelle photo les étriers sont-ils chaussés correctement ?',
          photos: [
            { id: 'a', src: '../assets/placeholders/etriers-a.svg', label: 'A' },
            { id: 'b', src: '../assets/placeholders/etriers-b.svg', label: 'B' },
            { id: 'c', src: '../assets/placeholders/etriers-c.svg', label: 'C' }
          ],
          correct: 'b'
        }
      ]
    }
  ]
};
