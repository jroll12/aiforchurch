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

1. Start a new chat. Paste the prayer chain guide and the prayer log, and ask Claude to list each request with its share level.
2. Ask for the Sunday whole-church email from rows marked “whole church” only, plus a permission table: every detail, with the row and share level it came from.
3. Ask for a short get-well card message for Ray Okafor. Tell Claude to mark [CONFIRM] anything it is not sure the person agreed to share.
4. Check every line of the email and the card against the prayer log yourself: the right share level, nothing from the private column, nothing added. Then send.

## Watch for this

### A private detail in a public message.

Helen Brooks agreed to share that she had surgery. The log also says it was a knee replacement, and that detail is private. A draft can still say “knee replacement,” add Walter Price’s prayer-team-only request, or say Helen’s surgery went well when the log has no update.

## The habit

### Permission check.

Every detail in the message must trace to the request column of a row whose share level allows it. A detail from the private column, from a row with a narrower share level, or from nowhere comes out, or is marked [CONFIRM] so someone can ask the person. Then read the final message against the log one row at a time.

## Data safety

Practice only with the FAKE files. With real requests, follow your church’s AI use policy (Topic 2), and keep names, health details, children’s details and giving information out of Claude unless that policy allows it.

## Downloads

- [Handout (PDF)](handout.md): One page to print or keep.
- [Sample files, all labeled FAKE](samples/): A prayer request log and the church’s prayer chain guide.

## Next

Next topic: [Event announcements from a ministry calendar [CONFIRM]](../04-event-announcements/lesson.md)

## Facilitator notes

- **Timing:** 5 minutes for the idea, 18 for the exercise, 7 for the mistake and the habit.
- **What’s in the sample files:**
  - `prayer-chain-guide.md` says what each share level means, the email format and the card format. It is the rulebook for step 4.
  - `prayer-log.csv` has seven requests. Each has a request column (what may be shared), a share level and a private column (never shared). Every private detail is invented and marked FAKE.
- **Where the traps are:**
  - Helen Brooks and Ray Okafor are whole church, but their private columns name a knee replacement and a broken hip. A draft that uses them exposes private details.
  - Walter Price and Marcus Webb are prayer team only. Either one in the Sunday email is a mistake.
  - Helen’s row says “No update since the surgery.” A draft that says it went well adds a detail no one wrote down.
  - The pastor-only and do-not-share rows should not appear anywhere.
- **If Claude gets it right live:** open `examples/flawed-draft.md` and ask the room to find what’s wrong. It has the knee replacement, the invented update, the fall, Walter Price’s request and “hip” in the card. Its table marks Walter as whole church, so only the check against the log catches him.
- **A question for the room:** Ray’s request came from his wife, June. Did Ray agree? When it is not clear, mark it [CONFIRM] and ask.
- **If someone asks about real requests:** one way is to paste the requests with names replaced by [NAME 1], [NAME 2] and so on, leave out the private column, then put the names back after Claude formats the message. Whether even that is allowed is for your church’s policy to say.
