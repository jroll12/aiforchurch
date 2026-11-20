# Meeting notes into minutes and action items [CONFIRM]

By the end, you can turn rough notes into minutes your board can approve.

**Practice files (all FAKE):** secretary-notes.md, past-minutes.md, from [FILES LINK].

**Do every step in the same chat.** Later prompts refer back to earlier ones.

## The four steps

1. Start a new chat. Paste the secretary’s rough notes and last month’s minutes. Say the old minutes are for layout only.
2. Ask for minutes, action items (who, what, by when) and a decision table: one row per motion and per action item.
3. Tell Claude to mark anything the notes don’t say [CONFIRM], in all three.
4. Check the decision table against the notes, line by line. The notes win any disagreement. Send every [CONFIRM] to the secretary.

## Prompts to paste

Steps 1 and 2, with both files pasted below it:

```
Below are the secretary's rough notes from our church board meeting, then last month's approved minutes. Use last month's minutes for layout only, never as a source of facts. Write draft minutes from the notes. Then write the action items as a table: who, what, by when. Then add a decision table with one row per motion and one row per action item. For a motion, give its outcome and vote count. For an action item, give its owner and date. In every row, quote the exact line from the notes it came from.
```

Step 3:

```
Check the minutes, the action items and the decision table you just wrote against the notes again. If the notes do not give a motion's outcome, a vote count, an owner or a date, do not fill it in. Write [CONFIRM] in its place, in all three, and list it at the end for the secretary. Do not reword or improve what was decided.
```

Step 4 is yours. Open the notes and tick each row of the decision table that matches.

## Record check

- [ ] Each motion’s outcome (passed, failed, tabled) is the one the notes give.
- [ ] Every vote count is in the notes. No count in the notes means [CONFIRM].
- [ ] Every owner and date is in the notes, or says [CONFIRM].
- [ ] Every action item in the notes is in the list, even one with no date.
- [ ] Each decision table row quotes a notes line that says the same thing.
- [ ] Nothing came from last month’s minutes.
- [ ] Every gap is marked [CONFIRM] for the secretary.

Open business only. Keep personnel matters, pastoral care, member giving and anything from a closed session out of this exercise.
