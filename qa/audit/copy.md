# Audit slice: copy, placeholders and links

Independent auditor (a cold subagent with no build context, working in its own copy of the repo at commit aaff03e), 2026-11-12. Saved verbatim; the merged list with status is in qa/audit-report.md.

| Severity | Requirement | File and line, or page, width and state | What you saw | Evidence |
| --- | --- | --- | --- | --- |
| major | Brief item 2 (approved line states an unverified or false fact) | src/copy.ts:49; /workshop/ at 390 and 1440, "When and where" | The approved [ACCESSIBILITY] line ends "Tell us about any other need when you register." Register has no field or place to state an access need, and Review does not send one. | Register form labels (states.js): Organization name, Contact person, Name, Email, Role, "What office task takes the most time? (optional)", consent checkbox. src/scripts/review.js:80-99 field list has nothing for access needs. |
| major | Hard rule 2 / brief item 2 | src/copy.ts:71 [BRING ITEM 2]; /workshop/ and /confirmation/ "What to bring" | "A Claude account. The newsletter topic works on a free account." ships with no [CONFIRM], while the identical claim in Home FAQ answer 1 carries the designed [CONFIRM]. The draft's own note says "Matches Home FAQ answer 1, which is still [CONFIRM]." | derived.js output; qa/stage2-copy-draft.md BRING ITEM 2 row. |
| minor | Brief item 2 | src/copy.ts:118 [PENDING MESSAGE]; /confirmation/ pending state | States a seat-hold policy ("confirmed when payment arrives") and that a reference code can be used "with any payment", while qa/questions.md:12 and :14 list both as open, with no [CONFIRM], and PAYMENT_REF_PARAM is null. | qa/stage2-copy-draft.md:53 note "Depends on whether an unpaid registration holds a seat". |
| minor | Brief item 2 (fact the page cannot know) | /confirmation/ and /confirmation/?payment=failed, 390, empty sessionStorage | With no registration saved, the page still says "We have your registration." / "Use your reference code with any payment." but shows no code; failed state says "Your registration is saved." Overlaps the behavior slice. | states.js: reference line hidden, retry disabled. |
| minor | Brief item 2 | src/copy.ts:59-62; /workshop/ topics 04 to 07 | The four approved [TOPIC 4-7 OUTCOME] lines describe course content not yet written ("Suggestion only" in their notes) and carry no [CONFIRM]; only the title on the same card does. If Jarret clears the title tag as PLACEHOLDERS.md:35 instructs, the outcome is left unflagged. | PLACEHOLDERS.md:30 says the title tag covers "titles and outcomes". |
| minor | Brief item 2 | src/copy.ts:71 [BRING ITEM 1] | The draft note for this row carries "[CONFIRM]" ("Tablets and phones make the exercises hard. [CONFIRM]"); the shipped line "A laptop and its charger" has none. | qa/stage2-copy-draft.md:40 |
| minor | Brief item 2 (consistency) | src/copy.ts:96 [WHY LOCAL]; /about/ | "leave with drafts you can use the next week" conflicts with design copy "Workshops use invented sample data only" and "What you leave with" (handouts, sample files, policy draft [CONFIRM]). | Home artboard text. |
| minor | Hard rule 1 | src/copy.ts:103; /register/review/ title block | "Step 3 of 3" is not artboard text, spec wording, a placeholder or an approved row; it appears only as a note under the spec table in the draft file, and qa/questions.md:22 still asks whether the step label should change. | derived.js classified it NONE; qa/stage2-copy-draft.md:100. |
| minor | Hard rule 2 / spec 7 (06) | src/components/SummaryPanel.astro:21, src/scripts/review.js:47; /register/review/ | The spec names [TOTAL]; it never appears. "Total" is filled with the option price (D24) while qa/questions.md:20 still asks whether tax or fees apply. | grep of dist/: no [TOTAL]. |
| minor | Re-verify expected diffs | qa/checks/expected-diffs.json entries 5 and 7 (Register 390 and 1440 "[select] Administrator") | The reason cites "HANDOFF-SPEC.md section 7 and the artboard markup (value="Communications") give Communications". Section 7 names no role value; it says "the chosen roles are demo data". Only the artboard markup and design/README.md support it. | HANDOFF-SPEC.md 7 Register paragraph. |
| minor | Working rules (report accurately) | PLACEHOLDERS.md:40 | Tells Jarret "`npm run check:launch` lists every one still on a page"; that script does not exist. | `npm run check:launch` -> `npm error Missing script: "check:launch"` |
| minor | Working rules | qa/stage2-report.md:23, :29, :64; qa/questions.md:9 | Still say 48 copy placeholders remain, no draft ships, and [BOARD LEDE] is missing from print; commit aaff03e shipped the approved copy without updating them. | `git show --stat aaff03e` lists neither file. |

## Checked, no problem found (summary)
- Home and Register copy against the artboards at 1440 and 390: zero differences on Home; on Register every artboard line is present, with only the expected-diffs entries differing.
- Expected-diffs entries 1 to 4 and 9 to 10 hold.
- Every string on the six derived pages maps to an allowed source except "Step 3 of 3" (above).
- All 48 approved rows appear verbatim.
- All 21 spec phrases are reasonable.
- All 10 artboard placeholders are unchanged, and every bracketed token in dist/ is listed in PLACEHOLDERS.md.
- No sample values in dist/.
- Every internal link returns 200 and every anchor exists; the nav is complete on every page.
- No em or en dashes in files or commit messages.
- The honesty line is exact on all 8 pages.

## Could not check
- Config-gated strings (Add to calendar, Download PDF, Pay by check or cash, Join the waitlist): source strings only.
- Form success and error states: checked as hidden DOM text only.
- No computed accessibility tree and no screen reader.
- Chromium only.
