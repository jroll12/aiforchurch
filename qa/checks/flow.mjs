// Stage 2 behavior: Register to Review to payment to Confirmation, and the
// Questions form (HANDOFF-SPEC.md section 7; derived parts in qa/questions.md).
// Runs on dist-mock/, the same site built by `npm run build:mock` with the
// form endpoints and payment links pointed at the mock services in
// lib/mock.mjs, so a real submission and redirect can be observed.
// The production build keeps placeholder URLs, so its buttons stay disabled.
import fs from 'node:fs';
import path from 'node:path';
import { TARGET, MOCK_DIST, MOUNTS, STATE, STORAGE_KEY, browser, save, seed } from './lib/common.mjs';
import { startServer } from './lib/server.mjs';
import { createMock } from './lib/mock.mjs';
import { CONTINUE } from './fixtures/register.mjs';
import { chromium } from 'playwright';

if (TARGET === 'design') {
  save('flow', { status: 'not run', summary: 'the artboards have no behavior' });
  process.exit(0);
}
if (!fs.existsSync(path.join(MOCK_DIST, 'index.html'))) {
  save('flow', { status: 'fail', summary: 'dist-mock/ is missing. Run `npm run build:mock` first.' });
  process.exit(1);
}

const mock = createMock();
const { server, url: base } = await startServer([['/__mock/', mock.handler], ...MOUNTS(MOCK_DIST)]);
const br = await browser();
const steps = [];
const expect = (name, actual, wanted) => {
  const ok = JSON.stringify(actual) === JSON.stringify(wanted);
  steps.push({ name, ok, actual, wanted });
};
const hosts = new Set();
const fresh = async (state) => {
  const context = await br.newContext({ viewport: { width: 1440, height: 900 } });
  if (state) await seed(context, state);
  context.on('request', (r) => {
    if (/^https?:/.test(r.url())) hosts.add(new URL(r.url()).hostname);
  });
  return { context, page: await context.newPage() };
};
const go = (page, p) => page.goto(base + p, { waitUntil: 'networkidle' });
const shownStates = (page) => page.evaluate(() => [...document.querySelectorAll('[data-state]')].filter((el) => el.checkVisibility()).map((el) => el.dataset.state));
const stored = (page) => page.evaluate((key) => JSON.parse(sessionStorage.getItem(key) || 'null'), STORAGE_KEY);
const text = (page, sel) => page.evaluate((s) => document.querySelector(s)?.textContent.replace(/\s+/g, ' ').trim() ?? null, sel);
const failNext = () => fetch(`${base}/__mock/fail`, { method: 'POST' });

/* ---------- 1. Register to Review ---------- */
{
  const { context, page } = await fresh();
  await go(page, '/register/');
  await page.check('#seat-3');
  await page.fill('#org', STATE.org);
  await page.fill('#contact', STATE.contact);
  for (const [k, a] of STATE.attendees.entries()) {
    await page.fill(`#n${k + 1}`, a.name);
    await page.fill(`#e${k + 1}`, a.email);
    await page.selectOption(`#r${k + 1}`, a.role);
  }
  await page.fill('#task', STATE.question);
  await page.check('#consent');
  await page.click(CONTINUE);
  await page.waitForURL('**/register/review/');
  expect('Register: valid Continue opens Review', new URL(page.url()).pathname, '/register/review/');
  const saved = await stored(page);

  const body = await text(page, 'main');
  expect('Review: shows organization, contact, every attendee and the question', [STATE.org, STATE.contact, STATE.question, ...STATE.attendees.flatMap((a) => [a.name, a.email, a.role])].every((s) => body.includes(s)), true);
  expect('Review: seats and total from the chosen option', [await text(page, '[data-sum="seats"] dd'), await text(page, '[data-sum="total"] dd')], ['Three seats for your office', '[3-SEAT PRICE]']);
  expect('Review: date, venue and refund policy', ['[DATE]', '[VENUE]', '[REFUND POLICY]'].every((s) => body.includes(s)), true);
  expect('Review: one Edit link per Register section', await page.$$eval('a[data-edit]', (as) => as.map((a) => new URL(a.href).pathname + new URL(a.href).hash)), ['/register/#s1', '/register/#s2', '/register/#s3', '/register/#s4']);
  expect('Review: no offline payment button while OFFLINE_PAYMENT is off', await page.locator('[data-pay-offline]').count(), 0);

  // Editing: back to Register, change seats, return; the total follows.
  await page.click('a[data-edit][href*="#s1"]');
  await page.waitForURL('**/register/#s1');
  expect('Edit: Register restores the saved values', await page.evaluate(() => [document.querySelector('input[name="seats"]:checked')?.value, document.getElementById('org').value, document.getElementById('n2').value]), ['3', STATE.org, STATE.attendees[1].name]);
  await page.check('#seat-1');
  await page.click(CONTINUE);
  await page.waitForURL('**/register/review/');
  expect('Edit: total updated after a seat change', [await text(page, '[data-sum="seats"] dd'), await text(page, '[data-sum="total"] dd'), await page.locator('[data-review="attendees"] li').count()], ['One seat', '[SEAT PRICE]', 1]);
  expect('Edit: the reference code survives editing', (await stored(page)).ref, saved.ref);

  // Payment: a failed send shows the error and keeps everything; the retry goes through.
  await failNext();
  await page.click('button[data-pay]');
  await page.locator('[data-state="send-error"]').waitFor({ state: 'visible' });
  expect('Pay: failed send shows the error state and stays on Review', [await shownStates(page), new URL(page.url()).pathname, await page.locator('button[data-pay]').isEnabled()], [['send-error'], '/register/review/', true]);
  expect('Pay: nothing recorded on failure', mock.submissions.length, 0);
  await page.click('button[data-pay]');
  await page.waitForURL('**/__mock/pay/**');
  const payUrl = new URL(page.url());
  expect('Pay: goes to the chosen option\'s payment link with the reference code', [payUrl.pathname, payUrl.searchParams.get('client_reference_id')], ['/__mock/pay/one', saved.ref]);
  const sub = mock.submissions[0];
  expect('Pay: registration sent before payment, URL-encoded, asking for JSON', [sub?.form, /x-www-form-urlencoded/.test(sub?.contentType), /application\/json/.test(sub?.accept)], ['registration', true, true]);
  expect('Pay: payload carries the reference code and the registration', sub && {
    ref: sub.fields.ref, seats: sub.fields.seats, option: sub.fields.option, price: sub.fields.price, organization: sub.fields.organization, contact: sub.fields.contact,
    a1: [sub.fields.attendee_1_name, sub.fields.attendee_1_email, sub.fields.attendee_1_role], a2: sub.fields.attendee_2_name ?? null,
    question: sub.fields.question, consent: sub.fields.consent, payment: sub.fields.payment, honeypot: sub.fields._gotcha,
    sentAt: /^\d{4}-\d{2}-\d{2}T/.test(sub.fields.sent_at ?? ''),
  }, {
    ref: saved.ref, seats: '1', option: 'One seat', price: '[SEAT PRICE]', organization: STATE.org, contact: STATE.contact,
    a1: [STATE.attendees[0].name, STATE.attendees[0].email, STATE.attendees[0].role], a2: null,
    question: STATE.question, consent: 'yes', payment: 'online', honeypot: '',
    sentAt: true,
  });
  await context.close();
}

/* ---------- 2. Review with nothing saved ---------- */
{
  const { context, page } = await fresh();
  await go(page, '/register/review/');
  await page.waitForURL('**/register/');
  expect('Review: with nothing saved, goes back to Register', new URL(page.url()).pathname, '/register/');
  await context.close();
}

/* ---------- 3. Confirmation states ---------- */
{
  const { context, page } = await fresh(STATE);
  await go(page, '/confirmation/?payment=paid');
  expect('Confirmation paid: one state, reference code shown', [await shownStates(page), await text(page, '[data-ref]')], [['paid'], STATE.ref]);
  const after = await stored(page);
  expect('Confirmation paid: attendee details cleared, reference code kept', [after?.ref, after?.attendees?.length, after?.org ?? ''], [STATE.ref, 0, '']);
  expect('Confirmation: no calendar link while the date is a placeholder', await page.locator('a[data-ics]').count(), 0);
  const forward = await page.getAttribute('a[data-forward]', 'href');
  expect('Confirmation: forward link is an email holding the board page address', forward?.startsWith('mailto:') && decodeURIComponent(forward).includes(`${base}/board/`), true);
  await context.close();
}
{
  const { context, page } = await fresh(STATE);
  await go(page, '/confirmation/');
  expect('Confirmation with no payment status: pending', await shownStates(page), ['pending']);
  await go(page, '/confirmation/?payment=failed');
  expect('Confirmation failed: one state with a retry button', [await shownStates(page), await page.locator('button[data-retry]').isVisible()], [['failed'], true]);
  await page.click('button[data-retry]');
  await page.waitForURL('**/__mock/pay/**');
  const u = new URL(page.url());
  expect('Confirmation retry: back to the payment link with the reference code', [u.pathname, u.searchParams.get('client_reference_id')], ['/__mock/pay/three', STATE.ref]);
  await context.close();
}
{
  const { context, page } = await fresh();
  await go(page, '/confirmation/?payment=paid');
  expect('Confirmation with nothing saved: still renders, no reference code', [await shownStates(page), await page.locator('[data-ref]').count() ? await page.locator('[data-ref]').first().isVisible() : false], [['paid'], false]);
  await context.close();
}

/* ---------- 4. Questions form ---------- */
{
  const { context, page } = await fresh();
  await go(page, '/questions/');
  const errorOf = (id) => page.evaluate((fid) => {
    const f = document.getElementById(fid);
    const ids = (f.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    const msg = ids.map((i) => document.getElementById(i)).filter((e) => e && e.checkVisibility()).map((e) => e.textContent.trim()).join(' ');
    return f.getAttribute('aria-invalid') === 'true' ? msg : null;
  }, id);
  await page.click('form#ask button[type="submit"]');
  expect('Questions: name and email required, errors linked, focus on the first', [await errorOf('q-name'), await errorOf('q-email'), await page.evaluate(() => document.activeElement.id)], ['Add a name.', 'Enter a valid email.', 'q-name']);
  await page.fill('#q-name', 'Test Person');
  expect('Questions: typing clears the error', await errorOf('q-name'), null);
  await page.fill('#q-email', 'name@church');
  await page.click('form#ask button[type="submit"]');
  expect('Questions: malformed email', await errorOf('q-email'), 'Enter a valid email.');
  await page.fill('#q-email', 'test.person@church.org');
  await page.fill('#q-church', 'Test Church');
  await page.fill('#q-question', 'Bulletins');
  await page.check('#q-future');

  await failNext();
  await page.click('form#ask button[type="submit"]');
  await page.locator('[data-state="send-error"]').waitFor({ state: 'visible' });
  expect('Questions: failed send shows the error state and keeps the values', [await shownStates(page), await page.inputValue('#q-question')], [['send-error'], 'Bulletins']);

  const before = mock.submissions.length;
  await page.click('form#ask button[type="submit"]');
  await page.locator('[data-state="sent"]').waitFor({ state: 'visible' });
  const sub = mock.submissions[before];
  expect('Questions: sent with every field', sub && { form: sub.form, ...sub.fields }, { form: 'questions', name: 'Test Person', church: 'Test Church', email: 'test.person@church.org', question: 'Bulletins', future_dates: 'yes', _gotcha: '' });
  expect('Questions: success state replaces the error', await shownStates(page), ['sent']);
  await context.close();
}
{
  const { context, page } = await fresh();
  await go(page, '/questions/');
  await page.fill('#q-name', 'Bot');
  await page.fill('#q-email', 'bot@example.com');
  await page.evaluate(() => {
    document.querySelector('form#ask input[name="_gotcha"]').value = 'spam';
  });
  const before = mock.submissions.length;
  await page.click('form#ask button[type="submit"]');
  await page.locator('[data-state="sent"]').waitFor({ state: 'visible' });
  expect('Questions: a filled honeypot shows success but sends nothing', mock.submissions.length, before);
  await context.close();
}

/* ---------- 5. Audit fixes (qa/audit-report.md) ---------- */
{
  // Seat count with no matching option: back to Register instead of a broken page.
  const { context, page } = await fresh({ ...STATE, seats: 2 });
  await go(page, '/register/review/');
  await page.waitForURL('**/register/');
  expect('Review: a saved seat count with no matching option goes back to Register', new URL(page.url()).pathname, '/register/');
  await context.close();
}
{
  // Storage blocked: Continue stays on Register and keeps what was typed.
  const { context, page } = await fresh();
  await context.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error('blocked');
    };
  });
  await go(page, '/register/');
  await page.check('#seat-1');
  await page.fill('#org', STATE.org);
  await page.fill('#contact', STATE.contact);
  await page.fill('#n1', STATE.attendees[0].name);
  await page.fill('#e1', STATE.attendees[0].email);
  await page.selectOption('#r1', STATE.attendees[0].role);
  await page.click(CONTINUE);
  await page.waitForTimeout(500);
  expect('Register: with storage blocked, Continue stays and keeps the values', [new URL(page.url()).pathname, await page.inputValue('#org'), await page.inputValue('#n1')], ['/register/', STATE.org, STATE.attendees[0].name]);
  await context.close();
}
{
  // Without JavaScript, neither form can post the visitor's details to the site's own address.
  const context = await br.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const page = await context.newPage();
  await go(page, '/register/');
  const reg = await page.locator('button[type="submit"]').isDisabled();
  await go(page, '/questions/');
  const ask = await page.locator('form#ask button[type="submit"]').isDisabled();
  expect('No JavaScript: Continue and Send are disabled, so nothing posts', [reg, ask], [true, true]);
  await context.close();
}
{
  // Back from the payment page: the back/forward cache must not leave Review stale or disabled.
  // Needs full Chromium with that cache on, and a server that allows caching.
  const cached = await startServer([['/__mock/', mock.handler], ...MOUNTS(MOCK_DIST)], 0, { noStore: false });
  const full = await chromium.launch({ channel: 'chromium', ignoreDefaultArgs: ['--disable-back-forward-cache'] });
  const context = await full.newContext({ viewport: { width: 1440, height: 900 } });
  await seed(context, STATE);
  const page = await context.newPage();
  await page.goto(`${cached.url}/register/review/`, { waitUntil: 'networkidle' });
  await page.click('button[data-pay]');
  await page.waitForURL('**/__mock/pay/**');
  // While away, the saved registration changes (as an edit in another visit to Register would).
  await page.evaluate((key) => {
    const st = JSON.parse(sessionStorage.getItem(key));
    sessionStorage.setItem(key, JSON.stringify({ ...st, seats: 1 }));
  }, STORAGE_KEY);
  await page.goBack({ waitUntil: 'commit' });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(300);
  expect('Back from payment: Review is current and the pay button works', [await text(page, '[data-sum="seats"] dd'), await page.locator('button[data-pay]').isEnabled()], ['One seat', true]);
  await full.close();
  cached.server.close();
}

expect('Network: only this server and Google Fonts during the whole flow', [...hosts].filter((h) => !['127.0.0.1', 'fonts.googleapis.com', 'fonts.gstatic.com'].includes(h)), []);

await br.close();
server.close();

const failed = steps.filter((s) => !s.ok);
save('flow', {
  status: failed.length ? 'fail' : 'pass',
  summary: `${steps.length - failed.length} of ${steps.length} flow assertions hold on dist-mock/`,
  failed,
  steps,
  submissions: mock.submissions,
});
