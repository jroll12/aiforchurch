# Event announcements from a ministry calendar [CONFIRM]

By the end, you can turn calendar entries into announcements, with every date and room checked.

**Practice files (all FAKE):** announcement-guide.md, ministry-calendar.csv, leader-email.md, from [FILES LINK].

**Do every step in the same chat.** Later prompts refer back to earlier ones.

## The four steps

1. Open a new chat. Paste the guide, the calendar and the leader’s email.
2. Ask for a bulletin announcement and a short social post for each event, plus a check table.
3. Tell Claude to give the real date for any repeating event, and to mark [CONFIRM] anything missing or in disagreement.
4. Check every row of the table yourself, as below.

## Prompts to paste

Step 1, with the guide, the calendar and the email pasted below it:

```
You help write event announcements for our church. Below are our announcement guide, the ministry calendar for April, and the latest email from a ministry leader. Every date, time and room must come from the calendar or the email. If the email is newer than the calendar and says something different, use the email.
```

Step 2:

```
Write a bulletin announcement and a short social media post for each event on the calendar, following the guide. Then add a check table: one row for each event, with its date, weekday, time and room, and where each came from: the calendar or the email.
```

Step 3:

```
Check each announcement against the calendar and the email again. For any repeating event, give the real date and its weekday. If the calendar and the email disagree, use the email and mark that detail [CONFIRM]. If a date, time or room is missing, do not guess. Mark it [CONFIRM]. List every [CONFIRM] under the table.
```

Step 4 is yours. Find each row’s date, time and room in the source it names. A newer email from the ministry leader wins: a row that still matches an old calendar entry is a mismatch, so use the email and mark it [CONFIRM] until the calendar is fixed. Count any “first Tuesday” from the April dates in the guide.

## Date-and-room check

- [ ] Every date, time and room is in the source the table names, or counted from it.
- [ ] Where a newer email disagrees with the calendar, the email wins, marked [CONFIRM] until the calendar is fixed.
- [ ] Every repeating date falls on the right weekday, counted on a calendar.
- [ ] Every missing detail is marked [CONFIRM], not guessed.

Public events only. Keep the names of people who attend care groups, health details and children’s names out of this exercise.
