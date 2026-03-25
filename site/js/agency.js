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
                        heroBg.style.transform = 'translateY(' + (scrollY * 0.5) + 'px)';
                    }
                    parallaxTick = false;
                });
            }
        }, { passive: true });
    }

    // ——— Text scramble on hero title ———
    // Title starts as solid color (no gradient). Scramble runs with plain
    // color so textContent changes render reliably on all platforms including
    // iOS Safari. Gradient class is added only after the final text is set.
    var scrambleEl = document.querySelector('[data-scramble]');
    if (scrambleEl) {
        var finalText = scrambleEl.textContent;
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
        var duration = 1000;
        var startDelay = 200;
        // Lock dimensions and prevent reflow during scramble
        var rect = scrambleEl.getBoundingClientRect();
        scrambleEl.style.height = rect.height + 'px';
        scrambleEl.style.overflow = 'hidden';
        scrambleEl.style.whiteSpace = 'nowrap';
        scrambleEl.textContent = '';
        setTimeout(function() {
            var startTime = null;
            function scrambleFrame(ts) {
                if (!startTime) startTime = ts;
                var elapsed = ts - startTime;
                var progress = Math.min(elapsed / duration, 1);
                var resolved = Math.floor(progress * finalText.length);
                var result = '';
                for (var i = 0; i < finalText.length; i++) {
                    if (finalText[i] === ' ') {
                        result += ' ';
                    } else if (i < resolved) {
                        result += finalText[i];
                    } else {
                        result += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                scrambleEl.textContent = result;
                if (progress < 1) {
                    requestAnimationFrame(scrambleFrame);
                } else {
                    scrambleEl.textContent = finalText;
                    scrambleEl.style.height = '';
                    scrambleEl.style.overflow = '';
                    scrambleEl.style.whiteSpace = '';
                    scrambleEl.classList.add('gradient-text');
                }
            }
            requestAnimationFrame(scrambleFrame);
        }, startDelay);
    }

    // ——— 3D tilt on portfolio cards (desktop only) ———
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('[data-tilt]').forEach(function(card) {
            var glare = card.querySelector('.portfolio-glare');
            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width;
                var y = (e.clientY - rect.top) / rect.height;
                var rotateX = (0.5 - y) * 12;
                var rotateY = (x - 0.5) * 12;
                card.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
                if (glare) {
                    glare.style.setProperty('--glare-x', (x * 100) + '%');
                    glare.style.setProperty('--glare-y', (y * 100) + '%');
                }
            });
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        });
    }

    // ——— Magnetic hover on social icons (desktop only) ———
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.social-links li a').forEach(function(el) {
            el.addEventListener('mousemove', function(e) {
                var rect = el.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
            });
            el.addEventListener('mouseleave', function() {
                el.style.transform = '';
            });
        });
    }

    // ——— Career card glow on scroll into view ———
    if ('IntersectionObserver' in window) {
        var allCards = document.querySelectorAll('.timeline-content');
        var activeCard = null;
        var cardTick = false;
        function updateActiveCard() {
            var viewCenter = window.innerHeight / 2;
            var closest = null;
            var closestDist = Infinity;
            allCards.forEach(function(card) {
                var rect = card.getBoundingClientRect();
                var cardCenter = rect.top + rect.height / 2;
                var dist = Math.abs(cardCenter - viewCenter);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = card;
                }
            });
            if (closest !== activeCard) {
                if (activeCard) activeCard.classList.remove('in-view');
                if (closest) closest.classList.add('in-view');
                activeCard = closest;
            }
            cardTick = false;
        }
        window.addEventListener('scroll', function() {
            if (!cardTick) {
                cardTick = true;
                requestAnimationFrame(updateActiveCard);
            }
        }, { passive: true });
        updateActiveCard();
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
