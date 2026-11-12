// Launch gate: `npm run check:launch`.
// Lists everything that still blocks a public launch, read from what would
// actually ship (dist/), plus the audit report. It is expected to fail until
// every launch fact is in, so it is not part of `npm run check`.
//   Blockers (fail):  any [PLACEHOLDER] or [CONFIRM] in page text, form or
//                     payment URLs not set, no decision on the payment
//                     reference parameter, robots noindex still on, an open
//                     blocker or major finding in qa/audit-report.md
//   Warnings:         payment links set to carry no reference code, no
//                     calendar file, no board PDF, pages without a description
//   node qa/checks/launch.mjs --proof   runs on a fixture that holds every
//                                       blocker and must find each one
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, save } from './lib/common.mjs';

const proof = process.argv.includes('--proof');
const SITE = proof ? path.join(ROOT, 'qa/checks/fixtures/launch-dist') : path.join(ROOT, 'dist');
const AUDIT = proof ? path.join(SITE, 'audit-report.md') : path.join(ROOT, 'qa/audit-report.md');
const name = proof ? 'launch.proof' : 'launch';

if (!fs.existsSync(path.join(SITE, 'index.html'))) {
  console.error(`${path.relative(ROOT, SITE)}/ is missing. Run \`npm run build\` first.`);
  process.exit(1);
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
const pages = walk(SITE).filter((f) => f.endsWith('.html'));
const route = (f) => `/${path.relative(SITE, path.dirname(f)).split(path.sep).filter(Boolean).join('/')}${path.dirname(f) === SITE ? '' : '/'}`;
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
// Page text and attributes, without scripts and styles (array indexes such as [0] are not copy).
const textOf = (f) => decode(fs.readFileSync(f, 'utf8').replace(/<(script|style)\b[\s\S]*?<\/\1>/g, ''));

/** Where a placeholder is set, so the list says what to edit. */
function whereSet(token) {
  try {
    const out = execFileSync('git', ['grep', '-n', '-F', token, '--', 'src/config.ts', 'src/copy.ts', 'src/pages', 'src/components'], { cwd: ROOT, encoding: 'utf8' });
    const lines = out.split('\n').filter(Boolean).filter((l) => !/^\s*(\*|\/\/|\/\*)/.test(l.split(':').slice(2).join(':'))); // skip comments
    return [...new Set(lines.map((l) => l.split(':').slice(0, 2).join(':')))].slice(0, 4).join(', ') || 'not found in src/';
  } catch {
    return 'not found in src/';
  }
}

const blockers = [];
const warnings = [];

/* ---------- placeholders and [CONFIRM] tags on the pages ---------- */
const found = new Map();
for (const f of pages) {
  for (const m of textOf(f).matchAll(/\[[A-Z0-9][^[\]<>"]*\]/g)) {
    const entry = found.get(m[0]) ?? { token: m[0], pages: new Set(), count: 0 };
    entry.pages.add(route(f));
    entry.count += 1;
    found.set(m[0], entry);
  }
}
for (const e of [...found.values()].sort((a, b) => a.token.localeCompare(b.token))) {
  blockers.push({ kind: 'placeholder', item: e.token, pages: [...e.pages], count: e.count, fix: proof ? 'fixture' : whereSet(e.token) });
}

/* ---------- services, indexing, calendar, board PDF (from the built pages) ---------- */
const read = (r) => {
  const f = path.join(SITE, r, 'index.html');
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
};
const attrJson = (html, attr) => {
  const m = html.match(new RegExp(`${attr}="([^"]*)"`));
  return m ? JSON.parse(decode(m[1])) : null;
};
const review = attrJson(read('register/review'), 'data-review-config');
if (!review || !review.endpoint) blockers.push({ kind: 'service', item: 'Registration form endpoint not set; the pay button is disabled', fix: 'src/config.ts FORM_ENDPOINTS' });
if (!review || !Object.keys(review.links ?? {}).length) blockers.push({ kind: 'service', item: 'Payment links not set', fix: 'src/config.ts PAYMENT_LINKS' });
if (review && review.refParam === null) blockers.push({ kind: 'service', item: 'Not decided whether payment links carry the reference code (PAYMENT_REF_PARAM is null; set the parameter name, or false)', fix: 'src/config.ts PAYMENT_REF_PARAM' });
if (review && review.refParam === false) warnings.push({ item: 'Payment links will not carry the reference code (PAYMENT_REF_PARAM is false); payments are matched by name', fix: 'src/config.ts PAYMENT_REF_PARAM' });
const ask = read('questions').match(/data-endpoint="([^"]*)"/);
if (!ask || !ask[1]) blockers.push({ kind: 'service', item: 'Questions form endpoint not set; the send button is disabled', fix: 'src/config.ts FORM_ENDPOINTS' });

// Review order and Confirmation stay noindex on purpose; any other page with it blocks launch.
const ALWAYS_NOINDEX = new Set(['/register/review/', '/confirmation/']);
const noindex = pages.filter((f) => /<meta name="robots" content="[^"]*noindex/.test(fs.readFileSync(f, 'utf8'))).map(route).filter((r) => !ALWAYS_NOINDEX.has(r));
if (noindex.length) blockers.push({ kind: 'indexing', item: `Search engines are blocked (robots noindex) on ${noindex.length} page${noindex.length === 1 ? "" : "s"}`, fix: 'src/config.ts NOINDEX' });

if (!fs.existsSync(path.join(SITE, 'workshop.ics'))) warnings.push({ item: 'No Add to calendar file (EVENT start and end are not set)', fix: 'src/config.ts EVENT' });
const described = pages.filter((f) => /<meta name="description"/.test(fs.readFileSync(f, 'utf8'))).length;
if (!proof && described < pages.length - ALWAYS_NOINDEX.size) warnings.push({ item: `${pages.length - ALWAYS_NOINDEX.size - described} pages have no description for search results and link previews`, fix: 'qa/stage2-copy-draft.md description rows, then src/copy.ts DESCRIPTIONS' });
if (/data-print/.test(read('board'))) warnings.push({ item: 'For your board shows a print button; no PDF is set', fix: 'src/config.ts BOARD_PDF_URL' });

/* ---------- independent audit ---------- */
if (!fs.existsSync(AUDIT)) {
  blockers.push({ kind: 'audit', item: 'No audit report', fix: 'qa/audit-report.md' });
} else {
  const open = fs
    .readFileSync(AUDIT, 'utf8')
    .split('\n')
    .filter((l) => l.startsWith('|'))
    .map((l) => l.split('|').map((c) => c.trim()))
    .filter((c) => /^(blocker|major)$/i.test(c[2] ?? '') && /^open$/i.test(c[c.length - 2] ?? ''));
  for (const c of open) blockers.push({ kind: 'audit', item: `${c[1]} ${c[2]}: ${c[5]}`, fix: c[4] });
}

const byKind = blockers.reduce((m, b) => ({ ...m, [b.kind]: (m[b.kind] ?? 0) + 1 }), {});
for (const b of blockers) console.log(`BLOCKER  ${b.item}${b.pages ? ` on ${b.pages.join(', ')}` : ''}  (fix: ${b.fix})`);
for (const w of warnings) console.log(`WARNING  ${w.item}  (fix: ${w.fix})`);

if (proof) {
  // The fixture holds one of each: two placeholders, a [CONFIRM], unset services, noindex, an open major finding.
  const want = { placeholder: 3, service: 4, indexing: 1, audit: 1 };
  const ok = Object.entries(want).every(([k, n]) => byKind[k] === n) && warnings.length === 2;
  save(name, { status: ok ? 'pass' : 'fail', summary: `proof fixture: found ${JSON.stringify(byKind)} and ${warnings.length} warnings; expected ${JSON.stringify(want)} and 2`, blockers, warnings });
} else {
  save(name, {
    status: blockers.length ? 'fail' : 'pass',
    summary: blockers.length
      ? `not ready to launch: ${blockers.length} blockers (${Object.entries(byKind).map(([k, n]) => `${n} ${k}`).join(', ')}), ${warnings.length} warnings`
      : `ready to launch; ${warnings.length} warnings`,
    blockers,
    warnings,
  });
}
