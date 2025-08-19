'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, BookOpen, Clock, Star, TrendingUp, Award, ChevronRight, Play, CheckCircle2, Circle, Zap, Target, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'base' | 'intermedio' | 'avanzato';
  duration: string;
  topics: string[];
  prerequisites?: string[];
  completed?: boolean;
  rating?: number;
  studentsCount?: number;
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduzione al C++',
    description: 'Scopri le basi del linguaggio C++, la sua storia e le sue caratteristiche principali.',
    difficulty: 'base',
    duration: '45 min',
    topics: ['Sintassi base', 'Compilazione', 'Hello World'],
    rating: 4.8,
    studentsCount: 1250
  },
  {
    id: '2',
    title: 'Variabili e Tipi di Dati',
    description: 'Impara a dichiarare variabili e utilizzare i diversi tipi di dati in C++.',
    difficulty: 'base',
    duration: '60 min',
    topics: ['int', 'float', 'char', 'string', 'bool'],
    prerequisites: ['Introduzione al C++'],
    rating: 4.7,
    studentsCount: 980
  },
  {
    id: '3',
    title: 'Puntatori e Riferimenti',
    description: 'Comprendi i concetti avanzati di puntatori e riferimenti per la gestione della memoria.',
    difficulty: 'intermedio',
    duration: '90 min',
    topics: ['Puntatori', 'Riferimenti', 'Gestione memoria'],
    prerequisites: ['Variabili e Tipi di Dati'],
    rating: 4.6,
    studentsCount: 750
  },
  {
    id: '4',
    title: 'Template e Metaprogrammazione',
    description: 'Esplora le tecniche avanzate di template e metaprogrammazione in C++.',
    difficulty: 'avanzato',
    duration: '120 min',
    topics: ['Template', 'SFINAE', 'Concepts'],
    prerequisites: ['Puntatori e Riferimenti'],
    rating: 4.9,
    studentsCount: 420
  }
];

const difficultyConfig = {
  base: {
    label: 'Base',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    icon: '🌱'
  },
  intermedio: {
    label: 'Intermedio',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    textColor: 'text-amber-700 dark:text-amber-300',
    borderColor: 'border-amber-200 dark:border-amber-800',
    icon: '🔥'
  },
  avanzato: {
    label: 'Avanzato',
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    textColor: 'text-red-700 dark:text-red-300',
    borderColor: 'border-red-200 dark:border-red-800',
    icon: '⚡'
  }
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)));
    }
  }, []);

  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lesson.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, selectedDifficulty]);

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
  }, [completedLessons]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Corso Interattivo
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                C++ Moderno
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Impara il C++ con lezioni interattive, esempi pratici e progetti reali. 
              Dal livello base all'avanzato.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-blue-200 text-sm">Lezioni Totali</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="text-2xl font-bold text-white">{stats.completed}</div>
                <div className="text-blue-200 text-sm">Completate</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="text-2xl font-bold text-white">{stats.progress}%</div>
                <div className="text-blue-200 text-sm">Progresso</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="text-2xl font-bold text-white">{stats.remaining}</div>
                <div className="text-blue-200 text-sm">Rimanenti</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Il Tuo Progresso
              </h2>
              <span className="text-2xl font-bold text-blue-600">{stats.progress}%</span>
            </div>
            
            <div className="relative">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mt-2">
              <span>{stats.completed} di {stats.total} lezioni completate</span>
              <span>{stats.remaining} rimanenti</span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cerca lezioni, argomenti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500"
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-all duration-200 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              >
                <Filter className="h-5 w-5" />
                Filtri
              </button>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
                >
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedDifficulty('all')}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                        selectedDifficulty === 'all'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      Tutti i livelli
                    </button>
                    
                    {Object.entries(difficultyConfig).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedDifficulty(key)}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                          selectedDifficulty === key
                            ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                            : `${config.bgColor} ${config.textColor} hover:shadow-md`
                        }`}
                      >
                        <span>{config.icon}</span>
                        {config.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredLessons.map((lesson, index) => {
                const config = difficultyConfig[lesson.difficulty];
                const isCompleted = completedLessons.has(lesson.id);
                const isHovered = hoveredLesson === lesson.id;

                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onHoverStart={() => setHoveredLesson(lesson.id)}
                    onHoverEnd={() => setHoveredLesson(null)}
                    className="group relative"
                  >
                    <div className={`
                      relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border-2 transition-all duration-300
                      ${isCompleted 
                        ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20' 
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                      }
                      ${isHovered ? 'shadow-2xl' : ''}
                    `}>
                      
                      {/* Completion Status */}
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => toggleLessonCompletion(lesson.id)}
                          className="p-1 rounded-full transition-all duration-200 hover:scale-110"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                          ) : (
                            <Circle className="h-6 w-6 text-slate-400 hover:text-blue-600" />
                          )}
                        </button>
                      </div>

                      {/* Difficulty Badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${config.bgColor} ${config.textColor}`}>
                        <span>{config.icon}</span>
                        {config.label}
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {lesson.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                        {lesson.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {lesson.duration}
                        </div>
                        
                        {lesson.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            {lesson.rating}
                          </div>
                        )}
                        
                        {lesson.studentsCount && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            {lesson.studentsCount}
                          </div>
                        )}
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {lesson.topics.slice(0, 3).map((topic, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                        {lesson.topics.length > 3 && (
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
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200
                          ${isCompleted
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                          }
                        `}
                      >
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
                      </motion.button>

                      {/* Hover Effect Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl pointer-events-none"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredLessons.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Nessuna lezione trovata
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Prova a modificare i filtri di ricerca o esplora tutte le lezioni disponibili.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}