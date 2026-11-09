# Handoff spec: Claude for Church Offices, Direction C (Plain print)

Written 2026-11-09. Source: the Design canvas "Claude for Church Offices: three design directions", Direction C boards, copied into design/. Working title "Claude for Church Offices" may change: keep it in one config constant.

## 1. What is designed and what is not

| ID | Screen | Suggested route | Phase | Status |
| --- | --- | --- | --- | --- |
| 01 | Home | / | 1 | designed, desktop 1440 and mobile 390 |
| 02 | Workshop details | /workshop/ | 1 | not designed, spec in section 7 |
| 03 | For your board (printable one page) | /board/ | 1 | not designed, spec in section 7 |
| 04 | About | /about/ | 1 | not designed, spec in section 7 |
| 05 | Register | /register/ | 1 | designed, desktop and mobile |
| 06 | Review order | /register/review/ | 1 | not designed, spec in section 7 |
| 07 | Confirmation | /confirmation/ | 1 | not designed, spec in section 7 |
| 08 | Questions and interest list | /questions/ | 1 | not designed, spec in section 7 |
| 11 | Topic page | /topics/newsletter/ | 2 | designed, but members only. Do NOT build it in this repo yet |
| 09, 10, 12 to 16 | member area, facilitator tools | | 2 and 3 | out of scope |

Stage 1 of the build is 01 and 05. Stage 2 is 02, 03, 04, 06, 07, 08, derived from section 7 with the same system.

## 2. Direction C rules

- Type-led and nearly colorless. Near-black on white, hairline rules, a 6px ink rule at the very top of every page and a 6px ink rule above the footer.
- One accent, vermilion, ONLY for interactive elements: buttons, links, checkbox and radio controls, the next-topic link. Never for headings, decoration or status.
- Libre Franklin only, weights 300, 400, 500, 700, 800. Headings 800 with negative tracking. Large light (300) numerals for topics and steps. Section labels: 14px, 700, uppercase, 0.1em tracking.
- Radius 0 everywhere. No images, gradients, shadows or emoji.
- Lines: 1px ink for section rules, 1px hair for row separators, 1.5px ink for boxes and inputs, 3px err for an input in error.
- Icons: inline SVG from the Lucide set, stroke 2.5: arrow-right, check, circle-alert, shield-check, plus, minus, x, menu, download. Copy the SVG paths from design/.

## 3. Tokens and contrast

Use tokens.css. Verified contrast ratios (computed 2026-11-09):

| Pair | Ratio |
| --- | --- |
| ink on white | 18.88 |
| ink2 on white | 8.86 |
| accent on white, and white on accent | 5.18 |
| err on white | 6.57 |
| ink2 on tint | 8.05 |

Any new pair must be computed and added to qa/stage1-report.md.

## 4. Layout and breakpoints

- Desktop (design at 1440): container max-width 1200px, 40px side padding, 12 columns, 24px gap. Section pattern: full-width 1px ink rule, label in columns 1 to 3, content in columns 4 to 12. Home hero: eyebrow cols 1 to 12, H1 cols 1 to 11, lede cols 1 to 6, facts cols 8 to 12. Header is 80px high: mark cols 1 to 4, nav cols 5 to 9 right-aligned, Reserve seats button cols 10 to 12 (Home only).
- Mobile (design at 390): 20px side padding, one column, sections 32px top and 48px bottom, label above content. Nav hides behind a 44px square menu button (1.5px ink border). Buttons are full width, 56px high, in stacks.
- Switch to the mobile layout below 900px. Above 900px keep the desktop layout. Do not invent a tablet design.
- Fluid H1: Home from 40px at 390 to 76px at 1440; Register and Topic from 40px to 64px. Use clamp(). Line-height 1.0.

## 5. Type scale in the designs

| Element | Desktop | Mobile |
| --- | --- | --- |
| Home H1 | 76/1.0, 800, -0.035em | 40/1.0 |
| Register H1 | 64/1.0 | 40/1.0 |
| Topic H1 | 64/1.0 | 36/1.0 |
| Body | 18/1.55 | 17/1.55 |
| Lede | 22/1.45 (Home), 20 ink2 (Register) | 19 (Home), 18 (Register) |
| Statement (Who it is for) | 26/1.35, 500 | 22/1.35 |
| Topic numeral on Home | 88, 300 | 56, 300 |
| Topic card title | 28/1.2, 800 | 22/1.2 |
| Seat title and price | 24 and 30, 800 | 24 and 30 |
| FAQ question | 21/1.3, 700 | 20/1.3 |
| Section label | 14/1.4, 700, uppercase, 0.1em | same |
| Form label | 16, 700 | 16 |
| Input text | 18 | 17 |
| Footer | 16 | 16 |

## 6. Components

Names match data-component attributes in design/.

| Component | What it is | States |
| --- | --- | --- |
| PageHeader | uppercase 800 wordmark left, nav right | desktop and mobile (menu button) |
| Button | accent fill, white 700 17px, radius 0, min-height 52 (56 on mobile) | default, hover (--accent-hover), disabled (--disabled-bg, ink2 text, not-allowed), alt (white fill, ink text, 1.5px ink border) |
| FormField | label 700 16px above; input 52px high, 1.5px ink, radius 0; textarea 120px | default, error (3px err border, message with circle-alert icon, bold err 16px, aria-invalid and aria-describedby) |
| SeatPicker | radiogroup of rows, 24px radio with accent-color | unselected, selected (2px ink inset outline, tint fill) |
| SeatOption | static row on Home: title, description, price | desktop: price right; mobile: price below |
| AttendeeRow | "Attendee N" 20px 800, remove button (44px square, 1.5px ink, aria-label), fields grid: name, email, role 190px | filled, error, empty |
| ProgressSteps | three cells in a 1.5px ink border | done (check in a square), current (ink fill, white text, aria-current), todo |
| SummaryPanel | definition list: uppercase 14px label, value, hairlines | one state |
| ModuleCard | large light numeral, title, description | one state |
| StepCard | "STEP N" label, title 22, description 17 | one state |
| ChecklistItem | 10px ink square bullet, text 20px | one state |
| Notice | 1.5px ink box with uppercase label, or the hero seat-note strip | one state |
| FaqItem | details and summary, plus or minus icon, first open | open, closed |
| Footer | 6px ink top rule, honesty line, contact line | one state |
| Phase 2 only: StepList, ProgressBar, CalloutPanel, DownloadRow | see design/topic-c-* | not part of this build |

## 7. Screens

### 01 Home (designed)
Order: header; hero (eyebrow, H1, lede, Reserve seats button, "See what we cover" link to #topics, facts When/Where/Seats, seat notice box); Who it is for; What you will do (three ModuleCards, then "Seven topics in all. Topics are subject to change."); How the half-day runs (three StepCards); What you leave with (three items); Choose your seats (two SeatOptions, Reserve seats button); Our promises (Safe by design, Our scope); Questions (six FaqItems, first open); footer.
Behavior: both Reserve seats buttons go to /register/. Nav links only to pages that exist. FAQ items are details elements.
States to implement without artboards: few seats left (the seat notice already shows it), sold out (Reserve seats button becomes "Join the waitlist" and goes to /questions/).

### 05 Register (designed)
Order: header (no button); title block (label "Step 2 of 3", H1 "Reserve your seats", lede, ProgressSteps); Your seats (SeatPicker); Your church or ministry (Organization name, Contact person); Who is coming (status "2 of 3 seats filled", AttendeeRows, disabled "Add another attendee", helper text); One question for us (optional textarea, consent checkbox); Your order (SummaryPanel, Back and Continue to review); footer.
Field text: placeholders "Full name" and "name@church.org"; select placeholder "Choose a role"; roles Administrator, Communications, Pastor, Finance, Other; textarea placeholder "For example: building the weekly newsletter"; consent unchecked by default.
The design shows one composite state. Sample values (Sample Community Church, Sample Person A, person.a@example.org, Sample Person B) and the chosen roles are demo data. Ship the fields empty.
The only designed error: an attendee with a name but no email shows "Add an email so we can send the confirmation."
Derived behavior (flag as derived in qa/questions.md): seat choice sets the row count (1 or 3). Add another attendee is disabled when rows equal seats. Remove deletes a row, minimum one. Validate on Continue: organization name and contact person required; at least one filled attendee row; any row with a value needs name, valid email and role; empty rows are allowed (unfilled seats). Derived messages: "Add a name.", "Enter a valid email.", "Choose a role.", "Add your organization name.", "Add a contact person.", "Choose how many seats." Move focus to the first invalid field.
Back goes to Home. Continue goes to Review order.

### 02 Workshop details (not designed)
Date, time, venue, accessibility information (placeholders). Half-day agenda as timed rows. Topics in order, each with a one-line outcome. What to bring. Data safety box. Use the section pattern, ModuleCard and Notice.

### 03 For your board (not designed)
A one-page summary a pastor or board can approve in two minutes: what it is, who it is for, when and where, cost, what staff will be able to do, how information is handled, what is out of scope, who to contact. Must print cleanly on one US Letter page: write a print stylesheet, black on white, no accent fills, hide header nav and buttons. Include a Download PDF link (config value, or a print button if no PDF exists).

### 04 About (not designed)
Jarret's story [JARRET BIO], why a local workshop, how the materials are made (the honesty line), what the workshop will not do. A labeled [PHOTO] block, flat grey, no image.

### 06 Review order (not designed)
Seats, attendees, total [TOTAL], date and venue, [REFUND POLICY]. Edit links back to Register. A button to a secure hosted payment page (external). States: editing, total updated.

### 07 Confirmation (not designed)
"You are in." What happens next, add to calendar, a prep checklist, what to bring, contact, and a link to forward screen 03 to a board. States: payment pending, payment failed with retry.

### 08 Questions and interest list (not designed)
Short form: name, church, email, question, a checkbox to hear about future dates. Plain answers to the three most common questions. States: success, error.

## 8. Accessibility

Contrast per section 3. Visible focus on every interactive element (2px ink outline, 2px offset). Tap targets 44px or more. Every input has a label. Errors are linked with aria-describedby and aria-invalid. Real buttons and links only. details and summary for FAQ. No horizontal scroll at 320, 390, 768, 1024, 1440. Works at 200% zoom. Respect prefers-reduced-motion (the design has no motion; add none).

## 9. Open decisions for Jarret

Defaults apply if Jarret does not answer.

| Decision | Default |
| --- | --- |
| Stack | static site, HTML and CSS with minimal JavaScript; Astro only if it clearly reduces duplication |
| Registration data | hosted form service; state passed between pages with sessionStorage |
| Payment | hosted payment link, one per seat option, as config values; no custom checkout |
| Fonts | Google Fonts stylesheet as designed; self-hosting is an option to approve |
| Register initial state | no seat option preselected |
| Step labels | the strip reads Seats, Attendees, Review as designed; ask if "Step 2 of 3" should change |
| Hosting and domain | decided later; keep the build host-agnostic |
| Analytics | none |

## 10. Later

The member Topic page (11) is built after the course repo finishes module 1. Its content comes from that repo's modules/01-newsletter files, not from retyping the design.
