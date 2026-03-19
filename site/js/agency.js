/*!
 * Modern Portfolio — Vanilla JS
 * Smooth scroll, scroll reveals, modals, mobile nav
 */
(function() {
    'use strict';

    // ——— Smooth scroll for anchor links ———
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#page-top') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                closeMobileNav();
                return;
            }
            var target = document.querySelector(href);
            if (target && !this.hasAttribute('data-modal')) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                closeMobileNav();
            }
        });
    });

    // ——— Mobile nav toggle ———
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    function closeMobileNav() {
        if (navLinks) navLinks.classList.remove('open');
        if (toggle) toggle.classList.remove('active');
    }

    if (toggle && navLinks) {
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }

    // ——— Scroll reveal (Intersection Observer) ———
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var delay = entry.target.style.getPropertyValue('--delay') || '0s';
                    entry.target.style.transitionDelay = delay;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(function(el) { observer.observe(el); });
    } else {
        // Fallback: just show everything
        reveals.forEach(function(el) { el.classList.add('visible'); });
    }

    // ——— Modal system ———
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        window.location.hash = modal.id;
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        if (location.hash === '#' + modal.id) {
            history.replaceState(null, '', location.pathname + location.search);
        }
    }

    // Open modal on click
    document.querySelectorAll('[data-modal]').forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            var modalId = this.getAttribute('data-modal');
            var modal = document.getElementById(modalId);
            openModal(modal);
        });
    });

    // Close on overlay click (not content)
    document.querySelectorAll('.modal-overlay').forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal(modal);
        });

        var closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closeModal(modal);
            });
        }
    });

    // ESC to close
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var active = document.querySelector('.modal-overlay.active');
            if (active) closeModal(active);
        }
    });

    // Back button closes modal
    window.addEventListener('hashchange', function() {
        if (!location.hash) {
            var active = document.querySelector('.modal-overlay.active');
            if (active) closeModal(active);
        }
    });

    // Open modal from URL hash on page load
    if (location.hash) {
        var hashModal = document.querySelector(location.hash);
        if (hashModal && hashModal.classList.contains('modal-overlay')) {
            openModal(hashModal);
        }
    }
})();
