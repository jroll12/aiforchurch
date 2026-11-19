---
topic: 5
slug: 05-volunteer-reminders
title: Volunteer schedules and reminder emails [CONFIRM]
duration: About 20 minutes
outcome: By the end, you can draft a month of reminders from a sign-up sheet.
status: draft
next: 06-meeting-minutes
trap: samples/signup-sheet.csv :: 2026-04-12,Usher,Greg Olsen
trap: samples/signup-sheet.csv :: 2026-04-26,Usher,Nora Quinn
trap: samples/swap-email.md :: Nora will take April 12
trap: samples/signup-sheet.csv :: 2026-04-19,Coffee,,
flaw: Hi Greg, a reminder that you are ushering at the 10:30 service on Sunday, April 12.
source: drafted for approval; no designed page
---

# Volunteer schedules and reminder emails [CONFIRM]

Topic 5 of 7. About 20 minutes.

By the end, you can draft a month of reminders from a sign-up sheet.

## The idea, 5 minutes

Claude can turn a sign-up sheet into a month of personal reminders in minutes. But it can miss a swap that came in a later email, and it can fill an empty slot with a name that seems likely. The fix: match every reminder’s name, date and role to the sheet after the swaps, and leave empty slots empty.

## The exercise

1. Open a new chat. Paste the reminder guide, the April sign-up sheet and the swap email.
2. Ask for a reminder list, one row for every Sunday and role, and a short personal email for each filled slot.
3. Tell Claude to apply the swap, and to leave the empty slot empty, marked [CONFIRM] to recruit someone.
4. Check every row of the list against the sign-up sheet and the swap email, name by name. Make sure the empty slot has no email.

## Watch for this

### A missed swap.

The sheet has Greg Olsen ushering on April 12 and Nora Quinn on April 26. Greg’s email of March 27 says they traded, so Nora ushers April 12 and Greg April 26. A draft can still remind Greg for April 12. Coffee on April 19 has no name, and Sam Ellis served the week before, so a draft may guess him.

## The habit

### Name-to-slot check.

Every reminder needs a matching row on the sign-up sheet, with the same name, date and role, after any swap from a later email. An empty slot gets no reminder: mark it [CONFIRM] and recruit someone yourself. Then compare the reminder list with the sheet, line by line, before you send.

## Data safety

Practice with the FAKE sheet only, and bring no real names or email addresses. Keep children’s names and family details out of reminders, including nursery reminders.

## Downloads

- [Handout (PDF)](handout.md): One page to print or keep.
- [Sample files, all labeled FAKE](samples/): Sign-up sheet, a swap email, reminder guide.

## Next

Next topic: [Meeting notes into minutes and action items [CONFIRM]](../06-meeting-minutes/lesson.md)

## Facilitator notes

- **Timing:** 5 minutes for the idea, 10 for the exercise, 5 for the mistake and the habit.
- **What’s in the sample files:**
  - `reminder-guide.md`, `signup-sheet.csv` and `swap-email.md` for step 1; the sheet and the email again for step 4.
  - The sheet has Greg Olsen ushering April 12 and Nora Quinn April 26. Greg’s email of Friday, March 27 trades them, so the right reminders are Nora for April 12 (sent Monday, April 6) and Greg for April 26 (sent Monday, April 20).
  - Coffee on April 19 is blank. Joan Miller and Sam Ellis cover the other Sundays, so either looks like a natural guess. A careful draft writes no email for that slot and marks it [CONFIRM].
  - April 5 is Easter Sunday. The guide says it keeps the usual times, so the room does not get stuck on it.
  - The sheet has adults only. Nursery reminders name the room, never a child.
- **If Claude gets it right live:** open `examples/flawed-draft.md` and ask the room to find what’s wrong. It reminds Greg for April 12 and Nora for April 26, and gives Sam Ellis the empty coffee slot.
- **If time is short:** ask Claude for the reminder list and the April 12 emails only. The swap still shows up there.
