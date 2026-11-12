# Placeholders

Keep each one exactly as written until Jarret supplies the value. To fill one, change its line in `src/config.ts` or `src/copy.ts`; every page that shows it updates on the next build. `[CONFIRM]` items are inline copy, so they are edited where they are set.

| Placeholder | Where it appears (design) | Needed from Jarret | Set in | Rendered by |
| --- | --- | --- | --- | --- |
| [SEATS LEFT] | Home hero facts and seat notice | a number, and how it is kept current (manual is fine) | src/config.ts:23 | src/pages/index.astro:34, 36; src/pages/workshop/index.astro:37 |
| [DATE] | Home hero, Register summary | workshop date | src/config.ts:20 | src/pages/index.astro:32, 36; src/components/SummaryPanel.astro:22 (Register, Review); workshop, board and confirmation pages (When row) |
| [START TIME] | Home hero, Register summary | start time | src/config.ts:21 | src/pages/index.astro:32; src/components/SummaryPanel.astro:22; workshop, board and confirmation pages |
| [VENUE] | Home hero, Register summary | venue name and address | src/config.ts:22 | src/pages/index.astro:33, 36; src/components/SummaryPanel.astro:23; workshop, board and confirmation pages |
| [SEAT PRICE] | Home seat options, Register seat picker | price for one seat | src/config.ts:24 (used at :36) | src/pages/index.astro:75; src/components/SeatPicker.astro:19; src/pages/workshop/index.astro:71; src/pages/board/index.astro:56; Register and Review summaries copy it from the option |
| [3-SEAT PRICE] | Home seat options, Register seat picker and summary | price for three seats | src/config.ts:25 (used at :42) | same as [SEAT PRICE] |
| [REFUND POLICY] | Register summary | policy text | src/config.ts:26 | src/components/SummaryPanel.astro:24 (Register, Review) |
| [CONTACT EMAIL] | footer on every page | contact address | src/config.ts:27 | src/copy.ts:37 (contact line), shown by src/components/Footer.astro:8, src/pages/board/index.astro:81, src/pages/confirmation/index.astro:69 |
| [CONFIRM] (Home) | "What you leave with" third item; FAQ answer 1 | confirm the draft AI use policy is included; confirm what each topic needs | inline copy: src/pages/index.astro:67; src/copy.ts:28 | Home; FAQ answer 1 also on src/pages/questions/index.astro:54 |
| [CONFIRM maximum per church] | Home FAQ answer 2 | maximum seats per church | inline copy: src/copy.ts:29 | Home; also on src/pages/questions/index.astro:54 |

Not a placeholder: on the member Topic page, [CONFIRM] is a literal tag the lesson teaches people to use ("mark it [CONFIRM]"). Never fill it in.

Named in HANDOFF-SPEC.md section 7 for the undesigned screens: [TOTAL] on Review order is resolved as the chosen seat option's price (qa/questions.md D24), so it shows [SEAT PRICE] or [3-SEAT PRICE] until those are set; [JARRET BIO] and [PHOTO] on About are in the Stage 2 table below; [PAYMENT LINK URL] and [FORM ENDPOINT] are config values below.

## Stage 2 placeholders (derived pages, no artboard)

Missing copy on the six derived pages. Each is set once in `src/copy.ts`. Suggested text for every row is in qa/stage2-copy-draft.md; a row's text replaces its placeholder only after Jarret marks it approved there.

| Placeholder | Page | What it is | Set in |
| --- | --- | --- | --- |
| [ACCESSIBILITY] | 02 Workshop details | accessibility information for the venue | src/copy.ts:48 |
| [AGENDA TIME 1], [AGENDA ITEM 1], [AGENDA TIME 2], [AGENDA ITEM 2], [AGENDA TIME 3], [AGENDA ITEM 3], [AGENDA TIME 4], [AGENDA ITEM 4] | 02 Workshop details | the half-day agenda as timed rows (the number of rows can change) | src/copy.ts:51 to 54 |
| [TOPIC 4 TITLE], [TOPIC 4 OUTCOME], [TOPIC 5 TITLE], [TOPIC 5 OUTCOME], [TOPIC 6 TITLE], [TOPIC 6 OUTCOME], [TOPIC 7 TITLE], [TOPIC 7 OUTCOME] | 02 Workshop details | topics 4 to 7 and their one-line outcomes (1 to 3 are design copy) | src/copy.ts:58 to 61 |
| [BRING ITEM 1], [BRING ITEM 2], [BRING ITEM 3] | 02 Workshop details, 07 Confirmation | what to bring | src/copy.ts:70 |
| [BOARD LEDE] | 03 For your board | one line under the heading | src/copy.ts:76 |
| [PRINT BUTTON] | 03 For your board | print button label (shown while there is no PDF; "Download PDF" when there is) | src/copy.ts:77 |
| [JARRET BIO] | 04 About | Jarret's story | src/copy.ts:92 |
| [PHOTO] | 04 About | label in the flat photo block; a photo would need a rule change (no images) | src/copy.ts:93 |
| [WHY LOCAL] | 04 About | why a local workshop | src/copy.ts:95 |
| [REVIEW LEDE] | 06 Review order | one line under the heading | src/copy.ts:104 |
| [PAY BUTTON] | 06 Review order | button to the hosted payment page | src/copy.ts:107 |
| [OFFLINE PAY BUTTON] | 06 Review order | cash or check button; shown only when `OFFLINE_PAYMENT` is on | src/copy.ts:108 |
| [SEND ERROR] | 06 Review order, 08 Questions | message when the form service cannot be reached | src/copy.ts:109, 149 |
| [PENDING HEADING], [PENDING MESSAGE] | 07 Confirmation | payment pending state | src/copy.ts:116, 117 |
| [FAILED HEADING], [FAILED MESSAGE], [RETRY BUTTON] | 07 Confirmation | payment failed state and its retry button | src/copy.ts:118 to 120 |
| [REFERENCE LABEL] | 07 Confirmation | words before the reference code | src/copy.ts:121 |
| [NEXT STEPS] | 07 Confirmation | what happens next | src/copy.ts:123 |
| [PREP ITEM 1], [PREP ITEM 2], [PREP ITEM 3] | 07 Confirmation | prep checklist | src/copy.ts:127 |
| [FORWARD LINK] | 07 Confirmation | link text for forwarding the board page | src/copy.ts:129 |
| [FORWARD SUBJECT], [FORWARD BODY] | 07 Confirmation | subject and opening of that email (not shown on the page) | src/copy.ts:130, 131 |
| [QUESTIONS LEDE] | 08 Questions | one line under the heading | src/copy.ts:138 |
| [ASK LABEL] | 08 Questions | section label above the form | src/copy.ts:139 |
| [QUESTION FIELD LABEL] | 08 Questions | label of the question box | src/copy.ts:145 |
| [SEND BUTTON] | 08 Questions | submit button | src/copy.ts:147 |
| [SENT MESSAGE] | 08 Questions | success message | src/copy.ts:148 |
| [COMMON QUESTIONS LABEL] | 08 Questions | section label above the three answers | src/copy.ts:150 |

## Config values (not shown on any page)

| Value | Set in | Used from |
| --- | --- | --- |
| [PAYMENT LINK URL], one per seat option | src/config.ts:65 (one seat and three seats) | Review order pay button, Confirmation retry |
| `PAYMENT_REF_PARAM` (null; `client_reference_id` for Stripe) | src/config.ts:66 | appends the reference code to the payment link |
| [FORM ENDPOINT], registration and questions | src/config.ts:69 | Review order, Questions |
| `OFFLINE_PAYMENT` (off) | src/config.ts:79 | Review order cash or check button |
| `EVENT` start and end (null) | src/config.ts:86 | Confirmation Add to calendar, /workshop.ics |
| `BOARD_PDF_URL` (null) | src/config.ts:89 | For your board: Download PDF instead of the print button |
| Working title "Claude for Church Offices" | src/config.ts:16 | src/components/PageHeader.astro; page titles in src/layouts/Base.astro; /workshop.ics |
| Launch switches: `NOINDEX` (on), `SOLD_OUT` (off) | src/config.ts | Base.astro, PageHeader.astro, Home, Workshop, For your board |

While a payment link or form endpoint is still a placeholder, the button that uses it renders disabled.
