// Check 6: 200% zoom (SITE-KICKOFF-PROMPT.md check 6; HANDOFF-SPEC.md section 8).
// Browser zoom at 200% on a 1440 or 1280 px window gives a 720 or 640 px CSS
// viewport at device scale 2, which is what this emulates. Looks for
// horizontal scroll, clipped text and text boxes that overlap each other.
import fs from 'node:fs';
import path from 'node:path';
import { RAW, SCREENS, DERIVED, TARGET, server, browser, open, save, installDescribe, revealStates } from './lib/common.mjs';
import { driveComposite } from './fixtures/register.mjs';

if (TARGET === 'design') {
  save('zoom', { status: 'not run', summary: 'artboards are fixed-width files; zoom applies to the built pages' });
  process.exit(0);
}

const analyze = (page) =>
  page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const shown = (el) => el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
    const textEls = [...document.querySelectorAll('body *')].filter((el) => {
      if (!shown(el) || el.closest('details:not([open]) > :not(summary)')) return false;
      if (getComputedStyle(el).display === 'inline') return false;
      return [...el.childNodes].some((n) => n.nodeType === 3 && n.data.trim());
    });
    const clipped = textEls
      .filter((el) => {
        const cs = getComputedStyle(el);
        const clips = /hidden|clip|auto|scroll/.test(`${cs.overflowX} ${cs.overflowY}`);
        return clips && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1);
      })
      .map((el) => window.__describe(el));
    const boxes = textEls.map((el) => ({ el, r: el.getBoundingClientRect() }));
    const overlaps = [];
    for (let i = 0; i < boxes.length; i += 1) {
      for (let j = i + 1; j < boxes.length; j += 1) {
        const a = boxes[i];
        const b = boxes[j];
        if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
        const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
        const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
        if (w > 1 && h > 1) overlaps.push(`${window.__describe(a.el)} overlaps ${window.__describe(b.el)} (${Math.round(w)}x${Math.round(h)})`);
      }
    }
    return { viewport: vw, scrollWidth: document.documentElement.scrollWidth, clipped, overlaps: overlaps.slice(0, 20) };
  });

const srv = await server();
const br = await browser();
fs.mkdirSync(RAW, { recursive: true });
const rows = [];

for (const s of [...SCREENS, ...DERIVED]) {
  for (const width of [720, 640]) {
    const { context, page } = await open(br, srv.url, { width, path: s.built, seed: s.seed }, { deviceScaleFactor: 2 });
    await installDescribe(page);
    const shot = async (state) => page.screenshot({ path: path.join(RAW, `zoom-${s.id}-${width}-${state}.png`), fullPage: true });
    rows.push({ screen: s.id, width, state: 'default', ...(await analyze(page)) });
    await shot('default');
    const menu = page.locator('button[aria-label="Open menu"]');
    if (await menu.count()) {
      await menu.click();
      rows.push({ screen: s.id, width, state: 'menu open', ...(await analyze(page)) });
      await menu.click();
    }
    if (!s.design && (await revealStates(page))) {
      rows.push({ screen: s.id, width, state: 'all states shown', ...(await analyze(page)) });
      await shot('states');
    }
    if (s.id === 'register') {
      await driveComposite(page);
      rows.push({ screen: s.id, width, state: 'composite with error', ...(await analyze(page)) });
      await shot('composite');
    }
    await context.close();
  }
}

const failures = rows.filter((r) => r.scrollWidth > r.viewport || r.clipped.length || r.overlaps.length);
save('zoom', {
  status: failures.length ? 'fail' : 'pass',
  summary: `${rows.length} states at 720 and 640 px (device scale 2), ${failures.length} with scroll, clipping or overlap`,
  failures,
  rows,
});

await br.close();
await srv.close();
