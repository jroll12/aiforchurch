---
topic: 1
slug: 01-newsletter
title: Weekly newsletter from staff notes
duration: About 30 minutes
outcome: By the end, you can turn a week of staff notes into a newsletter draft in your church’s voice in about 30 minutes, with every date, time and room traced to a source.
status: draft
next: 02-ai-use-policy
trap: samples/past-newsletter-2.md :: Bible study meets Tuesday at 9:30 in Fellowship Hall
trap: samples/staff-notes.md :: moves to Thursday at 6:30 in Room 4
trap: samples/staff-notes.md :: Time still to be set
flaw: Bible study meets Tuesday at 9:30 in Fellowship Hall
source: design/topic-c-desktop.dc.html (lesson text verbatim); everything else drafted for approval
---

# Weekly newsletter from staff notes

Topic 1 of 7. About 30 minutes.

By the end, you can turn a week of staff notes into a newsletter draft in your church’s voice in about 30 minutes, with every date, time and room traced to a source.

## The idea, 5 minutes

Claude drafts quickly, but it can fill gaps with guesses. The fix is simple: ask it to show where every date, time and room came from, then check those against your calendar.

## The exercise

1. Make a Project for the newsletter. Add instructions, a short voice guide and two past newsletters as examples.
2. Paste this week’s staff notes. Ask for a draft and a facts table: every date, time, room and name, each with the line from the notes it came from.
3. Tell Claude to mark anything without a source line [CONFIRM] instead of filling the gap.
4. Check the facts table against the church calendar. Edit for voice, then send.

## Watch for this

### A stale time.

An old newsletter says Bible study meets Tuesday at 9:30 in Fellowship Hall. This week’s notes say it moved to Thursday at 6:30 in Room 4. A draft can still say Tuesday.

## The habit

### Source-line check.

Every date, time, room and name in the draft needs a source line from the notes. No source line means delete it or mark it [CONFIRM]. Then compare the facts table with the calendar.

## Data safety

Public announcements only. Keep prayer requests, health details, children’s names and giving information out of this exercise.

## Downloads

- [Handout (PDF)](handout.md): One page to print or keep.
- [Sample files, all labeled FAKE](samples/): Staff notes, two past newsletters, church calendar.

## Next

Next topic: [A church AI use policy](../02-ai-use-policy/lesson.md)

## Facilitator notes

- **Timing:** 5 minutes for the idea, 18 for the exercise, 7 for the mistake and the habit.
- **What’s in the sample files:**
  - `voice-guide.md` and the two past newsletters for step 1; `staff-notes.md` for step 2; `calendar.csv` for step 4.
  - The newer past newsletter still lists Bible study on Tuesday at 9:30. The staff notes move it to Thursday at 6:30 in Room 4, so a draft that leans on the old newsletter gets it wrong.
  - The staff notes give no time for the youth car wash (“Time still to be set”), so a careful draft marks it [CONFIRM] rather than inventing one.
  - The calendar puts the volunteer lunch in Room 2, while the notes say Room 3. Only step 4 catches that.
- **If Claude gets it right live:** open `examples/flawed-draft.md` and ask the room to find what’s wrong. It has the stale Tuesday time and an invented car wash time.
- **Projects on a free account:** Claude’s help center says “Projects are available to all users, including those with free Claude accounts” and that free users can create at most five (support.claude.com, “What are projects?”, checked 2026-11-19). Plans change, so check again before each workshop.
- **If an attendee has no Project room left,** or the Project will not open, steps 1 and 2 work as one long first message instead: paste the instructions, the voice guide and both past newsletters, then the notes.
