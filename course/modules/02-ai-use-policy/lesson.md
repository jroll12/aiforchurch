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

Claude can turn meeting notes into a tidy policy quickly, but it can add rules nobody decided, or say what the law requires with no source. The fix is simple: ask for every rule with the line it came from, and list anything legal or undecided as an open question marked [CONFIRM]. What you take home is a draft for your board to review, not a finished policy.

## The exercise

1. Start a new chat. Paste the board notes, the staff survey and the current computer and email policy, and ask Claude to list what was decided and what was left open.
2. Ask for a one-page draft policy headed “Draft for board review,” plus a rules table: every rule, with the line from the notes or the current policy it came from. Ask for the open questions under it.
3. Tell Claude to take out any rule with no source line, and anything that says what the law or your denomination requires, and list them under the draft as open questions marked [CONFIRM].
4. Check that every rule in the draft has a row in the table, then read each row against the board notes or the current policy. Where they disagree, the newer board decision wins; list the conflict [CONFIRM]. Then the draft goes to your pastor and board.

## Watch for this

### A rule nobody made.

Carol Lin asked what the law requires before member information goes into an AI tool, and no answer was recorded. A draft can still say “State law requires written consent.” It can also turn the tabled question about telling the congregation into a rule, or copy the old policy’s January review when the board chose six months.

## The habit

### Decision-line check.

Every rule in the draft needs a source line: a decision in the board notes or a line in the current policy, saying the same thing as the rule. No source line means the rule comes out and goes on the open questions list, marked [CONFIRM]. Anything about the law or the denomination goes on that list too, for the pastor, the board or a lawyer, even when it sounds right. Then read the draft against the rules table, and each row against its source; when the two sources disagree, the newer board decision wins.

## Data safety

Practice with the FAKE files only. For your own church’s policy, paste board decisions and your current policy with board members’ names replaced by their roles, such as “the chair,” and leave out member names, prayer requests, health details, children’s details and giving information.

## Downloads

- [Handout (PDF)](handout.md): One page to print or keep.
- [Sample files, all labeled FAKE](samples/): Board meeting notes, a staff survey, the current computer and email policy.

## Next

Next topic: [Prayer chain and care messages, privacy first](../03-prayer-care-messages/lesson.md)

## Facilitator notes

- **Timing:** 5 minutes for the idea, 18 for the exercise, 7 for the mistake and the habit. Thirty minutes is enough on a laptop; it is slow on a phone, so share the files and prompts digitally at [FILES LINK] before class.
- **What’s in the sample files:**
  - `board-notes.md` holds six numbered decisions, two open questions and one tabled item. It is the main source for step 4.
  - `staff-survey.csv` shows how staff already use AI: three yes, one “tried once”, two no. It explains why the board acted. It is not a source of rules.
  - `current-computer-policy.md` is the older policy. Some of its lines can carry over, such as keeping member contact details in church accounts.
  - Ben Adler is both a voting board member and paid staff. That is on purpose; many small churches work that way.
- **Where the traps are:**
  - Carol Lin’s question about the law has no answer. A draft that fills it in states a legal requirement no one gave.
  - Tom Becker’s question about the denomination has no answer either. A good draft lists it under the open questions, marked [CONFIRM].
  - Telling the congregation about AI was tabled to April. A draft can turn it into a rule.
  - The old policy says it is reviewed each January. The board decided six months for this one, at the September meeting. That line looks sourced, so only step 4 catches it.
- **Which source wins:** the board notes (March 10, 2026) are newer than the computer policy (January 2021). When they disagree, the board decision wins and the conflict goes on the open questions list. Two conflicts: the review date, and who approves new tools (the old policy says ask Rita before installing software; the board says Pastor Dan approves new AI tools).
- **Expect to use the prepared draft.** The prompts tell Claude to use only decisions and to list the open questions, so a live draft usually avoids the mistakes. That is the point of the prompts. The prepared draft is the planned way to show them.
- **If Claude gets it right live:** project `examples/flawed-draft.md` and ask the room to find what’s wrong. Keep `examples/answer-key.md` to yourself. The draft has the invented law (its source line is Carol Lin’s question), the tabled rule as a rule (with no row in the table), the January review, “Adopted by the board” at the top and no open questions list.
- **Say it plainly:** Claude cannot give legal advice. What the law requires is a question for a lawyer, and the policy is for the board to decide.
- **If someone has no staff survey:** that is fine. The survey only explains why the board acted; the prompt works with the board notes and the current policy alone.
