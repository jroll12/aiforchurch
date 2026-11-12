# Audit report: all eight pages

## How this audit ran

- **Who:** three independent auditors, each a fresh subagent with no build context, ran in parallel on 2026-11-12.
- **What they saw:** each worked in its own copy of the repo at commit aaff03e and audited one slice of qa/stage2-audit-brief.md. The brief told them not to trust the builder's reports or checks.
- **Their reports:** saved verbatim:
  - qa/audit/copy.md (copy, placeholders, links)
  - qa/audit/a11y.md (accessibility, visual rules, layout)
  - qa/audit/flow.md (behavior, data, network)
- **This file is the merge.** It has one row per distinct finding. Duplicates across slices are merged, the higher severity is kept, and nothing is dropped.

## Totals and statuses

**32 findings were reported:**
- copy: 12, of which 2 major
- accessibility: 8, all minor
- behavior: 12, of which 2 major

**28 remain after merging duplicates.** None is a blocker, and all 4 majors are fixed.

Each row has one of three statuses:
- **fixed:** changed, and covered by a check where one is possible
- **annotated:** kept as is, with the builder's reason, for Jarret to decide. The builder did the merge, so any disagreement is shown here, never removed.
- **stale:** already fixed in a commit that landed after the audited one

`npm run check:launch` fails while any blocker or major here has status `open`. None does.

| # | Severity | Requirement | Location | What was seen | Evidence | Slice | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | major | 7 (06) payment button | src/scripts/review.js | Back from the payment page restores Review from the back/forward cache with the pay button disabled, or with an older seat choice that then gets paid for. | flow.md row 1 | flow | fixed: Review reloads on a back/forward cache restore. qa/checks/flow.mjs reproduces it in full Chromium with a cacheable server, and was shown to fail without the fix. |
| 2 | major | 7 (06) matching payment to registration | src/config.ts PAYMENT_REF_PARAM | null means payment links carry no reference code, and nothing stops launch that way. | flow.md row 2 | flow | fixed: null now blocks `npm run check:launch`. Set a parameter name, or `false` to accept matching by name. The pending message that promises the code carries [CONFIRM]. |
| 3 | major | Brief item 2 (unverified fact) | src/copy.ts accessibility line | "Tell us about any other need when you register." Register has nowhere to say it. | copy.md row 1 | copy | fixed: tagged [CONFIRM] in src/copy.ts and the approved row. Asked in qa/questions.md (question 16) where access needs should go. |
| 4 | major | Rule 2 / brief item 2 | src/copy.ts What to bring item 2 | "The newsletter topic works on a free account." has no [CONFIRM], while the same claim on Home has one. | copy.md row 2 | copy | fixed: tagged [CONFIRM]. |
| 5 | minor | 8 tap targets | Home FAQ answer 6 "For your board" link | The inline link is 20px tall. The builder's check skipped it because closed details hide it. | a11y.md row 1 | a11y | fixed: 12px vertical padding gives a 44px hit area with no layout change. The tap-target check now also measures with every FAQ open. |
| 6 | minor | 8 focus order (WCAG 2.4.3) | Register and Review action buttons below 900px | Continue showed above Back, but Tab reached Back first. | a11y.md row 2 | a11y | fixed: the primary button is rendered in both orders, and the one not in use is `display:none`. Tab order now matches the screen in both layouts. The keyboard check fails on any upward Tab jump; it was shown to catch the old layout. Two expected text diffs went stale and were removed. |
| 7 | minor | 3 tokens only | input placeholders; native radio and checkbox borders | Placeholders used the browser default (Chromium 4.61:1; Safari's light grey would fail). Unchecked control borders are the browser default, 4.54:1. | a11y.md row 3 | a11y | fixed for placeholders: now ink2, 8.86:1 (D48). Annotated for control borders: they are UI components needing 3:1, which they meet in Chromium. Styling native controls is out of scope. |
| 8 | minor | 4 layout | Confirmation reference line | `.refl` margin lost to `.pg p`; 0px gap under the retry button. | a11y.md row 4 | a11y | fixed: selector raised to `.pg .refl`. |
| 9 | minor | 7 print black on white; 2 6px rule | For your board print | Grey (ink2) text and a 4px top rule in print. | a11y.md row 5 | a11y | fixed: all print text is ink, and the 6px rule is kept. The print check now fails on any non-ink text or a rule that isn't 6px. The page still fits on 1 page (71% full). |
| 10 | minor | 4 desktop header | every page 900 to about 1057px; Home at 900 to 913 | At 900px the wordmark's box overlapped the first nav link's box by 5.5px, so hit areas and focus rings collided. The wordmark wraps to two lines. | a11y.md row 6 | a11y | fixed: from 900 to 1099px the Home header lays out as one row (nav and button at natural width, wordmark takes the rest). The nav gap is back to 24px. The header check now measures element boxes (smallest gap 24px) and was shown to catch the old layout (-6px). The two-line wordmark is annotated: the artboards wrap there too. |
| 11 | minor | 2 icon stroke 2.5 | ProgressSteps done check | stroke-width 3, from the artboard; the spec says 2.5. | a11y.md row 7 | a11y | annotated: the artboard and spec disagree. Kept as the artboard draws it and logged under design file issues in qa/questions.md. |
| 12 | minor | 8 (derived open menu) | menu button | Shows the X icon but its name stays "Open menu" while open. | a11y.md row 8 | a11y | annotated: aria-expanded states it, and "Close menu" would be new copy. Asked as question 17. |
| 13 | minor | 7 (07) what the page can know | /confirmation/ with nothing saved, or any typed ?payment value | The page states registration facts it cannot know, and `?payment=paid` clears the tab's attendees. | flow.md row 3; copy.md row 4 | flow, copy | annotated: inherent to a static page (D27). The payment provider's dashboard is the record. The only route there is the provider's redirect in the same tab. |
| 14 | minor | data: pay twice | Review | Two sends with one code but different seats can't be told apart. | flow.md row 4 | flow | fixed: every send carries `sent_at`; the latest send matching the paid amount wins. |
| 15 | minor | data: pay nothing, other tab | Review, Confirmation | Abandoned registrations look real; a second tab can pay again. | flow.md row 5 | flow | annotated: this is the cost of sending before paying (D23), chosen so every payment has a registration behind it. Matching stays manual, by code. |
| 16 | minor | 9 hosted form service | shared.js `send` | Without CORS, the service stores the entry but the page shows the error, and retries make copies. | flow.md row 6 | flow | annotated: the config notes now require CORS (src/config.ts). Question 3 says to pick a service that allows it. The mock is same-origin, so this can only be confirmed with the real service. |
| 17 | minor | data: timeout | shared.js `send` | After 10s the error shows, but the service may still store it; a retry duplicates it. | flow.md row 7 | flow | annotated: `sent_at` (row 14) makes duplicates visible. |
| 18 | minor | data: storage unavailable | register.js | A failed save still navigated, and everything typed was lost. | flow.md row 8 | flow | fixed: Continue stays on Register when storage refuses. Covered by a flow check. |
| 19 | minor | "nothing pretends to send" | Register and Questions forms | Without JavaScript, or before it runs, the forms posted visitors' details to the site's own address. | flow.md row 9 | flow | fixed: Continue and Send ship disabled and their scripts enable them. Covered by a flow check with JavaScript off. |
| 20 | minor | data: stale state | review.js | A seat count with no matching option crashed Review into a dead page. | flow.md row 10 | flow | fixed: goes back to Register. Covered by a flow check. |
| 21 | minor | 7 (06) states | Review | "Editing" and "total updated" are not distinct states, and nothing is announced. | flow.md row 11 | flow | annotated: editing happens on Register, and Review loads fresh with the new total; there is no in-page change to announce. A judgement call on the spec. |
| 22 | minor | brief item 2 | topics 4 to 7 outcome lines | Only the title carries [CONFIRM]; the outcome could be left unchecked. | copy.md row 5 | copy | fixed: PLACEHOLDERS.md says the one tag covers the title and its outcome together. |
| 23 | minor | brief item 2 | What to bring item 1 | "A laptop and its charger" lacks the [CONFIRM] its draft note carried. | copy.md row 6 | copy | fixed: tagged [CONFIRM]. |
| 24 | minor | brief item 2 | About, Why a local workshop | "leave with drafts you can use the next week" conflicts with invented sample data. | copy.md row 7 | copy | fixed: tagged [CONFIRM] for Jarret to reword or keep. |
| 25 | minor | rule 1 | Review "Step 3 of 3" | Not artboard text, spec wording, a placeholder or an approved row. | copy.md row 8 | copy | annotated: a derived pattern of the designed "Step 2 of 3" (D20). The copy check allows it as a listed pattern, and question 9 asks about step labels. |
| 26 | minor | rule 2 / 7 (06) | Review total | [TOTAL] never appears; Total shows the option price. | copy.md row 9 | copy | annotated: D24; question 7 asks whether tax or fees apply. |
| 27 | minor | expected diffs | expected-diffs.json entries 5 and 7 | The reason cited section 7 for the role value, which names none. | copy.md row 10 | copy | fixed: now cites the artboard markup and design/README.md. |
| 28 | minor | working rules | PLACEHOLDERS.md, qa/stage2-report.md, qa/questions.md | `npm run check:launch` was missing; the docs were stale after the copy was approved. | copy.md rows 11 and 12; flow.md row 12 | copy, flow | stale for check:launch (added in b195ed2, after the audited commit). Fixed for the docs: qa/questions.md was updated in ed15985, and qa/stage2-report.md now notes it is superseded on copy counts. |

## What the auditors checked and found no problem with

The full lists are in each slice report. In short:

- **Copy:** Home matches the artboards exactly. Register differs only in explained ways. Every derived-page string has an allowed source.
- **Placeholders and links:** every placeholder is intact and listed. There are no sample values, no dead links and no dashes.
- **Visual rules:** radius, shadows, images, motion, accent use, fonts, weights, rules and icons all pass. Contrast of every rendered pair is 4.71:1 or better. The grid, columns, padding and H1 sizes match, and Home and Register at 1440 match the artboards to the pixel.
- **Scroll and focus:** no horizontal scroll or overflow at any width or zoom. Focus rings are visible everywhere, and errors are linked.
- **Behavior:** Register behavior and all seven messages are right. Review, Confirmation and Questions behave as built. The network stays within allowed hosts, and production buttons send nothing.

## What could not be checked

- Safari, Firefox and real phones (qa/device-checklist.md is the kit for these).
- Screen readers and Windows forced colors.
- Real payment and form providers: their redirects, cancel pages and CORS.
- The interactive print dialog.
