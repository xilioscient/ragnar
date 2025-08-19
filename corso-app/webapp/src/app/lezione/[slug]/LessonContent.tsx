'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Quiz from '@/app/components/Quiz';
import { lessonQuizzes, generalQuizzes } from '@/app/data/quizzes';
import Link from 'next/link';
import { lessons } from '@/app/data/lessons';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface LessonContentProps {
  content: string;
  slug: string;
}

export function LessonContent({ content, slug }: LessonContentProps) {
  const lessonNumber = parseInt(slug.split('-')[0]) || 0;
  const showGeneralQuiz = lessonNumber > 0 && lessonNumber % 3 === 0;
  const generalQuizId = `quiz-${Math.floor((lessonNumber - 1) / 3) * 3 + 1}-${lessonNumber}`;
  const lesson = lessons.find(l => l.id === slug);

  // Prima di renderizzare, rimuovi la sezione 'Indice' e la sezione 'Prossimi Passi' dal markdown:
  const cleanedContent = content
    .replace(/## Indice[\s\S]*?(?=##|$)/gi, '')
    .replace(/## Prossimi Passi[\s\S]*/gi, '');

  // 1. Se lesson?.summary è presente, cerca di caricare il file /public/markdown/riassunto-[slug].md (asincrono, server component)
  // 2. Se esiste, mostra il contenuto markdown in una card elegante sotto la lezione, con ReactMarkdown e la stessa formattazione
  // 3. Se non esiste, mostra il testo summary come fallback in una card
  // 4. Mantieni la struttura delle spiegazioni delle lezioni come nei markdown originali (non alterare la formattazione markdown)
  const loadSummary = async () => {
    if (!lesson?.summary) return null;

    try {
      const response = await fetch(`/markdown/riassunto-${slug}.md`);
      if (response.ok) {
        const text = await response.text();
        return text;
      }
    } catch (error) {
      console.error(`Errore nel caricamento del riassunto per ${slug}:`, error);
    }

    return lesson.summary; // Fallback to summary if file not found
  };

  const [summaryContent, setSummaryContent] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadSummary().then(setSummaryContent);
  }, [slug]);

  // Inserisci i components custom per ReactMarkdown (come nel vecchio LessonContent)
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Errore durante la copia del codice:', err);
    }
  };
  const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const codeString = String(children).replace(/\n$/, '');
      if (inline) {
        return (
          <code className="px-2 py-1 bg-slate-800 text-emerald-400 rounded text-sm font-mono border border-slate-700" {...props}>{children}</code>
        );
      }
      return (
        <div className="relative group my-6 rounded-lg overflow-hidden border border-slate-700">
          <div className="flex items-center justify-between bg-slate-800 px-4 py-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-slate-300 text-sm font-medium ml-2">{language ? `${language.toUpperCase()}` : 'CODE'}</span>
            </div>
            <button onClick={() => copyToClipboard(codeString)} className="flex items-center gap-2 px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded transition-all duration-200 opacity-0 group-hover:opacity-100" title="Copia codice negli appunti">
              {copiedCode === codeString ? (<><Check className="h-3 w-3" />Copiato!</>) : (<><Copy className="h-3 w-3" />Copia</>)}
            </button>
          </div>
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={language || 'text'}
            PreTag="div"
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.875rem', lineHeight: '1.5' }}
            lineNumberStyle={{ color: '#6b7280', paddingRight: '1rem', userSelect: 'none' }}
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    },
    pre: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => (<h1 className="text-4xl font-bold text-white mb-8 mt-12 pb-4 border-b border-slate-700 first:mt-0" {...props}>{children}</h1>),
    h2: ({ children, ...props }: any) => (<h2 className="text-3xl font-semibold text-white mb-6 mt-10 pb-2 border-b border-slate-800" {...props}>{children}</h2>),
    h3: ({ children, ...props }: any) => (<h3 className="text-2xl font-medium text-white mb-4 mt-8" {...props}>{children}</h3>),
    h4: ({ children, ...props }: any) => (<h4 className="text-xl font-medium text-slate-200 mb-3 mt-6" {...props}>{children}</h4>),
    p: ({ children, ...props }: any) => (<p className="text-slate-300 mb-6 leading-relaxed text-lg" {...props}>{children}</p>),
    ul: ({ children, ...props }: any) => (<ul className="list-disc list-inside text-slate-300 mb-6 space-y-2 ml-4" {...props}>{children}</ul>),
    ol: ({ children, ...props }: any) => (<ol className="list-decimal list-inside text-slate-300 mb-6 space-y-2 ml-4" {...props}>{children}</ol>),
    li: ({ children, ...props }: any) => (<li className="mb-1" {...props}>{children}</li>),
    blockquote: ({ children, ...props }: any) => (<blockquote className="border-l-4 border-blue-500 bg-slate-800/50 p-6 my-6 italic text-slate-300 rounded-r-lg" {...props}><div className="text-blue-400 text-sm font-medium mb-2">💡 Nota importante</div>{children}</blockquote>),
    table: ({ children, ...props }: any) => (<div className="overflow-x-auto my-6 rounded-lg border border-slate-700"><table className="min-w-full bg-slate-800" {...props}>{children}</table></div>),
    thead: ({ children, ...props }: any) => (<thead className="bg-slate-700" {...props}>{children}</thead>),
    th: ({ children, ...props }: any) => (<th className="px-6 py-4 text-left font-semibold text-white border-b border-slate-600" {...props}>{children}</th>),
    td: ({ children, ...props }: any) => (<td className="px-6 py-4 text-slate-300 border-b border-slate-700" {...props}>{children}</td>),
    a: ({ children, href, title, ...props }: any) => {
      const isExternal = href?.startsWith('http');
      return (
        <a href={href} title={title} className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300 transition-all duration-200 inline-flex items-center gap-1" target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} {...props}>
          {children}
          {isExternal && <ExternalLink className="h-3 w-3" />}
        </a>
      );
    },
    strong: ({ children, ...props }: any) => (<strong className="font-semibold text-white" {...props}>{children}</strong>),
    em: ({ children, ...props }: any) => (<em className="italic text-slate-200" {...props}>{children}</em>),
    hr: ({ ...props }: any) => (<hr className="border-slate-700 my-8" {...props} />),
    img: ({ src, alt, title, ...props }: any) => (
      <div className="my-6">
        <img src={src} alt={alt} title={title} className="rounded-lg border border-slate-700 max-w-full h-auto mx-auto shadow-lg" {...props} />
        {alt && (<p className="text-center text-slate-400 text-sm mt-2 italic">{alt}</p>)}
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-12 flex items-center gap-4 sticky top-0 z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-xl px-6 py-3 shadow border border-slate-200 dark:border-slate-700">
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-bold">🏠 Home</Link>
          <Link href="/glossario" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline font-bold">📖 Glossario</Link>
          <Link href="/profilo" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-bold">👤 Profilo</Link>
        </nav>
        <article className="bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-2xl p-10 mb-12 border-2 border-blue-100 dark:border-blue-900">
          <div className="prose dark:prose-invert max-w-none text-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{cleanedContent}</ReactMarkdown>
          </div>
        </article>
        {summaryContent && (
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-2xl p-10 mb-12 border-2 border-blue-100 dark:border-blue-900">
            <div className="prose dark:prose-invert max-w-none text-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{summaryContent}</ReactMarkdown>
            </div>
          </div>
        )}
        {lesson?.quizId && lessonQuizzes[lesson.quizId] ? (
          <section className="bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-2xl p-10 mb-12 border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-bold text-sm border border-blue-300">Quiz Interattivo</span>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Quiz della Lezione</h2>
            </div>
            <Quiz questions={lessonQuizzes[lesson.quizId].questions} onComplete={(score) => console.log(`Quiz completato con punteggio: ${score}`)} />
        </section>
        ) : null}
        {showGeneralQuiz && generalQuizzes[generalQuizId] && (
          <section className="bg-blue-50/80 dark:bg-blue-900/40 rounded-3xl shadow-2xl p-10 border-2 border-blue-200 dark:border-blue-800 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-blue-200 text-blue-900 rounded-full font-bold text-sm border border-blue-400">Quiz Generale</span>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Quiz Generale</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-base">Questo quiz copre gli argomenti delle ultime 3 lezioni. Metti alla prova la tua comprensione!</p>
            <Quiz questions={generalQuizzes[generalQuizId].questions} onComplete={(score) => console.log(`Quiz generale completato con punteggio: ${score}`)} />
          </section>
        )}
      </div>
    </div>
  );
} 