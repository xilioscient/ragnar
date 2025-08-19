export interface Lesson {
  id: string;
  title: string;
  difficulty: 'base' | 'intermedio' | 'avanzato';
  estimatedTime: string;
  prerequisites?: string[];
  description: string;
  quizId?: string;
  summary?: string;
  prev?: string;
  next?: string;
  topics: string[];
  duration: string;
  rating?: number;
  studentsCount?: number;
}

export const lessons: Lesson[] = [
  {
    id: '1-introduzione',
    title: 'Introduzione al C++',
    difficulty: 'base',
    estimatedTime: '15 min',
    description: 'Panoramica del linguaggio C++, storia e caratteristiche principali.',
    quizId: '1-introduzione',
    summary: 'Hai scoperto la storia e le caratteristiche principali del C++.' ,
    prev: undefined,
    next: '2-variabili-tipi',
    topics: ['Sintassi base', 'Compilazione', 'Hello World'],
    duration: '15 min',
    rating: 4.5,
    studentsCount: 0
  },
  {
    id: '2-variabili-tipi',
    title: 'Variabili e Tipi di Dati',
    difficulty: 'base',
    estimatedTime: '20 min',
    prerequisites: ['1-introduzione'],
    description: 'Dichiarazione di variabili, tipi di dati fondamentali e costanti.',
    quizId: '2-variabili-tipi',
    summary: 'Hai imparato a dichiarare variabili e a usare i tipi di dati fondamentali in C++.',
    prev: '1-introduzione',
    next: '3-operatori',
    topics: ['Variabili', 'Tipi di dati', 'Costanti'],
    duration: '20 min',
    rating: 4.2,
    studentsCount: 0
  },
  {
    id: '3-operatori',
    title: 'Operatori e Espressioni',
    difficulty: 'base',
    estimatedTime: '25 min',
    prerequisites: ['2-variabili-tipi'],
    description: 'Operatori aritmetici, di confronto, logici e loro precedenze.',
    quizId: '3-operatori',
    summary: 'Hai approfondito l’uso degli operatori e delle espressioni in C++.',
    prev: '2-variabili-tipi',
    next: '4-controllo-flusso',
    topics: ['Operatori', 'Espressioni', 'Precedenze'],
    duration: '25 min',
    rating: 4.7,
    studentsCount: 0
  },
  {
    id: '4-controllo-flusso',
    title: 'Strutture di Controllo',
    difficulty: 'base',
    estimatedTime: '30 min',
    prerequisites: ['3-operatori'],
    description: 'If-else, switch, cicli while, do-while e for.',
    quizId: '4-controllo-flusso',
    summary: 'Hai imparato a controllare il flusso di esecuzione con if, switch e cicli.',
    prev: '3-operatori',
    next: '5-array',
    topics: ['Strutture di controllo', 'If-else', 'Switch', 'Cicli'],
    duration: '30 min',
    rating: 4.3,
    studentsCount: 0
  },
  {
    id: '5-array',
    title: 'Array e Stringhe',
    difficulty: 'intermedio',
    estimatedTime: '35 min',
    prerequisites: ['4-controllo-flusso'],
    description: 'Array monodimensionali, multidimensionali e gestione delle stringhe.',
    quizId: '5-array',
    summary: 'Hai visto come dichiarare, usare e manipolare array e stringhe in C++.',
    prev: '4-controllo-flusso',
    next: '6-funzioni',
    topics: ['Array', 'Stringhe', 'Manipolazione'],
    duration: '35 min',
    rating: 4.8,
    studentsCount: 0
  },
  {
    id: '6-funzioni',
    title: 'Funzioni e Scope',
    difficulty: 'intermedio',
    estimatedTime: '40 min',
    prerequisites: ['5-array'],
    description: 'Dichiarazione e definizione di funzioni, parametri, return e scope delle variabili.',
    quizId: '6-funzioni',
    summary: 'Hai imparato a scrivere funzioni e a gestire lo scope delle variabili.',
    prev: '5-array',
    next: '7-puntatori',
    topics: ['Funzioni', 'Scope', 'Parametri', 'Return'],
    duration: '40 min',
    rating: 4.6,
    studentsCount: 0
  },
  {
    id: '7-puntatori',
    title: 'Puntatori e Riferimenti',
    difficulty: 'intermedio',
    estimatedTime: '45 min',
    prerequisites: ['6-funzioni'],
    description: 'Concetti di puntatori, riferimenti e gestione della memoria.',
    quizId: '7-puntatori',
    summary: 'Hai compreso l’uso dei puntatori, dei riferimenti e la gestione della memoria.',
    prev: '6-funzioni',
    next: '8-classi',
    topics: ['Puntatori', 'Riferimenti', 'Gestione memoria'],
    duration: '45 min',
    rating: 4.9,
    studentsCount: 0
  },
  {
    id: '8-classi',
    title: 'Classi e Oggetti',
    difficulty: 'avanzato',
    estimatedTime: '50 min',
    prerequisites: ['7-puntatori'],
    description: 'Programmazione orientata agli oggetti, classi, oggetti e incapsulamento.',
    quizId: '8-classi',
    summary: 'Hai scoperto i fondamenti della programmazione a oggetti in C++.',
    prev: '7-puntatori',
    next: '9-ereditarieta',
    topics: ['Programmazione orientata agli oggetti', 'Classi', 'Oggetti', 'Incapsulamento'],
    duration: '50 min',
    rating: 4.7,
    studentsCount: 0
  },
  {
    id: '9-ereditarieta',
    title: 'Ereditarietà e Polimorfismo',
    difficulty: 'avanzato',
    estimatedTime: '55 min',
    prerequisites: ['8-classi'],
    description: 'Ereditarietà, polimorfismo, classi astratte e interfacce.',
    quizId: '9-ereditarieta',
    summary: 'Hai approfondito ereditarietà, polimorfismo e classi astratte.',
    prev: '8-classi',
    next: '10-templates',
    topics: ['Ereditarietà', 'Polimorfismo', 'Classi astratte', 'Interfacce'],
    duration: '55 min',
    rating: 4.8,
    studentsCount: 0
  },
  {
    id: '10-templates',
    title: 'Templates e STL',
    difficulty: 'avanzato',
    estimatedTime: '60 min',
    prerequisites: ['9-ereditarieta'],
    description: 'Templates, Standard Template Library e algoritmi generici.',
    quizId: '10-templates',
    summary: 'Hai imparato a usare i template e la STL per scrivere codice generico e riutilizzabile.',
    prev: '9-ereditarieta',
    next: undefined,
    topics: ['Templates', 'STL', 'Algoritmi generici'],
    duration: '60 min',
    rating: 4.9,
    studentsCount: 0
  }
]; 