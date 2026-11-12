// 08 Questions and interest list (derived, not designed; qa/questions.md).
// Name and email are required; the rest is optional. Sends to the hosted form
// service, then shows the success or error state.
import { send, showError, clearFieldError, errorFor, isEmail, showState } from './shared.js';

const form = document.getElementById('ask');
if (form) setUp(form);

function setUp(form) {
  const endpoint = form.dataset.endpoint;
  const messages = JSON.parse(form.dataset.messages);
  const name = form.querySelector('#q-name');
  const email = form.querySelector('#q-email');
  const states = [...form.querySelectorAll('[data-state]')];
  const submit = form.querySelector('button[type="submit"]');

  form.addEventListener('input', (event) => {
    if (event.target.classList?.contains('inp')) clearFieldError(event.target);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!endpoint) return;
    [name, email].forEach(clearFieldError);
    showState(states, null);

    const problems = [];
    if (!name.value.trim()) problems.push([name, messages.name]);
    if (!isEmail(email)) problems.push([email, messages.email]); // also covers an empty email
    if (problems.length) {
      problems.forEach(([field, message]) => showError(field, errorFor(field), message));
      problems[0][0].focus();
      return;
    }

    const data = new FormData(form);
    // A filled honeypot is a bot: show success and send nothing.
    if (data.get('_gotcha')) {
      form.reset();
      showState(states, 'sent')?.focus();
      return;
    }
    const fields = {
      name: name.value.trim(),
      church: form.querySelector('#q-church').value.trim(),
      email: email.value.trim(),
      question: form.querySelector('#q-question').value.trim(),
      future_dates: form.querySelector('#q-future').checked ? 'yes' : 'no',
      _gotcha: '',
    };
    submit.disabled = true;
    const ok = await send(endpoint, fields);
    submit.disabled = false;
    if (ok) {
      form.reset();
      showState(states, 'sent')?.focus();
    } else {
      showState(states, 'send-error')?.focus(); // values stay so the person can try again
    }
  });
}
