// Register page behavior (HANDOFF-SPEC.md section 7).
// Parts not drawn in the design are marked "derived" and listed in qa/questions.md.
// State reaches the next page through sessionStorage (section 9 default).

const STORAGE_KEY = 'cfco:registration';
// Reference code alphabet: no 0, O, 1, I or L, so people can read it aloud or type it into a payment note.
const REF_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

const form = document.getElementById('reg');
if (form) setUp(form);

function setUp(form) {
  const messages = JSON.parse(form.dataset.messages || '{}');
  const reviewUrl = form.dataset.reviewUrl || '';
  const radios = [...form.querySelectorAll('input[name="seats"]')];
  const seatGroup = form.querySelector('[role="radiogroup"]');
  const seatError = document.getElementById('seats-err');
  const rows = [...form.querySelectorAll('[data-component="AttendeeRow"]')];
  const status = form.querySelector('[data-status]');
  const filledOut = status.querySelector('[data-filled]');
  const seatsOut = status.querySelector('[data-seats]');
  const addButton = form.querySelector('[data-add]');
  const helper = form.querySelector('[data-helper]');
  const summarySeats = form.querySelector('[data-sum="seats"]');
  const summaryPrice = form.querySelector('[data-sum="price"]');
  const org = form.querySelector('#org');
  const contact = form.querySelector('#contact');
  const task = form.querySelector('#task');
  const consent = form.querySelector('#consent');

  const fieldsOf = (row) => ({
    name: row.querySelector('input[type="text"]'),
    email: row.querySelector('input[type="email"]'),
    role: row.querySelector('select'),
  });
  const hasValue = (row) => {
    const f = fieldsOf(row);
    return Boolean(f.name.value.trim() || f.email.value.trim() || f.role.value);
  };

  let seats = null; // 1 or 3 once chosen
  let count = 1; // visible attendee rows; before a choice, one empty row (derived)
  let ref = null; // registration reference code, made on the first save

  /* ---------- restore ---------- */
  const saved = readState();
  if (saved) {
    ref = saved.ref || null;
    const radio = radios.find((r) => Number(r.value) === saved.seats);
    if (radio) radio.checked = true;
    org.value = saved.org || '';
    contact.value = saved.contact || '';
    (saved.attendees || []).slice(0, rows.length).forEach((a, k) => {
      const f = fieldsOf(rows[k]);
      f.name.value = a.name || '';
      f.email.value = a.email || '';
      f.role.value = a.role || '';
    });
    task.value = saved.question || '';
    consent.checked = Boolean(saved.consent);
  }
  const initial = radios.find((r) => r.checked);
  if (initial) {
    seats = Number(initial.value);
    count = seats;
  }
  render();

  /* ---------- render ---------- */
  function render() {
    rows.forEach((row, k) => {
      row.hidden = k >= count;
      row.querySelector('.rm').disabled = count <= 1; // Remove keeps at least one row
    });
    addButton.disabled = !(seats && count < seats); // Add is disabled when rows equal seats
    status.hidden = !seats; // derived: no status before a seat choice
    if (seats) {
      filledOut.textContent = String(rows.slice(0, count).filter(hasValue).length); // a row with any value counts
      seatsOut.textContent = String(seats);
    }
    helper.hidden = !(seats === 3 && count === 3); // derived: the designed helper text only fits this state
    const option = radios.find((r) => r.checked)?.closest('.srow');
    summarySeats.hidden = !option; // derived: Seats and Price rows wait for a choice
    summaryPrice.hidden = !option;
    if (option) {
      summarySeats.querySelector('dd').textContent = option.querySelector('.t').textContent;
      summaryPrice.querySelector('dd').textContent = option.querySelector('.p').textContent;
    }
  }

  /* ---------- seats, add, remove ---------- */
  radios.forEach((radio) =>
    radio.addEventListener('change', () => {
      seats = Number(radio.value);
      count = seats; // seat choice sets the row count; hidden rows keep their values (derived)
      clearError(seatGroup, seatError);
      rows.forEach(clearRowErrors);
      render();
    }),
  );

  addButton.addEventListener('click', () => {
    if (!seats || count >= seats) return;
    count += 1;
    render();
    fieldsOf(rows[count - 1]).name.focus();
  });

  rows.forEach((row, k) => {
    row.querySelector('.rm').addEventListener('click', () => {
      if (count <= 1) return;
      // Rows are positional: shift the later rows up, then clear and hide the last one.
      for (let j = k; j < count - 1; j += 1) copyRow(rows[j + 1], rows[j]);
      clearRow(rows[count - 1]);
      rows.slice(k, count).forEach(clearRowErrors);
      count -= 1;
      render();
      addButton.focus(); // derived: Add is enabled now and is the natural next step
    });
  });

  function copyRow(from, to) {
    const a = fieldsOf(from);
    const b = fieldsOf(to);
    b.name.value = a.name.value;
    b.email.value = a.email.value;
    b.role.value = a.role.value;
  }

  function clearRow(row) {
    const f = fieldsOf(row);
    f.name.value = '';
    f.email.value = '';
    f.role.value = '';
  }

  /* ---------- errors ---------- */
  const errorFor = (field) => document.getElementById(`${field.id}-err`);

  function showError(target, errorEl, message) {
    errorEl.querySelector('.err-msg').textContent = message;
    errorEl.hidden = false;
    target.setAttribute('aria-invalid', 'true');
    target.setAttribute('aria-describedby', errorEl.id);
  }

  function clearError(target, errorEl) {
    errorEl.hidden = true;
    errorEl.querySelector('.err-msg').textContent = '';
    target.removeAttribute('aria-invalid');
    target.removeAttribute('aria-describedby');
  }

  const clearFieldError = (field) => {
    const el = errorFor(field);
    if (el) clearError(field, el);
  };
  const clearRowErrors = (row) => Object.values(fieldsOf(row)).forEach(clearFieldError);

  // derived: a field's error clears as soon as it changes
  form.addEventListener('input', (event) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('inp')) clearFieldError(event.target);
    render();
  });

  /* ---------- validate on Continue ---------- */
  // Browser email syntax plus a dot in the domain (derived), so "name@church" is caught.
  const isEmail = (input) => !input.validity.typeMismatch && /@[^@\s]+\.[^@\s]+$/.test(input.value.trim());

  function validate() {
    const problems = [];
    const add = (field, message) => problems.push({ target: field, error: errorFor(field), message, focus: field });
    if (!seats) problems.push({ target: seatGroup, error: seatError, message: messages.seats, focus: radios[0] });
    if (!org.value.trim()) add(org, messages.org);
    if (!contact.value.trim()) add(contact, messages.contact);
    const visible = rows.slice(0, count);
    if (!visible.some(hasValue)) add(fieldsOf(visible[0]).name, messages.name); // derived: at least one attendee
    visible.forEach((row) => {
      if (!hasValue(row)) return; // empty rows are unfilled seats
      const f = fieldsOf(row);
      if (!f.name.value.trim()) add(f.name, messages.name);
      if (!f.email.value.trim()) add(f.email, messages.emailMissing); // the one designed error
      else if (!isEmail(f.email)) add(f.email, messages.emailInvalid);
      if (!f.role.value) add(f.role, messages.role);
    });
    return problems;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError(seatGroup, seatError);
    [org, contact].forEach(clearFieldError);
    rows.forEach(clearRowErrors);

    const problems = validate();
    if (problems.length) {
      problems.forEach((p) => showError(p.target, p.error, p.message));
      problems[0].focus.focus(); // move focus to the first invalid field
      return;
    }

    ref = ref || makeRef();
    const state = {
      v: 1,
      ref,
      seats,
      org: org.value.trim(),
      contact: contact.value.trim(),
      attendees: rows
        .slice(0, count)
        .filter(hasValue)
        .map((row) => {
          const f = fieldsOf(row);
          return { name: f.name.value.trim(), email: f.email.value.trim(), role: f.role.value };
        }),
      question: task.value.trim(),
      consent: consent.checked,
      savedAt: new Date().toISOString(),
    };
    writeState(state);
    form.dataset.saved = state.ref;
    // Stage 1: the review page does not exist yet, so reviewUrl is empty and nothing navigates.
    if (reviewUrl) window.location.assign(reviewUrl);
  });
}

/* ---------- helpers ---------- */
function makeRef(length = 6) {
  const out = [];
  const byte = new Uint8Array(1);
  const limit = 256 - (256 % REF_ALPHABET.length); // reject bytes that would bias the pick
  while (out.length < length) {
    crypto.getRandomValues(byte);
    if (byte[0] < limit) out.push(REF_ALPHABET[byte[0] % REF_ALPHABET.length]);
  }
  return out.join('');
}

function readState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const state = raw ? JSON.parse(raw) : null;
    return state && state.v === 1 ? state : null;
  } catch {
    return null;
  }
}

function writeState(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
