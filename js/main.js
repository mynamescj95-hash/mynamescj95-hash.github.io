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
