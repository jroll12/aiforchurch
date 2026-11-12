# Stage 3 report: content-complete and launch-ready, except outside services

Built 2026-11-12 on branch `claude/upbeat-cray-ehwzda`, after your approval of the Stage 3 plan. The form service, the payment provider and hosting are deferred (your call), and so is the member area (the spec says not in this repo yet).

## What changed

1. **Your approved copy is on the pages.** You approved all 48 rows of qa/stage2-copy-draft.md and confirmed the 21 spec phrases, and the text is in src/copy.ts.
   - **Tagged at your choice:** topics 4 to 7 and the agenda times were my guesses, so each carries [CONFIRM].
   - **Tagged after the audit:** five more approved lines state facts nobody has checked yet, so they now carry [CONFIRM] too: access needs, the laptop, the free account, the seat hold, and "drafts you can use the next week".
2. **Launch gate: `npm run check:launch`.** It lists every blocker to a public launch, read from what would ship, with the line to edit for each. It fails until the launch facts are in, so it is separate from `npm run check`. It was proven on a fixture holding one of each blocker. Today's list is below.
3. **Independent audit, fanned out, merged, fixed.** Three fresh auditors (copy, accessibility and layout, behavior and data) each audited one slice of the brief, in parallel, in their own copy of the repo.
   - **Findings:** 32 reported, 28 after merging duplicates. There were no blockers, and all 4 majors are fixed. Every other finding is fixed or annotated for you, with the reason.
   - **Where:** the slice reports are in qa/audit/, and the merge is qa/audit-report.md.
4. **Page descriptions are ready but switched off.** Base.astro emits a search and link-preview description once its text is approved. Six drafts wait in qa/stage2-copy-draft.md with status `draft`. Review order and Confirmation are now never indexed, even after launch.
5. **Phone test kit.** `npm run preview:lan` serves the site to a phone on the same Wi-Fi, so no hosting is needed. qa/device-checklist.md is a 15-minute pass on iPhone Safari, Android Chrome, Mac Safari print and VoiceOver. The kit's command was checked here: the site answered on the network address. The phone pass itself is yours to run.

## What the audit changed

| Area | Fix | Check that now covers it |
| --- | --- | --- |
| Back button after paying | Review reloads when the browser restores it from cache, so the pay button never stays dead and an old seat choice never gets paid | flow: full Chromium with the back/forward cache on; shown to fail without the fix |
| Matching payments to registrations | `PAYMENT_REF_PARAM` null blocks launch; every send carries `sent_at` | launch gate; flow payload assertion |
| Keyboard order on mobile | Continue and Pay are rendered in both orders; the hidden one is out of the tab order | keyboard: fails on any upward Tab jump; shown to catch the old layout |
| Home header, 900 to 1099px | One-row layout; no box overlaps another; nav gap back to the designed 24px | headerfit: element boxes, smallest gap 24px; shown to catch the old layout (-6px) |
| Safari placeholders | Placeholder text uses ink2, 8.86:1 | contrast |
| Board print | 6px top rule kept; all print text in ink | print: fails on non-ink text or a different rule |
| Hidden links | The FAQ answer link has a 44px hit area | targets: now also measured with every FAQ open |
| Edge cases | Blocked storage, an out-of-date seat choice, and forms posting before their script runs | flow: three new assertions |

## Results (final run, 2026-11-12, Chromium through Playwright 1.63.0)

| Check | Result |
| --- | --- |
| Text diff, Home and Register | pass: 8 explained differences. The 2 about mobile button order are gone, because the order now matches the mobile artboard. |
| Copy provenance, derived pages | pass: 482 strings, every one from design, spec, approved copy or a listed placeholder |
| No horizontal scroll | pass: 108 page states |
| Header fit, 900 to 1100 | pass: box gaps 24px or more |
| Contrast | pass: 11 rendered pairs, lowest 5.18:1 (white on accent, a spec pair). The browser-default placeholder grey (4.61:1) is gone; placeholders are ink2, 8.86:1. |
| Keyboard | pass: every stop visible, no upward jumps, FAQ, errors and menu |
| Tap targets | pass: 341 measured, 0 below 44px |
| 200% zoom | pass: 40 states |
| Visual | reviewed: unchanged on Home and Register desktop (0 to 0.1% of pixels). Derived pages have screenshots only. |
| Print, For your board | pass: 1 Letter page, 71% full, ink only, 6px rule |
| Network | pass: only the site and Google Fonts |
| Guards | pass |
| Register behavior | pass: 25 of 25 |
| Flow, on the mock build | pass: 35 of 35 |
| Launch gate | fails as intended: 17 blockers, 3 warnings (below) |

## What still blocks launch (from `npm run check:launch`)

- **Workshop facts:** date, start time, venue, seats left, the two prices, refund policy, contact email.
- **[CONFIRM] tags:**
  - accessibility (4), agenda times (4), topics 4 to 7 (4)
  - what to bring (2)
  - why local (1), pending message (1), what happens next (1)
  - the two Home FAQ tags from the design
- **About:** your background sentences, and the [PHOTO] decision.
- **Services:** the registration and questions form endpoints, the payment links, and the decision on carrying the reference code.
- **Indexing:** `NOINDEX` is still on (6 pages; Review and Confirmation stay off for good).
- **Warnings only:** no calendar file until the date is set, no page descriptions until approved, no board PDF (the print button covers it).

## Known limits

- **Browsers:** Chromium only here. Safari, Firefox, real phones and screen readers are covered by qa/device-checklist.md, which is yours to run.
- **Same author:** the audit merge and the fixes were done by the builder. Every finding is kept in qa/audit-report.md with its status, and the auditors' own words are in qa/audit/.
- **Services:** the payment and form services are still mock-tested only. Their redirects, cancel behavior and CORS need the real accounts.
