// Static, host-agnostic build. If the site is ever served from a subpath
// (for example a GitHub Pages project site), set `base` here; every link
// goes through src/lib/url.ts, so nothing else needs to change.
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
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
