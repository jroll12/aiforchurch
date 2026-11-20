// Member downloads (scripts/build-downloads.mjs, public/downloads/): every
// lesson has a one-page handout PDF and a sample-file zip whose files match
// samples/, and nothing is older than its lesson (hashes in manifest.json).
//   node qa/checks/downloads.mjs           checks public/downloads
//   node qa/checks/downloads.mjs --proof   tampers a copy of the manifest and must catch it
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, save } from './lib/common.mjs';
import { slugOf, sha, sampleFiles, pdfPages } from '../../scripts/build-downloads.mjs';

const proof = process.argv.includes('--proof');
const OUT = path.join(ROOT, 'public/downloads');
const MODULES = path.join(ROOT, 'course/modules');

function zipNames(buf) {
  const names = [];
  for (let i = 0; i + 46 <= buf.length; i += 1) {
    if (buf.readUInt32LE(i) !== 0x02014b50) continue;
    const n = buf.readUInt16LE(i + 28);
    names.push(buf.subarray(i + 46, i + 46 + n).toString('utf8'));
    i += 45 + n;
  }
  return names;
}

function check(manifest, exists = (f) => fs.existsSync(f)) {
  const findings = [];
  for (const dir of fs.readdirSync(MODULES).filter((d) => /^\d\d-/.test(d)).sort()) {
    const slug = slugOf(dir);
    const pdf = path.join(OUT, `${slug}-handout.pdf`);
    const zip = path.join(OUT, `${slug}-sample-files.zip`);
    const entry = manifest[slug];
    if (!exists(pdf)) findings.push(`${slug}: no handout PDF`);
    else if (pdfPages(fs.readFileSync(pdf)) !== 1) findings.push(`${slug}: handout PDF is not one page`);
    if (!exists(zip)) findings.push(`${slug}: no sample-file zip`);
    else {
      const want = sampleFiles(dir).map((f) => `${slug}-sample-files/${path.basename(f)}`);
      const got = zipNames(fs.readFileSync(zip));
      if (JSON.stringify(got) !== JSON.stringify(want)) findings.push(`${slug}: zip holds [${got.join(', ')}], samples/ has [${want.join(', ')}]`);
    }
    if (!entry) findings.push(`${slug}: not in manifest.json`);
    else {
      if (entry.handout !== sha([path.join(MODULES, dir, 'handout.md')])) findings.push(`${slug}: handout PDF is older than handout.md (run npm run build:downloads)`);
      if (entry.samples !== sha(sampleFiles(dir))) findings.push(`${slug}: sample zip is older than samples/ (run npm run build:downloads)`);
    }
  }
  return findings;
}

const manifestFile = path.join(OUT, 'manifest.json');
const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {};
if (proof) {
  const tampered = JSON.parse(JSON.stringify(manifest));
  const first = Object.keys(tampered)[0];
  tampered[first].handout = 'stale';
  const findings = check(tampered, (f) => !f.endsWith(`${Object.keys(tampered)[1]}-sample-files.zip`) && fs.existsSync(f));
  const ok = findings.some((f) => f.includes('older than handout.md')) && findings.some((f) => f.includes('no sample-file zip'));
  save('downloads.proof', { status: ok ? 'pass' : 'fail', summary: `tampered manifest and a missing zip: ${findings.length} findings (${findings.join('; ')})`, findings });
} else {
  const findings = check(manifest);
  save('downloads', { status: findings.length ? 'fail' : 'pass', summary: `${Object.keys(manifest).length} lessons: handout PDFs one page each, zips match samples/, ${findings.length} findings`, findings });
}
