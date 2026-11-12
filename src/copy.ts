/*
 * Copy for every page, in one file.
 *
 * CLAUDE.md hard rule 1: do not change, add or rewrite copy. The six Stage 2
 * pages have no artboards, so each string here has one of four sources:
 *   design       exact text from design/ (typographic apostrophes included)
 *   spec         wording HANDOFF-SPEC.md sections 1 and 7 prescribe (confirmed 2026-11-12)
 *   approved     text Jarret approved in qa/stage2-copy-draft.md (2026-11-12)
 *   placeholder  still missing, kept as [LIKE THIS]; [CONFIRM] marks a fact to check
 * New copy goes into qa/stage2-copy-draft.md as a draft row first.
 * qa/checks/provenance.mjs fails on any string without one of these sources,
 * and when this file and an approved row disagree.
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

/**
 * Search and link-preview descriptions, one per page (open question 10).
 * null means no description is emitted. Drafts are in qa/stage2-copy-draft.md;
 * a page gets its description once its row is approved and copied here.
 * Review order and Confirmation have none: they are never indexed.
 */
export const DESCRIPTIONS: Record<string, string | null> = {
  home: null,
  workshop: null,
  board: null,
  about: null,
  register: null,
  questions: null,
};

/* ---------- 02 Workshop details ---------- */
export const WORKSHOP = {
  title: 'Workshop details', // spec: screen name
  whenLabel: 'When and where', // spec
  accessibilityLabel: 'Accessibility', // spec: "accessibility information"
  accessibility: 'Step-free entrance [CONFIRM]. Accessible restroom [CONFIRM]. Parking [CONFIRM]. Tell us about any other need when you register.',
  agendaLabel: 'Half-day agenda', // spec
  agenda: [
    { time: '9:00 [CONFIRM]', item: 'Arrive, sign in, set up your laptop' },
    { time: '9:15 [CONFIRM]', item: 'Topics 1 to 3: newsletter, AI use policy, prayer chain and care messages' },
    { time: '10:45 [CONFIRM]', item: 'Break' },
    { time: '11:00 [CONFIRM]', item: 'Topics 4 to 7, then questions' },
  ],
  topicsLabel: 'What you will do', // design
  laterTopics: [
    { num: '04', title: 'Event announcements from a ministry calendar [CONFIRM]', outcome: 'Turn calendar entries into announcements, with every date and room checked.' },
    { num: '05', title: 'Volunteer schedules and reminder emails [CONFIRM]', outcome: 'Draft a month of reminders from a sign-up sheet.' },
    { num: '06', title: 'Meeting notes into minutes and action items [CONFIRM]', outcome: 'Turn rough notes into minutes your board can approve.' },
    { num: '07', title: 'Bulletin and slide text from one source [CONFIRM]', outcome: 'Write the bulletin once and reuse it for slides and the website.' },
  ],
  safetyLabel: 'Data safety', // design (Topic artboard)
  seatsLabel: 'Choose your seats', // design
} as const;

/** Shared by Workshop details and Confirmation. */
export const BRING = {
  label: 'What to bring', // spec
  items: ['A laptop and its charger', 'A Claude account. The newsletter topic works on a free account.', 'Nothing from your church. We bring invented sample files.'],
} as const;

/* ---------- 03 For your board ---------- */
export const BOARD = {
  title: 'For your board', // design: nav label
  lede: 'A one-page summary for your pastor or board.',
  print: 'Print this page',
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
  bio: 'Jarret Roloff runs Roloff AI in Hendricks County, Indiana. [ONE OR TWO SENTENCES ON YOUR BACKGROUND]',
  photo: '[PHOTO]',
  whyLabel: 'Why a local workshop', // spec
  why: 'Church office work is local: your calendar, your rooms, your people. A half-day in the room means you can ask as you go and leave with drafts you can use the next week.',
  madeLabel: 'How the materials are made', // spec
  notLabel: 'What the workshop will not do', // spec
} as const;

/* ---------- 06 Review order ---------- */
export const REVIEW = {
  step: 'Step 3 of 3', // derived pattern of the designed "Step 2 of 3"
  title: 'Review order', // spec: screen name
  lede: 'Check your order. You can edit anything before you pay.',
  edit: 'Edit', // spec: "Edit links back to Register"
  total: 'Total', // spec: "total [TOTAL]"; the total is the chosen option's price
  pay: 'Continue to payment',
  payOffline: 'Pay by check or cash',
  sendError: 'We could not send this. Check your connection and try again.',
} as const;

/* ---------- 07 Confirmation ---------- */
export const CONFIRMATION = {
  title: 'Confirmation', // spec: screen name (page title only)
  paid: 'You are in.', // spec
  pendingHeading: 'We have your registration.',
  pending: 'Your seats are confirmed when payment arrives. Use your reference code with any payment.',
  failedHeading: 'Payment did not go through.',
  failed: 'Your registration is saved. Try the payment again, or email us for help.',
  retry: 'Try payment again',
  refLabel: 'Your reference code:',
  nextLabel: 'What happens next', // spec
  next: 'We will email each attendee before the workshop with the room details and anything to prepare. [CONFIRM]',
  whenLabel: 'When and where', // spec
  calendar: 'Add to calendar', // spec
  prepLabel: 'Prep checklist', // spec
  prep: ['Check that you can sign in to Claude on the laptop you will bring.', 'Think of one office task that takes too long.', 'If your board must approve it, send them the one-page summary.'],
  boardLabel: 'For your board', // design: nav label
  forward: 'Email the one-page summary to your board',
  forwardSubject: 'Workshop summary for board review',
  forwardBody: 'Here is a one-page summary of the workshop our office plans to attend.',
  contactLabel: 'Who to contact', // spec
} as const;

/* ---------- 08 Questions and interest list ---------- */
export const QUESTIONS = {
  title: 'Questions', // design: nav label and section label
  lede: 'Ask a question, or ask to hear about future dates.',
  formLabel: 'Ask a question',
  name: 'Name', // design: Register field label
  namePlaceholder: 'Full name', // design
  church: 'Organization name', // design: Register field label
  email: 'Email', // design
  emailPlaceholder: 'name@church.org', // design
  question: 'Your question',
  future: 'Email me about this workshop and future dates.', // design: Register checkbox
  send: 'Send',
  sent: 'Thank you. We got your message and will reply by email.',
  sendError: 'We could not send this. Check your connection and try again.',
  answersLabel: 'Common questions',
} as const;
