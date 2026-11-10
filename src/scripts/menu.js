// Mobile menu: a disclosure button that shows and hides the main nav below
// 900px. The open state has no artboard (derived; see qa/questions.md).
const button = document.querySelector('.menu');
const nav = document.getElementById('site-nav');

if (button && nav) {
  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  const isOpen = () => button.getAttribute('aria-expanded') === 'true';

  button.addEventListener('click', () => setOpen(!isOpen()));
  nav.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
