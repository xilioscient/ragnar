import fs from 'fs';
import path from 'path';
import { lessons } from './data/lessons';
import HomeClient from './components/HomeClient';

export default async function HomePage() {
  // Carica i file di ripasso dalla cartella markdown
  const dir = path.join(process.cwd(), 'public', 'markdown');
  const files = await fs.promises.readdir(dir);
  const ripassi = files.filter(f => f.startsWith('ripasso-'));
  const ripassiData = await Promise.all(
    ripassi.map(async (file) => {
      const content = await fs.promises.readFile(path.join(dir, file), 'utf-8');
      return { file, content };
    })
  );
  return <HomeClient lessons={lessons} ripassi={ripassiData} />;
} 