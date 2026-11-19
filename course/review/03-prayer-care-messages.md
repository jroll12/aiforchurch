# Blind test: 03 Prayer chain and care messages, privacy first

A tester saw only this module's folder, ran the lesson as an attendee and as Claude, and wrote nothing. Its report is summarized here, with every finding kept.

## Privacy
- **Blocker:** the take-home handout says "Paste the guide and the prayer log". Repeated in the office with a real log, that sends the private column and the pastor-only and do-not-share rows to Claude.
- **Blocker:** the safe method (put [NAME 1] in place of each name, leave out the private column) appears only in the facilitator notes.
- **Blocker:** the data safety sentence says to keep "names, health details" out of Claude, but the whole workflow depends on them, and attendees get no safe way to use it. It should say plainly: never paste the private column or rows marked pastor only or do not share.
- **Minor:** the samples include a child detail (Carl Dunn's son); it is labeled FAKE.
- Nothing looks like real personal data.

## Steps
- **Minor:** the handout doesn't say where to get the files. Opened in Excel or Sheets, the CSV's FAKE banner lands in the header row.
- **Minor:** step 4 says "tick each detail", but the checklist has boxes for rules. Box 1 ("Every detail comes from the request column") fails on the title, footer and sign-off.
- **Minor:** "Then send" doesn't fit class, and "Every [CONFIRM] is answered by the person" can't be done with invented people.
- **Minor:** "Ray Okafor (asked by his wife June)" against "Use the name as the person gave it" leaves open whether the bracket goes in the email.

## The mistake
- My drafts avoided it. Prompt 2 ("Never use the private column") almost rules it out, so the habit is mostly tried on a clean draft.
- **Minor:** the handout never mentions the flawed draft.
- The habit catches every planted flaw. The flawed draft contains all five mistakes, and its list is accurate.
- **Minor:** the list misses three further slips: no [CONFIRM] on whether Ray agreed, requests reworded into third person, and an added closing line.

## Factual errors
- All weekdays are correct.
- **Minor:** the guide says do-not-share and pastor-only requests are seen only by one person, yet they sit in the office log that gets pasted. This reads as an accident, not the trap.
- **Minor:** the office_note column is never explained.
- **Minor:** "Handout (PDF)" links a .md file.

## Prompts
- **Minor:** prompts 2 and 3 only work in the same chat.
- **Minor:** "Write this Sunday's" makes Claude use today's date, not the March dates.

## Claude features
- **Check:** a new chat does not keep a request out of memory or past-chat search on plans that have them.

## Fit
- **Major:** 18 minutes is tight unless the files and prompts are shared digitally so they can be copied.
