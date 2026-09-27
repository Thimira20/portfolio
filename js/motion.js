/**
 * Motion & Interaction Layer — Thimira Portfolio
 *
 * Scroll-driven reveals, counters, skill bar fills, pointer-reactive cards,
 * a scroll progress meter, and mobile navigation hardening. Everything here
 * degrades to a plain static page under prefers-reduced-motion.
 */

(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');
  const COARSE = window.matchMedia('(pointer: coarse)');
  const prefersReduced = () => REDUCED.matches;

  /* ---------------------------------------------------------------
   * Scroll reveal
   * ------------------------------------------------------------- */
  function initReveals() {
    const targets = document.querySelectorAll(
      '.section-header, .pillar-card, .stat-card, .skill-category-card, ' +
      '.dossier-card, .contact-form-card, .terminal-window, .repo-controls, ' +
      '.hero-content > *, .hero-visual'
    );
    if (!targets.length) return;

    if (prefersReduced() || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('revealed'));
      return;
    }

    targets.forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger only within a row-ish group, so nothing waits too long.
      el.style.setProperty('--reveal-delay', (i % 6) * 70 + 'ms');
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(el => io.observe(el));
  }

  /** Reveal dynamically injected nodes (project cards, skill cards). */
  function observeDynamic(selector) {
    const nodes = document.querySelectorAll(selector);
    if (!nodes.length) return;

    if (prefersReduced() || !('IntersectionObserver' in window)) {
      nodes.forEach(n => n.classList.add('revealed'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    nodes.forEach((n, i) => {
      n.classList.add('reveal');
      n.style.setProperty('--reveal-delay', (i % 6) * 60 + 'ms');
      io.observe(n);
    });
  }

  /* ---------------------------------------------------------------
   * Stat values: count numbers up, scramble text
   * ------------------------------------------------------------- */
  function initStatAnimation() {
    const values = document.querySelectorAll('.stat-value');
    if (!values.length || prefersReduced() || !('IntersectionObserver' in window)) return;

    const CHARS = '01ABCDEF#$%&*/<>';

    function countUp(el, target, suffix) {
      const duration = 1400;
      const start = performance.now();
      (function step(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(step);
      })(start);
    }

    function scramble(el, final) {
      const duration = 1100;
      const start = performance.now();
      (function step(now) {
        const t = Math.min(1, (now - start) / duration);
        const settled = Math.floor(final.length * t);
        let out = final.slice(0, settled);
        for (let i = settled; i < final.length; i++) {
          out += final[i] === ' ' ? ' ' : CHARS[(Math.random() * CHARS.length) | 0];
        }
        el.textContent = out;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = final;
      })(start);
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);

        const raw = el.textContent.trim();
        const numeric = raw.match(/^(\d+)(\D*)$/);
        if (numeric) countUp(el, parseInt(numeric[1], 10), numeric[2]);
        else scramble(el, raw);
      });
    }, { threshold: 0.5 });

    values.forEach(v => io.observe(v));
  }

  /* ---------------------------------------------------------------
   * Skill bars fill on entry
   * ------------------------------------------------------------- */
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    if (prefersReduced() || !('IntersectionObserver' in window)) return;

    bars.forEach(bar => {
      bar.dataset.target = bar.style.width;
      bar.style.width = '0%';
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        io.unobserve(bar);
        requestAnimationFrame(() => {
          bar.style.width = bar.dataset.target || '0%';
          bar.classList.add('filled');
        });
      });
    }, { threshold: 0.3 });

    bars.forEach(b => io.observe(b));
  }

  /* ---------------------------------------------------------------
   * Pointer-reactive cards (spotlight + subtle 3D tilt)
   * ------------------------------------------------------------- */
  function initCardInteraction() {
    if (prefersReduced() || COARSE.matches) return;

    const cards = document.querySelectorAll('.project-card, .pillar-card, .stat-card, .skill-category-card');

    cards.forEach(card => {
      if (card.classList.contains('interactive-card')) return;  // already bound
      card.classList.add('interactive-card');

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        card.style.setProperty('--card-ry', ((px - 0.5) * 7).toFixed(2) + 'deg');
        card.style.setProperty('--card-rx', ((py - 0.5) * -7).toFixed(2) + 'deg');
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--card-ry', '0deg');
        card.style.setProperty('--card-rx', '0deg');
      });
    });
  }

  /* ---------------------------------------------------------------
   * Scroll progress meter
   * ------------------------------------------------------------- */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    let ticking = false;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.transform = `scaleX(${(pct / 100).toFixed(4)})`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });

    update();
  }

  /* ---------------------------------------------------------------
   * Mobile nav hardening: scroll lock, outside tap, Escape, resize reset
   * ------------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const header = document.getElementById('main-header');
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-locked');
    }

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-menu');

    // main.js already toggles the classes; we only mirror state side effects.
    toggle.addEventListener('click', () => {
      const open = menu.classList.contains('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-locked', open);
    });

    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('click', (e) => {
      if (!menu.classList.contains('open')) return;
      if (header && header.contains(e.target)) return;
      close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) close();
    });
  }

  /* ---------------------------------------------------------------
   * Hero title: per-word entrance
   * ------------------------------------------------------------- */
  function initHeroTitle() {
    const title = document.querySelector('.hero-title');
    if (!title || prefersReduced()) return;

    // Wrap top-level text nodes word by word, leaving element children
    // (the gradient span) intact so existing styling survives.
    const walk = (node) => {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const words = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          words.forEach(word => {
            if (!word.trim()) {
              frag.appendChild(document.createTextNode(word));
              return;
            }
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word;
            frag.appendChild(span);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          // Never split a background-clip:text element — its children would
          // inherit transparent fill with no background and vanish. Animate
          // the whole element as one unit instead.
          if (child.classList.contains('gradient-text')) {
            child.classList.add('word', 'word-block');
          } else {
            walk(child);
          }
        }
      });
    };

    walk(title);
    title.classList.add('word-anim');
    title.querySelectorAll('.word').forEach((w, i) => {
      w.style.animationDelay = (i * 45) + 'ms';
    });
  }

  /* ---------------------------------------------------------------
   * Boot — runs after main.js has injected its dynamic markup.
   * ------------------------------------------------------------- */
  function boot() {
    initHeroTitle();
    initReveals();
    initScrollProgress();
    initMobileNav();

    // main.js renders stats/skills/projects on DOMContentLoaded; queue after it.
    requestAnimationFrame(() => {
      initStatAnimation();
      initSkillBars();
      observeDynamic('.project-card');
      initCardInteraction();

      // Re-apply to project cards whenever the grid is re-rendered by a filter.
      const grid = document.getElementById('projects-grid');
      if (grid && 'MutationObserver' in window) {
        new MutationObserver(() => {
          observeDynamic('.project-card:not(.reveal)');
          initCardInteraction();
        }).observe(grid, { childList: true });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
