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

// ===== Analytics events (GA4) =====
(function(){
  document.addEventListener('click', function(e){
    if (!e.target.closest) return;
    var pdf = e.target.closest('a[href$=".pdf"]');
    if (pdf && window.gtag) gtag('event','resume_download',{link_url:pdf.getAttribute('href'), page:location.pathname});
    var contact = e.target.closest('a[href^="mailto:"], a[href^="tel:"]');
    if (contact && window.gtag) gtag('event','contact_click',{method: contact.getAttribute('href').indexOf('mailto:')===0 ? 'email':'phone', link_url:contact.getAttribute('href'), page:location.pathname});
  });
  var hit={};
  window.addEventListener('scroll', function(){
    var h=document.documentElement;
    var height=(h.scrollHeight - h.clientHeight)||1;
    var pct=Math.round(((h.scrollTop||document.body.scrollTop)/height)*100);
    [25,50,75,100].forEach(function(t){ if(pct>=t && !hit[t]){ hit[t]=true; if(window.gtag) gtag('event','scroll_depth',{percent:t, page:location.pathname}); } });
  }, {passive:true});
})();
