'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  quizScore?: number;
}

interface ProgressContextType {
  lessons: Lesson[];
  totalScore: number;
  progress: number;
  updateLessonProgress: (lessonId: string, completed: boolean, quizScore?: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Carica il progresso da localStorage all'avvio
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
      const { lessons: savedLessons, totalScore: savedScore } = JSON.parse(savedProgress);
      setLessons(savedLessons);
      setTotalScore(savedScore);
      setProgress((savedLessons.filter((l: Lesson) => l.completed).length / savedLessons.length) * 100);
    }
  }, []);

  const updateLessonProgress = (lessonId: string, completed: boolean, quizScore?: number) => {
    setLessons(prevLessons => {
      const updatedLessons = prevLessons.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, completed, quizScore: quizScore ?? lesson.quizScore }
          : lesson
      );

      // Calcola il nuovo punteggio totale
      const newTotalScore = updatedLessons.reduce((acc, lesson) => acc + (lesson.quizScore || 0), 0);
      setTotalScore(newTotalScore);

      // Calcola il nuovo progresso
      const completedLessons = updatedLessons.filter(l => l.completed).length;
      const newProgress = (completedLessons / updatedLessons.length) * 100;
      setProgress(newProgress);

      // Salva nel localStorage
      localStorage.setItem('courseProgress', JSON.stringify({
        lessons: updatedLessons,
        totalScore: newTotalScore
      }));

      return updatedLessons;
    });
  };

  return (
    <ProgressContext.Provider value={{ lessons, totalScore, progress, updateLessonProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
} 