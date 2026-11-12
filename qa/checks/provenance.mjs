// Copy provenance for the six derived pages (CLAUDE.md hard rule 1: do not
// change, add or rewrite copy). They have no artboards, so a text diff is
// impossible. Instead every piece of text a person can see or hear must come
// from somewhere allowed:
//   design    exact text from any artboard in design/ (typographic apostrophes included)
//   spec      words HANDOFF-SPEC.md sections 1 and 7 prescribe ("You are in.", "What to bring")
//   approved  a row marked approved in qa/stage2-copy-draft.md
//   data      the visitor's own registration (test data seeded by the check)
//   pattern   a derived pattern listed below, with its reason
// Placeholders ([LIKE THIS]) are allowed only if PLACEHOLDERS.md lists them.
// Hidden state blocks ([data-state]) and accessible names are checked too.
// Spec-sourced strings are listed in the result so Jarret can confirm them.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, TARGET, SCREENS, DERIVED, STATE, LAYOUT_WIDTHS, designPath, server, browser, open, save, extractLines } from './lib/common.mjs';

const PATTERNS = [
  { re: /^Step 3 of 3$/, reason: 'Review is the third step; the pattern of the designed "Step 2 of 3" (qa/questions.md D20)' },
];
const CONTROL = /^\[(radio|checkbox)(: checked)?\]$/;
const PREFIX = /^\[(field|placeholder|select|label)\] /;
const PLACEHOLDER = /\[[A-Z0-9][^\]]*\]/g;

const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const norm = (s) => s.replace(/\s+/g, ' ').trim();

function section(md, from, to) {
  const start = md.indexOf(from);
  const end = to ? md.indexOf(to, start + 1) : md.length;
  return md.slice(start, end);
}
const specMd = read('HANDOFF-SPEC.md');
const SPEC = norm(section(specMd, '## 1.', '## 2.') + ' ' + section(specMd, '## 7.', '## 8.')).toLowerCase();

const listed = new Set(read('PLACEHOLDERS.md').match(PLACEHOLDER) ?? []);

const draftFile = path.join(ROOT, 'qa/stage2-copy-draft.md');
const APPROVED = fs.existsSync(draftFile)
  ? fs
      .readFileSync(draftFile, 'utf8')
      .split('\n')
      .filter((l) => l.startsWith('|') && /\|\s*approved\s*\|\s*$/i.test(l))
      .map((l) => norm(l.split('|')[3] ?? '').toLowerCase())
      .filter(Boolean)
  : [];

const DATA_VALUES = [STATE.org, STATE.contact, STATE.question, STATE.ref, ...STATE.attendees.flatMap((a) => [a.name, a.email, a.role])];
const DATA = DATA_VALUES.map((s) => s.toLowerCase());
const DATA_SPLIT = new RegExp(`(?:${DATA_VALUES.map((v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`);

/** Collect text inside the page: visible lines, hidden state blocks, accessible names, the title. */
const collect = (page) =>
  page.evaluate(() => {
    const out = [];
    for (const block of document.querySelectorAll('[data-state]')) {
      const groups = new Map();
      const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!n.data.trim() || n.parentElement.closest('script,style,template')) continue;
        let e = n.parentElement;
        while (e !== block && ['inline', 'contents'].includes(getComputedStyle(e).display) && !['A', 'BUTTON', 'P', 'LI', 'H1', 'H2', 'H3', 'DT', 'DD', 'LABEL'].includes(e.tagName)) e = e.parentElement;
        groups.set(e, `${groups.get(e) ?? ''} ${n.data}`);
      }
      for (const [, text] of groups) out.push({ kind: `state ${block.dataset.state}`, text });
    }
    for (const el of document.querySelectorAll('[aria-label]')) out.push({ kind: 'aria-label', text: el.getAttribute('aria-label') });
    out.push({ kind: 'title', text: document.title });
    return out;
  });

function classify(raw) {
  let text = norm(raw);
  if (!text || CONTROL.test(text)) return { text, ok: true, sources: ['control'] };
  text = text.replace(PREFIX, '');
  // FormField adds the designed " (optional)" after a label (Register artboard).
  text = text.replace(/ \(optional\)$/, '');
  const placeholders = text.match(PLACEHOLDER) ?? [];
  const unlisted = placeholders.filter((p) => !listed.has(p));
  const sources = placeholders.length ? ['placeholder'] : [];
  const orphans = [];
  // " | " joins the page name and the site name in titles (Stage 1, D14).
  // The visitor's own data (seeded test values) also splits a line: "Your reference code: K7M2Q9".
  const fragments = text.split(PLACEHOLDER).flatMap((f) => f.split(' | ')).flatMap((f) => f.split(DATA_SPLIT)).map((f) => f.replace(/^[\s,.:;|()]+|[\s,:;|()]+$/g, '')).filter((f) => f && !/^[\d\s.,:;|()/-]+$/.test(f));
  for (const f of fragments) {
    const src = sourceOf(f) ?? sentences(f);
    if (src) sources.push(src);
    else orphans.push(f);
  }
  return { text, ok: !orphans.length && !unlisted.length, sources: [...new Set(sources)], orphans, unlisted };
}

let DESIGN = '';
function sourceOf(fragment) {
  const pat = PATTERNS.find((p) => p.re.test(fragment));
  if (pat) return 'pattern';
  const f = fragment.toLowerCase();
  if (DESIGN.includes(f)) return 'design';
  if (APPROVED.some((a) => a.includes(f))) return 'approved';
  if (DATA.some((d) => d === f)) return 'data';
  if (SPEC.includes(f)) return 'spec';
  return null;
}
function sentences(fragment) {
  const parts = fragment.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (parts.length < 2) return null;
  const srcs = parts.map(sourceOf);
  return srcs.every(Boolean) ? (srcs.includes('spec') ? 'spec' : srcs.includes('approved') ? 'approved' : 'design') : null;
}

const srv = await server();
const br = await browser();

// Corpus: every line of every artboard, including the member Topic page.
const boards = [...SCREENS.flatMap((s) => Object.values(s.design)), 'topic-c-desktop.dc.html', 'topic-c-mobile.dc.html'];
const designLines = [];
for (const file of boards) {
  const width = file.includes('mobile') ? 390 : 1440;
  const { context, page } = await open(br, srv.url, { width, path: `/__design/${file}` });
  for (const l of await page.evaluate(extractLines)) designLines.push(norm(l).replace(PREFIX, ''));
  for (const x of await collect(page)) if (x.kind === 'aria-label') designLines.push(norm(x.text));
  await context.close();
}
DESIGN = designLines.join('\n').toLowerCase();

const pages =
  TARGET === 'design'
    ? [{ id: 'proof', built: '/__fixtures/provenance-proof.html' }]
    : DERIVED;
const results = [];
for (const p of pages) {
  for (const width of TARGET === 'design' ? [1440] : LAYOUT_WIDTHS) {
    const { context, page } = await open(br, srv.url, { width, path: p.built, seed: p.seed });
    const items = [
      ...(await page.evaluate(extractLines)).map((text) => ({ kind: 'visible', text })),
      ...(await collect(page)),
    ];
    await context.close();
    const checked = items.map((i) => ({ kind: i.kind, ...classify(i.text) }));
    results.push({ page: p.id, width, lines: checked.length, checked });
  }
}

const orphans = [];
const unlisted = [];
const specSourced = new Set();
for (const r of results) {
  for (const c of r.checked) {
    for (const o of c.orphans ?? []) orphans.push({ page: r.page, width: r.width, kind: c.kind, text: o, line: c.text });
    for (const u of c.unlisted ?? []) unlisted.push({ page: r.page, width: r.width, placeholder: u });
    if (c.sources.includes('spec')) specSourced.add(`${r.page}: ${c.text}`);
  }
}
const uniq = (arr, key) => [...new Map(arr.map((x) => [key(x), x])).values()];
const orphanList = uniq(orphans, (o) => `${o.page}|${o.text}`);
const unlistedList = uniq(unlisted, (u) => `${u.page}|${u.placeholder}`);

if (TARGET === 'design') {
  // Harness proof: the fixture holds two invented sentences (one visible, one
  // in a hidden state block) and one unlisted placeholder, next to allowed text.
  const want = ['Bring a sack lunch and a smile.', 'Thanks, we will be in touch soon.'];
  const found = orphanList.map((o) => o.text);
  const ok = want.every((w) => found.includes(w)) && found.length === want.length && unlistedList.length === 1;
  save('provenance', {
    status: ok ? 'pass' : 'fail',
    summary: `proof fixture: ${found.length} orphan strings found (${found.join(' / ')}), ${unlistedList.length} unlisted placeholder; expected 2 and 1`,
    orphans: orphanList,
    unlisted: unlistedList,
  });
} else {
  save('provenance', {
    status: orphanList.length || unlistedList.length ? 'fail' : 'pass',
    summary: `${results.reduce((n, r) => n + r.lines, 0)} strings on ${pages.length} derived pages at 390 and 1440; ${orphanList.length} with no allowed source, ${unlistedList.length} placeholders missing from PLACEHOLDERS.md, ${specSourced.size} taken from spec wording (listed for confirmation)`,
    orphans: orphanList,
    unlisted: unlistedList,
    specSourced: [...specSourced],
    approvedRows: APPROVED.length,
    results: results.map((r) => ({ page: r.page, width: r.width, lines: r.checked.map((c) => `${c.sources.join('+') || 'none'} | ${c.kind} | ${c.text}`) })),
  });
}

await br.close();
await srv.close();
