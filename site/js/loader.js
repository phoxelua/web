/*!
 * Page Loader
 * Hides loading screen once hero background image is loaded
 */
(function() {
    'use strict';

    function hideLoader() {
        var loader = document.getElementById('page-loader');
        if (!loader || loader.classList.contains('fade-out')) return;
        loader.classList.add('fade-out');
        setTimeout(function() {
            loader.style.display = 'none';
        }, 400);
    }

    // Preload the hero background image, then hide loader
    var heroImg = new Image();
    heroImg.onload = hideLoader;
    heroImg.onerror = hideLoader;
    heroImg.src = 'img/header-bg.jpg';

    // Safety fallback: hide after 5s no matter what
    setTimeout(hideLoader, 5000);
})();
