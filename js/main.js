(function () {
  'use strict';

  var header = document.getElementById('header');
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  // Mobile menu
  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Header shadow on scroll
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active nav link
  var links = menu.querySelectorAll('a:not(.btn)');
  var sections = Array.prototype.map.call(links, function (l) {
    return document.querySelector(l.getAttribute('href'));
  });
  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) navObs.observe(s); });
  }

  // Counter animation
  function animateCount(el) {
    var target = parseInt(el.dataset.count, 10);
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1200, 1);
      el.textContent = Math.floor(p * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Reveal on scroll + skill bars + counters
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        e.target.querySelectorAll('.bar-fill').forEach(function (b) {
          b.style.width = b.dataset.level + '%';
        });
        e.target.querySelectorAll('[data-count]').forEach(animateCount);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    document.querySelectorAll('.bar-fill').forEach(function (b) { b.style.width = b.dataset.level + '%'; });
    document.querySelectorAll('[data-count]').forEach(function (c) { c.textContent = c.dataset.count; });
  }

  // Contact form -> opens email app (works on static hosting)
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('cName').value;
    var email = document.getElementById('cEmail').value;
    var msg = document.getElementById('cMsg').value;
    var subject = encodeURIComponent('Pesan dari ' + name + ' (Portfolio)');
    var body = encodeURIComponent(msg + '\n\nNama: ' + name + '\nEmail: ' + email);
    window.location.href = 'mailto:primasilvy28@gmail.com?subject=' + subject + '&body=' + body;
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
