# Meeting notes into minutes and action items [CONFIRM]

By the end, you can turn rough notes into minutes your board can approve.

**Practice files (all FAKE):** secretary-notes.md, past-minutes.md.

## The four steps

1. Start a new chat. Paste the secretary’s rough notes and last month’s minutes. Say the old minutes are for layout only.
2. Ask for draft minutes, an action-item list (who, what, by when) and a decision table.
3. Tell Claude to mark anything the notes don’t say [CONFIRM].
4. Check the decision table against the notes, line by line. Send every [CONFIRM] to the secretary.

## Prompts to paste

Steps 1 and 2, with the notes and last month’s minutes pasted below it:

```
Below are the secretary's rough notes from our church council meeting, then last month's approved minutes. Use last month's minutes for layout only, never as a source of facts. Write draft minutes from the notes. Then write the action items as a table: who, what, by when. Then add a decision table: one row for every motion, outcome, vote count and action-item owner, with the exact line from the notes it came from.
```

Step 3:

```
Check the minutes and action items against the notes again. If the notes do not give a motion's outcome, a vote count, an owner or a date, do not fill it in. Write [CONFIRM] in its place and list it at the end as a question for the secretary. Do not reword or improve what was decided.
```

Step 4 is yours. Open the notes and tick each row of the decision table that matches.

## Decision check

- [ ] Every motion in the minutes matches a line in the notes.
- [ ] Each outcome (passed, failed, tabled) is the one the notes give.
- [ ] Every vote count comes from the notes. No count in the notes means [CONFIRM].
- [ ] Every action item has an owner and a date from the notes, or [CONFIRM].
- [ ] Nothing came from last month’s minutes.
- [ ] The secretary answers every [CONFIRM] before the board sees the draft.

Open business only. Keep personnel matters, pastoral care, member giving and anything from a closed session out of this exercise.
