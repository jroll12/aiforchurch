// Test-only drivers for the Register page.
// The sample values come from design/register-c-*.dc.html, which shows one
// composite state. HANDOFF-SPEC.md section 7 calls them demo data that must
// not ship, and the guards check fails if any of them appear in dist/.

export const COMPOSITE = {
  seats: 3,
  org: 'Sample Community Church',
  contact: 'Sample Person A',
  attendees: [
    { name: 'Sample Person A', email: 'person.a@example.org', role: 'Administrator' },
    { name: 'Sample Person B', email: '', role: 'Communications' },
    { name: '', email: '', role: '' },
  ],
};

const continueButton = 'button:has-text("Continue to review")';

/**
 * The state the artboards show: three seats, two rows filled, the second
 * missing its email, the third empty, then Continue pressed so the one
 * designed error appears.
 */
export async function driveComposite(page) {
  await page.check('#seat-3');
  await page.fill('#org', COMPOSITE.org);
  await page.fill('#contact', COMPOSITE.contact);
  for (const [k, a] of COMPOSITE.attendees.entries()) {
    const i = k + 1;
    if (a.name) await page.fill(`#n${i}`, a.name);
    if (a.email) await page.fill(`#e${i}`, a.email);
    if (a.role) await page.selectOption(`#r${i}`, a.role);
  }
  await page.click(continueButton);
}

/** The most text at once: three rows, each started but incomplete, org and contact empty. */
export async function driveMaxContent(page) {
  await page.check('#seat-3');
  for (const i of [1, 2, 3]) await page.selectOption(`#r${i}`, 'Other');
  await page.click(continueButton);
}

/** A complete, valid registration. */
export async function driveValid(page) {
  await driveComposite(page);
  await page.fill('#e2', 'person.b@example.org');
  await page.click(continueButton);
}

export const CONTINUE = continueButton;
