# Stage 5 report: the member area and the workshop kit

Branch `claude/upbeat-cray-ehwzda`. Your instruction (2026-11-20): "Do what you think is best... I want the whole product made and then I'll go back over it." The product is now complete apart from facts and services only you can supply. Your review pass is the checklist at the end.

## What was built

- **Member area** (unlisted, noindex, never linked from the public site):
  - /course/ (Course home), /topics/ (Topics index), /resources/ (every download), and /topics/<slug>/ for all seven topics.
  - /topics/newsletter/ matches the designed Topic page (screen 11) at 390 and 1440, with only listed differences. The other six reuse its layout with their own lesson content.
  - Step checkboxes drive the progress bar. Ticks stay on that device only (browser storage); nothing is sent anywhere.
  - Account is left out: there is no login service (D52).
- **Downloads:** seven one-page handout PDFs and seven practice-file zips in public/downloads/, built by `npm run build:downloads` from course/. A manifest of source hashes lets the checks catch a stale download.
- **Facilitator kit** (course/facilitator/): run of show, setup checklist, opening and closing scripts, how to use each flawed draft, and what to do if Claude is down.
- **Attendee emails** (course/emails/): registration received, payment confirmed, one week before, the day before, after the workshop.
- **Ten calls made for you** (C1 to C10 in qa/questions.md), applied to topics 2, 6 and 7.

## Checks

Run on 2026-11-20 after the review fixes. I ran each of these and read the result.

| Command | Result |
| --- | --- |
| `npm run verify` | 16 pass, visual is REVIEW as in every stage (no design screenshots supplied; topic@1440 5.5% of pixels changed, topic@390 12.7%, the mobile padding bug in the artboards) |
| text-diff | 13 differences, 0 unexplained, including Topic 1 at 390 and 1440 |
| provenance | 1276 strings on 15 derived and member pages, 0 with no allowed source |
| targets, zoom, keyboard, overflow, contrast, network, guards | all pass with the member pages included |
| course | 7 modules, 0 findings |
| downloads | 7 one-page PDFs, 7 zips matching samples/; proof catches a stale PDF and a missing zip |
| `npm run check:launch` | fails as expected: 20 blockers (14 placeholder, 4 service, 1 indexing, 1 member access), 3 warnings. Its proof passes |

The email length limit is now under 190 words (email 3 is 183 after adding [FILES LINK] and the end time).

## Blind review

Three reviewers, each blind to how the work was made. No blockers. Every finding and its status is in qa/stage5-review.md:

- **Fixed:** 22 findings.
- **Logged:** 4 (D51, D54 to D56).
- **Left for you:** 4 (F3, F4, T3, T4), all in the checklist below.

Not checked by anyone: real screen readers, Safari, Firefox, iOS, real browser zoom, the production host. qa/device-checklist.md covers the phone and browser pass.

## Failure modes to know before launch

1. **The member area is open to anyone with the address.** Noindex keeps it out of search, not out of reach. `npm run check:launch` blocks on this until `MEMBER_ACCESS` is set (D51).
2. **Lessons are still drafts** but read as final on the member pages (D56). Approve each one before member access opens.
3. **The launch gate reads only the built pages.** It does not see placeholders in the PDFs, the facilitator kit or the emails. Clear those by hand (PLACEHOLDERS.md, member area section).
4. **Editing a handout or sample file without `npm run build:downloads`** makes `npm run verify` fail. That is on purpose.

## Your review pass: everything in one place

Work top to bottom. Each item says where to change it.

### 1. Calls I made for you (qa/questions.md C1 to C10)

Keep or reverse each one:

- [ ] C1 Topics 4 to 7 kept as drafted, with [CONFIRM]
- [ ] C2 Topic 6 habit renamed "Record check."
- [ ] C3 "board" everywhere, no "church council"
- [ ] C4 Topic 3 keeps the real-log safe-use rule on the handout (now also: whole-church rows only, identifying details removed)
- [ ] C5 Ray's request stays a discussion point
- [ ] C6 Easter stays in Topic 5
- [ ] C7 Topic 4: the newer email wins, row stays [CONFIRM]
- [ ] C8 Lyrics: titles only; song license line for the facilitator
- [ ] C9 Shared spring cleanup in topics 6 and 7
- [ ] C10 Laptop stays [CONFIRM] (see F3: lessons 01 and 07 also plan for phones)

### 2. Workshop facts (public site; `npm run check:launch` lists each with its line)

- [ ] [DATE], [START TIME], [VENUE], [SEATS LEFT]
- [ ] [SEAT PRICE], [3-SEAT PRICE], [REFUND POLICY], [CONTACT EMAIL]
- [ ] [ONE OR TWO SENTENCES ON YOUR BACKGROUND] (About)
- [ ] [PHOTO]: keep the block, or change CLAUDE.md rule 3 (question 14)

### 3. Site [CONFIRM] tags (src/copy.ts, then the same row in qa/stage2-copy-draft.md)

- [ ] Accessibility line x4: step-free entrance, accessible restroom, parking, and where people tell you about needs (question 16)
- [ ] Agenda times x4 (drafts assume 9:00 to 12:30)
- [ ] Topics 4 to 7 x4, titles and outcome lines
- [ ] What to bring x2: laptop; newsletter topic on a free account
- [ ] About, "Why a local workshop"
- [ ] Confirmation: pending message (does an unpaid registration hold a seat) and What happens next (who sends the pre-workshop email)
- [ ] Home: "What you leave with" item 3, FAQ answer 1, FAQ answer 2 (maximum per church)

### 4. Course [CONFIRM] tags that are open facts

Inside lesson steps and prompts, [CONFIRM] is what attendees are taught to type; those stay. These are facts to check:

- [ ] Topics 4 to 7 titles in each lesson.md `title:` (C1); they show on the member pages
- [ ] Topic 1: can phone app users make a Project and add files; do free-plan limits last
- [ ] Topic 3: does a new chat keep pasted text out of memory and past-chat search (T4)
- [ ] Facilitator kit: agenda clock times, setup start time, phone hotspot backup, projector source, outlets and laptops, the demo account's plan, phone app Projects, free-plan message limits (F4), memory settings. List them with `grep -rn "\[CONFIRM\]" course/facilitator`
- [ ] Emails: who sends each one and when; one payment covers all seats; end time 12:30 p.m.

### 5. Course and email placeholders (PLACEHOLDERS.md, member area section)

- [ ] [FILES LINK]: how attendees get the practice files (the Resources page, a shared folder, or printed copies). In every handout and emails 3 and 5. Then run `npm run build:downloads`
- [ ] [ROOM AND ENTRANCE], [PARKING DETAILS], [BOARD PAGE LINK], [SETUP START TIME]
- [ ] Per-registration values filled by whoever sends: [NAME], [REFERENCE CODE], [ORGANIZATION NAME], [SEATS], [TOTAL]

### 6. Services and switches (src/config.ts)

- [ ] Payment provider and [PAYMENT LINK URL] per seat option; `PAYMENT_REF_PARAM`; `OFFLINE_PAYMENT`; where the provider sends people after paying (question 2)
- [ ] Form service and [FORM ENDPOINT] for registration and questions (question 3)
- [ ] Hosting and domain; then `NOINDEX` off for the public pages
- [ ] `MEMBER_ACCESS`: host password protection or a login service (D51); X-Robots-Tag noindex and MIME types for /downloads/
- [ ] `EVENT` start and end (Add to calendar); `BOARD_PDF_URL` (optional)
- [ ] Page descriptions (question 10)

### 7. Open questions (qa/questions.md, in order)

- [ ] 4 Preselect three seats on Register?
- [ ] 5 How does an office of four or more register?
- [ ] 6 Contact person email or phone field?
- [ ] 7 Is the total ever more than the option price?
- [ ] 8 Which three questions on Questions?
- [ ] 9 "Step 2 of 3" wording
- [ ] 11 Sold out on Register and Review
- [ ] 12 "Add another attendee" behavior
- [ ] 13 Paragraph gaps the artboards declare but never show
- [ ] 15 Working title
- [ ] 16 Where people tell you about access needs
- [ ] 17 "Close menu" wording
- [ ] D53 "A church AI use policy" vs the artboard's "Church AI use policy"

### 8. Approve the content

- [ ] Each lesson: read lesson.md and handout.md, open the samples, set `status: approved` (course/README.md)
- [ ] The facilitator kit and the five emails
- [ ] Run a full rehearsal on a free account (answers F4 and several kit [CONFIRM] items at once)

When every box is ticked, `npm run check:launch` should report no blockers.
