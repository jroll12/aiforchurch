// Topic page progress (derived from design/topic-c-*): ticking a step updates
// "N of 4 steps done", the segments, and which step is current. The ticks are
// remembered in this browser only (localStorage); nothing leaves the device.
const list = document.querySelector('[data-component="StepList"]');
const bar = document.querySelector('[data-progress]');
if (list && bar) {
  const key = list.dataset.store;
  const items = [...list.querySelectorAll('.stp')];
  const boxes = items.map((li) => li.querySelector('input'));
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    boxes.forEach((b, k) => {
      b.checked = Boolean(saved[k]);
    });
  } catch {
    // storage blocked: the page still works, it just won't remember
  }
  const render = () => {
    const done = boxes.filter((b) => b.checked).length;
    const cur = boxes.findIndex((b) => !b.checked);
    items.forEach((li, k) => {
      li.classList.toggle('done', boxes[k].checked);
      li.classList.toggle('cur', k === cur);
      if (k === cur) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
      li.querySelector('.here').hidden = k !== cur;
    });
    const label = `${done} of ${boxes.length} steps done`;
    bar.querySelector('.pl').textContent = label;
    [...bar.querySelectorAll('.seg i')].forEach((seg, k) => {
      seg.className = boxes[k].checked ? 'd' : k === cur ? 'c' : '';
    });
  };
  boxes.forEach((b) =>
    b.addEventListener('change', () => {
      try {
        localStorage.setItem(key, JSON.stringify(boxes.map((x) => x.checked)));
      } catch {
        // ignore
      }
      render();
    }),
  );
  render();
}
