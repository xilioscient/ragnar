"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { lessons } from '../data/lessons';

export default function ProfiloPage() {
  const [nome, setNome] = useState('Utente');
  const [edit, setEdit] = useState(false);
  const [lezioniCompletate, setLezioniCompletate] = useState<string[]>([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLezioniCompletate(JSON.parse(localStorage.getItem('completedLessons') || '[]'));
    }
  }, []);
  const quizFatti = lezioniCompletate.length;
  const progress = Math.round((lezioniCompletate.length / lessons.length) * 100);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-xl mx-auto py-12 px-4">
        <nav className="mb-8 flex items-center gap-4">
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-bold">🏠 Home</Link>
          <Link href="/glossario" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline font-bold">📖 Glossario</Link>
        </nav>
        <h1 className="text-3xl font-bold mb-8">Profilo Utente</h1>
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {nome.slice(0,2).toUpperCase()}
          </div>
          <div>
            {edit ? (
              <input value={nome} onChange={e => setNome(e.target.value)} className="border rounded px-2 py-1" />
            ) : (
              <div className="text-xl font-bold">{nome}</div>
            )}
            <button onClick={() => setEdit(!edit)} className="ml-2 text-blue-600 underline text-sm">{edit ? 'Salva' : 'Modifica nome'}</button>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="mb-2">Lezioni completate: <span className="font-bold text-green-600">{lezioniCompletate.length}</span> / {lessons.length}</div>
          <div>Quiz completati: <span className="font-bold text-blue-600">{quizFatti}</span></div>
          <div className="mt-4">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="text-right text-xs text-slate-500 dark:text-slate-400 mt-1">{progress}% completato</div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4">Lezioni Completate</h2>
          <ul className="space-y-2">
            {lezioniCompletate.length === 0 ? (
              <li className="text-slate-500">Nessuna lezione completata.</li>
            ) : (
              lessons.filter(l => lezioniCompletate.includes(l.id)).map(l => (
                <li key={l.id} className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>{l.title}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 