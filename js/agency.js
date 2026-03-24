/*!
 * Modern Portfolio — Vanilla JS
 * Smooth scroll, scroll reveals, scrollspy, mobile nav
 */
(function() {
    'use strict';

    // ——— Restore smooth scroll after hash-snap ———
    if (document.documentElement.style.scrollBehavior === 'auto') {
        window.addEventListener('load', function() {
            requestAnimationFrame(function() {
                document.documentElement.style.scrollBehavior = '';
            });
        });
    }

    // ——— Smooth scroll for anchor links ———
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#page-top') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                history.replaceState(null, '', location.pathname);
                closeMobileNav();
                return;
            }
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                history.replaceState(null, '', href);
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
        if (section) sections.push({ id: id, el: section, link: link, top: section.offsetTop });
    });

    function cacheSectionOffsets() {
        for (var i = 0; i < sections.length; i++) {
            sections[i].top = sections[i].el.offsetTop;
        }
    }

    var lastActive = null;
    function updateScrollspy() {
        var scrollY = window.scrollY + 120;
        var active = null;
        for (var i = sections.length - 1; i >= 0; i--) {
            if (scrollY >= sections[i].top) {
                active = sections[i];
                break;
            }
        }
        if (active === lastActive) return;
        navItems.forEach(function(link) { link.classList.remove('active'); });
        if (active) active.link.classList.add('active');
        lastActive = active;
    }

    var scrollTimer;
    window.addEventListener('scroll', function() {
        if (scrollTimer) cancelAnimationFrame(scrollTimer);
        scrollTimer = requestAnimationFrame(updateScrollspy);
    }, { passive: true });
    window.addEventListener('resize', cacheSectionOffsets);
    updateScrollspy();

    // ——— Hero parallax ———
    var heroBg = document.getElementById('hero-bg');
    var hero = document.getElementById('hero');
    if (heroBg && hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var heroH = hero.offsetHeight;
        var parallaxTick = false;
        window.addEventListener('scroll', function() {
            if (!parallaxTick) {
                parallaxTick = true;
                requestAnimationFrame(function() {
                    var scrollY = window.scrollY;
                    if (scrollY < heroH) {
                        heroBg.style.transform = 'translateY(' + (scrollY * 0.35) + 'px)';
                    }
                    parallaxTick = false;
                });
            }
        }, { passive: true });
    }

    // ——— Cursor glow (desktop only) ———
    var glow = document.getElementById('cursor-glow');
    if (glow && window.matchMedia('(pointer: fine)').matches) {
        var glowX = 0, glowY = 0, curX = 0, curY = 0, glowActive = false;
        document.addEventListener('mousemove', function(e) {
            curX = e.clientX;
            curY = e.clientY;
            if (!glowActive) {
                glowActive = true;
                glow.classList.add('active');
            }
        });
        document.addEventListener('mouseleave', function() {
            glowActive = false;
            glow.classList.remove('active');
        });
        (function animateGlow() {
            glowX += (curX - glowX) * 0.15;
            glowY += (curY - glowY) * 0.15;
            glow.style.left = glowX + 'px';
            glow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        })();
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
        reveals.forEach(function(el) { el.classList.add('visible'); });
    }
})();
