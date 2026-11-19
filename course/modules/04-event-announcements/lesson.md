---
topic: 4
slug: 04-event-announcements
title: Event announcements from a ministry calendar [CONFIRM]
duration: About 20 minutes
outcome: By the end, you can turn calendar entries into announcements, with every date and room checked.
status: draft
next: 05-volunteer-reminders
trap: samples/ministry-calendar.csv :: 2026-04-18,Saturday,10:00,11:30,Spring tea,Fellowship Hall
trap: samples/leader-email.md :: moving the spring tea to Saturday, April 25
trap: samples/ministry-calendar.csv :: First Tuesday of each month
trap: samples/ministry-calendar.csv :: Room not set yet
flaw: Our spring tea is Saturday, April 18
source: drafted for approval; no designed page
---

# Event announcements from a ministry calendar [CONFIRM]

Topic 4 of 7. About 20 minutes.

By the end, you can turn calendar entries into announcements, with every date and room checked.

## The idea, 5 minutes

Claude writes announcements quickly, but it can trust an old calendar entry over a newer email, count a repeating date wrong, or fill a missing room with a guess. The fix is simple: check every date and room against the calendar and the latest email, and mark anything that disagrees or is missing [CONFIRM].

## The exercise

1. Open a new chat. Paste the announcement guide, the ministry calendar and the latest email from a ministry leader.
2. Ask for a bulletin announcement and a short social post for each event, plus a check table: every date, time and room, and where it came from.
3. Tell Claude to give the real date for any repeating event, and to mark [CONFIRM] anything missing or anything where the calendar and the email disagree.
4. Check every row of the table against the calendar and the email. Count any “first Tuesday” on a printed calendar.

## Watch for this

### A moved date.

The calendar lists the spring tea on Saturday, April 18. Carol Diaz’s email of March 26 moves it to Saturday, April 25, with RSVPs by April 20. A draft can still say April 18. The grief support group meets the first Tuesday of each month, and in April that is the 7th, not the 1st.

## The habit

### Date-and-room check.

Every date, time and room in an announcement must match the calendar or a newer email from the ministry leader. Where the two disagree, or a detail is missing, mark it [CONFIRM] and ask the leader instead of guessing. Then count every repeating date on a real calendar before anything goes out.

## Data safety

Public events only. Keep the names of people who attend care groups, health details and children’s names out of this exercise.

## Downloads

- [Handout (PDF)](handout.md): One page to print or keep.
- [Sample files, all labeled FAKE](samples/): Ministry calendar, a leader’s email, announcement guide.

## Next

Next topic: [Volunteer schedules and reminder emails [CONFIRM]](../05-volunteer-reminders/lesson.md)

## Facilitator notes

- **Timing:** 5 minutes for the idea, 10 for the exercise, 5 for the mistake and the habit.
- **What’s in the sample files:**
  - `announcement-guide.md`, `ministry-calendar.csv` and `leader-email.md` for step 1; the calendar and the email again for step 4.
  - The calendar has the spring tea on Saturday, April 18, RSVP by April 13. Carol’s email moves it to Saturday, April 25, RSVP by April 20, and says she hasn’t changed the calendar.
  - The grief support group row has no date, only “First Tuesday of each month.” In April 2026 that is Tuesday, April 7. April 1 is a Wednesday.
  - The youth game night has no room (“Room not set yet”), so a careful draft marks it [CONFIRM] rather than inventing one.
  - The spring cleanup day matches everywhere. It shows that the check is for every line, not only the suspicious ones.
- **If Claude gets it right live:** open `examples/flawed-draft.md` and ask the room to find what’s wrong. It has the stale tea date, a Tuesday on April 1 and an invented room for game night.
- **Before class:** print a one-page April 2026 calendar for each table, for step 4.
