# Style and rules for every module

`node qa/checks/course.mjs` checks the rules marked (checked).

## Voice

- Plain words for church office staff who are new to AI. Short sentences. Say what to do, then why.
- The same voice as the site:
  - calm and direct
  - no exclamation marks, hype or jargon
  - "Claude", not "the AI" or "the model"
- Typographic apostrophes (’) and quotes (“ ”) in prose. Straight quotes only inside prompts people paste.
- No em dashes or en dashes anywhere (checked, by the site's guards).
- Mark any fact that is not checked yet with [CONFIRM], the same habit the lessons teach. Claude product details are one example: plan limits, features and button names change.

## Lesson shape (checked)

Front matter at the top of `lesson.md`:

```
---
topic: 2
slug: 02-ai-use-policy
title: (exactly the title on the site, src/copy.ts)
duration: About 30 minutes
outcome: By the end, you can ... (the site's card line for this topic after "By the end, you can", first letter lowercased; Topic 1 uses its designed Topic page outcome)
status: draft
next: 03-prayer-care-messages
trap: samples/<file> :: <text that must appear in that file>
flaw: <text that must appear in examples/flawed-draft.md>
---
```

- `trap` can repeat, once per file. Together, the trap lines show the conflicting or missing facts that make the mistake possible.
- `flaw` is the mistake as it appears in the prepared flawed draft.
- `next` is left out on topic 7.

Then these sections, in this order, as `##` headings:

1. `The idea, 5 minutes`: two or three sentences. What goes wrong, and the simple fix. (Home: "A five-minute explanation of each task, in plain words.")
2. `The exercise`: exactly four numbered steps, short enough to read aloud. Step 4 is always a human check against a source.
3. `Watch for this`: a `###` heading naming the mistake in a few words, ending with a full stop (for example "A stale time."). Then one paragraph showing it with the sample files' own facts.
4. `The habit`: a `###` heading naming the habit (for example "Source-line check."). Then one paragraph: the rule, what to do when it fails, and the final check.
5. `Data safety`: one or two sentences: what may and may not go into Claude for this task.
6. `Downloads`: links to `handout.md` and `samples/`, each with a short description.
7. `Next`: "Next topic:" and a link to the next lesson (left out on topic 7).

Below the lesson, a `## Facilitator notes` section is allowed: timing, what to show, what to say if Claude gets it right.

## Times (checked)

| Topics | Each | Total | Agenda slot |
| --- | --- | --- | --- |
| 1 to 3 | About 30 minutes | 90 | 9:15 to 10:45 [CONFIRM] |
| 4 to 7 | About 20 minutes | 80 | 11:00 to 12:30, with 10 minutes for questions [CONFIRM] |

Each 30-minute topic is a 5-minute idea, a 15 to 20 minute exercise, then the mistake and the habit. A 20-minute topic is a 5-minute idea, a 10-minute exercise, then the mistake and the habit.

## Handout (checked)

- One printed page: 450 words at most.
- It starts with the title and the outcome.
- It has a `## Prompts to paste` section: one fenced block per prompt, in plain words, using straight quotes. The prompts must work on their own when pasted.
- It ends with the habit as a short checklist.

## Sample files (checked)

- **FAKE first line:** every file in `samples/` and `examples/` starts with a line containing FAKE, for example:
  `FAKE SAMPLE FILE. Invented for training. Maple Street Church (FAKE) does not exist.`
- **One invented church:** Maple Street Church (FAKE), in Riverton (FAKE). Staff and members have plain invented names: Pastor Dan Hale, Office Manager Rita Gomez.
- **No real people, churches, places, giving, health or children's details.** Topic 3 needs invented private details so attendees can practice keeping them out. They must still be obviously invented, and the file says so in its FAKE line.
- **Emails** only at example.org (checked).
- **Phone numbers** only in the 555-01xx range, for example 555-0142 (checked).
- **Formats:** Markdown (`.md`) for notes, letters and drafts; CSV (`.csv`) for calendars and lists. No Word files, so everything stays readable in the repo.

## The trap and the prepared mistake

Each module teaches one mistake Claude can make on this task. The mistake has to be possible from the sample files, so build it in:

- **A trap in the samples:** a conflict between files (an old time against a new one), or a gap (a detail the notes don't give), that tempts a guess.
- **A prepared mistake:** `examples/flawed-draft.md` is the output with that mistake in it. Facilitators show it when Claude gets it right live. It still starts with a FAKE line.
- **The fix in the habit:** run as written, the habit catches the mistake.
