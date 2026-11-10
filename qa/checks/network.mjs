// Check 8: network (SITE-KICKOFF-PROMPT.md check 8; CLAUDE.md hard rule 5).
// Records every request during load and interaction. Allowed: this server,
// Google Fonts (the stylesheet host and the font-file host), and the hosts of
// the form endpoint and payment links once those are real URLs in config.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, BREAKPOINT, targets, server, browser, save } from './lib/common.mjs';
import { driveValid } from './fixtures/register.mjs';

const configHosts = [...fs.readFileSync(path.join(ROOT, 'src/config.ts'), 'utf8').matchAll(/https?:\/\/([^/'"\s]+)/g)].map((m) => m[1]);
const ALLOWED = new Set(['127.0.0.1', 'localhost', 'fonts.googleapis.com', 'fonts.gstatic.com', ...configHosts]);

const srv = await server();
const br = await browser();
const rows = [];

for (const t of targets()) {
  const context = await br.newContext({ viewport: { width: t.width, height: 900 } });
  const page = await context.newPage();
  const urls = [];
  page.on('request', (r) => urls.push(r.url()));
  await page.goto(srv.url + t.path, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  if (t.kind === 'built') {
    if (t.width < BREAKPOINT) {
      const menu = page.locator('button[aria-label="Open menu"]');
      if (await menu.count()) await menu.click();
    }
    for (const s of await page.locator('summary').all()) await s.click();
    if (t.screen === 'register') await driveValid(page);
    await page.waitForLoadState('networkidle');
  }
  const hosts = [...new Set(urls.filter((u) => /^https?:/.test(u)).map((u) => new URL(u).hostname))];
  rows.push({ screen: t.screen, width: t.width, requests: urls.length, hosts, disallowed: hosts.filter((h) => !ALLOWED.has(h)) });
  await context.close();
}

const bad = rows.filter((r) => r.disallowed.length);
save('network', {
  status: bad.length ? 'fail' : 'pass',
  summary: `${rows.length} page loads; hosts seen: ${[...new Set(rows.flatMap((r) => r.hosts))].join(', ')}${bad.length ? `; disallowed: ${[...new Set(bad.flatMap((r) => r.disallowed))].join(', ')}` : ''}`,
  allowed: [...ALLOWED],
  rows,
});

await br.close();
await srv.close();
