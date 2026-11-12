// 06 Review order (derived, not designed; qa/questions.md lists each decision).
// Shows the registration Register saved, then sends it to the hosted form
// service and goes to the hosted payment page for the chosen seat option.
// Sending first means every payment has a registration behind it; both carry
// the reference code, so they can be matched by hand.
import { readState, send, paymentUrl, showState } from './shared.js';

const main = document.querySelector('[data-review-config]');
if (main) setUp(main);

// Coming back from the payment page with the browser's Back button can restore this page from the
// back/forward cache with its buttons still disabled, or show an older seat choice. Reload so the
// page always reflects what is saved now (audit finding, qa/audit-report.md).
window.addEventListener('pageshow', (event) => {
  if (event.persisted) window.location.reload();
});

function setUp(main) {
  const config = JSON.parse(main.dataset.reviewConfig);
  const state = readState();
  // Nothing saved (a direct visit, or a finished registration): Review has nothing to show.
  if (!state || state.paid || !state.seats || !state.attendees?.length) {
    window.location.replace(config.register);
    return;
  }

  const option = config.options.find((o) => o.seats === state.seats);
  // A seat count with no matching option (options changed between deploys, or edited storage).
  if (!option) {
    window.location.replace(config.register);
    return;
  }
  const $ = (key) => main.querySelector(`[data-review="${key}"]`);
  $('option').textContent = option.title;
  $('description').textContent = option.description;
  $('price').textContent = option.price;
  $('org').textContent = state.org;
  $('contact').textContent = state.contact;

  const list = $('attendees');
  const template = $('attendee');
  for (const a of state.attendees) {
    const li = template.content.firstElementChild.cloneNode(true);
    li.querySelector('.nm').textContent = a.name;
    li.querySelector('.em').textContent = a.email;
    li.querySelector('.rl').textContent = a.role;
    list.append(li);
  }

  $('question').textContent = state.question || '';
  $('question-section').hidden = !state.question; // the question is optional; no empty section

  const fill = (key, value) => {
    const row = main.querySelector(`[data-sum="${key}"]`);
    row.querySelector('dd').textContent = value;
    row.hidden = false;
  };
  fill('seats', option.title);
  fill('total', option.price); // the total is the chosen option's price (qa/questions.md)

  const errors = [...main.querySelectorAll('[data-state]')];
  const buttons = [...main.querySelectorAll('[data-pay], [data-pay-offline]')];

  async function pay(payment) {
    if (!config.endpoint) return;
    showState(errors, null);
    buttons.forEach((b) => {
      b.disabled = true;
    });
    main.setAttribute('aria-busy', 'true');
    const ok = await send(config.endpoint, fields(state, option, payment));
    main.removeAttribute('aria-busy');
    if (ok) {
      const next = payment === 'offline' ? `${config.confirmation}?payment=pending` : paymentUrl(config.links, config.refParam, state.seats, state.ref);
      if (next) {
        window.location.assign(next);
        return;
      }
    }
    // Failed to send: show the error, keep everything, and let the same button try again.
    buttons.forEach((b) => {
      b.disabled = false;
    });
    showState(errors, 'send-error')?.focus();
  }

  main.querySelector('[data-pay]')?.addEventListener('click', () => pay('online'));
  main.querySelector('[data-pay-offline]')?.addEventListener('click', () => pay('offline'));
}

/** Flat, URL-encoded fields any hosted form service can store as columns. */
function fields(state, option, payment) {
  const out = {
    ref: state.ref,
    seats: String(state.seats),
    option: option.title,
    price: option.price,
    organization: state.org,
    contact: state.contact,
  };
  state.attendees.forEach((a, k) => {
    out[`attendee_${k + 1}_name`] = a.name;
    out[`attendee_${k + 1}_email`] = a.email;
    out[`attendee_${k + 1}_role`] = a.role;
  });
  out.question = state.question || '';
  out.consent = state.consent ? 'yes' : 'no';
  out.payment = payment;
  out.sent_at = new Date().toISOString(); // when a code was sent twice, the latest send is the one paid for
  out._gotcha = ''; // honeypot field name some services use; always empty from a person
  return out;
}
