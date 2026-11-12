/*
 * Copy for every page, in one file.
 *
 * CLAUDE.md hard rule 1: do not change, add or rewrite copy. The six Stage 2
 * pages have no artboards, so each string here has one of three sources:
 *   design       exact text from design/ (typographic apostrophes included)
 *   spec         wording HANDOFF-SPEC.md sections 1 and 7 prescribe; Jarret to confirm
 *   placeholder  missing copy, kept as [LIKE THIS] until Jarret approves text
 * Draft text for every placeholder is in qa/stage2-copy-draft.md. Nothing
 * there ships until Jarret marks a row approved and it is copied in here.
 * qa/checks/provenance.mjs fails on any string without one of these sources.
 */
import { PH } from './config';

/* ---------- design: shared by Home and the derived pages ---------- */
export const DESIGN = {
  lede: 'A hands-on, in-person workshop on using Claude for real office work. Every date, time and room checked against a source.',
  who: 'Church administrators, communications staff, executive pastors and financial administrators. No technical background needed.',
  topics: [
    { num: '01', title: 'Weekly newsletter from staff notes', outcome: 'Turn a week of notes into a draft in your church’s voice, with every date, time and room traced to a source.' },
    { num: '02', title: 'A church AI use policy', outcome: 'Write a one-page policy your pastor and board can review.' },
    { num: '03', title: 'Prayer chain and care messages, privacy first', outcome: 'Format messages without exposing private details.' },
  ],
  more: 'Seven topics in all. Topics are subject to change.',
  safe: { label: 'Safe by design', text: 'Workshops use invented sample data only. Bring no real names, giving, prayer or child information.' },
  scope: { label: 'Our scope', text: 'This covers office administration, not sermons or pastoral care.' },
  faq: [
    { q: 'Do we need a paid Claude account?', a: 'The newsletter topic works on a free account. We will list what each topic needs before you register. [CONFIRM]' },
    { q: 'Can our whole office come?', a: 'Yes. The three-seat option is built for a small office, and you can register more people. [CONFIRM maximum per church]' },
    { q: 'Is our information safe?', a: 'Nothing from your church is needed. We use invented sample data, and one topic shows how to keep private information out of AI tools.' },
    { q: 'Is this about sermons?', a: 'No. This covers office administration, not sermons or pastoral care.' },
    { q: 'What if we are new to AI?', a: 'That is who this is for. Every exercise is step by step, and no technical background is needed.' },
    // Answer 6 is split so "For your board" can link to /board/ in Stage 2; the text is unchanged.
    { q: 'What if our board must approve it?', a: 'We made a one-page summary for exactly that. See For your board.', link: 'For your board' },
  ],
  honesty: 'Course materials are drafted with AI, then taught and checked by Jarret Roloff.',
  contact: `Roloff AI, Hendricks County, Indiana. ${PH.contactEmail}`,
  reserve: 'Reserve seats',
  waitlist: 'Join the waitlist',
  back: 'Back',
} as const;

/* ---------- 02 Workshop details ---------- */
export const WORKSHOP = {
  title: 'Workshop details', // spec: screen name
  whenLabel: 'When and where', // spec
  accessibilityLabel: 'Accessibility', // spec: "accessibility information"
  accessibility: '[ACCESSIBILITY]',
  agendaLabel: 'Half-day agenda', // spec
  agenda: [
    { time: '[AGENDA TIME 1]', item: '[AGENDA ITEM 1]' },
    { time: '[AGENDA TIME 2]', item: '[AGENDA ITEM 2]' },
    { time: '[AGENDA TIME 3]', item: '[AGENDA ITEM 3]' },
    { time: '[AGENDA TIME 4]', item: '[AGENDA ITEM 4]' },
  ],
  topicsLabel: 'What you will do', // design
  laterTopics: [
    { num: '04', title: '[TOPIC 4 TITLE]', outcome: '[TOPIC 4 OUTCOME]' },
    { num: '05', title: '[TOPIC 5 TITLE]', outcome: '[TOPIC 5 OUTCOME]' },
    { num: '06', title: '[TOPIC 6 TITLE]', outcome: '[TOPIC 6 OUTCOME]' },
    { num: '07', title: '[TOPIC 7 TITLE]', outcome: '[TOPIC 7 OUTCOME]' },
  ],
  safetyLabel: 'Data safety', // design (Topic artboard)
  seatsLabel: 'Choose your seats', // design
} as const;

/** Shared by Workshop details and Confirmation. */
export const BRING = {
  label: 'What to bring', // spec
  items: ['[BRING ITEM 1]', '[BRING ITEM 2]', '[BRING ITEM 3]'],
} as const;

/* ---------- 03 For your board ---------- */
export const BOARD = {
  title: 'For your board', // design: nav label
  lede: '[BOARD LEDE]',
  print: '[PRINT BUTTON]',
  pdf: 'Download PDF', // spec
  whatLabel: 'What it is', // spec
  whoLabel: 'Who it is for', // design
  whenLabel: 'When and where', // spec
  costLabel: 'Cost', // spec
  doLabel: 'What you will do', // design
  infoLabel: 'How information is handled', // spec
  scopeLabel: 'Our scope', // design
  contactLabel: 'Who to contact', // spec
} as const;

/* ---------- 04 About ---------- */
export const ABOUT = {
  title: 'About', // design: nav label
  bio: '[JARRET BIO]',
  photo: '[PHOTO]',
  whyLabel: 'Why a local workshop', // spec
  why: '[WHY LOCAL]',
  madeLabel: 'How the materials are made', // spec
  notLabel: 'What the workshop will not do', // spec
} as const;

/* ---------- 06 Review order ---------- */
export const REVIEW = {
  step: 'Step 3 of 3', // derived pattern of the designed "Step 2 of 3"
  title: 'Review order', // spec: screen name
  lede: '[REVIEW LEDE]',
  edit: 'Edit', // spec: "Edit links back to Register"
  total: 'Total', // spec: "total [TOTAL]"; the total is the chosen option's price
  pay: '[PAY BUTTON]',
  payOffline: '[OFFLINE PAY BUTTON]',
  sendError: '[SEND ERROR]',
} as const;

/* ---------- 07 Confirmation ---------- */
export const CONFIRMATION = {
  title: 'Confirmation', // spec: screen name (page title only)
  paid: 'You are in.', // spec
  pendingHeading: '[PENDING HEADING]',
  pending: '[PENDING MESSAGE]',
  failedHeading: '[FAILED HEADING]',
  failed: '[FAILED MESSAGE]',
  retry: '[RETRY BUTTON]',
  refLabel: '[REFERENCE LABEL]',
  nextLabel: 'What happens next', // spec
  next: '[NEXT STEPS]',
  whenLabel: 'When and where', // spec
  calendar: 'Add to calendar', // spec
  prepLabel: 'Prep checklist', // spec
  prep: ['[PREP ITEM 1]', '[PREP ITEM 2]', '[PREP ITEM 3]'],
  boardLabel: 'For your board', // design: nav label
  forward: '[FORWARD LINK]',
  forwardSubject: '[FORWARD SUBJECT]',
  forwardBody: '[FORWARD BODY]',
  contactLabel: 'Who to contact', // spec
} as const;

/* ---------- 08 Questions and interest list ---------- */
export const QUESTIONS = {
  title: 'Questions', // design: nav label and section label
  lede: '[QUESTIONS LEDE]',
  formLabel: '[ASK LABEL]',
  name: 'Name', // design: Register field label
  namePlaceholder: 'Full name', // design
  church: 'Organization name', // design: Register field label
  email: 'Email', // design
  emailPlaceholder: 'name@church.org', // design
  question: '[QUESTION FIELD LABEL]',
  future: 'Email me about this workshop and future dates.', // design: Register checkbox
  send: '[SEND BUTTON]',
  sent: '[SENT MESSAGE]',
  sendError: '[SEND ERROR]',
  answersLabel: '[COMMON QUESTIONS LABEL]',
} as const;
