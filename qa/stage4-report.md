# Stage 4 report: the course lessons, all seven modules

Built 2026-11-19 on branch `claude/upbeat-cray-ehwzda`, after your go. Everything is in `course/` and is `status: draft` until you approve it. The public site is unchanged, and nothing in `course/` is built into it.

## What was written

| # | Module | Time | The mistake it teaches | The habit |
| --- | --- | --- | --- | --- |
| 1 | 01-newsletter | 30 min | A stale time (the old newsletter's Tuesday) | Source-line check (designed text) |
| 2 | 02-ai-use-policy | 30 min | A rule nobody made, or a legal claim with no source | Decision-line check |
| 3 | 03-prayer-care-messages | 30 min | A private detail in a public message | Permission check |
| 4 | 04-event-announcements [CONFIRM] | 20 min | A moved date | Date-and-room check |
| 5 | 05-volunteer-reminders [CONFIRM] | 20 min | A missed swap, or a guessed name in an empty slot | Name-to-slot check |
| 6 | 06-meeting-minutes [CONFIRM] | 20 min | A guessed decision or vote count | Decision check |
| 7 | 07-bulletin-slides [CONFIRM] | 20 min | A leftover detail from last week | One-source check |

Each module has:
- `lesson.md`: the designed Topic page order, plus facilitator notes.
- `handout.md`: one page, with the prompts to paste.
- two to five FAKE practice files.
- a prepared flawed draft that looks real.
- a facilitator-only answer key.

Topic 1 uses the designed lesson text word for word.

## How it was made: fan out, merge, check

1. **Rules and a check first.**
   - course/STYLE.md sets the rules.
   - qa/checks/course.mjs enforces them and now runs in `npm run check`. It was proven on a fixture that breaks each of its 12 rules.
2. **Topic 1 as the worked example,** written by me.
3. **Topics 2 to 7,** drafted in parallel by three writers, two topics each.
4. **Blind test.** Seven testers, each seeing only one module folder, followed the steps literally and played Claude's part. They found:
   - 1 blocker: Topic 3's handout said to paste the whole prayer log, private column included.
   - a shared major in every lesson: the flawed drafts gave their own answers away.
   - several checklist boxes that passed the wrong answer.
   - other majors per lesson.
5. **Fixed:** by three fixers. I checked the Topic 3 privacy fix myself. Every finding is in course/review-report.md with its status, and the testers' reports are in course/review/.

## Checks (final run)

| Check | Result |
| --- | --- |
| `node qa/checks/course.mjs` | pass: 7 modules, 0 findings. Topics 1 to 3 take 90 of 90 minutes; topics 4 to 7 take 80 of 80. |
| `npm run verify` (all site checks plus course) | pass: all 15; the site is unchanged |
| No em or en dashes | pass (guards scanned 176 files) |
| Product fact: Projects on the free plan | checked on support.claude.com, 2026-11-19: "Projects are available to all users, including those with free Claude accounts", with up to five. Recorded in the Topic 1 facilitator notes, with a reminder to recheck. |

## Not done or not tested

- **Real Claude:** the testers played Claude's part. Nobody has run the prompts in the real Claude app on a laptop or a phone, or under free-plan message limits.
- **No second blind test** of the fixed lessons.
- **No handout PDFs yet.** "Handout (PDF)" links to the Markdown file.
- **[FILES LINK]:** how attendees get the practice files is undecided. This is also the real fix for the tight timing on phones.

## For you to decide (from the writers and testers)

1. **Topics 4 to 7:** confirm or replace them. Their lessons were built on my suggested topics.
2. **Habit names:** Topic 2's "Decision-line check." and Topic 6's "Decision check." are close. Keep both, or rename one?
3. **Names for the governing body:** Topic 6 says "church council". Should it be board, session or vestry?
4. **Real prayer requests:** Topic 3's advice (names as [NAME 1], no private column, only if your AI use policy allows) is now on the handout. It's your call whether to teach it at all.
5. **Ray's request:** it came from his wife, not from Ray. The room is asked "did Ray agree?" Keep that as a discussion point?
6. **Easter:** Topic 5's sheet includes Easter Sunday, April 5, 2026. Keep it, avoid it, or make it a trap?
7. **Topic 4's rule:** a newer email from the leader wins over the calendar, but the row stays [CONFIRM] until the calendar is fixed. Or should the email simply win?
8. **Lyrics:** Topic 7 uses public-domain hymn titles only and leaves lyrics to each church's licensing. Say more?
9. **Shared event:** topics 6 and 7 both use the April 18 spring cleanup. Keep the link between them?
10. **Laptop:** the timing assumes attendees use laptops, not phones. The "What to bring" item on the site is still [CONFIRM].
