# Stage 2 report: 02, 03, 04, 06, 07, 08

> **Superseded in part by qa/stage3-report.md.** The copy counts and placeholder notes below are as of Stage 2. Jarret approved the copy on 2026-11-12, so the 48 placeholders are now text, and [BOARD LEDE] is filled.

Built 2026-11-12 on branch `claude/upbeat-cray-ehwzda`, after your go on the plan. Stage 1 is in qa/stage1-report.md. The member area has not started.

## What was built

**Every page below is derived, not designed.** No artboard exists for any of them. Each is built from HANDOFF-SPEC.md section 7, using only the tokens, the section pattern and the components already in the design.

| Screen | Route | Source | Status |
| --- | --- | --- | --- |
| 02 Workshop details | /workshop/ | src/pages/workshop/index.astro | derived, not designed |
| 03 For your board | /board/ | src/pages/board/index.astro, print styles in src/styles/site.css | derived, not designed |
| 04 About | /about/ | src/pages/about/index.astro | derived, not designed |
| 06 Review order | /register/review/ | src/pages/register/review/index.astro, src/scripts/review.js | derived, not designed |
| 07 Confirmation | /confirmation/ | src/pages/confirmation/index.astro, src/scripts/confirmation.js, src/pages/[file].ics.ts | derived, not designed |
| 08 Questions and interest list | /questions/ | src/pages/questions/index.astro, src/scripts/questions.js | derived, not designed |

- **Copy:** all copy for every page is in src/copy.ts, and each string is one of three kinds:
  - design text, exact from design/
  - wording that section 1 or 7 of the spec prescribes (21 phrases, listed for your confirmation in qa/stage2-copy-draft.md)
  - a named placeholder

  The six pages carry 48 new placeholders (PLACEHOLDERS.md, Stage 2 table). qa/stage2-copy-draft.md suggests text for each one. None of it ships until you mark a row approved.
- **New derived components:** AgendaRow, PhotoBlock and FormStatus. FaqAnswer exists so FAQ answer 6 can link to /board/.
- **Extended components:** ProgressSteps (a current step), SummaryPanel (Total row for Review) and PageHeader (`aria-current`).
- **Flow:** Register now goes to Review. Review sends the registration to the hosted form service, then opens the chosen option's hosted payment link carrying the reference code. Confirmation shows paid, pending or failed. Details: qa/questions.md D20 to D43.
- **Not launchable yet:**
  - The payment links and form endpoints are still placeholders, so the pay and send buttons render disabled.
  - 48 copy placeholders remain, plus the Stage 1 ones (date, venue, prices, contact).
  - `NOINDEX` is still on.

To rebuild and rerun everything:

```
npm ci
npm run verify
```

`npm run verify` builds dist/, builds the test-only dist-mock/ (form and payment URLs pointed at mock services), then runs every check. Only dist/ is ever deployed.

## What ran

- **Checks written first:** they were written from the spec before the pages, and each new check was proven in `--design` mode:
  - The copy check flags exactly the two invented sentences and the one unlisted placeholder in its fixture.
  - The header check catches the Home artboard's own nav wrap at 900px.
  - The print check counts 4 pages on a long fixture.
- **Final run:** 2026-11-12, headless Chromium through Playwright 1.63.0, all 8 pages. Results are in qa/results/summary.json and one file per check.
- **Not run anywhere:** real phones, Safari, Firefox, a screen reader, a real form service and a real payment provider. The full flow ran against mock services only.

## Results

| # | Check | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Text diff, Home and Register, both layouts | pass | 10 differences, 0 unexplained, 0 stale. The 6 nav omissions from Stage 1 are gone because the nav now lists all four pages. qa/results/text-diff.json |
| 1b | Copy provenance, 6 derived pages at 390 and 1440 | pass | 482 strings checked (visible text, hidden state blocks, accessible names, titles); 0 without an allowed source; 0 placeholders missing from PLACEHOLDERS.md. Spec wording on the pages is listed in the result. qa/results/provenance.json |
| 2 | No horizontal scroll | pass | 108 page states: 8 pages at 320, 390, 768, 900, 960, 1024 and 1440. Includes the open menu, Register at maximum content, and every derived page with all state blocks and errors shown at once. qa/results/overflow.json |
| 2b | Header fit, 900 to 1100 | pass | 32 headers at 900, 960, 1024 and 1100: every nav link on one line, smallest gap 34px (minimum 8). qa/results/headerfit.json |
| 3 | Contrast | pass | No new color pair. 12 rendered pairs on all pages, lowest 4.61:1 (browser placeholder text, as in Stage 1); 0 accent misuses. Derived pages use ink2 on tint for the [PHOTO] label (8.05, a spec pair) and err on white for the error box (6.57). qa/results/contrast.json |
| 4 | Keyboard | pass | Every focusable element reached with a 2px ink outline on all 8 pages at both widths (for example Review 10 of 10 at 1440, Questions 13 of 13). FAQ items on Home and Questions open and close with Enter and Space; the menu works. Form error linking is asserted in the flow check below. qa/results/keyboard.json |
| 5 | Tap targets 44px or more | pass | 293 targets measured, 0 below 44px. The Edit links and the forward link got 44px hit areas during this run. qa/results/targets.json |
| 6 | 200% zoom | pass | 40 states at 720 and 640 px CSS width, device scale 2: all 8 pages, plus the derived pages with every state shown. No scroll, no clipping, no overlap. qa/results/zoom.json |
| 7 | Visual | reviewed | Home and Register look the same as in Stage 1 (desktop about 0% of pixels changed). The derived pages have no reference, so there are 12 plain screenshots for your review: qa/screenshots/{workshop,board,about,questions,review,confirmation}-{390,1440}.jpg. qa/results/visual.json |
| 8 | Network | pass | Loads and interactions on all 8 pages: hosts 127.0.0.1, fonts.googleapis.com, fonts.gstatic.com. The full payment and question flow on the mock build stayed on the same hosts. qa/results/network.json, flow.json |
| 9 | Print, /board/ | pass | Chromium PDF at US Letter: 1 page. Content fills about 70% of the printable height with placeholders in place; only [BOARD LEDE] is still missing there. No accent color, no nav or buttons in print, footer and honesty line present. qa/results/print.json |
| + | Guards | pass | No sample values in dist/; all 10 design placeholders present; every bracketed placeholder in dist/ listed in PLACEHOLDERS.md; no mock URL in dist/; no dead links or anchors; no external scripts; no color literals in site.css; no em or en dashes in repo docs, code or commit messages. qa/results/guards.json |
| + | Register behavior | pass | 25 of 25. One assertion changed: a valid Continue now opens Review instead of staying on Register. qa/results/behavior.json |
| + | Flow, on dist-mock/ | pass | 31 of 31 (list below). qa/results/flow.json |

### What the flow check proves

- **Register to Review:** a valid Continue opens Review. Review shows the organization, the contact, every attendee and the question; the seats and total come from the chosen option, followed by date, venue and refund policy.
- **Editing:** there is one Edit link per Register section. Register restores everything, a seat change updates the total, and the reference code survives editing.
- **Paying:**
  - A failed send shows the error state, stays on Review and records nothing.
  - The retry sends the registration (URL-encoded, asking for JSON) with the reference code and every field, then opens the chosen option's payment link with `client_reference_id` set to the reference code.
  - Review with nothing saved goes back to Register.
- **Confirmation:**
  - `?payment=paid` shows one state and the reference code, then clears the attendee details and keeps the code.
  - No status means pending.
  - `?payment=failed` shows a retry button that goes back to the same payment link with the same code.
  - With nothing saved, the page still renders without a code.
  - There is no calendar link while the date is a placeholder. The forward link is an email holding the board page address.
- **Questions:**
  - Name and email are required, errors are linked to their fields and focus moves to the first; typing clears an error; a malformed email is caught.
  - A failed send keeps the values. A success sends every field and replaces the error.
  - A filled honeypot shows success and sends nothing.
- **Network:** only this server and Google Fonts during the whole flow.

### What I saw reviewing the screenshots

- **Print fix:** the printed board page dropped the square bullets, because browsers skip background colors when printing. Fixed with `print-color-adjust: exact`; the PDF now shows them.
- **About desktop:** the 4:5 photo block is much taller than the one-line [JARRET BIO]. The gap closes once the bio is real.
- **Review mobile:** reads top to bottom like Register, with [PAY BUTTON] in the disabled style above Back.
- **Headers:** the desktop header shows all four nav items on every page; Home keeps the Reserve seats button.

## Deviations from the design, with reasons

1. **Nav:** Workshop, For your board, About, Questions on every page. Questions goes to /questions/ instead of the Home FAQ. Kickoff: "update the nav to include them".
2. **Home header from 900 to 1099px:** the nav overflows left into the unused wordmark columns, with a 16px gap instead of 24px. The Home artboard's own header wraps "For your board" at 900, 960 and 1024px (measured; qa/results/headerfit.design.json). D35.
3. **FAQ answer 6:** "For your board" is now a link to /board/. Same words. D36.
4. **Body buttons:** Workshop details and For your board end their seat sections with a Reserve seats button, because the header button is Home only (section 4). D39.
5. **Spec wording as labels:** 21 phrases from section 1 or 7 are used where the spec names a thing ("Review order", "What to bring", "You are in."). They are listed for confirmation.
6. **Review order title block:** "Step 3 of 3" follows the designed "Step 2 of 3", with ProgressSteps showing Review as current. D20.
7. **Disabled buttons:** while their URLs are placeholders, the pay and send buttons use the designed disabled state. D25.
8. **For your board in print:** a two-column print layout (label, content) so it fits one page. This is the print stylesheet section 7 asks for. D37.
9. **Invisible additions:** `aria-current="page"` in the nav; `aria-describedby` from each Edit link to its section heading; `role="status"` or `role="alert"` on form results; a hidden honeypot field on Questions.

## Known limits

- **Chromium only.** No Safari, Firefox, real phone or screen reader testing, and Safari print is untested.
- **Payment status can't be verified.** A static page cannot know whether a payment succeeded; the Confirmation state comes from an address anyone can type. The provider's dashboard is the record. With Stripe Payment Links the failed state may never show, because Stripe only sends people back after success.
- **Matching is by hand.** Registrations and payments live in two systems, joined by the reference code. Paying twice sends two registrations with the same code.
- **No real services tested.** The form service and payment provider are not chosen yet, so neither has been exercised for real. The form service must allow a cross-origin POST from the site's domain (Formspree does).
- **JavaScript is required.** Review, Confirmation and both forms need it.
- **Same author.** The checks were written by the session that built the pages. They were written first and proven on fixtures, but an independent audit is the real second opinion. The Stage 1 audit (qa/audit-brief.md) has not been run; qa/stage2-audit-brief.md covers both stages.
