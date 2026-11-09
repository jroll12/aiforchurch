/*
 * Site configuration: the one place for the working title, placeholder
 * values, external service URLs, page states and which pages exist.
 *
 * Placeholder strings stay exactly as designed until Jarret supplies the
 * real value (CLAUDE.md hard rule 2). PLACEHOLDERS.md points at each line.
 */

/** Working title. HANDOFF-SPEC.md: "may change: keep it in one config constant". */
export const SITE_NAME = 'Claude for Church Offices';

/** Workshop facts, prices and contact, exactly as designed. */
export const PH = {
  date: '[DATE]',
  startTime: '[START TIME]',
  venue: '[VENUE]',
  seatsLeft: '[SEATS LEFT]',
  seatPrice: '[SEAT PRICE]',
  threeSeatPrice: '[3-SEAT PRICE]',
  refundPolicy: '[REFUND POLICY]',
  contactEmail: '[CONTACT EMAIL]',
} as const;

/** Seat options, shared by Home (SeatOption) and Register (SeatPicker). */
export const SEAT_OPTIONS = [
  {
    seats: 1,
    title: 'One seat',
    description: 'For a single staff member.',
    price: PH.seatPrice,
  },
  {
    seats: 3,
    title: 'Three seats for your office',
    description: 'For a small office that wants to learn together.',
    price: PH.threeSeatPrice,
  },
] as const;

/** Attendee roles, in design order (HANDOFF-SPEC.md section 7). */
export const ROLES = ['Administrator', 'Communications', 'Pastor', 'Finance', 'Other'] as const;

/**
 * External services. Real URLs replace these before launch. Nothing requests
 * them in Stage 1: payment starts on Review order (Stage 2).
 */
export const PAYMENT_LINKS = {
  oneSeat: '[PAYMENT LINK URL]',
  threeSeats: '[PAYMENT LINK URL]',
} as const;
export const FORM_ENDPOINT = '[FORM ENDPOINT]';

/** Sold out swaps every Reserve seats button for "Join the waitlist" to /questions/. */
export const SOLD_OUT = false;

/** Keeps search engines out while placeholders are on the page. Turn off at launch. */
export const NOINDEX = true;

/** Routes from HANDOFF-SPEC.md section 1. `built: false` means nothing may link there yet. */
export const ROUTES = {
  home: { path: '/', built: true },
  workshop: { path: '/workshop/', built: false },
  board: { path: '/board/', built: false },
  about: { path: '/about/', built: false },
  register: { path: '/register/', built: true },
  review: { path: '/register/review/', built: false },
  confirmation: { path: '/confirmation/', built: false },
  questions: { path: '/questions/', built: false },
} as const;

/**
 * Main nav in design order. An item shows only when its page exists.
 * Questions points at the Home FAQ, which is where the Home design links it.
 * Whether it moves to /questions/ in Stage 2 is open in qa/questions.md.
 */
export const NAV = [
  { label: 'Workshop', path: ROUTES.workshop.path, built: ROUTES.workshop.built },
  { label: 'For your board', path: ROUTES.board.path, built: ROUTES.board.built },
  { label: 'About', path: ROUTES.about.path, built: ROUTES.about.built },
  { label: 'Questions', path: '/#faq', built: ROUTES.home.built },
] as const;

/**
 * Register validation messages. The missing-email message is the one designed
 * error; the rest are the derived messages listed in HANDOFF-SPEC.md section 7.
 */
export const MESSAGES = {
  seats: 'Choose how many seats.',
  org: 'Add your organization name.',
  contact: 'Add a contact person.',
  name: 'Add a name.',
  emailMissing: 'Add an email so we can send the confirmation.',
  emailInvalid: 'Enter a valid email.',
  role: 'Choose a role.',
} as const;

if (SOLD_OUT && !ROUTES.questions.built) {
  throw new Error('SOLD_OUT sends people to /questions/, which does not exist until Stage 2.');
}
