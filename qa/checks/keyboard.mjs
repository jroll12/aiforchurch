// Check 4: keyboard (SITE-KICKOFF-PROMPT.md check 4; HANDOFF-SPEC.md section 8).
// - Tab through each page: every focusable element is reached, and every stop
//   shows a 2px ink outline.
// - Every FAQ item opens and closes with Enter and with Space.
// - Register: after Continue, every aria-invalid field points at visible error
//   text through aria-describedby, and focus lands on the first invalid field.
// - Mobile: the menu button opens the nav, Tab moves into it, Escape closes it.
import { BREAKPOINT, targets, server, browser, open, save, installDescribe, readTokens, parseColor } from './lib/common.mjs';
import { driveComposite, CONTINUE } from './fixtures/register.mjs';

const ink = parseColor(readTokens().ink);
const isInk = (s) => {
  const c = parseColor(s);
  return Boolean(c && c.r === ink.r && c.g === ink.g && c.b === ink.b);
};

async function tabWalk(page) {
  const stops = [];
  for (let k = 0; k < 200; k += 1) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      if (el.dataset.kbdSeen) return { wrapped: true };
      el.dataset.kbdSeen = '1';
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        el: window.__describe(el),
        top: Math.round(r.top + window.scrollY),
        outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} offset ${cs.outlineOffset}`,
        outlineStyle: cs.outlineStyle,
        outlineWidth: parseFloat(cs.outlineWidth),
        outlineColor: cs.outlineColor,
      };
    });
    if (!info || info.wrapped) break;
    stops.push({ ...info, visible: info.outlineStyle !== 'none' && info.outlineWidth >= 2 && isInk(info.outlineColor) });
  }
  const expected = await page.evaluate(() => {
    const sel = 'a[href], button:not([disabled]), input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
    const groups = new Set();
    return [...document.querySelectorAll(sel)]
      .filter((el) => {
        if (!el.checkVisibility({ checkVisibilityCSS: true })) return false;
        if (el.tagName !== 'SUMMARY' && el.closest('details:not([open])')) return false;
        if (el.type === 'radio') {
          if (groups.has(el.name)) return false;
          groups.add(el.name);
        }
        return true;
      })
      .map((el) => window.__describe(el));
  });
  return { stops, expectedCount: expected.length, missed: Math.max(0, expected.length - stops.length), expected };
}

async function faqToggles(page) {
  const out = [];
  const count = await page.locator('summary').count();
  for (let k = 0; k < count; k += 1) {
    const s = page.locator('summary').nth(k);
    await s.focus();
    const state = () => s.evaluate((el) => el.parentElement.open);
    const before = await state();
    await page.keyboard.press('Enter');
    const afterEnter = await state();
    await page.keyboard.press('Space');
    const afterSpace = await state();
    out.push({ item: k + 1, before, afterEnter, afterSpace, ok: afterEnter !== before && afterSpace === before });
  }
  return out;
}

const linkedErrors = (page) =>
  page.evaluate(() => {
    const fields = [...document.querySelectorAll('[aria-invalid="true"]')].map((el) => {
      const ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
      const refs = ids.map((id) => document.getElementById(id));
      return {
        el: window.__describe(el),
        describedby: ids,
        visible: refs.length > 0 && refs.every((r) => r && r.checkVisibility()),
        message: refs.map((r) => (r ? r.textContent.trim() : '')).join(' '),
      };
    });
    return { fields, focused: window.__describe(document.activeElement) };
  });

const srv = await server();
const br = await browser();
const pages = [];

for (const t of targets()) {
  const { context, page } = await open(br, srv.url, t);
  await installDescribe(page);
  const entry = { screen: t.screen, width: t.width };
  entry.tab = await tabWalk(page);
  entry.faq = await faqToggles(page);

  if (t.kind === 'built' && t.screen === 'register') {
    await page.reload({ waitUntil: 'networkidle' });
    await installDescribe(page);
    await page.click(CONTINUE);
    const empty = await linkedErrors(page);
    await page.reload({ waitUntil: 'networkidle' });
    await installDescribe(page);
    await driveComposite(page);
    const designed = await linkedErrors(page);
    entry.errors = {
      empty,
      designed,
      ok:
        empty.fields.length > 0 &&
        [...empty.fields, ...designed.fields].every((f) => f.describedby.length && f.visible && f.message) &&
        /seat-1/.test(empty.focused) &&
        designed.fields.length === 1 &&
        /#e2/.test(designed.fields[0].el) &&
        designed.fields[0].message === 'Add an email so we can send the confirmation.' &&
        /#e2/.test(designed.focused),
    };
  }

  if (t.kind === 'built' && t.width < BREAKPOINT) {
    await page.reload({ waitUntil: 'networkidle' });
    await installDescribe(page);
    const menuSel = 'button[aria-label="Open menu"]';
    if (await page.locator(menuSel).count()) {
      await page.focus(menuSel);
      await page.keyboard.press('Enter');
      const opened = await page.evaluate((sel) => ({
        expanded: document.querySelector(sel).getAttribute('aria-expanded'),
        navVisible: Boolean(document.querySelector('nav')?.checkVisibility()),
      }), menuSel);
      await page.keyboard.press('Tab');
      const next = await page.evaluate(() => ({ el: window.__describe(document.activeElement), inNav: Boolean(document.activeElement.closest('nav')) }));
      await page.keyboard.press('Escape');
      const closed = await page.evaluate((sel) => ({
        expanded: document.querySelector(sel).getAttribute('aria-expanded'),
        navVisible: Boolean(document.querySelector('nav')?.checkVisibility()),
        focusOnButton: document.activeElement === document.querySelector(sel),
      }), menuSel);
      entry.menu = {
        opened,
        next,
        closed,
        ok: opened.expanded === 'true' && opened.navVisible && next.inNav && closed.expanded === 'false' && !closed.navVisible && closed.focusOnButton,
      };
    }
  }
  await context.close();
  pages.push(entry);
}

const problems = [];
for (const p of pages) {
  const where = `${p.screen}@${p.width}`;
  const invisible = p.tab.stops.filter((s) => !s.visible);
  if (invisible.length) problems.push(`${where}: ${invisible.length} of ${p.tab.stops.length} focus stops without a 2px ink outline (first: ${invisible[0].el}, ${invisible[0].outline})`);
  if (p.tab.missed) problems.push(`${where}: Tab reached ${p.tab.stops.length} of ${p.tab.expectedCount} focusable elements`);
  // Focus order should follow what is on screen (WCAG 2.4.3): Tab never jumps back up the page.
  const upward = p.tab.stops.slice(1).map((s, k) => [p.tab.stops[k], s]).filter(([a, b]) => b.top < a.top - 20);
  if (upward.length) problems.push(`${where}: Tab moves up the page ${upward.length} time(s), first ${upward[0][0].el} (y ${upward[0][0].top}) to ${upward[0][1].el} (y ${upward[0][1].top})`);
  const badFaq = p.faq.filter((f) => !f.ok);
  if (badFaq.length) problems.push(`${where}: FAQ items not toggling from the keyboard: ${badFaq.map((f) => f.item).join(', ')}`);
  if (p.errors && !p.errors.ok) problems.push(`${where}: error linkage or focus on first invalid field failed`);
  if (p.menu && !p.menu.ok) problems.push(`${where}: mobile menu keyboard behavior failed`);
}

save('keyboard', {
  status: problems.length ? 'fail' : 'pass',
  summary: problems.length ? `${problems.length} problems` : `${pages.length} page layouts walked, all stops visible, FAQ, errors and menu OK`,
  problems,
  pages,
});

await br.close();
await srv.close();
