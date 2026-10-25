/* ==========================================================================
   AL RUJUH PROTOTYPE — shared behaviour
   Vanilla JS · no dependencies · Wix-Velo safe (can be pasted into public/code)
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- Header */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------ Mobile menu */
  const burger = document.querySelector('.burger');
  const drawer = document.querySelector('.drawer');
  if (burger && drawer) {
    const setOpen = (open) => {
      burger.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      document.body.classList.toggle('no-scroll', open);
      burger.setAttribute('aria-expanded', String(open));
    };
    burger.addEventListener('click', () => setOpen(!drawer.classList.contains('open')));
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ------------------------------------------------------- Reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('in'));
    }
  }

  /* ------------------------------------------------------- Project filters */
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    const buttons = filterBar.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('[data-cat]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        cards.forEach((card) => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.classList.toggle('proj-hidden', !show);
        });
      });
    });
  }

  /* --------------------------------------------- Counter animation on stats */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1500;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { run(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ------------------------------------------------------ Contact form (UI) */
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const note = form.querySelector('.form-note');
      if (!btn) return;
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      // Prototype only — connect to Wix Forms / Velo on production.
      setTimeout(() => {
        btn.innerHTML = 'Request Sent ✓';
        btn.classList.add('is-success');
        if (note) note.textContent = 'Thank you. Our team will respond within 24 hours. (Prototype — connect to Wix Forms)';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
          btn.classList.remove('is-success');
          form.reset();
        }, 3600);
      }, 900);
    });
  }

  /* ------------------------------------------------- AR notice (button) */
  const langBtn = document.querySelector('.lang-btn');
  if (langBtn && !langBtn.dataset.placeholder) {
    langBtn.setAttribute('title', 'Arabic version coming soon');
  }

  /* ==========================================================================
     HERO SLIDER — autoplay, arrows, dots, swipe, keyboard, pause on hover
     Wix Studio: Pro Gallery (Slider) / Slideshow element, or keep this code
     inside a Velo page module for a custom slide deck.
     ========================================================================== */
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.hs__slide'));
    const dots = Array.from(slider.querySelectorAll('.hs__dot'));
    const prevBtn = slider.querySelector('.hs__arrow--prev');
    const nextBtn = slider.querySelector('.hs__arrow--next');
    const counter = slider.querySelector('[data-hs-current]');
    const DURATION = 6500;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    let timer = null;

    slider.classList.add('hs--js', 'hs--boot');
    slider.style.setProperty('--hs-dur', DURATION + 'ms');

    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, k) => {
        slide.classList.toggle('is-active', k === index);
        slide.setAttribute('aria-hidden', String(k !== index));
      });
      dots.forEach((dot, k) => {
        dot.classList.remove('is-active', 'is-done');
        if (k < index) dot.classList.add('is-done');
        dot.setAttribute('aria-selected', String(k === index));
        if (k === index) {
          void dot.offsetWidth; // restart the progress-bar animation
          dot.classList.add('is-active');
        }
      });
      if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    };

    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => { if (!reduceMotion && !timer) timer = setInterval(() => show(index + 1), DURATION); };
    const jump = (n) => { show(n); stop(); start(); };

    if (prevBtn) prevBtn.addEventListener('click', () => jump(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => jump(index + 1));
    dots.forEach((dot, k) => dot.addEventListener('click', () => jump(k)));

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); jump(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); jump(index + 1); }
    });

    let touchX = null;
    slider.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 46) jump(dx < 0 ? index + 1 : index - 1);
    }, { passive: true });

    slides.forEach((slide) => slide.classList.remove('is-active'));
    requestAnimationFrame(() => {
      slider.classList.remove('hs--boot');
      requestAnimationFrame(() => { show(0); start(); });
    });
  }

  /* ==========================================================================
     CHART REVEAL — bar columns, line charts, donuts, gauges
     ========================================================================== */
  const chartBits = document.querySelectorAll('.bar-col, .line-chart, .donut, .gauge__ring');
  if (chartBits.length) {
    if ('IntersectionObserver' in window) {
      const chartIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('is-in'); chartIO.unobserve(entry.target); }
        });
      }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });
      chartBits.forEach((el) => chartIO.observe(el));
    } else {
      chartBits.forEach((el) => el.classList.add('is-in'));
    }
  }

  /* ==========================================================================
     DATA-DRIVEN BAR CHARTS + SEGMENTED SWITCH
     Markup contract (maps 1:1 to Wix Data / CMS fields):
       data-chart
       data-set-projects="18,22,26,31,38,44"       -> series A values
       data-set-revenue="3.1,4.2,5.6,7.4,9.2,11.5" -> series B values
       data-unit-revenue="M"                       -> suffix per series
     ========================================================================== */
  const renderBarChart = (chart, key) => {
    const cols = Array.from(chart.querySelectorAll('.bar-col'));
    const suffix = key.charAt(0).toUpperCase() + key.slice(1);
    const values = (chart.dataset['set' + suffix] || '').split(',')
      .map((n) => parseFloat(n)).filter((n) => !isNaN(n));
    const unit = chart.dataset['unit' + suffix] || '';
    const max = Math.max.apply(null, values.concat([1]));
    cols.forEach((col, k) => {
      const value = values[k] || 0;
      const height = Math.max(8, Math.round((value / max) * 100));
      const fill = col.querySelector('.bar-col__fill');
      const label = col.querySelector('.bar-col__val');
      if (fill) fill.style.setProperty('--h', height + '%');
      if (label) label.textContent = value + unit;
    });
    chart.setAttribute('aria-label', (chart.dataset.chartLabel || 'Chart') + ' — ' + key);
  };

  document.querySelectorAll('[data-chart]').forEach((chart) => {
    renderBarChart(chart, chart.dataset.view || 'projects');
  });

  document.querySelectorAll('[data-seg-target]').forEach((seg) => {
    const targets = document.querySelectorAll(seg.dataset.segTarget);
    seg.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        seg.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        targets.forEach((chart) => {
          chart.dataset.view = btn.dataset.view;
          renderBarChart(chart, btn.dataset.view);
        });
      });
    });
  });

  /* ------------------------------------------------- Year in footer */
  const yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();