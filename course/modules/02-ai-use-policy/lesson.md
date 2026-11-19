---
topic: 2
slug: 02-ai-use-policy
title: A church AI use policy
duration: About 30 minutes
outcome: By the end, you can write a one-page policy your pastor and board can review.
status: draft
next: 03-prayer-care-messages
trap: samples/board-notes.md :: What does the law require before we put member information into an AI tool?
trap: samples/board-notes.md :: No answer was recorded.
trap: samples/board-notes.md :: Tabled to the April meeting.
trap: samples/board-notes.md :: Review this policy in six months, at the September meeting.
trap: samples/current-computer-policy.md :: This policy is reviewed by the board each January.
flaw: State law requires written consent before any member information is entered into an AI tool.
source: drafted for approval; there is no designed lesson page for this topic
---

# A church AI use policy

Topic 2 of 7. About 30 minutes.

By the end, you can write a one-page policy your pastor and board can review.

## The idea, 5 minutes

Claude can turn meeting notes into a tidy policy quickly, but it can add rules nobody decided, or say what the law requires with no source. The fix is simple: ask for every rule with the line it came from, and mark anything legal or undecided [CONFIRM]. What you take home is a draft for your board to review, not a finished policy.

## The exercise

1. Start a new chat. Paste the board notes, the staff survey and the current computer and email policy, and ask Claude to list what was decided and what was left open.
2. Ask for a one-page draft policy headed “Draft for board review,” plus a rules table: every rule, with the line from the notes or the current policy it came from.
3. Tell Claude to mark [CONFIRM] any rule with no source line, and anything about the law or your denomination, instead of stating it as fact.
4. Read the rules table against the board notes yourself, one decision at a time. Then the draft goes to your pastor and board for review.

## Watch for this

### A rule nobody made.

Carol Lin asked what the law requires before member information goes into an AI tool, and no answer was recorded. A draft can still say “State law requires written consent.” It can also turn the tabled question about telling the congregation into a rule, or copy the old policy’s January review when the board chose six months.

## The habit

### Decision-line check.

Every rule in the draft needs a source line: a decision in the board notes or a line in the current policy. No source line means delete it or mark it [CONFIRM]. Anything about the law or the denomination is marked [CONFIRM] for the pastor, the board or a lawyer, even when it sounds right. Then read the rules table against the board notes.

## Data safety

Practice with the FAKE files only. For your own church’s policy, paste board decisions and your current policy, and leave out member names, prayer requests, health details, children’s details and giving information.

## Downloads

- [Handout (PDF)](handout.md): One page to print or keep.
- [Sample files, all labeled FAKE](samples/): Board meeting notes, a staff survey, the current computer and email policy.

## Next

Next topic: [Prayer chain and care messages, privacy first](../03-prayer-care-messages/lesson.md)

## Facilitator notes

- **Timing:** 5 minutes for the idea, 18 for the exercise, 7 for the mistake and the habit.
- **What’s in the sample files:**
  - `board-notes.md` holds six numbered decisions, the open questions and one tabled item. It is the main source for step 4.
  - `staff-survey.csv` shows how staff already use AI. It explains why the board acted. It is not a source of rules.
  - `current-computer-policy.md` is the older policy. Some of its lines can carry over, such as keeping member contact details in church accounts.
- **Where the traps are:**
  - Carol Lin’s question about the law has no answer. A draft that fills it in states a legal requirement no one gave.
  - Tom Becker’s question about the denomination has no answer either. A good draft lists it as [CONFIRM].
  - Telling the congregation about AI was tabled to April. A draft can turn it into a rule.
  - The old policy says it is reviewed each January. The board decided six months for this one, at the September meeting. That line looks sourced, so only step 4 catches it.
- **If Claude gets it right live:** open `examples/flawed-draft.md` and ask the room to find what’s wrong. It has the invented law, the tabled rule as a rule, the January review and “Adopted by the board” at the top.
- **Say it plainly:** Claude cannot tell your church what the law requires. That is a question for a lawyer, and the policy is for the board to decide.
- **Before class [CONFIRM]:** Check that all three sample files fit in one message on the plan attendees will use. If not, paste them one at a time and ask for the list after the last one.
