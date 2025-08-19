"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Clock, Award, ChevronRight, Play, CheckCircle2, Circle, Target, Search, Filter, User, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lesson as LessonType } from '../data/lessons';

interface Ripasso {
  file: string;
  content: string;
}

interface HomeClientProps {
  lessons: LessonType[];
  ripassi: Ripasso[];
}

export default function HomeClient({ lessons, ripassi }: HomeClientProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)));
    }
  }, []);

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lesson.topics && lesson.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesDifficulty = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, selectedDifficulty, lessons]);

  const stats = useMemo(() => {
    const total = lessons.length;
    const completed = completedLessons.size;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    return {
      total,
      completed,
      progress: Math.round(progress),
      remaining: total - completed
    };
  }, [completedLessons, lessons]);

  const toggleLessonCompletion = (lessonId: string) => {
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setCompletedLessons(newCompleted);
    localStorage.setItem('completedLessons', JSON.stringify([...newCompleted]));
  };

  const difficultyConfig = {
    all: { label: 'Tutte', color: 'bg-slate-200 text-slate-700', icon: '📚' },
    base: { label: 'Base', color: 'bg-emerald-100 text-emerald-700', icon: '🌱' },
    intermedio: { label: 'Intermedio', color: 'bg-amber-100 text-amber-700', icon: '🔥' },
    avanzato: { label: 'Avanzato', color: 'bg-pink-100 text-pink-700', icon: '⚡' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 rounded hover:bg-blue-100 dark:hover:bg-slate-800" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Book className="h-6 w-6 text-blue-600" />
          </button>
          <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl text-blue-700 dark:text-blue-300 tracking-tight">
            <BookOpen className="h-7 w-7" />
            C++ Corso
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/profilo" className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition text-sm"><User className="h-5 w-5" /> Profilo</Link>
          <Link href="/glossario" className="inline-flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition text-sm"><Book className="h-5 w-5" /> Glossario</Link>
        </div>
      </header>

      {/* Sidebar (desktop & mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 p-6 z-50 shadow-xl lg:static lg:block lg:translate-x-0">
            <h2 className="text-lg font-bold mb-4">Indice Lezioni</h2>
            <ul className="space-y-2">
              {lessons.map((l: LessonType) => (
                <li key={l.id}>
                  <Link href={`/lezione/${l.id}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
            <button className="mt-8 block lg:hidden w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition" onClick={() => setSidebarOpen(false)}>Chiudi</button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-900 shadow-xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Impara il C++<br /><span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">in modo interattivo</span></h1>
        <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">Lezioni, quiz, riassunti e glossario per diventare un esperto di C++ da zero ad avanzato.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#lezioni" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-100 transition text-lg">Inizia ora</Link>
          <Link href="#ripassi" className="px-8 py-4 bg-yellow-400 text-yellow-900 font-bold rounded-xl shadow-lg hover:bg-yellow-300 transition text-lg">Vai ai ripassi</Link>
        </div>
      </section>

      {/* Progress Circle */}
      <section className="flex flex-col items-center justify-center py-10">
        <div className="relative w-40 h-40 mb-4">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e7ef" strokeWidth="10" />
            <motion.circle
              cx="50" cy="50" r="45" fill="none" stroke="#6366f1" strokeWidth="10" strokeDasharray={2 * Math.PI * 45} strokeDashoffset={2 * Math.PI * 45 * (1 - stats.progress / 100)}
              initial={{ strokeDashoffset: 2 * Math.PI * 45 }} animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - stats.progress / 100) }} transition={{ duration: 1 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">{stats.progress}%</span>
            <span className="text-sm text-slate-500 dark:text-slate-300">Completato</span>
          </div>
        </div>
        <div className="flex gap-6 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-blue-700 dark:text-blue-300">{stats.completed}</span>
            <span className="text-xs text-slate-500">Lezioni completate</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-slate-700 dark:text-slate-300">{stats.remaining}</span>
            <span className="text-xs text-slate-500">Rimanenti</span>
          </div>
        </div>
      </section>

      {/* Filtri e Ricerca */}
      <section className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 flex items-center bg-white dark:bg-slate-800 rounded-xl shadow px-4 py-2 border border-slate-200 dark:border-slate-700">
          <Search className="h-5 w-5 text-slate-400 mr-2" />
          <input type="text" placeholder="Cerca lezione o argomento..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-transparent outline-none text-slate-700 dark:text-white placeholder:text-slate-400" />
        </div>
        <div className="flex gap-2">
          {Object.entries(difficultyConfig).map(([key, val]) => (
            <button key={key} onClick={() => setSelectedDifficulty(key)} className={`flex items-center gap-1 px-3 py-2 rounded-lg font-bold text-sm transition border-2 ${selectedDifficulty === key ? 'border-blue-600 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
              <span>{val.icon}</span> {val.label}
            </button>
          ))}
        </div>
      </section>

      {/* Ripassi Section */}
      <section id="ripassi" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-700 dark:text-blue-300 flex items-center gap-2"><Book className="h-7 w-7" /> Ripassi</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ripassi.map((ripasso: Ripasso, index: number) => (
            <li key={ripasso.file} className="relative group bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900 rounded-3xl shadow-2xl p-8 border-2 border-blue-200 dark:border-blue-700 flex flex-col justify-between h-full overflow-hidden">
              <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold shadow">Ripasso</span>
              <div>
                <h3 className="font-bold mb-2 text-xl text-blue-700 dark:text-blue-200 group-hover:underline transition">{ripasso.file.replace('.md','').replace('ripasso-','Ripasso ')}</h3>
                <div className="prose dark:prose-invert max-w-none mb-4 text-base">
                  <ReactMarkdown>{ripasso.content.slice(0, 180) + '...'}</ReactMarkdown>
                </div>
              </div>
              <Link href={`/ripasso/${ripasso.file.replace('.md','')}`} className="mt-2 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow">Apri ripasso</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Lessons Grid */}
      <section id="lezioni" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-700 dark:text-blue-300 flex items-center gap-2"><BookOpen className="h-7 w-7" /> Lezioni</h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredLessons.map((lesson: LessonType, index: number) => {
                const config = difficultyConfig[lesson.difficulty as keyof typeof difficultyConfig] || difficultyConfig.all;
                const isCompleted = completedLessons.has(lesson.id);
                const isHovered = hoveredLesson === lesson.id;
                return (
                  <motion.div key={lesson.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8, scale: 1.03 }} onHoverStart={() => setHoveredLesson(lesson.id)} onHoverEnd={() => setHoveredLesson(null)} className="group relative">
                    <div className={`relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border-2 transition-all duration-300 ${isCompleted ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'} ${isHovered ? 'shadow-3xl scale-105' : ''}`}>
                      {/* Completion Status */}
                      <div className="absolute top-4 right-4">
                        <button onClick={(e) => { e.preventDefault(); toggleLessonCompletion(lesson.id); }} className="p-1 rounded-full transition-all duration-200 hover:scale-110">
                          {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                          ) : (
                            <Circle className="h-6 w-6 text-slate-400 hover:text-blue-600" />
                          )}
                        </button>
                      </div>
                      {/* Difficulty Badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${config.color} shadow`}>
                        <span>{config.icon}</span>
                        {config.label}
                      </div>
                      {/* Content */}
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {lesson.title}
                        {lesson.quizId && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Quiz</span>}
                        {lesson.summary && <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Riassunto</span>}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 text-base">
                        {lesson.description}
                      </p>
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {lesson.duration}
                        </div>
                      </div>
                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {lesson.topics && lesson.topics.slice(0, 3).map((topic: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs">
                            {topic}
                          </span>
                        ))}
                        {lesson.topics && lesson.topics.length > 3 && (
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-md text-xs">
                            +{lesson.topics.length - 3}
                          </span>
                        )}
                      </div>
                      {/* Prerequisites */}
                      {lesson.prerequisites && lesson.prerequisites.length > 0 && (
                        <div className="mb-4">
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Prerequisiti:</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            {lesson.prerequisites.join(', ')}
                          </div>
                        </div>
                      )}
                      {/* Action Button */}
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href={`/lezione/${lesson.id}`} className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${isCompleted ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'}`}>
                          {isCompleted ? (
                            <>
                              <Award className="h-5 w-5" />
                              Rivedi Lezione
                            </>
                          ) : (
                            <>
                              <Play className="h-5 w-5" />
                              Inizia Lezione
                            </>
                          )}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </motion.div>
                      {/* Hover Effect Overlay */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl pointer-events-none" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 