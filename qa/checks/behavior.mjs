// Extra check: Register behavior (HANDOFF-SPEC.md section 7, including the
// derived parts listed in qa/questions.md). Drives the built page through
// seat changes, add and remove, every validation message, error clearing,
// the saved state and its reference code, and restore on reload.
import { TARGET, server, browser, open, save } from './lib/common.mjs';
import { CONTINUE } from './fixtures/register.mjs';

if (TARGET === 'design') {
  save('behavior', { status: 'not run', summary: 'the artboards have no behavior' });
  process.exit(0);
}

const srv = await server();
const br = await browser();
const { context, page } = await open(br, srv.url, { width: 1440, path: '/register/' });
const steps = [];
const expect = (name, actual, wanted) => {
  const ok = JSON.stringify(actual) === JSON.stringify(wanted);
  steps.push({ name, ok, actual, wanted });
};

const ui = () =>
  page.evaluate(() => {
    const vis = (el) => Boolean(el && el.checkVisibility());
    const q = (s) => document.querySelector(s);
    return {
      checked: q('input[name="seats"]:checked')?.value ?? null,
      rows: [...document.querySelectorAll('[data-component="AttendeeRow"]')].filter(vis).length,
      status: vis(q('[data-status]')) ? q('[data-status]').textContent.replace(/\s+/g, ' ').trim() : null,
      helper: vis(q('[data-helper]')),
      addDisabled: q('[data-add]').disabled,
      summarySeats: vis(q('[data-sum="seats"]')) ? q('[data-sum="seats"] dd').textContent : null,
      summaryPrice: vis(q('[data-sum="price"]')) ? q('[data-sum="price"] dd').textContent : null,
      removeDisabled: [...document.querySelectorAll('.rm')].filter(vis).map((b) => b.disabled),
      focus: document.activeElement && document.activeElement !== document.body ? document.activeElement.id || document.activeElement.textContent.trim() : null,
    };
  });
const errorOf = (id) =>
  page.evaluate((fieldId) => {
    const el = document.getElementById(`${fieldId}-err`);
    const field = document.getElementById(fieldId);
    return el && !el.hidden ? { text: el.textContent.trim(), invalid: field?.getAttribute('aria-invalid') ?? null, describedby: field?.getAttribute('aria-describedby') ?? null } : null;
  }, id);

// 1. First load
expect('first load', await ui(), {
  checked: null, rows: 1, status: null, helper: false, addDisabled: true, summarySeats: null, summaryPrice: null, removeDisabled: [true], focus: null,
});

// 2. Three seats
await page.check('#seat-3');
const three = await ui();
expect('three seats: rows, status, helper, summary', { ...three, focus: null }, {
  checked: '3', rows: 3, status: '0 of 3 seats filled', helper: true, addDisabled: true,
  summarySeats: 'Three seats for your office', summaryPrice: '[3-SEAT PRICE]', removeDisabled: [false, false, false], focus: null,
});

// 3. Status counts rows with any value
await page.fill('#n1', 'Test One');
await page.selectOption('#r2', 'Pastor');
expect('status counts rows with any value', (await ui()).status, '2 of 3 seats filled');

// 4. Remove row 1: later rows shift up, Add enables and takes focus
await page.click('button[aria-label="Remove attendee 1"]');
const afterRemove = await ui();
expect('remove: two rows, Add enabled and focused, helper hidden', [afterRemove.rows, afterRemove.addDisabled, afterRemove.focus, afterRemove.helper], [2, false, 'Add another attendee', false]);
expect('remove: row 2 moved up', await page.evaluate(() => [document.getElementById('n1').value, document.getElementById('r1').value]), ['', 'Pastor']);

// 5. Add brings a row back and focuses its name
await page.click('[data-add]');
const afterAdd = await ui();
expect('add: three rows, focus on new name field', [afterAdd.rows, afterAdd.focus, afterAdd.addDisabled], [3, 'n3', true]);

// 6. One seat hides rows; three seats brings their values back
await page.fill('#n2', 'Kept Value');
await page.check('#seat-1');
const one = await ui();
expect('one seat: one row, summary, no helper', [one.rows, one.status, one.summarySeats, one.summaryPrice, one.helper, one.removeDisabled], [1, '1 of 1 seats filled', 'One seat', '[SEAT PRICE]', false, [true]]);
await page.check('#seat-3');
expect('three again: hidden row kept its value', await page.inputValue('#n2'), 'Kept Value');

// 7. Messages on Continue
await page.reload({ waitUntil: 'networkidle' });
await page.click(CONTINUE);
expect('no seats chosen', await errorOf('seats'), { text: 'Choose how many seats.', invalid: null, describedby: null });
expect('seat group marked invalid', await page.evaluate(() => [document.querySelector('[role=radiogroup]').getAttribute('aria-invalid'), document.activeElement.id]), ['true', 'seat-1']);
expect('organization required', (await errorOf('org'))?.text, 'Add your organization name.');
expect('contact required', (await errorOf('contact'))?.text, 'Add a contact person.');
expect('at least one attendee', (await errorOf('n1'))?.text, 'Add a name.');

await page.check('#seat-3');
expect('choosing seats clears the seat error', await errorOf('seats'), null);
await page.fill('#org', 'Test Church');
expect('typing clears the field error', await errorOf('org'), null);
await page.fill('#contact', 'Test Contact');
await page.fill('#e1', 'name@church');
await page.click(CONTINUE);
expect('row with only an email', [(await errorOf('n1'))?.text, (await errorOf('e1'))?.text, (await errorOf('r1'))?.text], ['Add a name.', 'Enter a valid email.', 'Choose a role.']);
expect('focus on first invalid field', await page.evaluate(() => document.activeElement.id), 'n1');
expect('empty rows are allowed', [await errorOf('n2'), await errorOf('n3')], [null, null]);
expect('error linked to field', await errorOf('e1'), { text: 'Enter a valid email.', invalid: 'true', describedby: 'e1-err' });

// 8. Valid Continue saves state; Stage 1 does not navigate
await page.fill('#n1', 'Test Person');
await page.fill('#e1', 'test.person@church.org');
await page.selectOption('#r1', 'Finance');
await page.fill('#task', 'Bulletins');
await page.check('#consent');
const before = page.url();
await page.click(CONTINUE);
await page.waitForTimeout(300);
const state = await page.evaluate(() => JSON.parse(sessionStorage.getItem('cfco:registration')));
expect('no navigation in Stage 1', page.url(), before);
expect('saved state shape', state && { v: state.v, seats: state.seats, org: state.org, contact: state.contact, attendees: state.attendees, question: state.question, consent: state.consent }, {
  v: 1, seats: 3, org: 'Test Church', contact: 'Test Contact', attendees: [{ name: 'Test Person', email: 'test.person@church.org', role: 'Finance' }], question: 'Bulletins', consent: true,
});
expect('reference code: 6 characters, no lookalikes', /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/.test(state?.ref ?? ''), true);

// 9. Restore on reload, same reference code on the next save
await page.reload({ waitUntil: 'networkidle' });
const restored = await ui();
expect('restore: seats and rows', [restored.checked, restored.rows, restored.status], ['3', 3, '1 of 3 seats filled']);
expect('restore: values', await page.evaluate(() => ['org', 'contact', 'n1', 'e1', 'r1', 'task'].map((id) => document.getElementById(id).value).concat(document.getElementById('consent').checked)), [
  'Test Church', 'Test Contact', 'Test Person', 'test.person@church.org', 'Finance', 'Bulletins', true,
]);
await page.click(CONTINUE);
await page.waitForTimeout(200);
expect('reference code is stable', await page.evaluate(() => JSON.parse(sessionStorage.getItem('cfco:registration')).ref), state?.ref);

await context.close();
await br.close();
await srv.close();

const failed = steps.filter((s) => !s.ok);
save('behavior', {
  status: failed.length ? 'fail' : 'pass',
  summary: `${steps.length - failed.length} of ${steps.length} behavior assertions hold`,
  failed,
  steps,
});
