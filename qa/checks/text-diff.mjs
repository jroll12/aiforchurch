// Check 1: visible text of the built pages against the artboards, at both
// layouts (SITE-KICKOFF-PROMPT.md check 1). Register is driven into the
// composite state the artboards show before its text is read.
// Pass means every difference is listed in expected-diffs.json with a reason,
// and no listed difference has gone stale.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, RAW, SCREENS, TARGET, LAYOUT_WIDTHS, designPath, server, browser, open, save, extractLines, diffLines } from './lib/common.mjs';
import { driveComposite } from './fixtures/register.mjs';

const srv = await server();
const br = await browser();

async function linesOf(target, prepare) {
  const { context, page } = await open(br, srv.url, target);
  if (prepare) await prepare(page);
  const lines = await page.evaluate(extractLines);
  await context.close();
  return lines;
}

if (TARGET === 'design') {
  // Harness proof: the extractor must find the copy in every artboard.
  const counts = [];
  for (const s of SCREENS) {
    for (const width of LAYOUT_WIDTHS) {
      const lines = await linesOf({ width, path: designPath(s.id, width) });
      counts.push({ screen: s.id, width, lines: lines.length, first: lines.slice(0, 6), last: lines.slice(-3) });
    }
  }
  save('text-diff', {
    status: counts.every((c) => c.lines > 20) ? 'pass' : 'fail',
    summary: counts.map((c) => `${c.screen}@${c.width}: ${c.lines} lines`).join(', '),
    counts,
  });
} else {
  const expected = JSON.parse(fs.readFileSync(path.join(ROOT, 'qa/checks/expected-diffs.json'), 'utf8'));
  const results = [];
  for (const s of SCREENS) {
    for (const width of LAYOUT_WIDTHS) {
      const design = await linesOf({ width, path: designPath(s.id, width) });
      const built = await linesOf({ width, path: s.built }, s.id === 'register' ? driveComposite : null);
      const diffs = diffLines(design, built).map((d) => {
        const hit = expected.find((e) => e.screen === s.id && e.width === width && e.side === d.side && e.text === d.text);
        return { ...d, explained: Boolean(hit), reason: hit?.reason ?? null };
      });
      results.push({ screen: s.id, width, designLines: design.length, builtLines: built.length, diffs, design, built });
    }
  }
  const unexplained = results.flatMap((r) =>
    r.diffs.filter((d) => !d.explained).map((d) => ({ screen: r.screen, width: r.width, side: d.side, text: d.text })),
  );
  const stale = expected.filter(
    (e) => !results.some((r) => r.screen === e.screen && r.width === e.width && r.diffs.some((d) => d.side === e.side && d.text === e.text)),
  );
  const total = results.reduce((n, r) => n + r.diffs.length, 0);
  fs.mkdirSync(RAW, { recursive: true });
  fs.writeFileSync(
    path.join(RAW, 'text-lines.json'),
    JSON.stringify(results.map(({ screen, width, design, built }) => ({ screen, width, design, built })), null, 2),
  );
  save('text-diff', {
    status: unexplained.length || stale.length ? 'fail' : 'pass',
    summary: `${total} differences, ${unexplained.length} unexplained, ${stale.length} stale expectations`,
    unexplained,
    stale,
    results: results.map(({ design, built, ...r }) => r),
  });
}

await br.close();
await srv.close();
