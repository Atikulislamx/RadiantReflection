/* Radiant Reflection — main.js
   Mobile navigation toggle + mailto-based contact form.
   No backend, no external requests. */

(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('menu-toggle');
  var navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        toggle.focus();
      }
    });
  }

  /* ---------- Contact form: mailto handoff (no backend exists) ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !message) { return; }

      var subject = encodeURIComponent('Inquiry from ' + name + ' — Radiant Reflection website');
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        message
      );

      window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var lastState = false;
    window.addEventListener('scroll', function () {
      var shouldShadow = window.scrollY > 8;
      if (shouldShadow !== lastState) {
        header.style.boxShadow = shouldShadow ? '0 6px 24px -18px rgba(43,38,34,0.35)' : 'none';
        lastState = shouldShadow;
      }
    }, { passive: true });
  }
})();
