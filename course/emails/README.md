# Attendee emails: Claude for Church Offices

Five plain-text email templates, one per file. Each file starts with a note saying when it is sent and who sends it, then the subject and the body. Every one is under 180 words, counting the subject and the footer. All of them are drafts until Jarret approves them.

## The emails

| # | File | Subject | When | Sent by [CONFIRM] |
| --- | --- | --- | --- | --- |
| 1 | 01-registration-received.md | We have your registration. | Right after Review sends the registration | The form service’s automatic reply, or Jarret by hand |
| 2 | 02-payment-confirmed.md | You are in. | When the payment arrives | Jarret by hand, after matching the payment by reference code |
| 3 | 03-one-week-before.md | One week to go | Seven days before [CONFIRM] | Jarret by hand |
| 4 | 04-day-before.md | See you tomorrow at [START TIME] | The day before [CONFIRM] | Jarret by hand |
| 5 | 05-after-the-workshop.md | Thank you, and where to find your files | The day after [CONFIRM] | Jarret by hand |

- **Who gets them:** Register has no email field for the contact person (qa/questions.md, question 6), so every email goes to the attendees’ addresses.
- **Site strings reused exactly:** “You are in.”, the honesty line, the safety line, the contact line, What to bring, the prep checklist, and the pending, failed and What happens next lines from Confirmation (src/copy.ts). Their [CONFIRM] tags stay until the site’s copy is confirmed.

## Placeholders

**Already on the site** (src/config.ts and PLACEHOLDERS.md):

- [DATE], [START TIME], [VENUE]: emails 2 to 4
- [REFUND POLICY]: email 2
- [CONTACT EMAIL]: every email, in the body and the contact line
- [PAYMENT LINK URL]: email 1. The site has one link per seat option, so send the one that matches [SEATS].
- [TOTAL]: email 1, the chosen option’s price (HANDOFF-SPEC.md, Review order)

**From the course** (course/README.md):

- [FILES LINK]: email 5, where the handouts and practice files are shared

**New in these emails.** Filled for each person:

- [NAME]: the attendee’s name, every email
- [REFERENCE CODE]: the 6-character code from Review, emails 1 and 2
- [ORGANIZATION NAME]: email 1
- [SEATS]: email 1, one seat or three seats

**New in these emails.** Filled once per workshop:

- [BOARD PAGE LINK]: the full address of the For your board page, emails 2 and 3
- [ROOM AND ENTRANCE]: email 3, which room and which door
- [PARKING DETAILS]: email 4

**[CONFIRM]** marks a fact to check before sending: who sends each email and when, the laptop and the free account (from What to bring), the pending payment line, that sign-in and setup start at [START TIME], parking, and whether the Topic 2 handout is enough for “A draft AI use policy for your board to review” or a ready draft is included.
