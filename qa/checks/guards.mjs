// Guards: static scans for the hard rules in CLAUDE.md that do not need a browser.
// dist/: no design sample values (rule 4), every placeholder present exactly
// (rule 2), no dead internal links or anchors (rule 6), no external scripts
// and only allowed external hosts (rule 5).
// Repo: no em dashes in docs, comments or commit messages (rule 8), and no
// color literals in the site stylesheet (tokens.css is the only color source).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, TARGET, save } from './lib/common.mjs';

const DIST = path.join(ROOT, 'dist');
const findings = [];
const notes = [];
const read = (f) => fs.readFileSync(f, 'utf8');
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));

/* ---------- dist/ ---------- */
if (TARGET === 'design' || !fs.existsSync(DIST)) {
  notes.push('dist/ scans not run: no build yet');
} else {
  const files = walk(DIST).filter((f) => /\.(html|css|js)$/.test(f));
  const html = files.filter((f) => f.endsWith('.html'));
  const all = files.map((f) => ({ f: path.relative(ROOT, f), text: read(f) }));

  const SAMPLE = /Sample Community Church|Sample Person [AB]|person\.a@example\.org/i;
  for (const { f, text } of all) if (SAMPLE.test(text)) findings.push(`sample value in ${f}: ${text.match(SAMPLE)[0]}`);

  const placeholders = [
    ...new Set(
      read(path.join(ROOT, 'PLACEHOLDERS.md'))
        .split('\n## ')[0] // the design placeholder table; later sections list config values no page shows
        .split('\n')
        .filter((l) => l.startsWith('| ['))
        .flatMap((l) => l.split('|')[1].match(/\[[^\]]+\]/g) ?? []),
    ),
  ];
  const htmlText = html.map(read).join('\n');
  for (const p of placeholders) if (!htmlText.includes(p)) findings.push(`placeholder missing from dist/: ${p}`);
  notes.push(`placeholders checked: ${placeholders.join(' ')}`);

  // Every bracketed placeholder a page carries must be listed in PLACEHOLDERS.md.
  const listed = new Set(read(path.join(ROOT, 'PLACEHOLDERS.md')).match(/\[[A-Z0-9][^\]]*\]/g) ?? []);
  const shipped = new Set(all.flatMap(({ text }) => text.match(/\[[A-Z0-9][A-Z0-9 .,'’-]*\]/g) ?? []));
  for (const p of shipped) if (!listed.has(p)) findings.push(`placeholder in dist/ not listed in PLACEHOLDERS.md: ${p}`);

  // The mock build's service URLs must never reach the real build.
  for (const { f, text } of all) if (text.includes('/__mock/')) findings.push(`mock service URL in ${f}`);

  const ALLOWED_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com']);
  for (const file of html) {
    const pagePath = `/${path.relative(DIST, path.dirname(file)).split(path.sep).filter(Boolean).join('/')}${path.dirname(file) === DIST ? '' : '/'}`;
    const text = read(file);
    for (const m of text.matchAll(/<script\b[^>]*\bsrc="(https?:[^"]+)"/g)) findings.push(`external script in ${path.relative(ROOT, file)}: ${m[1]}`);
    for (const m of text.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
      const ref = m[1];
      if (/^(data:|mailto:|tel:)/.test(ref)) continue;
      const u = new URL(ref, `http://site.test${pagePath}`);
      if (u.host !== 'site.test') {
        if (!ALLOWED_HOSTS.has(u.host)) findings.push(`external link in ${path.relative(ROOT, file)} to ${u.host}`);
        continue;
      }
      let target = path.join(DIST, decodeURIComponent(u.pathname));
      if (u.pathname.endsWith('/')) target = path.join(target, 'index.html');
      if (!fs.existsSync(target)) {
        findings.push(`dead link in ${path.relative(ROOT, file)}: ${ref}`);
        continue;
      }
      if (u.hash && target.endsWith('.html')) {
        const id = decodeURIComponent(u.hash.slice(1));
        if (!new RegExp(`\\sid="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(read(target))) {
          findings.push(`missing anchor in ${path.relative(ROOT, file)}: ${ref}`);
        }
      }
    }
  }
}

/* ---------- repo ---------- */
const READ_ONLY = new Set(['CLAUDE.md', 'HANDOFF-SPEC.md', 'SITE-KICKOFF-PROMPT.md', 'START-HERE.md', 'tokens.css', 'package-lock.json']);
const repoFiles = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter((f) => f && !f.startsWith('design/') && !READ_ONLY.has(f) && /\.(md|mjs|js|ts|astro|css|json|html|txt)$|^\.[a-z]+$/.test(f));
const DASHES = new RegExp('[\\u2013\\u2014]'); // en and em dash, written as escapes so this file stays clean
for (const f of repoFiles) {
  const full = path.join(ROOT, f);
  if (!fs.existsSync(full)) continue;
  read(full)
    .split('\n')
    .forEach((line, i) => {
      if (DASHES.test(line)) findings.push(`em or en dash in ${f}:${i + 1}`);
    });
}
let messages = '';
try {
  messages = execFileSync('git', ['log', '--format=%H %B', 'origin/main..HEAD'], { cwd: ROOT, encoding: 'utf8' });
} catch {
  notes.push('commit messages not scanned: origin/main not available');
}
if (DASHES.test(messages)) findings.push('em or en dash in a commit message since origin/main');

const css = path.join(ROOT, 'src/styles/site.css');
if (fs.existsSync(css)) {
  read(css)
    .split('\n')
    .forEach((line, i) => {
      if (/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/.test(line)) findings.push(`color literal in src/styles/site.css:${i + 1} (use tokens.css)`);
    });
} else {
  notes.push('src/styles/site.css not present yet');
}

save('guards', {
  status: findings.length ? 'fail' : 'pass',
  summary: `${findings.length} findings; ${repoFiles.length} repo files scanned for dashes`,
  findings,
  notes,
});
