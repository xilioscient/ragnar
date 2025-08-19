import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default async function GlossarioPage() {
  const filePath = path.join(process.cwd(), 'public', 'markdown', 'glossario.md');
  const content = await fs.promises.readFile(filePath, 'utf-8');
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-8 flex items-center gap-4">
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-bold">🏠 Home</Link>
          <Link href="/profilo" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-bold">👤 Profilo</Link>
        </nav>
        <h1 className="text-3xl font-bold mb-6">Glossario C++</h1>
        <p className="mb-6 text-slate-700 dark:text-slate-300">Consulta i principali termini e concetti del C++ con spiegazioni chiare e sintetiche.</p>
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
} 