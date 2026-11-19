---
topic: 6
slug: 06-meeting-minutes
title: Meeting notes into minutes and action items [CONFIRM]
duration: About 20 minutes
outcome: By the end, you can turn rough notes into minutes your board can approve.
status: draft
next: 07-bulletin-slides
trap: samples/secretary-notes.md :: Motion tabled to the May meeting
trap: samples/secretary-notes.md :: Passed, count not taken
trap: samples/secretary-notes.md :: Someone to call for the 3rd quote, didn’t settle who
trap: samples/past-minutes.md :: Motion carried, 7 to 0
trap: samples/past-minutes.md :: | Tom Reyes | Get roof repair quotes |
flaw: Motion carried, 6 to 0
source: title and outcome from src/copy.ts; everything else drafted for approval
---

# Meeting notes into minutes and action items [CONFIRM]

Topic 6 of 7. About 20 minutes.

By the end, you can turn rough notes into minutes your board can approve.

## The idea, 5 minutes

Claude turns rough notes into tidy minutes quickly, but tidy can mean guessed. It may record a tabled motion as passed, add a vote count, or give a task to someone. The fix: ask where every decision came from, and leave gaps for the secretary to fill.

## The exercise

1. Start a new chat. Paste the secretary’s rough notes and last month’s minutes, and say the old minutes are for layout only.
2. Ask for draft minutes, an action-item list (who, what, by when) and a decision table: one row per motion, with its outcome and vote count, and one row per action item, with its owner and date. Each row quotes the line from the notes it came from.
3. In the same chat, tell Claude to mark anything the notes don’t say [CONFIRM] instead of filling it in, in the minutes, the action items and the decision table.
4. Check the decision table against the notes, line by line. Where the draft or last month’s minutes disagree with the notes, the notes win. Send every [CONFIRM] to the secretary before the board sees the draft.

## Watch for this

### A guessed decision.

The notes say the roof motion was tabled to the May meeting, and no one was named to get the third quote. Last month’s minutes say “Motion carried, 7 to 0” after every motion, and give the roof quotes to Tom Reyes. A draft can record the roof quote as carried 6 to 0 and hand the third quote to Tom, with a date no one gave.

## The habit

### Decision check.

Every motion, outcome, vote count, owner and date in the minutes needs a line in the notes, and every action item in the notes needs a row. If the notes don’t say it, mark it [CONFIRM] and ask the secretary. Last month’s minutes are for layout only, so the notes win. Minutes are a record, so nothing is improved or guessed. Then read each motion and date against the notes once more before the board sees it.

## Data safety

Open business only. Keep personnel matters, pastoral care, member giving and anything from a closed session out of this exercise.

## Downloads

- [Handout (PDF)](handout.md): One page to print or keep.
- [Sample files, all labeled FAKE](samples/): The secretary’s rough notes from a council meeting and last month’s approved minutes, for layout only.

## Next

Next topic: [Bulletin and slide text from one source [CONFIRM]](../07-bulletin-slides/lesson.md)

## Facilitator notes

- **Timing:** 5 minutes for the idea, 10 for the exercise, 5 for the mistake and the habit.
- **What’s in the sample files:**
  - `secretary-notes.md` is the source for steps 1 to 4. It has every full name, role and the date with the year, so nothing needs to come from last month. `past-minutes.md` is last month’s minutes, for layout only.
  - The roof motion was made and seconded, then tabled to May. A draft that follows the pattern of the old minutes records it as carried.
  - The spring cleanup passed, but the notes say “count not taken”. A careful draft marks the count [CONFIRM] rather than writing “unanimously” or a number.
  - No one was named to get the third roof quote. The old minutes gave the roof quotes to Tom Reyes, so a draft can assign it to him.
  - Linda Shaw’s budget-line task and Carol Bennett’s “will send the date” have no date. A careful draft lists both as action items and marks the dates [CONFIRM].
  - The youth trip vote (5 yes, 1 no) and the two dated action items are given, so they should come through as written.
- **Expect to use the prepared draft.** The prompts steer Claude away from the mistake, which is the point of teaching them, so Claude usually gets this right live. That is why `examples/flawed-draft.md` exists. Don’t weaken the prompts to make Claude fail.
- **If Claude gets it right live:** open `examples/flawed-draft.md` and ask the room to find what’s wrong. The answers are in `examples/answer-key.md`; keep that file off the screen. In short: the tabled roof motion is carried 6 to 0, the cleanup vote is called unanimous, the third quote goes to Tom with an invented date, Linda gets an invented date, Carol’s action item is missing, and there is no [CONFIRM] anywhere.
- **Say this:** minutes are what the board approves as the record. A guess that reads well is still wrong.
