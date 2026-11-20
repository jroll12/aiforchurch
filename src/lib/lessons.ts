/*
 * Reads the course lessons in each course/modules folder (lesson.md) for the member pages.
 * The lessons follow the fixed shape in course/STYLE.md, so this reads only
 * that shape: front matter, ## sections, numbered steps, ### headings,
 * paragraphs, list items and inline **bold**, `code` and [links](..).
 * No markdown dependency: Astro's pipeline would reject the repeated
 * `trap:` keys in the front matter.
 */
import fs from 'node:fs';
import path from 'node:path';

const MODULES = path.join(process.cwd(), 'course/modules');

export interface Download {
  name: string;
  description: string;
  file: string; // handout.md or samples/
}

export interface Lesson {
  dir: string; // 01-newsletter
  slug: string; // newsletter (the route, /topics/newsletter/)
  topic: number;
  title: string;
  duration: string;
  outcome: string;
  status: string;
  next: string | null;
  idea: { heading: string; text: string[] };
  steps: string[];
  watch: { title: string; text: string[] };
  habit: { title: string; text: string[] };
  safety: string[];
  downloads: Download[];
}

function sections(body: string) {
  const out = new Map<string, string[]>();
  let cur: string[] | null = null;
  for (const line of body.split('\n')) {
    const h = line.match(/^## (.+)$/);
    if (h) {
      cur = [];
      out.set(h[1].trim(), cur);
    } else if (cur) cur.push(line);
  }
  return out;
}

/** Paragraphs of a section, without ### headings or list items. */
const paragraphs = (lines: string[]) =>
  lines
    .join('\n')
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p && !p.startsWith('### ') && !/^(\d+\.|-) /.test(p));

const heading3 = (lines: string[]) => (lines.find((l) => l.startsWith('### ')) ?? '').slice(4).trim();

export function readLesson(dir: string): Lesson {
  const text = fs.readFileSync(path.join(MODULES, dir, 'lesson.md'), 'utf8');
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  const meta: Record<string, string> = {};
  for (const line of (m?.[1] ?? '').split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv && kv[1] !== 'trap') meta[kv[1]] = kv[2].trim();
  }
  const s = sections(m ? text.slice(m[0].length) : text);
  const ideaHeading = [...s.keys()].find((k) => k.startsWith('The idea')) ?? 'The idea, 5 minutes';
  const downloads = (s.get('Downloads') ?? [])
    .map((l) => l.match(/^- \[([^\]]+)\]\(([^)]+)\):\s*(.*)$/))
    .filter((x): x is RegExpMatchArray => Boolean(x))
    .map((x) => ({ name: x[1], file: x[2], description: x[3].trim() }));
  return {
    dir,
    slug: dir.replace(/^\d\d-/, ''),
    topic: Number(meta.topic),
    title: meta.title,
    duration: meta.duration,
    outcome: meta.outcome,
    status: meta.status,
    next: meta.next || null,
    idea: { heading: ideaHeading, text: paragraphs(s.get(ideaHeading) ?? []) },
    steps: (s.get('The exercise') ?? []).filter((l) => /^\d+\.\s/.test(l)).map((l) => l.replace(/^\d+\.\s+/, '').trim()),
    watch: { title: heading3(s.get('Watch for this') ?? []), text: paragraphs(s.get('Watch for this') ?? []) },
    habit: { title: heading3(s.get('The habit') ?? []), text: paragraphs(s.get('The habit') ?? []) },
    safety: paragraphs(s.get('Data safety') ?? []),
    downloads,
  };
}

export function allLessons(): Lesson[] {
  return fs
    .readdirSync(MODULES)
    .filter((d) => /^\d\d-/.test(d) && fs.existsSync(path.join(MODULES, d, 'lesson.md')))
    .sort()
    .map(readLesson);
}

/** Inline markdown in lesson text: escape, then **bold**, `code` and [links](..) as plain text. */
export function inline(text: string): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/** The sample files in a module, for the zip and the Resources page. */
export function sampleFiles(dir: string): string[] {
  const base = path.join(MODULES, dir, 'samples');
  return fs.existsSync(base) ? fs.readdirSync(base).filter((f) => !f.startsWith('.')).sort() : [];
}

export const downloadPath = (slug: string, kind: 'handout' | 'samples') =>
  kind === 'handout' ? `/downloads/${slug}-handout.pdf` : `/downloads/${slug}-sample-files.zip`;
