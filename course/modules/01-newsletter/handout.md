# Weekly newsletter from staff notes

By the end, you can turn a week of staff notes into a newsletter draft in your church’s voice in about 30 minutes, with every date, time and room traced to a source.

**Practice files (all FAKE):** voice-guide.md (the short voice guide), past-newsletter-1.md, past-newsletter-2.md, staff-notes.md, calendar.csv. Get them from [FILES LINK].

**Do every step in the same chat.** Steps 2 and 3 go in one chat inside the Project, because step 3 refers back to step 2.

## The four steps

1. Make a Project for the newsletter. Paste the step 1 prompt into its instructions, and add voice-guide.md and both past newsletters to it.
2. Paste staff-notes.md. Ask for a draft and a facts table.
3. Tell Claude to mark anything without a source line [CONFIRM].
4. Check the facts table against calendar.csv, then edit for voice. In class, stop before sending.

No Project? Put the step 1 prompt, the voice guide and both past newsletters in your first message, then go on in that chat.

## Prompts to paste

Step 1, in the Project’s instructions:

```
You help write the weekly newsletter for our church. Follow the voice guide. Use the past newsletters as examples of tone and layout only, never as a source of facts. Every date, time, room and name must come from the staff notes I paste that week.
```

Step 2, in a new chat in the Project, with the staff notes pasted below it:

```
Here are this week's staff notes. Write the newsletter draft in our voice. Then add a facts table: one row for every date, time, room and name in the draft, with the exact line from the notes it came from.
```

Step 3, in the same chat:

```
Check the draft against the notes again. If any date, time, room or name has no source line in the notes, do not fill it in. Mark it [CONFIRM] in the draft and list it under the table.
```

Step 4 is yours. Find each source line in staff-notes.md, then check the row against calendar.csv.

- This week’s notes win over any old newsletter.
- If the notes and the calendar disagree, neither wins. Mark it [CONFIRM] and ask whoever wrote the note.
- If a row has nothing in the calendar to match (the pantry drive, an RSVP date, the car wash time), check it against the notes only.
- At work, a person answers every [CONFIRM] before anything is sent.

## Source-line check

- [ ] Every date, time, room and name in the draft has a row in the facts table.
- [ ] Each source line is in this week’s notes, word for word, and says the same as the fact next to it.
- [ ] Nothing came from an old newsletter.
- [ ] Anything without a source is deleted or marked [CONFIRM].
- [ ] Every row the calendar covers matches it, or is marked [CONFIRM].
- [ ] Every item in the notes made it into the draft.

Public announcements only. Keep prayer requests, health details, children’s names and giving information out of this exercise.
