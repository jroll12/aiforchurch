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
| [CONTACT EMAIL] | footer on every page | contact address | src/config.ts:27 | src/copy.ts:38 (contact line), shown by src/components/Footer.astro:8, src/pages/board/index.astro:81, src/pages/confirmation/index.astro:69 |
| [CONFIRM] (Home) | "What you leave with" third item; FAQ answer 1 | confirm the draft AI use policy is included; confirm what each topic needs | inline copy: src/pages/index.astro:67; src/copy.ts:29 | Home; FAQ answer 1 also on src/pages/questions/index.astro:54 |
| [CONFIRM maximum per church] | Home FAQ answer 2 | maximum seats per church | inline copy: src/copy.ts:30 | Home; also on src/pages/questions/index.astro:54 |

Not a placeholder: on the member Topic page, [CONFIRM] is a literal tag the lesson teaches people to use ("mark it [CONFIRM]"). Never fill it in.

Named in HANDOFF-SPEC.md section 7 for the undesigned screens: [TOTAL] on Review order is resolved as the chosen seat option's price (qa/questions.md D24), so it shows [SEAT PRICE] or [3-SEAT PRICE] until those are set; [JARRET BIO] and [PHOTO] on About are in the Stage 2 table below; [PAYMENT LINK URL] and [FORM ENDPOINT] are config values below.

## Stage 2 placeholders (derived pages, no artboard)

Jarret approved every suggested line on 2026-11-12 (qa/stage2-copy-draft.md), and the text is in `src/copy.ts`. What remains on the derived pages is below. Topics 4 to 7 and the agenda times were suggestions, so they carry [CONFIRM] until checked against the course.

| Placeholder | Page | What to check or supply | Set in |
| --- | --- | --- | --- |
| [CONFIRM] x3 in the accessibility line | 02 Workshop details | step-free entrance, accessible restroom, parking at the venue | src/copy.ts:49 |
| [CONFIRM] x4 on the agenda times | 02 Workshop details | the real times (drafts assume 9:00 to 12:30) | src/copy.ts:52 to 55 |
| [CONFIRM] x4 on topics 4 to 7 | 02 Workshop details | that the titles and outcomes match the course | src/copy.ts:59 to 62 |
| [ONE OR TWO SENTENCES ON YOUR BACKGROUND] | 04 About | your background, in one or two sentences | src/copy.ts:93 |
| [PHOTO] | 04 About | stays: a real photo needs CLAUDE.md rule 3 (no images) changed | src/copy.ts:94 |
| [CONFIRM] in What happens next | 07 Confirmation | who sends the pre-workshop email, and when | src/copy.ts:124 |

To clear a [CONFIRM]:
1. Delete the tag in src/copy.ts.
2. Delete it from the same row in qa/stage2-copy-draft.md, so the copy check still matches.
3. Correct the text there too if it was wrong.

`npm run check:launch` lists every one still on a page.

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
