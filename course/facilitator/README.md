# Facilitator kit: Claude for Church Offices

This kit is for running the half-day, in-person workshop. The facilitator is Jarret Roloff.

The lessons themselves are in `course/modules/`. This kit does not repeat them. It says what happens in the room, minute by minute, and what to do when something goes wrong.

**Drafted with AI, then taught and checked by Jarret Roloff.** Like the modules, this kit is a draft until Jarret approves it. Nothing in `course/` is part of the public site.

## The files, in the order to use them

| # | File | When to use it |
| --- | --- | --- |
| 1 | [setup-checklist.md](setup-checklist.md) | The week before, then again on the morning. Room, Wi-Fi, power, projector, the test Claude account, printing, and how attendees get the practice files. |
| 2 | [run-of-show.md](run-of-show.md) | Print it and keep it on the table. The half-day block by block: what you do, what attendees do, what is on the screen. |
| 3 | [opening-and-closing.md](opening-and-closing.md) | Read it once the night before. A short script for the welcome and the close. |
| 4 | [flawed-drafts.md](flawed-drafts.md) | Before each “catch the mistake” step. How to run it, and what the room should find in each module. |
| 5 | [if-claude-is-down.md](if-claude-is-down.md) | Print one copy and keep it with the run of show. The fallback if Claude or the Wi-Fi fails. |

## Before you use it

- Read every `lesson.md` in `course/modules/`, including its Facilitator notes. The timings and traps in this kit come from there.
- Print every `examples/answer-key.md` for yourself. Never project one.
- Clear or keep each [CONFIRM] in this kit. To list them, run `grep -rn "\[CONFIRM\]" course/facilitator`.
- Replace each venue [PLACEHOLDER] in the setup checklist once the venue is booked.

## The rules that run through the whole day

- Every practice file is FAKE. Maple Street Church (FAKE) does not exist.
- Attendees bring nothing real from their church: no names, giving, prayer or child information.
- The prompts usually stop Claude from making the mistake. That is the point of teaching them. So plan to show the prepared flawed draft in every topic, not only when something goes wrong.
- Do every step of an exercise in the same chat. Later prompts refer back to earlier ones.
