// Header fit at the narrow end of the desktop layout (900 to 1100 px), where
// the four-item nav is tightest (HANDOFF-SPEC.md section 4: header cols 1 to 4
// mark, 5 to 9 nav, 10 to 12 button on Home). Pass means every nav link sits
// on one line, and the boxes of the wordmark, nav links and Reserve seats
// button (their hit areas and focus rings, not just their text) do not touch.
// The wordmark may wrap to two lines here, as it does in the artboards.
import { TARGET, HEADER_WIDTHS, targets, server, browser, open, save } from './lib/common.mjs';

const MIN_GAP = 8; // px of clear space between wordmark, nav and button

const measure = (page) =>
  page.evaluate(() => {
    const textBox = (el) => {
      const r = document.createRange();
      r.selectNodeContents(el);
      return r;
    };
    const lines = (el) => new Set([...textBox(el).getClientRects()].filter((r) => r.width > 0).map((r) => Math.round(r.top))).size;
    const mark = document.querySelector('header .mark');
    const links = [...document.querySelectorAll('header .nav a')].filter((a) => a.checkVisibility());
    const cta = document.querySelector('header .hcta');
    if (!mark || !links.length) return null;
    // Element boxes: the hit area and where the focus ring is drawn.
    const markRight = mark.getBoundingClientRect().right;
    const navLeft = Math.min(...links.map((a) => a.getBoundingClientRect().left));
    const navRight = Math.max(...links.map((a) => a.getBoundingClientRect().right));
    const ctaLeft = cta && cta.checkVisibility() ? cta.getBoundingClientRect().left : null;
    return {
      markLines: lines(mark),
      links: links.map((a) => ({ text: a.textContent.trim(), lines: lines(a) })),
      gapMarkNav: Math.round(navLeft - markRight),
      gapNavCta: ctaLeft === null ? null : Math.round(ctaLeft - navRight),
      navRight: Math.round(navRight),
      viewport: document.documentElement.clientWidth,
    };
  });

const srv = await server();
const br = await browser();
const rows = [];

const list =
  TARGET === 'design'
    ? HEADER_WIDTHS.map((width) => ({ screen: 'home artboard', width, path: '/__design/home-c-desktop.dc.html' }))
    : targets(HEADER_WIDTHS);
for (const t of list) {
  const { context, page } = await open(br, srv.url, t);
  const m = await measure(page);
  await context.close();
  if (!m) {
    rows.push({ screen: t.screen, width: t.width, problems: ['no header nav found'] });
    continue;
  }
  const problems = [];
  for (const l of m.links) if (l.lines > 1) problems.push(`"${l.text}" wraps to ${l.lines} lines`);
  if (m.gapMarkNav < MIN_GAP) problems.push(`wordmark to nav gap ${m.gapMarkNav}px`);
  if (m.gapNavCta !== null && m.gapNavCta < MIN_GAP) problems.push(`nav to button gap ${m.gapNavCta}px`);
  if (m.navRight > m.viewport) problems.push('nav runs past the viewport');
  rows.push({ screen: t.screen, width: t.width, ...m, problems });
}

const failures = rows.filter((r) => r.problems.length);
const gaps = rows.flatMap((r) => [r.gapMarkNav, r.gapNavCta]).filter((g) => typeof g === 'number');
if (TARGET === 'design') {
  // Harness proof: the Home artboard's own header wraps "For your board" at 900 px (measured 2026-11-11).
  const caught = failures.some((f) => f.width === 900 && f.problems.some((p) => p.includes('For your board')));
  save('headerfit', {
    status: caught ? 'pass' : 'fail',
    summary: `artboard at ${HEADER_WIDTHS.join(', ')} px: ${failures.map((f) => `${f.width}: ${f.problems.join('; ')}`).join(' | ') || 'no problems'}; the wrap at 900 px ${caught ? 'was' : 'was not'} detected`,
    rows,
  });
} else {
  save('headerfit', {
    status: failures.length ? 'fail' : 'pass',
    summary: `${rows.length} headers at ${HEADER_WIDTHS.join(', ')} px; ${failures.length} with wrapping or touching items; smallest gap ${Math.min(...gaps)}px (minimum ${MIN_GAP})`,
    failures,
    rows,
  });
}

await br.close();
await srv.close();
