# Audit brief: Stage 1 and Stage 2 (all eight public pages)

Paste everything below the line into a fresh Claude Code session opened in this repo, on branch `claude/upbeat-cray-ehwzda`. It covers both stages, so it can replace qa/audit-brief.md if neither has been audited yet.

---

You are an independent reviewer. You did not build this site, and you should not trust anything the builder wrote about it: not qa/stage1-report.md, not qa/stage2-report.md, not qa/questions.md, not qa/stage2-copy-draft.md, not code comments, and not the check scripts in qa/checks/. Verify everything yourself against the sources of truth below. Do not fix anything. Report findings only.

## Sources of truth

- HANDOFF-SPEC.md (the spec) and design/*.dc.html (the artboards: Home and Register at 1440 and 390). design/README.md explains how to read the artboards.
- CLAUDE.md, section "Hard rules".
- tokens.css (design tokens).
- SITE-KICKOFF-PROMPT.md, sections STAGE 1, STAGE 2 and CHECKS.

## What to audit

Designed pages (artboards exist):

- 01 Home: src/pages/index.astro, output dist/index.html (route `/`)
- 05 Register: src/pages/register/index.astro and src/scripts/register.js, output dist/register/index.html (route `/register/`)

Derived pages (no artboard; built from HANDOFF-SPEC.md section 7):

- 02 Workshop details: src/pages/workshop/index.astro, route `/workshop/`
- 03 For your board: src/pages/board/index.astro, route `/board/` (must print on one US Letter page)
- 04 About: src/pages/about/index.astro, route `/about/`
- 06 Review order: src/pages/register/review/index.astro and src/scripts/review.js, route `/register/review/`
- 07 Confirmation: src/pages/confirmation/index.astro and src/scripts/confirmation.js, route `/confirmation/` (states via `?payment=paid`, `pending`, `failed`)
- 08 Questions and interest list: src/pages/questions/index.astro and src/scripts/questions.js, route `/questions/`

Shared: src/layouts/Base.astro, src/components/*.astro, src/styles/site.css, src/config.ts, src/copy.ts, src/scripts/shared.js.

Build and serve:

```
npm ci
npm run build
npm run serve
```

That serves dist/ at http://127.0.0.1:4321. Review order needs a saved registration: fill in Register first, in the same tab. In dist/ the payment links and form endpoints are still placeholders, so the pay and send buttons are disabled by design. `npm run build:mock` builds dist-mock/ with mock URLs; serve it with `node qa/checks/lib/server.mjs dist-mock 4323` if you want the buttons live. The mock endpoints themselves exist only inside qa/checks/flow.mjs's server, so a send from that serve will fail, which shows the error state. To view an artboard, serve design/ the same way (`node qa/checks/lib/server.mjs design 4322`).

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

### From HANDOFF-SPEC.md section 7, the derived screens (copied verbatim)

### 02 Workshop details (not designed)
Date, time, venue, accessibility information (placeholders). Half-day agenda as timed rows. Topics in order, each with a one-line outcome. What to bring. Data safety box. Use the section pattern, ModuleCard and Notice.

### 03 For your board (not designed)
A one-page summary a pastor or board can approve in two minutes: what it is, who it is for, when and where, cost, what staff will be able to do, how information is handled, what is out of scope, who to contact. Must print cleanly on one US Letter page: write a print stylesheet, black on white, no accent fills, hide header nav and buttons. Include a Download PDF link (config value, or a print button if no PDF exists).

### 04 About (not designed)
Jarret's story [JARRET BIO], why a local workshop, how the materials are made (the honesty line), what the workshop will not do. A labeled [PHOTO] block, flat grey, no image.

### 06 Review order (not designed)
Seats, attendees, total [TOTAL], date and venue, [REFUND POLICY]. Edit links back to Register. A button to a secure hosted payment page (external). States: editing, total updated.

### 07 Confirmation (not designed)
"You are in." What happens next, add to calendar, a prep checklist, what to bring, contact, and a link to forward screen 03 to a board. States: payment pending, payment failed with retry.

### 08 Questions and interest list (not designed)
Short form: name, church, email, question, a checkbox to hear about future dates. Plain answers to the three most common questions. States: success, error.

### From HANDOFF-SPEC.md section 8 (copied verbatim)

#### 8. Accessibility

Contrast per section 3. Visible focus on every interactive element (2px ink outline, 2px offset). Tap targets 44px or more. Every input has a label. Errors are linked with aria-describedby and aria-invalid. Real buttons and links only. details and summary for FAQ. No horizontal scroll at 320, 390, 768, 1024, 1440. Works at 200% zoom. Respect prefers-reduced-motion (the design has no motion; add none).

### Also check

- Copy, designed pages: every visible string on Home and Register matches the artboards exactly, including typographic apostrophes (CLAUDE.md hard rule 1). Register should be compared in the state its artboards show.
- Copy, derived pages: hard rule 1 says do not change, add or rewrite copy, and missing copy becomes a placeholder. For every visible string, accessible name and page title on the six derived pages, decide whether it is (a) text from an artboard, (b) wording that HANDOFF-SPEC.md section 1 or 7 itself prescribes, or (c) a [PLACEHOLDER]. Anything else is a finding. Also judge whether each use of (b) is reasonable.
- Placeholders: every [PLACEHOLDER] and [CONFIRM] in the artboards appears unchanged (hard rule 2), and every placeholder on any page is listed in PLACEHOLDERS.md.
- Sample values from the artboards (Sample Community Church, Sample Person A, person.a@example.org, Sample Person B) do not appear anywhere in dist/ (hard rule 4).
- Register, Review order, Confirmation and Questions behavior matches section 7. Stage 2 rules from the kickoff: each derived page uses the same tokens and components, and the nav includes the new pages.
- For your board prints cleanly on one US Letter page: black on white, no accent fills, header nav and buttons hidden. Try it from the browser's print dialog as well.
- Layout switches at 900px, with no tablet design (section 4). Check the desktop header between 900 and 1100px on Home, where it is tightest.
- No dead links; nav links only to pages that exist (hard rule 6).
- Network: no requests except the Google Fonts stylesheet and its font files, the hosted form service and the hosted payment link (hard rule 5). No third-party scripts.
- No em dashes in docs, comments or commit messages (hard rule 8).
- Payment and registration data: think about how a registration and its payment are matched, what happens if someone pays twice or not at all, and what the Confirmation page can and cannot know. Report risks you find.

### Required: re-verify the builder's explained differences

qa/checks/expected-diffs.json lists every text difference on Home and Register that the builder considers explained, each with a reason. For each entry, open the artboard and the spec and decide whether the reason holds. An entry that does not hold is a finding.

### Optional, if you have the means

- Test on a real phone, Safari and Firefox (the builder tested Chromium only), including printing For your board from Safari.
- Try a screen reader on Register, Review order and Questions: errors, the seat picker, the Edit links and the progress strip.
- Read the scripts in qa/checks/ and say whether any of them would pass something it should fail.

## How to report

Write qa/audit-report.md with one row per finding:

| Severity (blocker, major, minor) | Requirement (spec section or hard rule) | File and line, or page, width and state | What you saw | Evidence (command output, measurement or screenshot path) |

Then list what you checked and found no problem with, and what you could not check and why. Never mark something as passing unless you checked it and saw the result.
