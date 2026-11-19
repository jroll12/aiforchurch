# Weekly newsletter from staff notes

By the end, you can turn a week of staff notes into a newsletter draft in your church’s voice in about 30 minutes, with every date, time and room traced to a source.

**Practice files (all FAKE):** voice-guide.md, past-newsletter-1.md, past-newsletter-2.md, staff-notes.md, calendar.csv.

## The four steps

1. Make a Project for the newsletter. Add instructions, a short voice guide and two past newsletters as examples.
2. Paste this week’s staff notes. Ask for a draft and a facts table.
3. Tell Claude to mark anything without a source line [CONFIRM].
4. Check the facts table against the church calendar. Edit for voice, then send.

## Prompts to paste

Step 1, in the Project’s instructions:

```
You help write the weekly newsletter for our church. Follow the voice guide. Use the past newsletters as examples of tone and layout only, never as a source of facts. Every date, time, room and name must come from the staff notes I paste that week.
```

Step 2, in a new chat in the Project, with the staff notes pasted below it:

```
Here are this week's staff notes. Write the newsletter draft in our voice. Then add a facts table: one row for every date, time, room and name in the draft, with the exact line from the notes it came from.
```

Step 3:

```
Check the draft against the notes again. If any date, time, room or name has no source line in the notes, do not fill it in. Mark it [CONFIRM] in the draft and list it under the table.
```

Step 4 is yours. Open the calendar and tick each row of the facts table that matches.

## Source-line check

- [ ] Every date, time, room and name has a source line from this week’s notes.
- [ ] Nothing came from an old newsletter.
- [ ] Anything without a source is deleted or marked [CONFIRM].
- [ ] The facts table matches the calendar.
- [ ] Every [CONFIRM] is answered by a person before you send.

Public announcements only. Keep prayer requests, health details, children’s names and giving information out of this exercise.
