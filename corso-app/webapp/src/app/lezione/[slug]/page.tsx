import { promises as fs } from 'fs';
import path from 'path';
import { LessonContent } from './LessonContent';

interface LessonPageProps {
  params: {
    slug: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const slug = await Promise.resolve(params.slug);
  const filePath = path.join(process.cwd(), 'public', 'markdown', `${slug}.md`);
  
  let content = '';
  try {
    content = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`File non trovato per la lezione ${slug}`);
    content = '# Lezione non trovata\n\nLa lezione richiesta non è disponibile.';
  }

  return <LessonContent content={content} slug={slug} />;
} 