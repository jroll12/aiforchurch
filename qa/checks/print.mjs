// 03 For your board must print cleanly on one US Letter page (HANDOFF-SPEC.md
// section 7): black on white, no accent fills, header nav and buttons hidden.
// Prints through Chromium to PDF at Letter size and counts the pages, then
// checks the print styles and reports how much of the page the content uses,
// because placeholders are shorter than the real copy will be.
import fs from 'node:fs';
import path from 'node:path';
import { RAW, TARGET, server, browser, save, readTokens, parseColor } from './lib/common.mjs';

const LETTER = { width: 816, height: 1056 }; // 8.5 x 11 in at 96 px per inch
const MARGIN = 48; // 0.5 in, set by the page's @page rule
const tokens = readTokens();
const accents = [parseColor(tokens.accent), parseColor(tokens['accent-hover'])];

const pathFor = TARGET === 'design' ? '/__fixtures/print-proof.html' : '/board/';
const srv = await server();
const br = await browser();
const context = await br.newContext({ viewport: { width: LETTER.width - MARGIN * 2, height: LETTER.height } });
const page = await context.newPage();
await page.goto(srv.url + pathFor, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: 'print' });

const styles = await page.evaluate((accentList) => {
  const parse = (s) => {
    const m = s && s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const isAccent = (s) => {
    const c = parse(s);
    return Boolean(c && c.a > 0 && accentList.some((a) => a.r === c.r && a.g === c.g && a.b === c.b));
  };
  const shown = (el) => el.checkVisibility({ checkVisibilityCSS: true });
  const accentUses = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!shown(el)) continue;
    const cs = getComputedStyle(el);
    const props = ['color', 'backgroundColor', 'borderTopColor', 'borderBottomColor', 'outlineColor'].filter((p) => isAccent(cs[p]));
    if (props.length) accentUses.push(`${el.tagName.toLowerCase()}${el.className ? `.${String(el.className).split(' ').join('.')}` : ''}: ${props.join(', ')}`);
  }
  const visible = (sel) => [...document.querySelectorAll(sel)].filter(shown).map((el) => (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 40));
  return {
    accentUses: accentUses.slice(0, 20),
    navShown: visible('header nav, header .menu'),
    buttonsShown: visible('button, .btn'),
    honesty: Boolean([...document.querySelectorAll('footer p')].find((p) => shown(p) && p.textContent.includes('drafted with AI'))),
    contentHeight: Math.ceil(document.documentElement.scrollHeight),
  };
}, accents);

const pdf = await page.pdf({ format: 'Letter', preferCSSPageSize: true });
fs.mkdirSync(RAW, { recursive: true });
fs.writeFileSync(path.join(RAW, TARGET === 'design' ? 'print-proof.pdf' : 'board-print.pdf'), pdf);
const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page(?!s)/g) ?? []).length;
const fill = Math.round((styles.contentHeight / (LETTER.height - MARGIN * 2)) * 100);

await context.close();
await br.close();
await srv.close();

if (TARGET === 'design') {
  // Harness proof: the fixture holds about three pages of text; the page count must see it.
  save('print', {
    status: pages >= 2 ? 'pass' : 'fail',
    summary: `proof fixture printed to ${pages} Letter pages (expected 2 or more)`,
    pages,
  });
} else {
  const problems = [];
  if (pages !== 1) problems.push(`prints on ${pages} pages`);
  if (styles.accentUses.length) problems.push(`accent color in print: ${styles.accentUses.join('; ')}`);
  if (styles.navShown.length) problems.push(`header nav shown in print: ${styles.navShown.join(', ')}`);
  if (styles.buttonsShown.length) problems.push(`buttons shown in print: ${styles.buttonsShown.join(', ')}`);
  if (!styles.honesty) problems.push('footer honesty line missing in print');
  save('print', {
    status: problems.length ? 'fail' : 'pass',
    summary: `/board/ prints on ${pages} Letter page${pages === 1 ? '' : 's'}; content fills about ${fill}% of the printable height with placeholders in place; ${problems.length} problems`,
    pages,
    fillPercent: fill,
    problems,
    styles,
  });
}
