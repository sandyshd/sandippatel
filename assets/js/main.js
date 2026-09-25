/*!
 * Sandip Patel — sandipbpatel.com
 * Theme, nav, scroll reveal, filters, back-to-top, legacy hash redirects.
 */
(function () {
  'use strict';

  var THEME_KEY = 'theme';
  var DEFAULT_THEME = 'light';
  var root = document.documentElement;

  /* ---------------------------------------------------------------- Theme
   * One theme governs the whole page, including the feature bands. The site
   * opens light for everyone; the toggle is the only thing that changes it,
   * and the choice is remembered.
   */
  function storedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
      btn.setAttribute('title', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
    }
  }

  applyTheme(storedTheme() || DEFAULT_THEME, false);

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  });

  /* ----------------------------------------------------------- Mobile nav */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) closeNav();
    });
  }

  /* -------------------------------------------------------- Scroll reveal */
  var revealables = document.querySelectorAll('.reveal');

  if (revealables.length) {
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

      revealables.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ------------------------------------------------- Publication filtering */
  var filterBar = document.querySelector('[data-filter-group]');

  if (filterBar) {
    var targets = document.querySelectorAll('[data-filter-item]');
    var emptyState = document.querySelector('[data-filter-empty]');

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      var value = btn.getAttribute('data-filter');
      var shown = 0;

      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });

      targets.forEach(function (item) {
        var match = value === 'all' || item.getAttribute('data-filter-item') === value;
        item.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });

      document.querySelectorAll('[data-filter-section]').forEach(function (section) {
        var visible = section.querySelectorAll('[data-filter-item]:not(.is-hidden)').length;
        section.classList.toggle('is-hidden', visible === 0);
      });

      if (emptyState) emptyState.classList.toggle('is-hidden', shown !== 0);
    });
  }

  /* ---------------------------------------------------------- Copy buttons */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var source = document.getElementById(btn.getAttribute('data-copy'));
      if (!source || !navigator.clipboard) return;
      navigator.clipboard.writeText(source.textContent.trim()).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = original; }, 1800);
      });
    });
  });

  /* ---------------------------------------------------------- Back to top */
  var toTop = document.querySelector('.to-top');

  if (toTop) {
    var ticking = false;
    var updateToTop = function () {
      toTop.classList.toggle('is-visible', window.scrollY > 700);
      ticking = false;
    };

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateToTop);
        ticking = true;
      }
    }, { passive: true });

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateToTop();
  }

  /* ------------------------------------------------- Footer copyright year */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* --------------------------------------- Legacy single-page hash redirects
   * The site was previously one page with section anchors. Inbound links from
   * search results and social profiles still carry those fragments, so map any
   * hash that no longer resolves onto its new page.
   */
  (function redirectLegacyHash() {
    var hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    var id = decodeURIComponent(hash.slice(1));
    if (document.getElementById(id)) return;

    var map = {
      about: 'experience.html',
      expertise: 'expertise.html',
      experience: 'experience.html',
      publications: 'insights.html',
      research: 'insights.html',
      blueprints: 'insights.html',
      blogs: 'influence.html#writing',
      media: 'influence.html#media',
      press: 'influence.html#media',
      awards: 'experience.html#recognition',
      judge: 'influence.html#contributions',
      judging: 'influence.html#contributions',
      speaking: 'engage.html',
      mentorship: 'influence.html#contributions',
      service: 'influence.html#contributions',
      'peer-review': 'influence.html#contributions',
      cv: 'experience.html',
      contact: 'engage.html#contact'
    };

    if (map[id]) window.location.replace(map[id]);
  })();
})();
