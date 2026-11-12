// Static, host-agnostic build. If the site is ever served from a subpath
// (for example a GitHub Pages project site), set `base` here; every link
// goes through src/lib/url.ts, so nothing else needs to change.
import { defineConfig } from 'astro/config';

// `npm run build:mock` (CFCO_MOCK=1) builds a test-only copy with mock form and
// payment URLs into dist-mock/ for qa/checks/flow.mjs. Only dist/ is deployed.
const mock = process.env.CFCO_MOCK === '1';

export default defineConfig({
  output: 'static',
  outDir: mock ? './dist-mock' : './dist',
  base: '/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Astro 7 defaults to "jsx" whitespace handling, which can join text and
  // inline elements across line breaks. Classic compression keeps the single
  // spaces the design copy depends on.
  compressHTML: true,
});
