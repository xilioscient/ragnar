'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Lazy load del componente Quiz per evitare problemi SSR
const Quiz = dynamic(() => import('./Quiz'), { ssr: false });

// Mappa degli id delle lezioni ai quiz (puoi spostare i dati in un file separato)
const quizData: Record<string, {
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
}> = {
  '1-introduzione': {
    questions: [
      {
        question: "Quale delle seguenti affermazioni sul C++ è corretta?",
        options: [
          "Il C++ è un linguaggio interpretato",
          "Il C++ è un linguaggio compilato",
          "Il C++ non supporta la programmazione orientata agli oggetti",
          "Il C++ non può essere utilizzato per applicazioni di sistema"
        ],
        correctAnswer: 1,
        explanation: "Il C++ è un linguaggio compilato, il che significa che il codice sorgente viene tradotto in codice macchina prima dell'esecuzione."
      },
      {
        question: "Cosa fa l'operatore `<<` in C++?",
        options: [
          "Esegue una divisione",
          "Inserisce dati in un flusso di output",
          "Confronta due valori",
          "Assegna un valore a una variabile"
        ],
        correctAnswer: 1,
        explanation: "L'operatore `<<` è utilizzato per inserire dati in un flusso di output, come `std::cout`."
      }
    ]
  },
  // ...aggiungi qui altri quiz per altri id...
};

interface QuizInterattivoProps {
  id: string;
}

export default function QuizInterattivo({ id }: QuizInterattivoProps) {
  const quiz = quizData[id];
  if (!quiz) {
    return (
      <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded mb-6 text-yellow-800 dark:text-yellow-200">
        Quiz non disponibile per questa lezione.
      </div>
    );
  }
  return (
    <Quiz
      questions={quiz.questions}
      onComplete={() => {}} // Puoi gestire il punteggio qui se vuoi
    />
  );
}
