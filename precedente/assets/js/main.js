
const toggle = document.querySelector('.menu-toggle');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Chiudi' : 'Menu';
  document.body.classList.toggle('menu-open', open);
});
const reveal = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); reveal.unobserve(e.target); }
});
document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));
const video = document.querySelector('.hero video');
const pause = document.querySelector('.hero__pause');
if (video && pause) {
  const sync = () => { pause.textContent = video.paused ? 'Play' : 'Pausa'; };
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  pause.addEventListener('click', () => (video.paused ? video.play() : video.pause()));
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) video.play().catch(() => {});
}
document.querySelectorAll('.slider').forEach(slider => {
  const imgs = [...slider.children];
  const half = e => e.clientX < slider.getBoundingClientRect().left + slider.clientWidth / 2;
  slider.addEventListener('mousemove', e => slider.classList.toggle('is-prev', half(e)));
  slider.addEventListener('click', e => {
    const offsets = imgs.map(img => img.offsetLeft - imgs[0].offsetLeft);
    const x = slider.scrollLeft;
    const max = slider.scrollWidth - slider.clientWidth;
    const left = half(e)
      ? (x <= 1 ? max : offsets.findLast(o => o < x - 1) ?? 0)
      : (x >= max - 1 ? 0 : Math.min(offsets.find(o => o > x + 1) ?? max, max));
    slider.scrollTo({ left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
});
