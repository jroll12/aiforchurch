# Roloff AI site repo: Claude for Church Offices

## What this repo is
The public site for a paid, in-person church-office workshop run by Jarret Roloff (Roloff AI, Hendricks County, Indiana). Audience: church administrators, communications staff, executive pastors, financial administrators. Non-technical, often on a phone.

## Authority order
1. HANDOFF-SPEC.md and the files in design/ (Direction C, Plain print) decide how it looks and what it says.
2. tokens.css holds the design tokens. Use it as the single source. No new colors, no new type sizes without a reason in qa/questions.md.
3. This file decides how to work.

## Hard rules
1. Do not change, add or rewrite copy. Visible copy in design/ is final, including typographic apostrophes. Missing copy becomes a placeholder and an entry in qa/questions.md.
2. Every [PLACEHOLDER] stays exactly as designed until Jarret supplies the real value. Every [CONFIRM] stays too. List them in PLACEHOLDERS.md.
3. The accent color is for interactive elements only. No rounded corners. No images, gradients, shadows or emoji.
4. Sample values in the design (Sample Community Church, Sample Person A, person.a@example.org, Sample Person B) must NOT ship. Fields ship empty with their placeholders.
5. No analytics, trackers, chat widgets or third-party scripts. Allowed external requests: the Google Fonts stylesheet (as designed), the hosted form service, the hosted payment link.
6. No dead links. Omit a nav item or link whose page does not exist yet.
7. Accessibility is part of done: contrast 4.5:1 for text, visible focus, tap targets of 44 px or more, real labels, works at 200% zoom, keyboard operable.
8. No em dashes in docs, comments or commit messages.
9. Ask before adding any dependency.
10. Footer on every page keeps the honesty line exactly as designed.

## Working rules
- Report what you ran. Never say a check passed unless you ran it and saw the result.
- Open questions go in qa/questions.md. Ask Jarret at most one question at a time.
- Do not edit design/, HANDOFF-SPEC.md or tokens.css. If one is wrong, say so in qa/questions.md.
