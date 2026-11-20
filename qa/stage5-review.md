# Stage 5 blind review

Three reviewers ran in parallel. Each saw only its own slice and none saw how the work was made:

- **Member pages:** at commit 6df4233, with their own Playwright scripts (none of the builder's checks), against the Topic artboard and spec sections 2, 3, 4 and 8.
- **Facilitator kit and emails:** read as a first-time facilitator and as an attendee.
- **Topic 3 re-test:** the privacy fix that was the one Stage 4 blocker.

No blockers. Every finding is below with its status.

## Member pages

| # | Severity | Finding | Status |
| --- | --- | --- | --- |
| M1 | major | [FILES LINK] is in every handout PDF but not in PLACEHOLDERS.md | Fixed: listed in PLACEHOLDERS.md, member area section |
| M2 | major | Next link "A church AI use policy" vs artboard "Church AI use policy", not logged in questions | Fixed as a log entry: qa/questions.md D53. The check already listed it as expected; the wording is Jarret's call |
| M3 | minor | PDF footer added "Practice files are invented and labeled FAKE." (not in design or lessons) | Fixed: footer is the honesty line only (D57) |
| M4 | minor | Step checkboxes 28x28; gap beside the box does not toggle | Logged: D54. Label hit area is 44px, as with D16 |
| M5 | minor | [CONFIRM] on topic 4 to 7 titles in the member area not listed | Fixed: PLACEHOLDERS.md, member area section |
| M6 | minor | Progress bar was role="img" with a changing label, no live region | Fixed: the label is now a polite live region, segments hidden from screen readers. No-JS state logged as D55 |
| M7 | minor | Lessons are draft but show as course content | Logged: D56. Approve before member access opens |
| M8 | note | No real access control; downloads cannot carry noindex; host MIME types | Logged: D51, and a launch blocker |

## Facilitator kit and emails

| # | Severity | Finding | Status |
| --- | --- | --- | --- |
| F1 | major | Lessons say send [FILES LINK] before class, but only email 5 has it | Fixed: email 3 carries [FILES LINK] |
| F2 | major | Three attendees each get the pay link and may each pay | Fixed: email 1 says one payment covers all [SEATS] seats [CONFIRM] |
| F3 | major | Opening and emails say laptop; lessons 01 and 07 plan for phones | Open for Jarret: call C10, laptop stays [CONFIRM]. Decide, then align email 3 and the opening |
| F4 | major | Free account claim only covers the newsletter; message limits unknown | Open for Jarret: confirm in the run-through (setup checklist) |
| F5 | major | Topic 4 to 7 mistake step does not fit 5 minutes | Fixed: look for 2 minutes, "not mistakes" only if asked, Questions is the buffer |
| F6 | major | No end time in any email | Fixed: "Ends: 12:30 p.m. [CONFIRM]" in emails 2 to 4 |
| F7 | minor | Late registrants miss email 3 | Fixed: README says send email 3 right after email 2 inside 7 days |
| F8 | minor | Email 4 has no [ROOM AND ENTRANCE]; README [DATE] row wrong | Fixed |
| F9 | minor | Topic 2 handout says "on a printout"; no printer in the room | Fixed |
| F10 | minor | flawed-drafts.md, topic 3, missed two mistakes | Fixed |
| F11 | minor | Run of show, topic 2, skips step 1 | Fixed |
| F12 | minor | Kit README's bold line reads like the honesty line but isn't exact | Fixed |
| F13 | minor | "or the USB sticks" when USB is only an option | Fixed |
| F14 | minor | Setup checklist: no preview app, no projector-only folder, two files not on the print list | Fixed |
| F15 | minor | One facilitator cannot run ahead and walk the room at once | Fixed: demo each step, then walk |

## Topic 3 re-test

The three Stage 4 blockers are resolved. A literal run of the steps passes every checkbox; the flawed draft fails every one.

| # | Severity | Finding | Status |
| --- | --- | --- | --- |
| T1 | major | Real-log method allowed prayer-team rows and only swapped names | Fixed: whole-church rows only, and health, children, dates and places taken out (handout and lesson) |
| T2 | minor | Step 1 prompt said "this week's prayer log" | Fixed: "a practice prayer log". Step 2's "never use the private or office_note columns" stays: it is a guard, not an invitation |
| T3 | minor | [FILES LINK] unfilled on the day means no FAKE files | Open: launch item (PLACEHOLDERS.md) |
| T4 | minor | Memory warning is facilitator only, marked [CONFIRM] | Open for Jarret: confirm the fact, then it can go on the handout |
| T5 | minor | Checkbox 4 cannot be true of the card | Fixed: "Every detail in the email has a row" |
| T6 | minor | Answer key said "third person" | Fixed: "rewords every request" |

## Not checked by anyone

Real screen readers, Safari, Firefox, iOS checkbox rendering, real browser zoom, and the production host.
