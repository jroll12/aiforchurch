/*
 * Site configuration: the one place for the working title, placeholder
 * values, external service URLs, page states and which pages exist.
 *
 * Placeholder strings stay exactly as designed until Jarret supplies the
 * real value (CLAUDE.md hard rule 2). PLACEHOLDERS.md points at each line.
 */

/**
 * Test-only build (`npm run build:mock`, output dist-mock/): form endpoints and
 * payment links point at the mock services the checks run. Never deploy it.
 */
const MOCK = process.env.CFCO_MOCK === '1';

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
 * External services. Real URLs replace these before launch. While a value is
 * still a [PLACEHOLDER], the button that uses it renders disabled, so nothing
 * links to a page that does not exist and nothing pretends to send.
 *
 * Payment links: one hosted payment page per seat option, keyed by seat count.
 * PAYMENT_REF_PARAM: the URL parameter the provider copies onto the payment
 * record, so a payment can be matched to its registration by reference code.
 * Stripe Payment Links accept 'client_reference_id'. null means not decided
 * yet, which blocks launch (npm run check:launch); set false if the chosen
 * provider takes no such parameter, so payments are matched by name instead.
 *
 * Form endpoints: any hosted form service that accepts a URL-encoded POST,
 * answers 2xx and allows cross-origin requests from the site's domain (CORS),
 * for example Formspree, Basin or Getform. Without CORS the service stores the
 * entry but the page cannot see the answer and shows the error. No provider
 * script loads.
 */
export const PAYMENT_LINKS: Record<number, string> = MOCK
  ? { 1: '/__mock/pay/one', 3: '/__mock/pay/three' }
  : { 1: '[PAYMENT LINK URL]', 3: '[PAYMENT LINK URL]' };
export const PAYMENT_REF_PARAM: string | false | null = MOCK ? 'client_reference_id' : null;
export const FORM_ENDPOINTS = MOCK
  ? { registration: '/__mock/form/registration', questions: '/__mock/form/questions' }
  : { registration: '[FORM ENDPOINT]', questions: '[FORM ENDPOINT]' };

/** True once a config value is a real address rather than a [PLACEHOLDER]. */
export const isLive = (value: string) => !value.startsWith('[');

/**
 * Cash or check: when true, Review shows a second button that sends the
 * registration and goes to Confirmation in the payment pending state.
 * Off until Jarret decides (qa/questions.md).
 */
export const OFFLINE_PAYMENT = false;

/**
 * Add to calendar. ISO 8601 local times with offset, for example
 * '2027-02-18T09:00:00-05:00'. While start is null the link is not shown,
 * because [DATE] is still a placeholder.
 */
export const EVENT: { start: string | null; end: string | null } = { start: null, end: null };

/** For your board: a PDF of the page, if one exists. Null shows a print button instead. */
export const BOARD_PDF_URL: string | null = null;

/** Sold out swaps every Reserve seats button for "Join the waitlist" to /questions/. */
export const SOLD_OUT = false;

/** Keeps search engines out while placeholders are on the page. Turn off at launch. */
export const NOINDEX = true;

/** Routes from HANDOFF-SPEC.md section 1. `built: false` means nothing may link there yet. */
export const ROUTES = {
  home: { path: '/', built: true },
  workshop: { path: '/workshop/', built: true },
  board: { path: '/board/', built: true },
  about: { path: '/about/', built: true },
  register: { path: '/register/', built: true },
  review: { path: '/register/review/', built: true },
  confirmation: { path: '/confirmation/', built: true },
  questions: { path: '/questions/', built: true },
} as const;

/**
 * Main nav in design order. An item shows only when its page exists.
 * Stage 2: Questions goes to /questions/ (kickoff: "update the nav to include
 * them"); the Home artboard linked it to the Home FAQ before that page existed.
 */
export const NAV = [
  { label: 'Workshop', path: ROUTES.workshop.path, built: ROUTES.workshop.built },
  { label: 'For your board', path: ROUTES.board.path, built: ROUTES.board.built },
  { label: 'About', path: ROUTES.about.path, built: ROUTES.about.built },
  { label: 'Questions', path: ROUTES.questions.path, built: ROUTES.questions.built },
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
