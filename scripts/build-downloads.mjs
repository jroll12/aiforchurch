// Builds the member downloads into public/downloads/ (committed, so any host can serve them):
//   <slug>-handout.pdf       each lesson's handout.md, printed to one US Letter page
//   <slug>-sample-files.zip  each lesson's samples/ folder, every file labeled FAKE
//   manifest.json            a hash of each download's sources, so qa/checks/downloads.mjs
//                            can tell when a download is older than its lesson
// Usage: npm run build:downloads    No new dependency: Playwright (already a dev
// dependency) prints the PDFs, and a small zip writer stores files uncompressed.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MODULES = path.join(ROOT, 'course/modules');
const OUT = path.join(ROOT, 'public/downloads');
const tokens = fs.readFileSync(path.join(ROOT, 'tokens.css'), 'utf8');

export const slugOf = (dir) => dir.replace(/^\d\d-/, '');
export const sha = (files) => {
  const h = crypto.createHash('sha256');
  for (const f of files) h.update(path.relative(ROOT, f)).update(fs.readFileSync(f));
  return h.digest('hex');
};
export const sampleFiles = (dir) => {
  const base = path.join(MODULES, dir, 'samples');
  return fs.existsSync(base) ? fs.readdirSync(base).filter((f) => !f.startsWith('.')).sort().map((f) => path.join(base, f)) : [];
};

/* ---------- handout markdown to HTML (the handout subset: headings, lists, checkboxes, code, bold) ---------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
function markdown(md) {
  const out = [];
  const lines = md.split('\n');
  let list = null;
  const close = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };
  for (let i = 0; i < lines.length; i += 1) {
    const l = lines[i];
    if (l.startsWith('```')) {
      close();
      const code = [];
      for (i += 1; i < lines.length && !lines[i].startsWith('```'); i += 1) code.push(lines[i]);
      out.push(`<pre>${esc(code.join('\n'))}</pre>`);
      continue;
    }
    let m;
    if ((m = l.match(/^(#{1,3}) (.*)$/))) {
      close();
      out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`);
    } else if ((m = l.match(/^- \[ \] (.*)$/))) {
      if (list !== 'ul class="chk"') {
        close();
        out.push('<ul class="chk">');
        list = 'ul class="chk"';
      }
      out.push(`<li>${inline(m[1])}</li>`);
    } else if ((m = l.match(/^\s*- (.*)$/))) {
      if (list !== 'ul') {
        close();
        out.push('<ul>');
        list = 'ul';
      }
      out.push(`<li>${inline(m[1])}</li>`);
    } else if ((m = l.match(/^\d+\. (.*)$/))) {
      if (list !== 'ol') {
        close();
        out.push('<ol>');
        list = 'ol';
      }
      out.push(`<li>${inline(m[1])}</li>`);
    } else if (!l.trim()) {
      close();
    } else {
      close();
      out.push(`<p>${inline(l)}</p>`);
    }
  }
  close();
  return out.join('\n').replace(/<\/(ul class="chk")>/g, '</ul>');
}

const page = (body, size) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;700;800&display=swap" rel="stylesheet">
<style>${tokens}
@page{size:letter;margin:0.5in}
body{margin:0;font:400 ${size}pt/1.35 var(--sans);color:var(--ink);border-top:4pt solid var(--ink);padding-top:8pt}
h1{font-size:${size + 8}pt;font-weight:800;letter-spacing:-0.02em;margin:0 0 4pt}
h2{font-size:${size - 1}pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin:9pt 0 3pt;border-top:1px solid var(--ink);padding-top:4pt}
p{margin:0 0 4pt}ol,ul{margin:0 0 4pt;padding-left:16pt}li{margin:0 0 2pt}
ul.chk{list-style:none;padding-left:0}ul.chk li::before{content:"";display:inline-block;width:8pt;height:8pt;border:1pt solid var(--ink);margin-right:6pt;vertical-align:-1pt}
pre{font:400 ${size - 1.5}pt/1.3 var(--sans);white-space:pre-wrap;border:1pt solid var(--ink);padding:4pt 6pt;margin:0 0 5pt}
code{font-family:inherit;font-weight:700}
footer{margin-top:8pt;border-top:4pt solid var(--ink);padding-top:4pt;font-size:${size - 2}pt;color:var(--ink2)}
</style></head><body>${body}
<footer>Course materials are drafted with AI, then taught and checked by Jarret Roloff.</footer></body></html>`;

/* ---------- zip writer (stored, no compression) ---------- */
const CRC = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});
const crc32 = (buf) => {
  let c = -1;
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};
function zip(entries) {
  const parts = [];
  const central = [];
  let offset = 0;
  const DOS_TIME = 0;
  const DOS_DATE = (2026 - 1980) << 9 | (1 << 5) | 1; // fixed date so builds are reproducible
  for (const { name, data } of entries) {
    const n = Buffer.from(name, 'utf8');
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6); local.writeUInt16LE(0, 8);
    local.writeUInt16LE(DOS_TIME, 10); local.writeUInt16LE(DOS_DATE, 12); local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(n.length, 26); local.writeUInt16LE(0, 28);
    parts.push(local, n, data);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0x0800, 8); c.writeUInt16LE(0, 10);
    c.writeUInt16LE(DOS_TIME, 12); c.writeUInt16LE(DOS_DATE, 14); c.writeUInt32LE(crc, 16); c.writeUInt32LE(data.length, 20);
    c.writeUInt32LE(data.length, 24); c.writeUInt16LE(n.length, 28); c.writeUInt32LE(offset, 42);
    central.push(c, n);
    offset += 30 + n.length + data.length;
  }
  const cd = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...parts, cd, end]);
}

export const pdfPages = (buf) => (buf.toString('latin1').match(/\/Type\s*\/Page(?!s)/g) ?? []).length;

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  fs.mkdirSync(OUT, { recursive: true });
  const dirs = fs.readdirSync(MODULES).filter((d) => /^\d\d-/.test(d)).sort();
  const manifest = {};
  const br = await chromium.launch();
  for (const dir of dirs) {
    const slug = slugOf(dir);
    const handout = path.join(MODULES, dir, 'handout.md');
    const body = markdown(fs.readFileSync(handout, 'utf8'));
    let pdf;
    let size = 10.5;
    for (; size >= 8; size -= 0.5) {
      const p = await br.newPage();
      await p.setContent(page(body, size), { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      pdf = await p.pdf({ format: 'Letter', preferCSSPageSize: true });
      await p.close();
      if (pdfPages(pdf) === 1) break;
    }
    fs.writeFileSync(path.join(OUT, `${slug}-handout.pdf`), pdf);
    const files = sampleFiles(dir);
    fs.writeFileSync(path.join(OUT, `${slug}-sample-files.zip`), zip(files.map((f) => ({ name: `${slug}-sample-files/${path.basename(f)}`, data: fs.readFileSync(f) }))));
    manifest[slug] = { handout: sha([handout]), samples: sha(files), pages: pdfPages(pdf), fontPt: size, files: files.map((f) => path.basename(f)) };
    console.log(`${slug}: handout ${pdfPages(pdf)} page at ${size}pt, ${files.length} sample files`);
  }
  await br.close();
  fs.writeFileSync(path.join(OUT, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}
