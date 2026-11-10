// Runs every check and writes qa/results/summary.json.
//   node qa/checks/run-all.mjs            checks dist/ (run `npm run build` first)
//   node qa/checks/run-all.mjs --design   runs the checks on the artboards (harness proof)
//   node qa/checks/run-all.mjs --only=contrast,keyboard
// The checks have no data dependency on each other: they fan out as parallel
// processes against one server, each writes its own result, and this script
// reduces them to one line per check.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, RESULTS } from './lib/common.mjs';
import { startServer } from './lib/server.mjs';

const design = process.argv.includes('--design');
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7).split(',');
const CHECKS = ['text-diff', 'overflow', 'contrast', 'keyboard', 'targets', 'zoom', 'visual', 'network', 'guards', 'behavior'].filter(
  (c) => !only || only.includes(c),
);

if (!design && !fs.existsSync(path.join(ROOT, 'dist/index.html'))) {
  console.error('dist/ is missing. Run `npm run build` first.');
  process.exit(1);
}

const suffix = design ? '.design' : '';
fs.mkdirSync(RESULTS, { recursive: true });
for (const c of CHECKS) fs.rmSync(path.join(RESULTS, `${c}${suffix}.json`), { force: true });

const { server, url } = await startServer([
  ['/__design/', path.join(ROOT, 'design')],
  ['/', path.join(ROOT, 'dist')],
]);
const env = { ...process.env, CHECK_BASE_URL: url, CHECK_TARGET: design ? 'design' : 'built' };

const run = (name) =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(ROOT, 'qa/checks', `${name}.mjs`)], { env, stdio: ['ignore', 'pipe', 'pipe'] });
    let log = '';
    child.stdout.on('data', (d) => {
      log += d;
    });
    child.stderr.on('data', (d) => {
      log += d;
    });
    child.on('close', (code) => resolve({ name, code, log }));
  });

const queue = [...CHECKS];
const done = [];
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (queue.length) done.push(await run(queue.shift()));
  }),
);
server.close();

const summary = CHECKS.map((name) => {
  const r = done.find((d) => d.name === name);
  const file = path.join(RESULTS, `${name}${suffix}.json`);
  const tail = r.log.trim().split('\n').slice(-6).join(' | ');
  if (!fs.existsSync(file)) return { check: name, status: 'error', summary: tail };
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (r.code !== 0 && data.status !== 'fail') return { check: name, status: 'error', summary: tail };
  return { check: name, status: data.status, summary: data.summary };
});

// A partial run (--only) updates its own lines and keeps the rest of the last summary.
const summaryFile = path.join(RESULTS, `summary${suffix}.json`);
const previous = only && fs.existsSync(summaryFile) ? JSON.parse(fs.readFileSync(summaryFile, 'utf8')).summary : [];
const merged = [...previous.filter((p) => !CHECKS.includes(p.check)), ...summary];
fs.writeFileSync(
  summaryFile,
  `${JSON.stringify({ target: design ? 'design' : 'built', ranAt: new Date().toISOString(), summary: merged }, null, 2)}\n`,
);
for (const s of summary) console.log(`${s.status.toUpperCase().padEnd(8)} ${s.check.padEnd(10)} ${s.summary ?? ''}`);
process.exitCode = summary.some((s) => s.status === 'fail' || s.status === 'error') ? 1 : 0;
