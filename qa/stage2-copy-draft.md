# Stage 2 copy, approved

The six Stage 2 pages have no artboards, so their missing copy shipped as placeholders (CLAUDE.md hard rule 1). This file suggested text for each one. **Jarret approved every row on 2026-11-12**, and the approved text is now in src/copy.ts.

- **Still to check:** topics 4 to 7 and the agenda times were suggestions, so each carries [CONFIRM] until Jarret checks it against the course.
- **Placeholders kept:** brackets inside approved text ([CONFIRM], [ONE OR TWO SENTENCES ON YOUR BACKGROUND], [PHOTO]) stay as placeholders and are listed in PLACEHOLDERS.md.
- **How the copy check reads this file:** qa/checks/provenance.mjs accepts approved rows, read from the Draft column, and still rejects anything else.

How to change a line later: edit the Draft cell here and the same text in src/copy.ts. The copy check fails if the two disagree.

How to add new copy:
1. Add a row with status `draft`.
2. Change the status to `approved` when the words are right.
3. Copy the text into src/copy.ts.

- **Drafted with AI, for you to check.** These are drafts in the same plain voice as the design: short sentences, no exclamation marks, no em dashes.
- **Facts are your call.** Where a draft states a fact only you know, it carries [CONFIRM] or a note. Times, topics and your story are left for you, or offered as suggestions.

## Placeholders

| Placeholder | Page | Draft | Notes | Status |
| --- | --- | --- | --- | --- |
| [ACCESSIBILITY] | 02 Workshop details | Step-free entrance [CONFIRM]. Accessible restroom [CONFIRM]. Parking [CONFIRM]. Tell us about any other need when you register. | Depends on the venue. | approved |
| [AGENDA TIME 1] | 02 Workshop details | 9:00 [CONFIRM] | Times assume a 9:00 to 12:30 half-day. Replace with the real times. | approved |
| [AGENDA ITEM 1] | 02 Workshop details | Arrive, sign in, set up your laptop | | approved |
| [AGENDA TIME 2] | 02 Workshop details | 9:15 [CONFIRM] | | approved |
| [AGENDA ITEM 2] | 02 Workshop details | Topics 1 to 3: newsletter, AI use policy, prayer chain and care messages | Each topic runs the three steps on Home: learn the idea, try it, catch the mistake. | approved |
| [AGENDA TIME 3] | 02 Workshop details | 10:45 [CONFIRM] | | approved |
| [AGENDA ITEM 3] | 02 Workshop details | Break | | approved |
| [AGENDA TIME 4] | 02 Workshop details | 11:00 [CONFIRM] | A fifth row (12:15, Questions and wrap-up) can be added in src/copy.ts. | approved |
| [AGENDA ITEM 4] | 02 Workshop details | Topics 4 to 7, then questions | | approved |
| [TOPIC 4 TITLE] | 02 Workshop details | Event announcements from a ministry calendar [CONFIRM] | Suggestion only. Topics 4 to 7 must match the course repo. | approved |
| [TOPIC 4 OUTCOME] | 02 Workshop details | Turn calendar entries into announcements, with every date and room checked. | Suggestion only. | approved |
| [TOPIC 5 TITLE] | 02 Workshop details | Volunteer schedules and reminder emails [CONFIRM] | Suggestion only. | approved |
| [TOPIC 5 OUTCOME] | 02 Workshop details | Draft a month of reminders from a sign-up sheet. | Suggestion only. | approved |
| [TOPIC 6 TITLE] | 02 Workshop details | Meeting notes into minutes and action items [CONFIRM] | Suggestion only. | approved |
| [TOPIC 6 OUTCOME] | 02 Workshop details | Turn rough notes into minutes your board can approve. | Suggestion only. | approved |
| [TOPIC 7 TITLE] | 02 Workshop details | Bulletin and slide text from one source [CONFIRM] | Suggestion only. | approved |
| [TOPIC 7 OUTCOME] | 02 Workshop details | Write the bulletin once and reuse it for slides and the website. | Suggestion only. | approved |
| [BRING ITEM 1] | 02 Workshop details, 07 Confirmation | A laptop and its charger | Tablets and phones make the exercises hard. [CONFIRM] | approved |
| [BRING ITEM 2] | 02 Workshop details, 07 Confirmation | A Claude account. The newsletter topic works on a free account. | Matches Home FAQ answer 1, which is still [CONFIRM]. | approved |
| [BRING ITEM 3] | 02 Workshop details, 07 Confirmation | Nothing from your church. We bring invented sample files. | Matches "Safe by design". | approved |
| [BOARD LEDE] | 03 For your board | A one-page summary for your pastor or board. | The page must still print on one page; the print check reports the fill. | approved |
| [PRINT BUTTON] | 03 For your board | Print this page | Replaced by "Download PDF" if you set BOARD_PDF_URL. | approved |
| [JARRET BIO] | 04 About | Jarret Roloff runs Roloff AI in Hendricks County, Indiana. [ONE OR TWO SENTENCES ON YOUR BACKGROUND] | Your story: only you can write it. | approved |
| [PHOTO] | 04 About | [PHOTO] | Keep as is. A real photo needs a change to CLAUDE.md rule 3 (no images). | approved |
| [WHY LOCAL] | 04 About | Church office work is local: your calendar, your rooms, your people. A half-day in the room means you can ask as you go and leave with drafts you can use the next week. | | approved |
| [REVIEW LEDE] | 06 Review order | Check your order. You can edit anything before you pay. | Register says "You will review everything before you pay." | approved |
| [PAY BUTTON] | 06 Review order | Continue to payment | Mirrors "Continue to review" on Register. | approved |
| [OFFLINE PAY BUTTON] | 06 Review order | Pay by check or cash | Only shown if OFFLINE_PAYMENT is turned on. | approved |
| [SEND ERROR] | 06 Review order, 08 Questions | We could not send this. Check your connection and try again. | Used on both pages. | approved |
| [PENDING HEADING] | 07 Confirmation | We have your registration. | Shown when payment is not confirmed, including cash or check. | approved |
| [PENDING MESSAGE] | 07 Confirmation | Your seats are confirmed when payment arrives. Use your reference code with any payment. | Depends on whether an unpaid registration holds a seat (qa/questions.md). | approved |
| [FAILED HEADING] | 07 Confirmation | Payment did not go through. | | approved |
| [FAILED MESSAGE] | 07 Confirmation | Your registration is saved. Try the payment again, or email us for help. | | approved |
| [RETRY BUTTON] | 07 Confirmation | Try payment again | | approved |
| [REFERENCE LABEL] | 07 Confirmation | Your reference code: | Six letters and numbers, no lookalikes. | approved |
| [NEXT STEPS] | 07 Confirmation | We will email each attendee before the workshop with the room details and anything to prepare. [CONFIRM] | Say who sends the confirmation: the payment provider, the form service or you. | approved |
| [PREP ITEM 1] | 07 Confirmation | Check that you can sign in to Claude on the laptop you will bring. | | approved |
| [PREP ITEM 2] | 07 Confirmation | Think of one office task that takes too long. | Echoes the Register question. | approved |
| [PREP ITEM 3] | 07 Confirmation | If your board must approve it, send them the one-page summary. | | approved |
| [FORWARD LINK] | 07 Confirmation | Email the one-page summary to your board | | approved |
| [FORWARD SUBJECT] | 07 Confirmation | Workshop summary for board review | In the email, not on the page. | approved |
| [FORWARD BODY] | 07 Confirmation | Here is a one-page summary of the workshop our office plans to attend. | The board page address is added after it. | approved |
| [QUESTIONS LEDE] | 08 Questions | Ask a question, or ask to hear about future dates. | | approved |
| [ASK LABEL] | 08 Questions | Ask a question | | approved |
| [QUESTION FIELD LABEL] | 08 Questions | Your question | | approved |
| [SEND BUTTON] | 08 Questions | Send | | approved |
| [SENT MESSAGE] | 08 Questions | Thank you. We got your message and will reply by email. | | approved |
| [COMMON QUESTIONS LABEL] | 08 Questions | Common questions | | approved |

## Page descriptions (drafts, not on the site)

Open question 10. Each is the short text search engines and link previews show for a page. None is emitted until its row is approved and copied into `DESCRIPTIONS` in src/copy.ts. Review order and Confirmation get none; they are never indexed.

| Description for | Page | Draft | Notes | Status |
| --- | --- | --- | --- | --- |
| home | 01 Home | A hands-on, half-day workshop for church and ministry office staff on using Claude for real office work, with invented sample data only. | About 140 characters; search results show about 155. | draft |
| workshop | 02 Workshop details | When and where, the half-day agenda, the seven topics and what to bring for the Claude workshop for church office staff. | | draft |
| board | 03 For your board | A one-page summary of the workshop for a pastor or board: what it is, who it is for, cost, scope and how information is handled. | | draft |
| about | 04 About | Who runs the workshop, why it is local, and how the course materials are made. | | draft |
| register | 05 Register | Reserve seats for the half-day Claude workshop for church office staff. You review everything before you pay. | Second sentence echoes the Register lede. | draft |
| questions | 08 Questions | Ask a question about the workshop, or ask to hear about future dates. | | draft |

## Spec wording used as copy (please confirm)

These come straight from HANDOFF-SPEC.md sections 1 and 7, where the spec names a thing. Jarret confirmed them on 2026-11-12. The copy check lists each one in qa/results/provenance.json. Change any here and in src/copy.ts.

| Wording | Where | Status |
| --- | --- | --- |
| Workshop details | 02 heading and page title | confirmed |
| When and where | 02, 03, 07 section label | confirmed |
| Accessibility | 02 list label | confirmed |
| Half-day agenda | 02 section label | confirmed |
| What to bring | 02, 07 section label | confirmed |
| What it is | 03 section label | confirmed |
| Cost | 03 section label | confirmed |
| How information is handled | 03 section label | confirmed |
| Who to contact | 03, 07 section label | confirmed |
| Why a local workshop | 04 section label | confirmed |
| How the materials are made | 04 section label | confirmed |
| What the workshop will not do | 04 section label | confirmed |
| Review order | 06 heading and page title | confirmed |
| Total | 06 summary row | confirmed |
| Edit | 06 links back to Register | confirmed |
| You are in. | 07 heading when paid | confirmed |
| Confirmation | 07 page title | confirmed |
| What happens next | 07 section label | confirmed |
| Prep checklist | 07 section label | confirmed |
| Add to calendar | 07, shown once the date is set | confirmed |
| Download PDF | 03, shown once BOARD_PDF_URL is set | confirmed |

"Step 3 of 3" on Review order follows the designed "Step 2 of 3".
