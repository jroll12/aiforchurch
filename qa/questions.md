# Questions and derived decisions

CLAUDE.md: ask Jarret at most one question at a time. The open questions are in the order I would ask them. Everything under "Derived" is already built with the stated default, so nothing below blocks Stage 1.

## Open questions for Jarret

1. **Should Register open with Three seats selected?** The progress strip shows "Seats" as done with a check, but HANDOFF-SPEC.md section 9 defaults to no seat preselected, so the first thing a visitor sees contradicts itself. Preselecting Three seats removes the contradiction and every pre-choice state in D1, and matches the artboards exactly. The cost: it defaults buyers to the higher price. Built: no preselection (the section 9 default).
2. **How does an office of four or more register?** The helper text reads "Three seats, three rows. Choose more seats to add people." There is no option above three seats, so at three seats it points nowhere. FAQ answer 2 says "you can register more people." Needed: either a larger seat option, or copy that says what to do (for example, a second registration). Also needed: helper copy for the one-seat state, which has none (built: helper hidden there, D4).
3. **Should the contact person have an email or phone field?** Register asks for a contact person's name only. Confirmation emails go to attendees, so a contact who is not attending gets nothing. No field was added.
4. **Payments (Stage 2).** You named Stripe, PayPal, Venmo, Apple Pay and cash. A US Stripe account covers cards and Apple Pay, not PayPal or Venmo. PayPal's no-code Payment Links cover PayPal, Venmo, Apple Pay and cards on one page. Recommendation: one online provider plus one offline path (cash or check; church finance offices often pay by check or church card and need a receipt). Open: which provider; whether an unpaid offline registration holds a seat, and until when; and the copy that shows the reference code on Review and Confirmation (D10).
5. **Which hosted form service (Stage 2)?** Register state is ready to send (D10); the endpoint is `[FORM ENDPOINT]` in src/config.ts.
6. **Should "Step 2 of 3" change?** Section 9 asks. Built as designed.
7. **Page titles, description and link preview.** None are designed. Built: "Claude for Church Offices" (Home) and "Reserve your seats | Claude for Church Offices" (Register), no meta description, no preview image. Church staff forward links, so a description is worth writing.
8. **Stage 2 nav.** The Home artboard links "Questions" to the Home FAQ (#faq). When /questions/ exists, should the nav item go there instead? And should "See For your board." in FAQ answer 6 become a link to /board/? Built: Questions goes to /#faq; the FAQ sentence stays plain text.
9. **Sold out on Register.** Section 7 defines sold out for Home only. What should Register show, and what does the seat notice say at zero? Built: the `SOLD_OUT` flag swaps Home's buttons to "Join the waitlist" and refuses to build until /questions/ exists.
10. **"Add another attendee" is disabled in almost every state.** Rows start equal to seats, so it only enables after Remove. Keep it, or drop Remove and Add (empty rows are already allowed)? Built as designed.
11. **Do you want the gaps the artboard CSS declares but never shows?** The artboards reset every paragraph margin with a rule that outranks the declared spacing, so these render with no gap: under the Home lede (declared 28px desktop, 20px mobile), under the eyebrow (20/16px), under the Register lede on mobile (20px), above the seat notice (16px), above "Seven topics in all" (20px), under the status line (8px), above the helper text (10px) and under "Step 2 of 3" on mobile (12px). Built: as the artboards render. Each is a one-line CSS change if you want them.
12. **Working title.** Kept as "Claude for Church Offices" for now (your call, 2026-11-09). It is one constant, src/config.ts:10.

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
- **D10 State:** a valid Continue writes `{v, ref, seats, org, contact, attendees, question, consent, savedAt}` to sessionStorage key `cfco:registration`. `ref` is a 6-character reference code from an alphabet without 0, O, 1, I or L, made once and kept on later saves. Only filled rows are saved. Register restores this state on load. Storage errors are caught; the page still works without it.
- **D11 Continue does not navigate in Stage 1:** /register/review/ does not exist yet, and "no dead links" wins. Setting `ROUTES.review.built` to true in src/config.ts turns navigation on.
- **D12 Form:** `method="post" novalidate`, so Enter submits and no data ever lands in a URL. Without JavaScript the fields still render, but the seat-driven behavior and Continue need it.

Shared

- **D13 Mobile menu open state** (src/scripts/menu.js, site.css "Mobile nav panel"): the nav opens below the header bar as 48px rows with hair separators, and the menu icon becomes the x icon. Escape closes it and returns focus to the button; choosing a link closes it; it resets at 900px. The button keeps its designed label "Open menu" while open.
- **D14 Page titles** as in question 7.
- **D15 Wordmark link:** Home links to #top (as designed); Register links to Home.
- **D16 Tap targets:** the design misses 44px on the wordmark (about 19px), the desktop nav links (about 25px), "See what we cover" on desktop (about 26px) and the consent label (about 28px). CSS min-heights give each a 44px hit area with no visual change.
- **D17 Launch switches:** `NOINDEX` (on until placeholders are filled) adds a robots noindex meta tag. An empty data: favicon stops a stray favicon request.
- **D18 `role="list"`** on the two styled lists keeps list semantics in Safari. Invisible.
- **D19 The footer contact** stays plain text until [CONTACT EMAIL] is real; it may become a mailto link then.

## Design file issues (design/ is read-only, so they are logged here)

- **Mobile artboards render without side padding** in a browser. `.in{padding:0 20px}` is declared before `.hero`, `.s` and `.ft`, whose padding shorthands reset left and right to 0. HANDOFF-SPEC.md section 4 says 20px, so the build uses 20px. This is why the mobile pages run taller than the artboards in qa/screenshots/.
- **Declared paragraph margins never render in the artboards:** `.pg p{margin:0}` outranks single-class rules such as `.lede` and `.eyebrow`. The build matches the rendered artboards and lists the affected gaps in open question 11.
- **The artboards have no focus style** (browser default 1px auto outline). The build uses the section 8 rule: 2px ink, 2px offset.
- **Tap targets under 44px** in the artboards: see D16.
- **`<select value="...">` is not valid HTML**, so the static artboards show each select's first option. The intended values come from section 7.
- **Register artboard, Attendee 2 email** has no placeholder; section 7 sets "name@church.org" on every email field.
- **Register desktop artboard** lacks the nav hover underline that Home has. The shared header uses Home's rule on both pages.
- **Home "Our promises" section** has the accessible name "Safety and scope", different from its visible label. Kept as designed.
- **The "done" step in ProgressSteps** is marked only by a check icon, with no text for screen readers. Kept as designed; worth a word in a later pass.
