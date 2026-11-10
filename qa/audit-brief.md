# Audit brief: Stage 1 (Home and Register)

Paste everything below the line into a fresh Claude Code session opened in this repo, on branch `claude/upbeat-cray-ehwzda`.

---

You are an independent reviewer. You did not build this site, and you should not trust anything the builder wrote about it: not qa/stage1-report.md, not qa/questions.md, not code comments, and not the check scripts in qa/checks/. Verify everything yourself against the sources of truth below. Do not fix anything. Report findings only.

## Sources of truth

- HANDOFF-SPEC.md (the spec) and design/*.dc.html (the artboards: Home and Register at 1440 and 390). design/README.md explains how to read the artboards.
- CLAUDE.md, section "Hard rules".
- tokens.css (design tokens).

## What to audit

Built pages:

- 01 Home: source src/pages/index.astro, output dist/index.html (route `/`)
- 05 Register: source src/pages/register/index.astro and src/scripts/register.js, output dist/register/index.html (route `/register/`)
- Shared: src/layouts/Base.astro, src/components/*.astro, src/styles/site.css, src/config.ts

Build and serve:

```
npm ci
npm run build
npm run serve
```

That serves dist/ at http://127.0.0.1:4321. To view an artboard in a browser, serve design/ the same way (`node qa/checks/lib/server.mjs design 4322`) and open http://127.0.0.1:4322/home-c-desktop.dc.html.

## Requirements

### From HANDOFF-SPEC.md sections 2 and 3 (copied verbatim)

#### 2. Direction C rules

- Type-led and nearly colorless. Near-black on white, hairline rules, a 6px ink rule at the very top of every page and a 6px ink rule above the footer.
- One accent, vermilion, ONLY for interactive elements: buttons, links, checkbox and radio controls, the next-topic link. Never for headings, decoration or status.
- Libre Franklin only, weights 300, 400, 500, 700, 800. Headings 800 with negative tracking. Large light (300) numerals for topics and steps. Section labels: 14px, 700, uppercase, 0.1em tracking.
- Radius 0 everywhere. No images, gradients, shadows or emoji.
- Lines: 1px ink for section rules, 1px hair for row separators, 1.5px ink for boxes and inputs, 3px err for an input in error.
- Icons: inline SVG from the Lucide set, stroke 2.5: arrow-right, check, circle-alert, shield-check, plus, minus, x, menu, download. Copy the SVG paths from design/.

#### 3. Tokens and contrast

Use tokens.css. Verified contrast ratios (computed 2026-11-09):

| Pair | Ratio |
| --- | --- |
| ink on white | 18.88 |
| ink2 on white | 8.86 |
| accent on white, and white on accent | 5.18 |
| err on white | 6.57 |
| ink2 on tint | 8.05 |

Any new pair must be computed and added to qa/stage1-report.md.


### From HANDOFF-SPEC.md section 8 (copied verbatim)

#### 8. Accessibility

Contrast per section 3. Visible focus on every interactive element (2px ink outline, 2px offset). Tap targets 44px or more. Every input has a label. Errors are linked with aria-describedby and aria-invalid. Real buttons and links only. details and summary for FAQ. No horizontal scroll at 320, 390, 768, 1024, 1440. Works at 200% zoom. Respect prefers-reduced-motion (the design has no motion; add none).


### Also check

- Copy: every visible string on both pages matches the artboards exactly, including typographic apostrophes (CLAUDE.md hard rule 1). Register should be compared in the state its artboards show.
- Placeholders: every [PLACEHOLDER] and [CONFIRM] in the artboards appears unchanged (CLAUDE.md hard rule 2; PLACEHOLDERS.md lists them).
- Sample values from the artboards (Sample Community Church, Sample Person A, person.a@example.org, Sample Person B) do not appear anywhere in dist/ (hard rule 4).
- Register behavior matches HANDOFF-SPEC.md section 7, including the derived validation messages and focus on the first invalid field.
- Layout switches at 900px, with no tablet design (section 4). No horizontal scroll at 320, 390, 768, 1024 and 1440 px.
- No dead links; nav links only to pages that exist (hard rule 6).
- Network: no requests except the Google Fonts stylesheet and its font files (hard rule 5).
- No em dashes in docs, comments or commit messages (hard rule 8).

### Required: re-verify the builder's explained differences

qa/checks/expected-diffs.json lists every text difference the builder considers explained, each with a reason. For each entry, open the artboard and the spec and decide whether the reason holds. An entry that does not hold is a finding.

### Optional, if you have the means

- Test on a real phone, Safari and Firefox (the builder tested Chromium only).
- Try a screen reader on Register: errors, the seat picker and the progress strip.
- Read the scripts in qa/checks/ and say whether any of them would pass something it should fail.

## How to report

Write qa/audit-report.md with one row per finding:

| Severity (blocker, major, minor) | Requirement (spec section or hard rule) | File and line, or page, width and state | What you saw | Evidence (command output, measurement or screenshot path) |

Then list what you checked and found no problem with, and what you could not check and why. Never mark something as passing unless you checked it and saw the result.
