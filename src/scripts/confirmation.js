// 07 Confirmation (derived, not designed; qa/questions.md lists each decision).
// ?payment=paid|pending|failed picks the state; anything else is pending.
// The URL can be typed by anyone, so nothing here is proof of payment.
import { readState, writeState, paymentUrl, showState } from './shared.js';

const main = document.querySelector('[data-confirmation-config]');
if (main) setUp(main);

function setUp(main) {
  const config = JSON.parse(main.dataset.confirmationConfig);
  const asked = new URLSearchParams(window.location.search).get('payment');
  const status = ['paid', 'pending', 'failed'].includes(asked) ? asked : 'pending';
  showState([...main.querySelectorAll('[data-state]')], status);

  const state = readState();
  if (state?.ref) {
    main.querySelector('[data-ref]').textContent = state.ref;
    main.querySelector('[data-refline]').hidden = false;
  }

  // Retry goes back to the payment page for the saved seat option, with the same reference code.
  const retry = main.querySelector('[data-retry]');
  const again = state ? paymentUrl(config.links, config.refParam, state.seats, state.ref) : null;
  if (retry) {
    retry.disabled = !again;
    retry.addEventListener('click', () => {
      if (again) window.location.assign(again);
    });
  }

  // Paid: keep only what this page shows. Attendee details leave the browser
  // tab, and Register starts a fresh registration (with a new code) next time.
  if (status === 'paid' && state && !state.paid) {
    writeState({ v: 1, ref: state.ref, seats: state.seats, attendees: [], paid: true });
  }

  // Forward to a board: an email holding the address of the board page.
  const forward = main.querySelector('[data-forward]');
  if (forward) {
    const board = new URL(config.board, window.location.origin).href;
    const body = `${config.body}\n\n${board}`;
    forward.href = `mailto:?subject=${encodeURIComponent(config.subject)}&body=${encodeURIComponent(body)}`;
  }
}
