# Course lessons: Claude for Church Offices

The seven workshop topics as lessons: what the facilitator teaches, what attendees do, and the files they practice with.

**Drafted with AI, then taught and checked by Jarret Roloff**, as the site's footer says. Every module stays `status: draft` until Jarret approves it.

## Where this belongs

START-HERE.md says the course content lives in its own repo, roloff-course-kit, which has not been started. This folder is laid out the way that repo will be (`modules/01-newsletter/` and so on), so moving it there is one copy. Nothing in `course/` is part of the public site, and the site build never reads it.

## The seven modules

| # | Folder | Title | Time |
| --- | --- | --- | --- |
| 1 | modules/01-newsletter | Weekly newsletter from staff notes | About 30 minutes |
| 2 | modules/02-ai-use-policy | A church AI use policy | About 30 minutes |
| 3 | modules/03-prayer-care-messages | Prayer chain and care messages, privacy first | About 30 minutes |
| 4 | modules/04-event-announcements | Event announcements from a ministry calendar [CONFIRM] | About 20 minutes |
| 5 | modules/05-volunteer-reminders | Volunteer schedules and reminder emails [CONFIRM] | About 20 minutes |
| 6 | modules/06-meeting-minutes | Meeting notes into minutes and action items [CONFIRM] | About 20 minutes |
| 7 | modules/07-bulletin-slides | Bulletin and slide text from one source [CONFIRM] | About 20 minutes |

- **Topics 1 to 3:** the titles come from the design.
- **Topics 4 to 7:** these were suggestions, so their titles carry [CONFIRM] until Jarret names the real topics.
- **Times:** they fit the approved agenda, itself still [CONFIRM]. That's 90 minutes for topics 1 to 3, then a break, then 90 minutes for topics 4 to 7 and questions.

## What each module holds

| File | What it is |
| --- | --- |
| `lesson.md` | The lesson, in the order of the designed Topic page: the idea, the exercise (four steps), watch for this, the habit, data safety, downloads, next topic |
| `handout.md` | One printable page: the steps, the exact prompts to paste, the habit as a checklist |
| `samples/` | The practice files, every one invented and labeled FAKE |
| `examples/flawed-draft.md` | A prepared draft with the mistake in it, so the "catch the mistake" step works even if Claude gets it right live |
| `examples/answer-key.md` | What is wrong in the flawed draft, for the facilitator only, never projected |

The rules every module follows are in STYLE.md, and `node qa/checks/course.mjs` enforces them. That check also runs inside `npm run check`.

## Placeholders in the course

- **[FILES LINK]:** every handout says where to get the practice files. Until it's decided how the workshop shares them (a download page, a shared folder, printed copies), the handouts say [FILES LINK].
- **[CONFIRM]:** marks a fact Jarret still has to check, for example topics 4 to 7, laptop or tablet, and who sends the pre-workshop email. Run `grep -rn "\[CONFIRM\]" course/modules` to list them. Inside lessons, [CONFIRM] is also what attendees are taught to type, so those are not all open items.

## Review so far

- **Testing:** seven blind testers worked through one lesson each, and their findings are fixed or explained in course/review-report.md.
- **Status:** every module is still `status: draft`.

## How to approve a module

1. Read `lesson.md` and `handout.md`, and open the sample files.
2. Fix any wording, and clear or keep each [CONFIRM].
3. Change `status: draft` to `status: approved` at the top of `lesson.md`.
