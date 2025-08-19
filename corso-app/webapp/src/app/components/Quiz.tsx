'use client';

import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number | string;
  explanation?: string;
}

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];
  const isInputQuiz = !question.options || question.options.length === 0;

  const handleAnswer = (answer: number | string) => {
    setSelectedAnswer(answer);
    let correct = false;
    if (isInputQuiz) {
      correct = String(answer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
    } else {
      correct = answer === question.correctAnswer;
    }
    setIsCorrect(correct);
    setShowExplanation(true);
    if (correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setInputValue('');
      setShowExplanation(false);
      setIsCorrect(null);
    } else {
      setQuizCompleted(true);
      onComplete && onComplete(score);
    }
  };

  if (quizCompleted) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Quiz Completato!</h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {score}/{questions.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {score === questions.length ? (
              <p className="text-green-600 dark:text-green-400">Ottimo lavoro! Hai risposto correttamente a tutte le domande!</p>
            ) : (
              <p>Continua a studiare! Puoi sempre ripetere il quiz per migliorare il tuo punteggio.</p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setInputValue('');
              setShowExplanation(false);
              setQuizCompleted(false);
              setIsCorrect(null);
              setScore(0);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Riprova Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h4 className="text-lg font-bold mb-2">Domanda {currentQuestion + 1} di {questions.length}</h4>
        <div className="mb-4 text-gray-900 dark:text-white font-medium">{question.question}</div>
        {isInputQuiz ? (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={selectedAnswer !== null}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Inserisci la tua risposta"
            />
            <button
              onClick={() => handleAnswer(inputValue)}
              disabled={selectedAnswer !== null || inputValue.trim() === ''}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Invia Risposta
            </button>
        </div>
        ) : (
      <div className="space-y-4">
            {question.options.map((option, index) => (
              <label key={index} className={`block p-4 rounded-lg border cursor-pointer transition-all duration-200 ${selectedAnswer === index ? (isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
                  className="mr-3"
                />
              {option}
              </label>
        ))}
          </div>
        )}
      </div>
      {showExplanation && (
        <div className="mt-8 p-6 rounded-2xl shadow bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-300 dark:border-blue-700 flex flex-col items-center">
          <span className={`inline-block px-3 py-1 rounded-full font-bold text-sm mb-2 ${isCorrect ? 'bg-green-200 text-green-800 border border-green-400' : 'bg-red-200 text-red-800 border border-red-400'}`}>{isCorrect ? 'Risposta corretta!' : 'Risposta errata'}</span>
          <p className="text-base text-gray-800 dark:text-gray-100 mb-4 text-center">{question.explanation || (isCorrect ? 'Risposta corretta!' : 'Riprova!')}</p>
          <button
            onClick={handleNext}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Prossima Domanda' : 'Completa Quiz'}
          </button>
        </div>
      )}
    </div>
  );
} 