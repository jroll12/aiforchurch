// Check 3: contrast (SITE-KICKOFF-PROMPT.md check 3).
// A. Token pairs computed from tokens.css: the five pairs in HANDOFF-SPEC.md
//    section 3 must reproduce the spec's numbers; every new pair is listed.
// B. A walk of every visible text element (and placeholder) on the pages,
//    measuring the colors actually rendered against their background.
// C. Direction C rule (HANDOFF-SPEC.md section 2): the accent appears only on
//    interactive elements.
import { BREAKPOINT, targets, server, browser, open, save, readTokens, parseColor, contrast, installDescribe, revealStates } from './lib/common.mjs';
import { driveComposite } from './fixtures/register.mjs';

const tokens = readTokens();
const color = (name) => parseColor(tokens[name]);
const round = (x) => Math.round(x * 100) / 100;

const SPEC = [
  { pair: 'ink on white', fg: 'ink', bg: 'ground', spec: 18.88 },
  { pair: 'ink2 on white', fg: 'ink2', bg: 'ground', spec: 8.86 },
  { pair: 'accent on white, and white on accent', fg: 'accent', bg: 'ground', spec: 5.18 },
  { pair: 'err on white', fg: 'err', bg: 'ground', spec: 6.57 },
  { pair: 'ink2 on tint', fg: 'ink2', bg: 'tint', spec: 8.05 },
];
const NEW = [
  { pair: 'white on ink (ProgressSteps current step)', fg: 'ground', bg: 'ink', min: 4.5 },
  { pair: 'ink on tint (selected seat row text)', fg: 'ink', bg: 'tint', min: 4.5 },
  { pair: 'accent on tint (radio control in the selected seat row, non-text)', fg: 'accent', bg: 'tint', min: 3 },
  { pair: 'white on accent-hover (button hover)', fg: 'ground', bg: 'accent-hover', min: 4.5 },
  { pair: 'ink2 on disabled-bg (disabled button text and icon)', fg: 'ink2', bg: 'disabled-bg', min: 4.5 },
  { pair: 'ink on white (input, menu and remove borders, focus ring, non-text)', fg: 'ink', bg: 'ground', min: 3 },
  { pair: 'err on white (3px error border, non-text)', fg: 'err', bg: 'ground', min: 3 },
];

const tokenPairs = [
  ...SPEC.map((p) => {
    const ratio = round(contrast(color(p.fg), color(p.bg)));
    return { ...p, ratio, ok: Math.abs(ratio - p.spec) <= 0.01 && ratio >= 4.5 };
  }),
  ...NEW.map((p) => {
    const ratio = round(contrast(color(p.fg), color(p.bg)));
    return { ...p, ratio, ok: ratio >= p.min };
  }),
];

function walk(page, accents) {
  return page.evaluate((accentList) => {
    const parse = (s) => {
      const m = s && s.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    };
    const lum = ({ r, g, b }) => {
      const f = (v) => {
        const s = v / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const ratio = (a, b) => {
      const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
      return (x + 0.05) / (y + 0.05);
    };
    const blend = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
    const hex = (c) => `#${[c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
    const bgOf = (el) => {
      for (let e = el; e; e = e.parentElement) {
        const c = parse(getComputedStyle(e).backgroundColor);
        if (c && c.a === 1) return c;
      }
      return { r: 255, g: 255, b: 255, a: 1 };
    };
    const hidden = (el) =>
      !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) || Boolean(el.closest('details:not([open]) > :not(summary)'));

    const texts = [];
    for (const el of document.querySelectorAll('body *')) {
      if (hidden(el)) continue;
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.data.trim());
      const field = el.matches('input:not([type=radio]):not([type=checkbox]):not([type=hidden]), textarea, select');
      if (!own && !field) continue;
      const cs = getComputedStyle(el);
      const bg = bgOf(el);
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      const record = (kind, colorValue, sample) => {
        const fg = blend(parse(colorValue), bg);
        texts.push({ el: window.__describe(el), kind, fg: hex(fg), bg: hex(bg), ratio: Math.round(ratio(fg, bg) * 100) / 100, min: large ? 3 : 4.5, sample });
      };
      if (own) record('text', cs.color, el.textContent.trim().slice(0, 40));
      else if (el.value || el.tagName === 'SELECT') record('field value', cs.color, (el.value || '').slice(0, 40));
      if (field && el.placeholder && !el.value) record('placeholder', getComputedStyle(el, '::placeholder').color, el.placeholder);
    }

    const isAccent = (s) => {
      const c = parse(s);
      return Boolean(c && c.a > 0 && accentList.some((a) => a.r === c.r && a.g === c.g && a.b === c.b));
    };
    const interactive = 'a[href], button, input, select, textarea, summary';
    const accentMisuse = [];
    for (const el of document.querySelectorAll('body *')) {
      if (hidden(el)) continue;
      const cs = getComputedStyle(el);
      const uses = [];
      const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.data.trim());
      if (isAccent(cs.color) && (ownText || el instanceof SVGElement)) uses.push('color');
      if (isAccent(cs.backgroundColor)) uses.push('background');
      if (['Top', 'Right', 'Bottom', 'Left'].some((s) => parseFloat(cs[`border${s}Width`]) > 0 && isAccent(cs[`border${s}Color`]))) uses.push('border');
      if (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0 && isAccent(cs.outlineColor)) uses.push('outline');
      if (uses.length && !el.closest(interactive)) accentMisuse.push({ el: window.__describe(el), uses });
    }
    return { texts, accentMisuse };
  }, accents);
}

const srv = await server();
const br = await browser();
const accents = [color('accent'), color('accent-hover')];
const samples = [];

for (const t of targets()) {
  const { context, page } = await open(br, srv.url, t);
  await installDescribe(page);
  samples.push({ screen: t.screen, width: t.width, state: 'default', ...(await walk(page, accents)) });
  if (t.derived && (await revealStates(page))) {
    samples.push({ screen: t.screen, width: t.width, state: 'all states shown', ...(await walk(page, accents)) });
  }
  if (t.kind === 'built' && t.screen === 'register') {
    await driveComposite(page);
    samples.push({ screen: t.screen, width: t.width, state: 'composite with error', ...(await walk(page, accents)) });
  }
  if (t.kind === 'built' && t.width < BREAKPOINT) {
    const menu = page.locator('button[aria-label="Open menu"]');
    if (await menu.count()) {
      await menu.click();
      samples.push({ screen: t.screen, width: t.width, state: 'menu open', ...(await walk(page, accents)) });
    }
  }
  await context.close();
}

const pairs = new Map();
for (const s of samples) {
  for (const x of s.texts) {
    const key = `${x.fg} on ${x.bg} (min ${x.min})`;
    const entry = pairs.get(key) ?? { pair: key, fg: x.fg, bg: x.bg, min: x.min, ratio: x.ratio, count: 0, example: `${s.screen}@${s.width}: ${x.el}` };
    entry.count += 1;
    entry.ratio = Math.min(entry.ratio, x.ratio);
    pairs.set(key, entry);
  }
}
const renderedPairs = [...pairs.values()].sort((a, b) => a.ratio - b.ratio);
const textFailures = samples.flatMap((s) =>
  s.texts.filter((x) => x.ratio < x.min).map((x) => ({ screen: s.screen, width: s.width, state: s.state, ...x })),
);
const accentMisuse = samples.flatMap((s) => s.accentMisuse.map((x) => ({ screen: s.screen, width: s.width, state: s.state, ...x })));
const tokenFailures = tokenPairs.filter((p) => !p.ok);

save('contrast', {
  status: tokenFailures.length || textFailures.length || accentMisuse.length ? 'fail' : 'pass',
  summary: `${tokenPairs.length} token pairs (${tokenFailures.length} off), ${renderedPairs.length} rendered color pairs, ${textFailures.length} text below minimum, ${accentMisuse.length} accent misuses`,
  tokenPairs,
  renderedPairs,
  textFailures: textFailures.slice(0, 40),
  accentMisuse: accentMisuse.slice(0, 40),
});

await br.close();
await srv.close();
