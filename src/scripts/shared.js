// Helpers shared by Register, Review, Confirmation and Questions.
// The registration lives in sessionStorage (HANDOFF-SPEC.md section 9 default):
// it survives moving between pages and the trip to the payment page in the
// same tab, and is gone when the tab closes.

export const STORAGE_KEY = 'cfco:registration';

export function readState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const state = raw ? JSON.parse(raw) : null;
    return state && state.v === 1 ? state : null;
  } catch {
    return null;
  }
}

export function writeState(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

/* ---------- field errors (FormField: <p class="err" id="<field>-err">) ---------- */
export function showError(target, errorEl, message) {
  errorEl.querySelector('.err-msg').textContent = message;
  errorEl.hidden = false;
  target.setAttribute('aria-invalid', 'true');
  target.setAttribute('aria-describedby', errorEl.id);
}

export function clearError(target, errorEl) {
  errorEl.hidden = true;
  errorEl.querySelector('.err-msg').textContent = '';
  target.removeAttribute('aria-invalid');
  target.removeAttribute('aria-describedby');
}

export const errorFor = (field) => document.getElementById(`${field.id}-err`);

export const clearFieldError = (field) => {
  const el = errorFor(field);
  if (el) clearError(field, el);
};

// Browser email syntax plus a dot in the domain (derived), so "name@church" is caught.
export const isEmail = (input) => !input.validity.typeMismatch && /@[^@\s]+\.[^@\s]+$/.test(input.value.trim());

/* ---------- hosted services ---------- */

/** True once a config value is a real address rather than a [PLACEHOLDER]. */
export const isLive = (value) => Boolean(value) && !value.startsWith('[');

/**
 * Send fields to a hosted form service as a URL-encoded POST, asking for JSON
 * so the service answers instead of redirecting. Any 2xx is success; anything
 * else, a network error or 10 seconds without an answer is a failure.
 */
export async function send(endpoint, fields, timeout = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: new URLSearchParams(fields),
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** The payment link for a seat option, with the reference code if the provider takes one. */
export function paymentUrl(links, refParam, seats, ref) {
  const link = links[String(seats)];
  if (!isLive(link)) return null;
  if (!refParam || !ref) return link;
  return `${link}${link.includes('?') ? '&' : '?'}${encodeURIComponent(refParam)}=${encodeURIComponent(ref)}`;
}

/** Show one state block and hide the others in the same group. */
export function showState(blocks, name) {
  for (const el of blocks) el.hidden = el.dataset.state !== name;
  return blocks.find((el) => el.dataset.state === name) ?? null;
}
