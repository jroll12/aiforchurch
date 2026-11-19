// Course lessons (course/modules/*): the rules in course/STYLE.md that a
// script can check. Course content is not part of the site; this check keeps
// it honest and consistent with the site and the designed Topic page.
//   node qa/checks/course.mjs           checks course/
//   node qa/checks/course.mjs --proof   runs on a fixture module that breaks each rule
// Checks:
//   - front matter fields; sections in the designed order; exactly 4 steps
//   - title and outcome equal the site's (src/copy.ts); duration fits the agenda
//   - Topic 1 holds the designed lesson text verbatim (design/topic-c-desktop.dc.html)
//   - every linked file exists; next links point at the next module
//   - every file in samples/ and examples/ starts with a FAKE line
//   - each declared trap appears in its sample file; the flaw appears in the flawed draft
//   - emails only at example.org; phone numbers only 555-01xx
//   - handout: one page (450 words at most), a "Prompts to paste" section with fenced prompts
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, save } from './lib/common.mjs';

const proof = process.argv.includes('--proof');
const COURSE = proof ? path.join(ROOT, 'qa/checks/fixtures/course-bad') : path.join(ROOT, 'course');
const MODULES = path.join(COURSE, 'modules');
const name = proof ? 'course.proof' : 'course';

const SECTIONS = ['The idea, 5 minutes', 'The exercise', 'Watch for this', 'The habit', 'Data safety', 'Downloads', 'Next'];
const DURATIONS = { 1: 30, 2: 30, 3: 30, 4: 20, 5: 20, 6: 20, 7: 20 }; // course/STYLE.md, the agenda in src/copy.ts
const read = (f) => fs.readFileSync(f, 'utf8');
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const findings = [];
const add = (module, rule, detail) => findings.push({ module, rule, detail });

/* ---------- the site's titles and outcomes (src/copy.ts) ---------- */
const copy = read(path.join(ROOT, 'src/copy.ts'));
const siteTopics = Object.fromEntries(
  [...copy.matchAll(/\{ num: '0(\d)', title: '([^']+)', outcome: '([^']+)' \}/g)].map((m) => [Number(m[1]), { title: m[2], outcome: m[3] }]),
);

/* ---------- the designed Topic 1 text (design/topic-c-desktop.dc.html) ---------- */
function designedTopic1() {
  const html = read(path.join(ROOT, 'design/topic-c-desktop.dc.html'));
  const main = html.slice(html.indexOf('<main>'), html.indexOf('</main>'));
  const UI = new Set(['Topic 1 of 7', '01', '2 of 4 steps done', 'You are here', 'Download', 'Next', 'Next topic', 'The exercise', 'Watch for this', 'The habit', 'Data safety', 'Downloads', '1', '2', '3', '4', 'Church AI use policy']);
  return main
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .split(/<[^>]+>/)
    .map(norm)
    .map((t) => t.replace(/&amp;/g, '&'))
    .filter((t) => t && !UI.has(t));
}

/* ---------- parsing ---------- */
function parseLesson(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = { trap: [] };
  if (m) {
    for (const line of m[1].split('\n')) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (!kv) continue;
      if (kv[1] === 'trap') meta.trap.push(kv[2]);
      else meta[kv[1]] = kv[2].trim();
    }
  }
  const body = m ? text.slice(m[0].length) : text;
  const sections = [];
  let cur = null;
  for (const line of body.split('\n')) {
    const h = line.match(/^## (.+)$/);
    if (h) {
      cur = { heading: h[1].trim(), lines: [] };
      sections.push(cur);
    } else if (cur) cur.lines.push(line);
  }
  return { meta, hasFront: Boolean(m), body, sections };
}

const walk = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)])) : []);

/* ---------- per module ---------- */
const dirs = fs.existsSync(MODULES) ? fs.readdirSync(MODULES).filter((d) => /^\d\d-/.test(d)).sort() : [];
if (!dirs.length) add('(none)', 'modules exist', `no modules in ${path.relative(ROOT, MODULES)}`);
const summary = [];

for (const dir of dirs) {
  const base = path.join(MODULES, dir);
  const lessonFile = path.join(base, 'lesson.md');
  if (!fs.existsSync(lessonFile)) {
    add(dir, 'lesson exists', 'no lesson.md');
    continue;
  }
  const text = read(lessonFile);
  const { meta, hasFront, body, sections } = parseLesson(text);
  const n = Number(meta.topic);
  if (!hasFront) add(dir, 'front matter', 'missing');
  for (const k of ['topic', 'slug', 'title', 'duration', 'outcome', 'status', 'flaw']) if (!meta[k]) add(dir, 'front matter', `missing ${k}`);
  if (!meta.trap.length) add(dir, 'front matter', 'no trap lines');
  if (meta.slug && meta.slug !== dir) add(dir, 'front matter', `slug ${meta.slug} is not the folder name`);
  if (meta.status && !['draft', 'approved'].includes(meta.status)) add(dir, 'front matter', `status must be draft or approved, not ${meta.status}`);

  // Site consistency
  const site = siteTopics[n];
  if (!site) add(dir, 'matches the site', `topic ${meta.topic} is not on the site`);
  else {
    if (meta.title !== site.title) add(dir, 'matches the site', `title "${meta.title}" is not the site's "${site.title}"`);
    // Topic 1's outcome is the designed Topic page's (checked verbatim below). For the others the
    // lesson outcome is the site's card line after "By the end, you can".
    const wantOutcome = `By the end, you can ${site.outcome.charAt(0).toLowerCase()}${site.outcome.slice(1)}`;
    if (n !== 1 && meta.outcome !== wantOutcome) add(dir, 'matches the site', `outcome "${meta.outcome}" is not "${wantOutcome}"`);
  }
  if (meta.outcome && !meta.outcome.startsWith('By the end, you can')) add(dir, 'outcome', 'must start "By the end, you can"');
  const minutes = Number((meta.duration ?? '').match(/^About (\d+) minutes$/)?.[1]);
  if (!minutes) add(dir, 'duration', `"${meta.duration}" is not "About N minutes"`);
  else if (DURATIONS[n] && minutes !== DURATIONS[n]) add(dir, 'duration', `${minutes} minutes; the agenda allows ${DURATIONS[n]}`);
  summary.push({ module: dir, topic: n, minutes, status: meta.status });

  // Sections in order
  const headings = sections.map((s) => s.heading).filter((h) => h !== 'Facilitator notes');
  const want = n === 7 ? SECTIONS.slice(0, -1) : SECTIONS;
  if (JSON.stringify(headings) !== JSON.stringify(want)) add(dir, 'sections', `found [${headings.join(' | ')}], want [${want.join(' | ')}]`);
  const sec = (h) => sections.find((s) => s.heading === h)?.lines.join('\n') ?? '';
  const steps = sec('The exercise').split('\n').filter((l) => /^\d+\.\s/.test(l));
  if (steps.length !== 4) add(dir, 'exercise', `${steps.length} numbered steps; want exactly 4`);
  for (const h of ['Watch for this', 'The habit']) {
    const s = sec(h);
    if (!/^### .+\.\s*$/m.test(s)) add(dir, h, 'needs a ### heading ending with a full stop');
    if (norm(s.replace(/^### .*$/m, '')).length < 40) add(dir, h, 'needs a paragraph under the heading');
  }
  if (norm(sec('Data safety')).length < 20) add(dir, 'data safety', 'empty');

  // Links
  for (const m of body.matchAll(/\]\(([^)]+)\)/g)) {
    const target = path.join(base, m[1]);
    if (/^https?:/.test(m[1])) continue;
    if (!fs.existsSync(target)) add(dir, 'links', `${m[1]} does not exist`);
  }
  const dl = sec('Downloads');
  if (!/\]\(handout\.md\)/.test(dl)) add(dir, 'downloads', 'no link to handout.md');
  if (!/\]\(samples\/?\)/.test(dl)) add(dir, 'downloads', 'no link to samples/');
  if (n < 7) {
    if (!meta.next) add(dir, 'next', 'no next in front matter');
    else if (meta.next !== dirs[dirs.indexOf(dir) + 1]) add(dir, 'next', `next is ${meta.next}, but the next module is ${dirs[dirs.indexOf(dir) + 1] ?? 'none'}`);
    if (meta.next && !new RegExp(`\\]\\(\\.\\./${meta.next}/lesson\\.md\\)`).test(sec('Next'))) add(dir, 'next', 'Next section does not link to the next lesson');
  }

  // Topic 1: designed text verbatim
  if (n === 1) {
    const lessonText = norm(text);
    for (const t of designedTopic1()) if (!lessonText.includes(t)) add(dir, 'designed text', `missing verbatim: "${t.slice(0, 80)}"`);
  }

  // Files: FAKE first lines, traps, flaw, contact data
  const files = [...walk(path.join(base, 'samples')), ...walk(path.join(base, 'examples'))];
  if (!walk(path.join(base, 'samples')).length) add(dir, 'samples', 'no sample files');
  for (const f of files) {
    const first = read(f).split('\n')[0];
    if (!/FAKE/.test(first)) add(dir, 'FAKE label', `${path.relative(base, f)} does not start with a FAKE line`);
  }
  for (const t of meta.trap) {
    const [file, needle] = t.split(' :: ').map((s) => s?.trim());
    const f = path.join(base, file ?? '');
    if (!file || !needle) add(dir, 'trap', `malformed trap line "${t}"`);
    else if (!fs.existsSync(f)) add(dir, 'trap', `${file} does not exist`);
    else if (!read(f).includes(needle)) add(dir, 'trap', `${file} does not contain "${needle}"`);
  }
  const flawed = path.join(base, 'examples/flawed-draft.md');
  if (!fs.existsSync(flawed)) add(dir, 'flawed draft', 'no examples/flawed-draft.md');
  else if (meta.flaw && !read(flawed).includes(meta.flaw)) add(dir, 'flawed draft', `does not contain the flaw "${meta.flaw}"`);
  for (const f of [lessonFile, ...files, path.join(base, 'handout.md')].filter((x) => fs.existsSync(x))) {
    const t = read(f);
    for (const m of t.matchAll(/[\w.+-]+@([\w-]+(?:\.[\w-]+)+)/g)) if (m[1].toLowerCase() !== 'example.org') add(dir, 'contact data', `${path.relative(base, f)}: email at ${m[1]}`);
    for (const m of t.matchAll(/\b(\d{3})[-.](\d{4})\b/g)) if (!(m[1] === '555' && /^01\d\d$/.test(m[2]))) add(dir, 'contact data', `${path.relative(base, f)}: phone ${m[0]} is not 555-01xx`);
  }

  // Handout
  const handout = path.join(base, 'handout.md');
  if (!fs.existsSync(handout)) add(dir, 'handout', 'no handout.md');
  else {
    const h = read(handout);
    const words = h.replace(/```[\s\S]*?```/g, (b) => b).split(/\s+/).filter(Boolean).length;
    if (words > 450) add(dir, 'handout', `${words} words; one page is 450 at most`);
    if (!/^# /.test(h)) add(dir, 'handout', 'must start with a # title');
    const prompts = h.split(/^## /m).find((s) => s.startsWith('Prompts to paste'));
    if (!prompts) add(dir, 'handout', 'no "## Prompts to paste" section');
    else if (!/```[\s\S]+?```/.test(prompts)) add(dir, 'handout', 'Prompts to paste has no fenced prompt');
  }
}

// Agenda totals
const total = (from, to) => summary.filter((s) => s.topic >= from && s.topic <= to).reduce((t, s) => t + (s.minutes || 0), 0);
if (total(1, 3) > 90) add('(all)', 'agenda', `topics 1 to 3 take ${total(1, 3)} minutes; the slot is 90`);
if (total(4, 7) > 80) add('(all)', 'agenda', `topics 4 to 7 take ${total(4, 7)} minutes; the slot is 90 with 10 for questions`);

if (proof) {
  // The fixture module breaks one of each rule; every rule must be caught.
  const want = ['front matter', 'matches the site', 'duration', 'sections', 'exercise', 'links', 'FAKE label', 'trap', 'flawed draft', 'contact data', 'handout'];
  const caught = want.filter((r) => findings.some((f) => f.rule === r));
  save(name, {
    status: caught.length === want.length ? 'pass' : 'fail',
    summary: `proof fixture: caught ${caught.length} of ${want.length} rules (${want.filter((r) => !caught.includes(r)).join(', ') || 'all caught'})`,
    findings,
  });
} else {
  save(name, {
    status: findings.length ? 'fail' : 'pass',
    summary: `${dirs.length} modules checked; ${findings.length} findings; topics 1 to 3 take ${total(1, 3)} of 90 minutes, topics 4 to 7 take ${total(4, 7)} of 80`,
    findings,
    modules: summary,
  });
}
