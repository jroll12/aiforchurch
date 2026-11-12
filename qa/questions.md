# Questions and derived decisions

CLAUDE.md: ask Jarret at most one question at a time. The open questions are in the order I would ask them. Everything under "Derived" is already built with the stated default, so nothing below blocks Stage 1.

## Open questions for Jarret

In the order I would ask them, one at a time. None blocks the build; every item has a built default.

1. **Facts only you can supply.** `npm run check:launch` lists them with the line to edit:
   - **workshop facts:** date, time, venue, seats left, prices, refund policy, contact email
   - **[CONFIRM] tags:** accessibility, agenda times, topics 4 to 7, what happens next, two FAQ answers
   - **About page:** your background sentences
   - **the [PHOTO] decision** (question 14)

   (The Stage 2 copy was approved on 2026-11-12.)
2. **Payments.** You named Stripe, PayPal, Venmo, Apple Pay and cash. A US Stripe account covers cards and Apple Pay, not PayPal or Venmo. PayPal's no-code Payment Links cover PayPal, Venmo, Apple Pay and cards on one page. Recommendation: one online provider plus one offline path (cash or check; church finance offices often pay by check or church card and need a receipt). Still open:
   - Which provider.
   - Whether it can carry the reference code on the payment. Stripe Payment Links take `client_reference_id`; PayPal's is unverified.
   - Whether to turn on the cash or check button (`OFFLINE_PAYMENT`).
   - Whether an unpaid registration holds a seat, and until when.
   - Where the provider sends people after paying. Set it to `/confirmation/?payment=paid`. If it has a cancel or failure address, set that to `/confirmation/?payment=failed`.
3. **Which hosted form service?** Both forms (registration, questions) post to `[FORM ENDPOINT]` in src/config.ts. Any service that accepts a URL-encoded POST and answers 2xx works (Formspree, Basin, Getform and similar). No provider script loads.
4. **Should Register open with Three seats selected?** The progress strip shows "Seats" as done with a check, but HANDOFF-SPEC.md section 9 defaults to no seat preselected, so the first thing a visitor sees contradicts itself. Preselecting Three seats removes the contradiction and every pre-choice state in D1, and matches the artboards exactly. The cost: it defaults buyers to the higher price. Built: no preselection (the section 9 default).
5. **How does an office of four or more register?** The helper text reads "Three seats, three rows. Choose more seats to add people." There is no option above three seats, so at three seats it points nowhere. FAQ answer 2 says "you can register more people." Needed: either a larger seat option, or copy that says what to do (for example, a second registration). Also needed: helper copy for the one-seat state, which has none (built: helper hidden there, D4).
6. **Should the contact person have an email or phone field?** Register asks for a contact person's name only. Confirmation emails go to attendees, so a contact who is not attending gets nothing. No field was added.
7. **Is the total ever more than the option price?** Review order shows the chosen option's price as the total (D24). If tax or card fees apply, the total needs its own value.
8. **Which three questions on 08 Questions?** Built: the first three Home FAQ items, copied exactly (D33).
9. **Should "Step 2 of 3" change?** Section 9 asks. Built as designed; Review shows "Step 3 of 3".
10. **Page titles, description and link preview.** None are designed. Built: the page heading followed by " | Claude for Church Offices" (Home shows the site name alone), and no preview image. Draft descriptions for six pages are in qa/stage2-copy-draft.md; approve them and they go in (D47).
11. **Sold out on Register.** Section 7 defines sold out for Home only. What should Register and Review show, and what does the seat notice say at zero? Built: the `SOLD_OUT` flag swaps every Reserve seats button (Home, Workshop, For your board) to "Join the waitlist", pointing at /questions/.
12. **"Add another attendee" is disabled in almost every state.** Rows start equal to seats, so it only enables after Remove. Keep it, or drop Remove and Add (empty rows are already allowed)? Built as designed.
13. **Do you want the gaps the artboard CSS declares but never shows?** The artboards reset every paragraph margin with a rule that outranks the declared spacing, so these render with no gap: under the Home lede (declared 28px desktop, 20px mobile), under the eyebrow (20/16px), under the Register lede on mobile (20px), above the seat notice (16px), above "Seven topics in all" (20px), under the status line (8px), above the helper text (10px) and under "Step 2 of 3" on mobile (12px). Built: as the artboards render. Each is a one-line CSS change if you want them.
14. **A real photo on About?** Section 7 asks for a labeled [PHOTO] block, flat, no image, and CLAUDE.md rule 3 says no images. A real photo needs that rule changed.
15. **Working title.** Kept as "Claude for Church Offices" for now (your call, 2026-11-09). It is one constant, src/config.ts:16.

Resolved in Stage 2: the nav lists all four pages and Questions goes to /questions/ (kickoff: "update the nav to include them"; was question 8). FAQ answer 6 links "For your board" to /board/ (D36).

## Derived: built with a default, no artboard

Register (src/scripts/register.js unless noted)

- **D1 Before a seat choice:** one empty attendee row. The status line, the helper, and the summary's Seats and Price rows are hidden.
- **D2 Seat choice sets the rows** to 1 or 3. Rows hidden by a switch keep their values for the visit, so 3 to 1 to 3 restores them. Only visible rows are validated and saved.
- **D3 Status line:** "{n} of {seats} seats filled", where n counts visible rows with any value. This reproduces the artboard's "2 of 3". At one seat it reads "1 of 1 seats filled".
- **D4 Helper text** shows only at three seats with three rows, the one state its copy fits.
- **D5 Remove** shifts later rows up and clears the last one, so headings, ids and labels never renumber. It keeps at least one row: on a single row the button is disabled, styled like the disabled Button (src/styles/site.css, `.rm[disabled]`). Focus then moves to "Add another attendee", which is now enabled.
- **D6 Add** reveals the next row and focuses its name field.
- **D7 Validation on Continue,** in page order, with the section 7 messages:
  - The seat picker shows "Choose how many seats." below the rows (message only; no other error styling is designed for it).
  - A filled row with no email shows the designed message "Add an email so we can send the confirmation."
  - A malformed email shows "Enter a valid email." The check is the browser's email syntax plus a dot in the domain, so "name@church" is caught.
  - If no row has any value, Attendee 1's name shows "Add a name."
- **D8 Errors clear** as soon as their field changes. Continue recomputes them all.
- **D9 Focus** moves to the first invalid field: the first seat radio when no seat is chosen.
- **D10 State** (src/scripts/shared.js holds the storage helpers): a valid Continue writes `{v, ref, seats, org, contact, attendees, question, consent, savedAt}` to sessionStorage key `cfco:registration`. `ref` is a 6-character reference code from an alphabet without 0, O, 1, I or L, made once and kept on later saves. Only filled rows are saved. Register restores this state on load. Storage errors are caught; the page still works without it.
- **D11 Continue opens Review order** (Stage 2). In Stage 1 it saved without navigating, because /register/review/ did not exist and "no dead links" won.
- **D12 Form:** `method="post" novalidate`, so Enter submits and no data ever lands in a URL. Without JavaScript the fields still render, but the seat-driven behavior and Continue need it.

Shared

- **D13 Mobile menu open state** (src/scripts/menu.js, site.css "Mobile nav panel"): the nav opens below the header bar as 48px rows with hair separators, and the menu icon becomes the x icon. Escape closes it and returns focus to the button; choosing a link closes it; it resets at 900px. The button keeps its designed label "Open menu" while open.
- **D14 Page titles** as in question 10.
- **D15 Wordmark link:** Home links to #top (as designed); Register links to Home.
- **D16 Tap targets:** the design misses 44px on the wordmark (about 19px), the desktop nav links (about 25px), "See what we cover" on desktop (about 26px) and the consent label (about 28px). CSS min-heights give each a 44px hit area with no visual change.
- **D17 Launch switches:** `NOINDEX` (on until placeholders are filled) adds a robots noindex meta tag. An empty data: favicon stops a stray favicon request.
- **D18 `role="list"`** on the two styled lists keeps list semantics in Safari. Invisible.
- **D19 The footer contact** stays plain text until [CONTACT EMAIL] is real; it may become a mailto link then.

## Derived in Stage 2: six pages with no artboard

Every page below is "derived, not designed" (qa/stage2-report.md). The copy rule is in D40.

Review order (src/pages/register/review/index.astro, src/scripts/review.js)

- **D20 Title block:** "Step 3 of 3", "Review order", lede placeholder. ProgressSteps shows Seats and Attendees done (the designed check) and Review current.
- **D21 Nothing saved:** Review goes straight back to Register. This covers a direct visit, or a registration already marked paid.
- **D22 Layout and editing:** the sections follow Register (Your seats, Your church or ministry, Who is coming, One question for us, Your order). One question for us is hidden when empty.
  - Each section ends with an Edit link to the matching Register section (`/register/#s1` to `#s4`). The link's `aria-describedby` points at the section heading, so a screen reader hears which Edit it is without new copy.
  - Register restores everything, and its Continue comes back to Review with the total updated.
- **D23 Send, then pay:** the pay button sends the registration to the form service as flat fields:
  - ref, seats, option, price, organization and contact
  - attendee_N_name, attendee_N_email and attendee_N_role
  - question, consent, payment, and an empty honeypot field

  Only then does it open the chosen option's payment link, with the reference code in `PAYMENT_REF_PARAM` when that is set. Going back and paying again sends a second copy with the same reference code; dedupe by code.
- **D24 Total** is the chosen option's price ([TOTAL] in section 7).
- **D25 Buttons wait for real URLs:** while a payment link or form endpoint is a placeholder, the pay button (and the Questions send button) renders in the designed disabled state.
- **D26 Failed send:** the error state shows, focus moves to it, nothing is lost, and the same button tries again. While sending, the buttons are disabled so one click sends once.

Confirmation (src/pages/confirmation/index.astro, src/scripts/confirmation.js)

- **D27 State from the address:** `?payment=paid`, `pending` or `failed`. No value, or any other value, means pending. Anyone can type the address, so the page claims nothing more; the payment provider's dashboard is the record. Stripe Payment Links send people back only after a successful payment, so with Stripe the failed state may never show.
- **D28 Paid:** attendee details are cleared from the browser tab, and the reference code stays for this page. Register then starts a fresh registration with a new code.
- **D29 Retry** goes to the same option's payment link with the same reference code. It is disabled if nothing is saved.
- **D30 Add to calendar:** a /workshop.ics file built from `EVENT` in src/config.ts. No file and no link while the date is a placeholder.
- **D31 Forward to your board:** an email link whose body ends with the full address of the board page, built in the browser because the domain is not decided. Without JavaScript the link goes to /board/.

Questions (src/pages/questions/index.astro, src/scripts/questions.js)

- **D32 Form:** name and email required; organization, question and the future-dates checkbox optional.
  - **Messages:** the designed Register messages are reused: "Add a name." for name, and "Enter a valid email." for both empty and malformed email. No new message copy.
  - **Labels:** "Name", "Organization name", "Email" and the checkbox ("Email me about this workshop and future dates.") are Register's.
  - **Success** resets the form and shows the success state. **Error** keeps the values.
  - **Honeypot:** a hidden `_gotcha` field. If it is filled, the page shows success and sends nothing.
- **D33 Common questions:** the first three Home FAQ items.

Shared

- **D34 Nav:** Workshop, For your board, About, Questions (to /questions/). The current page's link carries `aria-current="page"`.
- **D35 Header at 900 to 1099px:** the Home artboard's own header wraps "For your board" at 900 to 1024px (measured). There, the links stay on one line, and the Home nav extends left into the unused width of the wordmark columns with a 16px gap instead of 24px. Smallest measured gap: 34px. qa/checks/headerfit.mjs.
- **D36 FAQ answer 6:** "For your board" links to /board/. The text is unchanged.
- **D37 For your board in print:** US Letter, 0.5in margins, a label column and a content column. Nav, menu and buttons are hidden, links print in ink, and the footer and honesty line stay. The print button calls the browser's print; `BOARD_PDF_URL` swaps it for "Download PDF".
- **D38 PhotoBlock:** flat --tint, 4:5, the label in ink2 (8.05:1, a spec pair).
- **D39 Workshop details:** When and where also lists Seats left (Home's facts). It ends with the Home seat options and a Reserve seats button, because the header button is Home only (section 4). For your board puts the same button under Cost. Both are hidden in print.
- **D40 Copy rule for derived pages:** every string is design text, section 1 or 7 spec wording, or a named placeholder. Each is set once in src/copy.ts, which Home and the footer now share. qa/checks/provenance.mjs fails on anything else and lists the spec wording.
- **D41 Cash or check:** built behind `OFFLINE_PAYMENT` (off). When on, Review shows an alt button that sends the registration with `payment=offline` and opens Confirmation in the pending state.
- **D42 Test build:** `npm run build:mock` builds dist-mock/ with mock form and payment URLs for qa/checks/flow.mjs. It is never deployed, and a guard fails if a mock URL reaches dist/.
- **D43 JavaScript:** Review, Confirmation and both forms need it, because the registration lives in sessionStorage. Without it, Confirmation shows the pending state and Review shows empty values.

## Derived in Stage 3

- **D44 Approved copy:** every row of qa/stage2-copy-draft.md was approved on 2026-11-12. Topics 4 to 7 and the agenda times were suggestions, so each carries [CONFIRM] (your choice).
- **D45 Launch gate:** `npm run check:launch` lists every blocker to a public launch from what would ship (qa/checks/launch.mjs). It is separate from `npm run check` because it is meant to fail until the launch facts are in.
- **D46 Order pages are never indexed:** Review order and Confirmation keep robots noindex after launch, because they show a visitor's own order.
- **D47 Page descriptions:** Base.astro emits a meta description once its text is approved (src/copy.ts `DESCRIPTIONS`). The drafts are in qa/stage2-copy-draft.md (question 10).

## Design file issues (design/ is read-only, so they are logged here)

- **Mobile artboards render without side padding** in a browser. `.in{padding:0 20px}` is declared before `.hero`, `.s` and `.ft`, whose padding shorthands reset left and right to 0. HANDOFF-SPEC.md section 4 says 20px, so the build uses 20px. This is why the mobile pages run taller than the artboards in qa/screenshots/.
- **Declared paragraph margins never render in the artboards:** `.pg p{margin:0}` outranks single-class rules such as `.lede` and `.eyebrow`. The build matches the rendered artboards and lists the affected gaps in the open question on paragraph gaps.
- **The artboards have no focus style** (browser default 1px auto outline). The build uses the section 8 rule: 2px ink, 2px offset.
- **Tap targets under 44px** in the artboards: see D16.
- **`<select value="...">` is not valid HTML**, so the static artboards show each select's first option. The intended values come from section 7.
- **Register artboard, Attendee 2 email** has no placeholder; section 7 sets "name@church.org" on every email field.
- **Register desktop artboard** lacks the nav hover underline that Home has. The shared header uses Home's rule on both pages.
- **Home "Our promises" section** has the accessible name "Safety and scope", different from its visible label. Kept as designed.
- **The "done" step in ProgressSteps** is marked only by a check icon, with no text for screen readers. Kept as designed; worth a word in a later pass.
