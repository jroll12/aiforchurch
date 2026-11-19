---
topic: 3
slug: 03-prayer-care-messages
title: Prayer chain and care messages, privacy first
duration: About 30 minutes
outcome: By the end, you can format messages without exposing private details.
status: draft
next: 04-event-announcements
trap: samples/prayer-log.csv :: Knee replacement at Riverton General (FAKE).
trap: samples/prayer-log.csv :: Broken hip from a fall at home (FAKE).
trap: samples/prayer-log.csv :: Pray for strength as I start a new treatment.",prayer team only
trap: samples/prayer-log.csv :: No update since the surgery.
trap: samples/prayer-chain-guide.md :: Do not add updates.
flaw: Helen Brooks had knee replacement surgery on Thursday, March 12.
source: drafted for approval; there is no designed lesson page for this topic
---

# Prayer chain and care messages, privacy first

Topic 3 of 7. About 30 minutes.

By the end, you can format messages without exposing private details.

## The idea, 5 minutes

A prayer chain message may share only what each person agreed to share. Claude can pull in a private detail, a request meant for the prayer team only, or an update nobody gave. The fix is simple: give every request a share level, and check every detail against it before you send.

## The exercise

1. Start a new chat. Paste the prayer chain guide and the FAKE prayer log, and ask Claude to list each request with its share level. The FAKE log has a private column on purpose, so you can practice keeping it out of the messages.
2. Ask for the whole-church email for Sunday, March 15 from rows marked “whole church” only, plus a permission table: every detail, with the row and share level it came from.
3. Ask for a short get-well card message for Ray Okafor. Tell Claude to mark [CONFIRM] anything it is not sure the person agreed to share.
4. Check every line of the email and the card against the prayer log yourself: the right share level, the words of the request column, nothing added. The log wins over Claude’s table; a detail with nothing to check against comes out or is marked [CONFIRM].

## Watch for this

### A private detail in a public message.

Helen Brooks agreed to share that she had surgery. The log also says it was a knee replacement, and that detail is private. A draft can still say “knee replacement,” add Walter Price’s prayer-team-only request, or say Helen’s surgery went well when the log has no update.

## The habit

### Permission check.

Every detail in the message must trace to the request column of a row whose share level allows it. A detail from the private column, from the office note, from a row with a narrower share level, or from nowhere comes out, or is marked [CONFIRM] so someone can ask the person. Then read the final message against the log one row at a time; when the log and Claude’s table disagree, the log wins.

## Data safety

Practice only with the FAKE files; their private column is there to practice leaving it out. With a real log, never paste the private column or any row marked pastor only or do not share: paste only the request column and share level, with names replaced by [NAME 1], [NAME 2] and so on, and only if your church’s AI use policy (Topic 2) allows it.

## Downloads

- [Handout (PDF)](handout.md): One page to print or keep.
- [Sample files, all labeled FAKE](samples/): A prayer request log and the church’s prayer chain guide.

## Next

Next topic: [Event announcements from a ministry calendar [CONFIRM]](../04-event-announcements/lesson.md)

## Facilitator notes

- **Timing:** 5 minutes for the idea, 18 for the exercise, 7 for the mistake and the habit. Eighteen minutes is tight unless the files and prompts are shared digitally, so send [FILES LINK] before class and let attendees copy and paste.
- **Say the data safety line out loud** at the start and again at the end. The practice log is FAKE, and its private column is the trap. A real log is never pasted whole. Put the names back yourself after Claude formats the message.
- **What’s in the sample files:**
  - `prayer-chain-guide.md` says what each share level means, the email format and the card format. It is the rulebook for step 4. It also says the log is an office file: office staff see every row, and the share level says who else may hear it.
  - `prayer-log.csv` has seven requests. Each has a request column (what may be shared), a share level, a private column (never shared) and an office note (for the office: who asked, follow-up, whether there is news; never shared). Every private detail is invented and marked FAKE.
  - Opened in a spreadsheet, row 1 is the FAKE label and the column names are in row 2.
  - Carl Dunn’s row mentions his son. It is invented and labeled FAKE, and it is a do-not-share row, so it should appear nowhere.
- **Where the traps are:**
  - Helen Brooks and Ray Okafor are whole church, but their private columns name a knee replacement and a broken hip. A draft that uses them exposes private details.
  - Walter Price and Marcus Webb are prayer team only. Either one in the Sunday email is a mistake.
  - Helen’s office note says “No update since the surgery.” A draft that says it went well adds a detail no one wrote down.
  - The pastor-only and do-not-share rows should not appear anywhere, not even as “an unspoken request”.
- **Expect to use the prepared draft.** Prompt 2 tells Claude never to use the private column, so a live draft usually avoids the mistake. That is the point of the prompts. The prepared draft is the planned way to show the habit catching it.
- **If Claude gets it right live:** project `examples/flawed-draft.md` and ask the room to find what’s wrong. Keep `examples/answer-key.md` to yourself. The draft has the knee replacement, the invented update, the fall, Walter Price’s request, the unspoken request, “hip” in the card, reworded requests and no [CONFIRM] on Ray. Its table cites the request column for private details and marks Walter as whole church, so only the check against the log catches them.
- **A question for the room:** Ray’s request came from his wife, June; that is what the words in brackets after his name say. Did Ray agree? When it is not clear, mark it [CONFIRM] and ask.
- **Before class [CONFIRM]:** on plans with memory or past-chat search, starting a new chat does not keep what you pasted out of them. One more reason a real private detail never goes in.
