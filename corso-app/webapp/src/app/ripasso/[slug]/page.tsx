import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default async function RipassoPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'public', 'markdown', `${params.slug}.md`);
  const content = await fs.promises.readFile(filePath, 'utf-8');
  // Carica tutti i ripassi per sidebar
  const dir = path.join(process.cwd(), 'public', 'markdown');
  const files = await fs.promises.readdir(dir);
  const ripassi = files.filter(f => f.startsWith('ripasso-'));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-8 flex items-center gap-4 justify-between">
          <div className="flex gap-4">
            <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-bold">🏠 Home</Link>
            <Link href="/glossario" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline font-bold">📖 Glossario</Link>
            <Link href="/profilo" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-bold">👤 Profilo</Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex gap-2 text-xs">
              {ripassi.map(r => (
                <li key={r}>
                  <Link href={`/ripasso/${r.replace('.md','')}`} className={`px-2 py-1 rounded ${params.slug+'.md' === r ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800'}`}>{r.replace('.md','').replace('ripasso-','Ripasso ')}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
} 