# Stage 1 report: 01 Home and 05 Register

Built 2026-11-09 to 2026-11-10 on branch `claude/upbeat-cray-ehwzda`. Stage 2 has not started.

## What was built

| Screen | Source | Built page |
| --- | --- | --- |
| 01 Home | src/pages/index.astro | dist/index.html (route `/`) |
| 05 Register | src/pages/register/index.astro, src/scripts/register.js | dist/register/index.html (route `/register/`) |

- **Stack:** Astro 7.4.2 (static output) and Playwright 1.63.0 (dev only, for the checks), both pinned exactly and approved with the plan. Node 22.23.4 or newer.
- **Shared code:** one layout (src/layouts/Base.astro) and 15 components in src/components/, named after the design's data-component attributes, plus src/styles/site.css. tokens.css is imported unchanged as the only color and layout token source. Every placeholder, the working title, the payment link and form endpoint values, and the route list live in src/config.ts.
- **Register state:** a valid Continue writes to sessionStorage key `cfco:registration` and restores on load. Stage 1 does not navigate, because /register/review/ does not exist yet (qa/questions.md D11).
- **Not launchable on its own:** without Stage 2 there is no review page, no form submission and no payment. Do not deploy Stage 1 publicly. `NOINDEX` is on in src/config.ts.

To rebuild and rerun everything:

```
npm ci
npm run build
npm run check
```

`npm run check` writes qa/results/*.json and qa/screenshots/*.jpg. `node qa/checks/run-all.mjs --design` runs the same harness on the artboards.

## What ran

- Harness written before the pages, from design/ and HANDOFF-SPEC.md only, then run on the artboards (qa/results/*.design.json). That run reproduced the five spec contrast ratios exactly and flagged the design's own gaps: no 2px ink focus ring, and five link types under 44px.
- Final run on the built pages: 2026-11-10, headless Chromium through Playwright 1.63.0, Libre Franklin loaded from Google Fonts. Results: qa/results/summary.json and one file per check.
- Not run anywhere: real phones, Safari, Firefox, and a screen reader. Every browser result below is Chromium only.

## Results

| # | Check | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Text diff, both layouts | pass | 16 differences, 0 unexplained, 0 stale. Each listed below. qa/results/text-diff.json |
| 2 | No horizontal scroll at 320, 390, 768, 1024, 1440 | pass | 21 page states, scrollWidth equals viewport in all: default, menu open below 900px, and Register at maximum content (three rows, every error). qa/results/overflow.json |
| 3 | Contrast | pass | Spec pairs reproduced exactly; 7 new pairs computed; 12 rendered pairs measured, lowest 4.61:1 (placeholder text); 0 accent misuses. Tables below. qa/results/contrast.json |
| 4 | Keyboard | pass | Tab reached every focusable element (Home 11 of 11 at 390, 12 of 12 at 1440; Register 12 of 12 at both), each stop with a 2px ink outline. All 6 FAQ items open and close with Enter and Space at both widths. Empty Continue: 4 invalid fields, each with aria-describedby pointing at visible error text, focus on the first seat radio. Composite state: only Attendee 2 email invalid, with the designed message, focused. Mobile menu: Enter opens, Tab moves into the nav, Escape closes and returns focus. qa/results/keyboard.json |
| 5 | Tap targets 44px or more | pass | 92 targets measured. Smallest side by group: buttons 44, menu button 44, radio labels 94.8, checkbox label 44, links 44, FAQ summaries 64. qa/results/targets.json |
| 6 | 200% zoom | pass | 10 states at 720 and 640 px CSS width with device scale 2 (what 200% zoom does to a 1440 or 1280 px window): no scroll, no clipped text, no overlapping text boxes. Screenshots in qa/results/raw/ (not committed). qa/results/zoom.json |
| 7 | Visual comparison at 390 and 1440 | reviewed, substitute reference | design/screenshots/ was not provided, so the reference is the artboard files rendered in Chromium. Side by side (design, built, changed pixels): qa/screenshots/home-390.jpg, home-1440.jpg, register-390.jpg, register-1440.jpg. Findings below. qa/results/visual.json |
| 8 | Network | pass | Hosts requested during load, menu, every FAQ, and a full valid Register submission: 127.0.0.1, fonts.googleapis.com, fonts.gstatic.com. No scripts from anywhere else. qa/results/network.json |
| + | Guards | pass | No sample values in dist/; all 10 design placeholders present byte for byte; no dead links or missing anchors; no external scripts; no color literals in site.css; no em or en dashes in repo docs, code or commit messages. qa/results/guards.json |
| + | Register behavior | pass | 25 of 25 assertions: first-load state, seat switching, status count, remove and add with focus, kept values, every validation message, error clearing, focus on the first invalid field, saved state and reference code, no navigation, restore on reload. qa/results/behavior.json |

### Check 1: every text difference

Register is compared in the state the artboards show (three seats, two rows filled, Continue pressed), driven by a test-only fixture.

| Screen and width | Design only | Built only | Reason |
| --- | --- | --- | --- |
| Home 1440, Register 1440 | Workshop, For your board, About (nav) | | Pages not built in Stage 1; nav links only to pages that exist (kickoff Stage 1 step 3, CLAUDE.md rule 6). 6 differences. |
| Register 390 and 1440 | Attendee 2 email with no placeholder | placeholder "name@church.org" | The artboard leaves this one field bare; section 7 sets the placeholder on every email field. 4 differences. |
| Register 390 and 1440 | Attendee 2 role "Administrator" | "Communications" | The static artboard shows the select's first option (design/README.md); section 7 intends Communications. 4 differences. |
| Register 390 | "Continue to review" before "Back" | "Continue to review" after "Back" | One DOM for both layouts keeps the desktop order; CSS shows Continue first on mobile. 2 differences. |

Home at 390 has no text differences.

### Check 3: contrast

Spec pairs (HANDOFF-SPEC.md section 3), recomputed from tokens.css:

| Pair | Spec | Computed |
| --- | --- | --- |
| ink on white | 18.88 | 18.88 |
| ink2 on white | 8.86 | 8.86 |
| accent on white, and white on accent | 5.18 | 5.18 |
| err on white | 6.57 | 6.57 |
| ink2 on tint | 8.05 | 8.05 |

New pairs used in Stage 1:

| Pair | Where | Ratio | Minimum |
| --- | --- | --- | --- |
| white on ink | ProgressSteps current step | 18.88 | 4.5 |
| ink on tint | selected seat row text | 17.15 | 4.5 |
| accent on tint | radio control in the selected seat row (non-text) | 4.70 | 3 |
| white on accent-hover | button hover | 7.31 | 4.5 |
| ink2 on disabled-bg | disabled button text, disabled remove icon | 7.10 | 4.5 |
| ink on white | input, menu and remove borders, focus ring (non-text) | 18.88 | 3 |
| err on white | 3px error border (non-text) | 6.57 | 3 |
| #757575 on white | placeholder text (Chromium's default placeholder color, not a token) | 4.61 | 4.5 |

The placeholder color is the browser default, as in the artboards. It passes in Chromium at 4.61:1, a thin margin, and other browsers use different defaults. Not tested elsewhere.

### Check 7: what the side-by-side images show

- **Desktop (1440):** Home and Register match the artboards to within anti-aliasing (under 0.05% and 0.1% of pixels changed in the final run, identical page heights). The visible difference is the three nav items omitted on purpose.
- **Mobile (390):** the built pages are taller (Home 4383 vs 4193 px, Register 3549 vs 3499 px). The cause is the artboard files, not the build: in a browser, the mobile artboards render their sections flush to the left edge because later padding shorthands cancel `.in{padding:0 20px}`. The build uses the 20px side padding HANDOFF-SPEC.md section 4 specifies, so lines wrap a little sooner. Order, type, rules, boxes, the seat picker, the designed error and the button stack otherwise match.

## Deviations from the design, with reasons

1. **Nav shows only "Questions"** (to /#faq) until Stage 2 pages exist. Kickoff Stage 1 step 3.
2. **Register button order on mobile:** the DOM keeps Back, Continue; CSS shows Continue first as the mobile artboard does. Keyboard order on mobile is therefore Back then Continue.
3. **Mobile side padding is 20px**, per section 4, where the artboard files render 0 (design file issue in qa/questions.md).
4. **Focus ring:** 2px ink outline, 2px offset on every interactive element (section 8). The artboards have none.
5. **Hit areas raised to 44px** with CSS only, no visual change: wordmark, desktop nav links, "See what we cover" on desktop, consent label (qa/questions.md D16).
6. **Fields ship empty** and no seat is preselected (CLAUDE.md rule 4, section 9 default). The artboard's sample values exist only in qa/checks/fixtures/register.mjs.
7. **Attendee 2 email shows its placeholder** where the artboard showed none (section 7).
8. **Derived behavior with no artboard:** pre-choice state, row changes, status count, remove and add focus, error placement for the seat picker, error clearing, saved state, mobile menu open state, page titles. All listed in qa/questions.md (D1 to D19).
9. **Invisible additions:** viewport meta tag (the artboards lack one), `role="list"` on two styled lists, robots noindex while placeholders remain, an empty data: favicon, `aria-required` on organization and contact.
10. **Not deviations, noted for clarity:** paragraph margins that the artboard CSS declares but its own reset cancels are left cancelled, so the pages match what the artboards show (qa/questions.md, the open question on paragraph gaps).

## Known limits

- Chromium only; no Safari, Firefox, real phone or screen reader testing yet. iOS Safari may round select corners differently; untested.
- Register needs JavaScript for seat-driven rows and Continue. Without it the fields still render.
- Stage 1 cannot take a registration or a payment (see "What was built").
- The check scripts were written by the same session that built the pages. They were written first and proven on the artboards, but the independent audit (qa/audit-brief.md) is the real second opinion.
