/* ==========================================================================
   AL RUJUH — FLOWING MOTION RUNTIME
   Vanilla JS · no dependencies
   ========================================================================== */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------- Progress + back-to-top */
  const bar = document.querySelector('.progress-bar');
  const toTop = document.querySelector('.to-top');
  const onScrollGlobal = () => {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar && h > 0) bar.style.width = Math.min((y / h) * 100, 100) + '%';
    if (toTop) toTop.classList.toggle('show', y > 620);
  };
  onScrollGlobal();
  window.addEventListener('scroll', onScrollGlobal, { passive: true });
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------- Hero particles */
  const ph = document.querySelector('.particles');
  if (ph && !reduce) {
    const specs = [
      { s: 3, l: 14, t: 24, d: 9, o: .5 },
      { s: 2, l: 30, t: 64, d: 11, o: .42 },
      { s: 4, l: 64, t: 34, d: 10, o: .34 },
      { s: 2, l: 76, t: 20, d: 12, o: .46 },
      { s: 3, l: 86, t: 70, d: 9.5, o: .3 },
      { s: 2, l: 48, t: 84, d: 13, o: .4 },
      { s: 3, l: 8,  t: 76, d: 11, o: .34 },
      { s: 2, l: 58, t: 14, d: 10, o: .5 }
    ];
    ph.innerHTML = specs.map((p, i) =>
      `<span style="width:${p.s * 2}px;height:${p.s * 2}px;left:${p.l}%;top:${p.t}%;opacity:${p.o};animation-duration:${p.d}s;animation-delay:-${i * 1.1}s"></span>`
    ).join('');
  }

  /* ------------------------------------------- Parallax */
  const layers = document.querySelectorAll('[data-parallax]');
  if (layers.length && !reduce) {
    let ticking = false;
    const apply = () => {
      layers.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const r = el.getBoundingClientRect();
        const off = (r.top + r.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(apply); ticking = true; } };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  /* ------------------------------------------- Capability bars */
  const bars = document.querySelectorAll('.bar-fill');
  if (bars.length) {
    if ('IntersectionObserver' in window) {
      const bio = new IntersectionObserver((e) => {
        e.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('is-in'); bio.unobserve(x.target); } });
      }, { threshold: 0.4 });
      bars.forEach((b) => bio.observe(b));
    } else bars.forEach((b) => b.classList.add('is-in'));
  }

  /* ------------------------------------------- Reveal */
  const rev = document.querySelectorAll('.reveal');
  if (rev.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((e) => {
        e.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -70px 0px' });
      rev.forEach((el) => io.observe(el));
    } else rev.forEach((el) => el.classList.add('in'));
  }

  /* ------------------------------------------- Counters */
  const cs = document.querySelectorAll('[data-count]');
  if (cs.length && !reduce) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suf = el.dataset.suffix || '';
      const dur = 1600, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver((e) => {
      e.forEach((x) => { if (x.isIntersecting) { run(x.target); cio.unobserve(x.target); } });
    }, { threshold: 0.4 });
    cs.forEach((el) => cio.observe(el));
  } else {
    cs.forEach((el) => { el.textContent = el.dataset.count + (el.dataset.suffix || ''); });
  }
})();