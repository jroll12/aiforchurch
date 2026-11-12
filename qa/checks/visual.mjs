// Check 7: visual comparison at 390 and 1440 (SITE-KICKOFF-PROMPT.md check 7).
// design/screenshots/ was not provided, so the reference is the artboard
// files themselves rendered in Chromium. That is a substitute and is reported
// as one. Output: qa/screenshots/<screen>-<width>.jpg, three panels side by
// side (design | built | changed pixels in red), for human review.
// The six derived pages have no artboard, so they get a plain screenshot
// each (qa/screenshots/<page>-<width>.jpg) for review, with nothing to compare.
import fs from 'node:fs';
import path from 'node:path';
import { RAW, SHOTS, SCREENS, DERIVED, TARGET, LAYOUT_WIDTHS, designPath, server, browser, open, save } from './lib/common.mjs';
import { driveComposite } from './fixtures/register.mjs';

if (TARGET === 'design') {
  save('visual', { status: 'not run', summary: 'compares built pages with artboards; nothing to compare before pages exist' });
  process.exit(0);
}

const srv = await server();
const br = await browser();
fs.mkdirSync(RAW, { recursive: true });
fs.mkdirSync(SHOTS, { recursive: true });

async function capture(target, file, prepare) {
  const { context, page } = await open(br, srv.url, target);
  if (prepare) await prepare(page);
  await page.evaluate(() => document.activeElement?.blur());
  await page.screenshot({ path: file, fullPage: true });
  await context.close();
}

async function compose(designPng, builtPng, outJpg, scale) {
  const context = await br.newContext({ viewport: { width: 800, height: 600 } });
  const page = await context.newPage();
  const toData = (f) => `data:image/png;base64,${fs.readFileSync(f).toString('base64')}`;
  const result = await page.evaluate(
    async ({ a, b, k }) => {
      const load = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      const [ia, ib] = await Promise.all([load(a), load(b)]);
      const w = Math.max(ia.width, ib.width);
      const h = Math.max(ia.height, ib.height);
      const read = (img) => {
        const c = new OffscreenCanvas(w, h);
        const x = c.getContext('2d');
        x.fillStyle = 'white';
        x.fillRect(0, 0, w, h);
        x.drawImage(img, 0, 0);
        return x.getImageData(0, 0, w, h);
      };
      const da = read(ia);
      const db = read(ib);
      const diff = new ImageData(w, h);
      let changed = 0;
      for (let i = 0; i < da.data.length; i += 4) {
        const d = Math.abs(da.data[i] - db.data[i]) + Math.abs(da.data[i + 1] - db.data[i + 1]) + Math.abs(da.data[i + 2] - db.data[i + 2]);
        if (d > 48) {
          changed += 1;
          diff.data.set([210, 30, 30, 255], i);
        } else {
          const g = 255 - (255 - da.data[i]) * 0.2;
          diff.data.set([g, g, g, 255], i);
        }
      }
      const gap = 24;
      const out = new OffscreenCanvas(Math.round((w * 3 + gap * 2) * k), Math.round(h * k));
      const ctx = out.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, out.width, out.height);
      ctx.scale(k, k);
      ctx.drawImage(ia, 0, 0);
      ctx.drawImage(ib, w + gap, 0);
      const dc = new OffscreenCanvas(w, h);
      dc.getContext('2d').putImageData(diff, 0, 0);
      ctx.drawImage(dc, (w + gap) * 2, 0);
      const blob = await out.convertToBlob({ type: 'image/jpeg', quality: 0.72 });
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let bin = '';
      for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      return { jpeg: btoa(bin), designHeight: ia.height, builtHeight: ib.height, changedRatio: changed / (w * h) };
    },
    { a: toData(designPng), b: toData(builtPng), k: scale },
  );
  fs.writeFileSync(outJpg, Buffer.from(result.jpeg, 'base64'));
  await context.close();
  return { designHeight: result.designHeight, builtHeight: result.builtHeight, changedPercent: Math.round(result.changedRatio * 1000) / 10 };
}

const rows = [];
for (const s of SCREENS) {
  for (const width of LAYOUT_WIDTHS) {
    const designPng = path.join(RAW, `visual-${s.id}-${width}-design.png`);
    const builtPng = path.join(RAW, `visual-${s.id}-${width}-built.png`);
    await capture({ width, path: designPath(s.id, width) }, designPng, (page) => page.addStyleTag({ content: '.pg{min-height:0 !important}' }));
    await capture({ width, path: s.built }, builtPng, s.id === 'register' ? driveComposite : null);
    const out = path.join(SHOTS, `${s.id}-${width}.jpg`);
    const metrics = await compose(designPng, builtPng, out, width > 900 ? 0.35 : 0.6);
    rows.push({ screen: s.id, width, image: path.relative(path.resolve(SHOTS, '../..'), out), ...metrics });
  }
}

const derived = [];
for (const s of DERIVED) {
  for (const width of LAYOUT_WIDTHS) {
    const { context, page } = await open(br, srv.url, { width, path: s.built, seed: s.seed });
    await page.evaluate(() => document.activeElement?.blur());
    const out = path.join(SHOTS, `${s.id}-${width}.jpg`);
    await page.screenshot({ path: out, fullPage: true, type: 'jpeg', quality: 60 });
    derived.push({ screen: s.id, width, image: path.relative(path.resolve(SHOTS, '../..'), out), height: await page.evaluate(() => document.documentElement.scrollHeight) });
    await context.close();
  }
}

save('visual', {
  status: 'review',
  summary: `substitute reference (artboards rendered in Chromium; design/screenshots/ not provided). ${rows
    .map((r) => `${r.screen}@${r.width}: heights ${r.designHeight}/${r.builtHeight}px, ${r.changedPercent}% pixels changed`)
    .join('; ')}. Derived pages, no reference: ${derived.length} screenshots for review`,
  rows,
  derived,
});

await br.close();
await srv.close();
