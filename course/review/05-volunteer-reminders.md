# Blind test: 05 Volunteer schedules and reminder emails

A tester saw only this module's folder, ran the lesson as an attendee and as Claude, and wrote nothing. Its report is summarized here, with every finding kept.

## Steps
- **Major:** the handout's first checklist box ("Every reminder has a matching row on the sheet: same name, date and role") fails the correct post-swap reminders and approves the wrong ones. It contradicts box 2. The lesson's habit says "after any swap from a later email", but the handout drops that phrase. Step 4's "tick each row that matches" has the same problem.
- **Minor:** the handout doesn't say where to get the files. A .md file won't open cleanly for most users, and in Excel the CSV's FAKE first line splits at its commas.
- **Minor:** step 3's "Apply any swap" comes after step 2 already applied it. Re-applying could reverse it.

## The mistake
- **Minor:** my output avoided the trap. The step 1 prompt ("a later email about a swap", "Never add a name") mostly defeats it, so the lesson leans on the flawed draft.
- The sample files do set up the trap, and the lesson's habit catches it. The handout's check catches it only through boxes 2 and 4.
- The flawed draft contains both mistakes, and its "What to find" list is correct.
  - **Major:** the answer key sits in the file the room is shown.
  - **Minor:** row 20's note gives away the coffee trap.

## Factual errors
- None found. Every date was checked; Easter 2026 is April 5. There are 16 rows and 16 emails.
- **Minor:** "Handout (PDF)" points to a .md file.

## Prompts
- **Minor:** steps 2 and 3 only work in the same chat as step 1.
- **Minor:** step 3 never says to rewrite the emails, only the list.

## Real data
- None found.
- **Minor:** the [CONFIRM] in the title will print on the handout.

## Fit
- **Major:** 10 minutes is tight for three files, three prompts, 15 emails and 16 rows to check.
- **Major:** the flawed draft (102 lines, 16 emails) is too long for one screen. The 16-row table alone shows all three errors.

## What works
The guide's times, the send-on-Monday rule, the Easter note, the nursery rule and the data-safety line are clear and consistent.
