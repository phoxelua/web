/*!
 * Page Loader
 * Hides loading screen when page is fully loaded
 */
(function() {
    'use strict';

    window.addEventListener('load', function() {
        var loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    });
})();
