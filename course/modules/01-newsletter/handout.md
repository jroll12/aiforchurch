# Weekly newsletter from staff notes

By the end, you can turn a week of staff notes into a newsletter draft in your church’s voice in about 30 minutes, with every date, time and room traced to a source.

**Practice files (all FAKE):** voice-guide.md (the short voice guide), past-newsletter-1.md, past-newsletter-2.md, staff-notes.md, calendar.csv, from [FILES LINK].

**Do every step in the same chat.** Steps 2 and 3 share one Project chat.

## The four steps

1. Make a Project with the step 1 prompt as its instructions, plus the voice guide and both past newsletters. No Project? Put all four in your first message.
2. Paste staff-notes.md. Ask for a draft and a facts table.
3. Tell Claude to mark anything without a source line [CONFIRM].
4. Check the facts table against calendar.csv. In class, stop before sending.

## Prompts to paste

Step 1, in the Project’s instructions:

```
You help write the weekly newsletter for our church. Follow the voice guide. Use the past newsletters as examples of tone and layout only, never as a source of facts. Every date, time, room and name must come from the staff notes I paste that week.
```

Step 2, in a new Project chat, notes below it:

```
Here are this week's staff notes. Write the newsletter draft in our voice. Then add a facts table: one row for every date, time, room and name in the draft, with the exact line from the notes it came from.
```

Step 3:

```
Check the draft against the notes again. If any date, time, room or name has no source line in the notes, do not fill it in. Mark it [CONFIRM] in the draft and list it under the table.
```

Step 4 is yours. Find each source line in the notes, then check the row against the calendar. The notes beat old newsletters. If the notes and calendar disagree, neither wins: mark it [CONFIRM] and ask who wrote the note. Rows the calendar lacks (pantry drive, RSVP date, car wash time): check the notes only.

## Source-line check

- [ ] Every date, time, room and name has a row in the facts table.
- [ ] Each source line is in this week’s notes, word for word, and says the same as its fact.
- [ ] Nothing came from an old newsletter.
- [ ] Anything without a source is deleted or marked [CONFIRM].
- [ ] Rows the calendar covers match it, or are marked [CONFIRM].
- [ ] Every item in the notes is in the draft.

Public announcements only. Keep prayer requests, health details, children’s names and giving information out of this exercise.
