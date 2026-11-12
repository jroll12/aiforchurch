# Stage 2 copy draft, for Jarret's approval

The six Stage 2 pages have no artboards, so their missing copy ships as placeholders (CLAUDE.md hard rule 1). This file suggests text for each one. **None of it is on the site.**

How to approve:
1. Edit the Draft cell if you want different words.
2. Change Status from `draft` to `approved`.
3. Ask for the approved rows to be copied into src/copy.ts.

The copy check (qa/checks/provenance.mjs) accepts approved rows and still rejects anything else.

- **Drafted with AI, for you to check.** These are drafts in the same plain voice as the design: short sentences, no exclamation marks, no em dashes.
- **Facts are your call.** Where a draft states a fact only you know, it carries [CONFIRM] or a note. Times, topics and your story are left for you, or offered as suggestions.

## Placeholders

| Placeholder | Page | Draft | Notes | Status |
| --- | --- | --- | --- | --- |
| [ACCESSIBILITY] | 02 Workshop details | Step-free entrance [CONFIRM]. Accessible restroom [CONFIRM]. Parking [CONFIRM]. Tell us about any other need when you register. | Depends on the venue. | draft |
| [AGENDA TIME 1] | 02 Workshop details | 9:00 | Times assume a 9:00 to 12:30 half-day. Replace with the real times. | draft |
| [AGENDA ITEM 1] | 02 Workshop details | Arrive, sign in, set up your laptop | | draft |
| [AGENDA TIME 2] | 02 Workshop details | 9:15 | | draft |
| [AGENDA ITEM 2] | 02 Workshop details | Topics 1 to 3: newsletter, AI use policy, prayer chain and care messages | Each topic runs the three steps on Home: learn the idea, try it, catch the mistake. | draft |
| [AGENDA TIME 3] | 02 Workshop details | 10:45 | | draft |
| [AGENDA ITEM 3] | 02 Workshop details | Break | | draft |
| [AGENDA TIME 4] | 02 Workshop details | 11:00 | A fifth row (12:15, Questions and wrap-up) can be added in src/copy.ts. | draft |
| [AGENDA ITEM 4] | 02 Workshop details | Topics 4 to 7, then questions | | draft |
| [TOPIC 4 TITLE] | 02 Workshop details | Event announcements from a ministry calendar | Suggestion only. Topics 4 to 7 must match the course repo. | draft |
| [TOPIC 4 OUTCOME] | 02 Workshop details | Turn calendar entries into announcements, with every date and room checked. | Suggestion only. | draft |
| [TOPIC 5 TITLE] | 02 Workshop details | Volunteer schedules and reminder emails | Suggestion only. | draft |
| [TOPIC 5 OUTCOME] | 02 Workshop details | Draft a month of reminders from a sign-up sheet. | Suggestion only. | draft |
| [TOPIC 6 TITLE] | 02 Workshop details | Meeting notes into minutes and action items | Suggestion only. | draft |
| [TOPIC 6 OUTCOME] | 02 Workshop details | Turn rough notes into minutes your board can approve. | Suggestion only. | draft |
| [TOPIC 7 TITLE] | 02 Workshop details | Bulletin and slide text from one source | Suggestion only. | draft |
| [TOPIC 7 OUTCOME] | 02 Workshop details | Write the bulletin once and reuse it for slides and the website. | Suggestion only. | draft |
| [BRING ITEM 1] | 02 Workshop details, 07 Confirmation | A laptop and its charger | Tablets and phones make the exercises hard. [CONFIRM] | draft |
| [BRING ITEM 2] | 02 Workshop details, 07 Confirmation | A Claude account. The newsletter topic works on a free account. | Matches Home FAQ answer 1, which is still [CONFIRM]. | draft |
| [BRING ITEM 3] | 02 Workshop details, 07 Confirmation | Nothing from your church. We bring invented sample files. | Matches "Safe by design". | draft |
| [BOARD LEDE] | 03 For your board | A one-page summary for your pastor or board. | The page must still print on one page; the print check reports the fill. | draft |
| [PRINT BUTTON] | 03 For your board | Print this page | Replaced by "Download PDF" if you set BOARD_PDF_URL. | draft |
| [JARRET BIO] | 04 About | Jarret Roloff runs Roloff AI in Hendricks County, Indiana. [ONE OR TWO SENTENCES ON YOUR BACKGROUND] | Your story: only you can write it. | draft |
| [PHOTO] | 04 About | [PHOTO] | Keep as is. A real photo needs a change to CLAUDE.md rule 3 (no images). | draft |
| [WHY LOCAL] | 04 About | Church office work is local: your calendar, your rooms, your people. A half-day in the room means you can ask as you go and leave with drafts you can use the next week. | | draft |
| [REVIEW LEDE] | 06 Review order | Check your order. You can edit anything before you pay. | Register says "You will review everything before you pay." | draft |
| [PAY BUTTON] | 06 Review order | Continue to payment | Mirrors "Continue to review" on Register. | draft |
| [OFFLINE PAY BUTTON] | 06 Review order | Pay by check or cash | Only shown if OFFLINE_PAYMENT is turned on. | draft |
| [SEND ERROR] | 06 Review order, 08 Questions | We could not send this. Check your connection and try again. | Used on both pages. | draft |
| [PENDING HEADING] | 07 Confirmation | We have your registration. | Shown when payment is not confirmed, including cash or check. | draft |
| [PENDING MESSAGE] | 07 Confirmation | Your seats are confirmed when payment arrives. Use your reference code with any payment. | Depends on whether an unpaid registration holds a seat (qa/questions.md). | draft |
| [FAILED HEADING] | 07 Confirmation | Payment did not go through. | | draft |
| [FAILED MESSAGE] | 07 Confirmation | Your registration is saved. Try the payment again, or email us for help. | | draft |
| [RETRY BUTTON] | 07 Confirmation | Try payment again | | draft |
| [REFERENCE LABEL] | 07 Confirmation | Your reference code: | Six letters and numbers, no lookalikes. | draft |
| [NEXT STEPS] | 07 Confirmation | We will email each attendee before the workshop with the room details and anything to prepare. [CONFIRM] | Say who sends the confirmation: the payment provider, the form service or you. | draft |
| [PREP ITEM 1] | 07 Confirmation | Check that you can sign in to Claude on the laptop you will bring. | | draft |
| [PREP ITEM 2] | 07 Confirmation | Think of one office task that takes too long. | Echoes the Register question. | draft |
| [PREP ITEM 3] | 07 Confirmation | If your board must approve it, send them the one-page summary. | | draft |
| [FORWARD LINK] | 07 Confirmation | Email the one-page summary to your board | | draft |
| [FORWARD SUBJECT] | 07 Confirmation | Workshop summary for board review | In the email, not on the page. | draft |
| [FORWARD BODY] | 07 Confirmation | Here is a one-page summary of the workshop our office plans to attend. | The board page address is added after it. | draft |
| [QUESTIONS LEDE] | 08 Questions | Ask a question, or ask to hear about future dates. | | draft |
| [ASK LABEL] | 08 Questions | Ask a question | | draft |
| [QUESTION FIELD LABEL] | 08 Questions | Your question | | draft |
| [SEND BUTTON] | 08 Questions | Send | | draft |
| [SENT MESSAGE] | 08 Questions | Thank you. We got your message and will reply by email. | | draft |
| [COMMON QUESTIONS LABEL] | 08 Questions | Common questions | | draft |

## Spec wording used as copy (please confirm)

These come straight from HANDOFF-SPEC.md sections 1 and 7, where the spec names a thing. They are on the pages now. The copy check lists each one in qa/results/provenance.json. Change any here and in src/copy.ts.

| Wording | Where | Status |
| --- | --- | --- |
| Workshop details | 02 heading and page title | in use |
| When and where | 02, 03, 07 section label | in use |
| Accessibility | 02 list label | in use |
| Half-day agenda | 02 section label | in use |
| What to bring | 02, 07 section label | in use |
| What it is | 03 section label | in use |
| Cost | 03 section label | in use |
| How information is handled | 03 section label | in use |
| Who to contact | 03, 07 section label | in use |
| Why a local workshop | 04 section label | in use |
| How the materials are made | 04 section label | in use |
| What the workshop will not do | 04 section label | in use |
| Review order | 06 heading and page title | in use |
| Total | 06 summary row | in use |
| Edit | 06 links back to Register | in use |
| You are in. | 07 heading when paid | in use |
| Confirmation | 07 page title | in use |
| What happens next | 07 section label | in use |
| Prep checklist | 07 section label | in use |
| Add to calendar | 07, shown once the date is set | in use |
| Download PDF | 03, shown once BOARD_PDF_URL is set | in use |

"Step 3 of 3" on Review order follows the designed "Step 2 of 3".
