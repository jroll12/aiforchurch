// Check 2: no horizontal scroll at 320, 390, 768, 1024 and 1440 px
// (SITE-KICKOFF-PROMPT.md check 2), plus 900 and 960 where the desktop
// header is tightest. Includes the open mobile menu, Register at its most
// text (three rows, every error showing) and each derived page with every
// state block and error shown.
import { BREAKPOINT, SCROLL_WIDTHS, HEADER_WIDTHS, targets, server, browser, open, save, installDescribe, revealStates } from './lib/common.mjs';
import { driveMaxContent } from './fixtures/register.mjs';

const measure = (page) =>
  page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll('body *')]
      .filter((el) => el.checkVisibility() && el.getBoundingClientRect().right > vw + 0.5)
      .slice(0, 8)
      .map((el) => `${window.__describe(el)} right=${Math.round(el.getBoundingClientRect().right)}`);
    return { scrollWidth: document.documentElement.scrollWidth, viewport: vw, offenders };
  });

const srv = await server();
const br = await browser();
const rows = [];

const widths = [...new Set([...SCROLL_WIDTHS, ...HEADER_WIDTHS.slice(0, 2)])].sort((a, b) => a - b);
for (const t of targets(widths)) {
  const { context, page } = await open(br, srv.url, t);
  await installDescribe(page);
  rows.push({ screen: t.screen, width: t.width, state: 'default', ...(await measure(page)) });

  if (t.kind === 'built' && t.width < BREAKPOINT) {
    const menu = page.locator('button[aria-label="Open menu"]');
    if (await menu.count()) {
      await menu.click();
      rows.push({ screen: t.screen, width: t.width, state: 'menu open', ...(await measure(page)) });
    }
  }
  if (t.derived && (await revealStates(page))) {
    rows.push({ screen: t.screen, width: t.width, state: 'all states shown', ...(await measure(page)) });
  }
  if (t.kind === 'built' && t.screen === 'register') {
    await page.reload({ waitUntil: 'networkidle' });
    await installDescribe(page);
    await driveMaxContent(page);
    rows.push({ screen: t.screen, width: t.width, state: 'max content', ...(await measure(page)) });
  }
  await context.close();
}

const failures = rows.filter((r) => r.scrollWidth > r.viewport);
save('overflow', {
  status: failures.length ? 'fail' : 'pass',
  summary: `${rows.length} page states measured, ${failures.length} with horizontal scroll`,
  failures,
  rows,
});

await br.close();
await srv.close();
