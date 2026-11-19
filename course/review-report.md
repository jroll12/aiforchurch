# Blind test of the seven lessons: merged review

## How the test ran

Seven testers, one per lesson, ran in parallel on 2026-11-19. Each was a fresh subagent that saw only its module folder, and none had written any lesson. Each one:

1. followed the steps literally as a church office administrator new to AI;
2. played Claude's part, running each prompt honestly on the FAKE sample files without reading the lesson's warnings first;
3. did the step 4 check with the habit as written.

Their reports are in `course/review/`, one per module. Fixes were made by three separate agents and checked by `node qa/checks/course.mjs`, which passes with 0 findings on all seven.

The fixed lessons have not been through a second blind test.

## Findings in every lesson

| Finding | Severity | Status |
| --- | --- | --- |
| The prepared flawed draft carried its own "What to find" answers, and its facts table admitted the errors. Projected, it gives the answers away. | major (all 7) | **Fixed:** answers moved to `examples/answer-key.md`; each flawed draft now fails the way a real draft would. STYLE.md has the rule and the course check enforces it. |
| The handout never says where to get the practice files, or that later prompts must stay in the same chat. | minor to major (all 7) | **Fixed:** every handout has the "Practice files (all FAKE): ... [FILES LINK]" line and "Do every step in the same chat." [FILES LINK] waits on how the workshop shares files. |
| The step 1 or 2 prompt steers Claude away from the mistake, so the trap rarely fires live. | minor to major (all 7) | **Kept on purpose:** teaching the prompt that prevents the mistake is the point. Every facilitator note now says to expect to show the prepared flawed draft. |
| A checklist box passed the wrong answer, or failed the right one (worst in topics 4 and 5), or step 4 didn't say which source wins. | major (01, 02, 04, 05, 06) | **Fixed:** every box was tested against a correct result and against the flawed draft, and step 4 now names the source that wins. |
| 24-hour times in calendar files | minor (01, 04) | **Fixed:** 12-hour times. The course check now rejects 24-hour times in CSV samples. |
| A tight time fit for a non-technical attendee, especially on a phone | major (01, 03, 05, 07) | **Partly addressed:** shorter fallbacks are in the facilitator notes, and the lessons ask for a laptop ([CONFIRM]). Sharing files and prompts digitally, so they can be copied, is the real fix and depends on [FILES LINK]. |
| "Handout (PDF)" links to a .md file | minor (all 7) | **Kept:** the label is the designed text. Handout PDFs are built later. |
| The [CONFIRM] in the titles of topics 4 to 7 prints on handouts | minor (04 to 07) | **Kept until Jarret names the real topics.** |

## Findings in one lesson

| Lesson | Finding | Severity | Status |
| --- | --- | --- | --- |
| 03 Prayer chain | The take-home handout said to paste the whole log, so a real log's private column and its pastor-only and do-not-share rows would go to Claude. The safe method was only in the facilitator notes. | **blocker** | **Fixed:** a bold rule near the top of the handout and the lesson's data safety section both say: never paste the private column or those rows. Paste only the request column and share level, with names as [NAME 1], and only if your AI use policy allows it. Checked by the builder. |
| 03 Prayer chain | "This Sunday" made Claude use today's date | minor | **Fixed:** "Sunday, March 15". |
| 03 Prayer chain | The guide said pastor-only rows are seen by one person, yet they sit in the office log; the office_note column and Ray's bracketed name were unexplained | minor | **Fixed** in prayer-chain-guide.md. |
| 02 AI use policy | Step 3 contradicted itself; open legal and denomination questions vanished from the draft; there was no rule for which source wins; step 4 checked the wrong source | major | **Fixed:** unsourced rules come out and are listed under "Open questions [CONFIRM]"; the newer board decision wins; step 4 checks the draft against the table, then each row against the board notes or the current policy. |
| 02 AI use policy | "Four of six" did not match the survey; a legal phrasing; board members' names | minor | **Fixed:** "Three of six"; "Claude cannot give legal advice"; board names replaced by roles. |
| 01 Newsletter | The habit only checks that a source line exists; the trap is weak | major | **Partly addressed:** the habit text is the designed text and stays. The handout checklist adds "says the same as the fact next to it" and "every item in the notes made it in". The facilitator notes add the "starting March 12" ambiguity as a live point. |
| 05 Volunteer reminders | The flawed draft (16 emails) was too long to project | major | **Fixed:** now the summary table plus four emails. |
| 06 Meeting minutes | Full names and the year existed only in last month's minutes; the habit left out dates | major | **Fixed:** the notes carry full names, roles and the year; dates are in the habit and the decision table. |
| 07 Bulletin and slides | The habit checked one way only, so dropped items went unnoticed | major | **Fixed:** the check runs both ways. |
| 07 Bulletin and slides | The hymn error was unrealistic; the master's "not the Youth Room" tripped a scan; the step 3 prompt said both "mark" and "don't add" | minor | **Fixed.** |

## Not tested

- The real Claude app, on a laptop or a phone. The testers played Claude's part themselves.
- Free-plan message limits during a full exercise.
- A real room of attendees.
- A second blind test of the fixed lessons.
