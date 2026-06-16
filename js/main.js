// ===== Year =====
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// ===== Sticky nav background on scroll =====
const nav = document.getElementById('nav');
const onScroll = () => { if (nav) nav.classList.toggle('scrolled', window.scrollY > 40); };
window.addEventListener('scroll', onScroll); onScroll();

// ===== Mobile menu =====
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Count-up stats =====
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const countEls = document.querySelectorAll('.count');
function runCount(el) {
  const to = parseInt(el.dataset.to, 10) || 0;
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  if (reduceMotion) { el.textContent = prefix + to + suffix; return; }
  const dur = 1500, start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(to * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + to + suffix;
  }
  requestAnimationFrame(tick);
}
if (countEls.length) {
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { runCount(e.target); cObs.unobserve(e.target); } });
  }, { threshold: 0.45 });
  countEls.forEach(el => {
    const prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
    el.textContent = prefix + '0' + suffix;
    cObs.observe(el);
  });
}

// ===== Portfolio filter =====
const tabBtns = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('.cards .card');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c => {
      const cats = (c.dataset.cat || '').split(' ');
      c.classList.toggle('hidden', !(f === 'all' || cats.includes(f)));
    });
  });
});
