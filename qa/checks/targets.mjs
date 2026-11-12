// Check 5: tap targets of at least 44px (SITE-KICKOFF-PROMPT.md check 5) for
// buttons, the menu button, and the radio and checkbox labels. Links, the
// wordmark and FAQ summaries are measured too, because HANDOFF-SPEC.md
// section 8 sets 44px for every tap target.
import { BREAKPOINT, targets, server, browser, open, save, installDescribe, revealStates } from './lib/common.mjs';
import { driveComposite } from './fixtures/register.mjs';

const GROUPS = [
  ['button', 'button, a.btn'],
  ['menu button', 'button[aria-label="Open menu"]'],
  ['radio label', 'label.srow'],
  ['checkbox label', '.chkrow label'],
  ['link', 'a[href]:not(.btn)'],
  ['FAQ summary', 'summary'],
];

const measure = (page) =>
  page.evaluate((groups) => {
    const out = [];
    for (const [group, sel] of groups) {
      for (const el of document.querySelectorAll(sel)) {
        if (!el.checkVisibility({ checkVisibilityCSS: true })) continue;
        const r = el.getBoundingClientRect();
        out.push({ group, el: window.__describe(el), w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, ok: Math.min(r.width, r.height) >= 44 });
      }
    }
    return out;
  }, GROUPS);

const srv = await server();
const br = await browser();
const samples = [];

for (const t of targets()) {
  const { context, page } = await open(br, srv.url, t);
  await installDescribe(page);
  samples.push({ screen: t.screen, width: t.width, state: 'default', items: await measure(page) });
  // Links inside FAQ answers only exist on screen when their item is open.
  if (await page.evaluate(() => [...document.querySelectorAll('details:not([open])')].map((d) => (d.open = true)).length)) {
    samples.push({ screen: t.screen, width: t.width, state: 'every FAQ open', items: await measure(page) });
  }
  if (t.derived && (await revealStates(page))) {
    samples.push({ screen: t.screen, width: t.width, state: 'all states shown', items: await measure(page) });
  }
  if (t.kind === 'built' && t.screen === 'register') {
    await driveComposite(page);
    samples.push({ screen: t.screen, width: t.width, state: 'three rows', items: await measure(page) });
  }
  if (t.kind === 'built' && t.width < BREAKPOINT) {
    const menu = page.locator('button[aria-label="Open menu"]');
    if (await menu.count()) {
      await menu.click();
      samples.push({ screen: t.screen, width: t.width, state: 'menu open', items: await measure(page) });
    }
  }
  await context.close();
}

const failures = [];
const seen = new Set();
for (const s of samples) {
  for (const i of s.items) {
    const key = `${s.screen}@${s.width}|${i.group}|${i.el}`;
    if (i.ok || seen.has(key)) continue;
    seen.add(key);
    failures.push({ screen: s.screen, width: s.width, state: s.state, ...i });
  }
}
const measured = samples.reduce((n, s) => n + s.items.length, 0);

save('targets', {
  status: failures.length ? 'fail' : 'pass',
  summary: `${measured} targets measured, ${failures.length} below 44px`,
  failures,
  samples,
});

await br.close();
await srv.close();
