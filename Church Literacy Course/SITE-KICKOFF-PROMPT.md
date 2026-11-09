You are building the public site for a paid church-office workshop from a finished design. Work in this repo. First read CLAUDE.md, HANDOFF-SPEC.md, tokens.css, PLACEHOLDERS.md, design/README.md and the six files in design/.

GOAL
Stage 1: build 01 Home and 05 Register, responsive, from the Direction C design. Stop after Stage 1 and wait for me. Do not start Stage 2 or the member area.

BEFORE YOU WRITE ANYTHING
Post a plan of 12 lines or fewer and wait for my go. In it state: the stack, how pages share header, footer and components, and how Register state reaches the next page. Ask ONE question only if an open decision in HANDOFF-SPEC.md section 9 blocks Stage 1. If I do not answer, use the defaults in that table.

STAGE 1
1. Scaffold. tokens.css is the single source of design tokens. Build the shared pieces first: PageHeader, Footer, Button, FormField, Notice, FaqItem, ModuleCard, StepCard, ChecklistItem, SeatOption, SeatPicker, AttendeeRow, ProgressSteps, SummaryPanel.
2. Build Home and Register, each as ONE responsive page. The 1440 and 390 artboards are the two layouts. Switch layouts at 900 px as HANDOFF-SPEC.md section 4 says. Do not invent a tablet design. Take exact markup patterns, spacing, type sizes and copy from design/. Ignore support.js and the x-dc script block.
3. Navigation links only to pages that exist. Omit items whose page is not built. No dead links.
4. Registration: implement the Register behavior in HANDOFF-SPEC.md section 7, including the derived validation, and mark the derived parts in qa/questions.md. Payment link and form endpoint are named config values, not guesses.
5. Keep every [PLACEHOLDER] and [CONFIRM] exactly as designed. Update PLACEHOLDERS.md with file and line.
6. The design's sample values must not ship. Fields ship empty.

A NOTE ON SUBAGENTS
Two pages do not need parallel agents. Build the shared components first, then Home, then Register, in one session. If you do use a subagent, use it for the audit step only.

CHECKS
Report each as pass or fail with evidence. If you cannot run one, write "not run" and say why.
1. Text diff: extract the visible text from the Home and Register files in design/ and from your built pages at both layouts. Pass means zero unexplained differences. List every difference.
2. No horizontal scroll at 320, 390, 768, 1024 and 1440 px.
3. Contrast: the token pairs in HANDOFF-SPEC.md section 3, plus any new pair you used.
4. Keyboard: tab through each page, focus is visible, FAQ items open and close from the keyboard, each error message is linked to its field.
5. Tap targets of at least 44 px for buttons, the menu button, and the radio and checkbox labels.
6. 200% zoom: no overlap and no clipped text.
7. Visual comparison at 390 and 1440 against design/screenshots/ if it exists. If there is no browser tool, write "not run".
8. Network: no third-party requests other than the Google Fonts stylesheet, the form service and the payment link.

WHEN DONE
- qa/stage1-report.md: what ran, the results, every deviation from the design and the reason for it.
- qa/audit-brief.md: a prompt I can paste into a fresh session so a reviewer who did not see this build can audit it. Include the requirements list from HANDOFF-SPEC.md sections 2, 3 and 8 and the paths of the built pages. Do not run it yourself.
- Stop. Do not start Stage 2.

STAGE 2 (only after I say go)
Build 02 Workshop details, 03 For your board, 04 About, 06 Review order, 07 Confirmation and 08 Questions and interest list from HANDOFF-SPEC.md section 7. They have no artboards. Use the same tokens and components. Mark each as "derived, not designed" in qa/stage2-report.md. Then update the nav to include them.

RULES
- design/ and HANDOFF-SPEC.md are the authority. Do not change, add or rewrite copy. If something is missing, put it in qa/questions.md and continue with a placeholder.
- No analytics, trackers, chat widgets or other third-party scripts.
- Ask before adding any dependency.
- Never say a check passed unless you ran it and saw the result.
- No em dashes in docs, comments or commit messages.
