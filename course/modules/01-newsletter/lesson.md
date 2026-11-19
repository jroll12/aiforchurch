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
- **Before class:** share the files and the handout prompts digitally, at [FILES LINK], so attendees copy and paste instead of typing. Getting five files onto a phone and into a Project can take most of the 18 minutes. On a phone, attendees can open each file and paste its text instead of uploading it.
- **What’s in the sample files:**
  - `voice-guide.md` is “a short voice guide” in step 1. It and the two past newsletters go into the Project. `staff-notes.md` is for step 2; `calendar.csv` is for step 4.
  - The newer past newsletter still lists Bible study on Tuesday at 9:30. The staff notes move it to Thursday at 6:30 in Room 4, so a draft that leans on the old newsletter gets it wrong.
  - The notes say Bible study moves “starting March 12”. That leaves Tuesday, March 10 open: the notes do not say whether it still meets that day. A draft that fills that in is guessing, and it should be marked [CONFIRM] for Pastor Dan. This is the likelier live slip, so ask the room about it even when the draft looks clean.
  - The staff notes give no time for the youth car wash (“Time still to be set”), so a careful draft marks it [CONFIRM] rather than inventing one.
  - The calendar puts the volunteer lunch in Room 2, while the notes say Room 3. Only step 4 catches that. Neither source wins: mark it [CONFIRM] and ask Rita.
  - The pantry drive, the RSVP date and the car wash time have nothing in the calendar to match. Attendees check those rows against the notes only. The handout says so.
  - Opened in a spreadsheet, row 1 of `calendar.csv` is the FAKE label and the column names are in row 2.
- **Expect to use the prepared draft.** The step 1 instructions tell Claude never to take facts from past newsletters, so a live draft usually avoids the stale time. That is the point of the prompts. The prepared draft is the planned way to show the mistake.
- **If Claude gets it right live:** project `examples/flawed-draft.md` and ask the room to find what’s wrong. Keep `examples/answer-key.md` to yourself; it lists every mistake and which checklist box catches it. The draft quotes the old newsletter as if it were the notes, gives the car wash a time its source line does not have, puts the lunch in Room 3, leaves the RSVP date out of the table and drops the pantry drive.
- **Projects on a free account:** Claude’s help center says “Projects are available to all users, including those with free Claude accounts” and that free users can create at most five (support.claude.com, “What are projects?”, checked 2026-11-19). Plans change, so check again before each workshop.
- **Before class [CONFIRM]:** can attendees on the phone app create a Project and add files to it? Will free-plan message limits last through a draft plus a recheck?
- **If an attendee has no Project room left,** or the Project will not open, steps 1 and 2 work as one long first message instead: paste the instructions, the voice guide and both past newsletters, then the notes. The handout says so too.
- **“Edit for voice, then send”** is the designed step 4. In class, attendees stop before sending; the handout says so.
