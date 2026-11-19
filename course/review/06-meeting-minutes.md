# Blind test: 06 Meeting notes into minutes and action items

A tester saw only this module's folder, ran the lesson as an attendee and as Claude, and wrote nothing. Its report is summarized here, with every finding kept.

## Steps
- **Minor:** the handout doesn't say where the files are.
- **Minor:** the step 3 prompt only works in the same chat.
- **Minor:** "one row for every motion, outcome, vote count and owner" can be read as one row per motion or one row per item.
- **Minor:** the step 3 prompt never mentions the decision table, which step 4 checks.

## The mistake
- My output avoided it. The samples set the trap well, but the step 2 prompt heads it off, so the flawed draft will usually be needed.
- **Major:** an unplanned guess happens. The notes give first names only and no year; surnames, roles and "2026" exist only in past-minutes.md. Using them fails the checklist's "Nothing came from last month's minutes", and the flawed draft's answer list ("ask Mark Ellis") depends on them too.
- **Major:** the habit leaves out dates, though two of the four planted errors are invented dates. The step 2 decision table also leaves dates out.
- **Major:** the flawed draft's table gives away its answers, and "What to find" is in the same file.
- **Minor:** "What to find" misses "Carol will send the date" and the claim "There was no vote".

## Factual errors
- None: every weekday is correct, $1,800 + $600 = $2,400, and the votes match attendance.

## Prompts
- The step 1/2 prompt works on its own; the step 3 prompt does not.

## Real data
- None.
- **Minor:** "Handout (PDF)" links a .md file.
- **Minor:** the [CONFIRM] in the title prints on the handout.

## Fit
Tight but workable in 20 minutes.
