interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export const lessonQuizzes: Record<string, Quiz> = {
  'array': {
    id: 'array',
    title: 'Quiz sugli Array',
    questions: [
      {
        question: 'Come si dichiara un array di interi in C++?',
        options: [
          'int[] arr;',
          'int arr[];',
          'array<int> arr;',
          'vector<int> arr;'
        ],
        correctAnswer: 1,
        explanation: 'In C++, gli array si dichiarano specificando il tipo seguito dal nome e le parentesi quadre.'
      },
      {
        question: 'Qual è l\'indice del primo elemento di un array in C++?',
        options: ['1', '0', '-1', 'Non è definito'],
        correctAnswer: 1,
        explanation: 'In C++, gli array sono zero-based, quindi il primo elemento ha indice 0.'
      }
    ]
  },
  'puntatori': {
    id: 'puntatori',
    title: 'Quiz sui Puntatori',
    questions: [
      {
        question: 'Cosa è un puntatore in C++?',
        options: [
          'Una variabile che contiene un valore',
          'Una variabile che contiene l\'indirizzo di memoria di un\'altra variabile',
          'Un tipo di loop',
          'Un operatore matematico'
        ],
        correctAnswer: 1,
        explanation: 'Un puntatore è una variabile che memorizza l\'indirizzo di memoria di un\'altra variabile.'
      },
      {
        question: 'Come si dichiara un puntatore a un intero?',
        options: [
          'int* ptr;',
          'pointer int ptr;',
          'int ptr*;',
          'int &ptr;'
        ],
        correctAnswer: 0,
        explanation: 'La sintassi corretta è int* ptr; dove int* indica un puntatore a un intero.'
      }
    ]
  },
  '1-introduzione': {
    id: '1-introduzione',
    title: 'Quiz Introduzione al C++',
    questions: [
      {
        question: 'Quale paradigma NON è supportato dal C++?',
        options: [
          'Programmazione procedurale',
          'Programmazione orientata agli oggetti',
          'Programmazione funzionale',
          'Programmazione logica'
        ],
        correctAnswer: 3,
        explanation: 'Il C++ non supporta nativamente la programmazione logica.'
      },
      {
        question: 'Quale comando compila un file C++ chiamato main.cpp usando GCC?',
        options: [
          'gcc main.cpp',
          'g++ main.cpp -o programma',
          'cpp main.cpp',
          'compile main.cpp'
        ],
        correctAnswer: 1,
        explanation: 'Il comando corretto è g++ main.cpp -o programma.'
      }
    ]
  },
  '2-variabili-tipi': {
    id: '2-variabili-tipi',
    title: 'Quiz Variabili e Tipi di Dati',
    questions: [
      {
        question: 'Quale dichiarazione è corretta per una variabile double?',
        options: [
          'int x = 3.14;',
          'double x = 3.14;',
          'float x = 3.14;',
          'char x = 3.14;'
        ],
        correctAnswer: 1,
        explanation: 'double x = 3.14; è la dichiarazione corretta.'
      },
      {
        question: 'Cosa significa unsigned?',
        options: [
          'Permette valori negativi',
          'Permette solo valori positivi',
          'Aumenta la precisione',
          'Riduce la dimensione in memoria'
        ],
        correctAnswer: 1,
        explanation: 'unsigned permette solo valori positivi.'
      }
    ]
  },
  '3-operatori': {
    id: '3-operatori',
    title: 'Quiz Operatori',
    questions: [
      {
        question: 'Cosa fa l\'operatore ^ in C++?',
        options: [
          'Eleva a potenza',
          'Esegue XOR bitwise',
          'Calcola la radice quadrata',
          'Converte in binario'
        ],
        correctAnswer: 1,
        explanation: 'L\'operatore ^ esegue XOR bitwise.'
      },
      {
        question: 'Quale sarà il valore di x dopo l\'esecuzione di x = 5 + 3 * 2?',
        options: ['16', '11', '13', '10'],
        correctAnswer: 1,
        explanation: '3 * 2 = 6, quindi 5 + 6 = 11.'
      }
    ]
  },
  '4-controllo-flusso': {
    id: '4-controllo-flusso',
    title: 'Quiz Strutture di Controllo',
    questions: [
      {
        question: 'Quale costrutto permette di eseguire un blocco di codice solo se una condizione è vera?',
        options: ['if', 'for', 'while', 'switch'],
        correctAnswer: 0,
        explanation: 'Il costrutto if esegue il blocco solo se la condizione è vera.'
      },
      {
        question: 'Quale ciclo viene eseguito almeno una volta anche se la condizione è falsa?',
        options: ['for', 'while', 'do-while', 'foreach'],
        correctAnswer: 2,
        explanation: 'Il ciclo do-while viene eseguito almeno una volta.'
      }
    ]
  },
  '6-funzioni': {
    id: '6-funzioni',
    title: 'Quiz Funzioni e Scope',
    questions: [
      {
        question: 'Cosa permette l\'overloading delle funzioni in C++?',
        options: [
          'Definire più funzioni con lo stesso nome ma parametri diversi',
          'Definire funzioni solo con nomi diversi',
          'Definire funzioni solo in classi',
          'Non è permesso in C++'
        ],
        correctAnswer: 0,
        explanation: 'L\'overloading permette più funzioni con lo stesso nome ma parametri diversi.'
      },
      {
        question: 'Quale parola chiave si usa per dichiarare una funzione che non restituisce valore?',
        options: ['void', 'int', 'return', 'auto'],
        correctAnswer: 0,
        explanation: 'void indica che la funzione non restituisce valore.'
      }
    ]
  },
  '8-classi': {
    id: '8-classi',
    title: 'Quiz Classi e Oggetti',
    questions: [
      {
        question: 'Quale parola chiave si usa per dichiarare una classe in C++?',
        options: ['struct', 'class', 'object', 'define'],
        correctAnswer: 1,
        explanation: 'class si usa per dichiarare una classe.'
      },
      {
        question: 'Cosa rappresenta il termine "incapsulamento"?',
        options: [
          'L\'ereditarietà delle classi',
          'La possibilità di nascondere i dettagli interni di una classe',
          'La creazione di oggetti',
          'La polimorfia delle funzioni'
        ],
        correctAnswer: 1,
        explanation: 'L\'incapsulamento è la possibilità di nascondere i dettagli interni.'
      }
    ]
  },
  '9-ereditarieta': {
    id: '9-ereditarieta',
    title: 'Quiz Ereditarietà e Polimorfismo',
    questions: [
      {
        question: 'Come si dichiara l\'ereditarietà pubblica in C++?',
        options: [
          'class Derivata : Base {}',
          'class Derivata extends Base {}',
          'class Derivata inherits Base {}',
          'class Derivata : public Base {}'
        ],
        correctAnswer: 3,
        explanation: 'class Derivata : public Base {} è la sintassi corretta.'
      },
      {
        question: 'Cosa significa la parola chiave override?',
        options: [
          'Forza l\'override di un metodo',
          'Indica che si sta sovrascrivendo un metodo virtuale della classe base',
          'Impedisce l\'override di un metodo',
          'Rende il metodo virtuale'
        ],
        correctAnswer: 1,
        explanation: 'override indica che si sta sovrascrivendo un metodo virtuale.'
      }
    ]
  },
  '10-templates': {
    id: '10-templates',
    title: 'Quiz Templates e Generics',
    questions: [
      {
        question: 'Cosa permette di fare un template di funzione?',
        options: [
          'Definire funzioni generiche per diversi tipi di dato',
          'Definire solo funzioni per tipi interi',
          'Definire solo funzioni per classi',
          'Non è permesso in C++'
        ],
        correctAnswer: 0,
        explanation: 'I template permettono funzioni generiche per diversi tipi.'
      },
      {
        question: 'Quale parola chiave si usa per dichiarare un template?',
        options: ['template', 'generic', 'typename', 'concept'],
        correctAnswer: 0,
        explanation: 'template è la parola chiave corretta.'
      }
    ]
  },
  '11-stl': {
    id: '11-stl',
    title: 'Quiz STL',
    questions: [
      {
        question: 'Quale container STL permette l\'accesso casuale agli elementi?',
        options: ['vector', 'list', 'queue', 'stack'],
        correctAnswer: 0,
        explanation: 'vector permette accesso casuale.'
      },
      {
        question: 'Cosa fa std::sort?',
        options: [
          'Ordina un container',
          'Cerca un elemento',
          'Aggiunge un elemento',
          'Rimuove un elemento'
        ],
        correctAnswer: 0,
        explanation: 'std::sort ordina un container.'
      }
    ]
  },
  '12-eccezioni': {
    id: '12-eccezioni',
    title: 'Quiz Eccezioni',
    questions: [
      {
        question: 'Quale costrutto si usa per gestire le eccezioni in C++?',
        options: ['try-catch', 'if-else', 'switch', 'for'],
        correctAnswer: 0,
        explanation: 'try-catch si usa per gestire le eccezioni.'
      },
      {
        question: 'Cosa succede se non si gestisce un\'eccezione?',
        options: [
          'Il programma continua normalmente',
          'Il programma termina con errore',
          'L\'eccezione viene ignorata',
          'Viene mostrato un warning'
        ],
        correctAnswer: 1,
        explanation: 'Se non gestita, l\'eccezione termina il programma.'
      }
    ]
  },
  '13-design-patterns': {
    id: '13-design-patterns',
    title: 'Quiz Design Patterns',
    questions: [
      {
        question: 'Quale pattern permette di cambiare algoritmo a runtime?',
        options: ['Observer', 'Strategy', 'Singleton', 'Factory'],
        correctAnswer: 1,
        explanation: 'Il pattern Strategy permette di cambiare algoritmo a runtime.'
      },
      {
        question: 'Cosa fa il pattern Observer?',
        options: [
          'Gestisce la creazione di oggetti',
          'Permette la notifica di cambiamenti a più oggetti',
          'Garantisce una sola istanza',
          'Crea oggetti da una classe base'
        ],
        correctAnswer: 1,
        explanation: 'Observer notifica cambiamenti a più oggetti.'
      }
    ]
  }
};

// Quiz generale ogni 3 lezioni
export const generalQuizzes: Record<string, Quiz> = {
  'quiz-1-3': {
    id: 'quiz-1-3',
    title: 'Quiz Generale (Lezioni 1-3)',
    questions: [
      {
        question: 'Quale delle seguenti affermazioni sugli array è corretta?',
        options: [
          'Gli array possono cambiare dimensione durante l\'esecuzione',
          'Gli array hanno sempre dimensione fissa',
          'Gli array possono contenere tipi di dati diversi',
          'Gli array iniziano sempre dall\'indice 1'
        ],
        correctAnswer: 1,
        explanation: 'Gli array in C++ hanno dimensione fissa una volta dichiarati.'
      },
      {
        question: 'Cosa succede quando si dereferenzia un puntatore nullo?',
        options: [
          'Il programma continua normalmente',
          'Si ottiene un valore casuale',
          'Si verifica un errore di runtime',
          'Il programma termina con successo'
        ],
        correctAnswer: 2,
        explanation: 'Dereferenziare un puntatore nullo causa un errore di runtime (segmentation fault).'
      }
    ]
  }
}; 