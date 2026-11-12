// Shared helpers for the checks.
// Stage 1 hooks come from the design markup (ids such as #seat-3 and #n1,
// classes such as .srow, visible button text). Stage 2 pages have no
// artboards, so their hooks are the data-* contract listed under DERIVED,
// written here before the pages.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from './server.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
export const RESULTS = path.join(ROOT, 'qa/results');
export const RAW = path.join(RESULTS, 'raw');
export const DIST = path.join(ROOT, 'dist');
/** Same site built with mock form and payment endpoints (`npm run build:mock`). Never deployed. */
export const MOCK_DIST = path.join(ROOT, 'dist-mock');
export const SHOTS = path.join(ROOT, 'qa/screenshots');

/** "built" checks dist/; "design" runs the same checks on the artboards to prove the harness. */
export const TARGET = process.env.CHECK_TARGET === 'design' ? 'design' : 'built';

/** The two Stage 1 screens and their artboards (design/boards.json). */
export const SCREENS = [
  { id: 'home', built: '/', design: { 390: 'home-c-mobile.dc.html', 1440: 'home-c-desktop.dc.html' } },
  { id: 'register', built: '/register/', design: { 390: 'register-c-mobile.dc.html', 1440: 'register-c-desktop.dc.html' } },
];

/**
 * A saved registration as Register writes it (qa/questions.md D10). Test data
 * only; it seeds sessionStorage for the pages that read it.
 */
export const STATE = {
  v: 1,
  ref: 'K7M2Q9',
  seats: 3,
  org: 'Test Church',
  contact: 'Test Contact',
  attendees: [
    { name: 'Test Person', email: 'test.person@church.org', role: 'Finance' },
    { name: 'Second Person', email: 'second.person@church.org', role: 'Pastor' },
  ],
  question: 'Bulletins',
  consent: true,
  savedAt: '2026-11-12T12:00:00.000Z',
};
export const STORAGE_KEY = 'cfco:registration';

/**
 * Stage 2 pages (HANDOFF-SPEC.md section 7). No artboards: "derived, not designed".
 * Hook contract the pages are built to:
 *   [data-state="<name>"]  every state block (success, error, payment states), hidden when inactive
 *   [data-edit]            Review edit links back to Register
 *   [data-sum="total"]     Review total row
 *   button[data-pay]       Review payment button; button[data-pay-offline] only when OFFLINE_PAYMENT
 *   [data-ref]             the reference code wherever it is shown
 *   button[data-retry]     Confirmation retry after a failed payment
 *   a[data-ics]            Add to calendar (absent while the date is a placeholder)
 *   a[data-forward]        Forward to your board
 *   button[data-print], a[data-pdf]  Board print or PDF
 *   form#ask               Questions form: #q-name, #q-church, #q-email, #q-question, #q-future
 */
export const DERIVED = [
  { id: 'workshop', built: '/workshop/' },
  { id: 'board', built: '/board/' },
  { id: 'about', built: '/about/' },
  { id: 'questions', built: '/questions/' },
  { id: 'review', built: '/register/review/', seed: STATE },
  { id: 'confirmation', built: '/confirmation/?payment=paid', seed: STATE },
];

export const BREAKPOINT = 900; // HANDOFF-SPEC.md section 4
export const LAYOUT_WIDTHS = [390, 1440];
export const SCROLL_WIDTHS = [320, 390, 768, 1024, 1440]; // SITE-KICKOFF-PROMPT.md check 2
export const HEADER_WIDTHS = [900, 960, 1024, 1100]; // where the four-item nav is tightest

export const designPath = (screen, width) =>
  `/__design/${SCREENS.find((s) => s.id === screen).design[width]}`;

/**
 * Pages a check runs on: built pages (designed and derived) at the given
 * widths, or each artboard at its own width.
 */
export function targets(widths = LAYOUT_WIDTHS, { derived = true } = {}) {
  if (TARGET === 'design') {
    return SCREENS.flatMap((s) =>
      Object.keys(s.design).map((w) => ({ screen: s.id, width: Number(w), path: designPath(s.id, Number(w)), kind: 'design' })),
    );
  }
  const pages = [...SCREENS, ...(derived ? DERIVED : [])];
  return pages.flatMap((s) => widths.map((width) => ({ screen: s.id, width, path: s.built, kind: 'built', seed: s.seed, derived: !s.design })));
}

/** Start the static server unless run-all already started one. */
export async function server() {
  if (process.env.CHECK_BASE_URL) return { url: process.env.CHECK_BASE_URL, close: async () => {} };
  const { server: srv, url } = await startServer(MOUNTS());
  return { url, close: () => new Promise((resolve) => srv.close(resolve)) };
}

/** What the check server serves: artboards, proof fixtures, and the built site. */
export const MOUNTS = (site = DIST) => [
  ['/__design/', path.join(ROOT, 'design')],
  ['/__fixtures/', path.join(ROOT, 'qa/checks/fixtures/pages')],
  ['/', site],
];

export const browser = () => chromium.launch();

/** Open a page at a width and wait for network and fonts to settle. */
export async function open(br, base, target, { height = 900, deviceScaleFactor = 1 } = {}) {
  const context = await br.newContext({ viewport: { width: target.width, height }, deviceScaleFactor });
  if (target.seed) await seed(context, target.seed);
  const page = await context.newPage();
  await page.goto(base + target.path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return { context, page };
}

/**
 * Show every state block and every field error at once, so layout checks see
 * the most text a derived page can hold without driving each state.
 */
export const revealStates = (page) =>
  page.evaluate(() => {
    for (const el of document.querySelectorAll('[data-state], .err')) el.hidden = false;
    return document.querySelectorAll('[data-state]').length;
  });

/** Put a saved registration in sessionStorage before any page script runs. */
export async function seed(context, state = STATE) {
  await context.addInitScript(
    ([key, value]) => {
      if (!sessionStorage.getItem(key)) sessionStorage.setItem(key, value);
    },
    [STORAGE_KEY, JSON.stringify(state)],
  );
}

/** Write qa/results/<name>.json (or <name>.design.json) and set the exit code. */
export function save(name, result) {
  fs.mkdirSync(RESULTS, { recursive: true });
  const file = path.join(RESULTS, `${name}${TARGET === 'design' ? '.design' : ''}.json`);
  const out = { check: name, target: TARGET, ranAt: new Date().toISOString(), ...result };
  fs.writeFileSync(file, `${JSON.stringify(out, null, 2)}\n`);
  console.log(`${name} [${TARGET}]: ${result.status}${result.summary ? `: ${result.summary}` : ''}`);
  process.exitCode = result.status === 'fail' ? 1 : 0;
  return out;
}

/* ---------- color math (WCAG 2.x relative luminance) ---------- */

export function parseColor(value) {
  if (!value) return null;
  if (value.startsWith('#')) {
    const h = value.slice(1);
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 };
  }
  const m = value.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
}

export function luminance({ r, g, b }) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Read the custom properties from tokens.css (the single token source). */
export function readTokens() {
  const css = fs.readFileSync(path.join(ROOT, 'tokens.css'), 'utf8');
  return Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));
}

/* ---------- visible text extraction (runs inside the page) ---------- */

/**
 * Visible text in document order, one entry per block-level run of text.
 * Form controls contribute their value or placeholder, radios and checkboxes
 * their state, icon-only buttons their aria-label. Closed <details> contribute
 * only their summary. Must stay self-contained: Playwright serializes it.
 */
export function extractLines() {
  const lines = [];
  let lastBlock = null;
  const isBlock = (el) => {
    const d = getComputedStyle(el).display;
    return d !== 'inline' && d !== 'contents';
  };
  const blockOf = (el) => {
    let e = el;
    while (e && e !== document.body && !isBlock(e)) e = e.parentElement;
    return e;
  };
  const shown = (el) => el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
  const add = (raw, block) => {
    const text = raw.replace(/\s+/g, ' ').trim();
    if (!text) return;
    if (block && block === lastBlock && lines.length) lines[lines.length - 1] += ` ${text}`;
    else lines.push(text);
    lastBlock = block;
  };
  const control = (text) => {
    add(text, null);
    lastBlock = null;
  };
  const SKIP = new Set(['script', 'style', 'template', 'noscript', 'link', 'meta', 'title', 'head']);

  const walk = (node) => {
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        add(child.data, blockOf(child.parentElement));
        continue;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) continue;
      const el = child;
      const tag = el.tagName.toLowerCase();
      if (SKIP.has(tag) || !shown(el)) continue;
      if (tag === 'details' && !el.open) {
        const summary = el.querySelector(':scope > summary');
        if (summary) walk({ childNodes: [summary] });
        continue;
      }
      if (tag === 'input') {
        if (el.type === 'radio' || el.type === 'checkbox') control(el.checked ? `[${el.type}: checked]` : `[${el.type}]`);
        else if (el.type !== 'hidden') control(el.value ? `[field] ${el.value}` : `[placeholder] ${el.placeholder}`);
        continue;
      }
      if (tag === 'textarea') {
        control(el.value ? `[field] ${el.value}` : `[placeholder] ${el.placeholder}`);
        continue;
      }
      if (tag === 'select') {
        control(`[select] ${el.selectedOptions[0]?.textContent ?? ''}`);
        continue;
      }
      if ((tag === 'button' || tag === 'a') && !el.textContent.trim() && el.getAttribute('aria-label')) {
        control(`[label] ${el.getAttribute('aria-label')}`);
        continue;
      }
      walk(el);
    }
  };
  walk(document.body);
  return lines;
}

/** Line diff (longest common subsequence). Returns lines only in the design or only in the build. */
export function diffLines(design, built) {
  const n = design.length;
  const m = built.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      dp[i][j] = design[i] === built[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (design[i] === built[j]) {
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ side: 'design-only', text: design[i], at: i });
      i += 1;
    } else {
      out.push({ side: 'built-only', text: built[j], at: j });
      j += 1;
    }
  }
  while (i < n) out.push({ side: 'design-only', text: design[i], at: i++ });
  while (j < m) out.push({ side: 'built-only', text: built[j], at: j++ });
  return out;
}

/**
 * Install window.__describe(el) in a page: a short CSS-like label for an
 * element, used in evidence lines.
 */
export async function installDescribe(page) {
  await page.evaluate(() => {
    window.__describe = (el) => {
      const id = el.id ? `#${el.id}` : '';
      const cls = typeof el.className === 'string' && el.className.trim() ? `.${el.className.trim().split(/\s+/).join('.')}` : '';
      const label = el.getAttribute('aria-label') ? `[aria-label="${el.getAttribute('aria-label')}"]` : '';
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
      return `${el.tagName.toLowerCase()}${id}${cls}${label}${text ? ` "${text}"` : ''}`;
    };
  });
}
