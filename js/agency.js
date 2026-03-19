/*!
 * Modern Portfolio — Vanilla JS
 * Theme toggle, smooth scroll, scroll reveals, scrollspy, modals, mobile nav
 */
(function() {
    'use strict';

    // ——— Theme toggle ———
    var root = document.documentElement;
    var stored = localStorage.getItem('theme');
    if (stored) {
        root.setAttribute('data-theme', stored);
    }

    var themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            var current = root.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            if (next === 'light') {
                root.removeAttribute('data-theme');
            } else {
                root.setAttribute('data-theme', next);
            }
            localStorage.setItem('theme', next);
        });
    }

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

    // ——— Scrollspy (highlight active nav link) ———
    var navItems = document.querySelectorAll('.nav-links a[data-section]');
    var sections = [];
    navItems.forEach(function(link) {
        var id = link.getAttribute('data-section');
        var section = document.getElementById(id);
        if (section) sections.push({ id: id, el: section, link: link });
    });

    function updateScrollspy() {
        var scrollY = window.scrollY + 120;
        var active = null;
        for (var i = sections.length - 1; i >= 0; i--) {
            if (scrollY >= sections[i].el.offsetTop) {
                active = sections[i];
                break;
            }
        }
        navItems.forEach(function(link) { link.classList.remove('active'); });
        if (active) active.link.classList.add('active');
    }

    var scrollTimer;
    window.addEventListener('scroll', function() {
        if (scrollTimer) cancelAnimationFrame(scrollTimer);
        scrollTimer = requestAnimationFrame(updateScrollspy);
    }, { passive: true });
    updateScrollspy();

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
        reveals.forEach(function(el) { el.classList.add('visible'); });
    }

    // ——— Modal system ———
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        window.location.hash = modal.id;
        // Start autoplay videos when modal opens
        modal.querySelectorAll('video[autoplay]').forEach(function(v) {
            v.play().catch(function() {});
        });
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        // Pause videos when modal closes
        modal.querySelectorAll('video').forEach(function(v) {
            v.pause();
        });
        if (location.hash === '#' + modal.id) {
            history.replaceState(null, '', location.pathname + location.search);
        }
    }

    document.querySelectorAll('[data-modal]').forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            var modalId = this.getAttribute('data-modal');
            var modal = document.getElementById(modalId);
            openModal(modal);
        });
    });

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

    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var active = document.querySelector('.modal-overlay.active');
            if (active) closeModal(active);
        }
    });

    window.addEventListener('hashchange', function() {
        if (!location.hash) {
            var active = document.querySelector('.modal-overlay.active');
            if (active) closeModal(active);
        }
    });

    if (location.hash) {
        var hashModal = document.querySelector(location.hash);
        if (hashModal && hashModal.classList.contains('modal-overlay')) {
            openModal(hashModal);
        }
    }
})();
