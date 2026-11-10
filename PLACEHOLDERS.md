# Placeholders

Keep each one exactly as written until Jarret supplies the value. To fill one, change its line in `src/config.ts`; every page that shows it updates on the next build. `[CONFIRM]` items are inline copy, so they are edited where they appear.

| Placeholder | Where it appears (design) | Needed from Jarret | Set in | Rendered by |
| --- | --- | --- | --- | --- |
| [SEATS LEFT] | Home hero facts and seat notice | a number, and how it is kept current (manual is fine) | src/config.ts:17 | src/pages/index.astro:32, 34 |
| [DATE] | Home hero, Register summary | workshop date | src/config.ts:14 | src/pages/index.astro:30, 34; src/components/SummaryPanel.astro:13 |
| [START TIME] | Home hero, Register summary | start time | src/config.ts:15 | src/pages/index.astro:30; src/components/SummaryPanel.astro:13 |
| [VENUE] | Home hero, Register summary | venue name and address | src/config.ts:16 | src/pages/index.astro:31, 34; src/components/SummaryPanel.astro:14 |
| [SEAT PRICE] | Home seat options, Register seat picker | price for one seat | src/config.ts:18 (used at :30) | src/pages/index.astro:75; src/components/SeatPicker.astro:18; summary copies it in src/scripts/register.js:87 |
| [3-SEAT PRICE] | Home seat options, Register seat picker and summary | price for three seats | src/config.ts:19 (used at :36) | src/pages/index.astro:75; src/components/SeatPicker.astro:18; summary copies it in src/scripts/register.js:87 |
| [REFUND POLICY] | Register summary | policy text | src/config.ts:20 | src/components/SummaryPanel.astro:15 |
| [CONTACT EMAIL] | footer on every page | contact address | src/config.ts:21 | src/components/Footer.astro:8 |
| [CONFIRM] (Home) | "What you leave with" third item; FAQ answer 1 | confirm the draft AI use policy is included; confirm what each topic needs | inline copy | src/pages/index.astro:67, 92 |
| [CONFIRM maximum per church] | Home FAQ answer 2 | maximum seats per church | inline copy | src/pages/index.astro:93 |

Not a placeholder: on the member Topic page, [CONFIRM] is a literal tag the lesson teaches people to use ("mark it [CONFIRM]"). Never fill it in.

Also needed for screens that are not designed yet: [TOTAL] on Review order, [JARRET BIO] and a photo on About, [PAYMENT LINK URL] and [FORM ENDPOINT] as config values.

## Config values (not shown on any Stage 1 page)

| Value | Set in | Used from |
| --- | --- | --- |
| [PAYMENT LINK URL], one per seat option | src/config.ts:48 (one seat), :49 (three seats) | Review order, Stage 2 |
| [FORM ENDPOINT] | src/config.ts:51 | Review order, Stage 2 |
| Working title "Claude for Church Offices" | src/config.ts:10 | src/components/PageHeader.astro:26; page titles in src/layouts/Base.astro:20 |
| Launch switches: `NOINDEX` (on), `SOLD_OUT` (off) | src/config.ts | Base.astro, PageHeader.astro, index.astro |
